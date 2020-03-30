const cards = document.querySelector(".cards");
cards.addEventListener("click", () => {
  cards.appendChild(cards.firstElementChild);
  cards.lastElementChild.className = "animate";
  cards.children[2].className = "";
});
