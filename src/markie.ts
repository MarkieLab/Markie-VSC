export class Marking {
    type: string;
    range: [number, number];
    name: string;
    description: string;
    fileName: string;
// $$marking [1, 1] "Marking" "This is a marking"
    constructor(type: string, range: [number, number], name: string, description: string, fileName: string) {
        this.type = type;
        this.range = range;
        this.name = name;
        this.description = description;
        this.fileName = fileName;
    }
}