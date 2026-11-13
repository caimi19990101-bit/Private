const translations={
 en:{discover:"Discover",anime:"Anime",how:"How it works",download:"Download App",eyebrow:"Little episodes. Big feelings.",headline:"Small stories.<br><em>Big drama.</em>",subheadline:"Discover your next obsession. Watch every episode free in the app.",watch:"Watch preview",micro:"Free previews · Full stories in the app",moodTitle:"A story for every mood.",moodSub:"Short dramas and anime. All in one app.",popular:"Popular short dramas",animeTitle:"Explore anime",allFree:"Every story. Every episode. Free.",allFreeSub:"Download ikantv to unlock full stories and watch every episode for free.",howTitle:"A little preview. A lot of feelings.",step1:"Choose your mood",step2:"Watch a 59-second preview",step3:"Explore the app",finalTitle:"Your next story is waiting."},
 hi:{discover:"खोजें",anime:"एनीमे",how:"कैसे काम करता है",download:"ऐप डाउनलोड करें",eyebrow:"छोटे एपिसोड। बड़ी भावनाएँ।",headline:"छोटी कहानियाँ।<br><em>बड़ा ड्रामा।</em>",subheadline:"अपनी अगली पसंदीदा कहानी खोजें। ऐप में हर एपिसोड मुफ़्त देखें।",watch:"प्रीव्यू देखें",micro:"मुफ़्त प्रीव्यू · पूरी कहानियाँ ऐप में",moodTitle:"हर मूड के लिए एक कहानी।",moodSub:"शॉर्ट ड्रामा और एनीमे, सब एक ऐप में।",popular:"लोकप्रिय शॉर्ट ड्रामा",animeTitle:"एनीमे देखें",allFree:"हर कहानी। हर एपिसोड। मुफ़्त।",allFreeSub:"पूरी कहानियाँ देखने के लिए ikantv डाउनलोड करें।",howTitle:"छोटा प्रीव्यू। ढेर सारी भावनाएँ।",step1:"अपना मूड चुनें",step2:"59 सेकंड का प्रीव्यू देखें",step3:"ऐप एक्सप्लोर करें",finalTitle:"आपकी अगली कहानी इंतज़ार कर रही है।"},
 ar:{discover:"اكتشف",anime:"أنمي",how:"كيف يعمل",download:"حمّل التطبيق",eyebrow:"حلقات صغيرة. مشاعر كبيرة.",headline:"قصص صغيرة.<br><em>دراما كبيرة.</em>",subheadline:"اكتشف هوسك القادم. شاهد كل حلقة مجانًا في التطبيق.",watch:"شاهد المقتطف",micro:"مقتطفات مجانية · القصص الكاملة في التطبيق",moodTitle:"قصة لكل مزاج.",moodSub:"دراما قصيرة وأنمي. كل ذلك في تطبيق واحد.",popular:"أشهر الدراما القصيرة",animeTitle:"استكشف الأنمي",allFree:"كل قصة. كل حلقة. مجانًا.",allFreeSub:"حمّل ikantv لفتح القصص الكاملة ومشاهدة كل حلقة مجانًا.",howTitle:"مقتطف صغير. ومشاعر كثيرة.",step1:"اختر مزاجك",step2:"شاهد مقتطفًا مدته 59 ثانية",step3:"استكشف التطبيق",finalTitle:"قصتك القادمة بانتظارك."}
};
const fallback=[
{id:"demo-drama-1",type:"drama",title:"A Story to Remember",description:"A dramatic story full of unexpected turns.",category:"Romance / Family",poster_url:"/assets/poster-romance.svg"},
{id:"demo-drama-2",type:"drama",title:"The Hidden Promise",description:"A secret changes everything.",category:"Mystery / Romance",poster_url:"/assets/poster-mystery.svg"},
{id:"demo-anime-1",type:"anime",title:"Beyond the Stars",description:"An animated adventure begins.",category:"Adventure / Fantasy",poster_url:"/assets/poster-anime.svg"}
];
async function loadPublic(){
 try{const r=await fetch('/api/public/site');if(!r.ok)throw 0;const d=await r.json();return d}catch(e){return {site:{brand:"ikantv",downloadUrl:"#",previewSeconds:59},content:fallback}}
}
function card(x){return `<article class="content-card"><img src="${esc(x.poster_url||'/assets/poster-romance.svg')}" alt="${esc(x.title)}"><div class="info"><h3>${esc(x.title)}</h3><p>${esc(x.category||'Featured')} · ${esc(x.description||'')}</p></div></article>`}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
(async()=>{
 const data=await loadPublic();const site=data.site||{};const content=data.content?.length?data.content:fallback;
 document.querySelectorAll('.download-link').forEach(a=>a.href=site.downloadUrl||'#');
 if(site.brand)document.querySelectorAll('.brand').forEach(el=>el.textContent=site.brand);
 if(site.headline){const h=document.querySelector('.hero h1');if(h)h.innerHTML=esc(site.headline).replace(/\\n/g,'<br>');}
 if(site.subheadline){const p=document.querySelector('.hero .lead');if(p)p.textContent=site.subheadline;}
 document.getElementById('dramaCards').innerHTML=content.filter(x=>x.type==='drama').map(card).join('');
 document.getElementById('animeCards').innerHTML=content.filter(x=>x.type==='anime').map(card).join('');
 document.getElementById('year').textContent=new Date().getFullYear();
 const lang=document.getElementById('language');
 lang.addEventListener('change',()=>{const l=lang.value;document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(translations[l]?.[k])el.innerHTML=translations[l][k]})});
 const modal=document.getElementById('previewModal');document.getElementById('watchPreview').onclick=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false')};document.getElementById('closePreview').onclick=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
 document.getElementById('timer').textContent=site.previewSeconds||59;
})();
