export const colors = {
    "0": "#000000", // black
    "1": "#ffffff", // white
    "2": "#fc1d11", // red
    "3": "#fcaa11", // orange
    "4": "#fbff00", // yellow
    "5": "#3fb205", // green
    "6": "#055eb2", // dark blue
    "7": "#6202fc", // dark purple
    "8": "#f267fc", // pink
    "9": "#67d2fc", // sky blue
    "10": "#00fc19", // lime
    "11": "#704902", // brown
    "12": "#c01d11", // dark red
    "13": "#ad750c", // dark orange
    "14": "#b3b300", // dark yellow
    "15": "#089cff", // blue
    "16": "#b88efa", // light purple
    "17": "#f2a7fc", // light pink
    "18": "#fa948e", // light red
    "19": "#fac564", // light orange
    "20": "#fbff90", // light yellow
    "21": "#87fa91", // light green
    "22": "#a26bfa", // purple
    "23": "#575757", // dark grey
    "24": "#a1a1a1", // light grey
};

export function colorNumToColor(num: number) {
    return (colors as { [i: string]: string })[num.toString()] || "#f802fc";
}

type Color = { r: number; g: number; b: number };

// https://stackoverflow.com/a/33218950
function euclideanDistance(a: Color, b: Color) {
    return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

type ColorToDistance = { color: number; distance: number };

export function findClosestColor(r: number, g: number, b: number) {
    const distances: ColorToDistance[] = [];

    for (const colorEntry of Object.entries(colors)) {
        const num = colorEntry[0];
        const hex = colorEntry[1];

        const color: Color = {
            r: parseInt(hex.substring(1, 3), 16),
            g: parseInt(hex.substring(3, 5), 16),
            b: parseInt(hex.substring(5, 7), 16),
        };

        distances.push({ color: Number.parseInt(num), distance: euclideanDistance({ r, g, b }, color) });
    }

    let lowestDistance: ColorToDistance = { color: 0, distance: 9999 };

    for (const distance of distances) {
        if (distance.distance < lowestDistance.distance) lowestDistance = distance;
    }

    return lowestDistance.color;
}
