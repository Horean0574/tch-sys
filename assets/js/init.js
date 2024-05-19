const PROJECT_NAME = "tch-sys";
const DEV_MODE_ON = true;
let fnItems = [];
let ftItems = [];

function initStorage() {
    // check structure
    function checkStruct(std_, toCheck) {
        for (let k in std_) {
            if (toCheck[k] === undefined || Object.getPrototypeOf(toCheck[k]) !== Object.getPrototypeOf(std_[k])) {
                structState = 0;
                return false;
            }
            if (std_[k] !== {} && std_[k] !== []) {
                checkStruct(std_[k], toCheck[k]);
            }
        }
        structState = 1;
        return true;
    }

    console.log("Connecting to local storage...");
    let directStorages = {"settings": [{}, {}], "settings-keys": [{}, {}]};
    let structState = -1;
    for (let s in directStorages) {
        structState = -1;
        try {
            localStorage[s] !== undefined && JSON.parse(localStorage[s]);
        } catch {
            structState = 0;
        } finally {
            if (localStorage[s] === undefined || !structState || !checkStruct(directStorages[s], JSON.parse(localStorage[s]))) {
                localStorage[s] = JSON.stringify(directStorages[s]);
                console.log(`Storage [${s}] ${!structState ? "revised" : "created"}.`);
            }
        }
    }
    console.log("Connected successfully.");
    console.warn("Don't paste or execute anything in here. You may not know what it does if you are not the developer.");
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

// initialize Function elements
function initFnEle(fnList, fnListReq) {
    let data = JSON.parse(fnListReq.responseText);
    let settings = JSON.parse(localStorage["settings"]);
    let settingsKeys = JSON.parse(localStorage["settings-keys"]);
    for (let d of data) {
        // initialize settings (including settings-keys)
        if (settings[0][d["id"]] === undefined) {
            settings[0][d["id"]] = d["settings"];
        }
        if (settingsKeys[0][d["id"]] === undefined) {
            settingsKeys[0][d["id"]] = d["settings-keys"];
        }

        // new elements
        let newFnItem = document.createElement("li");
        newFnItem.id = d["id"];
        newFnItem.className = "fn-item";
        let newFnItemTitle = document.createElement("h2");
        newFnItemTitle.className = "fn-item-title";
        newFnItemTitle.innerHTML = d["title"];
        let newFnItemDesc = document.createElement("p");
        newFnItemDesc.className = "fn-item-desc";
        newFnItemDesc.innerHTML = d["desc"];
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
    // save settings
    localStorage["settings"] = JSON.stringify(settings);
    localStorage["settings-keys"] = JSON.stringify(settingsKeys);
}

function initFunctions() {
    // console.log(fnItems);
    const fnFns = {"rand-stu": randStuFn, "count-down": countDownFn};
    for (let item of fnItems) {
        let itemInfo = item.querySelector(".fn-item-info");
        let itemReq = new XMLHttpRequest();
        itemReq.open("get", `./templates/fn/${item.id}.html`);
        itemReq.send(null);
        itemReq.addEventListener("load", function () {
            itemInfo.innerHTML = itemReq.responseText;
        });
    }
    for (let itemEle of fnItems) {
        let itemObj = {};
        itemObj.title = itemEle.querySelector(".fn-item-title").innerHTML;
        itemObj.desc = itemEle.querySelector(".fn-item-desc").innerHTML;
        itemObj.info = itemEle.querySelector(".fn-item-info");
        itemObj.btn = itemEle.querySelector(".fn-item-btn");
        let itemTitle = `【${itemObj.title}】${itemObj.desc}`;
        itemTitle = itemTitle.replace("&amp;", "&");
        itemEle.title = itemTitle;
        itemObj.btn.addEventListener("click", function () {
            openPopup(itemEle, itemObj, "fn");
            fnFns[itemEle.id]();
        });
    }
}

function initFtEle(ftList, ftListReq, itemLarge) {
    let data = JSON.parse(ftListReq.responseText);
    let settings = JSON.parse(localStorage["settings"]);
    let settingsKeys = JSON.parse(localStorage["settings-keys"]);
    for (let d of data) {
        // initialize settings (including settings-keys)
        if (settings[1][d["id"]] === undefined) {
            settings[1][d["id"]] = d["settings"];
        }
        if (settingsKeys[1][d["id"]] === undefined) {
            settingsKeys[1][d["id"]] = d["settings-keys"];
        }

        initFtSettings(d);
        let newFtItem = document.createElement("li");
        newFtItem.id = d["id"];
        newFtItem.className = "ft-item";
        itemLarge && newFtItem.classList.add("ft-item-large");
        let newFtItemText = document.createElement("h3");
        newFtItemText.className = "ft-item-text";
        newFtItemText.innerHTML = d["text"];
        let newFtItemDesc = document.createElement("p");
        newFtItemDesc.className = "ft-item-desc";
        itemLarge && (newFtItemDesc.style.display = "block");
        newFtItemDesc.innerHTML = d["desc"];
        // neon effect spans
        for (let i = 0; i < 4; ++i) {
            let newFtItemSpan = document.createElement("span");
            newFtItem.appendChild(newFtItemSpan);
        }
        newFtItem.appendChild(newFtItemText);
        newFtItem.appendChild(newFtItemDesc);
        ftList.appendChild(newFtItem);
        ftItems.push(newFtItem);
    }
    // save settings
    localStorage["settings"] = JSON.stringify(settings);
    localStorage["settings-keys"] = JSON.stringify(settingsKeys);
}

function initFeatures() {
    // console.log(ftItems);
    for (let i = 0; i < ftItems.length; ++i) {
        let ftItem = ftItems[i];
        ftItem.title = ftItem.querySelector(".ft-item-text").innerHTML;
        ftItem.addEventListener("click", function () {
            let newUrl = createUrlObj("/feature");
            newUrl.searchParams.set("s", ftItem.id);
            location = newUrl;
        });
        let timeoutId;
        let itemLarge = ftItem.classList.contains("ft-item-large");
        let itemWidth = ftItem.style.width, itemHeight = ftItem.style.height;
        let itemDesc = ftItem.querySelector(".ft-item-desc");
        ftItem.addEventListener("mouseenter", function () {
            if (itemLarge) return;
            timeoutId = setTimeout(() => {
                // Item Large style but using Javascript
                ftItem.style.width = "250px";
                ftItem.style.height = "200px";
                // opacity changing transition needs 300ms
                itemDesc.style.opacity = "0";
                itemDesc.style.display = "block";
                // opacity transition should be done with size transition
                setTimeout(() => {
                    itemDesc.style.opacity = "1";
                }, 200);
            }, 1000);
        });
        ftItem.addEventListener("mouseleave", function () {
            if (itemLarge) return;
            clearTimeout(timeoutId);
            ftItem.style.width = itemWidth;
            ftItem.style.height = itemHeight;
            itemDesc.style.opacity = "0";
            setTimeout(() => {
                itemDesc.style.display = "none";
            }, 300);
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

function getFtEleById(parent, ftId) {
    return parent.querySelector(`[data-ft-id="${ftId}"]`);
}

function getFtEleByCls(parent, ftCls) {
    return parent.querySelectorAll(`[data-ft-cls="${ftCls}"]`);
}
