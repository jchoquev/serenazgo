import moment from "moment-timezone"
const getDateNow=()=>{ 
    return moment().utcOffset('-05:00').tz('America/Lima').format()//.utc(-5).format();
}

const getDateHM=(strText)=>{ 
    let [hora, minuto] = strText.split(':');
    let Retorno=moment().utcOffset('-05:00').tz('America/Lima').set({ hour: hora, minute: minuto,second:0 });
    return Retorno.format()
}

const getDiffTimeSeconds=(strText)=>{ 
    return "";
}

export {getDateHM,getDateNow,getDiffTimeSeconds}