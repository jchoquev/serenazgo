import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import { Staff } from "@/models/staff";
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
        let userFound=await Staff.findOne({NDocumento:credentials.username,Activo:true,FHeliminar:null})
                        .select("NDocumento fullNombres +Password NCelular Cargo._id Cargo.Cargo Grupo._id Grupo.Grupo Grupo.Turno uPassword");
        if(!userFound) throw new Error("El usuario no existe");
        const passwordMatch=await bcrypt.compare(credentials.password,userFound.Password);
        if(!passwordMatch) throw new Error("Ocurrio un error...");
        if(userFound.uPassword) userFound.new=true;
        userFound.Password=userFound.uPassword;
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