function newRandMain() {
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
    let prvActive = 0;
    ele.patternCont.innerHTML = ele.wheelMode.innerHTML;
    ele.menuBtn.forEach((item, idx) => {
        item.addEventListener("click", function () {
            ele.menuBtn[prvActive].classList.remove("active");
            item.classList.add("active");
            ele.patternCont.innerHTML = ele.patterns[idx].innerHTML;
            prvActive = idx;
        });
    });
}

function newRandFt() {
    ~function () {

    }();


    newRandMain();
}
