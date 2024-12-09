import * as fs from 'fs';
import { calculateAbsoluteDifference, calculateSimilarityScore } from '../helpers';

fs.readFile('src/input.txt', function(err, data) {
    let rows = data.toString().split('\n');
  
    return {
        similarityScore: calculateSimilarityScore(rows),
        absoluteDifference: calculateAbsoluteDifference(rows)
    };
});