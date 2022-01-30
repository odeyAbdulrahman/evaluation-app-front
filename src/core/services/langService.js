import getLangs from "../data/langs";

const langService = () => {
    const currentLangVal = () => localStorage.getItem("i18nextLng");
    const findByCode = (code) => getLangs().find(item => item.code === code);
    const findCurrentText = (text, textAr, textUr) =>  currentLangVal() === 'en' ? text: currentLangVal() === 'ur' ? textUr : textAr;
    return {currentLangVal, findByCode, findCurrentText};
}
export default langService;