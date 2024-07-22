// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// POINTS - array of Vector3 Objects
// ---------- ----------
const points_array = [
    new THREE.Vector3( -1, -1,  1),
    new THREE.Vector3( -1, -1, -1),
    new THREE.Vector3(  1, -1,  1),
    new THREE.Vector3(  1, -1, -1),
    new THREE.Vector3( -1,  1,  1),
    new THREE.Vector3( -1,  1, -1),
    new THREE.Vector3(  1,  1,  1),
    new THREE.Vector3(  1,  1, -1),
];
// ---------- ----------
// GEOMETRY - using the setFromPoints method to create one from points_array
// ---------- ----------
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(points_array);
// ---------- ----------
// Points - using geometry with THREE.Points rather than THREE.Mesh
// ---------- ----------
const material = new THREE.PointsMaterial({ color: 0xffff00, size: 0.25 });
scene.add( new THREE.Points(geometry, material) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 3, 4);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

