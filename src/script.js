import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

function initSlider() {

  const totalSlides = 7;
  let currentSlide = 1;
  let isAnimating = false;
  let scrollAllowed = true;
  let lastScrollTime = 0;
  let isInDetails = false;

  const slider = document.querySelector(".slider");
  const skipButton = document.querySelector(".skip-to-details");

  skipButton.addEventListener("click", () => {
    goToDetailsSection();
  });

  const slideTitles = [
    "Field unit",
    "Astral convergence",
    "Eclipse Core",
    "Luminous",
    "Serenity",
    "Nebula",
    "Horizon",
  ];

  const slideDescriptions = [
    "Concept Art",
    "Soundscape",
    "Experimental film",
    "Editorial",
    "Music video",
    "CGS",
    "Set design",
  ];

  function createSlide(slideNumber, direction) {
    const slide = document.createElement("div");
    slide.className = "slide";

    const slideBgImg = document.createElement("div");
    slideBgImg.className = "slide-bg-img";

    const img = document.createElement("img");
    img.src = `./img${slideNumber}.png`;

    slideBgImg.appendChild(img);
    slide.appendChild(slideBgImg);

    slideBgImg.style.clipPath =
      direction === "down"
        ? "polygon(0% 100%,100% 100%,100% 100%,0% 100%)"
        : "polygon(0% 0%,100% 0%,100% 0%,0% 0%)";

    return slide;
  }

  function createMainImageWrapper(slideNumber, direction) {
    const wrapper = document.createElement("div");
    wrapper.className = "slide-main-img-wrapper";

    const img = document.createElement("img");
    img.src = `./img${slideNumber}.png`;

    wrapper.appendChild(img);

    wrapper.style.clipPath =
      direction === "down"
        ? "polygon(0% 0%,100% 0%,100% 0%,0% 0%)"
        : "polygon(0% 100%,100% 100%,100% 100%,0% 100%)";

    return wrapper;
  }

  function createTextElements(slideNumber, direction) {
    const newTitle = document.createElement("h1");
    newTitle.textContent = slideTitles[slideNumber - 1];
    gsap.set(newTitle, { y: direction === "down" ? 50 : -50 });

    const newDescription = document.createElement("p");
    newDescription.textContent = slideDescriptions[slideNumber - 1];
    gsap.set(newDescription, { y: direction === "down" ? 20 : -20 });

    const newCounter = document.createElement("p");
    newCounter.textContent = slideNumber;
    gsap.set(newCounter, { y: direction === "down" ? 18 : -18 });

    return { newTitle, newDescription, newCounter };
  }

  function goToDetailsSection() {
    if (isAnimating) return;

    isAnimating = true;
    isInDetails = true;

    gsap.to(slider, {
      y: "-100vh",
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: () => {
        isAnimating = false;
      }
    });
  }

  function returnFromDetails() {
    if (isAnimating) return;

    isAnimating = true;
    isInDetails = false;

    gsap.to(slider, {
      y: "0vh",
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: () => {
        isAnimating = false;
      }
    });
  }

  function animateSlide(direction) {

    if (isAnimating || !scrollAllowed) return;

    if (isInDetails) {
      if (direction === "up") {
        returnFromDetails();
      }
      return;
    }

    if (direction === "down" && currentSlide === totalSlides) {
      window.location.href = "/home";
      return;
    }

    if (direction === "up" && currentSlide === 1) {
      return;
    }

    isAnimating = true;
    scrollAllowed = false;

    const currentSlideElement = slider.querySelector(".slide");
    const mainImageContainer = document.querySelector(".slide-main-img");
    const currentMainWrapper = mainImageContainer.querySelector(".slide-main-img-wrapper");

    const titleContainer = document.querySelector(".slide-title");
    const descriptionContainer = document.querySelector(".slide-description");
    const counterContainer = document.querySelector(".slide-counter");

    const currentTitle = titleContainer.querySelector("h1");
    const currentDescription = descriptionContainer.querySelector("p");
    const currentCounter = counterContainer.querySelector("p");

    currentSlide = direction === "down"
      ? currentSlide + 1
      : currentSlide - 1;

    const newSlide = createSlide(currentSlide, direction);
    const newMainWrapper = createMainImageWrapper(currentSlide, direction);
    const { newTitle, newDescription, newCounter } =
      createTextElements(currentSlide, direction);

    slider.appendChild(newSlide);
    mainImageContainer.appendChild(newMainWrapper);
    titleContainer.appendChild(newTitle);
    descriptionContainer.appendChild(newDescription);
    counterContainer.appendChild(newCounter);

    gsap.set(newMainWrapper.querySelector("img"), {
      y: direction === "down" ? "-50%" : "50%",
    });

    const ease = CustomEase.create("custom", ".87,0,.13,1");

    const tl = gsap.timeline({
      onComplete: () => {
        [
          currentSlideElement,
          currentMainWrapper,
          currentTitle,
          currentDescription,
          currentCounter,
        ].forEach(el => el?.remove());

        isAnimating = false;

        setTimeout(() => {
          scrollAllowed = true;
          lastScrollTime = Date.now();
        }, 100);
      },
    });

    tl.to(newSlide.querySelector(".slide-bg-img"), {
      clipPath:
        direction === "down"
          ? "polygon(0% 100%,100% 100%,100% 0%,0% 0%)"
          : "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
      duration: 1.25,
      ease,
    }, 0)
    .to(currentSlideElement.querySelector("img"), {
      scale: 1.5,
      duration: 1.25,
      ease,
    }, 0)
    .to(newMainWrapper, {
      clipPath:
        direction === "down"
          ? "polygon(0% 0%,100% 0%,100% 100%,0% 100%)"
          : "polygon(0% 100%,100% 100%,100% 0%,0% 0%)",
      duration: 1.25,
      ease,
    }, 0)
    .to(currentMainWrapper.querySelector("img"), {
      y: direction === "down" ? "50%" : "-50%",
      duration: 1.25,
      ease,
    }, 0)
    .to(newMainWrapper.querySelector("img"), {
      y: "0%",
      duration: 1.25,
      ease,
    }, 0)
    .to(currentTitle, {
      y: direction === "down" ? -50 : 50,
      duration: 1.25,
      ease,
    }, 0)
    .to(newTitle, { y: 0, duration: 1.25, ease }, 0)
    .to(currentDescription, {
      y: direction === "down" ? -20 : 20,
      duration: 1.25,
      ease,
    }, 0)
    .to(newDescription, { y: 0, duration: 1.25, ease }, 0)
    .to(currentCounter, {
      y: direction === "down" ? -18 : 18,
      duration: 1.25,
      ease,
    }, 0)
    .to(newCounter, { y: 0, duration: 1.25, ease }, 0);
  }

  function handleScroll(direction) {
    const now = Date.now();
    if (now - lastScrollTime < 900) return;
    lastScrollTime = now;
    animateSlide(direction);
  }

  window.addEventListener("wheel", (e) => {
    e.preventDefault();
    handleScroll(e.deltaY > 0 ? "down" : "up");
  }, { passive: false });

  window.addEventListener("wheel", (e) => {
    e.preventDefault();
    handleScroll(e.deltaY > 0 ? "down" : "up");
  }, { passive: false });

}

initSlider();