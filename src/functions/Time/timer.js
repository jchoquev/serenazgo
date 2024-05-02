import moment from "moment-timezone"
const getDateNow=()=>{ 
    return moment().utcOffset('-05:00').format()//.tz('America/Lima').utc(-5).format();
}

const getDate=(strText,Format)=>{ 
    return moment().utcOffset('-05:00').format()//moment(strText,Format).format()//.tz('America/Lima').utc(-5).format();
}

const getDiffTimeSeconds=(strText)=>{ 
    return "";
}

export {getDate,getDateNow,getDiffTimeSeconds}