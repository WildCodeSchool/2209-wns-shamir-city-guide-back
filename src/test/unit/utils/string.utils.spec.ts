import * as stringUtils from "../../../utils/string.utils";

test('Convert a string xxxxx to Xxxxx', () => {
    expect(stringUtils.formatString('hello')).toBe('Hello');
});