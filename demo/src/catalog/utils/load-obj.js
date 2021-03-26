import MTLLoader from './mtl-loader';
import OBJLoader from './obj-loader';
import * as Three from 'three';

export function loadObjWithMaterial(mtlFile, objFile, imgPath) {
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

