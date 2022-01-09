import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";
import { Logger } from "concurrently";

const main = document.querySelector("#main");
main.innerHTML = "";

const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === "undefined") {
  loadSpinner();
}

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox("/src-sw.js");
  logger("Service Worker", "GenerateSW Service Worker is ready", workboxSW);
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}

// Check if HMR is enabled, if not, throw error
if (module.hot) {
  module.hot.accept((err) => {
    if (err) {
      console.error("Cannot apply HRM update", err);
    }
  });
}
