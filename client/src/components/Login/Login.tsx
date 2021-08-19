import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Login.scss";
import { Dispatch, SetStateAction } from "react";
import { UserInterface } from "../../App";

interface LoginProps {
  setUser: Dispatch<SetStateAction<UserInterface | undefined>>;
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password should be 8 chars minimum.")
    .required("Required"),
});

const Login = ({ setUser }: LoginProps) => {
  const history = useHistory();
  return (
    <div className="login-form">
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { setFieldError }) => {
          // same shape as initial values
          try {
            await axios.post("/login", values);
            setUser(values);
            history.push("/url-list");
          } catch (err) {
            setFieldError("email", "Email does not exist, you should register");
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-field">
              <Field name="email" />
              {errors.email && touched.email ? (
                <div className="error-field">{errors.email}</div>
              ) : null}
            </div>
            <div className="form-field">
              <Field name="password" />
              {errors.password && touched.password ? (
                <div className="error-field">{errors.password}</div>
              ) : null}
            </div>
            <p
              onClick={() => history.push("/register")}
              className="link-redirect"
            >
              Register
            </p>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
