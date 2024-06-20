import { gql } from "@apollo/client";
// this will execute the me query 
export const GET_ME = gql`
    me {
        _id
        username
        email
        saveBooks {
            bookId
            authors 
            description 
            title 
            image 
            link
            }
}
`;