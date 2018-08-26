window.ws = new WebSlides();
const controller = new IndexController();	
	  // Then if the DOM is ready, let it register our sw.js file as serviceWorker alias.
	  window.addEventListener("load",e=>{ 
	  //Let's see if our browser support sW
	 if("serviceWorker"in navigator){
		navigator.serviceWorker.register("../../sw.js").then(reg=>{
	    console.log('S_worker: registered');		
        if(reg.waiting) {updateReady(reg.waiting);return;}
        if(reg.installing) {
            reg.installing.addEventListener('statechange', () => {
                if(this.state == 'installed'){
                    updateReady(this);
                    return;
                }
            });
        }
        reg.addEventListener('updatefound', () => {
            reg.installing.addEventListener('statechange', ()=>{
                if(this.state == 'installed'){
                    updateReady(this);
                    return;
                }
            });
        })
    }).catch(error => console.log('Registration failed with ' + error));
    // This works around a bug in "force update on reload".
    var refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        window.location.reload();
        refreshing = true;
    });
}
 updateReady =(worker)=>{
    controller.showUpdateUI('New version available');

    const updateMessage = document.querySelector('#update-message');

    updateMessage.addEventListener('click', (e) => {
        if(e.target && e.target.id == 'btn-refresh'){
            worker.postMessage({action: 'skipWaiting'});
        window.location.reload();          

        }else if(e.target && e.target.id== 'btn-cancel'){
            setTimeout(() => {
                document.querySelector('#update-message div').remove();
            }, 500);
        }

    })
}
})	
window.addEventListener("load",e=>{ 
//Short hand Selector function 
	  g=(k)=>document.querySelector(k);
	  //Short hand function for Creating Elements
	  create=(k)=>document.createElement(k);
	  //Short hand function for Appending Children/child
	  append=(k)=>document.appendChild(k);
	  //Short hand function for Insert Before
	  insB=(k,l,f)=>k.insertBefore(l,k.childNodes[f]);
	  const allS = g(".allowMe");
	  //Let's add some content to the #webslides-zoomed or All slides container
	  const wel=g("#webslides-zoomed");
	  //Let's create a div element and add it to All slides container
	  let welcomed = create("div");
	  let welcom = create("span");
	  welcom.append(welcomed);
	      welcom.classList.add("content-center");
	      welcomed.classList.add("bg-yellow");
	      welcomed.innerHTML = "Welcome, Choose a slide"; 
	  //Let's create another div element and add it at the bottom of All slides container
	  let titl = create("div");
	      titl.classList.add("content-center");
	      titl.innerHTML = "These are all slides i have";
		  insB(wel,welcom,0);
		  insB(wel,titl,4);

 //Trigger clck for All Slides when loading page
 //Make sure the target is slide1, there is no need to trigger all slides on slide2/25
 if(window.location.hash == "#slide=1"){
	allS.click();
	}else{console.dir(window.location.hash)}
});