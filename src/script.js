import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const group1 = new THREE.Group()

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

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

// const environmentMap = new THREE.RGBELoader().load([
//     '/textures/environmentMaps/4/HDR_110_Tunnel_Env.hdr'
// ])

const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/3/px.jpg',
    '/textures/environmentMaps/3/nx.jpg',
    '/textures/environmentMaps/3/py.jpg',
    '/textures/environmentMaps/3/ny.jpg',
    '/textures/environmentMaps/3/pz.jpg',
    '/textures/environmentMaps/3/nz.jpg'
])

environmentMap.encoding = THREE.sRGBEncoding

scene.background = environmentMap
scene.environment = environmentMap

debugObject.envMapIntensity = 2.5
gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterials)

/**
 * Models
 */
gltfLoader.load(
    '/models/Geisha/scene.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(2, 2, 2)
        gltf.scene.position.set(0, 2, 0)
        gltf.scene.rotation.y = -0.5
        scene.add(group1)


        

        group1.add(gltf.scene)

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
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, - 2.25)
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
    alpha: true // background transparent
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







// function ChangerDeTexte() {
//     titre.textContent = 'Changement de texte';
// }

// //Objectif changer le texte en h1 
// let titre = document.querySelector('h1')

// if (titre.addEventListener('click',) ) 
//     {
//         ChangerDeTexte()
//     }      
//  else{
//         console.error("ce n'est pas bon")
//  }










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

    const parallaxX = cursor.x
    const parallaxY = - cursor.y

    cameraGroup.position.x = - parallaxX
    cameraGroup.position.y = -parallaxY
    // Update controls


    // controls.update()
    // group1.rotation.z = Math.cos() * 2

    //position
    
    group1.position.x = 2
    //rotation
    group1.rotation.y = Math.cos(2) * elapsedTime *0.5
    // group1.rotation.x = elapsedTime * 0.5
   group1.rotation.x = - parallaxX * 0.05
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()













//teste de code js
let box = document.querySelector('.box')
let illBox = document.querySelector('.block_illustration')

box.addEventListener('click', function() {
    illBox.style.background = 'red'
}) 
