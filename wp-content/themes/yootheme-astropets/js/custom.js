
function isInViewportPartially(elem){
    var myElement = elem
    var bounding = myElement.getBoundingClientRect();
    var myElementHeight = myElement.offsetHeight;
    var myElementWidth = myElement.offsetWidth;
    if (bounding.top >= -myElementHeight 
        && bounding.left >= -myElementWidth
        && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + myElementWidth
        && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + myElementHeight) {
        return true;
    } else {
        return false;
    }
}
var isInViewport = function (elem, only_top) {
    var bounding = elem.getBoundingClientRect();
    if(typeof only_top != "undefined" && only_top==true){
        var elemHeight = elem.offsetHeight;
        var elemWidth = elem.offsetWidth;
        return  (bounding.top >= -elemHeight 
            && bounding.left >= -elemWidth
            && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + elemWidth
            && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + elemHeight);
    }else{
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};
function isMobile(){
    if (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)) {
        return true ;
    } else {
        return false ;
    }
}
function isOldSafari(){
    //var ua = "Mozilla/5.0 (Machintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15";
    ua=navigator.userAgent;
    if(ua.match(/Mac OS X/i) && ua.match(/Version\/11/i) && ua.match(/Safari/i)){
        return true;
    }else{
        return false;
    }
}
/*
function preloaderSite(callback){
    const anchors = document.querySelectorAll('a');
    const transition_el = document.querySelector('.transition');
    const logo = document.getElementById('transition-logo');
    setTimeout(() => {
        transition_el.classList.remove('is-active');
        logo.classList.remove('is-active');
    }, 500);
    setTimeout(() => {
        logo.classList.add('is-waiting');
        transition_el.classList.add('is-waiting');
        if(typeof callback == "function") callback();
    }, 1700);
}
*/
function closePreloader(callback){
    const transition_el = document.querySelector('.transition');
    const logo = document.getElementById('transition-logo');
    setTimeout(() => {
        transition_el.classList.remove('is-active');
        logo.classList.remove('is-active');
    }, 500);
    setTimeout(() => {
        logo.classList.add('is-waiting');
        transition_el.classList.add('is-waiting');
        if(typeof callback == "function") callback();
    }, 1700);
}
function openPreloader(){
    const transition_el = document.querySelector('.transition');
    const logo = document.getElementById('transition-logo');
    logo.classList.add('is-up');
    transition_el.classList.add('is-up');
}
function addPreloaderEL(){
    const anchors = document.querySelectorAll('a');
    for (let i = 0; i < anchors.length; i++) {
        const anchor = anchors[i];
        anchor.addEventListener('click', e => {
            const an = e.target.closest("a");
            if(an.getAttribute('href').startsWith("javascript:")){
                return true;
            }
            if(an.getAttribute('target') != null){
                if(an.getAttribute('target').startsWith("_blank")) return true;
            }
            e.preventDefault();
            if(an.getAttribute('href').charAt(0)=="#"){
                window.location.href = an.getAttribute('href');
                return true;
            }
            openPreloader();
            setTimeout(() => {
                window.location.href = an.getAttribute('href');
            }, 1350);
        });
    }
}

