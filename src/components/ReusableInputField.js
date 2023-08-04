import React from 'react'
import RequiredLabel from './RequiredLabel'
import { InputText } from "primereact/inputtext";

function ReusableInputField({ label, required, ...inputProps }) {
  return (
    <div>
      <RequiredLabel label={label} required={required} />
      <InputText className="p-inputtext-sm" {...inputProps} />
    </div>
  )
}

export default ReusableInputField

