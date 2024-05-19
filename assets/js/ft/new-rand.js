let stuInfo = [];
let realStuNums = 0;
let virtualStu = [];

function newRandMain() {
    function MInitWheel() {
        const N = 7, eAng = 360 / N; // angle of each divided part
        const skewVal = 90 - eAng;

        ele.turntable = getFtEleByCls(ele.patternCont, "turntable")[0];
        ele.wheel = getFtEleByCls(ele.turntable, "wheel")[0];
        ele.turnSpinner = getFtEleByCls(ele.patternCont, "turn-spinner")[0];
        ele.prizeZone = getFtEleByCls(ele.patternCont, "prize-zone")[0];
        ele.prizeText = getFtEleByCls(ele.patternCont, "prize-text")[0];

        // initialize
        ele.wheel.style.setProperty("--N", N.toString());
        for (let i = 0; i < N; ++i) {
            let iZone = document.createElement("span");
            iZone.style.setProperty("--i", (i + 1).toString());
            let iText = document.createElement("p");
            let iTextEm = document.createElement("em");
            iText.style.setProperty("--i", (i + 1).toString());
            iTextEm.innerHTML = (i + 1).toString().repeat(1);
            iText.appendChild(iTextEm);
            ele.prizeZone.appendChild(iZone);
            ele.prizeText.appendChild(iText);
        }
        ele.zoneItems = ele.prizeZone.querySelectorAll("span");
        ele.textItems = ele.prizeText.querySelectorAll("p");

        // add Event Listener
        let rotateDeg = 0, isRotating = false, lastPrize = 0;
        let rotateRes = 0, rotateResI = 0, rotateResF = 0; // result (integer & fractional forms)
        ele.turnSpinner.addEventListener("click", function () {
            if (isRotating) return;
            isRotating = true;
            if (lastPrize) {
                ele.zoneItems[rotateResI].classList.remove("pointed");
                ele.zoneItems[rotateResI - 1 || N].classList.remove("pointedL");
                ele.zoneItems[rotateResI % N + 1].classList.remove("pointedR");
                ele.textItems[rotateResI].classList.remove("pointed");
            }

            rotateDeg += 360 * (8.1 + Math.random());
            rotateRes = N - (rotateDeg - skewVal) % 360 / eAng; // clockwise (fraction)
            rotateResI = Math.ceil(rotateRes);
            rotateResF = rotateRes % 1;
            lastPrize = rotateResI;
            console.log(rotateResI, rotateResF);
            ele.wheel.style.transform = `rotate(${rotateDeg}deg)`;
            ele.turnSpinner.style.cursor = "not-allowed";
            setTimeout(() => {
                isRotating = false;
                ele.turnSpinner.style.cursor = "pointer";
                ele.zoneItems[rotateResI].classList.add("pointed");
                ele.zoneItems[rotateResI - 1 || N].classList.add("pointedL");
                ele.zoneItems[rotateResI % N + 1].classList.add("pointedR");
                ele.textItems[rotateResI].classList.add("pointed");
            }, 6000);
        });
    }

    function MInitCard() {

    }

    function MInitPool() {

    }

    // get elements from HTML template
    let ele = {};
    ele.container_ = document.querySelector(".new-rand");
    ele.menuContainer = getFtEleById(ele.container_, "menu-container");
    ele.mainContainer = getFtEleById(ele.container_, "main-container");

    ele.menu_ = getFtEleById(ele.menuContainer, "menu");
    ele.menuLis = ele.menu_.querySelectorAll("li");
    ele.menuBtn = ele.menu_.querySelectorAll("li button");

    ele.patternArea = getFtEleById(ele.mainContainer, "pattern-area");
    ele.patterns = ele.patternArea.querySelectorAll("section");
    ele.patternCont = getFtEleById(ele.mainContainer, "pattern-cont");
    ele.wheelMode = getFtEleById(ele.patternArea, "wheel-mode");
    ele.cardMode = getFtEleById(ele.patternArea, "card-mode");
    ele.poolMode = getFtEleById(ele.patternArea, "pool-mode");

    // add Event Listeners
    let modeMap = [MInitWheel, MInitCard, MInitPool];
    let prvActive = 0;
    ele.patternCont.innerHTML = ele.wheelMode.innerHTML;
    MInitWheel();
    ele.menuBtn.forEach((item, idx) => {
        item.addEventListener("click", function () {
            ele.menuBtn[prvActive].classList.remove("active");
            item.classList.add("active");
            ele.patternCont.innerHTML = ele.patterns[idx].innerHTML;
            prvActive = idx;
            modeMap[idx]();
        });
    });
}

function newRandFt() {

    let iSettings = JSON.parse(localStorage["settings"])[1]["new-rand"];
    stuInfo = iSettings["students"];
    for (let stu of stuInfo) {
        if (stu["name"] !== null) {
            ++realStuNums;
        } else {
            virtualStu.push(stu["id"]);
        }
    }
    newRandMain();
}
