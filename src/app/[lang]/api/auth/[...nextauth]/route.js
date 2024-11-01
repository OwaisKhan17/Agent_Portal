import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateURL } from "common/api-end-points";

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
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);

        const response = await fetch(authenticateURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Business-Identifier": "KH",
            locale: "en",
            Authorization: "Basic YWxpSUI6YWxpSUI=",
          },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();
        console.log("API Response:", data);
        console.log("API Response:", response);

        if (response.ok && data.data.accessToken) {
          return {
            accessToken: data.data.accessToken,
            userData: {
              username: credentials.accessIdentifier,
              firstName: "Owais",
              lastName: "Owais",
              email: "Owais",
              image: "Owais",
              gender: "Owais",
              role: "user",
              loginDateTime: new Date(),
            },
          };
        } else {
          console.error("Invalid response:", data);
          // Return null instead of throwing an error to avoid redirection
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.userData = user.userData; // Correctly map userData
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.userData = token.userData || {}; // Attach user data correctly
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Named exports for each HTTP method
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
