let ArrayFile = [];

function get_base64(url) {
    var ajaxObj = new XMLHttpRequest();
    ajaxObj.open('get', window.location.href + url);
    ajaxObj.onreadystatechange = function () {
        if (ajaxObj.readyState === 4 && ajaxObj.status === 200) {
            ArrayFile = [];
            let responce_text = ajaxObj.responseText
            let PageRawData = window.atob(responce_text.replace(/&#43;/g, '+'));
            let PageData = JSON.parse(PageRawData);
            var ArrayPath = [];
            var ArrayFloder = [];
            for (let item in PageData) {
                if (item.indexOf("@") === 0) {
                    continue;
                }
                if (PageData[item]["@type"] === "file") {
                    ArrayFile.push(PageData[item]);
                } else if (PageData[item]["@type"] === "folder") {
                    ArrayFloder.push(PageData[item]);
                }
            }
        }
    }
    ajaxObj.send();
}

export { ArrayFile, get_base64 }