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