import { ApiUrl } from "./baseApi"

const QUERY = "query taskLists($username: String!) { taskLists(where: { owner: { username: $username } }) { id title}}"

export default function todoLists (username, token) {
    return fetch(ApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: QUERY,
            variables: {
                username: username
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
        return jsonResponse.data.taskLists
    })
    .catch(error => {
        throw error
    })
}