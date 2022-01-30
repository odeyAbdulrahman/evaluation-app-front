/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import './LangMenu.css';
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import getLangs from "../../core/data/langs";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function LangMenu() {
  const { t } = useTranslation();
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive); 
  return (
    <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>{t('select_lang')}</span>
        </button>
        <nav ref={dropdownRef} className={`menu ${isActive ? "active" : "inactive"}`} >
          <ul>
            {
             getLangs() && getLangs().map(({code, name, country_code}) => (
              <li key={code}> <a onClick={() => {i18next.changeLanguage(code)}}> <span></span> {name} </a></li>     
             ))
            }
          </ul>
        </nav>
      </div>
  );
}

export default LangMenu;
