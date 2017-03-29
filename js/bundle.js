/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _contactMan = __webpack_require__(1);

(0, _contactMan.buildContactList)();
_contactMan.form.addEventListener('submit', _contactMan.submitNewContact, false);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.form = exports.submitNewContact = exports.buildContactList = undefined;

var _utils = __webpack_require__(2);

var _contacts = __webpack_require__(3);

var root = (0, _utils._$)('#sidebar .list-group');
var form = (0, _utils._$)('form');
var inputs = (0, _utils._$$)('form input');

function buildContactList() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = _contacts.contacts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var contact = _step.value;

            updateContactList(contact);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

function updateContactList(contact) {
    // Insert list item(s)
    var listItem = '<li class="list-group-item" data-name="' + contact.name + '">\n                        ' + contact.name + '<br>' + contact.email + '<br>' + contact.phone + '\n                        <button class="btn btn-sm remove">remove</button>\n                    </li>';
    root.insertAdjacentHTML('beforeend', listItem);

    // Add close btns if data and UI states match
    if (root.children.length === _contacts.contacts.length) {
        var btns = (0, _utils._$$)('#sidebar .remove');

        (0, _utils._$each)(btns, function (btn) {
            btn.addEventListener('click', removeItem, false);
        });
    }
}

function submitNewContact(ev) {
    ev.preventDefault();

    var formData = new FormData(form);
    var name = formData.get('name');
    var email = formData.get('email');
    var phone = formData.get('phone');

    // ie. this data would get posted back or saved to db in a real world app
    // ie. in a real world app form data would need to be sanitized before use
    _contacts.contacts.push({ 'name': name, 'email': email, 'phone': phone });

    var contact = _contacts.contacts[_contacts.contacts.length - 1];
    updateContactList(contact);
    clearFormInputs();
}

function clearFormInputs() {
    (0, _utils._$each)(inputs, function (input) {
        input.value = "";
    });
}

function removeItem() {
    var name = this.parentNode.dataset.name;
    this.parentNode.remove();
    _contacts.contacts.length--; // TODO: use splice here

    for (var prop in _contacts.contacts) {
        if (_contacts.contacts[prop].name === name) delete _contacts.contacts[prop];
    }
}

exports.buildContactList = buildContactList;
exports.submitNewContact = submitNewContact;
exports.form = form;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// Jquery inspired selector maps
var _$ = function _$(el) {
    return document.querySelector(el);
};

var _$$ = function _$$(el) {
    return document.querySelectorAll(el);
};

var _$each = function _$each(el, fn) {
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

var _$hasClass = function _$hasClass(el, c) {
    el.classList.contains(c);
};

// Cross-browser ajax or use fetch w/ polyfill instead
function ajaxLoad(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status === 200) {
            var data = xhr.responseText;
            callback(data);
        }
    };
    xhr.open('GET', url);
    xhr.send();
}

exports._$ = _$;
exports._$$ = _$$;
exports._$each = _$each;
exports._$hasClass = _$hasClass;
exports.ajaxLoad = ajaxLoad;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// mock initail data
// ie. in a real-world app this data would come from an api or db
var contacts = [{
    'name': 'Jeremy',
    'email': 'one@jeissler.com',
    'phone': '888-555-2323'
}, {
    'name': 'Jen',
    'email': 'jen@jen.com',
    'phone': '888-555-2323'
}];

exports.contacts = contacts;

/***/ })
/******/ ]);