import { createReadStream } from 'node:fs';

const stream = createReadStream('src/day-three/input.txt');
stream.on('data', (chunk) => {
  console.log(chunk.toString());
});