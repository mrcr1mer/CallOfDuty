/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/modules/animation.js
const animObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		entry.target.classList.toggle("_animate", entry.isIntersecting);
		if (entry.isIntersecting) observer.unobserve(entry.target);
	})
}, { threshold: 0.2 })

const animItems = document.querySelectorAll('._anim-item');
if (animItems.length > 0) {
	animItems.forEach(animItem => {
		animObserver.observe(animItem);
	});
}

//=====================TABLE-ITEMS================================

const tableObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		entry.target.classList.toggle("_animate", entry.isIntersecting);
		if (entry.isIntersecting) observer.unobserve(entry.target);
	})
}, { threshold: 0 })

const tableItems = document.querySelectorAll('._table-item');
if (tableItems.length > 0) {
	tableItems.forEach(tableItem => {
		tableObserver.observe(tableItem);
	});
}
;// CONCATENATED MODULE: ./src/js/modules/cookie.js
const cookie = document.querySelector('.cookie');
const acceptButton = document.querySelector('.cookie__button');
if (cookie) {
	setTimeout(() => {
		cookie.style.removeProperty('opacity');
		cookie.style.removeProperty('visibility');
	}, 3000);
	
	acceptButton.addEventListener("click", () => {
		document.cookie = "CookieBy=PtatinumDragons; max-age="+60*60*24*30;
		if (document.cookie) {
			cookie.classList.add("_hide");
		} 	
	})
	let checkCookie = document.cookie.indexOf("CookieBy=PtatinumDragons");
	checkCookie != -1 ? cookie.classList.add("_hide") : cookie.classList.remove("_hide");


	const cookieMessage = document.querySelector('.cookie__message');
	const cookieLink = document.querySelector('.cookie__link');
	const cookieButtons = document.querySelector('.cookie__buttons');

	const mediaQueryTablet = window.matchMedia('(max-width: 767px)');
	mediaQueryTablet.addEventListener("change", adapt);
	adapt(mediaQueryTablet);

	function adapt(mediaQueryTablet) {
		if (mediaQueryTablet.matches) {
			if (!cookieLink.classList.contains('_adapt')) {
				cookieButtons.append(cookieLink);
				cookieLink.classList.add('_adapt');
			}	
		} else {
			if (cookieLink.classList.contains('_adapt')) {
				cookieMessage.append(cookieLink);
				cookieLink.classList.remove('_adapt');
			}
		}
	}
}
;// CONCATENATED MODULE: ./src/js/modules/functions.js
// ========================ISWEBP===============================
function isWebp() {
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}
isWebp();


// ========================100VH-MOBILE===============================
function mobile100vh() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
}
mobile100vh();


