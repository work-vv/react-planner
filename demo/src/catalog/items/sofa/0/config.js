export default {
  name: "bump sofa",
  prototype: "items",
  info: {
    title: "bump sofa",
    tag: ["furnishings", "bump sofa"],
    description: "bump sofa",
    image: require("./sofa.jpg"),
  },
  properties: {},
  size: {
    width: 170,
    depth: 90,
    height: 80,
    scale: 1,
    unit: 'cm',
  },
  asset: {
    image2d: require("./sofa-2d.png"),
    model: {
      type: "obj",
      object: require("./sofa.obj"),
      material: require("./sofa.mtl"),
      textures: [
        require("./texture-bump.jpg"),
      ],
    }
  }
}
