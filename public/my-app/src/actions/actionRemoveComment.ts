import { SERVER_API } from "../config"

export const actionRemoveComment = async (commentID: string) => {

    const token = localStorage.getItem("currentUserToken")

    if (!token) {
       alert("Вы не авторизованы")
       return 
    }

    const request = await fetch(`${SERVER_API}/tracks/remove-comment/${commentID}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })

    if (!request.ok) {
        const dataError = await request.json()
        alert(dataError.message)
        return
    }

    const data = await request.json()
    console.log(data)

    return

}