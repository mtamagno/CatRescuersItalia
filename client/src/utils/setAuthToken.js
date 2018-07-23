import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //apply always
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //Delete
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
