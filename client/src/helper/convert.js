export default function convertToBase64(file){
    return new Promise((resolve, reject) => {
        // asynchronously read the content of file
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}