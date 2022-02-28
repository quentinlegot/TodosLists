import { ApiUrl } from "./baseApi"

const QUERY = "mutation($task_id: ID!) {deleteTasks(where: { id: $task_id }) {nodesDeleted}}"

export default function deleteTask (task_id, token) {
    return fetch(ApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: QUERY,
            variables: {
                task_id: task_id
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
        return jsonResponse.data.deleteTasks.nodesDeleted
    })
    .catch(error => {
        throw error
    })
}