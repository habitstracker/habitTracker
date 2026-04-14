const CACHE='lifeos-v4';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('googleapis.com')||e.request.url.includes('accounts.google')||e.request.url.includes('groq.com')||e.request.url.includes('openai.com')||e.request.url.includes('anthropic.com')||e.request.url.includes('generativelanguage')){
    e.respondWith(fetch(e.request));return;
  }
  e.respondWith(fetch(e.request).then(r=>{if(r&&r.status===200){const c=r.clone();caches.open(CACHE).then(cache=>cache.put(e.request,c))}return r}).catch(()=>caches.match(e.request)));
});
