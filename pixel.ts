export interface Coordinate {
    /** Absolute value, not relative */
    x: number;
    /** Absolute value, not relative */
    y: number;
}

export interface Pixel {
    /** Relative to specified origin */
    x: number;
    /** Relative to specified origin */
    y: number;
    /** For info on what this can be, see util.ts#colors */
    color: number;
}

export function coordinateToSquareNum({ x, y }: Coordinate) {
    return y * 100 + x;
}
