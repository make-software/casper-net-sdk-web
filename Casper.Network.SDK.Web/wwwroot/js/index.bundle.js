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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
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
    function onDisconnect() {
        console.log("Device disconnected.");
        if (typeof dotNetLedgerInstance !== 'undefined')
            dotNetLedgerInstance.invokeMethodAsync('UpdateState', false, '');
        isConnected = false;
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
                    case 6: return [4 /*yield*/, getAccount(0)];
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
var connect = function (acctIdx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, LedgerAppSingleton.connect(acctIdx)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
var disconnect = function () { return LedgerAppSingleton.disconnect(); };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWMsaUJBQWlCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaURBQWlELEVBQUU7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZUFBZTtBQUN4QztBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSx5QkFBeUIsUUFBUTtBQUNqQztBQUNBLHNCQUFzQixlQUFlO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVE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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUEsa0NBQWtDLFFBQVE7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLFFBQVE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQzdVQTtBQUNB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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1REFBdUQsUUFBUTtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDOVJBLGNBQWMs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O0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUM3TkEsY0FBYyxtQkFBTyxDQUFDLGdFQUFrQjs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDUEEsY0FBYyxtQkFBTyxDQUFDLGdFQUFrQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNWWTtBQUNaO0FBQ0E7QUFDQSxpQ0FBaUMsUUFBUTtBQUN6QztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDUFk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QUM7QUFDckUsSUFBTSxVQUFVLEdBQUc7O2dCQUFZLHFCQUFNLGtCQUFrQixDQUFDLFVBQVUsRUFBRTtnQkFBckMsK0JBQXFDOztTQUFBLENBQUM7QUFDckUsSUFBTSxXQUFXLEdBQUcsY0FBTSx5QkFBa0IsQ0FBQyxXQUFXLEVBQUUsRUFBaEMsQ0FBZ0MsQ0FBQztBQUMzRCxJQUFNLFVBQVUsR0FBRyxVQUFPLE9BQWU7SUFBSyx3Q0FBa0IsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO1NBQUEsQ0FBQztBQUNyRixJQUFNLFdBQVcsR0FBRyxVQUFPLE9BQWU7SUFBSyx3Q0FBa0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1NBQUEsQ0FBQztBQUN2RixJQUFNLElBQUksR0FBRyxVQUFPLE9BQWUsRUFBRSxXQUFnQjtJQUFLLHdDQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDO1NBQUEsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvQGxlZGdlcmhxL2RldmljZXMvbGliLWVzL2luZGV4LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvQGxlZGdlcmhxL2RldmljZXMvbGliL2hpZC1mcmFtaW5nLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvQGxlZGdlcmhxL2Vycm9ycy9saWItZXMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL0BsZWRnZXJocS9lcnJvcnMvbGliLWVzL2luZGV4LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvQGxlZGdlcmhxL2h3LXRyYW5zcG9ydC13ZWJ1c2IvbGliLWVzL1RyYW5zcG9ydFdlYlVTQi5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL0BsZWRnZXJocS9ody10cmFuc3BvcnQtd2VidXNiL2xpYi1lcy93ZWJ1c2IuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9AbGVkZ2VyaHEvaHctdHJhbnNwb3J0L2xpYi1lcy9UcmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9AbGVkZ2VyaHEvbG9ncy9saWItZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9Aem9uZGF4L2xlZGdlci1jYXNwZXIvZGlzdC9jb21tb24uanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9Aem9uZGF4L2xlZGdlci1jYXNwZXIvZGlzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL0B6b25kYXgvbGVkZ2VyLWNhc3Blci9kaXN0L3R5cGVzLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9scnUtY2FjaGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvY2xhc3Nlcy9jb21wYXJhdG9yLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2NsYXNzZXMvcmFuZ2UuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvY2xhc3Nlcy9zZW12ZXIuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2NsZWFuLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9jbXAuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2NvZXJjZS5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvY29tcGFyZS1idWlsZC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvY29tcGFyZS1sb29zZS5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvY29tcGFyZS5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvZGlmZi5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvZXEuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2d0LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9ndGUuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2luYy5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvbHQuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2x0ZS5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvbWFqb3IuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL21pbm9yLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9uZXEuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3BhcnNlLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9wYXRjaC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvcHJlcmVsZWFzZS5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvcmNvbXBhcmUuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3Jzb3J0LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9zYXRpc2ZpZXMuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3NvcnQuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3ZhbGlkLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2luZGV4LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2ludGVybmFsL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbnRlcm5hbC9kZWJ1Zy5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbnRlcm5hbC9pZGVudGlmaWVycy5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbnRlcm5hbC9wYXJzZS1vcHRpb25zLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2ludGVybmFsL3JlLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9ndHIuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL2ludGVyc2VjdHMuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL2x0ci5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvbWF4LXNhdGlzZnlpbmcuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL21pbi1zYXRpc2Z5aW5nLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9taW4tdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvb3V0c2lkZS5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvc2ltcGxpZnkuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL3N1YnNldC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvdG8tY29tcGFyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL3ZhbGlkLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMveWFsbGlzdC9pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3lhbGxpc3QveWFsbGlzdC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xlZGdlckludGVyb3Avd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xlZGdlckludGVyb3Avd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXG4gICAgICAgICAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfTtcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG52YXIgX2E7XG5pbXBvcnQgc2VtdmVyIGZyb20gXCJzZW12ZXJcIjtcbi8qKlxuICogVGhlIFVTQiBwcm9kdWN0IElEcyB3aWxsIGJlIGRlZmluZWQgYXMgTU1JSSwgZW5jb2RpbmcgYSBtb2RlbCAoTU0pIGFuZCBhbiBpbnRlcmZhY2UgYml0ZmllbGQgKElJKVxuICpcbiAqKiBNb2RlbFxuICogTGVkZ2VyIE5hbm8gUyA6IDB4MTBcbiAqIExlZGdlciBCbHVlIDogMHgwMFxuICogTGVkZ2VyIE5hbm8gWCA6IDB4NDBcbiAqXG4gKiogSW50ZXJmYWNlIHN1cHBvcnQgYml0ZmllbGRcbiAqIEdlbmVyaWMgSElEIDogMHgwMVxuICogS2V5Ym9hcmQgSElEIDogMHgwMlxuICogVTJGIDogMHgwNFxuICogQ0NJRCA6IDB4MDhcbiAqIFdlYlVTQiA6IDB4MTBcbiAqL1xuZXhwb3J0IHZhciBJSUdlbmVyaWNISUQgPSAweDAxO1xuZXhwb3J0IHZhciBJSUtleWJvYXJkSElEID0gMHgwMjtcbmV4cG9ydCB2YXIgSUlVMkYgPSAweDA0O1xuZXhwb3J0IHZhciBJSUNDSUQgPSAweDA4O1xuZXhwb3J0IHZhciBJSVdlYlVTQiA9IDB4MTA7XG5leHBvcnQgdmFyIERldmljZU1vZGVsSWQ7XG4oZnVuY3Rpb24gKERldmljZU1vZGVsSWQpIHtcbiAgICBEZXZpY2VNb2RlbElkW1wiYmx1ZVwiXSA9IFwiYmx1ZVwiO1xuICAgIERldmljZU1vZGVsSWRbXCJuYW5vU1wiXSA9IFwibmFub1NcIjtcbiAgICBEZXZpY2VNb2RlbElkW1wibmFub1NQXCJdID0gXCJuYW5vU1BcIjtcbiAgICBEZXZpY2VNb2RlbElkW1wibmFub1hcIl0gPSBcIm5hbm9YXCI7XG59KShEZXZpY2VNb2RlbElkIHx8IChEZXZpY2VNb2RlbElkID0ge30pKTtcbnZhciBkZXZpY2VzID0gKF9hID0ge30sXG4gICAgX2FbRGV2aWNlTW9kZWxJZC5ibHVlXSA9IHtcbiAgICAgICAgaWQ6IERldmljZU1vZGVsSWQuYmx1ZSxcbiAgICAgICAgcHJvZHVjdE5hbWU6IFwiTGVkZ2VywqBCbHVlXCIsXG4gICAgICAgIHByb2R1Y3RJZE1NOiAweDAwLFxuICAgICAgICBsZWdhY3lVc2JQcm9kdWN0SWQ6IDB4MDAwMCxcbiAgICAgICAgdXNiT25seTogdHJ1ZSxcbiAgICAgICAgbWVtb3J5U2l6ZTogNDgwICogMTAyNCxcbiAgICAgICAgbWFza3M6IFsweDMxMDAwMDAwLCAweDMxMDEwMDAwXSxcbiAgICAgICAgZ2V0QmxvY2tTaXplOiBmdW5jdGlvbiAoX2ZpcndhcmVWZXJzaW9uKSB7IHJldHVybiA0ICogMTAyNDsgfVxuICAgIH0sXG4gICAgX2FbRGV2aWNlTW9kZWxJZC5uYW5vU10gPSB7XG4gICAgICAgIGlkOiBEZXZpY2VNb2RlbElkLm5hbm9TLFxuICAgICAgICBwcm9kdWN0TmFtZTogXCJMZWRnZXLCoE5hbm/CoFNcIixcbiAgICAgICAgcHJvZHVjdElkTU06IDB4MTAsXG4gICAgICAgIGxlZ2FjeVVzYlByb2R1Y3RJZDogMHgwMDAxLFxuICAgICAgICB1c2JPbmx5OiB0cnVlLFxuICAgICAgICBtZW1vcnlTaXplOiAzMjAgKiAxMDI0LFxuICAgICAgICBtYXNrczogWzB4MzExMDAwMDBdLFxuICAgICAgICBnZXRCbG9ja1NpemU6IGZ1bmN0aW9uIChmaXJtd2FyZVZlcnNpb24pIHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIHJldHVybiBzZW12ZXIubHQoKF9hID0gc2VtdmVyLmNvZXJjZShmaXJtd2FyZVZlcnNpb24pKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBcIlwiLCBcIjIuMC4wXCIpXG4gICAgICAgICAgICAgICAgPyA0ICogMTAyNFxuICAgICAgICAgICAgICAgIDogMiAqIDEwMjQ7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9hW0RldmljZU1vZGVsSWQubmFub1NQXSA9IHtcbiAgICAgICAgaWQ6IERldmljZU1vZGVsSWQubmFub1NQLFxuICAgICAgICBwcm9kdWN0TmFtZTogXCJMZWRnZXIgTmFubyBTIFBsdXNcIixcbiAgICAgICAgcHJvZHVjdElkTU06IDB4NTAsXG4gICAgICAgIGxlZ2FjeVVzYlByb2R1Y3RJZDogMHgwMDA1LFxuICAgICAgICB1c2JPbmx5OiB0cnVlLFxuICAgICAgICBtZW1vcnlTaXplOiAxNTMzICogMTAyNCxcbiAgICAgICAgbWFza3M6IFsweDMzMTAwMDAwXSxcbiAgICAgICAgZ2V0QmxvY2tTaXplOiBmdW5jdGlvbiAoX2Zpcm13YXJlVmVyc2lvbikgeyByZXR1cm4gMzI7IH1cbiAgICB9LFxuICAgIF9hW0RldmljZU1vZGVsSWQubmFub1hdID0ge1xuICAgICAgICBpZDogRGV2aWNlTW9kZWxJZC5uYW5vWCxcbiAgICAgICAgcHJvZHVjdE5hbWU6IFwiTGVkZ2VywqBOYW5vwqBYXCIsXG4gICAgICAgIHByb2R1Y3RJZE1NOiAweDQwLFxuICAgICAgICBsZWdhY3lVc2JQcm9kdWN0SWQ6IDB4MDAwNCxcbiAgICAgICAgdXNiT25seTogZmFsc2UsXG4gICAgICAgIG1lbW9yeVNpemU6IDIgKiAxMDI0ICogMTAyNCxcbiAgICAgICAgbWFza3M6IFsweDMzMDAwMDAwXSxcbiAgICAgICAgZ2V0QmxvY2tTaXplOiBmdW5jdGlvbiAoX2ZpcndhcmVWZXJzaW9uKSB7IHJldHVybiA0ICogMTAyNDsgfSxcbiAgICAgICAgYmx1ZXRvb3RoU3BlYzogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIGxlZ2FjeSBvbmUgKHByb3RvdHlwZSB2ZXJzaW9uKS4gd2Ugd2lsbCBldmVudHVhbGx5IGRyb3AgaXQuXG4gICAgICAgICAgICAgICAgc2VydmljZVV1aWQ6IFwiZDk3M2YyZTAtYjE5ZS0xMWUyLTllOTYtMDgwMDIwMGM5YTY2XCIsXG4gICAgICAgICAgICAgICAgbm90aWZ5VXVpZDogXCJkOTczZjJlMS1iMTllLTExZTItOWU5Ni0wODAwMjAwYzlhNjZcIixcbiAgICAgICAgICAgICAgICB3cml0ZVV1aWQ6IFwiZDk3M2YyZTItYjE5ZS0xMWUyLTllOTYtMDgwMDIwMGM5YTY2XCIsXG4gICAgICAgICAgICAgICAgd3JpdGVDbWRVdWlkOiBcImQ5NzNmMmUzLWIxOWUtMTFlMi05ZTk2LTA4MDAyMDBjOWE2NlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlcnZpY2VVdWlkOiBcIjEzZDYzNDAwLTJjOTctMDAwNC0wMDAwLTRjNjU2NDY3NjU3MlwiLFxuICAgICAgICAgICAgICAgIG5vdGlmeVV1aWQ6IFwiMTNkNjM0MDAtMmM5Ny0wMDA0LTAwMDEtNGM2NTY0Njc2NTcyXCIsXG4gICAgICAgICAgICAgICAgd3JpdGVVdWlkOiBcIjEzZDYzNDAwLTJjOTctMDAwNC0wMDAyLTRjNjU2NDY3NjU3MlwiLFxuICAgICAgICAgICAgICAgIHdyaXRlQ21kVXVpZDogXCIxM2Q2MzQwMC0yYzk3LTAwMDQtMDAwMy00YzY1NjQ2NzY1NzJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgXVxuICAgIH0sXG4gICAgX2EpO1xudmFyIHByb2R1Y3RNYXAgPSB7XG4gICAgQmx1ZTogRGV2aWNlTW9kZWxJZC5ibHVlLFxuICAgIFwiTmFubyBTXCI6IERldmljZU1vZGVsSWQubmFub1MsXG4gICAgXCJOYW5vIFhcIjogRGV2aWNlTW9kZWxJZC5uYW5vWFxufTtcbnZhciBkZXZpY2VzTGlzdCA9IE9iamVjdC52YWx1ZXMoZGV2aWNlcyk7XG4vKipcbiAqXG4gKi9cbmV4cG9ydCB2YXIgbGVkZ2VyVVNCVmVuZG9ySWQgPSAweDJjOTc7XG4vKipcbiAqXG4gKi9cbmV4cG9ydCB2YXIgZ2V0RGV2aWNlTW9kZWwgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaW5mbyA9IGRldmljZXNbaWRdO1xuICAgIGlmICghaW5mbylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZGV2aWNlICdcIiArIGlkICsgXCInIGRvZXMgbm90IGV4aXN0XCIpO1xuICAgIHJldHVybiBpbmZvO1xufTtcbi8qKlxuICogR2l2ZW4gYSBgdGFyZ2V0SWRgLCByZXR1cm4gdGhlIGRldmljZU1vZGVsIGFzc29jaWF0ZWQgdG8gaXQsXG4gKiBiYXNlZCBvbiB0aGUgZmlyc3QgdHdvIGJ5dGVzLlxuICovXG5leHBvcnQgdmFyIGlkZW50aWZ5VGFyZ2V0SWQgPSBmdW5jdGlvbiAodGFyZ2V0SWQpIHtcbiAgICB2YXIgZGV2aWNlTW9kZWwgPSBkZXZpY2VzTGlzdC5maW5kKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgbWFza3MgPSBfYS5tYXNrcztcbiAgICAgICAgcmV0dXJuIG1hc2tzLmZpbmQoZnVuY3Rpb24gKG1hc2spIHsgcmV0dXJuICh0YXJnZXRJZCAmIDB4ZmZmZjAwMDApID09PSBtYXNrOyB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGV2aWNlTW9kZWw7XG59O1xuLyoqXG4gKlxuICovXG5leHBvcnQgdmFyIGlkZW50aWZ5VVNCUHJvZHVjdElkID0gZnVuY3Rpb24gKHVzYlByb2R1Y3RJZCkge1xuICAgIHZhciBsZWdhY3kgPSBkZXZpY2VzTGlzdC5maW5kKGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLmxlZ2FjeVVzYlByb2R1Y3RJZCA9PT0gdXNiUHJvZHVjdElkOyB9KTtcbiAgICBpZiAobGVnYWN5KVxuICAgICAgICByZXR1cm4gbGVnYWN5O1xuICAgIHZhciBtbSA9IHVzYlByb2R1Y3RJZCA+PiA4O1xuICAgIHZhciBkZXZpY2VNb2RlbCA9IGRldmljZXNMaXN0LmZpbmQoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQucHJvZHVjdElkTU0gPT09IG1tOyB9KTtcbiAgICByZXR1cm4gZGV2aWNlTW9kZWw7XG59O1xuZXhwb3J0IHZhciBpZGVudGlmeVByb2R1Y3ROYW1lID0gZnVuY3Rpb24gKHByb2R1Y3ROYW1lKSB7XG4gICAgdmFyIHByb2R1Y3RJZCA9IHByb2R1Y3RNYXBbcHJvZHVjdE5hbWVdO1xuICAgIGlmICghcHJvZHVjdElkICYmIHByb2R1Y3ROYW1lLnN0YXJ0c1dpdGgoXCJOYW5vIFNcIikpIHtcbiAgICAgICAgcHJvZHVjdElkID0gRGV2aWNlTW9kZWxJZC5uYW5vU1A7XG4gICAgfVxuICAgIHZhciBkZXZpY2VNb2RlbCA9IGRldmljZXNMaXN0LmZpbmQoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQuaWQgPT09IHByb2R1Y3RJZDsgfSk7XG4gICAgcmV0dXJuIGRldmljZU1vZGVsO1xufTtcbnZhciBibHVldG9vdGhTZXJ2aWNlcyA9IFtdO1xudmFyIHNlcnZpY2VVdWlkVG9JbmZvcyA9IHt9O1xuZm9yICh2YXIgaWQgaW4gZGV2aWNlcykge1xuICAgIHZhciBkZXZpY2VNb2RlbCA9IGRldmljZXNbaWRdO1xuICAgIHZhciBibHVldG9vdGhTcGVjID0gZGV2aWNlTW9kZWwuYmx1ZXRvb3RoU3BlYztcbiAgICBpZiAoYmx1ZXRvb3RoU3BlYykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsdWV0b290aFNwZWMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzcGVjID0gYmx1ZXRvb3RoU3BlY1tpXTtcbiAgICAgICAgICAgIGJsdWV0b290aFNlcnZpY2VzLnB1c2goc3BlYy5zZXJ2aWNlVXVpZCk7XG4gICAgICAgICAgICBzZXJ2aWNlVXVpZFRvSW5mb3Nbc3BlYy5zZXJ2aWNlVXVpZF0gPSBzZXJ2aWNlVXVpZFRvSW5mb3Nbc3BlYy5zZXJ2aWNlVXVpZC5yZXBsYWNlKC8tL2csIFwiXCIpXSA9IF9fYXNzaWduKHsgZGV2aWNlTW9kZWw6IGRldmljZU1vZGVsIH0sIHNwZWMpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKlxuICovXG5leHBvcnQgdmFyIGdldEJsdWV0b290aFNlcnZpY2VVdWlkcyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJsdWV0b290aFNlcnZpY2VzOyB9O1xuLyoqXG4gKlxuICovXG5leHBvcnQgdmFyIGdldEluZm9zRm9yU2VydmljZVV1aWQgPSBmdW5jdGlvbiAodXVpZCkgeyByZXR1cm4gc2VydmljZVV1aWRUb0luZm9zW3V1aWQudG9Mb3dlckNhc2UoKV07IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgZXJyb3JzXzEgPSByZXF1aXJlKFwiQGxlZGdlcmhxL2Vycm9yc1wiKTtcbnZhciBUYWcgPSAweDA1O1xuZnVuY3Rpb24gYXNVSW50MTZCRSh2YWx1ZSkge1xuICAgIHZhciBiID0gQnVmZmVyLmFsbG9jKDIpO1xuICAgIGIud3JpdGVVSW50MTZCRSh2YWx1ZSwgMCk7XG4gICAgcmV0dXJuIGI7XG59XG52YXIgaW5pdGlhbEFjYyA9IHtcbiAgICBkYXRhOiBCdWZmZXIuYWxsb2MoMCksXG4gICAgZGF0YUxlbmd0aDogMCxcbiAgICBzZXF1ZW5jZTogMFxufTtcbi8qKlxuICpcbiAqL1xudmFyIGNyZWF0ZUhJRGZyYW1pbmcgPSBmdW5jdGlvbiAoY2hhbm5lbCwgcGFja2V0U2l6ZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIG1ha2VCbG9ja3M6IGZ1bmN0aW9uIChhcGR1KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IEJ1ZmZlci5jb25jYXQoW2FzVUludDE2QkUoYXBkdS5sZW5ndGgpLCBhcGR1XSk7XG4gICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gcGFja2V0U2l6ZSAtIDU7XG4gICAgICAgICAgICB2YXIgbmJCbG9ja3MgPSBNYXRoLmNlaWwoZGF0YS5sZW5ndGggLyBibG9ja1NpemUpO1xuICAgICAgICAgICAgZGF0YSA9IEJ1ZmZlci5jb25jYXQoW1xuICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgQnVmZmVyLmFsbG9jKG5iQmxvY2tzICogYmxvY2tTaXplIC0gZGF0YS5sZW5ndGggKyAxKS5maWxsKDApLFxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB2YXIgYmxvY2tzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5iQmxvY2tzOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaGVhZCA9IEJ1ZmZlci5hbGxvYyg1KTtcbiAgICAgICAgICAgICAgICBoZWFkLndyaXRlVUludDE2QkUoY2hhbm5lbCwgMCk7XG4gICAgICAgICAgICAgICAgaGVhZC53cml0ZVVJbnQ4KFRhZywgMik7XG4gICAgICAgICAgICAgICAgaGVhZC53cml0ZVVJbnQxNkJFKGksIDMpO1xuICAgICAgICAgICAgICAgIHZhciBjaHVuayA9IGRhdGEuc2xpY2UoaSAqIGJsb2NrU2l6ZSwgKGkgKyAxKSAqIGJsb2NrU2l6ZSk7XG4gICAgICAgICAgICAgICAgYmxvY2tzLnB1c2goQnVmZmVyLmNvbmNhdChbaGVhZCwgY2h1bmtdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYmxvY2tzO1xuICAgICAgICB9LFxuICAgICAgICByZWR1Y2VSZXNwb25zZTogZnVuY3Rpb24gKGFjYywgY2h1bmspIHtcbiAgICAgICAgICAgIHZhciBfYSA9IGFjYyB8fCBpbml0aWFsQWNjLCBkYXRhID0gX2EuZGF0YSwgZGF0YUxlbmd0aCA9IF9hLmRhdGFMZW5ndGgsIHNlcXVlbmNlID0gX2Euc2VxdWVuY2U7XG4gICAgICAgICAgICBpZiAoY2h1bmsucmVhZFVJbnQxNkJFKDApICE9PSBjaGFubmVsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yc18xLlRyYW5zcG9ydEVycm9yKFwiSW52YWxpZCBjaGFubmVsXCIsIFwiSW52YWxpZENoYW5uZWxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2h1bmsucmVhZFVJbnQ4KDIpICE9PSBUYWcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3JzXzEuVHJhbnNwb3J0RXJyb3IoXCJJbnZhbGlkIHRhZ1wiLCBcIkludmFsaWRUYWdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2h1bmsucmVhZFVJbnQxNkJFKDMpICE9PSBzZXF1ZW5jZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvcnNfMS5UcmFuc3BvcnRFcnJvcihcIkludmFsaWQgc2VxdWVuY2VcIiwgXCJJbnZhbGlkU2VxdWVuY2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWFjYykge1xuICAgICAgICAgICAgICAgIGRhdGFMZW5ndGggPSBjaHVuay5yZWFkVUludDE2QkUoNSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXF1ZW5jZSsrO1xuICAgICAgICAgICAgdmFyIGNodW5rRGF0YSA9IGNodW5rLnNsaWNlKGFjYyA/IDUgOiA3KTtcbiAgICAgICAgICAgIGRhdGEgPSBCdWZmZXIuY29uY2F0KFtkYXRhLCBjaHVua0RhdGFdKTtcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IGRhdGFMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5zbGljZSgwLCBkYXRhTGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgICBkYXRhTGVuZ3RoOiBkYXRhTGVuZ3RoLFxuICAgICAgICAgICAgICAgIHNlcXVlbmNlOiBzZXF1ZW5jZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UmVkdWNlZFJlc3VsdDogZnVuY3Rpb24gKGFjYykge1xuICAgICAgICAgICAgaWYgKGFjYyAmJiBhY2MuZGF0YUxlbmd0aCA9PT0gYWNjLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYy5kYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn07XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGNyZWF0ZUhJRGZyYW1pbmc7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oaWQtZnJhbWluZy5qcy5tYXAiLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb250aW51ZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgKi9cbnZhciBfX3ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX192YWx1ZXMpIHx8IGZ1bmN0aW9uKG8pIHtcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xufTtcbnZhciBlcnJvckNsYXNzZXMgPSB7fTtcbnZhciBkZXNlcmlhbGl6ZXJzID0ge307XG5leHBvcnQgdmFyIGFkZEN1c3RvbUVycm9yRGVzZXJpYWxpemVyID0gZnVuY3Rpb24gKG5hbWUsIGRlc2VyaWFsaXplcikge1xuICAgIGRlc2VyaWFsaXplcnNbbmFtZV0gPSBkZXNlcmlhbGl6ZXI7XG59O1xuZXhwb3J0IHZhciBjcmVhdGVDdXN0b21FcnJvckNsYXNzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgQyA9IGZ1bmN0aW9uIEN1c3RvbUVycm9yKG1lc3NhZ2UsIGZpZWxkcykge1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGZpZWxkcyk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgbmFtZTtcbiAgICAgICAgdGhpcy5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xuICAgIH07XG4gICAgQy5wcm90b3R5cGUgPSBuZXcgRXJyb3IoKTtcbiAgICBlcnJvckNsYXNzZXNbbmFtZV0gPSBDO1xuICAgIHJldHVybiBDO1xufTtcbi8vIGluc3BpcmVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Byb2dyYW1ibGUvZXJyaW8vYmxvYi9tYXN0ZXIvaW5kZXguanNcbmV4cG9ydCB2YXIgZGVzZXJpYWxpemVFcnJvciA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICBpZiAodHlwZW9mIG9iamVjdCA9PT0gXCJvYmplY3RcIiAmJiBvYmplY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vICRGbG93Rml4TWUgRklYTUUgSEFDS1xuICAgICAgICAgICAgdmFyIG1zZyA9IEpTT04ucGFyc2Uob2JqZWN0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgaWYgKG1zZy5tZXNzYWdlICYmIG1zZy5uYW1lKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0ID0gbXNnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBub3RoaW5nXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gdm9pZCAwO1xuICAgICAgICBpZiAodHlwZW9mIG9iamVjdC5uYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB2YXIgbmFtZV8xID0gb2JqZWN0Lm5hbWU7XG4gICAgICAgICAgICB2YXIgZGVzID0gZGVzZXJpYWxpemVyc1tuYW1lXzFdO1xuICAgICAgICAgICAgaWYgKGRlcykge1xuICAgICAgICAgICAgICAgIGVycm9yID0gZGVzKG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgY29uc3RydWN0b3IgPSBuYW1lXzEgPT09IFwiRXJyb3JcIiA/IEVycm9yIDogZXJyb3JDbGFzc2VzW25hbWVfMV07XG4gICAgICAgICAgICAgICAgaWYgKCFjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJkZXNlcmlhbGl6aW5nIGFuIHVua25vd24gY2xhc3MgJ1wiICsgbmFtZV8xICsgXCInXCIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MobmFtZV8xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBPYmplY3QuY3JlYXRlKGNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcltwcm9wXSA9IG9iamVjdFtwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzb21ldGltZXMgc2V0dGluZyBhIHByb3BlcnR5IGNhbiBmYWlsIChlLmcuIC5uYW1lKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKG9iamVjdC5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWVycm9yLnN0YWNrICYmIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShlcnJvciwgZGVzZXJpYWxpemVFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEVycm9yKFN0cmluZyhvYmplY3QpKTtcbn07XG4vLyBpbnNwaXJlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvc2VyaWFsaXplLWVycm9yL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG5leHBvcnQgdmFyIHNlcmlhbGl6ZUVycm9yID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIGRlc3Ryb3lDaXJjdWxhcih2YWx1ZSwgW10pO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIFwiW0Z1bmN0aW9uOiBcIiArICh2YWx1ZS5uYW1lIHx8IFwiYW5vbnltb3VzXCIpICsgXCJdXCI7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn07XG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9kZXN0cm95LWNpcmN1bGFyXG5mdW5jdGlvbiBkZXN0cm95Q2lyY3VsYXIoZnJvbSwgc2Vlbikge1xuICAgIHZhciBlXzEsIF9hO1xuICAgIHZhciB0byA9IHt9O1xuICAgIHNlZW4ucHVzaChmcm9tKTtcbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKE9iamVjdC5rZXlzKGZyb20pKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgdmFyIGtleSA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gZnJvbVtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgIHRvW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWVuLmluZGV4T2YoZnJvbVtrZXldKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0b1trZXldID0gZGVzdHJveUNpcmN1bGFyKGZyb21ba2V5XSwgc2Vlbi5zbGljZSgwKSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b1trZXldID0gXCJbQ2lyY3VsYXJdXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYltcInJldHVyblwiXSkpIF9hLmNhbGwoX2IpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBmcm9tLm5hbWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdG8ubmFtZSA9IGZyb20ubmFtZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBmcm9tLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdG8ubWVzc2FnZSA9IGZyb20ubWVzc2FnZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBmcm9tLnN0YWNrID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRvLnN0YWNrID0gZnJvbS5zdGFjaztcbiAgICB9XG4gICAgcmV0dXJuIHRvO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVscGVycy5qcy5tYXAiLCJpbXBvcnQgeyBzZXJpYWxpemVFcnJvciwgZGVzZXJpYWxpemVFcnJvciwgY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcywgYWRkQ3VzdG9tRXJyb3JEZXNlcmlhbGl6ZXIsIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuZXhwb3J0IHsgc2VyaWFsaXplRXJyb3IsIGRlc2VyaWFsaXplRXJyb3IsIGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MsIGFkZEN1c3RvbUVycm9yRGVzZXJpYWxpemVyLCB9O1xuZXhwb3J0IHZhciBBY2NvdW50TmFtZVJlcXVpcmVkRXJyb3IgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiQWNjb3VudE5hbWVSZXF1aXJlZFwiKTtcbmV4cG9ydCB2YXIgQWNjb3VudE5vdFN1cHBvcnRlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJBY2NvdW50Tm90U3VwcG9ydGVkXCIpO1xuZXhwb3J0IHZhciBBbW91bnRSZXF1aXJlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJBbW91bnRSZXF1aXJlZFwiKTtcbmV4cG9ydCB2YXIgQmx1ZXRvb3RoUmVxdWlyZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiQmx1ZXRvb3RoUmVxdWlyZWRcIik7XG5leHBvcnQgdmFyIEJ0Y1VubWF0Y2hlZEFwcCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJCdGNVbm1hdGNoZWRBcHBcIik7XG5leHBvcnQgdmFyIENhbnRPcGVuRGV2aWNlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkNhbnRPcGVuRGV2aWNlXCIpO1xuZXhwb3J0IHZhciBDYXNoQWRkck5vdFN1cHBvcnRlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJDYXNoQWRkck5vdFN1cHBvcnRlZFwiKTtcbmV4cG9ydCB2YXIgQ3VycmVuY3lOb3RTdXBwb3J0ZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiQ3VycmVuY3lOb3RTdXBwb3J0ZWRcIik7XG5leHBvcnQgdmFyIERldmljZUFwcFZlcmlmeU5vdFN1cHBvcnRlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VBcHBWZXJpZnlOb3RTdXBwb3J0ZWRcIik7XG5leHBvcnQgdmFyIERldmljZUdlbnVpbmVTb2NrZXRFYXJseUNsb3NlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRldmljZUdlbnVpbmVTb2NrZXRFYXJseUNsb3NlXCIpO1xuZXhwb3J0IHZhciBEZXZpY2VOb3RHZW51aW5lRXJyb3IgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRGV2aWNlTm90R2VudWluZVwiKTtcbmV4cG9ydCB2YXIgRGV2aWNlT25EYXNoYm9hcmRFeHBlY3RlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VPbkRhc2hib2FyZEV4cGVjdGVkXCIpO1xuZXhwb3J0IHZhciBEZXZpY2VPbkRhc2hib2FyZFVuZXhwZWN0ZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRGV2aWNlT25EYXNoYm9hcmRVbmV4cGVjdGVkXCIpO1xuZXhwb3J0IHZhciBEZXZpY2VJbk9TVUV4cGVjdGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRldmljZUluT1NVRXhwZWN0ZWRcIik7XG5leHBvcnQgdmFyIERldmljZUhhbHRlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VIYWx0ZWRcIik7XG5leHBvcnQgdmFyIERldmljZU5hbWVJbnZhbGlkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRldmljZU5hbWVJbnZhbGlkXCIpO1xuZXhwb3J0IHZhciBEZXZpY2VTb2NrZXRGYWlsID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRldmljZVNvY2tldEZhaWxcIik7XG5leHBvcnQgdmFyIERldmljZVNvY2tldE5vQnVsa1N0YXR1cyA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VTb2NrZXROb0J1bGtTdGF0dXNcIik7XG5leHBvcnQgdmFyIERpc2Nvbm5lY3RlZERldmljZSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEaXNjb25uZWN0ZWREZXZpY2VcIik7XG5leHBvcnQgdmFyIERpc2Nvbm5lY3RlZERldmljZUR1cmluZ09wZXJhdGlvbiA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEaXNjb25uZWN0ZWREZXZpY2VEdXJpbmdPcGVyYXRpb25cIik7XG5leHBvcnQgdmFyIEVucG9pbnRDb25maWdFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJFbnBvaW50Q29uZmlnXCIpO1xuZXhwb3J0IHZhciBFdGhBcHBQbGVhc2VFbmFibGVDb250cmFjdERhdGEgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRXRoQXBwUGxlYXNlRW5hYmxlQ29udHJhY3REYXRhXCIpO1xuZXhwb3J0IHZhciBGZWVFc3RpbWF0aW9uRmFpbGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkZlZUVzdGltYXRpb25GYWlsZWRcIik7XG5leHBvcnQgdmFyIEZpcm13YXJlTm90UmVjb2duaXplZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJGaXJtd2FyZU5vdFJlY29nbml6ZWRcIik7XG5leHBvcnQgdmFyIEhhcmRSZXNldEZhaWwgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiSGFyZFJlc2V0RmFpbFwiKTtcbmV4cG9ydCB2YXIgSW52YWxpZFhSUFRhZyA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJJbnZhbGlkWFJQVGFnXCIpO1xuZXhwb3J0IHZhciBJbnZhbGlkQWRkcmVzcyA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJJbnZhbGlkQWRkcmVzc1wiKTtcbmV4cG9ydCB2YXIgSW52YWxpZEFkZHJlc3NCZWNhdXNlRGVzdGluYXRpb25Jc0Fsc29Tb3VyY2UgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiSW52YWxpZEFkZHJlc3NCZWNhdXNlRGVzdGluYXRpb25Jc0Fsc29Tb3VyY2VcIik7XG5leHBvcnQgdmFyIExhdGVzdE1DVUluc3RhbGxlZEVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkxhdGVzdE1DVUluc3RhbGxlZEVycm9yXCIpO1xuZXhwb3J0IHZhciBVbmtub3duTUNVID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVua25vd25NQ1VcIik7XG5leHBvcnQgdmFyIExlZGdlckFQSUVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkxlZGdlckFQSUVycm9yXCIpO1xuZXhwb3J0IHZhciBMZWRnZXJBUElFcnJvcldpdGhNZXNzYWdlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkxlZGdlckFQSUVycm9yV2l0aE1lc3NhZ2VcIik7XG5leHBvcnQgdmFyIExlZGdlckFQSU5vdEF2YWlsYWJsZSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJMZWRnZXJBUElOb3RBdmFpbGFibGVcIik7XG5leHBvcnQgdmFyIE1hbmFnZXJBcHBBbHJlYWR5SW5zdGFsbGVkRXJyb3IgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTWFuYWdlckFwcEFscmVhZHlJbnN0YWxsZWRcIik7XG5leHBvcnQgdmFyIE1hbmFnZXJBcHBSZWx5T25CVENFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJNYW5hZ2VyQXBwUmVseU9uQlRDXCIpO1xuZXhwb3J0IHZhciBNYW5hZ2VyQXBwRGVwSW5zdGFsbFJlcXVpcmVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk1hbmFnZXJBcHBEZXBJbnN0YWxsUmVxdWlyZWRcIik7XG5leHBvcnQgdmFyIE1hbmFnZXJBcHBEZXBVbmluc3RhbGxSZXF1aXJlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJNYW5hZ2VyQXBwRGVwVW5pbnN0YWxsUmVxdWlyZWRcIik7XG5leHBvcnQgdmFyIE1hbmFnZXJEZXZpY2VMb2NrZWRFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJNYW5hZ2VyRGV2aWNlTG9ja2VkXCIpO1xuZXhwb3J0IHZhciBNYW5hZ2VyRmlybXdhcmVOb3RFbm91Z2hTcGFjZUVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk1hbmFnZXJGaXJtd2FyZU5vdEVub3VnaFNwYWNlXCIpO1xuZXhwb3J0IHZhciBNYW5hZ2VyTm90RW5vdWdoU3BhY2VFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJNYW5hZ2VyTm90RW5vdWdoU3BhY2VcIik7XG5leHBvcnQgdmFyIE1hbmFnZXJVbmluc3RhbGxCVENEZXAgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTWFuYWdlclVuaW5zdGFsbEJUQ0RlcFwiKTtcbmV4cG9ydCB2YXIgTmV0d29ya0Rvd24gPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTmV0d29ya0Rvd25cIik7XG5leHBvcnQgdmFyIE5vQWRkcmVzc2VzRm91bmQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTm9BZGRyZXNzZXNGb3VuZFwiKTtcbmV4cG9ydCB2YXIgTm90RW5vdWdoQmFsYW5jZSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJOb3RFbm91Z2hCYWxhbmNlXCIpO1xuZXhwb3J0IHZhciBOb3RFbm91Z2hCYWxhbmNlVG9EZWxlZ2F0ZSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJOb3RFbm91Z2hCYWxhbmNlVG9EZWxlZ2F0ZVwiKTtcbmV4cG9ydCB2YXIgTm90RW5vdWdoQmFsYW5jZUluUGFyZW50QWNjb3VudCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJOb3RFbm91Z2hCYWxhbmNlSW5QYXJlbnRBY2NvdW50XCIpO1xuZXhwb3J0IHZhciBOb3RFbm91Z2hTcGVuZGFibGVCYWxhbmNlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk5vdEVub3VnaFNwZW5kYWJsZUJhbGFuY2VcIik7XG5leHBvcnQgdmFyIE5vdEVub3VnaEJhbGFuY2VCZWNhdXNlRGVzdGluYXRpb25Ob3RDcmVhdGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk5vdEVub3VnaEJhbGFuY2VCZWNhdXNlRGVzdGluYXRpb25Ob3RDcmVhdGVkXCIpO1xuZXhwb3J0IHZhciBOb0FjY2Vzc1RvQ2FtZXJhID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk5vQWNjZXNzVG9DYW1lcmFcIik7XG5leHBvcnQgdmFyIE5vdEVub3VnaEdhcyA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJOb3RFbm91Z2hHYXNcIik7XG5leHBvcnQgdmFyIE5vdFN1cHBvcnRlZExlZ2FjeUFkZHJlc3MgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTm90U3VwcG9ydGVkTGVnYWN5QWRkcmVzc1wiKTtcbmV4cG9ydCB2YXIgR2FzTGVzc1RoYW5Fc3RpbWF0ZSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJHYXNMZXNzVGhhbkVzdGltYXRlXCIpO1xuZXhwb3J0IHZhciBQYXNzd29yZHNEb250TWF0Y2hFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJQYXNzd29yZHNEb250TWF0Y2hcIik7XG5leHBvcnQgdmFyIFBhc3N3b3JkSW5jb3JyZWN0RXJyb3IgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiUGFzc3dvcmRJbmNvcnJlY3RcIik7XG5leHBvcnQgdmFyIFJlY29tbWVuZFN1YkFjY291bnRzVG9FbXB0eSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJSZWNvbW1lbmRTdWJBY2NvdW50c1RvRW1wdHlcIik7XG5leHBvcnQgdmFyIFJlY29tbWVuZFVuZGVsZWdhdGlvbiA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJSZWNvbW1lbmRVbmRlbGVnYXRpb25cIik7XG5leHBvcnQgdmFyIFRpbWVvdXRUYWdnZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVGltZW91dFRhZ2dlZFwiKTtcbmV4cG9ydCB2YXIgVW5leHBlY3RlZEJvb3Rsb2FkZXIgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVW5leHBlY3RlZEJvb3Rsb2FkZXJcIik7XG5leHBvcnQgdmFyIE1DVU5vdEdlbnVpbmVUb0Rhc2hib2FyZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJNQ1VOb3RHZW51aW5lVG9EYXNoYm9hcmRcIik7XG5leHBvcnQgdmFyIFJlY2lwaWVudFJlcXVpcmVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlJlY2lwaWVudFJlcXVpcmVkXCIpO1xuZXhwb3J0IHZhciBVbmF2YWlsYWJsZVRlem9zT3JpZ2luYXRlZEFjY291bnRSZWNlaXZlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVuYXZhaWxhYmxlVGV6b3NPcmlnaW5hdGVkQWNjb3VudFJlY2VpdmVcIik7XG5leHBvcnQgdmFyIFVuYXZhaWxhYmxlVGV6b3NPcmlnaW5hdGVkQWNjb3VudFNlbmQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVW5hdmFpbGFibGVUZXpvc09yaWdpbmF0ZWRBY2NvdW50U2VuZFwiKTtcbmV4cG9ydCB2YXIgVXBkYXRlRmV0Y2hGaWxlRmFpbCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJVcGRhdGVGZXRjaEZpbGVGYWlsXCIpO1xuZXhwb3J0IHZhciBVcGRhdGVJbmNvcnJlY3RIYXNoID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVwZGF0ZUluY29ycmVjdEhhc2hcIik7XG5leHBvcnQgdmFyIFVwZGF0ZUluY29ycmVjdFNpZyA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJVcGRhdGVJbmNvcnJlY3RTaWdcIik7XG5leHBvcnQgdmFyIFVwZGF0ZVlvdXJBcHAgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVXBkYXRlWW91ckFwcFwiKTtcbmV4cG9ydCB2YXIgVXNlclJlZnVzZWREZXZpY2VOYW1lQ2hhbmdlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVzZXJSZWZ1c2VkRGV2aWNlTmFtZUNoYW5nZVwiKTtcbmV4cG9ydCB2YXIgVXNlclJlZnVzZWRBZGRyZXNzID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVzZXJSZWZ1c2VkQWRkcmVzc1wiKTtcbmV4cG9ydCB2YXIgVXNlclJlZnVzZWRGaXJtd2FyZVVwZGF0ZSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJVc2VyUmVmdXNlZEZpcm13YXJlVXBkYXRlXCIpO1xuZXhwb3J0IHZhciBVc2VyUmVmdXNlZEFsbG93TWFuYWdlciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJVc2VyUmVmdXNlZEFsbG93TWFuYWdlclwiKTtcbmV4cG9ydCB2YXIgVXNlclJlZnVzZWRPbkRldmljZSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJVc2VyUmVmdXNlZE9uRGV2aWNlXCIpOyAvLyBUT0RPIHJlbmFtZSBiZWNhdXNlIGl0J3MganVzdCBmb3IgdHJhbnNhY3Rpb24gcmVmdXNhbFxuZXhwb3J0IHZhciBUcmFuc3BvcnRPcGVuVXNlckNhbmNlbGxlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJUcmFuc3BvcnRPcGVuVXNlckNhbmNlbGxlZFwiKTtcbmV4cG9ydCB2YXIgVHJhbnNwb3J0SW50ZXJmYWNlTm90QXZhaWxhYmxlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlRyYW5zcG9ydEludGVyZmFjZU5vdEF2YWlsYWJsZVwiKTtcbmV4cG9ydCB2YXIgVHJhbnNwb3J0UmFjZUNvbmRpdGlvbiA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJUcmFuc3BvcnRSYWNlQ29uZGl0aW9uXCIpO1xuZXhwb3J0IHZhciBUcmFuc3BvcnRXZWJVU0JHZXN0dXJlUmVxdWlyZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVHJhbnNwb3J0V2ViVVNCR2VzdHVyZVJlcXVpcmVkXCIpO1xuZXhwb3J0IHZhciBEZXZpY2VTaG91bGRTdGF5SW5BcHAgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRGV2aWNlU2hvdWxkU3RheUluQXBwXCIpO1xuZXhwb3J0IHZhciBXZWJzb2NrZXRDb25uZWN0aW9uRXJyb3IgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiV2Vic29ja2V0Q29ubmVjdGlvbkVycm9yXCIpO1xuZXhwb3J0IHZhciBXZWJzb2NrZXRDb25uZWN0aW9uRmFpbGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIldlYnNvY2tldENvbm5lY3Rpb25GYWlsZWRcIik7XG5leHBvcnQgdmFyIFdyb25nRGV2aWNlRm9yQWNjb3VudCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJXcm9uZ0RldmljZUZvckFjY291bnRcIik7XG5leHBvcnQgdmFyIFdyb25nQXBwRm9yQ3VycmVuY3kgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiV3JvbmdBcHBGb3JDdXJyZW5jeVwiKTtcbmV4cG9ydCB2YXIgRVRIQWRkcmVzc05vbkVJUCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJFVEhBZGRyZXNzTm9uRUlQXCIpO1xuZXhwb3J0IHZhciBDYW50U2NhblFSQ29kZSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJDYW50U2NhblFSQ29kZVwiKTtcbmV4cG9ydCB2YXIgRmVlTm90TG9hZGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkZlZU5vdExvYWRlZFwiKTtcbmV4cG9ydCB2YXIgRmVlUmVxdWlyZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRmVlUmVxdWlyZWRcIik7XG5leHBvcnQgdmFyIEZlZVRvb0hpZ2ggPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRmVlVG9vSGlnaFwiKTtcbmV4cG9ydCB2YXIgU3luY0Vycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlN5bmNFcnJvclwiKTtcbmV4cG9ydCB2YXIgUGFpcmluZ0ZhaWxlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJQYWlyaW5nRmFpbGVkXCIpO1xuZXhwb3J0IHZhciBHZW51aW5lQ2hlY2tGYWlsZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiR2VudWluZUNoZWNrRmFpbGVkXCIpO1xuZXhwb3J0IHZhciBMZWRnZXJBUEk0eHggPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTGVkZ2VyQVBJNHh4XCIpO1xuZXhwb3J0IHZhciBMZWRnZXJBUEk1eHggPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTGVkZ2VyQVBJNXh4XCIpO1xuZXhwb3J0IHZhciBGaXJtd2FyZU9yQXBwVXBkYXRlUmVxdWlyZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRmlybXdhcmVPckFwcFVwZGF0ZVJlcXVpcmVkXCIpO1xuLy8gZGIgc3R1ZmYsIG5vIG5lZWQgdG8gdHJhbnNsYXRlXG5leHBvcnQgdmFyIE5vREJQYXRoR2l2ZW4gPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTm9EQlBhdGhHaXZlblwiKTtcbmV4cG9ydCB2YXIgREJXcm9uZ1Bhc3N3b3JkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRCV3JvbmdQYXNzd29yZFwiKTtcbmV4cG9ydCB2YXIgREJOb3RSZXNldCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEQk5vdFJlc2V0XCIpO1xuLyoqXG4gKiBUcmFuc3BvcnRFcnJvciBpcyB1c2VkIGZvciBhbnkgZ2VuZXJpYyB0cmFuc3BvcnQgZXJyb3JzLlxuICogZS5nLiBFcnJvciB0aHJvd24gd2hlbiBkYXRhIHJlY2VpdmVkIGJ5IGV4Y2hhbmdlcyBhcmUgaW5jb3JyZWN0IG9yIGlmIGV4Y2hhbmdlZCBmYWlsZWQgdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgZGV2aWNlIGZvciB2YXJpb3VzIHJlYXNvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFRyYW5zcG9ydEVycm9yKG1lc3NhZ2UsIGlkKSB7XG4gICAgdGhpcy5uYW1lID0gXCJUcmFuc3BvcnRFcnJvclwiO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xuICAgIHRoaXMuaWQgPSBpZDtcbn1cblRyYW5zcG9ydEVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuYWRkQ3VzdG9tRXJyb3JEZXNlcmlhbGl6ZXIoXCJUcmFuc3BvcnRFcnJvclwiLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gbmV3IFRyYW5zcG9ydEVycm9yKGUubWVzc2FnZSwgZS5pZCk7IH0pO1xuZXhwb3J0IHZhciBTdGF0dXNDb2RlcyA9IHtcbiAgICBQSU5fUkVNQUlOSU5HX0FUVEVNUFRTOiAweDYzYzAsXG4gICAgSU5DT1JSRUNUX0xFTkdUSDogMHg2NzAwLFxuICAgIE1JU1NJTkdfQ1JJVElDQUxfUEFSQU1FVEVSOiAweDY4MDAsXG4gICAgQ09NTUFORF9JTkNPTVBBVElCTEVfRklMRV9TVFJVQ1RVUkU6IDB4Njk4MSxcbiAgICBTRUNVUklUWV9TVEFUVVNfTk9UX1NBVElTRklFRDogMHg2OTgyLFxuICAgIENPTkRJVElPTlNfT0ZfVVNFX05PVF9TQVRJU0ZJRUQ6IDB4Njk4NSxcbiAgICBJTkNPUlJFQ1RfREFUQTogMHg2YTgwLFxuICAgIE5PVF9FTk9VR0hfTUVNT1JZX1NQQUNFOiAweDZhODQsXG4gICAgUkVGRVJFTkNFRF9EQVRBX05PVF9GT1VORDogMHg2YTg4LFxuICAgIEZJTEVfQUxSRUFEWV9FWElTVFM6IDB4NmE4OSxcbiAgICBJTkNPUlJFQ1RfUDFfUDI6IDB4NmIwMCxcbiAgICBJTlNfTk9UX1NVUFBPUlRFRDogMHg2ZDAwLFxuICAgIENMQV9OT1RfU1VQUE9SVEVEOiAweDZlMDAsXG4gICAgVEVDSE5JQ0FMX1BST0JMRU06IDB4NmYwMCxcbiAgICBPSzogMHg5MDAwLFxuICAgIE1FTU9SWV9QUk9CTEVNOiAweDkyNDAsXG4gICAgTk9fRUZfU0VMRUNURUQ6IDB4OTQwMCxcbiAgICBJTlZBTElEX09GRlNFVDogMHg5NDAyLFxuICAgIEZJTEVfTk9UX0ZPVU5EOiAweDk0MDQsXG4gICAgSU5DT05TSVNURU5UX0ZJTEU6IDB4OTQwOCxcbiAgICBBTEdPUklUSE1fTk9UX1NVUFBPUlRFRDogMHg5NDg0LFxuICAgIElOVkFMSURfS0NWOiAweDk0ODUsXG4gICAgQ09ERV9OT1RfSU5JVElBTElaRUQ6IDB4OTgwMixcbiAgICBBQ0NFU1NfQ09ORElUSU9OX05PVF9GVUxGSUxMRUQ6IDB4OTgwNCxcbiAgICBDT05UUkFESUNUSU9OX1NFQ1JFVF9DT0RFX1NUQVRVUzogMHg5ODA4LFxuICAgIENPTlRSQURJQ1RJT05fSU5WQUxJREFUSU9OOiAweDk4MTAsXG4gICAgQ09ERV9CTE9DS0VEOiAweDk4NDAsXG4gICAgTUFYX1ZBTFVFX1JFQUNIRUQ6IDB4OTg1MCxcbiAgICBHUF9BVVRIX0ZBSUxFRDogMHg2MzAwLFxuICAgIExJQ0VOU0lORzogMHg2ZjQyLFxuICAgIEhBTFRFRDogMHg2ZmFhXG59O1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFsdFN0YXR1c01lc3NhZ2UoY29kZSkge1xuICAgIHN3aXRjaCAoY29kZSkge1xuICAgICAgICAvLyBpbXByb3ZlIHRleHQgb2YgbW9zdCBjb21tb24gZXJyb3JzXG4gICAgICAgIGNhc2UgMHg2NzAwOlxuICAgICAgICAgICAgcmV0dXJuIFwiSW5jb3JyZWN0IGxlbmd0aFwiO1xuICAgICAgICBjYXNlIDB4NjgwMDpcbiAgICAgICAgICAgIHJldHVybiBcIk1pc3NpbmcgY3JpdGljYWwgcGFyYW1ldGVyXCI7XG4gICAgICAgIGNhc2UgMHg2OTgyOlxuICAgICAgICAgICAgcmV0dXJuIFwiU2VjdXJpdHkgbm90IHNhdGlzZmllZCAoZG9uZ2xlIGxvY2tlZCBvciBoYXZlIGludmFsaWQgYWNjZXNzIHJpZ2h0cylcIjtcbiAgICAgICAgY2FzZSAweDY5ODU6XG4gICAgICAgICAgICByZXR1cm4gXCJDb25kaXRpb24gb2YgdXNlIG5vdCBzYXRpc2ZpZWQgKGRlbmllZCBieSB0aGUgdXNlcj8pXCI7XG4gICAgICAgIGNhc2UgMHg2YTgwOlxuICAgICAgICAgICAgcmV0dXJuIFwiSW52YWxpZCBkYXRhIHJlY2VpdmVkXCI7XG4gICAgICAgIGNhc2UgMHg2YjAwOlxuICAgICAgICAgICAgcmV0dXJuIFwiSW52YWxpZCBwYXJhbWV0ZXIgcmVjZWl2ZWRcIjtcbiAgICB9XG4gICAgaWYgKDB4NmYwMCA8PSBjb2RlICYmIGNvZGUgPD0gMHg2ZmZmKSB7XG4gICAgICAgIHJldHVybiBcIkludGVybmFsIGVycm9yLCBwbGVhc2UgcmVwb3J0XCI7XG4gICAgfVxufVxuLyoqXG4gKiBFcnJvciB0aHJvd24gd2hlbiBhIGRldmljZSByZXR1cm5lZCBhIG5vbiBzdWNjZXNzIHN0YXR1cy5cbiAqIHRoZSBlcnJvci5zdGF0dXNDb2RlIGlzIG9uZSBvZiB0aGUgYFN0YXR1c0NvZGVzYCBleHBvcnRlZCBieSB0aGlzIGxpYnJhcnkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBUcmFuc3BvcnRTdGF0dXNFcnJvcihzdGF0dXNDb2RlKSB7XG4gICAgdGhpcy5uYW1lID0gXCJUcmFuc3BvcnRTdGF0dXNFcnJvclwiO1xuICAgIHZhciBzdGF0dXNUZXh0ID0gT2JqZWN0LmtleXMoU3RhdHVzQ29kZXMpLmZpbmQoZnVuY3Rpb24gKGspIHsgcmV0dXJuIFN0YXR1c0NvZGVzW2tdID09PSBzdGF0dXNDb2RlOyB9KSB8fFxuICAgICAgICBcIlVOS05PV05fRVJST1JcIjtcbiAgICB2YXIgc21zZyA9IGdldEFsdFN0YXR1c01lc3NhZ2Uoc3RhdHVzQ29kZSkgfHwgc3RhdHVzVGV4dDtcbiAgICB2YXIgc3RhdHVzQ29kZVN0ciA9IHN0YXR1c0NvZGUudG9TdHJpbmcoMTYpO1xuICAgIHRoaXMubWVzc2FnZSA9IFwiTGVkZ2VyIGRldmljZTogXCIgKyBzbXNnICsgXCIgKDB4XCIgKyBzdGF0dXNDb2RlU3RyICsgXCIpXCI7XG4gICAgdGhpcy5zdGFjayA9IG5ldyBFcnJvcigpLnN0YWNrO1xuICAgIHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1c0NvZGU7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gc3RhdHVzVGV4dDtcbn1cblRyYW5zcG9ydFN0YXR1c0Vycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvcigpO1xuYWRkQ3VzdG9tRXJyb3JEZXNlcmlhbGl6ZXIoXCJUcmFuc3BvcnRTdGF0dXNFcnJvclwiLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gbmV3IFRyYW5zcG9ydFN0YXR1c0Vycm9yKGUuc3RhdHVzQ29kZSk7IH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgVHJhbnNwb3J0IGZyb20gXCJAbGVkZ2VyaHEvaHctdHJhbnNwb3J0XCI7XG5pbXBvcnQgaGlkRnJhbWluZyBmcm9tIFwiQGxlZGdlcmhxL2RldmljZXMvbGliL2hpZC1mcmFtaW5nXCI7XG5pbXBvcnQgeyBpZGVudGlmeVVTQlByb2R1Y3RJZCB9IGZyb20gXCJAbGVkZ2VyaHEvZGV2aWNlc1wiO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSBcIkBsZWRnZXJocS9sb2dzXCI7XG5pbXBvcnQgeyBUcmFuc3BvcnRPcGVuVXNlckNhbmNlbGxlZCwgVHJhbnNwb3J0SW50ZXJmYWNlTm90QXZhaWxhYmxlLCBUcmFuc3BvcnRXZWJVU0JHZXN0dXJlUmVxdWlyZWQsIERpc2Nvbm5lY3RlZERldmljZUR1cmluZ09wZXJhdGlvbiwgRGlzY29ubmVjdGVkRGV2aWNlLCB9IGZyb20gXCJAbGVkZ2VyaHEvZXJyb3JzXCI7XG5pbXBvcnQgeyBnZXRMZWRnZXJEZXZpY2VzLCBnZXRGaXJzdExlZGdlckRldmljZSwgcmVxdWVzdExlZGdlckRldmljZSwgaXNTdXBwb3J0ZWQsIH0gZnJvbSBcIi4vd2VidXNiXCI7XG52YXIgY29uZmlndXJhdGlvblZhbHVlID0gMTtcbnZhciBlbmRwb2ludE51bWJlciA9IDM7XG4vKipcbiAqIFdlYlVTQiBUcmFuc3BvcnQgaW1wbGVtZW50YXRpb25cbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgVHJhbnNwb3J0V2ViVVNCIGZyb20gXCJAbGVkZ2VyaHEvaHctdHJhbnNwb3J0LXdlYnVzYlwiO1xuICogLi4uXG4gKiBUcmFuc3BvcnRXZWJVU0IuY3JlYXRlKCkudGhlbih0cmFuc3BvcnQgPT4gLi4uKVxuICovXG52YXIgVHJhbnNwb3J0V2ViVVNCID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhUcmFuc3BvcnRXZWJVU0IsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVHJhbnNwb3J0V2ViVVNCKGRldmljZSwgaW50ZXJmYWNlTnVtYmVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmNoYW5uZWwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAweGZmZmYpO1xuICAgICAgICBfdGhpcy5wYWNrZXRTaXplID0gNjQ7XG4gICAgICAgIF90aGlzLl9kaXNjb25uZWN0RW1pdHRlZCA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5fZW1pdERpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKF90aGlzLl9kaXNjb25uZWN0RW1pdHRlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBfdGhpcy5fZGlzY29ubmVjdEVtaXR0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgX3RoaXMuZW1pdChcImRpc2Nvbm5lY3RcIiwgZSk7XG4gICAgICAgIH07XG4gICAgICAgIF90aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgX3RoaXMuaW50ZXJmYWNlTnVtYmVyID0gaW50ZXJmYWNlTnVtYmVyO1xuICAgICAgICBfdGhpcy5kZXZpY2VNb2RlbCA9IGlkZW50aWZ5VVNCUHJvZHVjdElkKGRldmljZS5wcm9kdWN0SWQpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNpbWlsYXIgdG8gY3JlYXRlKCkgZXhjZXB0IGl0IHdpbGwgYWx3YXlzIGRpc3BsYXkgdGhlIGRldmljZSBwZXJtaXNzaW9uIChldmVuIGlmIHNvbWUgZGV2aWNlcyBhcmUgYWxyZWFkeSBhY2NlcHRlZCkuXG4gICAgICovXG4gICAgVHJhbnNwb3J0V2ViVVNCLnJlcXVlc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkZXZpY2U7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHJlcXVlc3RMZWRnZXJEZXZpY2UoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldmljZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBUcmFuc3BvcnRXZWJVU0Iub3BlbihkZXZpY2UpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBTaW1pbGFyIHRvIGNyZWF0ZSgpIGV4Y2VwdCBpdCB3aWxsIG5ldmVyIGRpc3BsYXkgdGhlIGRldmljZSBwZXJtaXNzaW9uIChpdCByZXR1cm5zIGEgUHJvbWlzZTw/VHJhbnNwb3J0PiwgbnVsbCBpZiBpdCBmYWlscyB0byBmaW5kIGEgZGV2aWNlKS5cbiAgICAgKi9cbiAgICBUcmFuc3BvcnRXZWJVU0Iub3BlbkNvbm5lY3RlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRldmljZXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGdldExlZGdlckRldmljZXMoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldmljZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGV2aWNlcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG51bGxdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFRyYW5zcG9ydFdlYlVTQi5vcGVuKGRldmljZXNbMF0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBMZWRnZXIgdHJhbnNwb3J0IHdpdGggYSBVU0JEZXZpY2VcbiAgICAgKi9cbiAgICBUcmFuc3BvcnRXZWJVU0Iub3BlbiA9IGZ1bmN0aW9uIChkZXZpY2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGlmYWNlLCBpbnRlcmZhY2VOdW1iZXIsIGVfMSwgdHJhbnNwb3J0LCBvbkRpc2Nvbm5lY3Q7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGRldmljZS5vcGVuKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShkZXZpY2UuY29uZmlndXJhdGlvbiA9PT0gbnVsbCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZGV2aWNlLnNlbGVjdENvbmZpZ3VyYXRpb24oY29uZmlndXJhdGlvblZhbHVlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiByZXR1cm4gWzQgLyp5aWVsZCovLCBncmFjZWZ1bGx5UmVzZXREZXZpY2UoZGV2aWNlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmYWNlID0gZGV2aWNlLmNvbmZpZ3VyYXRpb25zWzBdLmludGVyZmFjZXMuZmluZChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWx0ZXJuYXRlcyA9IF9hLmFsdGVybmF0ZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsdGVybmF0ZXMuc29tZShmdW5jdGlvbiAoYSkgeyByZXR1cm4gYS5pbnRlcmZhY2VDbGFzcyA9PT0gMjU1OyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpZmFjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUcmFuc3BvcnRJbnRlcmZhY2VOb3RBdmFpbGFibGUoXCJObyBXZWJVU0IgaW50ZXJmYWNlIGZvdW5kIGZvciB5b3VyIExlZGdlciBkZXZpY2UuIFBsZWFzZSB1cGdyYWRlIGZpcm13YXJlIG9yIGNvbnRhY3QgdGVjaHN1cHBvcnQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJmYWNlTnVtYmVyID0gaWZhY2UuaW50ZXJmYWNlTnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSA1O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzUsIDcsICwgOV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZGV2aWNlLmNsYWltSW50ZXJmYWNlKGludGVyZmFjZU51bWJlcildO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA5XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgZV8xID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZGV2aWNlLmNsb3NlKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHJhbnNwb3J0SW50ZXJmYWNlTm90QXZhaWxhYmxlKGVfMS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0ID0gbmV3IFRyYW5zcG9ydFdlYlVTQihkZXZpY2UsIGludGVyZmFjZU51bWJlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXZpY2UgPT09IGUuZGV2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICRGbG93Rml4TWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnVzYi5yZW1vdmVFdmVudExpc3RlbmVyKFwiZGlzY29ubmVjdFwiLCBvbkRpc2Nvbm5lY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuX2VtaXREaXNjb25uZWN0KG5ldyBEaXNjb25uZWN0ZWREZXZpY2UoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICRGbG93Rml4TWVcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci51c2IuYWRkRXZlbnRMaXN0ZW5lcihcImRpc2Nvbm5lY3RcIiwgb25EaXNjb25uZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0cmFuc3BvcnRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbGVhc2UgdGhlIHRyYW5zcG9ydCBkZXZpY2VcbiAgICAgKi9cbiAgICBUcmFuc3BvcnRXZWJVU0IucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZXhjaGFuZ2VCdXN5UHJvbWlzZV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZGV2aWNlLnJlbGVhc2VJbnRlcmZhY2UodGhpcy5pbnRlcmZhY2VOdW1iZXIpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZ3JhY2VmdWxseVJlc2V0RGV2aWNlKHRoaXMuZGV2aWNlKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZGV2aWNlLmNsb3NlKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRXhjaGFuZ2Ugd2l0aCB0aGUgZGV2aWNlIHVzaW5nIEFQRFUgcHJvdG9jb2wuXG4gICAgICogQHBhcmFtIGFwZHVcbiAgICAgKiBAcmV0dXJucyBhIHByb21pc2Ugb2YgYXBkdSByZXNwb25zZVxuICAgICAqL1xuICAgIFRyYW5zcG9ydFdlYlVTQi5wcm90b3R5cGUuZXhjaGFuZ2UgPSBmdW5jdGlvbiAoYXBkdSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYjtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZXhjaGFuZ2VBdG9taWNJbXBsKGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EsIGNoYW5uZWwsIHBhY2tldFNpemUsIGZyYW1pbmcsIGJsb2NrcywgaSwgcmVzdWx0LCBhY2MsIHIsIGJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9iKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2IubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHRoaXMsIGNoYW5uZWwgPSBfYS5jaGFubmVsLCBwYWNrZXRTaXplID0gX2EucGFja2V0U2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2coXCJhcGR1XCIsIFwiPT4gXCIgKyBhcGR1LnRvU3RyaW5nKFwiaGV4XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtaW5nID0gaGlkRnJhbWluZyhjaGFubmVsLCBwYWNrZXRTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja3MgPSBmcmFtaW5nLm1ha2VCbG9ja3MoYXBkdSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGkgPCBibG9ja3MubGVuZ3RoKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5kZXZpY2UudHJhbnNmZXJPdXQoZW5kcG9pbnROdW1iZXIsIGJsb2Nrc1tpXSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9iLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYi5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIShyZXN1bHQgPSBmcmFtaW5nLmdldFJlZHVjZWRSZXN1bHQoYWNjKSkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZGV2aWNlLnRyYW5zZmVySW4oZW5kcG9pbnROdW1iZXIsIHBhY2tldFNpemUpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByID0gX2Iuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHIuZGF0YS5idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjYyA9IGZyYW1pbmcucmVkdWNlUmVzcG9uc2UoYWNjLCBidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZyhcImFwZHVcIiwgXCI8PSBcIiArIHJlc3VsdC50b1N0cmluZyhcImhleFwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3VsdF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUgJiYgZS5tZXNzYWdlICYmIGUubWVzc2FnZS5pbmNsdWRlcyhcImRpc2Nvbm5lY3RlZFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZW1pdERpc2Nvbm5lY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBEaXNjb25uZWN0ZWREZXZpY2VEdXJpbmdPcGVyYXRpb24oZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgYiA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBiXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBUcmFuc3BvcnRXZWJVU0IucHJvdG90eXBlLnNldFNjcmFtYmxlS2V5ID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIFdlYlVTQiB0cmFuc3BvcnQgaXMgc3VwcG9ydGVkLlxuICAgICAqL1xuICAgIFRyYW5zcG9ydFdlYlVTQi5pc1N1cHBvcnRlZCA9IGlzU3VwcG9ydGVkO1xuICAgIC8qKlxuICAgICAqIExpc3QgdGhlIFdlYlVTQiBkZXZpY2VzIHRoYXQgd2FzIHByZXZpb3VzbHkgYXV0aG9yaXplZCBieSB0aGUgdXNlci5cbiAgICAgKi9cbiAgICBUcmFuc3BvcnRXZWJVU0IubGlzdCA9IGdldExlZGdlckRldmljZXM7XG4gICAgLyoqXG4gICAgICogQWN0aXZlbHkgbGlzdGVuIHRvIFdlYlVTQiBkZXZpY2VzIGFuZCBlbWl0IE9ORSBkZXZpY2VcbiAgICAgKiB0aGF0IHdhcyBlaXRoZXIgYWNjZXB0ZWQgYmVmb3JlLCBpZiBub3QgaXQgd2lsbCB0cmlnZ2VyIHRoZSBuYXRpdmUgcGVybWlzc2lvbiBVSS5cbiAgICAgKlxuICAgICAqIEltcG9ydGFudDogaXQgbXVzdCBiZSBjYWxsZWQgaW4gdGhlIGNvbnRleHQgb2YgYSBVSSBjbGljayFcbiAgICAgKi9cbiAgICBUcmFuc3BvcnRXZWJVU0IubGlzdGVuID0gZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgIHZhciB1bnN1YnNjcmliZWQgPSBmYWxzZTtcbiAgICAgICAgZ2V0Rmlyc3RMZWRnZXJEZXZpY2UoKS50aGVuKGZ1bmN0aW9uIChkZXZpY2UpIHtcbiAgICAgICAgICAgIGlmICghdW5zdWJzY3JpYmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRldmljZU1vZGVsID0gaWRlbnRpZnlVU0JQcm9kdWN0SWQoZGV2aWNlLnByb2R1Y3RJZCk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiYWRkXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0b3I6IGRldmljZSxcbiAgICAgICAgICAgICAgICAgICAgZGV2aWNlTW9kZWw6IGRldmljZU1vZGVsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAod2luZG93LkRPTUV4Y2VwdGlvbiAmJlxuICAgICAgICAgICAgICAgIGVycm9yIGluc3RhbmNlb2Ygd2luZG93LkRPTUV4Y2VwdGlvbiAmJlxuICAgICAgICAgICAgICAgIGVycm9yLmNvZGUgPT09IDE4KSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZXJyb3IobmV3IFRyYW5zcG9ydFdlYlVTQkdlc3R1cmVSZXF1aXJlZChlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgVHJhbnNwb3J0T3BlblVzZXJDYW5jZWxsZWQoZXJyb3IubWVzc2FnZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZTogdW5zdWJzY3JpYmVcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBUcmFuc3BvcnRXZWJVU0I7XG59KFRyYW5zcG9ydCkpO1xuZXhwb3J0IGRlZmF1bHQgVHJhbnNwb3J0V2ViVVNCO1xuZnVuY3Rpb24gZ3JhY2VmdWxseVJlc2V0RGV2aWNlKGRldmljZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVycl8xO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzAsIDIsICwgM10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBkZXZpY2UucmVzZXQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgZXJyXzEgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnJfMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xuICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRyYW5zcG9ydFdlYlVTQi5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IHsgbGVkZ2VyVVNCVmVuZG9ySWQgfSBmcm9tIFwiQGxlZGdlcmhxL2RldmljZXNcIjtcbnZhciBsZWRnZXJEZXZpY2VzID0gW1xuICAgIHtcbiAgICAgICAgdmVuZG9ySWQ6IGxlZGdlclVTQlZlbmRvcklkXG4gICAgfSxcbl07XG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdExlZGdlckRldmljZSgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZXZpY2U7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIG5hdmlnYXRvci51c2IucmVxdWVzdERldmljZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBsZWRnZXJEZXZpY2VzXG4gICAgICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGRldmljZSA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGRldmljZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldExlZGdlckRldmljZXMoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGV2aWNlcztcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgbmF2aWdhdG9yLnVzYi5nZXREZXZpY2VzKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgZGV2aWNlcyA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGRldmljZXMuZmlsdGVyKGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLnZlbmRvcklkID09PSBsZWRnZXJVU0JWZW5kb3JJZDsgfSldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaXJzdExlZGdlckRldmljZSgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBleGlzdGluZ0RldmljZXM7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGdldExlZGdlckRldmljZXMoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ0RldmljZXMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ0RldmljZXMubGVuZ3RoID4gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBleGlzdGluZ0RldmljZXNbMF1dO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVxdWVzdExlZGdlckRldmljZSgpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5leHBvcnQgdmFyIGlzU3VwcG9ydGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoISFuYXZpZ2F0b3IgJiZcbiAgICAgICAgISFuYXZpZ2F0b3IudXNiICYmXG4gICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IudXNiLmdldERldmljZXMgPT09IFwiZnVuY3Rpb25cIik7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2VidXNiLmpzLm1hcCIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19yZWFkID0gKHRoaXMgJiYgdGhpcy5fX3JlYWQpIHx8IGZ1bmN0aW9uIChvLCBuKSB7XG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xuICAgIGlmICghbSkgcmV0dXJuIG87XG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XG4gICAgdHJ5IHtcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XG4gICAgfVxuICAgIHJldHVybiBhcjtcbn07XG52YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKGFyIHx8ICEoaSBpbiBmcm9tKSkge1xuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcbn07XG52YXIgX192YWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fdmFsdWVzKSB8fCBmdW5jdGlvbihvKSB7XG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcbn07XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudHNcIjtcbmltcG9ydCB7IFRyYW5zcG9ydFJhY2VDb25kaXRpb24sIFRyYW5zcG9ydEVycm9yLCBTdGF0dXNDb2RlcywgZ2V0QWx0U3RhdHVzTWVzc2FnZSwgVHJhbnNwb3J0U3RhdHVzRXJyb3IsIH0gZnJvbSBcIkBsZWRnZXJocS9lcnJvcnNcIjtcbmV4cG9ydCB7IFRyYW5zcG9ydEVycm9yLCBUcmFuc3BvcnRTdGF0dXNFcnJvciwgU3RhdHVzQ29kZXMsIGdldEFsdFN0YXR1c01lc3NhZ2UsIH07XG4vKipcbiAqIFRyYW5zcG9ydCBkZWZpbmVzIHRoZSBnZW5lcmljIGludGVyZmFjZSB0byBzaGFyZSBiZXR3ZWVuIG5vZGUvdTJmIGltcGxcbiAqIEEgKipEZXNjcmlwdG9yKiogaXMgYSBwYXJhbWV0cmljIHR5cGUgdGhhdCBpcyB1cCB0byBiZSBkZXRlcm1pbmVkIGZvciB0aGUgaW1wbGVtZW50YXRpb24uXG4gKiBpdCBjYW4gYmUgZm9yIGluc3RhbmNlIGFuIElELCBhbiBmaWxlIHBhdGgsIGEgVVJMLC4uLlxuICovXG52YXIgVHJhbnNwb3J0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRyYW5zcG9ydCgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5leGNoYW5nZVRpbWVvdXQgPSAzMDAwMDtcbiAgICAgICAgdGhpcy51bnJlc3BvbnNpdmVUaW1lb3V0ID0gMTUwMDA7XG4gICAgICAgIHRoaXMuZGV2aWNlTW9kZWwgPSBudWxsO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiB3cmFwcGVyIG9uIHRvcCBvZiBleGNoYW5nZSB0byBzaW1wbGlmeSB3b3JrIG9mIHRoZSBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICogQHBhcmFtIGNsYVxuICAgICAgICAgKiBAcGFyYW0gaW5zXG4gICAgICAgICAqIEBwYXJhbSBwMVxuICAgICAgICAgKiBAcGFyYW0gcDJcbiAgICAgICAgICogQHBhcmFtIGRhdGFcbiAgICAgICAgICogQHBhcmFtIHN0YXR1c0xpc3QgaXMgYSBsaXN0IG9mIGFjY2VwdGVkIHN0YXR1cyBjb2RlIChzaG9ydHMpLiBbMHg5MDAwXSBieSBkZWZhdWx0XG4gICAgICAgICAqIEByZXR1cm4gYSBQcm9taXNlIG9mIHJlc3BvbnNlIGJ1ZmZlclxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zZW5kID0gZnVuY3Rpb24gKGNsYSwgaW5zLCBwMSwgcDIsIGRhdGEsIHN0YXR1c0xpc3QpIHtcbiAgICAgICAgICAgIGlmIChkYXRhID09PSB2b2lkIDApIHsgZGF0YSA9IEJ1ZmZlci5hbGxvYygwKTsgfVxuICAgICAgICAgICAgaWYgKHN0YXR1c0xpc3QgPT09IHZvaWQgMCkgeyBzdGF0dXNMaXN0ID0gW1N0YXR1c0NvZGVzLk9LXTsgfVxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UsIHN3O1xuICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+PSAyNTYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRyYW5zcG9ydEVycm9yKFwiZGF0YS5sZW5ndGggZXhjZWVkIDI1NiBieXRlcyBsaW1pdC4gR290OiBcIiArIGRhdGEubGVuZ3RoLCBcIkRhdGFMZW5ndGhUb29CaWdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZXhjaGFuZ2UoQnVmZmVyLmNvbmNhdChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBCdWZmZXIuZnJvbShbY2xhLCBpbnMsIHAxLCBwMl0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnVmZmVyLmZyb20oW2RhdGEubGVuZ3RoXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3ID0gcmVzcG9uc2UucmVhZFVJbnQxNkJFKHJlc3BvbnNlLmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc3RhdHVzTGlzdC5zb21lKGZ1bmN0aW9uIChzKSB7IHJldHVybiBzID09PSBzdzsgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRyYW5zcG9ydFN0YXR1c0Vycm9yKHN3KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3BvbnNlXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZXhjaGFuZ2VBdG9taWNJbXBsID0gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByZXNvbHZlQnVzeSwgYnVzeVByb21pc2UsIHVucmVzcG9uc2l2ZVJlYWNoZWQsIHRpbWVvdXQsIHJlcztcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5leGNoYW5nZUJ1c3lQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRyYW5zcG9ydFJhY2VDb25kaXRpb24oXCJBbiBhY3Rpb24gd2FzIGFscmVhZHkgcGVuZGluZyBvbiB0aGUgTGVkZ2VyIGRldmljZS4gUGxlYXNlIGRlbnkgb3IgcmVjb25uZWN0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1c3lQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlQnVzeSA9IHI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZXhjaGFuZ2VCdXN5UHJvbWlzZSA9IGJ1c3lQcm9taXNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5yZXNwb25zaXZlUmVhY2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVucmVzcG9uc2l2ZVJlYWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoXCJ1bnJlc3BvbnNpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnVucmVzcG9uc2l2ZVRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS50cnlzLnB1c2goWzEsICwgMywgNF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZigpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVucmVzcG9uc2l2ZVJlYWNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJyZXNwb25zaXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNvbHZlQnVzeSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlQnVzeSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5leGNoYW5nZUJ1c3lQcm9taXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTsgfTtcbiAgICAgICAgdGhpcy5fYXBwQVBJbG9jayA9IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGxvdyBsZXZlbCBhcGkgdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgZGV2aWNlXG4gICAgICogVGhpcyBtZXRob2QgaXMgZm9yIGltcGxlbWVudGF0aW9ucyB0byBpbXBsZW1lbnQgYnV0IHNob3VsZCBub3QgYmUgZGlyZWN0bHkgY2FsbGVkLlxuICAgICAqIEluc3RlYWQsIHRoZSByZWNvbW1hbmRlZCB3YXkgaXMgdG8gdXNlIHNlbmQoKSBtZXRob2RcbiAgICAgKiBAcGFyYW0gYXBkdSB0aGUgZGF0YSB0byBzZW5kXG4gICAgICogQHJldHVybiBhIFByb21pc2Ugb2YgcmVzcG9uc2UgZGF0YVxuICAgICAqL1xuICAgIFRyYW5zcG9ydC5wcm90b3R5cGUuZXhjaGFuZ2UgPSBmdW5jdGlvbiAoX2FwZHUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZXhjaGFuZ2Ugbm90IGltcGxlbWVudGVkXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogc2V0IHRoZSBcInNjcmFtYmxlIGtleVwiIGZvciB0aGUgbmV4dCBleGNoYW5nZXMgd2l0aCB0aGUgZGV2aWNlLlxuICAgICAqIEVhY2ggQXBwIGNhbiBoYXZlIGEgZGlmZmVyZW50IHNjcmFtYmxlIGtleSBhbmQgdGhleSBpbnRlcm5hbGx5IHdpbGwgc2V0IGl0IGF0IGluc3RhbmNpYXRpb24uXG4gICAgICogQHBhcmFtIGtleSB0aGUgc2NyYW1ibGUga2V5XG4gICAgICovXG4gICAgVHJhbnNwb3J0LnByb3RvdHlwZS5zZXRTY3JhbWJsZUtleSA9IGZ1bmN0aW9uIChfa2V5KSB7IH07XG4gICAgLyoqXG4gICAgICogY2xvc2UgdGhlIGV4Y2hhbmdlIHdpdGggdGhlIGRldmljZS5cbiAgICAgKiBAcmV0dXJuIGEgUHJvbWlzZSB0aGF0IGVuZHMgd2hlbiB0aGUgdHJhbnNwb3J0IGlzIGNsb3NlZC5cbiAgICAgKi9cbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gYW4gZXZlbnQgb24gYW4gaW5zdGFuY2Ugb2YgdHJhbnNwb3J0LlxuICAgICAqIFRyYW5zcG9ydCBpbXBsZW1lbnRhdGlvbiBjYW4gaGF2ZSBzcGVjaWZpYyBldmVudHMuIEhlcmUgaXMgdGhlIGNvbW1vbiBldmVudHM6XG4gICAgICogKiBgXCJkaXNjb25uZWN0XCJgIDogdHJpZ2dlcmVkIGlmIFRyYW5zcG9ydCBpcyBkaXNjb25uZWN0ZWRcbiAgICAgKi9cbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzLm9uKGV2ZW50TmFtZSwgY2IpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU3RvcCBsaXN0ZW5pbmcgdG8gYW4gZXZlbnQgb24gYW4gaW5zdGFuY2Ugb2YgdHJhbnNwb3J0LlxuICAgICAqL1xuICAgIFRyYW5zcG9ydC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgY2IpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKGV2ZW50TmFtZSwgY2IpO1xuICAgIH07XG4gICAgVHJhbnNwb3J0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgKF9hID0gdGhpcy5fZXZlbnRzKS5lbWl0LmFwcGx5KF9hLCBfX3NwcmVhZEFycmF5KFtldmVudF0sIF9fcmVhZChhcmdzKSwgZmFsc2UpKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEVuYWJsZSBvciBub3QgbG9ncyBvZiB0aGUgYmluYXJ5IGV4Y2hhbmdlXG4gICAgICovXG4gICAgVHJhbnNwb3J0LnByb3RvdHlwZS5zZXREZWJ1Z01vZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcInNldERlYnVnTW9kZSBpcyBkZXByZWNhdGVkLiB1c2UgQGxlZGdlcmhxL2xvZ3MgaW5zdGVhZC4gTm8gbG9ncyBhcmUgZW1pdHRlZCBpbiB0aGlzIGFueW1vcmUuXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogU2V0IGEgdGltZW91dCAoaW4gbWlsbGlzZWNvbmRzKSBmb3IgdGhlIGV4Y2hhbmdlIGNhbGwuIE9ubHkgc29tZSB0cmFuc3BvcnQgbWlnaHQgaW1wbGVtZW50IGl0LiAoZS5nLiBVMkYpXG4gICAgICovXG4gICAgVHJhbnNwb3J0LnByb3RvdHlwZS5zZXRFeGNoYW5nZVRpbWVvdXQgPSBmdW5jdGlvbiAoZXhjaGFuZ2VUaW1lb3V0KSB7XG4gICAgICAgIHRoaXMuZXhjaGFuZ2VUaW1lb3V0ID0gZXhjaGFuZ2VUaW1lb3V0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRGVmaW5lIHRoZSBkZWxheSBiZWZvcmUgZW1pdHRpbmcgXCJ1bnJlc3BvbnNpdmVcIiBvbiBhbiBleGNoYW5nZSB0aGF0IGRvZXMgbm90IHJlc3BvbmRcbiAgICAgKi9cbiAgICBUcmFuc3BvcnQucHJvdG90eXBlLnNldEV4Y2hhbmdlVW5yZXNwb25zaXZlVGltZW91dCA9IGZ1bmN0aW9uICh1bnJlc3BvbnNpdmVUaW1lb3V0KSB7XG4gICAgICAgIHRoaXMudW5yZXNwb25zaXZlVGltZW91dCA9IHVucmVzcG9uc2l2ZVRpbWVvdXQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBjcmVhdGUoKSBhbGxvd3MgdG8gb3BlbiB0aGUgZmlyc3QgZGVzY3JpcHRvciBhdmFpbGFibGUgb3JcbiAgICAgKiB0aHJvdyBpZiB0aGVyZSBpcyBub25lIG9yIGlmIHRpbWVvdXQgaXMgcmVhY2hlZC5cbiAgICAgKiBUaGlzIGlzIGEgbGlnaHQgaGVscGVyLCBhbHRlcm5hdGl2ZSB0byB1c2luZyBsaXN0ZW4oKSBhbmQgb3BlbigpICh0aGF0IHlvdSBtYXkgbmVlZCBmb3IgYW55IG1vcmUgYWR2YW5jZWQgdXNlY2FzZSlcbiAgICAgKiBAZXhhbXBsZVxuICAgIFRyYW5zcG9ydEZvby5jcmVhdGUoKS50aGVuKHRyYW5zcG9ydCA9PiAuLi4pXG4gICAgICovXG4gICAgVHJhbnNwb3J0LmNyZWF0ZSA9IGZ1bmN0aW9uIChvcGVuVGltZW91dCwgbGlzdGVuVGltZW91dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAob3BlblRpbWVvdXQgPT09IHZvaWQgMCkgeyBvcGVuVGltZW91dCA9IDMwMDA7IH1cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHN1YiA9IF90aGlzLmxpc3Rlbih7XG4gICAgICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5UaW1lb3V0SWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobGlzdGVuVGltZW91dElkKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub3BlbihlLmRlc2NyaXB0b3IsIG9wZW5UaW1lb3V0KS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlblRpbWVvdXRJZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsaXN0ZW5UaW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuVGltZW91dElkKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxpc3RlblRpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgVHJhbnNwb3J0RXJyb3IoX3RoaXMuRXJyb3JNZXNzYWdlX05vRGV2aWNlRm91bmQsIFwiTm9EZXZpY2VGb3VuZFwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5UaW1lb3V0SWQgPSBsaXN0ZW5UaW1lb3V0XG4gICAgICAgICAgICAgICAgPyBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgVHJhbnNwb3J0RXJyb3IoX3RoaXMuRXJyb3JNZXNzYWdlX0xpc3RlblRpbWVvdXQsIFwiTGlzdGVuVGltZW91dFwiKSk7XG4gICAgICAgICAgICAgICAgfSwgbGlzdGVuVGltZW91dClcbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVHJhbnNwb3J0LnByb3RvdHlwZS5kZWNvcmF0ZUFwcEFQSU1ldGhvZHMgPSBmdW5jdGlvbiAoc2VsZiwgbWV0aG9kcywgc2NyYW1ibGVLZXkpIHtcbiAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBtZXRob2RzXzEgPSBfX3ZhbHVlcyhtZXRob2RzKSwgbWV0aG9kc18xXzEgPSBtZXRob2RzXzEubmV4dCgpOyAhbWV0aG9kc18xXzEuZG9uZTsgbWV0aG9kc18xXzEgPSBtZXRob2RzXzEubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1ldGhvZE5hbWUgPSBtZXRob2RzXzFfMS52YWx1ZTtcbiAgICAgICAgICAgICAgICBzZWxmW21ldGhvZE5hbWVdID0gdGhpcy5kZWNvcmF0ZUFwcEFQSU1ldGhvZChtZXRob2ROYW1lLCBzZWxmW21ldGhvZE5hbWVdLCBzZWxmLCBzY3JhbWJsZUtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2RzXzFfMSAmJiAhbWV0aG9kc18xXzEuZG9uZSAmJiAoX2EgPSBtZXRob2RzXzFbXCJyZXR1cm5cIl0pKSBfYS5jYWxsKG1ldGhvZHNfMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRyYW5zcG9ydC5wcm90b3R5cGUuZGVjb3JhdGVBcHBBUElNZXRob2QgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgZiwgY3R4LCBzY3JhbWJsZUtleSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2FwcEFQSWxvY2s7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2FwcEFQSWxvY2sgPSB0aGlzLl9hcHBBUElsb2NrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfYXBwQVBJbG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZWplY3QobmV3IFRyYW5zcG9ydEVycm9yKFwiTGVkZ2VyIERldmljZSBpcyBidXN5IChsb2NrIFwiICsgX2FwcEFQSWxvY2sgKyBcIilcIiwgXCJUcmFuc3BvcnRMb2NrZWRcIikpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLnRyeXMucHVzaChbMSwgLCAzLCA0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwQVBJbG9jayA9IG1ldGhvZE5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTY3JhbWJsZUtleShzY3JhbWJsZUtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZi5hcHBseShjdHgsIGFyZ3MpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIF9hLnNlbnQoKV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXBwQVBJbG9jayA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFRyYW5zcG9ydC5FcnJvck1lc3NhZ2VfTGlzdGVuVGltZW91dCA9IFwiTm8gTGVkZ2VyIGRldmljZSBmb3VuZCAodGltZW91dClcIjtcbiAgICBUcmFuc3BvcnQuRXJyb3JNZXNzYWdlX05vRGV2aWNlRm91bmQgPSBcIk5vIExlZGdlciBkZXZpY2UgZm91bmRcIjtcbiAgICByZXR1cm4gVHJhbnNwb3J0O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFRyYW5zcG9ydDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRyYW5zcG9ydC5qcy5tYXAiLCJ2YXIgaWQgPSAwO1xudmFyIHN1YnNjcmliZXJzID0gW107XG4vKipcbiAqIGxvZyBzb21ldGhpbmdcbiAqIEBwYXJhbSB0eXBlIGEgbmFtZXNwYWNlZCBpZGVudGlmaWVyIG9mIHRoZSBsb2cgKGl0IGlzIG5vdCBhIGxldmVsIGxpa2UgXCJkZWJ1Z1wiLCBcImVycm9yXCIgYnV0IG1vcmUgbGlrZSBcImFwZHUtaW5cIiwgXCJhcGR1LW91dFwiLCBldGMuLi4pXG4gKiBAcGFyYW0gbWVzc2FnZSBhIGNsZWFyIG1lc3NhZ2Ugb2YgdGhlIGxvZyBhc3NvY2lhdGVkIHRvIHRoZSB0eXBlXG4gKi9cbmV4cG9ydCB2YXIgbG9nID0gZnVuY3Rpb24gKHR5cGUsIG1lc3NhZ2UsIGRhdGEpIHtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICBpZDogU3RyaW5nKCsraWQpLFxuICAgICAgICBkYXRlOiBuZXcgRGF0ZSgpXG4gICAgfTtcbiAgICBpZiAobWVzc2FnZSlcbiAgICAgICAgb2JqLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGlmIChkYXRhKVxuICAgICAgICBvYmouZGF0YSA9IGRhdGE7XG4gICAgZGlzcGF0Y2gob2JqKTtcbn07XG4vKipcbiAqIGxpc3RlbiB0byBsb2dzLlxuICogQHBhcmFtIGNiIHRoYXQgaXMgY2FsbGVkIGZvciBlYWNoIGZ1dHVyZSBsb2coKSB3aXRoIHRoZSBMb2cgb2JqZWN0XG4gKiBAcmV0dXJuIGEgZnVuY3Rpb24gdGhhdCBjYW4gYmUgY2FsbGVkIHRvIHVuc3Vic2NyaWJlIHRoZSBsaXN0ZW5lclxuICovXG5leHBvcnQgdmFyIGxpc3RlbiA9IGZ1bmN0aW9uIChjYikge1xuICAgIHN1YnNjcmliZXJzLnB1c2goY2IpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpID0gc3Vic2NyaWJlcnMuaW5kZXhPZihjYik7XG4gICAgICAgIGlmIChpICE9PSAtMSkge1xuICAgICAgICAgICAgLy8gZXF1aXZhbGVudCBvZiBzdWJzY3JpYmVycy5zcGxpY2UoaSwgMSkgLy8gaHR0cHM6Ly90d2l0dGVyLmNvbS9SaWNoX0hhcnJpcy9zdGF0dXMvMTEyNTg1MDM5MTE1NTk2NTk1MlxuICAgICAgICAgICAgc3Vic2NyaWJlcnNbaV0gPSBzdWJzY3JpYmVyc1tzdWJzY3JpYmVycy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIHN1YnNjcmliZXJzLnBvcCgpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5mdW5jdGlvbiBkaXNwYXRjaChsb2cpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN1YnNjcmliZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyc1tpXShsb2cpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW5kb3cuX19sZWRnZXJMb2dzTGlzdGVuID0gbGlzdGVuO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xudmFyIF9hO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuc2VyaWFsaXplUGF0aCA9IGV4cG9ydHMuZ2V0VmVyc2lvbiA9IGV4cG9ydHMucHJvY2Vzc0Vycm9yUmVzcG9uc2UgPSBleHBvcnRzLmVycm9yQ29kZVRvU3RyaW5nID0gZXhwb3J0cy5FUlJPUl9ERVNDUklQVElPTiA9IGV4cG9ydHMuTGVkZ2VyRXJyb3IgPSBleHBvcnRzLlNJR0xFTiA9IGV4cG9ydHMuUEtMRU4gPSBleHBvcnRzLlAxX1ZBTFVFUyA9IGV4cG9ydHMuUEFZTE9BRF9UWVBFID0gZXhwb3J0cy5JTlMgPSBleHBvcnRzLkFQUF9LRVkgPSBleHBvcnRzLkNIVU5LX1NJWkUgPSBleHBvcnRzLkNMQSA9IHZvaWQgMDtcbmV4cG9ydHMuQ0xBID0gMHgxMTtcbmV4cG9ydHMuQ0hVTktfU0laRSA9IDI1MDtcbmV4cG9ydHMuQVBQX0tFWSA9ICdERk4nO1xuZXhwb3J0cy5JTlMgPSB7XG4gICAgR0VUX1ZFUlNJT046IDB4MDAsXG4gICAgR0VUX0FERFJfU0VDUDI1NksxOiAweDAxLFxuICAgIFNJR05fU0VDUDI1NksxOiAweDAyXG59O1xuZXhwb3J0cy5QQVlMT0FEX1RZUEUgPSB7XG4gICAgSU5JVDogMHgwMCxcbiAgICBBREQ6IDB4MDEsXG4gICAgTEFTVDogMHgwMlxufTtcbmV4cG9ydHMuUDFfVkFMVUVTID0ge1xuICAgIE9OTFlfUkVUUklFVkU6IDB4MDAsXG4gICAgU0hPV19BRERSRVNTX0lOX0RFVklDRTogMHgwMVxufTtcbmV4cG9ydHMuUEtMRU4gPSAzMztcbmV4cG9ydHMuU0lHTEVOID0gNjQ7XG52YXIgTGVkZ2VyRXJyb3I7XG4oZnVuY3Rpb24gKExlZGdlckVycm9yKSB7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJVMkZVbmtub3duXCJdID0gMV0gPSBcIlUyRlVua25vd25cIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIlUyRkJhZFJlcXVlc3RcIl0gPSAyXSA9IFwiVTJGQmFkUmVxdWVzdFwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiVTJGQ29uZmlndXJhdGlvblVuc3VwcG9ydGVkXCJdID0gM10gPSBcIlUyRkNvbmZpZ3VyYXRpb25VbnN1cHBvcnRlZFwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiVTJGRGV2aWNlSW5lbGlnaWJsZVwiXSA9IDRdID0gXCJVMkZEZXZpY2VJbmVsaWdpYmxlXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJVMkZUaW1lb3V0XCJdID0gNV0gPSBcIlUyRlRpbWVvdXRcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIlRpbWVvdXRcIl0gPSAxNF0gPSBcIlRpbWVvdXRcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIk5vRXJyb3JzXCJdID0gMzY4NjRdID0gXCJOb0Vycm9yc1wiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiRGV2aWNlSXNCdXN5XCJdID0gMzY4NjVdID0gXCJEZXZpY2VJc0J1c3lcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIkVycm9yRGVyaXZpbmdLZXlzXCJdID0gMjY2MjZdID0gXCJFcnJvckRlcml2aW5nS2V5c1wiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiRXhlY3V0aW9uRXJyb3JcIl0gPSAyNTYwMF0gPSBcIkV4ZWN1dGlvbkVycm9yXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJXcm9uZ0xlbmd0aFwiXSA9IDI2MzY4XSA9IFwiV3JvbmdMZW5ndGhcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIkVtcHR5QnVmZmVyXCJdID0gMjcwMTBdID0gXCJFbXB0eUJ1ZmZlclwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiT3V0cHV0QnVmZmVyVG9vU21hbGxcIl0gPSAyNzAxMV0gPSBcIk91dHB1dEJ1ZmZlclRvb1NtYWxsXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJEYXRhSXNJbnZhbGlkXCJdID0gMjcwMTJdID0gXCJEYXRhSXNJbnZhbGlkXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJDb25kaXRpb25zTm90U2F0aXNmaWVkXCJdID0gMjcwMTNdID0gXCJDb25kaXRpb25zTm90U2F0aXNmaWVkXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJUcmFuc2FjdGlvblJlamVjdGVkXCJdID0gMjcwMTRdID0gXCJUcmFuc2FjdGlvblJlamVjdGVkXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJCYWRLZXlIYW5kbGVcIl0gPSAyNzI2NF0gPSBcIkJhZEtleUhhbmRsZVwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiSW52YWxpZFAxUDJcIl0gPSAyNzM5Ml0gPSBcIkludmFsaWRQMVAyXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJJbnN0cnVjdGlvbk5vdFN1cHBvcnRlZFwiXSA9IDI3OTA0XSA9IFwiSW5zdHJ1Y3Rpb25Ob3RTdXBwb3J0ZWRcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIkFwcERvZXNOb3RTZWVtVG9CZU9wZW5cIl0gPSAyODE2MF0gPSBcIkFwcERvZXNOb3RTZWVtVG9CZU9wZW5cIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIlVua25vd25FcnJvclwiXSA9IDI4NDE2XSA9IFwiVW5rbm93bkVycm9yXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJTaWduVmVyaWZ5RXJyb3JcIl0gPSAyODQxN10gPSBcIlNpZ25WZXJpZnlFcnJvclwiO1xufSkoTGVkZ2VyRXJyb3IgPSBleHBvcnRzLkxlZGdlckVycm9yIHx8IChleHBvcnRzLkxlZGdlckVycm9yID0ge30pKTtcbmV4cG9ydHMuRVJST1JfREVTQ1JJUFRJT04gPSAoX2EgPSB7fSxcbiAgICBfYVtMZWRnZXJFcnJvci5VMkZVbmtub3duXSA9ICdVMkY6IFVua25vd24nLFxuICAgIF9hW0xlZGdlckVycm9yLlUyRkJhZFJlcXVlc3RdID0gJ1UyRjogQmFkIHJlcXVlc3QnLFxuICAgIF9hW0xlZGdlckVycm9yLlUyRkNvbmZpZ3VyYXRpb25VbnN1cHBvcnRlZF0gPSAnVTJGOiBDb25maWd1cmF0aW9uIHVuc3VwcG9ydGVkJyxcbiAgICBfYVtMZWRnZXJFcnJvci5VMkZEZXZpY2VJbmVsaWdpYmxlXSA9ICdVMkY6IERldmljZSBJbmVsaWdpYmxlJyxcbiAgICBfYVtMZWRnZXJFcnJvci5VMkZUaW1lb3V0XSA9ICdVMkY6IFRpbWVvdXQnLFxuICAgIF9hW0xlZGdlckVycm9yLlRpbWVvdXRdID0gJ1RpbWVvdXQnLFxuICAgIF9hW0xlZGdlckVycm9yLk5vRXJyb3JzXSA9ICdObyBlcnJvcnMnLFxuICAgIF9hW0xlZGdlckVycm9yLkRldmljZUlzQnVzeV0gPSAnRGV2aWNlIGlzIGJ1c3knLFxuICAgIF9hW0xlZGdlckVycm9yLkVycm9yRGVyaXZpbmdLZXlzXSA9ICdFcnJvciBkZXJpdmluZyBrZXlzJyxcbiAgICBfYVtMZWRnZXJFcnJvci5FeGVjdXRpb25FcnJvcl0gPSAnRXhlY3V0aW9uIEVycm9yJyxcbiAgICBfYVtMZWRnZXJFcnJvci5Xcm9uZ0xlbmd0aF0gPSAnV3JvbmcgTGVuZ3RoJyxcbiAgICBfYVtMZWRnZXJFcnJvci5FbXB0eUJ1ZmZlcl0gPSAnRW1wdHkgQnVmZmVyJyxcbiAgICBfYVtMZWRnZXJFcnJvci5PdXRwdXRCdWZmZXJUb29TbWFsbF0gPSAnT3V0cHV0IGJ1ZmZlciB0b28gc21hbGwnLFxuICAgIF9hW0xlZGdlckVycm9yLkRhdGFJc0ludmFsaWRdID0gJ0RhdGEgaXMgaW52YWxpZCcsXG4gICAgX2FbTGVkZ2VyRXJyb3IuQ29uZGl0aW9uc05vdFNhdGlzZmllZF0gPSAnQ29uZGl0aW9ucyBub3Qgc2F0aXNmaWVkJyxcbiAgICBfYVtMZWRnZXJFcnJvci5UcmFuc2FjdGlvblJlamVjdGVkXSA9ICdUcmFuc2FjdGlvbiByZWplY3RlZCcsXG4gICAgX2FbTGVkZ2VyRXJyb3IuQmFkS2V5SGFuZGxlXSA9ICdCYWQga2V5IGhhbmRsZScsXG4gICAgX2FbTGVkZ2VyRXJyb3IuSW52YWxpZFAxUDJdID0gJ0ludmFsaWQgUDEvUDInLFxuICAgIF9hW0xlZGdlckVycm9yLkluc3RydWN0aW9uTm90U3VwcG9ydGVkXSA9ICdJbnN0cnVjdGlvbiBub3Qgc3VwcG9ydGVkJyxcbiAgICBfYVtMZWRnZXJFcnJvci5BcHBEb2VzTm90U2VlbVRvQmVPcGVuXSA9ICdBcHAgZG9lcyBub3Qgc2VlbSB0byBiZSBvcGVuJyxcbiAgICBfYVtMZWRnZXJFcnJvci5Vbmtub3duRXJyb3JdID0gJ1Vua25vd24gZXJyb3InLFxuICAgIF9hW0xlZGdlckVycm9yLlNpZ25WZXJpZnlFcnJvcl0gPSAnU2lnbi92ZXJpZnkgZXJyb3InLFxuICAgIF9hKTtcbmZ1bmN0aW9uIGVycm9yQ29kZVRvU3RyaW5nKHN0YXR1c0NvZGUpIHtcbiAgICBpZiAoc3RhdHVzQ29kZSBpbiBleHBvcnRzLkVSUk9SX0RFU0NSSVBUSU9OKVxuICAgICAgICByZXR1cm4gZXhwb3J0cy5FUlJPUl9ERVNDUklQVElPTltzdGF0dXNDb2RlXTtcbiAgICByZXR1cm4gXCJVbmtub3duIFN0YXR1cyBDb2RlOiBcIiArIHN0YXR1c0NvZGU7XG59XG5leHBvcnRzLmVycm9yQ29kZVRvU3RyaW5nID0gZXJyb3JDb2RlVG9TdHJpbmc7XG5mdW5jdGlvbiBpc0RpY3Qodikge1xuICAgIHJldHVybiB0eXBlb2YgdiA9PT0gJ29iamVjdCcgJiYgdiAhPT0gbnVsbCAmJiAhKHYgaW5zdGFuY2VvZiBBcnJheSkgJiYgISh2IGluc3RhbmNlb2YgRGF0ZSk7XG59XG5mdW5jdGlvbiBwcm9jZXNzRXJyb3JSZXNwb25zZShyZXNwb25zZSkge1xuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICBpZiAoaXNEaWN0KHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXNwb25zZSwgJ3N0YXR1c0NvZGUnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybkNvZGU6IHJlc3BvbnNlLnN0YXR1c0NvZGUsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogZXJyb3JDb2RlVG9TdHJpbmcocmVzcG9uc2Uuc3RhdHVzQ29kZSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXNwb25zZSwgJ3JldHVybkNvZGUnKSAmJlxuICAgICAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXNwb25zZSwgJ2Vycm9yTWVzc2FnZScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXR1cm5Db2RlOiAweGZmZmYsXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHJlc3BvbnNlLnRvU3RyaW5nKClcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmV0dXJuQ29kZTogMHhmZmZmLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IHJlc3BvbnNlLnRvU3RyaW5nKClcbiAgICB9O1xufVxuZXhwb3J0cy5wcm9jZXNzRXJyb3JSZXNwb25zZSA9IHByb2Nlc3NFcnJvclJlc3BvbnNlO1xuZnVuY3Rpb24gZ2V0VmVyc2lvbih0cmFuc3BvcnQpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0cmFuc3BvcnQuc2VuZChleHBvcnRzLkNMQSwgZXhwb3J0cy5JTlMuR0VUX1ZFUlNJT04sIDAsIDApLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvckNvZGVEYXRhID0gcmVzcG9uc2Uuc2xpY2UoLTIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuQ29kZSA9IChlcnJvckNvZGVEYXRhWzBdICogMjU2ICsgZXJyb3JDb2RlRGF0YVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXRJZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5sZW5ndGggPj0gOSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0SWQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChyZXNwb25zZVs1XSA8PCAyNCkgKyAocmVzcG9uc2VbNl0gPDwgMTYpICsgKHJlc3BvbnNlWzddIDw8IDgpICsgKHJlc3BvbnNlWzhdIDw8IDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1iaXR3aXNlICovXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybkNvZGU6IHJldHVybkNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGVycm9yQ29kZVRvU3RyaW5nKHJldHVybkNvZGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdE1vZGU6IHJlc3BvbnNlWzBdICE9PSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFqb3I6IHJlc3BvbnNlWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWlub3I6IHJlc3BvbnNlWzJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2g6IHJlc3BvbnNlWzNdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGV2aWNlTG9ja2VkOiByZXNwb25zZVs0XSA9PT0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldElkOiB0YXJnZXRJZC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9LCBwcm9jZXNzRXJyb3JSZXNwb25zZSldO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZ2V0VmVyc2lvbiA9IGdldFZlcnNpb247XG52YXIgSEFSREVORUQgPSAweDgwMDAwMDAwO1xuZnVuY3Rpb24gc2VyaWFsaXplUGF0aChwYXRoKSB7XG4gICAgaWYgKCFwYXRoLnN0YXJ0c1dpdGgoJ20nKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhdGggc2hvdWxkIHN0YXJ0IHdpdGggXCJtXCIgKGUuZyBcIm0vNDRcXCcvNTc1N1xcJy81XFwnLzAvM1wiKScpO1xuICAgIH1cbiAgICB2YXIgcGF0aEFycmF5ID0gcGF0aC5zcGxpdCgnLycpO1xuICAgIGlmIChwYXRoQXJyYXkubGVuZ3RoICE9PSA2KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcGF0aC4gKGUuZyBcXFwibS80NCcvNTc1NycvNScvMC8zXFxcIilcIik7XG4gICAgfVxuICAgIHZhciBidWYgPSBCdWZmZXIuYWxsb2MoMjApO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgcGF0aEFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IDA7XG4gICAgICAgIHZhciBjaGlsZCA9IHBhdGhBcnJheVtpXTtcbiAgICAgICAgaWYgKGNoaWxkLmVuZHNXaXRoKFwiJ1wiKSkge1xuICAgICAgICAgICAgdmFsdWUgKz0gSEFSREVORUQ7XG4gICAgICAgICAgICBjaGlsZCA9IGNoaWxkLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2hpbGROdW1iZXIgPSBOdW1iZXIoY2hpbGQpO1xuICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKGNoaWxkTnVtYmVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwYXRoIDogXCIgKyBjaGlsZCArIFwiIGlzIG5vdCBhIG51bWJlci4gKGUuZyBcXFwibS80NCcvNDYxJy81Jy8wLzNcXFwiKVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hpbGROdW1iZXIgPj0gSEFSREVORUQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5jb3JyZWN0IGNoaWxkIHZhbHVlIChiaWdnZXIgb3IgZXF1YWwgdG8gMHg4MDAwMDAwMCknKTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSArPSBjaGlsZE51bWJlcjtcbiAgICAgICAgYnVmLndyaXRlVUludDMyTEUodmFsdWUsIDQgKiAoaSAtIDEpKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1Zjtcbn1cbmV4cG9ydHMuc2VyaWFsaXplUGF0aCA9IHNlcmlhbGl6ZVBhdGg7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLkxlZGdlckVycm9yID0gdm9pZCAwO1xudmFyIGNvbW1vbl8xID0gcmVxdWlyZShcIi4vY29tbW9uXCIpO1xuZXhwb3J0cy5MZWRnZXJFcnJvciA9IGNvbW1vbl8xLkxlZGdlckVycm9yO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3R5cGVzXCIpLCBleHBvcnRzKTtcbmZ1bmN0aW9uIHByb2Nlc3NHZXRBZGRyUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICB2YXIgcGFydGlhbFJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgdmFyIGVycm9yQ29kZURhdGEgPSBwYXJ0aWFsUmVzcG9uc2Uuc2xpY2UoLTIpO1xuICAgIHZhciByZXR1cm5Db2RlID0gKGVycm9yQ29kZURhdGFbMF0gKiAyNTYgKyBlcnJvckNvZGVEYXRhWzFdKTtcbiAgICB2YXIgcHVibGljS2V5ID0gQnVmZmVyLmZyb20ocGFydGlhbFJlc3BvbnNlLnNsaWNlKDAsIGNvbW1vbl8xLlBLTEVOKSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHVibGljS2V5OiBwdWJsaWNLZXksXG4gICAgICAgIHJldHVybkNvZGU6IHJldHVybkNvZGUsXG4gICAgICAgIGVycm9yTWVzc2FnZTogY29tbW9uXzEuZXJyb3JDb2RlVG9TdHJpbmcocmV0dXJuQ29kZSlcbiAgICB9O1xufVxudmFyIENhc3BlckFwcCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYXNwZXJBcHAodHJhbnNwb3J0KSB7XG4gICAgICAgIGlmICghdHJhbnNwb3J0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyYW5zcG9ydCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICAgIH1cbiAgICBDYXNwZXJBcHAucHJlcGFyZUNodW5rcyA9IGZ1bmN0aW9uIChzZXJpYWxpemVkUGF0aEJ1ZmZlciwgbWVzc2FnZSkge1xuICAgICAgICB2YXIgY2h1bmtzID0gW107XG4gICAgICAgIC8vIEZpcnN0IGNodW5rIChvbmx5IHBhdGgpXG4gICAgICAgIGNodW5rcy5wdXNoKHNlcmlhbGl6ZWRQYXRoQnVmZmVyKTtcbiAgICAgICAgdmFyIG1lc3NhZ2VCdWZmZXIgPSBCdWZmZXIuZnJvbShtZXNzYWdlKTtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoW21lc3NhZ2VCdWZmZXJdKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWZmZXIubGVuZ3RoOyBpICs9IGNvbW1vbl8xLkNIVU5LX1NJWkUpIHtcbiAgICAgICAgICAgIHZhciBlbmQgPSBpICsgY29tbW9uXzEuQ0hVTktfU0laRTtcbiAgICAgICAgICAgIGlmIChpID4gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGVuZCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaHVua3MucHVzaChidWZmZXIuc2xpY2UoaSwgZW5kKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNodW5rcztcbiAgICB9O1xuICAgIENhc3BlckFwcC5wcm90b3R5cGUuc2lnbkdldENodW5rcyA9IGZ1bmN0aW9uIChwYXRoLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgQ2FzcGVyQXBwLnByZXBhcmVDaHVua3MoY29tbW9uXzEuc2VyaWFsaXplUGF0aChwYXRoKSwgbWVzc2FnZSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2FzcGVyQXBwLnByb3RvdHlwZS5nZXRWZXJzaW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIGNvbW1vbl8xLmdldFZlcnNpb24odGhpcy50cmFuc3BvcnQpW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycikgeyByZXR1cm4gY29tbW9uXzEucHJvY2Vzc0Vycm9yUmVzcG9uc2UoZXJyKTsgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2FzcGVyQXBwLnByb3RvdHlwZS5nZXRBcHBJbmZvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMudHJhbnNwb3J0LnNlbmQoMHhiMCwgMHgwMSwgMCwgMCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvckNvZGVEYXRhID0gcmVzcG9uc2Uuc2xpY2UoLTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybkNvZGUgPSBlcnJvckNvZGVEYXRhWzBdICogMjU2ICsgZXJyb3JDb2RlRGF0YVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcHBOYW1lID0gJ2Vycic7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXBwVmVyc2lvbiA9ICdlcnInO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZsYWdMZW4gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZsYWdzVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlWzBdICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGVkZ2VyIHJlc3BvbmRzIHdpdGggZm9ybWF0IElEIDEuIFRoZXJlIGlzIG5vIHNwZWMgZm9yIGFueSBmb3JtYXQgIT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5lcnJvck1lc3NhZ2UgPSAncmVzcG9uc2UgZm9ybWF0IElEIG5vdCByZWNvZ25pemVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucmV0dXJuQ29kZSA9IGNvbW1vbl8xLkxlZGdlckVycm9yLkRldmljZUlzQnVzeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcHBOYW1lTGVuID0gcmVzcG9uc2VbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwTmFtZSA9IHJlc3BvbnNlLnNsaWNlKDIsIDIgKyBhcHBOYW1lTGVuKS50b1N0cmluZygnYXNjaWknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWR4ID0gMiArIGFwcE5hbWVMZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFwcFZlcnNpb25MZW4gPSByZXNwb25zZVtpZHhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcFZlcnNpb24gPSByZXNwb25zZS5zbGljZShpZHgsIGlkeCArIGFwcFZlcnNpb25MZW4pLnRvU3RyaW5nKCdhc2NpaScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeCArPSBhcHBWZXJzaW9uTGVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcHBGbGFnc0xlbiA9IHJlc3BvbnNlW2lkeF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ0xlbiA9IGFwcEZsYWdzTGVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWdzVmFsdWUgPSByZXNwb25zZVtpZHhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5Db2RlOiByZXR1cm5Db2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogY29tbW9uXzEuZXJyb3JDb2RlVG9TdHJpbmcocmV0dXJuQ29kZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBOYW1lOiBhcHBOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcFZlcnNpb246IGFwcFZlcnNpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ0xlbjogZmxhZ0xlbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnc1ZhbHVlOiBmbGFnc1ZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWdSZWNvdmVyeTogKGZsYWdzVmFsdWUgJiAxKSAhPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWdTaWduZWRNY3VDb2RlOiAoZmxhZ3NWYWx1ZSAmIDIpICE9PSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ09uYm9hcmRlZDogKGZsYWdzVmFsdWUgJiA0KSAhPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWdQSU5WYWxpZGF0ZWQ6IChmbGFnc1ZhbHVlICYgMTI4KSAhPT0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSwgY29tbW9uXzEucHJvY2Vzc0Vycm9yUmVzcG9uc2UpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENhc3BlckFwcC5wcm90b3R5cGUuZ2V0QWRkcmVzc0FuZFB1YktleSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZXJpYWxpemVkUGF0aDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVkUGF0aCA9IGNvbW1vbl8xLnNlcmlhbGl6ZVBhdGgocGF0aCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMudHJhbnNwb3J0XG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VuZChjb21tb25fMS5DTEEsIGNvbW1vbl8xLklOUy5HRVRfQUREUl9TRUNQMjU2SzEsIGNvbW1vbl8xLlAxX1ZBTFVFUy5PTkxZX1JFVFJJRVZFLCAwLCBzZXJpYWxpemVkUGF0aCwgWzB4OTAwMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihwcm9jZXNzR2V0QWRkclJlc3BvbnNlLCBjb21tb25fMS5wcm9jZXNzRXJyb3JSZXNwb25zZSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2FzcGVyQXBwLnByb3RvdHlwZS5zaG93QWRkcmVzc0FuZFB1YktleSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZXJpYWxpemVkUGF0aDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVkUGF0aCA9IGNvbW1vbl8xLnNlcmlhbGl6ZVBhdGgocGF0aCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMudHJhbnNwb3J0XG4gICAgICAgICAgICAgICAgICAgICAgICAuc2VuZChjb21tb25fMS5DTEEsIGNvbW1vbl8xLklOUy5HRVRfQUREUl9TRUNQMjU2SzEsIGNvbW1vbl8xLlAxX1ZBTFVFUy5TSE9XX0FERFJFU1NfSU5fREVWSUNFLCAwLCBzZXJpYWxpemVkUGF0aCwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbW9uXzEuTGVkZ2VyRXJyb3IuTm9FcnJvcnMsXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihwcm9jZXNzR2V0QWRkclJlc3BvbnNlLCBjb21tb25fMS5wcm9jZXNzRXJyb3JSZXNwb25zZSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2FzcGVyQXBwLnByb3RvdHlwZS5zaWduU2VuZENodW5rID0gZnVuY3Rpb24gKGNodW5rSWR4LCBjaHVua051bSwgY2h1bmspIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBheWxvYWRUeXBlO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlID0gY29tbW9uXzEuUEFZTE9BRF9UWVBFLkFERDtcbiAgICAgICAgICAgICAgICBpZiAoY2h1bmtJZHggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFR5cGUgPSBjb21tb25fMS5QQVlMT0FEX1RZUEUuSU5JVDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNodW5rSWR4ID09PSBjaHVua051bSkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZSA9IGNvbW1vbl8xLlBBWUxPQURfVFlQRS5MQVNUO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy50cmFuc3BvcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKGNvbW1vbl8xLkNMQSwgY29tbW9uXzEuSU5TLlNJR05fU0VDUDI1NksxLCBwYXlsb2FkVHlwZSwgMCwgY2h1bmssIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1vbl8xLkxlZGdlckVycm9yLk5vRXJyb3JzLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbW9uXzEuTGVkZ2VyRXJyb3IuRGF0YUlzSW52YWxpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1vbl8xLkxlZGdlckVycm9yLkJhZEtleUhhbmRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1vbl8xLkxlZGdlckVycm9yLlNpZ25WZXJpZnlFcnJvclxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JDb2RlRGF0YSA9IHJlc3BvbnNlLnNsaWNlKC0yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5Db2RlID0gZXJyb3JDb2RlRGF0YVswXSAqIDI1NiArIGVycm9yQ29kZURhdGFbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gY29tbW9uXzEuZXJyb3JDb2RlVG9TdHJpbmcocmV0dXJuQ29kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2lnbmF0dXJlUlMgPSBCdWZmZXIuYWxsb2MoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuQ29kZSA9PT0gY29tbW9uXzEuTGVkZ2VyRXJyb3IuQmFkS2V5SGFuZGxlIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuQ29kZSA9PT0gY29tbW9uXzEuTGVkZ2VyRXJyb3IuRGF0YUlzSW52YWxpZCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybkNvZGUgPT09IGNvbW1vbl8xLkxlZGdlckVycm9yLlNpZ25WZXJpZnlFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IGVycm9yTWVzc2FnZSArIFwiIDogXCIgKyByZXNwb25zZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMCwgcmVzcG9uc2UubGVuZ3RoIC0gMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKCdhc2NpaScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVybkNvZGUgPT09IGNvbW1vbl8xLkxlZGdlckVycm9yLk5vRXJyb3JzICYmIHJlc3BvbnNlLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVSUyA9IHJlc3BvbnNlLnNsaWNlKDAsIGNvbW1vbl8xLlNJR0xFTik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlUlM6IHNpZ25hdHVyZVJTLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5Db2RlOiByZXR1cm5Db2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGVycm9yTWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybkNvZGU6IHJldHVybkNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvck1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0sIGNvbW1vbl8xLnByb2Nlc3NFcnJvclJlc3BvbnNlKV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDYXNwZXJBcHAucHJvdG90eXBlLnNpZ24gPSBmdW5jdGlvbiAocGF0aCwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnNpZ25HZXRDaHVua3MocGF0aCwgbWVzc2FnZSkudGhlbihmdW5jdGlvbiAoY2h1bmtzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuc2lnblNlbmRDaHVuaygxLCBjaHVua3MubGVuZ3RoLCBjaHVua3NbMF0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCwgaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybkNvZGU6IHJlc3BvbnNlLnJldHVybkNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogcmVzcG9uc2UuZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVSUzogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGkgPCBjaHVua3MubGVuZ3RoKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zaWduU2VuZENodW5rKDEgKyBpLCBjaHVua3MubGVuZ3RoLCBjaHVua3NbaV0pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJldHVybkNvZGUgIT09IGNvbW1vbl8xLkxlZGdlckVycm9yLk5vRXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzIgLypyZXR1cm4qLywgcmVzdWx0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0sIGNvbW1vbl8xLnByb2Nlc3NFcnJvclJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgY29tbW9uXzEucHJvY2Vzc0Vycm9yUmVzcG9uc2UpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBDYXNwZXJBcHA7XG59KCkpO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBDYXNwZXJBcHA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICB2YXIgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG5jb25zdCBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5jb25zdCBjdXN0b21JbnNwZWN0U3ltYm9sID1cbiAgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbFsnZm9yJ10gPT09ICdmdW5jdGlvbicpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgPyBTeW1ib2xbJ2ZvciddKCdub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbScpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgOiBudWxsXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuY29uc3QgS19NQVhfTEVOR1RIID0gMHg3ZmZmZmZmZlxuZXhwb3J0cy5rTWF4TGVuZ3RoID0gS19NQVhfTEVOR1RIXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFByaW50IHdhcm5pbmcgYW5kIHJlY29tbWVuZCB1c2luZyBgYnVmZmVyYCB2NC54IHdoaWNoIGhhcyBhbiBPYmplY3RcbiAqICAgICAgICAgICAgICAgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIFdlIHJlcG9ydCB0aGF0IHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGlmIHRoZSBhcmUgbm90IHN1YmNsYXNzYWJsZVxuICogdXNpbmcgX19wcm90b19fLiBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YFxuICogKFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4KS4gSUUgMTAgbGFja3Mgc3VwcG9ydFxuICogZm9yIF9fcHJvdG9fXyBhbmQgaGFzIGEgYnVnZ3kgdHlwZWQgYXJyYXkgaW1wbGVtZW50YXRpb24uXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gdHlwZWRBcnJheVN1cHBvcnQoKVxuXG5pZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgJ1RoaXMgYnJvd3NlciBsYWNrcyB0eXBlZCBhcnJheSAoVWludDhBcnJheSkgc3VwcG9ydCB3aGljaCBpcyByZXF1aXJlZCBieSAnICtcbiAgICAnYGJ1ZmZlcmAgdjUueC4gVXNlIGBidWZmZXJgIHY0LnggaWYgeW91IHJlcXVpcmUgb2xkIGJyb3dzZXIgc3VwcG9ydC4nXG4gIClcbn1cblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICAvLyBDYW4gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWQ/XG4gIHRyeSB7XG4gICAgY29uc3QgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBjb25zdCBwcm90byA9IHsgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9IH1cbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocHJvdG8sIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihhcnIsIHByb3RvKVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLnByb3RvdHlwZSwgJ3BhcmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGhpcykpIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpcy5idWZmZXJcbiAgfVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlci5wcm90b3R5cGUsICdvZmZzZXQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKHRoaXMpKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMuYnl0ZU9mZnNldFxuICB9XG59KVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAobGVuZ3RoID4gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBcIicgKyBsZW5ndGggKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihidWYsIEJ1ZmZlci5wcm90b3R5cGUpXG4gIHJldHVybiBidWZcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIHN0cmluZy4gUmVjZWl2ZWQgdHlwZSBudW1iZXInXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZShhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20oYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG5mdW5jdGlvbiBmcm9tICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlWaWV3KHZhbHVlKVxuICB9XG5cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksICcgK1xuICAgICAgJ29yIEFycmF5LWxpa2UgT2JqZWN0LiBSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHZhbHVlKVxuICAgIClcbiAgfVxuXG4gIGlmIChpc0luc3RhbmNlKHZhbHVlLCBBcnJheUJ1ZmZlcikgfHxcbiAgICAgICh2YWx1ZSAmJiBpc0luc3RhbmNlKHZhbHVlLmJ1ZmZlciwgQXJyYXlCdWZmZXIpKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAoaXNJbnN0YW5jZSh2YWx1ZSwgU2hhcmVkQXJyYXlCdWZmZXIpIHx8XG4gICAgICAodmFsdWUgJiYgaXNJbnN0YW5jZSh2YWx1ZS5idWZmZXIsIFNoYXJlZEFycmF5QnVmZmVyKSkpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgbnVtYmVyJ1xuICAgIClcbiAgfVxuXG4gIGNvbnN0IHZhbHVlT2YgPSB2YWx1ZS52YWx1ZU9mICYmIHZhbHVlLnZhbHVlT2YoKVxuICBpZiAodmFsdWVPZiAhPSBudWxsICYmIHZhbHVlT2YgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlT2YsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGNvbnN0IGIgPSBmcm9tT2JqZWN0KHZhbHVlKVxuICBpZiAoYikgcmV0dXJuIGJcblxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvUHJpbWl0aXZlICE9IG51bGwgJiZcbiAgICAgIHR5cGVvZiB2YWx1ZVtTeW1ib2wudG9QcmltaXRpdmVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlW1N5bWJvbC50b1ByaW1pdGl2ZV0oJ3N0cmluZycpLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCAnICtcbiAgICAnb3IgQXJyYXktbGlrZSBPYmplY3QuIFJlY2VpdmVkIHR5cGUgJyArICh0eXBlb2YgdmFsdWUpXG4gIClcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbSh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBOb3RlOiBDaGFuZ2UgcHJvdG90eXBlICphZnRlciogQnVmZmVyLmZyb20gaXMgZGVmaW5lZCB0byB3b3JrYXJvdW5kIENocm9tZSBidWc6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzE0OFxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlci5wcm90b3R5cGUsIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlciwgVWludDhBcnJheSlcblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIFwiJyArIHNpemUgKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIoc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICB9XG5cbiAgY29uc3QgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgbGV0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW5ndGgpXG5cbiAgY29uc3QgYWN0dWFsID0gYnVmLndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICBidWYgPSBidWYuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlIChhcnJheSkge1xuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgY29uc3QgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGJ1ZltpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlWaWV3IChhcnJheVZpZXcpIHtcbiAgaWYgKGlzSW5zdGFuY2UoYXJyYXlWaWV3LCBVaW50OEFycmF5KSkge1xuICAgIGNvbnN0IGNvcHkgPSBuZXcgVWludDhBcnJheShhcnJheVZpZXcpXG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcihjb3B5LmJ1ZmZlciwgY29weS5ieXRlT2Zmc2V0LCBjb3B5LmJ5dGVMZW5ndGgpXG4gIH1cbiAgcmV0dXJuIGZyb21BcnJheUxpa2UoYXJyYXlWaWV3KVxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wib2Zmc2V0XCIgaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJsZW5ndGhcIiBpcyBvdXRzaWRlIG9mIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgbGV0IGJ1ZlxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGJ1ZiwgQnVmZmVyLnByb3RvdHlwZSlcblxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICBjb25zdCBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIGNvbnN0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW4pXG5cbiAgICBpZiAoYnVmLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGJ1ZlxuICAgIH1cblxuICAgIG9iai5jb3B5KGJ1ZiwgMCwgMCwgbGVuKVxuICAgIHJldHVybiBidWZcbiAgfVxuXG4gIGlmIChvYmoubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IG51bWJlcklzTmFOKG9iai5sZW5ndGgpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKDApXG4gICAgfVxuICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKG9iailcbiAgfVxuXG4gIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgQXJyYXkuaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5TGlrZShvYmouZGF0YSlcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwgS19NQVhfTEVOR1RIYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IEtfTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBLX01BWF9MRU5HVEgudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiBiICE9IG51bGwgJiYgYi5faXNCdWZmZXIgPT09IHRydWUgJiZcbiAgICBiICE9PSBCdWZmZXIucHJvdG90eXBlIC8vIHNvIEJ1ZmZlci5pc0J1ZmZlcihCdWZmZXIucHJvdG90eXBlKSB3aWxsIGJlIGZhbHNlXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoaXNJbnN0YW5jZShhLCBVaW50OEFycmF5KSkgYSA9IEJ1ZmZlci5mcm9tKGEsIGEub2Zmc2V0LCBhLmJ5dGVMZW5ndGgpXG4gIGlmIChpc0luc3RhbmNlKGIsIFVpbnQ4QXJyYXkpKSBiID0gQnVmZmVyLmZyb20oYiwgYi5vZmZzZXQsIGIuYnl0ZUxlbmd0aClcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwiYnVmMVwiLCBcImJ1ZjJcIiBhcmd1bWVudHMgbXVzdCBiZSBvbmUgb2YgdHlwZSBCdWZmZXIgb3IgVWludDhBcnJheSdcbiAgICApXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICBsZXQgeCA9IGEubGVuZ3RoXG4gIGxldCB5ID0gYi5sZW5ndGhcblxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIGxldCBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgbGV0IHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICBsZXQgYnVmID0gbGlzdFtpXVxuICAgIGlmIChpc0luc3RhbmNlKGJ1ZiwgVWludDhBcnJheSkpIHtcbiAgICAgIGlmIChwb3MgKyBidWYubGVuZ3RoID4gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSBidWYgPSBCdWZmZXIuZnJvbShidWYpXG4gICAgICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgIGJ1ZixcbiAgICAgICAgICBwb3NcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH0gZWxzZSB7XG4gICAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICB9XG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgaXNJbnN0YW5jZShzdHJpbmcsIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgb3IgQXJyYXlCdWZmZXIuICcgK1xuICAgICAgJ1JlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBzdHJpbmdcbiAgICApXG4gIH1cblxuICBjb25zdCBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGNvbnN0IG11c3RNYXRjaCA9IChhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gPT09IHRydWUpXG4gIGlmICghbXVzdE1hdGNoICYmIGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgbGV0IGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkge1xuICAgICAgICAgIHJldHVybiBtdXN0TWF0Y2ggPyAtMSA6IHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIH1cbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIGxldCBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2VyY2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGlzIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgKGFuZCB0aGUgYGlzLWJ1ZmZlcmAgbnBtIHBhY2thZ2UpXG4vLyB0byBkZXRlY3QgYSBCdWZmZXIgaW5zdGFuY2UuIEl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBgaW5zdGFuY2VvZiBCdWZmZXJgXG4vLyByZWxpYWJseSBpbiBhIGJyb3dzZXJpZnkgY29udGV4dCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG11bHRpcGxlIGRpZmZlcmVudFxuLy8gY29waWVzIG9mIHRoZSAnYnVmZmVyJyBwYWNrYWdlIGluIHVzZS4gVGhpcyBtZXRob2Qgd29ya3MgZXZlbiBmb3IgQnVmZmVyXG4vLyBpbnN0YW5jZXMgdGhhdCB3ZXJlIGNyZWF0ZWQgZnJvbSBhbm90aGVyIGNvcHkgb2YgdGhlIGBidWZmZXJgIHBhY2thZ2UuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8xNTRcbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIGNvbnN0IGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvTG9jYWxlU3RyaW5nID0gQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZ1xuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIGxldCBzdHIgPSAnJ1xuICBjb25zdCBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkucmVwbGFjZSgvKC57Mn0pL2csICckMSAnKS50cmltKClcbiAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuaWYgKGN1c3RvbUluc3BlY3RTeW1ib2wpIHtcbiAgQnVmZmVyLnByb3RvdHlwZVtjdXN0b21JbnNwZWN0U3ltYm9sXSA9IEJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoaXNJbnN0YW5jZSh0YXJnZXQsIFVpbnQ4QXJyYXkpKSB7XG4gICAgdGFyZ2V0ID0gQnVmZmVyLmZyb20odGFyZ2V0LCB0YXJnZXQub2Zmc2V0LCB0YXJnZXQuYnl0ZUxlbmd0aClcbiAgfVxuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJ0YXJnZXRcIiBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIEJ1ZmZlciBvciBVaW50OEFycmF5LiAnICtcbiAgICAgICdSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHRhcmdldClcbiAgICApXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICBsZXQgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgbGV0IHkgPSBlbmQgLSBzdGFydFxuICBjb25zdCBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIGNvbnN0IHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIGNvbnN0IHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0IC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChudW1iZXJJc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFt2YWxdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICBsZXQgaW5kZXhTaXplID0gMVxuICBsZXQgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICBsZXQgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICBsZXQgaVxuICBpZiAoZGlyKSB7XG4gICAgbGV0IGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICBjb25zdCByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgbGV0IGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChudW1iZXJJc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoID4+PiAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgY29uc3QgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICBsZXQgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIGNvbnN0IHJlcyA9IFtdXG5cbiAgbGV0IGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIGNvbnN0IGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIGxldCBjb2RlUG9pbnQgPSBudWxsXG4gICAgbGV0IGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRilcbiAgICAgID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERilcbiAgICAgICAgICA/IDNcbiAgICAgICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKVxuICAgICAgICAgICAgICA/IDJcbiAgICAgICAgICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICBsZXQgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG5jb25zdCBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgY29uc3QgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICBsZXQgcmVzID0gJydcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGxldCByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBsZXQgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBjb25zdCBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgbGV0IG91dCA9ICcnXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IGhleFNsaWNlTG9va3VwVGFibGVbYnVmW2ldXVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgY29uc3QgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgbGV0IHJlcyA9ICcnXG4gIC8vIElmIGJ5dGVzLmxlbmd0aCBpcyBvZGQsIHRoZSBsYXN0IDggYml0cyBtdXN0IGJlIGlnbm9yZWQgKHNhbWUgYXMgbm9kZS5qcylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGggLSAxOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIChieXRlc1tpICsgMV0gKiAyNTYpKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgY29uc3QgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YobmV3QnVmLCBCdWZmZXIucHJvdG90eXBlKVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnRMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldF1cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludEJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICBsZXQgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQ4ID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQxNkxFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MzJMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQzMkJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ1VJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdVSW50NjRMRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IGxvID0gZmlyc3QgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAyNFxuXG4gIGNvbnN0IGhpID0gdGhpc1srK29mZnNldF0gK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIGxhc3QgKiAyICoqIDI0XG5cbiAgcmV0dXJuIEJpZ0ludChsbykgKyAoQmlnSW50KGhpKSA8PCBCaWdJbnQoMzIpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnVUludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ1VJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgaGkgPSBmaXJzdCAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdXG5cbiAgY29uc3QgbG8gPSB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIGxhc3RcblxuICByZXR1cm4gKEJpZ0ludChoaSkgPDwgQmlnSW50KDMyKSkgKyBCaWdJbnQobG8pXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXRdXG4gIGxldCBtdWwgPSAxXG4gIGxldCBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgbGV0IGkgPSBieXRlTGVuZ3RoXG4gIGxldCBtdWwgPSAxXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgY29uc3QgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ0ludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ0ludDY0TEUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldCArIDRdICtcbiAgICB0aGlzW29mZnNldCArIDVdICogMiAqKiA4ICtcbiAgICB0aGlzW29mZnNldCArIDZdICogMiAqKiAxNiArXG4gICAgKGxhc3QgPDwgMjQpIC8vIE92ZXJmbG93XG5cbiAgcmV0dXJuIChCaWdJbnQodmFsKSA8PCBCaWdJbnQoMzIpKSArXG4gICAgQmlnSW50KGZpcnN0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgdmFsID0gKGZpcnN0IDw8IDI0KSArIC8vIE92ZXJmbG93XG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF1cblxuICByZXR1cm4gKEJpZ0ludCh2YWwpIDw8IEJpZ0ludCgzMikpICtcbiAgICBCaWdJbnQodGhpc1srK29mZnNldF0gKiAyICoqIDI0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICBsYXN0KVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50TEUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnRCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY29uc3QgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICBsZXQgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIGxldCBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDggPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MTZMRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQzMkxFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MzJCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiB3cnRCaWdVSW50NjRMRSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBtaW4sIG1heCkge1xuICBjaGVja0ludEJJKHZhbHVlLCBtaW4sIG1heCwgYnVmLCBvZmZzZXQsIDcpXG5cbiAgbGV0IGxvID0gTnVtYmVyKHZhbHVlICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbGV0IGhpID0gTnVtYmVyKHZhbHVlID4+IEJpZ0ludCgzMikgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICByZXR1cm4gb2Zmc2V0XG59XG5cbmZ1bmN0aW9uIHdydEJpZ1VJbnQ2NEJFIChidWYsIHZhbHVlLCBvZmZzZXQsIG1pbiwgbWF4KSB7XG4gIGNoZWNrSW50QkkodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgNylcblxuICBsZXQgbG8gPSBOdW1iZXIodmFsdWUgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQgKyA3XSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0ICsgNl0gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCArIDVdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQgKyA0XSA9IGxvXG4gIGxldCBoaSA9IE51bWJlcih2YWx1ZSA+PiBCaWdJbnQoMzIpICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0ICsgM10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCArIDJdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQgKyAxXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0XSA9IGhpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdVSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ1VJbnQ2NExFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0TEUodGhpcywgdmFsdWUsIG9mZnNldCwgQmlnSW50KDApLCBCaWdJbnQoJzB4ZmZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ1VJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnVUludDY0QkUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRCRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBCaWdJbnQoMCksIEJpZ0ludCgnMHhmZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gMFxuICBsZXQgbXVsID0gMVxuICBsZXQgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgbGV0IG11bCA9IDFcbiAgbGV0IHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnSW50NjRMRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NExFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIC1CaWdJbnQoJzB4ODAwMDAwMDAwMDAwMDAwMCcpLCBCaWdJbnQoJzB4N2ZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ0ludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdJbnQ2NEJFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0QkUodGhpcywgdmFsdWUsIG9mZnNldCwgLUJpZ0ludCgnMHg4MDAwMDAwMDAwMDAwMDAwJyksIEJpZ0ludCgnMHg3ZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzaG91bGQgYmUgYSBCdWZmZXInKVxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgY29uc3QgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gVXNlIGJ1aWx0LWluIHdoZW4gYXZhaWxhYmxlLCBtaXNzaW5nIGZyb20gSUUxMVxuICAgIHRoaXMuY29weVdpdGhpbih0YXJnZXRTdGFydCwgc3RhcnQsIGVuZClcbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25zdCBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmICgoZW5jb2RpbmcgPT09ICd1dGY4JyAmJiBjb2RlIDwgMTI4KSB8fFxuICAgICAgICAgIGVuY29kaW5nID09PSAnbGF0aW4xJykge1xuICAgICAgICAvLyBGYXN0IHBhdGg6IElmIGB2YWxgIGZpdHMgaW50byBhIHNpbmdsZSBieXRlLCB1c2UgdGhhdCBudW1lcmljIHZhbHVlLlxuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgdmFsID0gTnVtYmVyKHZhbClcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICBsZXQgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gICAgY29uc3QgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHZhbHVlIFwiJyArIHZhbCArXG4gICAgICAgICdcIiBpcyBpbnZhbGlkIGZvciBhcmd1bWVudCBcInZhbHVlXCInKVxuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBDVVNUT00gRVJST1JTXG4vLyA9PT09PT09PT09PT09XG5cbi8vIFNpbXBsaWZpZWQgdmVyc2lvbnMgZnJvbSBOb2RlLCBjaGFuZ2VkIGZvciBCdWZmZXItb25seSB1c2FnZVxuY29uc3QgZXJyb3JzID0ge31cbmZ1bmN0aW9uIEUgKHN5bSwgZ2V0TWVzc2FnZSwgQmFzZSkge1xuICBlcnJvcnNbc3ltXSA9IGNsYXNzIE5vZGVFcnJvciBleHRlbmRzIEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgIHN1cGVyKClcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXNzYWdlJywge1xuICAgICAgICB2YWx1ZTogZ2V0TWVzc2FnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KVxuXG4gICAgICAvLyBBZGQgdGhlIGVycm9yIGNvZGUgdG8gdGhlIG5hbWUgdG8gaW5jbHVkZSBpdCBpbiB0aGUgc3RhY2sgdHJhY2UuXG4gICAgICB0aGlzLm5hbWUgPSBgJHt0aGlzLm5hbWV9IFske3N5bX1dYFxuICAgICAgLy8gQWNjZXNzIHRoZSBzdGFjayB0byBnZW5lcmF0ZSB0aGUgZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGVycm9yIGNvZGVcbiAgICAgIC8vIGZyb20gdGhlIG5hbWUuXG4gICAgICB0aGlzLnN0YWNrIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICAvLyBSZXNldCB0aGUgbmFtZSB0byB0aGUgYWN0dWFsIG5hbWUuXG4gICAgICBkZWxldGUgdGhpcy5uYW1lXG4gICAgfVxuXG4gICAgZ2V0IGNvZGUgKCkge1xuICAgICAgcmV0dXJuIHN5bVxuICAgIH1cblxuICAgIHNldCBjb2RlICh2YWx1ZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb2RlJywge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0b1N0cmluZyAoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSBbJHtzeW19XTogJHt0aGlzLm1lc3NhZ2V9YFxuICAgIH1cbiAgfVxufVxuXG5FKCdFUlJfQlVGRkVSX09VVF9PRl9CT1VORFMnLFxuICBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gYCR7bmFtZX0gaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzYFxuICAgIH1cblxuICAgIHJldHVybiAnQXR0ZW1wdCB0byBhY2Nlc3MgbWVtb3J5IG91dHNpZGUgYnVmZmVyIGJvdW5kcydcbiAgfSwgUmFuZ2VFcnJvcilcbkUoJ0VSUl9JTlZBTElEX0FSR19UWVBFJyxcbiAgZnVuY3Rpb24gKG5hbWUsIGFjdHVhbCkge1xuICAgIHJldHVybiBgVGhlIFwiJHtuYW1lfVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgJHt0eXBlb2YgYWN0dWFsfWBcbiAgfSwgVHlwZUVycm9yKVxuRSgnRVJSX09VVF9PRl9SQU5HRScsXG4gIGZ1bmN0aW9uIChzdHIsIHJhbmdlLCBpbnB1dCkge1xuICAgIGxldCBtc2cgPSBgVGhlIHZhbHVlIG9mIFwiJHtzdHJ9XCIgaXMgb3V0IG9mIHJhbmdlLmBcbiAgICBsZXQgcmVjZWl2ZWQgPSBpbnB1dFxuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGlucHV0KSAmJiBNYXRoLmFicyhpbnB1dCkgPiAyICoqIDMyKSB7XG4gICAgICByZWNlaXZlZCA9IGFkZE51bWVyaWNhbFNlcGFyYXRvcihTdHJpbmcoaW5wdXQpKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnYmlnaW50Jykge1xuICAgICAgcmVjZWl2ZWQgPSBTdHJpbmcoaW5wdXQpXG4gICAgICBpZiAoaW5wdXQgPiBCaWdJbnQoMikgKiogQmlnSW50KDMyKSB8fCBpbnB1dCA8IC0oQmlnSW50KDIpICoqIEJpZ0ludCgzMikpKSB7XG4gICAgICAgIHJlY2VpdmVkID0gYWRkTnVtZXJpY2FsU2VwYXJhdG9yKHJlY2VpdmVkKVxuICAgICAgfVxuICAgICAgcmVjZWl2ZWQgKz0gJ24nXG4gICAgfVxuICAgIG1zZyArPSBgIEl0IG11c3QgYmUgJHtyYW5nZX0uIFJlY2VpdmVkICR7cmVjZWl2ZWR9YFxuICAgIHJldHVybiBtc2dcbiAgfSwgUmFuZ2VFcnJvcilcblxuZnVuY3Rpb24gYWRkTnVtZXJpY2FsU2VwYXJhdG9yICh2YWwpIHtcbiAgbGV0IHJlcyA9ICcnXG4gIGxldCBpID0gdmFsLmxlbmd0aFxuICBjb25zdCBzdGFydCA9IHZhbFswXSA9PT0gJy0nID8gMSA6IDBcbiAgZm9yICg7IGkgPj0gc3RhcnQgKyA0OyBpIC09IDMpIHtcbiAgICByZXMgPSBgXyR7dmFsLnNsaWNlKGkgLSAzLCBpKX0ke3Jlc31gXG4gIH1cbiAgcmV0dXJuIGAke3ZhbC5zbGljZSgwLCBpKX0ke3Jlc31gXG59XG5cbi8vIENIRUNLIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGNoZWNrQm91bmRzIChidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBpZiAoYnVmW29mZnNldF0gPT09IHVuZGVmaW5lZCB8fCBidWZbb2Zmc2V0ICsgYnl0ZUxlbmd0aF0gPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgYnVmLmxlbmd0aCAtIChieXRlTGVuZ3RoICsgMSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tJbnRCSSAodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHtcbiAgICBjb25zdCBuID0gdHlwZW9mIG1pbiA9PT0gJ2JpZ2ludCcgPyAnbicgOiAnJ1xuICAgIGxldCByYW5nZVxuICAgIGlmIChieXRlTGVuZ3RoID4gMykge1xuICAgICAgaWYgKG1pbiA9PT0gMCB8fCBtaW4gPT09IEJpZ0ludCgwKSkge1xuICAgICAgICByYW5nZSA9IGA+PSAwJHtufSBhbmQgPCAyJHtufSAqKiAkeyhieXRlTGVuZ3RoICsgMSkgKiA4fSR7bn1gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYW5nZSA9IGA+PSAtKDIke259ICoqICR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn0pIGFuZCA8IDIgKiogYCArXG4gICAgICAgICAgICAgICAgYCR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn1gXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlID0gYD49ICR7bWlufSR7bn0gYW5kIDw9ICR7bWF4fSR7bn1gXG4gICAgfVxuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX09VVF9PRl9SQU5HRSgndmFsdWUnLCByYW5nZSwgdmFsdWUpXG4gIH1cbiAgY2hlY2tCb3VuZHMoYnVmLCBvZmZzZXQsIGJ5dGVMZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTnVtYmVyICh2YWx1ZSwgbmFtZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX0lOVkFMSURfQVJHX1RZUEUobmFtZSwgJ251bWJlcicsIHZhbHVlKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJvdW5kc0Vycm9yICh2YWx1ZSwgbGVuZ3RoLCB0eXBlKSB7XG4gIGlmIChNYXRoLmZsb29yKHZhbHVlKSAhPT0gdmFsdWUpIHtcbiAgICB2YWxpZGF0ZU51bWJlcih2YWx1ZSwgdHlwZSlcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9PVVRfT0ZfUkFOR0UodHlwZSB8fCAnb2Zmc2V0JywgJ2FuIGludGVnZXInLCB2YWx1ZSlcbiAgfVxuXG4gIGlmIChsZW5ndGggPCAwKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfQlVGRkVSX09VVF9PRl9CT1VORFMoKVxuICB9XG5cbiAgdGhyb3cgbmV3IGVycm9ycy5FUlJfT1VUX09GX1JBTkdFKHR5cGUgfHwgJ29mZnNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPj0gJHt0eXBlID8gMSA6IDB9IGFuZCA8PSAke2xlbmd0aH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUpXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuY29uc3QgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSB0YWtlcyBlcXVhbCBzaWducyBhcyBlbmQgb2YgdGhlIEJhc2U2NCBlbmNvZGluZ1xuICBzdHIgPSBzdHIuc3BsaXQoJz0nKVswXVxuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyLnRyaW0oKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIGxldCBjb2RlUG9pbnRcbiAgY29uc3QgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICBsZXQgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgY29uc3QgYnl0ZXMgPSBbXVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICBjb25zdCBieXRlQXJyYXkgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIGxldCBjLCBoaSwgbG9cbiAgY29uc3QgYnl0ZUFycmF5ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBsZXQgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuLy8gQXJyYXlCdWZmZXIgb3IgVWludDhBcnJheSBvYmplY3RzIGZyb20gb3RoZXIgY29udGV4dHMgKGkuZS4gaWZyYW1lcykgZG8gbm90IHBhc3Ncbi8vIHRoZSBgaW5zdGFuY2VvZmAgY2hlY2sgYnV0IHRoZXkgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgb2YgdGhhdCB0eXBlLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9pc3N1ZXMvMTY2XG5mdW5jdGlvbiBpc0luc3RhbmNlIChvYmosIHR5cGUpIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIHR5cGUgfHxcbiAgICAob2JqICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWUgIT0gbnVsbCAmJlxuICAgICAgb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09IHR5cGUubmFtZSlcbn1cbmZ1bmN0aW9uIG51bWJlcklzTmFOIChvYmopIHtcbiAgLy8gRm9yIElFMTEgc3VwcG9ydFxuICByZXR1cm4gb2JqICE9PSBvYmogLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuLy8gQ3JlYXRlIGxvb2t1cCB0YWJsZSBmb3IgYHRvU3RyaW5nKCdoZXgnKWBcbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzIxOVxuY29uc3QgaGV4U2xpY2VMb29rdXBUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFscGhhYmV0ID0gJzAxMjM0NTY3ODlhYmNkZWYnXG4gIGNvbnN0IHRhYmxlID0gbmV3IEFycmF5KDI1NilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgY29uc3QgaTE2ID0gaSAqIDE2XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICB0YWJsZVtpMTYgKyBqXSA9IGFscGhhYmV0W2ldICsgYWxwaGFiZXRbal1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhYmxlXG59KSgpXG5cbi8vIFJldHVybiBub3QgZnVuY3Rpb24gd2l0aCBFcnJvciBpZiBCaWdJbnQgbm90IHN1cHBvcnRlZFxuZnVuY3Rpb24gZGVmaW5lQmlnSW50TWV0aG9kIChmbikge1xuICByZXR1cm4gdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyBCdWZmZXJCaWdJbnROb3REZWZpbmVkIDogZm5cbn1cblxuZnVuY3Rpb24gQnVmZmVyQmlnSW50Tm90RGVmaW5lZCAoKSB7XG4gIHRocm93IG5ldyBFcnJvcignQmlnSW50IG5vdCBzdXBwb3J0ZWQnKVxufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgcmVzb2x2ZXIpO1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIHJlc29sdmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGVycm9yTGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBoYW5kbGVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgJ2Vycm9yJywgaGFuZGxlciwgZmxhZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCBsaXN0ZW5lciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgIGVtaXR0ZXIub25jZShuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtaXR0ZXIub24obmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gRXZlbnRUYXJnZXQgZG9lcyBub3QgaGF2ZSBgZXJyb3JgIGV2ZW50IHNlbWFudGljcyBsaWtlIE5vZGVcbiAgICAvLyBFdmVudEVtaXR0ZXJzLCB3ZSBkbyBub3QgbGlzdGVuIGZvciBgZXJyb3JgIGV2ZW50cyBoZXJlLlxuICAgIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiB3cmFwTGlzdGVuZXIoYXJnKSB7XG4gICAgICAvLyBJRSBkb2VzIG5vdCBoYXZlIGJ1aWx0aW4gYHsgb25jZTogdHJ1ZSB9YCBzdXBwb3J0IHNvIHdlXG4gICAgICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5LlxuICAgICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHdyYXBMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBsaXN0ZW5lcihhcmcpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgZW1pdHRlcik7XG4gIH1cbn1cbiIsIi8qISBpZWVlNzU0LiBCU0QtMy1DbGF1c2UgTGljZW5zZS4gRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnL29wZW5zb3VyY2U+ICovXG5leHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IChlICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IChtICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKCh2YWx1ZSAqIGMpIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG4iLCIndXNlIHN0cmljdCdcblxuLy8gQSBsaW5rZWQgbGlzdCB0byBrZWVwIHRyYWNrIG9mIHJlY2VudGx5LXVzZWQtbmVzc1xuY29uc3QgWWFsbGlzdCA9IHJlcXVpcmUoJ3lhbGxpc3QnKVxuXG5jb25zdCBNQVggPSBTeW1ib2woJ21heCcpXG5jb25zdCBMRU5HVEggPSBTeW1ib2woJ2xlbmd0aCcpXG5jb25zdCBMRU5HVEhfQ0FMQ1VMQVRPUiA9IFN5bWJvbCgnbGVuZ3RoQ2FsY3VsYXRvcicpXG5jb25zdCBBTExPV19TVEFMRSA9IFN5bWJvbCgnYWxsb3dTdGFsZScpXG5jb25zdCBNQVhfQUdFID0gU3ltYm9sKCdtYXhBZ2UnKVxuY29uc3QgRElTUE9TRSA9IFN5bWJvbCgnZGlzcG9zZScpXG5jb25zdCBOT19ESVNQT1NFX09OX1NFVCA9IFN5bWJvbCgnbm9EaXNwb3NlT25TZXQnKVxuY29uc3QgTFJVX0xJU1QgPSBTeW1ib2woJ2xydUxpc3QnKVxuY29uc3QgQ0FDSEUgPSBTeW1ib2woJ2NhY2hlJylcbmNvbnN0IFVQREFURV9BR0VfT05fR0VUID0gU3ltYm9sKCd1cGRhdGVBZ2VPbkdldCcpXG5cbmNvbnN0IG5haXZlTGVuZ3RoID0gKCkgPT4gMVxuXG4vLyBscnVMaXN0IGlzIGEgeWFsbGlzdCB3aGVyZSB0aGUgaGVhZCBpcyB0aGUgeW91bmdlc3Rcbi8vIGl0ZW0sIGFuZCB0aGUgdGFpbCBpcyB0aGUgb2xkZXN0LiAgdGhlIGxpc3QgY29udGFpbnMgdGhlIEhpdFxuLy8gb2JqZWN0cyBhcyB0aGUgZW50cmllcy5cbi8vIEVhY2ggSGl0IG9iamVjdCBoYXMgYSByZWZlcmVuY2UgdG8gaXRzIFlhbGxpc3QuTm9kZS4gIFRoaXNcbi8vIG5ldmVyIGNoYW5nZXMuXG4vL1xuLy8gY2FjaGUgaXMgYSBNYXAgKG9yIFBzZXVkb01hcCkgdGhhdCBtYXRjaGVzIHRoZSBrZXlzIHRvXG4vLyB0aGUgWWFsbGlzdC5Ob2RlIG9iamVjdC5cbmNsYXNzIExSVUNhY2hlIHtcbiAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdudW1iZXInKVxuICAgICAgb3B0aW9ucyA9IHsgbWF4OiBvcHRpb25zIH1cblxuICAgIGlmICghb3B0aW9ucylcbiAgICAgIG9wdGlvbnMgPSB7fVxuXG4gICAgaWYgKG9wdGlvbnMubWF4ICYmICh0eXBlb2Ygb3B0aW9ucy5tYXggIT09ICdudW1iZXInIHx8IG9wdGlvbnMubWF4IDwgMCkpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtYXggbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXInKVxuICAgIC8vIEtpbmQgb2Ygd2VpcmQgdG8gaGF2ZSBhIGRlZmF1bHQgbWF4IG9mIEluZmluaXR5LCBidXQgb2ggd2VsbC5cbiAgICBjb25zdCBtYXggPSB0aGlzW01BWF0gPSBvcHRpb25zLm1heCB8fCBJbmZpbml0eVxuXG4gICAgY29uc3QgbGMgPSBvcHRpb25zLmxlbmd0aCB8fCBuYWl2ZUxlbmd0aFxuICAgIHRoaXNbTEVOR1RIX0NBTENVTEFUT1JdID0gKHR5cGVvZiBsYyAhPT0gJ2Z1bmN0aW9uJykgPyBuYWl2ZUxlbmd0aCA6IGxjXG4gICAgdGhpc1tBTExPV19TVEFMRV0gPSBvcHRpb25zLnN0YWxlIHx8IGZhbHNlXG4gICAgaWYgKG9wdGlvbnMubWF4QWdlICYmIHR5cGVvZiBvcHRpb25zLm1heEFnZSAhPT0gJ251bWJlcicpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtYXhBZ2UgbXVzdCBiZSBhIG51bWJlcicpXG4gICAgdGhpc1tNQVhfQUdFXSA9IG9wdGlvbnMubWF4QWdlIHx8IDBcbiAgICB0aGlzW0RJU1BPU0VdID0gb3B0aW9ucy5kaXNwb3NlXG4gICAgdGhpc1tOT19ESVNQT1NFX09OX1NFVF0gPSBvcHRpb25zLm5vRGlzcG9zZU9uU2V0IHx8IGZhbHNlXG4gICAgdGhpc1tVUERBVEVfQUdFX09OX0dFVF0gPSBvcHRpb25zLnVwZGF0ZUFnZU9uR2V0IHx8IGZhbHNlXG4gICAgdGhpcy5yZXNldCgpXG4gIH1cblxuICAvLyByZXNpemUgdGhlIGNhY2hlIHdoZW4gdGhlIG1heCBjaGFuZ2VzLlxuICBzZXQgbWF4IChtTCkge1xuICAgIGlmICh0eXBlb2YgbUwgIT09ICdudW1iZXInIHx8IG1MIDwgMClcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ21heCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlcicpXG5cbiAgICB0aGlzW01BWF0gPSBtTCB8fCBJbmZpbml0eVxuICAgIHRyaW0odGhpcylcbiAgfVxuICBnZXQgbWF4ICgpIHtcbiAgICByZXR1cm4gdGhpc1tNQVhdXG4gIH1cblxuICBzZXQgYWxsb3dTdGFsZSAoYWxsb3dTdGFsZSkge1xuICAgIHRoaXNbQUxMT1dfU1RBTEVdID0gISFhbGxvd1N0YWxlXG4gIH1cbiAgZ2V0IGFsbG93U3RhbGUgKCkge1xuICAgIHJldHVybiB0aGlzW0FMTE9XX1NUQUxFXVxuICB9XG5cbiAgc2V0IG1heEFnZSAobUEpIHtcbiAgICBpZiAodHlwZW9mIG1BICE9PSAnbnVtYmVyJylcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ21heEFnZSBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlcicpXG5cbiAgICB0aGlzW01BWF9BR0VdID0gbUFcbiAgICB0cmltKHRoaXMpXG4gIH1cbiAgZ2V0IG1heEFnZSAoKSB7XG4gICAgcmV0dXJuIHRoaXNbTUFYX0FHRV1cbiAgfVxuXG4gIC8vIHJlc2l6ZSB0aGUgY2FjaGUgd2hlbiB0aGUgbGVuZ3RoQ2FsY3VsYXRvciBjaGFuZ2VzLlxuICBzZXQgbGVuZ3RoQ2FsY3VsYXRvciAobEMpIHtcbiAgICBpZiAodHlwZW9mIGxDICE9PSAnZnVuY3Rpb24nKVxuICAgICAgbEMgPSBuYWl2ZUxlbmd0aFxuXG4gICAgaWYgKGxDICE9PSB0aGlzW0xFTkdUSF9DQUxDVUxBVE9SXSkge1xuICAgICAgdGhpc1tMRU5HVEhfQ0FMQ1VMQVRPUl0gPSBsQ1xuICAgICAgdGhpc1tMRU5HVEhdID0gMFxuICAgICAgdGhpc1tMUlVfTElTVF0uZm9yRWFjaChoaXQgPT4ge1xuICAgICAgICBoaXQubGVuZ3RoID0gdGhpc1tMRU5HVEhfQ0FMQ1VMQVRPUl0oaGl0LnZhbHVlLCBoaXQua2V5KVxuICAgICAgICB0aGlzW0xFTkdUSF0gKz0gaGl0Lmxlbmd0aFxuICAgICAgfSlcbiAgICB9XG4gICAgdHJpbSh0aGlzKVxuICB9XG4gIGdldCBsZW5ndGhDYWxjdWxhdG9yICgpIHsgcmV0dXJuIHRoaXNbTEVOR1RIX0NBTENVTEFUT1JdIH1cblxuICBnZXQgbGVuZ3RoICgpIHsgcmV0dXJuIHRoaXNbTEVOR1RIXSB9XG4gIGdldCBpdGVtQ291bnQgKCkgeyByZXR1cm4gdGhpc1tMUlVfTElTVF0ubGVuZ3RoIH1cblxuICByZm9yRWFjaCAoZm4sIHRoaXNwKSB7XG4gICAgdGhpc3AgPSB0aGlzcCB8fCB0aGlzXG4gICAgZm9yIChsZXQgd2Fsa2VyID0gdGhpc1tMUlVfTElTVF0udGFpbDsgd2Fsa2VyICE9PSBudWxsOykge1xuICAgICAgY29uc3QgcHJldiA9IHdhbGtlci5wcmV2XG4gICAgICBmb3JFYWNoU3RlcCh0aGlzLCBmbiwgd2Fsa2VyLCB0aGlzcClcbiAgICAgIHdhbGtlciA9IHByZXZcbiAgICB9XG4gIH1cblxuICBmb3JFYWNoIChmbiwgdGhpc3ApIHtcbiAgICB0aGlzcCA9IHRoaXNwIHx8IHRoaXNcbiAgICBmb3IgKGxldCB3YWxrZXIgPSB0aGlzW0xSVV9MSVNUXS5oZWFkOyB3YWxrZXIgIT09IG51bGw7KSB7XG4gICAgICBjb25zdCBuZXh0ID0gd2Fsa2VyLm5leHRcbiAgICAgIGZvckVhY2hTdGVwKHRoaXMsIGZuLCB3YWxrZXIsIHRoaXNwKVxuICAgICAgd2Fsa2VyID0gbmV4dFxuICAgIH1cbiAgfVxuXG4gIGtleXMgKCkge1xuICAgIHJldHVybiB0aGlzW0xSVV9MSVNUXS50b0FycmF5KCkubWFwKGsgPT4gay5rZXkpXG4gIH1cblxuICB2YWx1ZXMgKCkge1xuICAgIHJldHVybiB0aGlzW0xSVV9MSVNUXS50b0FycmF5KCkubWFwKGsgPT4gay52YWx1ZSlcbiAgfVxuXG4gIHJlc2V0ICgpIHtcbiAgICBpZiAodGhpc1tESVNQT1NFXSAmJlxuICAgICAgICB0aGlzW0xSVV9MSVNUXSAmJlxuICAgICAgICB0aGlzW0xSVV9MSVNUXS5sZW5ndGgpIHtcbiAgICAgIHRoaXNbTFJVX0xJU1RdLmZvckVhY2goaGl0ID0+IHRoaXNbRElTUE9TRV0oaGl0LmtleSwgaGl0LnZhbHVlKSlcbiAgICB9XG5cbiAgICB0aGlzW0NBQ0hFXSA9IG5ldyBNYXAoKSAvLyBoYXNoIG9mIGl0ZW1zIGJ5IGtleVxuICAgIHRoaXNbTFJVX0xJU1RdID0gbmV3IFlhbGxpc3QoKSAvLyBsaXN0IG9mIGl0ZW1zIGluIG9yZGVyIG9mIHVzZSByZWNlbmN5XG4gICAgdGhpc1tMRU5HVEhdID0gMCAvLyBsZW5ndGggb2YgaXRlbXMgaW4gdGhlIGxpc3RcbiAgfVxuXG4gIGR1bXAgKCkge1xuICAgIHJldHVybiB0aGlzW0xSVV9MSVNUXS5tYXAoaGl0ID0+XG4gICAgICBpc1N0YWxlKHRoaXMsIGhpdCkgPyBmYWxzZSA6IHtcbiAgICAgICAgazogaGl0LmtleSxcbiAgICAgICAgdjogaGl0LnZhbHVlLFxuICAgICAgICBlOiBoaXQubm93ICsgKGhpdC5tYXhBZ2UgfHwgMClcbiAgICAgIH0pLnRvQXJyYXkoKS5maWx0ZXIoaCA9PiBoKVxuICB9XG5cbiAgZHVtcExydSAoKSB7XG4gICAgcmV0dXJuIHRoaXNbTFJVX0xJU1RdXG4gIH1cblxuICBzZXQgKGtleSwgdmFsdWUsIG1heEFnZSkge1xuICAgIG1heEFnZSA9IG1heEFnZSB8fCB0aGlzW01BWF9BR0VdXG5cbiAgICBpZiAobWF4QWdlICYmIHR5cGVvZiBtYXhBZ2UgIT09ICdudW1iZXInKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbWF4QWdlIG11c3QgYmUgYSBudW1iZXInKVxuXG4gICAgY29uc3Qgbm93ID0gbWF4QWdlID8gRGF0ZS5ub3coKSA6IDBcbiAgICBjb25zdCBsZW4gPSB0aGlzW0xFTkdUSF9DQUxDVUxBVE9SXSh2YWx1ZSwga2V5KVxuXG4gICAgaWYgKHRoaXNbQ0FDSEVdLmhhcyhrZXkpKSB7XG4gICAgICBpZiAobGVuID4gdGhpc1tNQVhdKSB7XG4gICAgICAgIGRlbCh0aGlzLCB0aGlzW0NBQ0hFXS5nZXQoa2V5KSlcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzW0NBQ0hFXS5nZXQoa2V5KVxuICAgICAgY29uc3QgaXRlbSA9IG5vZGUudmFsdWVcblxuICAgICAgLy8gZGlzcG9zZSBvZiB0aGUgb2xkIG9uZSBiZWZvcmUgb3ZlcndyaXRpbmdcbiAgICAgIC8vIHNwbGl0IG91dCBpbnRvIDIgaWZzIGZvciBiZXR0ZXIgY292ZXJhZ2UgdHJhY2tpbmdcbiAgICAgIGlmICh0aGlzW0RJU1BPU0VdKSB7XG4gICAgICAgIGlmICghdGhpc1tOT19ESVNQT1NFX09OX1NFVF0pXG4gICAgICAgICAgdGhpc1tESVNQT1NFXShrZXksIGl0ZW0udmFsdWUpXG4gICAgICB9XG5cbiAgICAgIGl0ZW0ubm93ID0gbm93XG4gICAgICBpdGVtLm1heEFnZSA9IG1heEFnZVxuICAgICAgaXRlbS52YWx1ZSA9IHZhbHVlXG4gICAgICB0aGlzW0xFTkdUSF0gKz0gbGVuIC0gaXRlbS5sZW5ndGhcbiAgICAgIGl0ZW0ubGVuZ3RoID0gbGVuXG4gICAgICB0aGlzLmdldChrZXkpXG4gICAgICB0cmltKHRoaXMpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IGhpdCA9IG5ldyBFbnRyeShrZXksIHZhbHVlLCBsZW4sIG5vdywgbWF4QWdlKVxuXG4gICAgLy8gb3ZlcnNpemVkIG9iamVjdHMgZmFsbCBvdXQgb2YgY2FjaGUgYXV0b21hdGljYWxseS5cbiAgICBpZiAoaGl0Lmxlbmd0aCA+IHRoaXNbTUFYXSkge1xuICAgICAgaWYgKHRoaXNbRElTUE9TRV0pXG4gICAgICAgIHRoaXNbRElTUE9TRV0oa2V5LCB2YWx1ZSlcblxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgdGhpc1tMRU5HVEhdICs9IGhpdC5sZW5ndGhcbiAgICB0aGlzW0xSVV9MSVNUXS51bnNoaWZ0KGhpdClcbiAgICB0aGlzW0NBQ0hFXS5zZXQoa2V5LCB0aGlzW0xSVV9MSVNUXS5oZWFkKVxuICAgIHRyaW0odGhpcylcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaGFzIChrZXkpIHtcbiAgICBpZiAoIXRoaXNbQ0FDSEVdLmhhcyhrZXkpKSByZXR1cm4gZmFsc2VcbiAgICBjb25zdCBoaXQgPSB0aGlzW0NBQ0hFXS5nZXQoa2V5KS52YWx1ZVxuICAgIHJldHVybiAhaXNTdGFsZSh0aGlzLCBoaXQpXG4gIH1cblxuICBnZXQgKGtleSkge1xuICAgIHJldHVybiBnZXQodGhpcywga2V5LCB0cnVlKVxuICB9XG5cbiAgcGVlayAoa2V5KSB7XG4gICAgcmV0dXJuIGdldCh0aGlzLCBrZXksIGZhbHNlKVxuICB9XG5cbiAgcG9wICgpIHtcbiAgICBjb25zdCBub2RlID0gdGhpc1tMUlVfTElTVF0udGFpbFxuICAgIGlmICghbm9kZSlcbiAgICAgIHJldHVybiBudWxsXG5cbiAgICBkZWwodGhpcywgbm9kZSlcbiAgICByZXR1cm4gbm9kZS52YWx1ZVxuICB9XG5cbiAgZGVsIChrZXkpIHtcbiAgICBkZWwodGhpcywgdGhpc1tDQUNIRV0uZ2V0KGtleSkpXG4gIH1cblxuICBsb2FkIChhcnIpIHtcbiAgICAvLyByZXNldCB0aGUgY2FjaGVcbiAgICB0aGlzLnJlc2V0KClcblxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KClcbiAgICAvLyBBIHByZXZpb3VzIHNlcmlhbGl6ZWQgY2FjaGUgaGFzIHRoZSBtb3N0IHJlY2VudCBpdGVtcyBmaXJzdFxuICAgIGZvciAobGV0IGwgPSBhcnIubGVuZ3RoIC0gMTsgbCA+PSAwOyBsLS0pIHtcbiAgICAgIGNvbnN0IGhpdCA9IGFycltsXVxuICAgICAgY29uc3QgZXhwaXJlc0F0ID0gaGl0LmUgfHwgMFxuICAgICAgaWYgKGV4cGlyZXNBdCA9PT0gMClcbiAgICAgICAgLy8gdGhlIGl0ZW0gd2FzIGNyZWF0ZWQgd2l0aG91dCBleHBpcmF0aW9uIGluIGEgbm9uIGFnZWQgY2FjaGVcbiAgICAgICAgdGhpcy5zZXQoaGl0LmssIGhpdC52KVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IG1heEFnZSA9IGV4cGlyZXNBdCAtIG5vd1xuICAgICAgICAvLyBkb250IGFkZCBhbHJlYWR5IGV4cGlyZWQgaXRlbXNcbiAgICAgICAgaWYgKG1heEFnZSA+IDApIHtcbiAgICAgICAgICB0aGlzLnNldChoaXQuaywgaGl0LnYsIG1heEFnZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBydW5lICgpIHtcbiAgICB0aGlzW0NBQ0hFXS5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiBnZXQodGhpcywga2V5LCBmYWxzZSkpXG4gIH1cbn1cblxuY29uc3QgZ2V0ID0gKHNlbGYsIGtleSwgZG9Vc2UpID0+IHtcbiAgY29uc3Qgbm9kZSA9IHNlbGZbQ0FDSEVdLmdldChrZXkpXG4gIGlmIChub2RlKSB7XG4gICAgY29uc3QgaGl0ID0gbm9kZS52YWx1ZVxuICAgIGlmIChpc1N0YWxlKHNlbGYsIGhpdCkpIHtcbiAgICAgIGRlbChzZWxmLCBub2RlKVxuICAgICAgaWYgKCFzZWxmW0FMTE9XX1NUQUxFXSlcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZG9Vc2UpIHtcbiAgICAgICAgaWYgKHNlbGZbVVBEQVRFX0FHRV9PTl9HRVRdKVxuICAgICAgICAgIG5vZGUudmFsdWUubm93ID0gRGF0ZS5ub3coKVxuICAgICAgICBzZWxmW0xSVV9MSVNUXS51bnNoaWZ0Tm9kZShub2RlKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaGl0LnZhbHVlXG4gIH1cbn1cblxuY29uc3QgaXNTdGFsZSA9IChzZWxmLCBoaXQpID0+IHtcbiAgaWYgKCFoaXQgfHwgKCFoaXQubWF4QWdlICYmICFzZWxmW01BWF9BR0VdKSlcbiAgICByZXR1cm4gZmFsc2VcblxuICBjb25zdCBkaWZmID0gRGF0ZS5ub3coKSAtIGhpdC5ub3dcbiAgcmV0dXJuIGhpdC5tYXhBZ2UgPyBkaWZmID4gaGl0Lm1heEFnZVxuICAgIDogc2VsZltNQVhfQUdFXSAmJiAoZGlmZiA+IHNlbGZbTUFYX0FHRV0pXG59XG5cbmNvbnN0IHRyaW0gPSBzZWxmID0+IHtcbiAgaWYgKHNlbGZbTEVOR1RIXSA+IHNlbGZbTUFYXSkge1xuICAgIGZvciAobGV0IHdhbGtlciA9IHNlbGZbTFJVX0xJU1RdLnRhaWw7XG4gICAgICBzZWxmW0xFTkdUSF0gPiBzZWxmW01BWF0gJiYgd2Fsa2VyICE9PSBudWxsOykge1xuICAgICAgLy8gV2Uga25vdyB0aGF0IHdlJ3JlIGFib3V0IHRvIGRlbGV0ZSB0aGlzIG9uZSwgYW5kIGFsc29cbiAgICAgIC8vIHdoYXQgdGhlIG5leHQgbGVhc3QgcmVjZW50bHkgdXNlZCBrZXkgd2lsbCBiZSwgc28ganVzdFxuICAgICAgLy8gZ28gYWhlYWQgYW5kIHNldCBpdCBub3cuXG4gICAgICBjb25zdCBwcmV2ID0gd2Fsa2VyLnByZXZcbiAgICAgIGRlbChzZWxmLCB3YWxrZXIpXG4gICAgICB3YWxrZXIgPSBwcmV2XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGRlbCA9IChzZWxmLCBub2RlKSA9PiB7XG4gIGlmIChub2RlKSB7XG4gICAgY29uc3QgaGl0ID0gbm9kZS52YWx1ZVxuICAgIGlmIChzZWxmW0RJU1BPU0VdKVxuICAgICAgc2VsZltESVNQT1NFXShoaXQua2V5LCBoaXQudmFsdWUpXG5cbiAgICBzZWxmW0xFTkdUSF0gLT0gaGl0Lmxlbmd0aFxuICAgIHNlbGZbQ0FDSEVdLmRlbGV0ZShoaXQua2V5KVxuICAgIHNlbGZbTFJVX0xJU1RdLnJlbW92ZU5vZGUobm9kZSlcbiAgfVxufVxuXG5jbGFzcyBFbnRyeSB7XG4gIGNvbnN0cnVjdG9yIChrZXksIHZhbHVlLCBsZW5ndGgsIG5vdywgbWF4QWdlKSB7XG4gICAgdGhpcy5rZXkgPSBrZXlcbiAgICB0aGlzLnZhbHVlID0gdmFsdWVcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aFxuICAgIHRoaXMubm93ID0gbm93XG4gICAgdGhpcy5tYXhBZ2UgPSBtYXhBZ2UgfHwgMFxuICB9XG59XG5cbmNvbnN0IGZvckVhY2hTdGVwID0gKHNlbGYsIGZuLCBub2RlLCB0aGlzcCkgPT4ge1xuICBsZXQgaGl0ID0gbm9kZS52YWx1ZVxuICBpZiAoaXNTdGFsZShzZWxmLCBoaXQpKSB7XG4gICAgZGVsKHNlbGYsIG5vZGUpXG4gICAgaWYgKCFzZWxmW0FMTE9XX1NUQUxFXSlcbiAgICAgIGhpdCA9IHVuZGVmaW5lZFxuICB9XG4gIGlmIChoaXQpXG4gICAgZm4uY2FsbCh0aGlzcCwgaGl0LnZhbHVlLCBoaXQua2V5LCBzZWxmKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExSVUNhY2hlXG4iLCJjb25zdCBBTlkgPSBTeW1ib2woJ1NlbVZlciBBTlknKVxuLy8gaG9pc3RlZCBjbGFzcyBmb3IgY3ljbGljIGRlcGVuZGVuY3lcbmNsYXNzIENvbXBhcmF0b3Ige1xuICBzdGF0aWMgZ2V0IEFOWSAoKSB7XG4gICAgcmV0dXJuIEFOWVxuICB9XG4gIGNvbnN0cnVjdG9yIChjb21wLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHBhcnNlT3B0aW9ucyhvcHRpb25zKVxuXG4gICAgaWYgKGNvbXAgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSB7XG4gICAgICBpZiAoY29tcC5sb29zZSA9PT0gISFvcHRpb25zLmxvb3NlKSB7XG4gICAgICAgIHJldHVybiBjb21wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wID0gY29tcC52YWx1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGRlYnVnKCdjb21wYXJhdG9yJywgY29tcCwgb3B0aW9ucylcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5sb29zZSA9ICEhb3B0aW9ucy5sb29zZVxuICAgIHRoaXMucGFyc2UoY29tcClcblxuICAgIGlmICh0aGlzLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgICB0aGlzLnZhbHVlID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMub3BlcmF0b3IgKyB0aGlzLnNlbXZlci52ZXJzaW9uXG4gICAgfVxuXG4gICAgZGVidWcoJ2NvbXAnLCB0aGlzKVxuICB9XG5cbiAgcGFyc2UgKGNvbXApIHtcbiAgICBjb25zdCByID0gdGhpcy5vcHRpb25zLmxvb3NlID8gcmVbdC5DT01QQVJBVE9STE9PU0VdIDogcmVbdC5DT01QQVJBVE9SXVxuICAgIGNvbnN0IG0gPSBjb21wLm1hdGNoKHIpXG5cbiAgICBpZiAoIW0pIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgY29tcGFyYXRvcjogJHtjb21wfWApXG4gICAgfVxuXG4gICAgdGhpcy5vcGVyYXRvciA9IG1bMV0gIT09IHVuZGVmaW5lZCA/IG1bMV0gOiAnJ1xuICAgIGlmICh0aGlzLm9wZXJhdG9yID09PSAnPScpIHtcbiAgICAgIHRoaXMub3BlcmF0b3IgPSAnJ1xuICAgIH1cblxuICAgIC8vIGlmIGl0IGxpdGVyYWxseSBpcyBqdXN0ICc+JyBvciAnJyB0aGVuIGFsbG93IGFueXRoaW5nLlxuICAgIGlmICghbVsyXSkge1xuICAgICAgdGhpcy5zZW12ZXIgPSBBTllcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZW12ZXIgPSBuZXcgU2VtVmVyKG1bMl0sIHRoaXMub3B0aW9ucy5sb29zZSlcbiAgICB9XG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVcbiAgfVxuXG4gIHRlc3QgKHZlcnNpb24pIHtcbiAgICBkZWJ1ZygnQ29tcGFyYXRvci50ZXN0JywgdmVyc2lvbiwgdGhpcy5vcHRpb25zLmxvb3NlKVxuXG4gICAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkgfHwgdmVyc2lvbiA9PT0gQU5ZKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMub3B0aW9ucylcbiAgICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbXAodmVyc2lvbiwgdGhpcy5vcGVyYXRvciwgdGhpcy5zZW12ZXIsIHRoaXMub3B0aW9ucylcbiAgfVxuXG4gIGludGVyc2VjdHMgKGNvbXAsIG9wdGlvbnMpIHtcbiAgICBpZiAoIShjb21wIGluc3RhbmNlb2YgQ29tcGFyYXRvcikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2EgQ29tcGFyYXRvciBpcyByZXF1aXJlZCcpXG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zIHx8IHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgICAgaW5jbHVkZVByZXJlbGVhc2U6IGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3BlcmF0b3IgPT09ICcnKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUmFuZ2UoY29tcC52YWx1ZSwgb3B0aW9ucykudGVzdCh0aGlzLnZhbHVlKVxuICAgIH0gZWxzZSBpZiAoY29tcC5vcGVyYXRvciA9PT0gJycpIHtcbiAgICAgIGlmIChjb21wLnZhbHVlID09PSAnJykge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBSYW5nZSh0aGlzLnZhbHVlLCBvcHRpb25zKS50ZXN0KGNvbXAuc2VtdmVyKVxuICAgIH1cblxuICAgIGNvbnN0IHNhbWVEaXJlY3Rpb25JbmNyZWFzaW5nID1cbiAgICAgICh0aGlzLm9wZXJhdG9yID09PSAnPj0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc+JykgJiZcbiAgICAgIChjb21wLm9wZXJhdG9yID09PSAnPj0nIHx8IGNvbXAub3BlcmF0b3IgPT09ICc+JylcbiAgICBjb25zdCBzYW1lRGlyZWN0aW9uRGVjcmVhc2luZyA9XG4gICAgICAodGhpcy5vcGVyYXRvciA9PT0gJzw9JyB8fCB0aGlzLm9wZXJhdG9yID09PSAnPCcpICYmXG4gICAgICAoY29tcC5vcGVyYXRvciA9PT0gJzw9JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPCcpXG4gICAgY29uc3Qgc2FtZVNlbVZlciA9IHRoaXMuc2VtdmVyLnZlcnNpb24gPT09IGNvbXAuc2VtdmVyLnZlcnNpb25cbiAgICBjb25zdCBkaWZmZXJlbnREaXJlY3Rpb25zSW5jbHVzaXZlID1cbiAgICAgICh0aGlzLm9wZXJhdG9yID09PSAnPj0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc8PScpICYmXG4gICAgICAoY29tcC5vcGVyYXRvciA9PT0gJz49JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPD0nKVxuICAgIGNvbnN0IG9wcG9zaXRlRGlyZWN0aW9uc0xlc3NUaGFuID1cbiAgICAgIGNtcCh0aGlzLnNlbXZlciwgJzwnLCBjb21wLnNlbXZlciwgb3B0aW9ucykgJiZcbiAgICAgICh0aGlzLm9wZXJhdG9yID09PSAnPj0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc+JykgJiZcbiAgICAgICAgKGNvbXAub3BlcmF0b3IgPT09ICc8PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJzwnKVxuICAgIGNvbnN0IG9wcG9zaXRlRGlyZWN0aW9uc0dyZWF0ZXJUaGFuID1cbiAgICAgIGNtcCh0aGlzLnNlbXZlciwgJz4nLCBjb21wLnNlbXZlciwgb3B0aW9ucykgJiZcbiAgICAgICh0aGlzLm9wZXJhdG9yID09PSAnPD0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc8JykgJiZcbiAgICAgICAgKGNvbXAub3BlcmF0b3IgPT09ICc+PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJz4nKVxuXG4gICAgcmV0dXJuIChcbiAgICAgIHNhbWVEaXJlY3Rpb25JbmNyZWFzaW5nIHx8XG4gICAgICBzYW1lRGlyZWN0aW9uRGVjcmVhc2luZyB8fFxuICAgICAgKHNhbWVTZW1WZXIgJiYgZGlmZmVyZW50RGlyZWN0aW9uc0luY2x1c2l2ZSkgfHxcbiAgICAgIG9wcG9zaXRlRGlyZWN0aW9uc0xlc3NUaGFuIHx8XG4gICAgICBvcHBvc2l0ZURpcmVjdGlvbnNHcmVhdGVyVGhhblxuICAgIClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBhcmF0b3JcblxuY29uc3QgcGFyc2VPcHRpb25zID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcGFyc2Utb3B0aW9ucycpXG5jb25zdCB7cmUsIHR9ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcmUnKVxuY29uc3QgY21wID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2NtcCcpXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2RlYnVnJylcbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4vc2VtdmVyJylcbmNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi9yYW5nZScpXG4iLCIvLyBob2lzdGVkIGNsYXNzIGZvciBjeWNsaWMgZGVwZW5kZW5jeVxuY2xhc3MgUmFuZ2Uge1xuICBjb25zdHJ1Y3RvciAocmFuZ2UsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gcGFyc2VPcHRpb25zKG9wdGlvbnMpXG5cbiAgICBpZiAocmFuZ2UgaW5zdGFuY2VvZiBSYW5nZSkge1xuICAgICAgaWYgKFxuICAgICAgICByYW5nZS5sb29zZSA9PT0gISFvcHRpb25zLmxvb3NlICYmXG4gICAgICAgIHJhbmdlLmluY2x1ZGVQcmVyZWxlYXNlID09PSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2VcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gcmFuZ2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UucmF3LCBvcHRpb25zKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyYW5nZSBpbnN0YW5jZW9mIENvbXBhcmF0b3IpIHtcbiAgICAgIC8vIGp1c3QgcHV0IGl0IGluIHRoZSBzZXQgYW5kIHJldHVyblxuICAgICAgdGhpcy5yYXcgPSByYW5nZS52YWx1ZVxuICAgICAgdGhpcy5zZXQgPSBbW3JhbmdlXV1cbiAgICAgIHRoaXMuZm9ybWF0KClcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMubG9vc2UgPSAhIW9wdGlvbnMubG9vc2VcbiAgICB0aGlzLmluY2x1ZGVQcmVyZWxlYXNlID0gISFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlXG5cbiAgICAvLyBGaXJzdCwgc3BsaXQgYmFzZWQgb24gYm9vbGVhbiBvciB8fFxuICAgIHRoaXMucmF3ID0gcmFuZ2VcbiAgICB0aGlzLnNldCA9IHJhbmdlXG4gICAgICAuc3BsaXQoL1xccypcXHxcXHxcXHMqLylcbiAgICAgIC8vIG1hcCB0aGUgcmFuZ2UgdG8gYSAyZCBhcnJheSBvZiBjb21wYXJhdG9yc1xuICAgICAgLm1hcChyYW5nZSA9PiB0aGlzLnBhcnNlUmFuZ2UocmFuZ2UudHJpbSgpKSlcbiAgICAgIC8vIHRocm93IG91dCBhbnkgY29tcGFyYXRvciBsaXN0cyB0aGF0IGFyZSBlbXB0eVxuICAgICAgLy8gdGhpcyBnZW5lcmFsbHkgbWVhbnMgdGhhdCBpdCB3YXMgbm90IGEgdmFsaWQgcmFuZ2UsIHdoaWNoIGlzIGFsbG93ZWRcbiAgICAgIC8vIGluIGxvb3NlIG1vZGUsIGJ1dCB3aWxsIHN0aWxsIHRocm93IGlmIHRoZSBXSE9MRSByYW5nZSBpcyBpbnZhbGlkLlxuICAgICAgLmZpbHRlcihjID0+IGMubGVuZ3RoKVxuXG4gICAgaWYgKCF0aGlzLnNldC5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgU2VtVmVyIFJhbmdlOiAke3JhbmdlfWApXG4gICAgfVxuXG4gICAgLy8gaWYgd2UgaGF2ZSBhbnkgdGhhdCBhcmUgbm90IHRoZSBudWxsIHNldCwgdGhyb3cgb3V0IG51bGwgc2V0cy5cbiAgICBpZiAodGhpcy5zZXQubGVuZ3RoID4gMSkge1xuICAgICAgLy8ga2VlcCB0aGUgZmlyc3Qgb25lLCBpbiBjYXNlIHRoZXkncmUgYWxsIG51bGwgc2V0c1xuICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLnNldFswXVxuICAgICAgdGhpcy5zZXQgPSB0aGlzLnNldC5maWx0ZXIoYyA9PiAhaXNOdWxsU2V0KGNbMF0pKVxuICAgICAgaWYgKHRoaXMuc2V0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5zZXQgPSBbZmlyc3RdXG4gICAgICBlbHNlIGlmICh0aGlzLnNldC5sZW5ndGggPiAxKSB7XG4gICAgICAgIC8vIGlmIHdlIGhhdmUgYW55IHRoYXQgYXJlICosIHRoZW4gdGhlIHJhbmdlIGlzIGp1c3QgKlxuICAgICAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5zZXQpIHtcbiAgICAgICAgICBpZiAoYy5sZW5ndGggPT09IDEgJiYgaXNBbnkoY1swXSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0ID0gW2NdXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZm9ybWF0KClcbiAgfVxuXG4gIGZvcm1hdCAoKSB7XG4gICAgdGhpcy5yYW5nZSA9IHRoaXMuc2V0XG4gICAgICAubWFwKChjb21wcykgPT4ge1xuICAgICAgICByZXR1cm4gY29tcHMuam9pbignICcpLnRyaW0oKVxuICAgICAgfSlcbiAgICAgIC5qb2luKCd8fCcpXG4gICAgICAudHJpbSgpXG4gICAgcmV0dXJuIHRoaXMucmFuZ2VcbiAgfVxuXG4gIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5yYW5nZVxuICB9XG5cbiAgcGFyc2VSYW5nZSAocmFuZ2UpIHtcbiAgICByYW5nZSA9IHJhbmdlLnRyaW0oKVxuXG4gICAgLy8gbWVtb2l6ZSByYW5nZSBwYXJzaW5nIGZvciBwZXJmb3JtYW5jZS5cbiAgICAvLyB0aGlzIGlzIGEgdmVyeSBob3QgcGF0aCwgYW5kIGZ1bGx5IGRldGVybWluaXN0aWMuXG4gICAgY29uc3QgbWVtb09wdHMgPSBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMpLmpvaW4oJywnKVxuICAgIGNvbnN0IG1lbW9LZXkgPSBgcGFyc2VSYW5nZToke21lbW9PcHRzfToke3JhbmdlfWBcbiAgICBjb25zdCBjYWNoZWQgPSBjYWNoZS5nZXQobWVtb0tleSlcbiAgICBpZiAoY2FjaGVkKVxuICAgICAgcmV0dXJuIGNhY2hlZFxuXG4gICAgY29uc3QgbG9vc2UgPSB0aGlzLm9wdGlvbnMubG9vc2VcbiAgICAvLyBgMS4yLjMgLSAxLjIuNGAgPT4gYD49MS4yLjMgPD0xLjIuNGBcbiAgICBjb25zdCBociA9IGxvb3NlID8gcmVbdC5IWVBIRU5SQU5HRUxPT1NFXSA6IHJlW3QuSFlQSEVOUkFOR0VdXG4gICAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKGhyLCBoeXBoZW5SZXBsYWNlKHRoaXMub3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSkpXG4gICAgZGVidWcoJ2h5cGhlbiByZXBsYWNlJywgcmFuZ2UpXG4gICAgLy8gYD4gMS4yLjMgPCAxLjIuNWAgPT4gYD4xLjIuMyA8MS4yLjVgXG4gICAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW3QuQ09NUEFSQVRPUlRSSU1dLCBjb21wYXJhdG9yVHJpbVJlcGxhY2UpXG4gICAgZGVidWcoJ2NvbXBhcmF0b3IgdHJpbScsIHJhbmdlLCByZVt0LkNPTVBBUkFUT1JUUklNXSlcblxuICAgIC8vIGB+IDEuMi4zYCA9PiBgfjEuMi4zYFxuICAgIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVt0LlRJTERFVFJJTV0sIHRpbGRlVHJpbVJlcGxhY2UpXG5cbiAgICAvLyBgXiAxLjIuM2AgPT4gYF4xLjIuM2BcbiAgICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbdC5DQVJFVFRSSU1dLCBjYXJldFRyaW1SZXBsYWNlKVxuXG4gICAgLy8gbm9ybWFsaXplIHNwYWNlc1xuICAgIHJhbmdlID0gcmFuZ2Uuc3BsaXQoL1xccysvKS5qb2luKCcgJylcblxuICAgIC8vIEF0IHRoaXMgcG9pbnQsIHRoZSByYW5nZSBpcyBjb21wbGV0ZWx5IHRyaW1tZWQgYW5kXG4gICAgLy8gcmVhZHkgdG8gYmUgc3BsaXQgaW50byBjb21wYXJhdG9ycy5cblxuICAgIGNvbnN0IGNvbXBSZSA9IGxvb3NlID8gcmVbdC5DT01QQVJBVE9STE9PU0VdIDogcmVbdC5DT01QQVJBVE9SXVxuICAgIGNvbnN0IHJhbmdlTGlzdCA9IHJhbmdlXG4gICAgICAuc3BsaXQoJyAnKVxuICAgICAgLm1hcChjb21wID0+IHBhcnNlQ29tcGFyYXRvcihjb21wLCB0aGlzLm9wdGlvbnMpKVxuICAgICAgLmpvaW4oJyAnKVxuICAgICAgLnNwbGl0KC9cXHMrLylcbiAgICAgIC8vID49MC4wLjAgaXMgZXF1aXZhbGVudCB0byAqXG4gICAgICAubWFwKGNvbXAgPT4gcmVwbGFjZUdURTAoY29tcCwgdGhpcy5vcHRpb25zKSlcbiAgICAgIC8vIGluIGxvb3NlIG1vZGUsIHRocm93IG91dCBhbnkgdGhhdCBhcmUgbm90IHZhbGlkIGNvbXBhcmF0b3JzXG4gICAgICAuZmlsdGVyKHRoaXMub3B0aW9ucy5sb29zZSA/IGNvbXAgPT4gISFjb21wLm1hdGNoKGNvbXBSZSkgOiAoKSA9PiB0cnVlKVxuICAgICAgLm1hcChjb21wID0+IG5ldyBDb21wYXJhdG9yKGNvbXAsIHRoaXMub3B0aW9ucykpXG5cbiAgICAvLyBpZiBhbnkgY29tcGFyYXRvcnMgYXJlIHRoZSBudWxsIHNldCwgdGhlbiByZXBsYWNlIHdpdGggSlVTVCBudWxsIHNldFxuICAgIC8vIGlmIG1vcmUgdGhhbiBvbmUgY29tcGFyYXRvciwgcmVtb3ZlIGFueSAqIGNvbXBhcmF0b3JzXG4gICAgLy8gYWxzbywgZG9uJ3QgaW5jbHVkZSB0aGUgc2FtZSBjb21wYXJhdG9yIG1vcmUgdGhhbiBvbmNlXG4gICAgY29uc3QgbCA9IHJhbmdlTGlzdC5sZW5ndGhcbiAgICBjb25zdCByYW5nZU1hcCA9IG5ldyBNYXAoKVxuICAgIGZvciAoY29uc3QgY29tcCBvZiByYW5nZUxpc3QpIHtcbiAgICAgIGlmIChpc051bGxTZXQoY29tcCkpXG4gICAgICAgIHJldHVybiBbY29tcF1cbiAgICAgIHJhbmdlTWFwLnNldChjb21wLnZhbHVlLCBjb21wKVxuICAgIH1cbiAgICBpZiAocmFuZ2VNYXAuc2l6ZSA+IDEgJiYgcmFuZ2VNYXAuaGFzKCcnKSlcbiAgICAgIHJhbmdlTWFwLmRlbGV0ZSgnJylcblxuICAgIGNvbnN0IHJlc3VsdCA9IFsuLi5yYW5nZU1hcC52YWx1ZXMoKV1cbiAgICBjYWNoZS5zZXQobWVtb0tleSwgcmVzdWx0KVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGludGVyc2VjdHMgKHJhbmdlLCBvcHRpb25zKSB7XG4gICAgaWYgKCEocmFuZ2UgaW5zdGFuY2VvZiBSYW5nZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2EgUmFuZ2UgaXMgcmVxdWlyZWQnKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNldC5zb21lKCh0aGlzQ29tcGFyYXRvcnMpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGlzU2F0aXNmaWFibGUodGhpc0NvbXBhcmF0b3JzLCBvcHRpb25zKSAmJlxuICAgICAgICByYW5nZS5zZXQuc29tZSgocmFuZ2VDb21wYXJhdG9ycykgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBpc1NhdGlzZmlhYmxlKHJhbmdlQ29tcGFyYXRvcnMsIG9wdGlvbnMpICYmXG4gICAgICAgICAgICB0aGlzQ29tcGFyYXRvcnMuZXZlcnkoKHRoaXNDb21wYXJhdG9yKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiByYW5nZUNvbXBhcmF0b3JzLmV2ZXJ5KChyYW5nZUNvbXBhcmF0b3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc0NvbXBhcmF0b3IuaW50ZXJzZWN0cyhyYW5nZUNvbXBhcmF0b3IsIG9wdGlvbnMpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9KVxuICB9XG5cbiAgLy8gaWYgQU5ZIG9mIHRoZSBzZXRzIG1hdGNoIEFMTCBvZiBpdHMgY29tcGFyYXRvcnMsIHRoZW4gcGFzc1xuICB0ZXN0ICh2ZXJzaW9uKSB7XG4gICAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCB0aGlzLm9wdGlvbnMpXG4gICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGVzdFNldCh0aGlzLnNldFtpXSwgdmVyc2lvbiwgdGhpcy5vcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBSYW5nZVxuXG5jb25zdCBMUlUgPSByZXF1aXJlKCdscnUtY2FjaGUnKVxuY29uc3QgY2FjaGUgPSBuZXcgTFJVKHsgbWF4OiAxMDAwIH0pXG5cbmNvbnN0IHBhcnNlT3B0aW9ucyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3BhcnNlLW9wdGlvbnMnKVxuY29uc3QgQ29tcGFyYXRvciA9IHJlcXVpcmUoJy4vY29tcGFyYXRvcicpXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2RlYnVnJylcbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4vc2VtdmVyJylcbmNvbnN0IHtcbiAgcmUsXG4gIHQsXG4gIGNvbXBhcmF0b3JUcmltUmVwbGFjZSxcbiAgdGlsZGVUcmltUmVwbGFjZSxcbiAgY2FyZXRUcmltUmVwbGFjZVxufSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3JlJylcblxuY29uc3QgaXNOdWxsU2V0ID0gYyA9PiBjLnZhbHVlID09PSAnPDAuMC4wLTAnXG5jb25zdCBpc0FueSA9IGMgPT4gYy52YWx1ZSA9PT0gJydcblxuLy8gdGFrZSBhIHNldCBvZiBjb21wYXJhdG9ycyBhbmQgZGV0ZXJtaW5lIHdoZXRoZXIgdGhlcmVcbi8vIGV4aXN0cyBhIHZlcnNpb24gd2hpY2ggY2FuIHNhdGlzZnkgaXRcbmNvbnN0IGlzU2F0aXNmaWFibGUgPSAoY29tcGFyYXRvcnMsIG9wdGlvbnMpID0+IHtcbiAgbGV0IHJlc3VsdCA9IHRydWVcbiAgY29uc3QgcmVtYWluaW5nQ29tcGFyYXRvcnMgPSBjb21wYXJhdG9ycy5zbGljZSgpXG4gIGxldCB0ZXN0Q29tcGFyYXRvciA9IHJlbWFpbmluZ0NvbXBhcmF0b3JzLnBvcCgpXG5cbiAgd2hpbGUgKHJlc3VsdCAmJiByZW1haW5pbmdDb21wYXJhdG9ycy5sZW5ndGgpIHtcbiAgICByZXN1bHQgPSByZW1haW5pbmdDb21wYXJhdG9ycy5ldmVyeSgob3RoZXJDb21wYXJhdG9yKSA9PiB7XG4gICAgICByZXR1cm4gdGVzdENvbXBhcmF0b3IuaW50ZXJzZWN0cyhvdGhlckNvbXBhcmF0b3IsIG9wdGlvbnMpXG4gICAgfSlcblxuICAgIHRlc3RDb21wYXJhdG9yID0gcmVtYWluaW5nQ29tcGFyYXRvcnMucG9wKClcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLy8gY29tcHJpc2VkIG9mIHhyYW5nZXMsIHRpbGRlcywgc3RhcnMsIGFuZCBndGx0J3MgYXQgdGhpcyBwb2ludC5cbi8vIGFscmVhZHkgcmVwbGFjZWQgdGhlIGh5cGhlbiByYW5nZXNcbi8vIHR1cm4gaW50byBhIHNldCBvZiBKVVNUIGNvbXBhcmF0b3JzLlxuY29uc3QgcGFyc2VDb21wYXJhdG9yID0gKGNvbXAsIG9wdGlvbnMpID0+IHtcbiAgZGVidWcoJ2NvbXAnLCBjb21wLCBvcHRpb25zKVxuICBjb21wID0gcmVwbGFjZUNhcmV0cyhjb21wLCBvcHRpb25zKVxuICBkZWJ1ZygnY2FyZXQnLCBjb21wKVxuICBjb21wID0gcmVwbGFjZVRpbGRlcyhjb21wLCBvcHRpb25zKVxuICBkZWJ1ZygndGlsZGVzJywgY29tcClcbiAgY29tcCA9IHJlcGxhY2VYUmFuZ2VzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCd4cmFuZ2UnLCBjb21wKVxuICBjb21wID0gcmVwbGFjZVN0YXJzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCdzdGFycycsIGNvbXApXG4gIHJldHVybiBjb21wXG59XG5cbmNvbnN0IGlzWCA9IGlkID0+ICFpZCB8fCBpZC50b0xvd2VyQ2FzZSgpID09PSAneCcgfHwgaWQgPT09ICcqJ1xuXG4vLyB+LCB+PiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIH4yLCB+Mi54LCB+Mi54LngsIH4+Miwgfj4yLnggfj4yLngueCAtLT4gPj0yLjAuMCA8My4wLjAtMFxuLy8gfjIuMCwgfjIuMC54LCB+PjIuMCwgfj4yLjAueCAtLT4gPj0yLjAuMCA8Mi4xLjAtMFxuLy8gfjEuMiwgfjEuMi54LCB+PjEuMiwgfj4xLjIueCAtLT4gPj0xLjIuMCA8MS4zLjAtMFxuLy8gfjEuMi4zLCB+PjEuMi4zIC0tPiA+PTEuMi4zIDwxLjMuMC0wXG4vLyB+MS4yLjAsIH4+MS4yLjAgLS0+ID49MS4yLjAgPDEuMy4wLTBcbmNvbnN0IHJlcGxhY2VUaWxkZXMgPSAoY29tcCwgb3B0aW9ucykgPT5cbiAgY29tcC50cmltKCkuc3BsaXQoL1xccysvKS5tYXAoKGNvbXApID0+IHtcbiAgICByZXR1cm4gcmVwbGFjZVRpbGRlKGNvbXAsIG9wdGlvbnMpXG4gIH0pLmpvaW4oJyAnKVxuXG5jb25zdCByZXBsYWNlVGlsZGUgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBjb25zdCByID0gb3B0aW9ucy5sb29zZSA/IHJlW3QuVElMREVMT09TRV0gOiByZVt0LlRJTERFXVxuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIChfLCBNLCBtLCBwLCBwcikgPT4ge1xuICAgIGRlYnVnKCd0aWxkZScsIGNvbXAsIF8sIE0sIG0sIHAsIHByKVxuICAgIGxldCByZXRcblxuICAgIGlmIChpc1goTSkpIHtcbiAgICAgIHJldCA9ICcnXG4gICAgfSBlbHNlIGlmIChpc1gobSkpIHtcbiAgICAgIHJldCA9IGA+PSR7TX0uMC4wIDwkeytNICsgMX0uMC4wLTBgXG4gICAgfSBlbHNlIGlmIChpc1gocCkpIHtcbiAgICAgIC8vIH4xLjIgPT0gPj0xLjIuMCA8MS4zLjAtMFxuICAgICAgcmV0ID0gYD49JHtNfS4ke219LjAgPCR7TX0uJHsrbSArIDF9LjAtMGBcbiAgICB9IGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZVRpbGRlIHByJywgcHIpXG4gICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwfS0ke3ByXG4gICAgICB9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIH4xLjIuMyA9PSA+PTEuMi4zIDwxLjMuMC0wXG4gICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwXG4gICAgICB9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgfVxuXG4gICAgZGVidWcoJ3RpbGRlIHJldHVybicsIHJldClcbiAgICByZXR1cm4gcmV0XG4gIH0pXG59XG5cbi8vIF4gLS0+ICogKGFueSwga2luZGEgc2lsbHkpXG4vLyBeMiwgXjIueCwgXjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMC0wXG4vLyBeMi4wLCBeMi4wLnggLS0+ID49Mi4wLjAgPDMuMC4wLTBcbi8vIF4xLjIsIF4xLjIueCAtLT4gPj0xLjIuMCA8Mi4wLjAtMFxuLy8gXjEuMi4zIC0tPiA+PTEuMi4zIDwyLjAuMC0wXG4vLyBeMS4yLjAgLS0+ID49MS4yLjAgPDIuMC4wLTBcbmNvbnN0IHJlcGxhY2VDYXJldHMgPSAoY29tcCwgb3B0aW9ucykgPT5cbiAgY29tcC50cmltKCkuc3BsaXQoL1xccysvKS5tYXAoKGNvbXApID0+IHtcbiAgICByZXR1cm4gcmVwbGFjZUNhcmV0KGNvbXAsIG9wdGlvbnMpXG4gIH0pLmpvaW4oJyAnKVxuXG5jb25zdCByZXBsYWNlQ2FyZXQgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBkZWJ1ZygnY2FyZXQnLCBjb21wLCBvcHRpb25zKVxuICBjb25zdCByID0gb3B0aW9ucy5sb29zZSA/IHJlW3QuQ0FSRVRMT09TRV0gOiByZVt0LkNBUkVUXVxuICBjb25zdCB6ID0gb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSA/ICctMCcgOiAnJ1xuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIChfLCBNLCBtLCBwLCBwcikgPT4ge1xuICAgIGRlYnVnKCdjYXJldCcsIGNvbXAsIF8sIE0sIG0sIHAsIHByKVxuICAgIGxldCByZXRcblxuICAgIGlmIChpc1goTSkpIHtcbiAgICAgIHJldCA9ICcnXG4gICAgfSBlbHNlIGlmIChpc1gobSkpIHtcbiAgICAgIHJldCA9IGA+PSR7TX0uMC4wJHt6fSA8JHsrTSArIDF9LjAuMC0wYFxuICAgIH0gZWxzZSBpZiAoaXNYKHApKSB7XG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4wJHt6fSA8JHtNfS4keyttICsgMX0uMC0wYFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LjAke3p9IDwkeytNICsgMX0uMC4wLTBgXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VDYXJldCBwcicsIHByKVxuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKSB7XG4gICAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LiR7cH0tJHtwclxuICAgICAgICAgIH0gPCR7TX0uJHttfS4keytwICsgMX0tMGBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwfS0ke3ByXG4gICAgICAgICAgfSA8JHtNfS4keyttICsgMX0uMC0wYFxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwfS0ke3ByXG4gICAgICAgIH0gPCR7K00gKyAxfS4wLjAtMGBcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ25vIHByJylcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgaWYgKG0gPT09ICcwJykge1xuICAgICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3BcbiAgICAgICAgICB9JHt6fSA8JHtNfS4ke219LiR7K3AgKyAxfS0wYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3BcbiAgICAgICAgICB9JHt6fSA8JHtNfS4keyttICsgMX0uMC0wYFxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwXG4gICAgICAgIH0gPCR7K00gKyAxfS4wLjAtMGBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWJ1ZygnY2FyZXQgcmV0dXJuJywgcmV0KVxuICAgIHJldHVybiByZXRcbiAgfSlcbn1cblxuY29uc3QgcmVwbGFjZVhSYW5nZXMgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBkZWJ1ZygncmVwbGFjZVhSYW5nZXMnLCBjb21wLCBvcHRpb25zKVxuICByZXR1cm4gY29tcC5zcGxpdCgvXFxzKy8pLm1hcCgoY29tcCkgPT4ge1xuICAgIHJldHVybiByZXBsYWNlWFJhbmdlKGNvbXAsIG9wdGlvbnMpXG4gIH0pLmpvaW4oJyAnKVxufVxuXG5jb25zdCByZXBsYWNlWFJhbmdlID0gKGNvbXAsIG9wdGlvbnMpID0+IHtcbiAgY29tcCA9IGNvbXAudHJpbSgpXG4gIGNvbnN0IHIgPSBvcHRpb25zLmxvb3NlID8gcmVbdC5YUkFOR0VMT09TRV0gOiByZVt0LlhSQU5HRV1cbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCAocmV0LCBndGx0LCBNLCBtLCBwLCBwcikgPT4ge1xuICAgIGRlYnVnKCd4UmFuZ2UnLCBjb21wLCByZXQsIGd0bHQsIE0sIG0sIHAsIHByKVxuICAgIGNvbnN0IHhNID0gaXNYKE0pXG4gICAgY29uc3QgeG0gPSB4TSB8fCBpc1gobSlcbiAgICBjb25zdCB4cCA9IHhtIHx8IGlzWChwKVxuICAgIGNvbnN0IGFueVggPSB4cFxuXG4gICAgaWYgKGd0bHQgPT09ICc9JyAmJiBhbnlYKSB7XG4gICAgICBndGx0ID0gJydcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSdyZSBpbmNsdWRpbmcgcHJlcmVsZWFzZXMgaW4gdGhlIG1hdGNoLCB0aGVuIHdlIG5lZWRcbiAgICAvLyB0byBmaXggdGhpcyB0byAtMCwgdGhlIGxvd2VzdCBwb3NzaWJsZSBwcmVyZWxlYXNlIHZhbHVlXG4gICAgcHIgPSBvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlID8gJy0wJyA6ICcnXG5cbiAgICBpZiAoeE0pIHtcbiAgICAgIGlmIChndGx0ID09PSAnPicgfHwgZ3RsdCA9PT0gJzwnKSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgYWxsb3dlZFxuICAgICAgICByZXQgPSAnPDAuMC4wLTAnXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBub3RoaW5nIGlzIGZvcmJpZGRlblxuICAgICAgICByZXQgPSAnKidcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGd0bHQgJiYgYW55WCkge1xuICAgICAgLy8gd2Uga25vdyBwYXRjaCBpcyBhbiB4LCBiZWNhdXNlIHdlIGhhdmUgYW55IHggYXQgYWxsLlxuICAgICAgLy8gcmVwbGFjZSBYIHdpdGggMFxuICAgICAgaWYgKHhtKSB7XG4gICAgICAgIG0gPSAwXG4gICAgICB9XG4gICAgICBwID0gMFxuXG4gICAgICBpZiAoZ3RsdCA9PT0gJz4nKSB7XG4gICAgICAgIC8vID4xID0+ID49Mi4wLjBcbiAgICAgICAgLy8gPjEuMiA9PiA+PTEuMy4wXG4gICAgICAgIGd0bHQgPSAnPj0nXG4gICAgICAgIGlmICh4bSkge1xuICAgICAgICAgIE0gPSArTSArIDFcbiAgICAgICAgICBtID0gMFxuICAgICAgICAgIHAgPSAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbSA9ICttICsgMVxuICAgICAgICAgIHAgPSAwXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZ3RsdCA9PT0gJzw9Jykge1xuICAgICAgICAvLyA8PTAuNy54IGlzIGFjdHVhbGx5IDwwLjguMCwgc2luY2UgYW55IDAuNy54IHNob3VsZFxuICAgICAgICAvLyBwYXNzLiAgU2ltaWxhcmx5LCA8PTcueCBpcyBhY3R1YWxseSA8OC4wLjAsIGV0Yy5cbiAgICAgICAgZ3RsdCA9ICc8J1xuICAgICAgICBpZiAoeG0pIHtcbiAgICAgICAgICBNID0gK00gKyAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbSA9ICttICsgMVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChndGx0ID09PSAnPCcpXG4gICAgICAgIHByID0gJy0wJ1xuXG4gICAgICByZXQgPSBgJHtndGx0ICsgTX0uJHttfS4ke3B9JHtwcn1gXG4gICAgfSBlbHNlIGlmICh4bSkge1xuICAgICAgcmV0ID0gYD49JHtNfS4wLjAke3ByfSA8JHsrTSArIDF9LjAuMC0wYFxuICAgIH0gZWxzZSBpZiAoeHApIHtcbiAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4wJHtwclxuICAgICAgfSA8JHtNfS4keyttICsgMX0uMC0wYFxuICAgIH1cblxuICAgIGRlYnVnKCd4UmFuZ2UgcmV0dXJuJywgcmV0KVxuXG4gICAgcmV0dXJuIHJldFxuICB9KVxufVxuXG4vLyBCZWNhdXNlICogaXMgQU5ELWVkIHdpdGggZXZlcnl0aGluZyBlbHNlIGluIHRoZSBjb21wYXJhdG9yLFxuLy8gYW5kICcnIG1lYW5zIFwiYW55IHZlcnNpb25cIiwganVzdCByZW1vdmUgdGhlICpzIGVudGlyZWx5LlxuY29uc3QgcmVwbGFjZVN0YXJzID0gKGNvbXAsIG9wdGlvbnMpID0+IHtcbiAgZGVidWcoJ3JlcGxhY2VTdGFycycsIGNvbXAsIG9wdGlvbnMpXG4gIC8vIExvb3NlbmVzcyBpcyBpZ25vcmVkIGhlcmUuICBzdGFyIGlzIGFsd2F5cyBhcyBsb29zZSBhcyBpdCBnZXRzIVxuICByZXR1cm4gY29tcC50cmltKCkucmVwbGFjZShyZVt0LlNUQVJdLCAnJylcbn1cblxuY29uc3QgcmVwbGFjZUdURTAgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBkZWJ1ZygncmVwbGFjZUdURTAnLCBjb21wLCBvcHRpb25zKVxuICByZXR1cm4gY29tcC50cmltKClcbiAgICAucmVwbGFjZShyZVtvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlID8gdC5HVEUwUFJFIDogdC5HVEUwXSwgJycpXG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgcGFzc2VkIHRvIHN0cmluZy5yZXBsYWNlKHJlW3QuSFlQSEVOUkFOR0VdKVxuLy8gTSwgbSwgcGF0Y2gsIHByZXJlbGVhc2UsIGJ1aWxkXG4vLyAxLjIgLSAzLjQuNSA9PiA+PTEuMi4wIDw9My40LjVcbi8vIDEuMi4zIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wLTAgQW55IDMuNC54IHdpbGwgZG9cbi8vIDEuMiAtIDMuNCA9PiA+PTEuMi4wIDwzLjUuMC0wXG5jb25zdCBoeXBoZW5SZXBsYWNlID0gaW5jUHIgPT4gKCQwLFxuICBmcm9tLCBmTSwgZm0sIGZwLCBmcHIsIGZiLFxuICB0bywgdE0sIHRtLCB0cCwgdHByLCB0YikgPT4ge1xuICBpZiAoaXNYKGZNKSkge1xuICAgIGZyb20gPSAnJ1xuICB9IGVsc2UgaWYgKGlzWChmbSkpIHtcbiAgICBmcm9tID0gYD49JHtmTX0uMC4wJHtpbmNQciA/ICctMCcgOiAnJ31gXG4gIH0gZWxzZSBpZiAoaXNYKGZwKSkge1xuICAgIGZyb20gPSBgPj0ke2ZNfS4ke2ZtfS4wJHtpbmNQciA/ICctMCcgOiAnJ31gXG4gIH0gZWxzZSBpZiAoZnByKSB7XG4gICAgZnJvbSA9IGA+PSR7ZnJvbX1gXG4gIH0gZWxzZSB7XG4gICAgZnJvbSA9IGA+PSR7ZnJvbX0ke2luY1ByID8gJy0wJyA6ICcnfWBcbiAgfVxuXG4gIGlmIChpc1godE0pKSB7XG4gICAgdG8gPSAnJ1xuICB9IGVsc2UgaWYgKGlzWCh0bSkpIHtcbiAgICB0byA9IGA8JHsrdE0gKyAxfS4wLjAtMGBcbiAgfSBlbHNlIGlmIChpc1godHApKSB7XG4gICAgdG8gPSBgPCR7dE19LiR7K3RtICsgMX0uMC0wYFxuICB9IGVsc2UgaWYgKHRwcikge1xuICAgIHRvID0gYDw9JHt0TX0uJHt0bX0uJHt0cH0tJHt0cHJ9YFxuICB9IGVsc2UgaWYgKGluY1ByKSB7XG4gICAgdG8gPSBgPCR7dE19LiR7dG19LiR7K3RwICsgMX0tMGBcbiAgfSBlbHNlIHtcbiAgICB0byA9IGA8PSR7dG99YFxuICB9XG5cbiAgcmV0dXJuIChgJHtmcm9tfSAke3RvfWApLnRyaW0oKVxufVxuXG5jb25zdCB0ZXN0U2V0ID0gKHNldCwgdmVyc2lvbiwgb3B0aW9ucykgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xuICAgIGlmICghc2V0W2ldLnRlc3QodmVyc2lvbikpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmICh2ZXJzaW9uLnByZXJlbGVhc2UubGVuZ3RoICYmICFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlKSB7XG4gICAgLy8gRmluZCB0aGUgc2V0IG9mIHZlcnNpb25zIHRoYXQgYXJlIGFsbG93ZWQgdG8gaGF2ZSBwcmVyZWxlYXNlc1xuICAgIC8vIEZvciBleGFtcGxlLCBeMS4yLjMtcHIuMSBkZXN1Z2FycyB0byA+PTEuMi4zLXByLjEgPDIuMC4wXG4gICAgLy8gVGhhdCBzaG91bGQgYWxsb3cgYDEuMi4zLXByLjJgIHRvIHBhc3MuXG4gICAgLy8gSG93ZXZlciwgYDEuMi40LWFscGhhLm5vdHJlYWR5YCBzaG91bGQgTk9UIGJlIGFsbG93ZWQsXG4gICAgLy8gZXZlbiB0aG91Z2ggaXQncyB3aXRoaW4gdGhlIHJhbmdlIHNldCBieSB0aGUgY29tcGFyYXRvcnMuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlYnVnKHNldFtpXS5zZW12ZXIpXG4gICAgICBpZiAoc2V0W2ldLnNlbXZlciA9PT0gQ29tcGFyYXRvci5BTlkpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgaWYgKHNldFtpXS5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGFsbG93ZWQgPSBzZXRbaV0uc2VtdmVyXG4gICAgICAgIGlmIChhbGxvd2VkLm1ham9yID09PSB2ZXJzaW9uLm1ham9yICYmXG4gICAgICAgICAgICBhbGxvd2VkLm1pbm9yID09PSB2ZXJzaW9uLm1pbm9yICYmXG4gICAgICAgICAgICBhbGxvd2VkLnBhdGNoID09PSB2ZXJzaW9uLnBhdGNoKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFZlcnNpb24gaGFzIGEgLXByZSwgYnV0IGl0J3Mgbm90IG9uZSBvZiB0aGUgb25lcyB3ZSBsaWtlLlxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cbiIsImNvbnN0IGRlYnVnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZGVidWcnKVxuY29uc3QgeyBNQVhfTEVOR1RILCBNQVhfU0FGRV9JTlRFR0VSIH0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jb25zdGFudHMnKVxuY29uc3QgeyByZSwgdCB9ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcmUnKVxuXG5jb25zdCBwYXJzZU9wdGlvbnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9wYXJzZS1vcHRpb25zJylcbmNvbnN0IHsgY29tcGFyZUlkZW50aWZpZXJzIH0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9pZGVudGlmaWVycycpXG5jbGFzcyBTZW1WZXIge1xuICBjb25zdHJ1Y3RvciAodmVyc2lvbiwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBwYXJzZU9wdGlvbnMob3B0aW9ucylcblxuICAgIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKSB7XG4gICAgICBpZiAodmVyc2lvbi5sb29zZSA9PT0gISFvcHRpb25zLmxvb3NlICYmXG4gICAgICAgICAgdmVyc2lvbi5pbmNsdWRlUHJlcmVsZWFzZSA9PT0gISFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlKSB7XG4gICAgICAgIHJldHVybiB2ZXJzaW9uXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2ZXJzaW9uID0gdmVyc2lvbi52ZXJzaW9uXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgVmVyc2lvbjogJHt2ZXJzaW9ufWApXG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24ubGVuZ3RoID4gTUFYX0xFTkdUSCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgYHZlcnNpb24gaXMgbG9uZ2VyIHRoYW4gJHtNQVhfTEVOR1RIfSBjaGFyYWN0ZXJzYFxuICAgICAgKVxuICAgIH1cblxuICAgIGRlYnVnKCdTZW1WZXInLCB2ZXJzaW9uLCBvcHRpb25zKVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmxvb3NlID0gISFvcHRpb25zLmxvb3NlXG4gICAgLy8gdGhpcyBpc24ndCBhY3R1YWxseSByZWxldmFudCBmb3IgdmVyc2lvbnMsIGJ1dCBrZWVwIGl0IHNvIHRoYXQgd2VcbiAgICAvLyBkb24ndCBydW4gaW50byB0cm91YmxlIHBhc3NpbmcgdGhpcy5vcHRpb25zIGFyb3VuZC5cbiAgICB0aGlzLmluY2x1ZGVQcmVyZWxlYXNlID0gISFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlXG5cbiAgICBjb25zdCBtID0gdmVyc2lvbi50cmltKCkubWF0Y2gob3B0aW9ucy5sb29zZSA/IHJlW3QuTE9PU0VdIDogcmVbdC5GVUxMXSlcblxuICAgIGlmICghbSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBWZXJzaW9uOiAke3ZlcnNpb259YClcbiAgICB9XG5cbiAgICB0aGlzLnJhdyA9IHZlcnNpb25cblxuICAgIC8vIHRoZXNlIGFyZSBhY3R1YWxseSBudW1iZXJzXG4gICAgdGhpcy5tYWpvciA9ICttWzFdXG4gICAgdGhpcy5taW5vciA9ICttWzJdXG4gICAgdGhpcy5wYXRjaCA9ICttWzNdXG5cbiAgICBpZiAodGhpcy5tYWpvciA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5tYWpvciA8IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWFqb3IgdmVyc2lvbicpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMubWlub3IgPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMubWlub3IgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1pbm9yIHZlcnNpb24nKVxuICAgIH1cblxuICAgIGlmICh0aGlzLnBhdGNoID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLnBhdGNoIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBwYXRjaCB2ZXJzaW9uJylcbiAgICB9XG5cbiAgICAvLyBudW1iZXJpZnkgYW55IHByZXJlbGVhc2UgbnVtZXJpYyBpZHNcbiAgICBpZiAoIW1bNF0pIHtcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IG1bNF0uc3BsaXQoJy4nKS5tYXAoKGlkKSA9PiB7XG4gICAgICAgIGlmICgvXlswLTldKyQvLnRlc3QoaWQpKSB7XG4gICAgICAgICAgY29uc3QgbnVtID0gK2lkXG4gICAgICAgICAgaWYgKG51bSA+PSAwICYmIG51bSA8IE1BWF9TQUZFX0lOVEVHRVIpIHtcbiAgICAgICAgICAgIHJldHVybiBudW1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlkXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuYnVpbGQgPSBtWzVdID8gbVs1XS5zcGxpdCgnLicpIDogW11cbiAgICB0aGlzLmZvcm1hdCgpXG4gIH1cblxuICBmb3JtYXQgKCkge1xuICAgIHRoaXMudmVyc2lvbiA9IGAke3RoaXMubWFqb3J9LiR7dGhpcy5taW5vcn0uJHt0aGlzLnBhdGNofWBcbiAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgICAgdGhpcy52ZXJzaW9uICs9IGAtJHt0aGlzLnByZXJlbGVhc2Uuam9pbignLicpfWBcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvblxuICB9XG5cbiAgdG9TdHJpbmcgKCkge1xuICAgIHJldHVybiB0aGlzLnZlcnNpb25cbiAgfVxuXG4gIGNvbXBhcmUgKG90aGVyKSB7XG4gICAgZGVidWcoJ1NlbVZlci5jb21wYXJlJywgdGhpcy52ZXJzaW9uLCB0aGlzLm9wdGlvbnMsIG90aGVyKVxuICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgICAgaWYgKHR5cGVvZiBvdGhlciA9PT0gJ3N0cmluZycgJiYgb3RoZXIgPT09IHRoaXMudmVyc2lvbikge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfVxuICAgICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gICAgfVxuXG4gICAgaWYgKG90aGVyLnZlcnNpb24gPT09IHRoaXMudmVyc2lvbikge1xuICAgICAgcmV0dXJuIDBcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb21wYXJlTWFpbihvdGhlcikgfHwgdGhpcy5jb21wYXJlUHJlKG90aGVyKVxuICB9XG5cbiAgY29tcGFyZU1haW4gKG90aGVyKSB7XG4gICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMub3B0aW9ucylcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMubWFqb3IsIG90aGVyLm1ham9yKSB8fFxuICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMubWlub3IsIG90aGVyLm1pbm9yKSB8fFxuICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMucGF0Y2gsIG90aGVyLnBhdGNoKVxuICAgIClcbiAgfVxuXG4gIGNvbXBhcmVQcmUgKG90aGVyKSB7XG4gICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMub3B0aW9ucylcbiAgICB9XG5cbiAgICAvLyBOT1QgaGF2aW5nIGEgcHJlcmVsZWFzZSBpcyA+IGhhdmluZyBvbmVcbiAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH0gZWxzZSBpZiAoIXRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAxXG4gICAgfSBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAwXG4gICAgfVxuXG4gICAgbGV0IGkgPSAwXG4gICAgZG8ge1xuICAgICAgY29uc3QgYSA9IHRoaXMucHJlcmVsZWFzZVtpXVxuICAgICAgY29uc3QgYiA9IG90aGVyLnByZXJlbGVhc2VbaV1cbiAgICAgIGRlYnVnKCdwcmVyZWxlYXNlIGNvbXBhcmUnLCBpLCBhLCBiKVxuICAgICAgaWYgKGEgPT09IHVuZGVmaW5lZCAmJiBiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH0gZWxzZSBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAxXG4gICAgICB9IGVsc2UgaWYgKGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH0gZWxzZSBpZiAoYSA9PT0gYikge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKVxuICAgICAgfVxuICAgIH0gd2hpbGUgKCsraSlcbiAgfVxuXG4gIGNvbXBhcmVCdWlsZCAob3RoZXIpIHtcbiAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICAgIH1cblxuICAgIGxldCBpID0gMFxuICAgIGRvIHtcbiAgICAgIGNvbnN0IGEgPSB0aGlzLmJ1aWxkW2ldXG4gICAgICBjb25zdCBiID0gb3RoZXIuYnVpbGRbaV1cbiAgICAgIGRlYnVnKCdwcmVyZWxlYXNlIGNvbXBhcmUnLCBpLCBhLCBiKVxuICAgICAgaWYgKGEgPT09IHVuZGVmaW5lZCAmJiBiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH0gZWxzZSBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAxXG4gICAgICB9IGVsc2UgaWYgKGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH0gZWxzZSBpZiAoYSA9PT0gYikge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKVxuICAgICAgfVxuICAgIH0gd2hpbGUgKCsraSlcbiAgfVxuXG4gIC8vIHByZW1pbm9yIHdpbGwgYnVtcCB0aGUgdmVyc2lvbiB1cCB0byB0aGUgbmV4dCBtaW5vciByZWxlYXNlLCBhbmQgaW1tZWRpYXRlbHlcbiAgLy8gZG93biB0byBwcmUtcmVsZWFzZS4gcHJlbWFqb3IgYW5kIHByZXBhdGNoIHdvcmsgdGhlIHNhbWUgd2F5LlxuICBpbmMgKHJlbGVhc2UsIGlkZW50aWZpZXIpIHtcbiAgICBzd2l0Y2ggKHJlbGVhc2UpIHtcbiAgICAgIGNhc2UgJ3ByZW1ham9yJzpcbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDBcbiAgICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgICAgdGhpcy5taW5vciA9IDBcbiAgICAgICAgdGhpcy5tYWpvcisrXG4gICAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAncHJlbWlub3InOlxuICAgICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMFxuICAgICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgICB0aGlzLm1pbm9yKytcbiAgICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdwcmVwYXRjaCc6XG4gICAgICAgIC8vIElmIHRoaXMgaXMgYWxyZWFkeSBhIHByZXJlbGVhc2UsIGl0IHdpbGwgYnVtcCB0byB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgICAgIC8vIGRyb3AgYW55IHByZXJlbGVhc2VzIHRoYXQgbWlnaHQgYWxyZWFkeSBleGlzdCwgc2luY2UgdGhleSBhcmUgbm90XG4gICAgICAgIC8vIHJlbGV2YW50IGF0IHRoaXMgcG9pbnQuXG4gICAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIpXG4gICAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKVxuICAgICAgICBicmVha1xuICAgICAgLy8gSWYgdGhlIGlucHV0IGlzIGEgbm9uLXByZXJlbGVhc2UgdmVyc2lvbiwgdGhpcyBhY3RzIHRoZSBzYW1lIGFzXG4gICAgICAvLyBwcmVwYXRjaC5cbiAgICAgIGNhc2UgJ3ByZXJlbGVhc2UnOlxuICAgICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ21ham9yJzpcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1tYWpvciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1ham9yIHZlcnNpb24uXG4gICAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWFqb3IuXG4gICAgICAgIC8vIDEuMC4wLTUgYnVtcHMgdG8gMS4wLjBcbiAgICAgICAgLy8gMS4xLjAgYnVtcHMgdG8gMi4wLjBcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMubWlub3IgIT09IDAgfHxcbiAgICAgICAgICB0aGlzLnBhdGNoICE9PSAwIHx8XG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLm1ham9yKytcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1pbm9yID0gMFxuICAgICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnbWlub3InOlxuICAgICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1pbm9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWlub3IgdmVyc2lvbi5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIGluY3JlbWVudCBtaW5vci5cbiAgICAgICAgLy8gMS4yLjAtNSBidW1wcyB0byAxLjIuMFxuICAgICAgICAvLyAxLjIuMSBidW1wcyB0byAxLjMuMFxuICAgICAgICBpZiAodGhpcy5wYXRjaCAhPT0gMCB8fCB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5taW5vcisrXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3BhdGNoJzpcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBub3QgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uLCBpdCB3aWxsIGluY3JlbWVudCB0aGUgcGF0Y2guXG4gICAgICAgIC8vIElmIGl0IGlzIGEgcHJlLXJlbGVhc2UgaXQgd2lsbCBidW1wIHVwIHRvIHRoZSBzYW1lIHBhdGNoIHZlcnNpb24uXG4gICAgICAgIC8vIDEuMi4wLTUgcGF0Y2hlcyB0byAxLjIuMFxuICAgICAgICAvLyAxLjIuMCBwYXRjaGVzIHRvIDEuMi4xXG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5wYXRjaCsrXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgICAgYnJlYWtcbiAgICAgIC8vIFRoaXMgcHJvYmFibHkgc2hvdWxkbid0IGJlIHVzZWQgcHVibGljbHkuXG4gICAgICAvLyAxLjAuMCAncHJlJyB3b3VsZCBiZWNvbWUgMS4wLjAtMCB3aGljaCBpcyB0aGUgd3JvbmcgZGlyZWN0aW9uLlxuICAgICAgY2FzZSAncHJlJzpcbiAgICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbMF1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgaSA9IHRoaXMucHJlcmVsZWFzZS5sZW5ndGhcbiAgICAgICAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcmVyZWxlYXNlW2ldID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICB0aGlzLnByZXJlbGVhc2VbaV0rK1xuICAgICAgICAgICAgICBpID0gLTJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBkaWRuJ3QgaW5jcmVtZW50IGFueXRoaW5nXG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UucHVzaCgwKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaWRlbnRpZmllcikge1xuICAgICAgICAgIC8vIDEuMi4wLWJldGEuMSBidW1wcyB0byAxLjIuMC1iZXRhLjIsXG4gICAgICAgICAgLy8gMS4yLjAtYmV0YS5mb29ibHogb3IgMS4yLjAtYmV0YSBidW1wcyB0byAxLjIuMC1iZXRhLjBcbiAgICAgICAgICBpZiAodGhpcy5wcmVyZWxlYXNlWzBdID09PSBpZGVudGlmaWVyKSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4odGhpcy5wcmVyZWxlYXNlWzFdKSkge1xuICAgICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbaWRlbnRpZmllciwgMF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW2lkZW50aWZpZXIsIDBdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBpbmNyZW1lbnQgYXJndW1lbnQ6ICR7cmVsZWFzZX1gKVxuICAgIH1cbiAgICB0aGlzLmZvcm1hdCgpXG4gICAgdGhpcy5yYXcgPSB0aGlzLnZlcnNpb25cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2VtVmVyXG4iLCJjb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKVxuY29uc3QgY2xlYW4gPSAodmVyc2lvbiwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBzID0gcGFyc2UodmVyc2lvbi50cmltKCkucmVwbGFjZSgvXls9dl0rLywgJycpLCBvcHRpb25zKVxuICByZXR1cm4gcyA/IHMudmVyc2lvbiA6IG51bGxcbn1cbm1vZHVsZS5leHBvcnRzID0gY2xlYW5cbiIsImNvbnN0IGVxID0gcmVxdWlyZSgnLi9lcScpXG5jb25zdCBuZXEgPSByZXF1aXJlKCcuL25lcScpXG5jb25zdCBndCA9IHJlcXVpcmUoJy4vZ3QnKVxuY29uc3QgZ3RlID0gcmVxdWlyZSgnLi9ndGUnKVxuY29uc3QgbHQgPSByZXF1aXJlKCcuL2x0JylcbmNvbnN0IGx0ZSA9IHJlcXVpcmUoJy4vbHRlJylcblxuY29uc3QgY21wID0gKGEsIG9wLCBiLCBsb29zZSkgPT4ge1xuICBzd2l0Y2ggKG9wKSB7XG4gICAgY2FzZSAnPT09JzpcbiAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpXG4gICAgICAgIGEgPSBhLnZlcnNpb25cbiAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpXG4gICAgICAgIGIgPSBiLnZlcnNpb25cbiAgICAgIHJldHVybiBhID09PSBiXG5cbiAgICBjYXNlICchPT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JylcbiAgICAgICAgYSA9IGEudmVyc2lvblxuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0JylcbiAgICAgICAgYiA9IGIudmVyc2lvblxuICAgICAgcmV0dXJuIGEgIT09IGJcblxuICAgIGNhc2UgJyc6XG4gICAgY2FzZSAnPSc6XG4gICAgY2FzZSAnPT0nOlxuICAgICAgcmV0dXJuIGVxKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnIT0nOlxuICAgICAgcmV0dXJuIG5lcShhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJz4nOlxuICAgICAgcmV0dXJuIGd0KGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPj0nOlxuICAgICAgcmV0dXJuIGd0ZShhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJzwnOlxuICAgICAgcmV0dXJuIGx0KGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPD0nOlxuICAgICAgcmV0dXJuIGx0ZShhLCBiLCBsb29zZSlcblxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIG9wZXJhdG9yOiAke29wfWApXG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gY21wXG4iLCJjb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKVxuY29uc3Qge3JlLCB0fSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3JlJylcblxuY29uc3QgY29lcmNlID0gKHZlcnNpb24sIG9wdGlvbnMpID0+IHtcbiAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpIHtcbiAgICByZXR1cm4gdmVyc2lvblxuICB9XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnbnVtYmVyJykge1xuICAgIHZlcnNpb24gPSBTdHJpbmcodmVyc2lvbilcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICBsZXQgbWF0Y2ggPSBudWxsXG4gIGlmICghb3B0aW9ucy5ydGwpIHtcbiAgICBtYXRjaCA9IHZlcnNpb24ubWF0Y2gocmVbdC5DT0VSQ0VdKVxuICB9IGVsc2Uge1xuICAgIC8vIEZpbmQgdGhlIHJpZ2h0LW1vc3QgY29lcmNpYmxlIHN0cmluZyB0aGF0IGRvZXMgbm90IHNoYXJlXG4gICAgLy8gYSB0ZXJtaW51cyB3aXRoIGEgbW9yZSBsZWZ0LXdhcmQgY29lcmNpYmxlIHN0cmluZy5cbiAgICAvLyBFZywgJzEuMi4zLjQnIHdhbnRzIHRvIGNvZXJjZSAnMi4zLjQnLCBub3QgJzMuNCcgb3IgJzQnXG4gICAgLy9cbiAgICAvLyBXYWxrIHRocm91Z2ggdGhlIHN0cmluZyBjaGVja2luZyB3aXRoIGEgL2cgcmVnZXhwXG4gICAgLy8gTWFudWFsbHkgc2V0IHRoZSBpbmRleCBzbyBhcyB0byBwaWNrIHVwIG92ZXJsYXBwaW5nIG1hdGNoZXMuXG4gICAgLy8gU3RvcCB3aGVuIHdlIGdldCBhIG1hdGNoIHRoYXQgZW5kcyBhdCB0aGUgc3RyaW5nIGVuZCwgc2luY2Ugbm9cbiAgICAvLyBjb2VyY2libGUgc3RyaW5nIGNhbiBiZSBtb3JlIHJpZ2h0LXdhcmQgd2l0aG91dCB0aGUgc2FtZSB0ZXJtaW51cy5cbiAgICBsZXQgbmV4dFxuICAgIHdoaWxlICgobmV4dCA9IHJlW3QuQ09FUkNFUlRMXS5leGVjKHZlcnNpb24pKSAmJlxuICAgICAgICAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoICE9PSB2ZXJzaW9uLmxlbmd0aClcbiAgICApIHtcbiAgICAgIGlmICghbWF0Y2ggfHxcbiAgICAgICAgICAgIG5leHQuaW5kZXggKyBuZXh0WzBdLmxlbmd0aCAhPT0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGgpIHtcbiAgICAgICAgbWF0Y2ggPSBuZXh0XG4gICAgICB9XG4gICAgICByZVt0LkNPRVJDRVJUTF0ubGFzdEluZGV4ID0gbmV4dC5pbmRleCArIG5leHRbMV0ubGVuZ3RoICsgbmV4dFsyXS5sZW5ndGhcbiAgICB9XG4gICAgLy8gbGVhdmUgaXQgaW4gYSBjbGVhbiBzdGF0ZVxuICAgIHJlW3QuQ09FUkNFUlRMXS5sYXN0SW5kZXggPSAtMVxuICB9XG5cbiAgaWYgKG1hdGNoID09PSBudWxsKVxuICAgIHJldHVybiBudWxsXG5cbiAgcmV0dXJuIHBhcnNlKGAke21hdGNoWzJdfS4ke21hdGNoWzNdIHx8ICcwJ30uJHttYXRjaFs0XSB8fCAnMCd9YCwgb3B0aW9ucylcbn1cbm1vZHVsZS5leHBvcnRzID0gY29lcmNlXG4iLCJjb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBjb21wYXJlQnVpbGQgPSAoYSwgYiwgbG9vc2UpID0+IHtcbiAgY29uc3QgdmVyc2lvbkEgPSBuZXcgU2VtVmVyKGEsIGxvb3NlKVxuICBjb25zdCB2ZXJzaW9uQiA9IG5ldyBTZW1WZXIoYiwgbG9vc2UpXG4gIHJldHVybiB2ZXJzaW9uQS5jb21wYXJlKHZlcnNpb25CKSB8fCB2ZXJzaW9uQS5jb21wYXJlQnVpbGQodmVyc2lvbkIpXG59XG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBhcmVCdWlsZFxuIiwiY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBjb21wYXJlTG9vc2UgPSAoYSwgYikgPT4gY29tcGFyZShhLCBiLCB0cnVlKVxubW9kdWxlLmV4cG9ydHMgPSBjb21wYXJlTG9vc2VcbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IGNvbXBhcmUgPSAoYSwgYiwgbG9vc2UpID0+XG4gIG5ldyBTZW1WZXIoYSwgbG9vc2UpLmNvbXBhcmUobmV3IFNlbVZlcihiLCBsb29zZSkpXG5cbm1vZHVsZS5leHBvcnRzID0gY29tcGFyZVxuIiwiY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmNvbnN0IGVxID0gcmVxdWlyZSgnLi9lcScpXG5cbmNvbnN0IGRpZmYgPSAodmVyc2lvbjEsIHZlcnNpb24yKSA9PiB7XG4gIGlmIChlcSh2ZXJzaW9uMSwgdmVyc2lvbjIpKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfSBlbHNlIHtcbiAgICBjb25zdCB2MSA9IHBhcnNlKHZlcnNpb24xKVxuICAgIGNvbnN0IHYyID0gcGFyc2UodmVyc2lvbjIpXG4gICAgY29uc3QgaGFzUHJlID0gdjEucHJlcmVsZWFzZS5sZW5ndGggfHwgdjIucHJlcmVsZWFzZS5sZW5ndGhcbiAgICBjb25zdCBwcmVmaXggPSBoYXNQcmUgPyAncHJlJyA6ICcnXG4gICAgY29uc3QgZGVmYXVsdFJlc3VsdCA9IGhhc1ByZSA/ICdwcmVyZWxlYXNlJyA6ICcnXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdjEpIHtcbiAgICAgIGlmIChrZXkgPT09ICdtYWpvcicgfHwga2V5ID09PSAnbWlub3InIHx8IGtleSA9PT0gJ3BhdGNoJykge1xuICAgICAgICBpZiAodjFba2V5XSAhPT0gdjJba2V5XSkge1xuICAgICAgICAgIHJldHVybiBwcmVmaXggKyBrZXlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFJlc3VsdCAvLyBtYXkgYmUgdW5kZWZpbmVkXG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gZGlmZlxuIiwiY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBlcSA9IChhLCBiLCBsb29zZSkgPT4gY29tcGFyZShhLCBiLCBsb29zZSkgPT09IDBcbm1vZHVsZS5leHBvcnRzID0gZXFcbiIsImNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgZ3QgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpID4gMFxubW9kdWxlLmV4cG9ydHMgPSBndFxuIiwiY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBndGUgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpID49IDBcbm1vZHVsZS5leHBvcnRzID0gZ3RlXG4iLCJjb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5cbmNvbnN0IGluYyA9ICh2ZXJzaW9uLCByZWxlYXNlLCBvcHRpb25zLCBpZGVudGlmaWVyKSA9PiB7XG4gIGlmICh0eXBlb2YgKG9wdGlvbnMpID09PSAnc3RyaW5nJykge1xuICAgIGlkZW50aWZpZXIgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHVuZGVmaW5lZFxuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKS5pbmMocmVsZWFzZSwgaWRlbnRpZmllcikudmVyc2lvblxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gaW5jXG4iLCJjb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi9jb21wYXJlJylcbmNvbnN0IGx0ID0gKGEsIGIsIGxvb3NlKSA9PiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8IDBcbm1vZHVsZS5leHBvcnRzID0gbHRcbiIsImNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgbHRlID0gKGEsIGIsIGxvb3NlKSA9PiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8PSAwXG5tb2R1bGUuZXhwb3J0cyA9IGx0ZVxuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgbWFqb3IgPSAoYSwgbG9vc2UpID0+IG5ldyBTZW1WZXIoYSwgbG9vc2UpLm1ham9yXG5tb2R1bGUuZXhwb3J0cyA9IG1ham9yXG4iLCJjb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBtaW5vciA9IChhLCBsb29zZSkgPT4gbmV3IFNlbVZlcihhLCBsb29zZSkubWlub3Jcbm1vZHVsZS5leHBvcnRzID0gbWlub3JcbiIsImNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgbmVxID0gKGEsIGIsIGxvb3NlKSA9PiBjb21wYXJlKGEsIGIsIGxvb3NlKSAhPT0gMFxubW9kdWxlLmV4cG9ydHMgPSBuZXFcbiIsImNvbnN0IHtNQVhfTEVOR1RIfSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2NvbnN0YW50cycpXG5jb25zdCB7IHJlLCB0IH0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9yZScpXG5jb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5cbmNvbnN0IHBhcnNlT3B0aW9ucyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3BhcnNlLW9wdGlvbnMnKVxuY29uc3QgcGFyc2UgPSAodmVyc2lvbiwgb3B0aW9ucykgPT4ge1xuICBvcHRpb25zID0gcGFyc2VPcHRpb25zKG9wdGlvbnMpXG5cbiAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpIHtcbiAgICByZXR1cm4gdmVyc2lvblxuICB9XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGNvbnN0IHIgPSBvcHRpb25zLmxvb3NlID8gcmVbdC5MT09TRV0gOiByZVt0LkZVTExdXG4gIGlmICghci50ZXN0KHZlcnNpb24pKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2VcbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IHBhdGNoID0gKGEsIGxvb3NlKSA9PiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5wYXRjaFxubW9kdWxlLmV4cG9ydHMgPSBwYXRjaFxuIiwiY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmNvbnN0IHByZXJlbGVhc2UgPSAodmVyc2lvbiwgb3B0aW9ucykgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZSh2ZXJzaW9uLCBvcHRpb25zKVxuICByZXR1cm4gKHBhcnNlZCAmJiBwYXJzZWQucHJlcmVsZWFzZS5sZW5ndGgpID8gcGFyc2VkLnByZXJlbGVhc2UgOiBudWxsXG59XG5tb2R1bGUuZXhwb3J0cyA9IHByZXJlbGVhc2VcbiIsImNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgcmNvbXBhcmUgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYiwgYSwgbG9vc2UpXG5tb2R1bGUuZXhwb3J0cyA9IHJjb21wYXJlXG4iLCJjb25zdCBjb21wYXJlQnVpbGQgPSByZXF1aXJlKCcuL2NvbXBhcmUtYnVpbGQnKVxuY29uc3QgcnNvcnQgPSAobGlzdCwgbG9vc2UpID0+IGxpc3Quc29ydCgoYSwgYikgPT4gY29tcGFyZUJ1aWxkKGIsIGEsIGxvb3NlKSlcbm1vZHVsZS5leHBvcnRzID0gcnNvcnRcbiIsImNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5jb25zdCBzYXRpc2ZpZXMgPSAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpID0+IHtcbiAgdHJ5IHtcbiAgICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gcmFuZ2UudGVzdCh2ZXJzaW9uKVxufVxubW9kdWxlLmV4cG9ydHMgPSBzYXRpc2ZpZXNcbiIsImNvbnN0IGNvbXBhcmVCdWlsZCA9IHJlcXVpcmUoJy4vY29tcGFyZS1idWlsZCcpXG5jb25zdCBzb3J0ID0gKGxpc3QsIGxvb3NlKSA9PiBsaXN0LnNvcnQoKGEsIGIpID0+IGNvbXBhcmVCdWlsZChhLCBiLCBsb29zZSkpXG5tb2R1bGUuZXhwb3J0cyA9IHNvcnRcbiIsImNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpXG5jb25zdCB2YWxpZCA9ICh2ZXJzaW9uLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHYgPSBwYXJzZSh2ZXJzaW9uLCBvcHRpb25zKVxuICByZXR1cm4gdiA/IHYudmVyc2lvbiA6IG51bGxcbn1cbm1vZHVsZS5leHBvcnRzID0gdmFsaWRcbiIsIi8vIGp1c3QgcHJlLWxvYWQgYWxsIHRoZSBzdHVmZiB0aGF0IGluZGV4LmpzIGxhemlseSBleHBvcnRzXG5jb25zdCBpbnRlcm5hbFJlID0gcmVxdWlyZSgnLi9pbnRlcm5hbC9yZScpXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmU6IGludGVybmFsUmUucmUsXG4gIHNyYzogaW50ZXJuYWxSZS5zcmMsXG4gIHRva2VuczogaW50ZXJuYWxSZS50LFxuICBTRU1WRVJfU1BFQ19WRVJTSU9OOiByZXF1aXJlKCcuL2ludGVybmFsL2NvbnN0YW50cycpLlNFTVZFUl9TUEVDX1ZFUlNJT04sXG4gIFNlbVZlcjogcmVxdWlyZSgnLi9jbGFzc2VzL3NlbXZlcicpLFxuICBjb21wYXJlSWRlbnRpZmllcnM6IHJlcXVpcmUoJy4vaW50ZXJuYWwvaWRlbnRpZmllcnMnKS5jb21wYXJlSWRlbnRpZmllcnMsXG4gIHJjb21wYXJlSWRlbnRpZmllcnM6IHJlcXVpcmUoJy4vaW50ZXJuYWwvaWRlbnRpZmllcnMnKS5yY29tcGFyZUlkZW50aWZpZXJzLFxuICBwYXJzZTogcmVxdWlyZSgnLi9mdW5jdGlvbnMvcGFyc2UnKSxcbiAgdmFsaWQ6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3ZhbGlkJyksXG4gIGNsZWFuOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9jbGVhbicpLFxuICBpbmM6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2luYycpLFxuICBkaWZmOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9kaWZmJyksXG4gIG1ham9yOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9tYWpvcicpLFxuICBtaW5vcjogcmVxdWlyZSgnLi9mdW5jdGlvbnMvbWlub3InKSxcbiAgcGF0Y2g6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3BhdGNoJyksXG4gIHByZXJlbGVhc2U6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3ByZXJlbGVhc2UnKSxcbiAgY29tcGFyZTogcmVxdWlyZSgnLi9mdW5jdGlvbnMvY29tcGFyZScpLFxuICByY29tcGFyZTogcmVxdWlyZSgnLi9mdW5jdGlvbnMvcmNvbXBhcmUnKSxcbiAgY29tcGFyZUxvb3NlOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9jb21wYXJlLWxvb3NlJyksXG4gIGNvbXBhcmVCdWlsZDogcmVxdWlyZSgnLi9mdW5jdGlvbnMvY29tcGFyZS1idWlsZCcpLFxuICBzb3J0OiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9zb3J0JyksXG4gIHJzb3J0OiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9yc29ydCcpLFxuICBndDogcmVxdWlyZSgnLi9mdW5jdGlvbnMvZ3QnKSxcbiAgbHQ6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2x0JyksXG4gIGVxOiByZXF1aXJlKCcuL2Z1bmN0aW9ucy9lcScpLFxuICBuZXE6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL25lcScpLFxuICBndGU6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2d0ZScpLFxuICBsdGU6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2x0ZScpLFxuICBjbXA6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2NtcCcpLFxuICBjb2VyY2U6IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2NvZXJjZScpLFxuICBDb21wYXJhdG9yOiByZXF1aXJlKCcuL2NsYXNzZXMvY29tcGFyYXRvcicpLFxuICBSYW5nZTogcmVxdWlyZSgnLi9jbGFzc2VzL3JhbmdlJyksXG4gIHNhdGlzZmllczogcmVxdWlyZSgnLi9mdW5jdGlvbnMvc2F0aXNmaWVzJyksXG4gIHRvQ29tcGFyYXRvcnM6IHJlcXVpcmUoJy4vcmFuZ2VzL3RvLWNvbXBhcmF0b3JzJyksXG4gIG1heFNhdGlzZnlpbmc6IHJlcXVpcmUoJy4vcmFuZ2VzL21heC1zYXRpc2Z5aW5nJyksXG4gIG1pblNhdGlzZnlpbmc6IHJlcXVpcmUoJy4vcmFuZ2VzL21pbi1zYXRpc2Z5aW5nJyksXG4gIG1pblZlcnNpb246IHJlcXVpcmUoJy4vcmFuZ2VzL21pbi12ZXJzaW9uJyksXG4gIHZhbGlkUmFuZ2U6IHJlcXVpcmUoJy4vcmFuZ2VzL3ZhbGlkJyksXG4gIG91dHNpZGU6IHJlcXVpcmUoJy4vcmFuZ2VzL291dHNpZGUnKSxcbiAgZ3RyOiByZXF1aXJlKCcuL3Jhbmdlcy9ndHInKSxcbiAgbHRyOiByZXF1aXJlKCcuL3Jhbmdlcy9sdHInKSxcbiAgaW50ZXJzZWN0czogcmVxdWlyZSgnLi9yYW5nZXMvaW50ZXJzZWN0cycpLFxuICBzaW1wbGlmeVJhbmdlOiByZXF1aXJlKCcuL3Jhbmdlcy9zaW1wbGlmeScpLFxuICBzdWJzZXQ6IHJlcXVpcmUoJy4vcmFuZ2VzL3N1YnNldCcpLFxufVxuIiwiLy8gTm90ZTogdGhpcyBpcyB0aGUgc2VtdmVyLm9yZyB2ZXJzaW9uIG9mIHRoZSBzcGVjIHRoYXQgaXQgaW1wbGVtZW50c1xuLy8gTm90IG5lY2Vzc2FyaWx5IHRoZSBwYWNrYWdlIHZlcnNpb24gb2YgdGhpcyBjb2RlLlxuY29uc3QgU0VNVkVSX1NQRUNfVkVSU0lPTiA9ICcyLjAuMCdcblxuY29uc3QgTUFYX0xFTkdUSCA9IDI1NlxuY29uc3QgTUFYX1NBRkVfSU5URUdFUiA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHx8XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIDkwMDcxOTkyNTQ3NDA5OTFcblxuLy8gTWF4IHNhZmUgc2VnbWVudCBsZW5ndGggZm9yIGNvZXJjaW9uLlxuY29uc3QgTUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSCA9IDE2XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBTRU1WRVJfU1BFQ19WRVJTSU9OLFxuICBNQVhfTEVOR1RILFxuICBNQVhfU0FGRV9JTlRFR0VSLFxuICBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIXG59XG4iLCJjb25zdCBkZWJ1ZyA9IChcbiAgdHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnICYmXG4gIHByb2Nlc3MuZW52ICYmXG4gIHByb2Nlc3MuZW52Lk5PREVfREVCVUcgJiZcbiAgL1xcYnNlbXZlclxcYi9pLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRylcbikgPyAoLi4uYXJncykgPT4gY29uc29sZS5lcnJvcignU0VNVkVSJywgLi4uYXJncylcbiAgOiAoKSA9PiB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYnVnXG4iLCJjb25zdCBudW1lcmljID0gL15bMC05XSskL1xuY29uc3QgY29tcGFyZUlkZW50aWZpZXJzID0gKGEsIGIpID0+IHtcbiAgY29uc3QgYW51bSA9IG51bWVyaWMudGVzdChhKVxuICBjb25zdCBibnVtID0gbnVtZXJpYy50ZXN0KGIpXG5cbiAgaWYgKGFudW0gJiYgYm51bSkge1xuICAgIGEgPSArYVxuICAgIGIgPSArYlxuICB9XG5cbiAgcmV0dXJuIGEgPT09IGIgPyAwXG4gICAgOiAoYW51bSAmJiAhYm51bSkgPyAtMVxuICAgIDogKGJudW0gJiYgIWFudW0pID8gMVxuICAgIDogYSA8IGIgPyAtMVxuICAgIDogMVxufVxuXG5jb25zdCByY29tcGFyZUlkZW50aWZpZXJzID0gKGEsIGIpID0+IGNvbXBhcmVJZGVudGlmaWVycyhiLCBhKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29tcGFyZUlkZW50aWZpZXJzLFxuICByY29tcGFyZUlkZW50aWZpZXJzXG59XG4iLCIvLyBwYXJzZSBvdXQganVzdCB0aGUgb3B0aW9ucyB3ZSBjYXJlIGFib3V0IHNvIHdlIGFsd2F5cyBnZXQgYSBjb25zaXN0ZW50XG4vLyBvYmogd2l0aCBrZXlzIGluIGEgY29uc2lzdGVudCBvcmRlci5cbmNvbnN0IG9wdHMgPSBbJ2luY2x1ZGVQcmVyZWxlYXNlJywgJ2xvb3NlJywgJ3J0bCddXG5jb25zdCBwYXJzZU9wdGlvbnMgPSBvcHRpb25zID0+XG4gICFvcHRpb25zID8ge31cbiAgOiB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcgPyB7IGxvb3NlOiB0cnVlIH1cbiAgOiBvcHRzLmZpbHRlcihrID0+IG9wdGlvbnNba10pLnJlZHVjZSgob3B0aW9ucywgaykgPT4ge1xuICAgIG9wdGlvbnNba10gPSB0cnVlXG4gICAgcmV0dXJuIG9wdGlvbnNcbiAgfSwge30pXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlT3B0aW9uc1xuIiwiY29uc3QgeyBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIIH0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJy4vZGVidWcnKVxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0ge31cblxuLy8gVGhlIGFjdHVhbCByZWdleHBzIGdvIG9uIGV4cG9ydHMucmVcbmNvbnN0IHJlID0gZXhwb3J0cy5yZSA9IFtdXG5jb25zdCBzcmMgPSBleHBvcnRzLnNyYyA9IFtdXG5jb25zdCB0ID0gZXhwb3J0cy50ID0ge31cbmxldCBSID0gMFxuXG5jb25zdCBjcmVhdGVUb2tlbiA9IChuYW1lLCB2YWx1ZSwgaXNHbG9iYWwpID0+IHtcbiAgY29uc3QgaW5kZXggPSBSKytcbiAgZGVidWcoaW5kZXgsIHZhbHVlKVxuICB0W25hbWVdID0gaW5kZXhcbiAgc3JjW2luZGV4XSA9IHZhbHVlXG4gIHJlW2luZGV4XSA9IG5ldyBSZWdFeHAodmFsdWUsIGlzR2xvYmFsID8gJ2cnIDogdW5kZWZpbmVkKVxufVxuXG4vLyBUaGUgZm9sbG93aW5nIFJlZ3VsYXIgRXhwcmVzc2lvbnMgY2FuIGJlIHVzZWQgZm9yIHRva2VuaXppbmcsXG4vLyB2YWxpZGF0aW5nLCBhbmQgcGFyc2luZyBTZW1WZXIgdmVyc2lvbiBzdHJpbmdzLlxuXG4vLyAjIyBOdW1lcmljIElkZW50aWZpZXJcbi8vIEEgc2luZ2xlIGAwYCwgb3IgYSBub24temVybyBkaWdpdCBmb2xsb3dlZCBieSB6ZXJvIG9yIG1vcmUgZGlnaXRzLlxuXG5jcmVhdGVUb2tlbignTlVNRVJJQ0lERU5USUZJRVInLCAnMHxbMS05XVxcXFxkKicpXG5jcmVhdGVUb2tlbignTlVNRVJJQ0lERU5USUZJRVJMT09TRScsICdbMC05XSsnKVxuXG4vLyAjIyBOb24tbnVtZXJpYyBJZGVudGlmaWVyXG4vLyBaZXJvIG9yIG1vcmUgZGlnaXRzLCBmb2xsb3dlZCBieSBhIGxldHRlciBvciBoeXBoZW4sIGFuZCB0aGVuIHplcm8gb3Jcbi8vIG1vcmUgbGV0dGVycywgZGlnaXRzLCBvciBoeXBoZW5zLlxuXG5jcmVhdGVUb2tlbignTk9OTlVNRVJJQ0lERU5USUZJRVInLCAnXFxcXGQqW2EtekEtWi1dW2EtekEtWjAtOS1dKicpXG5cbi8vICMjIE1haW4gVmVyc2lvblxuLy8gVGhyZWUgZG90LXNlcGFyYXRlZCBudW1lcmljIGlkZW50aWZpZXJzLlxuXG5jcmVhdGVUb2tlbignTUFJTlZFUlNJT04nLCBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJdfSlcXFxcLmAgK1xuICAgICAgICAgICAgICAgICAgIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUl19KVxcXFwuYCArXG4gICAgICAgICAgICAgICAgICAgYCgke3NyY1t0Lk5VTUVSSUNJREVOVElGSUVSXX0pYClcblxuY3JlYXRlVG9rZW4oJ01BSU5WRVJTSU9OTE9PU0UnLCBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV19KVxcXFwuYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV19KVxcXFwuYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV19KWApXG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb24gSWRlbnRpZmllclxuLy8gQSBudW1lcmljIGlkZW50aWZpZXIsIG9yIGEgbm9uLW51bWVyaWMgaWRlbnRpZmllci5cblxuY3JlYXRlVG9rZW4oJ1BSRVJFTEVBU0VJREVOVElGSUVSJywgYCg/OiR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJdXG59fCR7c3JjW3QuTk9OTlVNRVJJQ0lERU5USUZJRVJdfSlgKVxuXG5jcmVhdGVUb2tlbignUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRScsIGAoPzoke3NyY1t0Lk5VTUVSSUNJREVOVElGSUVSTE9PU0VdXG59fCR7c3JjW3QuTk9OTlVNRVJJQ0lERU5USUZJRVJdfSlgKVxuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uXG4vLyBIeXBoZW4sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIGRvdC1zZXBhcmF0ZWQgcHJlLXJlbGVhc2UgdmVyc2lvblxuLy8gaWRlbnRpZmllcnMuXG5cbmNyZWF0ZVRva2VuKCdQUkVSRUxFQVNFJywgYCg/Oi0oJHtzcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUl1cbn0oPzpcXFxcLiR7c3JjW3QuUFJFUkVMRUFTRUlERU5USUZJRVJdfSkqKSlgKVxuXG5jcmVhdGVUb2tlbignUFJFUkVMRUFTRUxPT1NFJywgYCg/Oi0/KCR7c3JjW3QuUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV1cbn0oPzpcXFxcLiR7c3JjW3QuUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV19KSopKWApXG5cbi8vICMjIEJ1aWxkIE1ldGFkYXRhIElkZW50aWZpZXJcbi8vIEFueSBjb21iaW5hdGlvbiBvZiBkaWdpdHMsIGxldHRlcnMsIG9yIGh5cGhlbnMuXG5cbmNyZWF0ZVRva2VuKCdCVUlMRElERU5USUZJRVInLCAnWzAtOUEtWmEtei1dKycpXG5cbi8vICMjIEJ1aWxkIE1ldGFkYXRhXG4vLyBQbHVzIHNpZ24sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIHBlcmlvZC1zZXBhcmF0ZWQgYnVpbGQgbWV0YWRhdGFcbi8vIGlkZW50aWZpZXJzLlxuXG5jcmVhdGVUb2tlbignQlVJTEQnLCBgKD86XFxcXCsoJHtzcmNbdC5CVUlMRElERU5USUZJRVJdXG59KD86XFxcXC4ke3NyY1t0LkJVSUxESURFTlRJRklFUl19KSopKWApXG5cbi8vICMjIEZ1bGwgVmVyc2lvbiBTdHJpbmdcbi8vIEEgbWFpbiB2ZXJzaW9uLCBmb2xsb3dlZCBvcHRpb25hbGx5IGJ5IGEgcHJlLXJlbGVhc2UgdmVyc2lvbiBhbmRcbi8vIGJ1aWxkIG1ldGFkYXRhLlxuXG4vLyBOb3RlIHRoYXQgdGhlIG9ubHkgbWFqb3IsIG1pbm9yLCBwYXRjaCwgYW5kIHByZS1yZWxlYXNlIHNlY3Rpb25zIG9mXG4vLyB0aGUgdmVyc2lvbiBzdHJpbmcgYXJlIGNhcHR1cmluZyBncm91cHMuICBUaGUgYnVpbGQgbWV0YWRhdGEgaXMgbm90IGFcbi8vIGNhcHR1cmluZyBncm91cCwgYmVjYXVzZSBpdCBzaG91bGQgbm90IGV2ZXIgYmUgdXNlZCBpbiB2ZXJzaW9uXG4vLyBjb21wYXJpc29uLlxuXG5jcmVhdGVUb2tlbignRlVMTFBMQUlOJywgYHY/JHtzcmNbdC5NQUlOVkVSU0lPTl1cbn0ke3NyY1t0LlBSRVJFTEVBU0VdfT8ke1xuICBzcmNbdC5CVUlMRF19P2ApXG5cbmNyZWF0ZVRva2VuKCdGVUxMJywgYF4ke3NyY1t0LkZVTExQTEFJTl19JGApXG5cbi8vIGxpa2UgZnVsbCwgYnV0IGFsbG93cyB2MS4yLjMgYW5kID0xLjIuMywgd2hpY2ggcGVvcGxlIGRvIHNvbWV0aW1lcy5cbi8vIGFsc28sIDEuMC4wYWxwaGExIChwcmVyZWxlYXNlIHdpdGhvdXQgdGhlIGh5cGhlbikgd2hpY2ggaXMgcHJldHR5XG4vLyBjb21tb24gaW4gdGhlIG5wbSByZWdpc3RyeS5cbmNyZWF0ZVRva2VuKCdMT09TRVBMQUlOJywgYFt2PVxcXFxzXSoke3NyY1t0Lk1BSU5WRVJTSU9OTE9PU0VdXG59JHtzcmNbdC5QUkVSRUxFQVNFTE9PU0VdfT8ke1xuICBzcmNbdC5CVUlMRF19P2ApXG5cbmNyZWF0ZVRva2VuKCdMT09TRScsIGBeJHtzcmNbdC5MT09TRVBMQUlOXX0kYClcblxuY3JlYXRlVG9rZW4oJ0dUTFQnLCAnKCg/Ojx8Pik/PT8pJylcblxuLy8gU29tZXRoaW5nIGxpa2UgXCIyLipcIiBvciBcIjEuMi54XCIuXG4vLyBOb3RlIHRoYXQgXCJ4LnhcIiBpcyBhIHZhbGlkIHhSYW5nZSBpZGVudGlmZXIsIG1lYW5pbmcgXCJhbnkgdmVyc2lvblwiXG4vLyBPbmx5IHRoZSBmaXJzdCBpdGVtIGlzIHN0cmljdGx5IHJlcXVpcmVkLlxuY3JlYXRlVG9rZW4oJ1hSQU5HRUlERU5USUZJRVJMT09TRScsIGAke3NyY1t0Lk5VTUVSSUNJREVOVElGSUVSTE9PU0VdfXx4fFh8XFxcXCpgKVxuY3JlYXRlVG9rZW4oJ1hSQU5HRUlERU5USUZJRVInLCBgJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUl19fHh8WHxcXFxcKmApXG5cbmNyZWF0ZVRva2VuKCdYUkFOR0VQTEFJTicsIGBbdj1cXFxcc10qKCR7c3JjW3QuWFJBTkdFSURFTlRJRklFUl19KWAgK1xuICAgICAgICAgICAgICAgICAgIGAoPzpcXFxcLigke3NyY1t0LlhSQU5HRUlERU5USUZJRVJdfSlgICtcbiAgICAgICAgICAgICAgICAgICBgKD86XFxcXC4oJHtzcmNbdC5YUkFOR0VJREVOVElGSUVSXX0pYCArXG4gICAgICAgICAgICAgICAgICAgYCg/OiR7c3JjW3QuUFJFUkVMRUFTRV19KT8ke1xuICAgICAgICAgICAgICAgICAgICAgc3JjW3QuQlVJTERdfT9gICtcbiAgICAgICAgICAgICAgICAgICBgKT8pP2ApXG5cbmNyZWF0ZVRva2VuKCdYUkFOR0VQTEFJTkxPT1NFJywgYFt2PVxcXFxzXSooJHtzcmNbdC5YUkFOR0VJREVOVElGSUVSTE9PU0VdfSlgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoPzpcXFxcLigke3NyY1t0LlhSQU5HRUlERU5USUZJRVJMT09TRV19KWAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYCg/OlxcXFwuKCR7c3JjW3QuWFJBTkdFSURFTlRJRklFUkxPT1NFXX0pYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKD86JHtzcmNbdC5QUkVSRUxFQVNFTE9PU0VdfSk/JHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjW3QuQlVJTERdfT9gICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGApPyk/YClcblxuY3JlYXRlVG9rZW4oJ1hSQU5HRScsIGBeJHtzcmNbdC5HVExUXX1cXFxccyoke3NyY1t0LlhSQU5HRVBMQUlOXX0kYClcbmNyZWF0ZVRva2VuKCdYUkFOR0VMT09TRScsIGBeJHtzcmNbdC5HVExUXX1cXFxccyoke3NyY1t0LlhSQU5HRVBMQUlOTE9PU0VdfSRgKVxuXG4vLyBDb2VyY2lvbi5cbi8vIEV4dHJhY3QgYW55dGhpbmcgdGhhdCBjb3VsZCBjb25jZWl2YWJseSBiZSBhIHBhcnQgb2YgYSB2YWxpZCBzZW12ZXJcbmNyZWF0ZVRva2VuKCdDT0VSQ0UnLCBgJHsnKF58W15cXFxcZF0pJyArXG4gICAgICAgICAgICAgICcoXFxcXGR7MSwnfSR7TUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSH19KWAgK1xuICAgICAgICAgICAgICBgKD86XFxcXC4oXFxcXGR7MSwke01BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEh9fSkpP2AgK1xuICAgICAgICAgICAgICBgKD86XFxcXC4oXFxcXGR7MSwke01BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEh9fSkpP2AgK1xuICAgICAgICAgICAgICBgKD86JHxbXlxcXFxkXSlgKVxuY3JlYXRlVG9rZW4oJ0NPRVJDRVJUTCcsIHNyY1t0LkNPRVJDRV0sIHRydWUpXG5cbi8vIFRpbGRlIHJhbmdlcy5cbi8vIE1lYW5pbmcgaXMgXCJyZWFzb25hYmx5IGF0IG9yIGdyZWF0ZXIgdGhhblwiXG5jcmVhdGVUb2tlbignTE9ORVRJTERFJywgJyg/On4+PyknKVxuXG5jcmVhdGVUb2tlbignVElMREVUUklNJywgYChcXFxccyopJHtzcmNbdC5MT05FVElMREVdfVxcXFxzK2AsIHRydWUpXG5leHBvcnRzLnRpbGRlVHJpbVJlcGxhY2UgPSAnJDF+J1xuXG5jcmVhdGVUb2tlbignVElMREUnLCBgXiR7c3JjW3QuTE9ORVRJTERFXX0ke3NyY1t0LlhSQU5HRVBMQUlOXX0kYClcbmNyZWF0ZVRva2VuKCdUSUxERUxPT1NFJywgYF4ke3NyY1t0LkxPTkVUSUxERV19JHtzcmNbdC5YUkFOR0VQTEFJTkxPT1NFXX0kYClcblxuLy8gQ2FyZXQgcmFuZ2VzLlxuLy8gTWVhbmluZyBpcyBcImF0IGxlYXN0IGFuZCBiYWNrd2FyZHMgY29tcGF0aWJsZSB3aXRoXCJcbmNyZWF0ZVRva2VuKCdMT05FQ0FSRVQnLCAnKD86XFxcXF4pJylcblxuY3JlYXRlVG9rZW4oJ0NBUkVUVFJJTScsIGAoXFxcXHMqKSR7c3JjW3QuTE9ORUNBUkVUXX1cXFxccytgLCB0cnVlKVxuZXhwb3J0cy5jYXJldFRyaW1SZXBsYWNlID0gJyQxXidcblxuY3JlYXRlVG9rZW4oJ0NBUkVUJywgYF4ke3NyY1t0LkxPTkVDQVJFVF19JHtzcmNbdC5YUkFOR0VQTEFJTl19JGApXG5jcmVhdGVUb2tlbignQ0FSRVRMT09TRScsIGBeJHtzcmNbdC5MT05FQ0FSRVRdfSR7c3JjW3QuWFJBTkdFUExBSU5MT09TRV19JGApXG5cbi8vIEEgc2ltcGxlIGd0L2x0L2VxIHRoaW5nLCBvciBqdXN0IFwiXCIgdG8gaW5kaWNhdGUgXCJhbnkgdmVyc2lvblwiXG5jcmVhdGVUb2tlbignQ09NUEFSQVRPUkxPT1NFJywgYF4ke3NyY1t0LkdUTFRdfVxcXFxzKigke3NyY1t0LkxPT1NFUExBSU5dfSkkfF4kYClcbmNyZWF0ZVRva2VuKCdDT01QQVJBVE9SJywgYF4ke3NyY1t0LkdUTFRdfVxcXFxzKigke3NyY1t0LkZVTExQTEFJTl19KSR8XiRgKVxuXG4vLyBBbiBleHByZXNzaW9uIHRvIHN0cmlwIGFueSB3aGl0ZXNwYWNlIGJldHdlZW4gdGhlIGd0bHQgYW5kIHRoZSB0aGluZ1xuLy8gaXQgbW9kaWZpZXMsIHNvIHRoYXQgYD4gMS4yLjNgID09PiBgPjEuMi4zYFxuY3JlYXRlVG9rZW4oJ0NPTVBBUkFUT1JUUklNJywgYChcXFxccyopJHtzcmNbdC5HVExUXVxufVxcXFxzKigke3NyY1t0LkxPT1NFUExBSU5dfXwke3NyY1t0LlhSQU5HRVBMQUlOXX0pYCwgdHJ1ZSlcbmV4cG9ydHMuY29tcGFyYXRvclRyaW1SZXBsYWNlID0gJyQxJDIkMydcblxuLy8gU29tZXRoaW5nIGxpa2UgYDEuMi4zIC0gMS4yLjRgXG4vLyBOb3RlIHRoYXQgdGhlc2UgYWxsIHVzZSB0aGUgbG9vc2UgZm9ybSwgYmVjYXVzZSB0aGV5J2xsIGJlXG4vLyBjaGVja2VkIGFnYWluc3QgZWl0aGVyIHRoZSBzdHJpY3Qgb3IgbG9vc2UgY29tcGFyYXRvciBmb3JtXG4vLyBsYXRlci5cbmNyZWF0ZVRva2VuKCdIWVBIRU5SQU5HRScsIGBeXFxcXHMqKCR7c3JjW3QuWFJBTkdFUExBSU5dfSlgICtcbiAgICAgICAgICAgICAgICAgICBgXFxcXHMrLVxcXFxzK2AgK1xuICAgICAgICAgICAgICAgICAgIGAoJHtzcmNbdC5YUkFOR0VQTEFJTl19KWAgK1xuICAgICAgICAgICAgICAgICAgIGBcXFxccyokYClcblxuY3JlYXRlVG9rZW4oJ0hZUEhFTlJBTkdFTE9PU0UnLCBgXlxcXFxzKigke3NyY1t0LlhSQU5HRVBMQUlOTE9PU0VdfSlgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBcXFxccystXFxcXHMrYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKCR7c3JjW3QuWFJBTkdFUExBSU5MT09TRV19KWAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYFxcXFxzKiRgKVxuXG4vLyBTdGFyIHJhbmdlcyBiYXNpY2FsbHkganVzdCBhbGxvdyBhbnl0aGluZyBhdCBhbGwuXG5jcmVhdGVUb2tlbignU1RBUicsICcoPHw+KT89P1xcXFxzKlxcXFwqJylcbi8vID49MC4wLjAgaXMgbGlrZSBhIHN0YXJcbmNyZWF0ZVRva2VuKCdHVEUwJywgJ15cXFxccyo+PVxcXFxzKjBcXC4wXFwuMFxcXFxzKiQnKVxuY3JlYXRlVG9rZW4oJ0dURTBQUkUnLCAnXlxcXFxzKj49XFxcXHMqMFxcLjBcXC4wLTBcXFxccyokJylcbiIsIi8vIERldGVybWluZSBpZiB2ZXJzaW9uIGlzIGdyZWF0ZXIgdGhhbiBhbGwgdGhlIHZlcnNpb25zIHBvc3NpYmxlIGluIHRoZSByYW5nZS5cbmNvbnN0IG91dHNpZGUgPSByZXF1aXJlKCcuL291dHNpZGUnKVxuY29uc3QgZ3RyID0gKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKSA9PiBvdXRzaWRlKHZlcnNpb24sIHJhbmdlLCAnPicsIG9wdGlvbnMpXG5tb2R1bGUuZXhwb3J0cyA9IGd0clxuIiwiY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlJylcbmNvbnN0IGludGVyc2VjdHMgPSAocjEsIHIyLCBvcHRpb25zKSA9PiB7XG4gIHIxID0gbmV3IFJhbmdlKHIxLCBvcHRpb25zKVxuICByMiA9IG5ldyBSYW5nZShyMiwgb3B0aW9ucylcbiAgcmV0dXJuIHIxLmludGVyc2VjdHMocjIpXG59XG5tb2R1bGUuZXhwb3J0cyA9IGludGVyc2VjdHNcbiIsImNvbnN0IG91dHNpZGUgPSByZXF1aXJlKCcuL291dHNpZGUnKVxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgbGVzcyB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlXG5jb25zdCBsdHIgPSAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpID0+IG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc8Jywgb3B0aW9ucylcbm1vZHVsZS5leHBvcnRzID0gbHRyXG4iLCJjb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuXG5jb25zdCBtYXhTYXRpc2Z5aW5nID0gKHZlcnNpb25zLCByYW5nZSwgb3B0aW9ucykgPT4ge1xuICBsZXQgbWF4ID0gbnVsbFxuICBsZXQgbWF4U1YgPSBudWxsXG4gIGxldCByYW5nZU9iaiA9IG51bGxcbiAgdHJ5IHtcbiAgICByYW5nZU9iaiA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHZlcnNpb25zLmZvckVhY2goKHYpID0+IHtcbiAgICBpZiAocmFuZ2VPYmoudGVzdCh2KSkge1xuICAgICAgLy8gc2F0aXNmaWVzKHYsIHJhbmdlLCBvcHRpb25zKVxuICAgICAgaWYgKCFtYXggfHwgbWF4U1YuY29tcGFyZSh2KSA9PT0gLTEpIHtcbiAgICAgICAgLy8gY29tcGFyZShtYXgsIHYsIHRydWUpXG4gICAgICAgIG1heCA9IHZcbiAgICAgICAgbWF4U1YgPSBuZXcgU2VtVmVyKG1heCwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBtYXhcbn1cbm1vZHVsZS5leHBvcnRzID0gbWF4U2F0aXNmeWluZ1xuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlJylcbmNvbnN0IG1pblNhdGlzZnlpbmcgPSAodmVyc2lvbnMsIHJhbmdlLCBvcHRpb25zKSA9PiB7XG4gIGxldCBtaW4gPSBudWxsXG4gIGxldCBtaW5TViA9IG51bGxcbiAgbGV0IHJhbmdlT2JqID0gbnVsbFxuICB0cnkge1xuICAgIHJhbmdlT2JqID0gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgdmVyc2lvbnMuZm9yRWFjaCgodikgPT4ge1xuICAgIGlmIChyYW5nZU9iai50ZXN0KHYpKSB7XG4gICAgICAvLyBzYXRpc2ZpZXModiwgcmFuZ2UsIG9wdGlvbnMpXG4gICAgICBpZiAoIW1pbiB8fCBtaW5TVi5jb21wYXJlKHYpID09PSAxKSB7XG4gICAgICAgIC8vIGNvbXBhcmUobWluLCB2LCB0cnVlKVxuICAgICAgICBtaW4gPSB2XG4gICAgICAgIG1pblNWID0gbmV3IFNlbVZlcihtaW4sIG9wdGlvbnMpXG4gICAgICB9XG4gICAgfVxuICB9KVxuICByZXR1cm4gbWluXG59XG5tb2R1bGUuZXhwb3J0cyA9IG1pblNhdGlzZnlpbmdcbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5jb25zdCBndCA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9ndCcpXG5cbmNvbnN0IG1pblZlcnNpb24gPSAocmFuZ2UsIGxvb3NlKSA9PiB7XG4gIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSlcblxuICBsZXQgbWludmVyID0gbmV3IFNlbVZlcignMC4wLjAnKVxuICBpZiAocmFuZ2UudGVzdChtaW52ZXIpKSB7XG4gICAgcmV0dXJuIG1pbnZlclxuICB9XG5cbiAgbWludmVyID0gbmV3IFNlbVZlcignMC4wLjAtMCcpXG4gIGlmIChyYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICBtaW52ZXIgPSBudWxsXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZ2Uuc2V0Lmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgY29tcGFyYXRvcnMgPSByYW5nZS5zZXRbaV1cblxuICAgIGxldCBzZXRNaW4gPSBudWxsXG4gICAgY29tcGFyYXRvcnMuZm9yRWFjaCgoY29tcGFyYXRvcikgPT4ge1xuICAgICAgLy8gQ2xvbmUgdG8gYXZvaWQgbWFuaXB1bGF0aW5nIHRoZSBjb21wYXJhdG9yJ3Mgc2VtdmVyIG9iamVjdC5cbiAgICAgIGNvbnN0IGNvbXB2ZXIgPSBuZXcgU2VtVmVyKGNvbXBhcmF0b3Iuc2VtdmVyLnZlcnNpb24pXG4gICAgICBzd2l0Y2ggKGNvbXBhcmF0b3Iub3BlcmF0b3IpIHtcbiAgICAgICAgY2FzZSAnPic6XG4gICAgICAgICAgaWYgKGNvbXB2ZXIucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbXB2ZXIucGF0Y2grK1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wdmVyLnByZXJlbGVhc2UucHVzaCgwKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb21wdmVyLnJhdyA9IGNvbXB2ZXIuZm9ybWF0KClcbiAgICAgICAgICAvKiBmYWxsdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICcnOlxuICAgICAgICBjYXNlICc+PSc6XG4gICAgICAgICAgaWYgKCFzZXRNaW4gfHwgZ3QoY29tcHZlciwgc2V0TWluKSkge1xuICAgICAgICAgICAgc2V0TWluID0gY29tcHZlclxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgY2FzZSAnPD0nOlxuICAgICAgICAgIC8qIElnbm9yZSBtYXhpbXVtIHZlcnNpb25zICovXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgb3BlcmF0aW9uOiAke2NvbXBhcmF0b3Iub3BlcmF0b3J9YClcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChzZXRNaW4gJiYgKCFtaW52ZXIgfHwgZ3QobWludmVyLCBzZXRNaW4pKSlcbiAgICAgIG1pbnZlciA9IHNldE1pblxuICB9XG5cbiAgaWYgKG1pbnZlciAmJiByYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxubW9kdWxlLmV4cG9ydHMgPSBtaW5WZXJzaW9uXG4iLCJjb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBDb21wYXJhdG9yID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9jb21wYXJhdG9yJylcbmNvbnN0IHtBTll9ID0gQ29tcGFyYXRvclxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlJylcbmNvbnN0IHNhdGlzZmllcyA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9zYXRpc2ZpZXMnKVxuY29uc3QgZ3QgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvZ3QnKVxuY29uc3QgbHQgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvbHQnKVxuY29uc3QgbHRlID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2x0ZScpXG5jb25zdCBndGUgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvZ3RlJylcblxuY29uc3Qgb3V0c2lkZSA9ICh2ZXJzaW9uLCByYW5nZSwgaGlsbywgb3B0aW9ucykgPT4ge1xuICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKVxuICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcblxuICBsZXQgZ3RmbiwgbHRlZm4sIGx0Zm4sIGNvbXAsIGVjb21wXG4gIHN3aXRjaCAoaGlsbykge1xuICAgIGNhc2UgJz4nOlxuICAgICAgZ3RmbiA9IGd0XG4gICAgICBsdGVmbiA9IGx0ZVxuICAgICAgbHRmbiA9IGx0XG4gICAgICBjb21wID0gJz4nXG4gICAgICBlY29tcCA9ICc+PSdcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnPCc6XG4gICAgICBndGZuID0gbHRcbiAgICAgIGx0ZWZuID0gZ3RlXG4gICAgICBsdGZuID0gZ3RcbiAgICAgIGNvbXAgPSAnPCdcbiAgICAgIGVjb21wID0gJzw9J1xuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBwcm92aWRlIGEgaGlsbyB2YWwgb2YgXCI8XCIgb3IgXCI+XCInKVxuICB9XG5cbiAgLy8gSWYgaXQgc2F0aXNmaWVzIHRoZSByYW5nZSBpdCBpcyBub3Qgb3V0c2lkZVxuICBpZiAoc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gRnJvbSBub3cgb24sIHZhcmlhYmxlIHRlcm1zIGFyZSBhcyBpZiB3ZSdyZSBpbiBcImd0clwiIG1vZGUuXG4gIC8vIGJ1dCBub3RlIHRoYXQgZXZlcnl0aGluZyBpcyBmbGlwcGVkIGZvciB0aGUgXCJsdHJcIiBmdW5jdGlvbi5cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmdlLnNldC5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGNvbXBhcmF0b3JzID0gcmFuZ2Uuc2V0W2ldXG5cbiAgICBsZXQgaGlnaCA9IG51bGxcbiAgICBsZXQgbG93ID0gbnVsbFxuXG4gICAgY29tcGFyYXRvcnMuZm9yRWFjaCgoY29tcGFyYXRvcikgPT4ge1xuICAgICAgaWYgKGNvbXBhcmF0b3Iuc2VtdmVyID09PSBBTlkpIHtcbiAgICAgICAgY29tcGFyYXRvciA9IG5ldyBDb21wYXJhdG9yKCc+PTAuMC4wJylcbiAgICAgIH1cbiAgICAgIGhpZ2ggPSBoaWdoIHx8IGNvbXBhcmF0b3JcbiAgICAgIGxvdyA9IGxvdyB8fCBjb21wYXJhdG9yXG4gICAgICBpZiAoZ3Rmbihjb21wYXJhdG9yLnNlbXZlciwgaGlnaC5zZW12ZXIsIG9wdGlvbnMpKSB7XG4gICAgICAgIGhpZ2ggPSBjb21wYXJhdG9yXG4gICAgICB9IGVsc2UgaWYgKGx0Zm4oY29tcGFyYXRvci5zZW12ZXIsIGxvdy5zZW12ZXIsIG9wdGlvbnMpKSB7XG4gICAgICAgIGxvdyA9IGNvbXBhcmF0b3JcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gSWYgdGhlIGVkZ2UgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhIG9wZXJhdG9yIHRoZW4gb3VyIHZlcnNpb25cbiAgICAvLyBpc24ndCBvdXRzaWRlIGl0XG4gICAgaWYgKGhpZ2gub3BlcmF0b3IgPT09IGNvbXAgfHwgaGlnaC5vcGVyYXRvciA9PT0gZWNvbXApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIElmIHRoZSBsb3dlc3QgdmVyc2lvbiBjb21wYXJhdG9yIGhhcyBhbiBvcGVyYXRvciBhbmQgb3VyIHZlcnNpb25cbiAgICAvLyBpcyBsZXNzIHRoYW4gaXQgdGhlbiBpdCBpc24ndCBoaWdoZXIgdGhhbiB0aGUgcmFuZ2VcbiAgICBpZiAoKCFsb3cub3BlcmF0b3IgfHwgbG93Lm9wZXJhdG9yID09PSBjb21wKSAmJlxuICAgICAgICBsdGVmbih2ZXJzaW9uLCBsb3cuc2VtdmVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIGlmIChsb3cub3BlcmF0b3IgPT09IGVjb21wICYmIGx0Zm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG91dHNpZGVcbiIsIi8vIGdpdmVuIGEgc2V0IG9mIHZlcnNpb25zIGFuZCBhIHJhbmdlLCBjcmVhdGUgYSBcInNpbXBsaWZpZWRcIiByYW5nZVxuLy8gdGhhdCBpbmNsdWRlcyB0aGUgc2FtZSB2ZXJzaW9ucyB0aGF0IHRoZSBvcmlnaW5hbCByYW5nZSBkb2VzXG4vLyBJZiB0aGUgb3JpZ2luYWwgcmFuZ2UgaXMgc2hvcnRlciB0aGFuIHRoZSBzaW1wbGlmaWVkIG9uZSwgcmV0dXJuIHRoYXQuXG5jb25zdCBzYXRpc2ZpZXMgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvc2F0aXNmaWVzLmpzJylcbmNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvY29tcGFyZS5qcycpXG5tb2R1bGUuZXhwb3J0cyA9ICh2ZXJzaW9ucywgcmFuZ2UsIG9wdGlvbnMpID0+IHtcbiAgY29uc3Qgc2V0ID0gW11cbiAgbGV0IG1pbiA9IG51bGxcbiAgbGV0IHByZXYgPSBudWxsXG4gIGNvbnN0IHYgPSB2ZXJzaW9ucy5zb3J0KChhLCBiKSA9PiBjb21wYXJlKGEsIGIsIG9wdGlvbnMpKVxuICBmb3IgKGNvbnN0IHZlcnNpb24gb2Ygdikge1xuICAgIGNvbnN0IGluY2x1ZGVkID0gc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKVxuICAgIGlmIChpbmNsdWRlZCkge1xuICAgICAgcHJldiA9IHZlcnNpb25cbiAgICAgIGlmICghbWluKVxuICAgICAgICBtaW4gPSB2ZXJzaW9uXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgIHNldC5wdXNoKFttaW4sIHByZXZdKVxuICAgICAgfVxuICAgICAgcHJldiA9IG51bGxcbiAgICAgIG1pbiA9IG51bGxcbiAgICB9XG4gIH1cbiAgaWYgKG1pbilcbiAgICBzZXQucHVzaChbbWluLCBudWxsXSlcblxuICBjb25zdCByYW5nZXMgPSBbXVxuICBmb3IgKGNvbnN0IFttaW4sIG1heF0gb2Ygc2V0KSB7XG4gICAgaWYgKG1pbiA9PT0gbWF4KVxuICAgICAgcmFuZ2VzLnB1c2gobWluKVxuICAgIGVsc2UgaWYgKCFtYXggJiYgbWluID09PSB2WzBdKVxuICAgICAgcmFuZ2VzLnB1c2goJyonKVxuICAgIGVsc2UgaWYgKCFtYXgpXG4gICAgICByYW5nZXMucHVzaChgPj0ke21pbn1gKVxuICAgIGVsc2UgaWYgKG1pbiA9PT0gdlswXSlcbiAgICAgIHJhbmdlcy5wdXNoKGA8PSR7bWF4fWApXG4gICAgZWxzZVxuICAgICAgcmFuZ2VzLnB1c2goYCR7bWlufSAtICR7bWF4fWApXG4gIH1cbiAgY29uc3Qgc2ltcGxpZmllZCA9IHJhbmdlcy5qb2luKCcgfHwgJylcbiAgY29uc3Qgb3JpZ2luYWwgPSB0eXBlb2YgcmFuZ2UucmF3ID09PSAnc3RyaW5nJyA/IHJhbmdlLnJhdyA6IFN0cmluZyhyYW5nZSlcbiAgcmV0dXJuIHNpbXBsaWZpZWQubGVuZ3RoIDwgb3JpZ2luYWwubGVuZ3RoID8gc2ltcGxpZmllZCA6IHJhbmdlXG59XG4iLCJjb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UuanMnKVxuY29uc3QgQ29tcGFyYXRvciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvY29tcGFyYXRvci5qcycpXG5jb25zdCB7IEFOWSB9ID0gQ29tcGFyYXRvclxuY29uc3Qgc2F0aXNmaWVzID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL3NhdGlzZmllcy5qcycpXG5jb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2NvbXBhcmUuanMnKVxuXG4vLyBDb21wbGV4IHJhbmdlIGByMSB8fCByMiB8fCAuLi5gIGlzIGEgc3Vic2V0IG9mIGBSMSB8fCBSMiB8fCAuLi5gIGlmZjpcbi8vIC0gRXZlcnkgc2ltcGxlIHJhbmdlIGByMSwgcjIsIC4uLmAgaXMgYSBudWxsIHNldCwgT1Jcbi8vIC0gRXZlcnkgc2ltcGxlIHJhbmdlIGByMSwgcjIsIC4uLmAgd2hpY2ggaXMgbm90IGEgbnVsbCBzZXQgaXMgYSBzdWJzZXQgb2Zcbi8vICAgc29tZSBgUjEsIFIyLCAuLi5gXG4vL1xuLy8gU2ltcGxlIHJhbmdlIGBjMSBjMiAuLi5gIGlzIGEgc3Vic2V0IG9mIHNpbXBsZSByYW5nZSBgQzEgQzIgLi4uYCBpZmY6XG4vLyAtIElmIGMgaXMgb25seSB0aGUgQU5ZIGNvbXBhcmF0b3Jcbi8vICAgLSBJZiBDIGlzIG9ubHkgdGhlIEFOWSBjb21wYXJhdG9yLCByZXR1cm4gdHJ1ZVxuLy8gICAtIEVsc2UgaWYgaW4gcHJlcmVsZWFzZSBtb2RlLCByZXR1cm4gZmFsc2Vcbi8vICAgLSBlbHNlIHJlcGxhY2UgYyB3aXRoIGBbPj0wLjAuMF1gXG4vLyAtIElmIEMgaXMgb25seSB0aGUgQU5ZIGNvbXBhcmF0b3Jcbi8vICAgLSBpZiBpbiBwcmVyZWxlYXNlIG1vZGUsIHJldHVybiB0cnVlXG4vLyAgIC0gZWxzZSByZXBsYWNlIEMgd2l0aCBgWz49MC4wLjBdYFxuLy8gLSBMZXQgRVEgYmUgdGhlIHNldCBvZiA9IGNvbXBhcmF0b3JzIGluIGNcbi8vIC0gSWYgRVEgaXMgbW9yZSB0aGFuIG9uZSwgcmV0dXJuIHRydWUgKG51bGwgc2V0KVxuLy8gLSBMZXQgR1QgYmUgdGhlIGhpZ2hlc3QgPiBvciA+PSBjb21wYXJhdG9yIGluIGNcbi8vIC0gTGV0IExUIGJlIHRoZSBsb3dlc3QgPCBvciA8PSBjb21wYXJhdG9yIGluIGNcbi8vIC0gSWYgR1QgYW5kIExULCBhbmQgR1Quc2VtdmVyID4gTFQuc2VtdmVyLCByZXR1cm4gdHJ1ZSAobnVsbCBzZXQpXG4vLyAtIElmIGFueSBDIGlzIGEgPSByYW5nZSwgYW5kIEdUIG9yIExUIGFyZSBzZXQsIHJldHVybiBmYWxzZVxuLy8gLSBJZiBFUVxuLy8gICAtIElmIEdULCBhbmQgRVEgZG9lcyBub3Qgc2F0aXNmeSBHVCwgcmV0dXJuIHRydWUgKG51bGwgc2V0KVxuLy8gICAtIElmIExULCBhbmQgRVEgZG9lcyBub3Qgc2F0aXNmeSBMVCwgcmV0dXJuIHRydWUgKG51bGwgc2V0KVxuLy8gICAtIElmIEVRIHNhdGlzZmllcyBldmVyeSBDLCByZXR1cm4gdHJ1ZVxuLy8gICAtIEVsc2UgcmV0dXJuIGZhbHNlXG4vLyAtIElmIEdUXG4vLyAgIC0gSWYgR1Quc2VtdmVyIGlzIGxvd2VyIHRoYW4gYW55ID4gb3IgPj0gY29tcCBpbiBDLCByZXR1cm4gZmFsc2Vcbi8vICAgLSBJZiBHVCBpcyA+PSwgYW5kIEdULnNlbXZlciBkb2VzIG5vdCBzYXRpc2Z5IGV2ZXJ5IEMsIHJldHVybiBmYWxzZVxuLy8gICAtIElmIEdULnNlbXZlciBoYXMgYSBwcmVyZWxlYXNlLCBhbmQgbm90IGluIHByZXJlbGVhc2UgbW9kZVxuLy8gICAgIC0gSWYgbm8gQyBoYXMgYSBwcmVyZWxlYXNlIGFuZCB0aGUgR1Quc2VtdmVyIHR1cGxlLCByZXR1cm4gZmFsc2Vcbi8vIC0gSWYgTFRcbi8vICAgLSBJZiBMVC5zZW12ZXIgaXMgZ3JlYXRlciB0aGFuIGFueSA8IG9yIDw9IGNvbXAgaW4gQywgcmV0dXJuIGZhbHNlXG4vLyAgIC0gSWYgTFQgaXMgPD0sIGFuZCBMVC5zZW12ZXIgZG9lcyBub3Qgc2F0aXNmeSBldmVyeSBDLCByZXR1cm4gZmFsc2Vcbi8vICAgLSBJZiBHVC5zZW12ZXIgaGFzIGEgcHJlcmVsZWFzZSwgYW5kIG5vdCBpbiBwcmVyZWxlYXNlIG1vZGVcbi8vICAgICAtIElmIG5vIEMgaGFzIGEgcHJlcmVsZWFzZSBhbmQgdGhlIExULnNlbXZlciB0dXBsZSwgcmV0dXJuIGZhbHNlXG4vLyAtIEVsc2UgcmV0dXJuIHRydWVcblxuY29uc3Qgc3Vic2V0ID0gKHN1YiwgZG9tLCBvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKHN1YiA9PT0gZG9tKVxuICAgIHJldHVybiB0cnVlXG5cbiAgc3ViID0gbmV3IFJhbmdlKHN1Yiwgb3B0aW9ucylcbiAgZG9tID0gbmV3IFJhbmdlKGRvbSwgb3B0aW9ucylcbiAgbGV0IHNhd05vbk51bGwgPSBmYWxzZVxuXG4gIE9VVEVSOiBmb3IgKGNvbnN0IHNpbXBsZVN1YiBvZiBzdWIuc2V0KSB7XG4gICAgZm9yIChjb25zdCBzaW1wbGVEb20gb2YgZG9tLnNldCkge1xuICAgICAgY29uc3QgaXNTdWIgPSBzaW1wbGVTdWJzZXQoc2ltcGxlU3ViLCBzaW1wbGVEb20sIG9wdGlvbnMpXG4gICAgICBzYXdOb25OdWxsID0gc2F3Tm9uTnVsbCB8fCBpc1N1YiAhPT0gbnVsbFxuICAgICAgaWYgKGlzU3ViKVxuICAgICAgICBjb250aW51ZSBPVVRFUlxuICAgIH1cbiAgICAvLyB0aGUgbnVsbCBzZXQgaXMgYSBzdWJzZXQgb2YgZXZlcnl0aGluZywgYnV0IG51bGwgc2ltcGxlIHJhbmdlcyBpblxuICAgIC8vIGEgY29tcGxleCByYW5nZSBzaG91bGQgYmUgaWdub3JlZC4gIHNvIGlmIHdlIHNhdyBhIG5vbi1udWxsIHJhbmdlLFxuICAgIC8vIHRoZW4gd2Uga25vdyB0aGlzIGlzbid0IGEgc3Vic2V0LCBidXQgaWYgRVZFUlkgc2ltcGxlIHJhbmdlIHdhcyBudWxsLFxuICAgIC8vIHRoZW4gaXQgaXMgYSBzdWJzZXQuXG4gICAgaWYgKHNhd05vbk51bGwpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCBzaW1wbGVTdWJzZXQgPSAoc3ViLCBkb20sIG9wdGlvbnMpID0+IHtcbiAgaWYgKHN1YiA9PT0gZG9tKVxuICAgIHJldHVybiB0cnVlXG5cbiAgaWYgKHN1Yi5sZW5ndGggPT09IDEgJiYgc3ViWzBdLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgaWYgKGRvbS5sZW5ndGggPT09IDEgJiYgZG9tWzBdLnNlbXZlciA9PT0gQU5ZKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICBlbHNlIGlmIChvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlKVxuICAgICAgc3ViID0gWyBuZXcgQ29tcGFyYXRvcignPj0wLjAuMC0wJykgXVxuICAgIGVsc2VcbiAgICAgIHN1YiA9IFsgbmV3IENvbXBhcmF0b3IoJz49MC4wLjAnKSBdXG4gIH1cblxuICBpZiAoZG9tLmxlbmd0aCA9PT0gMSAmJiBkb21bMF0uc2VtdmVyID09PSBBTlkpIHtcbiAgICBpZiAob3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSlcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZWxzZVxuICAgICAgZG9tID0gWyBuZXcgQ29tcGFyYXRvcignPj0wLjAuMCcpIF1cbiAgfVxuXG4gIGNvbnN0IGVxU2V0ID0gbmV3IFNldCgpXG4gIGxldCBndCwgbHRcbiAgZm9yIChjb25zdCBjIG9mIHN1Yikge1xuICAgIGlmIChjLm9wZXJhdG9yID09PSAnPicgfHwgYy5vcGVyYXRvciA9PT0gJz49JylcbiAgICAgIGd0ID0gaGlnaGVyR1QoZ3QsIGMsIG9wdGlvbnMpXG4gICAgZWxzZSBpZiAoYy5vcGVyYXRvciA9PT0gJzwnIHx8IGMub3BlcmF0b3IgPT09ICc8PScpXG4gICAgICBsdCA9IGxvd2VyTFQobHQsIGMsIG9wdGlvbnMpXG4gICAgZWxzZVxuICAgICAgZXFTZXQuYWRkKGMuc2VtdmVyKVxuICB9XG5cbiAgaWYgKGVxU2V0LnNpemUgPiAxKVxuICAgIHJldHVybiBudWxsXG5cbiAgbGV0IGd0bHRDb21wXG4gIGlmIChndCAmJiBsdCkge1xuICAgIGd0bHRDb21wID0gY29tcGFyZShndC5zZW12ZXIsIGx0LnNlbXZlciwgb3B0aW9ucylcbiAgICBpZiAoZ3RsdENvbXAgPiAwKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICBlbHNlIGlmIChndGx0Q29tcCA9PT0gMCAmJiAoZ3Qub3BlcmF0b3IgIT09ICc+PScgfHwgbHQub3BlcmF0b3IgIT09ICc8PScpKVxuICAgICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIC8vIHdpbGwgaXRlcmF0ZSBvbmUgb3IgemVybyB0aW1lc1xuICBmb3IgKGNvbnN0IGVxIG9mIGVxU2V0KSB7XG4gICAgaWYgKGd0ICYmICFzYXRpc2ZpZXMoZXEsIFN0cmluZyhndCksIG9wdGlvbnMpKVxuICAgICAgcmV0dXJuIG51bGxcblxuICAgIGlmIChsdCAmJiAhc2F0aXNmaWVzKGVxLCBTdHJpbmcobHQpLCBvcHRpb25zKSlcbiAgICAgIHJldHVybiBudWxsXG5cbiAgICBmb3IgKGNvbnN0IGMgb2YgZG9tKSB7XG4gICAgICBpZiAoIXNhdGlzZmllcyhlcSwgU3RyaW5nKGMpLCBvcHRpb25zKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGxldCBoaWdoZXIsIGxvd2VyXG4gIGxldCBoYXNEb21MVCwgaGFzRG9tR1RcbiAgLy8gaWYgdGhlIHN1YnNldCBoYXMgYSBwcmVyZWxlYXNlLCB3ZSBuZWVkIGEgY29tcGFyYXRvciBpbiB0aGUgc3VwZXJzZXRcbiAgLy8gd2l0aCB0aGUgc2FtZSB0dXBsZSBhbmQgYSBwcmVyZWxlYXNlLCBvciBpdCdzIG5vdCBhIHN1YnNldFxuICBsZXQgbmVlZERvbUxUUHJlID0gbHQgJiZcbiAgICAhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSAmJlxuICAgIGx0LnNlbXZlci5wcmVyZWxlYXNlLmxlbmd0aCA/IGx0LnNlbXZlciA6IGZhbHNlXG4gIGxldCBuZWVkRG9tR1RQcmUgPSBndCAmJlxuICAgICFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlICYmXG4gICAgZ3Quc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoID8gZ3Quc2VtdmVyIDogZmFsc2VcbiAgLy8gZXhjZXB0aW9uOiA8MS4yLjMtMCBpcyB0aGUgc2FtZSBhcyA8MS4yLjNcbiAgaWYgKG5lZWREb21MVFByZSAmJiBuZWVkRG9tTFRQcmUucHJlcmVsZWFzZS5sZW5ndGggPT09IDEgJiZcbiAgICAgIGx0Lm9wZXJhdG9yID09PSAnPCcgJiYgbmVlZERvbUxUUHJlLnByZXJlbGVhc2VbMF0gPT09IDApIHtcbiAgICBuZWVkRG9tTFRQcmUgPSBmYWxzZVxuICB9XG5cbiAgZm9yIChjb25zdCBjIG9mIGRvbSkge1xuICAgIGhhc0RvbUdUID0gaGFzRG9tR1QgfHwgYy5vcGVyYXRvciA9PT0gJz4nIHx8IGMub3BlcmF0b3IgPT09ICc+PSdcbiAgICBoYXNEb21MVCA9IGhhc0RvbUxUIHx8IGMub3BlcmF0b3IgPT09ICc8JyB8fCBjLm9wZXJhdG9yID09PSAnPD0nXG4gICAgaWYgKGd0KSB7XG4gICAgICBpZiAobmVlZERvbUdUUHJlKSB7XG4gICAgICAgIGlmIChjLnNlbXZlci5wcmVyZWxlYXNlICYmIGMuc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoICYmXG4gICAgICAgICAgICBjLnNlbXZlci5tYWpvciA9PT0gbmVlZERvbUdUUHJlLm1ham9yICYmXG4gICAgICAgICAgICBjLnNlbXZlci5taW5vciA9PT0gbmVlZERvbUdUUHJlLm1pbm9yICYmXG4gICAgICAgICAgICBjLnNlbXZlci5wYXRjaCA9PT0gbmVlZERvbUdUUHJlLnBhdGNoKSB7XG4gICAgICAgICAgbmVlZERvbUdUUHJlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGMub3BlcmF0b3IgPT09ICc+JyB8fCBjLm9wZXJhdG9yID09PSAnPj0nKSB7XG4gICAgICAgIGhpZ2hlciA9IGhpZ2hlckdUKGd0LCBjLCBvcHRpb25zKVxuICAgICAgICBpZiAoaGlnaGVyID09PSBjICYmIGhpZ2hlciAhPT0gZ3QpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9IGVsc2UgaWYgKGd0Lm9wZXJhdG9yID09PSAnPj0nICYmICFzYXRpc2ZpZXMoZ3Quc2VtdmVyLCBTdHJpbmcoYyksIG9wdGlvbnMpKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKGx0KSB7XG4gICAgICBpZiAobmVlZERvbUxUUHJlKSB7XG4gICAgICAgIGlmIChjLnNlbXZlci5wcmVyZWxlYXNlICYmIGMuc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoICYmXG4gICAgICAgICAgICBjLnNlbXZlci5tYWpvciA9PT0gbmVlZERvbUxUUHJlLm1ham9yICYmXG4gICAgICAgICAgICBjLnNlbXZlci5taW5vciA9PT0gbmVlZERvbUxUUHJlLm1pbm9yICYmXG4gICAgICAgICAgICBjLnNlbXZlci5wYXRjaCA9PT0gbmVlZERvbUxUUHJlLnBhdGNoKSB7XG4gICAgICAgICAgbmVlZERvbUxUUHJlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGMub3BlcmF0b3IgPT09ICc8JyB8fCBjLm9wZXJhdG9yID09PSAnPD0nKSB7XG4gICAgICAgIGxvd2VyID0gbG93ZXJMVChsdCwgYywgb3B0aW9ucylcbiAgICAgICAgaWYgKGxvd2VyID09PSBjICYmIGxvd2VyICE9PSBsdClcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0gZWxzZSBpZiAobHQub3BlcmF0b3IgPT09ICc8PScgJiYgIXNhdGlzZmllcyhsdC5zZW12ZXIsIFN0cmluZyhjKSwgb3B0aW9ucykpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAoIWMub3BlcmF0b3IgJiYgKGx0IHx8IGd0KSAmJiBndGx0Q29tcCAhPT0gMClcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gaWYgdGhlcmUgd2FzIGEgPCBvciA+LCBhbmQgbm90aGluZyBpbiB0aGUgZG9tLCB0aGVuIG11c3QgYmUgZmFsc2VcbiAgLy8gVU5MRVNTIGl0IHdhcyBsaW1pdGVkIGJ5IGFub3RoZXIgcmFuZ2UgaW4gdGhlIG90aGVyIGRpcmVjdGlvbi5cbiAgLy8gRWcsID4xLjAuMCA8MS4wLjEgaXMgc3RpbGwgYSBzdWJzZXQgb2YgPDIuMC4wXG4gIGlmIChndCAmJiBoYXNEb21MVCAmJiAhbHQgJiYgZ3RsdENvbXAgIT09IDApXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgaWYgKGx0ICYmIGhhc0RvbUdUICYmICFndCAmJiBndGx0Q29tcCAhPT0gMClcbiAgICByZXR1cm4gZmFsc2VcblxuICAvLyB3ZSBuZWVkZWQgYSBwcmVyZWxlYXNlIHJhbmdlIGluIGEgc3BlY2lmaWMgdHVwbGUsIGJ1dCBkaWRuJ3QgZ2V0IG9uZVxuICAvLyB0aGVuIHRoaXMgaXNuJ3QgYSBzdWJzZXQuICBlZyA+PTEuMi4zLXByZSBpcyBub3QgYSBzdWJzZXQgb2YgPj0xLjAuMCxcbiAgLy8gYmVjYXVzZSBpdCBpbmNsdWRlcyBwcmVyZWxlYXNlcyBpbiB0aGUgMS4yLjMgdHVwbGVcbiAgaWYgKG5lZWREb21HVFByZSB8fCBuZWVkRG9tTFRQcmUpXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgcmV0dXJuIHRydWVcbn1cblxuLy8gPj0xLjIuMyBpcyBsb3dlciB0aGFuID4xLjIuM1xuY29uc3QgaGlnaGVyR1QgPSAoYSwgYiwgb3B0aW9ucykgPT4ge1xuICBpZiAoIWEpXG4gICAgcmV0dXJuIGJcbiAgY29uc3QgY29tcCA9IGNvbXBhcmUoYS5zZW12ZXIsIGIuc2VtdmVyLCBvcHRpb25zKVxuICByZXR1cm4gY29tcCA+IDAgPyBhXG4gICAgOiBjb21wIDwgMCA/IGJcbiAgICA6IGIub3BlcmF0b3IgPT09ICc+JyAmJiBhLm9wZXJhdG9yID09PSAnPj0nID8gYlxuICAgIDogYVxufVxuXG4vLyA8PTEuMi4zIGlzIGhpZ2hlciB0aGFuIDwxLjIuM1xuY29uc3QgbG93ZXJMVCA9IChhLCBiLCBvcHRpb25zKSA9PiB7XG4gIGlmICghYSlcbiAgICByZXR1cm4gYlxuICBjb25zdCBjb21wID0gY29tcGFyZShhLnNlbXZlciwgYi5zZW12ZXIsIG9wdGlvbnMpXG4gIHJldHVybiBjb21wIDwgMCA/IGFcbiAgICA6IGNvbXAgPiAwID8gYlxuICAgIDogYi5vcGVyYXRvciA9PT0gJzwnICYmIGEub3BlcmF0b3IgPT09ICc8PScgPyBiXG4gICAgOiBhXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3Vic2V0XG4iLCJjb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuXG4vLyBNb3N0bHkganVzdCBmb3IgdGVzdGluZyBhbmQgbGVnYWN5IEFQSSByZWFzb25zXG5jb25zdCB0b0NvbXBhcmF0b3JzID0gKHJhbmdlLCBvcHRpb25zKSA9PlxuICBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpLnNldFxuICAgIC5tYXAoY29tcCA9PiBjb21wLm1hcChjID0+IGMudmFsdWUpLmpvaW4oJyAnKS50cmltKCkuc3BsaXQoJyAnKSlcblxubW9kdWxlLmV4cG9ydHMgPSB0b0NvbXBhcmF0b3JzXG4iLCJjb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuY29uc3QgdmFsaWRSYW5nZSA9IChyYW5nZSwgb3B0aW9ucykgPT4ge1xuICB0cnkge1xuICAgIC8vIFJldHVybiAnKicgaW5zdGVhZCBvZiAnJyBzbyB0aGF0IHRydXRoaW5lc3Mgd29ya3MuXG4gICAgLy8gVGhpcyB3aWxsIHRocm93IGlmIGl0J3MgaW52YWxpZCBhbnl3YXlcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKS5yYW5nZSB8fCAnKidcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHZhbGlkUmFuZ2VcbiIsIid1c2Ugc3RyaWN0J1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoWWFsbGlzdCkge1xuICBZYWxsaXN0LnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24qICgpIHtcbiAgICBmb3IgKGxldCB3YWxrZXIgPSB0aGlzLmhlYWQ7IHdhbGtlcjsgd2Fsa2VyID0gd2Fsa2VyLm5leHQpIHtcbiAgICAgIHlpZWxkIHdhbGtlci52YWx1ZVxuICAgIH1cbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5tb2R1bGUuZXhwb3J0cyA9IFlhbGxpc3RcblxuWWFsbGlzdC5Ob2RlID0gTm9kZVxuWWFsbGlzdC5jcmVhdGUgPSBZYWxsaXN0XG5cbmZ1bmN0aW9uIFlhbGxpc3QgKGxpc3QpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIGlmICghKHNlbGYgaW5zdGFuY2VvZiBZYWxsaXN0KSkge1xuICAgIHNlbGYgPSBuZXcgWWFsbGlzdCgpXG4gIH1cblxuICBzZWxmLnRhaWwgPSBudWxsXG4gIHNlbGYuaGVhZCA9IG51bGxcbiAgc2VsZi5sZW5ndGggPSAwXG5cbiAgaWYgKGxpc3QgJiYgdHlwZW9mIGxpc3QuZm9yRWFjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgc2VsZi5wdXNoKGl0ZW0pXG4gICAgfSlcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgc2VsZi5wdXNoKGFyZ3VtZW50c1tpXSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2VsZlxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5yZW1vdmVOb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgaWYgKG5vZGUubGlzdCAhPT0gdGhpcykge1xuICAgIHRocm93IG5ldyBFcnJvcigncmVtb3Zpbmcgbm9kZSB3aGljaCBkb2VzIG5vdCBiZWxvbmcgdG8gdGhpcyBsaXN0JylcbiAgfVxuXG4gIHZhciBuZXh0ID0gbm9kZS5uZXh0XG4gIHZhciBwcmV2ID0gbm9kZS5wcmV2XG5cbiAgaWYgKG5leHQpIHtcbiAgICBuZXh0LnByZXYgPSBwcmV2XG4gIH1cblxuICBpZiAocHJldikge1xuICAgIHByZXYubmV4dCA9IG5leHRcbiAgfVxuXG4gIGlmIChub2RlID09PSB0aGlzLmhlYWQpIHtcbiAgICB0aGlzLmhlYWQgPSBuZXh0XG4gIH1cbiAgaWYgKG5vZGUgPT09IHRoaXMudGFpbCkge1xuICAgIHRoaXMudGFpbCA9IHByZXZcbiAgfVxuXG4gIG5vZGUubGlzdC5sZW5ndGgtLVxuICBub2RlLm5leHQgPSBudWxsXG4gIG5vZGUucHJldiA9IG51bGxcbiAgbm9kZS5saXN0ID0gbnVsbFxuXG4gIHJldHVybiBuZXh0XG59XG5cbllhbGxpc3QucHJvdG90eXBlLnVuc2hpZnROb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgaWYgKG5vZGUgPT09IHRoaXMuaGVhZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKG5vZGUubGlzdCkge1xuICAgIG5vZGUubGlzdC5yZW1vdmVOb2RlKG5vZGUpXG4gIH1cblxuICB2YXIgaGVhZCA9IHRoaXMuaGVhZFxuICBub2RlLmxpc3QgPSB0aGlzXG4gIG5vZGUubmV4dCA9IGhlYWRcbiAgaWYgKGhlYWQpIHtcbiAgICBoZWFkLnByZXYgPSBub2RlXG4gIH1cblxuICB0aGlzLmhlYWQgPSBub2RlXG4gIGlmICghdGhpcy50YWlsKSB7XG4gICAgdGhpcy50YWlsID0gbm9kZVxuICB9XG4gIHRoaXMubGVuZ3RoKytcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUucHVzaE5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICBpZiAobm9kZSA9PT0gdGhpcy50YWlsKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAobm9kZS5saXN0KSB7XG4gICAgbm9kZS5saXN0LnJlbW92ZU5vZGUobm9kZSlcbiAgfVxuXG4gIHZhciB0YWlsID0gdGhpcy50YWlsXG4gIG5vZGUubGlzdCA9IHRoaXNcbiAgbm9kZS5wcmV2ID0gdGFpbFxuICBpZiAodGFpbCkge1xuICAgIHRhaWwubmV4dCA9IG5vZGVcbiAgfVxuXG4gIHRoaXMudGFpbCA9IG5vZGVcbiAgaWYgKCF0aGlzLmhlYWQpIHtcbiAgICB0aGlzLmhlYWQgPSBub2RlXG4gIH1cbiAgdGhpcy5sZW5ndGgrK1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBwdXNoKHRoaXMsIGFyZ3VtZW50c1tpXSlcbiAgfVxuICByZXR1cm4gdGhpcy5sZW5ndGhcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uICgpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdW5zaGlmdCh0aGlzLCBhcmd1bWVudHNbaV0pXG4gIH1cbiAgcmV0dXJuIHRoaXMubGVuZ3RoXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnBvcCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLnRhaWwpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICB2YXIgcmVzID0gdGhpcy50YWlsLnZhbHVlXG4gIHRoaXMudGFpbCA9IHRoaXMudGFpbC5wcmV2XG4gIGlmICh0aGlzLnRhaWwpIHtcbiAgICB0aGlzLnRhaWwubmV4dCA9IG51bGxcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmhlYWQgPSBudWxsXG4gIH1cbiAgdGhpcy5sZW5ndGgtLVxuICByZXR1cm4gcmVzXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnNoaWZ0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuaGVhZCkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIHZhciByZXMgPSB0aGlzLmhlYWQudmFsdWVcbiAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLm5leHRcbiAgaWYgKHRoaXMuaGVhZCkge1xuICAgIHRoaXMuaGVhZC5wcmV2ID0gbnVsbFxuICB9IGVsc2Uge1xuICAgIHRoaXMudGFpbCA9IG51bGxcbiAgfVxuICB0aGlzLmxlbmd0aC0tXG4gIHJldHVybiByZXNcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChmbiwgdGhpc3ApIHtcbiAgdGhpc3AgPSB0aGlzcCB8fCB0aGlzXG4gIGZvciAodmFyIHdhbGtlciA9IHRoaXMuaGVhZCwgaSA9IDA7IHdhbGtlciAhPT0gbnVsbDsgaSsrKSB7XG4gICAgZm4uY2FsbCh0aGlzcCwgd2Fsa2VyLnZhbHVlLCBpLCB0aGlzKVxuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cbn1cblxuWWFsbGlzdC5wcm90b3R5cGUuZm9yRWFjaFJldmVyc2UgPSBmdW5jdGlvbiAoZm4sIHRoaXNwKSB7XG4gIHRoaXNwID0gdGhpc3AgfHwgdGhpc1xuICBmb3IgKHZhciB3YWxrZXIgPSB0aGlzLnRhaWwsIGkgPSB0aGlzLmxlbmd0aCAtIDE7IHdhbGtlciAhPT0gbnVsbDsgaS0tKSB7XG4gICAgZm4uY2FsbCh0aGlzcCwgd2Fsa2VyLnZhbHVlLCBpLCB0aGlzKVxuICAgIHdhbGtlciA9IHdhbGtlci5wcmV2XG4gIH1cbn1cblxuWWFsbGlzdC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG4pIHtcbiAgZm9yICh2YXIgaSA9IDAsIHdhbGtlciA9IHRoaXMuaGVhZDsgd2Fsa2VyICE9PSBudWxsICYmIGkgPCBuOyBpKyspIHtcbiAgICAvLyBhYm9ydCBvdXQgb2YgdGhlIGxpc3QgZWFybHkgaWYgd2UgaGl0IGEgY3ljbGVcbiAgICB3YWxrZXIgPSB3YWxrZXIubmV4dFxuICB9XG4gIGlmIChpID09PSBuICYmIHdhbGtlciAhPT0gbnVsbCkge1xuICAgIHJldHVybiB3YWxrZXIudmFsdWVcbiAgfVxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5nZXRSZXZlcnNlID0gZnVuY3Rpb24gKG4pIHtcbiAgZm9yICh2YXIgaSA9IDAsIHdhbGtlciA9IHRoaXMudGFpbDsgd2Fsa2VyICE9PSBudWxsICYmIGkgPCBuOyBpKyspIHtcbiAgICAvLyBhYm9ydCBvdXQgb2YgdGhlIGxpc3QgZWFybHkgaWYgd2UgaGl0IGEgY3ljbGVcbiAgICB3YWxrZXIgPSB3YWxrZXIucHJldlxuICB9XG4gIGlmIChpID09PSBuICYmIHdhbGtlciAhPT0gbnVsbCkge1xuICAgIHJldHVybiB3YWxrZXIudmFsdWVcbiAgfVxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoZm4sIHRoaXNwKSB7XG4gIHRoaXNwID0gdGhpc3AgfHwgdGhpc1xuICB2YXIgcmVzID0gbmV3IFlhbGxpc3QoKVxuICBmb3IgKHZhciB3YWxrZXIgPSB0aGlzLmhlYWQ7IHdhbGtlciAhPT0gbnVsbDspIHtcbiAgICByZXMucHVzaChmbi5jYWxsKHRoaXNwLCB3YWxrZXIudmFsdWUsIHRoaXMpKVxuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5tYXBSZXZlcnNlID0gZnVuY3Rpb24gKGZuLCB0aGlzcCkge1xuICB0aGlzcCA9IHRoaXNwIHx8IHRoaXNcbiAgdmFyIHJlcyA9IG5ldyBZYWxsaXN0KClcbiAgZm9yICh2YXIgd2Fsa2VyID0gdGhpcy50YWlsOyB3YWxrZXIgIT09IG51bGw7KSB7XG4gICAgcmVzLnB1c2goZm4uY2FsbCh0aGlzcCwgd2Fsa2VyLnZhbHVlLCB0aGlzKSlcbiAgICB3YWxrZXIgPSB3YWxrZXIucHJldlxuICB9XG4gIHJldHVybiByZXNcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUucmVkdWNlID0gZnVuY3Rpb24gKGZuLCBpbml0aWFsKSB7XG4gIHZhciBhY2NcbiAgdmFyIHdhbGtlciA9IHRoaXMuaGVhZFxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICBhY2MgPSBpbml0aWFsXG4gIH0gZWxzZSBpZiAodGhpcy5oZWFkKSB7XG4gICAgd2Fsa2VyID0gdGhpcy5oZWFkLm5leHRcbiAgICBhY2MgPSB0aGlzLmhlYWQudmFsdWVcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWR1Y2Ugb2YgZW1wdHkgbGlzdCB3aXRoIG5vIGluaXRpYWwgdmFsdWUnKVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IHdhbGtlciAhPT0gbnVsbDsgaSsrKSB7XG4gICAgYWNjID0gZm4oYWNjLCB3YWxrZXIudmFsdWUsIGkpXG4gICAgd2Fsa2VyID0gd2Fsa2VyLm5leHRcbiAgfVxuXG4gIHJldHVybiBhY2Ncbn1cblxuWWFsbGlzdC5wcm90b3R5cGUucmVkdWNlUmV2ZXJzZSA9IGZ1bmN0aW9uIChmbiwgaW5pdGlhbCkge1xuICB2YXIgYWNjXG4gIHZhciB3YWxrZXIgPSB0aGlzLnRhaWxcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgYWNjID0gaW5pdGlhbFxuICB9IGVsc2UgaWYgKHRoaXMudGFpbCkge1xuICAgIHdhbGtlciA9IHRoaXMudGFpbC5wcmV2XG4gICAgYWNjID0gdGhpcy50YWlsLnZhbHVlXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVkdWNlIG9mIGVtcHR5IGxpc3Qgd2l0aCBubyBpbml0aWFsIHZhbHVlJylcbiAgfVxuXG4gIGZvciAodmFyIGkgPSB0aGlzLmxlbmd0aCAtIDE7IHdhbGtlciAhPT0gbnVsbDsgaS0tKSB7XG4gICAgYWNjID0gZm4oYWNjLCB3YWxrZXIudmFsdWUsIGkpXG4gICAgd2Fsa2VyID0gd2Fsa2VyLnByZXZcbiAgfVxuXG4gIHJldHVybiBhY2Ncbn1cblxuWWFsbGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFyciA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDAsIHdhbGtlciA9IHRoaXMuaGVhZDsgd2Fsa2VyICE9PSBudWxsOyBpKyspIHtcbiAgICBhcnJbaV0gPSB3YWxrZXIudmFsdWVcbiAgICB3YWxrZXIgPSB3YWxrZXIubmV4dFxuICB9XG4gIHJldHVybiBhcnJcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUudG9BcnJheVJldmVyc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcnIgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwLCB3YWxrZXIgPSB0aGlzLnRhaWw7IHdhbGtlciAhPT0gbnVsbDsgaSsrKSB7XG4gICAgYXJyW2ldID0gd2Fsa2VyLnZhbHVlXG4gICAgd2Fsa2VyID0gd2Fsa2VyLnByZXZcbiAgfVxuICByZXR1cm4gYXJyXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gKGZyb20sIHRvKSB7XG4gIHRvID0gdG8gfHwgdGhpcy5sZW5ndGhcbiAgaWYgKHRvIDwgMCkge1xuICAgIHRvICs9IHRoaXMubGVuZ3RoXG4gIH1cbiAgZnJvbSA9IGZyb20gfHwgMFxuICBpZiAoZnJvbSA8IDApIHtcbiAgICBmcm9tICs9IHRoaXMubGVuZ3RoXG4gIH1cbiAgdmFyIHJldCA9IG5ldyBZYWxsaXN0KClcbiAgaWYgKHRvIDwgZnJvbSB8fCB0byA8IDApIHtcbiAgICByZXR1cm4gcmV0XG4gIH1cbiAgaWYgKGZyb20gPCAwKSB7XG4gICAgZnJvbSA9IDBcbiAgfVxuICBpZiAodG8gPiB0aGlzLmxlbmd0aCkge1xuICAgIHRvID0gdGhpcy5sZW5ndGhcbiAgfVxuICBmb3IgKHZhciBpID0gMCwgd2Fsa2VyID0gdGhpcy5oZWFkOyB3YWxrZXIgIT09IG51bGwgJiYgaSA8IGZyb207IGkrKykge1xuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cbiAgZm9yICg7IHdhbGtlciAhPT0gbnVsbCAmJiBpIDwgdG87IGkrKywgd2Fsa2VyID0gd2Fsa2VyLm5leHQpIHtcbiAgICByZXQucHVzaCh3YWxrZXIudmFsdWUpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5zbGljZVJldmVyc2UgPSBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgdG8gPSB0byB8fCB0aGlzLmxlbmd0aFxuICBpZiAodG8gPCAwKSB7XG4gICAgdG8gKz0gdGhpcy5sZW5ndGhcbiAgfVxuICBmcm9tID0gZnJvbSB8fCAwXG4gIGlmIChmcm9tIDwgMCkge1xuICAgIGZyb20gKz0gdGhpcy5sZW5ndGhcbiAgfVxuICB2YXIgcmV0ID0gbmV3IFlhbGxpc3QoKVxuICBpZiAodG8gPCBmcm9tIHx8IHRvIDwgMCkge1xuICAgIHJldHVybiByZXRcbiAgfVxuICBpZiAoZnJvbSA8IDApIHtcbiAgICBmcm9tID0gMFxuICB9XG4gIGlmICh0byA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdG8gPSB0aGlzLmxlbmd0aFxuICB9XG4gIGZvciAodmFyIGkgPSB0aGlzLmxlbmd0aCwgd2Fsa2VyID0gdGhpcy50YWlsOyB3YWxrZXIgIT09IG51bGwgJiYgaSA+IHRvOyBpLS0pIHtcbiAgICB3YWxrZXIgPSB3YWxrZXIucHJldlxuICB9XG4gIGZvciAoOyB3YWxrZXIgIT09IG51bGwgJiYgaSA+IGZyb207IGktLSwgd2Fsa2VyID0gd2Fsa2VyLnByZXYpIHtcbiAgICByZXQucHVzaCh3YWxrZXIudmFsdWUpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5zcGxpY2UgPSBmdW5jdGlvbiAoc3RhcnQsIGRlbGV0ZUNvdW50LCAuLi5ub2Rlcykge1xuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHN0YXJ0ID0gdGhpcy5sZW5ndGggLSAxXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gdGhpcy5sZW5ndGggKyBzdGFydDtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCB3YWxrZXIgPSB0aGlzLmhlYWQ7IHdhbGtlciAhPT0gbnVsbCAmJiBpIDwgc3RhcnQ7IGkrKykge1xuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cblxuICB2YXIgcmV0ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IHdhbGtlciAmJiBpIDwgZGVsZXRlQ291bnQ7IGkrKykge1xuICAgIHJldC5wdXNoKHdhbGtlci52YWx1ZSlcbiAgICB3YWxrZXIgPSB0aGlzLnJlbW92ZU5vZGUod2Fsa2VyKVxuICB9XG4gIGlmICh3YWxrZXIgPT09IG51bGwpIHtcbiAgICB3YWxrZXIgPSB0aGlzLnRhaWxcbiAgfVxuXG4gIGlmICh3YWxrZXIgIT09IHRoaXMuaGVhZCAmJiB3YWxrZXIgIT09IHRoaXMudGFpbCkge1xuICAgIHdhbGtlciA9IHdhbGtlci5wcmV2XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgd2Fsa2VyID0gaW5zZXJ0KHRoaXMsIHdhbGtlciwgbm9kZXNbaV0pXG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYWQgPSB0aGlzLmhlYWRcbiAgdmFyIHRhaWwgPSB0aGlzLnRhaWxcbiAgZm9yICh2YXIgd2Fsa2VyID0gaGVhZDsgd2Fsa2VyICE9PSBudWxsOyB3YWxrZXIgPSB3YWxrZXIucHJldikge1xuICAgIHZhciBwID0gd2Fsa2VyLnByZXZcbiAgICB3YWxrZXIucHJldiA9IHdhbGtlci5uZXh0XG4gICAgd2Fsa2VyLm5leHQgPSBwXG4gIH1cbiAgdGhpcy5oZWFkID0gdGFpbFxuICB0aGlzLnRhaWwgPSBoZWFkXG4gIHJldHVybiB0aGlzXG59XG5cbmZ1bmN0aW9uIGluc2VydCAoc2VsZiwgbm9kZSwgdmFsdWUpIHtcbiAgdmFyIGluc2VydGVkID0gbm9kZSA9PT0gc2VsZi5oZWFkID9cbiAgICBuZXcgTm9kZSh2YWx1ZSwgbnVsbCwgbm9kZSwgc2VsZikgOlxuICAgIG5ldyBOb2RlKHZhbHVlLCBub2RlLCBub2RlLm5leHQsIHNlbGYpXG5cbiAgaWYgKGluc2VydGVkLm5leHQgPT09IG51bGwpIHtcbiAgICBzZWxmLnRhaWwgPSBpbnNlcnRlZFxuICB9XG4gIGlmIChpbnNlcnRlZC5wcmV2ID09PSBudWxsKSB7XG4gICAgc2VsZi5oZWFkID0gaW5zZXJ0ZWRcbiAgfVxuXG4gIHNlbGYubGVuZ3RoKytcblxuICByZXR1cm4gaW5zZXJ0ZWRcbn1cblxuZnVuY3Rpb24gcHVzaCAoc2VsZiwgaXRlbSkge1xuICBzZWxmLnRhaWwgPSBuZXcgTm9kZShpdGVtLCBzZWxmLnRhaWwsIG51bGwsIHNlbGYpXG4gIGlmICghc2VsZi5oZWFkKSB7XG4gICAgc2VsZi5oZWFkID0gc2VsZi50YWlsXG4gIH1cbiAgc2VsZi5sZW5ndGgrK1xufVxuXG5mdW5jdGlvbiB1bnNoaWZ0IChzZWxmLCBpdGVtKSB7XG4gIHNlbGYuaGVhZCA9IG5ldyBOb2RlKGl0ZW0sIG51bGwsIHNlbGYuaGVhZCwgc2VsZilcbiAgaWYgKCFzZWxmLnRhaWwpIHtcbiAgICBzZWxmLnRhaWwgPSBzZWxmLmhlYWRcbiAgfVxuICBzZWxmLmxlbmd0aCsrXG59XG5cbmZ1bmN0aW9uIE5vZGUgKHZhbHVlLCBwcmV2LCBuZXh0LCBsaXN0KSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBOb2RlKSkge1xuICAgIHJldHVybiBuZXcgTm9kZSh2YWx1ZSwgcHJldiwgbmV4dCwgbGlzdClcbiAgfVxuXG4gIHRoaXMubGlzdCA9IGxpc3RcbiAgdGhpcy52YWx1ZSA9IHZhbHVlXG5cbiAgaWYgKHByZXYpIHtcbiAgICBwcmV2Lm5leHQgPSB0aGlzXG4gICAgdGhpcy5wcmV2ID0gcHJldlxuICB9IGVsc2Uge1xuICAgIHRoaXMucHJldiA9IG51bGxcbiAgfVxuXG4gIGlmIChuZXh0KSB7XG4gICAgbmV4dC5wcmV2ID0gdGhpc1xuICAgIHRoaXMubmV4dCA9IG5leHRcbiAgfSBlbHNlIHtcbiAgICB0aGlzLm5leHQgPSBudWxsXG4gIH1cbn1cblxudHJ5IHtcbiAgLy8gYWRkIGlmIHN1cHBvcnQgZm9yIFN5bWJvbC5pdGVyYXRvciBpcyBwcmVzZW50XG4gIHJlcXVpcmUoJy4vaXRlcmF0b3IuanMnKShZYWxsaXN0KVxufSBjYXRjaCAoZXIpIHt9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFRyYW5zcG9ydFdlYlVTQiBmcm9tICdAbGVkZ2VyaHEvaHctdHJhbnNwb3J0LXdlYnVzYic7XHJcbmltcG9ydCBMZWRnZXJBcHAgZnJvbSAnQHpvbmRheC9sZWRnZXItY2FzcGVyJztcclxuaW1wb3J0IHtCdWZmZXJ9IGZyb20gJ2J1ZmZlcic7XHJcblxyXG5jb25zdCBTRUNfS0VZX1BSRUZJWCA9ICcwMic7XHJcblxyXG5jb25zdCBMZWRnZXJBcHBTaW5nbGV0b24gPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IGRvdE5ldExlZGdlckluc3RhbmNlOiBhbnk7XHJcbiAgICBsZXQgdHJhbnNwb3J0OiBhbnk7XHJcbiAgICBsZXQgbGVkZ2VyQXBwOiBMZWRnZXJBcHA7XHJcblxyXG4gICAgbGV0IGlzQ29ubmVjdGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcnMoaW5zdGFuY2U6IGFueSkge1xyXG4gICAgICAgIGRvdE5ldExlZGdlckluc3RhbmNlID0gaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb25EaXNjb25uZWN0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIGRpc2Nvbm5lY3RlZC5cIik7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgZG90TmV0TGVkZ2VySW5zdGFuY2UgIT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgICAgICBkb3ROZXRMZWRnZXJJbnN0YW5jZS5pbnZva2VNZXRob2RBc3luYygnVXBkYXRlU3RhdGUnLCBmYWxzZSwgJycpO1xyXG5cclxuICAgICAgICBpc0Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVuY29kZVB1YmxpY0tleSA9IChieXRlczogVWludDhBcnJheSk6IHN0cmluZyA9PlxyXG4gICAgICAgIFNFQ19LRVlfUFJFRklYICsgQnVmZmVyLmZyb20oYnl0ZXMpLnRvU3RyaW5nKCdoZXgnKTtcclxuXHJcbiAgICBjb25zdCBnZXRBY2NvdW50UGF0aCA9IChhY2N0SWR4OiBudW1iZXIpID0+IGBtLzQ0Jy81MDYnLzAnLzAvJHthY2N0SWR4LnRvU3RyaW5nKCl9YDtcclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBjb25uZWN0KGFjY3RJZHg6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghaXNDb25uZWN0ZWQpIHtcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQgPSBhd2FpdCBUcmFuc3BvcnRXZWJVU0IuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQub24oJ2Rpc2Nvbm5lY3QnLCAoKSA9PiBvbkRpc2Nvbm5lY3QoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGVkZ2VyQXBwID0gbmV3IExlZGdlckFwcCh0cmFuc3BvcnQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihgRXJyb3IgY29ubmVjdGluZyB0byBhIExlZGdlciBkZXZpY2U6ICR7ZXJyb3IubWVzc2FnZX0uYCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGxlZGdlckFwcC5nZXRBZGRyZXNzQW5kUHViS2V5KGdldEFjY291bnRQYXRoKGFjY3RJZHgpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXR1cm5Db2RlICE9PSAweDkwMDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGBFcnJvciBjb25uZWN0aW5nIHRvIGEgTGVkZ2VyIGRldmljZTogJHtyZXNwb25zZS5lcnJvck1lc3NhZ2V9ICgweCR7cmVzcG9uc2UucmV0dXJuQ29kZS50b1N0cmluZygxNil9KS5gKSk7XHJcblxyXG4gICAgICAgICAgICBpc0Nvbm5lY3RlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVQayA9IGVuY29kZVB1YmxpY0tleShyZXNwb25zZS5wdWJsaWNLZXkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb3ROZXRMZWRnZXJJbnN0YW5jZSAhPT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgICAgICAgICBkb3ROZXRMZWRnZXJJbnN0YW5jZS5pbnZva2VNZXRob2RBc3luYygnVXBkYXRlU3RhdGUnLCB0cnVlLCBhY3RpdmVQayk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gYWN0aXZlUGs7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGdldEFjY291bnQoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRpc2Nvbm5lY3QoKSB7XHJcbiAgICAgICAgaWYgKGlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHRyYW5zcG9ydC5jbG9zZSgpO1xyXG4gICAgICAgICAgICBpc0Nvbm5lY3RlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvdE5ldExlZGdlckluc3RhbmNlICE9PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgICAgIGRvdE5ldExlZGdlckluc3RhbmNlLmludm9rZU1ldGhvZEFzeW5jKCdVcGRhdGVTdGF0ZScsIGZhbHNlLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRWZXJzaW9uKCkge1xyXG4gICAgICAgIHRyYW5zcG9ydCA9IGF3YWl0IFRyYW5zcG9ydFdlYlVTQi5jcmVhdGUoKTtcclxuICAgICAgICBsZWRnZXJBcHAgPSBuZXcgTGVkZ2VyQXBwKHRyYW5zcG9ydCk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBsZWRnZXJBcHAuZ2V0VmVyc2lvbigpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5yZXR1cm5Db2RlICE9PSAweDkwMDApXHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYEVycm9yOiAke3Jlc3BvbnNlLmVycm9yTWVzc2FnZX0gKDB4JHtyZXNwb25zZS5yZXR1cm5Db2RlLnRvU3RyaW5nKDE2KX0pLmApKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhc3luYyBmdW5jdGlvbiBnZXRBcHBJbmZvKCkge1xyXG5cclxuICAgICAgICB0cmFuc3BvcnQgPSBhd2FpdCBUcmFuc3BvcnRXZWJVU0IuY3JlYXRlKCk7XHJcbiAgICAgICAgbGVkZ2VyQXBwID0gbmV3IExlZGdlckFwcCh0cmFuc3BvcnQpO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbGVkZ2VyQXBwLmdldEFwcEluZm8oKTtcclxuICAgICAgICBpZiAocmVzcG9uc2UucmV0dXJuQ29kZSAhPT0gMHg5MDAwKVxyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGBFcnJvcjogJHtyZXNwb25zZS5lcnJvck1lc3NhZ2V9ICgweCR7cmVzcG9uc2UucmV0dXJuQ29kZS50b1N0cmluZygxNil9KS5gKSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBpZihpc0Nvbm5lY3RlZCkge1xyXG4gICAgICAgIC8vICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGxlZGdlckFwcC5nZXRBcHBJbmZvKCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgaWYgKHJlc3BvbnNlLnJldHVybkNvZGUgIT09IDB4OTAwMClcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYEVycm9yOiAke3Jlc3BvbnNlLmVycm9yTWVzc2FnZX0gKDB4JHtyZXNwb25zZS5yZXR1cm5Db2RlLnRvU3RyaW5nKDE2KX0pLmApKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYE5vdCBjb25uZWN0ZWQuYCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEFjY291bnQoYWNjdElkeDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbGVkZ2VyQXBwLmdldEFkZHJlc3NBbmRQdWJLZXkoZ2V0QWNjb3VudFBhdGgoYWNjdElkeCkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJldHVybkNvZGUgIT09IDB4OTAwMClcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYEVycm9yOiAke3Jlc3BvbnNlLmVycm9yTWVzc2FnZX0gKDB4JHtyZXNwb25zZS5yZXR1cm5Db2RlLnRvU3RyaW5nKDE2KX0pLmApKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZVBrID0gZW5jb2RlUHVibGljS2V5KHJlc3BvbnNlLnB1YmxpY0tleSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvdE5ldExlZGdlckluc3RhbmNlICE9PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgICAgIGRvdE5ldExlZGdlckluc3RhbmNlLmludm9rZU1ldGhvZEFzeW5jKCdVcGRhdGVTdGF0ZScsIHRydWUsIGFjdGl2ZVBrKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBhY3RpdmVQaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihgTm90IGNvbm5lY3RlZC5gKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gc2hvd0FjY291bnQoYWNjdElkeDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbGVkZ2VyQXBwLnNob3dBZGRyZXNzQW5kUHViS2V5KGdldEFjY291bnRQYXRoKGFjY3RJZHgpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXR1cm5Db2RlICE9PSAweDkwMDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGBFcnJvcjogJHtyZXNwb25zZS5lcnJvck1lc3NhZ2V9ICgweCR7cmVzcG9uc2UucmV0dXJuQ29kZS50b1N0cmluZygxNil9KS5gKSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVQayA9IGVuY29kZVB1YmxpY0tleShyZXNwb25zZS5wdWJsaWNLZXkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb3ROZXRMZWRnZXJJbnN0YW5jZSAhPT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgICAgICAgICBkb3ROZXRMZWRnZXJJbnN0YW5jZS5pbnZva2VNZXRob2RBc3luYygnVXBkYXRlU3RhdGUnLCB0cnVlLCBhY3RpdmVQayk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gYWN0aXZlUGs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYE5vdCBjb25uZWN0ZWQuYCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHNpZ24oYWNjdElkeDogbnVtYmVyLCBkZXBsb3lCeXRlczogYW55KSB7XHJcbiAgICAgICAgaWYgKGlzQ29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlZGdlckFwcCA9IG5ldyBMZWRnZXJBcHAodHJhbnNwb3J0KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbGVkZ2VyQXBwLnNpZ24oZ2V0QWNjb3VudFBhdGgoYWNjdElkeCksIGRlcGxveUJ5dGVzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXR1cm5Db2RlICE9PSAweDkwMDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGBFcnJvcjogJHtyZXNwb25zZS5lcnJvck1lc3NhZ2V9ICgweCR7cmVzcG9uc2UucmV0dXJuQ29kZS50b1N0cmluZygxNil9KS5gKSk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2lnbiBjb21wbGV0ZWQ6ICcgKyByZXNwb25zZSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gU0VDX0tFWV9QUkVGSVggKyByZXNwb25zZS5zaWduYXR1cmVSUy50b1N0cmluZygnaGV4Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYE5vdCBjb25uZWN0ZWQuYCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcnMsXHJcbiAgICAgICAgY29ubmVjdCxcclxuICAgICAgICBkaXNjb25uZWN0LFxyXG4gICAgICAgIGdldFZlcnNpb24sXHJcbiAgICAgICAgZ2V0QXBwSW5mbyxcclxuICAgICAgICBpc0Nvbm5lY3RlZDogKCkgPT4gaXNDb25uZWN0ZWQsXHJcbiAgICAgICAgZ2V0QWNjb3VudCxcclxuICAgICAgICBzaG93QWNjb3VudCxcclxuICAgICAgICBzaWduXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZEV2ZW50TGlzdGVuZXJzID0gKHJlZjogYW55KSA9PiBMZWRnZXJBcHBTaW5nbGV0b24uYWRkRXZlbnRMaXN0ZW5lcnMocmVmKTtcclxuZXhwb3J0IGNvbnN0IGNvbm5lY3QgPSBhc3luYyAoYWNjdElkeDogbnVtYmVyKSA9PiBhd2FpdCBMZWRnZXJBcHBTaW5nbGV0b24uY29ubmVjdChhY2N0SWR4KTtcclxuZXhwb3J0IGNvbnN0IGRpc2Nvbm5lY3QgPSAoKSA9PiBMZWRnZXJBcHBTaW5nbGV0b24uZGlzY29ubmVjdCgpO1xyXG5leHBvcnQgY29uc3QgZ2V0VmVyc2lvbiA9IGFzeW5jICgpID0+IGF3YWl0IExlZGdlckFwcFNpbmdsZXRvbi5nZXRWZXJzaW9uKCk7XHJcbmV4cG9ydCBjb25zdCBnZXRBcHBJbmZvID0gYXN5bmMgKCkgPT4gYXdhaXQgTGVkZ2VyQXBwU2luZ2xldG9uLmdldEFwcEluZm8oKTtcclxuZXhwb3J0IGNvbnN0IGlzQ29ubmVjdGVkID0gKCkgPT4gTGVkZ2VyQXBwU2luZ2xldG9uLmlzQ29ubmVjdGVkKCk7XHJcbmV4cG9ydCBjb25zdCBnZXRBY2NvdW50ID0gYXN5bmMgKGFjY3RJZHg6IG51bWJlcikgPT4gTGVkZ2VyQXBwU2luZ2xldG9uLmdldEFjY291bnQoYWNjdElkeCk7XHJcbmV4cG9ydCBjb25zdCBzaG93QWNjb3VudCA9IGFzeW5jIChhY2N0SWR4OiBudW1iZXIpID0+IExlZGdlckFwcFNpbmdsZXRvbi5zaG93QWNjb3VudChhY2N0SWR4KTtcclxuZXhwb3J0IGNvbnN0IHNpZ24gPSBhc3luYyAoYWNjdElkeDogbnVtYmVyLCBkZXBsb3lCeXRlczogYW55KSA9PiBMZWRnZXJBcHBTaW5nbGV0b24uc2lnbihhY2N0SWR4LCBkZXBsb3lCeXRlcyk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==