function setupNavMenu(){
    jQuery(".tm-header .menu-item").each(function(){
        if(jQuery(this).find(".uk-navbar-dropdown").length > 0){
            if(!jQuery(this).hasClass("uk-active")){
                jQuery(this).find(".uk-navbar-dropdown").remove();
                jQuery(this).removeClass("menu-item-has-children");
                jQuery(this).removeClass("uk-parent");
                var a = jQuery(this).find("a").clone();
                a.removeAttr("aria-haspopup");
                a.removeAttr("aria-expanded");
                jQuery(this).html(a);
            }else{
                var a = jQuery(this).find("a[aria-haspopup='true']").clone();
                var d = jQuery(this).find(".uk-navbar-dropdown").clone();
                jQuery(this).html(a);
                var c = jQuery(this).offset();
                d.addClass("uk-open");
                jQuery(".tm-header .uk-navbar-container").after(d);
                var w = jQuery(".tm-header .uk-navbar-container+.uk-navbar-dropdown").width()+40;
                jQuery(".tm-header .uk-navbar-container+.uk-navbar-dropdown").css("left", c.left+jQuery(this).outerWidth()-w);
                var l = jQuery(".tm-header .uk-navbar-container+.uk-navbar-dropdown").find(".menu-item").length;
                for(var i = 0; i < l ; i++){
                    jQuery(".tm-header .uk-navbar-container+.uk-navbar-dropdown").find(".menu-item").eq(i).css("transition-delay",(300+(i*70))+"ms");
                }
            }
        }
    });
    addPreloaderEL();
}
function adjustNavMenu(){
    if(jQuery(".tm-header .menu-item.uk-active").length==0) return;
    var m = jQuery(".tm-header .uk-navbar-container+.uk-navbar-dropdown").width()+40;
    var a = jQuery(".tm-header .menu-item.uk-active").outerWidth();
    var c = jQuery(".tm-header .menu-item.uk-active").offset();
    jQuery(".tm-header .uk-navbar-container+.uk-navbar-dropdown").css("left", c.left+a-m);
}
/*
function setupVideo(){
    var video = jQuery("#intro-video video");
    video.get(0).pause();
}
*/
function closeVideo(){
    //jQuery("#transition-logo").css("opacity", 1);
    jQuery("#intro-video").stop().animate({opacity:0},500,function(){
        jQuery(".audio-intro-box .uk-button").removeClass("active");
        jQuery("#skip-video").removeClass("visible");
        var video = jQuery("#intro-video video");
        video.get(0).currentTime = 0;
        video.get(0).pause();
        enterHome();
    })
}

