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
export const formatString = (stringToFormat: string): string =>
    stringToFormat.charAt(0).toUpperCase() +  stringToFormat.slice(1);  