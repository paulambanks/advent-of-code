import { isOverallIncreasing, softLevelCheck } from './helpers';
describe('day-two result', () => {
    it.each([
        [
            [58, 59, 62, 63, 64, 63],
            true,
        ],
        [   
            [71, 72, 74, 76, 76, 80, 82, 82],
            true
        ],
        [
            [39, 35, 34, 32, 29, 29, 25],
            false,
        ],
    ])('should return the correct result for %p', (numbers, expectedResult) => {
        expect(isOverallIncreasing(numbers)).toBe(expectedResult);
    });

    it.each([
        [
            [58, 59, 62, 63, 64, 63],
            {
                badLevelIndexes: new Set([4, 5]),
            },
        ],
        [   
            [71, 72, 74, 76, 76, 80, 82, 82],
            {
                badLevelIndexes: new Set([3, 4, 5, 6, 7]),
            },
        ],
        [
            [39, 35, 34, 32, 29, 29, 25],
            {
                badLevelIndexes: new Set([0, 1, 4, 5, 6]),
            },
        ],
    ])('should return the correct result for %p', (numbers, expectedResult) => {
        expect(softLevelCheck(numbers)).toEqual(expectedResult);
    });

});