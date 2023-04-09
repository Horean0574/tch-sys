function initElements(fnList, fnListReq) {
    let data = JSON.parse(fnListReq.responseText);
    for (let i = 0; i < data.length; i++) {
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
        newFnItemBtn.className = "fn-item-btn";
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
    console.log(fnItems);
    let fnMap = {"rand-stu": randStuFn, "count-down": countDownFn};
    for (let i = 0; i < fnItems.length; i++) {
        let fnItem = fnItems[i];
        let fnItemInfo = fnItem.querySelector(".fn-item-info");
        let fnItemReq = new XMLHttpRequest();
        fnItemReq.open("get", `./templates/${fnItem.id}.html`);
        fnItemReq.send(null);
        fnItemReq.addEventListener("load", function () {
            fnItemInfo.innerHTML = fnItemReq.responseText;
        });
    }
    for (let i = 0; i < fnItems.length; i++) {
        let fnItemEle = fnItems[i];
        let fnItemObj = {};
        fnItemObj.title = fnItemEle.querySelector(".fn-item-title");
        fnItemObj.desc = fnItemEle.querySelector(".fn-item-desc");
        fnItemObj.info = fnItemEle.querySelector(".fn-item-info");
        fnItemObj.btn = fnItemEle.querySelector(".fn-item-btn");
        let itemTitle = `【${fnItemObj.title.innerHTML}】${fnItemObj.desc.innerHTML}`;
        itemTitle = itemTitle.replace("&amp;", "&");
        fnItemEle.title = itemTitle;
        fnItemObj.btn.addEventListener("click", function () {
            openPopup(fnItemEle, fnItemObj);
            if (fnItemEle.id === "rand-stu") {
                let clsReq = new XMLHttpRequest();
                clsReq.open("get", "./assets/data/classes.json");
                clsReq.send(null);
                clsReq.addEventListener("load", function () {
                    let data = JSON.parse(clsReq.responseText);
                    randStuFn(data[0]["students"]);
                });
            } else {
                fnMap[fnItemEle.id]();
            }
        });
    }
}

function getFnEleById(parent, fnId) {
    return parent.querySelector(`[data-fn-id="${fnId}"]`);
}
