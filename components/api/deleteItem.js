import { ApiUrl } from "./baseApi"

const QUERY = "mutation($id: ID!) { deleteTaskLists(where: { id: $id }) {nodesDeleted}}"

export default function deleteTasksList (id, token) {
    return fetch(ApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: QUERY,
            variables: {
                id: id
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
        return jsonResponse.data.deleteTaskLists.nodesDeleted
    })
    .catch(error => {
        throw error
    })
}