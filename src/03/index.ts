import * as fs from 'fs';

export const lessAccurateSum = (file: string) => {
  const mulRegex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/gu;
  let match;
  let sum = 0;
  while ((match = mulRegex.exec(file)) !== null) {
    sum += Number(match[1]) * Number(match[2]);
  }
  return sum;
}

export const moreAccurateSum = (file: string) => {
  const chunkRegex = /(do(?:n't)?\(\))/gu;
  const mulRegex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;
  let sum = 0;
  let match;

  let previousChunk = '';
  for (const chunk of file.split(chunkRegex)) {
    if (chunk === "don't()" || chunk === "do()") {
      previousChunk = chunk;
      continue;
    }
    if (previousChunk === 'do()' || previousChunk === '') { 
      while ((match = mulRegex.exec(chunk)) !== null) {
        sum += Number(match[1]) * Number(match[2]);
      }
    }
  }
  return sum;
}

fs.readFile('./input.txt', function(err, data) {

  return {
    lessAccurateSum: lessAccurateSum(data.toString()),
    moreAccurateSum: moreAccurateSum(data.toString())
  };
});