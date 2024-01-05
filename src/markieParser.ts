import * as vscode from 'vscode';
import { Marking } from './markie';

export function parseComments(document: vscode.TextDocument): Marking[] {
    const markings: Marking[] = [];

    for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);
        const commentMatch = line.text.match(/\/\/\s*\$\$(\w+)\s*(\[\d+,\s*\d+\])?\s*"([^"]+)"\s*"([^"]+)"/);

        if (commentMatch) {
            const type = commentMatch[1];
            const range = commentMatch[2] ? JSON.parse(commentMatch[2]) : [line.lineNumber, line.lineNumber];
            const name = commentMatch[3];
            const description = commentMatch[4];

            markings.push(new Marking(type, range, name, description, document.fileName));
        }
    }

    return markings;
}