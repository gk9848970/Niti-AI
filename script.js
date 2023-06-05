import { getMovies } from "./API.js";

(async () => {
  // Getting data from API
  const apiData = await getMovies();
  const { itemsPerPage, itemsCount, data: movies } = apiData;

  // Getting required DOM Elements
  const loader = document.querySelector(".loader");
  const arrowLeft = document.querySelector(".arrow-left");
  const arrowRight = document.querySelector(".arrow-right");
  const sliderContainer = document.querySelector(".slider-container");
  const slider = document.querySelector(".slider");
  const sliderDotsContainer = document.querySelector(".slider-dots-container");

  // Helper functions for Changing DOM according to API Data
  const createSliderItem = ({ imgSrc }) => {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = "";
    return img;
  };

  const createSliderDot = () => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    return dot;
  };

  const addSliderItems = (movies) => {
    const sliderItems = movies.map((movie) => createSliderItem(movie));
    sliderItems.forEach((el) => slider.appendChild(el));
  };

  const addSliderDots = (itemsPerPage, itemsCount) => {
    const dotCount = Math.ceil(itemsCount / itemsPerPage);
    const sliderDots = Array(dotCount)
      .fill(0)
      .map((el, i) => {
        const dot = createSliderDot();
        if (i === 0) {
          dot.classList.add("active");
        }

        return dot;
      });
    sliderDots.forEach((dot) => sliderDotsContainer.appendChild(dot));
  };

  // Changing DOM according to API Data
  addSliderItems(movies);
  addSliderDots(itemsPerPage, itemsCount);

  document.documentElement.style.setProperty(
    "--slider-items-count",
    itemsPerPage
  );

  setTimeout(() => {
    loader.classList.add("d-none");
    sliderContainer.classList.remove("d-none");
    sliderDotsContainer.classList.remove("d-none");
    sliderDotsContainer.classList.remove("d-none");
  }, 1000);

  // Slider Functionality
  const dots = [...document.querySelectorAll(".dot")];
  let translateIndex = 0;
  const TRANSLATE_INDEX_LIMIT = Math.ceil(itemsCount / itemsPerPage);

  const handleSliding = () => {
    translateSlider(translateIndex);
    disableArrows();
    removeClassFromArray(dots, "active");
    markActiveDot();
  };

  const markActiveDot = () => dots[translateIndex].classList.add("active");

  const disableArrows = () => {
    if (translateIndex === 0) {
      arrowLeft.classList.add("inactive-opacity");
    } else {
      arrowLeft.classList.remove("inactive-opacity");
    }

    if (translateIndex === TRANSLATE_INDEX_LIMIT - 1) {
      arrowRight.classList.add("inactive-opacity");
    } else {
      arrowRight.classList.remove("inactive-opacity");
    }
  };

  const translateSlider = (index) => {
    slider.style.transform = `translateX(-${index}00%)`;
  };

  const removeClassFromArray = (arr, className) => {
    arr.forEach((el) => el.classList.remove(className));
  };

  arrowRight.addEventListener("click", () => {
    if (TRANSLATE_INDEX_LIMIT === translateIndex + 1) return;
    translateIndex++;
    handleSliding();
  });

  arrowLeft.addEventListener("click", () => {
    if (translateIndex === 0) return;
    translateIndex--;
    handleSliding();
  });

  sliderDotsContainer.addEventListener("click", (e) => {
    if (!e.target.matches(".dot")) return;
    const targetDot = e.target;
    translateIndex = dots.findIndex((dot) => dot === targetDot);
    handleSliding();
  });
})();
