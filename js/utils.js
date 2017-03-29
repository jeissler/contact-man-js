// Jquery inspired selector maps
const _$ = (el) => {
    return document.querySelector(el)
};

const _$$ = (el) => {
    return document.querySelectorAll(el)
};

const _$each = (el, fn) => {
    return Array.prototype.map.call(el, fn);
    /*
    // Use
    _$each(els, fn)

    // Instead of
    Array.prototype.map.call(els, (el) => {
    ...
    })
    */
};

const _$hasClass = (el, c) => {
    el.classList.contains(c)
};

// Cross-browser ajax or use fetch w/ polyfill instead
function ajaxLoad(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status === 200) {
            let data = xhr.responseText;
            callback(data)
        }
    };
    xhr.open('GET', url);
    xhr.send();
}

export {
    _$,
    _$$,
    _$each,
    _$hasClass,
    ajaxLoad
}