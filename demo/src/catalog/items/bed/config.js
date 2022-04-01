export default {
    name: "Bed", 
    prototype: "items", 
    info: {
        title: "sofa-2",
        tag: ["furnishings", "convertible sofa"],
        description: "Convertible sofa",
        image: require("./preview.png"),
      },
    properties: {}, 
    size: {
        width: 100,
        depth: 40,
        height: 20,
        scale: 100,
        unit: 'cm',
    },
    asset: {
        image2d: require("./image2d.png"),
        el: {
            type: "obj",
            mtl: require("./Prop_Kitchen_Refrigerator.mtl"),
            obj: require("./Prop_Kitchen_Refrigerator.obj"),
            textures: [
                require("./steel.jpg"), 
                require("./logo.jpg")
            ],
        }
    }
}