const PROJECT_NAME = "tch-sys";
const DEV_MODE_ON = false;
let fnItems = [];
let ftItems = [];

function initFnSettings(fnData) {
    let settings = JSON.parse(localStorage["settings"]);
    if (settings[fnData["id"]] === undefined) {
        settings[fnData["id"]] = fnData["settings"];
        localStorage["settings"] = JSON.stringify(settings);
    }
}

function initFtSettings(ftData) {
    let settings = JSON.parse(localStorage["settings"]);
    if (settings[ftData["id"]] === undefined) {
        settings[ftData["id"]] = ftData["settings"];
        localStorage["settings"] = JSON.stringify(settings);
    }
}

function initHomeNav() {
    let importEle = document.querySelector("#import-btn");
    let importInfo = document.createElement("span");

    let importReq = new XMLHttpRequest();
    importReq.open("get", "./templates/nav/import.html");
    importReq.send(null);
    importReq.addEventListener("load", function () {
        importInfo.innerHTML = importReq.responseText;
    });

    let signInObj = {
        title: "导入设置",
        info: importInfo,
    };

    importEle.addEventListener("click", function () {
        openPopup(importEle, signInObj, "nav");
        importNav();
    });
}

function initFnEle(fnList, fnListReq) {
    let data = JSON.parse(fnListReq.responseText);
    localStorage["fn-data"] = fnListReq.responseText;
    for (let i = 0; i < data.length; ++i) {
        initFnSettings(data[i]);
        let newFnItem = document.createElement("li");
        newFnItem.id = data[i]["id"];
        newFnItem.className = "fn-item";
        let newFnItemTitle = document.createElement("h2");
        newFnItemTitle.className = "fn-item-title";
        newFnItemTitle.innerHTML = data[i]["title"];
        let newFnItemDesc = document.createElement("p");
        newFnItemDesc.className = "fn-item-desc";
        newFnItemDesc.innerHTML = data[i]["desc"];
        let newFnItemBtn = document.createElement("button");
        newFnItemBtn.className = "fn-item-btn general-btn";
        newFnItemBtn.innerHTML = "立即使用";
        let newFnItemInfo = document.createElement("div");
        newFnItemInfo.className = "fn-item-info";
        newFnItem.appendChild(newFnItemTitle);
        newFnItem.appendChild(newFnItemDesc);
        newFnItem.appendChild(newFnItemBtn);
        newFnItem.appendChild(newFnItemInfo);
        fnList.appendChild(newFnItem);
        fnItems.push(newFnItem);
    }
}

function initFunctions() {
    // console.log(fnItems);
    let fnMap = {"rand-stu": randStuFn, "count-down": countDownFn};
    for (let i = 0; i < fnItems.length; ++i) {
        let fnItem = fnItems[i];
        let fnItemInfo = fnItem.querySelector(".fn-item-info");
        let fnItemReq = new XMLHttpRequest();
        fnItemReq.open("get", `./templates/fn/${fnItem.id}.html`);
        fnItemReq.send(null);
        fnItemReq.addEventListener("load", function () {
            fnItemInfo.innerHTML = fnItemReq.responseText;
        });
    }
    for (let i = 0; i < fnItems.length; ++i) {
        let fnItemEle = fnItems[i];
        let fnItemObj = {};
        fnItemObj.title = fnItemEle.querySelector(".fn-item-title").innerHTML;
        fnItemObj.desc = fnItemEle.querySelector(".fn-item-desc").innerHTML;
        fnItemObj.info = fnItemEle.querySelector(".fn-item-info");
        fnItemObj.btn = fnItemEle.querySelector(".fn-item-btn");
        let itemTitle = `【${fnItemObj.title}】${fnItemObj.desc}`;
        itemTitle = itemTitle.replace("&amp;", "&");
        fnItemEle.title = itemTitle;
        fnItemObj.btn.addEventListener("click", function () {
            openPopup(fnItemEle, fnItemObj, "fn");
            fnMap[fnItemEle.id]();
        });
    }
}

function initFtEle(ftList, ftListReq, itemLarge) {
    let data = JSON.parse(ftListReq.responseText);
    // localStorage["ft-data"] = ftListReq.responseText;
    for (let i = 0; i < data.length; ++i) {
        initFtSettings(data[i]);
        let newFtItem = document.createElement("li");
        newFtItem.id = data[i]["id"];
        newFtItem.className = "ft-item";
        if (itemLarge) {
            newFtItem.classList.add("ft-item-large");
        }
        let newFtItemText = document.createElement("h3");
        newFtItemText.className = "ft-item-text";
        newFtItemText.innerHTML = data[i]["text"];
        let newFtItemDesc = document.createElement("p");
        newFtItemDesc.className = "ft-item-desc";
        newFtItemDesc.innerHTML = data[i]["desc"];
        // neon effect spans
        for (let i = 0; i < 4; ++i) {
            let newFtItemSpan = document.createElement("span");
            newFtItem.appendChild(newFtItemSpan);
        }
        newFtItem.appendChild(newFtItemText);
        if (itemLarge) {
            newFtItem.appendChild(newFtItemDesc);
        }
        ftList.appendChild(newFtItem);
        ftItems.push(newFtItem);
    }
}

function initFeatures() {
    // console.log(ftItems);
    for (let i = 0; i < ftItems.length; ++i) {
        let ftItem = ftItems[i];
        ftItem.title = ftItem.querySelector(".ft-item-text").innerHTML;
        ftItem.addEventListener("click", function () {
            let newUrl = createUrlObj("/feature");
            newUrl.searchParams.set("s", ftItem.id);
            console.log(newUrl.href);
            location = newUrl;
        });
    }
}

// Only used for creating absolute URL path
function createUrlObj(pathname) {
    let newUrl;
    if (DEV_MODE_ON) {
        newUrl = new URL(location);
        newUrl.pathname = "/" + PROJECT_NAME;
        newUrl.pathname += pathname + "/index.html";
        let it = newUrl.searchParams.keys();
        for (let p = it.next(); !p.done; p = it.next()) {
            if (p.value !== "_ijt" && p.value !== "_ij_reload") {
                newUrl.searchParams.delete(p.value);
            }
        }
    } else {
        newUrl = new URL(location.origin);
        newUrl.pathname = pathname;
    }
    return newUrl;
}

function getNavEleById(parent, navId) {
    return parent.querySelector(`[data-nav-id="${navId}"]`);
}

function getFnEleById(parent, fnId) {
    return parent.querySelector(`[data-fn-id="${fnId}"]`);
}