function replayIntro(){
    jQuery("#intro-video").css("display", "none");
    var video = jQuery("#intro-video video");
    if ( video.get(0).play ) {

    }else{
        video.get(0).currentTime = 0;
    }
    jQuery(".tm-header, .tm-header-mobile, .uk-section-default").stop().animate({opacity:0},500,function(){
        jQuery(".tm-page-bg, .three-container").stop().animate({opacity:0},500,function(){
            jQuery("html, body").css("overflow", "auto");
            jQuery("#intro-video").css("opacity", "0");
            jQuery("#intro-video").css("display", "block");
            setTimeout(function(){
                jQuery("#intro-video").stop().animate({opacity:1},500,function(){
                    //var video = jQuery("#intro-video video");
                    //video.get(0).currentTime = 0;
                    if ( video.get(0).play ) {

                    }else{
                        video.get(0).play();
                    }
                    setTimeout(function(){
                        jQuery(".audio-intro-box .uk-button").addClass("active");
                    },100);
                    setTimeout(function(){
                        jQuery("#skip-video").addClass("visible");
                    },2000);
                    setTimeout(function(){
                        jQuery("#skip-video").removeClass("visible");
                    },28000);
                });
            },100);
        });
    });
}
function hideHero(){
    jQuery(".uk-section-default, .tm-header, .tm-header-mobile, .tm-page-bg, .three-container").css("opacity", "0");
    jQuery("#hero").removeClass("active");
    jQuery(".uk-logo").css("opacity","0");
    jQuery(".uk-logo svg").removeClass("active");
    jQuery(".tm-header").removeClass("active");
    var l = jQuery(".tm-header .uk-navbar-nav > li > a").length;
    for(var i = 0; i<l; i++){
        jQuery(".tm-header .uk-navbar-nav > li > a").eq(i).css("transition-delay", (i*70)+"ms");
    }
}
function showHero(){
    jQuery(".tm-page-bg, .three-container").stop().animate({opacity:1},500,function(){
        jQuery(".uk-section-default").stop().animate({opacity:1},1,function(){
            jQuery("#hero").addClass("active");
            jQuery("#hero h1.radial-blue").addClass("is-inview");
            setTimeout(function(){
                    jQuery(".tm-header, .tm-header-mobile, .uk-logo").css("opacity","1");
                    jQuery(".uk-logo").addClass("active");
                    jQuery(".tm-header").addClass("active");
                    /*
                    jQuery("#transition-logo").attr("class", "is-waiting");
                    jQuery(".transition").attr("class", "transition is-waiting");
                    jQuery(".transition").css("display", "flex");
                    */
                    jQuery("#hero #replay-intro").stop().delay(1200).animate({opacity:1},500);
                    jQuery(".uk-navbar-dropdown.uk-open").addClass("animate")
            },1000);
        });
    });
}
function enterHome(){
    hideHero();
    jQuery("html, body").css("overflow", "auto");
    jQuery("#intro-video").css("display", "none");
    showHero();
}
function adaptVideo(){
    if(jQuery(window).width()>640) return;
    jQuery("video").each(function(){
        var c = jQuery(this).closest("div");
        if(typeof c.attr("data-src-mob") != "undefined"){
            jQuery(this).attr("src", c.attr("data-src-mob"));
        }
    })
}
function getCenter(element) {
    const {left, top, width, height} = element.getBoundingClientRect();
    return {x: left + width / 2, y: top + height / 2}
}
function normalizeVideo(){
    var vv = document.querySelectorAll('video');
    if(jQuery(window).width()<640){
        for(var i=0; i< vv.length; i++){
            var c = jQuery(vv[i]).closest("div");
            if(typeof c.attr("data-src-mob") != "undefined"){
                vv[i].src = c.attr("data-src-mob");
            }
        }
    }
    if(isMobile() && navigator.userAgent.match(/Safari/i)){
        for(var i=0; i< vv.length; i++){
            var videoUrl = vv[i].src;
            videoUrl = videoUrl.replace(/\.[^/.]+$/, "");
            videoUrl = videoUrl+".mp4";
            vv[i].src = videoUrl;
        }
    }
}
/*
function getVideoBlob(video){
    const vid = video;
    let vurl = video.src;
    var fileExt = video.src.split('.').pop();
    let format;
    if(fileExt.toLowerCase() == "webm"){
        format = 'video/webm; codecs="vp8,vorbis"';
    }else{
        format = 'video/mp4';
    }
    const mediaSource = new MediaSource();
    let sourceBuffer = null;
    
    mediaSource.addEventListener('sourceopen', event => {
      sourceBuffer = mediaSource.addSourceBuffer(format);
      fetch(vurl)
      .then(response => process(response.body.getReader()))
      .catch(err => console.error(err));
    }); vid.src = URL.createObjectURL(mediaSource);
    
    function process(stream) {
      return new Response(
        new ReadableStream({
          start(controller) {
            async function read() {
              let { done, value } = await stream.read();
              if (done) {
                updatePerc();
                controller.close();
                return;
            }
              sourceBuffer.appendBuffer(value);
              sourceBuffer.addEventListener(
                'updateend', event => read(),
                { once: true }
              );
            } read();
          }
        })
      );
    }
}
*/
async function getVideoBlob(video){
    var fileExt = video.src.split('.').pop();
    let format;
    if(fileExt.toLowerCase() == "webm"){
        format = 'video/webm; codecs="vp9,opus"';
    }else{
        format = 'video/mp4';
    }
    const videoElement = video;
    const mediaSource = new MediaSource();
    const remoteVidUrl = video.src;
	videoElement.src = URL.createObjectURL(mediaSource);
    const vidBlob = await (await fetch(remoteVidUrl)).blob();
    const vidBuff = await vidBlob.arrayBuffer();
    const sourceBuffer = await new Promise((resolve, reject) => {
		const getSourceBuffer = () => {
			try {
				const sourceBuffer = mediaSource.addSourceBuffer(format);
				resolve(sourceBuffer);
			} catch (e) {
				reject(e);
			}
		};
		if (mediaSource.readyState === 'open') {
			getSourceBuffer();
		} else {
			mediaSource.addEventListener('sourceopen', getSourceBuffer);
		}
	});
    sourceBuffer.appendBuffer(vidBuff);
	sourceBuffer.onupdateend = () => {
		mediaSource.endOfStream();
		videoElement.play();
        updatePerc();
	};
}
let loadedObjs = 0;
let totalObjs = 0;

