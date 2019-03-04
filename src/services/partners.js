import axios from 'axios';

export const getAllPartners = () => {
  return axios.get(`${process.env.REACT_APP_API_HOST}/partners`)
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(err => console.log(err))
}