// ========================FILEREADER===============================
function fileReader() {
	const formImage = document.querySelector('.edit-profile__item input');
	const formPreview = document.querySelector('.edit-profile__preview');

	if (formImage) {
		formImage.addEventListener("change", () => {
			uploadFile(formImage.files[0]);
		})
	}

	function uploadFile(file) {
		if (!['image/jpg', 'image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
			alert('Разрешены только изображения');
			formImage.value = '';
			return;
		}
		if (file.size > 50 * 1024 * 1024) {
			alert('Файл должен быть менее 50мб');
			return;
		}

		let reader = new FileReader();
		reader.onload = (e) => {
			formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`
		}
		reader.onerror = (e) => {
			alert('Ошибка');
		}
		reader.readAsDataURL(file);
	}
}
fileReader();
;// CONCATENATED MODULE: ./src/js/modules/menu.js
// ========================MENU-BURGER===============================
const iconBurger = document.querySelector('.icon-header');
const logoHeader = document.querySelector('.header__top');
const menu = document.querySelector('.menu');
if (iconBurger) {
	iconBurger.addEventListener("click", () => {
		// ==============ANIMATION==================
		if (iconBurger.classList.contains('active')) iconBurger.classList.add('reverse');
		else iconBurger.classList.remove('reverse');

		document.body.classList.toggle('burger-lock');
		iconBurger.classList.toggle('active');
		logoHeader.classList.toggle('active');
		menu.classList.toggle('active');
	})
}


// ========================ADD-CHAT-TO-MENU===============================
const menuList = document.querySelector('.menu__list');
const mediaQuery = window.matchMedia('(max-width: 1024px)');
if (menuList) {
	mediaQuery.addEventListener("change", tabletChange);
	tabletChange(mediaQuery);
}

function tabletChange(mediaQuery) {
	if (mediaQuery.matches) {
		if (!menuList.lastElementChild.hasAttribute('data-chat')) {
			menuList.insertAdjacentHTML(
				"beforeend",
				`<li data-chat=""><a href="chat.html" class="menu__link">Чат</a></li>`
			)
		}
	} else {
		if (menuList.lastElementChild.hasAttribute('data-chat')) {
			menuList.lastElementChild.remove();
		}
	}
}


// ========================MENU-ACTIVE===============================
const menuItems = document.querySelectorAll('.menu__link');
const local = window.location.href;
const currentOrigin = window.location.origin;

menuItems.forEach(menuItem => {
	if (local === `${currentOrigin}/` || local === `${currentOrigin}/CallOfDuty/`) {
		menuItems[0].classList.add('active');
	} else {
		if (menuItem.href === local) menuItem.classList.add('active');
		else menuItem.classList.remove('active');
	}
});
;// CONCATENATED MODULE: ./src/js/modules/script.js
// ========================ASIDE-OPEN===============================
const asideButton = document.querySelector('.aside__arrows');
const asideOpens = document.querySelectorAll('.aside-open');

if (asideButton) {
	asideButton.addEventListener('click', change);
	function change() {
		for (let index = 0; index < asideOpens.length; index++) {
			const asideOpen = asideOpens[index];
			if (asideOpen) {
				asideOpen.classList.toggle('active');
			}
		}
	}
}


// ========================TABS===============================
const popupTabs = document.querySelectorAll('.popup__tab');
const popupForms = document.querySelectorAll(".popup__form");

if (popupTabs.length > 0) {
	tabs(popupTabs, popupForms)
}

function tabs(tabs, items) {
	for (let index = 0; index < tabs.length; index++) {
		const tab = tabs[index];
		tab.addEventListener("click", () => {
			const activeTabAttr = tab.getAttribute("data-tab");
			for (let j = 0; j < tabs.length; j++) {
				const contentAttr = items[j].getAttribute("data-tab-content");
				if (activeTabAttr === contentAttr) {
					tabs[j].classList.add("active");
					items[j].classList.add("active");
				} else {
					tabs[j].classList.remove("active");
					items[j].classList.remove("active");
				}
			}
		})
	}
}

// ========================PLACEHOLDER===============================
const inputs = document.getElementsByTagName('input');
if (inputs.length > 0) {
	removePlaceholder(inputs);
}

const textareas = document.getElementsByTagName('textarea');
if (textareas.length > 0) {
	removePlaceholder(textareas);
}

function removePlaceholder(items) {
	for (let index = 0; index < items.length; index++) {
		const item = items[index];
		const itemPlaceholder = item.placeholder;
		item.addEventListener("focus", function (e) {
			item.placeholder = "";
			item.classList.remove('_error');
		})
		item.addEventListener("blur", function (e) {
			item.placeholder = itemPlaceholder;
		})
	}
}


// ========================WIN-PLACES===============================
const iconWin = document.querySelector('.profile__wins i');
const winPlaces = document.querySelector('.profile__trophies');
const avatarImage = document.querySelector('.profile__image img');
if (iconWin) {
	iconWin.addEventListener("mouseover", () => {
		winPlaces.classList.add('_show');
		iconWin.previousElementSibling.classList.add('_stop');
		avatarImage.classList.add('_show');
	})

	iconWin.addEventListener("mouseout", () => {
		winPlaces.classList.remove('_show');
		iconWin.previousElementSibling.classList.remove('_stop');
		avatarImage.classList.remove('_show');
	})
}



// ========================ERROR-REPLACE===============================
const error = document.querySelector('.error');
if (error) {
	setTimeout(() => {
		window.location.replace(history.back());
	}, 5000);
}

;// CONCATENATED MODULE: ./src/js/modules/popups.js
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;
const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const currentPopup = document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		})
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener("click", function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		})
	}
}

function popupOpen(currentPopup) {
	if (currentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		})
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (!popupActive.closest('.popup._sending')) {
		if (unlock) {
			popupActive.classList.remove('open');
			if (doUnlock) {
				bodyUnlock();
			}
		}
	}
} 

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout)

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape") {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
})
;// CONCATENATED MODULE: ./src/js/modules/swiper.js
new Swiper('.about-swiper', {
	loop: true,
	grabCursor: true,
	initialSlide: 3,
	speed: 800,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,
	},
	autoplay: {
		delay: 3500,
		stopOnLastSlide: false,
		disableOnInteraction: false,
	},
	mousewheel: {
		sensitivity: 1,
		eventsTarget: '.about-swiper',
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},
	preloadImages: false,
	lazy: {
		loadOnTransitionStart: true,
		loadPrevNext: true,
	},

	
	/*
	breakpoints: {
		280: {
			slidesPerView: 1,
			spaceBetween: 0,
			centeredSlides: false,
		},
		768: {
			slidesPerView: 1.8,
			spaceBetween: 25,
			centeredSlides: true,
			watchSlidesProgress: true,
		},
		1025: {
			slidesPerView: 1,
			spaceBetween: 0,
			centeredSlides: false,
		},
	},
	*/
});



;// CONCATENATED MODULE: ./src/js/modules/chat.js
// ========================ICON-CHAT===============================
let iconChat = document.querySelector('.icon-chat');
let timeOut;
if (iconChat) {
	document.addEventListener('scroll', function () {
		iconChat.style.opacity = 1;
		iconChat.style.visibility = "visible";
		iconChat.style.transform = 'translate(' + 0 + ',' + 0 + ')';
		if (timeOut != undefined) clearTimeout(timeOut);
		timeOut = setTimeout(() => {
			iconChat.style.opacity = 0;
			iconChat.style.visibility = "hidden";
			iconChat.style.transform = 'translate(' + 0 + ',' + 100 + '%' + ')';
		}, 2500)
	});
}


// ========================SCROLL-CHAT===============================
// Основной чат
// let chatContent = document.querySelector(".chat__content");
// if (chatContent) {
// 	if (window.matchMedia('(min-width: 1025px)').matches) {
// 		chatContent = new SimpleBar(document.querySelector(".chat__content")).getScrollElement();
// 	}
// 	scrollChat(chatContent);
// } 
// // Кнопка чата
// const scrollButton = document.querySelector('.chat__scroll-button');
// if (scrollButton) {
// 	scrollDown(scrollButton, chatContent);
// }

//Основной чат
const chatContent = document.querySelector(".chat__content");
if (chatContent) scrollChat(chatContent);
// Кнопка чата
const scrollButton = document.querySelector('.chat__scroll-button');
if (scrollButton) {
	scrollDown(scrollButton, chatContent);
}

// Чат сайдбара
const chatAsideContent = document.querySelector('.chat-aside__content');
if (chatAsideContent) scrollChat(chatAsideContent);
// Кнопка чата сайдбара
const scrollButtonAside = document.querySelector('.chat-aside__scroll-button');
if (scrollButtonAside) {
	scrollDown(scrollButtonAside, chatAsideContent);
}


function scrollChat(scroll) {
	scroll.scrollTo(0, scroll.scrollHeight);
}

function scrollDown(scrollButton, chatContent) {
	const scrollContent = chatContent.scrollTop - 100;
	chatContent.addEventListener("scroll", () => {
		const currentScrollContent = chatContent.scrollTop;
		if (currentScrollContent <= scrollContent) {
			scrollButton.style.opacity = 1;
			scrollButton.style.visibility = "visible";
			scrollButton.style.transform = 'translate(' + 0 + ',' + 0 + ')';
		} else {
			scrollButton.style.opacity = 0;
			scrollButton.style.visibility = "hidden";
			scrollButton.style.transform = 'translate(' + 0 + ',' + 150 + '%' + ')';
		}
	})
	scrollButton.addEventListener("click", () => {
		chatContent.scrollTo({
			top: chatContent.scrollHeight,
			behavior: "smooth"
		})
	})
}


// ========================BACK===============================
const goBack = document.querySelector('.chat__header');
if (goBack) {
	goBack.addEventListener("click", () => {
		history.back()
	})
}


// ========================BLOCKED-CHAT===============================
const blockedChat = document.querySelector('.chat-aside__body.blocked');
if (blockedChat) {
	blockedChat.insertAdjacentHTML(
		"afterbegin",
		`<div class="icon-blocked _icon-block"></div>
		<h3 class="title-blocked">Вы не вошли в аккаунт</h3>`
	)
}


// let scrollHeight = Math.max(
// 	document.body.scrollHeight, document.documentElement.scrollHeight,
// 	document.body.offsetHeight, document.documentElement.offsetHeight,
// 	document.body.clientHeight, document.documentElement.clientHeight
// )
//  window.scrollTo(0, scrollHeight);

;// CONCATENATED MODULE: ./src/js/modules/search.js
const search = document.querySelector('.list-players__input-searh');
const labels = document.querySelectorAll('.search-label');
const search_alert = document.querySelector('.search-alert');
const seacrhItems = document.querySelector('.list-players__items');

if (search) {
	search.addEventListener('input', searchPlayers)

	const resetButton = document.querySelector('.list-players__reset');
	resetButton.addEventListener('click', () => {	
		search.focus();		
		search.value = "";
		searchPlayers();
	})

	function searchPlayers () {
		let searchValue = search.value.toLowerCase().trim();
		let count = 0;

		if (searchValue) {
			resetButton.style.opacity = '1';
			resetButton.style.visibility = 'visible';
		} else {
			resetButton.style.opacity = 0;
			resetButton.style.visibility = 'hidden';
		}
		
		for (let i = 0; i < labels.length; i++) {
			const label = labels[i];
			const labelValue = label.innerHTML.toLowerCase();
			if (!labelValue.includes(searchValue)) {
				label.closest('.list-players__item').hidden = true;
				count++;
			} else {
				label.closest('.list-players__item').hidden = false;
			}
		}

		if (count == labels.length) {
			search_alert.textContent = 'Нет совпадений';
			search_alert.classList.add('_show')
		} else {
			search_alert.textContent = '';
			search_alert.classList.remove('_show')
		}

		if (count >= 1) seacrhItems.classList.add('_active');
		else seacrhItems.classList.remove('_active');
	}
}

;// CONCATENATED MODULE: ./src/js/modules/tournament.js
document.addEventListener('DOMContentLoaded', function () {
	const tournamentButton = document.querySelector('.info-tournament__button');
	const tournamentContent = document.querySelector('.info-tournament__description');
	const tournamentImage = document.querySelector('.info-tournament__img');
	if (tournamentButton) {
		setTimeout(() => {
			tournamentButton.classList.toggle('active');
			tournamentContent.classList.toggle('active');
		}, 500);
		tournamentButton.addEventListener("click", (e) => {
			tournamentButton.classList.toggle('active');
			tournamentContent.classList.toggle('active');
			tournamentImage.classList.add('disabled');
			if (!tournamentButton.classList.contains('active')) {
				setTimeout(() => {
					tournamentImage.classList.remove('disabled');
				}, 800);
			}
		})
	}

	const tourTable = document.querySelector('.tour-table__body');

	if (!tourTable) return;

	// Получаем данные турнирной таблицы из JSON
	let scriptTag = document.querySelector('#data');
	let data = JSON.parse(scriptTag.innerHTML);
	scriptTag.remove();

	// Медиа запрос
	let media = window.matchMedia('(min-width: 1025px)');

	media.addEventListener('change', () => {
		if (media.matches) activeZoom();
		else disableZoom();
	})

	// Переменные для работы с масштабом таблицы
	let scale = 1,
		panning = false,
		pointX = 0,
		pointY = 0,
		start = { x: 0, y: 0 },
		availTrans,
		zoom, zoomClientHeight, zoomClientWidth, zoomScrollHeight, zoomScrollWidth, tableTop, tableLeft;

	// Объявление основных переменных
	const stages = data.stages,
		elementArr = new Array(),
		editBtn = document.querySelector('.edit__btn'),
		saveBtn = document.querySelector('.edit__save'),
		tips = document.querySelector('.edit__tips'),
		scaleText = document.querySelector('.table-scale__text'),
		scaleReset = document.querySelector('.table-scale__reset');

	// Функция для генерации турнирной таблицы
	function initTourTable() {

		// Чистим содержимое (при изменении таблицы в режиме редактирования нужно создать новую таблицу)
		tourTable.innerHTML = '';

		for (let i in stages) {
			const stage = stages[i];
			elementArr[i] = new Array();

			// Создаем новую колонку
			let stageElem = document.createElement('div');
			stageElem.className = 'tour-table__column'
			stageElem.style = (stages.length - 1 == i) ? (`--p:${2 ** (i - 1)};`) : (`--p:${2 ** i};`);

			// Добавляем в колонку информационный блок с номером стадии
			stageElem.insertAdjacentHTML('afterbegin', getStageTitle(i));

			for (let j in stage) {
				const para = stage[j]

				// Создаем блок для пары игроков
				let paraBlock = document.createElement('div');
				paraBlock.className = "tour-table__para";
				paraBlock.setAttribute('data-pos', countPosAttr(i, j));

				// Проверяем если блок является дополнительным (блок для победителя за 3-е место)
				if (stages.length - 2 == i && j > 0) paraBlock.classList.add('extra');

				// Функция getParaBlock(); и getFinalBlock(); создают содержимое блока paraBlock
				let paraContent;

				if (stages.length - 1 == i) {
					paraContent = getFinalBlock(para);
					paraBlock.classList.add('final')
				}
				else paraContent = getParaBlock(para, i, j);

				paraBlock.insertAdjacentHTML('beforeend', paraContent);

				// Добавляем блок в массив
				elementArr[i][j] = createElemObj(paraBlock, i, j);

				// И добавляем в колонку
				stageElem.append(paraBlock);
			}

			tourTable.append(stageElem);
		}

		// Активируем зум
		activeZoom();
	}
	initTourTable();

	// Возвращает заголовок с названием стадии турнира
	function getStageTitle(i) {
		let stageName;

		if (stages.length - 1 == i) stageName = 'Финал';
		else if (stages.length - 2 == i) stageName = 'Полуфинал';
		else stageName = `Этап ${+i + 1}`;

		return `
         <div class="tour-table__stage stage">
            <div class="stage__title">${stageName}</div>
         </div>
      `
	}

	// Возвращает финальный блок для победителей
	function getFinalBlock(para) {
		let finalHtml =
			`
         <div class="tour-table__player player player-final first">
               <div class="player__info"> 
                  <div class="player__name">${para.first}</div>
               </div>
         </div>
         <div class="tour-table__player player player-final second">
               <div class="player__info">
                  <div class="player__name">${para.second}</div>
               </div>
         </div>
         <div class="tour-table__player player player-final third">
               <div class="player__info">
                  <div class="player__name">${para.third}</div>
               </div>
         </div>
      `

		return finalHtml;
	}

	// Возращает стандартный блок
	function getParaBlock(para, i, j) {
		let score = para.score.split(','),
			playerHtml,
			player1 = '',
			player2 = '';

		let bars = `
         <div class="bars bars__first">
            <div class="bars bars__second">
               <div class="bars bars__last"></div>
            </div>
         </div>
      `
		// Проверка на наличие игрока
		if (para.player1) player1 = `<div class="player__name">${para.player1}</div><input type="text" disabled class="player__score" name="edit" value="${score[0]}">`
		if (para.player2) player2 = `<div class="player__name">${para.player2}</div><input type="text" disabled class="player__score" name="edit" value="${score[1]}">`

		// Изменяем переменную bars
		if (stages.length - 2 == i) {
			if (j == 0) bars = `<div class="bars bars__staight"></div>`;
			else bars = ``;
		}

		playerHtml = `
         <div class="tour-table__player player member1" id="${i}${j}1">
            <div class="player__info">${player1}</div>
         </div>
         <div class="tour-table__player player member2" id="${i}${j}2"> 
            <div class="player__info">${player2}</div>
         </div>
         ${bars}
      `
		return playerHtml;
	}

	// Создает кастомный объект который знает о след элементах
	function createElemObj(self, i, j) {
		let obj = {}, next = new Array();

		if (i <= 0) return obj = { self, next };

		let el1 = elementArr[i - 1][j * 2] || elementArr[i - 1][j * 2 - 2],
			el2 = elementArr[i - 1][j * 2 + 1] || elementArr[i - 1][j * 2 - 1];

		let elems = [el1, el2];

		elems.forEach((elem) => {
			elem.next.push(self);
		})

		obj = { self, next };
		return obj;
	}

	// Рассчитывает позиционный аттрибут (id1, id2, isEven, isFinal)
	function countPosAttr(i, j) {
		let isEven, isFinal;

		isEven = (j % 2 == 0) ? (true) : (false);
		isFinal = (stages.length - 1 == j) ? (true) : (false);

		return `${i},${j},${isEven},${isFinal}`
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	// ZOOM and MOVEMENT //
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	// Активирует работу зума
	function activeZoom() {
		if (!media.matches) return;

		setZoomVars();

		// Передвижение таблицы
		zoom.addEventListener('pointerdown', allowMovement);
		zoom.addEventListener('pointerup', disableMovement);
		zoom.addEventListener('pointermove', setMovement);

		// Измененния масштаба
		zoom.addEventListener('wheel', setZoom);
		scaleReset.addEventListener('click', resetZoom);
		document.querySelector('.wrapper').addEventListener('pointermove', watchIntersect);

		getAvailableTranslate();
	}

	// Деактивирует работу зума
	function disableZoom() {

		// Передвижение таблицы
		zoom.removeEventListener('pointerdown', allowMovement);
		zoom.removeEventListener('pointerup', disableMovement);
		zoom.removeEventListener('pointermove', setMovement);

		// Измененния масштаба
		zoom.removeEventListener('wheel', setZoom);
		scaleReset.removeEventListener('click', resetZoom);
		document.querySelector('.wrapper').removeEventListener('pointermove', watchIntersect);
	}

	// Устанавливает переменные для коректной работы зума и перемещения таблицы 
	function setZoomVars() {
		if (media.matches) {
			zoom = document.getElementById("zoom"),
				zoomClientHeight = zoom.parentElement.clientHeight,
				zoomClientWidth = zoom.parentElement.clientWidth,
				zoomScrollHeight = zoom.scrollHeight,
				zoomScrollWidth = zoom.scrollWidth,
				tableTop, tableLeft;
		}
		else return;
	}

	// Обнуляет переменные для работы зума
	function resetZoom() {
		scaleReset.classList.remove('active');
		scale = 1;
		panning = false;
		pointX = 0;
		pointY = 0;
		start = { x: 0, y: 0 };

		setTransform();
	}

	// Фукнция для расчета зума
	function setZoom(e) {
		if (e.ctrlKey) {
			e.preventDefault();
			renewTablePos();

			let [clientX, clientY] = getClientCoords(e);

			let xs = (clientX - pointX) / scale,
				ys = (clientY - pointY) / scale,
				delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);

			(delta > 0) ? (scale *= 1.2) : (scale /= 1.2);

			if (scale > 5) scale = 5;

			pointX = clientX - xs * scale;
			pointY = clientY - ys * scale;

			if (delta < 0) {
				(pointX >= 0) ? (pointX = 0) : 0;
				(pointY >= 0) ? (pointY = 0) : 0;
			}

			if (scale <= minScale) scale = minScale;

			if (minScale != 1 || scale != minScale) {
				scaleReset.classList.add('active');
			} else {
				scaleReset.classList.remove('active');
			}


			getAvailableTranslate();
			setTransform();
		}
	}

	// Отвечает за отслеживание если курсор вышел за пределы таблицы
	function watchIntersect(e) {
		renewTablePos();

		if (e.clientX < tableLeft || e.clientY < tableTop) panning = false;

		else if (e.clientX > tableLeft + zoomClientWidth || e.clientY > tableTop + zoomClientHeight) panning = false;
	}

	// Функция для разрешения движения
	function allowMovement(e) {
		start = { x: e.clientX - pointX, y: e.clientY - pointY };
		panning = true;
	}

	// Функция для запрета движения
	function disableMovement() { panning = false }

	// Функция для рассчета движения
	function setMovement(e) {
		if (!panning) {
			return;
		}
		let pX = (e.clientX - start.x),
			pY = (e.clientY - start.y);

		if (pX < availTrans.xmax) pointX = availTrans.xmax;
		else if (pX > 0) pointX = 0;
		else pointX = pX;

		if (pY < availTrans.ymax) pointY = availTrans.ymax;
		else if (pY > 0) pointY = 0;
		else pointY = pY;

		setTransform();
	}

	function renewTablePos() {
		tableTop = zoom.parentNode.getBoundingClientRect().top;
		tableLeft = zoom.parentNode.getBoundingClientRect().left;
	}

	// Функция для рассчета максимального translate
	function getAvailableTranslate() {
		let xMAx = -(zoomScrollWidth * scale - zoomClientWidth),
			yMAx = -(zoomScrollHeight * scale - zoomClientHeight);

		if (yMAx > -10) yMAx = 0;
		if (xMAx > -10) xMAx = 0;

		availTrans = { xmax: xMAx, ymax: yMAx };
	}

	// Функция для рассчета минимального scale
	function getMinScale() {
		let scaleWidth = Math.floor(zoomClientWidth / zoomScrollWidth * 100) / 100,
			scaleHeight = Math.floor(window.innerHeight / zoomScrollHeight * 100) / 100;

		if (scaleWidth > 1) scaleWidth = 1;
		if (scaleHeight > 1) scaleHeight = 1;

		return scaleWidth >= scaleHeight ? scaleWidth : scaleHeight;
	}

	const minScale = getMinScale();


	// Функция для рассчета координат курсора
	function getClientCoords(e) {
		return [e.clientX - tableLeft, e.clientY - tableTop]
	}

	// Функция для применения трансформаций
	function setTransform() {
		zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
		scaleText.innerText = ~~(scale / 1 * 100) + '%';
	}

	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
	// EDIT MODE //
	// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

	let scores,
		scoreIndex = 1,
		hoveredElems = [],
		hoverCause,
		readyToMove = true,
		playerToMove,
		activePlayers = [],
		placeToMovePlayer;

	if (editBtn) {
		editBtn.addEventListener('click', () => {
			editBtn.classList.toggle('active')
			if (editBtn.classList.contains('active')) initEditMode();
			else removeEditMode();
		})
	}

	if (saveBtn) saveBtn.addEventListener('click', updateData);

	if (tourTable) {
		tourTable.addEventListener('change', (e) => {
			e.target.closest('.player').classList.add('_changed');
		})
	}

	// Активируем режим редактирования
	function initEditMode() {

		// Спойлер
		tips.style.height = tips.scrollHeight + 'px';
		tips.classList.add('active');

		setInputsToEditMode();

		document.addEventListener('keydown', setFocus);
		tourTable.addEventListener('pointerover', setHover);
		tourTable.addEventListener('click', editPlayers);
		tourTable.addEventListener('dblclick', deletePlayer);
	}

	// Деактивируем режим редактирования
	function removeEditMode() {

		// Спойлер
		tips.classList.remove('active');
		tips.style.height = '0px';

		scores = document.querySelectorAll('.player__score');

		for (let i = 0; i < scores.length; i++) {
			const score = scores[i];
			score.setAttribute('disabled', '');
			score.classList.remove('_edit');
		}

		document.removeEventListener('keydown', setFocus);
		tourTable.removeEventListener('pointerover', setHover);
		tourTable.removeEventListener('click', editPlayers);
		tourTable.removeEventListener('dblclick', deletePlayer);
	}

	// Обновляем данные о турнирной таблице
	function updateData() {
		let changedPlayers = document.querySelectorAll('._changed');

		if (changedPlayers.length <= 0 || !editBtn.classList.contains('active')) return;

		changedPlayers.forEach((player) => {

			let pos = player.closest('.tour-table__para').getAttribute('data-pos').split(','),
				playerJSON = stages[+pos[0]][+pos[1]],
				scoreJSON = playerJSON['score'],
				playerName = '',
				playerScore = '';

			if (player.querySelector('.player__info').innerHTML != '') {
				playerName = player.querySelector('.player__name').innerText,
					playerScore = player.querySelector('.player__score').value;
			}

			if (scoreJSON) scoreJSON = scoreJSON.split(',');

			if (player.classList.contains('first')) {
				playerJSON[`first`] = playerName;
				return;
			}
			if (player.classList.contains('second')) {
				playerJSON[`second`] = playerName;
				return;
			}
			if (player.classList.contains('third')) {
				playerJSON[`third`] = playerName;
				return;
			}

			let num = 1;
			if (player.classList.contains('member2')) num = 2;

			if (playerName != playerJSON[`player${num}`]) playerJSON[`player${num}`] = playerName;

			if (playerScore != scoreJSON[num - 1]) {
				scoreJSON[num - 1] = playerScore
				playerJSON['score'] = scoreJSON.join(',');
			}
		})

		initTourTable();
		setInputsToEditMode();
	}

	// Устанавиливаем инпуты в режим редактирования
	function setInputsToEditMode() {
		scores = document.querySelectorAll('.player__score');

		for (let i = 0; i < scores.length; i++) {
			const score = scores[i];
			score.removeAttribute('disabled');
			score.classList.add('_edit');
		}
		if (media.matches) {
			scores[0].focus();
			scores[0].setSelectionRange(scores[0].value.length, scores[0].value.length);
		}
	}

	// Меняем фокус на инпуте при Enter/Tab
	function setFocus(e) {
		if (e.key == 'Enter') {
			let focusedScore = scores[scoreIndex],
				valueL = focusedScore.value.length;

			focusedScore.focus();
			focusedScore.setSelectionRange(valueL, valueL);

			scoreIndex++;
		}
		if (e.key == 'Tab') scoreIndex++;

		if (scoreIndex > scores.length - 1) scoreIndex = 0;
	}

	// Отвечает за добавления класса hover и _cause
	function setHover(e) {
		let target = e.target,
			targetParent = target.closest('.tour-table__para');

		if (tourTable.classList.contains('_block')) return;

		if (targetParent) {
			let pos = targetParent.getAttribute('data-pos').split(',');

			if (targetParent.classList.contains('_cause')) return;
			else removeHover(hoveredElems);


			setNextPlayers(pos, hoveredElems);

			targetParent.classList.add('_cause');
			hoverCause = targetParent;
		}
		else removeHover(hoveredElems);
	}

	// Функция определяет состояние нажатого игрока и что с ним можно сделать (перенести, сделать активным и тд)
	function editPlayers(e) {

		let target = e.target,
			targetPlayer = target.closest('.tour-table__player');

		if (target.classList.contains('player__score')) {
			scores = document.querySelectorAll('.player__score');
			scoreIndex = findIndex(scores, targetPlayer) + 1 || scoreIndex;

			return;
		}

		if (targetPlayer) {
			let targetParent = targetPlayer.closest('.tour-table__para'),
				pos = targetParent.getAttribute('data-pos').split(',');

			// Запрещаем менять ховер на элементах
			tourTable.classList.add('_block');

			if (checkPlayerMove(targetPlayer) == true) {
				movePlayer(e);
			}
			else if (targetPlayer.classList.contains('_active')) {
				targetPlayer.classList.remove('_active');
				tourTable.classList.remove('_block');
			}
			else {
				if (targetPlayer.querySelector('.player__info').innerHTML == '') return;

				setNextPlayers(pos, activePlayers);

				if (playerToMove) playerToMove.classList.remove('_active');

				targetPlayer.classList.add('_active');
				playerToMove = targetPlayer;
			}
		};
	}

	// Найти индекс элемента 
	function findIndex(arr, elem) {
		for (let i = 0; i < arr.length; i++) { if (elem.isEqualNode(arr[i].closest('.player'))) return i; }
		return false;
	}

	// Функция для определения игроков которые могут быть местами для переноса выбранного игрока
	function setNextPlayers(pos, arr) {
		let target = elementArr[pos[0]][pos[1]];
		removeHover(arr);

		target.next.forEach((elem) => {
			let elemPlayer;

			if (elem.classList.contains('final')) {
				let players = elem.querySelectorAll('.player'),
					length = players.length,
					coef = pos[1] * 2,
					player1,
					player2;

				if (coef + 1 > length) return;
				else if (coef + 2 > length) {
					player1 = players[coef];
					player1.classList.add('hover');
					arr.push(player1);
				}

				if (coef + 2 <= length) {
					player1 = players[coef];
					player1.classList.add('hover');

					player2 = players[coef + 1];
					player2.classList.add('hover');

					arr.push(player1, player2);
				}

				return;
			}

			if (pos[2] == 'true') {
				elemPlayer = elem.querySelector('.member1');
				elemPlayer.classList.add('hover')
			}
			else {
				elemPlayer = elem.querySelector('.member2');
				elemPlayer.classList.add('hover')
			}

			arr.push(elemPlayer);
		})
	}

	// Удаление игрока
	function deletePlayer(e) {
		let player = e.target.closest('.player');

		if (!player) return;

		let id = player.getAttribute('id');

		if (!id || player && !id.startsWith('0')) {
			player.querySelector('.player__info').innerHTML = '';
			player.classList.add('_changed');
			scores = document.querySelectorAll('.player__score');
			scoreIndex--;
		}
	}

	// Перенос игрока в след ячейку
	function movePlayer(e) {
		readyToMove = false;

		let startCoord = countCoord(playerToMove),
			endCoord = countCoord(placeToMovePlayer),
			clonedPlayer = playerToMove.cloneNode(true);

		clonedPlayer.style.position = 'absolute';
		playerToMove.prepend(clonedPlayer);
		clonedPlayer.style.cssText += `
         transition: all 0.5s ease 0s;
         z-index: 120;
      `

		let x = (endCoord.x - startCoord.x) / scale,
			y = (endCoord.y - startCoord.y) / scale;

		setTimeout(() => {
			playerToMove.classList.remove('_active');
			playerToMove.style.boxShadow = 'inset 0px 0px 3px rgba(105, 105, 105, 0.65)';

			placeToMovePlayer.style.width = `${placeToMovePlayer.offsetWidth}px`
			clonedPlayer.style.cssText += `
            position: absolute;
            top: ${y}px;
            left: ${x}px;
            width: ${placeToMovePlayer.offsetWidth}px;
            box-shadow: none;
         `
			clonedPlayer.classList.add("_pseudo");
			placeToMovePlayer.innerHTML = '';
			placeToMovePlayer.classList.remove('hover');

			clonedPlayer.querySelector('.player__score').value = '0';
		}, 0)

		setTimeout(() => {
			placeToMovePlayer.append(clonedPlayer.querySelector('.player__info'));
			placeToMovePlayer.classList.add('_changed');

			clonedPlayer.remove()

			readyToMove = true;
			tourTable.classList.remove('_block');


			placeToMovePlayer.removeAttribute('style');
			playerToMove.removeAttribute('style');

			placeToMovePlayer.length = 0;
			activePlayers.length = 0;
		}, 1000);
	}

	// Функция для рассчета полочения элемента
	function countCoord(elem) {
		let { top, left } = elem.getBoundingClientRect();
		return { x: left, y: top };
	}

	// Проверяет если игрок является подходящим местом для переноса активного игрока
	function checkPlayerMove(targetPlayer) {

		if (!readyToMove) return false;

		for (const elem of activePlayers) {

			if (targetPlayer.isEqualNode(elem)) {
				placeToMovePlayer = elem;
				return true;
			}
		}
	}

	// Удалаяет выделение со всех элементов
	function removeHover(arr) {
		if (hoverCause) hoverCause.classList.remove('_cause');

		if (arr.length == 0) return;

		arr.forEach((elem) => {
			elem.classList.remove('hover');
		})
		arr.length = 0;
	}

}, false);

;// CONCATENATED MODULE: ./src/js/modules/spollers.js
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	})
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular)
	}

	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	})

	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		})

		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		})
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		})

		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			})

			// matchMedia.addListener(function() {
			// 	initSpollers(spollersArray, matchMedia);
			// });
			matchMedia.addEventListener("change", () => {
				initSpollers(spollersArray, matchMedia);
			})
			initSpollers(spollersArray, matchMedia);
		})
	}

	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollersBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollersBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		})
	}

	function initSpollersBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			})
		}
	}

	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]')
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}

	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500)
		}
	}
}

let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.style.transitionTimingFunction = 'ease'
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.style.removeProperty('transition-timing-function');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.transitionTimingFunction = 'ease'
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');;
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.style.removeProperty('transition-timing-function');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration)
	} else {
		return _slideUp(target, duration)
	}
}
;// CONCATENATED MODULE: ./src/js/app.js

/*==============================IMPORT========================================*/
;










/*======================================================================*/

/******/ })()
;