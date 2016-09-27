/**
 * Created by plter on 9/27/16.
 */

window.lf = window.lf || {};

(function () {

    class Gate {

        constructor() {
            this._commandAdapter = new lf.CommandAdapter();
        }

        get commandAdapter() {
            return this._commandAdapter;
        }

        /**
         *
         * @param {String} type
         * @param {*} handler
         */
        registerCommand(type, handler) {
            this.commandAdapter.registerCommand(type, handler);
        }

        unregisterCommand(type, handler) {
            this.commandAdapter.unregisterCommand(type, handler);
        }

        sendCommand(command) {
            this.commandAdapter.dispatchEvent(command);
        }

        /**
         *
         * @param HandlerClass CommandHandler.class
         * @param args
         */
        createHandler(HandlerClass, ...args) {
            let h = new HandlerClass(...args);
            h.gate = this;
            return h;
        }
    }

    lf.Gate = Gate;
})();