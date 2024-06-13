import { gql } from "@apollo/client";

export const SIGN_UP = gql`
    mutation SignUp($input: SignUpInput!) {
        signUp(input: $input) {
            _id
            username
            name
            profilePicture
            gender
        }
    }
`

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            _id
            username
            name
            profilePicture
            gender
        }
    }
`

export const LOGOUT = gql`
    mutation Logout {
        logout {
            message
        }
    }
`