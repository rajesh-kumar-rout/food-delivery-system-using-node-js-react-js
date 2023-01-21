import { number, object } from "yup"

export const editSettingSchema = object().shape({
    deliveryFee: number().required("Delivery fee is required"),

    gstPercentage: number().required("Gst percentage is required"),
})