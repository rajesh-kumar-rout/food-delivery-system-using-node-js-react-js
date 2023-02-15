import { string, object, number, ref } from "yup"

export const checkoutSchema = object().shape({
    name: string()
        .trim()
        .max(30, "Name must be within 30 characters")
        .required("Name is required"),

    street: string()
        .trim()
        .max(255, "Street must be within 255 characters")
        .required("Street is required"),

    landmark: string()
        .trim()
        .max(255, "Landmark must be within 30 characters")
        .required("Landmark is required"),

    mobile: number()
        .min(999999999, "Invalid mobile number")
        .max(9999999999, "Invalid mobile number")
        .required("Mobile number is required"),

    building: string()
        .trim()
        .max(255, "Building must be within 30 characters")
        .required("Building or apartment is required"),

    instruction: string()
        .trim()
        .max(255, "Instruction must be within 30 characters")
})

export const updateProfileSchema = object().shape({
    name: string()
        .trim()
        .max(30, "Name must be within 30 characters")
        .required("Name is required"),

    email: string()
        .trim()
        .email("Invalid email")
        .max(30, "Email must be within 30 characters")
        .required("Email is required")
})

export const loginSchema = object().shape({
    email: string().email("Invalid email").required("Email is required"),

    password: string().required("Password is required")
})

export const registerSchema = object().shape({
    name: string()
        .trim()
        .max(30, "Name must be within 30 characters")
        .required("Name is required"),

    email: string()
        .trim()
        .email("Invalid email")
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

export const changePasswordSchema = object().shape({
    oldPassword: string()
        .min(6, "Invalid old password")
        .max(20, "Invalid old password")
        .required("Old password is required"),

    newPassword: string()
        .min(6, "New password must be at least 6 characters")
        .max(20, "New password must be within 20 characters")
        .required("New password is required"),

    confirmNewPassword: string()
        .required("Please confirm your new password")
        .oneOf([ref("newPassword")], "New password does not match"),
})