function updatePerc(){
    loadedObjs++;
    var v = Math.round(Math.abs(loadedObjs*100/totalObjs));
    //jQuery("#preloader-counter").text(v+"%");
    jQuery("#rectPrel").stop(true).animate({
        width: v+"%"
    },300);
    if(loadedObjs == totalObjs){
        jQuery("#preloader-counter").text("");
        closePreloader(function(){
            onDocReady();
            setTimeout(function(){
                jQuery("#rectPrel").width(0);
            },1000)
        });
    }
}

function preloadFiles(){
    hideHero();
    var rm = jQuery(".rfp-ap").length;
    for(var i = 0; i< rm; i++) jQuery(".rfp-ap").eq(i).find('video').addClass("rmfp");
    normalizeVideo();
    var imgs = document.getElementsByTagName("img");
    var imgSrcs = [];
    for (var i = 0; i < imgs.length; i++) if(!imgSrcs.includes(imgs[i].src)) imgSrcs.push(imgs[i].src);
    var videos = document.getElementsByTagName("video");
    var videoSrcs = [];
    for (var i = 0; i < videos.length; i++){
        if(!videoSrcs.includes(videos[i].src)){
            if(!jQuery(videos[i]).hasClass("rmfp")){
                videoSrcs.push(videos[i].src);
            }
        }
    }
    totalObjs = imgSrcs.length + videoSrcs.length;
    loadedObjs = 0;
    
    var preloadVideo = function(){
        let video = document.getElementsByTagName("video");
        for(let i = 0; i < video.length; i++){
            if(!jQuery(video[i]).hasClass("rmfp")){
                if(isMobile() && navigator.userAgent.match(/Safari/i)){
                    updatePerc();
                }else{
                    getVideoBlob(video[i]);
                }
            }
        }
        
    }
    /*
    var preloadVideo = function(){
        const video = document.getElementsByTagName("video");
        for(var i = 0; i < video.length; i++){
            if(!jQuery(video[i]).hasClass("rmfp")){
                var req = new XMLHttpRequest();
                req.video = video[i];
                req.responseType = 'blob';
                req.overrideMimeType("blob");
                req.open('GET', video[i].src, true);
                req.onload = function(data) {
                    if (this.status === 200) {
                        var videoBlob = this.response;
                        if ( window.webkitURL ) {
                            //var vid = webkitURL.createObjectURL(videoBlob);
                            //alert(JSON.stringify(data));
                        }else{
                            var vid = URL.createObjectURL(videoBlob);
                            this.video.src = vid;
                        }
                        loadedObjs++;
                        updatePerc();

                    }
                }
                req.onerror = function() {
                    loadedObjs++;
                    updatePerc();
                }
                req.send();
            }
        }
    }
    */

    for (var i = 0; i < imgSrcs.length; i++){
        var img=new Image;
        img.src=imgSrcs[i];
        img.onload=function(){
            updatePerc();
        };
        img.onerror=function(){
            updatePerc();
        }
    }
    //for (var i = 0; i < videoSrcs.length; i++){
        preloadVideo();
    //}
    return imgSrcs;
}
function onDocReady(){
    if (!navigator.userAgent.includes("Firefox")) {
        jQuery(".radial-blue").addClass("fixChrome");
    }
    if(!isMobile()){
        
        const arrow = document.querySelector("#videomask");
        if(arrow!=null){
            const arrowCenter = getCenter(arrow);
            addEventListener("mousemove", ({clientX, clientY}) => {
                const angle = Math.atan2(clientY - arrowCenter.y, clientX - arrowCenter.x);
                const tot = angle +( (Math.PI/180) * 90);
                //const tot = angle + radians(-90);
                //arrow.style.transform = `rotate(${angle}rad)`;
                arrow.style.transform = `rotate(${tot}rad)`;
            });
        }
    }
    jQuery("#page-container, #header-container").css("display","block");
    //adaptVideo();
    setTimeout(setupNavMenu, 150);
    animateFromBottom();
    animateRadialBlue();
    categoriesSlider();
    timelineSlider();
    elpowerSlider();
    var vs = document.querySelector("#video-section video");
    //console.log(vs);
    //if(vs && vs.play) vs.play();
    if(jQuery("#intro-video video").length>0){
        var video = jQuery("#intro-video video");
        video.on("ended", function() {
            closeVideo();
        });
        if(document.referrer.indexOf(location.protocol + "//" + location.host) === 0){
            enterHome();
        }else{
            replayIntro();
        }
    }else{
        enterHome();
    }
    
    /*
    var userAgent = window.navigator.userAgent;
    if(jQuery("#intro-video video").length>0 && !userAgent.includes("Chrome-Lighthouse")){
        var video = jQuery("#intro-video video");
        video.get(0).play();
        video.on("ended", function() {
            closeVideo();
        });
        if(document.referrer.indexOf(location.protocol + "//" + location.host) === 0){
            //jQuery("#transition-logo").css("opacity", 1);
            var video = jQuery("#intro-video video");
            video.get(0).pause();
            video.get(0).currentTime = 0;
            hideHero();
            closePreloader(function(){
                enterHome();
            });
        }else{
            //jQuery(".transition").css("display", "none");
            //jQuery("#intro-video").css("opacity", "1");
            //jQuery("#intro-video").css("display", "block");
            //jQuery("html, body").css("overflow", "hidden");
            //jQuery("#transition-logo").css("opacity", 1);
            hideHero();
            //setupVideo();
        }
    }else{
        //jQuery("#transition-logo").css("opacity", 1);

        hideHero();
        closePreloader(function(){
            enterHome();
        });
    }
    */
    //jQuery("#start-audio .uk-button").on("click", function(e){
    jQuery(".audio-intro-button").on("click", function(e){
        e.preventDefault();
        var video=document.querySelector("#intro-video video");
        video.muted = !video.muted;
        if(video.muted){
            jQuery(this).addClass("audio-off");
        }else{
            jQuery(this).removeClass("audio-off");
        }
    });
    jQuery("#skip-video .uk-button").on("click", function(e){
        e.preventDefault();
        closeVideo();
    });
    jQuery("#replay-intro a").on("click", function(e){
        e.preventDefault();
        replayIntro();
    });
    setTimeout(function(){
        runSplit();
        scrollBox();
        createFooterAnimation();
    }, 200);
    jQuery("#tm-dialog-mobile.uk-offcanvas .menu-item  .uk-nav-sub").remove();
    jQuery("#tm-dialog-mobile.uk-offcanvas .menu-item").each(function(i){
        jQuery(this).find("a").eq(0).css("transition-delay", (300+(30*i))+"ms");
    });
    installPetsDescriptions();
    if(jQuery("[name='keyword']").val()==""){
        jQuery("[name='keyword']").closest("form").find("button").addClass("btn-ss-disabled");
    }
    jQuery("[name='keyword']").on("focus", function(){
        jQuery(this).closest("form").addClass("focused");
    }).on("blur",  function(){
        jQuery(this).closest("form").removeClass("focused");
        if(jQuery(this).val()!=""){
            jQuery(this).closest("form").find("button").removeClass("btn-ss-disabled");
        }else{
            jQuery(this).closest("form").find("button").addClass("btn-ss-disabled");
        }
    }).on("keyup", function(){
        if(jQuery(this).val()!=""){
            jQuery(this).closest("form").find("button").removeClass("btn-ss-disabled");
        }else{
            jQuery(this).closest("form").find("button").addClass("btn-ss-disabled");
        }
    });

}
jQuery(document).ready(function(){
    if(isOldSafari()) jQuery("body").addClass("isOldSafari");
    preloadFiles();
});

