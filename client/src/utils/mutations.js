import {gql} from "@apollo/client"
// this is the mutation to log in the user my getting the email and password as a string
export const LOGIN_USER = gql `
    mutation login ($email:String!, $password:String!) {
        login(email: $email, password: $password) {
            token
            user{
                _id
                username
            }
        }
    }
`;
// adding a user that requires email, username and password
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser (username: $username, email: $email, password: $password){
            token
            user{
                _id
                username
                email
            }
        }
    } 
`;
// saves book on user collection
export const SAVE_BOOK = gql`
    mutation saveBook($userInput: UserInput!) {
        saveBook(userInput: $userInput){
            _id
            username
            bookCount
            saveBooks{
                bookId
                authors
                image
                link
                title
                description
            }
            
        }
    }
`;


// removes the book from user collection 
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                image
                description
                title
                link
            }
        }
}
`