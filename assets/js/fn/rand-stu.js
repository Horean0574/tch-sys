let stuInfo = [];
let realStuNums = 0;
let unrealStu = [];

class extRes {
    constructor() {
        this.rd = [];
        this.rv = [];
    }
}

function randStuMain() {
    function getStuName(stuId) {
        return stuInfo[stuId - 1]["name"];
    }

    function getStuGender(stuId) {
        return stuInfo[stuId - 1]["gender"];
    }

    function checkStuNum() {
        if (ele.stuNum.innerHTML === "") ele.stuNum.innerHTML = "1";
        let stuNumN = parseInt(ele.stuNum.innerHTML);

        ele.minusBtn.disabled = (stuNumN <= 1);
        ele.plusBtn.disabled = (stuNumN >= realStuNums);
        ele.minusBtn.style.cursor = stuNumN <= 1 ? "not-allowed" : "pointer";
        ele.plusBtn.style.cursor = stuNumN >= realStuNums ? "not-allowed" : "pointer";

        if (stuNumN < 1 || stuNumN > realStuNums) {
            ele.stuNumTip.style.animation = "tipShake 320ms ease-in-out both";
            setTimeout(() => {
                ele.stuNumTip.style.animation = "";
            }, 320);
        }
        if (stuNumN < 1) ele.stuNum.innerHTML = "1";
        if (stuNumN > realStuNums) ele.stuNum.innerHTML = realStuNums.toString();
    }

    function rand() {
        let rdn = Math.floor(Math.random() * (stuInfo.length - rdpList.length - unrealStu.length) + 1);
        if (ele.rdpBox.checked) {
            for (let i = 0; i < rdpList.length; ++i) {
                if (rdn >= rdpList[i]) rdn++;
            }
            let L1 = 0, R1 = rdpList.length;
            while (L1 < R1) {
                let M1 = Math.floor((L1 + R1) / 2);
                if (rdn < rdpList[M1]) R1 = M1;
                else L1 = M1 + 1;
            }
            if (rdpList.indexOf(rdn) === -1) rdpList.splice(L1, 0, rdn);
        }
        let L2 = 0, R2 = unrealStu.length;
        while (L2 < R2) {
            let M2 = Math.floor((L2 + R2) / 2);
            if (rdn < unrealStu[M2]) R2 = M2;
            else L2 = M2 + 1;
        }
        rdn += L2;
        return rdn;
    }

    function getStuColor(stuNum) {
        return getStuGender(stuNum) === 1 ? "deepskyblue" : "hotpink";
    }

    function createResItem(stuN, key) {
        let stu = document.createElement("li");
        let stuNum = document.createElement("span");
        let stuName = document.createElement("span");
        let stuIdx = document.createElement("span");

        let stuColor = getStuColor(stuN);
        stu.style.width = "96%";
        stu.style.margin = "5px 0";
        stu.style.paddingBottom = "3px";
        stu.style.borderBottom = "solid 1px lightgray";
        stu.style.cursor = "pointer";
        stuNum.style.display = "inline-block";
        stuNum.style.width = "40px";
        stuNum.innerHTML = stuN.toString();
        stuName.innerHTML = getStuName(stuN);
        let space = stuNum.innerHTML.length === 2 ? "" : "&ensp;";
        stuNum.innerHTML = space + stuNum.innerHTML;
        stuIdx.style.display = "none";
        stuIdx.innerHTML = (numRes[key].length - 1).toString();

        stu.appendChild(stuNum);
        stu.appendChild(stuName);
        stu.appendChild(stuIdx);
        stu.addEventListener("mouseenter", function () {
            stuNum.style.fontSize = "22px";
            stuName.style.fontSize = "22px";
            stuNum.style.color = "orange";
            stuName.style.color = stuColor;
            stu.style.boxShadow = "0 2px 3px lightgray";
            stu.style.borderRadius = "6px";
        });
        stu.addEventListener("mouseleave", function () {
            stuNum.style.fontSize = "20px";
            stuName.style.fontSize = "20px";
            stuNum.style.color = "black";
            stuName.style.color = "black";
            stu.style.boxShadow = "";
            stu.style.borderRadius = "";
        });
        stu.addEventListener("click", function () {
            let stateNum = getFnEleById(ele.showState, "state-num");
            let stateName = getFnEleById(ele.showState, "state-name");

            // change property "idx" of state "showing"
            states.showing.idx = parseInt(stuIdx.innerHTML);

            ele.info.style.animation = "cardFlip 600ms ease-in-out both";
            setTimeout(() => {
                stateNum.innerHTML = stuN.toString();
                stateName.innerHTML = getStuName(stuN);
                stateName.style.color = stuColor;
                ele.optPage.style.display = "none";
                ele.stuShow.style.display = "block";
                checkShowState();
                setTimeout(() => {
                    ele.info.style.animation = "";
                }, 300);
            }, 300);
        });

        return stu;
    }

    function findRandRes() {
        if (states.randed.code === 0 || !states.randed.len) return;

        if (ele.stuUl.contains(ele.findNoneText)) {
            ele.stuUl.removeChild(ele.findNoneText);
        }

        let cont = ele.findCont.value;
        let cnt = 0;
        for (let i in numRes[curResKey]) {
            let stuNum = numRes[curResKey][i];
            let stuName = getStuName(stuNum);
            if (stuNum.toString().includes(cont) || stuName.includes(cont)) {
                ele.stuUl.children[i].style.display = "list-item";
                ++cnt;
            } else {
                ele.stuUl.children[i].style.display = "none";
            }
        }
        if (!cnt) {
            ele.stuUl.appendChild(ele.findNoneText);
        }
    }

    function flipShowState(handler) {
        ele.showState.style.animation = "cardFlip 450ms ease-in-out both";
        setTimeout(() => {
            handler();
            setTimeout(() => ele.showState.style.animation = "", 225);
        }, 225);
    }

    function updateShowState() {
        let stateNum = getFnEleById(ele.showState, "state-num");
        let stateName = getFnEleById(ele.showState, "state-name");
        let stuNum = numRes[curResKey][states.showing.idx];
        let stuName = getStuName(stuNum);
        stateName.style.color = getStuColor(stuNum);
        stateNum.innerHTML = stuNum.toString();
        stateName.innerHTML = stuName;

        checkShowState();
    }

    function checkShowState() {
        let prvNotAvail = (states.showing.idx === 0);
        let nxtNotAvail = (states.showing.idx === states.randed.len - 1);
        ele.prvStuBtn.disabled = prvNotAvail;
        ele.nxtStuBtn.disabled = nxtNotAvail;
        ele.prvStuBtn.style.cursor = prvNotAvail ? "not-allowed" : "pointer";
        ele.nxtStuBtn.style.cursor = nxtNotAvail ? "not-allowed" : "pointer";
    }

    function showPrvStu() {
        if (states.showing.idx === 0) return;
        --states.showing.idx;
        flipShowState(() => {
            updateShowState();
        });
    }

    function showNxtStu() {
        if (states.showing.idx >= states.randed.len - 1) return;
        ++states.showing.idx;
        flipShowState(() => {
            updateShowState();
        });
    }

    // Get elements from HTML
    let ele = {};
    ele.info = document.querySelector(".rand-stu-info");
    ele.optPage = getFnEleById(ele.info, "opt-page");
    ele.stuShow = getFnEleById(ele.info, "stu-show");

    ele.leftPanel = getFnEleById(ele.optPage, "left-panel");
    ele.rightPanel = getFnEleById(ele.optPage, "right-panel");
    ele.randPart = getFnEleById(ele.leftPanel, "rand-part");
    ele.findPart = getFnEleById(ele.leftPanel, "find-part");
    ele.actOptPart = getFnEleById(ele.leftPanel, "act-opt-part");

    ele.stuNum = getFnEleById(ele.randPart, "stu-num");
    ele.stuNumTip = getFnEleById(ele.randPart, "stu-num-tip");
    ele.rdpBox = getFnEleById(ele.randPart, "rdp-box");
    ele.minusBtn = getFnEleById(ele.randPart, "minus-btn");
    ele.plusBtn = getFnEleById(ele.randPart, "plus-btn");
    ele.randing = getFnEleById(ele.randPart, "randing");
    ele.clearing = getFnEleById(ele.randPart, "clearing");
    ele.findCont = getFnEleById(ele.findPart, "find-cont");
    ele.rvrBox = getFnEleById(ele.actOptPart, "rvr-box");

    ele.stuUl = getFnEleById(ele.rightPanel, "stu-ul");
    ele.emptyText = getFnEleById(ele.stuUl, "empty-text");
    ele.findNoneText = getFnEleById(ele.stuUl, "find-none-text");

    ele.returnBtnText = getFnEleById(ele.stuShow, "return-btn-text");
    ele.showState = getFnEleById(ele.stuShow, "show-state");
    ele.pageOpts = getFnEleById(ele.stuShow, "page-opts");
    ele.prvStuBtn = getFnEleById(ele.pageOpts, "prv-stu-btn");
    ele.nxtStuBtn = getFnEleById(ele.pageOpts, "nxt-stu-btn");
    ele.luckyStuBtn = getFnEleById(ele.pageOpts, "lucky-stu-btn");

    let rdpList = [];
    let numRes = new extRes();
    let eleRes = new extRes();
    let curResKey = "";

    // Setting states
    let states = {
        randed: {code: 0, len: 0},
        showing: {idx: 0},
    };

    ele.stuNumTip.innerHTML = `( 1 &le; n &le; ${realStuNums} )`;
    ele.stuUl.removeChild(ele.findNoneText);
    ele.findNoneText.style.display = "list-item";

    // Adding event listener
    ele.stuNum.addEventListener("keypress", function (e) {
        if (isNaN(String.fromCharCode(e.which))) {
            e.preventDefault();
        }
    });
    ele.stuNum.addEventListener("input", checkStuNum);
    ele.minusBtn.addEventListener("click", function () {
        let nextNum = parseInt(ele.stuNum.innerHTML) - 1;
        ele.stuNum.innerHTML = nextNum.toString();
        checkStuNum();
    });
    ele.plusBtn.addEventListener("click", function () {
        let nextNum = parseInt(ele.stuNum.innerHTML) + 1;
        ele.stuNum.innerHTML = nextNum.toString();
        checkStuNum();
    });
    ele.randing.addEventListener("click", function () {
        ele.randing.disabled = true;
        ele.stuUl.innerHTML = "";
        curResKey = ele.rvrBox.checked ? "rv" : "rd";
        numRes.rd = [];
        numRes.rv = [];
        eleRes.rd = [];
        eleRes.rv = [];
        let stuNumN = parseInt(ele.stuNum.innerHTML);

        states.randed.code = 1;
        states.randed.len = stuNumN;

        while (stuNumN--) {
            let rStuN = rand();
            numRes.rd.push(rStuN);
            let stu = createResItem(rStuN, "rd");
            eleRes.rd.push(stu);
        }

        for (let i = 1; i <= stuInfo.length; ++i) {
            if (unrealStu.includes(i) || numRes.rd.includes(i)) continue;
            numRes.rv.push(i);
            let stu = createResItem(i, "rv");
            eleRes.rv.push(stu);
        }

        for (let i = 0; i < eleRes[curResKey].length; ++i) {
            ele.stuUl.appendChild(eleRes[curResKey][i]);
        }
        if (ele.findCont.value !== "") {
            findRandRes();
        }

        rdpList = [];
        ele.randing.disabled = false;
        ele.randing.focus();
    });
    ele.clearing.addEventListener("click", function () {
        ele.stuUl.innerHTML = "";
        ele.stuUl.appendChild(ele.emptyText);
        states.randed.code = 0;
        states.randed.len = 0;
    });

    let composite = false;
    ele.findCont.addEventListener("input", function () {
        if (composite) return;
        findRandRes();
    });
    ele.findCont.addEventListener("compositionstart", function () {
        composite = true;
    });
    ele.findCont.addEventListener("compositionend", function () {
        composite = false;
        findRandRes();
    });

    ele.rvrBox.addEventListener("input", function () {
        curResKey = ele.rvrBox.checked ? "rv" : "rd";
        states.randed.len = eleRes[curResKey].length;
        ele.stuUl.innerHTML = "";
        for (let i = 0; i < eleRes[curResKey].length; ++i) {
            ele.stuUl.appendChild(eleRes[curResKey][i]);
        }
        if (!states.randed.len) {
            ele.stuUl.innerHTML = "";
            ele.stuUl.appendChild(ele.emptyText);
        }
    });

    document.addEventListener("keyup", function (e) {
        if (!states.randed.len) return;
        switch (e.key) {
            case "ArrowUp":
            case "ArrowLeft":
                showPrvStu();
                break;
            case "ArrowDown":
            case "ArrowRight":
                showNxtStu();
                break;
        }
    });

    ele.returnBtnText.addEventListener("click", function () {
        ele.info.style.animation = "cardFlip 600ms ease-in-out both";
        setTimeout(() => {
            ele.stuShow.style.display = "none";
            ele.optPage.style.display = "block";
            let stateNum = getFnEleById(ele.showState, "state-num");
            let stateName = getFnEleById(ele.showState, "state-name");
            stateNum.innerHTML = "X";
            stateName.innerHTML = "N";
            setTimeout(() => {
                ele.info.style.animation = "";
            }, 300);
        }, 300);
    });

    ele.prvStuBtn.addEventListener("click", showPrvStu);
    ele.nxtStuBtn.addEventListener("click", showNxtStu);
    ele.luckyStuBtn.addEventListener("click", null);
}

function randStuFn() {
    ~function () {
        stuInfo = [];
        realStuNums = 0;
        unrealStu = [];
    }();

    let settings = JSON.parse(localStorage["settings"])["rand-stu"];
    stuInfo = settings["students"];
    for (let i = 0; i < stuInfo.length; ++i) {
        if (stuInfo[i]["name"] !== null) {
            realStuNums++;
        } else {
            unrealStu.push(stuInfo[i]["id"]);
        }
    }
    randStuMain();
}
