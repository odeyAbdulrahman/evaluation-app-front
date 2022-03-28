import React, { useState, useEffect } from "react";
import "./Form.css";
import api from "../../core/axiosConfig";
import ImojeRating from "../ImojeRating/ImojeRating";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import emojesData from "../../core/data/emojesData";
import langService from "../../core/services/langService";
import evaluationModel from "../../core/models/evaluationModel";

function Form({ departmentId }) {
  const [subDepartments, setSubDepartments] = useState([]);
  //const [employees, setEmployees] = useState([]);
  const [submited, setSubmited] = useState(false);
  //
  const [isSelected, setIsSelected] = useState(0);
  const [show, setShow] = useState(true);
  //
  const { t } = useTranslation();
  //----------------- start: get methods -----------------//
  //Fetch data of departments on int
  useEffect(() => {
    if (departmentId) {
      evaluationModel.departmentId = departmentId;
      async function getData() {
        subDepartmentsAsync(departmentId).then((response) => {
          setSubDepartments(response.data);
        });
      }
      getData();
    }
  }, [departmentId]);
  //get data of Departments from api
  const subDepartmentsAsync = (deptId) =>
    api({ url: `SubDepartment/${deptId}` });
  //----------------- end: get methods -----------------//

  //----------------- start: post & put & delete methods -----------------//
  // Save Evaluation data
  const postAsync = async () => {
    try {
      if (evaluationModel.value) {
        if (evaluationModel.departmentId) {
          setSubmited(true);
          const data = {
            value: evaluationModel.value,
            phoneNumber: evaluationModel.phoneNumber,
            note: evaluationModel.note,
            userId: evaluationModel.userId,
            departmentId: departmentId,
            SubDepartmentId: evaluationModel.subDepartmentId,
          };
          api({ url: "Evaluation", method: "post", data }).then((response) => {
            if (response.data.code === 200) {
              const t_name = emojesData.find(
                (item) => item.id === evaluationModel.value
              ).t_name;
              Swal.fire(
                t("good_job"),
                "" +
                  response.data.description +
                  `<br><strong>${t("your_rating")} : </strong>` +
                  t(t_name),
                "success"
              );
              setTimeout(() => {
                Swal.close()
              },3000)
            } else
              Swal.fire(t("sorry"), "" + response.data.description, "error");
            clearForm("all");
            setSubmited(false);
          });
        } else Swal.fire(t("sorry"), t("select_dept"), "error");
      } else Swal.fire(t("sorry"), t("select_emoji"), "error");
    } catch (err) {
      Swal.fire(t("sorry"), "" + err.message, "error");
    }
  };
  //show and hide where evaluation from user is pissed_me
  const setShowData = (bool, val) => {
    setShow(bool);
    setIsSelected(val);
    evaluationModel.value = val;
    clearForm("");
  };
  //
  const clearForm = (setType) => {
    if (setType === "all") {
      setShow(true);
      setIsSelected(0);
      evaluationModel.value = 0;
      evaluationModel.phoneNumber = "";
      evaluationModel.note = "";
    } else {
      evaluationModel.phoneNumber = "";
      evaluationModel.note = "";
    }
  };
  //----------------- end: post & put & delete methods -----------------//
  return (
    <>
      <div className="form-group mt-4" hidden={!subDepartments.length}>
        <select
          key="subDepartmentId"
          className="form-control"
          id="exampleFormControlSelect1"
          onChange={async (e) => {
            evaluationModel.subDepartmentId = e.target.selectedOptions[0].value;
          }}
        >
          {subDepartments &&
            subDepartments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {langService().findCurrentText(
                  dept.name,
                  dept.nameAr,
                  dept.nameUr
                )}
              </option>
            ))}
        </select>
      </div>
      <ImojeRating setShowData={setShowData} selected={isSelected} />
      <div className="form-group mt-4" hidden={show}>
        <h4 className="small" htmlFor="exampleInputEmail1">
          {t("phone_number")}
        </h4>
        <input
          key="phoneNumber"
          type="number"
          className="form-control"
          placeholder={t("enter_phone_number")}
          onChange={(e) => {
            evaluationModel.phoneNumber = e.target.value;
          }}
        ></input>
      </div>
      <div className="form-group mt-4" hidden={show}>
        <h4 className="small" htmlFor="exampleInputEmail1">
          {t("note")}
        </h4>
        <textarea
          key="note"
          className="form-control textarea"
          rows="6"
          placeholder={t("enter_note")}
          onChange={(e) => {
            evaluationModel.note = e.target.value;
          }}
        ></textarea>
      </div>
      <div className="mt-2">
        <button
          key="sub-btn"
          type="button"
          onClick={() => {
            postAsync();
          }}
          className="btn btn-primary btn-block"
          disabled={submited}
        >
          <span>{t("submit")}</span>
        </button>
      </div>
    </>
  );
}
export default Form;
