import { gql } from "@apollo/client";
// this will execute the me query 
export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            savedBooks{
                bookId
                authors
                image
                description
                title
                link
            }
        }
    }
`;