/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@ledgerhq/devices/lib-es/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@ledgerhq/devices/lib-es/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DeviceModelId": () => (/* binding */ DeviceModelId),
/* harmony export */   "IICCID": () => (/* binding */ IICCID),
/* harmony export */   "IIGenericHID": () => (/* binding */ IIGenericHID),
/* harmony export */   "IIKeyboardHID": () => (/* binding */ IIKeyboardHID),
/* harmony export */   "IIU2F": () => (/* binding */ IIU2F),
/* harmony export */   "IIWebUSB": () => (/* binding */ IIWebUSB),
/* harmony export */   "getBluetoothServiceUuids": () => (/* binding */ getBluetoothServiceUuids),
/* harmony export */   "getDeviceModel": () => (/* binding */ getDeviceModel),
/* harmony export */   "getInfosForServiceUuid": () => (/* binding */ getInfosForServiceUuid),
/* harmony export */   "identifyProductName": () => (/* binding */ identifyProductName),
/* harmony export */   "identifyTargetId": () => (/* binding */ identifyTargetId),
/* harmony export */   "identifyUSBProductId": () => (/* binding */ identifyUSBProductId),
/* harmony export */   "ledgerUSBVendorId": () => (/* binding */ ledgerUSBVendorId)
/* harmony export */ });
/* harmony import */ var semver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! semver */ "./node_modules/semver/index.js");
/* harmony import */ var semver__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(semver__WEBPACK_IMPORTED_MODULE_0__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;

/**
 * The USB product IDs will be defined as MMII, encoding a model (MM) and an interface bitfield (II)
 *
 ** Model
 * Ledger Nano S : 0x10
 * Ledger Blue : 0x00
 * Ledger Nano X : 0x40
 *
 ** Interface support bitfield
 * Generic HID : 0x01
 * Keyboard HID : 0x02
 * U2F : 0x04
 * CCID : 0x08
 * WebUSB : 0x10
 */
var IIGenericHID = 0x01;
var IIKeyboardHID = 0x02;
var IIU2F = 0x04;
var IICCID = 0x08;
var IIWebUSB = 0x10;
var DeviceModelId;
(function (DeviceModelId) {
    DeviceModelId["blue"] = "blue";
    DeviceModelId["nanoS"] = "nanoS";
    DeviceModelId["nanoSP"] = "nanoSP";
    DeviceModelId["nanoX"] = "nanoX";
})(DeviceModelId || (DeviceModelId = {}));
var devices = (_a = {},
    _a[DeviceModelId.blue] = {
        id: DeviceModelId.blue,
        productName: "Ledger Blue",
        productIdMM: 0x00,
        legacyUsbProductId: 0x0000,
        usbOnly: true,
        memorySize: 480 * 1024,
        masks: [0x31000000, 0x31010000],
        getBlockSize: function (_firwareVersion) { return 4 * 1024; }
    },
    _a[DeviceModelId.nanoS] = {
        id: DeviceModelId.nanoS,
        productName: "Ledger Nano S",
        productIdMM: 0x10,
        legacyUsbProductId: 0x0001,
        usbOnly: true,
        memorySize: 320 * 1024,
        masks: [0x31100000],
        getBlockSize: function (firmwareVersion) {
            var _a;
            return semver__WEBPACK_IMPORTED_MODULE_0___default().lt((_a = semver__WEBPACK_IMPORTED_MODULE_0___default().coerce(firmwareVersion)) !== null && _a !== void 0 ? _a : "", "2.0.0")
                ? 4 * 1024
                : 2 * 1024;
        }
    },
    _a[DeviceModelId.nanoSP] = {
        id: DeviceModelId.nanoSP,
        productName: "Ledger Nano S Plus",
        productIdMM: 0x50,
        legacyUsbProductId: 0x0005,
        usbOnly: true,
        memorySize: 1533 * 1024,
        masks: [0x33100000],
        getBlockSize: function (_firmwareVersion) { return 32; }
    },
    _a[DeviceModelId.nanoX] = {
        id: DeviceModelId.nanoX,
        productName: "Ledger Nano X",
        productIdMM: 0x40,
        legacyUsbProductId: 0x0004,
        usbOnly: false,
        memorySize: 2 * 1024 * 1024,
        masks: [0x33000000],
        getBlockSize: function (_firwareVersion) { return 4 * 1024; },
        bluetoothSpec: [
            {
                // this is the legacy one (prototype version). we will eventually drop it.
                serviceUuid: "d973f2e0-b19e-11e2-9e96-0800200c9a66",
                notifyUuid: "d973f2e1-b19e-11e2-9e96-0800200c9a66",
                writeUuid: "d973f2e2-b19e-11e2-9e96-0800200c9a66",
                writeCmdUuid: "d973f2e3-b19e-11e2-9e96-0800200c9a66"
            },
            {
                serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
                notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
                writeUuid: "13d63400-2c97-0004-0002-4c6564676572",
                writeCmdUuid: "13d63400-2c97-0004-0003-4c6564676572"
            },
        ]
    },
    _a);
var productMap = {
    Blue: DeviceModelId.blue,
    "Nano S": DeviceModelId.nanoS,
    "Nano X": DeviceModelId.nanoX
};
var devicesList = Object.values(devices);
/**
 *
 */
var ledgerUSBVendorId = 0x2c97;
/**
 *
 */
var getDeviceModel = function (id) {
    var info = devices[id];
    if (!info)
        throw new Error("device '" + id + "' does not exist");
    return info;
};
/**
 * Given a `targetId`, return the deviceModel associated to it,
 * based on the first two bytes.
 */
var identifyTargetId = function (targetId) {
    var deviceModel = devicesList.find(function (_a) {
        var masks = _a.masks;
        return masks.find(function (mask) { return (targetId & 0xffff0000) === mask; });
    });
    return deviceModel;
};
/**
 *
 */
var identifyUSBProductId = function (usbProductId) {
    var legacy = devicesList.find(function (d) { return d.legacyUsbProductId === usbProductId; });
    if (legacy)
        return legacy;
    var mm = usbProductId >> 8;
    var deviceModel = devicesList.find(function (d) { return d.productIdMM === mm; });
    return deviceModel;
};
var identifyProductName = function (productName) {
    var productId = productMap[productName];
    if (!productId && productName.startsWith("Nano S")) {
        productId = DeviceModelId.nanoSP;
    }
    var deviceModel = devicesList.find(function (d) { return d.id === productId; });
    return deviceModel;
};
var bluetoothServices = [];
var serviceUuidToInfos = {};
for (var id in devices) {
    var deviceModel = devices[id];
    var bluetoothSpec = deviceModel.bluetoothSpec;
    if (bluetoothSpec) {
        for (var i = 0; i < bluetoothSpec.length; i++) {
            var spec = bluetoothSpec[i];
            bluetoothServices.push(spec.serviceUuid);
            serviceUuidToInfos[spec.serviceUuid] = serviceUuidToInfos[spec.serviceUuid.replace(/-/g, "")] = __assign({ deviceModel: deviceModel }, spec);
        }
    }
}
/**
 *
 */
var getBluetoothServiceUuids = function () { return bluetoothServices; };
/**
 *
 */
var getInfosForServiceUuid = function (uuid) { return serviceUuidToInfos[uuid.toLowerCase()]; };
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@ledgerhq/devices/lib/hid-framing.js":
/*!***********************************************************!*\
  !*** ./node_modules/@ledgerhq/devices/lib/hid-framing.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

exports.__esModule = true;
var errors_1 = __webpack_require__(/*! @ledgerhq/errors */ "./node_modules/@ledgerhq/errors/lib-es/index.js");
var Tag = 0x05;
function asUInt16BE(value) {
    var b = Buffer.alloc(2);
    b.writeUInt16BE(value, 0);
    return b;
}
var initialAcc = {
    data: Buffer.alloc(0),
    dataLength: 0,
    sequence: 0
};
/**
 *
 */
var createHIDframing = function (channel, packetSize) {
    return {
        makeBlocks: function (apdu) {
            var data = Buffer.concat([asUInt16BE(apdu.length), apdu]);
            var blockSize = packetSize - 5;
            var nbBlocks = Math.ceil(data.length / blockSize);
            data = Buffer.concat([
                data,
                Buffer.alloc(nbBlocks * blockSize - data.length + 1).fill(0),
            ]);
            var blocks = [];
            for (var i = 0; i < nbBlocks; i++) {
                var head = Buffer.alloc(5);
                head.writeUInt16BE(channel, 0);
                head.writeUInt8(Tag, 2);
                head.writeUInt16BE(i, 3);
                var chunk = data.slice(i * blockSize, (i + 1) * blockSize);
                blocks.push(Buffer.concat([head, chunk]));
            }
            return blocks;
        },
        reduceResponse: function (acc, chunk) {
            var _a = acc || initialAcc, data = _a.data, dataLength = _a.dataLength, sequence = _a.sequence;
            if (chunk.readUInt16BE(0) !== channel) {
                throw new errors_1.TransportError("Invalid channel", "InvalidChannel");
            }
            if (chunk.readUInt8(2) !== Tag) {
                throw new errors_1.TransportError("Invalid tag", "InvalidTag");
            }
            if (chunk.readUInt16BE(3) !== sequence) {
                throw new errors_1.TransportError("Invalid sequence", "InvalidSequence");
            }
            if (!acc) {
                dataLength = chunk.readUInt16BE(5);
            }
            sequence++;
            var chunkData = chunk.slice(acc ? 5 : 7);
            data = Buffer.concat([data, chunkData]);
            if (data.length > dataLength) {
                data = data.slice(0, dataLength);
            }
            return {
                data: data,
                dataLength: dataLength,
                sequence: sequence
            };
        },
        getReducedResult: function (acc) {
            if (acc && acc.dataLength === acc.data.length) {
                return acc.data;
            }
        }
    };
};
exports["default"] = createHIDframing;
//# sourceMappingURL=hid-framing.js.map

/***/ }),

/***/ "./node_modules/@ledgerhq/errors/lib-es/helpers.js":
/*!*********************************************************!*\
  !*** ./node_modules/@ledgerhq/errors/lib-es/helpers.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCustomErrorDeserializer": () => (/* binding */ addCustomErrorDeserializer),
/* harmony export */   "createCustomErrorClass": () => (/* binding */ createCustomErrorClass),
/* harmony export */   "deserializeError": () => (/* binding */ deserializeError),
/* harmony export */   "serializeError": () => (/* binding */ serializeError)
/* harmony export */ });
/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var errorClasses = {};
var deserializers = {};
var addCustomErrorDeserializer = function (name, deserializer) {
    deserializers[name] = deserializer;
};
var createCustomErrorClass = function (name) {
    var C = function CustomError(message, fields) {
        Object.assign(this, fields);
        this.name = name;
        this.message = message || name;
        this.stack = new Error().stack;
    };
    C.prototype = new Error();
    errorClasses[name] = C;
    return C;
};
// inspired from https://github.com/programble/errio/blob/master/index.js
var deserializeError = function (object) {
    if (typeof object === "object" && object) {
        try {
            // $FlowFixMe FIXME HACK
            var msg = JSON.parse(object.message);
            if (msg.message && msg.name) {
                object = msg;
            }
        }
        catch (e) {
            // nothing
        }
        var error = void 0;
        if (typeof object.name === "string") {
            var name_1 = object.name;
            var des = deserializers[name_1];
            if (des) {
                error = des(object);
            }
            else {
                var constructor = name_1 === "Error" ? Error : errorClasses[name_1];
                if (!constructor) {
                    console.warn("deserializing an unknown class '" + name_1 + "'");
                    constructor = createCustomErrorClass(name_1);
                }
                error = Object.create(constructor.prototype);
                try {
                    for (var prop in object) {
                        if (object.hasOwnProperty(prop)) {
                            error[prop] = object[prop];
                        }
                    }
                }
                catch (e) {
                    // sometimes setting a property can fail (e.g. .name)
                }
            }
        }
        else {
            error = new Error(object.message);
        }
        if (!error.stack && Error.captureStackTrace) {
            Error.captureStackTrace(error, deserializeError);
        }
        return error;
    }
    return new Error(String(object));
};
// inspired from https://github.com/sindresorhus/serialize-error/blob/master/index.js
var serializeError = function (value) {
    if (!value)
        return value;
    if (typeof value === "object") {
        return destroyCircular(value, []);
    }
    if (typeof value === "function") {
        return "[Function: " + (value.name || "anonymous") + "]";
    }
    return value;
};
// https://www.npmjs.com/package/destroy-circular
function destroyCircular(from, seen) {
    var e_1, _a;
    var to = {};
    seen.push(from);
    try {
        for (var _b = __values(Object.keys(from)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var value = from[key];
            if (typeof value === "function") {
                continue;
            }
            if (!value || typeof value !== "object") {
                to[key] = value;
                continue;
            }
            if (seen.indexOf(from[key]) === -1) {
                to[key] = destroyCircular(from[key], seen.slice(0));
                continue;
            }
            to[key] = "[Circular]";
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (typeof from.name === "string") {
        to.name = from.name;
    }
    if (typeof from.message === "string") {
        to.message = from.message;
    }
    if (typeof from.stack === "string") {
        to.stack = from.stack;
    }
    return to;
}
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/@ledgerhq/errors/lib-es/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@ledgerhq/errors/lib-es/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AccountNameRequiredError": () => (/* binding */ AccountNameRequiredError),
/* harmony export */   "AccountNotSupported": () => (/* binding */ AccountNotSupported),
/* harmony export */   "AmountRequired": () => (/* binding */ AmountRequired),
/* harmony export */   "BluetoothRequired": () => (/* binding */ BluetoothRequired),
/* harmony export */   "BtcUnmatchedApp": () => (/* binding */ BtcUnmatchedApp),
/* harmony export */   "CantOpenDevice": () => (/* binding */ CantOpenDevice),
/* harmony export */   "CantScanQRCode": () => (/* binding */ CantScanQRCode),
/* harmony export */   "CashAddrNotSupported": () => (/* binding */ CashAddrNotSupported),
/* harmony export */   "CurrencyNotSupported": () => (/* binding */ CurrencyNotSupported),
/* harmony export */   "DBNotReset": () => (/* binding */ DBNotReset),
/* harmony export */   "DBWrongPassword": () => (/* binding */ DBWrongPassword),
/* harmony export */   "DeviceAppVerifyNotSupported": () => (/* binding */ DeviceAppVerifyNotSupported),
/* harmony export */   "DeviceGenuineSocketEarlyClose": () => (/* binding */ DeviceGenuineSocketEarlyClose),
/* harmony export */   "DeviceHalted": () => (/* binding */ DeviceHalted),
/* harmony export */   "DeviceInOSUExpected": () => (/* binding */ DeviceInOSUExpected),
/* harmony export */   "DeviceNameInvalid": () => (/* binding */ DeviceNameInvalid),
/* harmony export */   "DeviceNotGenuineError": () => (/* binding */ DeviceNotGenuineError),
/* harmony export */   "DeviceOnDashboardExpected": () => (/* binding */ DeviceOnDashboardExpected),
/* harmony export */   "DeviceOnDashboardUnexpected": () => (/* binding */ DeviceOnDashboardUnexpected),
/* harmony export */   "DeviceShouldStayInApp": () => (/* binding */ DeviceShouldStayInApp),
/* harmony export */   "DeviceSocketFail": () => (/* binding */ DeviceSocketFail),
/* harmony export */   "DeviceSocketNoBulkStatus": () => (/* binding */ DeviceSocketNoBulkStatus),
/* harmony export */   "DisconnectedDevice": () => (/* binding */ DisconnectedDevice),
/* harmony export */   "DisconnectedDeviceDuringOperation": () => (/* binding */ DisconnectedDeviceDuringOperation),
/* harmony export */   "ETHAddressNonEIP": () => (/* binding */ ETHAddressNonEIP),
/* harmony export */   "EnpointConfigError": () => (/* binding */ EnpointConfigError),
/* harmony export */   "EthAppPleaseEnableContractData": () => (/* binding */ EthAppPleaseEnableContractData),
/* harmony export */   "FeeEstimationFailed": () => (/* binding */ FeeEstimationFailed),
/* harmony export */   "FeeNotLoaded": () => (/* binding */ FeeNotLoaded),
/* harmony export */   "FeeRequired": () => (/* binding */ FeeRequired),
/* harmony export */   "FeeTooHigh": () => (/* binding */ FeeTooHigh),
/* harmony export */   "FirmwareNotRecognized": () => (/* binding */ FirmwareNotRecognized),
/* harmony export */   "FirmwareOrAppUpdateRequired": () => (/* binding */ FirmwareOrAppUpdateRequired),
/* harmony export */   "GasLessThanEstimate": () => (/* binding */ GasLessThanEstimate),
/* harmony export */   "GenuineCheckFailed": () => (/* binding */ GenuineCheckFailed),
/* harmony export */   "HardResetFail": () => (/* binding */ HardResetFail),
/* harmony export */   "InvalidAddress": () => (/* binding */ InvalidAddress),
/* harmony export */   "InvalidAddressBecauseDestinationIsAlsoSource": () => (/* binding */ InvalidAddressBecauseDestinationIsAlsoSource),
/* harmony export */   "InvalidXRPTag": () => (/* binding */ InvalidXRPTag),
/* harmony export */   "LatestMCUInstalledError": () => (/* binding */ LatestMCUInstalledError),
/* harmony export */   "LedgerAPI4xx": () => (/* binding */ LedgerAPI4xx),
/* harmony export */   "LedgerAPI5xx": () => (/* binding */ LedgerAPI5xx),
/* harmony export */   "LedgerAPIError": () => (/* binding */ LedgerAPIError),
/* harmony export */   "LedgerAPIErrorWithMessage": () => (/* binding */ LedgerAPIErrorWithMessage),
/* harmony export */   "LedgerAPINotAvailable": () => (/* binding */ LedgerAPINotAvailable),
/* harmony export */   "MCUNotGenuineToDashboard": () => (/* binding */ MCUNotGenuineToDashboard),
/* harmony export */   "ManagerAppAlreadyInstalledError": () => (/* binding */ ManagerAppAlreadyInstalledError),
/* harmony export */   "ManagerAppDepInstallRequired": () => (/* binding */ ManagerAppDepInstallRequired),
/* harmony export */   "ManagerAppDepUninstallRequired": () => (/* binding */ ManagerAppDepUninstallRequired),
/* harmony export */   "ManagerAppRelyOnBTCError": () => (/* binding */ ManagerAppRelyOnBTCError),
/* harmony export */   "ManagerDeviceLockedError": () => (/* binding */ ManagerDeviceLockedError),
/* harmony export */   "ManagerFirmwareNotEnoughSpaceError": () => (/* binding */ ManagerFirmwareNotEnoughSpaceError),
/* harmony export */   "ManagerNotEnoughSpaceError": () => (/* binding */ ManagerNotEnoughSpaceError),
/* harmony export */   "ManagerUninstallBTCDep": () => (/* binding */ ManagerUninstallBTCDep),
/* harmony export */   "NetworkDown": () => (/* binding */ NetworkDown),
/* harmony export */   "NoAccessToCamera": () => (/* binding */ NoAccessToCamera),
/* harmony export */   "NoAddressesFound": () => (/* binding */ NoAddressesFound),
/* harmony export */   "NoDBPathGiven": () => (/* binding */ NoDBPathGiven),
/* harmony export */   "NotEnoughBalance": () => (/* binding */ NotEnoughBalance),
/* harmony export */   "NotEnoughBalanceBecauseDestinationNotCreated": () => (/* binding */ NotEnoughBalanceBecauseDestinationNotCreated),
/* harmony export */   "NotEnoughBalanceInParentAccount": () => (/* binding */ NotEnoughBalanceInParentAccount),
/* harmony export */   "NotEnoughBalanceToDelegate": () => (/* binding */ NotEnoughBalanceToDelegate),
/* harmony export */   "NotEnoughGas": () => (/* binding */ NotEnoughGas),
/* harmony export */   "NotEnoughSpendableBalance": () => (/* binding */ NotEnoughSpendableBalance),
/* harmony export */   "NotSupportedLegacyAddress": () => (/* binding */ NotSupportedLegacyAddress),
/* harmony export */   "PairingFailed": () => (/* binding */ PairingFailed),
/* harmony export */   "PasswordIncorrectError": () => (/* binding */ PasswordIncorrectError),
/* harmony export */   "PasswordsDontMatchError": () => (/* binding */ PasswordsDontMatchError),
/* harmony export */   "RecipientRequired": () => (/* binding */ RecipientRequired),
/* harmony export */   "RecommendSubAccountsToEmpty": () => (/* binding */ RecommendSubAccountsToEmpty),
/* harmony export */   "RecommendUndelegation": () => (/* binding */ RecommendUndelegation),
/* harmony export */   "StatusCodes": () => (/* binding */ StatusCodes),
/* harmony export */   "SyncError": () => (/* binding */ SyncError),
/* harmony export */   "TimeoutTagged": () => (/* binding */ TimeoutTagged),
/* harmony export */   "TransportError": () => (/* binding */ TransportError),
/* harmony export */   "TransportInterfaceNotAvailable": () => (/* binding */ TransportInterfaceNotAvailable),
/* harmony export */   "TransportOpenUserCancelled": () => (/* binding */ TransportOpenUserCancelled),
/* harmony export */   "TransportRaceCondition": () => (/* binding */ TransportRaceCondition),
/* harmony export */   "TransportStatusError": () => (/* binding */ TransportStatusError),
/* harmony export */   "TransportWebUSBGestureRequired": () => (/* binding */ TransportWebUSBGestureRequired),
/* harmony export */   "UnavailableTezosOriginatedAccountReceive": () => (/* binding */ UnavailableTezosOriginatedAccountReceive),
/* harmony export */   "UnavailableTezosOriginatedAccountSend": () => (/* binding */ UnavailableTezosOriginatedAccountSend),
/* harmony export */   "UnexpectedBootloader": () => (/* binding */ UnexpectedBootloader),
/* harmony export */   "UnknownMCU": () => (/* binding */ UnknownMCU),
/* harmony export */   "UpdateFetchFileFail": () => (/* binding */ UpdateFetchFileFail),
/* harmony export */   "UpdateIncorrectHash": () => (/* binding */ UpdateIncorrectHash),
/* harmony export */   "UpdateIncorrectSig": () => (/* binding */ UpdateIncorrectSig),
/* harmony export */   "UpdateYourApp": () => (/* binding */ UpdateYourApp),
/* harmony export */   "UserRefusedAddress": () => (/* binding */ UserRefusedAddress),
/* harmony export */   "UserRefusedAllowManager": () => (/* binding */ UserRefusedAllowManager),
/* harmony export */   "UserRefusedDeviceNameChange": () => (/* binding */ UserRefusedDeviceNameChange),
/* harmony export */   "UserRefusedFirmwareUpdate": () => (/* binding */ UserRefusedFirmwareUpdate),
/* harmony export */   "UserRefusedOnDevice": () => (/* binding */ UserRefusedOnDevice),
/* harmony export */   "WebsocketConnectionError": () => (/* binding */ WebsocketConnectionError),
/* harmony export */   "WebsocketConnectionFailed": () => (/* binding */ WebsocketConnectionFailed),
/* harmony export */   "WrongAppForCurrency": () => (/* binding */ WrongAppForCurrency),
/* harmony export */   "WrongDeviceForAccount": () => (/* binding */ WrongDeviceForAccount),
/* harmony export */   "addCustomErrorDeserializer": () => (/* reexport safe */ _helpers__WEBPACK_IMPORTED_MODULE_0__.addCustomErrorDeserializer),
/* harmony export */   "createCustomErrorClass": () => (/* reexport safe */ _helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass),
/* harmony export */   "deserializeError": () => (/* reexport safe */ _helpers__WEBPACK_IMPORTED_MODULE_0__.deserializeError),
/* harmony export */   "getAltStatusMessage": () => (/* binding */ getAltStatusMessage),
/* harmony export */   "serializeError": () => (/* reexport safe */ _helpers__WEBPACK_IMPORTED_MODULE_0__.serializeError)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./node_modules/@ledgerhq/errors/lib-es/helpers.js");


var AccountNameRequiredError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("AccountNameRequired");
var AccountNotSupported = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("AccountNotSupported");
var AmountRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("AmountRequired");
var BluetoothRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("BluetoothRequired");
var BtcUnmatchedApp = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("BtcUnmatchedApp");
var CantOpenDevice = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("CantOpenDevice");
var CashAddrNotSupported = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("CashAddrNotSupported");
var CurrencyNotSupported = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("CurrencyNotSupported");
var DeviceAppVerifyNotSupported = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceAppVerifyNotSupported");
var DeviceGenuineSocketEarlyClose = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceGenuineSocketEarlyClose");
var DeviceNotGenuineError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceNotGenuine");
var DeviceOnDashboardExpected = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceOnDashboardExpected");
var DeviceOnDashboardUnexpected = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceOnDashboardUnexpected");
var DeviceInOSUExpected = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceInOSUExpected");
var DeviceHalted = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceHalted");
var DeviceNameInvalid = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceNameInvalid");
var DeviceSocketFail = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceSocketFail");
var DeviceSocketNoBulkStatus = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceSocketNoBulkStatus");
var DisconnectedDevice = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DisconnectedDevice");
var DisconnectedDeviceDuringOperation = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DisconnectedDeviceDuringOperation");
var EnpointConfigError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("EnpointConfig");
var EthAppPleaseEnableContractData = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("EthAppPleaseEnableContractData");
var FeeEstimationFailed = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("FeeEstimationFailed");
var FirmwareNotRecognized = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("FirmwareNotRecognized");
var HardResetFail = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("HardResetFail");
var InvalidXRPTag = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("InvalidXRPTag");
var InvalidAddress = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("InvalidAddress");
var InvalidAddressBecauseDestinationIsAlsoSource = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("InvalidAddressBecauseDestinationIsAlsoSource");
var LatestMCUInstalledError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("LatestMCUInstalledError");
var UnknownMCU = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UnknownMCU");
var LedgerAPIError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("LedgerAPIError");
var LedgerAPIErrorWithMessage = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("LedgerAPIErrorWithMessage");
var LedgerAPINotAvailable = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("LedgerAPINotAvailable");
var ManagerAppAlreadyInstalledError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerAppAlreadyInstalled");
var ManagerAppRelyOnBTCError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerAppRelyOnBTC");
var ManagerAppDepInstallRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerAppDepInstallRequired");
var ManagerAppDepUninstallRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerAppDepUninstallRequired");
var ManagerDeviceLockedError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerDeviceLocked");
var ManagerFirmwareNotEnoughSpaceError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerFirmwareNotEnoughSpace");
var ManagerNotEnoughSpaceError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerNotEnoughSpace");
var ManagerUninstallBTCDep = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerUninstallBTCDep");
var NetworkDown = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NetworkDown");
var NoAddressesFound = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NoAddressesFound");
var NotEnoughBalance = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotEnoughBalance");
var NotEnoughBalanceToDelegate = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotEnoughBalanceToDelegate");
var NotEnoughBalanceInParentAccount = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotEnoughBalanceInParentAccount");
var NotEnoughSpendableBalance = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotEnoughSpendableBalance");
var NotEnoughBalanceBecauseDestinationNotCreated = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotEnoughBalanceBecauseDestinationNotCreated");
var NoAccessToCamera = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NoAccessToCamera");
var NotEnoughGas = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotEnoughGas");
var NotSupportedLegacyAddress = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotSupportedLegacyAddress");
var GasLessThanEstimate = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("GasLessThanEstimate");
var PasswordsDontMatchError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("PasswordsDontMatch");
var PasswordIncorrectError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("PasswordIncorrect");
var RecommendSubAccountsToEmpty = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("RecommendSubAccountsToEmpty");
var RecommendUndelegation = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("RecommendUndelegation");
var TimeoutTagged = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("TimeoutTagged");
var UnexpectedBootloader = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UnexpectedBootloader");
var MCUNotGenuineToDashboard = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("MCUNotGenuineToDashboard");
var RecipientRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("RecipientRequired");
var UnavailableTezosOriginatedAccountReceive = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UnavailableTezosOriginatedAccountReceive");
var UnavailableTezosOriginatedAccountSend = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UnavailableTezosOriginatedAccountSend");
var UpdateFetchFileFail = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UpdateFetchFileFail");
var UpdateIncorrectHash = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UpdateIncorrectHash");
var UpdateIncorrectSig = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UpdateIncorrectSig");
var UpdateYourApp = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UpdateYourApp");
var UserRefusedDeviceNameChange = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UserRefusedDeviceNameChange");
var UserRefusedAddress = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UserRefusedAddress");
var UserRefusedFirmwareUpdate = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UserRefusedFirmwareUpdate");
var UserRefusedAllowManager = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UserRefusedAllowManager");
var UserRefusedOnDevice = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UserRefusedOnDevice"); // TODO rename because it's just for transaction refusal
var TransportOpenUserCancelled = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("TransportOpenUserCancelled");
var TransportInterfaceNotAvailable = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("TransportInterfaceNotAvailable");
var TransportRaceCondition = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("TransportRaceCondition");
var TransportWebUSBGestureRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("TransportWebUSBGestureRequired");
var DeviceShouldStayInApp = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceShouldStayInApp");
var WebsocketConnectionError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("WebsocketConnectionError");
var WebsocketConnectionFailed = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("WebsocketConnectionFailed");
var WrongDeviceForAccount = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("WrongDeviceForAccount");
var WrongAppForCurrency = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("WrongAppForCurrency");
var ETHAddressNonEIP = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ETHAddressNonEIP");
var CantScanQRCode = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("CantScanQRCode");
var FeeNotLoaded = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("FeeNotLoaded");
var FeeRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("FeeRequired");
var FeeTooHigh = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("FeeTooHigh");
var SyncError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("SyncError");
var PairingFailed = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("PairingFailed");
var GenuineCheckFailed = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("GenuineCheckFailed");
var LedgerAPI4xx = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("LedgerAPI4xx");
var LedgerAPI5xx = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("LedgerAPI5xx");
var FirmwareOrAppUpdateRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("FirmwareOrAppUpdateRequired");
// db stuff, no need to translate
var NoDBPathGiven = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NoDBPathGiven");
var DBWrongPassword = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DBWrongPassword");
var DBNotReset = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DBNotReset");
/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the device for various reason.
 */
function TransportError(message, id) {
    this.name = "TransportError";
    this.message = message;
    this.stack = new Error().stack;
    this.id = id;
}
TransportError.prototype = new Error();
(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.addCustomErrorDeserializer)("TransportError", function (e) { return new TransportError(e.message, e.id); });
var StatusCodes = {
    PIN_REMAINING_ATTEMPTS: 0x63c0,
    INCORRECT_LENGTH: 0x6700,
    MISSING_CRITICAL_PARAMETER: 0x6800,
    COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
    SECURITY_STATUS_NOT_SATISFIED: 0x6982,
    CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
    INCORRECT_DATA: 0x6a80,
    NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
    REFERENCED_DATA_NOT_FOUND: 0x6a88,
    FILE_ALREADY_EXISTS: 0x6a89,
    INCORRECT_P1_P2: 0x6b00,
    INS_NOT_SUPPORTED: 0x6d00,
    CLA_NOT_SUPPORTED: 0x6e00,
    TECHNICAL_PROBLEM: 0x6f00,
    OK: 0x9000,
    MEMORY_PROBLEM: 0x9240,
    NO_EF_SELECTED: 0x9400,
    INVALID_OFFSET: 0x9402,
    FILE_NOT_FOUND: 0x9404,
    INCONSISTENT_FILE: 0x9408,
    ALGORITHM_NOT_SUPPORTED: 0x9484,
    INVALID_KCV: 0x9485,
    CODE_NOT_INITIALIZED: 0x9802,
    ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
    CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
    CONTRADICTION_INVALIDATION: 0x9810,
    CODE_BLOCKED: 0x9840,
    MAX_VALUE_REACHED: 0x9850,
    GP_AUTH_FAILED: 0x6300,
    LICENSING: 0x6f42,
    HALTED: 0x6faa
};
function getAltStatusMessage(code) {
    switch (code) {
        // improve text of most common errors
        case 0x6700:
            return "Incorrect length";
        case 0x6800:
            return "Missing critical parameter";
        case 0x6982:
            return "Security not satisfied (dongle locked or have invalid access rights)";
        case 0x6985:
            return "Condition of use not satisfied (denied by the user?)";
        case 0x6a80:
            return "Invalid data received";
        case 0x6b00:
            return "Invalid parameter received";
    }
    if (0x6f00 <= code && code <= 0x6fff) {
        return "Internal error, please report";
    }
}
/**
 * Error thrown when a device returned a non success status.
 * the error.statusCode is one of the `StatusCodes` exported by this library.
 */
function TransportStatusError(statusCode) {
    this.name = "TransportStatusError";
    var statusText = Object.keys(StatusCodes).find(function (k) { return StatusCodes[k] === statusCode; }) ||
        "UNKNOWN_ERROR";
    var smsg = getAltStatusMessage(statusCode) || statusText;
    var statusCodeStr = statusCode.toString(16);
    this.message = "Ledger device: " + smsg + " (0x" + statusCodeStr + ")";
    this.stack = new Error().stack;
    this.statusCode = statusCode;
    this.statusText = statusText;
}
TransportStatusError.prototype = new Error();
(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.addCustomErrorDeserializer)("TransportStatusError", function (e) { return new TransportStatusError(e.statusCode); });
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@ledgerhq/hw-transport-webusb/lib-es/TransportWebUSB.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@ledgerhq/hw-transport-webusb/lib-es/TransportWebUSB.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ledgerhq_hw_transport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ledgerhq/hw-transport */ "./node_modules/@ledgerhq/hw-transport/lib-es/Transport.js");
/* harmony import */ var _ledgerhq_devices_lib_hid_framing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ledgerhq/devices/lib/hid-framing */ "./node_modules/@ledgerhq/devices/lib/hid-framing.js");
/* harmony import */ var _ledgerhq_devices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ledgerhq/devices */ "./node_modules/@ledgerhq/devices/lib-es/index.js");
/* harmony import */ var _ledgerhq_logs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ledgerhq/logs */ "./node_modules/@ledgerhq/logs/lib-es/index.js");
/* harmony import */ var _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ledgerhq/errors */ "./node_modules/@ledgerhq/errors/lib-es/index.js");
/* harmony import */ var _webusb__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./webusb */ "./node_modules/@ledgerhq/hw-transport-webusb/lib-es/webusb.js");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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






var configurationValue = 1;
var endpointNumber = 3;
/**
 * WebUSB Transport implementation
 * @example
 * import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
 * ...
 * TransportWebUSB.create().then(transport => ...)
 */
var TransportWebUSB = /** @class */ (function (_super) {
    __extends(TransportWebUSB, _super);
    function TransportWebUSB(device, interfaceNumber) {
        var _this = _super.call(this) || this;
        _this.channel = Math.floor(Math.random() * 0xffff);
        _this.packetSize = 64;
        _this._disconnectEmitted = false;
        _this._emitDisconnect = function (e) {
            if (_this._disconnectEmitted)
                return;
            _this._disconnectEmitted = true;
            _this.emit("disconnect", e);
        };
        _this.device = device;
        _this.interfaceNumber = interfaceNumber;
        _this.deviceModel = (0,_ledgerhq_devices__WEBPACK_IMPORTED_MODULE_2__.identifyUSBProductId)(device.productId);
        return _this;
    }
    /**
     * Similar to create() except it will always display the device permission (even if some devices are already accepted).
     */
    TransportWebUSB.request = function () {
        return __awaiter(this, void 0, void 0, function () {
            var device;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0,_webusb__WEBPACK_IMPORTED_MODULE_5__.requestLedgerDevice)()];
                    case 1:
                        device = _a.sent();
                        return [2 /*return*/, TransportWebUSB.open(device)];
                }
            });
        });
    };
    /**
     * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
     */
    TransportWebUSB.openConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            var devices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0,_webusb__WEBPACK_IMPORTED_MODULE_5__.getLedgerDevices)()];
                    case 1:
                        devices = _a.sent();
                        if (devices.length === 0)
                            return [2 /*return*/, null];
                        return [2 /*return*/, TransportWebUSB.open(devices[0])];
                }
            });
        });
    };
    /**
     * Create a Ledger transport with a USBDevice
     */
    TransportWebUSB.open = function (device) {
        return __awaiter(this, void 0, void 0, function () {
            var iface, interfaceNumber, e_1, transport, onDisconnect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, device.open()];
                    case 1:
                        _a.sent();
                        if (!(device.configuration === null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, device.selectConfiguration(configurationValue)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, gracefullyResetDevice(device)];
                    case 4:
                        _a.sent();
                        iface = device.configurations[0].interfaces.find(function (_a) {
                            var alternates = _a.alternates;
                            return alternates.some(function (a) { return a.interfaceClass === 255; });
                        });
                        if (!iface) {
                            throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_4__.TransportInterfaceNotAvailable("No WebUSB interface found for your Ledger device. Please upgrade firmware or contact techsupport.");
                        }
                        interfaceNumber = iface.interfaceNumber;
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 9]);
                        return [4 /*yield*/, device.claimInterface(interfaceNumber)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        e_1 = _a.sent();
                        return [4 /*yield*/, device.close()];
                    case 8:
                        _a.sent();
                        throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_4__.TransportInterfaceNotAvailable(e_1.message);
                    case 9:
                        transport = new TransportWebUSB(device, interfaceNumber);
                        onDisconnect = function (e) {
                            if (device === e.device) {
                                // $FlowFixMe
                                navigator.usb.removeEventListener("disconnect", onDisconnect);
                                transport._emitDisconnect(new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_4__.DisconnectedDevice());
                            }
                        };
                        // $FlowFixMe
                        navigator.usb.addEventListener("disconnect", onDisconnect);
                        return [2 /*return*/, transport];
                }
            });
        });
    };
    /**
     * Release the transport device
     */
    TransportWebUSB.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exchangeBusyPromise];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.device.releaseInterface(this.interfaceNumber)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, gracefullyResetDevice(this.device)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.device.close()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Exchange with the device using APDU protocol.
     * @param apdu
     * @returns a promise of apdu response
     */
    TransportWebUSB.prototype.exchange = function (apdu) {
        return __awaiter(this, void 0, void 0, function () {
            var b;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exchangeAtomicImpl(function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, channel, packetSize, framing, blocks, i, result, acc, r, buffer;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = this, channel = _a.channel, packetSize = _a.packetSize;
                                        (0,_ledgerhq_logs__WEBPACK_IMPORTED_MODULE_3__.log)("apdu", "=> " + apdu.toString("hex"));
                                        framing = (0,_ledgerhq_devices_lib_hid_framing__WEBPACK_IMPORTED_MODULE_1__["default"])(channel, packetSize);
                                        blocks = framing.makeBlocks(apdu);
                                        i = 0;
                                        _b.label = 1;
                                    case 1:
                                        if (!(i < blocks.length)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this.device.transferOut(endpointNumber, blocks[i])];
                                    case 2:
                                        _b.sent();
                                        _b.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4:
                                        if (!!(result = framing.getReducedResult(acc))) return [3 /*break*/, 6];
                                        return [4 /*yield*/, this.device.transferIn(endpointNumber, packetSize)];
                                    case 5:
                                        r = _b.sent();
                                        buffer = Buffer.from(r.data.buffer);
                                        acc = framing.reduceResponse(acc, buffer);
                                        return [3 /*break*/, 4];
                                    case 6:
                                        (0,_ledgerhq_logs__WEBPACK_IMPORTED_MODULE_3__.log)("apdu", "<= " + result.toString("hex"));
                                        return [2 /*return*/, result];
                                }
                            });
                        }); })["catch"](function (e) {
                            if (e && e.message && e.message.includes("disconnected")) {
                                _this._emitDisconnect(e);
                                throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_4__.DisconnectedDeviceDuringOperation(e.message);
                            }
                            throw e;
                        })];
                    case 1:
                        b = _a.sent();
                        return [2 /*return*/, b];
                }
            });
        });
    };
    TransportWebUSB.prototype.setScrambleKey = function () { };
    /**
     * Check if WebUSB transport is supported.
     */
    TransportWebUSB.isSupported = _webusb__WEBPACK_IMPORTED_MODULE_5__.isSupported;
    /**
     * List the WebUSB devices that was previously authorized by the user.
     */
    TransportWebUSB.list = _webusb__WEBPACK_IMPORTED_MODULE_5__.getLedgerDevices;
    /**
     * Actively listen to WebUSB devices and emit ONE device
     * that was either accepted before, if not it will trigger the native permission UI.
     *
     * Important: it must be called in the context of a UI click!
     */
    TransportWebUSB.listen = function (observer) {
        var unsubscribed = false;
        (0,_webusb__WEBPACK_IMPORTED_MODULE_5__.getFirstLedgerDevice)().then(function (device) {
            if (!unsubscribed) {
                var deviceModel = (0,_ledgerhq_devices__WEBPACK_IMPORTED_MODULE_2__.identifyUSBProductId)(device.productId);
                observer.next({
                    type: "add",
                    descriptor: device,
                    deviceModel: deviceModel
                });
                observer.complete();
            }
        }, function (error) {
            if (window.DOMException &&
                error instanceof window.DOMException &&
                error.code === 18) {
                observer.error(new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_4__.TransportWebUSBGestureRequired(error.message));
            }
            else {
                observer.error(new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_4__.TransportOpenUserCancelled(error.message));
            }
        });
        function unsubscribe() {
            unsubscribed = true;
        }
        return {
            unsubscribe: unsubscribe
        };
    };
    return TransportWebUSB;
}(_ledgerhq_hw_transport__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TransportWebUSB);
function gracefullyResetDevice(device) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, device.reset()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.warn(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=TransportWebUSB.js.map

/***/ }),

/***/ "./node_modules/@ledgerhq/hw-transport-webusb/lib-es/webusb.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@ledgerhq/hw-transport-webusb/lib-es/webusb.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFirstLedgerDevice": () => (/* binding */ getFirstLedgerDevice),
/* harmony export */   "getLedgerDevices": () => (/* binding */ getLedgerDevices),
/* harmony export */   "isSupported": () => (/* binding */ isSupported),
/* harmony export */   "requestLedgerDevice": () => (/* binding */ requestLedgerDevice)
/* harmony export */ });
/* harmony import */ var _ledgerhq_devices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ledgerhq/devices */ "./node_modules/@ledgerhq/devices/lib-es/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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

var ledgerDevices = [
    {
        vendorId: _ledgerhq_devices__WEBPACK_IMPORTED_MODULE_0__.ledgerUSBVendorId
    },
];
function requestLedgerDevice() {
    return __awaiter(this, void 0, void 0, function () {
        var device;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, navigator.usb.requestDevice({
                        filters: ledgerDevices
                    })];
                case 1:
                    device = _a.sent();
                    return [2 /*return*/, device];
            }
        });
    });
}
function getLedgerDevices() {
    return __awaiter(this, void 0, void 0, function () {
        var devices;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, navigator.usb.getDevices()];
                case 1:
                    devices = _a.sent();
                    return [2 /*return*/, devices.filter(function (d) { return d.vendorId === _ledgerhq_devices__WEBPACK_IMPORTED_MODULE_0__.ledgerUSBVendorId; })];
            }
        });
    });
}
function getFirstLedgerDevice() {
    return __awaiter(this, void 0, void 0, function () {
        var existingDevices;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getLedgerDevices()];
                case 1:
                    existingDevices = _a.sent();
                    if (existingDevices.length > 0)
                        return [2 /*return*/, existingDevices[0]];
                    return [2 /*return*/, requestLedgerDevice()];
            }
        });
    });
}
var isSupported = function () {
    return Promise.resolve(!!navigator &&
        !!navigator.usb &&
        typeof navigator.usb.getDevices === "function");
};
//# sourceMappingURL=webusb.js.map

/***/ }),

/***/ "./node_modules/@ledgerhq/hw-transport/lib-es/Transport.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@ledgerhq/hw-transport/lib-es/Transport.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatusCodes": () => (/* reexport safe */ _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.StatusCodes),
/* harmony export */   "TransportError": () => (/* reexport safe */ _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportError),
/* harmony export */   "TransportStatusError": () => (/* reexport safe */ _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportStatusError),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getAltStatusMessage": () => (/* reexport safe */ _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.getAltStatusMessage)
/* harmony export */ });
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ledgerhq/errors */ "./node_modules/@ledgerhq/errors/lib-es/index.js");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};



/**
 * Transport defines the generic interface to share between node/u2f impl
 * A **Descriptor** is a parametric type that is up to be determined for the implementation.
 * it can be for instance an ID, an file path, a URL,...
 */
var Transport = /** @class */ (function () {
    function Transport() {
        var _this = this;
        this.exchangeTimeout = 30000;
        this.unresponsiveTimeout = 15000;
        this.deviceModel = null;
        this._events = new (events__WEBPACK_IMPORTED_MODULE_0___default())();
        /**
         * wrapper on top of exchange to simplify work of the implementation.
         * @param cla
         * @param ins
         * @param p1
         * @param p2
         * @param data
         * @param statusList is a list of accepted status code (shorts). [0x9000] by default
         * @return a Promise of response buffer
         */
        this.send = function (cla, ins, p1, p2, data, statusList) {
            if (data === void 0) { data = Buffer.alloc(0); }
            if (statusList === void 0) { statusList = [_ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.StatusCodes.OK]; }
            return __awaiter(_this, void 0, void 0, function () {
                var response, sw;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (data.length >= 256) {
                                throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportError("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");
                            }
                            return [4 /*yield*/, this.exchange(Buffer.concat([
                                    Buffer.from([cla, ins, p1, p2]),
                                    Buffer.from([data.length]),
                                    data,
                                ]))];
                        case 1:
                            response = _a.sent();
                            sw = response.readUInt16BE(response.length - 2);
                            if (!statusList.some(function (s) { return s === sw; })) {
                                throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportStatusError(sw);
                            }
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        this.exchangeAtomicImpl = function (f) { return __awaiter(_this, void 0, void 0, function () {
            var resolveBusy, busyPromise, unresponsiveReached, timeout, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.exchangeBusyPromise) {
                            throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");
                        }
                        busyPromise = new Promise(function (r) {
                            resolveBusy = r;
                        });
                        this.exchangeBusyPromise = busyPromise;
                        unresponsiveReached = false;
                        timeout = setTimeout(function () {
                            unresponsiveReached = true;
                            _this.emit("unresponsive");
                        }, this.unresponsiveTimeout);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, f()];
                    case 2:
                        res = _a.sent();
                        if (unresponsiveReached) {
                            this.emit("responsive");
                        }
                        return [2 /*return*/, res];
                    case 3:
                        clearTimeout(timeout);
                        if (resolveBusy)
                            resolveBusy();
                        this.exchangeBusyPromise = null;
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this._appAPIlock = null;
    }
    /**
     * low level api to communicate with the device
     * This method is for implementations to implement but should not be directly called.
     * Instead, the recommanded way is to use send() method
     * @param apdu the data to send
     * @return a Promise of response data
     */
    Transport.prototype.exchange = function (_apdu) {
        throw new Error("exchange not implemented");
    };
    /**
     * set the "scramble key" for the next exchanges with the device.
     * Each App can have a different scramble key and they internally will set it at instanciation.
     * @param key the scramble key
     */
    Transport.prototype.setScrambleKey = function (_key) { };
    /**
     * close the exchange with the device.
     * @return a Promise that ends when the transport is closed.
     */
    Transport.prototype.close = function () {
        return Promise.resolve();
    };
    /**
     * Listen to an event on an instance of transport.
     * Transport implementation can have specific events. Here is the common events:
     * * `"disconnect"` : triggered if Transport is disconnected
     */
    Transport.prototype.on = function (eventName, cb) {
        this._events.on(eventName, cb);
    };
    /**
     * Stop listening to an event on an instance of transport.
     */
    Transport.prototype.off = function (eventName, cb) {
        this._events.removeListener(eventName, cb);
    };
    Transport.prototype.emit = function (event) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = this._events).emit.apply(_a, __spreadArray([event], __read(args), false));
    };
    /**
     * Enable or not logs of the binary exchange
     */
    Transport.prototype.setDebugMode = function () {
        console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.");
    };
    /**
     * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
     */
    Transport.prototype.setExchangeTimeout = function (exchangeTimeout) {
        this.exchangeTimeout = exchangeTimeout;
    };
    /**
     * Define the delay before emitting "unresponsive" on an exchange that does not respond
     */
    Transport.prototype.setExchangeUnresponsiveTimeout = function (unresponsiveTimeout) {
        this.unresponsiveTimeout = unresponsiveTimeout;
    };
    /**
     * create() allows to open the first descriptor available or
     * throw if there is none or if timeout is reached.
     * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
     * @example
    TransportFoo.create().then(transport => ...)
     */
    Transport.create = function (openTimeout, listenTimeout) {
        var _this = this;
        if (openTimeout === void 0) { openTimeout = 3000; }
        return new Promise(function (resolve, reject) {
            var found = false;
            var sub = _this.listen({
                next: function (e) {
                    found = true;
                    if (sub)
                        sub.unsubscribe();
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    _this.open(e.descriptor, openTimeout).then(resolve, reject);
                },
                error: function (e) {
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    reject(e);
                },
                complete: function () {
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    if (!found) {
                        reject(new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportError(_this.ErrorMessage_NoDeviceFound, "NoDeviceFound"));
                    }
                }
            });
            var listenTimeoutId = listenTimeout
                ? setTimeout(function () {
                    sub.unsubscribe();
                    reject(new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportError(_this.ErrorMessage_ListenTimeout, "ListenTimeout"));
                }, listenTimeout)
                : null;
        });
    };
    Transport.prototype.decorateAppAPIMethods = function (self, methods, scrambleKey) {
        var e_1, _a;
        try {
            for (var methods_1 = __values(methods), methods_1_1 = methods_1.next(); !methods_1_1.done; methods_1_1 = methods_1.next()) {
                var methodName = methods_1_1.value;
                self[methodName] = this.decorateAppAPIMethod(methodName, self[methodName], self, scrambleKey);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (methods_1_1 && !methods_1_1.done && (_a = methods_1["return"])) _a.call(methods_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Transport.prototype.decorateAppAPIMethod = function (methodName, f, ctx, scrambleKey) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var _appAPIlock;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _appAPIlock = this._appAPIlock;
                            if (_appAPIlock) {
                                return [2 /*return*/, Promise.reject(new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportError("Ledger Device is busy (lock " + _appAPIlock + ")", "TransportLocked"))];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, , 3, 4]);
                            this._appAPIlock = methodName;
                            this.setScrambleKey(scrambleKey);
                            return [4 /*yield*/, f.apply(ctx, args)];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            this._appAPIlock = null;
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
    };
    Transport.ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
    Transport.ErrorMessage_NoDeviceFound = "No Ledger device found";
    return Transport;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Transport);
//# sourceMappingURL=Transport.js.map

/***/ }),

/***/ "./node_modules/@ledgerhq/logs/lib-es/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@ledgerhq/logs/lib-es/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "listen": () => (/* binding */ listen),
/* harmony export */   "log": () => (/* binding */ log)
/* harmony export */ });
var id = 0;
var subscribers = [];
/**
 * log something
 * @param type a namespaced identifier of the log (it is not a level like "debug", "error" but more like "apdu-in", "apdu-out", etc...)
 * @param message a clear message of the log associated to the type
 */
var log = function (type, message, data) {
    var obj = {
        type: type,
        id: String(++id),
        date: new Date()
    };
    if (message)
        obj.message = message;
    if (data)
        obj.data = data;
    dispatch(obj);
};
/**
 * listen to logs.
 * @param cb that is called for each future log() with the Log object
 * @return a function that can be called to unsubscribe the listener
 */
var listen = function (cb) {
    subscribers.push(cb);
    return function () {
        var i = subscribers.indexOf(cb);
        if (i !== -1) {
            // equivalent of subscribers.splice(i, 1) // https://twitter.com/Rich_Harris/status/1125850391155965952
            subscribers[i] = subscribers[subscribers.length - 1];
            subscribers.pop();
        }
    };
};
function dispatch(log) {
    for (var i = 0; i < subscribers.length; i++) {
        try {
            subscribers[i](log);
        }
        catch (e) {
            console.error(e);
        }
    }
}
if (typeof window !== "undefined") {
    window.__ledgerLogsListen = listen;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@zondax/ledger-casper/dist/common.js":
/*!***********************************************************!*\
  !*** ./node_modules/@zondax/ledger-casper/dist/common.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

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
var _a;
exports.__esModule = true;
exports.serializePath = exports.getVersion = exports.processErrorResponse = exports.errorCodeToString = exports.ERROR_DESCRIPTION = exports.LedgerError = exports.SIGLEN = exports.PKLEN = exports.P1_VALUES = exports.PAYLOAD_TYPE = exports.INS = exports.APP_KEY = exports.CHUNK_SIZE = exports.CLA = void 0;
exports.CLA = 0x11;
exports.CHUNK_SIZE = 250;
exports.APP_KEY = 'DFN';
exports.INS = {
    GET_VERSION: 0x00,
    GET_ADDR_SECP256K1: 0x01,
    SIGN_SECP256K1: 0x02
};
exports.PAYLOAD_TYPE = {
    INIT: 0x00,
    ADD: 0x01,
    LAST: 0x02
};
exports.P1_VALUES = {
    ONLY_RETRIEVE: 0x00,
    SHOW_ADDRESS_IN_DEVICE: 0x01
};
exports.PKLEN = 33;
exports.SIGLEN = 64;
var LedgerError;
(function (LedgerError) {
    LedgerError[LedgerError["U2FUnknown"] = 1] = "U2FUnknown";
    LedgerError[LedgerError["U2FBadRequest"] = 2] = "U2FBadRequest";
    LedgerError[LedgerError["U2FConfigurationUnsupported"] = 3] = "U2FConfigurationUnsupported";
    LedgerError[LedgerError["U2FDeviceIneligible"] = 4] = "U2FDeviceIneligible";
    LedgerError[LedgerError["U2FTimeout"] = 5] = "U2FTimeout";
    LedgerError[LedgerError["Timeout"] = 14] = "Timeout";
    LedgerError[LedgerError["NoErrors"] = 36864] = "NoErrors";
    LedgerError[LedgerError["DeviceIsBusy"] = 36865] = "DeviceIsBusy";
    LedgerError[LedgerError["ErrorDerivingKeys"] = 26626] = "ErrorDerivingKeys";
    LedgerError[LedgerError["ExecutionError"] = 25600] = "ExecutionError";
    LedgerError[LedgerError["WrongLength"] = 26368] = "WrongLength";
    LedgerError[LedgerError["EmptyBuffer"] = 27010] = "EmptyBuffer";
    LedgerError[LedgerError["OutputBufferTooSmall"] = 27011] = "OutputBufferTooSmall";
    LedgerError[LedgerError["DataIsInvalid"] = 27012] = "DataIsInvalid";
    LedgerError[LedgerError["ConditionsNotSatisfied"] = 27013] = "ConditionsNotSatisfied";
    LedgerError[LedgerError["TransactionRejected"] = 27014] = "TransactionRejected";
    LedgerError[LedgerError["BadKeyHandle"] = 27264] = "BadKeyHandle";
    LedgerError[LedgerError["InvalidP1P2"] = 27392] = "InvalidP1P2";
    LedgerError[LedgerError["InstructionNotSupported"] = 27904] = "InstructionNotSupported";
    LedgerError[LedgerError["AppDoesNotSeemToBeOpen"] = 28160] = "AppDoesNotSeemToBeOpen";
    LedgerError[LedgerError["UnknownError"] = 28416] = "UnknownError";
    LedgerError[LedgerError["SignVerifyError"] = 28417] = "SignVerifyError";
})(LedgerError = exports.LedgerError || (exports.LedgerError = {}));
exports.ERROR_DESCRIPTION = (_a = {},
    _a[LedgerError.U2FUnknown] = 'U2F: Unknown',
    _a[LedgerError.U2FBadRequest] = 'U2F: Bad request',
    _a[LedgerError.U2FConfigurationUnsupported] = 'U2F: Configuration unsupported',
    _a[LedgerError.U2FDeviceIneligible] = 'U2F: Device Ineligible',
    _a[LedgerError.U2FTimeout] = 'U2F: Timeout',
    _a[LedgerError.Timeout] = 'Timeout',
    _a[LedgerError.NoErrors] = 'No errors',
    _a[LedgerError.DeviceIsBusy] = 'Device is busy',
    _a[LedgerError.ErrorDerivingKeys] = 'Error deriving keys',
    _a[LedgerError.ExecutionError] = 'Execution Error',
    _a[LedgerError.WrongLength] = 'Wrong Length',
    _a[LedgerError.EmptyBuffer] = 'Empty Buffer',
    _a[LedgerError.OutputBufferTooSmall] = 'Output buffer too small',
    _a[LedgerError.DataIsInvalid] = 'Data is invalid',
    _a[LedgerError.ConditionsNotSatisfied] = 'Conditions not satisfied',
    _a[LedgerError.TransactionRejected] = 'Transaction rejected',
    _a[LedgerError.BadKeyHandle] = 'Bad key handle',
    _a[LedgerError.InvalidP1P2] = 'Invalid P1/P2',
    _a[LedgerError.InstructionNotSupported] = 'Instruction not supported',
    _a[LedgerError.AppDoesNotSeemToBeOpen] = 'App does not seem to be open',
    _a[LedgerError.UnknownError] = 'Unknown error',
    _a[LedgerError.SignVerifyError] = 'Sign/verify error',
    _a);
function errorCodeToString(statusCode) {
    if (statusCode in exports.ERROR_DESCRIPTION)
        return exports.ERROR_DESCRIPTION[statusCode];
    return "Unknown Status Code: " + statusCode;
}
exports.errorCodeToString = errorCodeToString;
function isDict(v) {
    return typeof v === 'object' && v !== null && !(v instanceof Array) && !(v instanceof Date);
}
function processErrorResponse(response) {
    if (response) {
        if (isDict(response)) {
            if (Object.prototype.hasOwnProperty.call(response, 'statusCode')) {
                return {
                    returnCode: response.statusCode,
                    errorMessage: errorCodeToString(response.statusCode)
                };
            }
            if (Object.prototype.hasOwnProperty.call(response, 'returnCode') &&
                Object.prototype.hasOwnProperty.call(response, 'errorMessage')) {
                return response;
            }
        }
        return {
            returnCode: 0xffff,
            errorMessage: response.toString()
        };
    }
    return {
        returnCode: 0xffff,
        errorMessage: response.toString()
    };
}
exports.processErrorResponse = processErrorResponse;
function getVersion(transport) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, transport.send(exports.CLA, exports.INS.GET_VERSION, 0, 0).then(function (response) {
                    var errorCodeData = response.slice(-2);
                    var returnCode = (errorCodeData[0] * 256 + errorCodeData[1]);
                    var targetId = 0;
                    if (response.length >= 9) {
                        /* eslint-disable no-bitwise */
                        targetId =
                            (response[5] << 24) + (response[6] << 16) + (response[7] << 8) + (response[8] << 0);
                        /* eslint-enable no-bitwise */
                    }
                    return {
                        returnCode: returnCode,
                        errorMessage: errorCodeToString(returnCode),
                        testMode: response[0] !== 0,
                        major: response[1],
                        minor: response[2],
                        patch: response[3],
                        deviceLocked: response[4] === 1,
                        targetId: targetId.toString(16)
                    };
                }, processErrorResponse)];
        });
    });
}
exports.getVersion = getVersion;
var HARDENED = 0x80000000;
function serializePath(path) {
    if (!path.startsWith('m')) {
        throw new Error('Path should start with "m" (e.g "m/44\'/5757\'/5\'/0/3")');
    }
    var pathArray = path.split('/');
    if (pathArray.length !== 6) {
        throw new Error("Invalid path. (e.g \"m/44'/5757'/5'/0/3\")");
    }
    var buf = Buffer.alloc(20);
    for (var i = 1; i < pathArray.length; i += 1) {
        var value = 0;
        var child = pathArray[i];
        if (child.endsWith("'")) {
            value += HARDENED;
            child = child.slice(0, -1);
        }
        var childNumber = Number(child);
        if (Number.isNaN(childNumber)) {
            throw new Error("Invalid path : " + child + " is not a number. (e.g \"m/44'/461'/5'/0/3\")");
        }
        if (childNumber >= HARDENED) {
            throw new Error('Incorrect child value (bigger or equal to 0x80000000)');
        }
        value += childNumber;
        buf.writeUInt32LE(value, 4 * (i - 1));
    }
    return buf;
}
exports.serializePath = serializePath;


/***/ }),

/***/ "./node_modules/@zondax/ledger-casper/dist/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@zondax/ledger-casper/dist/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.LedgerError = void 0;
var common_1 = __webpack_require__(/*! ./common */ "./node_modules/@zondax/ledger-casper/dist/common.js");
exports.LedgerError = common_1.LedgerError;
__exportStar(__webpack_require__(/*! ./types */ "./node_modules/@zondax/ledger-casper/dist/types.js"), exports);
function processGetAddrResponse(response) {
    var partialResponse = response;
    var errorCodeData = partialResponse.slice(-2);
    var returnCode = (errorCodeData[0] * 256 + errorCodeData[1]);
    var publicKey = Buffer.from(partialResponse.slice(0, common_1.PKLEN));
    return {
        publicKey: publicKey,
        returnCode: returnCode,
        errorMessage: common_1.errorCodeToString(returnCode)
    };
}
var CasperApp = /** @class */ (function () {
    function CasperApp(transport) {
        if (!transport) {
            throw new Error('Transport has not been defined');
        }
        this.transport = transport;
    }
    CasperApp.prepareChunks = function (serializedPathBuffer, message) {
        var chunks = [];
        // First chunk (only path)
        chunks.push(serializedPathBuffer);
        var messageBuffer = Buffer.from(message);
        var buffer = Buffer.concat([messageBuffer]);
        for (var i = 0; i < buffer.length; i += common_1.CHUNK_SIZE) {
            var end = i + common_1.CHUNK_SIZE;
            if (i > buffer.length) {
                end = buffer.length;
            }
            chunks.push(buffer.slice(i, end));
        }
        return chunks;
    };
    CasperApp.prototype.signGetChunks = function (path, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, CasperApp.prepareChunks(common_1.serializePath(path), message)];
            });
        });
    };
    CasperApp.prototype.getVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, common_1.getVersion(this.transport)["catch"](function (err) { return common_1.processErrorResponse(err); })];
            });
        });
    };
    CasperApp.prototype.getAppInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.transport.send(0xb0, 0x01, 0, 0).then(function (response) {
                        var errorCodeData = response.slice(-2);
                        var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
                        var result = {};
                        var appName = 'err';
                        var appVersion = 'err';
                        var flagLen = 0;
                        var flagsValue = 0;
                        if (response[0] !== 1) {
                            // Ledger responds with format ID 1. There is no spec for any format != 1
                            result.errorMessage = 'response format ID not recognized';
                            result.returnCode = common_1.LedgerError.DeviceIsBusy;
                        }
                        else {
                            var appNameLen = response[1];
                            appName = response.slice(2, 2 + appNameLen).toString('ascii');
                            var idx = 2 + appNameLen;
                            var appVersionLen = response[idx];
                            idx += 1;
                            appVersion = response.slice(idx, idx + appVersionLen).toString('ascii');
                            idx += appVersionLen;
                            var appFlagsLen = response[idx];
                            idx += 1;
                            flagLen = appFlagsLen;
                            flagsValue = response[idx];
                        }
                        return {
                            returnCode: returnCode,
                            errorMessage: common_1.errorCodeToString(returnCode),
                            //
                            appName: appName,
                            appVersion: appVersion,
                            flagLen: flagLen,
                            flagsValue: flagsValue,
                            flagRecovery: (flagsValue & 1) !== 0,
                            // eslint-disable-next-line no-bitwise
                            flagSignedMcuCode: (flagsValue & 2) !== 0,
                            // eslint-disable-next-line no-bitwise
                            flagOnboarded: (flagsValue & 4) !== 0,
                            // eslint-disable-next-line no-bitwise
                            flagPINValidated: (flagsValue & 128) !== 0
                        };
                    }, common_1.processErrorResponse)];
            });
        });
    };
    CasperApp.prototype.getAddressAndPubKey = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var serializedPath;
            return __generator(this, function (_a) {
                serializedPath = common_1.serializePath(path);
                return [2 /*return*/, this.transport
                        .send(common_1.CLA, common_1.INS.GET_ADDR_SECP256K1, common_1.P1_VALUES.ONLY_RETRIEVE, 0, serializedPath, [0x9000])
                        .then(processGetAddrResponse, common_1.processErrorResponse)];
            });
        });
    };
    CasperApp.prototype.showAddressAndPubKey = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var serializedPath;
            return __generator(this, function (_a) {
                serializedPath = common_1.serializePath(path);
                return [2 /*return*/, this.transport
                        .send(common_1.CLA, common_1.INS.GET_ADDR_SECP256K1, common_1.P1_VALUES.SHOW_ADDRESS_IN_DEVICE, 0, serializedPath, [
                        common_1.LedgerError.NoErrors,
                    ])
                        .then(processGetAddrResponse, common_1.processErrorResponse)];
            });
        });
    };
    CasperApp.prototype.signSendChunk = function (chunkIdx, chunkNum, chunk) {
        return __awaiter(this, void 0, void 0, function () {
            var payloadType;
            return __generator(this, function (_a) {
                payloadType = common_1.PAYLOAD_TYPE.ADD;
                if (chunkIdx === 1) {
                    payloadType = common_1.PAYLOAD_TYPE.INIT;
                }
                if (chunkIdx === chunkNum) {
                    payloadType = common_1.PAYLOAD_TYPE.LAST;
                }
                return [2 /*return*/, this.transport
                        .send(common_1.CLA, common_1.INS.SIGN_SECP256K1, payloadType, 0, chunk, [
                        common_1.LedgerError.NoErrors,
                        common_1.LedgerError.DataIsInvalid,
                        common_1.LedgerError.BadKeyHandle,
                        common_1.LedgerError.SignVerifyError
                    ])
                        .then(function (response) {
                        var errorCodeData = response.slice(-2);
                        var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
                        var errorMessage = common_1.errorCodeToString(returnCode);
                        var signatureRS = Buffer.alloc(0);
                        if (returnCode === common_1.LedgerError.BadKeyHandle ||
                            returnCode === common_1.LedgerError.DataIsInvalid ||
                            returnCode === common_1.LedgerError.SignVerifyError) {
                            errorMessage = errorMessage + " : " + response
                                .slice(0, response.length - 2)
                                .toString('ascii');
                        }
                        if (returnCode === common_1.LedgerError.NoErrors && response.length > 2) {
                            signatureRS = response.slice(0, common_1.SIGLEN);
                            return {
                                signatureRS: signatureRS,
                                returnCode: returnCode,
                                errorMessage: errorMessage
                            };
                        }
                        return {
                            returnCode: returnCode,
                            errorMessage: errorMessage
                        };
                    }, common_1.processErrorResponse)];
            });
        });
    };
    CasperApp.prototype.sign = function (path, message) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.signGetChunks(path, message).then(function (chunks) {
                        return _this.signSendChunk(1, chunks.length, chunks[0]).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            var result, i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        result = {
                                            returnCode: response.returnCode,
                                            errorMessage: response.errorMessage,
                                            signatureRS: null
                                        };
                                        i = 1;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < chunks.length)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this.signSendChunk(1 + i, chunks.length, chunks[i])];
                                    case 2:
                                        // eslint-disable-next-line no-await-in-loop
                                        result = _a.sent();
                                        if (result.returnCode !== common_1.LedgerError.NoErrors) {
                                            return [3 /*break*/, 4];
                                        }
                                        _a.label = 3;
                                    case 3:
                                        i += 1;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/, result];
                                }
                            });
                        }); }, common_1.processErrorResponse);
                    }, common_1.processErrorResponse)];
            });
        });
    };
    return CasperApp;
}());
exports["default"] = CasperApp;


/***/ }),

/***/ "./node_modules/@zondax/ledger-casper/dist/types.js":
/*!**********************************************************!*\
  !*** ./node_modules/@zondax/ledger-casper/dist/types.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
const ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/lru-cache/index.js":
/*!*****************************************!*\
  !*** ./node_modules/lru-cache/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// A linked list to keep track of recently-used-ness
const Yallist = __webpack_require__(/*! yallist */ "./node_modules/yallist/yallist.js")

const MAX = Symbol('max')
const LENGTH = Symbol('length')
const LENGTH_CALCULATOR = Symbol('lengthCalculator')
const ALLOW_STALE = Symbol('allowStale')
const MAX_AGE = Symbol('maxAge')
const DISPOSE = Symbol('dispose')
const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet')
const LRU_LIST = Symbol('lruList')
const CACHE = Symbol('cache')
const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet')

const naiveLength = () => 1

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class LRUCache {
  constructor (options) {
    if (typeof options === 'number')
      options = { max: options }

    if (!options)
      options = {}

    if (options.max && (typeof options.max !== 'number' || options.max < 0))
      throw new TypeError('max must be a non-negative number')
    // Kind of weird to have a default max of Infinity, but oh well.
    const max = this[MAX] = options.max || Infinity

    const lc = options.length || naiveLength
    this[LENGTH_CALCULATOR] = (typeof lc !== 'function') ? naiveLength : lc
    this[ALLOW_STALE] = options.stale || false
    if (options.maxAge && typeof options.maxAge !== 'number')
      throw new TypeError('maxAge must be a number')
    this[MAX_AGE] = options.maxAge || 0
    this[DISPOSE] = options.dispose
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false
    this.reset()
  }

  // resize the cache when the max changes.
  set max (mL) {
    if (typeof mL !== 'number' || mL < 0)
      throw new TypeError('max must be a non-negative number')

    this[MAX] = mL || Infinity
    trim(this)
  }
  get max () {
    return this[MAX]
  }

  set allowStale (allowStale) {
    this[ALLOW_STALE] = !!allowStale
  }
  get allowStale () {
    return this[ALLOW_STALE]
  }

  set maxAge (mA) {
    if (typeof mA !== 'number')
      throw new TypeError('maxAge must be a non-negative number')

    this[MAX_AGE] = mA
    trim(this)
  }
  get maxAge () {
    return this[MAX_AGE]
  }

  // resize the cache when the lengthCalculator changes.
  set lengthCalculator (lC) {
    if (typeof lC !== 'function')
      lC = naiveLength

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC
      this[LENGTH] = 0
      this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key)
        this[LENGTH] += hit.length
      })
    }
    trim(this)
  }
  get lengthCalculator () { return this[LENGTH_CALCULATOR] }

  get length () { return this[LENGTH] }
  get itemCount () { return this[LRU_LIST].length }

  rforEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].tail; walker !== null;) {
      const prev = walker.prev
      forEachStep(this, fn, walker, thisp)
      walker = prev
    }
  }

  forEach (fn, thisp) {
    thisp = thisp || this
    for (let walker = this[LRU_LIST].head; walker !== null;) {
      const next = walker.next
      forEachStep(this, fn, walker, thisp)
      walker = next
    }
  }

  keys () {
    return this[LRU_LIST].toArray().map(k => k.key)
  }

  values () {
    return this[LRU_LIST].toArray().map(k => k.value)
  }

  reset () {
    if (this[DISPOSE] &&
        this[LRU_LIST] &&
        this[LRU_LIST].length) {
      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value))
    }

    this[CACHE] = new Map() // hash of items by key
    this[LRU_LIST] = new Yallist() // list of items in order of use recency
    this[LENGTH] = 0 // length of items in the list
  }

  dump () {
    return this[LRU_LIST].map(hit =>
      isStale(this, hit) ? false : {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      }).toArray().filter(h => h)
  }

  dumpLru () {
    return this[LRU_LIST]
  }

  set (key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE]

    if (maxAge && typeof maxAge !== 'number')
      throw new TypeError('maxAge must be a number')

    const now = maxAge ? Date.now() : 0
    const len = this[LENGTH_CALCULATOR](value, key)

    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key))
        return false
      }

      const node = this[CACHE].get(key)
      const item = node.value

      // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value)
      }

      item.now = now
      item.maxAge = maxAge
      item.value = value
      this[LENGTH] += len - item.length
      item.length = len
      this.get(key)
      trim(this)
      return true
    }

    const hit = new Entry(key, value, len, now, maxAge)

    // oversized objects fall out of cache automatically.
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value)

      return false
    }

    this[LENGTH] += hit.length
    this[LRU_LIST].unshift(hit)
    this[CACHE].set(key, this[LRU_LIST].head)
    trim(this)
    return true
  }

  has (key) {
    if (!this[CACHE].has(key)) return false
    const hit = this[CACHE].get(key).value
    return !isStale(this, hit)
  }

  get (key) {
    return get(this, key, true)
  }

  peek (key) {
    return get(this, key, false)
  }

  pop () {
    const node = this[LRU_LIST].tail
    if (!node)
      return null

    del(this, node)
    return node.value
  }

  del (key) {
    del(this, this[CACHE].get(key))
  }

  load (arr) {
    // reset the cache
    this.reset()

    const now = Date.now()
    // A previous serialized cache has the most recent items first
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l]
      const expiresAt = hit.e || 0
      if (expiresAt === 0)
        // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v)
      else {
        const maxAge = expiresAt - now
        // dont add already expired items
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge)
        }
      }
    }
  }

  prune () {
    this[CACHE].forEach((value, key) => get(this, key, false))
  }
}

const get = (self, key, doUse) => {
  const node = self[CACHE].get(key)
  if (node) {
    const hit = node.value
    if (isStale(self, hit)) {
      del(self, node)
      if (!self[ALLOW_STALE])
        return undefined
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET])
          node.value.now = Date.now()
        self[LRU_LIST].unshiftNode(node)
      }
    }
    return hit.value
  }
}

const isStale = (self, hit) => {
  if (!hit || (!hit.maxAge && !self[MAX_AGE]))
    return false

  const diff = Date.now() - hit.now
  return hit.maxAge ? diff > hit.maxAge
    : self[MAX_AGE] && (diff > self[MAX_AGE])
}

const trim = self => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail;
      self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev
      del(self, walker)
      walker = prev
    }
  }
}

const del = (self, node) => {
  if (node) {
    const hit = node.value
    if (self[DISPOSE])
      self[DISPOSE](hit.key, hit.value)

    self[LENGTH] -= hit.length
    self[CACHE].delete(hit.key)
    self[LRU_LIST].removeNode(node)
  }
}

class Entry {
  constructor (key, value, length, now, maxAge) {
    this.key = key
    this.value = value
    this.length = length
    this.now = now
    this.maxAge = maxAge || 0
  }
}

const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value
  if (isStale(self, hit)) {
    del(self, node)
    if (!self[ALLOW_STALE])
      hit = undefined
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self)
}

module.exports = LRUCache


/***/ }),

/***/ "./node_modules/semver/classes/comparator.js":
/*!***************************************************!*\
  !*** ./node_modules/semver/classes/comparator.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ANY = Symbol('SemVer ANY')
// hoisted class for cyclic dependency
class Comparator {
  static get ANY () {
    return ANY
  }
  constructor (comp, options) {
    options = parseOptions(options)

    if (comp instanceof Comparator) {
      if (comp.loose === !!options.loose) {
        return comp
      } else {
        comp = comp.value
      }
    }

    debug('comparator', comp, options)
    this.options = options
    this.loose = !!options.loose
    this.parse(comp)

    if (this.semver === ANY) {
      this.value = ''
    } else {
      this.value = this.operator + this.semver.version
    }

    debug('comp', this)
  }

  parse (comp) {
    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
    const m = comp.match(r)

    if (!m) {
      throw new TypeError(`Invalid comparator: ${comp}`)
    }

    this.operator = m[1] !== undefined ? m[1] : ''
    if (this.operator === '=') {
      this.operator = ''
    }

    // if it literally is just '>' or '' then allow anything.
    if (!m[2]) {
      this.semver = ANY
    } else {
      this.semver = new SemVer(m[2], this.options.loose)
    }
  }

  toString () {
    return this.value
  }

  test (version) {
    debug('Comparator.test', version, this.options.loose)

    if (this.semver === ANY || version === ANY) {
      return true
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options)
      } catch (er) {
        return false
      }
    }

    return cmp(version, this.operator, this.semver, this.options)
  }

  intersects (comp, options) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError('a Comparator is required')
    }

    if (!options || typeof options !== 'object') {
      options = {
        loose: !!options,
        includePrerelease: false
      }
    }

    if (this.operator === '') {
      if (this.value === '') {
        return true
      }
      return new Range(comp.value, options).test(this.value)
    } else if (comp.operator === '') {
      if (comp.value === '') {
        return true
      }
      return new Range(this.value, options).test(comp.semver)
    }

    const sameDirectionIncreasing =
      (this.operator === '>=' || this.operator === '>') &&
      (comp.operator === '>=' || comp.operator === '>')
    const sameDirectionDecreasing =
      (this.operator === '<=' || this.operator === '<') &&
      (comp.operator === '<=' || comp.operator === '<')
    const sameSemVer = this.semver.version === comp.semver.version
    const differentDirectionsInclusive =
      (this.operator === '>=' || this.operator === '<=') &&
      (comp.operator === '>=' || comp.operator === '<=')
    const oppositeDirectionsLessThan =
      cmp(this.semver, '<', comp.semver, options) &&
      (this.operator === '>=' || this.operator === '>') &&
        (comp.operator === '<=' || comp.operator === '<')
    const oppositeDirectionsGreaterThan =
      cmp(this.semver, '>', comp.semver, options) &&
      (this.operator === '<=' || this.operator === '<') &&
        (comp.operator === '>=' || comp.operator === '>')

    return (
      sameDirectionIncreasing ||
      sameDirectionDecreasing ||
      (sameSemVer && differentDirectionsInclusive) ||
      oppositeDirectionsLessThan ||
      oppositeDirectionsGreaterThan
    )
  }
}

module.exports = Comparator

const parseOptions = __webpack_require__(/*! ../internal/parse-options */ "./node_modules/semver/internal/parse-options.js")
const {re, t} = __webpack_require__(/*! ../internal/re */ "./node_modules/semver/internal/re.js")
const cmp = __webpack_require__(/*! ../functions/cmp */ "./node_modules/semver/functions/cmp.js")
const debug = __webpack_require__(/*! ../internal/debug */ "./node_modules/semver/internal/debug.js")
const SemVer = __webpack_require__(/*! ./semver */ "./node_modules/semver/classes/semver.js")
const Range = __webpack_require__(/*! ./range */ "./node_modules/semver/classes/range.js")


/***/ }),

/***/ "./node_modules/semver/classes/range.js":
/*!**********************************************!*\
  !*** ./node_modules/semver/classes/range.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// hoisted class for cyclic dependency
class Range {
  constructor (range, options) {
    options = parseOptions(options)

    if (range instanceof Range) {
      if (
        range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease
      ) {
        return range
      } else {
        return new Range(range.raw, options)
      }
    }

    if (range instanceof Comparator) {
      // just put it in the set and return
      this.raw = range.value
      this.set = [[range]]
      this.format()
      return this
    }

    this.options = options
    this.loose = !!options.loose
    this.includePrerelease = !!options.includePrerelease

    // First, split based on boolean or ||
    this.raw = range
    this.set = range
      .split(/\s*\|\|\s*/)
      // map the range to a 2d array of comparators
      .map(range => this.parseRange(range.trim()))
      // throw out any comparator lists that are empty
      // this generally means that it was not a valid range, which is allowed
      // in loose mode, but will still throw if the WHOLE range is invalid.
      .filter(c => c.length)

    if (!this.set.length) {
      throw new TypeError(`Invalid SemVer Range: ${range}`)
    }

    // if we have any that are not the null set, throw out null sets.
    if (this.set.length > 1) {
      // keep the first one, in case they're all null sets
      const first = this.set[0]
      this.set = this.set.filter(c => !isNullSet(c[0]))
      if (this.set.length === 0)
        this.set = [first]
      else if (this.set.length > 1) {
        // if we have any that are *, then the range is just *
        for (const c of this.set) {
          if (c.length === 1 && isAny(c[0])) {
            this.set = [c]
            break
          }
        }
      }
    }

    this.format()
  }

  format () {
    this.range = this.set
      .map((comps) => {
        return comps.join(' ').trim()
      })
      .join('||')
      .trim()
    return this.range
  }

  toString () {
    return this.range
  }

  parseRange (range) {
    range = range.trim()

    // memoize range parsing for performance.
    // this is a very hot path, and fully deterministic.
    const memoOpts = Object.keys(this.options).join(',')
    const memoKey = `parseRange:${memoOpts}:${range}`
    const cached = cache.get(memoKey)
    if (cached)
      return cached

    const loose = this.options.loose
    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
    range = range.replace(hr, hyphenReplace(this.options.includePrerelease))
    debug('hyphen replace', range)
    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
    debug('comparator trim', range, re[t.COMPARATORTRIM])

    // `~ 1.2.3` => `~1.2.3`
    range = range.replace(re[t.TILDETRIM], tildeTrimReplace)

    // `^ 1.2.3` => `^1.2.3`
    range = range.replace(re[t.CARETTRIM], caretTrimReplace)

    // normalize spaces
    range = range.split(/\s+/).join(' ')

    // At this point, the range is completely trimmed and
    // ready to be split into comparators.

    const compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
    const rangeList = range
      .split(' ')
      .map(comp => parseComparator(comp, this.options))
      .join(' ')
      .split(/\s+/)
      // >=0.0.0 is equivalent to *
      .map(comp => replaceGTE0(comp, this.options))
      // in loose mode, throw out any that are not valid comparators
      .filter(this.options.loose ? comp => !!comp.match(compRe) : () => true)
      .map(comp => new Comparator(comp, this.options))

    // if any comparators are the null set, then replace with JUST null set
    // if more than one comparator, remove any * comparators
    // also, don't include the same comparator more than once
    const l = rangeList.length
    const rangeMap = new Map()
    for (const comp of rangeList) {
      if (isNullSet(comp))
        return [comp]
      rangeMap.set(comp.value, comp)
    }
    if (rangeMap.size > 1 && rangeMap.has(''))
      rangeMap.delete('')

    const result = [...rangeMap.values()]
    cache.set(memoKey, result)
    return result
  }

  intersects (range, options) {
    if (!(range instanceof Range)) {
      throw new TypeError('a Range is required')
    }

    return this.set.some((thisComparators) => {
      return (
        isSatisfiable(thisComparators, options) &&
        range.set.some((rangeComparators) => {
          return (
            isSatisfiable(rangeComparators, options) &&
            thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options)
              })
            })
          )
        })
      )
    })
  }

  // if ANY of the sets match ALL of its comparators, then pass
  test (version) {
    if (!version) {
      return false
    }

    if (typeof version === 'string') {
      try {
        version = new SemVer(version, this.options)
      } catch (er) {
        return false
      }
    }

    for (let i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version, this.options)) {
        return true
      }
    }
    return false
  }
}
module.exports = Range

const LRU = __webpack_require__(/*! lru-cache */ "./node_modules/lru-cache/index.js")
const cache = new LRU({ max: 1000 })

const parseOptions = __webpack_require__(/*! ../internal/parse-options */ "./node_modules/semver/internal/parse-options.js")
const Comparator = __webpack_require__(/*! ./comparator */ "./node_modules/semver/classes/comparator.js")
const debug = __webpack_require__(/*! ../internal/debug */ "./node_modules/semver/internal/debug.js")
const SemVer = __webpack_require__(/*! ./semver */ "./node_modules/semver/classes/semver.js")
const {
  re,
  t,
  comparatorTrimReplace,
  tildeTrimReplace,
  caretTrimReplace
} = __webpack_require__(/*! ../internal/re */ "./node_modules/semver/internal/re.js")

const isNullSet = c => c.value === '<0.0.0-0'
const isAny = c => c.value === ''

// take a set of comparators and determine whether there
// exists a version which can satisfy it
const isSatisfiable = (comparators, options) => {
  let result = true
  const remainingComparators = comparators.slice()
  let testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every((otherComparator) => {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
const parseComparator = (comp, options) => {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

const isX = id => !id || id.toLowerCase() === 'x' || id === '*'

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
const replaceTildes = (comp, options) =>
  comp.trim().split(/\s+/).map((comp) => {
    return replaceTilde(comp, options)
  }).join(' ')

const replaceTilde = (comp, options) => {
  const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE]
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('tilde', comp, _, M, m, p, pr)
    let ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0-0
      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = `>=${M}.${m}.${p}-${pr
      } <${M}.${+m + 1}.0-0`
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0-0
      ret = `>=${M}.${m}.${p
      } <${M}.${+m + 1}.0-0`
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0
const replaceCarets = (comp, options) =>
  comp.trim().split(/\s+/).map((comp) => {
    return replaceCaret(comp, options)
  }).join(' ')

const replaceCaret = (comp, options) => {
  debug('caret', comp, options)
  const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET]
  const z = options.includePrerelease ? '-0' : ''
  return comp.replace(r, (_, M, m, p, pr) => {
    debug('caret', comp, _, M, m, p, pr)
    let ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`
    } else if (isX(p)) {
      if (M === '0') {
        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`
      } else {
        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${m}.${+p + 1}-0`
        } else {
          ret = `>=${M}.${m}.${p}-${pr
          } <${M}.${+m + 1}.0-0`
        }
      } else {
        ret = `>=${M}.${m}.${p}-${pr
        } <${+M + 1}.0.0-0`
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = `>=${M}.${m}.${p
          }${z} <${M}.${m}.${+p + 1}-0`
        } else {
          ret = `>=${M}.${m}.${p
          }${z} <${M}.${+m + 1}.0-0`
        }
      } else {
        ret = `>=${M}.${m}.${p
        } <${+M + 1}.0.0-0`
      }
    }

    debug('caret return', ret)
    return ret
  })
}

const replaceXRanges = (comp, options) => {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map((comp) => {
    return replaceXRange(comp, options)
  }).join(' ')
}

const replaceXRange = (comp, options) => {
  comp = comp.trim()
  const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE]
  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    const xM = isX(M)
    const xm = xM || isX(m)
    const xp = xm || isX(p)
    const anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : ''

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      if (gtlt === '<')
        pr = '-0'

      ret = `${gtlt + M}.${m}.${p}${pr}`
    } else if (xm) {
      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`
    } else if (xp) {
      ret = `>=${M}.${m}.0${pr
      } <${M}.${+m + 1}.0-0`
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
const replaceStars = (comp, options) => {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[t.STAR], '')
}

const replaceGTE0 = (comp, options) => {
  debug('replaceGTE0', comp, options)
  return comp.trim()
    .replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '')
}

// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
const hyphenReplace = incPr => ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) => {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = `>=${fM}.0.0${incPr ? '-0' : ''}`
  } else if (isX(fp)) {
    from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`
  } else if (fpr) {
    from = `>=${from}`
  } else {
    from = `>=${from}${incPr ? '-0' : ''}`
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = `<${+tM + 1}.0.0-0`
  } else if (isX(tp)) {
    to = `<${tM}.${+tm + 1}.0-0`
  } else if (tpr) {
    to = `<=${tM}.${tm}.${tp}-${tpr}`
  } else if (incPr) {
    to = `<${tM}.${tm}.${+tp + 1}-0`
  } else {
    to = `<=${to}`
  }

  return (`${from} ${to}`).trim()
}

const testSet = (set, version, options) => {
  for (let i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (let i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === Comparator.ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        const allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}


/***/ }),

/***/ "./node_modules/semver/classes/semver.js":
/*!***********************************************!*\
  !*** ./node_modules/semver/classes/semver.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const debug = __webpack_require__(/*! ../internal/debug */ "./node_modules/semver/internal/debug.js")
const { MAX_LENGTH, MAX_SAFE_INTEGER } = __webpack_require__(/*! ../internal/constants */ "./node_modules/semver/internal/constants.js")
const { re, t } = __webpack_require__(/*! ../internal/re */ "./node_modules/semver/internal/re.js")

const parseOptions = __webpack_require__(/*! ../internal/parse-options */ "./node_modules/semver/internal/parse-options.js")
const { compareIdentifiers } = __webpack_require__(/*! ../internal/identifiers */ "./node_modules/semver/internal/identifiers.js")
class SemVer {
  constructor (version, options) {
    options = parseOptions(options)

    if (version instanceof SemVer) {
      if (version.loose === !!options.loose &&
          version.includePrerelease === !!options.includePrerelease) {
        return version
      } else {
        version = version.version
      }
    } else if (typeof version !== 'string') {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        `version is longer than ${MAX_LENGTH} characters`
      )
    }

    debug('SemVer', version, options)
    this.options = options
    this.loose = !!options.loose
    // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.
    this.includePrerelease = !!options.includePrerelease

    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`)
    }

    this.raw = version

    // these are actually numbers
    this.major = +m[1]
    this.minor = +m[2]
    this.patch = +m[3]

    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version')
    }

    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version')
    }

    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version')
    }

    // numberify any prerelease numeric ids
    if (!m[4]) {
      this.prerelease = []
    } else {
      this.prerelease = m[4].split('.').map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num
          }
        }
        return id
      })
    }

    this.build = m[5] ? m[5].split('.') : []
    this.format()
  }

  format () {
    this.version = `${this.major}.${this.minor}.${this.patch}`
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join('.')}`
    }
    return this.version
  }

  toString () {
    return this.version
  }

  compare (other) {
    debug('SemVer.compare', this.version, this.options, other)
    if (!(other instanceof SemVer)) {
      if (typeof other === 'string' && other === this.version) {
        return 0
      }
      other = new SemVer(other, this.options)
    }

    if (other.version === this.version) {
      return 0
    }

    return this.compareMain(other) || this.comparePre(other)
  }

  compareMain (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    return (
      compareIdentifiers(this.major, other.major) ||
      compareIdentifiers(this.minor, other.minor) ||
      compareIdentifiers(this.patch, other.patch)
    )
  }

  comparePre (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) {
      return -1
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0
    }

    let i = 0
    do {
      const a = this.prerelease[i]
      const b = other.prerelease[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  compareBuild (other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options)
    }

    let i = 0
    do {
      const a = this.build[i]
      const b = other.build[i]
      debug('prerelease compare', i, a, b)
      if (a === undefined && b === undefined) {
        return 0
      } else if (b === undefined) {
        return 1
      } else if (a === undefined) {
        return -1
      } else if (a === b) {
        continue
      } else {
        return compareIdentifiers(a, b)
      }
    } while (++i)
  }

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc (release, identifier) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor = 0
        this.major++
        this.inc('pre', identifier)
        break
      case 'preminor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor++
        this.inc('pre', identifier)
        break
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0
        this.inc('patch', identifier)
        this.inc('pre', identifier)
        break
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier)
        }
        this.inc('pre', identifier)
        break

      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (
          this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0
        ) {
          this.major++
        }
        this.minor = 0
        this.patch = 0
        this.prerelease = []
        break
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++
        }
        this.patch = 0
        this.prerelease = []
        break
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          this.patch++
        }
        this.prerelease = []
        break
      // This probably shouldn't be used publicly.
      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
      case 'pre':
        if (this.prerelease.length === 0) {
          this.prerelease = [0]
        } else {
          let i = this.prerelease.length
          while (--i >= 0) {
            if (typeof this.prerelease[i] === 'number') {
              this.prerelease[i]++
              i = -2
            }
          }
          if (i === -1) {
            // didn't increment anything
            this.prerelease.push(0)
          }
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0]
            }
          } else {
            this.prerelease = [identifier, 0]
          }
        }
        break

      default:
        throw new Error(`invalid increment argument: ${release}`)
    }
    this.format()
    this.raw = this.version
    return this
  }
}

module.exports = SemVer


/***/ }),

/***/ "./node_modules/semver/functions/clean.js":
/*!************************************************!*\
  !*** ./node_modules/semver/functions/clean.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(/*! ./parse */ "./node_modules/semver/functions/parse.js")
const clean = (version, options) => {
  const s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}
module.exports = clean


/***/ }),

/***/ "./node_modules/semver/functions/cmp.js":
/*!**********************************************!*\
  !*** ./node_modules/semver/functions/cmp.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const eq = __webpack_require__(/*! ./eq */ "./node_modules/semver/functions/eq.js")
const neq = __webpack_require__(/*! ./neq */ "./node_modules/semver/functions/neq.js")
const gt = __webpack_require__(/*! ./gt */ "./node_modules/semver/functions/gt.js")
const gte = __webpack_require__(/*! ./gte */ "./node_modules/semver/functions/gte.js")
const lt = __webpack_require__(/*! ./lt */ "./node_modules/semver/functions/lt.js")
const lte = __webpack_require__(/*! ./lte */ "./node_modules/semver/functions/lte.js")

const cmp = (a, op, b, loose) => {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError(`Invalid operator: ${op}`)
  }
}
module.exports = cmp


/***/ }),

/***/ "./node_modules/semver/functions/coerce.js":
/*!*************************************************!*\
  !*** ./node_modules/semver/functions/coerce.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/semver/classes/semver.js")
const parse = __webpack_require__(/*! ./parse */ "./node_modules/semver/functions/parse.js")
const {re, t} = __webpack_require__(/*! ../internal/re */ "./node_modules/semver/internal/re.js")

const coerce = (version, options) => {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version === 'number') {
    version = String(version)
  }

  if (typeof version !== 'string') {
    return null
  }

  options = options || {}

  let match = null
  if (!options.rtl) {
    match = version.match(re[t.COERCE])
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    let next
    while ((next = re[t.COERCERTL].exec(version)) &&
        (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
            next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    re[t.COERCERTL].lastIndex = -1
  }

  if (match === null)
    return null

  return parse(`${match[2]}.${match[3] || '0'}.${match[4] || '0'}`, options)
}
module.exports = coerce


/***/ }),

/***/ "./node_modules/semver/functions/compare-build.js":
/*!********************************************************!*\
  !*** ./node_modules/semver/functions/compare-build.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/semver/classes/semver.js")
const compareBuild = (a, b, loose) => {
  const versionA = new SemVer(a, loose)
  const versionB = new SemVer(b, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}
module.exports = compareBuild


/***/ }),

/***/ "./node_modules/semver/functions/compare-loose.js":
/*!********************************************************!*\
  !*** ./node_modules/semver/functions/compare-loose.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(/*! ./compare */ "./node_modules/semver/functions/compare.js")
const compareLoose = (a, b) => compare(a, b, true)
module.exports = compareLoose


/***/ }),

/***/ "./node_modules/semver/functions/compare.js":
/*!**************************************************!*\
  !*** ./node_modules/semver/functions/compare.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/semver/classes/semver.js")
const compare = (a, b, loose) =>
  new SemVer(a, loose).compare(new SemVer(b, loose))

module.exports = compare


/***/ }),

/***/ "./node_modules/semver/functions/diff.js":
/*!***********************************************!*\
  !*** ./node_modules/semver/functions/diff.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(/*! ./parse */ "./node_modules/semver/functions/parse.js")
const eq = __webpack_require__(/*! ./eq */ "./node_modules/semver/functions/eq.js")

const diff = (version1, version2) => {
  if (eq(version1, version2)) {
    return null
  } else {
    const v1 = parse(version1)
    const v2 = parse(version2)
    const hasPre = v1.prerelease.length || v2.prerelease.length
    const prefix = hasPre ? 'pre' : ''
    const defaultResult = hasPre ? 'prerelease' : ''
    for (const key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}
module.exports = diff


/***/ }),

/***/ "./node_modules/semver/functions/eq.js":
/*!*********************************************!*\
  !*** ./node_modules/semver/functions/eq.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(/*! ./compare */ "./node_modules/semver/functions/compare.js")
const eq = (a, b, loose) => compare(a, b, loose) === 0
module.exports = eq


/***/ }),

/***/ "./node_modules/semver/functions/gt.js":
/*!*********************************************!*\
  !*** ./node_modules/semver/functions/gt.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(/*! ./compare */ "./node_modules/semver/functions/compare.js")
const gt = (a, b, loose) => compare(a, b, loose) > 0
module.exports = gt


/***/ }),

/***/ "./node_modules/semver/functions/gte.js":
/*!**********************************************!*\
  !*** ./node_modules/semver/functions/gte.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(/*! ./compare */ "./node_modules/semver/functions/compare.js")
const gte = (a, b, loose) => compare(a, b, loose) >= 0
module.exports = gte


/***/ }),

/***/ "./node_modules/semver/functions/inc.js":
/*!**********************************************!*\
  !*** ./node_modules/semver/functions/inc.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/semver/classes/semver.js")

const inc = (version, release, options, identifier) => {
  if (typeof (options) === 'string') {
    identifier = options
    options = undefined
  }

  try {
    return new SemVer(version, options).inc(release, identifier).version
  } catch (er) {
    return null
  }
}
module.exports = inc


/***/ }),

/***/ "./node_modules/semver/functions/lt.js":
/*!*********************************************!*\
  !*** ./node_modules/semver/functions/lt.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(/*! ./compare */ "./node_modules/semver/functions/compare.js")
const lt = (a, b, loose) => compare(a, b, loose) < 0
module.exports = lt


/***/ }),

/***/ "./node_modules/semver/functions/lte.js":
/*!**********************************************!*\
  !*** ./node_modules/semver/functions/lte.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(/*! ./compare */ "./node_modules/semver/functions/compare.js")
const lte = (a, b, loose) => compare(a, b, loose) <= 0
module.exports = lte


/***/ }),

/***/ "./node_modules/semver/functions/major.js":
/*!************************************************!*\
  !*** ./node_modules/semver/functions/major.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/semver/classes/semver.js")
const major = (a, loose) => new SemVer(a, loose).major
module.exports = major


/***/ }),

/***/ "./node_modules/semver/functions/minor.js":
/*!************************************************!*\
  !*** ./node_modules/semver/functions/minor.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/semver/classes/semver.js")
const minor = (a, loose) => new SemVer(a, loose).minor
module.exports = minor


/***/ }),

/***/ "./node_modules/semver/functions/neq.js":
/*!**********************************************!*\
  !*** ./node_modules/semver/functions/neq.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(/*! ./compare */ "./node_modules/semver/functions/compare.js")
const neq = (a, b, loose) => compare(a, b, loose) !== 0
module.exports = neq


/***/ }),

/***/ "./node_modules/semver/functions/parse.js":
/*!************************************************!*\
  !*** ./node_modules/semver/functions/parse.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {MAX_LENGTH} = __webpack_require__(/*! ../internal/constants */ "./node_modules/semver/internal/constants.js")
const { re, t } = __webpack_require__(/*! ../internal/re */ "./node_modules/semver/internal/re.js")
const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/semver/classes/semver.js")

const parseOptions = __webpack_require__(/*! ../internal/parse-options */ "./node_modules/semver/internal/parse-options.js")
const parse = (version, options) => {
  options = parseOptions(options)

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  const r = options.loose ? re[t.LOOSE] : re[t.FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

module.exports = parse


/***/ }),

/***/ "./node_modules/semver/functions/patch.js":
/*!************************************************!*\
  !*** ./node_modules/semver/functions/patch.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/semver/classes/semver.js")
const patch = (a, loose) => new SemVer(a, loose).patch
module.exports = patch


/***/ }),

/***/ "./node_modules/semver/functions/prerelease.js":
/*!*****************************************************!*\
  !*** ./node_modules/semver/functions/prerelease.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(/*! ./parse */ "./node_modules/semver/functions/parse.js")
const prerelease = (version, options) => {
  const parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}
module.exports = prerelease


/***/ }),

/***/ "./node_modules/semver/functions/rcompare.js":
/*!***************************************************!*\
  !*** ./node_modules/semver/functions/rcompare.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compare = __webpack_require__(/*! ./compare */ "./node_modules/semver/functions/compare.js")
const rcompare = (a, b, loose) => compare(b, a, loose)
module.exports = rcompare


/***/ }),

/***/ "./node_modules/semver/functions/rsort.js":
/*!************************************************!*\
  !*** ./node_modules/semver/functions/rsort.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compareBuild = __webpack_require__(/*! ./compare-build */ "./node_modules/semver/functions/compare-build.js")
const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose))
module.exports = rsort


/***/ }),

/***/ "./node_modules/semver/functions/satisfies.js":
/*!****************************************************!*\
  !*** ./node_modules/semver/functions/satisfies.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(/*! ../classes/range */ "./node_modules/semver/classes/range.js")
const satisfies = (version, range, options) => {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}
module.exports = satisfies


/***/ }),

/***/ "./node_modules/semver/functions/sort.js":
/*!***********************************************!*\
  !*** ./node_modules/semver/functions/sort.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const compareBuild = __webpack_require__(/*! ./compare-build */ "./node_modules/semver/functions/compare-build.js")
const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose))
module.exports = sort


/***/ }),

/***/ "./node_modules/semver/functions/valid.js":
/*!************************************************!*\
  !*** ./node_modules/semver/functions/valid.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const parse = __webpack_require__(/*! ./parse */ "./node_modules/semver/functions/parse.js")
const valid = (version, options) => {
  const v = parse(version, options)
  return v ? v.version : null
}
module.exports = valid


/***/ }),

/***/ "./node_modules/semver/index.js":
/*!**************************************!*\
  !*** ./node_modules/semver/index.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// just pre-load all the stuff that index.js lazily exports
const internalRe = __webpack_require__(/*! ./internal/re */ "./node_modules/semver/internal/re.js")
module.exports = {
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: (__webpack_require__(/*! ./internal/constants */ "./node_modules/semver/internal/constants.js").SEMVER_SPEC_VERSION),
  SemVer: __webpack_require__(/*! ./classes/semver */ "./node_modules/semver/classes/semver.js"),
  compareIdentifiers: (__webpack_require__(/*! ./internal/identifiers */ "./node_modules/semver/internal/identifiers.js").compareIdentifiers),
  rcompareIdentifiers: (__webpack_require__(/*! ./internal/identifiers */ "./node_modules/semver/internal/identifiers.js").rcompareIdentifiers),
  parse: __webpack_require__(/*! ./functions/parse */ "./node_modules/semver/functions/parse.js"),
  valid: __webpack_require__(/*! ./functions/valid */ "./node_modules/semver/functions/valid.js"),
  clean: __webpack_require__(/*! ./functions/clean */ "./node_modules/semver/functions/clean.js"),
  inc: __webpack_require__(/*! ./functions/inc */ "./node_modules/semver/functions/inc.js"),
  diff: __webpack_require__(/*! ./functions/diff */ "./node_modules/semver/functions/diff.js"),
  major: __webpack_require__(/*! ./functions/major */ "./node_modules/semver/functions/major.js"),
  minor: __webpack_require__(/*! ./functions/minor */ "./node_modules/semver/functions/minor.js"),
  patch: __webpack_require__(/*! ./functions/patch */ "./node_modules/semver/functions/patch.js"),
  prerelease: __webpack_require__(/*! ./functions/prerelease */ "./node_modules/semver/functions/prerelease.js"),
  compare: __webpack_require__(/*! ./functions/compare */ "./node_modules/semver/functions/compare.js"),
  rcompare: __webpack_require__(/*! ./functions/rcompare */ "./node_modules/semver/functions/rcompare.js"),
  compareLoose: __webpack_require__(/*! ./functions/compare-loose */ "./node_modules/semver/functions/compare-loose.js"),
  compareBuild: __webpack_require__(/*! ./functions/compare-build */ "./node_modules/semver/functions/compare-build.js"),
  sort: __webpack_require__(/*! ./functions/sort */ "./node_modules/semver/functions/sort.js"),
  rsort: __webpack_require__(/*! ./functions/rsort */ "./node_modules/semver/functions/rsort.js"),
  gt: __webpack_require__(/*! ./functions/gt */ "./node_modules/semver/functions/gt.js"),
  lt: __webpack_require__(/*! ./functions/lt */ "./node_modules/semver/functions/lt.js"),
  eq: __webpack_require__(/*! ./functions/eq */ "./node_modules/semver/functions/eq.js"),
  neq: __webpack_require__(/*! ./functions/neq */ "./node_modules/semver/functions/neq.js"),
  gte: __webpack_require__(/*! ./functions/gte */ "./node_modules/semver/functions/gte.js"),
  lte: __webpack_require__(/*! ./functions/lte */ "./node_modules/semver/functions/lte.js"),
  cmp: __webpack_require__(/*! ./functions/cmp */ "./node_modules/semver/functions/cmp.js"),
  coerce: __webpack_require__(/*! ./functions/coerce */ "./node_modules/semver/functions/coerce.js"),
  Comparator: __webpack_require__(/*! ./classes/comparator */ "./node_modules/semver/classes/comparator.js"),
  Range: __webpack_require__(/*! ./classes/range */ "./node_modules/semver/classes/range.js"),
  satisfies: __webpack_require__(/*! ./functions/satisfies */ "./node_modules/semver/functions/satisfies.js"),
  toComparators: __webpack_require__(/*! ./ranges/to-comparators */ "./node_modules/semver/ranges/to-comparators.js"),
  maxSatisfying: __webpack_require__(/*! ./ranges/max-satisfying */ "./node_modules/semver/ranges/max-satisfying.js"),
  minSatisfying: __webpack_require__(/*! ./ranges/min-satisfying */ "./node_modules/semver/ranges/min-satisfying.js"),
  minVersion: __webpack_require__(/*! ./ranges/min-version */ "./node_modules/semver/ranges/min-version.js"),
  validRange: __webpack_require__(/*! ./ranges/valid */ "./node_modules/semver/ranges/valid.js"),
  outside: __webpack_require__(/*! ./ranges/outside */ "./node_modules/semver/ranges/outside.js"),
  gtr: __webpack_require__(/*! ./ranges/gtr */ "./node_modules/semver/ranges/gtr.js"),
  ltr: __webpack_require__(/*! ./ranges/ltr */ "./node_modules/semver/ranges/ltr.js"),
  intersects: __webpack_require__(/*! ./ranges/intersects */ "./node_modules/semver/ranges/intersects.js"),
  simplifyRange: __webpack_require__(/*! ./ranges/simplify */ "./node_modules/semver/ranges/simplify.js"),
  subset: __webpack_require__(/*! ./ranges/subset */ "./node_modules/semver/ranges/subset.js"),
}


/***/ }),

/***/ "./node_modules/semver/internal/constants.js":
/*!***************************************************!*\
  !*** ./node_modules/semver/internal/constants.js ***!
  \***************************************************/
/***/ ((module) => {

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0'

const MAX_LENGTH = 256
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16

module.exports = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH,
  MAX_SAFE_INTEGER,
  MAX_SAFE_COMPONENT_LENGTH
}


/***/ }),

/***/ "./node_modules/semver/internal/debug.js":
/*!***********************************************!*\
  !*** ./node_modules/semver/internal/debug.js ***!
  \***********************************************/
/***/ ((module) => {

const debug = (
  typeof process === 'object' &&
  process.env &&
  process.env.NODE_DEBUG &&
  /\bsemver\b/i.test(process.env.NODE_DEBUG)
) ? (...args) => console.error('SEMVER', ...args)
  : () => {}

module.exports = debug


/***/ }),

/***/ "./node_modules/semver/internal/identifiers.js":
/*!*****************************************************!*\
  !*** ./node_modules/semver/internal/identifiers.js ***!
  \*****************************************************/
/***/ ((module) => {

const numeric = /^[0-9]+$/
const compareIdentifiers = (a, b) => {
  const anum = numeric.test(a)
  const bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a)

module.exports = {
  compareIdentifiers,
  rcompareIdentifiers
}


/***/ }),

/***/ "./node_modules/semver/internal/parse-options.js":
/*!*******************************************************!*\
  !*** ./node_modules/semver/internal/parse-options.js ***!
  \*******************************************************/
/***/ ((module) => {

// parse out just the options we care about so we always get a consistent
// obj with keys in a consistent order.
const opts = ['includePrerelease', 'loose', 'rtl']
const parseOptions = options =>
  !options ? {}
  : typeof options !== 'object' ? { loose: true }
  : opts.filter(k => options[k]).reduce((options, k) => {
    options[k] = true
    return options
  }, {})
module.exports = parseOptions


/***/ }),

/***/ "./node_modules/semver/internal/re.js":
/*!********************************************!*\
  !*** ./node_modules/semver/internal/re.js ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {

const { MAX_SAFE_COMPONENT_LENGTH } = __webpack_require__(/*! ./constants */ "./node_modules/semver/internal/constants.js")
const debug = __webpack_require__(/*! ./debug */ "./node_modules/semver/internal/debug.js")
exports = module.exports = {}

// The actual regexps go on exports.re
const re = exports.re = []
const src = exports.src = []
const t = exports.t = {}
let R = 0

const createToken = (name, value, isGlobal) => {
  const index = R++
  debug(index, value)
  t[name] = index
  src[index] = value
  re[index] = new RegExp(value, isGlobal ? 'g' : undefined)
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*')
createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+')

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*')

// ## Main Version
// Three dot-separated numeric identifiers.

createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})\\.` +
                   `(${src[t.NUMERICIDENTIFIER]})`)

createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` +
                        `(${src[t.NUMERICIDENTIFIERLOOSE]})`)

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]
}|${src[t.NONNUMERICIDENTIFIER]})`)

createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]
}|${src[t.NONNUMERICIDENTIFIER]})`)

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]
}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`)

createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]
}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`)

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+')

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]
}(?:\\.${src[t.BUILDIDENTIFIER]})*))`)

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

createToken('FULLPLAIN', `v?${src[t.MAINVERSION]
}${src[t.PRERELEASE]}?${
  src[t.BUILD]}?`)

createToken('FULL', `^${src[t.FULLPLAIN]}$`)

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]
}${src[t.PRERELEASELOOSE]}?${
  src[t.BUILD]}?`)

createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`)

createToken('GTLT', '((?:<|>)?=?)')

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`)
createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`)

createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:\\.(${src[t.XRANGEIDENTIFIER]})` +
                   `(?:${src[t.PRERELEASE]})?${
                     src[t.BUILD]}?` +
                   `)?)?`)

createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` +
                        `(?:${src[t.PRERELEASELOOSE]})?${
                          src[t.BUILD]}?` +
                        `)?)?`)

createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`)
createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`)

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken('COERCE', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:$|[^\\d])`)
createToken('COERCERTL', src[t.COERCE], true)

// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken('LONETILDE', '(?:~>?)')

createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true)
exports.tildeTrimReplace = '$1~'

createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`)
createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`)

// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken('LONECARET', '(?:\\^)')

createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true)
exports.caretTrimReplace = '$1^'

createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`)
createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`)

// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`)
createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`)

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]
}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true)
exports.comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` +
                   `\\s+-\\s+` +
                   `(${src[t.XRANGEPLAIN]})` +
                   `\\s*$`)

createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s+-\\s+` +
                        `(${src[t.XRANGEPLAINLOOSE]})` +
                        `\\s*$`)

// Star ranges basically just allow anything at all.
createToken('STAR', '(<|>)?=?\\s*\\*')
// >=0.0.0 is like a star
createToken('GTE0', '^\\s*>=\\s*0\.0\.0\\s*$')
createToken('GTE0PRE', '^\\s*>=\\s*0\.0\.0-0\\s*$')


/***/ }),

/***/ "./node_modules/semver/ranges/gtr.js":
/*!*******************************************!*\
  !*** ./node_modules/semver/ranges/gtr.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Determine if version is greater than all the versions possible in the range.
const outside = __webpack_require__(/*! ./outside */ "./node_modules/semver/ranges/outside.js")
const gtr = (version, range, options) => outside(version, range, '>', options)
module.exports = gtr


/***/ }),

/***/ "./node_modules/semver/ranges/intersects.js":
/*!**************************************************!*\
  !*** ./node_modules/semver/ranges/intersects.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(/*! ../classes/range */ "./node_modules/semver/classes/range.js")
const intersects = (r1, r2, options) => {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}
module.exports = intersects


/***/ }),

/***/ "./node_modules/semver/ranges/ltr.js":
/*!*******************************************!*\
  !*** ./node_modules/semver/ranges/ltr.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const outside = __webpack_require__(/*! ./outside */ "./node_modules/semver/ranges/outside.js")
// Determine if version is less than all the versions possible in the range
const ltr = (version, range, options) => outside(version, range, '<', options)
module.exports = ltr


/***/ }),

/***/ "./node_modules/semver/ranges/max-satisfying.js":
/*!******************************************************!*\
  !*** ./node_modules/semver/ranges/max-satisfying.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/semver/classes/semver.js")
const Range = __webpack_require__(/*! ../classes/range */ "./node_modules/semver/classes/range.js")

const maxSatisfying = (versions, range, options) => {
  let max = null
  let maxSV = null
  let rangeObj = null
  try {
    rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}
module.exports = maxSatisfying


/***/ }),

/***/ "./node_modules/semver/ranges/min-satisfying.js":
/*!******************************************************!*\
  !*** ./node_modules/semver/ranges/min-satisfying.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/semver/classes/semver.js")
const Range = __webpack_require__(/*! ../classes/range */ "./node_modules/semver/classes/range.js")
const minSatisfying = (versions, range, options) => {
  let min = null
  let minSV = null
  let rangeObj = null
  try {
    rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}
module.exports = minSatisfying


/***/ }),

/***/ "./node_modules/semver/ranges/min-version.js":
/*!***************************************************!*\
  !*** ./node_modules/semver/ranges/min-version.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/semver/classes/semver.js")
const Range = __webpack_require__(/*! ../classes/range */ "./node_modules/semver/classes/range.js")
const gt = __webpack_require__(/*! ../functions/gt */ "./node_modules/semver/functions/gt.js")

const minVersion = (range, loose) => {
  range = new Range(range, loose)

  let minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i]

    let setMin = null
    comparators.forEach((comparator) => {
      // Clone to avoid manipulating the comparator's semver object.
      const compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!setMin || gt(compver, setMin)) {
            setMin = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error(`Unexpected operation: ${comparator.operator}`)
      }
    })
    if (setMin && (!minver || gt(minver, setMin)))
      minver = setMin
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}
module.exports = minVersion


/***/ }),

/***/ "./node_modules/semver/ranges/outside.js":
/*!***********************************************!*\
  !*** ./node_modules/semver/ranges/outside.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/semver/classes/semver.js")
const Comparator = __webpack_require__(/*! ../classes/comparator */ "./node_modules/semver/classes/comparator.js")
const {ANY} = Comparator
const Range = __webpack_require__(/*! ../classes/range */ "./node_modules/semver/classes/range.js")
const satisfies = __webpack_require__(/*! ../functions/satisfies */ "./node_modules/semver/functions/satisfies.js")
const gt = __webpack_require__(/*! ../functions/gt */ "./node_modules/semver/functions/gt.js")
const lt = __webpack_require__(/*! ../functions/lt */ "./node_modules/semver/functions/lt.js")
const lte = __webpack_require__(/*! ../functions/lte */ "./node_modules/semver/functions/lte.js")
const gte = __webpack_require__(/*! ../functions/gte */ "./node_modules/semver/functions/gte.js")

const outside = (version, range, hilo, options) => {
  version = new SemVer(version, options)
  range = new Range(range, options)

  let gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisfies the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i]

    let high = null
    let low = null

    comparators.forEach((comparator) => {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

module.exports = outside


/***/ }),

/***/ "./node_modules/semver/ranges/simplify.js":
/*!************************************************!*\
  !*** ./node_modules/semver/ranges/simplify.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// given a set of versions and a range, create a "simplified" range
// that includes the same versions that the original range does
// If the original range is shorter than the simplified one, return that.
const satisfies = __webpack_require__(/*! ../functions/satisfies.js */ "./node_modules/semver/functions/satisfies.js")
const compare = __webpack_require__(/*! ../functions/compare.js */ "./node_modules/semver/functions/compare.js")
module.exports = (versions, range, options) => {
  const set = []
  let min = null
  let prev = null
  const v = versions.sort((a, b) => compare(a, b, options))
  for (const version of v) {
    const included = satisfies(version, range, options)
    if (included) {
      prev = version
      if (!min)
        min = version
    } else {
      if (prev) {
        set.push([min, prev])
      }
      prev = null
      min = null
    }
  }
  if (min)
    set.push([min, null])

  const ranges = []
  for (const [min, max] of set) {
    if (min === max)
      ranges.push(min)
    else if (!max && min === v[0])
      ranges.push('*')
    else if (!max)
      ranges.push(`>=${min}`)
    else if (min === v[0])
      ranges.push(`<=${max}`)
    else
      ranges.push(`${min} - ${max}`)
  }
  const simplified = ranges.join(' || ')
  const original = typeof range.raw === 'string' ? range.raw : String(range)
  return simplified.length < original.length ? simplified : range
}


/***/ }),

/***/ "./node_modules/semver/ranges/subset.js":
/*!**********************************************!*\
  !*** ./node_modules/semver/ranges/subset.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(/*! ../classes/range.js */ "./node_modules/semver/classes/range.js")
const Comparator = __webpack_require__(/*! ../classes/comparator.js */ "./node_modules/semver/classes/comparator.js")
const { ANY } = Comparator
const satisfies = __webpack_require__(/*! ../functions/satisfies.js */ "./node_modules/semver/functions/satisfies.js")
const compare = __webpack_require__(/*! ../functions/compare.js */ "./node_modules/semver/functions/compare.js")

// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
// - Every simple range `r1, r2, ...` is a null set, OR
// - Every simple range `r1, r2, ...` which is not a null set is a subset of
//   some `R1, R2, ...`
//
// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
// - If c is only the ANY comparator
//   - If C is only the ANY comparator, return true
//   - Else if in prerelease mode, return false
//   - else replace c with `[>=0.0.0]`
// - If C is only the ANY comparator
//   - if in prerelease mode, return true
//   - else replace C with `[>=0.0.0]`
// - Let EQ be the set of = comparators in c
// - If EQ is more than one, return true (null set)
// - Let GT be the highest > or >= comparator in c
// - Let LT be the lowest < or <= comparator in c
// - If GT and LT, and GT.semver > LT.semver, return true (null set)
// - If any C is a = range, and GT or LT are set, return false
// - If EQ
//   - If GT, and EQ does not satisfy GT, return true (null set)
//   - If LT, and EQ does not satisfy LT, return true (null set)
//   - If EQ satisfies every C, return true
//   - Else return false
// - If GT
//   - If GT.semver is lower than any > or >= comp in C, return false
//   - If GT is >=, and GT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the GT.semver tuple, return false
// - If LT
//   - If LT.semver is greater than any < or <= comp in C, return false
//   - If LT is <=, and LT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the LT.semver tuple, return false
// - Else return true

const subset = (sub, dom, options = {}) => {
  if (sub === dom)
    return true

  sub = new Range(sub, options)
  dom = new Range(dom, options)
  let sawNonNull = false

  OUTER: for (const simpleSub of sub.set) {
    for (const simpleDom of dom.set) {
      const isSub = simpleSubset(simpleSub, simpleDom, options)
      sawNonNull = sawNonNull || isSub !== null
      if (isSub)
        continue OUTER
    }
    // the null set is a subset of everything, but null simple ranges in
    // a complex range should be ignored.  so if we saw a non-null range,
    // then we know this isn't a subset, but if EVERY simple range was null,
    // then it is a subset.
    if (sawNonNull)
      return false
  }
  return true
}

const simpleSubset = (sub, dom, options) => {
  if (sub === dom)
    return true

  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY)
      return true
    else if (options.includePrerelease)
      sub = [ new Comparator('>=0.0.0-0') ]
    else
      sub = [ new Comparator('>=0.0.0') ]
  }

  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease)
      return true
    else
      dom = [ new Comparator('>=0.0.0') ]
  }

  const eqSet = new Set()
  let gt, lt
  for (const c of sub) {
    if (c.operator === '>' || c.operator === '>=')
      gt = higherGT(gt, c, options)
    else if (c.operator === '<' || c.operator === '<=')
      lt = lowerLT(lt, c, options)
    else
      eqSet.add(c.semver)
  }

  if (eqSet.size > 1)
    return null

  let gtltComp
  if (gt && lt) {
    gtltComp = compare(gt.semver, lt.semver, options)
    if (gtltComp > 0)
      return null
    else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<='))
      return null
  }

  // will iterate one or zero times
  for (const eq of eqSet) {
    if (gt && !satisfies(eq, String(gt), options))
      return null

    if (lt && !satisfies(eq, String(lt), options))
      return null

    for (const c of dom) {
      if (!satisfies(eq, String(c), options))
        return false
    }

    return true
  }

  let higher, lower
  let hasDomLT, hasDomGT
  // if the subset has a prerelease, we need a comparator in the superset
  // with the same tuple and a prerelease, or it's not a subset
  let needDomLTPre = lt &&
    !options.includePrerelease &&
    lt.semver.prerelease.length ? lt.semver : false
  let needDomGTPre = gt &&
    !options.includePrerelease &&
    gt.semver.prerelease.length ? gt.semver : false
  // exception: <1.2.3-0 is the same as <1.2.3
  if (needDomLTPre && needDomLTPre.prerelease.length === 1 &&
      lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
    needDomLTPre = false
  }

  for (const c of dom) {
    hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>='
    hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<='
    if (gt) {
      if (needDomGTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length &&
            c.semver.major === needDomGTPre.major &&
            c.semver.minor === needDomGTPre.minor &&
            c.semver.patch === needDomGTPre.patch) {
          needDomGTPre = false
        }
      }
      if (c.operator === '>' || c.operator === '>=') {
        higher = higherGT(gt, c, options)
        if (higher === c && higher !== gt)
          return false
      } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options))
        return false
    }
    if (lt) {
      if (needDomLTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length &&
            c.semver.major === needDomLTPre.major &&
            c.semver.minor === needDomLTPre.minor &&
            c.semver.patch === needDomLTPre.patch) {
          needDomLTPre = false
        }
      }
      if (c.operator === '<' || c.operator === '<=') {
        lower = lowerLT(lt, c, options)
        if (lower === c && lower !== lt)
          return false
      } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options))
        return false
    }
    if (!c.operator && (lt || gt) && gtltComp !== 0)
      return false
  }

  // if there was a < or >, and nothing in the dom, then must be false
  // UNLESS it was limited by another range in the other direction.
  // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
  if (gt && hasDomLT && !lt && gtltComp !== 0)
    return false

  if (lt && hasDomGT && !gt && gtltComp !== 0)
    return false

  // we needed a prerelease range in a specific tuple, but didn't get one
  // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
  // because it includes prereleases in the 1.2.3 tuple
  if (needDomGTPre || needDomLTPre)
    return false

  return true
}

// >=1.2.3 is lower than >1.2.3
const higherGT = (a, b, options) => {
  if (!a)
    return b
  const comp = compare(a.semver, b.semver, options)
  return comp > 0 ? a
    : comp < 0 ? b
    : b.operator === '>' && a.operator === '>=' ? b
    : a
}

// <=1.2.3 is higher than <1.2.3
const lowerLT = (a, b, options) => {
  if (!a)
    return b
  const comp = compare(a.semver, b.semver, options)
  return comp < 0 ? a
    : comp > 0 ? b
    : b.operator === '<' && a.operator === '<=' ? b
    : a
}

module.exports = subset


/***/ }),

/***/ "./node_modules/semver/ranges/to-comparators.js":
/*!******************************************************!*\
  !*** ./node_modules/semver/ranges/to-comparators.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(/*! ../classes/range */ "./node_modules/semver/classes/range.js")

// Mostly just for testing and legacy API reasons
const toComparators = (range, options) =>
  new Range(range, options).set
    .map(comp => comp.map(c => c.value).join(' ').trim().split(' '))

module.exports = toComparators


/***/ }),

/***/ "./node_modules/semver/ranges/valid.js":
/*!*********************************************!*\
  !*** ./node_modules/semver/ranges/valid.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Range = __webpack_require__(/*! ../classes/range */ "./node_modules/semver/classes/range.js")
const validRange = (range, options) => {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}
module.exports = validRange


/***/ }),

/***/ "./node_modules/yallist/iterator.js":
/*!******************************************!*\
  !*** ./node_modules/yallist/iterator.js ***!
  \******************************************/
/***/ ((module) => {

"use strict";

module.exports = function (Yallist) {
  Yallist.prototype[Symbol.iterator] = function* () {
    for (let walker = this.head; walker; walker = walker.next) {
      yield walker.value
    }
  }
}


/***/ }),

/***/ "./node_modules/yallist/yallist.js":
/*!*****************************************!*\
  !*** ./node_modules/yallist/yallist.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = Yallist

Yallist.Node = Node
Yallist.create = Yallist

function Yallist (list) {
  var self = this
  if (!(self instanceof Yallist)) {
    self = new Yallist()
  }

  self.tail = null
  self.head = null
  self.length = 0

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item)
    })
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i])
    }
  }

  return self
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list')
  }

  var next = node.next
  var prev = node.prev

  if (next) {
    next.prev = prev
  }

  if (prev) {
    prev.next = next
  }

  if (node === this.head) {
    this.head = next
  }
  if (node === this.tail) {
    this.tail = prev
  }

  node.list.length--
  node.next = null
  node.prev = null
  node.list = null

  return next
}

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var head = this.head
  node.list = this
  node.next = head
  if (head) {
    head.prev = node
  }

  this.head = node
  if (!this.tail) {
    this.tail = node
  }
  this.length++
}

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return
  }

  if (node.list) {
    node.list.removeNode(node)
  }

  var tail = this.tail
  node.list = this
  node.prev = tail
  if (tail) {
    tail.next = node
  }

  this.tail = node
  if (!this.head) {
    this.head = node
  }
  this.length++
}

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i])
  }
  return this.length
}

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined
  }

  var res = this.tail.value
  this.tail = this.tail.prev
  if (this.tail) {
    this.tail.next = null
  } else {
    this.head = null
  }
  this.length--
  return res
}

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined
  }

  var res = this.head.value
  this.head = this.head.next
  if (this.head) {
    this.head.prev = null
  } else {
    this.tail = null
  }
  this.length--
  return res
}

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.next
  }
}

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this)
    walker = walker.prev
  }
}

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev
  }
  if (i === n && walker !== null) {
    return walker.value
  }
}

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.next
  }
  return res
}

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this
  var res = new Yallist()
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this))
    walker = walker.prev
  }
  return res
}

Yallist.prototype.reduce = function (fn, initial) {
  var acc
  var walker = this.head
  if (arguments.length > 1) {
    acc = initial
  } else if (this.head) {
    walker = this.head.next
    acc = this.head.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i)
    walker = walker.next
  }

  return acc
}

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc
  var walker = this.tail
  if (arguments.length > 1) {
    acc = initial
  } else if (this.tail) {
    walker = this.tail.prev
    acc = this.tail.value
  } else {
    throw new TypeError('Reduce of empty list with no initial value')
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i)
    walker = walker.prev
  }

  return acc
}

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.next
  }
  return arr
}

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length)
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value
    walker = walker.prev
  }
  return arr
}

Yallist.prototype.slice = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length
  if (to < 0) {
    to += this.length
  }
  from = from || 0
  if (from < 0) {
    from += this.length
  }
  var ret = new Yallist()
  if (to < from || to < 0) {
    return ret
  }
  if (from < 0) {
    from = 0
  }
  if (to > this.length) {
    to = this.length
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value)
  }
  return ret
}

Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1
  }
  if (start < 0) {
    start = this.length + start;
  }

  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next
  }

  var ret = []
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value)
    walker = this.removeNode(walker)
  }
  if (walker === null) {
    walker = this.tail
  }

  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev
  }

  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i])
  }
  return ret;
}

Yallist.prototype.reverse = function () {
  var head = this.head
  var tail = this.tail
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev
    walker.prev = walker.next
    walker.next = p
  }
  this.head = tail
  this.tail = head
  return this
}

function insert (self, node, value) {
  var inserted = node === self.head ?
    new Node(value, null, node, self) :
    new Node(value, node, node.next, self)

  if (inserted.next === null) {
    self.tail = inserted
  }
  if (inserted.prev === null) {
    self.head = inserted
  }

  self.length++

  return inserted
}

function push (self, item) {
  self.tail = new Node(item, self.tail, null, self)
  if (!self.head) {
    self.head = self.tail
  }
  self.length++
}

function unshift (self, item) {
  self.head = new Node(item, null, self.head, self)
  if (!self.tail) {
    self.tail = self.head
  }
  self.length++
}

function Node (value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list)
  }

  this.list = list
  this.value = value

  if (prev) {
    prev.next = this
    this.prev = prev
  } else {
    this.prev = null
  }

  if (next) {
    next.prev = this
    this.next = next
  } else {
    this.next = null
  }
}

try {
  // add if support for Symbol.iterator is present
  __webpack_require__(/*! ./iterator.js */ "./node_modules/yallist/iterator.js")(Yallist)
} catch (er) {}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/ledgerApp.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addEventListeners": () => (/* binding */ addEventListeners),
/* harmony export */   "connect": () => (/* binding */ connect),
/* harmony export */   "disconnect": () => (/* binding */ disconnect),
/* harmony export */   "getAccount": () => (/* binding */ getAccount),
/* harmony export */   "getAppInfo": () => (/* binding */ getAppInfo),
/* harmony export */   "getVersion": () => (/* binding */ getVersion),
/* harmony export */   "isConnected": () => (/* binding */ isConnected),
/* harmony export */   "showAccount": () => (/* binding */ showAccount),
/* harmony export */   "sign": () => (/* binding */ sign)
/* harmony export */ });
/* harmony import */ var _ledgerhq_hw_transport_webusb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ledgerhq/hw-transport-webusb */ "./node_modules/@ledgerhq/hw-transport-webusb/lib-es/TransportWebUSB.js");
/* harmony import */ var _zondax_ledger_casper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @zondax/ledger-casper */ "./node_modules/@zondax/ledger-casper/dist/index.js");
/* harmony import */ var _zondax_ledger_casper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_zondax_ledger_casper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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



var SEC_KEY_PREFIX = '02';
var LedgerAppSingleton = (function () {
    var dotNetLedgerInstance;
    var transport;
    var ledgerApp;
    var isConnected = false;
    function addEventListeners(instance) {
        dotNetLedgerInstance = instance;
    }
    function getVersion() {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _ledgerhq_hw_transport_webusb__WEBPACK_IMPORTED_MODULE_0__["default"].create()];
                    case 1:
                        transport = _a.sent();
                        ledgerApp = new (_zondax_ledger_casper__WEBPACK_IMPORTED_MODULE_1___default())(transport);
                        return [4 /*yield*/, ledgerApp.getVersion()];
                    case 2:
                        response = _a.sent();
                        if (response.returnCode !== 0x9000)
                            return [2 /*return*/, Promise.reject(new Error("Error: ".concat(response.errorMessage, " (0x").concat(response.returnCode.toString(16), ").")))];
                        return [2 /*return*/, response];
                }
            });
        });
    }
    function getAppInfo() {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _ledgerhq_hw_transport_webusb__WEBPACK_IMPORTED_MODULE_0__["default"].create()];
                    case 1:
                        transport = _a.sent();
                        ledgerApp = new (_zondax_ledger_casper__WEBPACK_IMPORTED_MODULE_1___default())(transport);
                        return [4 /*yield*/, ledgerApp.getAppInfo()];
                    case 2:
                        response = _a.sent();
                        if (response.returnCode !== 0x9000)
                            return [2 /*return*/, Promise.reject(new Error("Error: ".concat(response.errorMessage, " (0x").concat(response.returnCode.toString(16), ").")))];
                        return [2 /*return*/, response];
                }
            });
        });
    }
    function onDisconnect() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("Device disconnected.");
                transport.close();
                if (typeof dotNetLedgerInstance !== 'undefined')
                    dotNetLedgerInstance.invokeMethodAsync('UpdateState', false, '');
                isConnected = false;
                return [2 /*return*/];
            });
        });
    }
    var encodePublicKey = function (bytes) {
        return SEC_KEY_PREFIX + buffer__WEBPACK_IMPORTED_MODULE_2__.Buffer.from(bytes).toString('hex');
    };
    var getAccountPath = function (acctIdx) { return "m/44'/506'/0'/0/".concat(acctIdx.toString()); };
    function connect(acctIdx) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, response, activePk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!isConnected) return [3 /*break*/, 6];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, _ledgerhq_hw_transport_webusb__WEBPACK_IMPORTED_MODULE_0__["default"].create()];
                    case 2:
                        transport = _a.sent();
                        transport.on('disconnect', function () { return onDisconnect(); });
                        ledgerApp = new (_zondax_ledger_casper__WEBPACK_IMPORTED_MODULE_1___default())(transport);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2 /*return*/, Promise.reject(new Error("Error connecting to a Ledger device: ".concat(error_1.message, ".")))];
                    case 4: return [4 /*yield*/, ledgerApp.getAddressAndPubKey(getAccountPath(acctIdx))];
                    case 5:
                        response = _a.sent();
                        if (response.returnCode !== 0x9000)
                            return [2 /*return*/, Promise.reject(new Error("Error connecting to a Ledger device: ".concat(response.errorMessage, " (0x").concat(response.returnCode.toString(16), ").")))];
                        isConnected = true;
                        activePk = encodePublicKey(response.publicKey);
                        if (typeof dotNetLedgerInstance !== 'undefined')
                            dotNetLedgerInstance.invokeMethodAsync('UpdateState', true, activePk);
                        return [2 /*return*/, activePk];
                    case 6: return [4 /*yield*/, getAccount(acctIdx)];
                    case 7: return [2 /*return*/, _a.sent()];
                }
            });
        });
    }
    function disconnect() {
        if (isConnected) {
            transport.close();
            isConnected = false;
            if (typeof dotNetLedgerInstance !== 'undefined')
                dotNetLedgerInstance.invokeMethodAsync('UpdateState', false, '');
        }
    }
    function getAccount(acctIdx) {
        return __awaiter(this, void 0, void 0, function () {
            var response, activePk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isConnected) return [3 /*break*/, 2];
                        return [4 /*yield*/, ledgerApp.getAddressAndPubKey(getAccountPath(acctIdx))];
                    case 1:
                        response = _a.sent();
                        if (response.returnCode !== 0x9000)
                            return [2 /*return*/, Promise.reject(new Error("Error: ".concat(response.errorMessage, " (0x").concat(response.returnCode.toString(16), ").")))];
                        activePk = encodePublicKey(response.publicKey);
                        if (typeof dotNetLedgerInstance !== 'undefined')
                            dotNetLedgerInstance.invokeMethodAsync('UpdateState', true, activePk);
                        return [2 /*return*/, activePk];
                    case 2: return [2 /*return*/, Promise.reject(new Error("Not connected."))];
                }
            });
        });
    }
    function showAccount(acctIdx) {
        return __awaiter(this, void 0, void 0, function () {
            var response, activePk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isConnected) return [3 /*break*/, 2];
                        return [4 /*yield*/, ledgerApp.showAddressAndPubKey(getAccountPath(acctIdx))];
                    case 1:
                        response = _a.sent();
                        if (response.returnCode === 0x6986)
                            return [2 /*return*/, null];
                        if (response.returnCode !== 0x9000)
                            return [2 /*return*/, Promise.reject(new Error("Error: ".concat(response.errorMessage, " (0x").concat(response.returnCode.toString(16), ").")))];
                        activePk = encodePublicKey(response.publicKey);
                        if (typeof dotNetLedgerInstance !== 'undefined')
                            dotNetLedgerInstance.invokeMethodAsync('UpdateState', true, activePk);
                        return [2 /*return*/, activePk];
                    case 2: return [2 /*return*/, Promise.reject(new Error("Not connected."))];
                }
            });
        });
    }
    function sign(acctIdx, deployBytes) {
        return __awaiter(this, void 0, void 0, function () {
            var ledgerApp_1, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isConnected) return [3 /*break*/, 2];
                        ledgerApp_1 = new (_zondax_ledger_casper__WEBPACK_IMPORTED_MODULE_1___default())(transport);
                        return [4 /*yield*/, ledgerApp_1.sign(getAccountPath(acctIdx), deployBytes)];
                    case 1:
                        response = _a.sent();
                        if (response.returnCode === 0x6986)
                            return [2 /*return*/, null];
                        if (response.returnCode !== 0x9000)
                            return [2 /*return*/, Promise.reject(new Error("Error: ".concat(response.errorMessage, " (0x").concat(response.returnCode.toString(16), ").")))];
                        console.log('sign completed: ' + response);
                        return [2 /*return*/, SEC_KEY_PREFIX + response.signatureRS.toString('hex')];
                    case 2: return [2 /*return*/, Promise.reject(new Error("Not connected."))];
                }
            });
        });
    }
    return {
        addEventListeners: addEventListeners,
        connect: connect,
        disconnect: disconnect,
        getVersion: getVersion,
        getAppInfo: getAppInfo,
        isConnected: function () { return isConnected; },
        getAccount: getAccount,
        showAccount: showAccount,
        sign: sign
    };
})();
var addEventListeners = function (ref) { return LedgerAppSingleton.addEventListeners(ref); };
var getVersion = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, LedgerAppSingleton.getVersion()];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
var getAppInfo = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, LedgerAppSingleton.getAppInfo()];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
var connect = function (acctIdx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, LedgerAppSingleton.connect(acctIdx)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
var disconnect = function () { return LedgerAppSingleton.disconnect(); };
var isConnected = function () { return LedgerAppSingleton.isConnected(); };
var getAccount = function (acctIdx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, LedgerAppSingleton.getAccount(acctIdx)];
}); }); };
var showAccount = function (acctIdx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, LedgerAppSingleton.showAccount(acctIdx)];
}); }); };
var sign = function (acctIdx, deployBytes) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, LedgerAppSingleton.sign(acctIdx, deployBytes)];
}); }); };

})();

window.ledgerInterop = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHdDQUF3QyxTQUFTO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLGlCQUFpQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxFQUFFO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGVBQWU7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EseUJBQXlCLFFBQVE7QUFDakM7QUFDQSxzQkFBc0IsZUFBZTtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxZQUFZO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLFNBQVM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLFNBQVM7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0Isc0JBQXNCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlDQUFpQyxRQUFRO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUM3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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdURBQXVELFFBQVE7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQzlS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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDN05BLGNBQWMsbUJBQU8sQ0FBQyxnRUFBa0I7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ1BBLGNBQWMsbUJBQU8sQ0FBQyxnRUFBa0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDVlk7QUFDWjtBQUNBO0FBQ0EsaUNBQWlDLFFBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1BZO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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QixDQUFDLFVBQVUsRUFBRTtnQkFBckMsK0JBQXFDOztTQUFBLENBQUM7QUFDckUsSUFBTSxVQUFVLEdBQUc7O2dCQUFZLHFCQUFNLGtCQUFrQixDQUFDLFVBQVUsRUFBRTtnQkFBckMsK0JBQXFDOztTQUFBLENBQUM7QUFDckUsSUFBTSxPQUFPLEdBQUcsVUFBTyxPQUFlOztnQkFBSyxxQkFBTSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2dCQUF6QywrQkFBeUM7O1NBQUEsQ0FBQztBQUNyRixJQUFNLFVBQVUsR0FBRyxjQUFNLHlCQUFrQixDQUFDLFVBQVUsRUFBRSxFQUEvQixDQUErQixDQUFDO0FBQ3pELElBQU0sV0FBVyxHQUFHLGNBQU0seUJBQWtCLENBQUMsV0FBVyxFQUFFLEVBQWhDLENBQWdDLENBQUM7QUFDM0QsSUFBTSxVQUFVLEdBQUcsVUFBTyxPQUFlO0lBQUssd0NBQWtCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztTQUFBLENBQUM7QUFDckYsSUFBTSxXQUFXLEdBQUcsVUFBTyxPQUFlO0lBQUssd0NBQWtCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztTQUFBLENBQUM7QUFDdkYsSUFBTSxJQUFJLEdBQUcsVUFBTyxPQUFlLEVBQUUsV0FBZ0I7SUFBSyx3Q0FBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQztTQUFBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL0BsZWRnZXJocS9kZXZpY2VzL2xpYi1lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL0BsZWRnZXJocS9kZXZpY2VzL2xpYi9oaWQtZnJhbWluZy5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL0BsZWRnZXJocS9lcnJvcnMvbGliLWVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9AbGVkZ2VyaHEvZXJyb3JzL2xpYi1lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL0BsZWRnZXJocS9ody10cmFuc3BvcnQtd2VidXNiL2xpYi1lcy9UcmFuc3BvcnRXZWJVU0IuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9AbGVkZ2VyaHEvaHctdHJhbnNwb3J0LXdlYnVzYi9saWItZXMvd2VidXNiLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvQGxlZGdlcmhxL2h3LXRyYW5zcG9ydC9saWItZXMvVHJhbnNwb3J0LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvQGxlZGdlcmhxL2xvZ3MvbGliLWVzL2luZGV4LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvQHpvbmRheC9sZWRnZXItY2FzcGVyL2Rpc3QvY29tbW9uLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvQHpvbmRheC9sZWRnZXItY2FzcGVyL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9Aem9uZGF4L2xlZGdlci1jYXNwZXIvZGlzdC90eXBlcy5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvbHJ1LWNhY2hlL2luZGV4LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2NsYXNzZXMvY29tcGFyYXRvci5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9jbGFzc2VzL3JhbmdlLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2NsYXNzZXMvc2VtdmVyLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9jbGVhbi5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvY21wLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9jb2VyY2UuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2NvbXBhcmUtYnVpbGQuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2NvbXBhcmUtbG9vc2UuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2NvbXBhcmUuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2RpZmYuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2VxLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9ndC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvZ3RlLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9pbmMuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2x0LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9sdGUuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL21ham9yLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9taW5vci5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvbmVxLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9wYXJzZS5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvcGF0Y2guanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3ByZXJlbGVhc2UuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3Jjb21wYXJlLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9yc29ydC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvc2F0aXNmaWVzLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9zb3J0LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy92YWxpZC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbnRlcm5hbC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvaW50ZXJuYWwvZGVidWcuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvaW50ZXJuYWwvaWRlbnRpZmllcnMuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvaW50ZXJuYWwvcGFyc2Utb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbnRlcm5hbC9yZS5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvZ3RyLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9pbnRlcnNlY3RzLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9sdHIuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL21heC1zYXRpc2Z5aW5nLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9taW4tc2F0aXNmeWluZy5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvbWluLXZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL291dHNpZGUuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL3NpbXBsaWZ5LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9zdWJzZXQuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL3RvLWNvbXBhcmF0b3JzLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy92YWxpZC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3lhbGxpc3QvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy95YWxsaXN0L3lhbGxpc3QuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2xlZGdlckludGVyb3Avd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xlZGdlckludGVyb3Avd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL3NyYy9sZWRnZXJBcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfYTtcbmltcG9ydCBzZW12ZXIgZnJvbSBcInNlbXZlclwiO1xuLyoqXG4gKiBUaGUgVVNCIHByb2R1Y3QgSURzIHdpbGwgYmUgZGVmaW5lZCBhcyBNTUlJLCBlbmNvZGluZyBhIG1vZGVsIChNTSkgYW5kIGFuIGludGVyZmFjZSBiaXRmaWVsZCAoSUkpXG4gKlxuICoqIE1vZGVsXG4gKiBMZWRnZXIgTmFubyBTIDogMHgxMFxuICogTGVkZ2VyIEJsdWUgOiAweDAwXG4gKiBMZWRnZXIgTmFubyBYIDogMHg0MFxuICpcbiAqKiBJbnRlcmZhY2Ugc3VwcG9ydCBiaXRmaWVsZFxuICogR2VuZXJpYyBISUQgOiAweDAxXG4gKiBLZXlib2FyZCBISUQgOiAweDAyXG4gKiBVMkYgOiAweDA0XG4gKiBDQ0lEIDogMHgwOFxuICogV2ViVVNCIDogMHgxMFxuICovXG5leHBvcnQgdmFyIElJR2VuZXJpY0hJRCA9IDB4MDE7XG5leHBvcnQgdmFyIElJS2V5Ym9hcmRISUQgPSAweDAyO1xuZXhwb3J0IHZhciBJSVUyRiA9IDB4MDQ7XG5leHBvcnQgdmFyIElJQ0NJRCA9IDB4MDg7XG5leHBvcnQgdmFyIElJV2ViVVNCID0gMHgxMDtcbmV4cG9ydCB2YXIgRGV2aWNlTW9kZWxJZDtcbihmdW5jdGlvbiAoRGV2aWNlTW9kZWxJZCkge1xuICAgIERldmljZU1vZGVsSWRbXCJibHVlXCJdID0gXCJibHVlXCI7XG4gICAgRGV2aWNlTW9kZWxJZFtcIm5hbm9TXCJdID0gXCJuYW5vU1wiO1xuICAgIERldmljZU1vZGVsSWRbXCJuYW5vU1BcIl0gPSBcIm5hbm9TUFwiO1xuICAgIERldmljZU1vZGVsSWRbXCJuYW5vWFwiXSA9IFwibmFub1hcIjtcbn0pKERldmljZU1vZGVsSWQgfHwgKERldmljZU1vZGVsSWQgPSB7fSkpO1xudmFyIGRldmljZXMgPSAoX2EgPSB7fSxcbiAgICBfYVtEZXZpY2VNb2RlbElkLmJsdWVdID0ge1xuICAgICAgICBpZDogRGV2aWNlTW9kZWxJZC5ibHVlLFxuICAgICAgICBwcm9kdWN0TmFtZTogXCJMZWRnZXLCoEJsdWVcIixcbiAgICAgICAgcHJvZHVjdElkTU06IDB4MDAsXG4gICAgICAgIGxlZ2FjeVVzYlByb2R1Y3RJZDogMHgwMDAwLFxuICAgICAgICB1c2JPbmx5OiB0cnVlLFxuICAgICAgICBtZW1vcnlTaXplOiA0ODAgKiAxMDI0LFxuICAgICAgICBtYXNrczogWzB4MzEwMDAwMDAsIDB4MzEwMTAwMDBdLFxuICAgICAgICBnZXRCbG9ja1NpemU6IGZ1bmN0aW9uIChfZmlyd2FyZVZlcnNpb24pIHsgcmV0dXJuIDQgKiAxMDI0OyB9XG4gICAgfSxcbiAgICBfYVtEZXZpY2VNb2RlbElkLm5hbm9TXSA9IHtcbiAgICAgICAgaWQ6IERldmljZU1vZGVsSWQubmFub1MsXG4gICAgICAgIHByb2R1Y3ROYW1lOiBcIkxlZGdlcsKgTmFub8KgU1wiLFxuICAgICAgICBwcm9kdWN0SWRNTTogMHgxMCxcbiAgICAgICAgbGVnYWN5VXNiUHJvZHVjdElkOiAweDAwMDEsXG4gICAgICAgIHVzYk9ubHk6IHRydWUsXG4gICAgICAgIG1lbW9yeVNpemU6IDMyMCAqIDEwMjQsXG4gICAgICAgIG1hc2tzOiBbMHgzMTEwMDAwMF0sXG4gICAgICAgIGdldEJsb2NrU2l6ZTogZnVuY3Rpb24gKGZpcm13YXJlVmVyc2lvbikge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgcmV0dXJuIHNlbXZlci5sdCgoX2EgPSBzZW12ZXIuY29lcmNlKGZpcm13YXJlVmVyc2lvbikpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFwiXCIsIFwiMi4wLjBcIilcbiAgICAgICAgICAgICAgICA/IDQgKiAxMDI0XG4gICAgICAgICAgICAgICAgOiAyICogMTAyNDtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgX2FbRGV2aWNlTW9kZWxJZC5uYW5vU1BdID0ge1xuICAgICAgICBpZDogRGV2aWNlTW9kZWxJZC5uYW5vU1AsXG4gICAgICAgIHByb2R1Y3ROYW1lOiBcIkxlZGdlciBOYW5vIFMgUGx1c1wiLFxuICAgICAgICBwcm9kdWN0SWRNTTogMHg1MCxcbiAgICAgICAgbGVnYWN5VXNiUHJvZHVjdElkOiAweDAwMDUsXG4gICAgICAgIHVzYk9ubHk6IHRydWUsXG4gICAgICAgIG1lbW9yeVNpemU6IDE1MzMgKiAxMDI0LFxuICAgICAgICBtYXNrczogWzB4MzMxMDAwMDBdLFxuICAgICAgICBnZXRCbG9ja1NpemU6IGZ1bmN0aW9uIChfZmlybXdhcmVWZXJzaW9uKSB7IHJldHVybiAzMjsgfVxuICAgIH0sXG4gICAgX2FbRGV2aWNlTW9kZWxJZC5uYW5vWF0gPSB7XG4gICAgICAgIGlkOiBEZXZpY2VNb2RlbElkLm5hbm9YLFxuICAgICAgICBwcm9kdWN0TmFtZTogXCJMZWRnZXLCoE5hbm/CoFhcIixcbiAgICAgICAgcHJvZHVjdElkTU06IDB4NDAsXG4gICAgICAgIGxlZ2FjeVVzYlByb2R1Y3RJZDogMHgwMDA0LFxuICAgICAgICB1c2JPbmx5OiBmYWxzZSxcbiAgICAgICAgbWVtb3J5U2l6ZTogMiAqIDEwMjQgKiAxMDI0LFxuICAgICAgICBtYXNrczogWzB4MzMwMDAwMDBdLFxuICAgICAgICBnZXRCbG9ja1NpemU6IGZ1bmN0aW9uIChfZmlyd2FyZVZlcnNpb24pIHsgcmV0dXJuIDQgKiAxMDI0OyB9LFxuICAgICAgICBibHVldG9vdGhTcGVjOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBpcyB0aGUgbGVnYWN5IG9uZSAocHJvdG90eXBlIHZlcnNpb24pLiB3ZSB3aWxsIGV2ZW50dWFsbHkgZHJvcCBpdC5cbiAgICAgICAgICAgICAgICBzZXJ2aWNlVXVpZDogXCJkOTczZjJlMC1iMTllLTExZTItOWU5Ni0wODAwMjAwYzlhNjZcIixcbiAgICAgICAgICAgICAgICBub3RpZnlVdWlkOiBcImQ5NzNmMmUxLWIxOWUtMTFlMi05ZTk2LTA4MDAyMDBjOWE2NlwiLFxuICAgICAgICAgICAgICAgIHdyaXRlVXVpZDogXCJkOTczZjJlMi1iMTllLTExZTItOWU5Ni0wODAwMjAwYzlhNjZcIixcbiAgICAgICAgICAgICAgICB3cml0ZUNtZFV1aWQ6IFwiZDk3M2YyZTMtYjE5ZS0xMWUyLTllOTYtMDgwMDIwMGM5YTY2XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VydmljZVV1aWQ6IFwiMTNkNjM0MDAtMmM5Ny0wMDA0LTAwMDAtNGM2NTY0Njc2NTcyXCIsXG4gICAgICAgICAgICAgICAgbm90aWZ5VXVpZDogXCIxM2Q2MzQwMC0yYzk3LTAwMDQtMDAwMS00YzY1NjQ2NzY1NzJcIixcbiAgICAgICAgICAgICAgICB3cml0ZVV1aWQ6IFwiMTNkNjM0MDAtMmM5Ny0wMDA0LTAwMDItNGM2NTY0Njc2NTcyXCIsXG4gICAgICAgICAgICAgICAgd3JpdGVDbWRVdWlkOiBcIjEzZDYzNDAwLTJjOTctMDAwNC0wMDAzLTRjNjU2NDY3NjU3MlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICBdXG4gICAgfSxcbiAgICBfYSk7XG52YXIgcHJvZHVjdE1hcCA9IHtcbiAgICBCbHVlOiBEZXZpY2VNb2RlbElkLmJsdWUsXG4gICAgXCJOYW5vIFNcIjogRGV2aWNlTW9kZWxJZC5uYW5vUyxcbiAgICBcIk5hbm8gWFwiOiBEZXZpY2VNb2RlbElkLm5hbm9YXG59O1xudmFyIGRldmljZXNMaXN0ID0gT2JqZWN0LnZhbHVlcyhkZXZpY2VzKTtcbi8qKlxuICpcbiAqL1xuZXhwb3J0IHZhciBsZWRnZXJVU0JWZW5kb3JJZCA9IDB4MmM5Nztcbi8qKlxuICpcbiAqL1xuZXhwb3J0IHZhciBnZXREZXZpY2VNb2RlbCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpbmZvID0gZGV2aWNlc1tpZF07XG4gICAgaWYgKCFpbmZvKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkZXZpY2UgJ1wiICsgaWQgKyBcIicgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgcmV0dXJuIGluZm87XG59O1xuLyoqXG4gKiBHaXZlbiBhIGB0YXJnZXRJZGAsIHJldHVybiB0aGUgZGV2aWNlTW9kZWwgYXNzb2NpYXRlZCB0byBpdCxcbiAqIGJhc2VkIG9uIHRoZSBmaXJzdCB0d28gYnl0ZXMuXG4gKi9cbmV4cG9ydCB2YXIgaWRlbnRpZnlUYXJnZXRJZCA9IGZ1bmN0aW9uICh0YXJnZXRJZCkge1xuICAgIHZhciBkZXZpY2VNb2RlbCA9IGRldmljZXNMaXN0LmZpbmQoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgIHZhciBtYXNrcyA9IF9hLm1hc2tzO1xuICAgICAgICByZXR1cm4gbWFza3MuZmluZChmdW5jdGlvbiAobWFzaykgeyByZXR1cm4gKHRhcmdldElkICYgMHhmZmZmMDAwMCkgPT09IG1hc2s7IH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBkZXZpY2VNb2RlbDtcbn07XG4vKipcbiAqXG4gKi9cbmV4cG9ydCB2YXIgaWRlbnRpZnlVU0JQcm9kdWN0SWQgPSBmdW5jdGlvbiAodXNiUHJvZHVjdElkKSB7XG4gICAgdmFyIGxlZ2FjeSA9IGRldmljZXNMaXN0LmZpbmQoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQubGVnYWN5VXNiUHJvZHVjdElkID09PSB1c2JQcm9kdWN0SWQ7IH0pO1xuICAgIGlmIChsZWdhY3kpXG4gICAgICAgIHJldHVybiBsZWdhY3k7XG4gICAgdmFyIG1tID0gdXNiUHJvZHVjdElkID4+IDg7XG4gICAgdmFyIGRldmljZU1vZGVsID0gZGV2aWNlc0xpc3QuZmluZChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5wcm9kdWN0SWRNTSA9PT0gbW07IH0pO1xuICAgIHJldHVybiBkZXZpY2VNb2RlbDtcbn07XG5leHBvcnQgdmFyIGlkZW50aWZ5UHJvZHVjdE5hbWUgPSBmdW5jdGlvbiAocHJvZHVjdE5hbWUpIHtcbiAgICB2YXIgcHJvZHVjdElkID0gcHJvZHVjdE1hcFtwcm9kdWN0TmFtZV07XG4gICAgaWYgKCFwcm9kdWN0SWQgJiYgcHJvZHVjdE5hbWUuc3RhcnRzV2l0aChcIk5hbm8gU1wiKSkge1xuICAgICAgICBwcm9kdWN0SWQgPSBEZXZpY2VNb2RlbElkLm5hbm9TUDtcbiAgICB9XG4gICAgdmFyIGRldmljZU1vZGVsID0gZGV2aWNlc0xpc3QuZmluZChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5pZCA9PT0gcHJvZHVjdElkOyB9KTtcbiAgICByZXR1cm4gZGV2aWNlTW9kZWw7XG59O1xudmFyIGJsdWV0b290aFNlcnZpY2VzID0gW107XG52YXIgc2VydmljZVV1aWRUb0luZm9zID0ge307XG5mb3IgKHZhciBpZCBpbiBkZXZpY2VzKSB7XG4gICAgdmFyIGRldmljZU1vZGVsID0gZGV2aWNlc1tpZF07XG4gICAgdmFyIGJsdWV0b290aFNwZWMgPSBkZXZpY2VNb2RlbC5ibHVldG9vdGhTcGVjO1xuICAgIGlmIChibHVldG9vdGhTcGVjKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmx1ZXRvb3RoU3BlYy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNwZWMgPSBibHVldG9vdGhTcGVjW2ldO1xuICAgICAgICAgICAgYmx1ZXRvb3RoU2VydmljZXMucHVzaChzcGVjLnNlcnZpY2VVdWlkKTtcbiAgICAgICAgICAgIHNlcnZpY2VVdWlkVG9JbmZvc1tzcGVjLnNlcnZpY2VVdWlkXSA9IHNlcnZpY2VVdWlkVG9JbmZvc1tzcGVjLnNlcnZpY2VVdWlkLnJlcGxhY2UoLy0vZywgXCJcIildID0gX19hc3NpZ24oeyBkZXZpY2VNb2RlbDogZGV2aWNlTW9kZWwgfSwgc3BlYyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqXG4gKi9cbmV4cG9ydCB2YXIgZ2V0Qmx1ZXRvb3RoU2VydmljZVV1aWRzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gYmx1ZXRvb3RoU2VydmljZXM7IH07XG4vKipcbiAqXG4gKi9cbmV4cG9ydCB2YXIgZ2V0SW5mb3NGb3JTZXJ2aWNlVXVpZCA9IGZ1bmN0aW9uICh1dWlkKSB7IHJldHVybiBzZXJ2aWNlVXVpZFRvSW5mb3NbdXVpZC50b0xvd2VyQ2FzZSgpXTsgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBlcnJvcnNfMSA9IHJlcXVpcmUoXCJAbGVkZ2VyaHEvZXJyb3JzXCIpO1xudmFyIFRhZyA9IDB4MDU7XG5mdW5jdGlvbiBhc1VJbnQxNkJFKHZhbHVlKSB7XG4gICAgdmFyIGIgPSBCdWZmZXIuYWxsb2MoMik7XG4gICAgYi53cml0ZVVJbnQxNkJFKHZhbHVlLCAwKTtcbiAgICByZXR1cm4gYjtcbn1cbnZhciBpbml0aWFsQWNjID0ge1xuICAgIGRhdGE6IEJ1ZmZlci5hbGxvYygwKSxcbiAgICBkYXRhTGVuZ3RoOiAwLFxuICAgIHNlcXVlbmNlOiAwXG59O1xuLyoqXG4gKlxuICovXG52YXIgY3JlYXRlSElEZnJhbWluZyA9IGZ1bmN0aW9uIChjaGFubmVsLCBwYWNrZXRTaXplKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbWFrZUJsb2NrczogZnVuY3Rpb24gKGFwZHUpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gQnVmZmVyLmNvbmNhdChbYXNVSW50MTZCRShhcGR1Lmxlbmd0aCksIGFwZHVdKTtcbiAgICAgICAgICAgIHZhciBibG9ja1NpemUgPSBwYWNrZXRTaXplIC0gNTtcbiAgICAgICAgICAgIHZhciBuYkJsb2NrcyA9IE1hdGguY2VpbChkYXRhLmxlbmd0aCAvIGJsb2NrU2l6ZSk7XG4gICAgICAgICAgICBkYXRhID0gQnVmZmVyLmNvbmNhdChbXG4gICAgICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgICAgICBCdWZmZXIuYWxsb2MobmJCbG9ja3MgKiBibG9ja1NpemUgLSBkYXRhLmxlbmd0aCArIDEpLmZpbGwoMCksXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIHZhciBibG9ja3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmJCbG9ja3M7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBoZWFkID0gQnVmZmVyLmFsbG9jKDUpO1xuICAgICAgICAgICAgICAgIGhlYWQud3JpdGVVSW50MTZCRShjaGFubmVsLCAwKTtcbiAgICAgICAgICAgICAgICBoZWFkLndyaXRlVUludDgoVGFnLCAyKTtcbiAgICAgICAgICAgICAgICBoZWFkLndyaXRlVUludDE2QkUoaSwgMyk7XG4gICAgICAgICAgICAgICAgdmFyIGNodW5rID0gZGF0YS5zbGljZShpICogYmxvY2tTaXplLCAoaSArIDEpICogYmxvY2tTaXplKTtcbiAgICAgICAgICAgICAgICBibG9ja3MucHVzaChCdWZmZXIuY29uY2F0KFtoZWFkLCBjaHVua10pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBibG9ja3M7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZHVjZVJlc3BvbnNlOiBmdW5jdGlvbiAoYWNjLCBjaHVuaykge1xuICAgICAgICAgICAgdmFyIF9hID0gYWNjIHx8IGluaXRpYWxBY2MsIGRhdGEgPSBfYS5kYXRhLCBkYXRhTGVuZ3RoID0gX2EuZGF0YUxlbmd0aCwgc2VxdWVuY2UgPSBfYS5zZXF1ZW5jZTtcbiAgICAgICAgICAgIGlmIChjaHVuay5yZWFkVUludDE2QkUoMCkgIT09IGNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuVHJhbnNwb3J0RXJyb3IoXCJJbnZhbGlkIGNoYW5uZWxcIiwgXCJJbnZhbGlkQ2hhbm5lbFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaHVuay5yZWFkVUludDgoMikgIT09IFRhZykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5UcmFuc3BvcnRFcnJvcihcIkludmFsaWQgdGFnXCIsIFwiSW52YWxpZFRhZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaHVuay5yZWFkVUludDE2QkUoMykgIT09IHNlcXVlbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLlRyYW5zcG9ydEVycm9yKFwiSW52YWxpZCBzZXF1ZW5jZVwiLCBcIkludmFsaWRTZXF1ZW5jZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYWNjKSB7XG4gICAgICAgICAgICAgICAgZGF0YUxlbmd0aCA9IGNodW5rLnJlYWRVSW50MTZCRSg1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlcXVlbmNlKys7XG4gICAgICAgICAgICB2YXIgY2h1bmtEYXRhID0gY2h1bmsuc2xpY2UoYWNjID8gNSA6IDcpO1xuICAgICAgICAgICAgZGF0YSA9IEJ1ZmZlci5jb25jYXQoW2RhdGEsIGNodW5rRGF0YV0pO1xuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gZGF0YUxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnNsaWNlKDAsIGRhdGFMZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgICAgIGRhdGFMZW5ndGg6IGRhdGFMZW5ndGgsXG4gICAgICAgICAgICAgICAgc2VxdWVuY2U6IHNlcXVlbmNlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBnZXRSZWR1Y2VkUmVzdWx0OiBmdW5jdGlvbiAoYWNjKSB7XG4gICAgICAgICAgICBpZiAoYWNjICYmIGFjYy5kYXRhTGVuZ3RoID09PSBhY2MuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gY3JlYXRlSElEZnJhbWluZztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhpZC1mcmFtaW5nLmpzLm1hcCIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnRpbnVlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvdHlwZS1idWlsdGlucyAqL1xudmFyIF9fdmFsdWVzID0gKHRoaXMgJiYgdGhpcy5fX3ZhbHVlcykgfHwgZnVuY3Rpb24obykge1xuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XG59O1xudmFyIGVycm9yQ2xhc3NlcyA9IHt9O1xudmFyIGRlc2VyaWFsaXplcnMgPSB7fTtcbmV4cG9ydCB2YXIgYWRkQ3VzdG9tRXJyb3JEZXNlcmlhbGl6ZXIgPSBmdW5jdGlvbiAobmFtZSwgZGVzZXJpYWxpemVyKSB7XG4gICAgZGVzZXJpYWxpemVyc1tuYW1lXSA9IGRlc2VyaWFsaXplcjtcbn07XG5leHBvcnQgdmFyIGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBDID0gZnVuY3Rpb24gQ3VzdG9tRXJyb3IobWVzc2FnZSwgZmllbGRzKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgZmllbGRzKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCBuYW1lO1xuICAgICAgICB0aGlzLnN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2s7XG4gICAgfTtcbiAgICBDLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuICAgIGVycm9yQ2xhc3Nlc1tuYW1lXSA9IEM7XG4gICAgcmV0dXJuIEM7XG59O1xuLy8gaW5zcGlyZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vcHJvZ3JhbWJsZS9lcnJpby9ibG9iL21hc3Rlci9pbmRleC5qc1xuZXhwb3J0IHZhciBkZXNlcmlhbGl6ZUVycm9yID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIGlmICh0eXBlb2Ygb2JqZWN0ID09PSBcIm9iamVjdFwiICYmIG9iamVjdCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gJEZsb3dGaXhNZSBGSVhNRSBIQUNLXG4gICAgICAgICAgICB2YXIgbXNnID0gSlNPTi5wYXJzZShvYmplY3QubWVzc2FnZSk7XG4gICAgICAgICAgICBpZiAobXNnLm1lc3NhZ2UgJiYgbXNnLm5hbWUpIHtcbiAgICAgICAgICAgICAgICBvYmplY3QgPSBtc2c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIG5vdGhpbmdcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSB2b2lkIDA7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0Lm5hbWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHZhciBuYW1lXzEgPSBvYmplY3QubmFtZTtcbiAgICAgICAgICAgIHZhciBkZXMgPSBkZXNlcmlhbGl6ZXJzW25hbWVfMV07XG4gICAgICAgICAgICBpZiAoZGVzKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBkZXMob2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBjb25zdHJ1Y3RvciA9IG5hbWVfMSA9PT0gXCJFcnJvclwiID8gRXJyb3IgOiBlcnJvckNsYXNzZXNbbmFtZV8xXTtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcImRlc2VyaWFsaXppbmcgYW4gdW5rbm93biBjbGFzcyAnXCIgKyBuYW1lXzEgKyBcIidcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhuYW1lXzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlcnJvciA9IE9iamVjdC5jcmVhdGUoY29uc3RydWN0b3IucHJvdG90eXBlKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yW3Byb3BdID0gb2JqZWN0W3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNvbWV0aW1lcyBzZXR0aW5nIGEgcHJvcGVydHkgY2FuIGZhaWwgKGUuZy4gLm5hbWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3Iob2JqZWN0Lm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZXJyb3Iuc3RhY2sgJiYgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGVycm9yLCBkZXNlcmlhbGl6ZUVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRXJyb3IoU3RyaW5nKG9iamVjdCkpO1xufTtcbi8vIGluc3BpcmVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9zZXJpYWxpemUtZXJyb3IvYmxvYi9tYXN0ZXIvaW5kZXguanNcbmV4cG9ydCB2YXIgc2VyaWFsaXplRXJyb3IgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZGVzdHJveUNpcmN1bGFyKHZhbHVlLCBbXSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gXCJbRnVuY3Rpb246IFwiICsgKHZhbHVlLm5hbWUgfHwgXCJhbm9ueW1vdXNcIikgKyBcIl1cIjtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufTtcbi8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2Rlc3Ryb3ktY2lyY3VsYXJcbmZ1bmN0aW9uIGRlc3Ryb3lDaXJjdWxhcihmcm9tLCBzZWVuKSB7XG4gICAgdmFyIGVfMSwgX2E7XG4gICAgdmFyIHRvID0ge307XG4gICAgc2Vlbi5wdXNoKGZyb20pO1xuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXMoT2JqZWN0LmtleXMoZnJvbSkpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gX2MudmFsdWU7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmcm9tW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgdG9ba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlZW4uaW5kZXhPZihmcm9tW2tleV0pID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHRvW2tleV0gPSBkZXN0cm95Q2lyY3VsYXIoZnJvbVtrZXldLCBzZWVuLnNsaWNlKDApKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvW2tleV0gPSBcIltDaXJjdWxhcl1cIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iW1wicmV0dXJuXCJdKSkgX2EuY2FsbChfYik7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGZyb20ubmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0by5uYW1lID0gZnJvbS5uYW1lO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGZyb20ubWVzc2FnZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0by5tZXNzYWdlID0gZnJvbS5tZXNzYWdlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGZyb20uc3RhY2sgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdG8uc3RhY2sgPSBmcm9tLnN0YWNrO1xuICAgIH1cbiAgICByZXR1cm4gdG87XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oZWxwZXJzLmpzLm1hcCIsImltcG9ydCB7IHNlcmlhbGl6ZUVycm9yLCBkZXNlcmlhbGl6ZUVycm9yLCBjcmVhdGVDdXN0b21FcnJvckNsYXNzLCBhZGRDdXN0b21FcnJvckRlc2VyaWFsaXplciwgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5leHBvcnQgeyBzZXJpYWxpemVFcnJvciwgZGVzZXJpYWxpemVFcnJvciwgY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcywgYWRkQ3VzdG9tRXJyb3JEZXNlcmlhbGl6ZXIsIH07XG5leHBvcnQgdmFyIEFjY291bnROYW1lUmVxdWlyZWRFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJBY2NvdW50TmFtZVJlcXVpcmVkXCIpO1xuZXhwb3J0IHZhciBBY2NvdW50Tm90U3VwcG9ydGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkFjY291bnROb3RTdXBwb3J0ZWRcIik7XG5leHBvcnQgdmFyIEFtb3VudFJlcXVpcmVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkFtb3VudFJlcXVpcmVkXCIpO1xuZXhwb3J0IHZhciBCbHVldG9vdGhSZXF1aXJlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJCbHVldG9vdGhSZXF1aXJlZFwiKTtcbmV4cG9ydCB2YXIgQnRjVW5tYXRjaGVkQXBwID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkJ0Y1VubWF0Y2hlZEFwcFwiKTtcbmV4cG9ydCB2YXIgQ2FudE9wZW5EZXZpY2UgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiQ2FudE9wZW5EZXZpY2VcIik7XG5leHBvcnQgdmFyIENhc2hBZGRyTm90U3VwcG9ydGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkNhc2hBZGRyTm90U3VwcG9ydGVkXCIpO1xuZXhwb3J0IHZhciBDdXJyZW5jeU5vdFN1cHBvcnRlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJDdXJyZW5jeU5vdFN1cHBvcnRlZFwiKTtcbmV4cG9ydCB2YXIgRGV2aWNlQXBwVmVyaWZ5Tm90U3VwcG9ydGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRldmljZUFwcFZlcmlmeU5vdFN1cHBvcnRlZFwiKTtcbmV4cG9ydCB2YXIgRGV2aWNlR2VudWluZVNvY2tldEVhcmx5Q2xvc2UgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRGV2aWNlR2VudWluZVNvY2tldEVhcmx5Q2xvc2VcIik7XG5leHBvcnQgdmFyIERldmljZU5vdEdlbnVpbmVFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VOb3RHZW51aW5lXCIpO1xuZXhwb3J0IHZhciBEZXZpY2VPbkRhc2hib2FyZEV4cGVjdGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRldmljZU9uRGFzaGJvYXJkRXhwZWN0ZWRcIik7XG5leHBvcnQgdmFyIERldmljZU9uRGFzaGJvYXJkVW5leHBlY3RlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VPbkRhc2hib2FyZFVuZXhwZWN0ZWRcIik7XG5leHBvcnQgdmFyIERldmljZUluT1NVRXhwZWN0ZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRGV2aWNlSW5PU1VFeHBlY3RlZFwiKTtcbmV4cG9ydCB2YXIgRGV2aWNlSGFsdGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRldmljZUhhbHRlZFwiKTtcbmV4cG9ydCB2YXIgRGV2aWNlTmFtZUludmFsaWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRGV2aWNlTmFtZUludmFsaWRcIik7XG5leHBvcnQgdmFyIERldmljZVNvY2tldEZhaWwgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRGV2aWNlU29ja2V0RmFpbFwiKTtcbmV4cG9ydCB2YXIgRGV2aWNlU29ja2V0Tm9CdWxrU3RhdHVzID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRldmljZVNvY2tldE5vQnVsa1N0YXR1c1wiKTtcbmV4cG9ydCB2YXIgRGlzY29ubmVjdGVkRGV2aWNlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRpc2Nvbm5lY3RlZERldmljZVwiKTtcbmV4cG9ydCB2YXIgRGlzY29ubmVjdGVkRGV2aWNlRHVyaW5nT3BlcmF0aW9uID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRpc2Nvbm5lY3RlZERldmljZUR1cmluZ09wZXJhdGlvblwiKTtcbmV4cG9ydCB2YXIgRW5wb2ludENvbmZpZ0Vycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkVucG9pbnRDb25maWdcIik7XG5leHBvcnQgdmFyIEV0aEFwcFBsZWFzZUVuYWJsZUNvbnRyYWN0RGF0YSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJFdGhBcHBQbGVhc2VFbmFibGVDb250cmFjdERhdGFcIik7XG5leHBvcnQgdmFyIEZlZUVzdGltYXRpb25GYWlsZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRmVlRXN0aW1hdGlvbkZhaWxlZFwiKTtcbmV4cG9ydCB2YXIgRmlybXdhcmVOb3RSZWNvZ25pemVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkZpcm13YXJlTm90UmVjb2duaXplZFwiKTtcbmV4cG9ydCB2YXIgSGFyZFJlc2V0RmFpbCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJIYXJkUmVzZXRGYWlsXCIpO1xuZXhwb3J0IHZhciBJbnZhbGlkWFJQVGFnID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkludmFsaWRYUlBUYWdcIik7XG5leHBvcnQgdmFyIEludmFsaWRBZGRyZXNzID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkludmFsaWRBZGRyZXNzXCIpO1xuZXhwb3J0IHZhciBJbnZhbGlkQWRkcmVzc0JlY2F1c2VEZXN0aW5hdGlvbklzQWxzb1NvdXJjZSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJJbnZhbGlkQWRkcmVzc0JlY2F1c2VEZXN0aW5hdGlvbklzQWxzb1NvdXJjZVwiKTtcbmV4cG9ydCB2YXIgTGF0ZXN0TUNVSW5zdGFsbGVkRXJyb3IgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTGF0ZXN0TUNVSW5zdGFsbGVkRXJyb3JcIik7XG5leHBvcnQgdmFyIFVua25vd25NQ1UgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVW5rbm93bk1DVVwiKTtcbmV4cG9ydCB2YXIgTGVkZ2VyQVBJRXJyb3IgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTGVkZ2VyQVBJRXJyb3JcIik7XG5leHBvcnQgdmFyIExlZGdlckFQSUVycm9yV2l0aE1lc3NhZ2UgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTGVkZ2VyQVBJRXJyb3JXaXRoTWVzc2FnZVwiKTtcbmV4cG9ydCB2YXIgTGVkZ2VyQVBJTm90QXZhaWxhYmxlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkxlZGdlckFQSU5vdEF2YWlsYWJsZVwiKTtcbmV4cG9ydCB2YXIgTWFuYWdlckFwcEFscmVhZHlJbnN0YWxsZWRFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJNYW5hZ2VyQXBwQWxyZWFkeUluc3RhbGxlZFwiKTtcbmV4cG9ydCB2YXIgTWFuYWdlckFwcFJlbHlPbkJUQ0Vycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk1hbmFnZXJBcHBSZWx5T25CVENcIik7XG5leHBvcnQgdmFyIE1hbmFnZXJBcHBEZXBJbnN0YWxsUmVxdWlyZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTWFuYWdlckFwcERlcEluc3RhbGxSZXF1aXJlZFwiKTtcbmV4cG9ydCB2YXIgTWFuYWdlckFwcERlcFVuaW5zdGFsbFJlcXVpcmVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk1hbmFnZXJBcHBEZXBVbmluc3RhbGxSZXF1aXJlZFwiKTtcbmV4cG9ydCB2YXIgTWFuYWdlckRldmljZUxvY2tlZEVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk1hbmFnZXJEZXZpY2VMb2NrZWRcIik7XG5leHBvcnQgdmFyIE1hbmFnZXJGaXJtd2FyZU5vdEVub3VnaFNwYWNlRXJyb3IgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTWFuYWdlckZpcm13YXJlTm90RW5vdWdoU3BhY2VcIik7XG5leHBvcnQgdmFyIE1hbmFnZXJOb3RFbm91Z2hTcGFjZUVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk1hbmFnZXJOb3RFbm91Z2hTcGFjZVwiKTtcbmV4cG9ydCB2YXIgTWFuYWdlclVuaW5zdGFsbEJUQ0RlcCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJNYW5hZ2VyVW5pbnN0YWxsQlRDRGVwXCIpO1xuZXhwb3J0IHZhciBOZXR3b3JrRG93biA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJOZXR3b3JrRG93blwiKTtcbmV4cG9ydCB2YXIgTm9BZGRyZXNzZXNGb3VuZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJOb0FkZHJlc3Nlc0ZvdW5kXCIpO1xuZXhwb3J0IHZhciBOb3RFbm91Z2hCYWxhbmNlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk5vdEVub3VnaEJhbGFuY2VcIik7XG5leHBvcnQgdmFyIE5vdEVub3VnaEJhbGFuY2VUb0RlbGVnYXRlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk5vdEVub3VnaEJhbGFuY2VUb0RlbGVnYXRlXCIpO1xuZXhwb3J0IHZhciBOb3RFbm91Z2hCYWxhbmNlSW5QYXJlbnRBY2NvdW50ID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk5vdEVub3VnaEJhbGFuY2VJblBhcmVudEFjY291bnRcIik7XG5leHBvcnQgdmFyIE5vdEVub3VnaFNwZW5kYWJsZUJhbGFuY2UgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTm90RW5vdWdoU3BlbmRhYmxlQmFsYW5jZVwiKTtcbmV4cG9ydCB2YXIgTm90RW5vdWdoQmFsYW5jZUJlY2F1c2VEZXN0aW5hdGlvbk5vdENyZWF0ZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTm90RW5vdWdoQmFsYW5jZUJlY2F1c2VEZXN0aW5hdGlvbk5vdENyZWF0ZWRcIik7XG5leHBvcnQgdmFyIE5vQWNjZXNzVG9DYW1lcmEgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTm9BY2Nlc3NUb0NhbWVyYVwiKTtcbmV4cG9ydCB2YXIgTm90RW5vdWdoR2FzID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk5vdEVub3VnaEdhc1wiKTtcbmV4cG9ydCB2YXIgTm90U3VwcG9ydGVkTGVnYWN5QWRkcmVzcyA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJOb3RTdXBwb3J0ZWRMZWdhY3lBZGRyZXNzXCIpO1xuZXhwb3J0IHZhciBHYXNMZXNzVGhhbkVzdGltYXRlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkdhc0xlc3NUaGFuRXN0aW1hdGVcIik7XG5leHBvcnQgdmFyIFBhc3N3b3Jkc0RvbnRNYXRjaEVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlBhc3N3b3Jkc0RvbnRNYXRjaFwiKTtcbmV4cG9ydCB2YXIgUGFzc3dvcmRJbmNvcnJlY3RFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJQYXNzd29yZEluY29ycmVjdFwiKTtcbmV4cG9ydCB2YXIgUmVjb21tZW5kU3ViQWNjb3VudHNUb0VtcHR5ID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlJlY29tbWVuZFN1YkFjY291bnRzVG9FbXB0eVwiKTtcbmV4cG9ydCB2YXIgUmVjb21tZW5kVW5kZWxlZ2F0aW9uID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlJlY29tbWVuZFVuZGVsZWdhdGlvblwiKTtcbmV4cG9ydCB2YXIgVGltZW91dFRhZ2dlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJUaW1lb3V0VGFnZ2VkXCIpO1xuZXhwb3J0IHZhciBVbmV4cGVjdGVkQm9vdGxvYWRlciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJVbmV4cGVjdGVkQm9vdGxvYWRlclwiKTtcbmV4cG9ydCB2YXIgTUNVTm90R2VudWluZVRvRGFzaGJvYXJkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk1DVU5vdEdlbnVpbmVUb0Rhc2hib2FyZFwiKTtcbmV4cG9ydCB2YXIgUmVjaXBpZW50UmVxdWlyZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiUmVjaXBpZW50UmVxdWlyZWRcIik7XG5leHBvcnQgdmFyIFVuYXZhaWxhYmxlVGV6b3NPcmlnaW5hdGVkQWNjb3VudFJlY2VpdmUgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVW5hdmFpbGFibGVUZXpvc09yaWdpbmF0ZWRBY2NvdW50UmVjZWl2ZVwiKTtcbmV4cG9ydCB2YXIgVW5hdmFpbGFibGVUZXpvc09yaWdpbmF0ZWRBY2NvdW50U2VuZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJVbmF2YWlsYWJsZVRlem9zT3JpZ2luYXRlZEFjY291bnRTZW5kXCIpO1xuZXhwb3J0IHZhciBVcGRhdGVGZXRjaEZpbGVGYWlsID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVwZGF0ZUZldGNoRmlsZUZhaWxcIik7XG5leHBvcnQgdmFyIFVwZGF0ZUluY29ycmVjdEhhc2ggPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVXBkYXRlSW5jb3JyZWN0SGFzaFwiKTtcbmV4cG9ydCB2YXIgVXBkYXRlSW5jb3JyZWN0U2lnID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVwZGF0ZUluY29ycmVjdFNpZ1wiKTtcbmV4cG9ydCB2YXIgVXBkYXRlWW91ckFwcCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJVcGRhdGVZb3VyQXBwXCIpO1xuZXhwb3J0IHZhciBVc2VyUmVmdXNlZERldmljZU5hbWVDaGFuZ2UgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVXNlclJlZnVzZWREZXZpY2VOYW1lQ2hhbmdlXCIpO1xuZXhwb3J0IHZhciBVc2VyUmVmdXNlZEFkZHJlc3MgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVXNlclJlZnVzZWRBZGRyZXNzXCIpO1xuZXhwb3J0IHZhciBVc2VyUmVmdXNlZEZpcm13YXJlVXBkYXRlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVzZXJSZWZ1c2VkRmlybXdhcmVVcGRhdGVcIik7XG5leHBvcnQgdmFyIFVzZXJSZWZ1c2VkQWxsb3dNYW5hZ2VyID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVzZXJSZWZ1c2VkQWxsb3dNYW5hZ2VyXCIpO1xuZXhwb3J0IHZhciBVc2VyUmVmdXNlZE9uRGV2aWNlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVzZXJSZWZ1c2VkT25EZXZpY2VcIik7IC8vIFRPRE8gcmVuYW1lIGJlY2F1c2UgaXQncyBqdXN0IGZvciB0cmFuc2FjdGlvbiByZWZ1c2FsXG5leHBvcnQgdmFyIFRyYW5zcG9ydE9wZW5Vc2VyQ2FuY2VsbGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlRyYW5zcG9ydE9wZW5Vc2VyQ2FuY2VsbGVkXCIpO1xuZXhwb3J0IHZhciBUcmFuc3BvcnRJbnRlcmZhY2VOb3RBdmFpbGFibGUgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVHJhbnNwb3J0SW50ZXJmYWNlTm90QXZhaWxhYmxlXCIpO1xuZXhwb3J0IHZhciBUcmFuc3BvcnRSYWNlQ29uZGl0aW9uID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlRyYW5zcG9ydFJhY2VDb25kaXRpb25cIik7XG5leHBvcnQgdmFyIFRyYW5zcG9ydFdlYlVTQkdlc3R1cmVSZXF1aXJlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJUcmFuc3BvcnRXZWJVU0JHZXN0dXJlUmVxdWlyZWRcIik7XG5leHBvcnQgdmFyIERldmljZVNob3VsZFN0YXlJbkFwcCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VTaG91bGRTdGF5SW5BcHBcIik7XG5leHBvcnQgdmFyIFdlYnNvY2tldENvbm5lY3Rpb25FcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJXZWJzb2NrZXRDb25uZWN0aW9uRXJyb3JcIik7XG5leHBvcnQgdmFyIFdlYnNvY2tldENvbm5lY3Rpb25GYWlsZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiV2Vic29ja2V0Q29ubmVjdGlvbkZhaWxlZFwiKTtcbmV4cG9ydCB2YXIgV3JvbmdEZXZpY2VGb3JBY2NvdW50ID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIldyb25nRGV2aWNlRm9yQWNjb3VudFwiKTtcbmV4cG9ydCB2YXIgV3JvbmdBcHBGb3JDdXJyZW5jeSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJXcm9uZ0FwcEZvckN1cnJlbmN5XCIpO1xuZXhwb3J0IHZhciBFVEhBZGRyZXNzTm9uRUlQID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkVUSEFkZHJlc3NOb25FSVBcIik7XG5leHBvcnQgdmFyIENhbnRTY2FuUVJDb2RlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkNhbnRTY2FuUVJDb2RlXCIpO1xuZXhwb3J0IHZhciBGZWVOb3RMb2FkZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRmVlTm90TG9hZGVkXCIpO1xuZXhwb3J0IHZhciBGZWVSZXF1aXJlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJGZWVSZXF1aXJlZFwiKTtcbmV4cG9ydCB2YXIgRmVlVG9vSGlnaCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJGZWVUb29IaWdoXCIpO1xuZXhwb3J0IHZhciBTeW5jRXJyb3IgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiU3luY0Vycm9yXCIpO1xuZXhwb3J0IHZhciBQYWlyaW5nRmFpbGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlBhaXJpbmdGYWlsZWRcIik7XG5leHBvcnQgdmFyIEdlbnVpbmVDaGVja0ZhaWxlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJHZW51aW5lQ2hlY2tGYWlsZWRcIik7XG5leHBvcnQgdmFyIExlZGdlckFQSTR4eCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJMZWRnZXJBUEk0eHhcIik7XG5leHBvcnQgdmFyIExlZGdlckFQSTV4eCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJMZWRnZXJBUEk1eHhcIik7XG5leHBvcnQgdmFyIEZpcm13YXJlT3JBcHBVcGRhdGVSZXF1aXJlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJGaXJtd2FyZU9yQXBwVXBkYXRlUmVxdWlyZWRcIik7XG4vLyBkYiBzdHVmZiwgbm8gbmVlZCB0byB0cmFuc2xhdGVcbmV4cG9ydCB2YXIgTm9EQlBhdGhHaXZlbiA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJOb0RCUGF0aEdpdmVuXCIpO1xuZXhwb3J0IHZhciBEQldyb25nUGFzc3dvcmQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiREJXcm9uZ1Bhc3N3b3JkXCIpO1xuZXhwb3J0IHZhciBEQk5vdFJlc2V0ID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRCTm90UmVzZXRcIik7XG4vKipcbiAqIFRyYW5zcG9ydEVycm9yIGlzIHVzZWQgZm9yIGFueSBnZW5lcmljIHRyYW5zcG9ydCBlcnJvcnMuXG4gKiBlLmcuIEVycm9yIHRocm93biB3aGVuIGRhdGEgcmVjZWl2ZWQgYnkgZXhjaGFuZ2VzIGFyZSBpbmNvcnJlY3Qgb3IgaWYgZXhjaGFuZ2VkIGZhaWxlZCB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBkZXZpY2UgZm9yIHZhcmlvdXMgcmVhc29uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gVHJhbnNwb3J0RXJyb3IobWVzc2FnZSwgaWQpIHtcbiAgICB0aGlzLm5hbWUgPSBcIlRyYW5zcG9ydEVycm9yXCI7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2s7XG4gICAgdGhpcy5pZCA9IGlkO1xufVxuVHJhbnNwb3J0RXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5hZGRDdXN0b21FcnJvckRlc2VyaWFsaXplcihcIlRyYW5zcG9ydEVycm9yXCIsIGZ1bmN0aW9uIChlKSB7IHJldHVybiBuZXcgVHJhbnNwb3J0RXJyb3IoZS5tZXNzYWdlLCBlLmlkKTsgfSk7XG5leHBvcnQgdmFyIFN0YXR1c0NvZGVzID0ge1xuICAgIFBJTl9SRU1BSU5JTkdfQVRURU1QVFM6IDB4NjNjMCxcbiAgICBJTkNPUlJFQ1RfTEVOR1RIOiAweDY3MDAsXG4gICAgTUlTU0lOR19DUklUSUNBTF9QQVJBTUVURVI6IDB4NjgwMCxcbiAgICBDT01NQU5EX0lOQ09NUEFUSUJMRV9GSUxFX1NUUlVDVFVSRTogMHg2OTgxLFxuICAgIFNFQ1VSSVRZX1NUQVRVU19OT1RfU0FUSVNGSUVEOiAweDY5ODIsXG4gICAgQ09ORElUSU9OU19PRl9VU0VfTk9UX1NBVElTRklFRDogMHg2OTg1LFxuICAgIElOQ09SUkVDVF9EQVRBOiAweDZhODAsXG4gICAgTk9UX0VOT1VHSF9NRU1PUllfU1BBQ0U6IDB4NmE4NCxcbiAgICBSRUZFUkVOQ0VEX0RBVEFfTk9UX0ZPVU5EOiAweDZhODgsXG4gICAgRklMRV9BTFJFQURZX0VYSVNUUzogMHg2YTg5LFxuICAgIElOQ09SUkVDVF9QMV9QMjogMHg2YjAwLFxuICAgIElOU19OT1RfU1VQUE9SVEVEOiAweDZkMDAsXG4gICAgQ0xBX05PVF9TVVBQT1JURUQ6IDB4NmUwMCxcbiAgICBURUNITklDQUxfUFJPQkxFTTogMHg2ZjAwLFxuICAgIE9LOiAweDkwMDAsXG4gICAgTUVNT1JZX1BST0JMRU06IDB4OTI0MCxcbiAgICBOT19FRl9TRUxFQ1RFRDogMHg5NDAwLFxuICAgIElOVkFMSURfT0ZGU0VUOiAweDk0MDIsXG4gICAgRklMRV9OT1RfRk9VTkQ6IDB4OTQwNCxcbiAgICBJTkNPTlNJU1RFTlRfRklMRTogMHg5NDA4LFxuICAgIEFMR09SSVRITV9OT1RfU1VQUE9SVEVEOiAweDk0ODQsXG4gICAgSU5WQUxJRF9LQ1Y6IDB4OTQ4NSxcbiAgICBDT0RFX05PVF9JTklUSUFMSVpFRDogMHg5ODAyLFxuICAgIEFDQ0VTU19DT05ESVRJT05fTk9UX0ZVTEZJTExFRDogMHg5ODA0LFxuICAgIENPTlRSQURJQ1RJT05fU0VDUkVUX0NPREVfU1RBVFVTOiAweDk4MDgsXG4gICAgQ09OVFJBRElDVElPTl9JTlZBTElEQVRJT046IDB4OTgxMCxcbiAgICBDT0RFX0JMT0NLRUQ6IDB4OTg0MCxcbiAgICBNQVhfVkFMVUVfUkVBQ0hFRDogMHg5ODUwLFxuICAgIEdQX0FVVEhfRkFJTEVEOiAweDYzMDAsXG4gICAgTElDRU5TSU5HOiAweDZmNDIsXG4gICAgSEFMVEVEOiAweDZmYWFcbn07XG5leHBvcnQgZnVuY3Rpb24gZ2V0QWx0U3RhdHVzTWVzc2FnZShjb2RlKSB7XG4gICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgIC8vIGltcHJvdmUgdGV4dCBvZiBtb3N0IGNvbW1vbiBlcnJvcnNcbiAgICAgICAgY2FzZSAweDY3MDA6XG4gICAgICAgICAgICByZXR1cm4gXCJJbmNvcnJlY3QgbGVuZ3RoXCI7XG4gICAgICAgIGNhc2UgMHg2ODAwOlxuICAgICAgICAgICAgcmV0dXJuIFwiTWlzc2luZyBjcml0aWNhbCBwYXJhbWV0ZXJcIjtcbiAgICAgICAgY2FzZSAweDY5ODI6XG4gICAgICAgICAgICByZXR1cm4gXCJTZWN1cml0eSBub3Qgc2F0aXNmaWVkIChkb25nbGUgbG9ja2VkIG9yIGhhdmUgaW52YWxpZCBhY2Nlc3MgcmlnaHRzKVwiO1xuICAgICAgICBjYXNlIDB4Njk4NTpcbiAgICAgICAgICAgIHJldHVybiBcIkNvbmRpdGlvbiBvZiB1c2Ugbm90IHNhdGlzZmllZCAoZGVuaWVkIGJ5IHRoZSB1c2VyPylcIjtcbiAgICAgICAgY2FzZSAweDZhODA6XG4gICAgICAgICAgICByZXR1cm4gXCJJbnZhbGlkIGRhdGEgcmVjZWl2ZWRcIjtcbiAgICAgICAgY2FzZSAweDZiMDA6XG4gICAgICAgICAgICByZXR1cm4gXCJJbnZhbGlkIHBhcmFtZXRlciByZWNlaXZlZFwiO1xuICAgIH1cbiAgICBpZiAoMHg2ZjAwIDw9IGNvZGUgJiYgY29kZSA8PSAweDZmZmYpIHtcbiAgICAgICAgcmV0dXJuIFwiSW50ZXJuYWwgZXJyb3IsIHBsZWFzZSByZXBvcnRcIjtcbiAgICB9XG59XG4vKipcbiAqIEVycm9yIHRocm93biB3aGVuIGEgZGV2aWNlIHJldHVybmVkIGEgbm9uIHN1Y2Nlc3Mgc3RhdHVzLlxuICogdGhlIGVycm9yLnN0YXR1c0NvZGUgaXMgb25lIG9mIHRoZSBgU3RhdHVzQ29kZXNgIGV4cG9ydGVkIGJ5IHRoaXMgbGlicmFyeS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRyYW5zcG9ydFN0YXR1c0Vycm9yKHN0YXR1c0NvZGUpIHtcbiAgICB0aGlzLm5hbWUgPSBcIlRyYW5zcG9ydFN0YXR1c0Vycm9yXCI7XG4gICAgdmFyIHN0YXR1c1RleHQgPSBPYmplY3Qua2V5cyhTdGF0dXNDb2RlcykuZmluZChmdW5jdGlvbiAoaykgeyByZXR1cm4gU3RhdHVzQ29kZXNba10gPT09IHN0YXR1c0NvZGU7IH0pIHx8XG4gICAgICAgIFwiVU5LTk9XTl9FUlJPUlwiO1xuICAgIHZhciBzbXNnID0gZ2V0QWx0U3RhdHVzTWVzc2FnZShzdGF0dXNDb2RlKSB8fCBzdGF0dXNUZXh0O1xuICAgIHZhciBzdGF0dXNDb2RlU3RyID0gc3RhdHVzQ29kZS50b1N0cmluZygxNik7XG4gICAgdGhpcy5tZXNzYWdlID0gXCJMZWRnZXIgZGV2aWNlOiBcIiArIHNtc2cgKyBcIiAoMHhcIiArIHN0YXR1c0NvZGVTdHIgKyBcIilcIjtcbiAgICB0aGlzLnN0YWNrID0gbmV3IEVycm9yKCkuc3RhY2s7XG4gICAgdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZTtcbiAgICB0aGlzLnN0YXR1c1RleHQgPSBzdGF0dXNUZXh0O1xufVxuVHJhbnNwb3J0U3RhdHVzRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yKCk7XG5hZGRDdXN0b21FcnJvckRlc2VyaWFsaXplcihcIlRyYW5zcG9ydFN0YXR1c0Vycm9yXCIsIGZ1bmN0aW9uIChlKSB7IHJldHVybiBuZXcgVHJhbnNwb3J0U3RhdHVzRXJyb3IoZS5zdGF0dXNDb2RlKTsgfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCBUcmFuc3BvcnQgZnJvbSBcIkBsZWRnZXJocS9ody10cmFuc3BvcnRcIjtcbmltcG9ydCBoaWRGcmFtaW5nIGZyb20gXCJAbGVkZ2VyaHEvZGV2aWNlcy9saWIvaGlkLWZyYW1pbmdcIjtcbmltcG9ydCB7IGlkZW50aWZ5VVNCUHJvZHVjdElkIH0gZnJvbSBcIkBsZWRnZXJocS9kZXZpY2VzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiQGxlZGdlcmhxL2xvZ3NcIjtcbmltcG9ydCB7IFRyYW5zcG9ydE9wZW5Vc2VyQ2FuY2VsbGVkLCBUcmFuc3BvcnRJbnRlcmZhY2VOb3RBdmFpbGFibGUsIFRyYW5zcG9ydFdlYlVTQkdlc3R1cmVSZXF1aXJlZCwgRGlzY29ubmVjdGVkRGV2aWNlRHVyaW5nT3BlcmF0aW9uLCBEaXNjb25uZWN0ZWREZXZpY2UsIH0gZnJvbSBcIkBsZWRnZXJocS9lcnJvcnNcIjtcbmltcG9ydCB7IGdldExlZGdlckRldmljZXMsIGdldEZpcnN0TGVkZ2VyRGV2aWNlLCByZXF1ZXN0TGVkZ2VyRGV2aWNlLCBpc1N1cHBvcnRlZCwgfSBmcm9tIFwiLi93ZWJ1c2JcIjtcbnZhciBjb25maWd1cmF0aW9uVmFsdWUgPSAxO1xudmFyIGVuZHBvaW50TnVtYmVyID0gMztcbi8qKlxuICogV2ViVVNCIFRyYW5zcG9ydCBpbXBsZW1lbnRhdGlvblxuICogQGV4YW1wbGVcbiAqIGltcG9ydCBUcmFuc3BvcnRXZWJVU0IgZnJvbSBcIkBsZWRnZXJocS9ody10cmFuc3BvcnQtd2VidXNiXCI7XG4gKiAuLi5cbiAqIFRyYW5zcG9ydFdlYlVTQi5jcmVhdGUoKS50aGVuKHRyYW5zcG9ydCA9PiAuLi4pXG4gKi9cbnZhciBUcmFuc3BvcnRXZWJVU0IgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRyYW5zcG9ydFdlYlVTQiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBUcmFuc3BvcnRXZWJVU0IoZGV2aWNlLCBpbnRlcmZhY2VOdW1iZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY2hhbm5lbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDB4ZmZmZik7XG4gICAgICAgIF90aGlzLnBhY2tldFNpemUgPSA2NDtcbiAgICAgICAgX3RoaXMuX2Rpc2Nvbm5lY3RFbWl0dGVkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLl9lbWl0RGlzY29ubmVjdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuX2Rpc2Nvbm5lY3RFbWl0dGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIF90aGlzLl9kaXNjb25uZWN0RW1pdHRlZCA9IHRydWU7XG4gICAgICAgICAgICBfdGhpcy5lbWl0KFwiZGlzY29ubmVjdFwiLCBlKTtcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMuZGV2aWNlID0gZGV2aWNlO1xuICAgICAgICBfdGhpcy5pbnRlcmZhY2VOdW1iZXIgPSBpbnRlcmZhY2VOdW1iZXI7XG4gICAgICAgIF90aGlzLmRldmljZU1vZGVsID0gaWRlbnRpZnlVU0JQcm9kdWN0SWQoZGV2aWNlLnByb2R1Y3RJZCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2ltaWxhciB0byBjcmVhdGUoKSBleGNlcHQgaXQgd2lsbCBhbHdheXMgZGlzcGxheSB0aGUgZGV2aWNlIHBlcm1pc3Npb24gKGV2ZW4gaWYgc29tZSBkZXZpY2VzIGFyZSBhbHJlYWR5IGFjY2VwdGVkKS5cbiAgICAgKi9cbiAgICBUcmFuc3BvcnRXZWJVU0IucmVxdWVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRldmljZTtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgcmVxdWVzdExlZGdlckRldmljZSgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGV2aWNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFRyYW5zcG9ydFdlYlVTQi5vcGVuKGRldmljZSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFNpbWlsYXIgdG8gY3JlYXRlKCkgZXhjZXB0IGl0IHdpbGwgbmV2ZXIgZGlzcGxheSB0aGUgZGV2aWNlIHBlcm1pc3Npb24gKGl0IHJldHVybnMgYSBQcm9taXNlPD9UcmFuc3BvcnQ+LCBudWxsIGlmIGl0IGZhaWxzIHRvIGZpbmQgYSBkZXZpY2UpLlxuICAgICAqL1xuICAgIFRyYW5zcG9ydFdlYlVTQi5vcGVuQ29ubmVjdGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZGV2aWNlcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgZ2V0TGVkZ2VyRGV2aWNlcygpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGV2aWNlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXZpY2VzLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgbnVsbF07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgVHJhbnNwb3J0V2ViVVNCLm9wZW4oZGV2aWNlc1swXSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIExlZGdlciB0cmFuc3BvcnQgd2l0aCBhIFVTQkRldmljZVxuICAgICAqL1xuICAgIFRyYW5zcG9ydFdlYlVTQi5vcGVuID0gZnVuY3Rpb24gKGRldmljZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaWZhY2UsIGludGVyZmFjZU51bWJlciwgZV8xLCB0cmFuc3BvcnQsIG9uRGlzY29ubmVjdDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgZGV2aWNlLm9wZW4oKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGRldmljZS5jb25maWd1cmF0aW9uID09PSBudWxsKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBkZXZpY2Uuc2VsZWN0Q29uZmlndXJhdGlvbihjb25maWd1cmF0aW9uVmFsdWUpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBbNCAvKnlpZWxkKi8sIGdyYWNlZnVsbHlSZXNldERldmljZShkZXZpY2UpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWZhY2UgPSBkZXZpY2UuY29uZmlndXJhdGlvbnNbMF0uaW50ZXJmYWNlcy5maW5kKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbHRlcm5hdGVzID0gX2EuYWx0ZXJuYXRlcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWx0ZXJuYXRlcy5zb21lKGZ1bmN0aW9uIChhKSB7IHJldHVybiBhLmludGVyZmFjZUNsYXNzID09PSAyNTU7IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlmYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRyYW5zcG9ydEludGVyZmFjZU5vdEF2YWlsYWJsZShcIk5vIFdlYlVTQiBpbnRlcmZhY2UgZm91bmQgZm9yIHlvdXIgTGVkZ2VyIGRldmljZS4gUGxlYXNlIHVwZ3JhZGUgZmlybXdhcmUgb3IgY29udGFjdCB0ZWNoc3VwcG9ydC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlcmZhY2VOdW1iZXIgPSBpZmFjZS5pbnRlcmZhY2VOdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbNSwgNywgLCA5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBkZXZpY2UuY2xhaW1JbnRlcmZhY2UoaW50ZXJmYWNlTnVtYmVyKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICBlXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBkZXZpY2UuY2xvc2UoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUcmFuc3BvcnRJbnRlcmZhY2VOb3RBdmFpbGFibGUoZV8xLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQgPSBuZXcgVHJhbnNwb3J0V2ViVVNCKGRldmljZSwgaW50ZXJmYWNlTnVtYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGlzY29ubmVjdCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRldmljZSA9PT0gZS5kZXZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gJEZsb3dGaXhNZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IudXNiLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJkaXNjb25uZWN0XCIsIG9uRGlzY29ubmVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydC5fZW1pdERpc2Nvbm5lY3QobmV3IERpc2Nvbm5lY3RlZERldmljZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gJEZsb3dGaXhNZVxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnVzYi5hZGRFdmVudExpc3RlbmVyKFwiZGlzY29ubmVjdFwiLCBvbkRpc2Nvbm5lY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRyYW5zcG9ydF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVsZWFzZSB0aGUgdHJhbnNwb3J0IGRldmljZVxuICAgICAqL1xuICAgIFRyYW5zcG9ydFdlYlVTQi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5leGNoYW5nZUJ1c3lQcm9taXNlXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5kZXZpY2UucmVsZWFzZUludGVyZmFjZSh0aGlzLmludGVyZmFjZU51bWJlcildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBncmFjZWZ1bGx5UmVzZXREZXZpY2UodGhpcy5kZXZpY2UpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5kZXZpY2UuY2xvc2UoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFeGNoYW5nZSB3aXRoIHRoZSBkZXZpY2UgdXNpbmcgQVBEVSBwcm90b2NvbC5cbiAgICAgKiBAcGFyYW0gYXBkdVxuICAgICAqIEByZXR1cm5zIGEgcHJvbWlzZSBvZiBhcGR1IHJlc3BvbnNlXG4gICAgICovXG4gICAgVHJhbnNwb3J0V2ViVVNCLnByb3RvdHlwZS5leGNoYW5nZSA9IGZ1bmN0aW9uIChhcGR1KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBiO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5leGNoYW5nZUF0b21pY0ltcGwoZnVuY3Rpb24gKCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSwgY2hhbm5lbCwgcGFja2V0U2l6ZSwgZnJhbWluZywgYmxvY2tzLCBpLCByZXN1bHQsIGFjYywgciwgYnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gdGhpcywgY2hhbm5lbCA9IF9hLmNoYW5uZWwsIHBhY2tldFNpemUgPSBfYS5wYWNrZXRTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZyhcImFwZHVcIiwgXCI9PiBcIiArIGFwZHUudG9TdHJpbmcoXCJoZXhcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1pbmcgPSBoaWRGcmFtaW5nKGNoYW5uZWwsIHBhY2tldFNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrcyA9IGZyYW1pbmcubWFrZUJsb2NrcyhhcGR1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoaSA8IGJsb2Nrcy5sZW5ndGgpKSByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLmRldmljZS50cmFuc2Zlck91dChlbmRwb2ludE51bWJlciwgYmxvY2tzW2ldKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhKHJlc3VsdCA9IGZyYW1pbmcuZ2V0UmVkdWNlZFJlc3VsdChhY2MpKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5kZXZpY2UudHJhbnNmZXJJbihlbmRwb2ludE51bWJlciwgcGFja2V0U2l6ZSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIgPSBfYi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gQnVmZmVyLmZyb20oci5kYXRhLmJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjID0gZnJhbWluZy5yZWR1Y2VSZXNwb25zZShhY2MsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nKFwiYXBkdVwiLCBcIjw9IFwiICsgcmVzdWx0LnRvU3RyaW5nKFwiaGV4XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzdWx0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZSAmJiBlLm1lc3NhZ2UgJiYgZS5tZXNzYWdlLmluY2x1ZGVzKFwiZGlzY29ubmVjdGVkXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLl9lbWl0RGlzY29ubmVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IERpc2Nvbm5lY3RlZERldmljZUR1cmluZ09wZXJhdGlvbihlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBiID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFRyYW5zcG9ydFdlYlVTQi5wcm90b3R5cGUuc2V0U2NyYW1ibGVLZXkgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgV2ViVVNCIHRyYW5zcG9ydCBpcyBzdXBwb3J0ZWQuXG4gICAgICovXG4gICAgVHJhbnNwb3J0V2ViVVNCLmlzU3VwcG9ydGVkID0gaXNTdXBwb3J0ZWQ7XG4gICAgLyoqXG4gICAgICogTGlzdCB0aGUgV2ViVVNCIGRldmljZXMgdGhhdCB3YXMgcHJldmlvdXNseSBhdXRob3JpemVkIGJ5IHRoZSB1c2VyLlxuICAgICAqL1xuICAgIFRyYW5zcG9ydFdlYlVTQi5saXN0ID0gZ2V0TGVkZ2VyRGV2aWNlcztcbiAgICAvKipcbiAgICAgKiBBY3RpdmVseSBsaXN0ZW4gdG8gV2ViVVNCIGRldmljZXMgYW5kIGVtaXQgT05FIGRldmljZVxuICAgICAqIHRoYXQgd2FzIGVpdGhlciBhY2NlcHRlZCBiZWZvcmUsIGlmIG5vdCBpdCB3aWxsIHRyaWdnZXIgdGhlIG5hdGl2ZSBwZXJtaXNzaW9uIFVJLlxuICAgICAqXG4gICAgICogSW1wb3J0YW50OiBpdCBtdXN0IGJlIGNhbGxlZCBpbiB0aGUgY29udGV4dCBvZiBhIFVJIGNsaWNrIVxuICAgICAqL1xuICAgIFRyYW5zcG9ydFdlYlVTQi5saXN0ZW4gPSBmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgdmFyIHVuc3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgICBnZXRGaXJzdExlZGdlckRldmljZSgpLnRoZW4oZnVuY3Rpb24gKGRldmljZSkge1xuICAgICAgICAgICAgaWYgKCF1bnN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGV2aWNlTW9kZWwgPSBpZGVudGlmeVVTQlByb2R1Y3RJZChkZXZpY2UucHJvZHVjdElkKTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJhZGRcIixcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRvcjogZGV2aWNlLFxuICAgICAgICAgICAgICAgICAgICBkZXZpY2VNb2RlbDogZGV2aWNlTW9kZWxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuRE9NRXhjZXB0aW9uICYmXG4gICAgICAgICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiB3aW5kb3cuRE9NRXhjZXB0aW9uICYmXG4gICAgICAgICAgICAgICAgZXJyb3IuY29kZSA9PT0gMTgpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgVHJhbnNwb3J0V2ViVVNCR2VzdHVyZVJlcXVpcmVkKGVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBUcmFuc3BvcnRPcGVuVXNlckNhbmNlbGxlZChlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlOiB1bnN1YnNjcmliZVxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIFRyYW5zcG9ydFdlYlVTQjtcbn0oVHJhbnNwb3J0KSk7XG5leHBvcnQgZGVmYXVsdCBUcmFuc3BvcnRXZWJVU0I7XG5mdW5jdGlvbiBncmFjZWZ1bGx5UmVzZXREZXZpY2UoZGV2aWNlKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXJyXzE7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMCwgMiwgLCAzXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGRldmljZS5yZXNldCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICBlcnJfMSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycl8xKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VHJhbnNwb3J0V2ViVVNCLmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgeyBsZWRnZXJVU0JWZW5kb3JJZCB9IGZyb20gXCJAbGVkZ2VyaHEvZGV2aWNlc1wiO1xudmFyIGxlZGdlckRldmljZXMgPSBbXG4gICAge1xuICAgICAgICB2ZW5kb3JJZDogbGVkZ2VyVVNCVmVuZG9ySWRcbiAgICB9LFxuXTtcbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0TGVkZ2VyRGV2aWNlKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRldmljZTtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgbmF2aWdhdG9yLnVzYi5yZXF1ZXN0RGV2aWNlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGxlZGdlckRldmljZXNcbiAgICAgICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgZGV2aWNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgZGV2aWNlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TGVkZ2VyRGV2aWNlcygpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZXZpY2VzO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gWzQgLyp5aWVsZCovLCBuYXZpZ2F0b3IudXNiLmdldERldmljZXMoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBkZXZpY2VzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgZGV2aWNlcy5maWx0ZXIoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQudmVuZG9ySWQgPT09IGxlZGdlclVTQlZlbmRvcklkOyB9KV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpcnN0TGVkZ2VyRGV2aWNlKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGV4aXN0aW5nRGV2aWNlcztcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgZ2V0TGVkZ2VyRGV2aWNlcygpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nRGV2aWNlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nRGV2aWNlcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGV4aXN0aW5nRGV2aWNlc1swXV07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCByZXF1ZXN0TGVkZ2VyRGV2aWNlKCldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCB2YXIgaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSghIW5hdmlnYXRvciAmJlxuICAgICAgICAhIW5hdmlnYXRvci51c2IgJiZcbiAgICAgICAgdHlwZW9mIG5hdmlnYXRvci51c2IuZ2V0RGV2aWNlcyA9PT0gXCJmdW5jdGlvblwiKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWJ1c2IuanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX3JlYWQgPSAodGhpcyAmJiB0aGlzLl9fcmVhZCkgfHwgZnVuY3Rpb24gKG8sIG4pIHtcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XG4gICAgaWYgKCFtKSByZXR1cm4gbztcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcbiAgICB0cnkge1xuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cbiAgICB9XG4gICAgcmV0dXJuIGFyO1xufTtcbnZhciBfX3NwcmVhZEFycmF5ID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5KSB8fCBmdW5jdGlvbiAodG8sIGZyb20sIHBhY2spIHtcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XG4gICAgICAgICAgICBpZiAoIWFyKSBhciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20sIDAsIGkpO1xuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xufTtcbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IHsgVHJhbnNwb3J0UmFjZUNvbmRpdGlvbiwgVHJhbnNwb3J0RXJyb3IsIFN0YXR1c0NvZGVzLCBnZXRBbHRTdGF0dXNNZXNzYWdlLCBUcmFuc3BvcnRTdGF0dXNFcnJvciwgfSBmcm9tIFwiQGxlZGdlcmhxL2Vycm9yc1wiO1xuZXhwb3J0IHsgVHJhbnNwb3J0RXJyb3IsIFRyYW5zcG9ydFN0YXR1c0Vycm9yLCBTdGF0dXNDb2RlcywgZ2V0QWx0U3RhdHVzTWVzc2FnZSwgfTtcbi8qKlxuICogVHJhbnNwb3J0IGRlZmluZXMgdGhlIGdlbmVyaWMgaW50ZXJmYWNlIHRvIHNoYXJlIGJldHdlZW4gbm9kZS91MmYgaW1wbFxuICogQSAqKkRlc2NyaXB0b3IqKiBpcyBhIHBhcmFtZXRyaWMgdHlwZSB0aGF0IGlzIHVwIHRvIGJlIGRldGVybWluZWQgZm9yIHRoZSBpbXBsZW1lbnRhdGlvbi5cbiAqIGl0IGNhbiBiZSBmb3IgaW5zdGFuY2UgYW4gSUQsIGFuIGZpbGUgcGF0aCwgYSBVUkwsLi4uXG4gKi9cbnZhciBUcmFuc3BvcnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVHJhbnNwb3J0KCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmV4Y2hhbmdlVGltZW91dCA9IDMwMDAwO1xuICAgICAgICB0aGlzLnVucmVzcG9uc2l2ZVRpbWVvdXQgPSAxNTAwMDtcbiAgICAgICAgdGhpcy5kZXZpY2VNb2RlbCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHdyYXBwZXIgb24gdG9wIG9mIGV4Y2hhbmdlIHRvIHNpbXBsaWZ5IHdvcmsgb2YgdGhlIGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgKiBAcGFyYW0gY2xhXG4gICAgICAgICAqIEBwYXJhbSBpbnNcbiAgICAgICAgICogQHBhcmFtIHAxXG4gICAgICAgICAqIEBwYXJhbSBwMlxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAgICAgKiBAcGFyYW0gc3RhdHVzTGlzdCBpcyBhIGxpc3Qgb2YgYWNjZXB0ZWQgc3RhdHVzIGNvZGUgKHNob3J0cykuIFsweDkwMDBdIGJ5IGRlZmF1bHRcbiAgICAgICAgICogQHJldHVybiBhIFByb21pc2Ugb2YgcmVzcG9uc2UgYnVmZmVyXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNlbmQgPSBmdW5jdGlvbiAoY2xhLCBpbnMsIHAxLCBwMiwgZGF0YSwgc3RhdHVzTGlzdCkge1xuICAgICAgICAgICAgaWYgKGRhdGEgPT09IHZvaWQgMCkgeyBkYXRhID0gQnVmZmVyLmFsbG9jKDApOyB9XG4gICAgICAgICAgICBpZiAoc3RhdHVzTGlzdCA9PT0gdm9pZCAwKSB7IHN0YXR1c0xpc3QgPSBbU3RhdHVzQ29kZXMuT0tdOyB9XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSwgc3c7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID49IDI1Nikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHJhbnNwb3J0RXJyb3IoXCJkYXRhLmxlbmd0aCBleGNlZWQgMjU2IGJ5dGVzIGxpbWl0LiBHb3Q6IFwiICsgZGF0YS5sZW5ndGgsIFwiRGF0YUxlbmd0aFRvb0JpZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5leGNoYW5nZShCdWZmZXIuY29uY2F0KFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEJ1ZmZlci5mcm9tKFtjbGEsIGlucywgcDEsIHAyXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdWZmZXIuZnJvbShbZGF0YS5sZW5ndGhdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pKV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3cgPSByZXNwb25zZS5yZWFkVUludDE2QkUocmVzcG9uc2UubGVuZ3RoIC0gMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0dXNMaXN0LnNvbWUoZnVuY3Rpb24gKHMpIHsgcmV0dXJuIHMgPT09IHN3OyB9KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHJhbnNwb3J0U3RhdHVzRXJyb3Ioc3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzcG9uc2VdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5leGNoYW5nZUF0b21pY0ltcGwgPSBmdW5jdGlvbiAoZikgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlc29sdmVCdXN5LCBidXN5UHJvbWlzZSwgdW5yZXNwb25zaXZlUmVhY2hlZCwgdGltZW91dCwgcmVzO1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4Y2hhbmdlQnVzeVByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHJhbnNwb3J0UmFjZUNvbmRpdGlvbihcIkFuIGFjdGlvbiB3YXMgYWxyZWFkeSBwZW5kaW5nIG9uIHRoZSBMZWRnZXIgZGV2aWNlLiBQbGVhc2UgZGVueSBvciByZWNvbm5lY3QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnVzeVByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVCdXN5ID0gcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leGNoYW5nZUJ1c3lQcm9taXNlID0gYnVzeVByb21pc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bnJlc3BvbnNpdmVSZWFjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5yZXNwb25zaXZlUmVhY2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZW1pdChcInVucmVzcG9uc2l2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRoaXMudW5yZXNwb25zaXZlVGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgLCAzLCA0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5yZXNwb25zaXZlUmVhY2hlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcInJlc3BvbnNpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc29sdmVCdXN5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmVCdXN5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmV4Y2hhbmdlQnVzeVByb21pc2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pOyB9O1xuICAgICAgICB0aGlzLl9hcHBBUElsb2NrID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogbG93IGxldmVsIGFwaSB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBkZXZpY2VcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBmb3IgaW1wbGVtZW50YXRpb25zIHRvIGltcGxlbWVudCBidXQgc2hvdWxkIG5vdCBiZSBkaXJlY3RseSBjYWxsZWQuXG4gICAgICogSW5zdGVhZCwgdGhlIHJlY29tbWFuZGVkIHdheSBpcyB0byB1c2Ugc2VuZCgpIG1ldGhvZFxuICAgICAqIEBwYXJhbSBhcGR1IHRoZSBkYXRhIHRvIHNlbmRcbiAgICAgKiBAcmV0dXJuIGEgUHJvbWlzZSBvZiByZXNwb25zZSBkYXRhXG4gICAgICovXG4gICAgVHJhbnNwb3J0LnByb3RvdHlwZS5leGNoYW5nZSA9IGZ1bmN0aW9uIChfYXBkdSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJleGNoYW5nZSBub3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBzZXQgdGhlIFwic2NyYW1ibGUga2V5XCIgZm9yIHRoZSBuZXh0IGV4Y2hhbmdlcyB3aXRoIHRoZSBkZXZpY2UuXG4gICAgICogRWFjaCBBcHAgY2FuIGhhdmUgYSBkaWZmZXJlbnQgc2NyYW1ibGUga2V5IGFuZCB0aGV5IGludGVybmFsbHkgd2lsbCBzZXQgaXQgYXQgaW5zdGFuY2lhdGlvbi5cbiAgICAgKiBAcGFyYW0ga2V5IHRoZSBzY3JhbWJsZSBrZXlcbiAgICAgKi9cbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLnNldFNjcmFtYmxlS2V5ID0gZnVuY3Rpb24gKF9rZXkpIHsgfTtcbiAgICAvKipcbiAgICAgKiBjbG9zZSB0aGUgZXhjaGFuZ2Ugd2l0aCB0aGUgZGV2aWNlLlxuICAgICAqIEByZXR1cm4gYSBQcm9taXNlIHRoYXQgZW5kcyB3aGVuIHRoZSB0cmFuc3BvcnQgaXMgY2xvc2VkLlxuICAgICAqL1xuICAgIFRyYW5zcG9ydC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBhbiBldmVudCBvbiBhbiBpbnN0YW5jZSBvZiB0cmFuc3BvcnQuXG4gICAgICogVHJhbnNwb3J0IGltcGxlbWVudGF0aW9uIGNhbiBoYXZlIHNwZWNpZmljIGV2ZW50cy4gSGVyZSBpcyB0aGUgY29tbW9uIGV2ZW50czpcbiAgICAgKiAqIGBcImRpc2Nvbm5lY3RcImAgOiB0cmlnZ2VyZWQgaWYgVHJhbnNwb3J0IGlzIGRpc2Nvbm5lY3RlZFxuICAgICAqL1xuICAgIFRyYW5zcG9ydC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgICB0aGlzLl9ldmVudHMub24oZXZlbnROYW1lLCBjYik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTdG9wIGxpc3RlbmluZyB0byBhbiBldmVudCBvbiBhbiBpbnN0YW5jZSBvZiB0cmFuc3BvcnQuXG4gICAgICovXG4gICAgVHJhbnNwb3J0LnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBjYikge1xuICAgICAgICB0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBjYik7XG4gICAgfTtcbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgYXJnc1tfaSAtIDFdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICAoX2EgPSB0aGlzLl9ldmVudHMpLmVtaXQuYXBwbHkoX2EsIF9fc3ByZWFkQXJyYXkoW2V2ZW50XSwgX19yZWFkKGFyZ3MpLCBmYWxzZSkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRW5hYmxlIG9yIG5vdCBsb2dzIG9mIHRoZSBiaW5hcnkgZXhjaGFuZ2VcbiAgICAgKi9cbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLnNldERlYnVnTW9kZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwic2V0RGVidWdNb2RlIGlzIGRlcHJlY2F0ZWQuIHVzZSBAbGVkZ2VyaHEvbG9ncyBpbnN0ZWFkLiBObyBsb2dzIGFyZSBlbWl0dGVkIGluIHRoaXMgYW55bW9yZS5cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTZXQgYSB0aW1lb3V0IChpbiBtaWxsaXNlY29uZHMpIGZvciB0aGUgZXhjaGFuZ2UgY2FsbC4gT25seSBzb21lIHRyYW5zcG9ydCBtaWdodCBpbXBsZW1lbnQgaXQuIChlLmcuIFUyRilcbiAgICAgKi9cbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLnNldEV4Y2hhbmdlVGltZW91dCA9IGZ1bmN0aW9uIChleGNoYW5nZVRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy5leGNoYW5nZVRpbWVvdXQgPSBleGNoYW5nZVRpbWVvdXQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmUgdGhlIGRlbGF5IGJlZm9yZSBlbWl0dGluZyBcInVucmVzcG9uc2l2ZVwiIG9uIGFuIGV4Y2hhbmdlIHRoYXQgZG9lcyBub3QgcmVzcG9uZFxuICAgICAqL1xuICAgIFRyYW5zcG9ydC5wcm90b3R5cGUuc2V0RXhjaGFuZ2VVbnJlc3BvbnNpdmVUaW1lb3V0ID0gZnVuY3Rpb24gKHVucmVzcG9uc2l2ZVRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy51bnJlc3BvbnNpdmVUaW1lb3V0ID0gdW5yZXNwb25zaXZlVGltZW91dDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGNyZWF0ZSgpIGFsbG93cyB0byBvcGVuIHRoZSBmaXJzdCBkZXNjcmlwdG9yIGF2YWlsYWJsZSBvclxuICAgICAqIHRocm93IGlmIHRoZXJlIGlzIG5vbmUgb3IgaWYgdGltZW91dCBpcyByZWFjaGVkLlxuICAgICAqIFRoaXMgaXMgYSBsaWdodCBoZWxwZXIsIGFsdGVybmF0aXZlIHRvIHVzaW5nIGxpc3RlbigpIGFuZCBvcGVuKCkgKHRoYXQgeW91IG1heSBuZWVkIGZvciBhbnkgbW9yZSBhZHZhbmNlZCB1c2VjYXNlKVxuICAgICAqIEBleGFtcGxlXG4gICAgVHJhbnNwb3J0Rm9vLmNyZWF0ZSgpLnRoZW4odHJhbnNwb3J0ID0+IC4uLilcbiAgICAgKi9cbiAgICBUcmFuc3BvcnQuY3JlYXRlID0gZnVuY3Rpb24gKG9wZW5UaW1lb3V0LCBsaXN0ZW5UaW1lb3V0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChvcGVuVGltZW91dCA9PT0gdm9pZCAwKSB7IG9wZW5UaW1lb3V0ID0gMzAwMDsgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgc3ViID0gX3RoaXMubGlzdGVuKHtcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWIpXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlblRpbWVvdXRJZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsaXN0ZW5UaW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vcGVuKGUuZGVzY3JpcHRvciwgb3BlblRpbWVvdXQpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuVGltZW91dElkKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxpc3RlblRpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5UaW1lb3V0SWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobGlzdGVuVGltZW91dElkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBUcmFuc3BvcnRFcnJvcihfdGhpcy5FcnJvck1lc3NhZ2VfTm9EZXZpY2VGb3VuZCwgXCJOb0RldmljZUZvdW5kXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGxpc3RlblRpbWVvdXRJZCA9IGxpc3RlblRpbWVvdXRcbiAgICAgICAgICAgICAgICA/IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBUcmFuc3BvcnRFcnJvcihfdGhpcy5FcnJvck1lc3NhZ2VfTGlzdGVuVGltZW91dCwgXCJMaXN0ZW5UaW1lb3V0XCIpKTtcbiAgICAgICAgICAgICAgICB9LCBsaXN0ZW5UaW1lb3V0KVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLmRlY29yYXRlQXBwQVBJTWV0aG9kcyA9IGZ1bmN0aW9uIChzZWxmLCBtZXRob2RzLCBzY3JhbWJsZUtleSkge1xuICAgICAgICB2YXIgZV8xLCBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIG1ldGhvZHNfMSA9IF9fdmFsdWVzKG1ldGhvZHMpLCBtZXRob2RzXzFfMSA9IG1ldGhvZHNfMS5uZXh0KCk7ICFtZXRob2RzXzFfMS5kb25lOyBtZXRob2RzXzFfMSA9IG1ldGhvZHNfMS5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kTmFtZSA9IG1ldGhvZHNfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgIHNlbGZbbWV0aG9kTmFtZV0gPSB0aGlzLmRlY29yYXRlQXBwQVBJTWV0aG9kKG1ldGhvZE5hbWUsIHNlbGZbbWV0aG9kTmFtZV0sIHNlbGYsIHNjcmFtYmxlS2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZHNfMV8xICYmICFtZXRob2RzXzFfMS5kb25lICYmIChfYSA9IG1ldGhvZHNfMVtcInJldHVyblwiXSkpIF9hLmNhbGwobWV0aG9kc18xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgVHJhbnNwb3J0LnByb3RvdHlwZS5kZWNvcmF0ZUFwcEFQSU1ldGhvZCA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBmLCBjdHgsIHNjcmFtYmxlS2V5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBfYXBwQVBJbG9jaztcbiAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYXBwQVBJbG9jayA9IHRoaXMuX2FwcEFQSWxvY2s7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9hcHBBUElsb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlamVjdChuZXcgVHJhbnNwb3J0RXJyb3IoXCJMZWRnZXIgRGV2aWNlIGlzIGJ1c3kgKGxvY2sgXCIgKyBfYXBwQVBJbG9jayArIFwiKVwiLCBcIlRyYW5zcG9ydExvY2tlZFwiKSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EudHJ5cy5wdXNoKFsxLCAsIDMsIDRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcHBBUElsb2NrID0gbWV0aG9kTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNjcmFtYmxlS2V5KHNjcmFtYmxlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBmLmFwcGx5KGN0eCwgYXJncyldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzIgLypyZXR1cm4qLywgX2Euc2VudCgpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcHBBUElsb2NrID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzcgLyplbmRmaW5hbGx5Ki9dO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgVHJhbnNwb3J0LkVycm9yTWVzc2FnZV9MaXN0ZW5UaW1lb3V0ID0gXCJObyBMZWRnZXIgZGV2aWNlIGZvdW5kICh0aW1lb3V0KVwiO1xuICAgIFRyYW5zcG9ydC5FcnJvck1lc3NhZ2VfTm9EZXZpY2VGb3VuZCA9IFwiTm8gTGVkZ2VyIGRldmljZSBmb3VuZFwiO1xuICAgIHJldHVybiBUcmFuc3BvcnQ7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgVHJhbnNwb3J0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VHJhbnNwb3J0LmpzLm1hcCIsInZhciBpZCA9IDA7XG52YXIgc3Vic2NyaWJlcnMgPSBbXTtcbi8qKlxuICogbG9nIHNvbWV0aGluZ1xuICogQHBhcmFtIHR5cGUgYSBuYW1lc3BhY2VkIGlkZW50aWZpZXIgb2YgdGhlIGxvZyAoaXQgaXMgbm90IGEgbGV2ZWwgbGlrZSBcImRlYnVnXCIsIFwiZXJyb3JcIiBidXQgbW9yZSBsaWtlIFwiYXBkdS1pblwiLCBcImFwZHUtb3V0XCIsIGV0Yy4uLilcbiAqIEBwYXJhbSBtZXNzYWdlIGEgY2xlYXIgbWVzc2FnZSBvZiB0aGUgbG9nIGFzc29jaWF0ZWQgdG8gdGhlIHR5cGVcbiAqL1xuZXhwb3J0IHZhciBsb2cgPSBmdW5jdGlvbiAodHlwZSwgbWVzc2FnZSwgZGF0YSkge1xuICAgIHZhciBvYmogPSB7XG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIGlkOiBTdHJpbmcoKytpZCksXG4gICAgICAgIGRhdGU6IG5ldyBEYXRlKClcbiAgICB9O1xuICAgIGlmIChtZXNzYWdlKVxuICAgICAgICBvYmoubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgaWYgKGRhdGEpXG4gICAgICAgIG9iai5kYXRhID0gZGF0YTtcbiAgICBkaXNwYXRjaChvYmopO1xufTtcbi8qKlxuICogbGlzdGVuIHRvIGxvZ3MuXG4gKiBAcGFyYW0gY2IgdGhhdCBpcyBjYWxsZWQgZm9yIGVhY2ggZnV0dXJlIGxvZygpIHdpdGggdGhlIExvZyBvYmplY3RcbiAqIEByZXR1cm4gYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgdG8gdW5zdWJzY3JpYmUgdGhlIGxpc3RlbmVyXG4gKi9cbmV4cG9ydCB2YXIgbGlzdGVuID0gZnVuY3Rpb24gKGNiKSB7XG4gICAgc3Vic2NyaWJlcnMucHVzaChjYik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGkgPSBzdWJzY3JpYmVycy5pbmRleE9mKGNiKTtcbiAgICAgICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICAgICAgICAvLyBlcXVpdmFsZW50IG9mIHN1YnNjcmliZXJzLnNwbGljZShpLCAxKSAvLyBodHRwczovL3R3aXR0ZXIuY29tL1JpY2hfSGFycmlzL3N0YXR1cy8xMTI1ODUwMzkxMTU1OTY1OTUyXG4gICAgICAgICAgICBzdWJzY3JpYmVyc1tpXSA9IHN1YnNjcmliZXJzW3N1YnNjcmliZXJzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgc3Vic2NyaWJlcnMucG9wKCk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbmZ1bmN0aW9uIGRpc3BhdGNoKGxvZykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN1YnNjcmliZXJzW2ldKGxvZyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbmRvdy5fX2xlZGdlckxvZ3NMaXN0ZW4gPSBsaXN0ZW47XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX2E7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5zZXJpYWxpemVQYXRoID0gZXhwb3J0cy5nZXRWZXJzaW9uID0gZXhwb3J0cy5wcm9jZXNzRXJyb3JSZXNwb25zZSA9IGV4cG9ydHMuZXJyb3JDb2RlVG9TdHJpbmcgPSBleHBvcnRzLkVSUk9SX0RFU0NSSVBUSU9OID0gZXhwb3J0cy5MZWRnZXJFcnJvciA9IGV4cG9ydHMuU0lHTEVOID0gZXhwb3J0cy5QS0xFTiA9IGV4cG9ydHMuUDFfVkFMVUVTID0gZXhwb3J0cy5QQVlMT0FEX1RZUEUgPSBleHBvcnRzLklOUyA9IGV4cG9ydHMuQVBQX0tFWSA9IGV4cG9ydHMuQ0hVTktfU0laRSA9IGV4cG9ydHMuQ0xBID0gdm9pZCAwO1xuZXhwb3J0cy5DTEEgPSAweDExO1xuZXhwb3J0cy5DSFVOS19TSVpFID0gMjUwO1xuZXhwb3J0cy5BUFBfS0VZID0gJ0RGTic7XG5leHBvcnRzLklOUyA9IHtcbiAgICBHRVRfVkVSU0lPTjogMHgwMCxcbiAgICBHRVRfQUREUl9TRUNQMjU2SzE6IDB4MDEsXG4gICAgU0lHTl9TRUNQMjU2SzE6IDB4MDJcbn07XG5leHBvcnRzLlBBWUxPQURfVFlQRSA9IHtcbiAgICBJTklUOiAweDAwLFxuICAgIEFERDogMHgwMSxcbiAgICBMQVNUOiAweDAyXG59O1xuZXhwb3J0cy5QMV9WQUxVRVMgPSB7XG4gICAgT05MWV9SRVRSSUVWRTogMHgwMCxcbiAgICBTSE9XX0FERFJFU1NfSU5fREVWSUNFOiAweDAxXG59O1xuZXhwb3J0cy5QS0xFTiA9IDMzO1xuZXhwb3J0cy5TSUdMRU4gPSA2NDtcbnZhciBMZWRnZXJFcnJvcjtcbihmdW5jdGlvbiAoTGVkZ2VyRXJyb3IpIHtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIlUyRlVua25vd25cIl0gPSAxXSA9IFwiVTJGVW5rbm93blwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiVTJGQmFkUmVxdWVzdFwiXSA9IDJdID0gXCJVMkZCYWRSZXF1ZXN0XCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJVMkZDb25maWd1cmF0aW9uVW5zdXBwb3J0ZWRcIl0gPSAzXSA9IFwiVTJGQ29uZmlndXJhdGlvblVuc3VwcG9ydGVkXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJVMkZEZXZpY2VJbmVsaWdpYmxlXCJdID0gNF0gPSBcIlUyRkRldmljZUluZWxpZ2libGVcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIlUyRlRpbWVvdXRcIl0gPSA1XSA9IFwiVTJGVGltZW91dFwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiVGltZW91dFwiXSA9IDE0XSA9IFwiVGltZW91dFwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiTm9FcnJvcnNcIl0gPSAzNjg2NF0gPSBcIk5vRXJyb3JzXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJEZXZpY2VJc0J1c3lcIl0gPSAzNjg2NV0gPSBcIkRldmljZUlzQnVzeVwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiRXJyb3JEZXJpdmluZ0tleXNcIl0gPSAyNjYyNl0gPSBcIkVycm9yRGVyaXZpbmdLZXlzXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJFeGVjdXRpb25FcnJvclwiXSA9IDI1NjAwXSA9IFwiRXhlY3V0aW9uRXJyb3JcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIldyb25nTGVuZ3RoXCJdID0gMjYzNjhdID0gXCJXcm9uZ0xlbmd0aFwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiRW1wdHlCdWZmZXJcIl0gPSAyNzAxMF0gPSBcIkVtcHR5QnVmZmVyXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJPdXRwdXRCdWZmZXJUb29TbWFsbFwiXSA9IDI3MDExXSA9IFwiT3V0cHV0QnVmZmVyVG9vU21hbGxcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIkRhdGFJc0ludmFsaWRcIl0gPSAyNzAxMl0gPSBcIkRhdGFJc0ludmFsaWRcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIkNvbmRpdGlvbnNOb3RTYXRpc2ZpZWRcIl0gPSAyNzAxM10gPSBcIkNvbmRpdGlvbnNOb3RTYXRpc2ZpZWRcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIlRyYW5zYWN0aW9uUmVqZWN0ZWRcIl0gPSAyNzAxNF0gPSBcIlRyYW5zYWN0aW9uUmVqZWN0ZWRcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIkJhZEtleUhhbmRsZVwiXSA9IDI3MjY0XSA9IFwiQmFkS2V5SGFuZGxlXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJJbnZhbGlkUDFQMlwiXSA9IDI3MzkyXSA9IFwiSW52YWxpZFAxUDJcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIkluc3RydWN0aW9uTm90U3VwcG9ydGVkXCJdID0gMjc5MDRdID0gXCJJbnN0cnVjdGlvbk5vdFN1cHBvcnRlZFwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiQXBwRG9lc05vdFNlZW1Ub0JlT3BlblwiXSA9IDI4MTYwXSA9IFwiQXBwRG9lc05vdFNlZW1Ub0JlT3BlblwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiVW5rbm93bkVycm9yXCJdID0gMjg0MTZdID0gXCJVbmtub3duRXJyb3JcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIlNpZ25WZXJpZnlFcnJvclwiXSA9IDI4NDE3XSA9IFwiU2lnblZlcmlmeUVycm9yXCI7XG59KShMZWRnZXJFcnJvciA9IGV4cG9ydHMuTGVkZ2VyRXJyb3IgfHwgKGV4cG9ydHMuTGVkZ2VyRXJyb3IgPSB7fSkpO1xuZXhwb3J0cy5FUlJPUl9ERVNDUklQVElPTiA9IChfYSA9IHt9LFxuICAgIF9hW0xlZGdlckVycm9yLlUyRlVua25vd25dID0gJ1UyRjogVW5rbm93bicsXG4gICAgX2FbTGVkZ2VyRXJyb3IuVTJGQmFkUmVxdWVzdF0gPSAnVTJGOiBCYWQgcmVxdWVzdCcsXG4gICAgX2FbTGVkZ2VyRXJyb3IuVTJGQ29uZmlndXJhdGlvblVuc3VwcG9ydGVkXSA9ICdVMkY6IENvbmZpZ3VyYXRpb24gdW5zdXBwb3J0ZWQnLFxuICAgIF9hW0xlZGdlckVycm9yLlUyRkRldmljZUluZWxpZ2libGVdID0gJ1UyRjogRGV2aWNlIEluZWxpZ2libGUnLFxuICAgIF9hW0xlZGdlckVycm9yLlUyRlRpbWVvdXRdID0gJ1UyRjogVGltZW91dCcsXG4gICAgX2FbTGVkZ2VyRXJyb3IuVGltZW91dF0gPSAnVGltZW91dCcsXG4gICAgX2FbTGVkZ2VyRXJyb3IuTm9FcnJvcnNdID0gJ05vIGVycm9ycycsXG4gICAgX2FbTGVkZ2VyRXJyb3IuRGV2aWNlSXNCdXN5XSA9ICdEZXZpY2UgaXMgYnVzeScsXG4gICAgX2FbTGVkZ2VyRXJyb3IuRXJyb3JEZXJpdmluZ0tleXNdID0gJ0Vycm9yIGRlcml2aW5nIGtleXMnLFxuICAgIF9hW0xlZGdlckVycm9yLkV4ZWN1dGlvbkVycm9yXSA9ICdFeGVjdXRpb24gRXJyb3InLFxuICAgIF9hW0xlZGdlckVycm9yLldyb25nTGVuZ3RoXSA9ICdXcm9uZyBMZW5ndGgnLFxuICAgIF9hW0xlZGdlckVycm9yLkVtcHR5QnVmZmVyXSA9ICdFbXB0eSBCdWZmZXInLFxuICAgIF9hW0xlZGdlckVycm9yLk91dHB1dEJ1ZmZlclRvb1NtYWxsXSA9ICdPdXRwdXQgYnVmZmVyIHRvbyBzbWFsbCcsXG4gICAgX2FbTGVkZ2VyRXJyb3IuRGF0YUlzSW52YWxpZF0gPSAnRGF0YSBpcyBpbnZhbGlkJyxcbiAgICBfYVtMZWRnZXJFcnJvci5Db25kaXRpb25zTm90U2F0aXNmaWVkXSA9ICdDb25kaXRpb25zIG5vdCBzYXRpc2ZpZWQnLFxuICAgIF9hW0xlZGdlckVycm9yLlRyYW5zYWN0aW9uUmVqZWN0ZWRdID0gJ1RyYW5zYWN0aW9uIHJlamVjdGVkJyxcbiAgICBfYVtMZWRnZXJFcnJvci5CYWRLZXlIYW5kbGVdID0gJ0JhZCBrZXkgaGFuZGxlJyxcbiAgICBfYVtMZWRnZXJFcnJvci5JbnZhbGlkUDFQMl0gPSAnSW52YWxpZCBQMS9QMicsXG4gICAgX2FbTGVkZ2VyRXJyb3IuSW5zdHJ1Y3Rpb25Ob3RTdXBwb3J0ZWRdID0gJ0luc3RydWN0aW9uIG5vdCBzdXBwb3J0ZWQnLFxuICAgIF9hW0xlZGdlckVycm9yLkFwcERvZXNOb3RTZWVtVG9CZU9wZW5dID0gJ0FwcCBkb2VzIG5vdCBzZWVtIHRvIGJlIG9wZW4nLFxuICAgIF9hW0xlZGdlckVycm9yLlVua25vd25FcnJvcl0gPSAnVW5rbm93biBlcnJvcicsXG4gICAgX2FbTGVkZ2VyRXJyb3IuU2lnblZlcmlmeUVycm9yXSA9ICdTaWduL3ZlcmlmeSBlcnJvcicsXG4gICAgX2EpO1xuZnVuY3Rpb24gZXJyb3JDb2RlVG9TdHJpbmcoc3RhdHVzQ29kZSkge1xuICAgIGlmIChzdGF0dXNDb2RlIGluIGV4cG9ydHMuRVJST1JfREVTQ1JJUFRJT04pXG4gICAgICAgIHJldHVybiBleHBvcnRzLkVSUk9SX0RFU0NSSVBUSU9OW3N0YXR1c0NvZGVdO1xuICAgIHJldHVybiBcIlVua25vd24gU3RhdHVzIENvZGU6IFwiICsgc3RhdHVzQ29kZTtcbn1cbmV4cG9ydHMuZXJyb3JDb2RlVG9TdHJpbmcgPSBlcnJvckNvZGVUb1N0cmluZztcbmZ1bmN0aW9uIGlzRGljdCh2KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2ID09PSAnb2JqZWN0JyAmJiB2ICE9PSBudWxsICYmICEodiBpbnN0YW5jZW9mIEFycmF5KSAmJiAhKHYgaW5zdGFuY2VvZiBEYXRlKTtcbn1cbmZ1bmN0aW9uIHByb2Nlc3NFcnJvclJlc3BvbnNlKHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChpc0RpY3QocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3BvbnNlLCAnc3RhdHVzQ29kZScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuQ29kZTogcmVzcG9uc2Uuc3RhdHVzQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvckNvZGVUb1N0cmluZyhyZXNwb25zZS5zdGF0dXNDb2RlKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3BvbnNlLCAncmV0dXJuQ29kZScpICYmXG4gICAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3BvbnNlLCAnZXJyb3JNZXNzYWdlJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJldHVybkNvZGU6IDB4ZmZmZixcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogcmVzcG9uc2UudG9TdHJpbmcoKVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICByZXR1cm5Db2RlOiAweGZmZmYsXG4gICAgICAgIGVycm9yTWVzc2FnZTogcmVzcG9uc2UudG9TdHJpbmcoKVxuICAgIH07XG59XG5leHBvcnRzLnByb2Nlc3NFcnJvclJlc3BvbnNlID0gcHJvY2Vzc0Vycm9yUmVzcG9uc2U7XG5mdW5jdGlvbiBnZXRWZXJzaW9uKHRyYW5zcG9ydCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRyYW5zcG9ydC5zZW5kKGV4cG9ydHMuQ0xBLCBleHBvcnRzLklOUy5HRVRfVkVSU0lPTiwgMCwgMCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yQ29kZURhdGEgPSByZXNwb25zZS5zbGljZSgtMik7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5Db2RlID0gKGVycm9yQ29kZURhdGFbMF0gKiAyNTYgKyBlcnJvckNvZGVEYXRhWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldElkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmxlbmd0aCA+PSA5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlICovXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHJlc3BvbnNlWzVdIDw8IDI0KSArIChyZXNwb25zZVs2XSA8PCAxNikgKyAocmVzcG9uc2VbN10gPDwgOCkgKyAocmVzcG9uc2VbOF0gPDwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWJpdHdpc2UgKi9cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuQ29kZTogcmV0dXJuQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogZXJyb3JDb2RlVG9TdHJpbmcocmV0dXJuQ29kZSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0TW9kZTogcmVzcG9uc2VbMF0gIT09IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWpvcjogcmVzcG9uc2VbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5vcjogcmVzcG9uc2VbMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRjaDogcmVzcG9uc2VbM10sXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXZpY2VMb2NrZWQ6IHJlc3BvbnNlWzRdID09PSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQ6IHRhcmdldElkLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0sIHByb2Nlc3NFcnJvclJlc3BvbnNlKV07XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5nZXRWZXJzaW9uID0gZ2V0VmVyc2lvbjtcbnZhciBIQVJERU5FRCA9IDB4ODAwMDAwMDA7XG5mdW5jdGlvbiBzZXJpYWxpemVQYXRoKHBhdGgpIHtcbiAgICBpZiAoIXBhdGguc3RhcnRzV2l0aCgnbScpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUGF0aCBzaG91bGQgc3RhcnQgd2l0aCBcIm1cIiAoZS5nIFwibS80NFxcJy81NzU3XFwnLzVcXCcvMC8zXCIpJyk7XG4gICAgfVxuICAgIHZhciBwYXRoQXJyYXkgPSBwYXRoLnNwbGl0KCcvJyk7XG4gICAgaWYgKHBhdGhBcnJheS5sZW5ndGggIT09IDYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwYXRoLiAoZS5nIFxcXCJtLzQ0Jy81NzU3Jy81Jy8wLzNcXFwiKVwiKTtcbiAgICB9XG4gICAgdmFyIGJ1ZiA9IEJ1ZmZlci5hbGxvYygyMCk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBwYXRoQXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gMDtcbiAgICAgICAgdmFyIGNoaWxkID0gcGF0aEFycmF5W2ldO1xuICAgICAgICBpZiAoY2hpbGQuZW5kc1dpdGgoXCInXCIpKSB7XG4gICAgICAgICAgICB2YWx1ZSArPSBIQVJERU5FRDtcbiAgICAgICAgICAgIGNoaWxkID0gY2hpbGQuc2xpY2UoMCwgLTEpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjaGlsZE51bWJlciA9IE51bWJlcihjaGlsZCk7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4oY2hpbGROdW1iZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHBhdGggOiBcIiArIGNoaWxkICsgXCIgaXMgbm90IGEgbnVtYmVyLiAoZS5nIFxcXCJtLzQ0Jy80NjEnLzUnLzAvM1xcXCIpXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGlsZE51bWJlciA+PSBIQVJERU5FRCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbmNvcnJlY3QgY2hpbGQgdmFsdWUgKGJpZ2dlciBvciBlcXVhbCB0byAweDgwMDAwMDAwKScpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlICs9IGNoaWxkTnVtYmVyO1xuICAgICAgICBidWYud3JpdGVVSW50MzJMRSh2YWx1ZSwgNCAqIChpIC0gMSkpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmO1xufVxuZXhwb3J0cy5zZXJpYWxpemVQYXRoID0gc2VyaWFsaXplUGF0aDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuTGVkZ2VyRXJyb3IgPSB2b2lkIDA7XG52YXIgY29tbW9uXzEgPSByZXF1aXJlKFwiLi9jb21tb25cIik7XG5leHBvcnRzLkxlZGdlckVycm9yID0gY29tbW9uXzEuTGVkZ2VyRXJyb3I7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdHlwZXNcIiksIGV4cG9ydHMpO1xuZnVuY3Rpb24gcHJvY2Vzc0dldEFkZHJSZXNwb25zZShyZXNwb25zZSkge1xuICAgIHZhciBwYXJ0aWFsUmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICB2YXIgZXJyb3JDb2RlRGF0YSA9IHBhcnRpYWxSZXNwb25zZS5zbGljZSgtMik7XG4gICAgdmFyIHJldHVybkNvZGUgPSAoZXJyb3JDb2RlRGF0YVswXSAqIDI1NiArIGVycm9yQ29kZURhdGFbMV0pO1xuICAgIHZhciBwdWJsaWNLZXkgPSBCdWZmZXIuZnJvbShwYXJ0aWFsUmVzcG9uc2Uuc2xpY2UoMCwgY29tbW9uXzEuUEtMRU4pKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwdWJsaWNLZXk6IHB1YmxpY0tleSxcbiAgICAgICAgcmV0dXJuQ29kZTogcmV0dXJuQ29kZSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiBjb21tb25fMS5lcnJvckNvZGVUb1N0cmluZyhyZXR1cm5Db2RlKVxuICAgIH07XG59XG52YXIgQ2FzcGVyQXBwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhc3BlckFwcCh0cmFuc3BvcnQpIHtcbiAgICAgICAgaWYgKCF0cmFuc3BvcnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNwb3J0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XG4gICAgfVxuICAgIENhc3BlckFwcC5wcmVwYXJlQ2h1bmtzID0gZnVuY3Rpb24gKHNlcmlhbGl6ZWRQYXRoQnVmZmVyLCBtZXNzYWdlKSB7XG4gICAgICAgIHZhciBjaHVua3MgPSBbXTtcbiAgICAgICAgLy8gRmlyc3QgY2h1bmsgKG9ubHkgcGF0aClcbiAgICAgICAgY2h1bmtzLnB1c2goc2VyaWFsaXplZFBhdGhCdWZmZXIpO1xuICAgICAgICB2YXIgbWVzc2FnZUJ1ZmZlciA9IEJ1ZmZlci5mcm9tKG1lc3NhZ2UpO1xuICAgICAgICB2YXIgYnVmZmVyID0gQnVmZmVyLmNvbmNhdChbbWVzc2FnZUJ1ZmZlcl0pO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1ZmZlci5sZW5ndGg7IGkgKz0gY29tbW9uXzEuQ0hVTktfU0laRSkge1xuICAgICAgICAgICAgdmFyIGVuZCA9IGkgKyBjb21tb25fMS5DSFVOS19TSVpFO1xuICAgICAgICAgICAgaWYgKGkgPiBidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZW5kID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNodW5rcy5wdXNoKGJ1ZmZlci5zbGljZShpLCBlbmQpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2h1bmtzO1xuICAgIH07XG4gICAgQ2FzcGVyQXBwLnByb3RvdHlwZS5zaWduR2V0Q2h1bmtzID0gZnVuY3Rpb24gKHBhdGgsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBDYXNwZXJBcHAucHJlcGFyZUNodW5rcyhjb21tb25fMS5zZXJpYWxpemVQYXRoKHBhdGgpLCBtZXNzYWdlKV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDYXNwZXJBcHAucHJvdG90eXBlLmdldFZlcnNpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgY29tbW9uXzEuZ2V0VmVyc2lvbih0aGlzLnRyYW5zcG9ydClbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBjb21tb25fMS5wcm9jZXNzRXJyb3JSZXNwb25zZShlcnIpOyB9KV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDYXNwZXJBcHAucHJvdG90eXBlLmdldEFwcEluZm8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy50cmFuc3BvcnQuc2VuZCgweGIwLCAweDAxLCAwLCAwKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yQ29kZURhdGEgPSByZXNwb25zZS5zbGljZSgtMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuQ29kZSA9IGVycm9yQ29kZURhdGFbMF0gKiAyNTYgKyBlcnJvckNvZGVEYXRhWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFwcE5hbWUgPSAnZXJyJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcHBWZXJzaW9uID0gJ2Vycic7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmxhZ0xlbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmxhZ3NWYWx1ZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2VbMF0gIT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMZWRnZXIgcmVzcG9uZHMgd2l0aCBmb3JtYXQgSUQgMS4gVGhlcmUgaXMgbm8gc3BlYyBmb3IgYW55IGZvcm1hdCAhPSAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmVycm9yTWVzc2FnZSA9ICdyZXNwb25zZSBmb3JtYXQgSUQgbm90IHJlY29nbml6ZWQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZXR1cm5Db2RlID0gY29tbW9uXzEuTGVkZ2VyRXJyb3IuRGV2aWNlSXNCdXN5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFwcE5hbWVMZW4gPSByZXNwb25zZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBOYW1lID0gcmVzcG9uc2Uuc2xpY2UoMiwgMiArIGFwcE5hbWVMZW4pLnRvU3RyaW5nKCdhc2NpaScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpZHggPSAyICsgYXBwTmFtZUxlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXBwVmVyc2lvbkxlbiA9IHJlc3BvbnNlW2lkeF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwVmVyc2lvbiA9IHJlc3BvbnNlLnNsaWNlKGlkeCwgaWR4ICsgYXBwVmVyc2lvbkxlbikudG9TdHJpbmcoJ2FzY2lpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWR4ICs9IGFwcFZlcnNpb25MZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFwcEZsYWdzTGVuID0gcmVzcG9uc2VbaWR4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnTGVuID0gYXBwRmxhZ3NMZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ3NWYWx1ZSA9IHJlc3BvbnNlW2lkeF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybkNvZGU6IHJldHVybkNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBjb21tb25fMS5lcnJvckNvZGVUb1N0cmluZyhyZXR1cm5Db2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcE5hbWU6IGFwcE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwVmVyc2lvbjogYXBwVmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnTGVuOiBmbGFnTGVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWdzVmFsdWU6IGZsYWdzVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ1JlY292ZXJ5OiAoZmxhZ3NWYWx1ZSAmIDEpICE9PSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ1NpZ25lZE1jdUNvZGU6IChmbGFnc1ZhbHVlICYgMikgIT09IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnT25ib2FyZGVkOiAoZmxhZ3NWYWx1ZSAmIDQpICE9PSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ1BJTlZhbGlkYXRlZDogKGZsYWdzVmFsdWUgJiAxMjgpICE9PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9LCBjb21tb25fMS5wcm9jZXNzRXJyb3JSZXNwb25zZSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2FzcGVyQXBwLnByb3RvdHlwZS5nZXRBZGRyZXNzQW5kUHViS2V5ID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNlcmlhbGl6ZWRQYXRoO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRQYXRoID0gY29tbW9uXzEuc2VyaWFsaXplUGF0aChwYXRoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy50cmFuc3BvcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKGNvbW1vbl8xLkNMQSwgY29tbW9uXzEuSU5TLkdFVF9BRERSX1NFQ1AyNTZLMSwgY29tbW9uXzEuUDFfVkFMVUVTLk9OTFlfUkVUUklFVkUsIDAsIHNlcmlhbGl6ZWRQYXRoLCBbMHg5MDAwXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHByb2Nlc3NHZXRBZGRyUmVzcG9uc2UsIGNvbW1vbl8xLnByb2Nlc3NFcnJvclJlc3BvbnNlKV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDYXNwZXJBcHAucHJvdG90eXBlLnNob3dBZGRyZXNzQW5kUHViS2V5ID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNlcmlhbGl6ZWRQYXRoO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRQYXRoID0gY29tbW9uXzEuc2VyaWFsaXplUGF0aChwYXRoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy50cmFuc3BvcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKGNvbW1vbl8xLkNMQSwgY29tbW9uXzEuSU5TLkdFVF9BRERSX1NFQ1AyNTZLMSwgY29tbW9uXzEuUDFfVkFMVUVTLlNIT1dfQUREUkVTU19JTl9ERVZJQ0UsIDAsIHNlcmlhbGl6ZWRQYXRoLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tb25fMS5MZWRnZXJFcnJvci5Ob0Vycm9ycyxcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHByb2Nlc3NHZXRBZGRyUmVzcG9uc2UsIGNvbW1vbl8xLnByb2Nlc3NFcnJvclJlc3BvbnNlKV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDYXNwZXJBcHAucHJvdG90eXBlLnNpZ25TZW5kQ2h1bmsgPSBmdW5jdGlvbiAoY2h1bmtJZHgsIGNodW5rTnVtLCBjaHVuaykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcGF5bG9hZFR5cGU7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZFR5cGUgPSBjb21tb25fMS5QQVlMT0FEX1RZUEUuQUREO1xuICAgICAgICAgICAgICAgIGlmIChjaHVua0lkeCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZSA9IGNvbW1vbl8xLlBBWUxPQURfVFlQRS5JTklUO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2h1bmtJZHggPT09IGNodW5rTnVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlID0gY29tbW9uXzEuUEFZTE9BRF9UWVBFLkxBU1Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnRyYW5zcG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQoY29tbW9uXzEuQ0xBLCBjb21tb25fMS5JTlMuU0lHTl9TRUNQMjU2SzEsIHBheWxvYWRUeXBlLCAwLCBjaHVuaywgW1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbW9uXzEuTGVkZ2VyRXJyb3IuTm9FcnJvcnMsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tb25fMS5MZWRnZXJFcnJvci5EYXRhSXNJbnZhbGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbW9uXzEuTGVkZ2VyRXJyb3IuQmFkS2V5SGFuZGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbW9uXzEuTGVkZ2VyRXJyb3IuU2lnblZlcmlmeUVycm9yXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvckNvZGVEYXRhID0gcmVzcG9uc2Uuc2xpY2UoLTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybkNvZGUgPSBlcnJvckNvZGVEYXRhWzBdICogMjU2ICsgZXJyb3JDb2RlRGF0YVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBjb21tb25fMS5lcnJvckNvZGVUb1N0cmluZyhyZXR1cm5Db2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaWduYXR1cmVSUyA9IEJ1ZmZlci5hbGxvYygwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5Db2RlID09PSBjb21tb25fMS5MZWRnZXJFcnJvci5CYWRLZXlIYW5kbGUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5Db2RlID09PSBjb21tb25fMS5MZWRnZXJFcnJvci5EYXRhSXNJbnZhbGlkIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuQ29kZSA9PT0gY29tbW9uXzEuTGVkZ2VyRXJyb3IuU2lnblZlcmlmeUVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyb3JNZXNzYWdlICsgXCIgOiBcIiArIHJlc3BvbnNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCByZXNwb25zZS5sZW5ndGggLSAyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoJ2FzY2lpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuQ29kZSA9PT0gY29tbW9uXzEuTGVkZ2VyRXJyb3IuTm9FcnJvcnMgJiYgcmVzcG9uc2UubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZVJTID0gcmVzcG9uc2Uuc2xpY2UoMCwgY29tbW9uXzEuU0lHTEVOKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVSUzogc2lnbmF0dXJlUlMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybkNvZGU6IHJldHVybkNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogZXJyb3JNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuQ29kZTogcmV0dXJuQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGVycm9yTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSwgY29tbW9uXzEucHJvY2Vzc0Vycm9yUmVzcG9uc2UpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENhc3BlckFwcC5wcm90b3R5cGUuc2lnbiA9IGZ1bmN0aW9uIChwYXRoLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuc2lnbkdldENodW5rcyhwYXRoLCBtZXNzYWdlKS50aGVuKGZ1bmN0aW9uIChjaHVua3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5zaWduU2VuZENodW5rKDEsIGNodW5rcy5sZW5ndGgsIGNodW5rc1swXSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0LCBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuQ29kZTogcmVzcG9uc2UucmV0dXJuQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiByZXNwb25zZS5lcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZVJTOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoaSA8IGNodW5rcy5sZW5ndGgpKSByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNpZ25TZW5kQ2h1bmsoMSArIGksIGNodW5rcy5sZW5ndGgsIGNodW5rc1tpXSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmV0dXJuQ29kZSAhPT0gY29tbW9uXzEuTGVkZ2VyRXJyb3IuTm9FcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovLCByZXN1bHRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSwgY29tbW9uXzEucHJvY2Vzc0Vycm9yUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9LCBjb21tb25fMS5wcm9jZXNzRXJyb3JSZXNwb25zZSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENhc3BlckFwcDtcbn0oKSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IENhc3BlckFwcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbi8vIFN1cHBvcnQgZGVjb2RpbmcgVVJMLXNhZmUgYmFzZTY0IHN0cmluZ3MsIGFzIE5vZGUuanMgZG9lcy5cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0I1VSTF9hcHBsaWNhdGlvbnNcbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIGdldExlbnMgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyBUcmltIG9mZiBleHRyYSBieXRlcyBhZnRlciBwbGFjZWhvbGRlciBieXRlcyBhcmUgZm91bmRcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYmVhdGdhbW1pdC9iYXNlNjQtanMvaXNzdWVzLzQyXG4gIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKCc9JylcbiAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW5cblxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlblxuICAgID8gMFxuICAgIDogNCAtICh2YWxpZExlbiAlIDQpXG5cbiAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXVxufVxuXG4vLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiBfYnl0ZUxlbmd0aCAoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuXG4gIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpXG5cbiAgdmFyIGN1ckJ5dGUgPSAwXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICB2YXIgbGVuID0gcGxhY2VIb2xkZXJzTGVuID4gMFxuICAgID8gdmFsaWRMZW4gLSA0XG4gICAgOiB2YWxpZExlblxuXG4gIHZhciBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfFxuICAgICAgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID1cbiAgICAgICgodWludDhbaV0gPDwgMTYpICYgMHhGRjAwMDApICtcbiAgICAgICgodWludDhbaSArIDFdIDw8IDgpICYgMHhGRjAwKSArXG4gICAgICAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDJdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl0gK1xuICAgICAgJz09J1xuICAgIClcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAxMF0gK1xuICAgICAgbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdICtcbiAgICAgICc9J1xuICAgIClcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4ndXNlIHN0cmljdCdcblxuY29uc3QgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbmNvbnN0IGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbmNvbnN0IGN1c3RvbUluc3BlY3RTeW1ib2wgPVxuICAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sWydmb3InXSA9PT0gJ2Z1bmN0aW9uJykgLy8gZXNsaW50LWRpc2FibGUtbGluZSBkb3Qtbm90YXRpb25cbiAgICA/IFN5bWJvbFsnZm9yJ10oJ25vZGVqcy51dGlsLmluc3BlY3QuY3VzdG9tJykgLy8gZXNsaW50LWRpc2FibGUtbGluZSBkb3Qtbm90YXRpb25cbiAgICA6IG51bGxcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG5jb25zdCBLX01BWF9MRU5HVEggPSAweDdmZmZmZmZmXG5leHBvcnRzLmtNYXhMZW5ndGggPSBLX01BWF9MRU5HVEhcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgUHJpbnQgd2FybmluZyBhbmQgcmVjb21tZW5kIHVzaW5nIGBidWZmZXJgIHY0Lnggd2hpY2ggaGFzIGFuIE9iamVjdFxuICogICAgICAgICAgICAgICBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogV2UgcmVwb3J0IHRoYXQgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0eXBlZCBhcnJheXMgaWYgdGhlIGFyZSBub3Qgc3ViY2xhc3NhYmxlXG4gKiB1c2luZyBfX3Byb3RvX18uIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgXG4gKiAoU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzgpLiBJRSAxMCBsYWNrcyBzdXBwb3J0XG4gKiBmb3IgX19wcm90b19fIGFuZCBoYXMgYSBidWdneSB0eXBlZCBhcnJheSBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSB0eXBlZEFycmF5U3VwcG9ydCgpXG5cbmlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgY29uc29sZS5lcnJvcihcbiAgICAnVGhpcyBicm93c2VyIGxhY2tzIHR5cGVkIGFycmF5IChVaW50OEFycmF5KSBzdXBwb3J0IHdoaWNoIGlzIHJlcXVpcmVkIGJ5ICcgK1xuICAgICdgYnVmZmVyYCB2NS54LiBVc2UgYGJ1ZmZlcmAgdjQueCBpZiB5b3UgcmVxdWlyZSBvbGQgYnJvd3NlciBzdXBwb3J0LidcbiAgKVxufVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIC8vIENhbiB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZD9cbiAgdHJ5IHtcbiAgICBjb25zdCBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGNvbnN0IHByb3RvID0geyBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH0gfVxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihwcm90bywgVWludDhBcnJheS5wcm90b3R5cGUpXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGFyciwgcHJvdG8pXG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDJcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIucHJvdG90eXBlLCAncGFyZW50Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0aGlzKSkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIHJldHVybiB0aGlzLmJ1ZmZlclxuICB9XG59KVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLnByb3RvdHlwZSwgJ29mZnNldCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGhpcykpIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpcy5ieXRlT2Zmc2V0XG4gIH1cbn0pXG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAobGVuZ3RoKSB7XG4gIGlmIChsZW5ndGggPiBLX01BWF9MRU5HVEgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIFwiJyArIGxlbmd0aCArICdcIiBpcyBpbnZhbGlkIGZvciBvcHRpb24gXCJzaXplXCInKVxuICB9XG4gIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlXG4gIGNvbnN0IGJ1ZiA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGJ1ZiwgQnVmZmVyLnByb3RvdHlwZSlcbiAgcmV0dXJuIGJ1ZlxufVxuXG4vKipcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgaGF2ZSB0aGVpclxuICogcHJvdG90eXBlIGNoYW5nZWQgdG8gYEJ1ZmZlci5wcm90b3R5cGVgLiBGdXJ0aGVybW9yZSwgYEJ1ZmZlcmAgaXMgYSBzdWJjbGFzcyBvZlxuICogYFVpbnQ4QXJyYXlgLCBzbyB0aGUgcmV0dXJuZWQgaW5zdGFuY2VzIHdpbGwgaGF2ZSBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgbWV0aG9kc1xuICogYW5kIHRoZSBgVWludDhBcnJheWAgbWV0aG9kcy4gU3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXRcbiAqIHJldHVybnMgYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogVGhlIGBVaW50OEFycmF5YCBwcm90b3R5cGUgcmVtYWlucyB1bm1vZGlmaWVkLlxuICovXG5cbmZ1bmN0aW9uIEJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmdPck9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICdUaGUgXCJzdHJpbmdcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgc3RyaW5nLiBSZWNlaXZlZCB0eXBlIG51bWJlcidcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKGFyZylcbiAgfVxuICByZXR1cm4gZnJvbShhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbmZ1bmN0aW9uIGZyb20gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheVZpZXcodmFsdWUpXG4gIH1cblxuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgb25lIG9mIHR5cGUgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgJyArXG4gICAgICAnb3IgQXJyYXktbGlrZSBPYmplY3QuIFJlY2VpdmVkIHR5cGUgJyArICh0eXBlb2YgdmFsdWUpXG4gICAgKVxuICB9XG5cbiAgaWYgKGlzSW5zdGFuY2UodmFsdWUsIEFycmF5QnVmZmVyKSB8fFxuICAgICAgKHZhbHVlICYmIGlzSW5zdGFuY2UodmFsdWUuYnVmZmVyLCBBcnJheUJ1ZmZlcikpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIChpc0luc3RhbmNlKHZhbHVlLCBTaGFyZWRBcnJheUJ1ZmZlcikgfHxcbiAgICAgICh2YWx1ZSAmJiBpc0luc3RhbmNlKHZhbHVlLmJ1ZmZlciwgU2hhcmVkQXJyYXlCdWZmZXIpKSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwidmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBvZiB0eXBlIG51bWJlci4gUmVjZWl2ZWQgdHlwZSBudW1iZXInXG4gICAgKVxuICB9XG5cbiAgY29uc3QgdmFsdWVPZiA9IHZhbHVlLnZhbHVlT2YgJiYgdmFsdWUudmFsdWVPZigpXG4gIGlmICh2YWx1ZU9mICE9IG51bGwgJiYgdmFsdWVPZiAhPT0gdmFsdWUpIHtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20odmFsdWVPZiwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgY29uc3QgYiA9IGZyb21PYmplY3QodmFsdWUpXG4gIGlmIChiKSByZXR1cm4gYlxuXG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9QcmltaXRpdmUgIT0gbnVsbCAmJlxuICAgICAgdHlwZW9mIHZhbHVlW1N5bWJvbC50b1ByaW1pdGl2ZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20odmFsdWVbU3ltYm9sLnRvUHJpbWl0aXZlXSgnc3RyaW5nJyksIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksICcgK1xuICAgICdvciBBcnJheS1saWtlIE9iamVjdC4gUmVjZWl2ZWQgdHlwZSAnICsgKHR5cGVvZiB2YWx1ZSlcbiAgKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbi8vIE5vdGU6IENoYW5nZSBwcm90b3R5cGUgKmFmdGVyKiBCdWZmZXIuZnJvbSBpcyBkZWZpbmVkIHRvIHdvcmthcm91bmQgQ2hyb21lIGJ1Zzpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvMTQ4XG5PYmplY3Quc2V0UHJvdG90eXBlT2YoQnVmZmVyLnByb3RvdHlwZSwgVWludDhBcnJheS5wcm90b3R5cGUpXG5PYmplY3Quc2V0UHJvdG90eXBlT2YoQnVmZmVyLCBVaW50OEFycmF5KVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgXCInICsgc2l6ZSArICdcIiBpcyBpbnZhbGlkIGZvciBvcHRpb24gXCJzaXplXCInKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG9jIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIGlmIChzaXplIDw9IDApIHtcbiAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUpXG4gIH1cbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9ubHkgcGF5IGF0dGVudGlvbiB0byBlbmNvZGluZyBpZiBpdCdzIGEgc3RyaW5nLiBUaGlzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbGx5IHNlbmRpbmcgaW4gYSBudW1iZXIgdGhhdCB3b3VsZFxuICAgIC8vIGJlIGludGVycHJldGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcihzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIoc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIoc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAoc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHJldHVybiBjcmVhdGVCdWZmZXIoc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUoc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUoc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gIH1cblxuICBjb25zdCBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICBsZXQgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcblxuICBjb25zdCBhY3R1YWwgPSBidWYud3JpdGUoc3RyaW5nLCBlbmNvZGluZylcblxuICBpZiAoYWN0dWFsICE9PSBsZW5ndGgpIHtcbiAgICAvLyBXcml0aW5nIGEgaGV4IHN0cmluZywgZm9yIGV4YW1wbGUsIHRoYXQgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzIHdpbGxcbiAgICAvLyBjYXVzZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBpbnZhbGlkIGNoYXJhY3RlciB0byBiZSBpZ25vcmVkLiAoZS5nLlxuICAgIC8vICdhYnh4Y2QnIHdpbGwgYmUgdHJlYXRlZCBhcyAnYWInKVxuICAgIGJ1ZiA9IGJ1Zi5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UgKGFycmF5KSB7XG4gIGNvbnN0IGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICBjb25zdCBidWYgPSBjcmVhdGVCdWZmZXIobGVuZ3RoKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgYnVmW2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheVZpZXcgKGFycmF5Vmlldykge1xuICBpZiAoaXNJbnN0YW5jZShhcnJheVZpZXcsIFVpbnQ4QXJyYXkpKSB7XG4gICAgY29uc3QgY29weSA9IG5ldyBVaW50OEFycmF5KGFycmF5VmlldylcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKGNvcHkuYnVmZmVyLCBjb3B5LmJ5dGVPZmZzZXQsIGNvcHkuYnl0ZUxlbmd0aClcbiAgfVxuICByZXR1cm4gZnJvbUFycmF5TGlrZShhcnJheVZpZXcpXG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJvZmZzZXRcIiBpcyBvdXRzaWRlIG9mIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcImxlbmd0aFwiIGlzIG91dHNpZGUgb2YgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBsZXQgYnVmXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YoYnVmLCBCdWZmZXIucHJvdG90eXBlKVxuXG4gIHJldHVybiBidWZcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAob2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIGNvbnN0IGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgY29uc3QgYnVmID0gY3JlYXRlQnVmZmVyKGxlbilcblxuICAgIGlmIChidWYubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gYnVmXG4gICAgfVxuXG4gICAgb2JqLmNvcHkoYnVmLCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIGJ1ZlxuICB9XG5cbiAgaWYgKG9iai5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgbnVtYmVySXNOYU4ob2JqLmxlbmd0aCkpIHtcbiAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIoMClcbiAgICB9XG4gICAgcmV0dXJuIGZyb21BcnJheUxpa2Uob2JqKVxuICB9XG5cbiAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBBcnJheS5pc0FycmF5KG9iai5kYXRhKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKG9iai5kYXRhKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBLX01BWF9MRU5HVEhgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIEtfTUFYX0xFTkdUSC50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuIGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlciA9PT0gdHJ1ZSAmJlxuICAgIGIgIT09IEJ1ZmZlci5wcm90b3R5cGUgLy8gc28gQnVmZmVyLmlzQnVmZmVyKEJ1ZmZlci5wcm90b3R5cGUpIHdpbGwgYmUgZmFsc2Vcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmIChpc0luc3RhbmNlKGEsIFVpbnQ4QXJyYXkpKSBhID0gQnVmZmVyLmZyb20oYSwgYS5vZmZzZXQsIGEuYnl0ZUxlbmd0aClcbiAgaWYgKGlzSW5zdGFuY2UoYiwgVWludDhBcnJheSkpIGIgPSBCdWZmZXIuZnJvbShiLCBiLm9mZnNldCwgYi5ieXRlTGVuZ3RoKVxuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJidWYxXCIsIFwiYnVmMlwiIGFyZ3VtZW50cyBtdXN0IGJlIG9uZSBvZiB0eXBlIEJ1ZmZlciBvciBVaW50OEFycmF5J1xuICAgIClcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIGxldCB4ID0gYS5sZW5ndGhcbiAgbGV0IHkgPSBiLmxlbmd0aFxuXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgbGV0IGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICBjb25zdCBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICBsZXQgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIGxldCBidWYgPSBsaXN0W2ldXG4gICAgaWYgKGlzSW5zdGFuY2UoYnVmLCBVaW50OEFycmF5KSkge1xuICAgICAgaWYgKHBvcyArIGJ1Zi5sZW5ndGggPiBidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIGJ1ZiA9IEJ1ZmZlci5mcm9tKGJ1ZilcbiAgICAgICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgICAgICBidWZmZXIsXG4gICAgICAgICAgYnVmLFxuICAgICAgICAgIHBvc1xuICAgICAgICApXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIH1cbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoc3RyaW5nKSB8fCBpc0luc3RhbmNlKHN0cmluZywgQXJyYXlCdWZmZXIpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5ieXRlTGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJzdHJpbmdcIiBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIHN0cmluZywgQnVmZmVyLCBvciBBcnJheUJ1ZmZlci4gJyArXG4gICAgICAnUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIHN0cmluZ1xuICAgIClcbiAgfVxuXG4gIGNvbnN0IGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgY29uc3QgbXVzdE1hdGNoID0gKGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSA9PT0gdHJ1ZSlcbiAgaWYgKCFtdXN0TWF0Y2ggJiYgbGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICBsZXQgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB7XG4gICAgICAgICAgcmV0dXJuIG11c3RNYXRjaCA/IC0xIDogdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgfVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgbGV0IGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJjaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoaXMgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCAoYW5kIHRoZSBgaXMtYnVmZmVyYCBucG0gcGFja2FnZSlcbi8vIHRvIGRldGVjdCBhIEJ1ZmZlciBpbnN0YW5jZS4gSXQncyBub3QgcG9zc2libGUgdG8gdXNlIGBpbnN0YW5jZW9mIEJ1ZmZlcmBcbi8vIHJlbGlhYmx5IGluIGEgYnJvd3NlcmlmeSBjb250ZXh0IGJlY2F1c2UgdGhlcmUgY291bGQgYmUgbXVsdGlwbGUgZGlmZmVyZW50XG4vLyBjb3BpZXMgb2YgdGhlICdidWZmZXInIHBhY2thZ2UgaW4gdXNlLiBUaGlzIG1ldGhvZCB3b3JrcyBldmVuIGZvciBCdWZmZXJcbi8vIGluc3RhbmNlcyB0aGF0IHdlcmUgY3JlYXRlZCBmcm9tIGFub3RoZXIgY29weSBvZiB0aGUgYGJ1ZmZlcmAgcGFja2FnZS5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzE1NFxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgY29uc3QgaSA9IGJbbl1cbiAgYltuXSA9IGJbbV1cbiAgYlttXSA9IGlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMTYgPSBmdW5jdGlvbiBzd2FwMTYgKCkge1xuICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgOCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0cycpXG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gOCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDcpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDYpXG4gICAgc3dhcCh0aGlzLCBpICsgMiwgaSArIDUpXG4gICAgc3dhcCh0aGlzLCBpICsgMywgaSArIDQpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgY29uc3QgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9Mb2NhbGVTdHJpbmcgPSBCdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nXG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgbGV0IHN0ciA9ICcnXG4gIGNvbnN0IG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5yZXBsYWNlKC8oLnsyfSkvZywgJyQxICcpLnRyaW0oKVxuICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5pZiAoY3VzdG9tSW5zcGVjdFN5bWJvbCkge1xuICBCdWZmZXIucHJvdG90eXBlW2N1c3RvbUluc3BlY3RTeW1ib2xdID0gQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmIChpc0luc3RhbmNlKHRhcmdldCwgVWludDhBcnJheSkpIHtcbiAgICB0YXJnZXQgPSBCdWZmZXIuZnJvbSh0YXJnZXQsIHRhcmdldC5vZmZzZXQsIHRhcmdldC5ieXRlTGVuZ3RoKVxuICB9XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcInRhcmdldFwiIGFyZ3VtZW50IG11c3QgYmUgb25lIG9mIHR5cGUgQnVmZmVyIG9yIFVpbnQ4QXJyYXkuICcgK1xuICAgICAgJ1JlY2VpdmVkIHR5cGUgJyArICh0eXBlb2YgdGFyZ2V0KVxuICAgIClcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIGxldCB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICBsZXQgeSA9IGVuZCAtIHN0YXJ0XG4gIGNvbnN0IGxlbiA9IE1hdGgubWluKHgsIHkpXG5cbiAgY29uc3QgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgY29uc3QgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKG51bWJlcklzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgW3ZhbF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIGxldCBpbmRleFNpemUgPSAxXG4gIGxldCBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIGxldCB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIGxldCBpXG4gIGlmIChkaXIpIHtcbiAgICBsZXQgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBsZXQgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIGNvbnN0IHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBsZXQgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKG51bWJlcklzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggPj4+IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICBjb25zdCByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIGxldCBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgY29uc3QgcmVzID0gW11cblxuICBsZXQgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgY29uc3QgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgbGV0IGNvZGVQb2ludCA9IG51bGxcbiAgICBsZXQgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKVxuICAgICAgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKVxuICAgICAgICAgID8gM1xuICAgICAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpXG4gICAgICAgICAgICAgID8gMlxuICAgICAgICAgICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIGxldCBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbmNvbnN0IE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICBjb25zdCBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIGxldCByZXMgPSAnJ1xuICBsZXQgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgbGV0IHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGxldCByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGNvbnN0IGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICBsZXQgb3V0ID0gJydcbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gaGV4U2xpY2VMb29rdXBUYWJsZVtidWZbaV1dXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBjb25zdCBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICBsZXQgcmVzID0gJydcbiAgLy8gSWYgYnl0ZXMubGVuZ3RoIGlzIG9kZCwgdGhlIGxhc3QgOCBiaXRzIG11c3QgYmUgaWdub3JlZCAoc2FtZSBhcyBub2RlLmpzKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aCAtIDE7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgKGJ5dGVzW2kgKyAxXSAqIDI1NikpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICBjb25zdCBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihuZXdCdWYsIEJ1ZmZlci5wcm90b3R5cGUpXG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludExFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0XVxuICBsZXQgbXVsID0gMVxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50QkUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIGxldCBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDggPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDE2TEUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MTZCRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQzMkxFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDMyQkUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnVUludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ1VJbnQ2NExFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgbG8gPSBmaXJzdCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDI0XG5cbiAgY29uc3QgaGkgPSB0aGlzWysrb2Zmc2V0XSArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgbGFzdCAqIDIgKiogMjRcblxuICByZXR1cm4gQmlnSW50KGxvKSArIChCaWdJbnQoaGkpIDw8IEJpZ0ludCgzMikpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdVSW50NjRCRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiByZWFkQmlnVUludDY0QkUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCBoaSA9IGZpcnN0ICogMiAqKiAyNCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF1cblxuICBjb25zdCBsbyA9IHRoaXNbKytvZmZzZXRdICogMiAqKiAyNCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgbGFzdFxuXG4gIHJldHVybiAoQmlnSW50KGhpKSA8PCBCaWdJbnQoMzIpKSArIEJpZ0ludChsbylcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldF1cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICBsZXQgaSA9IGJ5dGVMZW5ndGhcbiAgbGV0IG11bCA9IDFcbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIGNvbnN0IHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDNdIDw8IDI0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gcmVhZEludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiByZWFkQmlnSW50NjRMRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgNF0gK1xuICAgIHRoaXNbb2Zmc2V0ICsgNV0gKiAyICoqIDggK1xuICAgIHRoaXNbb2Zmc2V0ICsgNl0gKiAyICoqIDE2ICtcbiAgICAobGFzdCA8PCAyNCkgLy8gT3ZlcmZsb3dcblxuICByZXR1cm4gKEJpZ0ludCh2YWwpIDw8IEJpZ0ludCgzMikpICtcbiAgICBCaWdJbnQoZmlyc3QgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAyNClcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ0ludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ0ludDY0QkUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCB2YWwgPSAoZmlyc3QgPDwgMjQpICsgLy8gT3ZlcmZsb3dcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XVxuXG4gIHJldHVybiAoQmlnSW50KHZhbCkgPDwgQmlnSW50KDMyKSkgK1xuICAgIEJpZ0ludCh0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIGxhc3QpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnRMRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY29uc3QgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICBsZXQgbXVsID0gMVxuICBsZXQgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludEJFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjb25zdCBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIGxldCBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgbGV0IG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50OCA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQxNkxFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MTZCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDMyTEUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQzMkJFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIHdydEJpZ1VJbnQ2NExFIChidWYsIHZhbHVlLCBvZmZzZXQsIG1pbiwgbWF4KSB7XG4gIGNoZWNrSW50QkkodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgNylcblxuICBsZXQgbG8gPSBOdW1iZXIodmFsdWUgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsZXQgaGkgPSBOdW1iZXIodmFsdWUgPj4gQmlnSW50KDMyKSAmIEJpZ0ludCgweGZmZmZmZmZmKSlcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIHJldHVybiBvZmZzZXRcbn1cblxuZnVuY3Rpb24gd3J0QmlnVUludDY0QkUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbWluLCBtYXgpIHtcbiAgY2hlY2tJbnRCSSh2YWx1ZSwgbWluLCBtYXgsIGJ1Ziwgb2Zmc2V0LCA3KVxuXG4gIGxldCBsbyA9IE51bWJlcih2YWx1ZSAmIEJpZ0ludCgweGZmZmZmZmZmKSlcbiAgYnVmW29mZnNldCArIDddID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQgKyA2XSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0ICsgNV0gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCArIDRdID0gbG9cbiAgbGV0IGhpID0gTnVtYmVyKHZhbHVlID4+IEJpZ0ludCgzMikgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQgKyAzXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0ICsgMl0gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCArIDFdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXRdID0gaGlcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ1VJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnVUludDY0TEUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRMRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBCaWdJbnQoMCksIEJpZ0ludCgnMHhmZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlQmlnVUludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdVSW50NjRCRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NEJFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIEJpZ0ludCgwKSwgQmlnSW50KCcweGZmZmZmZmZmZmZmZmZmZmYnKSlcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY29uc3QgbGltaXQgPSBNYXRoLnBvdygyLCAoOCAqIGJ5dGVMZW5ndGgpIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgbGV0IGkgPSAwXG4gIGxldCBtdWwgPSAxXG4gIGxldCBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY29uc3QgbGltaXQgPSBNYXRoLnBvdygyLCAoOCAqIGJ5dGVMZW5ndGgpIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgbGV0IGkgPSBieXRlTGVuZ3RoIC0gMVxuICBsZXQgbXVsID0gMVxuICBsZXQgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ0ludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdJbnQ2NExFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0TEUodGhpcywgdmFsdWUsIG9mZnNldCwgLUJpZ0ludCgnMHg4MDAwMDAwMDAwMDAwMDAwJyksIEJpZ0ludCgnMHg3ZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlQmlnSW50NjRCRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ0ludDY0QkUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRCRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAtQmlnSW50KCcweDgwMDAwMDAwMDAwMDAwMDAnKSwgQmlnSW50KCcweDdmZmZmZmZmZmZmZmZmZmYnKSlcbn0pXG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IHNob3VsZCBiZSBhIEJ1ZmZlcicpXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICBjb25zdCBsZW4gPSBlbmQgLSBzdGFydFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmNvcHlXaXRoaW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBVc2UgYnVpbHQtaW4gd2hlbiBhdmFpbGFibGUsIG1pc3NpbmcgZnJvbSBJRTExXG4gICAgdGhpcy5jb3B5V2l0aGluKHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbnN0IGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKChlbmNvZGluZyA9PT0gJ3V0ZjgnICYmIGNvZGUgPCAxMjgpIHx8XG4gICAgICAgICAgZW5jb2RpbmcgPT09ICdsYXRpbjEnKSB7XG4gICAgICAgIC8vIEZhc3QgcGF0aDogSWYgYHZhbGAgZml0cyBpbnRvIGEgc2luZ2xlIGJ5dGUsIHVzZSB0aGF0IG51bWVyaWMgdmFsdWUuXG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnYm9vbGVhbicpIHtcbiAgICB2YWwgPSBOdW1iZXIodmFsKVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIGxldCBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgYnl0ZXMgPSBCdWZmZXIuaXNCdWZmZXIodmFsKVxuICAgICAgPyB2YWxcbiAgICAgIDogQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgICBjb25zdCBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgdmFsdWUgXCInICsgdmFsICtcbiAgICAgICAgJ1wiIGlzIGludmFsaWQgZm9yIGFyZ3VtZW50IFwidmFsdWVcIicpXG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIENVU1RPTSBFUlJPUlNcbi8vID09PT09PT09PT09PT1cblxuLy8gU2ltcGxpZmllZCB2ZXJzaW9ucyBmcm9tIE5vZGUsIGNoYW5nZWQgZm9yIEJ1ZmZlci1vbmx5IHVzYWdlXG5jb25zdCBlcnJvcnMgPSB7fVxuZnVuY3Rpb24gRSAoc3ltLCBnZXRNZXNzYWdlLCBCYXNlKSB7XG4gIGVycm9yc1tzeW1dID0gY2xhc3MgTm9kZUVycm9yIGV4dGVuZHMgQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgc3VwZXIoKVxuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ21lc3NhZ2UnLCB7XG4gICAgICAgIHZhbHVlOiBnZXRNZXNzYWdlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH0pXG5cbiAgICAgIC8vIEFkZCB0aGUgZXJyb3IgY29kZSB0byB0aGUgbmFtZSB0byBpbmNsdWRlIGl0IGluIHRoZSBzdGFjayB0cmFjZS5cbiAgICAgIHRoaXMubmFtZSA9IGAke3RoaXMubmFtZX0gWyR7c3ltfV1gXG4gICAgICAvLyBBY2Nlc3MgdGhlIHN0YWNrIHRvIGdlbmVyYXRlIHRoZSBlcnJvciBtZXNzYWdlIGluY2x1ZGluZyB0aGUgZXJyb3IgY29kZVxuICAgICAgLy8gZnJvbSB0aGUgbmFtZS5cbiAgICAgIHRoaXMuc3RhY2sgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbiAgICAgIC8vIFJlc2V0IHRoZSBuYW1lIHRvIHRoZSBhY3R1YWwgbmFtZS5cbiAgICAgIGRlbGV0ZSB0aGlzLm5hbWVcbiAgICB9XG5cbiAgICBnZXQgY29kZSAoKSB7XG4gICAgICByZXR1cm4gc3ltXG4gICAgfVxuXG4gICAgc2V0IGNvZGUgKHZhbHVlKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvZGUnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRvU3RyaW5nICgpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IFske3N5bX1dOiAke3RoaXMubWVzc2FnZX1gXG4gICAgfVxuICB9XG59XG5cbkUoJ0VSUl9CVUZGRVJfT1VUX09GX0JPVU5EUycsXG4gIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiBgJHtuYW1lfSBpcyBvdXRzaWRlIG9mIGJ1ZmZlciBib3VuZHNgXG4gICAgfVxuXG4gICAgcmV0dXJuICdBdHRlbXB0IHRvIGFjY2VzcyBtZW1vcnkgb3V0c2lkZSBidWZmZXIgYm91bmRzJ1xuICB9LCBSYW5nZUVycm9yKVxuRSgnRVJSX0lOVkFMSURfQVJHX1RZUEUnLFxuICBmdW5jdGlvbiAobmFtZSwgYWN0dWFsKSB7XG4gICAgcmV0dXJuIGBUaGUgXCIke25hbWV9XCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIG51bWJlci4gUmVjZWl2ZWQgdHlwZSAke3R5cGVvZiBhY3R1YWx9YFxuICB9LCBUeXBlRXJyb3IpXG5FKCdFUlJfT1VUX09GX1JBTkdFJyxcbiAgZnVuY3Rpb24gKHN0ciwgcmFuZ2UsIGlucHV0KSB7XG4gICAgbGV0IG1zZyA9IGBUaGUgdmFsdWUgb2YgXCIke3N0cn1cIiBpcyBvdXQgb2YgcmFuZ2UuYFxuICAgIGxldCByZWNlaXZlZCA9IGlucHV0XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIoaW5wdXQpICYmIE1hdGguYWJzKGlucHV0KSA+IDIgKiogMzIpIHtcbiAgICAgIHJlY2VpdmVkID0gYWRkTnVtZXJpY2FsU2VwYXJhdG9yKFN0cmluZyhpbnB1dCkpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaW5wdXQgPT09ICdiaWdpbnQnKSB7XG4gICAgICByZWNlaXZlZCA9IFN0cmluZyhpbnB1dClcbiAgICAgIGlmIChpbnB1dCA+IEJpZ0ludCgyKSAqKiBCaWdJbnQoMzIpIHx8IGlucHV0IDwgLShCaWdJbnQoMikgKiogQmlnSW50KDMyKSkpIHtcbiAgICAgICAgcmVjZWl2ZWQgPSBhZGROdW1lcmljYWxTZXBhcmF0b3IocmVjZWl2ZWQpXG4gICAgICB9XG4gICAgICByZWNlaXZlZCArPSAnbidcbiAgICB9XG4gICAgbXNnICs9IGAgSXQgbXVzdCBiZSAke3JhbmdlfS4gUmVjZWl2ZWQgJHtyZWNlaXZlZH1gXG4gICAgcmV0dXJuIG1zZ1xuICB9LCBSYW5nZUVycm9yKVxuXG5mdW5jdGlvbiBhZGROdW1lcmljYWxTZXBhcmF0b3IgKHZhbCkge1xuICBsZXQgcmVzID0gJydcbiAgbGV0IGkgPSB2YWwubGVuZ3RoXG4gIGNvbnN0IHN0YXJ0ID0gdmFsWzBdID09PSAnLScgPyAxIDogMFxuICBmb3IgKDsgaSA+PSBzdGFydCArIDQ7IGkgLT0gMykge1xuICAgIHJlcyA9IGBfJHt2YWwuc2xpY2UoaSAtIDMsIGkpfSR7cmVzfWBcbiAgfVxuICByZXR1cm4gYCR7dmFsLnNsaWNlKDAsIGkpfSR7cmVzfWBcbn1cblxuLy8gQ0hFQ0sgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gY2hlY2tCb3VuZHMgKGJ1Ziwgb2Zmc2V0LCBieXRlTGVuZ3RoKSB7XG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGlmIChidWZbb2Zmc2V0XSA9PT0gdW5kZWZpbmVkIHx8IGJ1ZltvZmZzZXQgKyBieXRlTGVuZ3RoXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCBidWYubGVuZ3RoIC0gKGJ5dGVMZW5ndGggKyAxKSlcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja0ludEJJICh2YWx1ZSwgbWluLCBtYXgsIGJ1Ziwgb2Zmc2V0LCBieXRlTGVuZ3RoKSB7XG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikge1xuICAgIGNvbnN0IG4gPSB0eXBlb2YgbWluID09PSAnYmlnaW50JyA/ICduJyA6ICcnXG4gICAgbGV0IHJhbmdlXG4gICAgaWYgKGJ5dGVMZW5ndGggPiAzKSB7XG4gICAgICBpZiAobWluID09PSAwIHx8IG1pbiA9PT0gQmlnSW50KDApKSB7XG4gICAgICAgIHJhbmdlID0gYD49IDAke259IGFuZCA8IDIke259ICoqICR7KGJ5dGVMZW5ndGggKyAxKSAqIDh9JHtufWBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhbmdlID0gYD49IC0oMiR7bn0gKiogJHsoYnl0ZUxlbmd0aCArIDEpICogOCAtIDF9JHtufSkgYW5kIDwgMiAqKiBgICtcbiAgICAgICAgICAgICAgICBgJHsoYnl0ZUxlbmd0aCArIDEpICogOCAtIDF9JHtufWBcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZ2UgPSBgPj0gJHttaW59JHtufSBhbmQgPD0gJHttYXh9JHtufWBcbiAgICB9XG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfT1VUX09GX1JBTkdFKCd2YWx1ZScsIHJhbmdlLCB2YWx1ZSlcbiAgfVxuICBjaGVja0JvdW5kcyhidWYsIG9mZnNldCwgYnl0ZUxlbmd0aClcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVOdW1iZXIgKHZhbHVlLCBuYW1lKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfSU5WQUxJRF9BUkdfVFlQRShuYW1lLCAnbnVtYmVyJywgdmFsdWUpXG4gIH1cbn1cblxuZnVuY3Rpb24gYm91bmRzRXJyb3IgKHZhbHVlLCBsZW5ndGgsIHR5cGUpIHtcbiAgaWYgKE1hdGguZmxvb3IodmFsdWUpICE9PSB2YWx1ZSkge1xuICAgIHZhbGlkYXRlTnVtYmVyKHZhbHVlLCB0eXBlKVxuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX09VVF9PRl9SQU5HRSh0eXBlIHx8ICdvZmZzZXQnLCAnYW4gaW50ZWdlcicsIHZhbHVlKVxuICB9XG5cbiAgaWYgKGxlbmd0aCA8IDApIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9CVUZGRVJfT1VUX09GX0JPVU5EUygpXG4gIH1cblxuICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9PVVRfT0ZfUkFOR0UodHlwZSB8fCAnb2Zmc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA+PSAke3R5cGUgPyAxIDogMH0gYW5kIDw9ICR7bGVuZ3RofWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSlcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG5jb25zdCBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXisvMC05QS1aYS16LV9dL2dcblxuZnVuY3Rpb24gYmFzZTY0Y2xlYW4gKHN0cikge1xuICAvLyBOb2RlIHRha2VzIGVxdWFsIHNpZ25zIGFzIGVuZCBvZiB0aGUgQmFzZTY0IGVuY29kaW5nXG4gIHN0ciA9IHN0ci5zcGxpdCgnPScpWzBdXG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHIudHJpbSgpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgbGV0IGNvZGVQb2ludFxuICBjb25zdCBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIGxldCBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICBjb25zdCBieXRlcyA9IFtdXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIGNvbnN0IGJ5dGVBcnJheSA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgbGV0IGMsIGhpLCBsb1xuICBjb25zdCBieXRlQXJyYXkgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGxldCBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG4vLyBBcnJheUJ1ZmZlciBvciBVaW50OEFycmF5IG9iamVjdHMgZnJvbSBvdGhlciBjb250ZXh0cyAoaS5lLiBpZnJhbWVzKSBkbyBub3QgcGFzc1xuLy8gdGhlIGBpbnN0YW5jZW9mYCBjaGVjayBidXQgdGhleSBzaG91bGQgYmUgdHJlYXRlZCBhcyBvZiB0aGF0IHR5cGUuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8xNjZcbmZ1bmN0aW9uIGlzSW5zdGFuY2UgKG9iaiwgdHlwZSkge1xuICByZXR1cm4gb2JqIGluc3RhbmNlb2YgdHlwZSB8fFxuICAgIChvYmogIT0gbnVsbCAmJiBvYmouY29uc3RydWN0b3IgIT0gbnVsbCAmJiBvYmouY29uc3RydWN0b3IubmFtZSAhPSBudWxsICYmXG4gICAgICBvYmouY29uc3RydWN0b3IubmFtZSA9PT0gdHlwZS5uYW1lKVxufVxuZnVuY3Rpb24gbnVtYmVySXNOYU4gKG9iaikge1xuICAvLyBGb3IgSUUxMSBzdXBwb3J0XG4gIHJldHVybiBvYmogIT09IG9iaiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuXG4vLyBDcmVhdGUgbG9va3VwIHRhYmxlIGZvciBgdG9TdHJpbmcoJ2hleCcpYFxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9pc3N1ZXMvMjE5XG5jb25zdCBoZXhTbGljZUxvb2t1cFRhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OWFiY2RlZidcbiAgY29uc3QgdGFibGUgPSBuZXcgQXJyYXkoMjU2KVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICBjb25zdCBpMTYgPSBpICogMTZcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDE2OyArK2opIHtcbiAgICAgIHRhYmxlW2kxNiArIGpdID0gYWxwaGFiZXRbaV0gKyBhbHBoYWJldFtqXVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGFibGVcbn0pKClcblxuLy8gUmV0dXJuIG5vdCBmdW5jdGlvbiB3aXRoIEVycm9yIGlmIEJpZ0ludCBub3Qgc3VwcG9ydGVkXG5mdW5jdGlvbiBkZWZpbmVCaWdJbnRNZXRob2QgKGZuKSB7XG4gIHJldHVybiB0eXBlb2YgQmlnSW50ID09PSAndW5kZWZpbmVkJyA/IEJ1ZmZlckJpZ0ludE5vdERlZmluZWQgOiBmblxufVxuXG5mdW5jdGlvbiBCdWZmZXJCaWdJbnROb3REZWZpbmVkICgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdCaWdJbnQgbm90IHN1cHBvcnRlZCcpXG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCByZXNvbHZlcik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgcmVzb2x2ZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXJyb3JMaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGhhbmRsZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCAnZXJyb3InLCBoYW5kbGVyLCBmbGFncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIGxpc3RlbmVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgZW1pdHRlci5vbmNlKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdHRlci5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBFdmVudFRhcmdldCBkb2VzIG5vdCBoYXZlIGBlcnJvcmAgZXZlbnQgc2VtYW50aWNzIGxpa2UgTm9kZVxuICAgIC8vIEV2ZW50RW1pdHRlcnMsIHdlIGRvIG5vdCBsaXN0ZW4gZm9yIGBlcnJvcmAgZXZlbnRzIGhlcmUuXG4gICAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lcihhcmcpIHtcbiAgICAgIC8vIElFIGRvZXMgbm90IGhhdmUgYnVpbHRpbiBgeyBvbmNlOiB0cnVlIH1gIHN1cHBvcnQgc28gd2VcbiAgICAgIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkuXG4gICAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgd3JhcExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyKGFyZyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBlbWl0dGVyKTtcbiAgfVxufVxuIiwiLyohIGllZWU3NTQuIEJTRC0zLUNsYXVzZSBMaWNlbnNlLiBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmcvb3BlbnNvdXJjZT4gKi9cbmV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gKGUgKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gKG0gKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAoKHZhbHVlICogYykgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vLyBBIGxpbmtlZCBsaXN0IHRvIGtlZXAgdHJhY2sgb2YgcmVjZW50bHktdXNlZC1uZXNzXG5jb25zdCBZYWxsaXN0ID0gcmVxdWlyZSgneWFsbGlzdCcpXG5cbmNvbnN0IE1BWCA9IFN5bWJvbCgnbWF4JylcbmNvbnN0IExFTkdUSCA9IFN5bWJvbCgnbGVuZ3RoJylcbmNvbnN0IExFTkdUSF9DQUxDVUxBVE9SID0gU3ltYm9sKCdsZW5ndGhDYWxjdWxhdG9yJylcbmNvbnN0IEFMTE9XX1NUQUxFID0gU3ltYm9sKCdhbGxvd1N0YWxlJylcbmNvbnN0IE1BWF9BR0UgPSBTeW1ib2woJ21heEFnZScpXG5jb25zdCBESVNQT1NFID0gU3ltYm9sKCdkaXNwb3NlJylcbmNvbnN0IE5PX0RJU1BPU0VfT05fU0VUID0gU3ltYm9sKCdub0Rpc3Bvc2VPblNldCcpXG5jb25zdCBMUlVfTElTVCA9IFN5bWJvbCgnbHJ1TGlzdCcpXG5jb25zdCBDQUNIRSA9IFN5bWJvbCgnY2FjaGUnKVxuY29uc3QgVVBEQVRFX0FHRV9PTl9HRVQgPSBTeW1ib2woJ3VwZGF0ZUFnZU9uR2V0JylcblxuY29uc3QgbmFpdmVMZW5ndGggPSAoKSA9PiAxXG5cbi8vIGxydUxpc3QgaXMgYSB5YWxsaXN0IHdoZXJlIHRoZSBoZWFkIGlzIHRoZSB5b3VuZ2VzdFxuLy8gaXRlbSwgYW5kIHRoZSB0YWlsIGlzIHRoZSBvbGRlc3QuICB0aGUgbGlzdCBjb250YWlucyB0aGUgSGl0XG4vLyBvYmplY3RzIGFzIHRoZSBlbnRyaWVzLlxuLy8gRWFjaCBIaXQgb2JqZWN0IGhhcyBhIHJlZmVyZW5jZSB0byBpdHMgWWFsbGlzdC5Ob2RlLiAgVGhpc1xuLy8gbmV2ZXIgY2hhbmdlcy5cbi8vXG4vLyBjYWNoZSBpcyBhIE1hcCAob3IgUHNldWRvTWFwKSB0aGF0IG1hdGNoZXMgdGhlIGtleXMgdG9cbi8vIHRoZSBZYWxsaXN0Lk5vZGUgb2JqZWN0LlxuY2xhc3MgTFJVQ2FjaGUge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ251bWJlcicpXG4gICAgICBvcHRpb25zID0geyBtYXg6IG9wdGlvbnMgfVxuXG4gICAgaWYgKCFvcHRpb25zKVxuICAgICAgb3B0aW9ucyA9IHt9XG5cbiAgICBpZiAob3B0aW9ucy5tYXggJiYgKHR5cGVvZiBvcHRpb25zLm1heCAhPT0gJ251bWJlcicgfHwgb3B0aW9ucy5tYXggPCAwKSlcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ21heCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlcicpXG4gICAgLy8gS2luZCBvZiB3ZWlyZCB0byBoYXZlIGEgZGVmYXVsdCBtYXggb2YgSW5maW5pdHksIGJ1dCBvaCB3ZWxsLlxuICAgIGNvbnN0IG1heCA9IHRoaXNbTUFYXSA9IG9wdGlvbnMubWF4IHx8IEluZmluaXR5XG5cbiAgICBjb25zdCBsYyA9IG9wdGlvbnMubGVuZ3RoIHx8IG5haXZlTGVuZ3RoXG4gICAgdGhpc1tMRU5HVEhfQ0FMQ1VMQVRPUl0gPSAodHlwZW9mIGxjICE9PSAnZnVuY3Rpb24nKSA/IG5haXZlTGVuZ3RoIDogbGNcbiAgICB0aGlzW0FMTE9XX1NUQUxFXSA9IG9wdGlvbnMuc3RhbGUgfHwgZmFsc2VcbiAgICBpZiAob3B0aW9ucy5tYXhBZ2UgJiYgdHlwZW9mIG9wdGlvbnMubWF4QWdlICE9PSAnbnVtYmVyJylcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ21heEFnZSBtdXN0IGJlIGEgbnVtYmVyJylcbiAgICB0aGlzW01BWF9BR0VdID0gb3B0aW9ucy5tYXhBZ2UgfHwgMFxuICAgIHRoaXNbRElTUE9TRV0gPSBvcHRpb25zLmRpc3Bvc2VcbiAgICB0aGlzW05PX0RJU1BPU0VfT05fU0VUXSA9IG9wdGlvbnMubm9EaXNwb3NlT25TZXQgfHwgZmFsc2VcbiAgICB0aGlzW1VQREFURV9BR0VfT05fR0VUXSA9IG9wdGlvbnMudXBkYXRlQWdlT25HZXQgfHwgZmFsc2VcbiAgICB0aGlzLnJlc2V0KClcbiAgfVxuXG4gIC8vIHJlc2l6ZSB0aGUgY2FjaGUgd2hlbiB0aGUgbWF4IGNoYW5nZXMuXG4gIHNldCBtYXggKG1MKSB7XG4gICAgaWYgKHR5cGVvZiBtTCAhPT0gJ251bWJlcicgfHwgbUwgPCAwKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbWF4IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyJylcblxuICAgIHRoaXNbTUFYXSA9IG1MIHx8IEluZmluaXR5XG4gICAgdHJpbSh0aGlzKVxuICB9XG4gIGdldCBtYXggKCkge1xuICAgIHJldHVybiB0aGlzW01BWF1cbiAgfVxuXG4gIHNldCBhbGxvd1N0YWxlIChhbGxvd1N0YWxlKSB7XG4gICAgdGhpc1tBTExPV19TVEFMRV0gPSAhIWFsbG93U3RhbGVcbiAgfVxuICBnZXQgYWxsb3dTdGFsZSAoKSB7XG4gICAgcmV0dXJuIHRoaXNbQUxMT1dfU1RBTEVdXG4gIH1cblxuICBzZXQgbWF4QWdlIChtQSkge1xuICAgIGlmICh0eXBlb2YgbUEgIT09ICdudW1iZXInKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbWF4QWdlIG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyJylcblxuICAgIHRoaXNbTUFYX0FHRV0gPSBtQVxuICAgIHRyaW0odGhpcylcbiAgfVxuICBnZXQgbWF4QWdlICgpIHtcbiAgICByZXR1cm4gdGhpc1tNQVhfQUdFXVxuICB9XG5cbiAgLy8gcmVzaXplIHRoZSBjYWNoZSB3aGVuIHRoZSBsZW5ndGhDYWxjdWxhdG9yIGNoYW5nZXMuXG4gIHNldCBsZW5ndGhDYWxjdWxhdG9yIChsQykge1xuICAgIGlmICh0eXBlb2YgbEMgIT09ICdmdW5jdGlvbicpXG4gICAgICBsQyA9IG5haXZlTGVuZ3RoXG5cbiAgICBpZiAobEMgIT09IHRoaXNbTEVOR1RIX0NBTENVTEFUT1JdKSB7XG4gICAgICB0aGlzW0xFTkdUSF9DQUxDVUxBVE9SXSA9IGxDXG4gICAgICB0aGlzW0xFTkdUSF0gPSAwXG4gICAgICB0aGlzW0xSVV9MSVNUXS5mb3JFYWNoKGhpdCA9PiB7XG4gICAgICAgIGhpdC5sZW5ndGggPSB0aGlzW0xFTkdUSF9DQUxDVUxBVE9SXShoaXQudmFsdWUsIGhpdC5rZXkpXG4gICAgICAgIHRoaXNbTEVOR1RIXSArPSBoaXQubGVuZ3RoXG4gICAgICB9KVxuICAgIH1cbiAgICB0cmltKHRoaXMpXG4gIH1cbiAgZ2V0IGxlbmd0aENhbGN1bGF0b3IgKCkgeyByZXR1cm4gdGhpc1tMRU5HVEhfQ0FMQ1VMQVRPUl0gfVxuXG4gIGdldCBsZW5ndGggKCkgeyByZXR1cm4gdGhpc1tMRU5HVEhdIH1cbiAgZ2V0IGl0ZW1Db3VudCAoKSB7IHJldHVybiB0aGlzW0xSVV9MSVNUXS5sZW5ndGggfVxuXG4gIHJmb3JFYWNoIChmbiwgdGhpc3ApIHtcbiAgICB0aGlzcCA9IHRoaXNwIHx8IHRoaXNcbiAgICBmb3IgKGxldCB3YWxrZXIgPSB0aGlzW0xSVV9MSVNUXS50YWlsOyB3YWxrZXIgIT09IG51bGw7KSB7XG4gICAgICBjb25zdCBwcmV2ID0gd2Fsa2VyLnByZXZcbiAgICAgIGZvckVhY2hTdGVwKHRoaXMsIGZuLCB3YWxrZXIsIHRoaXNwKVxuICAgICAgd2Fsa2VyID0gcHJldlxuICAgIH1cbiAgfVxuXG4gIGZvckVhY2ggKGZuLCB0aGlzcCkge1xuICAgIHRoaXNwID0gdGhpc3AgfHwgdGhpc1xuICAgIGZvciAobGV0IHdhbGtlciA9IHRoaXNbTFJVX0xJU1RdLmhlYWQ7IHdhbGtlciAhPT0gbnVsbDspIHtcbiAgICAgIGNvbnN0IG5leHQgPSB3YWxrZXIubmV4dFxuICAgICAgZm9yRWFjaFN0ZXAodGhpcywgZm4sIHdhbGtlciwgdGhpc3ApXG4gICAgICB3YWxrZXIgPSBuZXh0XG4gICAgfVxuICB9XG5cbiAga2V5cyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbTFJVX0xJU1RdLnRvQXJyYXkoKS5tYXAoayA9PiBrLmtleSlcbiAgfVxuXG4gIHZhbHVlcyAoKSB7XG4gICAgcmV0dXJuIHRoaXNbTFJVX0xJU1RdLnRvQXJyYXkoKS5tYXAoayA9PiBrLnZhbHVlKVxuICB9XG5cbiAgcmVzZXQgKCkge1xuICAgIGlmICh0aGlzW0RJU1BPU0VdICYmXG4gICAgICAgIHRoaXNbTFJVX0xJU1RdICYmXG4gICAgICAgIHRoaXNbTFJVX0xJU1RdLmxlbmd0aCkge1xuICAgICAgdGhpc1tMUlVfTElTVF0uZm9yRWFjaChoaXQgPT4gdGhpc1tESVNQT1NFXShoaXQua2V5LCBoaXQudmFsdWUpKVxuICAgIH1cblxuICAgIHRoaXNbQ0FDSEVdID0gbmV3IE1hcCgpIC8vIGhhc2ggb2YgaXRlbXMgYnkga2V5XG4gICAgdGhpc1tMUlVfTElTVF0gPSBuZXcgWWFsbGlzdCgpIC8vIGxpc3Qgb2YgaXRlbXMgaW4gb3JkZXIgb2YgdXNlIHJlY2VuY3lcbiAgICB0aGlzW0xFTkdUSF0gPSAwIC8vIGxlbmd0aCBvZiBpdGVtcyBpbiB0aGUgbGlzdFxuICB9XG5cbiAgZHVtcCAoKSB7XG4gICAgcmV0dXJuIHRoaXNbTFJVX0xJU1RdLm1hcChoaXQgPT5cbiAgICAgIGlzU3RhbGUodGhpcywgaGl0KSA/IGZhbHNlIDoge1xuICAgICAgICBrOiBoaXQua2V5LFxuICAgICAgICB2OiBoaXQudmFsdWUsXG4gICAgICAgIGU6IGhpdC5ub3cgKyAoaGl0Lm1heEFnZSB8fCAwKVxuICAgICAgfSkudG9BcnJheSgpLmZpbHRlcihoID0+IGgpXG4gIH1cblxuICBkdW1wTHJ1ICgpIHtcbiAgICByZXR1cm4gdGhpc1tMUlVfTElTVF1cbiAgfVxuXG4gIHNldCAoa2V5LCB2YWx1ZSwgbWF4QWdlKSB7XG4gICAgbWF4QWdlID0gbWF4QWdlIHx8IHRoaXNbTUFYX0FHRV1cblxuICAgIGlmIChtYXhBZ2UgJiYgdHlwZW9mIG1heEFnZSAhPT0gJ251bWJlcicpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtYXhBZ2UgbXVzdCBiZSBhIG51bWJlcicpXG5cbiAgICBjb25zdCBub3cgPSBtYXhBZ2UgPyBEYXRlLm5vdygpIDogMFxuICAgIGNvbnN0IGxlbiA9IHRoaXNbTEVOR1RIX0NBTENVTEFUT1JdKHZhbHVlLCBrZXkpXG5cbiAgICBpZiAodGhpc1tDQUNIRV0uaGFzKGtleSkpIHtcbiAgICAgIGlmIChsZW4gPiB0aGlzW01BWF0pIHtcbiAgICAgICAgZGVsKHRoaXMsIHRoaXNbQ0FDSEVdLmdldChrZXkpKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9kZSA9IHRoaXNbQ0FDSEVdLmdldChrZXkpXG4gICAgICBjb25zdCBpdGVtID0gbm9kZS52YWx1ZVxuXG4gICAgICAvLyBkaXNwb3NlIG9mIHRoZSBvbGQgb25lIGJlZm9yZSBvdmVyd3JpdGluZ1xuICAgICAgLy8gc3BsaXQgb3V0IGludG8gMiBpZnMgZm9yIGJldHRlciBjb3ZlcmFnZSB0cmFja2luZ1xuICAgICAgaWYgKHRoaXNbRElTUE9TRV0pIHtcbiAgICAgICAgaWYgKCF0aGlzW05PX0RJU1BPU0VfT05fU0VUXSlcbiAgICAgICAgICB0aGlzW0RJU1BPU0VdKGtleSwgaXRlbS52YWx1ZSlcbiAgICAgIH1cblxuICAgICAgaXRlbS5ub3cgPSBub3dcbiAgICAgIGl0ZW0ubWF4QWdlID0gbWF4QWdlXG4gICAgICBpdGVtLnZhbHVlID0gdmFsdWVcbiAgICAgIHRoaXNbTEVOR1RIXSArPSBsZW4gLSBpdGVtLmxlbmd0aFxuICAgICAgaXRlbS5sZW5ndGggPSBsZW5cbiAgICAgIHRoaXMuZ2V0KGtleSlcbiAgICAgIHRyaW0odGhpcylcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgY29uc3QgaGl0ID0gbmV3IEVudHJ5KGtleSwgdmFsdWUsIGxlbiwgbm93LCBtYXhBZ2UpXG5cbiAgICAvLyBvdmVyc2l6ZWQgb2JqZWN0cyBmYWxsIG91dCBvZiBjYWNoZSBhdXRvbWF0aWNhbGx5LlxuICAgIGlmIChoaXQubGVuZ3RoID4gdGhpc1tNQVhdKSB7XG4gICAgICBpZiAodGhpc1tESVNQT1NFXSlcbiAgICAgICAgdGhpc1tESVNQT1NFXShrZXksIHZhbHVlKVxuXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICB0aGlzW0xFTkdUSF0gKz0gaGl0Lmxlbmd0aFxuICAgIHRoaXNbTFJVX0xJU1RdLnVuc2hpZnQoaGl0KVxuICAgIHRoaXNbQ0FDSEVdLnNldChrZXksIHRoaXNbTFJVX0xJU1RdLmhlYWQpXG4gICAgdHJpbSh0aGlzKVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBoYXMgKGtleSkge1xuICAgIGlmICghdGhpc1tDQUNIRV0uaGFzKGtleSkpIHJldHVybiBmYWxzZVxuICAgIGNvbnN0IGhpdCA9IHRoaXNbQ0FDSEVdLmdldChrZXkpLnZhbHVlXG4gICAgcmV0dXJuICFpc1N0YWxlKHRoaXMsIGhpdClcbiAgfVxuXG4gIGdldCAoa2V5KSB7XG4gICAgcmV0dXJuIGdldCh0aGlzLCBrZXksIHRydWUpXG4gIH1cblxuICBwZWVrIChrZXkpIHtcbiAgICByZXR1cm4gZ2V0KHRoaXMsIGtleSwgZmFsc2UpXG4gIH1cblxuICBwb3AgKCkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzW0xSVV9MSVNUXS50YWlsXG4gICAgaWYgKCFub2RlKVxuICAgICAgcmV0dXJuIG51bGxcblxuICAgIGRlbCh0aGlzLCBub2RlKVxuICAgIHJldHVybiBub2RlLnZhbHVlXG4gIH1cblxuICBkZWwgKGtleSkge1xuICAgIGRlbCh0aGlzLCB0aGlzW0NBQ0hFXS5nZXQoa2V5KSlcbiAgfVxuXG4gIGxvYWQgKGFycikge1xuICAgIC8vIHJlc2V0IHRoZSBjYWNoZVxuICAgIHRoaXMucmVzZXQoKVxuXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKVxuICAgIC8vIEEgcHJldmlvdXMgc2VyaWFsaXplZCBjYWNoZSBoYXMgdGhlIG1vc3QgcmVjZW50IGl0ZW1zIGZpcnN0XG4gICAgZm9yIChsZXQgbCA9IGFyci5sZW5ndGggLSAxOyBsID49IDA7IGwtLSkge1xuICAgICAgY29uc3QgaGl0ID0gYXJyW2xdXG4gICAgICBjb25zdCBleHBpcmVzQXQgPSBoaXQuZSB8fCAwXG4gICAgICBpZiAoZXhwaXJlc0F0ID09PSAwKVxuICAgICAgICAvLyB0aGUgaXRlbSB3YXMgY3JlYXRlZCB3aXRob3V0IGV4cGlyYXRpb24gaW4gYSBub24gYWdlZCBjYWNoZVxuICAgICAgICB0aGlzLnNldChoaXQuaywgaGl0LnYpXG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgbWF4QWdlID0gZXhwaXJlc0F0IC0gbm93XG4gICAgICAgIC8vIGRvbnQgYWRkIGFscmVhZHkgZXhwaXJlZCBpdGVtc1xuICAgICAgICBpZiAobWF4QWdlID4gMCkge1xuICAgICAgICAgIHRoaXMuc2V0KGhpdC5rLCBoaXQudiwgbWF4QWdlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJ1bmUgKCkge1xuICAgIHRoaXNbQ0FDSEVdLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IGdldCh0aGlzLCBrZXksIGZhbHNlKSlcbiAgfVxufVxuXG5jb25zdCBnZXQgPSAoc2VsZiwga2V5LCBkb1VzZSkgPT4ge1xuICBjb25zdCBub2RlID0gc2VsZltDQUNIRV0uZ2V0KGtleSlcbiAgaWYgKG5vZGUpIHtcbiAgICBjb25zdCBoaXQgPSBub2RlLnZhbHVlXG4gICAgaWYgKGlzU3RhbGUoc2VsZiwgaGl0KSkge1xuICAgICAgZGVsKHNlbGYsIG5vZGUpXG4gICAgICBpZiAoIXNlbGZbQUxMT1dfU1RBTEVdKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkb1VzZSkge1xuICAgICAgICBpZiAoc2VsZltVUERBVEVfQUdFX09OX0dFVF0pXG4gICAgICAgICAgbm9kZS52YWx1ZS5ub3cgPSBEYXRlLm5vdygpXG4gICAgICAgIHNlbGZbTFJVX0xJU1RdLnVuc2hpZnROb2RlKG5vZGUpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoaXQudmFsdWVcbiAgfVxufVxuXG5jb25zdCBpc1N0YWxlID0gKHNlbGYsIGhpdCkgPT4ge1xuICBpZiAoIWhpdCB8fCAoIWhpdC5tYXhBZ2UgJiYgIXNlbGZbTUFYX0FHRV0pKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIGNvbnN0IGRpZmYgPSBEYXRlLm5vdygpIC0gaGl0Lm5vd1xuICByZXR1cm4gaGl0Lm1heEFnZSA/IGRpZmYgPiBoaXQubWF4QWdlXG4gICAgOiBzZWxmW01BWF9BR0VdICYmIChkaWZmID4gc2VsZltNQVhfQUdFXSlcbn1cblxuY29uc3QgdHJpbSA9IHNlbGYgPT4ge1xuICBpZiAoc2VsZltMRU5HVEhdID4gc2VsZltNQVhdKSB7XG4gICAgZm9yIChsZXQgd2Fsa2VyID0gc2VsZltMUlVfTElTVF0udGFpbDtcbiAgICAgIHNlbGZbTEVOR1RIXSA+IHNlbGZbTUFYXSAmJiB3YWxrZXIgIT09IG51bGw7KSB7XG4gICAgICAvLyBXZSBrbm93IHRoYXQgd2UncmUgYWJvdXQgdG8gZGVsZXRlIHRoaXMgb25lLCBhbmQgYWxzb1xuICAgICAgLy8gd2hhdCB0aGUgbmV4dCBsZWFzdCByZWNlbnRseSB1c2VkIGtleSB3aWxsIGJlLCBzbyBqdXN0XG4gICAgICAvLyBnbyBhaGVhZCBhbmQgc2V0IGl0IG5vdy5cbiAgICAgIGNvbnN0IHByZXYgPSB3YWxrZXIucHJldlxuICAgICAgZGVsKHNlbGYsIHdhbGtlcilcbiAgICAgIHdhbGtlciA9IHByZXZcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgZGVsID0gKHNlbGYsIG5vZGUpID0+IHtcbiAgaWYgKG5vZGUpIHtcbiAgICBjb25zdCBoaXQgPSBub2RlLnZhbHVlXG4gICAgaWYgKHNlbGZbRElTUE9TRV0pXG4gICAgICBzZWxmW0RJU1BPU0VdKGhpdC5rZXksIGhpdC52YWx1ZSlcblxuICAgIHNlbGZbTEVOR1RIXSAtPSBoaXQubGVuZ3RoXG4gICAgc2VsZltDQUNIRV0uZGVsZXRlKGhpdC5rZXkpXG4gICAgc2VsZltMUlVfTElTVF0ucmVtb3ZlTm9kZShub2RlKVxuICB9XG59XG5cbmNsYXNzIEVudHJ5IHtcbiAgY29uc3RydWN0b3IgKGtleSwgdmFsdWUsIGxlbmd0aCwgbm93LCBtYXhBZ2UpIHtcbiAgICB0aGlzLmtleSA9IGtleVxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoXG4gICAgdGhpcy5ub3cgPSBub3dcbiAgICB0aGlzLm1heEFnZSA9IG1heEFnZSB8fCAwXG4gIH1cbn1cblxuY29uc3QgZm9yRWFjaFN0ZXAgPSAoc2VsZiwgZm4sIG5vZGUsIHRoaXNwKSA9PiB7XG4gIGxldCBoaXQgPSBub2RlLnZhbHVlXG4gIGlmIChpc1N0YWxlKHNlbGYsIGhpdCkpIHtcbiAgICBkZWwoc2VsZiwgbm9kZSlcbiAgICBpZiAoIXNlbGZbQUxMT1dfU1RBTEVdKVxuICAgICAgaGl0ID0gdW5kZWZpbmVkXG4gIH1cbiAgaWYgKGhpdClcbiAgICBmbi5jYWxsKHRoaXNwLCBoaXQudmFsdWUsIGhpdC5rZXksIHNlbGYpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gTFJVQ2FjaGVcbiIsImNvbnN0IEFOWSA9IFN5bWJvbCgnU2VtVmVyIEFOWScpXG4vLyBob2lzdGVkIGNsYXNzIGZvciBjeWNsaWMgZGVwZW5kZW5jeVxuY2xhc3MgQ29tcGFyYXRvciB7XG4gIHN0YXRpYyBnZXQgQU5ZICgpIHtcbiAgICByZXR1cm4gQU5ZXG4gIH1cbiAgY29uc3RydWN0b3IgKGNvbXAsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gcGFyc2VPcHRpb25zKG9wdGlvbnMpXG5cbiAgICBpZiAoY29tcCBpbnN0YW5jZW9mIENvbXBhcmF0b3IpIHtcbiAgICAgIGlmIChjb21wLmxvb3NlID09PSAhIW9wdGlvbnMubG9vc2UpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXAgPSBjb21wLnZhbHVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVidWcoJ2NvbXBhcmF0b3InLCBjb21wLCBvcHRpb25zKVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmxvb3NlID0gISFvcHRpb25zLmxvb3NlXG4gICAgdGhpcy5wYXJzZShjb21wKVxuXG4gICAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkpIHtcbiAgICAgIHRoaXMudmFsdWUgPSAnJ1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5vcGVyYXRvciArIHRoaXMuc2VtdmVyLnZlcnNpb25cbiAgICB9XG5cbiAgICBkZWJ1ZygnY29tcCcsIHRoaXMpXG4gIH1cblxuICBwYXJzZSAoY29tcCkge1xuICAgIGNvbnN0IHIgPSB0aGlzLm9wdGlvbnMubG9vc2UgPyByZVt0LkNPTVBBUkFUT1JMT09TRV0gOiByZVt0LkNPTVBBUkFUT1JdXG4gICAgY29uc3QgbSA9IGNvbXAubWF0Y2gocilcblxuICAgIGlmICghbSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBjb21wYXJhdG9yOiAke2NvbXB9YClcbiAgICB9XG5cbiAgICB0aGlzLm9wZXJhdG9yID0gbVsxXSAhPT0gdW5kZWZpbmVkID8gbVsxXSA6ICcnXG4gICAgaWYgKHRoaXMub3BlcmF0b3IgPT09ICc9Jykge1xuICAgICAgdGhpcy5vcGVyYXRvciA9ICcnXG4gICAgfVxuXG4gICAgLy8gaWYgaXQgbGl0ZXJhbGx5IGlzIGp1c3QgJz4nIG9yICcnIHRoZW4gYWxsb3cgYW55dGhpbmcuXG4gICAgaWYgKCFtWzJdKSB7XG4gICAgICB0aGlzLnNlbXZlciA9IEFOWVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbXZlciA9IG5ldyBTZW1WZXIobVsyXSwgdGhpcy5vcHRpb25zLmxvb3NlKVxuICAgIH1cbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZVxuICB9XG5cbiAgdGVzdCAodmVyc2lvbikge1xuICAgIGRlYnVnKCdDb21wYXJhdG9yLnRlc3QnLCB2ZXJzaW9uLCB0aGlzLm9wdGlvbnMubG9vc2UpXG5cbiAgICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSB8fCB2ZXJzaW9uID09PSBBTlkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgdGhpcy5vcHRpb25zKVxuICAgICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNtcCh2ZXJzaW9uLCB0aGlzLm9wZXJhdG9yLCB0aGlzLnNlbXZlciwgdGhpcy5vcHRpb25zKVxuICB9XG5cbiAgaW50ZXJzZWN0cyAoY29tcCwgb3B0aW9ucykge1xuICAgIGlmICghKGNvbXAgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYSBDb21wYXJhdG9yIGlzIHJlcXVpcmVkJylcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgICBvcHRpb25zID0ge1xuICAgICAgICBsb29zZTogISFvcHRpb25zLFxuICAgICAgICBpbmNsdWRlUHJlcmVsZWFzZTogZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcGVyYXRvciA9PT0gJycpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlID09PSAnJykge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBSYW5nZShjb21wLnZhbHVlLCBvcHRpb25zKS50ZXN0KHRoaXMudmFsdWUpXG4gICAgfSBlbHNlIGlmIChjb21wLm9wZXJhdG9yID09PSAnJykge1xuICAgICAgaWYgKGNvbXAudmFsdWUgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFJhbmdlKHRoaXMudmFsdWUsIG9wdGlvbnMpLnRlc3QoY29tcC5zZW12ZXIpXG4gICAgfVxuXG4gICAgY29uc3Qgc2FtZURpcmVjdGlvbkluY3JlYXNpbmcgPVxuICAgICAgKHRoaXMub3BlcmF0b3IgPT09ICc+PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJz4nKSAmJlxuICAgICAgKGNvbXAub3BlcmF0b3IgPT09ICc+PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJz4nKVxuICAgIGNvbnN0IHNhbWVEaXJlY3Rpb25EZWNyZWFzaW5nID1cbiAgICAgICh0aGlzLm9wZXJhdG9yID09PSAnPD0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc8JykgJiZcbiAgICAgIChjb21wLm9wZXJhdG9yID09PSAnPD0nIHx8IGNvbXAub3BlcmF0b3IgPT09ICc8JylcbiAgICBjb25zdCBzYW1lU2VtVmVyID0gdGhpcy5zZW12ZXIudmVyc2lvbiA9PT0gY29tcC5zZW12ZXIudmVyc2lvblxuICAgIGNvbnN0IGRpZmZlcmVudERpcmVjdGlvbnNJbmNsdXNpdmUgPVxuICAgICAgKHRoaXMub3BlcmF0b3IgPT09ICc+PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJzw9JykgJiZcbiAgICAgIChjb21wLm9wZXJhdG9yID09PSAnPj0nIHx8IGNvbXAub3BlcmF0b3IgPT09ICc8PScpXG4gICAgY29uc3Qgb3Bwb3NpdGVEaXJlY3Rpb25zTGVzc1RoYW4gPVxuICAgICAgY21wKHRoaXMuc2VtdmVyLCAnPCcsIGNvbXAuc2VtdmVyLCBvcHRpb25zKSAmJlxuICAgICAgKHRoaXMub3BlcmF0b3IgPT09ICc+PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJz4nKSAmJlxuICAgICAgICAoY29tcC5vcGVyYXRvciA9PT0gJzw9JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPCcpXG4gICAgY29uc3Qgb3Bwb3NpdGVEaXJlY3Rpb25zR3JlYXRlclRoYW4gPVxuICAgICAgY21wKHRoaXMuc2VtdmVyLCAnPicsIGNvbXAuc2VtdmVyLCBvcHRpb25zKSAmJlxuICAgICAgKHRoaXMub3BlcmF0b3IgPT09ICc8PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJzwnKSAmJlxuICAgICAgICAoY29tcC5vcGVyYXRvciA9PT0gJz49JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPicpXG5cbiAgICByZXR1cm4gKFxuICAgICAgc2FtZURpcmVjdGlvbkluY3JlYXNpbmcgfHxcbiAgICAgIHNhbWVEaXJlY3Rpb25EZWNyZWFzaW5nIHx8XG4gICAgICAoc2FtZVNlbVZlciAmJiBkaWZmZXJlbnREaXJlY3Rpb25zSW5jbHVzaXZlKSB8fFxuICAgICAgb3Bwb3NpdGVEaXJlY3Rpb25zTGVzc1RoYW4gfHxcbiAgICAgIG9wcG9zaXRlRGlyZWN0aW9uc0dyZWF0ZXJUaGFuXG4gICAgKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcGFyYXRvclxuXG5jb25zdCBwYXJzZU9wdGlvbnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9wYXJzZS1vcHRpb25zJylcbmNvbnN0IHtyZSwgdH0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9yZScpXG5jb25zdCBjbXAgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvY21wJylcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZGVidWcnKVxuY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi9zZW12ZXInKVxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuL3JhbmdlJylcbiIsIi8vIGhvaXN0ZWQgY2xhc3MgZm9yIGN5Y2xpYyBkZXBlbmRlbmN5XG5jbGFzcyBSYW5nZSB7XG4gIGNvbnN0cnVjdG9yIChyYW5nZSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBwYXJzZU9wdGlvbnMob3B0aW9ucylcblxuICAgIGlmIChyYW5nZSBpbnN0YW5jZW9mIFJhbmdlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHJhbmdlLmxvb3NlID09PSAhIW9wdGlvbnMubG9vc2UgJiZcbiAgICAgICAgcmFuZ2UuaW5jbHVkZVByZXJlbGVhc2UgPT09ICEhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiByYW5nZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZS5yYXcsIG9wdGlvbnMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJhbmdlIGluc3RhbmNlb2YgQ29tcGFyYXRvcikge1xuICAgICAgLy8ganVzdCBwdXQgaXQgaW4gdGhlIHNldCBhbmQgcmV0dXJuXG4gICAgICB0aGlzLnJhdyA9IHJhbmdlLnZhbHVlXG4gICAgICB0aGlzLnNldCA9IFtbcmFuZ2VdXVxuICAgICAgdGhpcy5mb3JtYXQoKVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5sb29zZSA9ICEhb3B0aW9ucy5sb29zZVxuICAgIHRoaXMuaW5jbHVkZVByZXJlbGVhc2UgPSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2VcblxuICAgIC8vIEZpcnN0LCBzcGxpdCBiYXNlZCBvbiBib29sZWFuIG9yIHx8XG4gICAgdGhpcy5yYXcgPSByYW5nZVxuICAgIHRoaXMuc2V0ID0gcmFuZ2VcbiAgICAgIC5zcGxpdCgvXFxzKlxcfFxcfFxccyovKVxuICAgICAgLy8gbWFwIHRoZSByYW5nZSB0byBhIDJkIGFycmF5IG9mIGNvbXBhcmF0b3JzXG4gICAgICAubWFwKHJhbmdlID0+IHRoaXMucGFyc2VSYW5nZShyYW5nZS50cmltKCkpKVxuICAgICAgLy8gdGhyb3cgb3V0IGFueSBjb21wYXJhdG9yIGxpc3RzIHRoYXQgYXJlIGVtcHR5XG4gICAgICAvLyB0aGlzIGdlbmVyYWxseSBtZWFucyB0aGF0IGl0IHdhcyBub3QgYSB2YWxpZCByYW5nZSwgd2hpY2ggaXMgYWxsb3dlZFxuICAgICAgLy8gaW4gbG9vc2UgbW9kZSwgYnV0IHdpbGwgc3RpbGwgdGhyb3cgaWYgdGhlIFdIT0xFIHJhbmdlIGlzIGludmFsaWQuXG4gICAgICAuZmlsdGVyKGMgPT4gYy5sZW5ndGgpXG5cbiAgICBpZiAoIXRoaXMuc2V0Lmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBTZW1WZXIgUmFuZ2U6ICR7cmFuZ2V9YClcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSBoYXZlIGFueSB0aGF0IGFyZSBub3QgdGhlIG51bGwgc2V0LCB0aHJvdyBvdXQgbnVsbCBzZXRzLlxuICAgIGlmICh0aGlzLnNldC5sZW5ndGggPiAxKSB7XG4gICAgICAvLyBrZWVwIHRoZSBmaXJzdCBvbmUsIGluIGNhc2UgdGhleSdyZSBhbGwgbnVsbCBzZXRzXG4gICAgICBjb25zdCBmaXJzdCA9IHRoaXMuc2V0WzBdXG4gICAgICB0aGlzLnNldCA9IHRoaXMuc2V0LmZpbHRlcihjID0+ICFpc051bGxTZXQoY1swXSkpXG4gICAgICBpZiAodGhpcy5zZXQubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLnNldCA9IFtmaXJzdF1cbiAgICAgIGVsc2UgaWYgKHRoaXMuc2V0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhbnkgdGhhdCBhcmUgKiwgdGhlbiB0aGUgcmFuZ2UgaXMganVzdCAqXG4gICAgICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLnNldCkge1xuICAgICAgICAgIGlmIChjLmxlbmd0aCA9PT0gMSAmJiBpc0FueShjWzBdKSkge1xuICAgICAgICAgICAgdGhpcy5zZXQgPSBbY11cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5mb3JtYXQoKVxuICB9XG5cbiAgZm9ybWF0ICgpIHtcbiAgICB0aGlzLnJhbmdlID0gdGhpcy5zZXRcbiAgICAgIC5tYXAoKGNvbXBzKSA9PiB7XG4gICAgICAgIHJldHVybiBjb21wcy5qb2luKCcgJykudHJpbSgpXG4gICAgICB9KVxuICAgICAgLmpvaW4oJ3x8JylcbiAgICAgIC50cmltKClcbiAgICByZXR1cm4gdGhpcy5yYW5nZVxuICB9XG5cbiAgdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLnJhbmdlXG4gIH1cblxuICBwYXJzZVJhbmdlIChyYW5nZSkge1xuICAgIHJhbmdlID0gcmFuZ2UudHJpbSgpXG5cbiAgICAvLyBtZW1vaXplIHJhbmdlIHBhcnNpbmcgZm9yIHBlcmZvcm1hbmNlLlxuICAgIC8vIHRoaXMgaXMgYSB2ZXJ5IGhvdCBwYXRoLCBhbmQgZnVsbHkgZGV0ZXJtaW5pc3RpYy5cbiAgICBjb25zdCBtZW1vT3B0cyA9IE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucykuam9pbignLCcpXG4gICAgY29uc3QgbWVtb0tleSA9IGBwYXJzZVJhbmdlOiR7bWVtb09wdHN9OiR7cmFuZ2V9YFxuICAgIGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldChtZW1vS2V5KVxuICAgIGlmIChjYWNoZWQpXG4gICAgICByZXR1cm4gY2FjaGVkXG5cbiAgICBjb25zdCBsb29zZSA9IHRoaXMub3B0aW9ucy5sb29zZVxuICAgIC8vIGAxLjIuMyAtIDEuMi40YCA9PiBgPj0xLjIuMyA8PTEuMi40YFxuICAgIGNvbnN0IGhyID0gbG9vc2UgPyByZVt0LkhZUEhFTlJBTkdFTE9PU0VdIDogcmVbdC5IWVBIRU5SQU5HRV1cbiAgICByYW5nZSA9IHJhbmdlLnJlcGxhY2UoaHIsIGh5cGhlblJlcGxhY2UodGhpcy5vcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlKSlcbiAgICBkZWJ1ZygnaHlwaGVuIHJlcGxhY2UnLCByYW5nZSlcbiAgICAvLyBgPiAxLjIuMyA8IDEuMi41YCA9PiBgPjEuMi4zIDwxLjIuNWBcbiAgICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbdC5DT01QQVJBVE9SVFJJTV0sIGNvbXBhcmF0b3JUcmltUmVwbGFjZSlcbiAgICBkZWJ1ZygnY29tcGFyYXRvciB0cmltJywgcmFuZ2UsIHJlW3QuQ09NUEFSQVRPUlRSSU1dKVxuXG4gICAgLy8gYH4gMS4yLjNgID0+IGB+MS4yLjNgXG4gICAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW3QuVElMREVUUklNXSwgdGlsZGVUcmltUmVwbGFjZSlcblxuICAgIC8vIGBeIDEuMi4zYCA9PiBgXjEuMi4zYFxuICAgIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVt0LkNBUkVUVFJJTV0sIGNhcmV0VHJpbVJlcGxhY2UpXG5cbiAgICAvLyBub3JtYWxpemUgc3BhY2VzXG4gICAgcmFuZ2UgPSByYW5nZS5zcGxpdCgvXFxzKy8pLmpvaW4oJyAnKVxuXG4gICAgLy8gQXQgdGhpcyBwb2ludCwgdGhlIHJhbmdlIGlzIGNvbXBsZXRlbHkgdHJpbW1lZCBhbmRcbiAgICAvLyByZWFkeSB0byBiZSBzcGxpdCBpbnRvIGNvbXBhcmF0b3JzLlxuXG4gICAgY29uc3QgY29tcFJlID0gbG9vc2UgPyByZVt0LkNPTVBBUkFUT1JMT09TRV0gOiByZVt0LkNPTVBBUkFUT1JdXG4gICAgY29uc3QgcmFuZ2VMaXN0ID0gcmFuZ2VcbiAgICAgIC5zcGxpdCgnICcpXG4gICAgICAubWFwKGNvbXAgPT4gcGFyc2VDb21wYXJhdG9yKGNvbXAsIHRoaXMub3B0aW9ucykpXG4gICAgICAuam9pbignICcpXG4gICAgICAuc3BsaXQoL1xccysvKVxuICAgICAgLy8gPj0wLjAuMCBpcyBlcXVpdmFsZW50IHRvICpcbiAgICAgIC5tYXAoY29tcCA9PiByZXBsYWNlR1RFMChjb21wLCB0aGlzLm9wdGlvbnMpKVxuICAgICAgLy8gaW4gbG9vc2UgbW9kZSwgdGhyb3cgb3V0IGFueSB0aGF0IGFyZSBub3QgdmFsaWQgY29tcGFyYXRvcnNcbiAgICAgIC5maWx0ZXIodGhpcy5vcHRpb25zLmxvb3NlID8gY29tcCA9PiAhIWNvbXAubWF0Y2goY29tcFJlKSA6ICgpID0+IHRydWUpXG4gICAgICAubWFwKGNvbXAgPT4gbmV3IENvbXBhcmF0b3IoY29tcCwgdGhpcy5vcHRpb25zKSlcblxuICAgIC8vIGlmIGFueSBjb21wYXJhdG9ycyBhcmUgdGhlIG51bGwgc2V0LCB0aGVuIHJlcGxhY2Ugd2l0aCBKVVNUIG51bGwgc2V0XG4gICAgLy8gaWYgbW9yZSB0aGFuIG9uZSBjb21wYXJhdG9yLCByZW1vdmUgYW55ICogY29tcGFyYXRvcnNcbiAgICAvLyBhbHNvLCBkb24ndCBpbmNsdWRlIHRoZSBzYW1lIGNvbXBhcmF0b3IgbW9yZSB0aGFuIG9uY2VcbiAgICBjb25zdCBsID0gcmFuZ2VMaXN0Lmxlbmd0aFxuICAgIGNvbnN0IHJhbmdlTWFwID0gbmV3IE1hcCgpXG4gICAgZm9yIChjb25zdCBjb21wIG9mIHJhbmdlTGlzdCkge1xuICAgICAgaWYgKGlzTnVsbFNldChjb21wKSlcbiAgICAgICAgcmV0dXJuIFtjb21wXVxuICAgICAgcmFuZ2VNYXAuc2V0KGNvbXAudmFsdWUsIGNvbXApXG4gICAgfVxuICAgIGlmIChyYW5nZU1hcC5zaXplID4gMSAmJiByYW5nZU1hcC5oYXMoJycpKVxuICAgICAgcmFuZ2VNYXAuZGVsZXRlKCcnKVxuXG4gICAgY29uc3QgcmVzdWx0ID0gWy4uLnJhbmdlTWFwLnZhbHVlcygpXVxuICAgIGNhY2hlLnNldChtZW1vS2V5LCByZXN1bHQpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgaW50ZXJzZWN0cyAocmFuZ2UsIG9wdGlvbnMpIHtcbiAgICBpZiAoIShyYW5nZSBpbnN0YW5jZW9mIFJhbmdlKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYSBSYW5nZSBpcyByZXF1aXJlZCcpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc2V0LnNvbWUoKHRoaXNDb21wYXJhdG9ycykgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgaXNTYXRpc2ZpYWJsZSh0aGlzQ29tcGFyYXRvcnMsIG9wdGlvbnMpICYmXG4gICAgICAgIHJhbmdlLnNldC5zb21lKChyYW5nZUNvbXBhcmF0b3JzKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGlzU2F0aXNmaWFibGUocmFuZ2VDb21wYXJhdG9ycywgb3B0aW9ucykgJiZcbiAgICAgICAgICAgIHRoaXNDb21wYXJhdG9ycy5ldmVyeSgodGhpc0NvbXBhcmF0b3IpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlQ29tcGFyYXRvcnMuZXZlcnkoKHJhbmdlQ29tcGFyYXRvcikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzQ29tcGFyYXRvci5pbnRlcnNlY3RzKHJhbmdlQ29tcGFyYXRvciwgb3B0aW9ucylcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIH0pXG4gIH1cblxuICAvLyBpZiBBTlkgb2YgdGhlIHNldHMgbWF0Y2ggQUxMIG9mIGl0cyBjb21wYXJhdG9ycywgdGhlbiBwYXNzXG4gIHRlc3QgKHZlcnNpb24pIHtcbiAgICBpZiAoIXZlcnNpb24pIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMub3B0aW9ucylcbiAgICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0ZXN0U2V0KHRoaXMuc2V0W2ldLCB2ZXJzaW9uLCB0aGlzLm9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IFJhbmdlXG5cbmNvbnN0IExSVSA9IHJlcXVpcmUoJ2xydS1jYWNoZScpXG5jb25zdCBjYWNoZSA9IG5ldyBMUlUoeyBtYXg6IDEwMDAgfSlcblxuY29uc3QgcGFyc2VPcHRpb25zID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcGFyc2Utb3B0aW9ucycpXG5jb25zdCBDb21wYXJhdG9yID0gcmVxdWlyZSgnLi9jb21wYXJhdG9yJylcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZGVidWcnKVxuY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi9zZW12ZXInKVxuY29uc3Qge1xuICByZSxcbiAgdCxcbiAgY29tcGFyYXRvclRyaW1SZXBsYWNlLFxuICB0aWxkZVRyaW1SZXBsYWNlLFxuICBjYXJldFRyaW1SZXBsYWNlXG59ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcmUnKVxuXG5jb25zdCBpc051bGxTZXQgPSBjID0+IGMudmFsdWUgPT09ICc8MC4wLjAtMCdcbmNvbnN0IGlzQW55ID0gYyA9PiBjLnZhbHVlID09PSAnJ1xuXG4vLyB0YWtlIGEgc2V0IG9mIGNvbXBhcmF0b3JzIGFuZCBkZXRlcm1pbmUgd2hldGhlciB0aGVyZVxuLy8gZXhpc3RzIGEgdmVyc2lvbiB3aGljaCBjYW4gc2F0aXNmeSBpdFxuY29uc3QgaXNTYXRpc2ZpYWJsZSA9IChjb21wYXJhdG9ycywgb3B0aW9ucykgPT4ge1xuICBsZXQgcmVzdWx0ID0gdHJ1ZVxuICBjb25zdCByZW1haW5pbmdDb21wYXJhdG9ycyA9IGNvbXBhcmF0b3JzLnNsaWNlKClcbiAgbGV0IHRlc3RDb21wYXJhdG9yID0gcmVtYWluaW5nQ29tcGFyYXRvcnMucG9wKClcblxuICB3aGlsZSAocmVzdWx0ICYmIHJlbWFpbmluZ0NvbXBhcmF0b3JzLmxlbmd0aCkge1xuICAgIHJlc3VsdCA9IHJlbWFpbmluZ0NvbXBhcmF0b3JzLmV2ZXJ5KChvdGhlckNvbXBhcmF0b3IpID0+IHtcbiAgICAgIHJldHVybiB0ZXN0Q29tcGFyYXRvci5pbnRlcnNlY3RzKG90aGVyQ29tcGFyYXRvciwgb3B0aW9ucylcbiAgICB9KVxuXG4gICAgdGVzdENvbXBhcmF0b3IgPSByZW1haW5pbmdDb21wYXJhdG9ycy5wb3AoKVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vLyBjb21wcmlzZWQgb2YgeHJhbmdlcywgdGlsZGVzLCBzdGFycywgYW5kIGd0bHQncyBhdCB0aGlzIHBvaW50LlxuLy8gYWxyZWFkeSByZXBsYWNlZCB0aGUgaHlwaGVuIHJhbmdlc1xuLy8gdHVybiBpbnRvIGEgc2V0IG9mIEpVU1QgY29tcGFyYXRvcnMuXG5jb25zdCBwYXJzZUNvbXBhcmF0b3IgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBkZWJ1ZygnY29tcCcsIGNvbXAsIG9wdGlvbnMpXG4gIGNvbXAgPSByZXBsYWNlQ2FyZXRzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCdjYXJldCcsIGNvbXApXG4gIGNvbXAgPSByZXBsYWNlVGlsZGVzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCd0aWxkZXMnLCBjb21wKVxuICBjb21wID0gcmVwbGFjZVhSYW5nZXMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ3hyYW5nZScsIGNvbXApXG4gIGNvbXAgPSByZXBsYWNlU3RhcnMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ3N0YXJzJywgY29tcClcbiAgcmV0dXJuIGNvbXBcbn1cblxuY29uc3QgaXNYID0gaWQgPT4gIWlkIHx8IGlkLnRvTG93ZXJDYXNlKCkgPT09ICd4JyB8fCBpZCA9PT0gJyonXG5cbi8vIH4sIH4+IC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gfjIsIH4yLngsIH4yLngueCwgfj4yLCB+PjIueCB+PjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMC0wXG4vLyB+Mi4wLCB+Mi4wLngsIH4+Mi4wLCB+PjIuMC54IC0tPiA+PTIuMC4wIDwyLjEuMC0wXG4vLyB+MS4yLCB+MS4yLngsIH4+MS4yLCB+PjEuMi54IC0tPiA+PTEuMi4wIDwxLjMuMC0wXG4vLyB+MS4yLjMsIH4+MS4yLjMgLS0+ID49MS4yLjMgPDEuMy4wLTBcbi8vIH4xLjIuMCwgfj4xLjIuMCAtLT4gPj0xLjIuMCA8MS4zLjAtMFxuY29uc3QgcmVwbGFjZVRpbGRlcyA9IChjb21wLCBvcHRpb25zKSA9PlxuICBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcCgoY29tcCkgPT4ge1xuICAgIHJldHVybiByZXBsYWNlVGlsZGUoY29tcCwgb3B0aW9ucylcbiAgfSkuam9pbignICcpXG5cbmNvbnN0IHJlcGxhY2VUaWxkZSA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHIgPSBvcHRpb25zLmxvb3NlID8gcmVbdC5USUxERUxPT1NFXSA6IHJlW3QuVElMREVdXG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgKF8sIE0sIG0sIHAsIHByKSA9PiB7XG4gICAgZGVidWcoJ3RpbGRlJywgY29tcCwgXywgTSwgbSwgcCwgcHIpXG4gICAgbGV0IHJldFxuXG4gICAgaWYgKGlzWChNKSkge1xuICAgICAgcmV0ID0gJydcbiAgICB9IGVsc2UgaWYgKGlzWChtKSkge1xuICAgICAgcmV0ID0gYD49JHtNfS4wLjAgPCR7K00gKyAxfS4wLjAtMGBcbiAgICB9IGVsc2UgaWYgKGlzWChwKSkge1xuICAgICAgLy8gfjEuMiA9PSA+PTEuMi4wIDwxLjMuMC0wXG4gICAgICByZXQgPSBgPj0ke019LiR7bX0uMCA8JHtNfS4keyttICsgMX0uMC0wYFxuICAgIH0gZWxzZSBpZiAocHIpIHtcbiAgICAgIGRlYnVnKCdyZXBsYWNlVGlsZGUgcHInLCBwcilcbiAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3B9LSR7cHJcbiAgICAgIH0gPCR7TX0uJHsrbSArIDF9LjAtMGBcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gfjEuMi4zID09ID49MS4yLjMgPDEuMy4wLTBcbiAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3BcbiAgICAgIH0gPCR7TX0uJHsrbSArIDF9LjAtMGBcbiAgICB9XG5cbiAgICBkZWJ1ZygndGlsZGUgcmV0dXJuJywgcmV0KVxuICAgIHJldHVybiByZXRcbiAgfSlcbn1cblxuLy8gXiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIF4yLCBeMi54LCBeMi54LnggLS0+ID49Mi4wLjAgPDMuMC4wLTBcbi8vIF4yLjAsIF4yLjAueCAtLT4gPj0yLjAuMCA8My4wLjAtMFxuLy8gXjEuMiwgXjEuMi54IC0tPiA+PTEuMi4wIDwyLjAuMC0wXG4vLyBeMS4yLjMgLS0+ID49MS4yLjMgPDIuMC4wLTBcbi8vIF4xLjIuMCAtLT4gPj0xLjIuMCA8Mi4wLjAtMFxuY29uc3QgcmVwbGFjZUNhcmV0cyA9IChjb21wLCBvcHRpb25zKSA9PlxuICBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcCgoY29tcCkgPT4ge1xuICAgIHJldHVybiByZXBsYWNlQ2FyZXQoY29tcCwgb3B0aW9ucylcbiAgfSkuam9pbignICcpXG5cbmNvbnN0IHJlcGxhY2VDYXJldCA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGRlYnVnKCdjYXJldCcsIGNvbXAsIG9wdGlvbnMpXG4gIGNvbnN0IHIgPSBvcHRpb25zLmxvb3NlID8gcmVbdC5DQVJFVExPT1NFXSA6IHJlW3QuQ0FSRVRdXG4gIGNvbnN0IHogPSBvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlID8gJy0wJyA6ICcnXG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgKF8sIE0sIG0sIHAsIHByKSA9PiB7XG4gICAgZGVidWcoJ2NhcmV0JywgY29tcCwgXywgTSwgbSwgcCwgcHIpXG4gICAgbGV0IHJldFxuXG4gICAgaWYgKGlzWChNKSkge1xuICAgICAgcmV0ID0gJydcbiAgICB9IGVsc2UgaWYgKGlzWChtKSkge1xuICAgICAgcmV0ID0gYD49JHtNfS4wLjAke3p9IDwkeytNICsgMX0uMC4wLTBgXG4gICAgfSBlbHNlIGlmIChpc1gocCkpIHtcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LjAke3p9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uMCR7en0gPCR7K00gKyAxfS4wLjAtMGBcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZUNhcmV0IHByJywgcHIpXG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIGlmIChtID09PSAnMCcpIHtcbiAgICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwfS0ke3ByXG4gICAgICAgICAgfSA8JHtNfS4ke219LiR7K3AgKyAxfS0wYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3B9LSR7cHJcbiAgICAgICAgICB9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3B9LSR7cHJcbiAgICAgICAgfSA8JHsrTSArIDF9LjAuMC0wYFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Zygnbm8gcHInKVxuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKSB7XG4gICAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LiR7cFxuICAgICAgICAgIH0ke3p9IDwke019LiR7bX0uJHsrcCArIDF9LTBgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LiR7cFxuICAgICAgICAgIH0ke3p9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3BcbiAgICAgICAgfSA8JHsrTSArIDF9LjAuMC0wYFxuICAgICAgfVxuICAgIH1cblxuICAgIGRlYnVnKCdjYXJldCByZXR1cm4nLCByZXQpXG4gICAgcmV0dXJuIHJldFxuICB9KVxufVxuXG5jb25zdCByZXBsYWNlWFJhbmdlcyA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGRlYnVnKCdyZXBsYWNlWFJhbmdlcycsIGNvbXAsIG9wdGlvbnMpXG4gIHJldHVybiBjb21wLnNwbGl0KC9cXHMrLykubWFwKChjb21wKSA9PiB7XG4gICAgcmV0dXJuIHJlcGxhY2VYUmFuZ2UoY29tcCwgb3B0aW9ucylcbiAgfSkuam9pbignICcpXG59XG5cbmNvbnN0IHJlcGxhY2VYUmFuZ2UgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBjb21wID0gY29tcC50cmltKClcbiAgY29uc3QgciA9IG9wdGlvbnMubG9vc2UgPyByZVt0LlhSQU5HRUxPT1NFXSA6IHJlW3QuWFJBTkdFXVxuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIChyZXQsIGd0bHQsIE0sIG0sIHAsIHByKSA9PiB7XG4gICAgZGVidWcoJ3hSYW5nZScsIGNvbXAsIHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpXG4gICAgY29uc3QgeE0gPSBpc1goTSlcbiAgICBjb25zdCB4bSA9IHhNIHx8IGlzWChtKVxuICAgIGNvbnN0IHhwID0geG0gfHwgaXNYKHApXG4gICAgY29uc3QgYW55WCA9IHhwXG5cbiAgICBpZiAoZ3RsdCA9PT0gJz0nICYmIGFueVgpIHtcbiAgICAgIGd0bHQgPSAnJ1xuICAgIH1cblxuICAgIC8vIGlmIHdlJ3JlIGluY2x1ZGluZyBwcmVyZWxlYXNlcyBpbiB0aGUgbWF0Y2gsIHRoZW4gd2UgbmVlZFxuICAgIC8vIHRvIGZpeCB0aGlzIHRvIC0wLCB0aGUgbG93ZXN0IHBvc3NpYmxlIHByZXJlbGVhc2UgdmFsdWVcbiAgICBwciA9IG9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgPyAnLTAnIDogJydcblxuICAgIGlmICh4TSkge1xuICAgICAgaWYgKGd0bHQgPT09ICc+JyB8fCBndGx0ID09PSAnPCcpIHtcbiAgICAgICAgLy8gbm90aGluZyBpcyBhbGxvd2VkXG4gICAgICAgIHJldCA9ICc8MC4wLjAtMCdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgZm9yYmlkZGVuXG4gICAgICAgIHJldCA9ICcqJ1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZ3RsdCAmJiBhbnlYKSB7XG4gICAgICAvLyB3ZSBrbm93IHBhdGNoIGlzIGFuIHgsIGJlY2F1c2Ugd2UgaGF2ZSBhbnkgeCBhdCBhbGwuXG4gICAgICAvLyByZXBsYWNlIFggd2l0aCAwXG4gICAgICBpZiAoeG0pIHtcbiAgICAgICAgbSA9IDBcbiAgICAgIH1cbiAgICAgIHAgPSAwXG5cbiAgICAgIGlmIChndGx0ID09PSAnPicpIHtcbiAgICAgICAgLy8gPjEgPT4gPj0yLjAuMFxuICAgICAgICAvLyA+MS4yID0+ID49MS4zLjBcbiAgICAgICAgZ3RsdCA9ICc+PSdcbiAgICAgICAgaWYgKHhtKSB7XG4gICAgICAgICAgTSA9ICtNICsgMVxuICAgICAgICAgIG0gPSAwXG4gICAgICAgICAgcCA9IDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtID0gK20gKyAxXG4gICAgICAgICAgcCA9IDBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChndGx0ID09PSAnPD0nKSB7XG4gICAgICAgIC8vIDw9MC43LnggaXMgYWN0dWFsbHkgPDAuOC4wLCBzaW5jZSBhbnkgMC43Lnggc2hvdWxkXG4gICAgICAgIC8vIHBhc3MuICBTaW1pbGFybHksIDw9Ny54IGlzIGFjdHVhbGx5IDw4LjAuMCwgZXRjLlxuICAgICAgICBndGx0ID0gJzwnXG4gICAgICAgIGlmICh4bSkge1xuICAgICAgICAgIE0gPSArTSArIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtID0gK20gKyAxXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGd0bHQgPT09ICc8JylcbiAgICAgICAgcHIgPSAnLTAnXG5cbiAgICAgIHJldCA9IGAke2d0bHQgKyBNfS4ke219LiR7cH0ke3ByfWBcbiAgICB9IGVsc2UgaWYgKHhtKSB7XG4gICAgICByZXQgPSBgPj0ke019LjAuMCR7cHJ9IDwkeytNICsgMX0uMC4wLTBgXG4gICAgfSBlbHNlIGlmICh4cCkge1xuICAgICAgcmV0ID0gYD49JHtNfS4ke219LjAke3ByXG4gICAgICB9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgfVxuXG4gICAgZGVidWcoJ3hSYW5nZSByZXR1cm4nLCByZXQpXG5cbiAgICByZXR1cm4gcmV0XG4gIH0pXG59XG5cbi8vIEJlY2F1c2UgKiBpcyBBTkQtZWQgd2l0aCBldmVyeXRoaW5nIGVsc2UgaW4gdGhlIGNvbXBhcmF0b3IsXG4vLyBhbmQgJycgbWVhbnMgXCJhbnkgdmVyc2lvblwiLCBqdXN0IHJlbW92ZSB0aGUgKnMgZW50aXJlbHkuXG5jb25zdCByZXBsYWNlU3RhcnMgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBkZWJ1ZygncmVwbGFjZVN0YXJzJywgY29tcCwgb3B0aW9ucylcbiAgLy8gTG9vc2VuZXNzIGlzIGlnbm9yZWQgaGVyZS4gIHN0YXIgaXMgYWx3YXlzIGFzIGxvb3NlIGFzIGl0IGdldHMhXG4gIHJldHVybiBjb21wLnRyaW0oKS5yZXBsYWNlKHJlW3QuU1RBUl0sICcnKVxufVxuXG5jb25zdCByZXBsYWNlR1RFMCA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGRlYnVnKCdyZXBsYWNlR1RFMCcsIGNvbXAsIG9wdGlvbnMpXG4gIHJldHVybiBjb21wLnRyaW0oKVxuICAgIC5yZXBsYWNlKHJlW29wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgPyB0LkdURTBQUkUgOiB0LkdURTBdLCAnJylcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBwYXNzZWQgdG8gc3RyaW5nLnJlcGxhY2UocmVbdC5IWVBIRU5SQU5HRV0pXG4vLyBNLCBtLCBwYXRjaCwgcHJlcmVsZWFzZSwgYnVpbGRcbi8vIDEuMiAtIDMuNC41ID0+ID49MS4yLjAgPD0zLjQuNVxuLy8gMS4yLjMgLSAzLjQgPT4gPj0xLjIuMCA8My41LjAtMCBBbnkgMy40Lnggd2lsbCBkb1xuLy8gMS4yIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wLTBcbmNvbnN0IGh5cGhlblJlcGxhY2UgPSBpbmNQciA9PiAoJDAsXG4gIGZyb20sIGZNLCBmbSwgZnAsIGZwciwgZmIsXG4gIHRvLCB0TSwgdG0sIHRwLCB0cHIsIHRiKSA9PiB7XG4gIGlmIChpc1goZk0pKSB7XG4gICAgZnJvbSA9ICcnXG4gIH0gZWxzZSBpZiAoaXNYKGZtKSkge1xuICAgIGZyb20gPSBgPj0ke2ZNfS4wLjAke2luY1ByID8gJy0wJyA6ICcnfWBcbiAgfSBlbHNlIGlmIChpc1goZnApKSB7XG4gICAgZnJvbSA9IGA+PSR7Zk19LiR7Zm19LjAke2luY1ByID8gJy0wJyA6ICcnfWBcbiAgfSBlbHNlIGlmIChmcHIpIHtcbiAgICBmcm9tID0gYD49JHtmcm9tfWBcbiAgfSBlbHNlIHtcbiAgICBmcm9tID0gYD49JHtmcm9tfSR7aW5jUHIgPyAnLTAnIDogJyd9YFxuICB9XG5cbiAgaWYgKGlzWCh0TSkpIHtcbiAgICB0byA9ICcnXG4gIH0gZWxzZSBpZiAoaXNYKHRtKSkge1xuICAgIHRvID0gYDwkeyt0TSArIDF9LjAuMC0wYFxuICB9IGVsc2UgaWYgKGlzWCh0cCkpIHtcbiAgICB0byA9IGA8JHt0TX0uJHsrdG0gKyAxfS4wLTBgXG4gIH0gZWxzZSBpZiAodHByKSB7XG4gICAgdG8gPSBgPD0ke3RNfS4ke3RtfS4ke3RwfS0ke3Rwcn1gXG4gIH0gZWxzZSBpZiAoaW5jUHIpIHtcbiAgICB0byA9IGA8JHt0TX0uJHt0bX0uJHsrdHAgKyAxfS0wYFxuICB9IGVsc2Uge1xuICAgIHRvID0gYDw9JHt0b31gXG4gIH1cblxuICByZXR1cm4gKGAke2Zyb219ICR7dG99YCkudHJpbSgpXG59XG5cbmNvbnN0IHRlc3RTZXQgPSAoc2V0LCB2ZXJzaW9uLCBvcHRpb25zKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFzZXRbaV0udGVzdCh2ZXJzaW9uKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaWYgKHZlcnNpb24ucHJlcmVsZWFzZS5sZW5ndGggJiYgIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpIHtcbiAgICAvLyBGaW5kIHRoZSBzZXQgb2YgdmVyc2lvbnMgdGhhdCBhcmUgYWxsb3dlZCB0byBoYXZlIHByZXJlbGVhc2VzXG4gICAgLy8gRm9yIGV4YW1wbGUsIF4xLjIuMy1wci4xIGRlc3VnYXJzIHRvID49MS4yLjMtcHIuMSA8Mi4wLjBcbiAgICAvLyBUaGF0IHNob3VsZCBhbGxvdyBgMS4yLjMtcHIuMmAgdG8gcGFzcy5cbiAgICAvLyBIb3dldmVyLCBgMS4yLjQtYWxwaGEubm90cmVhZHlgIHNob3VsZCBOT1QgYmUgYWxsb3dlZCxcbiAgICAvLyBldmVuIHRob3VnaCBpdCdzIHdpdGhpbiB0aGUgcmFuZ2Ugc2V0IGJ5IHRoZSBjb21wYXJhdG9ycy5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xuICAgICAgZGVidWcoc2V0W2ldLnNlbXZlcilcbiAgICAgIGlmIChzZXRbaV0uc2VtdmVyID09PSBDb21wYXJhdG9yLkFOWSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBpZiAoc2V0W2ldLnNlbXZlci5wcmVyZWxlYXNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgYWxsb3dlZCA9IHNldFtpXS5zZW12ZXJcbiAgICAgICAgaWYgKGFsbG93ZWQubWFqb3IgPT09IHZlcnNpb24ubWFqb3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQubWlub3IgPT09IHZlcnNpb24ubWlub3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQucGF0Y2ggPT09IHZlcnNpb24ucGF0Y2gpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVmVyc2lvbiBoYXMgYSAtcHJlLCBidXQgaXQncyBub3Qgb25lIG9mIHRoZSBvbmVzIHdlIGxpa2UuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuIiwiY29uc3QgZGVidWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9kZWJ1ZycpXG5jb25zdCB7IE1BWF9MRU5HVEgsIE1BWF9TQUZFX0lOVEVHRVIgfSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NvbnN0YW50cycpXG5jb25zdCB7IHJlLCB0IH0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9yZScpXG5cbmNvbnN0IHBhcnNlT3B0aW9ucyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3BhcnNlLW9wdGlvbnMnKVxuY29uc3QgeyBjb21wYXJlSWRlbnRpZmllcnMgfSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lkZW50aWZpZXJzJylcbmNsYXNzIFNlbVZlciB7XG4gIGNvbnN0cnVjdG9yICh2ZXJzaW9uLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHBhcnNlT3B0aW9ucyhvcHRpb25zKVxuXG4gICAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpIHtcbiAgICAgIGlmICh2ZXJzaW9uLmxvb3NlID09PSAhIW9wdGlvbnMubG9vc2UgJiZcbiAgICAgICAgICB2ZXJzaW9uLmluY2x1ZGVQcmVyZWxlYXNlID09PSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpIHtcbiAgICAgICAgcmV0dXJuIHZlcnNpb25cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnZlcnNpb25cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBWZXJzaW9uOiAke3ZlcnNpb259YClcbiAgICB9XG5cbiAgICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICBgdmVyc2lvbiBpcyBsb25nZXIgdGhhbiAke01BWF9MRU5HVEh9IGNoYXJhY3RlcnNgXG4gICAgICApXG4gICAgfVxuXG4gICAgZGVidWcoJ1NlbVZlcicsIHZlcnNpb24sIG9wdGlvbnMpXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMubG9vc2UgPSAhIW9wdGlvbnMubG9vc2VcbiAgICAvLyB0aGlzIGlzbid0IGFjdHVhbGx5IHJlbGV2YW50IGZvciB2ZXJzaW9ucywgYnV0IGtlZXAgaXQgc28gdGhhdCB3ZVxuICAgIC8vIGRvbid0IHJ1biBpbnRvIHRyb3VibGUgcGFzc2luZyB0aGlzLm9wdGlvbnMgYXJvdW5kLlxuICAgIHRoaXMuaW5jbHVkZVByZXJlbGVhc2UgPSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2VcblxuICAgIGNvbnN0IG0gPSB2ZXJzaW9uLnRyaW0oKS5tYXRjaChvcHRpb25zLmxvb3NlID8gcmVbdC5MT09TRV0gOiByZVt0LkZVTExdKVxuXG4gICAgaWYgKCFtKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIFZlcnNpb246ICR7dmVyc2lvbn1gKVxuICAgIH1cblxuICAgIHRoaXMucmF3ID0gdmVyc2lvblxuXG4gICAgLy8gdGhlc2UgYXJlIGFjdHVhbGx5IG51bWJlcnNcbiAgICB0aGlzLm1ham9yID0gK21bMV1cbiAgICB0aGlzLm1pbm9yID0gK21bMl1cbiAgICB0aGlzLnBhdGNoID0gK21bM11cblxuICAgIGlmICh0aGlzLm1ham9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1ham9yIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBtYWpvciB2ZXJzaW9uJylcbiAgICB9XG5cbiAgICBpZiAodGhpcy5taW5vciA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5taW5vciA8IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWlub3IgdmVyc2lvbicpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGF0Y2ggPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMucGF0Y2ggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHBhdGNoIHZlcnNpb24nKVxuICAgIH1cblxuICAgIC8vIG51bWJlcmlmeSBhbnkgcHJlcmVsZWFzZSBudW1lcmljIGlkc1xuICAgIGlmICghbVs0XSkge1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gbVs0XS5zcGxpdCgnLicpLm1hcCgoaWQpID0+IHtcbiAgICAgICAgaWYgKC9eWzAtOV0rJC8udGVzdChpZCkpIHtcbiAgICAgICAgICBjb25zdCBudW0gPSAraWRcbiAgICAgICAgICBpZiAobnVtID49IDAgJiYgbnVtIDwgTUFYX1NBRkVfSU5URUdFUikge1xuICAgICAgICAgICAgcmV0dXJuIG51bVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWRcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5idWlsZCA9IG1bNV0gPyBtWzVdLnNwbGl0KCcuJykgOiBbXVxuICAgIHRoaXMuZm9ybWF0KClcbiAgfVxuXG4gIGZvcm1hdCAoKSB7XG4gICAgdGhpcy52ZXJzaW9uID0gYCR7dGhpcy5tYWpvcn0uJHt0aGlzLm1pbm9yfS4ke3RoaXMucGF0Y2h9YFxuICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICB0aGlzLnZlcnNpb24gKz0gYC0ke3RoaXMucHJlcmVsZWFzZS5qb2luKCcuJyl9YFxuICAgIH1cbiAgICByZXR1cm4gdGhpcy52ZXJzaW9uXG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvblxuICB9XG5cbiAgY29tcGFyZSAob3RoZXIpIHtcbiAgICBkZWJ1ZygnU2VtVmVyLmNvbXBhcmUnLCB0aGlzLnZlcnNpb24sIHRoaXMub3B0aW9ucywgb3RoZXIpXG4gICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgICBpZiAodHlwZW9mIG90aGVyID09PSAnc3RyaW5nJyAmJiBvdGhlciA9PT0gdGhpcy52ZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgICB9XG4gICAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMub3B0aW9ucylcbiAgICB9XG5cbiAgICBpZiAob3RoZXIudmVyc2lvbiA9PT0gdGhpcy52ZXJzaW9uKSB7XG4gICAgICByZXR1cm4gMFxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbXBhcmVNYWluKG90aGVyKSB8fCB0aGlzLmNvbXBhcmVQcmUob3RoZXIpXG4gIH1cblxuICBjb21wYXJlTWFpbiAob3RoZXIpIHtcbiAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5tYWpvciwgb3RoZXIubWFqb3IpIHx8XG4gICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5taW5vciwgb3RoZXIubWlub3IpIHx8XG4gICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5wYXRjaCwgb3RoZXIucGF0Y2gpXG4gICAgKVxuICB9XG5cbiAgY29tcGFyZVByZSAob3RoZXIpIHtcbiAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICAgIH1cblxuICAgIC8vIE5PVCBoYXZpbmcgYSBwcmVyZWxlYXNlIGlzID4gaGF2aW5nIG9uZVxuICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfSBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiBvdGhlci5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIDFcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIDBcbiAgICB9XG5cbiAgICBsZXQgaSA9IDBcbiAgICBkbyB7XG4gICAgICBjb25zdCBhID0gdGhpcy5wcmVyZWxlYXNlW2ldXG4gICAgICBjb25zdCBiID0gb3RoZXIucHJlcmVsZWFzZVtpXVxuICAgICAgZGVidWcoJ3ByZXJlbGVhc2UgY29tcGFyZScsIGksIGEsIGIpXG4gICAgICBpZiAoYSA9PT0gdW5kZWZpbmVkICYmIGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfSBlbHNlIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDFcbiAgICAgIH0gZWxzZSBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfSBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpXG4gICAgICB9XG4gICAgfSB3aGlsZSAoKytpKVxuICB9XG5cbiAgY29tcGFyZUJ1aWxkIChvdGhlcikge1xuICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gICAgfVxuXG4gICAgbGV0IGkgPSAwXG4gICAgZG8ge1xuICAgICAgY29uc3QgYSA9IHRoaXMuYnVpbGRbaV1cbiAgICAgIGNvbnN0IGIgPSBvdGhlci5idWlsZFtpXVxuICAgICAgZGVidWcoJ3ByZXJlbGVhc2UgY29tcGFyZScsIGksIGEsIGIpXG4gICAgICBpZiAoYSA9PT0gdW5kZWZpbmVkICYmIGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfSBlbHNlIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDFcbiAgICAgIH0gZWxzZSBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfSBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpXG4gICAgICB9XG4gICAgfSB3aGlsZSAoKytpKVxuICB9XG5cbiAgLy8gcHJlbWlub3Igd2lsbCBidW1wIHRoZSB2ZXJzaW9uIHVwIHRvIHRoZSBuZXh0IG1pbm9yIHJlbGVhc2UsIGFuZCBpbW1lZGlhdGVseVxuICAvLyBkb3duIHRvIHByZS1yZWxlYXNlLiBwcmVtYWpvciBhbmQgcHJlcGF0Y2ggd29yayB0aGUgc2FtZSB3YXkuXG4gIGluYyAocmVsZWFzZSwgaWRlbnRpZmllcikge1xuICAgIHN3aXRjaCAocmVsZWFzZSkge1xuICAgICAgY2FzZSAncHJlbWFqb3InOlxuICAgICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMFxuICAgICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgICB0aGlzLm1pbm9yID0gMFxuICAgICAgICB0aGlzLm1ham9yKytcbiAgICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdwcmVtaW5vcic6XG4gICAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICAgIHRoaXMubWlub3IrK1xuICAgICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcilcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3ByZXBhdGNoJzpcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhbHJlYWR5IGEgcHJlcmVsZWFzZSwgaXQgd2lsbCBidW1wIHRvIHRoZSBuZXh0IHZlcnNpb25cbiAgICAgICAgLy8gZHJvcCBhbnkgcHJlcmVsZWFzZXMgdGhhdCBtaWdodCBhbHJlYWR5IGV4aXN0LCBzaW5jZSB0aGV5IGFyZSBub3RcbiAgICAgICAgLy8gcmVsZXZhbnQgYXQgdGhpcyBwb2ludC5cbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDBcbiAgICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllcilcbiAgICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpXG4gICAgICAgIGJyZWFrXG4gICAgICAvLyBJZiB0aGUgaW5wdXQgaXMgYSBub24tcHJlcmVsZWFzZSB2ZXJzaW9uLCB0aGlzIGFjdHMgdGhlIHNhbWUgYXNcbiAgICAgIC8vIHByZXBhdGNoLlxuICAgICAgY2FzZSAncHJlcmVsZWFzZSc6XG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllcilcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcilcbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSAnbWFqb3InOlxuICAgICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1ham9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWFqb3IgdmVyc2lvbi5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIGluY3JlbWVudCBtYWpvci5cbiAgICAgICAgLy8gMS4wLjAtNSBidW1wcyB0byAxLjAuMFxuICAgICAgICAvLyAxLjEuMCBidW1wcyB0byAyLjAuMFxuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5taW5vciAhPT0gMCB8fFxuICAgICAgICAgIHRoaXMucGF0Y2ggIT09IDAgfHxcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubWFqb3IrK1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWlub3IgPSAwXG4gICAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdtaW5vcic6XG4gICAgICAgIC8vIElmIHRoaXMgaXMgYSBwcmUtbWlub3IgdmVyc2lvbiwgYnVtcCB1cCB0byB0aGUgc2FtZSBtaW5vciB2ZXJzaW9uLlxuICAgICAgICAvLyBPdGhlcndpc2UgaW5jcmVtZW50IG1pbm9yLlxuICAgICAgICAvLyAxLjIuMC01IGJ1bXBzIHRvIDEuMi4wXG4gICAgICAgIC8vIDEuMi4xIGJ1bXBzIHRvIDEuMy4wXG4gICAgICAgIGlmICh0aGlzLnBhdGNoICE9PSAwIHx8IHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLm1pbm9yKytcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAncGF0Y2gnOlxuICAgICAgICAvLyBJZiB0aGlzIGlzIG5vdCBhIHByZS1yZWxlYXNlIHZlcnNpb24sIGl0IHdpbGwgaW5jcmVtZW50IHRoZSBwYXRjaC5cbiAgICAgICAgLy8gSWYgaXQgaXMgYSBwcmUtcmVsZWFzZSBpdCB3aWxsIGJ1bXAgdXAgdG8gdGhlIHNhbWUgcGF0Y2ggdmVyc2lvbi5cbiAgICAgICAgLy8gMS4yLjAtNSBwYXRjaGVzIHRvIDEuMi4wXG4gICAgICAgIC8vIDEuMi4wIHBhdGNoZXMgdG8gMS4yLjFcbiAgICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLnBhdGNoKytcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICAgICAgICBicmVha1xuICAgICAgLy8gVGhpcyBwcm9iYWJseSBzaG91bGRuJ3QgYmUgdXNlZCBwdWJsaWNseS5cbiAgICAgIC8vIDEuMC4wICdwcmUnIHdvdWxkIGJlY29tZSAxLjAuMC0wIHdoaWNoIGlzIHRoZSB3cm9uZyBkaXJlY3Rpb24uXG4gICAgICBjYXNlICdwcmUnOlxuICAgICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFswXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBpID0gdGhpcy5wcmVyZWxlYXNlLmxlbmd0aFxuICAgICAgICAgIHdoaWxlICgtLWkgPj0gMCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnByZXJlbGVhc2VbaV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZVtpXSsrXG4gICAgICAgICAgICAgIGkgPSAtMlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIGRpZG4ndCBpbmNyZW1lbnQgYW55dGhpbmdcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZS5wdXNoKDApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpZGVudGlmaWVyKSB7XG4gICAgICAgICAgLy8gMS4yLjAtYmV0YS4xIGJ1bXBzIHRvIDEuMi4wLWJldGEuMixcbiAgICAgICAgICAvLyAxLjIuMC1iZXRhLmZvb2JseiBvciAxLjIuMC1iZXRhIGJ1bXBzIHRvIDEuMi4wLWJldGEuMFxuICAgICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2VbMF0gPT09IGlkZW50aWZpZXIpIHtcbiAgICAgICAgICAgIGlmIChpc05hTih0aGlzLnByZXJlbGVhc2VbMV0pKSB7XG4gICAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCAwXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbaWRlbnRpZmllciwgMF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBpbnZhbGlkIGluY3JlbWVudCBhcmd1bWVudDogJHtyZWxlYXNlfWApXG4gICAgfVxuICAgIHRoaXMuZm9ybWF0KClcbiAgICB0aGlzLnJhdyA9IHRoaXMudmVyc2lvblxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZW1WZXJcbiIsImNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpXG5jb25zdCBjbGVhbiA9ICh2ZXJzaW9uLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHMgPSBwYXJzZSh2ZXJzaW9uLnRyaW0oKS5yZXBsYWNlKC9eWz12XSsvLCAnJyksIG9wdGlvbnMpXG4gIHJldHVybiBzID8gcy52ZXJzaW9uIDogbnVsbFxufVxubW9kdWxlLmV4cG9ydHMgPSBjbGVhblxuIiwiY29uc3QgZXEgPSByZXF1aXJlKCcuL2VxJylcbmNvbnN0IG5lcSA9IHJlcXVpcmUoJy4vbmVxJylcbmNvbnN0IGd0ID0gcmVxdWlyZSgnLi9ndCcpXG5jb25zdCBndGUgPSByZXF1aXJlKCcuL2d0ZScpXG5jb25zdCBsdCA9IHJlcXVpcmUoJy4vbHQnKVxuY29uc3QgbHRlID0gcmVxdWlyZSgnLi9sdGUnKVxuXG5jb25zdCBjbXAgPSAoYSwgb3AsIGIsIGxvb3NlKSA9PiB7XG4gIHN3aXRjaCAob3ApIHtcbiAgICBjYXNlICc9PT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JylcbiAgICAgICAgYSA9IGEudmVyc2lvblxuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0JylcbiAgICAgICAgYiA9IGIudmVyc2lvblxuICAgICAgcmV0dXJuIGEgPT09IGJcblxuICAgIGNhc2UgJyE9PSc6XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKVxuICAgICAgICBhID0gYS52ZXJzaW9uXG4gICAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKVxuICAgICAgICBiID0gYi52ZXJzaW9uXG4gICAgICByZXR1cm4gYSAhPT0gYlxuXG4gICAgY2FzZSAnJzpcbiAgICBjYXNlICc9JzpcbiAgICBjYXNlICc9PSc6XG4gICAgICByZXR1cm4gZXEoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICchPSc6XG4gICAgICByZXR1cm4gbmVxKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPic6XG4gICAgICByZXR1cm4gZ3QoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc+PSc6XG4gICAgICByZXR1cm4gZ3RlKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPCc6XG4gICAgICByZXR1cm4gbHQoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc8PSc6XG4gICAgICByZXR1cm4gbHRlKGEsIGIsIGxvb3NlKVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgb3BlcmF0b3I6ICR7b3B9YClcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBjbXBcbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpXG5jb25zdCB7cmUsIHR9ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcmUnKVxuXG5jb25zdCBjb2VyY2UgPSAodmVyc2lvbiwgb3B0aW9ucykgPT4ge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIHJldHVybiB2ZXJzaW9uXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdudW1iZXInKSB7XG4gICAgdmVyc2lvbiA9IFN0cmluZyh2ZXJzaW9uKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIGxldCBtYXRjaCA9IG51bGxcbiAgaWYgKCFvcHRpb25zLnJ0bCkge1xuICAgIG1hdGNoID0gdmVyc2lvbi5tYXRjaChyZVt0LkNPRVJDRV0pXG4gIH0gZWxzZSB7XG4gICAgLy8gRmluZCB0aGUgcmlnaHQtbW9zdCBjb2VyY2libGUgc3RyaW5nIHRoYXQgZG9lcyBub3Qgc2hhcmVcbiAgICAvLyBhIHRlcm1pbnVzIHdpdGggYSBtb3JlIGxlZnQtd2FyZCBjb2VyY2libGUgc3RyaW5nLlxuICAgIC8vIEVnLCAnMS4yLjMuNCcgd2FudHMgdG8gY29lcmNlICcyLjMuNCcsIG5vdCAnMy40JyBvciAnNCdcbiAgICAvL1xuICAgIC8vIFdhbGsgdGhyb3VnaCB0aGUgc3RyaW5nIGNoZWNraW5nIHdpdGggYSAvZyByZWdleHBcbiAgICAvLyBNYW51YWxseSBzZXQgdGhlIGluZGV4IHNvIGFzIHRvIHBpY2sgdXAgb3ZlcmxhcHBpbmcgbWF0Y2hlcy5cbiAgICAvLyBTdG9wIHdoZW4gd2UgZ2V0IGEgbWF0Y2ggdGhhdCBlbmRzIGF0IHRoZSBzdHJpbmcgZW5kLCBzaW5jZSBub1xuICAgIC8vIGNvZXJjaWJsZSBzdHJpbmcgY2FuIGJlIG1vcmUgcmlnaHQtd2FyZCB3aXRob3V0IHRoZSBzYW1lIHRlcm1pbnVzLlxuICAgIGxldCBuZXh0XG4gICAgd2hpbGUgKChuZXh0ID0gcmVbdC5DT0VSQ0VSVExdLmV4ZWModmVyc2lvbikpICYmXG4gICAgICAgICghbWF0Y2ggfHwgbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggIT09IHZlcnNpb24ubGVuZ3RoKVxuICAgICkge1xuICAgICAgaWYgKCFtYXRjaCB8fFxuICAgICAgICAgICAgbmV4dC5pbmRleCArIG5leHRbMF0ubGVuZ3RoICE9PSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCkge1xuICAgICAgICBtYXRjaCA9IG5leHRcbiAgICAgIH1cbiAgICAgIHJlW3QuQ09FUkNFUlRMXS5sYXN0SW5kZXggPSBuZXh0LmluZGV4ICsgbmV4dFsxXS5sZW5ndGggKyBuZXh0WzJdLmxlbmd0aFxuICAgIH1cbiAgICAvLyBsZWF2ZSBpdCBpbiBhIGNsZWFuIHN0YXRlXG4gICAgcmVbdC5DT0VSQ0VSVExdLmxhc3RJbmRleCA9IC0xXG4gIH1cblxuICBpZiAobWF0Y2ggPT09IG51bGwpXG4gICAgcmV0dXJuIG51bGxcblxuICByZXR1cm4gcGFyc2UoYCR7bWF0Y2hbMl19LiR7bWF0Y2hbM10gfHwgJzAnfS4ke21hdGNoWzRdIHx8ICcwJ31gLCBvcHRpb25zKVxufVxubW9kdWxlLmV4cG9ydHMgPSBjb2VyY2VcbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IGNvbXBhcmVCdWlsZCA9IChhLCBiLCBsb29zZSkgPT4ge1xuICBjb25zdCB2ZXJzaW9uQSA9IG5ldyBTZW1WZXIoYSwgbG9vc2UpXG4gIGNvbnN0IHZlcnNpb25CID0gbmV3IFNlbVZlcihiLCBsb29zZSlcbiAgcmV0dXJuIHZlcnNpb25BLmNvbXBhcmUodmVyc2lvbkIpIHx8IHZlcnNpb25BLmNvbXBhcmVCdWlsZCh2ZXJzaW9uQilcbn1cbm1vZHVsZS5leHBvcnRzID0gY29tcGFyZUJ1aWxkXG4iLCJjb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi9jb21wYXJlJylcbmNvbnN0IGNvbXBhcmVMb29zZSA9IChhLCBiKSA9PiBjb21wYXJlKGEsIGIsIHRydWUpXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBhcmVMb29zZVxuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgY29tcGFyZSA9IChhLCBiLCBsb29zZSkgPT5cbiAgbmV3IFNlbVZlcihhLCBsb29zZSkuY29tcGFyZShuZXcgU2VtVmVyKGIsIGxvb3NlKSlcblxubW9kdWxlLmV4cG9ydHMgPSBjb21wYXJlXG4iLCJjb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKVxuY29uc3QgZXEgPSByZXF1aXJlKCcuL2VxJylcblxuY29uc3QgZGlmZiA9ICh2ZXJzaW9uMSwgdmVyc2lvbjIpID0+IHtcbiAgaWYgKGVxKHZlcnNpb24xLCB2ZXJzaW9uMikpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHYxID0gcGFyc2UodmVyc2lvbjEpXG4gICAgY29uc3QgdjIgPSBwYXJzZSh2ZXJzaW9uMilcbiAgICBjb25zdCBoYXNQcmUgPSB2MS5wcmVyZWxlYXNlLmxlbmd0aCB8fCB2Mi5wcmVyZWxlYXNlLmxlbmd0aFxuICAgIGNvbnN0IHByZWZpeCA9IGhhc1ByZSA/ICdwcmUnIDogJydcbiAgICBjb25zdCBkZWZhdWx0UmVzdWx0ID0gaGFzUHJlID8gJ3ByZXJlbGVhc2UnIDogJydcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB2MSkge1xuICAgICAgaWYgKGtleSA9PT0gJ21ham9yJyB8fCBrZXkgPT09ICdtaW5vcicgfHwga2V5ID09PSAncGF0Y2gnKSB7XG4gICAgICAgIGlmICh2MVtrZXldICE9PSB2MltrZXldKSB7XG4gICAgICAgICAgcmV0dXJuIHByZWZpeCArIGtleVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0UmVzdWx0IC8vIG1heSBiZSB1bmRlZmluZWRcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBkaWZmXG4iLCJjb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi9jb21wYXJlJylcbmNvbnN0IGVxID0gKGEsIGIsIGxvb3NlKSA9PiBjb21wYXJlKGEsIGIsIGxvb3NlKSA9PT0gMFxubW9kdWxlLmV4cG9ydHMgPSBlcVxuIiwiY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBndCA9IChhLCBiLCBsb29zZSkgPT4gY29tcGFyZShhLCBiLCBsb29zZSkgPiAwXG5tb2R1bGUuZXhwb3J0cyA9IGd0XG4iLCJjb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi9jb21wYXJlJylcbmNvbnN0IGd0ZSA9IChhLCBiLCBsb29zZSkgPT4gY29tcGFyZShhLCBiLCBsb29zZSkgPj0gMFxubW9kdWxlLmV4cG9ydHMgPSBndGVcbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcblxuY29uc3QgaW5jID0gKHZlcnNpb24sIHJlbGVhc2UsIG9wdGlvbnMsIGlkZW50aWZpZXIpID0+IHtcbiAgaWYgKHR5cGVvZiAob3B0aW9ucykgPT09ICdzdHJpbmcnKSB7XG4gICAgaWRlbnRpZmllciA9IG9wdGlvbnNcbiAgICBvcHRpb25zID0gdW5kZWZpbmVkXG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIG9wdGlvbnMpLmluYyhyZWxlYXNlLCBpZGVudGlmaWVyKS52ZXJzaW9uXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBpbmNcbiIsImNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgbHQgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpIDwgMFxubW9kdWxlLmV4cG9ydHMgPSBsdFxuIiwiY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBsdGUgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpIDw9IDBcbm1vZHVsZS5leHBvcnRzID0gbHRlXG4iLCJjb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBtYWpvciA9IChhLCBsb29zZSkgPT4gbmV3IFNlbVZlcihhLCBsb29zZSkubWFqb3Jcbm1vZHVsZS5leHBvcnRzID0gbWFqb3JcbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IG1pbm9yID0gKGEsIGxvb3NlKSA9PiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5taW5vclxubW9kdWxlLmV4cG9ydHMgPSBtaW5vclxuIiwiY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBuZXEgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpICE9PSAwXG5tb2R1bGUuZXhwb3J0cyA9IG5lcVxuIiwiY29uc3Qge01BWF9MRU5HVEh9ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY29uc3RhbnRzJylcbmNvbnN0IHsgcmUsIHQgfSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3JlJylcbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcblxuY29uc3QgcGFyc2VPcHRpb25zID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcGFyc2Utb3B0aW9ucycpXG5jb25zdCBwYXJzZSA9ICh2ZXJzaW9uLCBvcHRpb25zKSA9PiB7XG4gIG9wdGlvbnMgPSBwYXJzZU9wdGlvbnMob3B0aW9ucylcblxuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIHJldHVybiB2ZXJzaW9uXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGlmICh2ZXJzaW9uLmxlbmd0aCA+IE1BWF9MRU5HVEgpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY29uc3QgciA9IG9wdGlvbnMubG9vc2UgPyByZVt0LkxPT1NFXSA6IHJlW3QuRlVMTF1cbiAgaWYgKCFyLnRlc3QodmVyc2lvbikpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVxuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgcGF0Y2ggPSAoYSwgbG9vc2UpID0+IG5ldyBTZW1WZXIoYSwgbG9vc2UpLnBhdGNoXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoXG4iLCJjb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKVxuY29uc3QgcHJlcmVsZWFzZSA9ICh2ZXJzaW9uLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlKHZlcnNpb24sIG9wdGlvbnMpXG4gIHJldHVybiAocGFyc2VkICYmIHBhcnNlZC5wcmVyZWxlYXNlLmxlbmd0aCkgPyBwYXJzZWQucHJlcmVsZWFzZSA6IG51bGxcbn1cbm1vZHVsZS5leHBvcnRzID0gcHJlcmVsZWFzZVxuIiwiY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCByY29tcGFyZSA9IChhLCBiLCBsb29zZSkgPT4gY29tcGFyZShiLCBhLCBsb29zZSlcbm1vZHVsZS5leHBvcnRzID0gcmNvbXBhcmVcbiIsImNvbnN0IGNvbXBhcmVCdWlsZCA9IHJlcXVpcmUoJy4vY29tcGFyZS1idWlsZCcpXG5jb25zdCByc29ydCA9IChsaXN0LCBsb29zZSkgPT4gbGlzdC5zb3J0KChhLCBiKSA9PiBjb21wYXJlQnVpbGQoYiwgYSwgbG9vc2UpKVxubW9kdWxlLmV4cG9ydHMgPSByc29ydFxuIiwiY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlJylcbmNvbnN0IHNhdGlzZmllcyA9ICh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykgPT4ge1xuICB0cnkge1xuICAgIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiByYW5nZS50ZXN0KHZlcnNpb24pXG59XG5tb2R1bGUuZXhwb3J0cyA9IHNhdGlzZmllc1xuIiwiY29uc3QgY29tcGFyZUJ1aWxkID0gcmVxdWlyZSgnLi9jb21wYXJlLWJ1aWxkJylcbmNvbnN0IHNvcnQgPSAobGlzdCwgbG9vc2UpID0+IGxpc3Quc29ydCgoYSwgYikgPT4gY29tcGFyZUJ1aWxkKGEsIGIsIGxvb3NlKSlcbm1vZHVsZS5leHBvcnRzID0gc29ydFxuIiwiY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmNvbnN0IHZhbGlkID0gKHZlcnNpb24sIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgdiA9IHBhcnNlKHZlcnNpb24sIG9wdGlvbnMpXG4gIHJldHVybiB2ID8gdi52ZXJzaW9uIDogbnVsbFxufVxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZFxuIiwiLy8ganVzdCBwcmUtbG9hZCBhbGwgdGhlIHN0dWZmIHRoYXQgaW5kZXguanMgbGF6aWx5IGV4cG9ydHNcbmNvbnN0IGludGVybmFsUmUgPSByZXF1aXJlKCcuL2ludGVybmFsL3JlJylcbm1vZHVsZS5leHBvcnRzID0ge1xuICByZTogaW50ZXJuYWxSZS5yZSxcbiAgc3JjOiBpbnRlcm5hbFJlLnNyYyxcbiAgdG9rZW5zOiBpbnRlcm5hbFJlLnQsXG4gIFNFTVZFUl9TUEVDX1ZFUlNJT046IHJlcXVpcmUoJy4vaW50ZXJuYWwvY29uc3RhbnRzJykuU0VNVkVSX1NQRUNfVkVSU0lPTixcbiAgU2VtVmVyOiByZXF1aXJlKCcuL2NsYXNzZXMvc2VtdmVyJyksXG4gIGNvbXBhcmVJZGVudGlmaWVyczogcmVxdWlyZSgnLi9pbnRlcm5hbC9pZGVudGlmaWVycycpLmNvbXBhcmVJZGVudGlmaWVycyxcbiAgcmNvbXBhcmVJZGVudGlmaWVyczogcmVxdWlyZSgnLi9pbnRlcm5hbC9pZGVudGlmaWVycycpLnJjb21wYXJlSWRlbnRpZmllcnMsXG4gIHBhcnNlOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9wYXJzZScpLFxuICB2YWxpZDogcmVxdWlyZSgnLi9mdW5jdGlvbnMvdmFsaWQnKSxcbiAgY2xlYW46IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2NsZWFuJyksXG4gIGluYzogcmVxdWlyZSgnLi9mdW5jdGlvbnMvaW5jJyksXG4gIGRpZmY6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2RpZmYnKSxcbiAgbWFqb3I6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL21ham9yJyksXG4gIG1pbm9yOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9taW5vcicpLFxuICBwYXRjaDogcmVxdWlyZSgnLi9mdW5jdGlvbnMvcGF0Y2gnKSxcbiAgcHJlcmVsZWFzZTogcmVxdWlyZSgnLi9mdW5jdGlvbnMvcHJlcmVsZWFzZScpLFxuICBjb21wYXJlOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9jb21wYXJlJyksXG4gIHJjb21wYXJlOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9yY29tcGFyZScpLFxuICBjb21wYXJlTG9vc2U6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2NvbXBhcmUtbG9vc2UnKSxcbiAgY29tcGFyZUJ1aWxkOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9jb21wYXJlLWJ1aWxkJyksXG4gIHNvcnQ6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3NvcnQnKSxcbiAgcnNvcnQ6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3Jzb3J0JyksXG4gIGd0OiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9ndCcpLFxuICBsdDogcmVxdWlyZSgnLi9mdW5jdGlvbnMvbHQnKSxcbiAgZXE6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2VxJyksXG4gIG5lcTogcmVxdWlyZSgnLi9mdW5jdGlvbnMvbmVxJyksXG4gIGd0ZTogcmVxdWlyZSgnLi9mdW5jdGlvbnMvZ3RlJyksXG4gIGx0ZTogcmVxdWlyZSgnLi9mdW5jdGlvbnMvbHRlJyksXG4gIGNtcDogcmVxdWlyZSgnLi9mdW5jdGlvbnMvY21wJyksXG4gIGNvZXJjZTogcmVxdWlyZSgnLi9mdW5jdGlvbnMvY29lcmNlJyksXG4gIENvbXBhcmF0b3I6IHJlcXVpcmUoJy4vY2xhc3Nlcy9jb21wYXJhdG9yJyksXG4gIFJhbmdlOiByZXF1aXJlKCcuL2NsYXNzZXMvcmFuZ2UnKSxcbiAgc2F0aXNmaWVzOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9zYXRpc2ZpZXMnKSxcbiAgdG9Db21wYXJhdG9yczogcmVxdWlyZSgnLi9yYW5nZXMvdG8tY29tcGFyYXRvcnMnKSxcbiAgbWF4U2F0aXNmeWluZzogcmVxdWlyZSgnLi9yYW5nZXMvbWF4LXNhdGlzZnlpbmcnKSxcbiAgbWluU2F0aXNmeWluZzogcmVxdWlyZSgnLi9yYW5nZXMvbWluLXNhdGlzZnlpbmcnKSxcbiAgbWluVmVyc2lvbjogcmVxdWlyZSgnLi9yYW5nZXMvbWluLXZlcnNpb24nKSxcbiAgdmFsaWRSYW5nZTogcmVxdWlyZSgnLi9yYW5nZXMvdmFsaWQnKSxcbiAgb3V0c2lkZTogcmVxdWlyZSgnLi9yYW5nZXMvb3V0c2lkZScpLFxuICBndHI6IHJlcXVpcmUoJy4vcmFuZ2VzL2d0cicpLFxuICBsdHI6IHJlcXVpcmUoJy4vcmFuZ2VzL2x0cicpLFxuICBpbnRlcnNlY3RzOiByZXF1aXJlKCcuL3Jhbmdlcy9pbnRlcnNlY3RzJyksXG4gIHNpbXBsaWZ5UmFuZ2U6IHJlcXVpcmUoJy4vcmFuZ2VzL3NpbXBsaWZ5JyksXG4gIHN1YnNldDogcmVxdWlyZSgnLi9yYW5nZXMvc3Vic2V0JyksXG59XG4iLCIvLyBOb3RlOiB0aGlzIGlzIHRoZSBzZW12ZXIub3JnIHZlcnNpb24gb2YgdGhlIHNwZWMgdGhhdCBpdCBpbXBsZW1lbnRzXG4vLyBOb3QgbmVjZXNzYXJpbHkgdGhlIHBhY2thZ2UgdmVyc2lvbiBvZiB0aGlzIGNvZGUuXG5jb25zdCBTRU1WRVJfU1BFQ19WRVJTSU9OID0gJzIuMC4wJ1xuXG5jb25zdCBNQVhfTEVOR1RIID0gMjU2XG5jb25zdCBNQVhfU0FGRV9JTlRFR0VSID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHxcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gOTAwNzE5OTI1NDc0MDk5MVxuXG4vLyBNYXggc2FmZSBzZWdtZW50IGxlbmd0aCBmb3IgY29lcmNpb24uXG5jb25zdCBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIID0gMTZcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNFTVZFUl9TUEVDX1ZFUlNJT04sXG4gIE1BWF9MRU5HVEgsXG4gIE1BWF9TQUZFX0lOVEVHRVIsXG4gIE1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEhcbn1cbiIsImNvbnN0IGRlYnVnID0gKFxuICB0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiZcbiAgcHJvY2Vzcy5lbnYgJiZcbiAgcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyAmJlxuICAvXFxic2VtdmVyXFxiL2kudGVzdChwcm9jZXNzLmVudi5OT0RFX0RFQlVHKVxuKSA/ICguLi5hcmdzKSA9PiBjb25zb2xlLmVycm9yKCdTRU1WRVInLCAuLi5hcmdzKVxuICA6ICgpID0+IHt9XG5cbm1vZHVsZS5leHBvcnRzID0gZGVidWdcbiIsImNvbnN0IG51bWVyaWMgPSAvXlswLTldKyQvXG5jb25zdCBjb21wYXJlSWRlbnRpZmllcnMgPSAoYSwgYikgPT4ge1xuICBjb25zdCBhbnVtID0gbnVtZXJpYy50ZXN0KGEpXG4gIGNvbnN0IGJudW0gPSBudW1lcmljLnRlc3QoYilcblxuICBpZiAoYW51bSAmJiBibnVtKSB7XG4gICAgYSA9ICthXG4gICAgYiA9ICtiXG4gIH1cblxuICByZXR1cm4gYSA9PT0gYiA/IDBcbiAgICA6IChhbnVtICYmICFibnVtKSA/IC0xXG4gICAgOiAoYm51bSAmJiAhYW51bSkgPyAxXG4gICAgOiBhIDwgYiA/IC0xXG4gICAgOiAxXG59XG5cbmNvbnN0IHJjb21wYXJlSWRlbnRpZmllcnMgPSAoYSwgYikgPT4gY29tcGFyZUlkZW50aWZpZXJzKGIsIGEpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb21wYXJlSWRlbnRpZmllcnMsXG4gIHJjb21wYXJlSWRlbnRpZmllcnNcbn1cbiIsIi8vIHBhcnNlIG91dCBqdXN0IHRoZSBvcHRpb25zIHdlIGNhcmUgYWJvdXQgc28gd2UgYWx3YXlzIGdldCBhIGNvbnNpc3RlbnRcbi8vIG9iaiB3aXRoIGtleXMgaW4gYSBjb25zaXN0ZW50IG9yZGVyLlxuY29uc3Qgb3B0cyA9IFsnaW5jbHVkZVByZXJlbGVhc2UnLCAnbG9vc2UnLCAncnRsJ11cbmNvbnN0IHBhcnNlT3B0aW9ucyA9IG9wdGlvbnMgPT5cbiAgIW9wdGlvbnMgPyB7fVxuICA6IHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0JyA/IHsgbG9vc2U6IHRydWUgfVxuICA6IG9wdHMuZmlsdGVyKGsgPT4gb3B0aW9uc1trXSkucmVkdWNlKChvcHRpb25zLCBrKSA9PiB7XG4gICAgb3B0aW9uc1trXSA9IHRydWVcbiAgICByZXR1cm4gb3B0aW9uc1xuICB9LCB7fSlcbm1vZHVsZS5leHBvcnRzID0gcGFyc2VPcHRpb25zXG4iLCJjb25zdCB7IE1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEggfSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJylcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnLi9kZWJ1ZycpXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB7fVxuXG4vLyBUaGUgYWN0dWFsIHJlZ2V4cHMgZ28gb24gZXhwb3J0cy5yZVxuY29uc3QgcmUgPSBleHBvcnRzLnJlID0gW11cbmNvbnN0IHNyYyA9IGV4cG9ydHMuc3JjID0gW11cbmNvbnN0IHQgPSBleHBvcnRzLnQgPSB7fVxubGV0IFIgPSAwXG5cbmNvbnN0IGNyZWF0ZVRva2VuID0gKG5hbWUsIHZhbHVlLCBpc0dsb2JhbCkgPT4ge1xuICBjb25zdCBpbmRleCA9IFIrK1xuICBkZWJ1ZyhpbmRleCwgdmFsdWUpXG4gIHRbbmFtZV0gPSBpbmRleFxuICBzcmNbaW5kZXhdID0gdmFsdWVcbiAgcmVbaW5kZXhdID0gbmV3IFJlZ0V4cCh2YWx1ZSwgaXNHbG9iYWwgPyAnZycgOiB1bmRlZmluZWQpXG59XG5cbi8vIFRoZSBmb2xsb3dpbmcgUmVndWxhciBFeHByZXNzaW9ucyBjYW4gYmUgdXNlZCBmb3IgdG9rZW5pemluZyxcbi8vIHZhbGlkYXRpbmcsIGFuZCBwYXJzaW5nIFNlbVZlciB2ZXJzaW9uIHN0cmluZ3MuXG5cbi8vICMjIE51bWVyaWMgSWRlbnRpZmllclxuLy8gQSBzaW5nbGUgYDBgLCBvciBhIG5vbi16ZXJvIGRpZ2l0IGZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBkaWdpdHMuXG5cbmNyZWF0ZVRva2VuKCdOVU1FUklDSURFTlRJRklFUicsICcwfFsxLTldXFxcXGQqJylcbmNyZWF0ZVRva2VuKCdOVU1FUklDSURFTlRJRklFUkxPT1NFJywgJ1swLTldKycpXG5cbi8vICMjIE5vbi1udW1lcmljIElkZW50aWZpZXJcbi8vIFplcm8gb3IgbW9yZSBkaWdpdHMsIGZvbGxvd2VkIGJ5IGEgbGV0dGVyIG9yIGh5cGhlbiwgYW5kIHRoZW4gemVybyBvclxuLy8gbW9yZSBsZXR0ZXJzLCBkaWdpdHMsIG9yIGh5cGhlbnMuXG5cbmNyZWF0ZVRva2VuKCdOT05OVU1FUklDSURFTlRJRklFUicsICdcXFxcZCpbYS16QS1aLV1bYS16QS1aMC05LV0qJylcblxuLy8gIyMgTWFpbiBWZXJzaW9uXG4vLyBUaHJlZSBkb3Qtc2VwYXJhdGVkIG51bWVyaWMgaWRlbnRpZmllcnMuXG5cbmNyZWF0ZVRva2VuKCdNQUlOVkVSU0lPTicsIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUl19KVxcXFwuYCArXG4gICAgICAgICAgICAgICAgICAgYCgke3NyY1t0Lk5VTUVSSUNJREVOVElGSUVSXX0pXFxcXC5gICtcbiAgICAgICAgICAgICAgICAgICBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJdfSlgKVxuXG5jcmVhdGVUb2tlbignTUFJTlZFUlNJT05MT09TRScsIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUkxPT1NFXX0pXFxcXC5gICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUkxPT1NFXX0pXFxcXC5gICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUkxPT1NFXX0pYClcblxuLy8gIyMgUHJlLXJlbGVhc2UgVmVyc2lvbiBJZGVudGlmaWVyXG4vLyBBIG51bWVyaWMgaWRlbnRpZmllciwgb3IgYSBub24tbnVtZXJpYyBpZGVudGlmaWVyLlxuXG5jcmVhdGVUb2tlbignUFJFUkVMRUFTRUlERU5USUZJRVInLCBgKD86JHtzcmNbdC5OVU1FUklDSURFTlRJRklFUl1cbn18JHtzcmNbdC5OT05OVU1FUklDSURFTlRJRklFUl19KWApXG5cbmNyZWF0ZVRva2VuKCdQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFJywgYCg/OiR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV1cbn18JHtzcmNbdC5OT05OVU1FUklDSURFTlRJRklFUl19KWApXG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb25cbi8vIEh5cGhlbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgZG90LXNlcGFyYXRlZCBwcmUtcmVsZWFzZSB2ZXJzaW9uXG4vLyBpZGVudGlmaWVycy5cblxuY3JlYXRlVG9rZW4oJ1BSRVJFTEVBU0UnLCBgKD86LSgke3NyY1t0LlBSRVJFTEVBU0VJREVOVElGSUVSXVxufSg/OlxcXFwuJHtzcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUl19KSopKWApXG5cbmNyZWF0ZVRva2VuKCdQUkVSRUxFQVNFTE9PU0UnLCBgKD86LT8oJHtzcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXVxufSg/OlxcXFwuJHtzcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXX0pKikpYClcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGEgSWRlbnRpZmllclxuLy8gQW55IGNvbWJpbmF0aW9uIG9mIGRpZ2l0cywgbGV0dGVycywgb3IgaHlwaGVucy5cblxuY3JlYXRlVG9rZW4oJ0JVSUxESURFTlRJRklFUicsICdbMC05QS1aYS16LV0rJylcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGFcbi8vIFBsdXMgc2lnbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgcGVyaW9kLXNlcGFyYXRlZCBidWlsZCBtZXRhZGF0YVxuLy8gaWRlbnRpZmllcnMuXG5cbmNyZWF0ZVRva2VuKCdCVUlMRCcsIGAoPzpcXFxcKygke3NyY1t0LkJVSUxESURFTlRJRklFUl1cbn0oPzpcXFxcLiR7c3JjW3QuQlVJTERJREVOVElGSUVSXX0pKikpYClcblxuLy8gIyMgRnVsbCBWZXJzaW9uIFN0cmluZ1xuLy8gQSBtYWluIHZlcnNpb24sIGZvbGxvd2VkIG9wdGlvbmFsbHkgYnkgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uIGFuZFxuLy8gYnVpbGQgbWV0YWRhdGEuXG5cbi8vIE5vdGUgdGhhdCB0aGUgb25seSBtYWpvciwgbWlub3IsIHBhdGNoLCBhbmQgcHJlLXJlbGVhc2Ugc2VjdGlvbnMgb2Zcbi8vIHRoZSB2ZXJzaW9uIHN0cmluZyBhcmUgY2FwdHVyaW5nIGdyb3Vwcy4gIFRoZSBidWlsZCBtZXRhZGF0YSBpcyBub3QgYVxuLy8gY2FwdHVyaW5nIGdyb3VwLCBiZWNhdXNlIGl0IHNob3VsZCBub3QgZXZlciBiZSB1c2VkIGluIHZlcnNpb25cbi8vIGNvbXBhcmlzb24uXG5cbmNyZWF0ZVRva2VuKCdGVUxMUExBSU4nLCBgdj8ke3NyY1t0Lk1BSU5WRVJTSU9OXVxufSR7c3JjW3QuUFJFUkVMRUFTRV19PyR7XG4gIHNyY1t0LkJVSUxEXX0/YClcblxuY3JlYXRlVG9rZW4oJ0ZVTEwnLCBgXiR7c3JjW3QuRlVMTFBMQUlOXX0kYClcblxuLy8gbGlrZSBmdWxsLCBidXQgYWxsb3dzIHYxLjIuMyBhbmQgPTEuMi4zLCB3aGljaCBwZW9wbGUgZG8gc29tZXRpbWVzLlxuLy8gYWxzbywgMS4wLjBhbHBoYTEgKHByZXJlbGVhc2Ugd2l0aG91dCB0aGUgaHlwaGVuKSB3aGljaCBpcyBwcmV0dHlcbi8vIGNvbW1vbiBpbiB0aGUgbnBtIHJlZ2lzdHJ5LlxuY3JlYXRlVG9rZW4oJ0xPT1NFUExBSU4nLCBgW3Y9XFxcXHNdKiR7c3JjW3QuTUFJTlZFUlNJT05MT09TRV1cbn0ke3NyY1t0LlBSRVJFTEVBU0VMT09TRV19PyR7XG4gIHNyY1t0LkJVSUxEXX0/YClcblxuY3JlYXRlVG9rZW4oJ0xPT1NFJywgYF4ke3NyY1t0LkxPT1NFUExBSU5dfSRgKVxuXG5jcmVhdGVUb2tlbignR1RMVCcsICcoKD86PHw+KT89PyknKVxuXG4vLyBTb21ldGhpbmcgbGlrZSBcIjIuKlwiIG9yIFwiMS4yLnhcIi5cbi8vIE5vdGUgdGhhdCBcIngueFwiIGlzIGEgdmFsaWQgeFJhbmdlIGlkZW50aWZlciwgbWVhbmluZyBcImFueSB2ZXJzaW9uXCJcbi8vIE9ubHkgdGhlIGZpcnN0IGl0ZW0gaXMgc3RyaWN0bHkgcmVxdWlyZWQuXG5jcmVhdGVUb2tlbignWFJBTkdFSURFTlRJRklFUkxPT1NFJywgYCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV19fHh8WHxcXFxcKmApXG5jcmVhdGVUb2tlbignWFJBTkdFSURFTlRJRklFUicsIGAke3NyY1t0Lk5VTUVSSUNJREVOVElGSUVSXX18eHxYfFxcXFwqYClcblxuY3JlYXRlVG9rZW4oJ1hSQU5HRVBMQUlOJywgYFt2PVxcXFxzXSooJHtzcmNbdC5YUkFOR0VJREVOVElGSUVSXX0pYCArXG4gICAgICAgICAgICAgICAgICAgYCg/OlxcXFwuKCR7c3JjW3QuWFJBTkdFSURFTlRJRklFUl19KWAgK1xuICAgICAgICAgICAgICAgICAgIGAoPzpcXFxcLigke3NyY1t0LlhSQU5HRUlERU5USUZJRVJdfSlgICtcbiAgICAgICAgICAgICAgICAgICBgKD86JHtzcmNbdC5QUkVSRUxFQVNFXX0pPyR7XG4gICAgICAgICAgICAgICAgICAgICBzcmNbdC5CVUlMRF19P2AgK1xuICAgICAgICAgICAgICAgICAgIGApPyk/YClcblxuY3JlYXRlVG9rZW4oJ1hSQU5HRVBMQUlOTE9PU0UnLCBgW3Y9XFxcXHNdKigke3NyY1t0LlhSQU5HRUlERU5USUZJRVJMT09TRV19KWAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYCg/OlxcXFwuKCR7c3JjW3QuWFJBTkdFSURFTlRJRklFUkxPT1NFXX0pYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKD86XFxcXC4oJHtzcmNbdC5YUkFOR0VJREVOVElGSUVSTE9PU0VdfSlgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoPzoke3NyY1t0LlBSRVJFTEVBU0VMT09TRV19KT8ke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzcmNbdC5CVUlMRF19P2AgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYCk/KT9gKVxuXG5jcmVhdGVUb2tlbignWFJBTkdFJywgYF4ke3NyY1t0LkdUTFRdfVxcXFxzKiR7c3JjW3QuWFJBTkdFUExBSU5dfSRgKVxuY3JlYXRlVG9rZW4oJ1hSQU5HRUxPT1NFJywgYF4ke3NyY1t0LkdUTFRdfVxcXFxzKiR7c3JjW3QuWFJBTkdFUExBSU5MT09TRV19JGApXG5cbi8vIENvZXJjaW9uLlxuLy8gRXh0cmFjdCBhbnl0aGluZyB0aGF0IGNvdWxkIGNvbmNlaXZhYmx5IGJlIGEgcGFydCBvZiBhIHZhbGlkIHNlbXZlclxuY3JlYXRlVG9rZW4oJ0NPRVJDRScsIGAkeycoXnxbXlxcXFxkXSknICtcbiAgICAgICAgICAgICAgJyhcXFxcZHsxLCd9JHtNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIfX0pYCArXG4gICAgICAgICAgICAgIGAoPzpcXFxcLihcXFxcZHsxLCR7TUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSH19KSk/YCArXG4gICAgICAgICAgICAgIGAoPzpcXFxcLihcXFxcZHsxLCR7TUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSH19KSk/YCArXG4gICAgICAgICAgICAgIGAoPzokfFteXFxcXGRdKWApXG5jcmVhdGVUb2tlbignQ09FUkNFUlRMJywgc3JjW3QuQ09FUkNFXSwgdHJ1ZSlcblxuLy8gVGlsZGUgcmFuZ2VzLlxuLy8gTWVhbmluZyBpcyBcInJlYXNvbmFibHkgYXQgb3IgZ3JlYXRlciB0aGFuXCJcbmNyZWF0ZVRva2VuKCdMT05FVElMREUnLCAnKD86fj4/KScpXG5cbmNyZWF0ZVRva2VuKCdUSUxERVRSSU0nLCBgKFxcXFxzKikke3NyY1t0LkxPTkVUSUxERV19XFxcXHMrYCwgdHJ1ZSlcbmV4cG9ydHMudGlsZGVUcmltUmVwbGFjZSA9ICckMX4nXG5cbmNyZWF0ZVRva2VuKCdUSUxERScsIGBeJHtzcmNbdC5MT05FVElMREVdfSR7c3JjW3QuWFJBTkdFUExBSU5dfSRgKVxuY3JlYXRlVG9rZW4oJ1RJTERFTE9PU0UnLCBgXiR7c3JjW3QuTE9ORVRJTERFXX0ke3NyY1t0LlhSQU5HRVBMQUlOTE9PU0VdfSRgKVxuXG4vLyBDYXJldCByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwiYXQgbGVhc3QgYW5kIGJhY2t3YXJkcyBjb21wYXRpYmxlIHdpdGhcIlxuY3JlYXRlVG9rZW4oJ0xPTkVDQVJFVCcsICcoPzpcXFxcXiknKVxuXG5jcmVhdGVUb2tlbignQ0FSRVRUUklNJywgYChcXFxccyopJHtzcmNbdC5MT05FQ0FSRVRdfVxcXFxzK2AsIHRydWUpXG5leHBvcnRzLmNhcmV0VHJpbVJlcGxhY2UgPSAnJDFeJ1xuXG5jcmVhdGVUb2tlbignQ0FSRVQnLCBgXiR7c3JjW3QuTE9ORUNBUkVUXX0ke3NyY1t0LlhSQU5HRVBMQUlOXX0kYClcbmNyZWF0ZVRva2VuKCdDQVJFVExPT1NFJywgYF4ke3NyY1t0LkxPTkVDQVJFVF19JHtzcmNbdC5YUkFOR0VQTEFJTkxPT1NFXX0kYClcblxuLy8gQSBzaW1wbGUgZ3QvbHQvZXEgdGhpbmcsIG9yIGp1c3QgXCJcIiB0byBpbmRpY2F0ZSBcImFueSB2ZXJzaW9uXCJcbmNyZWF0ZVRva2VuKCdDT01QQVJBVE9STE9PU0UnLCBgXiR7c3JjW3QuR1RMVF19XFxcXHMqKCR7c3JjW3QuTE9PU0VQTEFJTl19KSR8XiRgKVxuY3JlYXRlVG9rZW4oJ0NPTVBBUkFUT1InLCBgXiR7c3JjW3QuR1RMVF19XFxcXHMqKCR7c3JjW3QuRlVMTFBMQUlOXX0pJHxeJGApXG5cbi8vIEFuIGV4cHJlc3Npb24gdG8gc3RyaXAgYW55IHdoaXRlc3BhY2UgYmV0d2VlbiB0aGUgZ3RsdCBhbmQgdGhlIHRoaW5nXG4vLyBpdCBtb2RpZmllcywgc28gdGhhdCBgPiAxLjIuM2AgPT0+IGA+MS4yLjNgXG5jcmVhdGVUb2tlbignQ09NUEFSQVRPUlRSSU0nLCBgKFxcXFxzKikke3NyY1t0LkdUTFRdXG59XFxcXHMqKCR7c3JjW3QuTE9PU0VQTEFJTl19fCR7c3JjW3QuWFJBTkdFUExBSU5dfSlgLCB0cnVlKVxuZXhwb3J0cy5jb21wYXJhdG9yVHJpbVJlcGxhY2UgPSAnJDEkMiQzJ1xuXG4vLyBTb21ldGhpbmcgbGlrZSBgMS4yLjMgLSAxLjIuNGBcbi8vIE5vdGUgdGhhdCB0aGVzZSBhbGwgdXNlIHRoZSBsb29zZSBmb3JtLCBiZWNhdXNlIHRoZXknbGwgYmVcbi8vIGNoZWNrZWQgYWdhaW5zdCBlaXRoZXIgdGhlIHN0cmljdCBvciBsb29zZSBjb21wYXJhdG9yIGZvcm1cbi8vIGxhdGVyLlxuY3JlYXRlVG9rZW4oJ0hZUEhFTlJBTkdFJywgYF5cXFxccyooJHtzcmNbdC5YUkFOR0VQTEFJTl19KWAgK1xuICAgICAgICAgICAgICAgICAgIGBcXFxccystXFxcXHMrYCArXG4gICAgICAgICAgICAgICAgICAgYCgke3NyY1t0LlhSQU5HRVBMQUlOXX0pYCArXG4gICAgICAgICAgICAgICAgICAgYFxcXFxzKiRgKVxuXG5jcmVhdGVUb2tlbignSFlQSEVOUkFOR0VMT09TRScsIGBeXFxcXHMqKCR7c3JjW3QuWFJBTkdFUExBSU5MT09TRV19KWAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYFxcXFxzKy1cXFxccytgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoJHtzcmNbdC5YUkFOR0VQTEFJTkxPT1NFXX0pYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgXFxcXHMqJGApXG5cbi8vIFN0YXIgcmFuZ2VzIGJhc2ljYWxseSBqdXN0IGFsbG93IGFueXRoaW5nIGF0IGFsbC5cbmNyZWF0ZVRva2VuKCdTVEFSJywgJyg8fD4pPz0/XFxcXHMqXFxcXConKVxuLy8gPj0wLjAuMCBpcyBsaWtlIGEgc3RhclxuY3JlYXRlVG9rZW4oJ0dURTAnLCAnXlxcXFxzKj49XFxcXHMqMFxcLjBcXC4wXFxcXHMqJCcpXG5jcmVhdGVUb2tlbignR1RFMFBSRScsICdeXFxcXHMqPj1cXFxccyowXFwuMFxcLjAtMFxcXFxzKiQnKVxuIiwiLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgZ3JlYXRlciB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlLlxuY29uc3Qgb3V0c2lkZSA9IHJlcXVpcmUoJy4vb3V0c2lkZScpXG5jb25zdCBndHIgPSAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpID0+IG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc+Jywgb3B0aW9ucylcbm1vZHVsZS5leHBvcnRzID0gZ3RyXG4iLCJjb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuY29uc3QgaW50ZXJzZWN0cyA9IChyMSwgcjIsIG9wdGlvbnMpID0+IHtcbiAgcjEgPSBuZXcgUmFuZ2UocjEsIG9wdGlvbnMpXG4gIHIyID0gbmV3IFJhbmdlKHIyLCBvcHRpb25zKVxuICByZXR1cm4gcjEuaW50ZXJzZWN0cyhyMilcbn1cbm1vZHVsZS5leHBvcnRzID0gaW50ZXJzZWN0c1xuIiwiY29uc3Qgb3V0c2lkZSA9IHJlcXVpcmUoJy4vb3V0c2lkZScpXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBsZXNzIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2VcbmNvbnN0IGx0ciA9ICh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykgPT4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJzwnLCBvcHRpb25zKVxubW9kdWxlLmV4cG9ydHMgPSBsdHJcbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5cbmNvbnN0IG1heFNhdGlzZnlpbmcgPSAodmVyc2lvbnMsIHJhbmdlLCBvcHRpb25zKSA9PiB7XG4gIGxldCBtYXggPSBudWxsXG4gIGxldCBtYXhTViA9IG51bGxcbiAgbGV0IHJhbmdlT2JqID0gbnVsbFxuICB0cnkge1xuICAgIHJhbmdlT2JqID0gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgdmVyc2lvbnMuZm9yRWFjaCgodikgPT4ge1xuICAgIGlmIChyYW5nZU9iai50ZXN0KHYpKSB7XG4gICAgICAvLyBzYXRpc2ZpZXModiwgcmFuZ2UsIG9wdGlvbnMpXG4gICAgICBpZiAoIW1heCB8fCBtYXhTVi5jb21wYXJlKHYpID09PSAtMSkge1xuICAgICAgICAvLyBjb21wYXJlKG1heCwgdiwgdHJ1ZSlcbiAgICAgICAgbWF4ID0gdlxuICAgICAgICBtYXhTViA9IG5ldyBTZW1WZXIobWF4LCBvcHRpb25zKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIG1heFxufVxubW9kdWxlLmV4cG9ydHMgPSBtYXhTYXRpc2Z5aW5nXG4iLCJjb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuY29uc3QgbWluU2F0aXNmeWluZyA9ICh2ZXJzaW9ucywgcmFuZ2UsIG9wdGlvbnMpID0+IHtcbiAgbGV0IG1pbiA9IG51bGxcbiAgbGV0IG1pblNWID0gbnVsbFxuICBsZXQgcmFuZ2VPYmogPSBudWxsXG4gIHRyeSB7XG4gICAgcmFuZ2VPYmogPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICB2ZXJzaW9ucy5mb3JFYWNoKCh2KSA9PiB7XG4gICAgaWYgKHJhbmdlT2JqLnRlc3QodikpIHtcbiAgICAgIC8vIHNhdGlzZmllcyh2LCByYW5nZSwgb3B0aW9ucylcbiAgICAgIGlmICghbWluIHx8IG1pblNWLmNvbXBhcmUodikgPT09IDEpIHtcbiAgICAgICAgLy8gY29tcGFyZShtaW4sIHYsIHRydWUpXG4gICAgICAgIG1pbiA9IHZcbiAgICAgICAgbWluU1YgPSBuZXcgU2VtVmVyKG1pbiwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBtaW5cbn1cbm1vZHVsZS5leHBvcnRzID0gbWluU2F0aXNmeWluZ1xuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlJylcbmNvbnN0IGd0ID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2d0JylcblxuY29uc3QgbWluVmVyc2lvbiA9IChyYW5nZSwgbG9vc2UpID0+IHtcbiAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKVxuXG4gIGxldCBtaW52ZXIgPSBuZXcgU2VtVmVyKCcwLjAuMCcpXG4gIGlmIChyYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICBtaW52ZXIgPSBuZXcgU2VtVmVyKCcwLjAuMC0wJylcbiAgaWYgKHJhbmdlLnRlc3QobWludmVyKSkge1xuICAgIHJldHVybiBtaW52ZXJcbiAgfVxuXG4gIG1pbnZlciA9IG51bGxcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByYW5nZS5zZXQubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBjb21wYXJhdG9ycyA9IHJhbmdlLnNldFtpXVxuXG4gICAgbGV0IHNldE1pbiA9IG51bGxcbiAgICBjb21wYXJhdG9ycy5mb3JFYWNoKChjb21wYXJhdG9yKSA9PiB7XG4gICAgICAvLyBDbG9uZSB0byBhdm9pZCBtYW5pcHVsYXRpbmcgdGhlIGNvbXBhcmF0b3IncyBzZW12ZXIgb2JqZWN0LlxuICAgICAgY29uc3QgY29tcHZlciA9IG5ldyBTZW1WZXIoY29tcGFyYXRvci5zZW12ZXIudmVyc2lvbilcbiAgICAgIHN3aXRjaCAoY29tcGFyYXRvci5vcGVyYXRvcikge1xuICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICBpZiAoY29tcHZlci5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29tcHZlci5wYXRjaCsrXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXB2ZXIucHJlcmVsZWFzZS5wdXNoKDApXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbXB2ZXIucmF3ID0gY29tcHZlci5mb3JtYXQoKVxuICAgICAgICAgIC8qIGZhbGx0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJyc6XG4gICAgICAgIGNhc2UgJz49JzpcbiAgICAgICAgICBpZiAoIXNldE1pbiB8fCBndChjb21wdmVyLCBzZXRNaW4pKSB7XG4gICAgICAgICAgICBzZXRNaW4gPSBjb21wdmVyXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJzwnOlxuICAgICAgICBjYXNlICc8PSc6XG4gICAgICAgICAgLyogSWdub3JlIG1heGltdW0gdmVyc2lvbnMgKi9cbiAgICAgICAgICBicmVha1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBvcGVyYXRpb246ICR7Y29tcGFyYXRvci5vcGVyYXRvcn1gKVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHNldE1pbiAmJiAoIW1pbnZlciB8fCBndChtaW52ZXIsIHNldE1pbikpKVxuICAgICAgbWludmVyID0gc2V0TWluXG4gIH1cblxuICBpZiAobWludmVyICYmIHJhbmdlLnRlc3QobWludmVyKSkge1xuICAgIHJldHVybiBtaW52ZXJcbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG5tb2R1bGUuZXhwb3J0cyA9IG1pblZlcnNpb25cbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IENvbXBhcmF0b3IgPSByZXF1aXJlKCcuLi9jbGFzc2VzL2NvbXBhcmF0b3InKVxuY29uc3Qge0FOWX0gPSBDb21wYXJhdG9yXG5jb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuY29uc3Qgc2F0aXNmaWVzID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL3NhdGlzZmllcycpXG5jb25zdCBndCA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9ndCcpXG5jb25zdCBsdCA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9sdCcpXG5jb25zdCBsdGUgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvbHRlJylcbmNvbnN0IGd0ZSA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9ndGUnKVxuXG5jb25zdCBvdXRzaWRlID0gKHZlcnNpb24sIHJhbmdlLCBoaWxvLCBvcHRpb25zKSA9PiB7XG4gIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIG9wdGlvbnMpXG4gIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuXG4gIGxldCBndGZuLCBsdGVmbiwgbHRmbiwgY29tcCwgZWNvbXBcbiAgc3dpdGNoIChoaWxvKSB7XG4gICAgY2FzZSAnPic6XG4gICAgICBndGZuID0gZ3RcbiAgICAgIGx0ZWZuID0gbHRlXG4gICAgICBsdGZuID0gbHRcbiAgICAgIGNvbXAgPSAnPidcbiAgICAgIGVjb21wID0gJz49J1xuICAgICAgYnJlYWtcbiAgICBjYXNlICc8JzpcbiAgICAgIGd0Zm4gPSBsdFxuICAgICAgbHRlZm4gPSBndGVcbiAgICAgIGx0Zm4gPSBndFxuICAgICAgY29tcCA9ICc8J1xuICAgICAgZWNvbXAgPSAnPD0nXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdNdXN0IHByb3ZpZGUgYSBoaWxvIHZhbCBvZiBcIjxcIiBvciBcIj5cIicpXG4gIH1cblxuICAvLyBJZiBpdCBzYXRpc2ZpZXMgdGhlIHJhbmdlIGl0IGlzIG5vdCBvdXRzaWRlXG4gIGlmIChzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBGcm9tIG5vdyBvbiwgdmFyaWFibGUgdGVybXMgYXJlIGFzIGlmIHdlJ3JlIGluIFwiZ3RyXCIgbW9kZS5cbiAgLy8gYnV0IG5vdGUgdGhhdCBldmVyeXRoaW5nIGlzIGZsaXBwZWQgZm9yIHRoZSBcImx0clwiIGZ1bmN0aW9uLlxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2Uuc2V0Lmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgY29tcGFyYXRvcnMgPSByYW5nZS5zZXRbaV1cblxuICAgIGxldCBoaWdoID0gbnVsbFxuICAgIGxldCBsb3cgPSBudWxsXG5cbiAgICBjb21wYXJhdG9ycy5mb3JFYWNoKChjb21wYXJhdG9yKSA9PiB7XG4gICAgICBpZiAoY29tcGFyYXRvci5zZW12ZXIgPT09IEFOWSkge1xuICAgICAgICBjb21wYXJhdG9yID0gbmV3IENvbXBhcmF0b3IoJz49MC4wLjAnKVxuICAgICAgfVxuICAgICAgaGlnaCA9IGhpZ2ggfHwgY29tcGFyYXRvclxuICAgICAgbG93ID0gbG93IHx8IGNvbXBhcmF0b3JcbiAgICAgIGlmIChndGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBoaWdoLnNlbXZlciwgb3B0aW9ucykpIHtcbiAgICAgICAgaGlnaCA9IGNvbXBhcmF0b3JcbiAgICAgIH0gZWxzZSBpZiAobHRmbihjb21wYXJhdG9yLnNlbXZlciwgbG93LnNlbXZlciwgb3B0aW9ucykpIHtcbiAgICAgICAgbG93ID0gY29tcGFyYXRvclxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBJZiB0aGUgZWRnZSB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGEgb3BlcmF0b3IgdGhlbiBvdXIgdmVyc2lvblxuICAgIC8vIGlzbid0IG91dHNpZGUgaXRcbiAgICBpZiAoaGlnaC5vcGVyYXRvciA9PT0gY29tcCB8fCBoaWdoLm9wZXJhdG9yID09PSBlY29tcCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGxvd2VzdCB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGFuIG9wZXJhdG9yIGFuZCBvdXIgdmVyc2lvblxuICAgIC8vIGlzIGxlc3MgdGhhbiBpdCB0aGVuIGl0IGlzbid0IGhpZ2hlciB0aGFuIHRoZSByYW5nZVxuICAgIGlmICgoIWxvdy5vcGVyYXRvciB8fCBsb3cub3BlcmF0b3IgPT09IGNvbXApICYmXG4gICAgICAgIGx0ZWZuKHZlcnNpb24sIGxvdy5zZW12ZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2UgaWYgKGxvdy5vcGVyYXRvciA9PT0gZWNvbXAgJiYgbHRmbih2ZXJzaW9uLCBsb3cuc2VtdmVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3V0c2lkZVxuIiwiLy8gZ2l2ZW4gYSBzZXQgb2YgdmVyc2lvbnMgYW5kIGEgcmFuZ2UsIGNyZWF0ZSBhIFwic2ltcGxpZmllZFwiIHJhbmdlXG4vLyB0aGF0IGluY2x1ZGVzIHRoZSBzYW1lIHZlcnNpb25zIHRoYXQgdGhlIG9yaWdpbmFsIHJhbmdlIGRvZXNcbi8vIElmIHRoZSBvcmlnaW5hbCByYW5nZSBpcyBzaG9ydGVyIHRoYW4gdGhlIHNpbXBsaWZpZWQgb25lLCByZXR1cm4gdGhhdC5cbmNvbnN0IHNhdGlzZmllcyA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9zYXRpc2ZpZXMuanMnKVxuY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9jb21wYXJlLmpzJylcbm1vZHVsZS5leHBvcnRzID0gKHZlcnNpb25zLCByYW5nZSwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBzZXQgPSBbXVxuICBsZXQgbWluID0gbnVsbFxuICBsZXQgcHJldiA9IG51bGxcbiAgY29uc3QgdiA9IHZlcnNpb25zLnNvcnQoKGEsIGIpID0+IGNvbXBhcmUoYSwgYiwgb3B0aW9ucykpXG4gIGZvciAoY29uc3QgdmVyc2lvbiBvZiB2KSB7XG4gICAgY29uc3QgaW5jbHVkZWQgPSBzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpXG4gICAgaWYgKGluY2x1ZGVkKSB7XG4gICAgICBwcmV2ID0gdmVyc2lvblxuICAgICAgaWYgKCFtaW4pXG4gICAgICAgIG1pbiA9IHZlcnNpb25cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgc2V0LnB1c2goW21pbiwgcHJldl0pXG4gICAgICB9XG4gICAgICBwcmV2ID0gbnVsbFxuICAgICAgbWluID0gbnVsbFxuICAgIH1cbiAgfVxuICBpZiAobWluKVxuICAgIHNldC5wdXNoKFttaW4sIG51bGxdKVxuXG4gIGNvbnN0IHJhbmdlcyA9IFtdXG4gIGZvciAoY29uc3QgW21pbiwgbWF4XSBvZiBzZXQpIHtcbiAgICBpZiAobWluID09PSBtYXgpXG4gICAgICByYW5nZXMucHVzaChtaW4pXG4gICAgZWxzZSBpZiAoIW1heCAmJiBtaW4gPT09IHZbMF0pXG4gICAgICByYW5nZXMucHVzaCgnKicpXG4gICAgZWxzZSBpZiAoIW1heClcbiAgICAgIHJhbmdlcy5wdXNoKGA+PSR7bWlufWApXG4gICAgZWxzZSBpZiAobWluID09PSB2WzBdKVxuICAgICAgcmFuZ2VzLnB1c2goYDw9JHttYXh9YClcbiAgICBlbHNlXG4gICAgICByYW5nZXMucHVzaChgJHttaW59IC0gJHttYXh9YClcbiAgfVxuICBjb25zdCBzaW1wbGlmaWVkID0gcmFuZ2VzLmpvaW4oJyB8fCAnKVxuICBjb25zdCBvcmlnaW5hbCA9IHR5cGVvZiByYW5nZS5yYXcgPT09ICdzdHJpbmcnID8gcmFuZ2UucmF3IDogU3RyaW5nKHJhbmdlKVxuICByZXR1cm4gc2ltcGxpZmllZC5sZW5ndGggPCBvcmlnaW5hbC5sZW5ndGggPyBzaW1wbGlmaWVkIDogcmFuZ2Vcbn1cbiIsImNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZS5qcycpXG5jb25zdCBDb21wYXJhdG9yID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9jb21wYXJhdG9yLmpzJylcbmNvbnN0IHsgQU5ZIH0gPSBDb21wYXJhdG9yXG5jb25zdCBzYXRpc2ZpZXMgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvc2F0aXNmaWVzLmpzJylcbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvY29tcGFyZS5qcycpXG5cbi8vIENvbXBsZXggcmFuZ2UgYHIxIHx8IHIyIHx8IC4uLmAgaXMgYSBzdWJzZXQgb2YgYFIxIHx8IFIyIHx8IC4uLmAgaWZmOlxuLy8gLSBFdmVyeSBzaW1wbGUgcmFuZ2UgYHIxLCByMiwgLi4uYCBpcyBhIG51bGwgc2V0LCBPUlxuLy8gLSBFdmVyeSBzaW1wbGUgcmFuZ2UgYHIxLCByMiwgLi4uYCB3aGljaCBpcyBub3QgYSBudWxsIHNldCBpcyBhIHN1YnNldCBvZlxuLy8gICBzb21lIGBSMSwgUjIsIC4uLmBcbi8vXG4vLyBTaW1wbGUgcmFuZ2UgYGMxIGMyIC4uLmAgaXMgYSBzdWJzZXQgb2Ygc2ltcGxlIHJhbmdlIGBDMSBDMiAuLi5gIGlmZjpcbi8vIC0gSWYgYyBpcyBvbmx5IHRoZSBBTlkgY29tcGFyYXRvclxuLy8gICAtIElmIEMgaXMgb25seSB0aGUgQU5ZIGNvbXBhcmF0b3IsIHJldHVybiB0cnVlXG4vLyAgIC0gRWxzZSBpZiBpbiBwcmVyZWxlYXNlIG1vZGUsIHJldHVybiBmYWxzZVxuLy8gICAtIGVsc2UgcmVwbGFjZSBjIHdpdGggYFs+PTAuMC4wXWBcbi8vIC0gSWYgQyBpcyBvbmx5IHRoZSBBTlkgY29tcGFyYXRvclxuLy8gICAtIGlmIGluIHByZXJlbGVhc2UgbW9kZSwgcmV0dXJuIHRydWVcbi8vICAgLSBlbHNlIHJlcGxhY2UgQyB3aXRoIGBbPj0wLjAuMF1gXG4vLyAtIExldCBFUSBiZSB0aGUgc2V0IG9mID0gY29tcGFyYXRvcnMgaW4gY1xuLy8gLSBJZiBFUSBpcyBtb3JlIHRoYW4gb25lLCByZXR1cm4gdHJ1ZSAobnVsbCBzZXQpXG4vLyAtIExldCBHVCBiZSB0aGUgaGlnaGVzdCA+IG9yID49IGNvbXBhcmF0b3IgaW4gY1xuLy8gLSBMZXQgTFQgYmUgdGhlIGxvd2VzdCA8IG9yIDw9IGNvbXBhcmF0b3IgaW4gY1xuLy8gLSBJZiBHVCBhbmQgTFQsIGFuZCBHVC5zZW12ZXIgPiBMVC5zZW12ZXIsIHJldHVybiB0cnVlIChudWxsIHNldClcbi8vIC0gSWYgYW55IEMgaXMgYSA9IHJhbmdlLCBhbmQgR1Qgb3IgTFQgYXJlIHNldCwgcmV0dXJuIGZhbHNlXG4vLyAtIElmIEVRXG4vLyAgIC0gSWYgR1QsIGFuZCBFUSBkb2VzIG5vdCBzYXRpc2Z5IEdULCByZXR1cm4gdHJ1ZSAobnVsbCBzZXQpXG4vLyAgIC0gSWYgTFQsIGFuZCBFUSBkb2VzIG5vdCBzYXRpc2Z5IExULCByZXR1cm4gdHJ1ZSAobnVsbCBzZXQpXG4vLyAgIC0gSWYgRVEgc2F0aXNmaWVzIGV2ZXJ5IEMsIHJldHVybiB0cnVlXG4vLyAgIC0gRWxzZSByZXR1cm4gZmFsc2Vcbi8vIC0gSWYgR1Rcbi8vICAgLSBJZiBHVC5zZW12ZXIgaXMgbG93ZXIgdGhhbiBhbnkgPiBvciA+PSBjb21wIGluIEMsIHJldHVybiBmYWxzZVxuLy8gICAtIElmIEdUIGlzID49LCBhbmQgR1Quc2VtdmVyIGRvZXMgbm90IHNhdGlzZnkgZXZlcnkgQywgcmV0dXJuIGZhbHNlXG4vLyAgIC0gSWYgR1Quc2VtdmVyIGhhcyBhIHByZXJlbGVhc2UsIGFuZCBub3QgaW4gcHJlcmVsZWFzZSBtb2RlXG4vLyAgICAgLSBJZiBubyBDIGhhcyBhIHByZXJlbGVhc2UgYW5kIHRoZSBHVC5zZW12ZXIgdHVwbGUsIHJldHVybiBmYWxzZVxuLy8gLSBJZiBMVFxuLy8gICAtIElmIExULnNlbXZlciBpcyBncmVhdGVyIHRoYW4gYW55IDwgb3IgPD0gY29tcCBpbiBDLCByZXR1cm4gZmFsc2Vcbi8vICAgLSBJZiBMVCBpcyA8PSwgYW5kIExULnNlbXZlciBkb2VzIG5vdCBzYXRpc2Z5IGV2ZXJ5IEMsIHJldHVybiBmYWxzZVxuLy8gICAtIElmIEdULnNlbXZlciBoYXMgYSBwcmVyZWxlYXNlLCBhbmQgbm90IGluIHByZXJlbGVhc2UgbW9kZVxuLy8gICAgIC0gSWYgbm8gQyBoYXMgYSBwcmVyZWxlYXNlIGFuZCB0aGUgTFQuc2VtdmVyIHR1cGxlLCByZXR1cm4gZmFsc2Vcbi8vIC0gRWxzZSByZXR1cm4gdHJ1ZVxuXG5jb25zdCBzdWJzZXQgPSAoc3ViLCBkb20sIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBpZiAoc3ViID09PSBkb20pXG4gICAgcmV0dXJuIHRydWVcblxuICBzdWIgPSBuZXcgUmFuZ2Uoc3ViLCBvcHRpb25zKVxuICBkb20gPSBuZXcgUmFuZ2UoZG9tLCBvcHRpb25zKVxuICBsZXQgc2F3Tm9uTnVsbCA9IGZhbHNlXG5cbiAgT1VURVI6IGZvciAoY29uc3Qgc2ltcGxlU3ViIG9mIHN1Yi5zZXQpIHtcbiAgICBmb3IgKGNvbnN0IHNpbXBsZURvbSBvZiBkb20uc2V0KSB7XG4gICAgICBjb25zdCBpc1N1YiA9IHNpbXBsZVN1YnNldChzaW1wbGVTdWIsIHNpbXBsZURvbSwgb3B0aW9ucylcbiAgICAgIHNhd05vbk51bGwgPSBzYXdOb25OdWxsIHx8IGlzU3ViICE9PSBudWxsXG4gICAgICBpZiAoaXNTdWIpXG4gICAgICAgIGNvbnRpbnVlIE9VVEVSXG4gICAgfVxuICAgIC8vIHRoZSBudWxsIHNldCBpcyBhIHN1YnNldCBvZiBldmVyeXRoaW5nLCBidXQgbnVsbCBzaW1wbGUgcmFuZ2VzIGluXG4gICAgLy8gYSBjb21wbGV4IHJhbmdlIHNob3VsZCBiZSBpZ25vcmVkLiAgc28gaWYgd2Ugc2F3IGEgbm9uLW51bGwgcmFuZ2UsXG4gICAgLy8gdGhlbiB3ZSBrbm93IHRoaXMgaXNuJ3QgYSBzdWJzZXQsIGJ1dCBpZiBFVkVSWSBzaW1wbGUgcmFuZ2Ugd2FzIG51bGwsXG4gICAgLy8gdGhlbiBpdCBpcyBhIHN1YnNldC5cbiAgICBpZiAoc2F3Tm9uTnVsbClcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IHNpbXBsZVN1YnNldCA9IChzdWIsIGRvbSwgb3B0aW9ucykgPT4ge1xuICBpZiAoc3ViID09PSBkb20pXG4gICAgcmV0dXJuIHRydWVcblxuICBpZiAoc3ViLmxlbmd0aCA9PT0gMSAmJiBzdWJbMF0uc2VtdmVyID09PSBBTlkpIHtcbiAgICBpZiAoZG9tLmxlbmd0aCA9PT0gMSAmJiBkb21bMF0uc2VtdmVyID09PSBBTlkpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGVsc2UgaWYgKG9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpXG4gICAgICBzdWIgPSBbIG5ldyBDb21wYXJhdG9yKCc+PTAuMC4wLTAnKSBdXG4gICAgZWxzZVxuICAgICAgc3ViID0gWyBuZXcgQ29tcGFyYXRvcignPj0wLjAuMCcpIF1cbiAgfVxuXG4gIGlmIChkb20ubGVuZ3RoID09PSAxICYmIGRvbVswXS5zZW12ZXIgPT09IEFOWSkge1xuICAgIGlmIChvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICBlbHNlXG4gICAgICBkb20gPSBbIG5ldyBDb21wYXJhdG9yKCc+PTAuMC4wJykgXVxuICB9XG5cbiAgY29uc3QgZXFTZXQgPSBuZXcgU2V0KClcbiAgbGV0IGd0LCBsdFxuICBmb3IgKGNvbnN0IGMgb2Ygc3ViKSB7XG4gICAgaWYgKGMub3BlcmF0b3IgPT09ICc+JyB8fCBjLm9wZXJhdG9yID09PSAnPj0nKVxuICAgICAgZ3QgPSBoaWdoZXJHVChndCwgYywgb3B0aW9ucylcbiAgICBlbHNlIGlmIChjLm9wZXJhdG9yID09PSAnPCcgfHwgYy5vcGVyYXRvciA9PT0gJzw9JylcbiAgICAgIGx0ID0gbG93ZXJMVChsdCwgYywgb3B0aW9ucylcbiAgICBlbHNlXG4gICAgICBlcVNldC5hZGQoYy5zZW12ZXIpXG4gIH1cblxuICBpZiAoZXFTZXQuc2l6ZSA+IDEpXG4gICAgcmV0dXJuIG51bGxcblxuICBsZXQgZ3RsdENvbXBcbiAgaWYgKGd0ICYmIGx0KSB7XG4gICAgZ3RsdENvbXAgPSBjb21wYXJlKGd0LnNlbXZlciwgbHQuc2VtdmVyLCBvcHRpb25zKVxuICAgIGlmIChndGx0Q29tcCA+IDApXG4gICAgICByZXR1cm4gbnVsbFxuICAgIGVsc2UgaWYgKGd0bHRDb21wID09PSAwICYmIChndC5vcGVyYXRvciAhPT0gJz49JyB8fCBsdC5vcGVyYXRvciAhPT0gJzw9JykpXG4gICAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgLy8gd2lsbCBpdGVyYXRlIG9uZSBvciB6ZXJvIHRpbWVzXG4gIGZvciAoY29uc3QgZXEgb2YgZXFTZXQpIHtcbiAgICBpZiAoZ3QgJiYgIXNhdGlzZmllcyhlcSwgU3RyaW5nKGd0KSwgb3B0aW9ucykpXG4gICAgICByZXR1cm4gbnVsbFxuXG4gICAgaWYgKGx0ICYmICFzYXRpc2ZpZXMoZXEsIFN0cmluZyhsdCksIG9wdGlvbnMpKVxuICAgICAgcmV0dXJuIG51bGxcblxuICAgIGZvciAoY29uc3QgYyBvZiBkb20pIHtcbiAgICAgIGlmICghc2F0aXNmaWVzKGVxLCBTdHJpbmcoYyksIG9wdGlvbnMpKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgbGV0IGhpZ2hlciwgbG93ZXJcbiAgbGV0IGhhc0RvbUxULCBoYXNEb21HVFxuICAvLyBpZiB0aGUgc3Vic2V0IGhhcyBhIHByZXJlbGVhc2UsIHdlIG5lZWQgYSBjb21wYXJhdG9yIGluIHRoZSBzdXBlcnNldFxuICAvLyB3aXRoIHRoZSBzYW1lIHR1cGxlIGFuZCBhIHByZXJlbGVhc2UsIG9yIGl0J3Mgbm90IGEgc3Vic2V0XG4gIGxldCBuZWVkRG9tTFRQcmUgPSBsdCAmJlxuICAgICFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlICYmXG4gICAgbHQuc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoID8gbHQuc2VtdmVyIDogZmFsc2VcbiAgbGV0IG5lZWREb21HVFByZSA9IGd0ICYmXG4gICAgIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgJiZcbiAgICBndC5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggPyBndC5zZW12ZXIgOiBmYWxzZVxuICAvLyBleGNlcHRpb246IDwxLjIuMy0wIGlzIHRoZSBzYW1lIGFzIDwxLjIuM1xuICBpZiAobmVlZERvbUxUUHJlICYmIG5lZWREb21MVFByZS5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgbHQub3BlcmF0b3IgPT09ICc8JyAmJiBuZWVkRG9tTFRQcmUucHJlcmVsZWFzZVswXSA9PT0gMCkge1xuICAgIG5lZWREb21MVFByZSA9IGZhbHNlXG4gIH1cblxuICBmb3IgKGNvbnN0IGMgb2YgZG9tKSB7XG4gICAgaGFzRG9tR1QgPSBoYXNEb21HVCB8fCBjLm9wZXJhdG9yID09PSAnPicgfHwgYy5vcGVyYXRvciA9PT0gJz49J1xuICAgIGhhc0RvbUxUID0gaGFzRG9tTFQgfHwgYy5vcGVyYXRvciA9PT0gJzwnIHx8IGMub3BlcmF0b3IgPT09ICc8PSdcbiAgICBpZiAoZ3QpIHtcbiAgICAgIGlmIChuZWVkRG9tR1RQcmUpIHtcbiAgICAgICAgaWYgKGMuc2VtdmVyLnByZXJlbGVhc2UgJiYgYy5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLm1ham9yID09PSBuZWVkRG9tR1RQcmUubWFqb3IgJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLm1pbm9yID09PSBuZWVkRG9tR1RQcmUubWlub3IgJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLnBhdGNoID09PSBuZWVkRG9tR1RQcmUucGF0Y2gpIHtcbiAgICAgICAgICBuZWVkRG9tR1RQcmUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYy5vcGVyYXRvciA9PT0gJz4nIHx8IGMub3BlcmF0b3IgPT09ICc+PScpIHtcbiAgICAgICAgaGlnaGVyID0gaGlnaGVyR1QoZ3QsIGMsIG9wdGlvbnMpXG4gICAgICAgIGlmIChoaWdoZXIgPT09IGMgJiYgaGlnaGVyICE9PSBndClcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0gZWxzZSBpZiAoZ3Qub3BlcmF0b3IgPT09ICc+PScgJiYgIXNhdGlzZmllcyhndC5zZW12ZXIsIFN0cmluZyhjKSwgb3B0aW9ucykpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAobHQpIHtcbiAgICAgIGlmIChuZWVkRG9tTFRQcmUpIHtcbiAgICAgICAgaWYgKGMuc2VtdmVyLnByZXJlbGVhc2UgJiYgYy5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLm1ham9yID09PSBuZWVkRG9tTFRQcmUubWFqb3IgJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLm1pbm9yID09PSBuZWVkRG9tTFRQcmUubWlub3IgJiZcbiAgICAgICAgICAgIGMuc2VtdmVyLnBhdGNoID09PSBuZWVkRG9tTFRQcmUucGF0Y2gpIHtcbiAgICAgICAgICBuZWVkRG9tTFRQcmUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYy5vcGVyYXRvciA9PT0gJzwnIHx8IGMub3BlcmF0b3IgPT09ICc8PScpIHtcbiAgICAgICAgbG93ZXIgPSBsb3dlckxUKGx0LCBjLCBvcHRpb25zKVxuICAgICAgICBpZiAobG93ZXIgPT09IGMgJiYgbG93ZXIgIT09IGx0KVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSBlbHNlIGlmIChsdC5vcGVyYXRvciA9PT0gJzw9JyAmJiAhc2F0aXNmaWVzKGx0LnNlbXZlciwgU3RyaW5nKGMpLCBvcHRpb25zKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICghYy5vcGVyYXRvciAmJiAobHQgfHwgZ3QpICYmIGd0bHRDb21wICE9PSAwKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBpZiB0aGVyZSB3YXMgYSA8IG9yID4sIGFuZCBub3RoaW5nIGluIHRoZSBkb20sIHRoZW4gbXVzdCBiZSBmYWxzZVxuICAvLyBVTkxFU1MgaXQgd2FzIGxpbWl0ZWQgYnkgYW5vdGhlciByYW5nZSBpbiB0aGUgb3RoZXIgZGlyZWN0aW9uLlxuICAvLyBFZywgPjEuMC4wIDwxLjAuMSBpcyBzdGlsbCBhIHN1YnNldCBvZiA8Mi4wLjBcbiAgaWYgKGd0ICYmIGhhc0RvbUxUICYmICFsdCAmJiBndGx0Q29tcCAhPT0gMClcbiAgICByZXR1cm4gZmFsc2VcblxuICBpZiAobHQgJiYgaGFzRG9tR1QgJiYgIWd0ICYmIGd0bHRDb21wICE9PSAwKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIC8vIHdlIG5lZWRlZCBhIHByZXJlbGVhc2UgcmFuZ2UgaW4gYSBzcGVjaWZpYyB0dXBsZSwgYnV0IGRpZG4ndCBnZXQgb25lXG4gIC8vIHRoZW4gdGhpcyBpc24ndCBhIHN1YnNldC4gIGVnID49MS4yLjMtcHJlIGlzIG5vdCBhIHN1YnNldCBvZiA+PTEuMC4wLFxuICAvLyBiZWNhdXNlIGl0IGluY2x1ZGVzIHByZXJlbGVhc2VzIGluIHRoZSAxLjIuMyB0dXBsZVxuICBpZiAobmVlZERvbUdUUHJlIHx8IG5lZWREb21MVFByZSlcbiAgICByZXR1cm4gZmFsc2VcblxuICByZXR1cm4gdHJ1ZVxufVxuXG4vLyA+PTEuMi4zIGlzIGxvd2VyIHRoYW4gPjEuMi4zXG5jb25zdCBoaWdoZXJHVCA9IChhLCBiLCBvcHRpb25zKSA9PiB7XG4gIGlmICghYSlcbiAgICByZXR1cm4gYlxuICBjb25zdCBjb21wID0gY29tcGFyZShhLnNlbXZlciwgYi5zZW12ZXIsIG9wdGlvbnMpXG4gIHJldHVybiBjb21wID4gMCA/IGFcbiAgICA6IGNvbXAgPCAwID8gYlxuICAgIDogYi5vcGVyYXRvciA9PT0gJz4nICYmIGEub3BlcmF0b3IgPT09ICc+PScgPyBiXG4gICAgOiBhXG59XG5cbi8vIDw9MS4yLjMgaXMgaGlnaGVyIHRoYW4gPDEuMi4zXG5jb25zdCBsb3dlckxUID0gKGEsIGIsIG9wdGlvbnMpID0+IHtcbiAgaWYgKCFhKVxuICAgIHJldHVybiBiXG4gIGNvbnN0IGNvbXAgPSBjb21wYXJlKGEuc2VtdmVyLCBiLnNlbXZlciwgb3B0aW9ucylcbiAgcmV0dXJuIGNvbXAgPCAwID8gYVxuICAgIDogY29tcCA+IDAgPyBiXG4gICAgOiBiLm9wZXJhdG9yID09PSAnPCcgJiYgYS5vcGVyYXRvciA9PT0gJzw9JyA/IGJcbiAgICA6IGFcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdWJzZXRcbiIsImNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5cbi8vIE1vc3RseSBqdXN0IGZvciB0ZXN0aW5nIGFuZCBsZWdhY3kgQVBJIHJlYXNvbnNcbmNvbnN0IHRvQ29tcGFyYXRvcnMgPSAocmFuZ2UsIG9wdGlvbnMpID0+XG4gIG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucykuc2V0XG4gICAgLm1hcChjb21wID0+IGNvbXAubWFwKGMgPT4gYy52YWx1ZSkuam9pbignICcpLnRyaW0oKS5zcGxpdCgnICcpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvQ29tcGFyYXRvcnNcbiIsImNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5jb25zdCB2YWxpZFJhbmdlID0gKHJhbmdlLCBvcHRpb25zKSA9PiB7XG4gIHRyeSB7XG4gICAgLy8gUmV0dXJuICcqJyBpbnN0ZWFkIG9mICcnIHNvIHRoYXQgdHJ1dGhpbmVzcyB3b3Jrcy5cbiAgICAvLyBUaGlzIHdpbGwgdGhyb3cgaWYgaXQncyBpbnZhbGlkIGFueXdheVxuICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpLnJhbmdlIHx8ICcqJ1xuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gdmFsaWRSYW5nZVxuIiwiJ3VzZSBzdHJpY3QnXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChZYWxsaXN0KSB7XG4gIFlhbGxpc3QucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiogKCkge1xuICAgIGZvciAobGV0IHdhbGtlciA9IHRoaXMuaGVhZDsgd2Fsa2VyOyB3YWxrZXIgPSB3YWxrZXIubmV4dCkge1xuICAgICAgeWllbGQgd2Fsa2VyLnZhbHVlXG4gICAgfVxuICB9XG59XG4iLCIndXNlIHN0cmljdCdcbm1vZHVsZS5leHBvcnRzID0gWWFsbGlzdFxuXG5ZYWxsaXN0Lk5vZGUgPSBOb2RlXG5ZYWxsaXN0LmNyZWF0ZSA9IFlhbGxpc3RcblxuZnVuY3Rpb24gWWFsbGlzdCAobGlzdCkge1xuICB2YXIgc2VsZiA9IHRoaXNcbiAgaWYgKCEoc2VsZiBpbnN0YW5jZW9mIFlhbGxpc3QpKSB7XG4gICAgc2VsZiA9IG5ldyBZYWxsaXN0KClcbiAgfVxuXG4gIHNlbGYudGFpbCA9IG51bGxcbiAgc2VsZi5oZWFkID0gbnVsbFxuICBzZWxmLmxlbmd0aCA9IDBcblxuICBpZiAobGlzdCAmJiB0eXBlb2YgbGlzdC5mb3JFYWNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICBzZWxmLnB1c2goaXRlbSlcbiAgICB9KVxuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBzZWxmLnB1c2goYXJndW1lbnRzW2ldKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzZWxmXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnJlbW92ZU5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICBpZiAobm9kZS5saXN0ICE9PSB0aGlzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdyZW1vdmluZyBub2RlIHdoaWNoIGRvZXMgbm90IGJlbG9uZyB0byB0aGlzIGxpc3QnKVxuICB9XG5cbiAgdmFyIG5leHQgPSBub2RlLm5leHRcbiAgdmFyIHByZXYgPSBub2RlLnByZXZcblxuICBpZiAobmV4dCkge1xuICAgIG5leHQucHJldiA9IHByZXZcbiAgfVxuXG4gIGlmIChwcmV2KSB7XG4gICAgcHJldi5uZXh0ID0gbmV4dFxuICB9XG5cbiAgaWYgKG5vZGUgPT09IHRoaXMuaGVhZCkge1xuICAgIHRoaXMuaGVhZCA9IG5leHRcbiAgfVxuICBpZiAobm9kZSA9PT0gdGhpcy50YWlsKSB7XG4gICAgdGhpcy50YWlsID0gcHJldlxuICB9XG5cbiAgbm9kZS5saXN0Lmxlbmd0aC0tXG4gIG5vZGUubmV4dCA9IG51bGxcbiAgbm9kZS5wcmV2ID0gbnVsbFxuICBub2RlLmxpc3QgPSBudWxsXG5cbiAgcmV0dXJuIG5leHRcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUudW5zaGlmdE5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICBpZiAobm9kZSA9PT0gdGhpcy5oZWFkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAobm9kZS5saXN0KSB7XG4gICAgbm9kZS5saXN0LnJlbW92ZU5vZGUobm9kZSlcbiAgfVxuXG4gIHZhciBoZWFkID0gdGhpcy5oZWFkXG4gIG5vZGUubGlzdCA9IHRoaXNcbiAgbm9kZS5uZXh0ID0gaGVhZFxuICBpZiAoaGVhZCkge1xuICAgIGhlYWQucHJldiA9IG5vZGVcbiAgfVxuXG4gIHRoaXMuaGVhZCA9IG5vZGVcbiAgaWYgKCF0aGlzLnRhaWwpIHtcbiAgICB0aGlzLnRhaWwgPSBub2RlXG4gIH1cbiAgdGhpcy5sZW5ndGgrK1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5wdXNoTm9kZSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIGlmIChub2RlID09PSB0aGlzLnRhaWwpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChub2RlLmxpc3QpIHtcbiAgICBub2RlLmxpc3QucmVtb3ZlTm9kZShub2RlKVxuICB9XG5cbiAgdmFyIHRhaWwgPSB0aGlzLnRhaWxcbiAgbm9kZS5saXN0ID0gdGhpc1xuICBub2RlLnByZXYgPSB0YWlsXG4gIGlmICh0YWlsKSB7XG4gICAgdGFpbC5uZXh0ID0gbm9kZVxuICB9XG5cbiAgdGhpcy50YWlsID0gbm9kZVxuICBpZiAoIXRoaXMuaGVhZCkge1xuICAgIHRoaXMuaGVhZCA9IG5vZGVcbiAgfVxuICB0aGlzLmxlbmd0aCsrXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHB1c2godGhpcywgYXJndW1lbnRzW2ldKVxuICB9XG4gIHJldHVybiB0aGlzLmxlbmd0aFxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB1bnNoaWZ0KHRoaXMsIGFyZ3VtZW50c1tpXSlcbiAgfVxuICByZXR1cm4gdGhpcy5sZW5ndGhcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUucG9wID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMudGFpbCkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIHZhciByZXMgPSB0aGlzLnRhaWwudmFsdWVcbiAgdGhpcy50YWlsID0gdGhpcy50YWlsLnByZXZcbiAgaWYgKHRoaXMudGFpbCkge1xuICAgIHRoaXMudGFpbC5uZXh0ID0gbnVsbFxuICB9IGVsc2Uge1xuICAgIHRoaXMuaGVhZCA9IG51bGxcbiAgfVxuICB0aGlzLmxlbmd0aC0tXG4gIHJldHVybiByZXNcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUuc2hpZnQgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5oZWFkKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgdmFyIHJlcyA9IHRoaXMuaGVhZC52YWx1ZVxuICB0aGlzLmhlYWQgPSB0aGlzLmhlYWQubmV4dFxuICBpZiAodGhpcy5oZWFkKSB7XG4gICAgdGhpcy5oZWFkLnByZXYgPSBudWxsXG4gIH0gZWxzZSB7XG4gICAgdGhpcy50YWlsID0gbnVsbFxuICB9XG4gIHRoaXMubGVuZ3RoLS1cbiAgcmV0dXJuIHJlc1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGZuLCB0aGlzcCkge1xuICB0aGlzcCA9IHRoaXNwIHx8IHRoaXNcbiAgZm9yICh2YXIgd2Fsa2VyID0gdGhpcy5oZWFkLCBpID0gMDsgd2Fsa2VyICE9PSBudWxsOyBpKyspIHtcbiAgICBmbi5jYWxsKHRoaXNwLCB3YWxrZXIudmFsdWUsIGksIHRoaXMpXG4gICAgd2Fsa2VyID0gd2Fsa2VyLm5leHRcbiAgfVxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5mb3JFYWNoUmV2ZXJzZSA9IGZ1bmN0aW9uIChmbiwgdGhpc3ApIHtcbiAgdGhpc3AgPSB0aGlzcCB8fCB0aGlzXG4gIGZvciAodmFyIHdhbGtlciA9IHRoaXMudGFpbCwgaSA9IHRoaXMubGVuZ3RoIC0gMTsgd2Fsa2VyICE9PSBudWxsOyBpLS0pIHtcbiAgICBmbi5jYWxsKHRoaXNwLCB3YWxrZXIudmFsdWUsIGksIHRoaXMpXG4gICAgd2Fsa2VyID0gd2Fsa2VyLnByZXZcbiAgfVxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAobikge1xuICBmb3IgKHZhciBpID0gMCwgd2Fsa2VyID0gdGhpcy5oZWFkOyB3YWxrZXIgIT09IG51bGwgJiYgaSA8IG47IGkrKykge1xuICAgIC8vIGFib3J0IG91dCBvZiB0aGUgbGlzdCBlYXJseSBpZiB3ZSBoaXQgYSBjeWNsZVxuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cbiAgaWYgKGkgPT09IG4gJiYgd2Fsa2VyICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHdhbGtlci52YWx1ZVxuICB9XG59XG5cbllhbGxpc3QucHJvdG90eXBlLmdldFJldmVyc2UgPSBmdW5jdGlvbiAobikge1xuICBmb3IgKHZhciBpID0gMCwgd2Fsa2VyID0gdGhpcy50YWlsOyB3YWxrZXIgIT09IG51bGwgJiYgaSA8IG47IGkrKykge1xuICAgIC8vIGFib3J0IG91dCBvZiB0aGUgbGlzdCBlYXJseSBpZiB3ZSBoaXQgYSBjeWNsZVxuICAgIHdhbGtlciA9IHdhbGtlci5wcmV2XG4gIH1cbiAgaWYgKGkgPT09IG4gJiYgd2Fsa2VyICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHdhbGtlci52YWx1ZVxuICB9XG59XG5cbllhbGxpc3QucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uIChmbiwgdGhpc3ApIHtcbiAgdGhpc3AgPSB0aGlzcCB8fCB0aGlzXG4gIHZhciByZXMgPSBuZXcgWWFsbGlzdCgpXG4gIGZvciAodmFyIHdhbGtlciA9IHRoaXMuaGVhZDsgd2Fsa2VyICE9PSBudWxsOykge1xuICAgIHJlcy5wdXNoKGZuLmNhbGwodGhpc3AsIHdhbGtlci52YWx1ZSwgdGhpcykpXG4gICAgd2Fsa2VyID0gd2Fsa2VyLm5leHRcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbllhbGxpc3QucHJvdG90eXBlLm1hcFJldmVyc2UgPSBmdW5jdGlvbiAoZm4sIHRoaXNwKSB7XG4gIHRoaXNwID0gdGhpc3AgfHwgdGhpc1xuICB2YXIgcmVzID0gbmV3IFlhbGxpc3QoKVxuICBmb3IgKHZhciB3YWxrZXIgPSB0aGlzLnRhaWw7IHdhbGtlciAhPT0gbnVsbDspIHtcbiAgICByZXMucHVzaChmbi5jYWxsKHRoaXNwLCB3YWxrZXIudmFsdWUsIHRoaXMpKVxuICAgIHdhbGtlciA9IHdhbGtlci5wcmV2XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5yZWR1Y2UgPSBmdW5jdGlvbiAoZm4sIGluaXRpYWwpIHtcbiAgdmFyIGFjY1xuICB2YXIgd2Fsa2VyID0gdGhpcy5oZWFkXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIGFjYyA9IGluaXRpYWxcbiAgfSBlbHNlIGlmICh0aGlzLmhlYWQpIHtcbiAgICB3YWxrZXIgPSB0aGlzLmhlYWQubmV4dFxuICAgIGFjYyA9IHRoaXMuaGVhZC52YWx1ZVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1JlZHVjZSBvZiBlbXB0eSBsaXN0IHdpdGggbm8gaW5pdGlhbCB2YWx1ZScpXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgd2Fsa2VyICE9PSBudWxsOyBpKyspIHtcbiAgICBhY2MgPSBmbihhY2MsIHdhbGtlci52YWx1ZSwgaSlcbiAgICB3YWxrZXIgPSB3YWxrZXIubmV4dFxuICB9XG5cbiAgcmV0dXJuIGFjY1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5yZWR1Y2VSZXZlcnNlID0gZnVuY3Rpb24gKGZuLCBpbml0aWFsKSB7XG4gIHZhciBhY2NcbiAgdmFyIHdhbGtlciA9IHRoaXMudGFpbFxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICBhY2MgPSBpbml0aWFsXG4gIH0gZWxzZSBpZiAodGhpcy50YWlsKSB7XG4gICAgd2Fsa2VyID0gdGhpcy50YWlsLnByZXZcbiAgICBhY2MgPSB0aGlzLnRhaWwudmFsdWVcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWR1Y2Ugb2YgZW1wdHkgbGlzdCB3aXRoIG5vIGluaXRpYWwgdmFsdWUnKVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IHRoaXMubGVuZ3RoIC0gMTsgd2Fsa2VyICE9PSBudWxsOyBpLS0pIHtcbiAgICBhY2MgPSBmbihhY2MsIHdhbGtlci52YWx1ZSwgaSlcbiAgICB3YWxrZXIgPSB3YWxrZXIucHJldlxuICB9XG5cbiAgcmV0dXJuIGFjY1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXJyID0gbmV3IEFycmF5KHRoaXMubGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMCwgd2Fsa2VyID0gdGhpcy5oZWFkOyB3YWxrZXIgIT09IG51bGw7IGkrKykge1xuICAgIGFycltpXSA9IHdhbGtlci52YWx1ZVxuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cbiAgcmV0dXJuIGFyclxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS50b0FycmF5UmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFyciA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDAsIHdhbGtlciA9IHRoaXMudGFpbDsgd2Fsa2VyICE9PSBudWxsOyBpKyspIHtcbiAgICBhcnJbaV0gPSB3YWxrZXIudmFsdWVcbiAgICB3YWxrZXIgPSB3YWxrZXIucHJldlxuICB9XG4gIHJldHVybiBhcnJcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgdG8gPSB0byB8fCB0aGlzLmxlbmd0aFxuICBpZiAodG8gPCAwKSB7XG4gICAgdG8gKz0gdGhpcy5sZW5ndGhcbiAgfVxuICBmcm9tID0gZnJvbSB8fCAwXG4gIGlmIChmcm9tIDwgMCkge1xuICAgIGZyb20gKz0gdGhpcy5sZW5ndGhcbiAgfVxuICB2YXIgcmV0ID0gbmV3IFlhbGxpc3QoKVxuICBpZiAodG8gPCBmcm9tIHx8IHRvIDwgMCkge1xuICAgIHJldHVybiByZXRcbiAgfVxuICBpZiAoZnJvbSA8IDApIHtcbiAgICBmcm9tID0gMFxuICB9XG4gIGlmICh0byA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdG8gPSB0aGlzLmxlbmd0aFxuICB9XG4gIGZvciAodmFyIGkgPSAwLCB3YWxrZXIgPSB0aGlzLmhlYWQ7IHdhbGtlciAhPT0gbnVsbCAmJiBpIDwgZnJvbTsgaSsrKSB7XG4gICAgd2Fsa2VyID0gd2Fsa2VyLm5leHRcbiAgfVxuICBmb3IgKDsgd2Fsa2VyICE9PSBudWxsICYmIGkgPCB0bzsgaSsrLCB3YWxrZXIgPSB3YWxrZXIubmV4dCkge1xuICAgIHJldC5wdXNoKHdhbGtlci52YWx1ZSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbllhbGxpc3QucHJvdG90eXBlLnNsaWNlUmV2ZXJzZSA9IGZ1bmN0aW9uIChmcm9tLCB0bykge1xuICB0byA9IHRvIHx8IHRoaXMubGVuZ3RoXG4gIGlmICh0byA8IDApIHtcbiAgICB0byArPSB0aGlzLmxlbmd0aFxuICB9XG4gIGZyb20gPSBmcm9tIHx8IDBcbiAgaWYgKGZyb20gPCAwKSB7XG4gICAgZnJvbSArPSB0aGlzLmxlbmd0aFxuICB9XG4gIHZhciByZXQgPSBuZXcgWWFsbGlzdCgpXG4gIGlmICh0byA8IGZyb20gfHwgdG8gPCAwKSB7XG4gICAgcmV0dXJuIHJldFxuICB9XG4gIGlmIChmcm9tIDwgMCkge1xuICAgIGZyb20gPSAwXG4gIH1cbiAgaWYgKHRvID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0byA9IHRoaXMubGVuZ3RoXG4gIH1cbiAgZm9yICh2YXIgaSA9IHRoaXMubGVuZ3RoLCB3YWxrZXIgPSB0aGlzLnRhaWw7IHdhbGtlciAhPT0gbnVsbCAmJiBpID4gdG87IGktLSkge1xuICAgIHdhbGtlciA9IHdhbGtlci5wcmV2XG4gIH1cbiAgZm9yICg7IHdhbGtlciAhPT0gbnVsbCAmJiBpID4gZnJvbTsgaS0tLCB3YWxrZXIgPSB3YWxrZXIucHJldikge1xuICAgIHJldC5wdXNoKHdhbGtlci52YWx1ZSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbllhbGxpc3QucHJvdG90eXBlLnNwbGljZSA9IGZ1bmN0aW9uIChzdGFydCwgZGVsZXRlQ291bnQsIC4uLm5vZGVzKSB7XG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgc3RhcnQgPSB0aGlzLmxlbmd0aCAtIDFcbiAgfVxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSB0aGlzLmxlbmd0aCArIHN0YXJ0O1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIHdhbGtlciA9IHRoaXMuaGVhZDsgd2Fsa2VyICE9PSBudWxsICYmIGkgPCBzdGFydDsgaSsrKSB7XG4gICAgd2Fsa2VyID0gd2Fsa2VyLm5leHRcbiAgfVxuXG4gIHZhciByZXQgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgd2Fsa2VyICYmIGkgPCBkZWxldGVDb3VudDsgaSsrKSB7XG4gICAgcmV0LnB1c2god2Fsa2VyLnZhbHVlKVxuICAgIHdhbGtlciA9IHRoaXMucmVtb3ZlTm9kZSh3YWxrZXIpXG4gIH1cbiAgaWYgKHdhbGtlciA9PT0gbnVsbCkge1xuICAgIHdhbGtlciA9IHRoaXMudGFpbFxuICB9XG5cbiAgaWYgKHdhbGtlciAhPT0gdGhpcy5oZWFkICYmIHdhbGtlciAhPT0gdGhpcy50YWlsKSB7XG4gICAgd2Fsa2VyID0gd2Fsa2VyLnByZXZcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICB3YWxrZXIgPSBpbnNlcnQodGhpcywgd2Fsa2VyLCBub2Rlc1tpXSlcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5yZXZlcnNlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaGVhZCA9IHRoaXMuaGVhZFxuICB2YXIgdGFpbCA9IHRoaXMudGFpbFxuICBmb3IgKHZhciB3YWxrZXIgPSBoZWFkOyB3YWxrZXIgIT09IG51bGw7IHdhbGtlciA9IHdhbGtlci5wcmV2KSB7XG4gICAgdmFyIHAgPSB3YWxrZXIucHJldlxuICAgIHdhbGtlci5wcmV2ID0gd2Fsa2VyLm5leHRcbiAgICB3YWxrZXIubmV4dCA9IHBcbiAgfVxuICB0aGlzLmhlYWQgPSB0YWlsXG4gIHRoaXMudGFpbCA9IGhlYWRcbiAgcmV0dXJuIHRoaXNcbn1cblxuZnVuY3Rpb24gaW5zZXJ0IChzZWxmLCBub2RlLCB2YWx1ZSkge1xuICB2YXIgaW5zZXJ0ZWQgPSBub2RlID09PSBzZWxmLmhlYWQgP1xuICAgIG5ldyBOb2RlKHZhbHVlLCBudWxsLCBub2RlLCBzZWxmKSA6XG4gICAgbmV3IE5vZGUodmFsdWUsIG5vZGUsIG5vZGUubmV4dCwgc2VsZilcblxuICBpZiAoaW5zZXJ0ZWQubmV4dCA9PT0gbnVsbCkge1xuICAgIHNlbGYudGFpbCA9IGluc2VydGVkXG4gIH1cbiAgaWYgKGluc2VydGVkLnByZXYgPT09IG51bGwpIHtcbiAgICBzZWxmLmhlYWQgPSBpbnNlcnRlZFxuICB9XG5cbiAgc2VsZi5sZW5ndGgrK1xuXG4gIHJldHVybiBpbnNlcnRlZFxufVxuXG5mdW5jdGlvbiBwdXNoIChzZWxmLCBpdGVtKSB7XG4gIHNlbGYudGFpbCA9IG5ldyBOb2RlKGl0ZW0sIHNlbGYudGFpbCwgbnVsbCwgc2VsZilcbiAgaWYgKCFzZWxmLmhlYWQpIHtcbiAgICBzZWxmLmhlYWQgPSBzZWxmLnRhaWxcbiAgfVxuICBzZWxmLmxlbmd0aCsrXG59XG5cbmZ1bmN0aW9uIHVuc2hpZnQgKHNlbGYsIGl0ZW0pIHtcbiAgc2VsZi5oZWFkID0gbmV3IE5vZGUoaXRlbSwgbnVsbCwgc2VsZi5oZWFkLCBzZWxmKVxuICBpZiAoIXNlbGYudGFpbCkge1xuICAgIHNlbGYudGFpbCA9IHNlbGYuaGVhZFxuICB9XG4gIHNlbGYubGVuZ3RoKytcbn1cblxuZnVuY3Rpb24gTm9kZSAodmFsdWUsIHByZXYsIG5leHQsIGxpc3QpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE5vZGUpKSB7XG4gICAgcmV0dXJuIG5ldyBOb2RlKHZhbHVlLCBwcmV2LCBuZXh0LCBsaXN0KVxuICB9XG5cbiAgdGhpcy5saXN0ID0gbGlzdFxuICB0aGlzLnZhbHVlID0gdmFsdWVcblxuICBpZiAocHJldikge1xuICAgIHByZXYubmV4dCA9IHRoaXNcbiAgICB0aGlzLnByZXYgPSBwcmV2XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5wcmV2ID0gbnVsbFxuICB9XG5cbiAgaWYgKG5leHQpIHtcbiAgICBuZXh0LnByZXYgPSB0aGlzXG4gICAgdGhpcy5uZXh0ID0gbmV4dFxuICB9IGVsc2Uge1xuICAgIHRoaXMubmV4dCA9IG51bGxcbiAgfVxufVxuXG50cnkge1xuICAvLyBhZGQgaWYgc3VwcG9ydCBmb3IgU3ltYm9sLml0ZXJhdG9yIGlzIHByZXNlbnRcbiAgcmVxdWlyZSgnLi9pdGVyYXRvci5qcycpKFlhbGxpc3QpXG59IGNhdGNoIChlcikge31cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgVHJhbnNwb3J0V2ViVVNCIGZyb20gJ0BsZWRnZXJocS9ody10cmFuc3BvcnQtd2VidXNiJztcclxuaW1wb3J0IExlZGdlckFwcCBmcm9tICdAem9uZGF4L2xlZGdlci1jYXNwZXInO1xyXG5pbXBvcnQge0J1ZmZlcn0gZnJvbSAnYnVmZmVyJztcclxuXHJcbmNvbnN0IFNFQ19LRVlfUFJFRklYID0gJzAyJztcclxuXHJcbmNvbnN0IExlZGdlckFwcFNpbmdsZXRvbiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgZG90TmV0TGVkZ2VySW5zdGFuY2U6IGFueTtcclxuICAgIGxldCB0cmFuc3BvcnQ6IGFueTtcclxuICAgIGxldCBsZWRnZXJBcHA6IExlZGdlckFwcDtcclxuXHJcbiAgICBsZXQgaXNDb25uZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVycyhpbnN0YW5jZTogYW55KSB7XHJcbiAgICAgICAgZG90TmV0TGVkZ2VySW5zdGFuY2UgPSBpbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRWZXJzaW9uKCkge1xyXG4gICAgICAgIHRyYW5zcG9ydCA9IGF3YWl0IFRyYW5zcG9ydFdlYlVTQi5jcmVhdGUoKTtcclxuICAgICAgICBsZWRnZXJBcHAgPSBuZXcgTGVkZ2VyQXBwKHRyYW5zcG9ydCk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBsZWRnZXJBcHAuZ2V0VmVyc2lvbigpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5yZXR1cm5Db2RlICE9PSAweDkwMDApXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYEVycm9yOiAke3Jlc3BvbnNlLmVycm9yTWVzc2FnZX0gKDB4JHtyZXNwb25zZS5yZXR1cm5Db2RlLnRvU3RyaW5nKDE2KX0pLmApKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEFwcEluZm8oKSB7XHJcbiAgICAgICAgdHJhbnNwb3J0ID0gYXdhaXQgVHJhbnNwb3J0V2ViVVNCLmNyZWF0ZSgpO1xyXG4gICAgICAgIGxlZGdlckFwcCA9IG5ldyBMZWRnZXJBcHAodHJhbnNwb3J0KTtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGxlZGdlckFwcC5nZXRBcHBJbmZvKCk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnJldHVybkNvZGUgIT09IDB4OTAwMClcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihgRXJyb3I6ICR7cmVzcG9uc2UuZXJyb3JNZXNzYWdlfSAoMHgke3Jlc3BvbnNlLnJldHVybkNvZGUudG9TdHJpbmcoMTYpfSkuYCkpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gb25EaXNjb25uZWN0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIGRpc2Nvbm5lY3RlZC5cIik7XHJcblxyXG4gICAgICAgIHRyYW5zcG9ydC5jbG9zZSgpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGRvdE5ldExlZGdlckluc3RhbmNlICE9PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgZG90TmV0TGVkZ2VySW5zdGFuY2UuaW52b2tlTWV0aG9kQXN5bmMoJ1VwZGF0ZVN0YXRlJywgZmFsc2UsICcnKTtcclxuXHJcbiAgICAgICAgaXNDb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlbmNvZGVQdWJsaWNLZXkgPSAoYnl0ZXM6IFVpbnQ4QXJyYXkpOiBzdHJpbmcgPT5cclxuICAgICAgICBTRUNfS0VZX1BSRUZJWCArIEJ1ZmZlci5mcm9tKGJ5dGVzKS50b1N0cmluZygnaGV4Jyk7XHJcblxyXG4gICAgY29uc3QgZ2V0QWNjb3VudFBhdGggPSAoYWNjdElkeDogbnVtYmVyKSA9PiBgbS80NCcvNTA2Jy8wJy8wLyR7YWNjdElkeC50b1N0cmluZygpfWA7XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gY29ubmVjdChhY2N0SWR4OiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIWlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQgPSBhd2FpdCBUcmFuc3BvcnRXZWJVU0IuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQub24oJ2Rpc2Nvbm5lY3QnLCAoKSA9PiBvbkRpc2Nvbm5lY3QoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGVkZ2VyQXBwID0gbmV3IExlZGdlckFwcCh0cmFuc3BvcnQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihgRXJyb3IgY29ubmVjdGluZyB0byBhIExlZGdlciBkZXZpY2U6ICR7ZXJyb3IubWVzc2FnZX0uYCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGxlZGdlckFwcC5nZXRBZGRyZXNzQW5kUHViS2V5KGdldEFjY291bnRQYXRoKGFjY3RJZHgpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXR1cm5Db2RlICE9PSAweDkwMDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGBFcnJvciBjb25uZWN0aW5nIHRvIGEgTGVkZ2VyIGRldmljZTogJHtyZXNwb25zZS5lcnJvck1lc3NhZ2V9ICgweCR7cmVzcG9uc2UucmV0dXJuQ29kZS50b1N0cmluZygxNil9KS5gKSk7XHJcblxyXG4gICAgICAgICAgICBpc0Nvbm5lY3RlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVQayA9IGVuY29kZVB1YmxpY0tleShyZXNwb25zZS5wdWJsaWNLZXkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb3ROZXRMZWRnZXJJbnN0YW5jZSAhPT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgICAgICAgICBkb3ROZXRMZWRnZXJJbnN0YW5jZS5pbnZva2VNZXRob2RBc3luYygnVXBkYXRlU3RhdGUnLCB0cnVlLCBhY3RpdmVQayk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYWN0aXZlUGs7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGdldEFjY291bnQoYWNjdElkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICAgICAgaWYgKGlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydC5jbG9zZSgpO1xyXG4gICAgICAgICAgICBpc0Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvdE5ldExlZGdlckluc3RhbmNlICE9PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgICAgIGRvdE5ldExlZGdlckluc3RhbmNlLmludm9rZU1ldGhvZEFzeW5jKCdVcGRhdGVTdGF0ZScsIGZhbHNlLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEFjY291bnQoYWNjdElkeDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbGVkZ2VyQXBwLmdldEFkZHJlc3NBbmRQdWJLZXkoZ2V0QWNjb3VudFBhdGgoYWNjdElkeCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJldHVybkNvZGUgIT09IDB4OTAwMClcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYEVycm9yOiAke3Jlc3BvbnNlLmVycm9yTWVzc2FnZX0gKDB4JHtyZXNwb25zZS5yZXR1cm5Db2RlLnRvU3RyaW5nKDE2KX0pLmApKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZVBrID0gZW5jb2RlUHVibGljS2V5KHJlc3BvbnNlLnB1YmxpY0tleSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvdE5ldExlZGdlckluc3RhbmNlICE9PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgICAgIGRvdE5ldExlZGdlckluc3RhbmNlLmludm9rZU1ldGhvZEFzeW5jKCdVcGRhdGVTdGF0ZScsIHRydWUsIGFjdGl2ZVBrKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhY3RpdmVQaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihgTm90IGNvbm5lY3RlZC5gKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gc2hvd0FjY291bnQoYWNjdElkeDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbGVkZ2VyQXBwLnNob3dBZGRyZXNzQW5kUHViS2V5KGdldEFjY291bnRQYXRoKGFjY3RJZHgpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXR1cm5Db2RlID09PSAweDY5ODYpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXR1cm5Db2RlICE9PSAweDkwMDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGBFcnJvcjogJHtyZXNwb25zZS5lcnJvck1lc3NhZ2V9ICgweCR7cmVzcG9uc2UucmV0dXJuQ29kZS50b1N0cmluZygxNil9KS5gKSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVQayA9IGVuY29kZVB1YmxpY0tleShyZXNwb25zZS5wdWJsaWNLZXkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb3ROZXRMZWRnZXJJbnN0YW5jZSAhPT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgICAgICAgICBkb3ROZXRMZWRnZXJJbnN0YW5jZS5pbnZva2VNZXRob2RBc3luYygnVXBkYXRlU3RhdGUnLCB0cnVlLCBhY3RpdmVQayk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYWN0aXZlUGs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYE5vdCBjb25uZWN0ZWQuYCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNpZ24oYWNjdElkeDogbnVtYmVyLCBkZXBsb3lCeXRlczogYW55KSB7XHJcbiAgICAgICAgaWYgKGlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlZGdlckFwcCA9IG5ldyBMZWRnZXJBcHAodHJhbnNwb3J0KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbGVkZ2VyQXBwLnNpZ24oZ2V0QWNjb3VudFBhdGgoYWNjdElkeCksIGRlcGxveUJ5dGVzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXR1cm5Db2RlID09PSAweDY5ODYpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXR1cm5Db2RlICE9PSAweDkwMDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGBFcnJvcjogJHtyZXNwb25zZS5lcnJvck1lc3NhZ2V9ICgweCR7cmVzcG9uc2UucmV0dXJuQ29kZS50b1N0cmluZygxNil9KS5gKSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2lnbiBjb21wbGV0ZWQ6ICcgKyByZXNwb25zZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gU0VDX0tFWV9QUkVGSVggKyByZXNwb25zZS5zaWduYXR1cmVSUy50b1N0cmluZygnaGV4Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYE5vdCBjb25uZWN0ZWQuYCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnMsXHJcbiAgICAgICAgY29ubmVjdCxcclxuICAgICAgICBkaXNjb25uZWN0LFxyXG4gICAgICAgIGdldFZlcnNpb24sXHJcbiAgICAgICAgZ2V0QXBwSW5mbyxcclxuICAgICAgICBpc0Nvbm5lY3RlZDogKCkgPT4gaXNDb25uZWN0ZWQsXHJcbiAgICAgICAgZ2V0QWNjb3VudCxcclxuICAgICAgICBzaG93QWNjb3VudCxcclxuICAgICAgICBzaWduXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZEV2ZW50TGlzdGVuZXJzID0gKHJlZjogYW55KSA9PiBMZWRnZXJBcHBTaW5nbGV0b24uYWRkRXZlbnRMaXN0ZW5lcnMocmVmKTtcclxuZXhwb3J0IGNvbnN0IGdldFZlcnNpb24gPSBhc3luYyAoKSA9PiBhd2FpdCBMZWRnZXJBcHBTaW5nbGV0b24uZ2V0VmVyc2lvbigpO1xyXG5leHBvcnQgY29uc3QgZ2V0QXBwSW5mbyA9IGFzeW5jICgpID0+IGF3YWl0IExlZGdlckFwcFNpbmdsZXRvbi5nZXRBcHBJbmZvKCk7XHJcbmV4cG9ydCBjb25zdCBjb25uZWN0ID0gYXN5bmMgKGFjY3RJZHg6IG51bWJlcikgPT4gYXdhaXQgTGVkZ2VyQXBwU2luZ2xldG9uLmNvbm5lY3QoYWNjdElkeCk7XHJcbmV4cG9ydCBjb25zdCBkaXNjb25uZWN0ID0gKCkgPT4gTGVkZ2VyQXBwU2luZ2xldG9uLmRpc2Nvbm5lY3QoKTtcclxuZXhwb3J0IGNvbnN0IGlzQ29ubmVjdGVkID0gKCkgPT4gTGVkZ2VyQXBwU2luZ2xldG9uLmlzQ29ubmVjdGVkKCk7XHJcbmV4cG9ydCBjb25zdCBnZXRBY2NvdW50ID0gYXN5bmMgKGFjY3RJZHg6IG51bWJlcikgPT4gTGVkZ2VyQXBwU2luZ2xldG9uLmdldEFjY291bnQoYWNjdElkeCk7XHJcbmV4cG9ydCBjb25zdCBzaG93QWNjb3VudCA9IGFzeW5jIChhY2N0SWR4OiBudW1iZXIpID0+IExlZGdlckFwcFNpbmdsZXRvbi5zaG93QWNjb3VudChhY2N0SWR4KTtcclxuZXhwb3J0IGNvbnN0IHNpZ24gPSBhc3luYyAoYWNjdElkeDogbnVtYmVyLCBkZXBsb3lCeXRlczogYW55KSA9PiBMZWRnZXJBcHBTaW5nbGV0b24uc2lnbihhY2N0SWR4LCBkZXBsb3lCeXRlcyk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==