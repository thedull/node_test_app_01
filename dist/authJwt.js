"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_json_1 = __importDefault(require("./config.json"));
var tokenMap_1 = __importDefault(require("./tokenMap"));
var authJwt = function (req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        var token_1 = authHeader.split(' ')[1];
        jsonwebtoken_1["default"].verify(token_1, config_json_1["default"].accessToken, function (err, user) {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            if (tokenMap_1["default"].get(user.username) !== token_1) {
                return res.sendStatus(403);
            }
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports["default"] = authJwt;
