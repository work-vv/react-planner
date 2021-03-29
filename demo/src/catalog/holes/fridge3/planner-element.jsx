import {BoxHelper, Box3, ObjectLoader} from 'three';
import {loadGLTFWithMaterial} from '../../utils/load-obj';
import path from 'path';
import convert from 'convert-units';

import React from 'react';

const obj = require('./fridge-side-by-side.glb');

const INIT_SCALE = 100;
const WIDTH = 80;
const DEPTH = 80;
const HEIGHT = 180;
const width = {length: 80, unit: 'cm'};
const depth = {length: 80, unit: 'cm'};
const height = {length: 180, unit: 'cm'};

let cachedJSONFridge3 = null;

export default {
  name: "fridge3",
  prototype: "items",

  info: {
    tag: ['furnishings', 'metal'],
    title: "fridge",
    description: "fridge3",
    image: require('./fridge.png')
  },

  render2D: function (element, layer, scene) {

    let angle = element.rotation + 90;

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    return (
      <g transform={`translate(${-WIDTH / 2},${-DEPTH / 2})`}>
      <rect key="1" x="0" y="0" width={WIDTH} height={DEPTH}
        style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"}}/>
      <text key="2" x="0" y="0"
            transform={`translate(${WIDTH / 2}, ${DEPTH / 2}) scale(1,-1) rotate(${textRotation})`}
              style={{textAnchor: "middle", fontSize: "11px"}}>
            {element.type}
            </text>
        </g>
    )
  },

  render3D: function (element, layer, scene) {

    let onLoadItem = (object) => {
      let newWidth = convert(width.length).from(width.unit).to(scene.unit);
      let newHeight = convert(height.length).from(height.unit).to(scene.unit);
      let newDepth = convert(depth.length).from(depth.unit).to(scene.unit);

      let box = new BoxHelper(object, 0x99c3fb);
      box.material.linewidth = 2;
      box.material.depthTest = false;
      box.renderOrder = 1000;
      box.visible = element.selected;
      object.add(box);
      object.scale.set(INIT_SCALE * newWidth / width.length, INIT_SCALE * newHeight / height.length, INIT_SCALE * newDepth / depth.length);
     
      // Normalize the origin of this item
      let boundingBox = new Box3().setFromObject(object);

      let center = [
        (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x,
        (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y,
        (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

      object.position.x -= center[0];
      object.position.y -= center[1] - (boundingBox.max.y - boundingBox.min.y) / 2;
      object.position.z -= center[2];


      return object;
    };

    if (cachedJSONFridge3) {
      let loader = new ObjectLoader();
      let object = loader.parse(cachedJSONFridge3);
      return Promise.resolve(onLoadItem(object));
    }
  
    return loadGLTFWithMaterial(obj)
      .then(object => {
        console.log(object);
        cachedJSONFridge3 = object.toJSON();
        return onLoadItem(object)
      });
  },

  updateRender3D: ( element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild ) => {

    let noPerf = () => { selfDestroy(); return selfBuild(); };

    if( differences.indexOf('selected') !== -1 )
    {
      mesh.traverse(( child ) => {
        if ( child instanceof BoxHelper ) {
          child.visible = element.selected;
        }
      });

      return Promise.resolve(mesh);
    }

    if( differences.indexOf('rotation') !== -1 ) {
      mesh.rotation.y = element.rotation * Math.PI / 180;
      return Promise.resolve(mesh);
    }

    return noPerf();
  }
};
