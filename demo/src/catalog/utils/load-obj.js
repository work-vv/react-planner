import MTLLoader from './mtl-loader';
import OBJLoader from './obj-loader';
import GLTFLoader from './gltf-loader';
import * as Three from 'three';

function loadObjWithMaterial(mtlFile, objFile, imgPath) {
  let mtlLoader = new MTLLoader();
  mtlLoader.setTexturePath(imgPath);
  let url = mtlFile;
  return new Promise((resolve, reject) => {

    mtlLoader.load(url, materials => {
      materials.preload();
      let objLoader = new OBJLoader(new Three.LoadingManager());
      objLoader.setMaterials(materials);
      objLoader.load(objFile, object => resolve(object));

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

