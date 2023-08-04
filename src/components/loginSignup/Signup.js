import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { registerUser, checkUserExists } from '../../services/SignupServices';
import LoginImage from '../../../src/assets/LoginImage.jpg';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  contactNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Invalid contact number')
    .min(10, 'Contact number must be at least 10 digits')
    .required('Contact number is required'),
  // recaptcha: Yup.string().required('Please complete the reCAPTCHA'),
});

const Signup = () => {
  const handleSubmit = async (values, { resetForm }) => {
    // try {
    //   const newUser = await registerUser(values);
    //   console.log('User created:', newUser);
    //   resetForm();
    // } catch (error) {
    //   console.error('Failed to create user:', error);
    // }

    try {
      const userExists = await checkUserExists(values.email);
      if (userExists) {
        alert('Email is already registered');
        return;
      }

      const newUser = await registerUser(values);
      console.log('User created:', newUser);
      resetForm();
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  }

  const [verified, setVerified] = useState(false);
  const reCaptchaOnChange = () => {
    setVerified(true);
  };

  return (
    <>

      <div className="container-fluid d-flex vh-100 align-items-center">
        <div className="login-image col-md-6 d-none d-md-block">
          <img src={LoginImage} alt="Login" className="w-100 vh-100" />
        </div>
        <div className="login-form col-md-6 col-sm-12 d-flex justify-content-center align-items-center vh-100">
          <>
            <Formik
              initialValues={{
                fullName: '',
                email: '',
                password: '',
                contactNumber: '',
                recaptcha: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <h2 className="text-center">Signup </h2>

                <div className="p-field p-fluid mt-4 mb-4">
                  <span className="p-float-label">
                    <Field name="fullName" id="fullName" as={InputText} />
                    <label htmlFor="fullName">Full Name</label>
                  </span>
                  <ErrorMessage name="fullName" component="div" className="p-error" />
                </div>

                <div className="p-field p-fluid mb-4">
                  <span className="p-float-label">
                    <Field name="email" id="email" as={InputText} />
                    <label htmlFor="email">Business Email</label>
                  </span>
                  <ErrorMessage name="email" component="div" className="p-error" />
                </div>

                <div className="p-field p-fluid mb-4">
                  <span className="p-float-label">
                    <Field name="password" id="password" as={Password} />
                    <label htmlFor="password">Password</label>
                  </span>
                  <ErrorMessage name="password" component="div" className="p-error" />
                </div>

                <div className="p-field p-fluid mb-4">
                  <span className="p-float-label">
                    <Field name="contactNumber" id="contactNumber" as={InputText} />
                    <label htmlFor="contactNumber">Contact Number</label>
                  </span>
                  <ErrorMessage name="contactNumber" component="div" className="p-error" />
                </div>

                <div className="p-field p-fluid mb-4">
                  <ReCAPTCHA
                    className="recaptcha"
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={reCaptchaOnChange}
                  />
                  {/* <ErrorMessage name="recaptcha" component="div" className="p-error" /> */}
                </div>
                <div className='p-fluid mb-3 '>
                  <Button className='company-bg' type="submit" label="Signup" />
                </div>
                <p className='text-center '>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </Form>
            </Formik>
          </>
        </div>
      </div>
    </>

  );
};

export default Signup;
