/**
 * @param {string} errorMessage the database error message
 * @returns {string}            the key/field responsible for the error
*/
export const retrieveKeyFromDbErrorMessage = (errorMessage: string): string =>
    errorMessage.replace(/\(|\)|Key/g, "").split("=")[0].trim();  