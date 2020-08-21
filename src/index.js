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




//