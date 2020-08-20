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