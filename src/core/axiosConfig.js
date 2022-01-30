import axios from "axios";
import langService from "./services/langService";

const api = ({ ...options }) => {
  const api = axios.create({ baseURL: `http://nasihads-001-site9.etempurl.com/api/` })
  api.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  api.defaults.headers.common["Consumer"] = "254321889";
  api.defaults.headers.common["Lang"] = langService().findByCode(langService().currentLangVal()).id;
    const onSuccess = (response) => { 
        console.log(response.data)
        return response 
    }
    const onError = (error) => {
        return error
    }
  return  api(options).then(onSuccess).catch(onError);
}
export default api;