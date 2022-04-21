// import data from "./data.json" assert { type: "json" };
// let xhr = new XMLHttpRequest();

// xhr.onreadystatechange = function(){
// 	if(xhr.readyState == 4 && xhr.status == 200){
// 		let data = JSON.parse(this.responseText);
// 		for (var i = 0; i < data.length; i++) {
// 			var url = data[i].url;
// 			var className = data[i].class;
// 			var type = data[i].type;
// 			var name = data[i].name;
// 			var image = data[i].image;
// 			var tools = data[i].tools;

// 			var portfolioItem = document.createElement("a");
// 			portfolioItem.href = url;
// 			portfolioItem.className = className;
// 			portfolioItem.target = "_blank";
// 			portfolioItem.innerHTML =
// 				'<div class="item-service">' +
// 				type +
// 				"</div>" +
// 				'<div class="item-name">' +
// 				name +
// 				"</div>" +
// 				'<img src="' +
// 				image +
// 				'" alt="">' +
// 				'<div class="item-tools">';
// 			for (var i = 0; i < tools.length; i++) {
// 				var tools_logo = tools[i].tools_logo;
// 				var tools_name = tools[i].tools_name;
// 				portfolioItem.innerHTML +=
// 					'<div class="tool">' + '<img src="' + tools_logo + '" alt="">';
// 				"<p>" + tools_name + "</p>";
// 			}
// 			document.getElementById("portfolio-item").appendChild(portfolioItem);
// 		}
// 	}
// }
// xhr.open('GET', 'data.json', true)
// xhr.send();

const hamburger = document.getElementById("hamburger");
const close_hamburger = document.getElementById("close-hamburger");
const nav_container = document.getElementById("nav-container");
const social_media = document.getElementById("social-media");
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
	scrollPosition = window.scrollY;

	if (scrollPosition >= 60) {
		header.classList.add("bg-dark");
	} else {
		header.classList.remove("bg-dark");
	}
});

hamburger.addEventListener("click", () => {
	social_media.classList.toggle("show");
	nav_container.classList.toggle("show");
	close_hamburger.classList.toggle("show");
	hamburger.classList.toggle("show");
});

close_hamburger.addEventListener("click", () => {
	social_media.classList.toggle("show");
	nav_container.classList.toggle("show");
	hamburger.classList.toggle("show");
	close_hamburger.classList.toggle("show");
});

const dropdownList = document.querySelectorAll(".list");
dropdownList.forEach((list) => {
	let btn = list.querySelector(".service button");
	let icon = list.querySelector(".service button i");
	var collapse = list.lastElementChild;
	var collapseAnswer = document.querySelectorAll(".list .collapse");
	btn.addEventListener("click", () => {
		collapseAnswer.forEach((ans) => {
			let ansIcon = ans.parentElement.querySelector("button i");
			if (collapse !== ans) {
				ans.classList.add("hide");
				ansIcon.className = "fas fa-angle-down";
			}
		});
		collapse.classList.toggle("hide");
		icon.className === "fas fa-angle-down"
			? (icon.className = "fas fa-angle-up")
			: (icon.className = "fas fa-angle-down");
	});
});

let btnMore = document.querySelector("#btn-more");
let btnLess = document.querySelector("#btn-less");
let currentPorto = 2;
const portfolioContainer = document.querySelector("#portfolio-item");
const portfolioList = document.querySelectorAll("#portfolio-item .item");
btnMore.addEventListener("click", () => {
	if (currentPorto < portfolioList.length) {
		let portfolioItem;
		for (let i = currentPorto; i < currentPorto + 1; i++) {
			if (portfolioList[i]) {
				portfolioList[i].classList.remove("hide");
			}
			portfolioItem = portfolioList[i];
		}
		currentPorto += 1;
		if (currentPorto >= portfolioList.length) {
			btnMore.classList.add("disable");
			btnLess.classList.remove("disable");
		}
		window.scrollTo(
			0,
			window.scrollY + portfolioItem.getBoundingClientRect().top - 100
		);
	}
});
btnLess.addEventListener("click", () => {
	if (currentPorto >= portfolioList.length) {
		for (let i = currentPorto; i >= 2; i--) {
			if (portfolioList[i]) {
				portfolioList[i].classList.add("hide");
			}
		}
		currentPorto = 2;
		btnMore.classList.remove("disable");
		btnLess.classList.add("disable");
		window.scrollTo(
			0,
			window.scrollY + portfolioContainer.getBoundingClientRect().top - 200
		);
	}
});

let btnBack = document.querySelector("#btn-back");
let btnNext = document.querySelector("#btn-next");
let currentTesti = 2;
let testiIndex = 0;
const testiList = document.querySelectorAll("#testimonial-item .item");
btnBack.addEventListener("click", () => {
	if (testiIndex > 0) {
		testiList[testiIndex - 1].classList.remove("hide");
		testiList[testiIndex + 1].classList.add("hide");
		testiIndex--;
		currentTesti--;
	}
	if (currentTesti <= testiList.length - 1) {
		btnNext.classList.remove("disable");
	}
	if (testiIndex === 0) {
		btnBack.classList.add("disable");
	}
});
btnNext.addEventListener("click", () => {
	if (currentTesti <= testiList.length - 1) {
		testiList[currentTesti].classList.remove("hide");
		testiList[testiIndex].classList.add("hide");
		testiIndex++;
		currentTesti++;
	}
	if (testiIndex > 0) {
		btnBack.classList.remove("disable");
	}
	if (currentTesti > testiList.length - 1) {
		btnNext.classList.add("disable");
	}
});
