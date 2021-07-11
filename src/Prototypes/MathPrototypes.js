module.exports = (function () {
    /**
     * Calculates A Random Number Between Two Numbers
     * @param {Number} startRange Default Is Zero
     * @param {Number} endRange  Default Is One
     * @returns {Number}
     */
    Math.randomInRange = function (startRange, endRange) {
        if (typeof endRange != "number") {
            return 0;
        }
        if (typeof startRange != "number") {
            startRange = 1;
        }
        startRange = parseInt(startRange);
        endRange = parseInt(endRange);

        if (endRange < startRange) {
            var temp = endRange;
            endRange = startRange;
            startRange = temp;
        }

        if (endRange == startRange) {
            return startRange;
        }

        return Math.floor(Math.random() * (endRange - startRange + 1)) + startRange;
    };

    /**
     * Creates A Random Boolean
     * @returns {Boolean}
     */
    Math.randomBoolean = () => Math.random() >= 0.5;
})();