jQuery(window).resize(function(){
    setTimeout(adjustNavMenu, 150);
});




let typeSplit;
function runSplit() {
    typeSplit = new SplitType(".split-lines", {
        types: "lines"
    });
    heroH4 = new SplitType("#hero h4", {
        types: "words"
    });
    var l = jQuery("#hero h4 .word").length;
    for(var i = 0; i<l; i++){
        jQuery("#hero h4 .word").eq(i).css("transition-delay", (500+(i*70))+"ms");
    }
    createTextComparsionAnimation();
}


let windowWidth = jQuery(window).innerWidth();
window.addEventListener("resize", function () {
    if (windowWidth !== jQuery(window).innerWidth()) {
        windowWidth = jQuery(window).innerWidth();
        typeSplit.revert();
        runSplit();
    }
});

gsap.registerPlugin(ScrollTrigger);

function animateFromBottom(){
    let afb = new SplitType(".animate-from-bottom", {
        types: "lines, words"
    });
    var afb_obj = document.querySelectorAll('.animate-from-bottom');
    var l = afb_obj.length;
    for(i = 0; i < l; i++){
        var y = afb_obj[i].querySelectorAll('.word');
        for(z = 0; z < y.length; z++){
            y[z].style.transitionDelay = (z*35)+"ms";
        }
    }
    window.addEventListener('scroll', function (event) {
        var l = afb_obj.length;
        var ot = false;
        for(i = 0; i < l; i++){
            ot = false;
            if(jQuery(afb_obj[i]).hasClass("only_top")) ot = true;
            if (isInViewport(afb_obj[i], ot)) afb_obj[i].classList.add("is-inview");
        }
    }, false);
}
function animateRadialBlue(){
    let afb = new SplitType(".radial-blue", {
        types: "words"
    });
    var afb_obj = document.querySelectorAll(".radial-blue");
    var l = afb_obj.length;
    for(i = 0; i < l; i++){
        var y = afb_obj[i].querySelectorAll('.word');
        for(z = 0; z < y.length; z++){
            y[z].style.transitionDelay = (z*100)+"ms";
        }
    }
    window.addEventListener('scroll', function (event) {
        var l = afb_obj.length;
        for(i = 0; i < l; i++){
            if (isInViewport(afb_obj[i])) afb_obj[i].classList.add("is-inview");
        }
    }, false);
}


