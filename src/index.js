// top of the page changing script functionalty
let changingHeaderScripts = () => {
    let scriptBar = document.querySelector('#top-script');

    //read the scripts as json
    fetch('/data/indexScript.json').then(res => res.json())
        .then((json) => {
            //variables to be used in headerScriptTimer
            let scriptSize = json.headerScripts.length;
            let scriptIndex = 0;

            let headerScriptTimer = setInterval(() => {
                let scriptArray = json.headerScripts;

                //keep the scriptIndex withing the boundaries of the array length
                if(scriptIndex >= scriptSize){
                    scriptIndex = 0;
                }

                scriptBar.innerHTML = scriptArray[scriptIndex];

                scriptIndex++;
            },5000);

            headerScriptTimer;

        });

}

changingHeaderScripts();




//append create card color change animation so that it wont fire on page load
let createCardButton = document.querySelector('.create-card');

window.onload = () => {
    createCardButton.style.transition = "color, background-color ease-in-out 0.2s";

    let buttonElement = document.querySelector("#first-content button");
    buttonElement.style.transition = "background-color 0.15s ease-in-out";
}




//all the flag related functionalities 

let flagFunctionalities = () => {
    
//flags drop down functionality
let flagsButtonElement = document.querySelector("#flag");
let flagsDropMenuElement = document.querySelector("#flags-drop-down");

//set width and height od the flags drop down wrt flagButtonElement
let width = flagsButtonElement.clientWidth;
let height = flagsButtonElement.clientHeight;

flagsDropMenuElement.style.top = `${flagsButtonElement.getBoundingClientRect().height}px`


//handles closing the Drop Menu
let closeDropMenu = () => {
    let arrowElement = document.querySelector('#flag-after');

    arrowElement.style.transform = "rotateZ(45deg)";
    flagsDropMenuElement.style.display = "none";
}

//handle button clik on drop down
flagsButtonElement.addEventListener('click', () => {
    let arrowElement = document.querySelector('#flag-after');

    if(flagsDropMenuElement.style.display != "flex"){
        arrowElement.style.transform = "rotateZ(-135deg)";
        flagsDropMenuElement.style.display = "flex";
    }else{
        closeDropMenu();
    }
});


//set the flag functionality
let callback = (event) => {
    event.stopPropagation();//prevent eventlistener bubbling to children elements

    //set the src of Nav flag and close the drop down menu
    let targetFlagSrc = event.currentTarget.children[0].src;
    flagsButtonElement.children[0].src = targetFlagSrc;

    closeDropMenu()
}

//prevent event bubbling
for(let i = 0 ; i < flagsDropMenuElement.children.length ; i++){
    flagsDropMenuElement.children[i].addEventListener('click', callback);
}

//hide drop menu when it looses focus
let bodyElement = document.querySelector('*');

bodyElement.addEventListener('click', (event) => {
    let lostFocus = true;
    
    for(let i = 0 ; i < flagsDropMenuElement.children.length ; i++){
        if(event.target == flagsDropMenuElement.children[i] || event.target == flagsDropMenuElement || event.target == flagsButtonElement){
            lostFocus = false;
        }
    }

    for(let j = 0 ; j < flagsButtonElement.children.length ; j++){
        if(event.target == flagsButtonElement.children[j]){
            lostFocus = false;
        }
    }

    if(lostFocus){
        closeDropMenu();
    }

})

}


flagFunctionalities();




// responsive hamburger menu animations
let hamburgerMenuIcon = () => {

    //hamburger-menu icon animations and click functionality
    let hamburgerIconAnimation = () => {
    let dashTop = document.querySelectorAll('.dash')[0];
    let dashMiddle = document.querySelectorAll('.dash')[1];
    let dashBottom = document.querySelectorAll('.dash')[2];
    let hamburgerIcon = document.querySelector('#hamburger-menu');

    let isMenuOpen = false;

    hamburgerIcon.addEventListener('click', () => {
        if(!isMenuOpen){// menu will be opened
            dashTop.style.animationName = "dash-top-in"
            dashBottom.style.animationName = "dash-bottom-in"
            dashMiddle.style.animationName = "dash-middle-in"
        }else{//menu will be closed
            dashTop.style.animationName = "dash-top-out"
            dashBottom.style.animationName = "dash-bottom-out"
            dashMiddle.style.animationName = "dash-middle-out"
        }
        isMenuOpen = !isMenuOpen;
    })

    }

    hamburgerIconAnimation();



}

hamburgerMenuIcon();

//responsive hamburger menu contents animation
let hamburgerMenuContents = () => {
    let hamburgerIcon = document.querySelector('#hamburger-menu');
    let hamburgerContents = document.querySelector('#hamburger-content');
    let body = document.querySelector('body');
    let mainContentElement = document.querySelector('#main-container');

    let isMenuOpen = false;

    hamburgerIcon.addEventListener('click', () => {
        if(!isMenuOpen){// open the menu
            body.style.backgroundColor = "#B2B2B2";
            //mainContentElement.style.left = "-100vw"
            
            mainContentElement.style.position = "fixed"
            hamburgerContents.style.animationName = "slide-in"
        }else{//hide the menu
            body.style.backgroundColor = "#F3F4F6";
            //mainContentElement.style.left = "0";
            
            mainContentElement.style.position = "relative"
            hamburgerContents.style.animationName = "slide-out";
        } 
        isMenuOpen = !isMenuOpen
    })
}

