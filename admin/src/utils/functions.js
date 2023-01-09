export const getFormData = (values) => {
    const formData = new FormData()

    for (const key in values) {
        const value = Array.isArray(values[key]) ? JSON.stringify(values[key]) : values[key]
        formData.append(key, value)
    }

    return formData
}

export const getFileForm = (name, file) => {
    const formData = new FormData()
    formData.append(name, file)
    return formData
}