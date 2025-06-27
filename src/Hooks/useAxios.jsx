import axios from "axios";

const token = JSON.parse(localStorage.getItem("auth"))

const axiosPublic = axios.create({
  baseURL: ${import.meta.env.VITE_API_URL},
  headers: {
    Authorization: `${token?.token}`
  }
});
console.log(token?.token)
const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
