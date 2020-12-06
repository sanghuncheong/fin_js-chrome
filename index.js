const title = document.querySelector("#title");

const CLICKED_CLASS = "clicked";

// function handleClick() {
//   //   const currentClass = title.className;
//   //   if (currentClass !== CLICKED_CLASS) {
//   const hasClass = title.classList.contains(CLICKED_CLASS);
//   if (hasClass) {
//     // title.className = CLICKED_CLASS;
//     title.classList.remove(CLICKED_CLASS);
//   } else {
//     // title.className = "";
//     title.classList.add(CLICKED_CLASS);
//   }
// }

function handleClick() {
  title.classList.toggle(CLICKED_CLASS);
}

function init() {
  title.addEventListener("click", handleClick);
}
init();
