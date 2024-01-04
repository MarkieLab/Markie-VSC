import * as vscode from 'vscode';
import { Marking } from './markie';
import { parseComments } from './markieParser';

export class MarkieSidebarProvider implements vscode.TreeDataProvider<Marking> {
    private _onDidChangeTreeData: vscode.EventEmitter<Marking | undefined> = new vscode.EventEmitter<Marking | undefined>();
    readonly onDidChangeTreeData: vscode.Event<Marking | undefined> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }

    getTreeItem(element: Marking): vscode.TreeItem {
        return {
            label: element.name,
            collapsibleState: vscode.TreeItemCollapsibleState.None,
            tooltip: `${element.type}: ${element.description}`,
        };
    }

    getChildren(element?: Marking): Thenable<Marking[]> {
        // Fetch markings internally here
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            const markings = parseComments(activeEditor.document);
            return Promise.resolve(markings);
        }

        return Promise.resolve([]);
    }
}
