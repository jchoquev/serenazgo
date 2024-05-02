import moment from "moment-timezone"
const getDateNow=()=>{ 
    return moment().utcOffset('-05:00').utc(-5).tz('America/Lima').format()//.utc(-5).format();
}

const getDate=(strText,Format)=>{ 
    return moment().utcOffset('-05:00').utc(-5).tz('America/Lima').format()//moment(strText,Format).format()//.tz('America/Lima').utc(-5).format();
}

const getDiffTimeSeconds=(strText)=>{ 
    return "";
}

export {getDate,getDateNow,getDiffTimeSeconds}