const persianDate = require('persian-date');
const TimeSpan = require('../TimeSpan');
module.exports = (function () {
    /**
     * Checks Whether Base Date Is In Range Of Start And End
     * @param {Date} start 
     * @param {Date} end 
     * @returns {Boolean}
     */
    Date.prototype.isInRange = function (start, end) {
        if (!(start instanceof Date)) throw new TypeError('Start Must Be Instance Of Date Object');
        if (!(end instanceof Date)) throw new TypeError('End Must Be Instance Of Date Object');
        return (this.getTime() >= start.getTime() && this.getTime() <= end.getTime()) || (this.getTime() >= end.getTime() && this.getTime() <= start.getTime());
    };

    /**
     * Adds Milliseconds To Base Date
     * @param {Number} milliseconds 
     * @returns {Date}
     */
    Date.prototype.addMilliseconds = function (milliseconds) {
        if (typeof milliseconds != "number") throw new TypeError('Milliseconds Must Be Integer');
        return new Date(this.valueOf() + parseInt(milliseconds));
    };

    /**
     * Adds Seconds To Base Date
     * @param {Number} seconds 
     * @returns {Date}
     */
    Date.prototype.addSeconds = function (seconds) {
        if (typeof seconds != "number") throw new TypeError('Seconds Must Be Integer');
        return new Date(this.valueOf() + 1000 * parseInt(seconds));
    };

    /**
     * Adds Minutes To Base Date
     * @param {Number} minutes 
     * @returns {Date}
     */
    Date.prototype.addMinutes = function (minutes) {
        if (typeof minutes != "number") throw new TypeError('Minutes Must Be Integer');
        return new Date(this.valueOf() + 1000 * 60 * parseInt(minutes));
    };

    /**
     * Adds Hours To Base Date
     * @param {Number} hours 
     * @returns {Date}
     */
    Date.prototype.addHours = function (hours) {
        if (typeof hours != "number") throw new TypeError('Hours Must Be Integer');
        return new Date(this.valueOf() + 1000 * 60 * 60 * parseInt(hours));
    };

    /**
     * Adds Days To Base Date
     * @param {Number} days 
     * @returns {Date}
     */
    Date.prototype.addDays = function (days) {
        if (typeof days != "number") throw new TypeError('Days Must Be Integer');
        return new Date(this.valueOf() + 1000 * 60 * 60 * 24 * parseInt(days));
    };

    /**
     * Adds Months To Base Date
     * @param {Number} months 
     * @returns {Date}
     */
    Date.prototype.addMonths = function (months) {
        if (typeof months != "number") throw new TypeError('Months Must Be Integer');
        this.setMonth(this.getMonth() + parseInt(months));
        return this;
    };

    /**
     * Adds Years To Base Date
     * @param {Number} years 
     * @returns {Date}
     */
    Date.prototype.addYears = function (years) {
        if (typeof years != "number") throw new TypeError('Years Must Be Integer');
        this.setFullYear(this.getFullYear() + parseInt(years))
        return this;
    };

    /**
     * Calculates A Time Span From Base Date Up Until Now
     * @returns {TimeSpan}
     */
    Date.prototype.toTimeSpan = function () {
        return new TimeSpan(this);
    };

    /**
     * Calculates A Time Span From Start Date Up Until Base Date
     * @param {Date} start Default Is 1970-01-01 00:00:00:000
     * @returns {TimeSpan}
     */
    Date.prototype.toReversedTimeSpan = function (start) {
        if (!(start instanceof Date)) start = new Date('1970-01-01Z00:00:00:000');
        return new TimeSpan(start, this);
    };

    /**
     * Adds TimeSpan To Base Date
     * @param {TimeSpan} timeSpan 
     * @returns {Date}
     */
    Date.prototype.addTimeSpan = function (timeSpan) {
        if (!(timeSpan instanceof TimeSpan)) throw new TypeError('Time Span Must Be Instance Of TimeSpan Object');
        return new Date(this.valueOf() + timeSpan.totalMilliseconds);
    };

    /**
     * Calculates Persian Date Object Of Base Date
     * @returns {persianDate}
     */
    Date.prototype.toPersianDate = function () {
        return new persianDate(this);
    };

    /**
     * Adds Persian Months To Base Date
     * @param {Number} months 
     * @returns {Date}
     */
    Date.prototype.addPersianMonths = function (months) {
        if (typeof months != "number") throw new TypeError('Months Must Be Integer');
        return new persianDate(this).toCalendar('persian').toLocale('en').add("M", months).toDate();
    };

    /**
     * Adds Persian Years To Base Date
     * @param {Number} years 
     * @returns {Date}
     */
    Date.prototype.addPersianYears = function (years) {
        if (typeof years != "number") throw new TypeError('Years Must Be Integer');
        return new persianDate(this).toCalendar('persian').toLocale('en').add("y", years).toDate();
    };

    Object.defineProperty(Date.prototype, 'totalMilliseconds', {
        /**
         * Calculates Total Milliseconds From Base Date Up Until Now
         * @returns {Number}
         */
        get: function () {
            return Math.floor(new Date() - this);
        }
    });

    Object.defineProperty(Date.prototype, 'totalSeconds', {
        /**
         * Calculates Total Seconds From Base Date Up Until Now
         * @returns {Number}
         */
        get: function () {
            return Math.floor(this.totalMilliseconds / 1000);
        }
    });

    Object.defineProperty(Date.prototype, 'totalMinutes', {
        /**
         * Calculates Total Minutes From Base Date Up Until Now
         * @returns {Number}
         */
        get: function () {
            return Math.floor(this.totalMilliseconds / (1000 * 60));
        }
    });

    Object.defineProperty(Date.prototype, 'totalHours', {
        /**
         * Calculates Total Hours From Base Date Up Until Now
         * @returns {Number}
         */
        get: function () {
            return Math.floor(this.totalMilliseconds / (1000 * 60 * 60));
        }
    });

    Object.defineProperty(Date.prototype, 'totalDays', {
        /**
         * Calculates Total Days From Base Date Up Until Now
         * @returns {Number}
         */
        get: function () {
            return Math.floor(this.totalMilliseconds / (1000 * 60 * 60 * 24));
        }
    });

    Object.defineProperty(Date.prototype, 'timeOfDay', {
        /**
         * Calculates TimeSpan From Start Of Base Date's Day
         * @returns {TimeSpan}
         */
        get: function () {
            var startOfDay = new Date(this.getFullYear(), this.getMonth(), this.getDate());
            return new TimeSpan(startOfDay, this);
        }
    });
})();