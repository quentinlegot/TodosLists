import { ApiUrl } from "./baseApi"

const QUERY = "query($task_id: ID!) {tasks(where: {belongsTo: {id: $task_id }}) {id content done}}"

export default function tasks (task_id, token) {
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
        return jsonResponse.data.tasks
    })
    .catch(error => {
        throw error
    })
}