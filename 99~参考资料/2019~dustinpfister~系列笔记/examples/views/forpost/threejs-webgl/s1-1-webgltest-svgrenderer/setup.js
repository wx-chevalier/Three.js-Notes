//-------- ----------
// SCENE, CAMERA
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0,0,0);
const container = (document.getElementById('demo') || document.body);
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// IS WEBGL TEST
//-------- ----------
console.log('using threejs r' + THREE.REVISION);
if (WebGL.isWebGL()) {
    // if we have webGl so I will default to using webgl1, but might replace
    // with the webgl 2 renderer if there
    console.log('We have webgl.');
    let renderer = new THREE.WebGL1Renderer();
    if(WebGL.isWebGL2()){
        console.log('We have webgl 2');
        renderer = new THREE.WebGLRenderer();
    }
    renderer.setSize(640, 480, false);
    container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
} else {
    console.log('We do not have webgl, so I am using THREE.SVGRenderer');
    const renderer = new THREE.SVGRenderer();
    renderer.setSize(640, 480, false);
    container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
