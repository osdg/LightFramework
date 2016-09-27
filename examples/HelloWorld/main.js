/**
 * Created by plter on 9/27/16.
 */

(function () {

    const CommandHandler = lf.CommandHandler;
    const Gate = lf.Gate;
    const Command = lf.Command;

    class Handler extends CommandHandler {

        handle(command) {
            console.log(command);
        }
    }


    class App extends Gate {

        constructor() {
            super();

            this.registerCommand("start", this.createHandler(Handler));
            this.sendCommand(new Command("start", "Hello World"));
        }
    }

    new App();
})();