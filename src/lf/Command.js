/**
 * Created by plter on 9/27/16.
 */

window.lf = window.lf || {};

(function () {

    class Command extends Event {

        constructor(type, data, cmdInitDict) {
            super(type, cmdInitDict);

            this._data = data;
        }

        get data() {
            return this._data;
        }
    }

    lf.Command = Command;
})();