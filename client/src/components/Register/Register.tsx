import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Register.scss";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password should be 8 chars minimum.")
    .required("Required"),
});

const Register = () => {
  const history = useHistory();
  return (
    <div className="signup-form">
      <h1>Signup</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={async (values, { setFieldError }) => {
          try {
            await axios.post("/signup", values);

            history.push("/login");
          } catch (err) {
            setFieldError("email", "Email already exists");
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
            <p onClick={() => history.push("/login")} className="link-redirect">
              Login
            </p>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
