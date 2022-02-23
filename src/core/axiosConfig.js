import axios from "axios";
import langService from "./services/langService";

const api = ({ ...options }) => {
  //http://10.26.56.15:900
  const api = axios.create({ baseURL: `https://evaluationApi.dhaid.shj.ae/api/` })
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