import moment from "moment-timezone"
const getDateNow=()=>{ 
    return moment().format()//.tz('America/Lima').utc(-5).format();
}

const getDate=(strText,Format)=>{ 
    return moment().format()//moment(strText,Format).format()//.tz('America/Lima').utc(-5).format();
}

const getDiffTimeSeconds=(strText)=>{ 
    return "";
}

export {getDate,getDateNow,getDiffTimeSeconds}