import React, { useState, useEffect } from "react";
import "./Form.css";
import api from "../../core/axiosConfig";
import ImojeRating from "../ImojeRating/ImojeRating";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import emojesData from "../../core/data/emojesData";
import langService from "../../core/services/langService";
import {evaluationModel, clearEvaluationModel} from "../../core/models/evaluationModel";

function Form({ departmentId }) {
  const [subDepartments, setSubDepartments] = useState([]);

  const [submited, setSubmited] = useState(false);
  const [isSelected, setIsSelected] = useState(0);

  const [hasSub, setHasSub] = useState(false);
  const [selectSub, setSelectSub] = useState(false);

  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');

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
          if(response.data.length > 0){
            setSubDepartments(response.data);
            setHasSub(true)
          }
         });
      }
      getData();
    }
  }, [departmentId]);
  //get data of Departments from api
  const subDepartmentsAsync = (deptId) => api({ url: `SubDepartment/${deptId}` })
  //----------------- end: get methods -----------------//

  //----------------- start: post & put & delete methods -----------------//
  // Save Evaluation data
  const postAsync = async () => {
    try {
      if (evaluationModel.value) {
        if (evaluationModel.departmentId) {
          console.log(hasSub)
          console.log(selectSub)
          if(hasSub === true && selectSub === false)
          {
            Swal.fire(t("sorry"), t("select_dept"), "error");
          }
          else
          {
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
                  window.location.reload(false);
                },3000)
              } else
                Swal.fire(t("sorry"), "" + response.data.description, "error");
              clearForm();
              setSubmited(false);
            });
          }
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

  };
  //
  const clearForm = () => {
      setShow(true);
      setIsSelected(0);
      setPhone('')
      setNote('')
      clearEvaluationModel()
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
            setSelectSub(true)
          }}
          defaultValue=""
        >
          <option hidden value=''>{t("select_dept")}</option>
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
          placeholder={t("phone_number")}
          onChange={(e) => {
            evaluationModel.phoneNumber = e.target.value;
            setPhone(e.target.value)
          }}
          value={phone}
          max="10"
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
            setNote(evaluationModel.note)
          }}
          value={note}
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
