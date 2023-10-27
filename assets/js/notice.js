let noticeLvl;
let noticeArea;

function initNotice() {
    noticeLvl = 0;
    noticeArea = document.querySelector("#notice-area");
}

function newNotice(msg, type) {
    let notice = document.createElement("span");
    let nowLvl = noticeLvl;
    notice.classList.add("notice");
    notice.classList.add(`notice-${type}`);
    notice.innerHTML = msg;
    notice["data-lvl"] = noticeLvl;
    notice.style.bottom = `${1 + (noticeLvl++) * 2.5}em`;
    noticeArea.appendChild(notice);
    setTimeout(() => {
        noticeLvl = nowLvl;
        noticeArea.removeChild(notice);
        if (noticeArea.childNodes.length === 0) {
            noticeLvl = 0;
        }
    }, 8000);
}
