import { string, object, number, ref } from "yup"

export const checkoutSchema = object().shape({
    name: string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(30, "Name must be within 30 characters")
        .required("Name is required"),

    street: string()
        .min(4, "Please describe more about your area")
        .max(255, "Street must be within 255 characters")
        .required("Street is required"),

    landmark: string()
        .max(255, "Landmark must be within 30 characters")
        .required("Landmark is required"),

    mobile: number()
        .min(999999999, "Invalid mobile number")
        .max(9999999999, "Invalid mobile number")
        .required("Mobile number is required")
})

export const updateProfileSchema = object().shape({
    name: string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(30, "Name must be within 30 characters")
        .required("Name is required")
})

export const loginSchema = object().shape({
    email: string().required("Email is required"),
    password: string().required("Password is required")
})

export const registerSchema = object().shape({
    name: string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(30, "Name must be within 30 characters")
        .required("Name is required"),

    email: string()
        .max(30, "Email must be within 30 characters")
        .required("Email is required"),

    password: string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be within 30 characters")
        .required("Password is required"),

    confirmPassword: string()
        .required("Please confirm your password")
        .oneOf([ref("password"), null], "Password mismatch")
})