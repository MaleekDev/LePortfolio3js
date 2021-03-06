import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// Dependance gsap
import { gsap } from "gsap";
import { ExpoScaleEase, RoughEase, SlowMo } from "gsap/EasePack";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ExpoScaleEase, RoughEase, SlowMo);

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
// const cubeTextureLoader = new THREE.CubeTextureLoader() //telecharger les images de l'environnements
const group1 = new THREE.Group()// création d'un groupe

/**
 * Base
 */
// Debug
const gui = new dat.GUI()//Activer un panneau de controle
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
// const sceneInfo = makeScene(document.querySelector('#scene'));
/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

/**
 * Environment map
 */

// const environmentMap = cubeTextureLoader.load([
//     '/textures/environmentMaps/3/px.jpg',
//     '/textures/environmentMaps/3/nx.jpg',
//     '/textures/environmentMaps/3/py.jpg',
//     '/textures/environmentMaps/3/ny.jpg',
//     '/textures/environmentMaps/3/pz.jpg',
//     '/textures/environmentMaps/3/nz.jpg'
// ])

// environmentMap.encoding = THREE.sRGBEncoding

// scene.background = environmentMap
// scene.environment = environmentMap

// debugObject.envMapIntensity = 2.5
// gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterials)
function setLighting(){

  new RGBELoader()
      .setDataType( THREE.UnsignedByteType )
      .setPath( 'static/hdri/' )
      .load( 'snow_env.hdr', function ( texture ) {

      var envMap = pmremGenerator.fromEquirectangular( texture ).texture;

      scene.background = envMap;
      scene.environment = envMap;

      texture.dispose();
      pmremGenerator.dispose();
  })
  var pmremGenerator = new THREE.PMREMGenerator( renderer );
  pmremGenerator.compileEquirectangularShader();

}




/**
 * Models
 */



gltfLoader.load(
    '/models/scene/adamHead.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(1, 1, 1)
        gltf.scene.position.set(0, -2, 0)
        gltf.scene.rotation.x = 0.729
        gltf.scene.rotation.y = 0.581
        gltf.scene.rotation.z = 0.502

        group1.add(gltf.scene)
        scene.add(group1)

        // gui.add(gltf.scene.rotation, 'x').min(- Math.PI).max(Math.PI).step(0.001).name('rotation x')
        // gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation Y')
        // gui.add(gltf.scene.rotation, 'z').min(- Math.PI).max(Math.PI).step(0.001).name('rotation Z')
        // gui.add(gltf.scene.position, 'y').min(- -500).max(Math.PI).step(0.001).name('position')

        updateAllMaterials()
    }
)





// gltfLoader.load(
//     '/models/hamburger.glb',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(0.3, 0.3, 0.3)
//         gltf.scene.position.set(0, - 1, 0)
//         scene.add(gltf.scene)

//         updateAllMaterials()
//     }
// )

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffecd2',0.478)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.08
directionalLight.position.set(4.14, 5, 39.808)
scene.add(directionalLight)

const directionalLight2 = new THREE.DirectionalLight('#65a6ff',9)
directionalLight2.castShadow = true
directionalLight2.shadow.camera.far = 15
directionalLight2.shadow.mapSize.set(1024, 1024)
directionalLight2.shadow.normalBias = 0.09
directionalLight2.position.set(75.201, 1.681, 5)
scene.add(directionalLight2)


// gui.add(directionalLight, 'intensity').min(0).max(100).step(0.001).name('lightIntensity')
// gui.add(directionalLight.position, 'x').min(- 5).max(100).step(0.001).name('lightX')
// gui.add(directionalLight.position, 'y').min(- 5).max(100).step(0.001).name('lightY')
// gui.add(directionalLight.position, 'z').min(- 5).max(100).step(0.001).name('lightZ')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

