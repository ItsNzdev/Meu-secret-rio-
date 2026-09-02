const CACHE="meu-secretario-enzo-v5";
const A=["./","./index.html","./manifest.webmanifest","./secretary-icon.png","./nyc-background.jpg"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{let y=x.clone();caches.open(CACHE).then(c=>c.put(e.request,y));return x}).catch(()=>caches.match("./index.html"))))});
self.addEventListener("push",e=>{
 let data={title:"Meu Secretário",body:"Você tem um novo lembrete.",url:"./"};
 try{data=Object.assign(data,e.data?e.data.json():{})}catch(_){}
 e.waitUntil(self.registration.showNotification(data.title,{body:data.body,icon:"secretary-icon.png",badge:"secretary-icon.png",tag:data.tag||"secretary-reminder",data:{url:data.url||"./"}}));
});
self.addEventListener("notificationclick",e=>{
 e.notification.close();
 e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{
   for(const c of cs) if("focus" in c) return c.focus();
   return clients.openWindow(e.notification.data?.url||"./");
 }));
});