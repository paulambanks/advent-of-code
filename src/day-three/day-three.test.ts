import { lessAccurateSum, moreAccurateSum } from './day-three';

describe('day-three', () => {
    it('should return the correct sum for less accurate', () => {
        expect(lessAccurateSum('mul(168,87)mul(911,800)(%,)where()#&&(^,^#)')).toBe(743416);
    });
    it('should return the correct sum for more accurate', () => {
        expect(moreAccurateSum("xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))")).toBe(48);
    });
});