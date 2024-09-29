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
                role: existingUser.role,
              },
            }
          );
        } else {
          // If the user does not exist, create a new user with default role and image
          await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture || profile.avatar_url || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
            isOAuth: true,
          });
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.image 
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };