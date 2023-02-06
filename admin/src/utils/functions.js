export const handleImage = async (event, setFieldValue) => {
    const file = event.target.files[0]

    if(file.size > 300000) {
        return event.target.setCustomValidity("File must be within 3kb")
    }

    event.target.setCustomValidity("")

    const reader = new FileReader()
    
    reader.readAsDataURL(file)

    reader.onload = () => {
        setFieldValue(event.target.name, reader.result)
    }
}

export const getBase64 = async (file) => {
    if(!file) return ""
    
    const reader = new FileReader()
    
    reader.readAsDataURL(file)

    return new Promise((resolve, reject) => {
        reader.onload = () => {
            resolve(reader.result)
        }
    })
}

export const currency = new Intl.NumberFormat('en-IN', {
    style: "currency",
    currency: "INR"
})
