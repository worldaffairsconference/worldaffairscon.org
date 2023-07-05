import { inc } from '../lib/library';

describe('it should work', () => {
	it('increments the input', () => expect(inc(3)).toStrictEqual(4));
});
