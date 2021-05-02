'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
const vscode_1 = require("vscode");
let config = vscode_1.workspace.getConfiguration('rbfFormatter');
let maxCharsInArgsReinitBucket = config.get('maxCharsInArgsReinitBucket', "1000");
let maxCharsInArgsKeepBucket = config.get('maxCharsInArgsKeepBucket', "60");
let maxArgsInKwLineKeepBucket = config.get('maxArgsInKwLineKeepBucket', "10");
let maxArgsInKwLineReinitBucket = config.get('maxArgsInKwLineReinitBucket', "1000");
let interIndent = config.get('interIndent', "    ");
var Type;
var robotLoopIndent = "";

(function(Type) {
    Type[Type["Resource"] = 0] = "Resource";
    Type[Type["Body"] = 1] = "Body";
    Type[Type["Name"] = 2] = "Name";
    Type[Type["Comment"] = 3] = "Comment";
    Type[Type["Empty"] = 4] = "Empty";
    Type[Type["Formated"] = 5] = "Formated";
    Type[Type["LongKeyword"] = 6] = "LongKeyword";
    Type[Type["Undefined"] = 7] = "Undefined";
    Type[Type["Loop"] = 8] = "Loop";
    Type[Type["End"] = 9] = "End";
    Type[Type["Else"] = 10] = "Else";
    Type[Type["ThreePoints"] = 11] = "ThreePoints";
})(Type || (Type = {}));

function multiplyString(base, times) {
    let result = '';
    for (let i = 0; i < times; i++) {
        result += base;
    }
    return result;
}

function getEmptyArrayOfString(length) {
    let str = new Array(length);
    for (let i = 0; i < length; i++) {
        str[i] = "";
    }
    return str;
}

function documentEditor(ranges, newStr) {
    let editor = [];
    for (let i = 0; i < newStr.length; i++) {
        editor.push(new vscode_1.TextEdit(ranges[i], newStr[i]));
    }
    return editor;
}
class RobotFormatProvider {
    provideDocumentFormattingEdits(document, options, token) {
        let ranges = RobotFormatProvider.getAllLineRange(document);
        let formatted = RobotFormatProvider.groupFormat(document);
        return documentEditor(ranges, formatted);
    }

    static getAllLineRange(document) {
        let ranges = [];
        for (let i = 0; i < document.lineCount; i++) {
            let range = document.lineAt(i).range;
            ranges.push(range);
        }
        return ranges;
    }

