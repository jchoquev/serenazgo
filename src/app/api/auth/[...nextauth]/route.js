import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import { Staff } from "@/models/staff";
import bcrypt from "bcryptjs"
import moment from "moment-timezone";
import { getDate } from "@/functions/Time/timer";

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
        console.log(userFound)
        const iSession= getDate(userFound.Grupo.Turno.HEntrada,"HH:mm")
        let fSession=getDate(userFound.Grupo.Turno.HSalida,"HH:mm")
        if(iSession>fSession) fSession=iSession.endOf("day");
        if(!userFound) throw new Error("El usuario no existe");
        const passwordMatch=await bcrypt.compare(credentials.password,userFound.Password);
        if(!passwordMatch) throw new Error("Ocurrio un error...");
        if(userFound.uPassword) userFound.new=true;

        return {
          NDocumento:userFound.NDocumento,
          fullNombres:userFound.fullNombres,
          Password:userFound.Password,
          NCelular:userFound.NCelular,
          Cargo:userFound.Cargo,
          Grupo:userFound.Grupo,
          new:userFound.new,
          iSession:iSession,
          fSession:fSession,
          //time:fSession.diff(moment().tz('America/Lima'),"seconds")
        };
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
/*


Fechai:Fecha.tz('America/Lima').startOf('day').toDate(),
    Fechaf:Fecha.tz('America/Lima').endOf('day').toDate(),
*/