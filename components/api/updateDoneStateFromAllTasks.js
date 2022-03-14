import { ApiUrl } from "./baseApi"

const QUERY = "mutation ($taskListId: ID!, $doneState: Boolean!) {updateTasks(where: {belongsTo: {id: $taskListId}}, update: {done: $doneState}) {tasks {id content done}}}"

export default function updateTasks (taskListId, doneState, token) {
    return fetch(ApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: QUERY,
            variables: {
                taskListId: taskListId,
                doneState: doneState
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
        return jsonResponse.data.updateTasks.tasks
    })
    .catch(error => {
        throw error
    })
}