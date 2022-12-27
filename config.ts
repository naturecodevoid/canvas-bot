import { Pixel, Coordinate } from "./pixel";

// This is an array of pixel objects.
// You can manually specify each pixel with this array.
// However, if input.png exists and is equal to or smaller than 100x100 pixels, it will read from that.
// Please make sure that none of the x or y are larger than 99, or the bot won't work correctly.
// For info on what the color values are, see color.ts#colors
export const input: Pixel[] = [
    { x: 0, y: 0, color: 5 },
    { x: 2, y: 1, color: 10 },
];

// The origin. This will determine where to place the input.
// Example: origin is 10, 10. In the input, there is a pixel at 2, 1. It will end up being placed at 12, 11.s
// Please make sure that the origin doesn't result in any of the x or y values of pixels being larger than 99, or the bot won't work correctly.
export const origin: Coordinate = {
    x: 0,
    y: 0,
};

// If the bot should check if the pixel that it is about to write is the same color. Disabling this will improve how fast squares are placed after the cooldown ends
export const allowSkipping = false;

// If logging should be enabled. Disabling this *might* improve how fast squares are placed after the cooldown ends, but it's probably better to keep logging on
export const logging = true;
