import { loadTagData } from "../../database/entity/tag.test.database";

describe("integration/database/tag.test.database.spec suite of tests", () => {
    it(`Should console.log a message 'No metadata for "Tag" was found.' when trying to load tags data for testing without establish a database connection before`, async () => {
        await loadTagData();
    })
})