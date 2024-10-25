import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const response = await fetch('https://dummyjson.com/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: credentials.username,
                        password: credentials.password,
                        expiresInMins: 30,
                    }),
                });

                const data = await response.json();

                if (response.ok && data.accessToken) {
                    return {
                        accessToken: data.accessToken,
                        userData: {
                            username: data.username,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            image: data.image,
                            gender: data.gender,
                            role: "user"
                        },
                    };
                } else {
                    throw new Error(data.message || 'Invalid credentials');
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
