// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // console.log('Congratulations, your extension "vscode-dbc" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerTextEditorCommand(
    "vscode-dbc.commentLine",
    function () {
      // Get the active text editor
      let editor = vscode.window.activeTextEditor;

      if (editor) {
        let document = editor.document;

        editor.edit((editBuilder) => {
          editor.selections.forEach(function (s) {
            // Check if the first line of the selection is a comment
            let isComment = document.lineAt(s.start.line).text.match(/^[.*+]/);

            // Comment/Uncomment every line in selection
            for (let l = s.start.line; l <= s.end.line; l++) {
              let pos = new vscode.Position(l, 0);
              let line = document.lineAt(l);
              if (isComment) {
                let newLine = line.text.replace(/^[.*+]+[\s/]?/, "");
                editBuilder.replace(line.range, newLine);
                // console.log("uncomment ", l);
              } else {
                editBuilder.insert(pos, ". ");
                // console.log("comment ", l);
              }
            }
          });
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
