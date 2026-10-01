// Task 1
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.nav-links a');

let removeAllActiveClasses = function () {
    navLinks.forEach(el => {
        el.classList.remove("active");
    });
};

let addActiveClasses = function (id) {
    let selector = `.nav-links a[href="#${id}"]`;
    document.querySelector(selector)?.classList.add("active");
};

window.addEventListener('scroll', function () {
    let scrollPosition = document.documentElement.scrollTop;

    sections.forEach(section => {
        let top = section.offsetTop;
        let height = section.offsetHeight;

        if (scrollPosition + (window.innerHeight / 4) >= top &&
            scrollPosition + (window.innerHeight / 4) < top + height) {
            let currentId = section.attributes.id.value;
            removeAllActiveClasses();
            addActiveClasses(currentId);
        }
    });
});

// Task 2
let htmlElement = document.documentElement;
let but = document.getElementById("theme-toggle-button")


but.addEventListener("click", darkMode)

function darkMode() {
    htmlElement.classList.toggle("dark")

    if (htmlElement.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
};

if (localStorage.getItem("theme") === "light") {
    htmlElement.classList.remove("dark");
}

// Task 3
let tabs = document.querySelectorAll(".portfolio-filter")
let items = document.querySelectorAll(".portfolio-item")

tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
        let filter = this.dataset.filter;


        tabs.forEach(function (t) {
            t.classList.remove("active");
        })


        this.classList.add("active");

        items.forEach(function (item) {
            if (filter === "all" || item.dataset.category === filter) {
                item.style.display = "";

                item.classList.add("animate__animated", "animate__zoomIn");

            } else {
                item.style.display = "none";
            }
        })
    })
});

// Task 4
let sliderItems = document.querySelectorAll('.testimonial-card')
let hiddenCount = 0;

// Previous and Next Buttons
let nextButton = document.getElementById("next-testimonial")
let prevButton = document.getElementById("prev-testimonial")

// Handel Click on Previous and Next Buttons
nextButton.addEventListener("click", nextSlide)
prevButton.addEventListener("click", prevSlide)

// Carousel Indicators
let indicators = document.querySelectorAll(".carousel-indicator");

// Update Indicators
function updateIndicators() {
    indicators.forEach((indicator, index) => {
        if (index === hiddenCount) {
            indicator.classList.add("active");
        } else {
            indicator.classList.remove("active");
        }
    });
}

// Next Slide Function
function nextSlide() {
    let visibleCards = 3;
    if (hiddenCount < sliderItems.length - visibleCards) {
        sliderItems[hiddenCount].style.display = "none";
        hiddenCount++;
    } else {
        sliderItems.forEach(item => item.style.display = "");
        hiddenCount = 0;
    }
    updateIndicators()
}

// Previous Slide Function
function prevSlide() {
    const visibleCards = 3;
    if (hiddenCount > 0) {
        hiddenCount--;
        sliderItems[hiddenCount].style.display = "";
    } else {
        hiddenCount = sliderItems.length - visibleCards;
        sliderItems.forEach((item, index) => {
            if (index < hiddenCount) {
                item.style.display = "none";
            } else {
                item.style.display = "";
            }
        });
    }
    updateIndicators()
}

// Task 5
let settingsBut = document.getElementById("settings-toggle")
let sidebar = document.getElementById("settings-sidebar")
let closeSettingsBut = document.getElementById("close-settings")

settingsBut.addEventListener("click", openSettings)

function openSettings() {
    sidebar.classList.remove("translate-x-full")
    settingsBut.style.transform = 'translate(-20rem, -50%)';
}

closeSettingsBut.addEventListener("click", closeSettings)

function closeSettings() {
    sidebar.classList.add("translate-x-full")
    settingsBut.style.transform = 'translateY(-50%)';
}

let body = document.body;
let fontBut1 = document.getElementById("fontbut1")
let fontBut2 = document.getElementById("fontbut2")
let fontBut3 = document.getElementById("fontbut3")
const fontClasses = ["font-alexandria", "font-tajawal", "font-cairo"];

fontBut1.addEventListener("click", changeFont)
fontBut2.addEventListener("click", changeFont)
fontBut3.addEventListener("click", changeFont)

function changeFont(e) {
    let name = e.currentTarget.dataset.font;

    body.classList.remove(...fontClasses);
    body.classList.add("font-" + name);

    [fontBut1, fontBut2, fontBut3].forEach((btn) => {
        if (btn.dataset.font === name) {
            btn.classList.add("active");
            btn.setAttribute("aria-checked", "true");
        } else {
            btn.classList.remove("active");
            btn.setAttribute("aria-checked", "false");
        }
    });
    localStorage.setItem("font", name);
};

let savedFont = localStorage.getItem("font");
if (savedFont) {
    document.querySelector('[data-font="' + savedFont + '"]').click();
}

// ------------------------------------------

let buttonTheam = document.querySelectorAll(".buttest")

buttonTheam.forEach(btn => {
    btn.addEventListener("click", theamChange);
})

function theamChange(e) {
    let btn = e.currentTarget

    buttonTheam.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    htmlElement.style.setProperty('--color-primary', btn.dataset.primary);
    htmlElement.style.setProperty('--color-secondary', btn.dataset.secondary);

    localStorage.setItem("primary", btn.dataset.primary);
    localStorage.setItem("secondary", btn.dataset.secondary);
}

let savedPrimary = localStorage.getItem("primary");
let savedSecondary = localStorage.getItem("secondary");

if (savedPrimary) {
    htmlElement.style.setProperty('--color-primary', savedPrimary);
    htmlElement.style.setProperty('--color-secondary', savedSecondary);

    buttonTheam.forEach(b => {
        if (b.dataset.primary === savedPrimary) b.classList.add("active");
    });
}

let resetSettings = document.getElementById("reset-settings")

resetSettings.addEventListener("click", reset)

function reset() {
    body.classList.remove(...fontClasses);
    body.classList.add("font-tajawal");
    fontBut2.classList.add("active")
    fontBut2.setAttribute("aria-checked", "true")
    fontBut1.classList.remove("active")
    fontBut1.setAttribute("aria-checked", "false")
    fontBut3.classList.remove("active")
    fontBut3.setAttribute("aria-checked", "false")

    sidebar.classList.add("translate-x-full")
    settingsBut.style.transform = 'translateY(-50%)';

    localStorage.removeItem("font");
    localStorage.removeItem("primary");
    localStorage.removeItem("secondary");
    htmlElement.style.setProperty("--color-primary", "#6366f1");
    htmlElement.style.setProperty("--color-secondary", "#8b5cf6");
    buttonTheam.forEach(b => b.classList.remove("active"));
    buttonTheam[0].classList.add("active");

}


// Task 6
let scrollToTop = document.getElementById("scroll-to-top")

window.onscroll = function () {
    if (this.scrollY >= 1300) {
        scrollToTop.classList.remove("opacity-0", "invisible")
        scrollToTop.classList.add("opacity-100", "visible");
    } else {
        scrollToTop.classList.remove("opacity-100", "visible")
        scrollToTop.classList.add("opacity-0", "invisible");
    }
}

scrollToTop.addEventListener("click", scrollUp)

function scrollUp() {
    window.scrollTo({
        top: 0
    })
}