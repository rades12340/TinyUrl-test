import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import "./UrlShortenerPage.scss";

const UrlShortenerPageSchema = Yup.object().shape({
  longUrl: Yup.string()
    .url("You should enter valid url")
    .required("Required url for shortening"),
});

const UrlShortenerPage = () => {
  const [shortUrl, setShortUrl] = useState<string>("");
  return (
    <div className="url-shortener">
      <div className="signup-form">
        <h1>Url shortener</h1>
        <Formik
          initialValues={{
            longUrl: "",
          }}
          validationSchema={UrlShortenerPageSchema}
          onSubmit={async (values, props) => {
            try {
              const { data } = await axios.post("/url", values);
              setShortUrl(data.data.shortUrl);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-field">
                <Field name="longUrl" />
                {errors.longUrl && touched.longUrl ? (
                  <div className="error-field">{errors.longUrl}</div>
                ) : null}
              </div>

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
      {shortUrl && <p className="short-url">{shortUrl}</p>}
    </div>
  );
};

export default UrlShortenerPage;
