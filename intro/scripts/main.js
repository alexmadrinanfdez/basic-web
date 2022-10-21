const title = document.querySelector('h1');

title.addEventListener('click', () => {
    alert("Ouch! Stop poking me!");
    title.textContent = 'Hello, world!'
});

const image = document.querySelector("img");

image.onclick = () => {
  const source = image.getAttribute("src");
  if (source === "images/www-color.png") {
    image.setAttribute("src", "images/www-b&w.png");
  } else {
    image.setAttribute("src", "images/www-color.png");
  }
};
