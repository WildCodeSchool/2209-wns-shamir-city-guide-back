import { gql } from "apollo-server";

// GraphQL api requests
export const GET_ALL = gql`
            query GetAllTypes {
                getAllTypes {
                    id
                    name  
                    logo
                    color 
                }
            }
        `;

export const GET_TYPE_BY_ID = gql`
            query GetTypeById($id: Float!) {
                getTypeById (id: $id) {
                    id
                    name  
                    logo
                    color 
                }
            }
        `;

export const GET_TYPE_BY_NAME = gql`
            query GetTypeByName($name: String!) {
                getTypeByName (name: $name) {
                    id
                    name  
                    logo
                    color 
                }
            }
        `;

export const CREATE_TYPE = gql`
            mutation CreateType($type: TypeType!) {
                createType(type: $type) {
                    id
                    name
                    logo
                    color
                }
            }
        `;

export const UPDATE_TYPE = gql`
        mutation UpdateType($type: TypeType!) {
            updateType(type: $type) {
                id 
                name
                logo
                color
            }
        }
    `;

export const DELETE = gql`
        mutation DeleteTtpe($deleteTypeId: Float!) {
            deleteType (id: $deleteTypeId) {
                name  
                logo
                color 
            }
        }
    `;