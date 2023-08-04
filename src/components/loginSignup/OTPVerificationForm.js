import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import RequiredLabel from '../RequiredLabel';
import { Messages } from 'primereact/messages';
import * as Yup from 'yup';

const OTPVerificationForm = ({ handleSetNewPasswordStep }) => {
    const msgs = useRef(null);
    const [isOTPValid, setIsOTPValid] = useState(false);

    const formik = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: Yup.object({
            otp: Yup.string().length(6, 'Verification Code must be exactly 6 characters').required('Verification Code is required'),
        }),
        onSubmit: async (values) => {
            // For simplicity, we will assume the default Verification Code is '123456'
            if (values.otp === '123456') {
                setIsOTPValid(true);
                msgs.current.show({ severity: 'success', detail: 'Verification Code verified!' });
                handleSetNewPasswordStep();
            } else {
                setIsOTPValid(false);
                msgs.current.show({ severity: 'error', detail: 'Invalid Verification Code' });
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="w-100 ps-5 pe-5">
            <div className="text-center">
                <h2 className="">Verification Code</h2>
                <p className="">Please enter the verification code sent to your email</p>
            </div>
            <div className="p-fluid flex flex-wrap gap-3 ps-5 pe-5">
                <Messages ref={msgs} />

                <div className="flex-auto pb-3">
                    <RequiredLabel label="Verification Code" required />
                    <InputText
                        id="otp"
                        name="otp"
                        type="text"
                        placeholder="999999"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.otp}
                        className={formik.errors.otp && formik.touched.otp ? 'p-invalid' : ''}
                    />
                    {formik.errors.otp && formik.touched.otp && <small className="p-error">{formik.errors.otp}</small>}
                </div>
                <div className="flex-auto pb-2 mt-2">
                    <Button type="submit" label="Verify Code" className="p-button-success company-primary-btn" />
                </div>
            </div>
        </form>
    );
};

export default OTPVerificationForm;
