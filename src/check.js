'use strict';

/**
 * Расширяет прототипы базовых классов, добавляя в них вспомогательные методы.
 */
exports.init = function () {
    Object.defineProperty(Object.prototype, 'check', {
           get: function () {
            return extendObjectPrototype(this);
        },
           enumerable: false
       });
};

exports.wrap = function (obj) {
    if (obj !== null) {
        return obj;
    }
    var newNullObject = new NullObject();
    return newNullObject;
};

/**
 * Создает экземпляр NullObject.
 * @constructor
 * @this {NullObject}
 */
var NullObject = function () {
    this.isNull = function () {
        return true;
    };
};

/**
 * Возвращает объект с новыми методами для _this
 * @param {Object} _this объект, для которого формируются методы
 * @returns {bool} [not] true, если вызвано из пространства имен not
 */
function extendObjectPrototype(_this, not) {
    var extend = {
        hasKeys: function (keys) {
            this.checkPrototype([Object.prototype, Array.prototype]);
            return this.returnResult(hasKeys.bind(_this, keys)());
        },
        hasValues: function (values) {
            this.checkPrototype([Object.prototype, Array.prototype]);
            return this.returnResult(hasValues.bind(_this, values)());
        },
        containsValues: function (values) {
            this.checkPrototype([Object.prototype, Array.prototype]);
            return this.returnResult(containsValues.bind(_this, values)());
        },
        hasValueType: function (key, type) {
            this.checkPrototype([Object.prototype, Array.prototype]);
            return this.returnResult(hasValueType.bind(_this, key, type)());
        },
        hasLength: function (length) {
            this.checkPrototype([String.prototype, Array.prototype]);
            return this.returnResult(hasLength.bind(_this, length)());
        },
        hasParamsCount: function (count) {
            this.checkPrototype([Function.prototype]);
            return this.returnResult(hasParamsCount.bind(_this, count)());
        },
        hasWordsCount: function (count) {
            this.checkPrototype([String.prototype]);
            return this.returnResult(hasWordsCount.bind(_this, count)());
        },
        checkPrototype: function (prototypes) {
            if (prototypes.indexOf(Object.getPrototypeOf(_this)) === -1) {
                throw new TypeError('for this type method is not available');
            }
        },
        returnResult: function (result) {
            if (not) {
                return !result;
            }
            return result;
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


/**
 * Проверяет, что цель содержит указанные ключи из keys.
 * @param {Array} keys проверяемые ключи
 * @returns {bool} true, если содержит, иначе false
 */
function containsKeys(keys) {
    var allKeys = Object.keys(this);
    return keys.every(elem => allKeys.indexOf(elem) !== -1);
}

/**
 * Проверяет, что цель содержит указанные только ключи из keys.
 * @param {Array} keys проверяемые ключи
 * @returns {bool} true, если все ключи из цели и keys совпадают, иначе false
 */
function hasKeys(keys) {
    return Object.keys(this).every(elem => keys.indexOf(elem) !== -1) &&
           Object.keys(this).length === keys.length;
}

/**
 * Проверяет, что цель содержит указанные значения из values.
 * @param {Array} values проверяемые ключи
 * @returns {bool} true, если содержит, иначе false
 */
function containsValues(values) {
    var _this = this;
    var allValues = Object.keys(_this).map(function (key) {
        return _this[key];
    });
    return values.every(elem => allValues.indexOf(elem) !== -1);
}

/**
 * Проверяет, что цель содержит только указанные значения из values.
 * @param {Array} values проверяемые ключи
 * @returns {bool} true, если все значения из цели и values совпадают, иначе false
 */
function hasValues(values) {
    var _this = this;
    var allValues = Object.keys(_this).map(function (key) {
        return _this[key];
    });
    return allValues.every(elem => values.indexOf(elem) !== -1) &&
           allValues.length === values.length;
}

/**
 * Проверяет, что значение по указанному ключу key относится к указанному типу type
 * @param {string} key ключ
 * @param {type} type Допустимые значения String, Number, Function, Array
 * @returns {bool} true, если значение по key тносится к type, иначе false
 */
function hasValueType(key, type) {
    var types = ['string', 'number', 'function'];
    if (!(containsValues.bind(types, [typeof type()])()) &&
        Object.getPrototypeOf(type()) !== Array.prototype) {
        return false;
    }
    if (this[key] === type(this[key])) {
        return true;
    }
    return false;
}

/**
 * Проверяет, что длина цели соответствует указанной lenght.
 * @param {number} lenght длина
 * @returns {bool} true, если соответствует, иначе false
 */
function hasLength(length) {
    return this.length === length;
}

/**
 * Определён для функций. Проверяет,
 что количество аргументов функции соответствует указанному.
 * @param {number} count количество аргуметов
 * @returns {bool} true, если соответствует, иначе false
 */
function hasParamsCount(count) {
    return this.length === count;
}

/**
 *Определён для строк. Проверяет, что количество слов в строке соответствует указанному.
Словом считается последовательность символов,
ограниченная с обеих сторон пробелами или началом/концом строки.
 * @param {number} count количество слов
 * @returns {bool} true, если соответствует, иначе false
 */
function hasWordsCount(count) {
    return this.split(' ').length === count;
}
