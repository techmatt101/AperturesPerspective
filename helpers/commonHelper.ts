function objectToUrlParameters(obj) {
    var str = "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + obj[key];
    }

    return str;
}

function parseBoolean(str : string) : Boolean {
    return /true/i.test(str);
}

interface Array<T> {
    shuffle():  Array<T>;
}

Array.prototype.shuffle = function () {
    var i = this.length, j, temp;
    if (i == 0) return;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }

    return this;
};

function toggleClass(element : HTMLElement, class1 : string, class2 : string, value : Boolean) {
    if (value) {
        element.classList.remove(class1);
        element.classList.add(class2);
    } else {
        element.classList.remove(class2);
        element.classList.add(class1);
    }
}