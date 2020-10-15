// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Options info
// @author       jruz
// @match        https://standard.tradezeroweb.co/
// @downloadURL  https://f1b225c8f47f.eu.ngrok.io/tampermonkey.js
// @updateURL    https://f1b225c8f47f.eu.ngrok.io/tampermonkey.js
// @grant        none
// ==/UserScript==

const SCRIPT_URL = 'https://f1b225c8f47f.eu.ngrok.io/tampermonkey.js';

const addScript = (url) => {
  const s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('charset', 'UTF-8');
  s.setAttribute('crossorigin', true);
  s.setAttribute('src', url);
  document.head.appendChild(s);
};

(() => {
  addScript(SCRIPT_URL);
})();
