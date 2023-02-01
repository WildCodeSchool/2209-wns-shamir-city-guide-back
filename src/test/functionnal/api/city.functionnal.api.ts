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
            mutation Mutation($city: CityType!) {
                createCity(city: $city) {
                    id
                    name  
                    latitude
                    longitude
                    picture
                }
            }
        `;

export const UPDATE_CITY = gql`
            mutation Mutation($city: CityType!) {
                updateCity(city: $city) {
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