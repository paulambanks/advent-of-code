export const isOverallIncreasing = (row: Number[]): boolean => {
    let overAllIncreasingScore = 0;
    let overAllDecreasingScore = 0;
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] > row[i + 1]) {
            overAllDecreasingScore++;
        } else {
            overAllIncreasingScore++;
        }
    }
    return overAllIncreasingScore > overAllDecreasingScore;
}

export const softLevelCheck = (row: Number[]): {
    badLevelIndexes: Set<number>
} => {
    const isIncreasing = isOverallIncreasing(row);
    let badLevelIndexes: Set<number> = new Set();

    for (let i = 0; i < row.length - 1; i++) {
        if (isIncreasing && row[i] >= row[i + 1]) {
            badLevelIndexes.add(i);
            badLevelIndexes.add(i + 1);
        } else if (!isIncreasing && row[i] <= row[i + 1]) {
            badLevelIndexes.add(i);
            badLevelIndexes.add(i + 1);
        }

        if (![1,2,3].includes(Math.abs(Number(row[i]) - Number(row[i + 1])))) {
            badLevelIndexes.add(i);
            badLevelIndexes.add(i + 1);
        }
    }
 
    return {
        badLevelIndexes
    };
}