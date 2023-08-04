import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { Calendar } from "primereact/calendar";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';

export default function CalenderTest() {
  const toast = useRef(null);

  const show = () => {
    toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.date.toLocaleDateString() });
  };

  const formik = useFormik({
    initialValues: {
      date: ''
    },
    validate: (data) => {
      let errors = {};

      if (!data.date) {
        errors.date = 'Date is required.';
      }

      return errors;
    },
    onSubmit: (data) => {
      if (!formik.errors.date) {
        data && show(data);
        formik.resetForm();
      }
    }
  });

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  const handleDateInputChange = (event) => {
    let { value } = event.target;
    value = value.replace(/\D/g, ''); // Remove non-numeric characters
    let formattedValue = '';

    if (value.length > 0) {
      formattedValue += value.substring(0, 2); // Add first two characters

      if (value.length > 2) {
        formattedValue += '/' + value.substring(2, 4); // Add slash and next two characters

        if (value.length > 4) {
          formattedValue += '/' + value.substring(4, 8); // Add slash and last four characters
        }
      }
    }

    formik.setFieldValue('date', formattedValue);
  };

  return (
    <div className="flex justify-content-center">
      <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
        <label htmlFor="cal_date">Date</label>
        <Toast ref={toast} />
        <Calendar
          showIcon
          placeholder='mm/dd/yyyy'
          inputId="cal_date"
          name="date"
          value={formik.values.date}
          className={classNames({ 'p-invalid': isFormFieldInvalid('date') })}
          onChange={(e) => formik.setFieldValue('date', e.value)}
          onInput={(e) => formik.setFieldValue('date', e.target.value)} // Use onInput instead of onInputChange
          onInputChange={handleDateInputChange}
        />
        {getFormErrorMessage('date')}
        <Button type="submit" label="Submit" />
      </form>
    </div>
  );
}
