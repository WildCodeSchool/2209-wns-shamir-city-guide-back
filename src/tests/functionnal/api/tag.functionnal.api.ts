import { gql } from "apollo-server";

// GraphQL api requests
export const GET_ALL = gql`
            query GetAllTags {
                getAllTags {
                    id
                    name  
                    icon 
                }
            }
        `;

export const GET_TAG_BY_ID = gql`
            query GetTagById($id: Float!) {
                getTagById (id: $id) {
                    id
                    name  
                    icon 
                }
            }
        `;

export const GET_TAG_BY_NAME = gql`
            query GetTagByName($name: String!) {
                getTagByName (name: $name) {
                    id
                    name  
                    icon 
                }
            }
        `;

export const CREATE_TAG = gql`
            mutation Mutation($tag: TagType!) {
                createTag(tag: $tag) {
                    id
                    name
                    icon
                }
            }
        `;

export const UPDATE_TAG = gql`
        mutation UpdateTag($tag: TagType!) {
            updateTag(tag: $tag) {
                id 
                name
                icon
            }
        }
    `;

export const DELETE = gql`
        mutation DeleteTag($deleteTagId: Float!) {
            deleteTag (id: $deleteTagId) {
                name  
                icon 
            }
        }
    `;