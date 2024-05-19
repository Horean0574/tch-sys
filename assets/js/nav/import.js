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
        function checkEssentialKeys(keys, toCheck) {
            for (let k in keys) {
                if (toCheck[k] === undefined) {
                    return false;
                }
                if (keys[k] !== {} && keys[k] !== []) {
                    checkEssentialKeys(keys[k], toCheck[k]);
                }
            }
            return true;
        }

        let newSettings = JSON.parse(fileCont);
        let fnKeys = JSON.parse(localStorage["settings-keys"])[0];
        for (let key in fnKeys) {
            if (newSettings[0][key] === undefined) return false;
            if (!checkEssentialKeys(fnKeys[key], newSettings[0][key])) return false;
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
        if (!this.files[0].name.endsWith(".json")) {
            console.error("Invalid file format, expected JSON.");
            newNotice("请上传 JSON 格式文件！", "danger");
            return;
        }
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
            newNotice("请选择一个文件哦~", "danger");
            return;
        }
        let fileCont = ele.previewCont.value;
        if (!checkFileCont(fileCont)) {
            console.error("Invalid content!");
            newNotice("设置内容不符合要求，请重新检查！", "danger");
            return;
        }
        localStorage["settings"] = analyzeMain(fileCont);
        console.log("Settings imported successfully.");
        closePopup();
        newNotice("设置导入成功！", "success");
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
