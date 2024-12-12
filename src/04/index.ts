import * as fs from 'fs';

const processOutput = (lines: string[][], offset: [number, number][], startingCoords: [number, number]) => {
    let output = '';
    for (const coordinate of offset) {
        const char = lines?.[coordinate[0] + startingCoords[0]]?.[coordinate[1] + startingCoords[1]];
        if (char == null) return null;
        output += char;
    }
    return output;
}

export const partOneOffsetMapping: [number, number][][] = [
    [[0, 0], [0, 1], [0, 2], [0, 3]], // check ->
    [[0, -0], [0, -1], [0, -2], [0, -3]], // check <-
    [[0, 0], [1, 0], [2, 0], [3, 0]], // check ^
    [[-0, 0], [-1, 0], [-2, 0], [-3, 0]], // check v
    [[0, 0], [1, 1], [2, 2], [3, 3]], // check \|
    [[-0, -0], [-1, -1], [-2, -2], [-3, -3]], // check |\ 
    [[0, -0], [1, -1], [2, -2], [3, -3]], // check /|
    [[-0, 0], [-1, 1], [-2, 2], [-3, 3]], // check |/
]

export const partTwoOffsetMapping: [number, number][][] = [
    [[0, 0], [-1, 1], [1, 1], [-1, -1], [1, -1]], // check for A at the beginning MMSS 
]

export const sumOfXMAS = (file: string, offsetMapping: [number, number][][] = [], acceptableSet: Set<string>) => {
    const lines = file
        .trim()
        .split(/\r?\n|\r/)
        .map((line) => line.trim().split(''));

    let count = 0;
    const maxX = lines.length;
    const maxY = lines[0].length;

    for (let i = 0; i < maxX; i++) {
        for (let j = 0; j < maxY; j++) {
            for (const offset of offsetMapping) {
                const output = processOutput(lines, offset, [i, j]);
                if (output && acceptableSet.has(output)) {
                    count++;
                };
            }
        }
    }
    return count;
}

fs.readFile('./input.txt', function(err, data) {

    return {
        sumOfXMAS: sumOfXMAS(data.toString(), partOneOffsetMapping, new Set(['XMAS'])),
        sumOfX_MAS: sumOfXMAS(data.toString(), partTwoOffsetMapping, new Set(['AMMSS', 'ASSMM', 'ASMSM', 'AMSMS'])),
    };
});