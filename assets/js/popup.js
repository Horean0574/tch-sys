let maskPopup;
let popupNavClose;
let popupBody;
let popupBodyTitle;
let popupBodyInfo;

function initPopup() {
    maskPopup = document.querySelector("#mask-popup");
    popupNavClose = document.querySelector("#popup-nav-close");
    popupBody = document.querySelector("#popup-body");
    popupBodyTitle = popupBody.querySelector("#popup-body-title");
    popupBodyInfo = popupBody.querySelector("#popup-body-info");

    popupNavClose.addEventListener("click", closePopup);
}

function openPopup(fnItemEle, fnItemObj) {
    maskPopup.style.visibility = "visible";
    setTimeout(() => {
        maskPopup.style.opacity = "1";
        maskPopup.style.filter = "blur(0)";
    }, 0);
    popupBodyTitle.innerHTML = fnItemObj.title.innerHTML;
    popupBodyTitle.title = fnItemObj.title.innerHTML;
    popupBodyInfo.innerHTML = fnItemObj.info.innerHTML;
    popupBodyInfo.classList.add(fnItemEle.id + "-info");
}

function closePopup() {
    maskPopup.style.filter = "blur(32px)";
    maskPopup.style.opacity = "0";
    setTimeout(() => {
        maskPopup.style.visibility = "hidden";
        popupBodyTitle.innerHTML = "";
        popupBodyTitle.title = "";
        popupBodyInfo.innerHTML = "";
        popupBodyInfo.className = "";
    }, 500);
}