hamburgerMenuContents();



//second-content count up animation
let countAnimation = (duration) => {
    let numbers = document.querySelectorAll('#second-content .value');
    let isFired = new Array; //array to check if animation already fired

    for(let i = 0 ; i < numbers.length ; i++){
        isFired.push(false);
    }

    //callback function to fire animation
    let countUp = (currentElement, elementValue) => {
        let count = 0;
        let interval = setInterval(() => {
            count = count + (elementValue / duration);
            currentElement.innerHTML = Number.parseFloat(count).toPrecision(6);

            //make sure to end animation when number s high enough
            if(elementValue <= count){
                currentElement.innerHTML = elementValue;
                clearInterval(interval);
            }

        }, 1);

    }

    //check scroll to fire animation
    window.onscroll = () => {
        let currentPageBottom = window.pageYOffset+ window.innerHeight;
        
        for(let j = 0 ; j < numbers.length ; j++){
            const currentElement = numbers[j];
            const elementValue = parseFloat(currentElement.innerHTML);
                
            //added 120 because of the fixed header's height
            if(currentElement.offsetTop  + 120 <= currentPageBottom){

                //make sure the animation fires only once
                if(!isFired[j]){
                    countUp(currentElement, elementValue);
                    isFired[j] = true;

                }
            }
        }

    }

}

const duration = 700;//duration of the count up animation in ms
countAnimation(duration);




//third-content hover functionality
let thirdContentHover = () =>{
    let hoverElements = document.querySelectorAll('.svg-container svg');

    //for each hover element
    for(let i = 0 ; i < hoverElements.length ; i++){
        let element = hoverElements[i];
        let hoverText = element.parentElement.children[0];
        
        let clicked = false;

        //handle hover
        element.addEventListener('mouseover', (event) =>{
            event.stopPropagation();
            hoverText.style.display = "block";
        })

        //handle click and phone
        element.addEventListener('focus', (event) =>{
            event.stopPropagation();
            hoverText.style.display = "block";
            clicked = true;
        })

        //handle click and phone
        element.addEventListener('blur', (event) =>{
            event.stopPropagation();
            
            hoverText.style.display = "none";

            clicked = false;
        })

        element.addEventListener('mouseout', (event) =>{
            event.stopPropagation();
            if(!clicked){
            hoverText.style.display = "none";
            }
        })
    }

}

thirdContentHover();




// fourth-content slider animation

//card opacity animation used as a callback in fourthContentSlider function
let cardOpacity = (count, dotElements, sliderCardElements) => {
    //opacity effect
    let leftElementCount = (count - 1) > -1 ? (count - 1) : (dotElements.length -1) ;
    let rightElementCount = (count + 1) < dotElements.length ? (count + 1) : 0 ; 
   
    //device width
    let screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    //check screen size to decide to how many items to give full opacity
    if(screenWidth > 768 ){//3 items full opacity
        //reduce old items opacity
        for(let i = 0 ; i < dotElements.length ; i++){
            if(i != leftElementCount && i != rightElementCount && i != count){
                sliderCardElements[i].style.opacity = "0.3";
            }
        }
        sliderCardElements[leftElementCount].style.opacity = "1";
        sliderCardElements[rightElementCount].style.opacity = "1";
        sliderCardElements[count].style.opacity = "1";
    }else{//only the center/1 item full opacity

    }

}

//main function call for the slider 
let fourthContentSlider = () => {
    let leftArrow = document.querySelector('#fourth-content #card-display .left-arrow');
    let rightArrow = document.querySelector('#fourth-content #card-display .right-arrow');
    let sliderDiv = document.querySelector('#fourth-content #card-display');
    let dotElements = document.querySelectorAll('#fourth-content .dot-container .dot');
    let sliderCardElements = document.querySelectorAll('#fourth-content #card-display .slider-card');

    let slideAmount = "27.5";
    let count = 0;

    
    //initialize the slider css
    dotElements[count].style.backgroundColor = "#15234C";


    //initialize card opacities on page load
    cardOpacity(count, dotElements, sliderCardElements);


    //slide the cards to left
    leftArrow.addEventListener('click', (e) => {
        e.preventDefault();


        //change old dots color
        dotElements[count].style.backgroundColor = "#B1B6C3";
        
        count--;

        //make it wrap when reaches the first
        if(count < 0){
            count = dotElements.length - 1;
        }

        //change color of the dots
        dotElements[count].style.backgroundColor = "#15234C";

        //card opacity change on sliding
        cardOpacity(count, dotElements, sliderCardElements);

        
//
        sliderDiv.style.marginLeft = `${(slideAmount * count)}vw`
    });

    
    //slide the cards to right
    rightArrow.addEventListener('click', (e) => {
        e.preventDefault();
console.log("e")

         //change old dots color
         dotElements[count].style.backgroundColor = "#B1B6C3";

         count++;
 
         //make it wrap when reaches the end
         if(count > dotElements.length -1){
             count = 0;
         }
 
        //change color of the dots
        dotElements[count].style.backgroundColor = "#15234C";

        //card opacity change on sliding
        cardOpacity(count, dotElements, sliderCardElements);

        console.log(count)
//
        sliderDiv.style.marginLeft = `${(slideAmount * count)}vw`

    });

}   

fourthContentSlider();