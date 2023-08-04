import React, { useEffect, useState } from 'react';
import RequiredLabel from '../../RequiredLabel';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import ReusableInputField from '../../ReusableInputField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import plusIcon from './../../../assets/plusIcon.svg';
import deleteIcon from './../../../assets/deleteIcon.svg';
import DomainInput from './DomainInput';
import { getDropdownOptions } from '../../../services/CompaniesServices';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Client is required'),
  phoneNumber: Yup.string().required('Phone is required'),
  fax: Yup.string().matches(/^\d{10}$/, 'Invalid fax number').required('Fax is required'),
  orgDomains: Yup.array().of(
    Yup.object().shape({
      domain: Yup.string()
        .matches(/^(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/, 'Invalid web address')
        .required('Web address is required'),
    })
  ),
  taxClassification: Yup.string().required('Tax Classification is required'),
  stateOfIncorporation: Yup.string().required('State is required'),
  taxId: Yup.string().matches(/^\d{2}-\d{7}$/, 'Invalid EIN format (e.g., XX-XXXXXXX)').required('EIN is required'),
});

function CompanyProfile({ onNext, view }) {
  const [options, setOptions] = useState();
  const [orgDomains, setOrgDomains] = useState([{ domain: '', error: '', index: 0 }]);

  useEffect(() => {
    getDropdownOptions()
      .then((options) => {
        setOptions(options);
      })
  }, []);

  const handleSubmit = (values) => {
    onNext('contactDetails', { ...values, orgDomains: orgDomains });
    console.log('Company Profile', { ...values, orgDomains: orgDomains });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      fax: '',
      orgDomains: [],
      taxClassification: '',
      stateOfIncorporation: '',
      taxId: '',
    },

    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleChangeDomain = (index, value) => {
    const updatedOrgDomains = [...orgDomains];
    updatedOrgDomains[index].domain = value;
    setOrgDomains(updatedOrgDomains);
  };

  const handleBlurDomain = (index) => {
    const updatedOrgDomains = [...orgDomains];
    updatedOrgDomains[index].error = formik.errors.orgDomains && formik.errors.orgDomains[index]?.domain;
    setOrgDomains(updatedOrgDomains);
  };

  const handleAddDomain = () => {
    setOrgDomains((prevOrgDomains) => [
      ...prevOrgDomains,
      { domain: '', error: '', index: prevOrgDomains.length },
    ]);
  };

  const handleRemoveDomain = (index) => {
    setOrgDomains((prevOrgDomains) => prevOrgDomains.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="text-center">
        <h4>Client Profile</h4>
      </div>
      <div className="flex flex-wrap gap-3 p-fluid">

        <div className="g-2 mb-3">
          {/* <RequiredLabel label="Company Name" required />
          <Dropdown
            name="name"
            value={formik.values.name}
            options={options}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="---"
            className={formik.errors.name && formik.touched.name ? 'p-invalid' : ''}
          /> */}
          <ReusableInputField
            label="Company Name"
            required
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="---"
            className={
              formik.errors.name && formik.touched.name ? "p-invalid" : ""
            }
          />
          {formik.errors.name && formik.touched.name && (
            <small className="p-error">{formik.errors.name}</small>
          )}
        </div>
        <div className="row mb-3">
          <div className="flex-auto col-md-6">
            <RequiredLabel label="Phone" />
            <InputMask
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              mask="(999) 999-9999"
              className={
                formik.errors.phoneNumber && formik.touched.phoneNumber
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <small className="p-error">{formik.errors.phoneNumber}</small>
            )}
          </div>
          <div className="flex-auto col-md-6">
            <ReusableInputField
              label="Fax"
              name="fax"
              value={formik.values.fax}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="---"
              className={
                formik.errors.fax && formik.touched.fax ? "p-invalid" : ""
              }
            />
            {formik.errors.fax && formik.touched.fax && (
              <small className="p-error">{formik.errors.fax}</small>
            )}
            {/* <ErrorMessage name="fax" component="div" /> */}
          </div>
        </div>

        <div className="row mb-3">
          <div className="flex-auto col-md-6">
            <RequiredLabel label="Tax Classification" required />
            <Dropdown
              name="taxClassification"
              value={formik.values.taxClassification}
              options={options}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="---"
              className={
                formik.errors.taxClassification &&
                formik.touched.taxClassification
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.errors.taxClassification &&
              formik.touched.taxClassification && (
                <small className="p-error">
                  {formik.errors.taxClassification}
                </small>
              )}
          </div>
          <div className="flex-auto col-md-3">
            <ReusableInputField
              label="State of Incorparation"
              name="stateOfIncorporation"
              value={formik.values.stateOfIncorporation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="---"
              className={
                formik.errors.stateOfIncorporation &&
                formik.touched.stateOfIncorporation
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.errors.stateOfIncorporation &&
              formik.touched.stateOfIncorporation && (
                <small className="p-error">
                  {formik.errors.stateOfIncorporation}
                </small>
              )}
          </div>
          <div className="flex-auto col-md-3">
            <RequiredLabel label="EIN" required />
            <InputMask
              name="taxId"
              value={formik.values.taxId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="99-9999999"
              mask='99-9999999'
              className={formik.errors.taxId && formik.touched.taxId ? 'p-invalid' : ''}
            />
            {formik.errors.taxId && formik.touched.taxId && (
              <small className="p-error">{formik.errors.taxId}</small>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="flex-auto col-md-11">
            {orgDomains.map((domainData, index) => (
              <div key={index} className="domain-input-container">
                <DomainInput
                  domainData={domainData}
                  onChange={(e) => handleChangeDomain(index, e.target.value)}
                  onBlur={() => handleBlurDomain(index)}
                />
                {index === orgDomains.length - 1 && (
                  <img
                    src={deleteIcon}
                    alt="deleteIcon"
                    className="cursor-pointer delete-icon"
                    onClick={() => handleRemoveDomain(index)}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex-auto col-md-1">
            <img src={plusIcon} alt="plusIcon" className="cursor-pointer" onClick={handleAddDomain} />
          </div>
        </div>
      </div>
      <div className="p-mt-4 form-btns">
        <Button label="Next" className="company-primary-btn" type="submit" />
      </div>
    </form>
  );
}

export default CompanyProfile;
