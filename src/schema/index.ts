import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email!")
    .required("Email is required!"),
  password: Yup.string().trim().required("Password is required!"),
});

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("First name is required!"),
  lastName: Yup.string().trim().required("Last name is required!"),
  email: Yup.string()
    .trim()
    .email("Invalid email!")
    .required("Email is required!"),
  password: Yup.string()
    .trim()
    .min(7, "Password must be at least 7 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/\d/, "Password must contain at least one number.")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character."
    )
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required!"),
});
