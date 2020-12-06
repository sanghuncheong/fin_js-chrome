const body = document.querySelector("body");

const IMG_NUMBER = 3;

function handleImgLoad() {
  console.log("finished loading");
}

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom(max_num) {
  const number = Math.floor(Math.random() * (max_num + 1));
  return number;
}

function init() {
  const randomNumber = genRandom(2);
  paintImage(randomNumber);
}
init();
