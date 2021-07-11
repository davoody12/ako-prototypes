module.exports = (function () {
    /**
     * Reverse Base Boolean Value
     * @returns {Boolean}
     */
    Boolean.prototype.reverse = function () { return !this; };
})();