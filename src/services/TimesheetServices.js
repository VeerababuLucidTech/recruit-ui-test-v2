import axios from "axios";
import { API_AVAILABLE, TIMESHEET_URL, Widgets_API } from "./Constants";
import widgetData from "../__mockdata__/widgetData.json";


// <--  timeSheetTableData  -->
export const timeSheetTableData = async () => {
  try {
    const response = await axios.get(TIMESHEET_URL);
    console.log(response.data);
    console.log(response.data.content);
    return response.data.content;
  } catch (error) {
    console.log(error.massage);
  }
};
// <--  widgetData  -->
export const widgetDatas = async () => {
  // try {
  //   const response = await axios.get(Widgets_API);
  //   return response.data;
  // } catch (error) {
  //   console.log(error.massage);
  // }
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
