import { ApiUrl } from "./baseApi"

const QUERY = "mutation createTasks($username: String!, $taskTitle: String!) { createTaskLists(input: { title: $taskTitle owner: { connect: { where: { username: $username } } }}) {taskLists { id title } } }"

export default function AddTask (username, title, token) {
    return fetch(ApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            query: QUERY,
            variables: {
                username: username,
                taskTitle: title
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
        return jsonResponse.data.createTaskLists.taskLists[0]
    })
    .catch(error => {
        throw error
    })
}