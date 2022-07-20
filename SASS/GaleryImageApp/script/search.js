import * as met from './main.js';

let lang = "RO";
var box_interval, box_anim = false;
let results_panel = document.getElementsByClassName("results")[0]
, search_bar = document.getElementsByClassName("field")[0]
,search_button = document.getElementsByClassName("cautare")[0]
,error_box = document.getElementsByClassName("error_box")[0]
, success_box = document.getElementsByClassName("success_box")[0],
image_pre = document.getElementsByClassName("image_preview")[0];
////////////////////////////////////////////////////////////////

// Define lang
let define_lang = () => {
     if (window.location.href.endsWith("index-en.html")) {
          lang = "EN";
     }
     return;
}
define_lang();
search_button.addEventListener('click', () => {
     if (box_anim) {
          return;
     }
     let s_v = search_bar.value;
     ///////////////////////////
     if (s_v === null || s_v === "") {
          let msg = "Trebuie sa introduceti un cuvant inainte de a cauta";
          if (lang == "EN") {
               msg = "You must enter a word before you wish to search";
          }
          animate_res_box(0, msg);
          return;
     }
     search_method(s_v);
     return;
});

search_bar.addEventListener('keypress', (e) => {
     if (e.key != "Enter") {
          return;
     }
     if (box_anim) {
          return;
     }
     let s_v = search_bar.value;
     ///////////////////////////
     if (s_v === null || s_v === "") {
          let msg = "Trebuie sa introduceti un cuvant inainte de a cauta";
          if (lang == "EN") {
               msg = "You must enter a word before you wish to search";
          }
          animate_res_box(0, msg);
          return;
     }
     search_method(s_v);
     return;
});

// Animate the respond box
let animate_res_box = (I, MSG) => {
     if (box_anim || MSG == "") {
          return;
     }
     box_anim = true;
     ////////////////
     if (I == 0) {
          let text_c = error_box.children[1];
          ///////////////////////////////////
          text_c.innerHTML = MSG;
          error_box.classList.add("animate_popup_up");
          box_interval = setTimeout(() => {
               error_box.classList.add("animate_popup_down");
               setTimeout(() => {
                    box_anim = false;
                    /////////////////
                    error_box.classList.remove("animate_popup_up");
                    error_box.classList.remove("animate_popup_down");
               }, 1500);
          }, 4000);
     } else {
          let text_c = success_box.children[1];
          ///////////////////////////////////
          text_c.innerHTML = MSG;
          success_box.classList.add("animate_popup_up");
          box_interval = setTimeout(() => {
               success_box.classList.add("animate_popup_down");
               setTimeout(() => {
                    box_anim = false;
                    /////////////////
                    success_box.classList.remove("animate_popup_up");
                    success_box.classList.remove("animate_popup_down");
               }, 1500);
          }, 4000);
     }
     return;
}

// Search method
let search_method = (value) => {
     let nl = value.replace(" ", "+");
     let ti = document.getElementsByClassName("title2")[0];
     //////////////////////////////////////////////////////
     fetch("https://pixabay.com/api/?key=21500646-a2add58b53fc3282b9c163521&q=" + nl + "&image_type=all&page=1&pretty=true&per_page=60&safesearch=true")
          .then(response => {
               return response.json();
          })
          .then(res => {
               let hits = res.hits;
               ////////////////////
               if (hits <= 0) {
                    let msg = "Nu s-au gasit nici un rezultat pentru cuvantul: " + value;
                    if (lang == "EN") {
                         msg = "No results found for the word: " + value;
                    }
                    animate_res_box(0, msg);
                    return;
               }
               let msg = "S-au gasit " + hits.length + " rezultate pentru cuvantul: " + value;
               if (lang == "EN") {
                   msg = "Found " + hits.length + " results for the word: " + value;
               }
               ti.innerHTML = msg;
               animate_res_box(1, msg);
               results_panel.classList.add("results_popdown");
               ///////////////////////////////////////////////
               setTimeout(() => {
                    met.create_box_img(hits);
               }, 800);
               return;
     }).catch(err => {
          animate_res_box(0, err);
          return;
     });
     return;
}

export default [ results_panel, image_pre, lang ];