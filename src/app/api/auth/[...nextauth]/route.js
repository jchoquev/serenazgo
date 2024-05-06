import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import { Staff } from "@/models/staff";
import bcrypt from "bcryptjs"
import moment from "moment-timezone";
import { getDateHM } from "@/functions/Time/timer";

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
        const {username,password,dateNow}=credentials
        let userFound=await Staff.findOne({NDocumento:username,Activo:true,FHeliminar:null})
                        .select("NDocumento fullNombres +Password NCelular Cargo._id Cargo.Cargo Grupo._id Grupo.Grupo Grupo.Turno uPassword");
        const iSession= getDateHM(`${dateNow} ${userFound.Grupo.Turno.HEntrada}`,"YYYY-MM-DD HH:mm")
        let fSession=getDateHM(`${dateNow} ${userFound.Grupo.Turno.HSalida}`,"YYYY-MM-DD HH:mm")
        if(iSession>fSession) fSession=iSession.endOf("day");
        if(!userFound) throw new Error("El usuario no existe");
        const passwordMatch=await bcrypt.compare(password,userFound.Password);
        if(!passwordMatch) throw new Error("Ocurrio un error...");
        if(userFound.uPassword) userFound.new=true;
        //const {Password,...data}=userFound
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