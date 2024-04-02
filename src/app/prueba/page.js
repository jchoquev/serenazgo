import moment from "moment-timezone"
import { getDiffTimeSeconds } from "@/functions/Time/timer";
export default function prueba(){
    const utcTime = getDiffTimeSeconds("2024-04-02T08:00:00Z");
    return <>
        {utcTime}
    </>
}