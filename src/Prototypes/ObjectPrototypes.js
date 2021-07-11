module.exports = (function () {
    /**
     * Creates An Instance Of FormData From Base Object 
     * @returns {FormData}
     */
    Object.prototype.toFormData = function () {
        const formData = new FormData();
        const binder = (data, parentKey) => {
            if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
                Object.keys(data).forEach(key => {
                    binder(data[key], parentKey ? `${parentKey}[${key}]` : key);
                });
            } else {
                const value = data == null ? '' : data;
                formData.append(parentKey, value);
            }
        }
        binder(this);
        return formData;
    }
})();