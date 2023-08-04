import React, { useRef } from 'react';
import { useFormik } from 'formik'; // Import useFormik
import { Link } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import RequiredLabel from '../RequiredLabel';
import { Messages } from 'primereact/messages';
import * as Yup from 'yup';
import { checkEmailAvailability } from '../../services/LoginServices';

const ForgotPasswordForm = ({ handleBackToLogin, handleOTPVerificationStep }) => {
    const msgs = useRef(null);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
        }),
        onSubmit: async (values) => {
            try {
                const isEmailAvailable = await checkEmailAvailability(values.email);
                if (isEmailAvailable) {
                    msgs.current.show({ severity: 'success', detail: 'Password reset email sent!' });
                    handleOTPVerificationStep(); // Updated to transition to OTPVerificationForm
                } else {
                    msgs.current.show({ severity: 'error', detail: 'Email not found in users data' });
                }
            } catch (error) {
                console.error('Failed to send password reset email:', error);
            }

            formik.resetForm();
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="w-100 ps-5 pe-5">
            <div className="text-center">
                <h2 className="">Forgot your password?</h2>
                <p className="">We'll help you reset it and get back on track</p>
            </div>
            <div className="p-fluid flex flex-wrap gap-3 ps-5 pe-5">
                <Messages ref={msgs} />
                <div className="flex-auto pb-3">
                    <RequiredLabel label="Email" required />
                    <InputText
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className={formik.errors.email && formik.touched.email ? 'p-invalid' : ''}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <small className="p-error">{formik.errors.email}</small>
                    )}
                </div>
                <div className="flex-auto pb-2 mt-2">
                    <Button type="submit" label="Reset Password" className="p-button-success company-primary-btn" />
                </div>
                <div className="flex-auto flex flex-wrap">
                    <div className="text-center">
                        Already have an account?
                        <Link onClick={handleBackToLogin} className="">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
