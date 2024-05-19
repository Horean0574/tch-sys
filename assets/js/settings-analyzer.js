let content = "";

function execStatement(keys, k) {
    let statement = keys[k].substring(1);
    let iBracketL = statement.indexOf("(");
    let iBracketR = statement.indexOf(")");
    let execName = statement.substring(0, iBracketL);
    let execParams = statement.substring(iBracketL + 1, iBracketR).split(",");
    execParams.forEach((v, i) => execParams[i] = v.trim());
    execParams[0] = parseInt(execParams[0]);
    if (execName === "associated") {
        let replaceWith = content[execParams[0]][execParams[1]];
        for (let i = 2; i < execParams.length; ++i) {
            replaceWith = replaceWith[execParams[i]];
        }
        keys[k] = replaceWith;
    } else {
        keys[k] = {};
    }
}

function findStatements(keys) {
    for (let k in keys) {
        if (typeof keys[k] === "string" && keys[k].startsWith(":")) {
            execStatement(keys, k);
            continue;
        }
        if (typeof keys[k] === "object" && keys[k] !== {} && keys[k] !== []) {
            findStatements(keys[k]);
        }
    }
}

function analyzeMain(cont) {
    content = cont = JSON.parse(cont);

    // DFS find statements
    findStatements(cont);

    return JSON.stringify(cont);
}
