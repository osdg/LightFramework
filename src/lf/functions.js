/**
 * Created by plter on 9/27/16.
 */

window.lf = window.lf || {};

(function () {
    lf.configAsEventTarget = function (object) {
        var _et = document.createDocumentFragment();
        Object.defineProperty(_et, "realTarget", {
            get: function () {
                return object;
            }
        });

        [
            'addEventListener',
            'removeEventListener',
            'dispatchEvent'
        ].forEach(methodName=> object[methodName] = _et[methodName].bind(_et));
        return object;
    }
})();