function createTextComparsionAnimation() {
    jQuery(".split-lines .line").each(function (index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: jQuery(this),
                // trigger element - viewport
                start: "top 70%",
                end: "+=200",
                scrub: 1
            }
        });
        tl.to(jQuery(this), {
            backgroundPositionX: "0%",
            duration: 1
        });
    });
}
function createFooterAnimation(){
    //var footer_block = document.getElementById("footer");
    var footer_block = document.querySelector("#footer > .uk-container > .tm-grid-expand:nth-child(2)");
    if(footer_block == null) return;
    let xt;
    window.addEventListener('scroll', function (event) {
        if (isInViewportPartially(footer_block)){
                if(jQuery(".bg-desk-box").length>0){
                    jQuery(".bg-desk-box").css("display", "none");
                    jQuery(".bg-desk-box").css("opacity", "0");
                }
                jQuery("html").addClass("invertedColor");
                clearTimeout(xt);
        }else{
                jQuery("html").removeClass("invertedColor");
                if(jQuery(".bg-desk-box").length>0){
                    xt = setTimeout(function(){
                        jQuery(".bg-desk-box").css("display", "block");
                        jQuery(".bg-desk-box").stop().animate({opacity:1},200);
                        //jQuery(".bg-desk-box").css("opacity", "1");
                        clearTimeout(xt);
                    },400);
                }
        }
    }, false);
}

