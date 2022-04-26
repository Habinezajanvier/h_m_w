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
exports.__esModule = true;
var tap_1 = require("tap");
require("reflect-metadata");
var KeyPair_1 = require("../crypto/KeyPair");
var VerifiableCredentials_1 = require("../crypto/VerifiableCredentials");
var crypto_1 = require("crypto");
tap_1["default"].test("Verifiable Credentials", function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var kp, target, target2, target3, target4, seed, seed2, seed3, seed4, kp2, kp3, kp4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                kp = (0, KeyPair_1.createKeypair)();
                target = "+918296133121";
                target2 = "+918296133122";
                target3 = "+918296133123";
                target4 = "+918296133124";
                seed = new Uint8Array([
                    237, 105, 164, 199, 230, 245, 85, 91, 9, 189, 253, 159, 154, 210, 30, 210,
                    68, 245, 182, 146, 13, 206, 156, 146, 110, 212, 115, 240, 178, 83, 226, 132,
                ]);
                seed2 = (0, crypto_1.randomBytes)(32);
                seed3 = (0, crypto_1.randomBytes)(32);
                seed4 = (0, crypto_1.randomBytes)(32);
                kp2 = (0, KeyPair_1.createKeypair)();
                kp3 = (0, KeyPair_1.createKeypair)();
                kp4 = (0, KeyPair_1.createKeypair)();
                return [4 /*yield*/, kp2.derive(target2, KeyPair_1.KeyPairType.HYBRID, seed2)];
            case 1:
                _a.sent();
                return [4 /*yield*/, kp3.derive(target3, KeyPair_1.KeyPairType.HYBRID, seed3)];
            case 2:
                _a.sent();
                return [4 /*yield*/, kp4.derive(target4, KeyPair_1.KeyPairType.HYBRID, seed4)];
            case 3:
                _a.sent();
                t.test("Verifiable Credentials basic execution", function (t) { return __awaiter(void 0, void 0, void 0, function () {
                    var vc, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                vc = new VerifiableCredentials_1.VerifiableCredentials(kp2);
                                vc.setHolder(kp3.did);
                                vc.setOrganisation(kp2.did);
                                vc.setMeta({
                                    firstName: "bhavish",
                                    lastName: "Agarwal",
                                    countryCode: "91",
                                    phoneNumber: "8296133177"
                                });
                                _b = (_a = console).log;
                                return [4 /*yield*/, vc.execute()];
                            case 1:
                                _b.apply(_a, [_c.sent()]);
                                console.log(vc.toJSON());
                                return [2 /*return*/];
                        }
                    });
                }); });
                t.test("Verifiable Credentials basic execution", function (t) { return __awaiter(void 0, void 0, void 0, function () {
                    var vc, credential, _a, _b, _c, _d, _e, frame, _f, _g;
                    return __generator(this, function (_h) {
                        switch (_h.label) {
                            case 0:
                                vc = new VerifiableCredentials_1.VerifiableCredentials(kp2);
                                vc.setHolder(kp3.did);
                                vc.setOrganisation(kp2.did);
                                vc.setAudience([kp2.did, kp3.did, kp4.did]);
                                vc.setMeta({
                                    firstName: "bhavish",
                                    lastName: "Agarwal",
                                    countryCode: "91",
                                    phoneNumber: "8296133177"
                                });
                                console.log();
                                console.log(vc.toJSON());
                                return [4 /*yield*/, vc.execute()];
                            case 1:
                                credential = _h.sent();
                                _b = (_a = console).log;
                                _d = (_c = VerifiableCredentials_1.VerifiableCredentials).verify;
                                _e = [kp4];
                                return [4 /*yield*/, vc.execute()];
                            case 2: return [4 /*yield*/, _d.apply(_c, _e.concat([_h.sent()]))];
                            case 3:
                                _b.apply(_a, [_h.sent()]);
                                frame = ["firstName", "phoneNumber"];
                                _g = (_f = console).log;
                                return [4 /*yield*/, VerifiableCredentials_1.VerifiableCredentials.deriveCredentials(kp4, credential, frame)];
                            case 4:
                                _g.apply(_f, [_h.sent()]);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
