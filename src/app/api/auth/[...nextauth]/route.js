import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/config/Mongoose";
import User from "@/model/User";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      async profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: profile.email,
        };
      },
    }),

  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDatabase();

      if (account.provider === "github" || account.provider === "google") {
        const existingUser = await User.findOne({ email: profile.email });

        if (existingUser) {
          // Update the existing user with new information if they log in with GitHub or Google
          await User.updateOne(
            { email: profile.email },
            {
              $set: {
                name: profile.name || existingUser.name,
                image: profile.picture || profile.avatar_url || existingUser.image,
                isOAuth: true,
                isBlocked: false,
              },
            }
          );
        } else {
          // If the user does not exist, create a new user with default role and image
          await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture || profile.avatar_url,
            isOAuth: true,
            isBlocked: false,
          });
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      await connectToDatabase();

      // Find the latest user data from the database
      const dbUser = await User.findOne({ email: token.email });

      if (dbUser && user) {
        user.isBlocked = dbUser.isBlocked; // Update token with the latest blocked status
      }

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.isBlocked = user.isBlocked;
        
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.image;
      session.user.isBlocked = token.isBlocked; 
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };