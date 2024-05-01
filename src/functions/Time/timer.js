import moment from "moment-timezone"
const getDateNow=()=>{ 
    return moment().utc(-5).format()//.tz('America/Lima').utc(-5).format();
}

const getDate=(strText,Format)=>{ 
    return moment().utc(-5).format()//moment(strText,Format).format()//.tz('America/Lima').utc(-5).format();
}

const getDiffTimeSeconds=(strText)=>{ 
    return "";
}

export {getDate,getDateNow,getDiffTimeSeconds}