import LangMenu from "../LangMenu/LangMenu";
import Form from "../Frorm/Form";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import api from "../../core/axiosConfig";
import langService from "../../core/services/langService";
import { useParams } from "react-router-dom";

const Evaluation = () => {
  const { t } = useTranslation();
  const { departmentId } = useParams();
  const [departmentInfo, setDepartmentInfo] = useState([]);
  //----------------- start: get methods -----------------//
  //Fetch data of departments on int
  useEffect(() => {
    async function getData() {
      departmentInfoAsync(departmentId).then((response) => {
        setDepartmentInfo(response.data);
      });
    }
    getData();
  }, []);

  //get data of Departments from api
  const departmentInfoAsync = (id) => {
      return api({url: `Department/${id}`});
  };

  const currentDepartmentName = () => langService().findCurrentText(
    departmentInfo.name,
    departmentInfo.nameAr,
    departmentInfo.nameUr
  )
  //----------------- end: get methods -----------------//

  return (
    <div className="card mt-5 pb-5">
      <div className="d-flex flex-row justify-content-between p-3 adiv text-white">
        <LangMenu />
      </div>
      <div className="mt-2 p-4 text-center">
        <h4 className="form-title">{t("welcome_to")}</h4>
        <h5 className="form-sub-title"><samp>{t("department_name")}:</samp> <strong>{currentDepartmentName()}</strong></h5>
        <Form />
      </div>
    </div>
  );
};
export default Evaluation;
