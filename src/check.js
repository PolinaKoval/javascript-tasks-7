'use strict';

exports.init = function () {
    Object.defineProperty(Object.prototype, 'check', {
           get: function () {
            return extendObjectPrototype(this);
        },
           enumerable: false
       });
};

function extendObjectPrototype(_this, not) {
    var extend = {
        hasKeys: function (keys) {
            var result = this.checkPrototype([Object.prototype, Array.prototype]) &&
            hasKeys.bind(_this, keys)();
            if (not) {
                return !result;
            }
            return result;
        },
        hasValues: function (values) {
            var result = this.checkPrototype([Object.prototype, Array.prototype]) &&
            hasValues.bind(_this, values)();
            if (not) {
                return !result;
            }
            return result;
        },
        containsValues: function (values) {
            var result = this.checkPrototype([Object.prototype, Array.prototype]) &&
            containsValues.bind(_this, values)();
            if (not) {
                return !result;
            }
            return result;
        },
        hasValueType: function (key, type) {
            var result = this.checkPrototype([Object.prototype, Array.prototype]) &&
            hasValueType.bind(_this, key, type)();
            if (not) {
                return !result;
            }
            return result;
        },
        hasLength: function (length) {
            var result = this.checkPrototype([String.prototype, Array.prototype]) &&
            hasLength.bind(_this, length)();
            if (not) {
                return !result;
            }
            return result;
        },
        hasParamsCount: function (count) {
            var result = this.checkPrototype([Function.prototype]) &&
            hasParamsCount.bind(_this, count)();
            if (not) {
                return !result;
            }
            return result;
        },
        hasWordsCount: function (count) {
            var result = this.checkPrototype([String.prototype]) &&
            hasWordsCount.bind(_this, count)();
            if (not) {
                return !result;
            }
            return result;
        },
        checkPrototype: function (prototypes) {
            if (prototypes.indexOf(Object.getPrototypeOf(_this)) != -1) {
                return true;
            }
            return false;
        }
    };
    Object.defineProperty(extend, 'not', {
           get: function () {
            return extendObjectPrototype(_this, true);
        },
           enumerable: false
       });
    return extend;
}


/** Проверяет, что цель содержит указанные ключи из keys.
 * @param {Array} keys проверяемые ключи
 * @returns {bool} true, если содержит, иначе false
 */
function containsKeys(keys) {
    var allKeys = Object.keys(this);
    return keys.every(elem => allKeys.indexOf(elem) != -1);
}

/** Проверяет, что цель содержит указанные только ключи из keys.
 * @param {Array} keys проверяемые ключи
 * @returns {bool} true, если все ключи из цели и keys совпадают, иначе false
 */
function hasKeys(keys) {
    return Object.keys(this).every(elem => keys.indexOf(elem) != -1) &&
           Object.keys(this).length === keys.length;
}

/** Проверяет, что цель содержит указанные значения из values.
 * @param {Array} values проверяемые ключи
 * @returns {bool} true, если содержит, иначе false
 */
function containsValues(values) {
    var _this = this;
    var allValues = Object.keys(_this).map(function (key) {
        return _this[key];
    });
    return values.every(elem => allValues.indexOf(elem) != -1);
}

/** Проверяет, что цель содержит только указанные значения из values.
 * @param {Array} values проверяемые ключи
 * @returns {bool} true, если все значения из цели и values совпадают, иначе false
 */
function hasValues(values) {
    var _this = this;
    var allValues = Object.keys(_this).map(function (key) {
        return _this[key];
    });
    return allValues.every(elem => values.indexOf(elem) != -1) &&
           allValues.length === values.length;
}

/** Проверяет, что значение по указанному ключу key относится к указанному типу type
 * @param {string} key ключ
 * @param {type} type Допустимые значения String, Number, Function, Array
 * @returns {bool} true, если значение по key тносится к type, иначе false
 */
function hasValueType(key, type) {
    var types = ['string', 'number', 'function'];
    if (!(containsValues.bind(types, [typeof type()])()) &&
        !(Object.getPrototypeOf(type()) === Array.prototype)) {
        return false;
    }
    if (this[key] === type(this[key])) {
        return true;
    }
    return false;
}

/** Проверяет, что длина цели соответствует указанной lenght.
 * @param {number} lenght длина
 * @returns {bool} true, если соответствует, иначе false
 */
function hasLength(length) {
    return this.length === length;
}

/** Определён для функций. Проверяет,
 что количество аргументов функции соответствует указанному.
 * @param {number} count количество аргуметов
 * @returns {bool} true, если соответствует, иначе false
 */
function hasParamsCount(count) {
    return this.length === count;
}

/**Определён для строк. Проверяет, что количество слов в строке соответствует указанному.
Словом считается последовательность символов,
ограниченная с обеих сторон пробелами или началом/концом строки.
 * @param {number} count количество слов
 * @returns {bool} true, если соответствует, иначе false
 */
function hasWordsCount(count) {
    return this.split(' ').length === count;
}
