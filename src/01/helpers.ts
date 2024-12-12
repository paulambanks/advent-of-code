const getSortedColumns = (rows: string[]): Number[][] => {
    let column1: Number[] = [];
    let column2: Number[] = [];

    for(const row of rows) {
       const match = row.match(/(\d+)\s+(\d+)/);
        if (match) {
            column1.push(Number(match[1]));
            column2.push(Number(match[2]));
        }
    }

    column1.sort((a, b) => Number(a) - Number(b));
    column2.sort((a, b) => Number(a) - Number(b));

    return [column1, column2];
}

export const calculateAbsoluteDifference = (rows: string[]): Number => {
    const [column1, column2] = getSortedColumns(rows);

    let sum = 0;
    for(let i = 0; i < column1.length; i++) {
        sum += Math.abs(Number(column1[i]) - Number(column2[i]));
    }
    return sum;
}

export let calculateSimilarityScore = (rows: string[]): Number => {
    const [column1, column2] = getSortedColumns(rows);
    let sum = 0;
    for(let i = 0; i < column1.length; i++) {
        // how many time the number from 1st column is in the 2nd column
        const findAllCount = (column2.filter((value) => value === column1[i])).length;
        const similarityScore = findAllCount * Number(column1[i]);
        sum += similarityScore;
    }
    return sum;
};