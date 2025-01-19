import axios from "axios";

const commonAPI = async (httpMethod, url, reqBody) => {
  const reqConfig = {
    method: httpMethod,
    url: url,
    data: reqBody,
  };

  try {
    const res = await axios(reqConfig);
    return res;
  } catch (err) {
    return err;
  }
};

export default commonAPI;
