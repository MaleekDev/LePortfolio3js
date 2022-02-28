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
const cubeTextureLoader = new THREE.CubeTextureLoader() //telecharger les images de l'environnements
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

const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/3/px.jpg',
    '/textures/environmentMaps/3/nx.jpg',
    '/textures/environmentMaps/3/py.jpg',
    '/textures/environmentMaps/3/ny.jpg',
    '/textures/environmentMaps/3/pz.jpg',
    '/textures/environmentMaps/3/nz.jpg'
])

environmentMap.encoding = THREE.sRGBEncoding

// scene.background = environmentMap
// scene.environment = environmentMap

// debugObject.envMapIntensity = 2.5
// gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterials)

/**
 * Models
 */

gltfLoader.load(
    '/models/crane/crane1.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(0.8, 0.8, 0.8)
        gltf.scene.position.set(0, -2.5, 0)
        gltf.scene.rotation.y = -0.5
        group1.add(gltf.scene)
        scene.add(group1)

        gui.add(gltf.scene.rotation, 'y').min(- Math.PI).max(Math.PI).step(0.001).name('rotation')

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
const directionalLight = new THREE.DirectionalLight('#ffffff', 0.475)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(-2.498, 5, 3.894)
scene.add(directionalLight)

gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001).name('lightX')
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001).name('lightY')
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001).name('lightZ')

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
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
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

gui
    .add(renderer, 'toneMapping', {
        No: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping
    })
    .onFinishChange(() =>
    {
        renderer.toneMapping = Number(renderer.toneMapping)
        updateAllMaterials()
    })
gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)



/**
 * Scroll
 */

let scrollY = window.scrollY

window.addEventListener('scroll', () =>
    {
        scrollY = window.scrollY
    }
)





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

     

     //Animate camera
     camera.position.y = - scrollY / sizes.height * 4 //scroll vertical et control de distance de scroll

    // const parallaxX = cursor.x
    // const parallaxY = - cursor.y

    // cameraGroup.position.x = parallaxX
    
    // Update controls


    // controls.update()
    // group1.rotation.z = Math.cos() * 2
    cameraGroup.position.y = -0.7
    cameraGroup.position.x = 1
    group1.opacity = 0
    cameraGroup.rotation.y = elapsedTime * 0.6
// gsap.to(group1.position, { duration: 2, delay: 0.5, opacity: 1})

   group1.position.x = 1
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// gsap.to(".titre_principale", { x: 100, opacity: 1, duration: 3});


// gsap.to(".titre", {
//     scrollTrigger: {
//         trigger: ".titre",
//         toggleActions:"restart none none none"
//     }, 
//     x: 100,
//     opacity: 1,
//     duration: 3
//   });

gsap.registerPlugin(ScrollTrigger);

  gsap.to(".titre", { 
    scrollTrigger: {
      trigger: ".titre",
      toggleActions: "play restart restart reset",
    //   scrub: true,
    //   start: "top bottom",
    // end: "top top"
      
    },
    x: 100,
    opacity: 1,
    duration: 2
  });

  gsap.to(".scd-parti", { 
    scrollTrigger: {
      trigger: ".scd-parti",
      toggleActions: "play restart restart reset",
      scrub: true,
    //   start: "top bottom",
    // end: "top top"
      
    },
    x: 150,
    opacity: 1,
    duration: 2
  });

