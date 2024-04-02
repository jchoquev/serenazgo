import moment from "moment-timezone"
const getDateNow=()=>{ 
    return moment.tz('America/Lima').utc(-5).format();
}

const getDate=(strText,Format)=>{ 
    return moment(strText,Format).tz('America/Lima').utc(-5).format();
}

const getDiffTimeSeconds=(strText)=>{ 
    return "";
}

export {getDate,getDateNow,getDiffTimeSeconds}