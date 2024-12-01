import * as vscode from "vscode";
import * as path from "path";

export const activate = (context: vscode.ExtensionContext) => {
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  const createWebviewPanel = () => {
    currentPanel = vscode.window.createWebviewPanel(
      "pomodoroView",
      "Pomodoro Timer",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    currentPanel.webview.html = getWebviewContent(
      currentPanel.webview,
      context.extensionUri
    );

    currentPanel.onDidDispose(
      () => {
        currentPanel = undefined;
      },
      null,
      context.subscriptions
    );
  };

  let disposable = vscode.commands.registerCommand(
    "vs-pomodoro.startTimer",
    () => {
      if (currentPanel) {
        currentPanel.reveal(vscode.ViewColumn.One);
      } else {
        createWebviewPanel();
      }
    }
  );

  context.subscriptions.push(disposable);

  // Register the custom view provider
  const provider = new PomodoroViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("pomodoro-view", provider)
  );
};

class PomodoroViewProvider implements vscode.WebviewViewProvider {
  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = getWebviewContent(
      webviewView.webview,
      this._extensionUri
    );
  }
}

function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
  const scriptUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, "out", "webview.js")
  );

  return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Pomodoro Timer</title>
		</head>
		<body>
			<div id="root"></div>
			<script src="${scriptUri}"></script>
		</body>
		</html>`;
}

export const deactivate = () => {};
