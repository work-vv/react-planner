export default {
  name: "wooden drawer",
  prototype: "items",
  info: {
    title: "wooden drawer",
    tag: ["furnishings", "wooden drawer"],
    description: "wooden drawer",
    image: require("./texture.jpg"),
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
    width: 50,
    depth: 50,
    height: 70,
    scale: 0.3,
    unit: 'cm',
  },
  asset: {
    image2d: require("./texture.jpg"),
    model: {
      type: "obj",
      object: require("./drawer.obj"),
      material: require("./drawer.mtl"),
      textures: [
        require("./texture.jpg"),
      ],
    }
  }
}
