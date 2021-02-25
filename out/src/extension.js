'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const RobotFormatProvider_1 = require("./provider/RobotFormatProvider");
function activate(context) {
    console.log("robotframework formatter extension is running");
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('robot', new RobotFormatProvider_1.RobotFormatProvider()));
}
exports.activate = activate;
function deactivate() {
    console.log("robotframework formatter extension killed");
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map