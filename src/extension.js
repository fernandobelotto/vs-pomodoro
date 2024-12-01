"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const activate = (context) => {
    let currentPanel = undefined;
    const createWebviewPanel = () => {
        currentPanel = vscode.window.createWebviewPanel("pomodoroView", "Pomodoro Timer", vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        currentPanel.webview.html = getWebviewContent(currentPanel.webview, context.extensionUri);
        currentPanel.onDidDispose(() => {
            currentPanel = undefined;
        }, null, context.subscriptions);
    };
    let disposable = vscode.commands.registerCommand("vs-pomodoro.startTimer", () => {
        if (currentPanel) {
            currentPanel.reveal(vscode.ViewColumn.One);
        }
        else {
            createWebviewPanel();
        }
    });
    context.subscriptions.push(disposable);
    // Register the custom view provider
    const provider = new PomodoroViewProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("pomodoro-view", provider));
};
exports.activate = activate;
class PomodoroViewProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        webviewView.webview.html = getWebviewContent(webviewView.webview, this._extensionUri);
    }
}
function getWebviewContent(webview, extensionUri) {
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "out", "webview.js"));
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
const deactivate = () => { };
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map