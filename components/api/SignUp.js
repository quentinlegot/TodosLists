import { ApiUrl } from "./baseApi"

const SIGN_UP =
  'mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}'

export default function signUp (username, password) {
    return fetch(ApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: SIGN_UP,
            variables: {
                username: username,
                password: password
            }
        })
    })
    .then(response => {
        return response.json()
    })
    .then(jsonResponse => {
        if (jsonResponse.errors != null){
            throw(jsonResponse.errors[0])
        }
        return jsonResponse.data.signUp
    })
    .catch(error => {
        throw error
    })
}