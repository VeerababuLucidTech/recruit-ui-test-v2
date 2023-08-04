import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import ReusableInputField from '../../ReusableInputField';
import RequiredLabel from '../../RequiredLabel';
import { Calendar } from 'primereact/calendar';
import { FileUpload } from 'primereact/fileupload';

const validationSchema = Yup.object().shape({
    documentName: Yup.string().required('Document Name is required'),
    docNumber: Yup.number().required('Number is required'),
    issuedDt: Yup.date().required('Please Enter Valid Date'),
    expirationDate: Yup.date()
        .required('Exp Date is required')
        .min(
            Yup.ref('issuedDt'),
            'End Date must be greater than or equal to Start Date'
        ),
});

function AddCompanyDocument({ onPrevious, onNext, onSubmit }) {
    const formik = useFormik({
        initialValues: {
            documentName: "document1",
            docNumber: "232323",
            issuedDt: "2023-07-30", // Date in YYYY-MM-DD format
            expirationDate: "2023-07-30", // Date in YYYY-MM-DD format
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Convert dates to the desired format before submission
            values.issuedDt = values.issuedDt ? new Date(values.issuedDt).toLocaleDateString('en-CA') : '';
            values.expirationDate = values.expirationDate ? new Date(values.expirationDate).toLocaleDateString('en-CA') : '';

            onNext("addUser", { addCompanyDocument: values });
            console.log("addCompanyDocument", { addCompanyDocument: values });
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="text-center">
                    <h4>Documents</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing</p>
                </div>
                <div className='flex flex-wrap gap-3 p-fluid'>
                    <div className='flex-auto mb-3'>
                        <ReusableInputField label="Document Name" required
                            name="documentName"
                            value={formik.values.documentName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="documentName"
                            className={formik.errors.documentName && formik.touched.documentName ? 'p-invalid' : ''}
                        />
                        {formik.errors.documentName && formik.touched.documentName && (
                            <small className="p-error">{formik.errors.documentName}</small>
                        )}
                    </div>
                    <div className='flex-auto row mb-3'>
                        <div className=" col-md-6">
                            <ReusableInputField label="Number" required
                                name="docNumber"
                                value={formik.values.docNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="---"
                                className={formik.errors.docNumber && formik.touched.docNumber ? 'p-invalid' : ''}
                            />
                            {formik.errors.docNumber && formik.touched.docNumber && (
                                <small className="p-error">{formik.errors.docNumber}</small>
                            )}
                        </div>
                        <div className="col-md-3">
                            <RequiredLabel label='Issued Date' required />
                            <Calendar
                                id="issuedDt"
                                name="issuedDt"
                                value={formik.values.issuedDt}
                                onChange={(e) => formik.setFieldValue('issuedDt', e.value)}
                                onBlur={formik.handleBlur}
                                dateFormat='yy-mm-dd'
                                showIcon
                                className={`date-pick-icon ${formik.errors.issuedDt && formik.touched.issuedDt ? 'p-invalid' : ''}`}
                            />
                            {formik.errors.issuedDt && formik.touched.issuedDt && (
                                <small className="p-error">{formik.errors.issuedDt}</small>
                            )}
                        </div>
                        <div className="col-md-3">
                            <RequiredLabel label='Exp Date' required />
                            <Calendar
                                id='expirationDate'
                                name="expirationDate"
                                value={formik.values.expirationDate}
                                onChange={(e) => formik.setFieldValue('expirationDate', e.value)}
                                onBlur={formik.handleBlur}
                                dateFormat="yy-mm-dd"
                                showIcon
                                className={`date-pick-icon ${formik.errors.expirationDate && formik.touched.expirationDate ? 'p-invalid' : ''}`}
                            />
                            {formik.errors.expirationDate && formik.touched.expirationDate && (
                                <small className="p-error">{formik.errors.expirationDate}</small>
                            )}
                        </div>
                    </div>

                    {/* File Uploading is need to check */}
                    <div className='flex-auto row mb-3'>
                        <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000} emptyTemplate={<p className="m-0">Drag and drop files here to upload.</p>} />
                    </div>
                </div>
                <div className='p-mb-4 form-btns' >
                    <Button label='Previous' className='mr-2 company-secondary-btn' onClick={() => onPrevious("address")} />
                    <Button label='Next' className=' company-primary-btn' type='submit' />
                    {/* <Button label='Submit' className=' company-primary-btn' type='submit' /> */}
                </div>
            </form>
        </>
    );
}

export default AddCompanyDocument;
