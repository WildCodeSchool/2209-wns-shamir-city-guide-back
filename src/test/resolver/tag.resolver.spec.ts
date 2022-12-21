import { gql } from "apollo-server";
import { DatabaseLoader } from "../../loader/database.loader";
import { startAppoloServer } from "../../loader/appolo-server.loader";


describe("Tag resolver", () => {
    it("Should retrieve a tag by its id", async () => {
        const server = await startAppoloServer();

        const getTagById = gql`
        
        `;
    })
})