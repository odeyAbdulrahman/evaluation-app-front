/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef } from "react";
import getLangs from "../../core/data/langs";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function NotFound() {
    const { t } = useTranslation();
    return (
        <>
            <div className="container">
                <h3>
                {t('not_found')}
                </h3>
            </div>
        </>
    )
}
export default NotFound