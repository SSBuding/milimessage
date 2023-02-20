// 时间方法
export const dataOne = (e) => {
    let d = new Date(e);
    let Y = d.getFullYear();
    let M = d.getMonth() + 1;
    let D = d.getDate();
    if (D < 10) {
        D = '0' + D;
    }
    if (M < 10) {
        M = '0' + M;
    }
    let dates = Y + '.' + M + '.' + D;
    return dates
}

export const getObjectURL = (file) => {
    let url = null
    let binaryData = [];
    binaryData.push(file);
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file)
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(new Blob(binaryData))
    } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file)
    }
    return url
}