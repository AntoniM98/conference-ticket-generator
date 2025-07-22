import { nameInput, emailInput, githubInput } from "./form.js";
import { imgPreview } from "./uploadFile.js";

export const renderTicket = () => {
  const formPage = document.querySelector('.form-page');
  const ticketPage = document.querySelector('.ticket-page');
  window.scrollTo(0, 0);
  formPage.hidden = true;
  ticketPage.hidden = false;
  
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const githubValue = githubInput.value.trim();

  ticketPage.innerHTML = `
    <section class="introduction">
      <h1 class="title">Congrats, <span class="full-name">${nameValue}</span>! Your ticket is ready.</h1>
      <p class="ticket-confirmation">We've emailed your ticket to <span class="email-address">${emailValue}</span> and will send updates in the run up to the event.</p>
    </section>

    <article class="ticket">
      <img class="ticket-body" src="./assets/images/pattern-ticket.svg">
      <div class="ticket-top">
        <img src="./assets/images/logo-mark.svg">
        <div class="ticket-top-text">
          <h2>Coding Conf</h2>
          <p class="ticket-date-city">${getCurrentDate()} Austin, TX</p>
        </div>
      </div>
      <div class="ticket-bottom">
        <div class="ticket-avatar">
          <img src="${imgPreview.src}">
        </div>
        <div>
          <p>${nameValue}</p>
          <div class="ticket-github">
            <img src="./assets/images/icon-github.svg">
            <p>${githubValue}</p>
          </div>
        </div>
      </div>
      <p class="ticket-number">#01609</p>
    </article>
  `;
}

const getCurrentDate = () => {
  const today = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const month = months[today.getMonth()];
  const day = today.getDate();
  const year = today.getFullYear();

  return `${month} ${day}, ${year}`;
}