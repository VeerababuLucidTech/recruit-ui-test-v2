import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import ReusableInputField from '../../ReusableInputField';
import RequiredLabel from '../../RequiredLabel';
import { getDropdownOptions } from '../../../services/CompaniesServices';


const validationSchema = Yup.object().shape({
    // firstName: Yup.string().required('First Name is required'),
    // lastName: Yup.string(),
    // emailID: Yup.string().email('Invalid email').required('Email is required'),
    // emailType: Yup.string().required('Required'),
    // phoneNumber: Yup.string().required('Phone Number is required'),
    // phoneType: Yup.string().required('Required'),
    // role: Yup.string().required('Role is required')
});

const AddUser = ({ onPrevious, onSubmit }) => {
    const [options, setOptions] = useState();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            role: '',
            emailID: '',
            emailType: '',
            phoneNumber: '',
            phoneType: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
            console.log("Add User ", values)
        },
    });


    useEffect(() => {
        getDropdownOptions()
            .then((options) => {
                setOptions(options);
            })
    }, []);

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="text-center">
                    <h4>Add Users</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing</p>
                </div>            <div className='flex flex-wrap gap-3 p-fluid'>
                    <div className="row mb-2">
                        <div className="flex-auto col-md-6">
                            <ReusableInputField label="First Name" required
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="First Name"
                                className={formik.errors.firstName && formik.touched.firstName ? 'p-invalid' : ''}
                            />
                            {formik.errors.firstName && formik.touched.firstName && (
                                <small className="p-error">{formik.errors.firstName}</small>
                            )}
                        </div>
                        <div className="flex-auto col-md-6">
                            <ReusableInputField label="Last Name" required
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Last Name"
                                className={formik.errors.lastName && formik.touched.lastName ? 'p-invalid' : ''}
                            />
                            {formik.errors.lastName && formik.touched.lastName && (
                                <small className="p-error">{formik.errors.lastName}</small>
                            )}
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <ReusableInputField label="Role" required name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="---"
                            className={formik.errors.role && formik.touched.role ? 'p-invalid' : ''}
                        />
                        {formik.errors.role && formik.touched.role && (
                            <small className="p-error">{formik.errors.role}</small>
                        )}
                    </div>

                    <div className='row mb-3'>
                        <div className="flex-auto col-md-6">
                            <ReusableInputField label="Email ID" required
                                name="emailID"
                                value={formik.values.emailID}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="---"
                                className={formik.errors.emailID && formik.touched.emailID ? 'p-invalid' : ''}
                            />
                            {formik.errors.emailID && formik.touched.emailID && (
                                <small className="p-error">{formik.errors.emailID}</small>
                            )}
                        </div>
                        <div className="flex-auto col-md-6">
                            <RequiredLabel label="Email Type" required />
                            <Dropdown
                                name="emailType"
                                value={formik.values.emailType}
                                options={options}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="---"
                                className={formik.errors.emailType && formik.touched.emailType ? 'p-invalid' : ''}
                            />
                            {formik.errors.emailType && formik.touched.emailType && (
                                <small className="p-error">{formik.errors.emailType}</small>
                            )}
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className="flex-auto col-md-6">
                            <RequiredLabel label="Phone Number" required />
                            <InputMask
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Phone Number"
                                mask="(999) 999-9999"
                                className={formik.errors.phoneNumber && formik.touched.phoneNumber ? 'p-invalid' : ''}
                            />
                            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                                <small className="p-error">{formik.errors.phoneNumber}</small>
                            )}
                        </div>
                        <div className="flex-auto col-md-6">
                            <RequiredLabel label="Phone Type" required />
                            <Dropdown
                                name="phoneType"
                                value={formik.values.phoneType}
                                options={options}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="---"
                                className={formik.errors.phoneType && formik.touched.phoneType ? 'p-invalid' : ''}
                            />
                            {formik.errors.resource && formik.touched.phoneType && (
                                <small className="p-error">{formik.errors.phoneType}</small>
                            )}
                        </div>
                    </div>
                </div>
                <div className='p-mb-4 form-btns' >
                    <Button label='Previous' className='mr-2 company-secondary-btn' onClick={() => onPrevious("addCompanyDocument")} />
                    <Button label='Submit' className=' company-primary-btn' type='submit' />
                </div>
            </form>
        </>
    );
};

export default AddUser;
