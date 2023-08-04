import React from 'react';
import plusIcon from './../../../assets/plusIcon.svg';
import ReusableInputField from '../../ReusableInputField';

const DomainInput = ({ domainData, onChange, onBlur, onRemove }) => {
  return (
    <div className="flex-auto col-md-11">
      <ReusableInputField
        label={`Web Address for Domain ${domainData.index + 1}`}
        name={`orgDomains[${domainData.index}].domain`}
        value={domainData.domain}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="---"
        className={domainData.error ? 'p-invalid' : ''}
      />
      {domainData.error && <small className="p-error">{domainData.error}</small>}
      <img
        src={plusIcon}
        alt='plusIcon'
        className='pt-4 cursor-pointer'
        onClick={onRemove}
      />
    </div>
  );
};

export default DomainInput;
