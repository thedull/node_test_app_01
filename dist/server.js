"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dogeaverage_1 = __importDefault(require("@thedull/dogeaverage"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var helmet_1 = __importDefault(require("helmet"));
var config_json_1 = __importDefault(require("./config.json"));
var users_1 = require("./users");
var authJwt_1 = __importDefault(require("./authJwt"));
var tokenMap_1 = __importDefault(require("./tokenMap"));
var accessTokenSecret = config_json_1["default"].accessToken;
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, helmet_1["default"])());
app.get('/doge', authJwt_1["default"], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, first, last, _b, firstId, lastId, avgId, data;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.query, first = _a.first, last = _a.last;
                _b = [+first, +last], firstId = _b[0], lastId = _b[1];
                return [4 /*yield*/, (0, dogeaverage_1["default"])(firstId, lastId)];
            case 1:
                avgId = _c.sent();
                data = { firstId: firstId, lastId: lastId, avgId: avgId };
                res.setHeader('Content-type', 'application/json');
                return [2 /*return*/, res.status(200).send(data)];
        }
    });
}); });
app.post('/login', function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password;
    var user = users_1.users.find(function (user) {
        return user.username === username &&
            user.password === password;
    });
    // console.log({username, password, user});
    if (user) {
        var accessToken = jsonwebtoken_1["default"].sign({
            username: user.username,
            role: user.role
        }, accessTokenSecret);
        tokenMap_1["default"].set(username, accessToken);
        // console.log(tokenMap);
        res.json({ accessToken: accessToken });
    }
    else {
        res.sendStatus(401);
    }
});
app.post('/logout', authJwt_1["default"], function (req, res) {
    var username = req.user.username;
    tokenMap_1["default"]["delete"](username);
    return res.sendStatus(200);
});
app.get('/admin', authJwt_1["default"], function (req, res) {
    var role = req.user.role;
    if (role !== 'admin') {
        return res.sendStatus(403);
    }
    return res.send('Hello, admin');
});
app.listen(3001, function () { return console.log('Server running on http://localhost:3001'); });
