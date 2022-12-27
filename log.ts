import { logging } from "./config";
import dayjs from "./dayjs";

export function formatTimestamp(timestamp: dayjs.Dayjs) {
    return timestamp.tz(dayjs.tz.guess()).format("MM.DD.YY h:mm:ss.SSS A");
}

export function log(data: any) {
    if (!logging) return;
    console.log(`[${formatTimestamp(dayjs())}] ${data}`);
}
