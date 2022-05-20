import './style.css'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
/* GSAP REGISTER PLUGINS*/
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
/* SCROLL BEHAVIOUR*/
window.scroll({
  behavior: 'smooth'
});
/* SLIDER ANIMATION*/
const SLIDER_LENGTH = 3;
const SLIDER_DURATION = 5000; // 5s

let currentSlider = 0;
// SHOW FIRST SLIDE
document.querySelector('.slider').classList.add('slider-opacity');

function animateSlider()
{
  document.querySelectorAll('.slider').forEach((element, index) => {
    if (index === currentSlider)
    {
      element.classList.add('slider-opacity');
    }
    else
    {
      element.classList.remove('slider-opacity');
    }
  });
}
function animatSliderInterval()
{
  currentSlider = (currentSlider + 1) % SLIDER_LENGTH;
  animateSlider();
}

let interval = setInterval(()=>{
  animatSliderInterval();
}, SLIDER_DURATION);

document.querySelector('.left-arrow').addEventListener('click', ()=>{
  clearInterval(interval);
  currentSlider = (currentSlider - 1);
  if (currentSlider < 0)
      currentSlider = 2;
  animateSlider();
  interval = setInterval(()=>{
    animatSliderInterval();
  }, SLIDER_DURATION);
})

document.querySelector('.right-arrow').addEventListener('click', ()=>{
  clearInterval(interval);
  animatSliderInterval();
  interval = setInterval(()=>{
    animatSliderInterval();
  }, SLIDER_DURATION);
})

/* FEEDBACK ANIMATION */
const FEEDBACK_LENGTH = 2;
const FEEDBACK_DURATION = 5000; // 5s

let currentFeedback = 0;

// SHOW FIRST FEEDBACK 
document.querySelector('.feedback').classList.add('feedback-opacity')
function animateFeedback()
{
  currentFeedback = (currentFeedback + 1) % FEEDBACK_LENGTH;
  document.querySelectorAll('.feedback').forEach((element, index) => {
    if (index === currentFeedback)
    {
      element.classList.add('feedback-opacity');
    }
    else 
    {
      element.classList.remove('feedback-opacity');
    }
  })
  
}

setInterval(()=>{
  animateFeedback();
}, FEEDBACK_DURATION);



/* POP UP ANIMATION */

const IMAGE_LENGTH = 7;
const WAIT_DURATION = 2000; // 2s
let currentImageIndex = 0;

function addOrRemoveClass(element, condition, className)
{
  if (condition)
  {
    element.classList.add(className);
  }
  else
  {
    element.classList.remove(className);
  }
}

function animateGallery()
{
  document.querySelectorAll('.main-image > img').forEach((element, index)=> {
    addOrRemoveClass(element, !!(currentImageIndex === index), 'show-image');
  });
  document.querySelectorAll('.item-wrapper').forEach((element, index)=>{
    addOrRemoveClass(element, currentImageIndex === index, 'selected-item');
  });
  addOrRemoveClass(document.querySelector('.item-right-arrow'), currentImageIndex === IMAGE_LENGTH - 1, 'disable-arrow');
  addOrRemoveClass(document.querySelector('.item-left-arrow'), currentImageIndex === 0, 'disable-arrow');
}

document.querySelector('.item-right-arrow').addEventListener('click', ()=>{
  currentImageIndex = (currentImageIndex + 1) % IMAGE_LENGTH;
  animateGallery();
});

document.querySelector('.main-image').addEventListener('click', (e)=>{
  if (e.target.tagName === 'IMG')
  {
    currentImageIndex = (currentImageIndex + 1) % IMAGE_LENGTH;
    animateGallery();
  }
});

document.querySelector('.item-left-arrow').addEventListener('click', ()=>{
  currentImageIndex = (currentImageIndex - 1);
  animateGallery();
});

document.querySelectorAll('.item-wrapper').forEach((element, index) => {
  element.addEventListener('click', ()=>{
    currentImageIndex = index;
    animateGallery();
  })
});

function enablePopUp()
{
  setTimeout(()=>{
    document.querySelector('.loader').classList.add('disable-loader');
    animateGallery();
  }, WAIT_DURATION);

  document.querySelector('.popup-screen').classList.add('enable-popup');
  document.body.style.overflow = 'hidden';
}

function disablePopUp()
{
  document.querySelector('.popup-screen').classList.remove('enable-popup');
  document.body.style.overflow = 'auto';
  document.querySelector('.loader').classList.remove('disable-loader');
  document.querySelectorAll('.main-image > img').forEach((element, index)=> {
    element.classList.remove('show-image');
  });
}

document.querySelectorAll('.portfolio-element-link').forEach((element, index)=>{
  element.addEventListener('click',  (e)=>{
    e.preventDefault();
    currentImageIndex = index;
    enablePopUp();
  })
});

document.querySelector('.item-close-icon').addEventListener('click', ()=>{
  disablePopUp();
});

/* MENU MOBILE ANIMATION */

function closeMobileMenu()
{
  document.body.style.overflow = 'auto';
  document.querySelector('.mobile-menu').classList.remove('show-mobile-menu');
}

document.querySelector('.menu-icon').addEventListener('click', ()=>{
  document.body.style.overflow = 'hidden';
  document.querySelector('.mobile-menu').classList.add('show-mobile-menu');
});

document.querySelector('.close-mobile-menu-icon').addEventListener('click', ()=>{
  closeMobileMenu();
});


/* GSAP ANIMATION */
gsap.utils.toArray('.headers').forEach(element =>{
  gsap.to(gsap.utils.selector(element)('span'), {
    scrollTrigger: {
      trigger: element,
      scrub: 1,
      start: 'center center',
      end: 'bottom bottom'
    },
    translateY: '0%',
  })
})

gsap.utils.toArray('.subheaders').forEach(element =>{
  gsap.to(gsap.utils.selector(element)('span'), {
    scrollTrigger: {
      trigger: element,
      scrub: true,
      end: 'center center',
    },
    translateX: '0%',
  })
})

const SERVICE_ANIMATION_GAP = 40;
gsap.utils.toArray('.service').forEach((element, index)=>{
  gsap.to(element, {
    scrollTrigger: {
      trigger: '.service-listing',
      scrub: true,
      end: `${50 + (index + 1) * SERVICE_ANIMATION_GAP}% ${50 + (index + 1) * SERVICE_ANIMATION_GAP}%`,
    },
    translateY: '0%',

  })
})





gsap.utils.toArray('.element-right').forEach(element =>{
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      end: 'bottom bottom',
      scrub: true,
    },
    translateX: '0%',
  })

});

gsap.utils.toArray('.element-left').forEach((element) =>{
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      end: 'bottom bottom',
      scrub: true,
    },
    translateX: '0%',
  })
})

/* GOTO CERTAIN SECTION */

document.querySelectorAll('.mobile-element').forEach(element=>{
  element.addEventListener('click', ()=>{
    closeMobileMenu();
    if (element.dataset.id === 'HOME')
    {
      window.scrollTo(0, 0);
    }
    else
    {
      gsap.to(window, { scrollTo: `#${element.dataset.id}`});
    }
  })
})


document.querySelectorAll('.footer-nav-element').forEach(element=>{
  element.addEventListener('click', ()=>{
    if (element.dataset.id === 'HOME')
    {
      window.scrollTo(0, 0);
    }
    else
    {
      gsap.to(window, { scrollTo: `#${element.dataset.id}`});
    }
  })
})