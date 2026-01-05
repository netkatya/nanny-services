import { AppointmentFormData } from "@/types/nanny";
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

export const appointmentSchema: yup.ObjectSchema<AppointmentFormData> =
  yup.object({
    address: yup.string().required("Address is required"),
    phone: yup
      .string()
      .matches(/^\+?\d{10,15}$/, "Invalid phone number")
      .required("Phone is required"),
    childAge: yup.string().required("Child's age is required"),
    time: yup.string().required("Time is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    parentName: yup.string().required("Parent name is required"),
    comment: yup.string().optional(),
  }) as yup.ObjectSchema<AppointmentFormData>;
