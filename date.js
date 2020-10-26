//Option 1//

// module.exports.getDate = getDate;

// function getDate() {
//     let date = new Date();
//     let options = {
//         day: 'numeric',
//         weekday: 'long',
//         month: 'long',
//         year: 'numeric'
//     };
//     return date.toLocaleString("en-US", options);

// }
// module.exports.getDay = getDay;

// function getDay() {
//     let date = new Date();
//     let options = {

//         weekday: 'long',

//     };
//     return date.toLocaleString("en-US", options);

// }

// Option 2//
exports.getDate = function() {
    let date = new Date();
    let options = {
        day: 'numeric',
        weekday: 'long',
        month: 'long',
        year: 'numeric'
    };
    return date.toLocaleString("en-US", options);

}
exports.getDay = function() {
    let date = new Date();
    let options = {
        weekday: 'long',
    };
    return date.toLocaleString("en-US", options);

}