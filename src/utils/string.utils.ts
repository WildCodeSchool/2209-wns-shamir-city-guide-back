/**
 * @param {string} errorMessage the database error message
 * @returns {string}            the key/field responsible for the error
*/
export const retrieveKeyFromDbErrorMessage = (errorMessage: string): string =>
    errorMessage.replace(/\(|\)|Key/g, "").split("=")[0].trim();  

/**
 * @param {string} stringToFormat the string to format, 'xxxXX' || 'xxxxxx'
 * @returns {string}            the formatted string => 'Xxxxxxx'
*/
export const formatString = (stringToFormat: string): string => {
    const str = stringToFormat.trim();  
    return str.charAt(0).toUpperCase() +  str.slice(1);
}