    //Group format nouvelle méthode avec fonction récursive "loopOverNested"
    static groupFormat(document) {
        var lines = new Array(document.lineCount + 1);
        for (let i = 0; i < document.lineCount; i++) {
            lines[i] = document.lineAt(i).text;
        }
        lines[lines.length - 1] = '';
        let lastType = Type.Undefined;
        let bucket = [];
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].replace(/\s+$/, '');
            const type = RobotFormatProvider.getLineType(line);
            if (type == Type.Name || type == Type.Empty || type == Type.Formated) {
                if (bucket.length > 0) {
                    const columns = RobotFormatProvider.identifyBucketColumns(bucket, lines);
                    RobotFormatProvider.formatBucket(bucket, columns, lines, robotLoopIndent);
                }
				let arr = line.split(/\s{2,}\|{0,}\s{2,}|\s{2,}/)
				lines[i] = arr.slice(0, 2).join(interIndent.replace(/[^\s]/, "")) + (arr.length > 2 ? interIndent : "") + arr.slice(2).join(interIndent);
				lines[i] = lines[i].trimEnd()
                bucket = [];
            } else if (type == Type.Loop) {
                var listReturnedArgs = RobotFormatProvider.loopOverNested(bucket, lines, i, robotLoopIndent, lastType);
                bucket = listReturnedArgs[0];
                lines = listReturnedArgs[1];
                i = listReturnedArgs[2];
                robotLoopIndent = listReturnedArgs[3];
                lastType = listReturnedArgs[4];
            } else if (type == Type.Comment) {
                lines[i] = line;
                var listeResultsLoop = RobotFormatProvider.loopOverComment(lines, i, robotLoopIndent);
                lines = listeResultsLoop[0];
                i = listeResultsLoop[1];
                robotLoopIndent = listeResultsLoop[2];
            } else if (type == Type.LongKeyword) {
                let line = lines[i];
				let arr = line.split(/\s{2,}\|{0,}\s{2,}|\s{2,}/)
				lines[i] = arr.slice(0, 2).join(interIndent.replace(/[^\s]/, "")) + (arr.length > 2 ? interIndent : "") + arr.slice(2).join(interIndent);
				lines[i] = lines[i].trimEnd()
            } else {
                bucket.push(i);
            }
            if (type != Type.Comment) {
                lastType = type;
            }
        }
        lines.splice(lines.length - 1);
        return lines;
    }

    static loopOverComment(lines, index, robotLoopIndent) {
        for (let y = index + 1; y < lines.length; y++) {
            let line = lines[y].replace(/\s+$/, '');
            const type = RobotFormatProvider.getLineType(line);
            if (type == Type.ThreePoints || type == Type.Comment) {
                lines[y] = line;
            } else {
                index = y - 1;
                return [lines, index, robotLoopIndent];
            }
        }
    }

    static loopOverNested(bucket, lines, index, robotLoopIndent, lastType) {
        if (bucket.length > 0) {
            const columns = RobotFormatProvider.identifyBucketColumns(bucket, lines);
            RobotFormatProvider.formatBucket(bucket, columns, lines, robotLoopIndent);
        }
        let line = lines[index];	
		let arr = line.split(/\s{2,}\|{0,}\s{2,}|\s{2,}/)
		lines[index] = robotLoopIndent.replace(/[^\s]/, "") + arr.slice(0, 2).join(interIndent.replace(/[^\s]/, "")) + (arr.length > 2 ? interIndent : "") + arr.slice(2).join(interIndent);			
		lines[index] = lines[index].trimEnd()
        bucket = [];
        robotLoopIndent = robotLoopIndent + interIndent;
        for (let x = index + 1; x < lines.length; x++) {
            let line = lines[x].replace(/\s+$/, '');
            const type = RobotFormatProvider.getLineType(line);
            if (type == Type.Empty || type == Type.Formated) {
                if (bucket.length > 0) {
                    const columns = RobotFormatProvider.identifyBucketColumns(bucket, lines);
                    RobotFormatProvider.formatBucket(bucket, columns, lines, robotLoopIndent);
                }
                let line = lines[x];
				let arr = line.split(/\s{2,}\|{0,}\s{2,}|\s{2,}/)
				lines[x] = robotLoopIndent.replace(/[^\s]/, "") + arr.slice(0, 2).join(interIndent.replace(/[^\s]/, "")) + (arr.length > 2 ? interIndent : "") + arr.slice(2).join(interIndent);
				lines[x] = lines[x].trimEnd()
                bucket = [];
            } else if (type == Type.Comment) {
                lines[x] = line;
                var listeResultsLoop = RobotFormatProvider.loopOverComment(lines, x, robotLoopIndent);
                lines = listeResultsLoop[0];
                x = listeResultsLoop[1];
                robotLoopIndent = listeResultsLoop[2];
            } else if (type == Type.LongKeyword) {
				let line = lines[x];
				let arr = line.split(/\s{2,}\|{0,}\s{2,}|\s{2,}/)
				lines[x] = robotLoopIndent.replace(/[^\s]/, "") + arr.slice(0, 2).join(interIndent.replace(/[^\s]/, "")) + (arr.length > 2 ? interIndent : "") + arr.slice(2).join(interIndent);
				lines[x] = lines[x].trimEnd()
            } else if (type == Type.Loop) {
                var listReturnedArgs = RobotFormatProvider.loopOverNested(bucket, lines, x, robotLoopIndent, lastType);
                bucket = listReturnedArgs[0];
                lines = listReturnedArgs[1];
                x = listReturnedArgs[2];
                robotLoopIndent = listReturnedArgs[3];
                lastType = listReturnedArgs[4];
            } else if (type == Type.Else) {
                if (bucket.length > 0) {
                    const columns = RobotFormatProvider.identifyBucketColumns(bucket, lines);
                    RobotFormatProvider.formatBucket(bucket, columns, lines, robotLoopIndent);
                }
                let line = lines[x];
				let arr = line.split(/\s{2,}\|{0,}\s{2,}|\s{2,}/)
				lines[x] = robotLoopIndent.replace(/[^\s]/, "").slice(0, -interIndent.length) + arr.slice(0, 2).join(interIndent.replace(/[^\s]/, "")) + (arr.length > 2 ? interIndent : "") + arr.slice(2).join(interIndent);
				lines[x] = lines[x].trimEnd()
                bucket = [];
            } else if (type == Type.Name) {
                if (bucket.length > 0) {
                    const columns = RobotFormatProvider.identifyBucketColumns(bucket, lines);
                    RobotFormatProvider.formatBucket(bucket, columns, lines, robotLoopIndent);
                }
                robotLoopIndent = "";
                let line = lines[x];
                line = line.split(/\s{2,}\|{0,}\s{2,}|\s{2,}/).join(interIndent);
                lines[x] = line.trimEnd();
                bucket = [];
                index = x - 1
                return [bucket, lines, index, robotLoopIndent, lastType];
            } else if (type == Type.End) {
                if (bucket.length > 0) {
                    const columns = RobotFormatProvider.identifyBucketColumns(bucket, lines);
                    RobotFormatProvider.formatBucket(bucket, columns, lines, robotLoopIndent);
                }
                robotLoopIndent = robotLoopIndent.replace(/[^\s]/, "").slice(0, -interIndent.length);
                let line = lines[x];
				let arr = line.split(/\s{2,}\|{0,}\s{2,}|\s{2,}/)
				lines[x] = robotLoopIndent.replace(/[^\s]/, "") + arr.slice(0, 2).join(interIndent.replace(/[^\s]/, "")) + (arr.length > 2 ? interIndent : "") + arr.slice(2).join(interIndent);
				lines[x] = lines[x].trimEnd()
                bucket = [];
                index = x
                return [bucket, lines, index, robotLoopIndent, lastType];
            } else {
                bucket.push(x);
            }
            if (type != Type.Comment) {
                lastType = type;
            }
        }
    }

    static identifyBucketColumns(bucket, lines) {
        let columns = [];
        for (var index of bucket) {
            let line = lines[index];
            let arr = line.split(/\s{2,}\|{0,}\s{2,}|\s{2,}/);
            for (let i = columns.length; i < arr.length; i++) {
                columns.push(0);
            }
            for (let i = 0; i < arr.length; i++) {
                columns[i] = columns[i] < arr[i].length ?
                    arr[i].length :
                    columns[i];
            }
        }
        return columns;
    }

    static formatBucket(bucket, columns, lines, robotLoopIndent) {
        for (let index of bucket) {
            lines[index] = RobotFormatProvider.formatLine(lines[index], columns, robotLoopIndent);
        }
    }

    static formatLine(line, columns, robotLoopIndent) {
        let arr = line.split(/\s{2,}\|{0,}\s{2,}|\s{2,}/);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i] + (i == arr.length - 1 ?
                '' :
                multiplyString(' ', columns[i] - arr[i].length));
        }
        return (robotLoopIndent.replace(/[^\s]/, "") + arr.slice(0, 2).join(interIndent.replace(/[^\s]/, "")) + (arr.length > 2 ? interIndent : "") + arr.slice(2).join(interIndent)).trimEnd();
    }

    static getLineType(line) {
        var veryLongStringReinitBucket = new RegExp("\\  ([^\\s](\\s[^\\s]|\\s){0,1}){" + maxCharsInArgsReinitBucket + ",}((\\  )|)");
        var longStringKeepBucket = new RegExp("\\  ([^\\s](\\s[^\\s]|\\s){0,1}){" + maxCharsInArgsKeepBucket + ",}((\\  )|)");
        var manyArgsKwKeepBucket = new RegExp("([.\\s]{2,}([^\\s](\\s[^\\s]){0,1})+){" + maxArgsInKwLineKeepBucket + ",}");
        var manyArgsKwReinitBucket = new RegExp("([.\\s]{2,}([^\\s](\\s[^\\s]){0,1})+){" + maxArgsInKwLineReinitBucket + ",}");
        let l = line.replace(/\s+$/, "");
        if (/^\S+/.test(l)) {
            if (l.replace(/^\\\s+/, "\\ ").split(/\s{2,}\|{0,}\s{2,}|\s{2,}/).length > 1) {
                return Type.Resource;
            } else {
                return Type.Name;
            }
        }
        if (l.length == 0) {
            return Type.Empty;
        }
        if (/^\s*#/.test(l) || /^\s*\[Documentation/.test(l) || /^\s*\|\|\|/.test(l)) {
            return Type.Comment;
        }
        if (/^\s*FOR/.test(l) || /^\s*IF/.test(l) || /^\s*GIVEN/.test(l)) {
            return Type.Loop;
        }
        if (/^\s*END/.test(l)) {
            return Type.End;
        }
        if (/^\s*\.\.\.  /.test(l) && !(/\s*AND  /.test(l))) {
            return Type.ThreePoints;
        }
        if (/^\s*ELSE/.test(l) || /^\s*THEN/.test(l) || /^\s*WHEN/.test(l)) {
            return Type.Else;
        }
        if (/^\s*\[Tags/.test(l) || veryLongStringReinitBucket.test(l) || manyArgsKwReinitBucket.test(l) || /^\s*\[Setup/.test(l) || /^\s*\[Teardown/.test(l) || /^\s*\[Arguments/.test(l) || /^\s*\[Return/.test(l)) {
            return Type.Formated;
        }
        if (/^\s*Go To/.test(l) || longStringKeepBucket.test(l) || manyArgsKwKeepBucket.test(l) || /^\s*Execute JavaScript/.test(l)) {
            return Type.LongKeyword;
        }
        return Type.Body;
    }

}
exports.RobotFormatProvider = RobotFormatProvider;
//# sourceMappingURL=RobotFormatProvider.js.map