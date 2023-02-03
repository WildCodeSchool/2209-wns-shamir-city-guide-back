import { gql } from "apollo-server";

// GraphQL api requests
export const GET_ALL = gql`
            query GetAllPoi {
                getAllPoi {
                    id
                    name  
                    address
                    latitude
                    longitude
                    picture
                }
            }
        `;

export const GET_POI_BY_ID = gql`
            query GetPoiById($id: Float!) {
                getPoiById (id: $id) {
                    id
                    name  
                    address
                    latitude
                    longitude
                    picture
                }
            }
        `;

export const GET_POI_BY_NAME = gql`
            query GetPoiByName($name: String!) {
                getPoiByName (name: $name) {
                    id
                    name  
                    address
                    latitude
                    longitude
                    picture
                }
            }
        `;

export const CREATE_POI = gql`
            mutation CreatePoi($poi: PoiType!) {
                createPoi(poi: $poi) {
                    id
                    name  
                    address
                    latitude
                    longitude
                    picture
                }
            }
        `;

export const UPDATE_POI = gql`
            mutation UpdatePoi($poi: PoiType!) {
                updatePoi(poi: $poi) {
                    id
                    name  
                    address
                    latitude
                    longitude
                    picture
                }
            }
        `;

export const DELETE = gql`
        mutation DeletePoi($deletePoiId: Float!) {
            deletePoi (id: $deletePoiId) {
                name   
            }
        }
    `;