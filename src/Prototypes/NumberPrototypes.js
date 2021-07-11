const TimeSpan = require('../TimeSpan');
module.exports = (function () {

    /**
     * Add Leading Zero To Start And End(Decimals) Of Base Number
     * @param {Number} digits 
     * @param {Number?} decimals 
     * @returns {String}
     */
    Number.prototype.fixDigits = function (digits, decimals) {
        var str = `${this}`,
            digitLength = str.split(".")[0].length,
            i;

        if (typeof digits === "number" && digitLength < digits) {
            for (i = 1; i <= digits - digitLength; i++) {
                str = "0" + str;
            }
        }

        if (typeof str.split(".")[1] != "undefined") {
            var decimalLength = str.split(".")[1].length;
            if (typeof decimals === "number" && decimalLength < decimals) {
                for (i = 1; i <= decimals - decimalLength; i++) {
                    str = str + "0";
                }
            }
        }

        return str;
    };

    /**
     * Checks Whether Base Number Is In Range Of Start And End
     * @param {Number} start 
     * @param {Number} end 
     * @returns {Boolean}
     */
    Number.prototype.isInRange = function (start, end) {
        if (typeof start != "number") throw new TypeError('Start Must Be Instance Of Number');
        if (typeof end != "number") throw new TypeError('End Must Be Instance Of Number');
        return (this >= start && this <= end) || (this >= end && this <= start);
    };

    /**
     * Calculates Floor Without Math Object
     * @returns {Number}
     */
    Number.prototype.floor = function () {
        return Math.floor(this);
    };

    /**
     * Calculates Ceil Without Math Object
     * @returns {Number}
     */
    Number.prototype.ceil = function () {
        return Math.ceil(this);
    };

    /**
     * Calculates Round Without Math Object
     * @returns {Number}
     */
    Number.prototype.round = function () {
        return Math.round(this);
    };

    /**
     * Calculates Sign Without Math Object
     * @returns {Number}
     */
    Number.prototype.sign = function () {
        return Math.sign(this);
    };

    /**
     * Calculates SQRT Without Math Object
     * @returns {Number}
     */
    Number.prototype.sqrt = function () {
        return Math.sqrt(this);
    };

    /**
     * Calculates CBRT Without Math Object
     * @returns {Number}
     */
    Number.prototype.cbrt = function () {
        return Math.cbrt(this);
    };

    /**
     * Calculates ABS Without Math Object
     * @returns {Number}
     */
    Number.prototype.abs = function () {
        return Math.abs(this);
    };

    /**
     * Calculates ABS And Round Without Math Object
     * @returns {Number}
     */
    Number.prototype.absRound = function () {
        return this < 0 ? Math.ceil(this) : Math.floor(this);
    };

    /**
     * Calculates ABS And Floor Without Math Object
     * @returns {Number}
     */
    Number.prototype.absFloor = function () {
        return this < 0 ? (Math.ceil(number) || 0) : Math.floor(this);
    };

    /**
     * Calculates Trunc Without Math Object
     * @returns {Number}
     */
    Number.prototype.trunc = function () {
        return Math.trunc(this);
    };

    /**
     * Calculates Base Number Powered By Exponent
     * @param {Number} exponent 
     * @returns {Number}
     */
    Number.prototype.pow = function (exponent) {
        return Math.pow(this, exponent);
    };

    /**
     * Calculates Base Powered By Base Number
     * @param {Number} base 
     * @returns {Number}
     */
    Number.prototype.powBase = function (base) {
        return Math.pow(base, this);
    };

    /**
     * Calculates TimeSpan From Base Number Milliseconds Ago
     * @returns {TimeSpan}
     */
    Number.prototype.toTimeSpan = function () {
        var timeSpan = new TimeSpan(new Date());
        return timeSpan.parseMilliseconds(this);
    };

    Object.defineProperty(Number.prototype, 'isInteger', {
        /**
         * Checks If Base Number Is An Integer
         * @returns {Boolean}
         */
        get: function () {
            return Number.isInteger(this);
        }
    });

    Object.defineProperty(Number.prototype, 'isPrime', {
        /**
         * Checks If Base Number Is A Primitive Number
         * @returns {Boolean}
         */
        get: function () {
            return this.isInteger && (this > 1) && Array(Math.floor(Math.sqrt(this)) - 1).fill(0).map((_, i) => i + 2).every(i => this % i !== 0);
        }
    });

    Object.defineProperty(Number.prototype, 'isEven', {
        /**
         * Checks If Base Number Is Even
         * @returns {Boolean}
         */
        get: function () {
            return this.isInteger && this % 2 === 0;
        }
    });

    Object.defineProperty(Number.prototype, 'isOdd', {
        /**
         * Checks If Base Number Is Odd
         * @returns {Boolean}
         */
        get: function () {
            return this.isInteger && this % 2 === 1;
        }
    });
})();