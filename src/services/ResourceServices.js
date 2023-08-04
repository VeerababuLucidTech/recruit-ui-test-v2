import axios from "axios";
import { API_AVAILABLE, RESOURCE_URL, Widgets_API, } from "./Constants";
import resourceData from "../__mockdata__/resourceData.json";
import widgetData from "../__mockdata__/widgetData.json";

// <--  resourceTableData  -->
export const resourceTableData = async () => {
  if (API_AVAILABLE) {
    try {
      const response = await axios.get(RESOURCE_URL);
      console.log(response.data);
      console.log(response.data.content);
      return response.data.content;
    } catch (error) {
      console.log(error.massage);
    }
  } else {
    const response = resourceData.companiesResources?.map((item) => {
      return item;
    });
    return response;
  }
};

// <-- widgets   -->
export const resourceWidgetsData = async () => {
  if (API_AVAILABLE) {
    try {
      const response = await axios.get(Widgets_API);
      return response.data;
    } catch (error) {
      console.log(error.massage);
    }
  } else {
    const response = widgetData.resourcesWidget?.map((item) => {
      return item;
    });
    return response;
  }
};
