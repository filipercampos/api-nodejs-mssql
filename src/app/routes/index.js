const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs
        .readdirSync(__dirname)
        .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js" && file !== "README.md")))
        .forEach(file => require(path.resolve(__dirname, file))(app));
}

// module.exports = app => {
//     const files = fs.readdirSync(__dirname)
//         .filter(file => ((file.indexOf('.')) !== 0
//             && (file !== "index.js" && file !== "README.md")));

//     for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         const routerPath = path.resolve(__dirname, file);
//         require(routerPath)(app);
//     }
// }
