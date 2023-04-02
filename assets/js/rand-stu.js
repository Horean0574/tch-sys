let stuList = [];
let stuInfo = [];
let stuNumEnd = 0;
let realStuNums = 0;
let unrealStu = [];

function randStuMain() {
    function checkStuNum() {
        if (stuNum.innerHTML === "") stuNum.innerHTML = "1";
        if (!(/^\\d+$/.test(stuNum.innerHTML))) {
            stuNum.innerHTML = stuNum.innerHTML.replace(/\D/g, "");
        }
        let stuNumN = parseInt(stuNum.innerHTML);
        minusBtn.disabled = (stuNumN <= 1);
        plusBtn.disabled = (stuNumN >= realStuNums);
        minusBtn.style.cursor = stuNumN <= 1 ? "not-allowed" : "pointer";
        plusBtn.style.cursor = stuNumN >= realStuNums ? "not-allowed" : "pointer";
        if (stuNumN < 1 || stuNumN > realStuNums) {
            stuNumTip.style.color = "red";
            stuNumTip.style.transform = "translateX(-4px)";
            setTimeout(() => {
                stuNumTip.style.transform = "translateX(7px)";
                setTimeout(() => {
                    stuNumTip.style.transform = "translateX(-6px)";
                    setTimeout(() => {
                        stuNumTip.style.transform = "translateX(6px)";
                        setTimeout(() => {
                            stuNumTip.style.transform = "";
                            stuNumTip.style.color = "black";
                        }, 80);
                    }, 80);
                }, 80);
            }, 80);
        }
        if (stuNumN < 1) stuNum.innerHTML = "1";
        if (stuNumN > realStuNums) stuNum.innerHTML = realStuNums.toString();
    }

    function rand() {
        let rdn = Math.floor(Math.random() * (stuNumEnd - rdpList.length - unrealStu.length) + 1);
        if (rdpBox.checked) {
            for (let i = 0; i < rdpList.length; i++) {
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

    let info = document.querySelector(".rand-stu-info");
    let optPage = getFnEleById(info, "opt-page");
    let stuShow = getFnEleById(info, "stu-show");
    let returnBtnText = getFnEleById(stuShow, "return-btn-text");
    let showState = getFnEleById(stuShow, "show-state");
    let leftPanel = getFnEleById(optPage, "left-panel");
    let rightPanel = getFnEleById(optPage, "right-panel");
    let randPart = getFnEleById(leftPanel, "rand-part");
    // let findPart = getFnEleById(leftPanel, "find-part");
    let stuNum = getFnEleById(randPart, "stu-num");
    let stuNumTip = getFnEleById(randPart, "stu-num-tip");
    let rdpBox = getFnEleById(randPart, "rdp-box");
    let rdpList = [];
    let minusBtn = getFnEleById(randPart, "minus-btn");
    let plusBtn = getFnEleById(randPart, "plus-btn");
    let randing = getFnEleById(randPart, "randing");
    let clearing = getFnEleById(randPart, "clearing");
    let stuUl = getFnEleById(rightPanel, "stu-ul");
    let emptyText = getFnEleById(stuUl, "empty-text");

    stuNumTip.innerHTML = `( 1 &le; n &le; ${realStuNums} )`;

    stuNum.addEventListener("input", checkStuNum);
    minusBtn.addEventListener("click", function () {
        let nextNum = parseInt(stuNum.innerHTML) - 1;
        stuNum.innerHTML = nextNum.toString();
        checkStuNum();
    });
    plusBtn.addEventListener("click", function () {
        let nextNum = parseInt(stuNum.innerHTML) + 1;
        stuNum.innerHTML = nextNum.toString();
        checkStuNum();
    });
    randing.addEventListener("click", function () {
        stuUl.innerHTML = "";
        let stuNumN = parseInt(stuNum.innerHTML);
        while (stuNumN--) {
            let rStuN = rand();
            let stu = document.createElement("li");
            let stuNum = document.createElement("span");
            let stuName = document.createElement("span");
            let stuColor = stuInfo[rStuN]["gender"] === 1 ? "deepskyblue" : "hotpink";
            stu.style.width = "96%";
            stu.style.margin = "5px 0";
            stu.style.paddingBottom = "3px";
            stu.style.borderBottom = "solid 1px lightgrey";
            stu.style.cursor = "pointer";
            stuNum.style.display = "inline-block";
            stuNum.style.width = "40px";
            stuNum.innerHTML = rStuN.toString();
            stuName.innerHTML = stuInfo[rStuN]["name"];
            let space = stuNum.innerHTML.length === 2 ? "" : "&ensp;";
            stuNum.innerHTML = space + stuNum.innerHTML;
            stu.appendChild(stuNum);
            stu.appendChild(stuName);
            stu.addEventListener("mouseenter", function () {
                stuNum.style.fontSize = "22px";
                stuName.style.fontSize = "22px";
                stuNum.style.color = "orange";
                stuName.style.color = stuColor;
                stu.style.boxShadow = "0 2px 3px lightgrey";
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
                info.style.animation = "cardFlip 600ms ease-in-out both";
                setTimeout(() => {
                    let stateSpans = showState.querySelectorAll("span");
                    let stateNum = stateSpans[1];
                    let stateName = stateSpans[3];
                    stateNum.innerHTML = rStuN.toString();
                    stateName.innerHTML = stuInfo[rStuN]["name"];
                    stateName.style.color = stuColor;
                    optPage.style.display = "none";
                    stuShow.style.display = "block";
                    setTimeout(function () {
                        info.style.animation = "";
                    }, 300);
                }, 300);
            });
            stuUl.appendChild(stu);
        }
        rdpList = [];
    });
    clearing.addEventListener("click", function () {
        stuUl.innerHTML = emptyText.outerHTML;
    });
    returnBtnText.addEventListener("mouseenter", function () {
        returnBtnText.style.color = "darkgrey";
    });
    returnBtnText.addEventListener("mouseleave", function () {
        returnBtnText.style.color = "grey";
    });
    returnBtnText.addEventListener("click", function () {
        info.style.animation = "cardFlip 600ms ease-in-out both";
        setTimeout(() => {
            stuShow.style.display = "none";
            optPage.style.display = "block";
            let stateSpans = showState.querySelectorAll("span");
            let stateNum = stateSpans[1];
            let stateName = stateSpans[3];
            stateNum.innerHTML = "X";
            stateName.innerHTML = "N";
            setTimeout(() => {
                info.style.animation = "";
            }, 300);
        }, 300);
    });
}

function randStuFn(students) {
    ~function () {
        stuList = [];
        stuInfo = [];
        stuNumEnd = 0;
        realStuNums = 0;
        unrealStu = [];
    }();
    stuInfo = students;
    stuNumEnd = stuInfo.length - 1;
    for (let i = 0; i <= stuNumEnd; i++) {
        if (stuInfo[i] !== null) {
            realStuNums++;
        } else if (i) {
            unrealStu.push(i);
        }
    }
    stuList.fill(0, 0, stuNumEnd);
    randStuMain();
}
