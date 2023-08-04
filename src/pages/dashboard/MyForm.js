import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';

const MyForm = () => {
  const [showFirstNameField, setShowFirstNameField] = useState(true);
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      option: 'single',
      additionalOption: '',
      startDate: '',
      endDate: '',
    },
    validate: (values) => {
      const errors = {};

      if (values.option === 'single' && !values.firstname) {
        errors.firstname = 'First name is required';
      }

      if (!values.lastname) {
        errors.lastname = 'Last name is required';
      }

      if (
        values.option === 'multiple' &&
        values.additionalOption === 'option1' &&
        !values.startDate
      ) {
        errors.startDate = 'Start date is required';
      }

      if (
        values.option === 'multiple' &&
        values.additionalOption === 'option2' &&
        !values.endDate
      ) {
        errors.endDate = 'End date is required';
      }

      if (values.option === 'multiple' && !values.additionalOption) {
        errors.additionalOption = 'Select either Option 1 or Option 2';
      }

      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setShowFirstNameField(value === 'single');
    setShowAdditionalOptions(value === 'multiple');
    formik.setFieldValue('option', value);
  };

  const handleAdditionalOptionChange = (event) => {
    const value = event.target.value;
    formik.setFieldValue('additionalOption', value);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-field">
        <label htmlFor="option">Choose an option:</label>
        <div className="p-formgroup-inline">
          <div className="p-field-radiobutton">
            <RadioButton
              id="optionSingle"
              name="option"
              value="single"
              onChange={handleOptionChange}
              checked={formik.values.option === 'single'}
            />
            <label htmlFor="optionSingle">Single</label>
          </div>
          <div className="p-field-radiobutton">
            <RadioButton
              id="optionMultiple"
              name="option"
              value="multiple"
              onChange={handleOptionChange}
              checked={formik.values.option === 'multiple'}
            />
            <label htmlFor="optionMultiple">Multiple</label>
          </div>
        </div>
      </div>

      {showFirstNameField && (
        <div className="p-field">
          <label htmlFor="firstname">First Name</label>
          <InputText
            id="firstname"
            name="firstname"
            onChange={formik.handleChange}
            value={formik.values.firstname}
            className={formik.errors.firstname ? 'p-invalid' : ''}
          />
          {formik.errors.firstname && (
            <small className="p-error">{formik.errors.firstname}</small>
          )}
        </div>
      )}

      {showFirstNameField || showAdditionalOptions ? (
        <div className="p-field">
          <label htmlFor="lastname">Last Name</label>
          <InputText
            id="lastname"
            name="lastname"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            className={formik.errors.lastname ? 'p-invalid' : ''}
          />
          {formik.errors.lastname && (
            <small className="p-error">{formik.errors.lastname}</small>
          )}
        </div>
      ) : null}

      {showAdditionalOptions && (
        <div>
          <label>Additional Options:</label>
          <div className="p-formgroup-inline">
            <div className="p-field-radiobutton">
              <RadioButton
                id="additionalOption1"
                name="additionalOption"
                value="option1"
                onChange={handleAdditionalOptionChange}
                checked={formik.values.additionalOption === 'option1'}
              />
              <label htmlFor="additionalOption1">Option 1</label>
            </div>
            <div className="p-field-radiobutton">
              <RadioButton
                id="additionalOption2"
                name="additionalOption"
                value="option2"
                onChange={handleAdditionalOptionChange}
                checked={formik.values.additionalOption === 'option2'}
              />
              <label htmlFor="additionalOption2">Option 2</label>
            </div>
          </div>
          {formik.errors.additionalOption && (
            <small className="p-error">{formik.errors.additionalOption}</small>
          )}
        </div>
      )}

      {formik.values.additionalOption === 'option1' && (
        <div className="p-field">
          <label htmlFor="startDate">Start Date</label>
          <InputText
            id="startDate"
            name="startDate"
            onChange={formik.handleChange}
            value={formik.values.startDate}
            className={formik.errors.startDate ? 'p-invalid' : ''}
          />
          {formik.errors.startDate && (
            <small className="p-error">{formik.errors.startDate}</small>
          )}
        </div>
      )}

      {formik.values.additionalOption === 'option2' && (
        <div className="p-field">
          <label htmlFor="endDate">End Date</label>
          <InputText
            id="endDate"
            name="endDate"
            onChange={formik.handleChange}
            value={formik.values.endDate}
            className={formik.errors.endDate ? 'p-invalid' : ''}
          />
          {formik.errors.endDate && (
            <small className="p-error">{formik.errors.endDate}</small>
          )}
        </div>
      )}

      <Button type="submit" label="Submit" />
    </form>
  );
};

export default MyForm;
