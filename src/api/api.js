import {  species } from "../const/const";
import { message } from "antd";
import axios from "axios";


export const postData = async (value) => {
    const token = JSON.parse(localStorage.getItem("persist:auth")).token.replace(/"/g, "");
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    try {
        const response = await axios.post(species, value, config);
        message.success(response.data.message);
      } catch (error) {
          Object.keys(error.response.data.errors).forEach((field) => {
            const errorMessages = error.response.data.errors[field];
            console.log(errorMessages);
            errorMessages.forEach((errorMessage) => {
              message.error(errorMessage);
            });
          });
          return Promise.reject(error.response.data.errors);
      }
}

export const deleteData = async(value) =>{
  const token = JSON.parse(localStorage.getItem("persist:auth")).token.replace(/"/g, "");
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    try {
        const response = await axios.delete(`${species}/${value}`, config);
        message.success(response.data.message);
      } catch (error) {
         message.error("Đã có lỗi xảy ra. Vui lòng tải lại trang!")
          return Promise.reject(error.response.data.errors);
      }
}


export const putData = async (value) => {
  const token = JSON.parse(localStorage.getItem("persist:auth")).token.replace(/"/g, "");
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  }
  try {
      const response = await axios.put(`${species}/${value.id}`, value, config);
      message.success(response.data.message);
    } catch (error) {
        Object.keys(error.response.data.errors).forEach((field) => {
          const errorMessages = error.response.data.errors[field];
          console.log(errorMessages);
          errorMessages.forEach((errorMessage) => {
            message.error(errorMessage);
          });
        });
        return Promise.reject(error.response.data.errors);
    }
}