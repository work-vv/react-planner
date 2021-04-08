import {MTLLoader} from './mtl-loader';
import {OBJLoader} from './obj-loader';
import GLTFLoader from './gltf-loader';
import {LoadingManager, ObjectLoader} from "three";

let manager = new LoadingManager();
let mtlLoader = new MTLLoader(manager);
let objLoader = new OBJLoader(manager);
let loader = new ObjectLoader();
let pool = new Map();

function loadObjWithMaterial(mtlFile, objFile, path) {
  let key = mtlFile + objFile + path;
  if (pool.has(key) && pool.get(key)) {
    return Promise.resolve(loader.parse(pool.get(key)));
  }
 // mtlLoader.setPath(path);
  let url = mtlFile;
  return new Promise((resolve, reject) => {

    mtlLoader.load(url, materials => {
      materials.preload();
      Promise.all(materials.promises).then(res =>{
        console.log(res);
        objLoader.setMaterials(materials);
        objLoader.load(objFile, object => {
          pool.set(key, object.toJSON());
          resolve(object);
        });
      });
    });
  });
}
function loadGLTFWithMaterial(gtlfFile) {
  let gtlfLoader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    gtlfLoader.load(gtlfFile, object => resolve(object.scene));
  });
}

export {loadObjWithMaterial, loadGLTFWithMaterial};

