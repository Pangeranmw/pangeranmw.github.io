const jurnal = document.querySelector("#jurnal");
const jurnalBg = document.querySelector(".jurnal-bg");
const x = document.getElementsByTagName("BODY")[0];

function showJurnal(){
  if (jurnalBg.classList.contains("hide")) {
		jurnalBg.classList.remove("hide");
    x.classList.add("stop-scrolling");
	}
}
function hideJurnal(){
  if (!jurnalBg.classList.contains("hide")) {
		jurnalBg.classList.add("hide");
    x.classList.remove("stop-scrolling");
	}
}

addEventListener("click", (e) => {
	if (e.target == jurnalBg) {
		hideJurnal();
	} else if (e.target == jurnal) {
		showJurnal();
	}
});
