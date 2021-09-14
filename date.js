console.log(module);

// module.exports = "Hello World";

//this just exports 1 function

//module.exports or exports does not matter

exports.getDay = function () {
    let today = new Date();
    let options = {
        weekday: "long"
    };
    return (today.toLocaleDateString("en-US", options));
}
module.exports.getDate = function () {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    return (today.toLocaleDateString("en-US", options));
}
console.log(module.exports);