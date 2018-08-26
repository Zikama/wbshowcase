const cachNames="v1";  
const sw = "Service Worker : "; 
self.addEventListener("install",e=>{
	console.log( sw,"installing");      
  //Empty ?,Yeah! we cache with fetch Event 
  });
self.addEventListener("activate",e=>{
	console.log( sw,"Activateed");
    e.waitUntil( 	
      caches.keys().then(cachName=>{
    	return Promise.all(
	     cachName.map(cache=>{
	   	  if(cache !== cachNames){
			console.dir(sw,"Unwanted caches are being cleared");
			return caches.delete(cache)
		 }
	   })
	  );
    }) 
  );
});
self.addEventListener("fetch",e=>{
	console.log( sw,"fetching");
	 e.respondWith(
	  fetch(e.request)
	   .then(res =>{
	    const resClone = res.clone();
         caches.open(cachNames).then(cache=>{
		  cache.put(e.request,resClone) }).then(()=>{ self.skipWaiting();}) ; 
           return res;		   
	 }).catch(err => caches.match(e.request).then(res => res))
	 );
  });
self.addEventListener('message', (event) => {
    if (event.data.action === 'skipWaiting') { self.skipWaiting();
    }});