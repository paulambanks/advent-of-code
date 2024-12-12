import { readFileSync } from 'fs';


const getRulesMap = () => {
    const lines = readFileSync('./rules.txt', 'utf8')
        .split('\n')
        .map((line) => line.split('|'));

    const firstItems = new Set(lines.map((line) => line[0]));
    const rulesMap = new Map<string, Set<string>>();
    for (const firstItem of firstItems) {
        const secondItems = new Set(lines.filter((line) => line[0] === firstItem).map((line) => line[1]));
        rulesMap.set(firstItem, secondItems);
    }
    return rulesMap;
}

const addUpMiddlePages = (pageLines: string[][]) => {
    let total = 0;
    for (const pageLine of pageLines) {
        const middleItem = pageLine[Math.floor(pageLine.length / 2)];
        total += parseInt(middleItem);
    }
    return total;
}

const validateInputLines = (inputLines: string[][]) => {
    const rulesMap = getRulesMap();
    const correctLines = [];
    const incorrectLines = [];

    for (const inputLine of inputLines) { 
        let correctPageLines = true;
        for (let i = 0; i < inputLine.length - 1; i++) {
            const pageLines = inputLine[i];
            for (let j = i + 1; j < inputLine.length; j++) {
                const nextPage = inputLine[j];
                if (rulesMap.get(nextPage)?.has(pageLines)) {
                    correctPageLines = false;
                    break;
                }
            }
        }
        if (correctPageLines) {
            correctLines.push(inputLine);
        } else {
            incorrectLines.push(inputLine);
        }
    }
    return [correctLines, incorrectLines];
}

const correctIncorrectLines = (incorrectLines: string[][]) => {
    const rulesMap = getRulesMap();
    const correctLines: string[][] = [];

    const reorderLine = (line: string[]): string[] => {
        for (let i = 0; i < line.length - 1; i++) {
            const pageLines = line[i];
            for (let j = i + 1; j < line.length; j++) {
                const nextPage = line[j];
                if (rulesMap.get(nextPage)?.has(pageLines)) {
                    [line[i], line[j]] = [line[j], line[i]];
                    return reorderLine(line);
                }
            }
        }
        return line;
    };

    for (const incorrectLine of incorrectLines) {
        const reorderedLine = reorderLine(incorrectLine.slice());
        correctLines.push(reorderedLine);
    }

    return correctLines;
}

const processPages = () => {
    const inputLines = readFileSync('./input.txt', 'utf8')
        .split('\n')
        .map((line) => line.split(','));

    const [correctLines, incorrectLines] = validateInputLines(inputLines);

    const correctLinesTotal = addUpMiddlePages(correctLines);
    console.log(`Correct lines total: ${correctLinesTotal}`);

    const correctedIncorrectLines = correctIncorrectLines(incorrectLines);
    const [newCorrectLines, ] = validateInputLines(correctedIncorrectLines);
    console.log(`New corrected lines total: ${addUpMiddlePages(newCorrectLines)}`);
}

processPages();


