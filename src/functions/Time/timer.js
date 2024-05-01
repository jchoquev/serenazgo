import moment from "moment-timezone"
const getDateNow=()=>{ 
    return moment().subtract(5, 'hours').format()//.tz('America/Lima').utc(-5).format();
}

const getDate=(strText,Format)=>{ 
    return moment().subtract(5, 'hours').format()//moment(strText,Format).format()//.tz('America/Lima').utc(-5).format();
}

const getDiffTimeSeconds=(strText)=>{ 
    return "";
}

export {getDate,getDateNow,getDiffTimeSeconds}