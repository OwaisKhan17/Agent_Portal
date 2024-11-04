import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateURL } from "common/api-end-points";
import {
  GetUserInfo,
  GetUserPermissions,
  GetCustomerInquiry,
} from "lib/actions/authActions"; // Ensure this is correctly imported

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        accessIdentifier: { label: "Username", type: "text" },
        accessKey: { label: "Password", type: "password" },
        accessKeyType: { label: "AccessKeyType", type: "text" },
        portalId: { label: "PortalId", type: "text" },
        deviceId: { label: "DeviceId", type: "text" },
        pushId: { label: "PushId", type: "text" },
        companyCode: { label: "CompanyCode", type: "text" },
      },
      async authorize(credentials) {
        console.log("ENV Token:", process.env.BASIC_TOKEN);

        const response = await fetch(authenticateURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Business-Identifier": credentials.companyCode,
            locale: "en",
            Authorization: "Basic " + process.env.BASIC_TOKEN,
          },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (response.ok && data.data.accessToken) {
          return {
            accessToken: data.data.accessToken,
            userData: {
              username: credentials.accessIdentifier,
              tokenType: data.data.tokenType,
              expiresIn: data.data.expiresIn,
              loginDateTime: new Date(),
              uniqueIdentifier: data.data.uniqueIdentifier,
              portalID: data.data.portalId,
              refreshToken: data.data.refreshToken,
              role: "admin",
            },
          };
        } else {
          console.error("Invalid response:", data);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.userData = user.userData; // Map user data
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.userData = token.userData || {}; // Attach user data

      if (token.accessToken && session.userData.username) {
        // Fetch user info
        const userInfo = await GetUserInfo(
          token.accessToken,
          session.userData.username,
          token.userData.uniqueIdentifier,
          token.userData.portalID
        );

        if (userInfo.type === "success" && userInfo.data.values.length > 0) {
          const userData = userInfo.data.values[0]; // Access the first user object
          session.userInfo = userData; // Attach user data to the session
        } else {
          console.error("Failed to fetch user info:", userInfo.message);
        }

        // Fetch user permissions
        const userPermissions = await GetUserPermissions(
          token.accessToken,
          session.userData.username
        );

        if (userPermissions.type === "success") {
          const permissionsArray = userPermissions.data.values.map(
            (permission) => {
              return {
                name: permission.name, // Keep the permission group name
                permissions: permission.permissions.map((perm) => {
                  return { ...perm }; // Spread operator to include all fields dynamically
                }),
              };
            }
          );
          session.userPermissions = permissionsArray;
          console.log(
            "User Permissions:",
            JSON.stringify(session.userPermissions, null, 2)
          );
        } else {
          console.error(
            "Failed to fetch user permissions:",
            userPermissions.message
          );
        }

        const customerInquiry = await GetCustomerInquiry(
          token.accessToken,
          "KH"
        );
        console.log(
          "customerInquiry:",
          JSON.stringify(customerInquiry, null, 2)
        ); // Log the entire response

        if (customerInquiry.type === "success") {
          const customerInquiryData = customerInquiry.data.data; // Access the data object
          session.customerInquiryData = customerInquiryData; // Attach data to the session

          // Log the detailed customer inquiry data
          console.log(
            "Customer Inquiry Data:",
            JSON.stringify(session.customerInquiryData, null, 2)
          );
        } else {
          console.error(
            "Failed to fetch customer inquiry:",
            customerInquiry.message
          );
        }
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Named exports for each HTTP method
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
