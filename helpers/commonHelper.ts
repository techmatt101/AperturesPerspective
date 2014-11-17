function objectToUrlParameters (obj) {
    var str = "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + obj[key];
    }

    return str;
}

interface Array<T> {
    shuffle():  Array<T>;
}

Array.prototype.shuffle = function () {
    var i = this.length, j, temp;
    if (i == 0) return;
    while (--i) {
        j = Math.floor(Math.random() * ( i + 1 ));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }

    return this;
};