
let elem_loader = document.getElementById("loader");
let elem_load = document.getElementById("load");
let elem_log = document.getElementById("log");
let elem_animacao = document.getElementById("animacao");
console.log("Testing... Ok");


setTimeout(function() {
  elem_loader.classList.remove("loader");
  elem_load.classList.remove("load");
  elem_log.classList.remove("log");
  elem_animacao.classList.remove("animacao");
  }, 1580);

  setTimeout(function() {
    elem_loader.style.display = "none"; // esconde completamente o loader
  }, 1580);