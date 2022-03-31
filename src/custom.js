// import './style.css'
// import * as THREE from 'three'
// import * as dat from 'lil-gui'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import gsap from 'gsap'
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";



// //Fonction de configuration d'une scene
// function creerScene(elem) {
    
//     const scene = new THREE.Scene();

//     const fov = 45; 
//     const aspect = 2; //Canvas par défaut
//     const near = 0.1; 
//     const distance = 5;
//     const camera = new THREE.PerspectiveCamera(fov, aspect, near, distance);
//     camera.position.z = 2;
//     camera.position.set(0, 1, 2);
//     camera.lookAt(0, 0, 0);
//     {
//         const color = 0xffffff; 
//         const intensite = 1;
//         // const lumiere = new THREE.DirectionalLight(color,intensite);
//         lumiere.position.set(-1, 2, 4);
//         scene.add(light);
//     }
//     return {scene, camera, elem};
// }

// function setupScene1() {
//     const sceneInfo = makeScene(document.querySelector('#scene2'));
//     const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
//     const material = new THREE.MeshPhongMaterial({color: 'red'});
//     const mesh = new THREE.Mesh(geometry, material);
//     sceneInfo.scene.add(mesh);
//     sceneInfo.mesh = mesh;
//     return sceneInfo;
//   }

var curseur = document.getElementById('curseur');
  
window.addEventListener('mousemove', cursor )
  function cursor(e) {
    curseur.style.left = e.pageX  + "px"
    curseur.style.top = e.pageY + "px"
  }
    
// Modifier la souris au survol d'un élément cliquable


// function modCurseur() 
// {
//   var curseur = document.getElementById('curseur');
//     curseur.className += " survol";
// }



//Afficher et dissimuler section galerie

//  draggable galerie d'image 
let draggableSlider = function () {
  // DOM element(s)
  let slider = document.querySelector(".slider"),
    innerSlider = document.querySelector(".slider-inner");

  // Slider variables
  let pressed = false,
    startX,
    x;

  // Mousedown eventlistener
  slider.addEventListener("mousedown", (e) => {
    pressed = true;
    startX = e.offsetX - innerSlider.offsetLeft;
    slider.style.cursor = "grabbing";
  });

  // mouseneter
  slider.addEventListener("mouseenter", () => {
    slider.style.cursor = "grab";
  });

  // mouseup
  slider.addEventListener("mouseup", () => {
    slider.style.cursor = "grab";
  });

  // window
  window.addEventListener("mouseup", () => {
    pressed = false;
  });

  // Slider mousemove event listener
  slider.addEventListener("mousemove", (e) => {
    if (!pressed) return;
    e.preventDefault();

    x = e.offsetX;

    innerSlider.style.left = `${x - startX}px`;

    checkBoundry();
  });

  // Check boundry of outer and inner sliders
  function checkBoundry() {
    let outer = slider.getBoundingClientRect(),
      inner = innerSlider.getBoundingClientRect();

    if (parseInt(innerSlider.style.left) > 0) {
      innerSlider.style.left = "0px";
    } else if (inner.right < outer.right) {
      innerSlider.style.left = `-${inner.width - outer.width}px`;
    }
  }
};

// Invoke code
draggableSlider();



// Cacher

// let ongletDev = document.getElementsByClassName('devonglet')

// let sectionMotion = document.querySelector(".slider.motion")
// let sectionDev = document.querySelector(".slider.dev")

// let selection = document.querySelector("li.ss-menu")
// let selectMotion = document.querySelector(".ss-menu.ongletmotion")


// function modeActif() {
//   selectMotion.classList.add("actif")
// }

let selectDev = document.querySelector(".ss-menu.ongletdev")
  function modeDev() {
      selectDev.classList.add("actif")
    }

    // Page loader 

    const loader = document.querySelector('.loader-page')

window.addEventListener('load', () => {

  loader.classList.remove('actif')
  loader.classList.add('hide')
})
  
// Cacher le bock motion design en cliquant sur developpement web

let sectionMotion = document.querySelector(".slider.motion")
let sectionWebdev = document.querySelector(".galerie.web-design")
let btnMotion = document.querySelector(".ongletmotion")
let btnDev = document.querySelector(".ongletdev")


btnMotion.addEventListener("click", () => {
  sectionMotion.style.display="none";
  sectionWebdev.style.display="block";
})

btnDev.addEventListener("click", () => {
  sectionMotion.style.display="none";
  sectionWebdev.style.display="block";
  
})
