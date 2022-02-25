const API_URL = 'http://127.0.0.1:4000'

const QUERY = "query taskLists($username: String!) { taskLists(where: { owner: { username: $username } }) { id title}}"
export default function todoLists (username, token) {
    return fetch(API_URL, {
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
            throw(jsonResponse.errors[0].message)
        }
        return jsonResponse.data.taskLists
    })
    .catch(error => {
        throw error
    })
}