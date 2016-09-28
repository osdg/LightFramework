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
/**
 * Created by plter on 9/27/16.
 */

window.lf = window.lf || {};

(function () {

    const CommandHandler = lf.CommandHandler;

    class ViewController extends CommandHandler {


        constructor(view) {
            super();

            this._view = view;
        }

        get view() {
            return this._view;
        }
    }


    lf.ViewController = ViewController;
})();
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