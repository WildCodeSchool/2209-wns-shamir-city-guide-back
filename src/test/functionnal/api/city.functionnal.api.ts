import { gql } from "apollo-server";

// GraphQL api requests
export const GET_ALL = gql`
            query GetAllCities {
                getAllCities {
                    id
                    name  
                    latitude
                    longitude
                    picture
                    pointsOfInterest {
                        name
                    }
                }
            }
        `;

export const GET_CITY_BY_ID = gql`
            query GetCityById($id: Float!) {
                getCityById (id: $id) {
                    id
                    name  
                    latitude
                    longitude
                    picture
                    pointsOfInterest {
                        name
                    }
                }
            }
        `;

export const GET_CITY_BY_NAME = gql`
            query GetCityByName($name: String!) {
                getCityByName (name: $name) {
                    id
                    name  
                    latitude
                    longitude
                    picture
                    pointsOfInterest {
                        name
                    }
                }
            }
        `;

export const CREATE_CITY = gql`
            mutation CreateCity(
                $name: String!, 
                $latitude: String!, 
                $longitude: String!,
                $picture: String!
            ) {
                createCity (
                    name: $name, 
                    latitude: $latitude,
                    longitude: $longitude,
                    picture: $picture
                ) {
                    id
                    name  
                    latitude
                    longitude
                    picture
                }
            }
        `;

export const UPDATE_CITY = gql`
        mutation UpdateCity(
            $updateCityId: Float!, 
            $name: String!, 
            $latitude: String!, 
            $longitude: String!,
            $picture: String!
            ) {
            updateCity (
                id: $updateCityId, 
                name: $name, 
                latitude: $latitude,
                longitude: $longitude,
                picture: $picture
            ) {
                id
                name  
                latitude
                longitude
                picture
            }
        }
    `;

export const DELETE = gql`
        mutation DeleteCity($deleteCityId: Float!) {
            deleteCity (id: $deleteCityId) {
                name   
            }
        }
    `;