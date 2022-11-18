export const financial = (value) => {
    return Number.parseFloat(value).toFixed(2);
};


export const formatDate = (value) => {

    let d = new Date(value),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
};


export const iniciale = (value) => {
    let cadena = value.split(' ');
    return `${cadena[0].charAt(0)}${cadena[1].charAt(0)}`
}

export const generateUUID = () => {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}