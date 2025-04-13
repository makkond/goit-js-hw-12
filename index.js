(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const v="49650448-036e738118328f32db28a86cb",P="https://pixabay.com/api/";async function u(o,i){const s=new URLSearchParams({key:v,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i.toString(),per_page:"15"});try{const t=await fetch(`${P}?${s}`);if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);return await t.json()}catch(t){throw console.error("API Error:",t),new Error("Failed to fetch images")}}let l;document.addEventListener("DOMContentLoaded",()=>{window.SimpleLightbox?l=new window.SimpleLightbox(".gallery a",{captionsData:"alt",captionDelay:250}):console.error("SimpleLightbox is not available")});const h=document.querySelector(".gallery"),f=document.querySelector(".loader"),p=document.querySelector(".load-more-btn");function m(o){const i=o.map(({webformatURL:s,largeImageURL:t,tags:e,likes:r,views:a,comments:L,downloads:S})=>`
      <li class="photo-card">
        <a href="${t}">
          <img src="${s}" alt="${e}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${r}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${a}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${L}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${S}
          </p>
        </div>
      </li>
    `).join("");h.insertAdjacentHTML("beforeend",i),l?l.refresh():window.SimpleLightbox&&(l=new window.SimpleLightbox(".gallery a",{captionsData:"alt",captionDelay:250}))}function $(){h.innerHTML=""}function g(){f.classList.add("show")}function y(){f.classList.remove("show")}function w(){p.classList.add("show")}function c(){p.classList.remove("show")}const E=document.querySelector(".form"),T=document.querySelector(".load-more-btn");let d="",n=1;E.addEventListener("submit",async o=>{o.preventDefault();const s=o.target.elements.searchQuery.value.trim();if(!s){window.iziToast.error({title:"Помилка",message:"Будь ласка, введіть пошуковий запит",position:"topRight"});return}s!==d&&(n=1,$(),c()),d=s;try{g(),c();const t=await u(s,n);if(t.hits.length===0){window.iziToast.info({title:"Інформація",message:"На жаль, за вашим запитом нічого не знайдено. Спробуйте інший запит.",position:"topRight"});return}n===1&&window.iziToast.success({title:"Успіх",message:`Знайдено ${t.totalHits} зображень`,position:"topRight"}),m(t.hits);const e=Math.ceil(t.totalHits/15);n<e?w():(c(),t.hits.length>0&&window.iziToast.info({title:"Інформація",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),n>1&&b()}catch(t){window.iziToast.error({title:"Помилка",message:"Щось пішло не так. Спробуйте ще раз пізніше.",position:"topRight"}),console.error(t)}finally{y()}});T.addEventListener("click",async()=>{n+=1;try{g(),c();const o=await u(d,n);m(o.hits);const i=Math.ceil(o.totalHits/15);n<i?w():(c(),window.iziToast.info({title:"Інформація",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),b()}catch(o){window.iziToast.error({title:"Помилка",message:"Щось пішло не так. Спробуйте ще раз пізніше.",position:"topRight"}),console.error(o)}finally{y()}});function b(){const o=document.querySelector(".gallery");if(!o||!o.firstElementChild){console.log("No cards to scroll to");return}const{height:i}=o.firstElementChild.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
