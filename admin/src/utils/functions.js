export const handleImage = async (event, setFieldValue) => {
    const file = event.target.files[0]

    if(file.size > 400000) {
        return event.target.setCustomValidity("File must be within 4kb")
    }

    event.target.setCustomValidity("")

    const reader = new FileReader()
    
    reader.readAsDataURL(file)

    reader.onload = () => {
        setFieldValue(event.target.name, reader.result)
    }
}

export const currency = new Intl.NumberFormat('en-IN', {
    style: "currency",
    currency: "INR"
})
