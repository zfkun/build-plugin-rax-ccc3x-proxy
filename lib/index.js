"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var processWeb_1 = require("./processWeb");
exports.default = (function (api, options) {
    var context = api.context;
    var command = context.command, targets = context.userConfig.targets;
    if (command !== "start")
        return;
    if (targets.include("web"))
        (0, processWeb_1.default)(api, options);
});
