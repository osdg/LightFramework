/**
 * Created by plter on 9/27/16.
 */

window.lf = window.lf || {};

(function () {

    class CommandAdapter {

        constructor() {
            lf.configAsEventTarget(this);
        }

        /**
         *
         * @param {String} type
         * @param {*} handler
         */
        registerCommand(type, handler) {
            this.addEventListener(type, handler.internal_handler);
        }

        unregisterCommand(type, handler) {
            this.removeEventListener(type, handler.internal_handler);
        }

        sendCommand(command) {
            this.dispatchEvent(command);
        }

        sendCommand2(type, data) {
            this.sendCommand(new lf.Command(type, data));
        }

        /**
         * @private
         * @return {{}|*}
         */
        get internal_data() {
            if (!this._data) {
                this._data = {};
            }
            return this._data;
        }

        setItem(key, value) {
            this.internal_data[key] = value;
        }

        getItem(key, defaultValue) {
            let value = this.internal_data[key];
            return value ? value : defaultValue;
        }
    }

    lf.CommandAdapter = CommandAdapter;
})();