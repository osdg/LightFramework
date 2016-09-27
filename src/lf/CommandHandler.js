/**
 * Created by plter on 9/27/16.
 */

window.lf = window.lf || {};

(function () {

    class CommandHandler {

        /**
         * @abstract
         * @param {Command} command
         */
        handle(command) {
        }

        /**
         * @protected
         * @param {Gate|*} value
         */
        set gate(value) {
            this._gate = value;
        }

        /**
         * @returns {Gate|*}
         */
        get gate() {
            return this._gate;
        }

        /**
         * @protected
         * @return {function(this:CommandHandler)}
         */
        get internal_handler() {
            if (!this._internal_handler) {
                this._internal_handler = this.handle.bind(this);
            }
            return this._internal_handler;
        }

        get commandHandler() {
            return this.gate.commandAdapter;
        }
    }

    lf.CommandHandler = CommandHandler;
})();