import {MTLLoader} from './mtl-loader';
import {OBJLoader} from './obj-loader';
import GLTFLoader from './gltf-loader';
import {LoadingManager, ObjectLoader} from "three";

let manager = new LoadingManager();
let loader = new ObjectLoader();
let pool = new Map();


function loadUnit(el) {
  let loader;
  switch (el.type) {
    case 'obj':
      loader = loadObjWithMaterial(el.material, el.object)
      break;
    case 'gltf':
      loader = loadGLTFWithMaterial(el.object)
      break;
    default:
      throw Error('unsupported format');
  }

  return loader;
}

function loadObjWithMaterial(mtlFile, objFile) {
  let key = mtlFile + objFile;
  if (pool.has(key) && pool.get(key)) {
    return Promise.resolve(loader.parse(pool.get(key)));
  }

  let url = mtlFile;
  return new Promise((resolve, reject) => {
    let mtlLoader = new MTLLoader(manager);
    let objLoader = new OBJLoader(manager);
    mtlLoader.load(url, materials => {
      materials.preload();
      Promise.allSettled(materials.promises).then(res =>{
        objLoader.setMaterials(materials);
        objLoader.load(objFile, object => {
          pool.set(key, object.toJSON());
          resolve(object);
        });
      });
    });
  });
}
function loadGLTFWithMaterial(gltfFile) {
  let gltfLoader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    gltfLoader.load(gltfFile, object => resolve(object.scene));
  });
}

export {loadObjWithMaterial, loadGLTFWithMaterial, loadUnit};

