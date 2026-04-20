/* =============================================================
   Best Kept Secret — Band Website
   script.js
   ============================================================= */

/* ── YOUTUBE BG ── */
// Paste a video ID from @BestKeptSecretBand on YouTube
// e.g. from https://youtu.be/XXXXXXXXXXX → var BKS_ID = 'XXXXXXXXXXX';
var BKS_ID = ''; // ← PASTE VIDEO ID HERE

var t = document.createElement('script');
t.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(t);
window.onYouTubeIframeAPIReady = function(){
  if(!BKS_ID) return;
  new YT.Player('yt-bg',{
    videoId:BKS_ID,
    playerVars:{autoplay:1,mute:1,loop:1,playlist:BKS_ID,controls:0,showinfo:0,rel:0,modestbranding:1,playsinline:1},
    events:{onReady:function(e){e.target.playVideo();}}
  });
};

/* ── MOBILE MENU ── */
function toggleMenu(){
  document.getElementById('mobileMenu').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('open') ? 'hidden' : '';
}

/* ── VIDEO MODAL ── */
function openVid(){
  document.getElementById('vidFrame').src = 'https://www.youtube.com/@BestKeptSecretBand';
  document.getElementById('vidModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeVid(){
  document.getElementById('vidModal').classList.remove('open');
  document.getElementById('vidFrame').src = '';
  document.body.style.overflow = '';
}
document.getElementById('vidModal').addEventListener('click', function(e){if(e.target===this)closeVid();});

/* ── NAV ── */
window.addEventListener('scroll',function(){
  document.getElementById('nav').classList.toggle('stuck',window.scrollY>50);
});

/* ── REVEAL ── */
var robs = new IntersectionObserver(function(entries){
  entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('on');});
},{threshold:0.1});
document.querySelectorAll('.rvi').forEach(function(el){robs.observe(el);});

/* ── COUNT UP ── */
var cobs = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(!e.isIntersecting) return;
    var el = e.target, target = parseInt(el.dataset.count), c = 0;
    var step = target/60;
    var timer = setInterval(function(){
      c = Math.min(c+step,target);
      el.textContent = Math.floor(c)+(c>=target?'+':'');
      if(c>=target) clearInterval(timer);
    },16);
    cobs.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll('.astat-n').forEach(function(el){cobs.observe(el);});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var t = document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
  });
});