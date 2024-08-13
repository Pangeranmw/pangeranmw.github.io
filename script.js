const hamburger = document.getElementById('hamburger');
const close_hamburger = document.getElementById("close-hamburger");
const nav_container = document.getElementById("nav-container");
const social_media = document.getElementById("social-media");
const header = document.querySelector("header");

window.addEventListener("scroll", function () {
	const scrollPosition = window.scrollY;

	if (scrollPosition >= 60) {
		header.classList.add("bg-dark");
	} else {
		header.classList.remove("bg-dark");
	}
});

hamburger.addEventListener("click", ()=>{
  social_media.classList.toggle('show');
  nav_container.classList.toggle('show');
  close_hamburger.classList.toggle('show');
  hamburger.classList.toggle('show');
})

close_hamburger.addEventListener("click", () => {
	social_media.classList.toggle("show");
	nav_container.classList.toggle("show");
  hamburger.classList.toggle("show");
  close_hamburger.classList.toggle("show");
});

function collapseDropdown(index) {
	const dropdownList = document.querySelectorAll(".list");
	let btn = dropdownList[index].querySelector(".service button");
	let icon = dropdownList[index].querySelector(".service button i");
	var collapse = dropdownList[index].lastElementChild;
	var collapseAnswer = document.querySelectorAll(".list .collapse");
	let ansIcon = collapseAnswer[index].parentElement.querySelector("button i");
	if (collapse !== collapseAnswer[index]) {
		collapseAnswer[index].classList.add("hide");
		ansIcon.className = "fas fa-angle-down";
	}
	collapse.classList.toggle("hide");
	icon.className === "fas fa-angle-down"
		? (icon.className = "fas fa-angle-up")
		: (icon.className = "fas fa-angle-down");
}

let btnBack = document.querySelector("#btn-back");
let btnNext = document.querySelector("#btn-next");
let currentTesti = 2;
let testiIndex = 0;
const testiList = document.querySelectorAll("#testimonial-item .item");
btnBack.addEventListener("click", () => {
	if(testiIndex > 0){
		testiList[testiIndex-1].classList.remove("hide");
		testiList[testiIndex+1].classList.add("hide");
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


//supabase config
import { SUPABASE_KEY, SUPABASE_URL } from "./config.js";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const getPorto = async () => {
	let portfolioItem = document.getElementById("portfolio-item");
	let tr = "";
	const res = await db
		.from("portfolio_item")
		.select(
			`
    name, link, image, service,
    tools (
      tool_name, tool_image
    )
  `).order("created_at", { ascending: false });
	if (res) {
		for (var i in res.data) {
			let tool = "";
			tr += `
				<a href="${res.data[i].link}" class="item ${i < 2 ? "" : "hide"}" target="_blank">
						<div class="item-service">${res.data[i].service}</div>
						<div class="item-name">${res.data[i].name}</div>
						<img src="${res.data[i].image}" alt="">
						<div class="item-tools">`;
			for (var j in res.data[i].tools) {
					tool += `
						<div class="tool">
							<img src="${res.data[i].tools[j].tool_image}" alt="">
							<p>${res.data[i].tools[j].tool_name}</p>
						</div>
					`;
			}
			tr+=`${tool}</div></a>`;
			portfolioItem.innerHTML = tr;
		}
	}
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
};

getPorto();
