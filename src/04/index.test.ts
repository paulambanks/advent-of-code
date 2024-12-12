import {describe, expect} from '@jest/globals';
import { sumOfXMAS, partOneOffsetMapping, partTwoOffsetMapping } from '.';

const testFile = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

describe('Day Four', () => {
    it('should return the correct answer', () => {
        expect(sumOfXMAS(testFile, partOneOffsetMapping, new Set(['XMAS']))).toBe(18);
        expect(sumOfXMAS(testFile, partTwoOffsetMapping, new Set(['AMMSS', 'ASSMM', 'ASMSM', 'AMSMS']))).toBe(9);
    });
});