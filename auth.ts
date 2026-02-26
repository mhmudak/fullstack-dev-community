import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import connectMongo from "@/lib/mongodb";
import Developer from "@/models/Developer";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],

  callbacks: {
    async jwt({ token, account }) {
      // Runs at login
      if (account?.provider === "github") {
        await connectMongo();

        const dev = await Developer.findOne({
          githubId: account.providerAccountId,
        });

        if (dev) {
          token.sub = dev._id.toString(); // attach Mongo _id to token
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string; // session.user.id = Mongo _id
      }

      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "github") {
        await connectMongo();

        let dev = await Developer.findOne({
          githubId: account.providerAccountId,
        });

        if (!dev) {
          dev = await Developer.create({
            name: user.name,
            email: user.email,
            image: user.image,
            githubId: account.providerAccountId,
          });
        }
      }

      return true;
    },
  },
});
