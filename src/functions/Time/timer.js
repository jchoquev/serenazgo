import moment from "moment-timezone"
const getDateNow=()=>{ 
    return moment().utcOffset('-05:00').tz('America/Lima').format()//.utc(-5).format();
}

const getDateHM=(strText,format)=>{ 
    let [hora, minuto] = strText.split(':');
    let Retorno=moment(strText,format)
    return Retorno.format()
}

const getDiffTimeSeconds=(strText)=>{ 
    return "";
}

export {getDateHM,getDateNow,getDiffTimeSeconds}