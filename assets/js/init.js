let fnItems = [];

function initSettings(fnData) {
    let settings = JSON.parse(localStorage["settings"]);
    if (settings[fnData["id"]] === undefined) {
        settings[fnData["id"]] = fnData["settings"];
        localStorage["settings"] = JSON.stringify(settings);
    }
}

function initNav() {
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

function initElements(fnList, fnListReq) {
    let data = JSON.parse(fnListReq.responseText);
    localStorage["fn-data"] = fnListReq.responseText;
    for (let i = 0; i < data.length; i++) {
        initSettings(data[i]);
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
    for (let i = 0; i < fnItems.length; i++) {
        let fnItem = fnItems[i];
        let fnItemInfo = fnItem.querySelector(".fn-item-info");
        let fnItemReq = new XMLHttpRequest();
        fnItemReq.open("get", `./templates/fn/${fnItem.id}.html`);
        fnItemReq.send(null);
        fnItemReq.addEventListener("load", function () {
            fnItemInfo.innerHTML = fnItemReq.responseText;
        });
    }
    for (let i = 0; i < fnItems.length; i++) {
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

function getNavEleById(parent, navId) {
    return parent.querySelector(`[data-nav-id="${navId}"]`);
}

function getFnEleById(parent, fnId) {
    return parent.querySelector(`[data-fn-id="${fnId}"]`);
}
