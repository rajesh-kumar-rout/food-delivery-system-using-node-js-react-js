import { number, object, string } from "yup"

export const editSettingSchema = object().shape({
    deliveryFee: number().required("Delivery fee is required"),

    gstPercentage: number().required("Gst percentage is required"),
})

export const categorySchema = object().shape({
    name: string()
        .trim()
        .max(30, "Name must be within 30 characters")
        .required("Name is required")
})

export const foodSchema = object().shape({
    name: string()
        .trim()
        .required("Name is required")
        .max(50, "Name must be within 100 characters"),

    price: number()
        .required("Price is required")
        .positive()
        .integer(),

    categoryId: number().required("Please select a category")
})
