// const slides = document.querySelectorAll(".slide");
// const prevBtn = document.querySelector(".prevBtn");
// const nextBtn = document.querySelector(".nextBtn");

// slides.forEach(function (slide, index) {
//   slide.style.left = `${index * 100}%`;
// });

// let counter = 0;

// nextBtn.addEventListener("click", function () {
//   counter++;
//   carousel();
// });

// prevBtn.addEventListener("click", function () {
//   counter--;
//   carousel();
// });

// function carousel() {
//   // working with slides

//   if (counter == slides.length) {
//     counter = 0;
//   }

//   if (counter < 0) {
//     counter = slides.length - 1;
//   }

//   slides.forEach(function (slide) {
//     slide.style.transform = `translateX(-${counter * 100}%)`;
//   });
// }

let slides = Array.from(document.querySelectorAll(".slide"));
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const container = slides[0].parentElement;

// create clones of first and last and then add them

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.dataset.clone = "first";
lastClone.dataset.clone = "last";

container.appendChild(firstClone);
container.insertBefore(lastClone, container.firstChild);

// re-query slides to include clones

slides = Array.from(document.querySelectorAll(".slide"));

slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});

let counter = 1;

// apply transform; if animate=false, snap instantly
function applyTransforms(animate = true) {
  if (!animate) {
    slides.forEach((s) => (s.style.transition = "none"));
  } else {
    slides.forEach((s) => (s.style.transition = "all 0.25s ease-in-out"));
  }

  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });

  if (!animate) {
    // force reflow and restore transitions
    slides[0].getBoundingClientRect();
    slides.forEach((s) => (s.style.transition = "all 0.25s ease-in-out"));
  }
}

applyTransforms(false);

// buttons working

nextBtn.addEventListener("click", function () {
  counter++;
  applyTransforms(true);
});

prevBtn.addEventListener("click", function () {
  counter--;
  applyTransforms(true);
});

// when any slide finishes its transform transition, check for clones and snap

slides.forEach((slide) => {
  slide.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;

    if (slides[counter] && slides[counter].dataset.clone === "first") {
      // jumped to appended firstClone -> snap to real first slide (1)
      counter = 1;
      applyTransforms(false);
    } else if (slides[counter] && slides[counter].dataset.clone === "last") {
      // jumped to prepended lastClone -> snap to real last slide (length-2)
      counter = slides.length - 2;
      applyTransforms(false);
    }
  });
});
