import { createClient } from "@supabase/supabase-js";

import dayjs from "./dayjs";

const supabase = createClient(
    "https://qgpdcaqkdxlivymludpy.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFncGRjYXFrZHhsaXZ5bWx1ZHB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIwMjkyNzEsImV4cCI6MTk4NzYwNTI3MX0.lV-A0oohEzExsv-LIH96TeW1ua6Hw4F80gO1jOC752E",
);

export async function getColor(squareNum: number) {
    return Number.parseInt((await supabase.from("canvas").select("color").eq("square_num", squareNum.toString())).data![0].color);
}

export async function place(squareNum: number, color: number) {
    return await supabase.from("canvas").update({ color }).eq("square_num", squareNum.toString());
}

export async function getCooldown() {
    const { error } = await supabase.from("canvas").update({ color: 0 }).eq("square_num", "-1");
    if (error && error.message.startsWith("A timeout")) {
        return dayjs.utc(error.message.split("=").at(-1)!.trim());
    }
    return dayjs();
}
