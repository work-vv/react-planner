export default {
    name: "sofa",
    prototype: "items",
    info: {
        title: "sofa",
        tag: ["furnishings", "convertible sofa"],
        description: "Convertible sofa",
        image: require("./convertible-sofa-BZ-closed.png"),
      },
    properties: {},
    size: {
        width: 100,
        depth: 40,
        height: 20,
        scale: 1,
        unit: 'cm',
    },
    asset: {
        image2d: require("./convertible-sofa-BZ-closed-2d.png"),
        el: {
            type: "obj",
            mtl: require("./convertible-sofa-BZ-closed.mtl"),
            obj: require("./convertible-sofa-BZ-closed.obj"),
            textures: [
                require("./texturefabric.jpg"),
            ],
        }
    }
}
