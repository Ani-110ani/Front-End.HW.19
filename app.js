import { results } from "./data.js";

const img = document.createElement("img");
img.src =
  "https://fastly.picsum.photos/id/534/1000/800.jpg?hmac=tFbU1nZ2RnQNroI_ToBhH-LFB8KNjyWoc3bVv5G9Wkw";
document.body.appendChild(img);

const flightList = document.getElementById("flight-list");

const cardsHtml = results
  .map((item) => {
    const isDirect = item.content.flightRoutes?.directFlightsAvailable
      ? "Direct"
      : "Indirect";
    const price = item.content.flightQuotes?.cheapest?.price || "N/A";

    return `
        <div class="card">
            <img src="${item.content.image.url}" alt="${item.content.location.name}">
            <div class="card-info">
                <span>${item.content.location.name}</span>
                <span class="flight-details" style="display: none;">${isDirect},${price}</span>
            </div>
            <div class="buttons">
                <button class="see-more">See more details</button>
                <button class="remove-card">Remove Flight</button>
            </div>
        </div>
    `;
  })
  .join("");

flightList.innerHTML = cardsHtml;

const seeMoreBtns = document.querySelectorAll(".see-more");
const removeBtns = document.querySelectorAll(".remove-card");

seeMoreBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const details = card.querySelector(".flight-details");

    if (details.style.display === "none") {
      details.style.display = "block";
    } else {
      details.style.display = "none";
    }
  });
});

removeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.closest(".card").remove();
  });
});
