import * as met from './search.js';

let image_pre = met.default[1];
let panel_anim = false,
     anim_task;
let image_pre_b = image_pre.children[0];
let l_tags = document.getElementsByClassName("LA");
let about_b = document.getElementsByClassName("abp")[0];
let close_b = document.getElementsByClassName("close")[0];
let close_b2 = document.getElementsByClassName("close2")[0];
let up_panel_b = document.getElementsByClassName('up-panel')[0];
let l_arrow_b = document.getElementsByClassName('left_arrow')[0];
let r_arrow_b = document.getElementsByClassName('right_arrow')[0];

// Remove all the child nodes
let removeAllChildNodes = (parent) => {
     while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
     }
     return;
}

// Search for the image
var search_for_img = (index) => {
     let parent = met.default[0].children[1].children[0];
     let kids = parent.children;
     let kids_l = parent.children.length;
     for (let I = 0; I < kids_l; I++) {
          let id = kids[I].getAttribute('data-id');
          if (id == index) {
               return [kids[I].children[0].children[0]];
          }
     }
     return null;
}

// Left arrow change image
l_arrow_b.addEventListener('click', () => {
     let index = image_pre_b.children[1].getAttribute("data-index");
     ///////////////////////////////////////////////////////////////
     if (index <= 0) {
          return;
     }
     let prev_img = search_for_img((index - 1));
     ///////////////////////////////////////////
     if (prev_img == null) {
          return;
     }
     prev_img = prev_img[0];
     ///////////////////////
     image_pre_b.children[1].setAttribute("data-index", (index - 1));
     image_pre_b.children[1].setAttribute("src", prev_img.getAttribute('src'));
     return;
});

// Right arrow change image
r_arrow_b.addEventListener('click', () => {
     let index = image_pre_b.children[1].getAttribute("data-index");
     let prev_img = search_for_img(Number(index) + 1);
     /////////////////////////////////////////////////
     if (prev_img == null) {
          return;
     }
     prev_img = prev_img[0];
     ///////////////////////
     image_pre_b.children[1].setAttribute("data-index", Number(index) + 1);
     image_pre_b.children[1].setAttribute("src", prev_img.getAttribute('src'));
     return;
});

// Add the mouse move to the image preview
image_pre_b.children[1].addEventListener('mousemove', (e) => {
     let index = image_pre_b.children[1].getAttribute('data-index');
     let parent = met.default[0].children[1].children[0];
     let kids_l = parent.children.length;
     ////////////////////////////////////
     if (e.layerX <= 50) {
          if (index <= 0) {
               return;
          }
          l_arrow_b.classList.add('arrowl_show');
          l_arrow_b.classList.remove('arrowl_hide');
          return;
     } else if (e.layerX >= (e.target.width - 50)) {
          if (index >= kids_l - 1) {
               return;
          }
          r_arrow_b.classList.add('arrowr_show');
          r_arrow_b.classList.remove('arrowr_hide');
          return;
     } else {
          if (l_arrow_b.classList.contains('arrowl_show')) {
               l_arrow_b.classList.add('arrowl_hide');
               l_arrow_b.classList.remove('arrowl_show');
          }
          if (r_arrow_b.classList.contains('arrowr_show')) {
               r_arrow_b.classList.add('arrowr_hide');
               r_arrow_b.classList.remove('arrowr_show');
          }
          return;
     }
     return;
});

// ON CLICK BUTTON ABOUT BOX
about_b.addEventListener('click', () => {
     close_b2.parentElement.parentElement.style.display = "flex";
     return;
});

// ON CLICK CLOSE BUTTON
close_b.addEventListener('click', () => {
     met.default[1].style.display = "none";
     l_arrow_b.classList.remove('arrowl_hide');
     l_arrow_b.classList.remove('arrowl_show');
     r_arrow_b.classList.remove('arrowr_hide');
     r_arrow_b.classList.remove('arrowr_show');
     return;
});

// ON CLICK CLOSE BUTTON2
close_b2.addEventListener('click', () => {
     close_b2.parentElement.parentElement.style.display = "none";
     return;
});