function categoriesSlider(){
    if(isMobile()) return;
    const slider = document.querySelector('.cat-slide-container');
    if(slider == null) return;
    let isDown = false;
    let startX;
    let scrollLeft;
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        cancelMomentumTracking();
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        beginMomentumTracking();
    });
    slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 0.7; //scroll-fast
        //slider.scrollLeft = scrollLeft - walk;
        var prevScrollLeft = slider.scrollLeft;
        slider.scrollLeft = scrollLeft - walk;
        velX = slider.scrollLeft - prevScrollLeft;
    });
    slider.addEventListener("wheel", function (e) {
        var prevScrollLeft = slider.scrollLeft;
        slider.scrollLeft += e.deltaX;
        velX = slider.scrollLeft - prevScrollLeft;
        //checkSlide();
    });
    var velX = 0;
    var momentumID;
  
    slider.addEventListener('wheel', (e) => {
        cancelMomentumTracking();
    }); 
    var beginMomentumTracking = function(){
        cancelMomentumTracking();
        momentumID = requestAnimationFrame(momentumLoop);
      }
    var cancelMomentumTracking = function(){
        cancelAnimationFrame(momentumID);
    }
    var momentumLoop = function(){
        slider.scrollLeft += velX;
        velX *= 0.95; 
        if (Math.abs(velX) > 0.5){
            momentumID = requestAnimationFrame(momentumLoop);
        }
    }
}

function scrollBox(){
    gsap.registerPlugin(ScrollTrigger);
    //const extraLongContainer = document.querySelectorAll(".no-wrap");
    for(i=0; i<document.querySelectorAll(".no-wrap").length; i++){
        var offs = document.querySelectorAll(".no-wrap")[i].offsetWidth;
        if(document.querySelectorAll(".no-wrap")[i].classList.contains("inverse")){
            gsap.fromTo(document.querySelectorAll(".no-wrap")[i], {
                x: -offs//+(window.innerWidth*2)
            },
            {
                //xPercent: 0,
                x: () => 0,//window.innerWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: document.querySelectorAll(".no-wrap")[i],
                    start: "top bottom",
                    //end: () => "+=" + offs + "px",
                    scrub: true,
                    pin: false,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });
        }else{
            gsap.to(document.querySelectorAll(".no-wrap")[i], {
                xPercent: -100,
                x: () => window.innerWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: document.querySelectorAll(".no-wrap")[i],
                    start: "top bottom",
                    end: () => "+=" + offs + "px",
                    scrub: true,
                    pin: false,
                    invalidateOnRefresh: true,
                    anticipatePin: 1
                }
            });
        }
    }
}

function installPetsDescriptions(){
    jQuery(".button-apet button").on("click", function(event){
        event.preventDefault();
        if(jQuery(this).closest(".container-apet").hasClass("opened")){
            jQuery(this).closest(".container-apet").removeClass("opened");
            jQuery(this).find(".btn-text").text(jQuery(this).attr("data-close"));
        }else{
            jQuery(this).closest(".container-apet").addClass("opened");
            jQuery(this).find(".btn-text").text(jQuery(this).attr("data-open"));
        }
    });
}