/**
 * Camera
 */
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(80, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, -1, 4)
cameraGroup.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true;
// controls.noPan = true;
// controls.minDistance = 2; //Distance de zoom minimal 
// controls.maxDistance = 6;   //Distance de zoom maximal
// controls.noKeys = true;
// controls.noRotate = true;
// controls.noZoom = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true// background transparent
})
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 1.25
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// gui
//     .add(renderer, 'toneMapping', {
//         No: THREE.NoToneMapping,
//         Linear: THREE.LinearToneMapping,
//         Reinhard: THREE.ReinhardToneMapping,
//         Cineon: THREE.CineonToneMapping,
//         ACESFilmic: THREE.ACESFilmicToneMapping
//     })
//     .onFinishChange(() =>
//     {
//         renderer.toneMapping = Number(renderer.toneMapping)
//         updateAllMaterials()
//     })
// gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)










/**
 * Responsive design canva
 */

 function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }







/**
 * Scroll
 */

let scrollY = window.scrollY

window.addEventListener('scroll', (scroll) =>
    {
        scrollY = window.scrollY

        //Animate camera on scroll
        group1.position.y =  -scrollY / sizes.height
         //scroll vertical et control de distance de scroll
    //  cameraGroup.position.x = scrollY / sizes.height *4 //scroll vertical et control de distance de scroll

    cameraGroup.lookAt(group1.position)
    }
)

// if (group1.position.y =  -scrollY / sizes.height == true)
//   {
//     group1.position.x = 2
//   }




/**
 * cursor
 */

 window.addEventListener('mousemove', (event) =>
 {
     cursor.x = event.clientX / sizes.width
     cursor.y = event.clientY / sizes.height

 })

 const cursor = {}
     cursor.x = 0
     cursor.y = 0



/**
 * Animate
 */
const clock = new THREE.Clock()


