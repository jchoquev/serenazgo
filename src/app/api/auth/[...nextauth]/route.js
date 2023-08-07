import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();
        console.log(credentials);
        const userFound=await User.findOne({User:credentials.username}).select("+Password");
        console.log(userFound);
        if(!userFound) throw new Error("Ocurrio un error...");
        const passwordMatch=await bcrypt.compare(credentials.password,userFound.Password);
        if(!passwordMatch) throw new Error("Ocurrio un error...");
        return userFound;
      },
    }),
  ],
  callbacks:{
    jwt({account,token,user,profile,session}){
      if(user) token.user=user;
      return token;
    },
    session({session,token}){
      session.user=token.user;
      return session;
    },
  },
  pages:{
    signIn:'/login'
  }
});

export {handler as GET,handler as POST}