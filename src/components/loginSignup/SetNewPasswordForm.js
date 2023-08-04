import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import RequiredLabel from '../RequiredLabel';
import { Messages } from 'primereact/messages';
import * as Yup from 'yup';

const SetNewPasswordForm = ({ handleBackToLogin }) => {
    const msgs = useRef(null);

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            newPassword: Yup.string().required('New password is required').min(6, 'Password must be at least 6 characters'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: async (values) => {
            try {
                // Simulate password reset process
                await new Promise((resolve) => setTimeout(resolve, 1000));
                msgs.current.show({ severity: 'success', detail: 'Password reset successful!' });

                // After success, navigate back to login page
                setTimeout(() => {
                    handleBackToLogin();
                }, 2000);
            } catch (error) {
                console.error('Failed to reset password:', error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="w-100 ps-5 pe-5">
            <div className="text-center">
                <h2 className="">Set New Password</h2>
            </div>
            <div className="p-fluid flex flex-wrap gap-3 ps-5 pe-5">
                <Messages ref={msgs} />
                <div className="flex-auto pb-3">
                    <RequiredLabel label="New Password" required />
                    <InputText
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.newPassword}
                        className={formik.errors.newPassword && formik.touched.newPassword ? 'p-invalid' : ''}
                    />
                    {formik.errors.newPassword && formik.touched.newPassword && (
                        <small className="p-error">{formik.errors.newPassword}</small>
                    )}
                </div>
                <div className="flex-auto pb-3">
                    <RequiredLabel label="Confirm Password" required />
                    <InputText
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        className={formik.errors.confirmPassword && formik.touched.confirmPassword ? 'p-invalid' : ''}
                    />
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                        <small className="p-error">{formik.errors.confirmPassword}</small>
                    )}
                </div>
                <div className="flex-auto pb-2 mt-2">
                    <Button type="submit" label="Reset Password" className="p-button-success company-primary-btn" />
                </div>
            </div>
            {/* <div className="text-center mt-3">
                <Button onClick={handleBackToLogin} label="Back to Login" className="p-button-secondary" />
            </div> */}
        </form>
    );
};

export default SetNewPasswordForm;
