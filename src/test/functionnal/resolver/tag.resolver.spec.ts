import { ApolloServer, gql } from "apollo-server";
import { startAppoloServer } from "../../../loader/appolo-server.loader";
import { DatabaseLoader } from "../../../loader/database.loader";

import { 
    idEqual0Error, 
    nameTooShortError, 
    nameTooLongError, 
    iconTooLongError 
} from "../../../validator/tag.validator";


describe("Tag resolver", () => {
    let server: ApolloServer;

    beforeAll(async () => {
        await DatabaseLoader.openConnection();
        server = await startAppoloServer();
    });
    
    it("Should retrieve a tag by its id", async () => {

        const getTagById = gql`
            query GetTagById($id: Float!) {
                getTagById (id: $id) {
                    id
                    name  
                    icon 
                }
            }
        `;

        const test1 = await server.executeOperation({
            query: getTagById,
            variables: {id: 1}
        })

        expect(test1.errors).toBeUndefined();
        expect(test1.data?.getTagById).toBeDefined();


        const test2 = await server.executeOperation({
            query: getTagById,
            variables: {id: 0}
        })
        console.log("test2  =>", test2.errors);
        if (test2?.errors) {
            console.log("test2 Message =>", test2?.errors[0]?.message);
        }
        
        expect(test2.errors).toBeDefined();
        expect(test2.data?.getTagById).toBeUndefined();
        if (test2.errors) expect(test2?.errors[0]?.message).toBe(idEqual0Error);
    });
});