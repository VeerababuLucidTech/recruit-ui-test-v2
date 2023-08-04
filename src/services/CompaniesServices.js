import axios from "axios";
import createCompanyOptions from '../__mockdata__/createCompanyOptions.json';
import apiHeaders from "./ApiHeaders";
import { COMPANIES_URL, CREATE_COMPANIES_API } from "./Constants";

export const companiesTableData = async () => {
  try {
    const response = await axios.get(COMPANIES_URL);
    return response.data.content;
  } catch (error) {
    console.log(error.message);
  }
};

export const createCompaniesFormData = async (formData) => {
  try {
    const response = await axios.post(CREATE_COMPANIES_API, formData, { headers: apiHeaders });
    console.log("Create Company API response Form:", response);
    return response;
  } catch (error) {
    console.log("Create Company API error Form:", error);
    throw error;
  }
};

export const getDropdownOptions = async () => {
  try {
    const dropdownOptions = createCompanyOptions.options.map((user) => ({
      value: user.value,
      label: user.label,
    }));
    return dropdownOptions;
  } catch (error) {
    console.log("Error fetching options:", error);
    throw error;
  }
};