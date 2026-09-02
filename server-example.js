// server-example.js
// OPTIONAL: servidor para PUSH REAL agendado. Requer Node.js + web-push.
// Instalação: npm i express web-push
// Defina VAPID_PUBLIC_KEY e VAPID_PRIVATE_KEY e use HTTPS em produção.
// O PWA envia a subscription para POST /api/push/subscribe.
// Depois, agende no banco as notificações para 09:00 do dia anterior ao vencimento.
//
// Este arquivo é uma base de produção: a persistência de subscriptions e contas
// deve ficar num banco por utilizador. Não há credenciais reais neste pacote.

const express=require("express");
const webpush=require("web-push");
const app=express(); app.use(express.json());
const subscriptions=new Map();
const PUBLIC=process.env.VAPID_PUBLIC_KEY, PRIVATE=process.env.VAPID_PRIVATE_KEY;
if(PUBLIC&&PRIVATE) webpush.setVapidDetails("mailto:admin@example.com",PUBLIC,PRIVATE);

app.post("/api/push/subscribe",(req,res)=>{
 const {userId,subscription}=req.body;
 if(!userId||!subscription)return res.status(400).json({error:"invalid"});
 subscriptions.set(userId,subscription); res.json({ok:true});
});
app.post("/api/push/send",(req,res)=>{
 if(!PUBLIC||!PRIVATE)return res.status(500).json({error:"VAPID keys not configured"});
 const {userId,title,body,tag}=req.body, sub=subscriptions.get(userId);
 if(!sub)return res.status(404).json({error:"subscription not found"});
 webpush.sendNotification(sub,JSON.stringify({title,body,tag})).then(()=>res.json({ok:true}))
 .catch(e=>res.status(500).json({error:String(e)}));
});
app.listen(process.env.PORT||3000,()=>console.log("Push server running"));
