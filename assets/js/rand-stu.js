let stuList = [];
let stuInfo = [];
let stuNumEnd = 0;
let realStuNums = 0;
let unrealStu = [];

function randStuMain() {
    function checkStuNum() {
        if (stuNum.innerHTML === "") stuNum.innerHTML = "1";
        if (!(/^\\d+$/.test(stuNum.innerHTML))) stuNum.innerHTML = stuNum.innerHTML.replace(/\D/g, "");
        let stuNumN = parseInt(stuNum.innerHTML);
        minus.disabled = (stuNumN <= 1);
        plus.disabled = (stuNumN >= realStuNums);
        minus.style.cursor = stuNumN <= 1 ? "not-allowed" : "pointer";
        plus.style.cursor = stuNumN >= realStuNums ? "not-allowed" : "pointer";
        if (stuNumN < 1 || stuNumN > realStuNums) {
            stuNumTip.style.color = "red";
            stuNumTip.style.transform = "translateX(-4px)";
            setTimeout(function () {
                stuNumTip.style.transform = "translateX(7px)";
                setTimeout(function () {
                    stuNumTip.style.transform = "translateX(-6px)";
                    setTimeout(function () {
                        stuNumTip.style.transform = "translateX(6px)";
                        setTimeout(function () {
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
        let rdn = Math.floor(Math.random() * (stuNumEnd - rdpList.length - 1) + 1);
        if (rdpBox.checked) {
            for (let i = 0; i < rdpList.length; i++) {
                if (rdn >= rdpList[i]) rdn++;
            }
            if (rdpList.indexOf(rdn) === -1) rdpList.push(rdn);
            rdpList.sort(function (a, b) {
                return a - b;
            });
        }
        let L = 0, R = unrealStu.length;
        while (L < R) {
            let M = Math.floor((L + R) / 2);
            if (rdn < unrealStu[M]) R = M;
            else L = M + 1;
        }
        console.log(unrealStu.length);
        console.log(`rdn: ${rdn}, L: ${L}, R: ${R};`);
        rdn += L;
        return rdn;
    }

    let info = document.querySelector(".rand-stu-info");
    let divs = document.querySelectorAll(".rand-stu-info > div");
    let optPage = divs[0];
    let stuShow = divs[1];
    let returnBtn = stuShow.querySelector("section span");
    let state = stuShow.querySelector("h1");
    let secs = info.querySelectorAll("section");
    let leftPanel = secs[0];
    let rightPanel = secs[1];
    let spans = leftPanel.querySelectorAll("span");
    let stuNum = spans[1];
    let stuNumTip = spans[2];
    let rdpBox = leftPanel.querySelector("input[type=checkbox]");
    let rdpList = [];
    let buttons = leftPanel.querySelectorAll("button");
    let minus = buttons[0];
    let plus = buttons[1];
    let randing = buttons[2];
    let clearing = buttons[3];
    let stuUl = rightPanel.querySelector("ul");
    let emptyText = stuUl.querySelector("li");

    stuNumTip.innerHTML = `( 1 &le; n &le; ${realStuNums} )`;

    stuNum.addEventListener("input", checkStuNum);
    minus.addEventListener("click", function () {
        let nextNum = parseInt(stuNum.innerHTML) - 1;
        stuNum.innerHTML = nextNum.toString();
        checkStuNum();
    });
    plus.addEventListener("click", function () {
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
                setTimeout(function () {
                    let stateSpans = state.querySelectorAll("span");
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
    returnBtn.addEventListener("mouseenter", function () {
        returnBtn.style.color = "darkgrey";
    });
    returnBtn.addEventListener("mouseleave", function () {
        returnBtn.style.color = "grey";
    });
    returnBtn.addEventListener("click", function () {
        info.style.animation = "cardFlip 600ms ease-in-out both";
        setTimeout(function () {
            stuShow.style.display = "none";
            optPage.style.display = "block";
            let stateSpans = state.querySelectorAll("span");
            let stateNum = stateSpans[1];
            let stateName = stateSpans[3];
            stateNum.innerHTML = "X";
            stateName.innerHTML = "N";
            setTimeout(function () {
                info.style.animation = "";
            }, 300);
        }, 300);
    });
}

function randStuFn(students) {
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