// ON CLICK UP PANEL BUTTON
up_panel_b.addEventListener('click', () => {
     if (panel_anim) {
          return;
     }
     panel_anim = true;
     clearTimeout(anim_task);
     met.default[0].classList.add("results_popup");
     removeAllChildNodes(met.default[0].children[1].children[0]);
     setTimeout(() => {
          panel_anim = false;
          ///////////////////
          met.default[0].classList.remove("results_popup");
          met.default[0].classList.remove("results_popdown");
     }, 650);
     return;
});

l_tags[0].addEventListener('click', () => {
     if (met.default[2] == "EN") {
          return;
     }
     change_lang(l_tags[0]);
     return;
});
l_tags[1].addEventListener('click', () => {
     if (met.default[2] == "RO") {
          return;
     }
     change_lang(l_tags[1]);
     return;
});

// Change the language
let change_lang = (par) => {
     let i = par;
     let l = i.getAttribute("data-lang");
     ////////////////////////////////////
     if (l == "en") {
          window.location.href = "index-en.html";
     } else {
          window.location.href = "index.html";
     }
     return;
}

// Create the box image
export var create_box_img = (hits) => {
     if (hits === null) {
          return;
     }
     var I = 0;
     var next = true;
     ////////////////
     anim_task = setInterval(() => {
          if (!next) {
               return;
          }
          if (I >= hits.length) {
               I = 0;
               clearInterval(anim_task);
               return;
          }
          next = false;
          let f = hits[I];
          ////////////////
          var name = f.pageURL.split("/"),
               h = document.createElement("div"),
               p = document.createElement("li"),
               e = document.createElement("img"),
               exp = document.createElement("div"),
               box = document.createElement("div"),
               saver = document.createElement("div"),
               saver_a = document.createElement("a"),
               box_s = document.createElement("label"),
               box_t = document.createElement("label"),
               tooltip_1 = document.createElement("span"),
               tooltip_2 = document.createElement("span");
          ///////////////////////////////////////////
          fetch(f.largeImageURL).then((res) => {
               return res.blob();
          }).then((res) => {
               return window.URL.createObjectURL(res);
          }).then((data) => {
               saver_a.href = data;
               saver_a.setAttribute("download", "");
               /////////////////////////////////////
               saver_a.addEventListener('click', () => {
                    box.classList.add("box-anim");
                    setTimeout(() => {
                         box.classList.remove("box-anim");
                    }, 2200);
                    return;
               });
               p.classList.add("item");
               e.classList.add("result");
               h.classList.add("holder");
               box.classList.add("box");
               exp.classList.add("expand");
               exp.innerHTML = "&#x26F6;"
               saver.classList.add("saver");
               saver.appendChild(saver_a);
               let msg = "Mareste imaginea";
               let msg2 = "Salveaza imaginea";
               let msg3 = "Imagine salvata";
               if (met.default[2] == "EN") {
                    msg = "Expand the image";
                    msg2 = "Save the image";
                    msg3 = "Picture saved";
               }
               tooltip_1.innerHTML = msg;
               tooltip_1.classList.add("tooltip");
               exp.appendChild(tooltip_1);
               exp.setAttribute("title", msg);
               tooltip_2.innerHTML = msg2;
               tooltip_2.classList.add("tooltip");
               saver.appendChild(tooltip_2);
               saver.setAttribute("title", msg2);
               exp.addEventListener('click', () => {
                    image_pre.style.display = "flex";
                    image_pre_b.children[1].setAttribute("src", f.largeImageURL);
                    image_pre_b.children[1].setAttribute("data-index", p.getAttribute('data-id'));
                    return;
               });
               h.appendChild(e);
               p.appendChild(h);
               p.appendChild(exp);
               p.appendChild(box);
               p.appendChild(saver);
               box_s.innerHTML = "🗸";
               box_s.setAttribute("id", "symbol");
               box_t.innerHTML = msg3;
               box_t.setAttribute("id", "text");
               box.appendChild(box_s);
               box.appendChild(box_t);
               p.setAttribute("data-id", I);
               e.setAttribute("src", f.largeImageURL);
               document.getElementsByClassName("content3")[0].appendChild(p);
               //////////////////////////////////////////////////////////////
               I++;
               next = true;
               return;
          });
     }, 1000);
     return;
}