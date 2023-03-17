let selectAll = e => Array.from(document.querySelectorAll(e));
let selectElement = e => document.querySelector(e);

// Ngasih height buat div dengan class container, biar teksnya bisa sampe ujung di sesuaikan dengan ukuran elemen yang paling panjang yaitu bagian .image-container

let imageContainer = selectElement(`.image-container`);
let container = selectElement(`.container`);


// Main Section's All Variables
    let containerOuter = selectElement(".container-outer");
    let main = selectElement("main");
    let buttonCta = selectElement(".button-cta");
    let images = selectAll(".images");

    let modelH1 = selectAll(".model-h1");
    let modelP = selectAll(".model-p");
    let buttonLeft = selectAll(".button-left p");
    let buttonRight = selectAll(".button-right p");
    let changeName = [modelH1, modelP, buttonLeft, buttonRight];

    let buttonLeftContainer = selectElement(".button-left");
    let buttonRightContainer = selectElement(".button-right");


// Hover Effect All Variables
    // List Element element yang tidak ingin kita tampilkan
    let animateHover = selectAll(".animateHover");
    let menuLeft = selectElement(".menu-left");

    // bagian yang bakal di kasih eventListener
    let menu = selectElement(".menu");

    // ambil elemen untuk Hover Effectnya
    let hoverEffect = selectElement(".hover-effect");

// Scroll Effect All Variables
    let closeButton = selectElement(".sidebar-icon");
    let hamburger = selectElement(".hamburger");
    let hamburgerContainer = selectElement(".hamburger-container");
    let menuButton = selectElement(`li.menu-left-li:nth-child(3)`);
    let menuButtonA = menuButton.querySelector(`a`);
    let overlay = selectElement(".hamburger-overlay");
    let buttonSymbol = selectElement(".button-symbol");

// Getting date and given to footer
    let spanDate = selectElement(".footer-li a span");
    spanDate.innerHTML = `${new Date().getFullYear()}`;

// Biar Main yang ada di dalam container bisa scroll sesuai dengan parent Elementnya
container.style.height = `${imageContainer.clientHeight}px`

// Menyesuaikan ketika halaman dikecilkan dan menghindari kemungkinan height dari windows yang bertambah dan juga membuat hover effect akan hilang ketika event terjadi, karena posisi dari hover effect ini statis dan perlu di trigger setiap saat dan kita tidak bisa selalu untuk mentringger event dari hover effect tersebut
    window.addEventListener(`resize`, ()=>{
        container.style.height = `${imageContainer.clientHeight}px`;
        hoverEffect.style.opacity = "0";
    })


// Hover Effect Event Listener
    animateHover.forEach( menu=>{
        menu.addEventListener("mouseover", button =>{
            hoverEffect.style.height = `${button.target.clientHeight}px`;
            hoverEffect.style.width = `${button.target.clientWidth}px`;
            hoverEffect.style.left = `${button.target.offsetLeft}px`;
            hoverEffect.style.opacity = `1`;
            
            hoverEffect.classList.add("hover-transition");
        })
        menu.addEventListener("mouseout", ()=>{
            hoverEffect.style.opacity = `0`;
            hoverEffect.classList.remove("hover-transition");
        })
    })


window.addEventListener("click", element =>{
    // Chevron Down Scroll Down Effect
        if(element.target == buttonSymbol) containerOuter.scrollBy(0, containerOuter.clientHeight);

    // Open Navbar Effect Section 
        if(element.target == closeButton || element.target == overlay){
            hamburgerContainer.classList.remove("open-sidebar");
            hamburger.classList.remove("open-sidebar");
            overlay.classList.remove("open-sidebar");
        }else if(element.target == menuButtonA){
            hamburgerContainer.classList.add("open-sidebar");
            hamburger.classList.add("open-sidebar");
            overlay.classList.add("open-sidebar");
        }
})

// For Main Section Scroll Effect
    containerOuter.addEventListener("scroll", ()=>{	
        images.forEach((element, index) => {
            let positionElement = element.getBoundingClientRect();
            let opacityValue = 1;
            let offset = 300;
            
            // Dececting nearest element with the condition
            if( (positionElement.y > -offset && positionElement.y <= 0) || (positionElement.y < offset && positionElement.y >= 0) ){

                // Detectring scroll down and getting transition value
                    if(positionElement.y > -offset && positionElement.y <= 0) opacityValue = (1 + (positionElement.y / offset));
                
                // Detectring scroll up and getting transition value
                    if(positionElement.y < offset && positionElement.y > 0) opacityValue = (1 - (positionElement.y / offset));

                // Adding opacity for main section
                    main.style.opacity = `${opacityValue.toFixed(2)}`;
                
                // Change text when scrolling
                    changeName.forEach(parentText =>{
                        parentText.forEach(text =>{
                            if(text.classList.contains("active")) text.classList.remove("active");
                        })
                        parentText[index].classList.add("active");
                    })

                // Hide right button when the user see last image
                    let lastImage = images[images.length-1];
                    if(element == lastImage)  {
                        main.classList.add("display-gap");
                        container.classList.add("fixing-button-position", "show-footer");
                    }
                
                // Show right button when user not see last image
                    else {
                        main.classList.remove("display-gap");
                        container.classList.remove("fixing-button-position", "show-footer");
                    }

                // Chevron Down Toggle
                    if (element != images[0]) buttonCta.classList.add("chevron-del");
                    else buttonCta.classList.remove("chevron-del");
            }
        })
    })

