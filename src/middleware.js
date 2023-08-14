export {default} from "next-auth/middleware";
/*
para proteger toda las rutas dentro de una carpeta debmos usar
/:path*
*/

export const config={
    matcher:['/admin/:path*','/updatepass/:path*']
}