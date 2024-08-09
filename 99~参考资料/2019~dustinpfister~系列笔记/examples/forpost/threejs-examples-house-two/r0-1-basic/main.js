// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// LOADING
//-------- ----------
DAE_loader({
    // custom cloner
    cloner: (obj, scene_source ) => {
        if(obj.type === 'Mesh'){
            const mat = new THREE.MeshBasicMaterial({
                map: obj.material.map
            });
            const mesh = new THREE.Mesh(obj.geometry, mat);
            mesh.name = obj.name;
            mesh.rotation.copy(obj.rotation);
            scene_source.add(mesh);
        }
    },
    urls_dae: [
        '/dae/house_two/house_2.dae'
    ],
    urls_resource: [
        '/dae/house_two/skins/'
    ]
})
.then( (scene_source) => {
    console.log('done loading');
    // add in source object
    scene.add( new THREE.GridHelper(10, 40) )
    const mesh_house = scene_source.getObjectByName('house_0').clone();
    scene.add( mesh_house )
    // camera
    camera.position.set(2, 1, -2);
    camera.lookAt(mesh_house.position);
    // render
    renderer.render(scene, camera);
})
.catch( (e) => {
    console.warn(e);
});