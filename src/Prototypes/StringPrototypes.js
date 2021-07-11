module.exports = (function () {
    /**
     * Escapes Special Characters By Adding \ In Base String
     * *** Note: Does Not Escape BackSlashes(\)
     * @returns {String}
     */
    String.prototype.toRegexQuote = function () {
        return this.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    };

    /**
     * Replaces All Matching Pattern In Base String With Replacement
     * @param {RegExp | String} pattern 
     * @param {String} replacement 
     * @returns 
     */
    String.prototype.replaceAll = function (pattern, replacement) {
        var str = this;
        if (typeof pattern === "undefined" || typeof replacement === "undefined") {
            return str;
        }
        var regex = new RegExp(pattern instanceof RegExp ? pattern : pattern.toRegexQuote(), "g");
        return str.replace(regex, replacement);
    };

    /**
     * Trims All Extra Spaces From Base String
     * @returns {String}
     */
    String.prototype.trimToEmpty = function () {
        var str = this;
        str = str.replace(/\s(?:\s)+/g, " ");
        str = str.replace(/^\s/, "");
        str = str.replace(/\s$/, "");
        return str;
    };

    /**
     * Trims All Extra Spaces From Base String And Return Null If Nothing Remains
     * @returns {String|null}
     */
    String.prototype.trimToNull = function () {
        var str = this;
        str = str.replace(/\s(?:\s)+/g, " ");
        str = str.replace(/^\s/, "");
        str = str.replace(/\s$/, "");
        return str === "" ? null : str;
    };

    /**
     * Replace All Persian Numbers In Base String With English Ones
     * @returns {String}
     */
    String.prototype.toEnglishNumeric = function () {
        return this
            .replace(/۰/g, "0")
            .replace(/۱/g, "1")
            .replace(/۲/g, "2")
            .replace(/۳/g, "3")
            .replace(/۴/g, "4")
            .replace(/۵/g, "5")
            .replace(/۶/g, "6")
            .replace(/۷/g, "7")
            .replace(/۸/g, "8")
            .replace(/۹/g, "9");
    };

    /**
     * Replace All English Numbers In Base String With Persian Ones
     * @returns {String}
     */
    String.prototype.toPersianNumeric = function () {
        return this
            .replace(/0/g, "۰")
            .replace(/1/g, "۱")
            .replace(/2/g, "۲")
            .replace(/3/g, "۳")
            .replace(/4/g, "۴")
            .replace(/5/g, "۵")
            .replace(/6/g, "۶")
            .replace(/7/g, "۷")
            .replace(/8/g, "۸")
            .replace(/9/g, "۹");
    };
})();