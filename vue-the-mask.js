var vectorProto = {};
var Vector = function(x, y) {
    return Object.create(vectorProto,{
        x: {value: x},
        y: {value: y}
    });  
};

vectorProto.plus = function(other) {
    return Vector(this.x + other.x, this.y + other.y);
};

var gridProto = {};
var Grid = function(width, height) {
    return Object.create(gridProto,{
        space: {value: new Array(width * height)},
        width: {value: width},
        height: {value: height}
    });  
}
gridProto.isInside = function(vector) {
    return vector.x >= 0 && vector.x < this.width && vector.y >= 0 && vector.y < this.height
}
gridProto.get = function(vector) {
    return this.space[vector.x + this.width * vector.y];
};
gridProto.set = function(vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
};

//page 133


// function randomElement(array) {
//     return array[Math.floor(Math.random() * array.length)];
// }
// function BouncingCritter() {
//     this.direction = randomElement(Object.keys(directions));
// };
// BouncingCritter.prototype.act = function(view) {
//     if (view.look(this.direction) != " ")
//     this.direction = view.find(" ") || "s";
//     return {type: "move", direction: this.direction};
// }
