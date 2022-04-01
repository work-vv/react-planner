export default {
  name: "tv", 
  prototype: "items", 
  info: {
    title: "tv",
    tag: ['furnishing', 'electronics'],
    description: "LCD TV",
    image: require('./tv.png')
  },
  properties: {
    altitude: {
        label: "Altitude",
        type: "length-measure",
        defaultValue: {
        length: 0
      }
    }
  },
  size: {
    width: 160,
    depth: 10,
    height: 80,
    scale: 100,
    unit: 'cm',
  },
  asset: {
    image2d: require("./tv.png"),
    el: {
        type: "obj",
        mtl: require("./tv.mtl"),
        obj: require("./tv.obj"),
        textures: [],
    }
  }
}