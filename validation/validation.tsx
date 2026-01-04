import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("This field is required"),
  password: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .required("This field is required"),
});

export const regSchema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Only letters are allowed")
    .min(2, "Must be at least 2 characters")
    .required("This field is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("This field is required"),
  password: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .required("This field is required"),
});
