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

  