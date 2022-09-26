type SupportLang = "zh-CN" | "en" | "zh-TW" | "ja";

const initLanguage = async () => {
    let lang: SupportLang = checkLanguage();
    switch (lang) {

    }
}

const checkLanguage = () => {
    let lang = navigator.language
    if (lang.substring(0, 2) === "en") return "en";
    else if (lang === "zh-CN") return "zh-CN";
    else if (lang.substring(0, 2) === "zh") return "zh-TW";
    else if (lang.substring(0, 2) === "ja") return "ja";
    else return "en";
}

const t = (s: string) => {
    return ""
}

export { checkLanguage, initLanguage };
export default t;
