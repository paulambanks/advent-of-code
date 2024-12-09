import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { once } from 'node:events';
import { softLevelCheck } from './helpers.js';

const removeLevel = (levels: Number[], levelIndex: number) => {
  const newLevels = [...levels];
  newLevels.splice(levelIndex, 1);
  return newLevels;
}

(async function processLineByLine() {
  try {
    const readline = createInterface({
      input: createReadStream('src/day-two/input.txt'),
      crlfDelay: Infinity,
    });

    let strictSafeLevels = 0;
    let safeLevels = 0;
    let lineCount = 0;
    readline
      .on('line', (line) => {
        lineCount++;
        const levels = line.split(' ').map((num) => Number(num));
        const softCheckResults = softLevelCheck(levels);
        if (softCheckResults.badLevelIndexes.size === 0 ) {
          strictSafeLevels++;
          safeLevels++;
        } else {
          for (const levelIndex of softCheckResults.badLevelIndexes) {
            const newLevels = removeLevel(levels, levelIndex);
            const newSoftCheckResults = softLevelCheck(newLevels);
            if (newSoftCheckResults.badLevelIndexes.size === 0) {
              safeLevels++;
              break;
            }
          }
        }
      })
      .on('close', () =>
        console.log(`File processed with ${safeLevels} safe levels out of ${lineCount} lines. Strictly ${strictSafeLevels} safe levels.`)
      );

    await once(readline, 'close');

    console.log('File processed.');
  } catch (err) {
    console.error(err);
  }
})(); 