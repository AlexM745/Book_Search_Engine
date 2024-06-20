import { gql } from "@apollo/client";
// this will execute the me query 
export const QUERY_ME = gql`
query me{ 
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