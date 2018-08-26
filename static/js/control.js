class IndexController {
    constructor(){
        this.init();
    }

	init(){        
        this.showUpdateConsole(); 
    }
	showUpdateConsole(){
		console.dir("IndexController in controllers")
	}
 showUpdateUI(message){
        let htmlTemplate = '';
		    htmlTemplate +=`<div class="card-body update-message-body"><h5 class="card-title">${message}</h5>
                       <button id="btn-refresh" class="brn-sm-radius button">Refresh</button>
                       <button id="btn-cancel" class="brn-sm-radius button">Cancel</button>
                   </div>
            `;
        const updateMessage = document.querySelector('#update-message');
		
        updateMessage.innerHTML = htmlTemplate;
    }
}