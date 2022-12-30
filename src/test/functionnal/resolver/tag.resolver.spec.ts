import { ApolloServer, gql } from "apollo-server";
import { startAppoloServer } from "../../../loader/appolo-server.loader";
import { DatabaseLoader } from "../../../loader/database.loader";


describe("Tag resolver", () => {
    let server: ApolloServer;

    beforeAll(async () => {
        await DatabaseLoader.openConnection();
        server = await startAppoloServer();
    });
    
    it("Should retrieve a tag by its id", async () => {

        const getTagById = gql`
            query GetTagById {
                getTagById (id: 1) {
                    id
                    name  
                    icon 
                }
            }
        `;

        const response = await server.executeOperation({
            query: getTagById,
            variables: {id: 1}
        })
        console.log("response =>", response.data?.getTagById);
        
        //expect(response.errors).toBeUndefined();
        expect(response.data?.getTagById).toBeDefined();
    });
});