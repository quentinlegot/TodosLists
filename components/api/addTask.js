import { ApiUrl } from "./baseApi"

const QUERY = "mutation($content: String!, $taskListId: ID!) {createTasks(input: {content: $content, belongsTo: { connect: { where: { id: $taskListId } } }}) {tasks {id content done}}}"

export default function AddTask (content, taskListId, token) {
    return fetch(ApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: QUERY,
            variables: {
                content: content,
                taskListId: taskListId
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
        return jsonResponse.data.createTasks.tasks[0]
    })
    .catch(error => {
        throw error
    })
}