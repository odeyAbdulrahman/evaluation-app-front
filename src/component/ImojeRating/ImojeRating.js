/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "./ImojeRating.css";
import { useTranslation } from "react-i18next";
import getEmojes from "../../core/data/emojes";

function ImojeRating({ setShowData, selected }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="d-flex flex-row justify-content-center imoj-box mt-2">
        {getEmojes() &&
          getEmojes().map((item) => (
            <div
             key={item.id}
              className="imo-div"
              style={{ border: selected === item.id ? "solid #4d100a 1px" : ""}}
              onClick={() => { setShowData(item.status, item.id)}}
            >
              <img className="imoj-img" src={item.img} />
              <label>{t(item.t_name)}</label>
            </div>
          ))}
      </div>
    </>
  );
}

export default ImojeRating;
