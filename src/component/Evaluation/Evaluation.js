/* eslint-disable react-hooks/exhaustive-deps */
import LangMenu from "../LangMenu/LangMenu";
import Form from "../Frorm/Form";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import api from "../../core/axiosConfig";
import langService from "../../core/services/langService";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const Evaluation = () => {
  const { t } = useTranslation();
  const { departmentId } = useParams();
  const [departmentInfo, setDepartmentInfo] = useState([]);
  //----------------- start: get methods -----------------//
  //Fetch data of departments on int
  useEffect(() => {
    try {
      async function getData() {
        departmentInfoAsync(departmentId).then((response) => {
          setDepartmentInfo(response.data);
        });
      }
      getData();
    } catch {
      Swal.fire(t("sorry"), t("sm_wrong"), "error");
    }
  }, [departmentId]);

  //get data of Departments from api
  const departmentInfoAsync = (id) => {
    return api({ url: `Department/${id}` });
  };

  const currentDepartmentName = () => {
    try {
     return langService().findCurrentText(
        departmentInfo.name,
        departmentInfo.nameAr,
        departmentInfo.nameUr
      );
    } catch {
      Swal.fire(t("sorry"), t("sm_wrong"), "error");
    }
  };
  //----------------- end: get methods -----------------//

  return (
    <div className="card pb-5">
      <div className="d-flex flex-row justify-content-between p-3 adiv text-white">
        <LangMenu />
      </div>
      <div className="mt-2 p-4 text-center">
        <h4 className="form-title">{t("welcome_to")}</h4>
        <h5 className="form-sub-title">
          <strong>{currentDepartmentName()}</strong>
        </h5>
        <Form departmentId={departmentInfo.id} />
      </div>
    </div>
  );
};
export default Evaluation;
