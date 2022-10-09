type SupportLang = "zh-CN" | "en" | "zh-TW" | "ja";
import res_zh_TW from '../data/lang/zh-TW';
import res_en from '../data/lang/en';
import res_zh_CN from '../data/lang/zh-CN';


const getLang = (s: string) => {
    if (s.startsWith("en")) {
        return res_en
    }
    switch (s) {
        case "zh-CN":
            return res_zh_CN
        case "zh-TW":
            return res_zh_TW
    }
    return res_en
};

const t = (s: keyof typeof res_en, language: string): string => {
    const lang = getLang(language)
    return lang[s]
}

export default t;
