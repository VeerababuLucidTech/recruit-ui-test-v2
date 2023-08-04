import React from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import RequiredLabel from '../../RequiredLabel';

const validationSchema = Yup.object().shape({
    authSignataryFn: Yup.string().required('First Name is required'),
    authSignataryLn: Yup.string(),
    authSignataryEmail: Yup.string().email('Invalid email').required('Email is required'),
    authSignataryPhone: Yup.string().required('Phone Number is required'),
});

const ContactDetails = ({ onNext, onPrevious }) => {
        const formik = useFormik({
        initialValues: {
            authSignataryFn: '',
            authSignataryLn: '',
            authSignataryEmail: '',
            authSignataryPhone: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onNext("address", {contactDetails: values});
            console.log("Contact Details", {contactDetails: values})
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="text-center">
                    <h4>Contact Details</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing</p>
                </div>                <div className='flex flex-wrap gap-3 p-fluid'>
                    <div className="row mb-2">
                        <div className="flex-auto col-md-6">
                            <RequiredLabel label="Auth.Signatory First Name (CEO or President)" required />
                            <InputText
                                id="authSignataryFn"
                                name="authSignataryFn"
                                value={formik.values.authSignataryFn}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="First Name"
                                className={formik.errors.authSignataryFn && formik.touched.authSignataryFn ? 'p-invalid' : ''}
                            />
                            {formik.errors.authSignataryFn && formik.touched.authSignataryFn && (
                                <small className="p-error">{formik.errors.authSignataryFn}</small>
                            )}
                        </div>

                        <div className="flex-auto col-md-6">
                            <RequiredLabel label="Last Name" required />
                            <InputText
                                id="authSignataryLn"
                                name="authSignataryLn"
                                value={formik.values.authSignataryLn}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Last Name"
                                className={formik.errors.authSignataryLn && formik.touched.authSignataryLn ? 'p-invalid' : ''}
                            />
                            {formik.errors.authSignataryLn && formik.touched.authSignataryLn && (
                                <small className="p-error">{formik.errors.authSignataryLn}</small>
                            )}
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className="flex-auto col-md-6">
                            <RequiredLabel label="Auth.Signatory Email (CEO or President)" required />
                            <InputText
                                id="authSignataryEmail"
                                name="authSignataryEmail"
                                value={formik.values.authSignataryEmail}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="email@tech.com"
                                className={formik.errors.authSignataryEmail && formik.touched.authSignataryEmail ? 'p-invalid' : ''}
                            />
                            {formik.errors.authSignataryEmail && formik.touched.authSignataryEmail && (
                                <small className="p-error">{formik.errors.authSignataryEmail}</small>
                            )}
                        </div>
                        <div className="flex-auto col-md-6">
                            <RequiredLabel label="Auth.Signatory Phone (CEO or President)" required />
                            <InputMask
                                id="authSignataryPhone"
                                name="authSignataryPhone"
                                value={formik.values.authSignataryPhone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Phone Number"
                                mask="(999) 999-9999"
                                size="small"
                                className={formik.errors.authSignataryPhone && formik.touched.authSignataryPhone ? 'p-invalid' : ''}
                            />
                            {formik.errors.authSignataryPhone && formik.touched.authSignataryPhone && (
                                <small className="p-error">{formik.errors.authSignataryPhone}</small>
                            )}
                        </div>
                    </div>
                </div>
                <div className='p-mt-4 form-btns'>
                    <Button className='mr-2 company-secondary-btn' label='Previous' onClick={() => onPrevious("companyProfile")} />
                    <Button className='company-primary-btn' label='Next' type='submit' />
                </div>
            </form>
        </>

    );
};

export default ContactDetails;
