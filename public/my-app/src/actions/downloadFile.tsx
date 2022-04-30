import { SERVER_API } from "../config"

const downloadFile = async (trackID: string, nameFile: string) => {
    try {
        const request = await fetch(`${SERVER_API}/tracks/download/${trackID}`)

        if (!request.ok) {
            const dataError = await request.json()
            return alert(dataError.message)
        }


        const res = await request.blob()


        const url = window.URL.createObjectURL(res)
        const tempLink = document.createElement('a');
        tempLink.href = url;
        tempLink.setAttribute('download', nameFile);
        tempLink.click();
        tempLink.remove()

    } catch(e) {
        console.log(e)
        alert("Произошла ошибка")
    }
}

export default downloadFile