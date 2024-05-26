const fs = require("fs-extra");
const copyDir = require("copy-dir");
const defaultOption = {
    utimes: true,
    mode: true,
    cover: true,
};

const copyDirSync = (srcFolders, rootSrc, rootDest, option = {}) => {
    srcFolders.forEach(folder => {
        copyDir.sync(`${rootSrc}/${folder}`, `${rootDest}/${folder}`, {
            ...defaultOption,
            ...option,
        });
    });
};

const snapCoreFolders = [""];

fs.ensureDirSync("./nestjs-redis");
copyDirSync(
    snapCoreFolders,
    ".",
    "./nestjs-redis",
    {
        filter: function(stat, filepath, filename) {
            // do not want copy .git directories
            if (stat === "directory" && filename === "node_modules") {
                return false;
            }

            if (stat === "directory" && filename === ".git") {
                return false;
            }

            if (filename === "yarn.lock") {
                return false;
            }

            if (stat === "directory" && filename === "example") {
                return false;
            }

            if (stat === "directory" && filename === "lib") {
                return false;
            }
            
            if (stat === "directory" && filename === "coverage") {
                return false;
            }

            if (stat === "directory" && filename === "nestjs-redis") {
                return false;
            }

            return true;
        },
    }
);
