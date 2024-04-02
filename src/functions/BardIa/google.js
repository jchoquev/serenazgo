import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
async function run(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text
}

async function VehiculoTacticoIa(fecha,data){
    if(data.length<=0) return new Promise((resolve) => {resolve("");});
    const promp=`
        todo esto es de un patrullero osea de vehiculo que pertenece a serenazgo tomalo en cuenta pero no menciones  [
        Escribeme un acta sobre patrullaje en áreas priorizadas con 
        Fecha:${fecha.format("DD [de] MMMM [del] YYYY")} con
        Cantidad de patrullajes: ${data.length}
        y estando en las siguientes areas priorizadas
        ${
            data.map((item,key)=>{
                return `[
                Areas priorizada : ${item.Direccion}
                Para cada área priorizada: 
                Hora de Llegada : ${item.HLlegada}
                Hora de Salida : ${item.HSeira}
                Posiciones Geográficas ${item.Posicion} ]
                `
            })
        } 
        
        OJO:  quiero que consideres la fecha y la descripcion y el formaro para cada area algo asi "En [Areas priorizada ], con posiciones geográficas registradas en [Posiciones Geográficas]. La unidad movil llego a las [Hora de Llegada] y se retiro a las [Hora de Salida]" a la hora de levantar el acta al final agregale se completaron los minutos requeridos en esos puntos.
        solo quiero que tu respuesta:
            - en un solo sea un parrafo
            - tiene que ser clara sin redundancias
            - escrita de formalmente si faltas de ortografia y gramatica
            - escribelo en primera persona
            - no pongas nada como comentarios y no pongas titulo.
        ]
    `
    console.log(promp)
    return new Promise(async (resolve) => {
        const resp=await run(promp)
        resolve(resp);
    });
}

function MotorizadoTacticoIa(fecha,data){
    if(data.length<=0) return new Promise((resolve) => {resolve("");});
    const promp=`
        todo esto es de una unidad motorizada osea de una moto que pertenece a serenazgo de se tomalo en cuenta pero no menciones  [
        Escribeme un acta sobre patrullaje de una unidad motorizadas de 
        Fecha:${fecha.format("DD [de] MMMM [del] YYYY")} con 
        Cantidad de patrullajes: ${data.length}
        y los recorrido fue en los siguientes puntos
        ${
            data.map((item,key)=>{
                return `[
                Direccion del punto : ${item.Direccion}
                Para cada punto: 
                Hora de Llegada al punto : ${item.HLlegada}
                Posiciones Geográficas ${item.Posicion} ]
                `
            })
        } 
        
        OJO:  quiero que consideres la fecha y la descripcion
        solo quiero que tu respuesta:
            - en un solo sea un parrafo
            - tiene que ser clara sin redundancias
            - escrita de formalmente si faltas de ortografia y gramatica
            - ten presente que los puntos mencionados son los que recorrio
            - no pongas un tituno ni comentarios.
            - escribelo en primera persona
        ]
    `
    return new Promise(async (resolve) => {
        const resp=await run(promp)
        resolve(resp);
    });
}

function OcurrenciaIa(esMoto,fecha,data){
    if(data.length<=0) return new Promise((resolve) => {resolve("");});
    //console.log(esMoto,fecha,data)
    const promp=`
        todo esto son Ocurrencias que ocurren en el patrullaje en SERENAZGO tomalo en cuenta pero no menciones  [
        Escribeme un acta sobre Estas ocurrencias  
        Cantidad de ocurrencias: ${data.length}
        estas son las ocurrencias durante el patrullaje:
        ${
            data.map((item,key)=>{
                const {Coordenadas:{Latitud,Longitud},TipoVia:{label}} =item
                return `[
                Descripcion: ${item.Descripcion} esta es una pequeña descripcion
                Direccion: ${label} ${item.Direccion} esta es la direccion o lugar donde ocurrio el incidente
                Hora de Llegada al la ocurrencia : ${item.HoraLlegada} esta es la hora donde se llego a la ocurencia
                las coordenadas de la ocurrencia tienen de latitud ${Latitud} y de longitud  ${Longitud}
                `
            })
        } 
        
        OJO:  quiero que empieces con un conector, y menciones el muenro de Ocurrencias ya que esto continuara un parrafo anterior
        solo quiero que tu respuesta:
            - en un solo sea un parrafo
            - tiene que ser clara sin redundancias
            - escrita de formalmente si faltas de ortografia y gramatica
            - solo hablas de la ocurrencia en ese parrafo no hablante antes ni despues hablaras del tema.
            - no pongas un tituno ni comentarios.
            - escribelo en primera persona como si estuvieras tu apoyando en la ocurrencia.
        ]
    `

    
    return new Promise(async (resolve) => {
        const resp=await run(promp)
        resolve(resp);
    });
}
export {VehiculoTacticoIa,MotorizadoTacticoIa,OcurrenciaIa} 