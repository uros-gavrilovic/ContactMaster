const burgerBtn = document.querySelector(".burger");
const nav = document.getElementById("navBar");
const navLinks = document.querySelectorAll(".headerList li");

burgerBtn.addEventListener("click", function () {
    nav.classList.toggle("navMenuActive");

    for(let i=0; i<navLinks.length; i++){
        if(navLinks[i].style.animation) {
            navLinks[i].style.animation = "";
        } else {
            navLinks[i].style.animationName = 'navLinkFade';
        }
    }
    
    burgerBtn.classList.toggle('toggle');
});

const upBtn = document.getElementById("upBtnId");
const footer = document.getElementById("footer");
const footerLogo = document.getElementById("footerLogoId");
const about = document.getElementById("about");

upBtn.addEventListener("mouseover", function(){
    if(footer.classList.contains("footerDark")){
        upBtn.setAttribute('src', 'img/up4.png');
    } else {
        upBtn.setAttribute('src', 'img/up2.png');
    }
});
upBtn.addEventListener("mouseout", function(){
    if(footer.classList.contains("footerDark")){
        upBtn.setAttribute('src', 'img/up3.png');
    } else {
        upBtn.setAttribute('src', 'img/up.png');
    }
});
upBtn.addEventListener("click", function(){
    window.scrollTo({top: 0, behavior: 'smooth'});
});
about.addEventListener("click", function(){
    let footerHeight = document.getElementById("footer").offsetHeight;
    window.scrollTo({top: footerHeight, behavior: 'smooth'});
});
about.addEventListener("mouseover", function(){
    about.classList.add("cursorPointer");
});

function phoneDisplay(){
    // every page has dark footer by default
    console.log("Phone display activated.")
    if(!footer.classList.contains("footerDark")) footer.classList.add("footerDark");
    upBtn.setAttribute("src", "img/up3.png")
    footerLogo.setAttribute("src", "img/icon2.png");
}
function standardDisplay(){
    console.log("Standard display activated.");
    if(window.location.pathname.toString().endsWith("index.html")){
        // index page on standard display has a light footer
        footer.classList.remove("footerDark");
    }
    if(footer.classList.contains("footerDark")){
        upBtn.setAttribute("src", "img/up3.png")
        footerLogo.setAttribute("src", "img/icon.png");
    }
    
}

if (window.innerWidth < 820) { // phone display
    phoneDisplay();
} else {
    standardDisplay();
}

window.addEventListener('resize', function() {
    if (window.innerWidth < 820) { // phone display
        phoneDisplay();
    } else {
        standardDisplay();
    }
});

