import chalk from "chalk";
import { existsSync } from "fs";
import jimp from "jimp";
import _ from "lodash";
import { dirname } from "path";

import { colorNumToColor, findClosestColor } from "./color";
import dayjs from "./dayjs";
import { getColor, getCooldown, place } from "./db";
import { log, formatTimestamp } from "./log";
import { coordinateToSquareNum, Pixel } from "./pixel";
import { sleep } from "./sleep";

import { input as rawInput, origin, allowSkipping, logging } from "./config";

let input = [...rawInput];

const inputPath = decodeURIComponent(dirname(import.meta.url) + "/input.png").replace("file://", "");
if (existsSync(inputPath)) {
    log(`Reading from ${inputPath}`);

    input = [];
    const image = await jimp.read(inputPath);
    if (image.bitmap.width > 100 || image.bitmap.height > 100) {
        log(`Error: input.png is larger than 100 in width or height`);
        process.exit(0);
    }
    for (const { x, y, idx } of image.scanIterator(0, 0, image.bitmap.width, image.bitmap.height)) {
        const red = image.bitmap.data[idx + 0];
        const green = image.bitmap.data[idx + 1];
        const blue = image.bitmap.data[idx + 2];
        const alpha = image.bitmap.data[idx + 3];

        if (alpha == 0) continue;

        input.push({ x, y, color: findClosestColor(red, green, blue) });
    }

    log(`Finished reading input.png`);
} else log(`No input.png found (it should be at ${inputPath})`);

log(`Printing input`);

const width = _.maxBy(input, "x")!.x;
const height = _.maxBy(input, "y")!.y;

for (let y = 0; y <= height; y++) {
    for (let x = 0; x <= width; x++) {
        const pixelIndex = _.findIndex(input, { x, y });
        if (pixelIndex == -1) {
            process.stdout.write("  ");
            continue;
        }

        const pixel = input[pixelIndex];
        process.stdout.write(chalk.bgHex(colorNumToColor(pixel.color))("  "));
        process.stdout.write(chalk.reset());
    }
    process.stdout.write("\n");
}

log(`Origin: ${origin.x}, ${origin.y}`);

const queue: Pixel[] = [...input];

const startingCooldown = (await getCooldown()).diff(dayjs());

if (startingCooldown > 0) {
    if (logging) log(`Waiting until ${formatTimestamp(dayjs(startingCooldown))} (ms: ${startingCooldown})`);
    await sleep(startingCooldown);
}

while (queue.length > 0) {
    const pixel = queue.shift()!;

    const x = origin.x + pixel.x;
    const y = origin.y + pixel.y;
    const { color } = pixel;

    log(`Placing at ${x}, ${y} with color of ${color} (original pixel position in input: ${pixel.x}, ${pixel.y})`);

    const squareNum = coordinateToSquareNum({ x, y });
    if (allowSkipping) {
        const currentColor = await getColor(squareNum);
        if (color == currentColor) {
            log(`Skipping pixel since it is already the same color`);
        }
    }

    const { error } = await place(squareNum, color);
    if (error) {
        if (error.message.includes("already this color")) {
            log(`Skipping cooldown wait since the pixel we wrote to is already the correct color`);
            continue;
        }
        log(`Got error: ${error.message}`);
        continue;
    }

    const cooldown = await getCooldown();
    const cooldownMs = cooldown.diff(dayjs());

    log(`Successfully placed`);

    if (queue.length > 0) {
        if (logging) log(`Waiting until ${formatTimestamp(cooldown)} (ms: ${cooldownMs})`);
        await sleep(cooldownMs);
    }

    // TODO: after finishing queue, check if any of the pixels that were supposed to be placed got overwritten. if so, add them to the queue
}

log("Done! Nothing more in queue.");
