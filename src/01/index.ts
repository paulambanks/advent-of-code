import * as fs from 'fs';
import { calculateAbsoluteDifference, calculateSimilarityScore } from './helpers.js';

fs.readFile('./input.txt', function(err, data) {
    let rows = data.toString().split('\n');

    console.log(`Calculated absolute difference: ${calculateAbsoluteDifference(rows)}`);
    console.log(`Calculated similarity score: ${calculateSimilarityScore(rows)}`);
  
    return {
        similarityScore: calculateSimilarityScore(rows),
        absoluteDifference: calculateAbsoluteDifference(rows)
    };
});