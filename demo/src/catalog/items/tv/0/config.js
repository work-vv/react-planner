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
    width: 80,
    depth: 20,
    height: 80,
    scale: 50,
    unit: 'cm',
  },
  asset: {
    image2d: require("./tv-2d.png"),
    model: {
      type: "obj",
      object: require("./tv.obj"),
      material: require("./tv.mtl"),
      textures: [],
    }
  }
}
