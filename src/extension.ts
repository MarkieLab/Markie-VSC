// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { MarkieSidebarProvider } from './sidebarProvider';
import { parseComments } from './markieParser';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    console.log('Extension activated');
    const sidebarProvider = new MarkieSidebarProvider();
    vscode.window.registerTreeDataProvider('markieSidebar', sidebarProvider);

    vscode.commands.registerCommand('markie.refresh', () => sidebarProvider.refresh());

    context.subscriptions.push(vscode.commands.registerCommand('markie.showMarkie', () => {
        vscode.commands.executeCommand('workbench.view.extension.markieSidebar');
    }));

    // Register an event listener to update the sidebar when the active editor changes
    vscode.window.onDidChangeActiveTextEditor(() => {
        if (vscode.window.activeTextEditor) {
            sidebarProvider.refresh(); // Refresh without passing any arguments
        }
    });
}

// This method is called when your extension is deactivated
export function deactivate() { }
