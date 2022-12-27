# canvas-bot

A bot for [naturecodevoid.dev/experiments/canvas](https://naturecodevoid.dev/experiments/canvas).

## Usage

You will need `tsx` installed. Then, you can run the start script with your node.js package manager.

## Configuration

Make sure to read and setup [config.ts](./config.ts). It contains a lot of helpful values.

## Using input.png and palette.hex

If you want to use a png as your input, just make a file called `input.png`. It has a max size of 100x100. Since the canvas has a limited color palette, it will try to find the closest color for each
pixel. You can find the allowed colors in [colors.ts](./colors.ts). You can also import [palette.hex](./palette.hex) into an image editor such as Aseprite. **Transparent pixels will be ignored!**
