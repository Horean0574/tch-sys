function importMain() {
    function getFileCont(fileObj) {
        if (typeof FileReader === undefined) {
            alert("获取文件内容失败，请检查更新浏览器！");
            return null;
        }

        let reader = new FileReader();
        reader.readAsText(fileObj, "UTF-8");
        return reader;
    }

    function checkFileCont(fileCont) {
        let settings = JSON.parse(fileCont);
        let fnData = JSON.parse(localStorage["fn-data"]);
        for (let data of fnData) {
            console.log(data);
            if (settings[data["id"]] === undefined) {
                return false;
            }
            for (let key in data["settings"]) {
                if (settings[data["id"]][key] === undefined) {
                    return false;
                }
            }
        }
        return true;
    }

    // Get elements from HTML
    let ele = {};
    ele.info = document.querySelector(".import-btn-info");
    ele.container = getNavEleById(ele.info, "container");

    ele.uploadPanel = getNavEleById(ele.container, "upload-panel");
    ele.uploadForm = getNavEleById(ele.uploadPanel, "upload-form");
    ele.uploadArea = getNavEleById(ele.uploadForm, "upload-area");
    ele.uploadBtnOrg = getNavEleById(ele.uploadArea, "upload-btn-org");
    ele.uploadBtn = getNavEleById(ele.uploadArea, "upload-btn");
    ele.uploadVal = getNavEleById(ele.uploadArea, "upload-val");
    ele.submitBtn = getNavEleById(ele.uploadForm, "submit-btn");
    ele.resetBtn = getNavEleById(ele.uploadForm, "reset-btn");

    ele.previewPanel = getNavEleById(ele.container, "preview-panel");
    ele.previewTitle = getNavEleById(ele.previewPanel, "preview-title");
    ele.previewContOut = getNavEleById(ele.previewPanel, "preview-cont-out");
    ele.previewCont = getNavEleById(ele.previewContOut, "preview-cont");

    // Setting states
    let states = {
        selected: {code: 0},
    };

    ele.uploadBtn.addEventListener("click", function (e) {
        e.preventDefault();
        ele.uploadBtnOrg.click();
    });

    ele.uploadBtnOrg.addEventListener("input", function () {
        states.selected.code = 1;
        ele.uploadVal.style.color = "black";
        ele.uploadVal.innerHTML = this.files[0].name;
        getFileCont(this.files[0]).addEventListener("load", function () {
            ele.previewCont.value = this.result;
        });
    });

    ele.submitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (!states.selected.code) {
            alert("请选择一个文件哦~");
            return;
        }
        let fileCont = ele.previewCont.value;
        if (!checkFileCont(fileCont)) {
            alert("设置内容不符合要求，请重新检查！")
            return;
        }
        localStorage.settings = fileCont;
        closePopup();
    });

    ele.resetBtn.addEventListener("click", function () {
        states.selected.code = 0;
        ele.uploadVal.style.color = "gray";
        ele.uploadVal.innerHTML = "请选择一个文件哦~";
        ele.previewCont.value = "";
    });
}

function importNav() {
    importMain();
}
