import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {getCookie} from "./helpers";
const resources = {
    en: {
        translation: {
            "headerLinks": [
                {name: "Home", url: "/"},
                {name: "Credits", url: "/credits"},
                {name: "News", url: "/news"},
                {name: "Cards", url: "/cards"}
            ],
            "pageTitle": "International currency exchange",
            "iHave": "I have",
            "iGet": "I Get",
            "lorem": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, ducimus ea error est et fugit impedit ipsum magni molestias nesciunt nobis, numquam officia, officiis porro quis quos saepe sint voluptate?",
            "for": "for",
            "convert" : "Convert"
        }
    },
    ru: {
        translation: {
            "headerLinks": [
                {name: "Главное", url: "/"},
                {name: "Кредиты", url: "/credits"},
                {name: "Новости", url: "/news"},
                {name: "Карты", url: "/cards"}
            ],
            "pageTitle": "Международный обмен валюты",
            "iHave": "У меня есть",
            "iGet": "Я получу",
            "lorem": "Лорем ипсум долор сит амет, еам еа еним дицтас ирацундиа, цу дуо лаудем персиус ментитум, лабитур делицата цонтентионес еам ид. Дуо суас иуварет сенсибус ин, те хас зрил платонем цонцлусионемяуе, пер еу цонсул елецтрам. Про стет путент адмодум ат, доцтус опортере ехпетендис еу еам. Не омнесяуе салутатус еффициенди хис.",
            "for": "за",
            "convert" : "Конвертировать"
        }
    }
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        lng: getCookie('i18next'),
        interpolation: {
            escapeValue: false
        },
        returnObjects: true,
        detection: {
            order: ['htmlTag', 'cookie', 'localStorage'],
            caches: ['cookie']
        }
    });

export default i18n;
