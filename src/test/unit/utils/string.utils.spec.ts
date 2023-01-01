import * as StringUtils from "../../../utils/string.utils";
 

describe("unit/utils/string.utils suite of tests", () => {
    it('StringUtils.retrieveKeyFromDbErrorMessage : Drop the property which has to be unique in database from the error message', () => {
        expect(StringUtils.retrieveKeyFromDbErrorMessage('Key (name)=(C++) already exists.')).toBe('name');
        expect(StringUtils.retrieveKeyFromDbErrorMessage('Key (name)=(Paris) already exists.')).toBe('name');
        expect(StringUtils.retrieveKeyFromDbErrorMessage('Key (title)=(Paris) already exists.')).toBe('title');
    });
    
    it('StringUtils.formatString : Convert a string xxxxx to Xxxxx', () => {
        expect(StringUtils.formatString('hello')).toBe('Hello');
        expect(StringUtils.formatString('hEllo')).toBe('HEllo');
        expect(StringUtils.formatString('Hello')).toBe('Hello');
        expect(StringUtils.formatString(' h e l l O')).toBe('H e l l O');
        expect(StringUtils.formatString(' à mes amis ')).toBe('À mes amis');
        expect(StringUtils.formatString('un nom de tag')).toBe('Un nom de tag');
        expect(StringUtils.formatString('un nom de ville ')).toBe('Un nom de ville');
        expect(StringUtils.formatString(' un nom de ville avec des espaces à  enlever ')).toBe('Un nom de ville avec des espaces à  enlever');
        expect(StringUtils.formatString('44    ')).toBe('44');
        expect(StringUtils.formatString('      4, , 4  ')).toBe('4, , 4');
        expect(StringUtils.formatString('vitry-Sur-Seine')).toBe('Vitry-Sur-Seine');
    });
});