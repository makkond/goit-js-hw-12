(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();const S="49650448-036e738118328f32db28a86cb",M="https://pixabay.com/api/";async function u(o,r){const s={key:S,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15};try{return(await window.axios.get(M,{params:s})).data}catch(t){throw console.error("API Error:",t),new Error("Failed to fetch images")}}let l;document.addEventListener("DOMContentLoaded",()=>{window.SimpleLightbox?l=new window.SimpleLightbox(".gallery a",{captionsData:"alt",captionDelay:250}):console.error("SimpleLightbox is not available")});const h=document.querySelector(".gallery"),f=document.querySelector(".loader"),p=document.querySelector(".load-more-btn");function m(o){const r=o.map(({webformatURL:s,largeImageURL:t,tags:e,likes:i,views:a,comments:L,downloads:v})=>`
      <div class="photo-card">
        <a href="${t}">
          <img src="${s}" alt="${e}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${i}
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
            ${v}
          </p>
        </div>
      </div>
    `).join("");h.insertAdjacentHTML("beforeend",r),l?l.refresh():window.SimpleLightbox&&(l=new window.SimpleLightbox(".gallery a",{captionsData:"alt",captionDelay:250}))}function q(){h.innerHTML=""}function g(){f.classList.add("show")}function y(){f.classList.remove("show")}function w(){p.classList.add("show")}function c(){p.classList.remove("show")}const z=document.querySelector(".search-form"),E=document.querySelector(".load-more-btn");let d="",n=1;z.addEventListener("submit",async o=>{o.preventDefault();const s=o.target.elements.searchQuery.value.trim();if(!s){window.iziToast.error({title:"Помилка",message:"Будь ласка, введіть пошуковий запит",position:"topRight"});return}s!==d&&(n=1,q(),c()),d=s;try{g(),c();const t=await u(s,n);if(t.hits.length===0){window.iziToast.info({title:"Інформація",message:"На жаль, за вашим запитом нічого не знайдено. Спробуйте інший запит.",position:"topRight"});return}n===1&&window.iziToast.success({title:"Успіх",message:`Знайдено ${t.totalHits} зображень`,position:"topRight"}),m(t.hits);const e=Math.ceil(t.totalHits/15);n<e?w():(c(),t.hits.length>0&&window.iziToast.info({title:"Інформація",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),n>1&&b()}catch(t){window.iziToast.error({title:"Помилка",message:"Щось пішло не так. Спробуйте ще раз пізніше.",position:"topRight"}),console.error(t)}finally{y()}});E.addEventListener("click",async()=>{n+=1;try{g(),c();const o=await u(d,n);m(o.hits);const r=Math.ceil(o.totalHits/15);n<r?w():(c(),window.iziToast.info({title:"Інформація",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),b()}catch(o){window.iziToast.error({title:"Помилка",message:"Щось пішло не так. Спробуйте ще раз пізніше.",position:"topRight"}),console.error(o)}finally{y()}});function b(){const{height:o}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