const tick = () =>
{
     const elapsedTime = clock.getElapsedTime()

      group1.rotation.y = 0.05 * elapsedTime
    

    const parallaxX = cursor.x
    const parallaxY = - cursor.y

    // cameraGroup.position.x = parallaxX
    
    // Update controls


    // controls.update()
    // group1.rotation.z = Math.cos() * 2
    cameraGroup.position.y = -0.7
    cameraGroup.position.x = 1

    // group1.rotation.y = parallaxX //rotation en suivant la souris
    // group1.rotation.x = - parallaxY 

    cameraGroup.rotation.x = 0.8
// gsap.to(group1.position, { duration: 2, delay: 0.5, opacity: 1})

   group1.position.x = 1
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

gsap.to(".titre_principale", { x: 100, opacity: 1, duration: 3});




gsap.registerPlugin(ScrollTrigger);

// Timeline de la section 2
let timeLine = gsap.timeline();


  gsap.to (".titre", { 
    scrollTrigger: {
      trigger: ".titre",
      toggleActions: "play restart restart reset",
      scrub: true,
      start: "top bottom",
      end: "top top"
    },
    x: 240,
    opacity: 1,
    duration: 2
  });

  timeLine.to( ".titre.principale2", {
    scrollTrigger: {
        trigger: ".section.services",
        scrub: true,
        pin: false,
        start: "-40%",
        end: "+=110%",
    },
    xPercent: -40,
    opacity: 1,
    duration: 1,
    ease: "easeOut"
  })

  .to( ".contain-titre > .description", {
    scrollTrigger: {
        trigger: ".section.services",
        scrub: true,
        pin: false,
        start: "top top",
        end: "+=5%",
    }, 
    
    xPercent: 20, 
    opacity: 1,
    scale: 1,
    duration: 10,
    ease: "easeOut"
  })
  
  .to( ".contain-titre > span", {
    scrollTrigger: {
        trigger: ".titre.principale",
        toggleActions: "play restart restart reset",
        scrub: true,
        pin: false,
        start: "top top",
        end: "+=150%"
    }, 
    
    xPercent: 15, 
    opacity: 1,
    duration: 10,
    ease: "easeOut"
  });

  gsap.to(".section.one > span ", {
    scrollTrigger: {
        trigger: ".section.one > span",
        toggleActions: "play restart restart reset",
        // scrub: true,
  },
    opacity: 1,
    duration: 1.2,
  });

  //  gsap.from(".titre.principale2", { x: 100, opacity: 0, duration: 2});

   gsap.from(".scroll-btn", { z: -200, opacity: 0, duration: 2});



  //  let galerieDev = document.querySelector('.galerie.web-design'); 
  //  let maquetteDev = document.querySelector('.webdev_maquette')
  //  let maquetteDevtwo = document.querySelector('.webdev_maquette2')
  
  //  gsap.to( ".portfolio_motion-design", {
  //   scrollTrigger: {
  //     trigger: (".section.services"),
  //     scrub: true,
  //     pin: true,
  //     start: "top top",
  //     end: "+=310%"
  //   },
  //   yPercent: -100, 
  //   transformOrigin: "top top", 
  //   ease: "easeOut",
  // });

  // gsap.to( ".portfolio_developpement", {
  //   scrollTrigger: {
  //     trigger: (".section.services"),
  //     scrub: true,
  //     pin: true,
  //     start: "top top",
  //     end: "+=50%"
  //   },
  //   yPercent: -40, 
  //   transformOrigin: "top top", 
  //   ease: "easeOut",
  // });
  // gsap.to( maquetteDevtwo, {
  //   scrollTrigger: {
  //     trigger: galerieDev,
  //     scrub: true,
  //     pin: true,
  //     start: "top top",
  //     end: "+=100%"
  //   },
  //   yPercent: -45, 
  //   transformOrigin: "top bottom", 
  //   ease: "easeOut",
  // });


// 3eme section 
  gsap.to( ".div2", {
      scrollTrigger: {
        trigger: ".section.perso",
        scrub: true,
        pin: false,
        start: "-90px",
        end: "+=100%"
      },
      yPercent: -150, 
      opacity: 0,
      transformOrigin: "top bottom", 
      ease: "easeOut",
    });

    gsap.to( ".div3", {
      scrollTrigger: {
        trigger: ".section.perso",
        scrub: true,
        pin: false,
        start: "top",
        end: "+=120%"
      },
      yPercent: 140, 
      opacity: 0,
      transformOrigin: "top bottom", 
      ease: "easeOut",
    });

const choixM = document.querySelector('.btn-motion')
const choixD = document.querySelector('.btn-dev')
const motionMaquettes = document.querySelector('.portfolio_motion-design')
const devMaquettes = document.querySelector('.portfolio_developpement')

choixD.addEventListener('click', () => {
  
 timeLine.to(motionMaquettes, { display:"none", z: -200, opacity: 0, duration: 0.5, ease:"easeOut"})
          .to(devMaquettes, {  display:"block", z: 100, opacity: 1, duration: 1, ease:"easeIn"});

          gsap.to( ".portfolio_developpement", {
    scrollTrigger: {
      trigger: (".section.services"),
      scrub: true,
      pin: true,
      start: "top top",
      end: "+=50%"
    },
    yPercent: -40, 
    transformOrigin: "top top", 
    ease: "easeOut",
  });
//  1er facons qui marche
  // motionMaquettes.classList.remove('actif')
  // devMaquettes.classList.add('actif')
})

choixM.addEventListener('click', () => {
  timeLine.to(devMaquettes, { display:"none", z: -200, opacity: 0, duration: 0.5, ease:"easeOut"})
          .to(motionMaquettes, { display:"block", z: -200, opacity: 1, duration: 1, ease:"easeIn"});

          gsap.to( ".portfolio_motion-design", {
            scrollTrigger: {
              trigger: (".section.services"),
              scrub: true,
              pin: true,
              start: "top top",
              end: "+=210%"
            },
            yPercent: -100, 
            transformOrigin: "top top", 
            ease: "easeOut",
          });
  // devMaquettes.classList.remove('actif')
  // motionMaquettes.classList.add('actif')

})