import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            email: string;
            name: string;
            
        },
        userType: string;
    }
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'signIn') {
                token.userType = session?.userType;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            session.userType = token.userType as string;
            session.user.name = token.name as string;
            return session;
        }
    }
});

export { handler as GET, handler as POST };