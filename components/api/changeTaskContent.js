import { ApiUrl } from "./baseApi"

const QUERY = "mutation($task_id: ID!, $new_content: String!, $new_done: Boolean!) {updateTasks(where: { id: $task_id }, update: { content: $new_content, done: $new_done }) {tasks {id content done}}}"

export default function updateTask (task_id, new_content, new_done, token) {
    return fetch(ApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: QUERY,
            variables: {
                task_id: task_id,
                new_content: new_content,
                new_done: new_done
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
        return jsonResponse.data.updateTasks.tasks[0]
    })
    .catch(error => {
        throw error
    })
}