function timelineSlider(){

    const slider = document.querySelector('.roadmap-box');
    if(slider == null) return;
    var setSlideDelay = function(){
        var slides = document.querySelectorAll(".roadmap-slide");
        for (i=0; i<slides.length;i++){
            var par = slides[i].querySelectorAll("h5");
            for (j=0; j<par.length;j++){
                par[j].style.transitionDelay = (35+(j*35))+"ms";
            }
        }
    }
    setSlideDelay();
    var checkSlide = function(){
        var slides = document.querySelectorAll(".roadmap-slide");
        for (i=0; i<slides.length;i++){
            if (isInViewport(slides[i].querySelector(".roadmap-slide-trigger"))){
                slides[i].classList.add("is-inview");
            }else{
                slides[i].classList.remove("is-inview");
            }
        }
    }
    //var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if(isMobile()){
        //document.getElementById("roadmap").style.overflowX = 'auto';
        document.getElementById("roadmap").addEventListener('scroll', function (event) {
            checkSlide();
        });
        return;
    }


    let isDown = false;
    let startX;
    let scrollLeft;
    const lerp = (a, b, n) => (1 - n) * a + n * b;
    

    var mdown = function(e){
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        cancelMomentumTracking();
    }
    var mleave = function(e){
        isDown = false;
    }
    var mup = function(e){
        isDown = false;
        beginMomentumTracking();
    }
    var mmove = function(e){
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 0.7; //scroll-fast
        //slider.scrollLeft = scrollLeft - walk;
        var prevScrollLeft = slider.scrollLeft;
        slider.scrollLeft = scrollLeft - walk;
        velX = slider.scrollLeft - prevScrollLeft;
        checkSlide();
    }
    slider.addEventListener('mousedown', mdown);
    slider.addEventListener('mouseleave', mleave);
    slider.addEventListener('mouseup', mup);
    slider.addEventListener('mousemove', mmove);

    slider.addEventListener("wheel", function (e) {
        var prevScrollLeft = slider.scrollLeft;
        slider.scrollLeft += e.deltaX;
        velX = slider.scrollLeft - prevScrollLeft;
        checkSlide();
    });

    var velX = 0;
    var momentumID;
  
    slider.addEventListener('wheel', (e) => {
        cancelMomentumTracking();
    }); 
    var beginMomentumTracking = function(){
        cancelMomentumTracking();
        momentumID = requestAnimationFrame(momentumLoop);
      }
    var cancelMomentumTracking = function(){
        cancelAnimationFrame(momentumID);
    }
    var momentumLoop = function(){
        slider.scrollLeft += velX;
        velX *= 0.95; 
        checkSlide();
        if (Math.abs(velX) > 0.5){
            momentumID = requestAnimationFrame(momentumLoop);
        }
    }

}

function elpowerSlider(){

    const slider = document.querySelector('#elpower-box');
    if(slider == null) return;

    var setSlideDelay = function(){
        var slides = document.querySelectorAll("#elpower-box .elpower-slide");
        for (i=0; i<slides.length;i++){
            var par = slides[i].querySelectorAll("img");
            for (j=0; j<par.length;j++){
                par[j].style.transitionDelay = ((j*200))+"ms";
            }
        }
    }
    setSlideDelay();
    /*
    var checkSlide = function(){
        var slides = document.querySelectorAll("#elpower-box .elpower-slide");
        for (i=0; i<slides.length;i++){
            if (isInViewport(slides[i].querySelector(".elpower-slide-trigger"))){
                slides[i].classList.add("is-inview");
            }else{
                slides[i].classList.remove("is-inview");
            }
        }
    }
    window.addEventListener('scroll', function (event) {
        checkSlide();
    });

    if(isMobile()){
        document.getElementById("elpower-box").addEventListener('scroll', function (event) {
            checkSlide();
        });
        return;
    }
*/
    let isDown = false;
    let startX;
    let scrollLeft;
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        cancelMomentumTracking();
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        beginMomentumTracking();
    });
    slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 0.7; 
        var prevScrollLeft = slider.scrollLeft;
        slider.scrollLeft = scrollLeft - walk;
        velX = slider.scrollLeft - prevScrollLeft;
        //checkSlide();
    });
    slider.addEventListener("wheel", function (e) {
        var prevScrollLeft = slider.scrollLeft;
        slider.scrollLeft += e.deltaX;
        velX = slider.scrollLeft - prevScrollLeft;
        //checkSlide();
    });


    var velX = 0;
    var momentumID;
  
    slider.addEventListener('wheel', (e) => {
        cancelMomentumTracking();
    }); 
    var beginMomentumTracking = function(){
        cancelMomentumTracking();
        momentumID = requestAnimationFrame(momentumLoop);
      }
    var cancelMomentumTracking = function(){
        cancelAnimationFrame(momentumID);
    }
    var momentumLoop = function(){
        slider.scrollLeft += velX;
        velX *= 0.95; 
        //checkSlide();
        if (Math.abs(velX) > 0.5){
            momentumID = requestAnimationFrame(momentumLoop);
        }
    }

}
