export default {
  name: "leather sofa",
  prototype: "items",
  info: {
    title: "leather sofa",
    tag: ["furnishings", "leather sofa"],
    description: "leather sofa",
    image: require("./sofa.jpg"),
  },
  properties: {},
  size: {
    width: 180,
    depth: 60,
    height: 70,
    scale: 1.2,
    unit: 'cm',
  },
  asset: {
    image2d: require("./sofa-2d.png"),
    model: {
      type: "obj",
      object: require("./sofa.obj"),
      material: require("./sofa.mtl"),
      textures: [
        require("./texture.jpg"),
      ],
    }
  }
}
