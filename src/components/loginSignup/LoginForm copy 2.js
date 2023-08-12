
import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Link, useNavigate } from 'react-router-dom';
import RequiredLabel from '../RequiredLabel';
import { Messages } from 'primereact/messages';
import { Password } from 'primereact/password';
import * as Yup from 'yup';
import { loginUser, checkEmailAvailability } from '../../services/LoginServices';

const LoginForm = ({ handleForgotPasswordClick }) => {
    const msgs = useRef(null);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),

        onSubmit: async (values) => {
            try {
                const isEmailAvailable = await checkEmailAvailability(values.email);
                if (!isEmailAvailable) {
                    msgs.current.show({ severity: 'error', detail: 'Invalid Email or Password...' });
                } else {
                    const isAuthenticated = await loginUser(values.email, values.password);
                    if (isAuthenticated) {
                        sessionStorage.setItem('token', '123');
                        navigate('/');
                    } else {
                        msgs.current.show({ severity: 'error', detail: 'Invalid Email or Password...' });
                    }
                }
            } catch (error) {
                console.error('Failed to log in:', error);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="w-100 ps-5 pe-5">
            <div className=' p-fluid flex flex-wrap gap-3 ps-5 pe-5'>
                <h2 className="text-center">EMS</h2>
                <div className="flex-auto p-fluid pb-2">
                    <Messages ref={msgs} />
                    <RequiredLabel label="Email" required />
                    <InputText
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className={formik.errors.email && formik.touched.email ? 'p-invalid' : ''}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <small className="p-error">{formik.errors.email}</small>
                    )}
                </div>
                <div className="flex-auto pb-2">
                    <RequiredLabel label="Password" required />
                    <Password
                        toggleMask
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className={formik.errors.password && formik.touched.password ? 'p-invalid' : ''}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <small className="p-error">{formik.errors.password}</small>
                    )}
                </div>

                <div className="flex-auto mt-2 pb-3 gap-3">
                    <div className="p-field-checkbox p-fluid float-start">
                        <Checkbox
                            className=""
                            inputId="rememberMe"
                            name="rememberMe"
                            onChange={formik.handleChange}
                            checked={formik.values.rememberMe}
                        />
                        <label htmlFor="rememberMe" className="p-checkbox-label ps-1">
                            Remember me
                        </label>
                    </div>
                    <div className="p-fluid float-end">
                        <Link onClick={handleForgotPasswordClick}>Forgot password?</Link>
                    </div>
                </div>
                <div className="p-fluid pb-3 mt-3">
                    <Button type="submit" label="Login" className="p-button-success company-primary-btn" />
                </div>
                <div className="p-fluid flex flex-wrap">
                    <div className="text-center">
                        Don't have an account?
                        <Link to="/signup" className=""> Apply Now</Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
