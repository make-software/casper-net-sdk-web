/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@ledgerhq/devices/lib-es/hid-framing.js":
/*!**************************************************************!*\
  !*** ./node_modules/@ledgerhq/devices/lib-es/hid-framing.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ledgerhq/errors */ "./node_modules/@ledgerhq/errors/lib-es/index.js");
/* provided dependency */ var Buffer = __webpack_require__(/*! buffer */ "./node_modules/buffer/index.js")["Buffer"];

const Tag = 0x05;
function asUInt16BE(value) {
    const b = Buffer.alloc(2);
    b.writeUInt16BE(value, 0);
    return b;
}
const initialAcc = {
    data: Buffer.alloc(0),
    dataLength: 0,
    sequence: 0,
};
/**
 * Object to handle HID frames (encoding and decoding)
 *
 * @param channel
 * @param packetSize The HID protocol packet size in bytes (usually 64)
 */
const createHIDframing = (channel, packetSize) => {
    return {
        /**
         * Frames/encodes an APDU message into HID USB packets/frames
         *
         * @param apdu The APDU message to send, in a Buffer containing [cla, ins, p1, p2, data length, data(if not empty)]
         * @returns an array of HID USB frames ready to be sent
         */
        makeBlocks(apdu) {
            // Encodes the APDU length in 2 bytes before the APDU itself.
            // The length is measured as the number of bytes.
            // As the size of the APDU `data` should have been added in 1 byte just before `data`,
            // the minimum size of an APDU is 5 bytes.
            let data = Buffer.concat([asUInt16BE(apdu.length), apdu]);
            const blockSize = packetSize - 5;
            const nbBlocks = Math.ceil(data.length / blockSize);
            // Fills data with 0-padding
            data = Buffer.concat([data, Buffer.alloc(nbBlocks * blockSize - data.length + 1).fill(0)]);
            const blocks = [];
            for (let i = 0; i < nbBlocks; i++) {
                const head = Buffer.alloc(5);
                head.writeUInt16BE(channel, 0);
                head.writeUInt8(Tag, 2);
                head.writeUInt16BE(i, 3);
                // `slice` and not `subarray`: this might not be a Node Buffer, but probably only a Uint8Array
                const chunk = data.slice(i * blockSize, (i + 1) * blockSize);
                blocks.push(Buffer.concat([head, chunk]));
            }
            return blocks;
        },
        /**
         * Reduces HID USB packets/frames to one response.
         *
         * @param acc The value resulting from (accumulating) the previous call of reduceResponse.
         *   On first call initialized to `initialAcc`. The accumulator enables handling multi-frames messages.
         * @param chunk Current chunk to reduce into accumulator
         * @returns An accumulator value updated with the current chunk
         */
        reduceResponse(acc, chunk) {
            let { data, dataLength, sequence } = acc || initialAcc;
            if (chunk.readUInt16BE(0) !== channel) {
                throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_0__.TransportError("Invalid channel", "InvalidChannel");
            }
            if (chunk.readUInt8(2) !== Tag) {
                throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_0__.TransportError("Invalid tag", "InvalidTag");
            }
            if (chunk.readUInt16BE(3) !== sequence) {
                throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_0__.TransportError("Invalid sequence", "InvalidSequence");
            }
            // Gets the total length of the response from the 1st frame
            if (!acc) {
                dataLength = chunk.readUInt16BE(5);
            }
            sequence++;
            // The total length on the 1st frame takes 2 more bytes
            const chunkData = chunk.slice(acc ? 5 : 7);
            data = Buffer.concat([data, chunkData]);
            // Removes any 0 padding
            if (data.length > dataLength) {
                data = data.slice(0, dataLength);
            }
            return {
                data,
                dataLength,
                sequence,
            };
        },
        /**
         * Returns the response message that has been reduced from the HID USB frames
         *
         * @param acc The accumulator
         * @returns A Buffer containing the cleaned response message, or null if no response message, or undefined if the
         *   accumulator is incorrect (message length is not valid)
         */
        getReducedResult(acc) {
            if (acc && acc.dataLength === acc.data.length) {
                return acc.data;
            }
        },
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createHIDframing);
//# sourceMappingURL=hid-framing.js.map

/***/ }),

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
const IIGenericHID = 0x01;
const IIKeyboardHID = 0x02;
const IIU2F = 0x04;
const IICCID = 0x08;
const IIWebUSB = 0x10;
var DeviceModelId;
(function (DeviceModelId) {
    DeviceModelId["blue"] = "blue";
    DeviceModelId["nanoS"] = "nanoS";
    DeviceModelId["nanoSP"] = "nanoSP";
    DeviceModelId["nanoX"] = "nanoX";
    DeviceModelId["stax"] = "stax";
})(DeviceModelId || (DeviceModelId = {}));
const devices = {
    [DeviceModelId.blue]: {
        id: DeviceModelId.blue,
        productName: "Ledger Blue",
        productIdMM: 0x00,
        legacyUsbProductId: 0x0000,
        usbOnly: true,
        memorySize: 480 * 1024,
        masks: [0x31000000, 0x31010000],
        getBlockSize: (_firwareVersion) => 4 * 1024,
    },
    [DeviceModelId.nanoS]: {
        id: DeviceModelId.nanoS,
        productName: "Ledger Nano S",
        productIdMM: 0x10,
        legacyUsbProductId: 0x0001,
        usbOnly: true,
        memorySize: 320 * 1024,
        masks: [0x31100000],
        getBlockSize: (firmwareVersion) => { var _a; return semver__WEBPACK_IMPORTED_MODULE_0___default().lt((_a = semver__WEBPACK_IMPORTED_MODULE_0___default().coerce(firmwareVersion)) !== null && _a !== void 0 ? _a : "", "2.0.0") ? 4 * 1024 : 2 * 1024; },
    },
    [DeviceModelId.nanoSP]: {
        id: DeviceModelId.nanoSP,
        productName: "Ledger Nano S Plus",
        productIdMM: 0x50,
        legacyUsbProductId: 0x0005,
        usbOnly: true,
        memorySize: 1536 * 1024,
        masks: [0x33100000],
        getBlockSize: (_firmwareVersion) => 32,
    },
    [DeviceModelId.nanoX]: {
        id: DeviceModelId.nanoX,
        productName: "Ledger Nano X",
        productIdMM: 0x40,
        legacyUsbProductId: 0x0004,
        usbOnly: false,
        memorySize: 2 * 1024 * 1024,
        masks: [0x33000000],
        getBlockSize: (_firwareVersion) => 4 * 1024,
        bluetoothSpec: [
            {
                serviceUuid: "13d63400-2c97-0004-0000-4c6564676572",
                notifyUuid: "13d63400-2c97-0004-0001-4c6564676572",
                writeUuid: "13d63400-2c97-0004-0002-4c6564676572",
                writeCmdUuid: "13d63400-2c97-0004-0003-4c6564676572",
            },
        ],
    },
    [DeviceModelId.stax]: {
        id: DeviceModelId.stax,
        productName: "Ledger Stax",
        productIdMM: 0x60,
        legacyUsbProductId: 0x0006,
        usbOnly: false,
        memorySize: 1536 * 1024,
        masks: [0x33200000],
        getBlockSize: (_firmwareVersion) => 32,
        bluetoothSpec: [
            {
                serviceUuid: "13d63400-2c97-6004-0000-4c6564676572",
                notifyUuid: "13d63400-2c97-6004-0001-4c6564676572",
                writeUuid: "13d63400-2c97-6004-0002-4c6564676572",
                writeCmdUuid: "13d63400-2c97-6004-0003-4c6564676572",
            },
        ],
    },
};
const productMap = {
    Blue: DeviceModelId.blue,
    "Nano S": DeviceModelId.nanoS,
    "Nano S Plus": DeviceModelId.nanoSP,
    "Nano X": DeviceModelId.nanoX,
    Stax: DeviceModelId.stax,
};
const devicesList = Object.values(devices);
/**
 *
 */
const ledgerUSBVendorId = 0x2c97;
/**
 *
 */
const getDeviceModel = (id) => {
    const info = devices[id];
    if (!info)
        throw new Error("device '" + id + "' does not exist");
    return info;
};
/**
 * Given a `targetId`, return the deviceModel associated to it,
 * based on the first two bytes.
 */
const identifyTargetId = (targetId) => {
    const deviceModel = devicesList.find(({ masks }) => masks.find(mask => (targetId & 0xffff0000) === mask));
    return deviceModel;
};
/**
 * From a given USB product id, return the deviceModel associated to it.
 *
 * The mapping from the product id is only based on the 2 most significant bytes.
 * For example, Stax is defined with a product id of 0x60ii, a product id 0x6011 would be mapped to it.
 */
const identifyUSBProductId = (usbProductId) => {
    const legacy = devicesList.find(d => d.legacyUsbProductId === usbProductId);
    if (legacy)
        return legacy;
    const mm = usbProductId >> 8;
    const deviceModel = devicesList.find(d => d.productIdMM === mm);
    return deviceModel;
};
const identifyProductName = (productName) => {
    const deviceModel = devicesList.find(d => d.id === productMap[productName]);
    return deviceModel;
};
const bluetoothServices = [];
const serviceUuidToInfos = {};
for (const id in devices) {
    const deviceModel = devices[id];
    const { bluetoothSpec } = deviceModel;
    if (bluetoothSpec) {
        for (let i = 0; i < bluetoothSpec.length; i++) {
            const spec = bluetoothSpec[i];
            bluetoothServices.push(spec.serviceUuid);
            serviceUuidToInfos[spec.serviceUuid] = serviceUuidToInfos[spec.serviceUuid.replace(/-/g, "")] = Object.assign({ deviceModel }, spec);
        }
    }
}
/**
 *
 */
const getBluetoothServiceUuids = () => bluetoothServices;
/**
 *
 */
const getInfosForServiceUuid = (uuid) => serviceUuidToInfos[uuid.toLowerCase()];
//# sourceMappingURL=index.js.map

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
const errorClasses = {};
const deserializers = {};
const addCustomErrorDeserializer = (name, deserializer) => {
    deserializers[name] = deserializer;
};
const createCustomErrorClass = (name) => {
    class CustomErrorClass extends Error {
        constructor(message, fields, options) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            super(message || name, options);
            // Set the prototype explicitly. See https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
            Object.setPrototypeOf(this, CustomErrorClass.prototype);
            this.name = name;
            if (fields) {
                for (const k in fields) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this[k] = fields[k];
                }
            }
            if (options && isObject(options) && "cause" in options && !("cause" in this)) {
                // .cause was specified but the superconstructor
                // did not create an instance property.
                const cause = options.cause;
                this.cause = cause;
                if ("stack" in cause) {
                    this.stack = this.stack + "\nCAUSE: " + cause.stack;
                }
            }
        }
    }
    errorClasses[name] = CustomErrorClass;
    return CustomErrorClass;
};
function isObject(value) {
    return typeof value === "object";
}
// inspired from https://github.com/programble/errio/blob/master/index.js
const deserializeError = (object) => {
    if (object && typeof object === "object") {
        try {
            if (typeof object.message === "string") {
                const msg = JSON.parse(object.message);
                if (msg.message && msg.name) {
                    object = msg;
                }
            }
        }
        catch (e) {
            // nothing
        }
        let error;
        if (typeof object.name === "string") {
            const { name } = object;
            const des = deserializers[name];
            if (des) {
                error = des(object);
            }
            else {
                let constructor = name === "Error" ? Error : errorClasses[name];
                if (!constructor) {
                    console.warn("deserializing an unknown class '" + name + "'");
                    constructor = createCustomErrorClass(name);
                }
                error = Object.create(constructor.prototype);
                try {
                    for (const prop in object) {
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
            if (typeof object.message === "string") {
                error = new Error(object.message);
            }
        }
        if (error && !error.stack && Error.captureStackTrace) {
            Error.captureStackTrace(error, deserializeError);
        }
        return error;
    }
    return new Error(String(object));
};
// inspired from https://github.com/sindresorhus/serialize-error/blob/master/index.js
const serializeError = (value) => {
    if (!value)
        return value;
    if (typeof value === "object") {
        return destroyCircular(value, []);
    }
    if (typeof value === "function") {
        return `[Function: ${value.name || "anonymous"}]`;
    }
    return value;
};
// https://www.npmjs.com/package/destroy-circular
function destroyCircular(from, seen) {
    const to = {};
    seen.push(from);
    for (const key of Object.keys(from)) {
        const value = from[key];
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
/* harmony export */   "ClaimRewardsFeesWarning": () => (/* binding */ ClaimRewardsFeesWarning),
/* harmony export */   "CurrencyNotSupported": () => (/* binding */ CurrencyNotSupported),
/* harmony export */   "DBNotReset": () => (/* binding */ DBNotReset),
/* harmony export */   "DBWrongPassword": () => (/* binding */ DBWrongPassword),
/* harmony export */   "DeviceAppVerifyNotSupported": () => (/* binding */ DeviceAppVerifyNotSupported),
/* harmony export */   "DeviceExtractOnboardingStateError": () => (/* binding */ DeviceExtractOnboardingStateError),
/* harmony export */   "DeviceGenuineSocketEarlyClose": () => (/* binding */ DeviceGenuineSocketEarlyClose),
/* harmony export */   "DeviceHalted": () => (/* binding */ DeviceHalted),
/* harmony export */   "DeviceInOSUExpected": () => (/* binding */ DeviceInOSUExpected),
/* harmony export */   "DeviceNameInvalid": () => (/* binding */ DeviceNameInvalid),
/* harmony export */   "DeviceNeedsRestart": () => (/* binding */ DeviceNeedsRestart),
/* harmony export */   "DeviceNotGenuineError": () => (/* binding */ DeviceNotGenuineError),
/* harmony export */   "DeviceOnDashboardExpected": () => (/* binding */ DeviceOnDashboardExpected),
/* harmony export */   "DeviceOnDashboardUnexpected": () => (/* binding */ DeviceOnDashboardUnexpected),
/* harmony export */   "DeviceOnboardingStatePollingError": () => (/* binding */ DeviceOnboardingStatePollingError),
/* harmony export */   "DeviceShouldStayInApp": () => (/* binding */ DeviceShouldStayInApp),
/* harmony export */   "DeviceSocketFail": () => (/* binding */ DeviceSocketFail),
/* harmony export */   "DeviceSocketNoBulkStatus": () => (/* binding */ DeviceSocketNoBulkStatus),
/* harmony export */   "DisconnectedDevice": () => (/* binding */ DisconnectedDevice),
/* harmony export */   "DisconnectedDeviceDuringOperation": () => (/* binding */ DisconnectedDeviceDuringOperation),
/* harmony export */   "DustLimit": () => (/* binding */ DustLimit),
/* harmony export */   "ETHAddressNonEIP": () => (/* binding */ ETHAddressNonEIP),
/* harmony export */   "EnpointConfigError": () => (/* binding */ EnpointConfigError),
/* harmony export */   "EthAppPleaseEnableContractData": () => (/* binding */ EthAppPleaseEnableContractData),
/* harmony export */   "ExpertModeRequired": () => (/* binding */ ExpertModeRequired),
/* harmony export */   "FeeEstimationFailed": () => (/* binding */ FeeEstimationFailed),
/* harmony export */   "FeeNotLoaded": () => (/* binding */ FeeNotLoaded),
/* harmony export */   "FeeNotLoadedSwap": () => (/* binding */ FeeNotLoadedSwap),
/* harmony export */   "FeeRequired": () => (/* binding */ FeeRequired),
/* harmony export */   "FeeTooHigh": () => (/* binding */ FeeTooHigh),
/* harmony export */   "FirmwareNotRecognized": () => (/* binding */ FirmwareNotRecognized),
/* harmony export */   "FirmwareOrAppUpdateRequired": () => (/* binding */ FirmwareOrAppUpdateRequired),
/* harmony export */   "GasLessThanEstimate": () => (/* binding */ GasLessThanEstimate),
/* harmony export */   "GenuineCheckFailed": () => (/* binding */ GenuineCheckFailed),
/* harmony export */   "HardResetFail": () => (/* binding */ HardResetFail),
/* harmony export */   "HwTransportError": () => (/* binding */ HwTransportError),
/* harmony export */   "HwTransportErrorType": () => (/* binding */ HwTransportErrorType),
/* harmony export */   "InvalidAddress": () => (/* binding */ InvalidAddress),
/* harmony export */   "InvalidAddressBecauseDestinationIsAlsoSource": () => (/* binding */ InvalidAddressBecauseDestinationIsAlsoSource),
/* harmony export */   "InvalidNonce": () => (/* binding */ InvalidNonce),
/* harmony export */   "InvalidXRPTag": () => (/* binding */ InvalidXRPTag),
/* harmony export */   "LanguageNotFound": () => (/* binding */ LanguageNotFound),
/* harmony export */   "LatestMCUInstalledError": () => (/* binding */ LatestMCUInstalledError),
/* harmony export */   "LedgerAPI4xx": () => (/* binding */ LedgerAPI4xx),
/* harmony export */   "LedgerAPI5xx": () => (/* binding */ LedgerAPI5xx),
/* harmony export */   "LedgerAPIError": () => (/* binding */ LedgerAPIError),
/* harmony export */   "LedgerAPIErrorWithMessage": () => (/* binding */ LedgerAPIErrorWithMessage),
/* harmony export */   "LedgerAPINotAvailable": () => (/* binding */ LedgerAPINotAvailable),
/* harmony export */   "LockedDeviceError": () => (/* binding */ LockedDeviceError),
/* harmony export */   "MCUNotGenuineToDashboard": () => (/* binding */ MCUNotGenuineToDashboard),
/* harmony export */   "ManagerAppAlreadyInstalledError": () => (/* binding */ ManagerAppAlreadyInstalledError),
/* harmony export */   "ManagerAppDepInstallRequired": () => (/* binding */ ManagerAppDepInstallRequired),
/* harmony export */   "ManagerAppDepUninstallRequired": () => (/* binding */ ManagerAppDepUninstallRequired),
/* harmony export */   "ManagerAppRelyOnBTCError": () => (/* binding */ ManagerAppRelyOnBTCError),
/* harmony export */   "ManagerDeviceLockedError": () => (/* binding */ ManagerDeviceLockedError),
/* harmony export */   "ManagerFirmwareNotEnoughSpaceError": () => (/* binding */ ManagerFirmwareNotEnoughSpaceError),
/* harmony export */   "ManagerNotEnoughSpaceError": () => (/* binding */ ManagerNotEnoughSpaceError),
/* harmony export */   "ManagerUninstallBTCDep": () => (/* binding */ ManagerUninstallBTCDep),
/* harmony export */   "MaxFeeTooLow": () => (/* binding */ MaxFeeTooLow),
/* harmony export */   "NetworkDown": () => (/* binding */ NetworkDown),
/* harmony export */   "NetworkError": () => (/* binding */ NetworkError),
/* harmony export */   "NoAccessToCamera": () => (/* binding */ NoAccessToCamera),
/* harmony export */   "NoAddressesFound": () => (/* binding */ NoAddressesFound),
/* harmony export */   "NoDBPathGiven": () => (/* binding */ NoDBPathGiven),
/* harmony export */   "NotEnoughBalance": () => (/* binding */ NotEnoughBalance),
/* harmony export */   "NotEnoughBalanceBecauseDestinationNotCreated": () => (/* binding */ NotEnoughBalanceBecauseDestinationNotCreated),
/* harmony export */   "NotEnoughBalanceInParentAccount": () => (/* binding */ NotEnoughBalanceInParentAccount),
/* harmony export */   "NotEnoughBalanceToDelegate": () => (/* binding */ NotEnoughBalanceToDelegate),
/* harmony export */   "NotEnoughGas": () => (/* binding */ NotEnoughGas),
/* harmony export */   "NotEnoughGasSwap": () => (/* binding */ NotEnoughGasSwap),
/* harmony export */   "NotEnoughSpendableBalance": () => (/* binding */ NotEnoughSpendableBalance),
/* harmony export */   "NotSupportedLegacyAddress": () => (/* binding */ NotSupportedLegacyAddress),
/* harmony export */   "OpReturnDataSizeLimit": () => (/* binding */ OpReturnDataSizeLimit),
/* harmony export */   "PairingFailed": () => (/* binding */ PairingFailed),
/* harmony export */   "PasswordIncorrectError": () => (/* binding */ PasswordIncorrectError),
/* harmony export */   "PasswordsDontMatchError": () => (/* binding */ PasswordsDontMatchError),
/* harmony export */   "PeerRemovedPairing": () => (/* binding */ PeerRemovedPairing),
/* harmony export */   "PendingOperation": () => (/* binding */ PendingOperation),
/* harmony export */   "PriorityFeeHigherThanMaxFee": () => (/* binding */ PriorityFeeHigherThanMaxFee),
/* harmony export */   "PriorityFeeTooHigh": () => (/* binding */ PriorityFeeTooHigh),
/* harmony export */   "PriorityFeeTooLow": () => (/* binding */ PriorityFeeTooLow),
/* harmony export */   "RecipientRequired": () => (/* binding */ RecipientRequired),
/* harmony export */   "RecommendSubAccountsToEmpty": () => (/* binding */ RecommendSubAccountsToEmpty),
/* harmony export */   "RecommendUndelegation": () => (/* binding */ RecommendUndelegation),
/* harmony export */   "ReplacementTransactionUnderpriced": () => (/* binding */ ReplacementTransactionUnderpriced),
/* harmony export */   "StatusCodes": () => (/* binding */ StatusCodes),
/* harmony export */   "SyncError": () => (/* binding */ SyncError),
/* harmony export */   "TimeoutTagged": () => (/* binding */ TimeoutTagged),
/* harmony export */   "TransactionHasBeenValidatedError": () => (/* binding */ TransactionHasBeenValidatedError),
/* harmony export */   "TransportError": () => (/* binding */ TransportError),
/* harmony export */   "TransportExchangeTimeoutError": () => (/* binding */ TransportExchangeTimeoutError),
/* harmony export */   "TransportInterfaceNotAvailable": () => (/* binding */ TransportInterfaceNotAvailable),
/* harmony export */   "TransportOpenUserCancelled": () => (/* binding */ TransportOpenUserCancelled),
/* harmony export */   "TransportRaceCondition": () => (/* binding */ TransportRaceCondition),
/* harmony export */   "TransportStatusError": () => (/* binding */ TransportStatusError),
/* harmony export */   "TransportWebUSBGestureRequired": () => (/* binding */ TransportWebUSBGestureRequired),
/* harmony export */   "UnavailableTezosOriginatedAccountReceive": () => (/* binding */ UnavailableTezosOriginatedAccountReceive),
/* harmony export */   "UnavailableTezosOriginatedAccountSend": () => (/* binding */ UnavailableTezosOriginatedAccountSend),
/* harmony export */   "UnexpectedBootloader": () => (/* binding */ UnexpectedBootloader),
/* harmony export */   "UnknownMCU": () => (/* binding */ UnknownMCU),
/* harmony export */   "UnresponsiveDeviceError": () => (/* binding */ UnresponsiveDeviceError),
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


const AccountNameRequiredError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("AccountNameRequired");
const AccountNotSupported = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("AccountNotSupported");
const AmountRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("AmountRequired");
const BluetoothRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("BluetoothRequired");
const BtcUnmatchedApp = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("BtcUnmatchedApp");
const CantOpenDevice = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("CantOpenDevice");
const CashAddrNotSupported = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("CashAddrNotSupported");
const ClaimRewardsFeesWarning = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ClaimRewardsFeesWarning");
const CurrencyNotSupported = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("CurrencyNotSupported");
const DeviceAppVerifyNotSupported = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceAppVerifyNotSupported");
const DeviceGenuineSocketEarlyClose = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceGenuineSocketEarlyClose");
const DeviceNotGenuineError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceNotGenuine");
const DeviceOnDashboardExpected = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceOnDashboardExpected");
const DeviceOnDashboardUnexpected = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceOnDashboardUnexpected");
const DeviceInOSUExpected = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceInOSUExpected");
const DeviceHalted = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceHalted");
const DeviceNameInvalid = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceNameInvalid");
const DeviceSocketFail = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceSocketFail");
const DeviceSocketNoBulkStatus = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceSocketNoBulkStatus");
const DeviceNeedsRestart = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceSocketNoBulkStatus");
const UnresponsiveDeviceError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UnresponsiveDeviceError");
const DisconnectedDevice = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DisconnectedDevice");
const DisconnectedDeviceDuringOperation = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DisconnectedDeviceDuringOperation");
const DeviceExtractOnboardingStateError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceExtractOnboardingStateError");
const DeviceOnboardingStatePollingError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceOnboardingStatePollingError");
const EnpointConfigError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("EnpointConfig");
const EthAppPleaseEnableContractData = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("EthAppPleaseEnableContractData");
const FeeEstimationFailed = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("FeeEstimationFailed");
const FirmwareNotRecognized = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("FirmwareNotRecognized");
const HardResetFail = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("HardResetFail");
const InvalidXRPTag = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("InvalidXRPTag");
const InvalidAddress = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("InvalidAddress");
const InvalidNonce = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("InvalidNonce");
const InvalidAddressBecauseDestinationIsAlsoSource = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("InvalidAddressBecauseDestinationIsAlsoSource");
const LatestMCUInstalledError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("LatestMCUInstalledError");
const UnknownMCU = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UnknownMCU");
const LedgerAPIError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("LedgerAPIError");
const LedgerAPIErrorWithMessage = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("LedgerAPIErrorWithMessage");
const LedgerAPINotAvailable = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("LedgerAPINotAvailable");
const ManagerAppAlreadyInstalledError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerAppAlreadyInstalled");
const ManagerAppRelyOnBTCError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerAppRelyOnBTC");
const ManagerAppDepInstallRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerAppDepInstallRequired");
const ManagerAppDepUninstallRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerAppDepUninstallRequired");
const ManagerDeviceLockedError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerDeviceLocked");
const ManagerFirmwareNotEnoughSpaceError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerFirmwareNotEnoughSpace");
const ManagerNotEnoughSpaceError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerNotEnoughSpace");
const ManagerUninstallBTCDep = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ManagerUninstallBTCDep");
const NetworkDown = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NetworkDown");
const NetworkError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NetworkError");
const NoAddressesFound = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NoAddressesFound");
const NotEnoughBalance = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotEnoughBalance");
const NotEnoughBalanceToDelegate = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotEnoughBalanceToDelegate");
const NotEnoughBalanceInParentAccount = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotEnoughBalanceInParentAccount");
const NotEnoughSpendableBalance = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotEnoughSpendableBalance");
const NotEnoughBalanceBecauseDestinationNotCreated = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotEnoughBalanceBecauseDestinationNotCreated");
const NoAccessToCamera = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NoAccessToCamera");
const NotEnoughGas = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotEnoughGas");
// Error message specifically for the PTX swap flow
const NotEnoughGasSwap = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotEnoughGasSwap");
const NotSupportedLegacyAddress = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NotSupportedLegacyAddress");
const GasLessThanEstimate = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("GasLessThanEstimate");
const PriorityFeeTooLow = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("PriorityFeeTooLow");
const PriorityFeeTooHigh = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("PriorityFeeTooHigh");
const PriorityFeeHigherThanMaxFee = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("PriorityFeeHigherThanMaxFee");
const MaxFeeTooLow = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("MaxFeeTooLow");
const PasswordsDontMatchError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("PasswordsDontMatch");
const PasswordIncorrectError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("PasswordIncorrect");
const RecommendSubAccountsToEmpty = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("RecommendSubAccountsToEmpty");
const RecommendUndelegation = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("RecommendUndelegation");
const TimeoutTagged = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("TimeoutTagged");
const UnexpectedBootloader = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UnexpectedBootloader");
const MCUNotGenuineToDashboard = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("MCUNotGenuineToDashboard");
const RecipientRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("RecipientRequired");
const UnavailableTezosOriginatedAccountReceive = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UnavailableTezosOriginatedAccountReceive");
const UnavailableTezosOriginatedAccountSend = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UnavailableTezosOriginatedAccountSend");
const UpdateFetchFileFail = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UpdateFetchFileFail");
const UpdateIncorrectHash = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UpdateIncorrectHash");
const UpdateIncorrectSig = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UpdateIncorrectSig");
const UpdateYourApp = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UpdateYourApp");
const UserRefusedDeviceNameChange = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UserRefusedDeviceNameChange");
const UserRefusedAddress = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UserRefusedAddress");
const UserRefusedFirmwareUpdate = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UserRefusedFirmwareUpdate");
const UserRefusedAllowManager = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UserRefusedAllowManager");
const UserRefusedOnDevice = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("UserRefusedOnDevice"); // TODO rename because it's just for transaction refusal
const ExpertModeRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ExpertModeRequired");
const TransportOpenUserCancelled = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("TransportOpenUserCancelled");
const TransportInterfaceNotAvailable = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("TransportInterfaceNotAvailable");
const TransportRaceCondition = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("TransportRaceCondition");
const TransportWebUSBGestureRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("TransportWebUSBGestureRequired");
const TransactionHasBeenValidatedError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("TransactionHasBeenValidatedError");
const TransportExchangeTimeoutError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("TransportExchangeTimeoutError");
const DeviceShouldStayInApp = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DeviceShouldStayInApp");
const WebsocketConnectionError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("WebsocketConnectionError");
const WebsocketConnectionFailed = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("WebsocketConnectionFailed");
const WrongDeviceForAccount = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("WrongDeviceForAccount");
const WrongAppForCurrency = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("WrongAppForCurrency");
const ETHAddressNonEIP = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ETHAddressNonEIP");
const CantScanQRCode = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("CantScanQRCode");
const FeeNotLoaded = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("FeeNotLoaded");
const FeeNotLoadedSwap = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("FeeNotLoadedSwap");
const FeeRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("FeeRequired");
const FeeTooHigh = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("FeeTooHigh");
const PendingOperation = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("PendingOperation");
const SyncError = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("SyncError");
const PairingFailed = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("PairingFailed");
const PeerRemovedPairing = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("PeerRemovedPairing");
const GenuineCheckFailed = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("GenuineCheckFailed");
const LedgerAPI4xx = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("LedgerAPI4xx");
const LedgerAPI5xx = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("LedgerAPI5xx");
const FirmwareOrAppUpdateRequired = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("FirmwareOrAppUpdateRequired");
// SpeedUp / Cancel EVM tx
const ReplacementTransactionUnderpriced = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("ReplacementTransactionUnderpriced");
// Bitcoin family
const OpReturnDataSizeLimit = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("OpReturnSizeLimit");
const DustLimit = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DustLimit");
// Language
const LanguageNotFound = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("LanguageNotFound");
// db stuff, no need to translate
const NoDBPathGiven = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("NoDBPathGiven");
const DBWrongPassword = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DBWrongPassword");
const DBNotReset = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.createCustomErrorClass)("DBNotReset");
/**
 * Type of a Transport error used to represent all equivalent errors coming from all possible implementation of Transport
 */
var HwTransportErrorType;
(function (HwTransportErrorType) {
    HwTransportErrorType["Unknown"] = "Unknown";
    HwTransportErrorType["LocationServicesDisabled"] = "LocationServicesDisabled";
    HwTransportErrorType["LocationServicesUnauthorized"] = "LocationServicesUnauthorized";
    HwTransportErrorType["BluetoothScanStartFailed"] = "BluetoothScanStartFailed";
})(HwTransportErrorType || (HwTransportErrorType = {}));
/**
 * Represents an error coming from the usage of any Transport implementation.
 *
 * Needed to map a specific implementation error into an error that
 * can be managed by any code unaware of the specific Transport implementation
 * that was used.
 */
class HwTransportError extends Error {
    constructor(type, message) {
        super(message);
        this.name = "HwTransportError";
        this.type = type;
        // Needed as long as we target < ES6
        Object.setPrototypeOf(this, HwTransportError.prototype);
    }
}
/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the device for various reason.
 */
class TransportError extends Error {
    constructor(message, id) {
        const name = "TransportError";
        super(message || name);
        this.name = name;
        this.message = message;
        this.stack = new Error(message).stack;
        this.id = id;
    }
}
(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.addCustomErrorDeserializer)("TransportError", e => new TransportError(e.message, e.id));
const StatusCodes = {
    ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
    ALGORITHM_NOT_SUPPORTED: 0x9484,
    CLA_NOT_SUPPORTED: 0x6e00,
    CODE_BLOCKED: 0x9840,
    CODE_NOT_INITIALIZED: 0x9802,
    COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
    CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
    CONTRADICTION_INVALIDATION: 0x9810,
    CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
    CUSTOM_IMAGE_BOOTLOADER: 0x662f,
    CUSTOM_IMAGE_EMPTY: 0x662e,
    FILE_ALREADY_EXISTS: 0x6a89,
    FILE_NOT_FOUND: 0x9404,
    GP_AUTH_FAILED: 0x6300,
    HALTED: 0x6faa,
    INCONSISTENT_FILE: 0x9408,
    INCORRECT_DATA: 0x6a80,
    INCORRECT_LENGTH: 0x6700,
    INCORRECT_P1_P2: 0x6b00,
    INS_NOT_SUPPORTED: 0x6d00,
    DEVICE_NOT_ONBOARDED: 0x6d07,
    DEVICE_NOT_ONBOARDED_2: 0x6611,
    INVALID_KCV: 0x9485,
    INVALID_OFFSET: 0x9402,
    LICENSING: 0x6f42,
    LOCKED_DEVICE: 0x5515,
    MAX_VALUE_REACHED: 0x9850,
    MEMORY_PROBLEM: 0x9240,
    MISSING_CRITICAL_PARAMETER: 0x6800,
    NO_EF_SELECTED: 0x9400,
    NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
    OK: 0x9000,
    PIN_REMAINING_ATTEMPTS: 0x63c0,
    REFERENCED_DATA_NOT_FOUND: 0x6a88,
    SECURITY_STATUS_NOT_SATISFIED: 0x6982,
    TECHNICAL_PROBLEM: 0x6f00,
    UNKNOWN_APDU: 0x6d02,
    USER_REFUSED_ON_DEVICE: 0x5501,
    NOT_ENOUGH_SPACE: 0x5102,
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
        case 0x5515:
            return "Locked device";
    }
    if (0x6f00 <= code && code <= 0x6fff) {
        return "Internal error, please report";
    }
}
/**
 * Error thrown when a device returned a non success status.
 * the error.statusCode is one of the `StatusCodes` exported by this library.
 */
class TransportStatusError extends Error {
    /**
     * @param statusCode The error status code coming from a Transport implementation
     * @param options containing:
     *  - canBeMappedToChildError: enable the mapping of TransportStatusError to an error extending/inheriting from it
     *  . Ex: LockedDeviceError. Default to true.
     */
    constructor(statusCode, { canBeMappedToChildError = true } = {}) {
        const statusText = Object.keys(StatusCodes).find(k => StatusCodes[k] === statusCode) || "UNKNOWN_ERROR";
        const smsg = getAltStatusMessage(statusCode) || statusText;
        const statusCodeStr = statusCode.toString(16);
        const message = `Ledger device: ${smsg} (0x${statusCodeStr})`;
        super(message);
        this.name = "TransportStatusError";
        this.statusCode = statusCode;
        this.statusText = statusText;
        // Maps to a LockedDeviceError
        if (canBeMappedToChildError && statusCode === StatusCodes.LOCKED_DEVICE) {
            return new LockedDeviceError(message);
        }
    }
}
class LockedDeviceError extends TransportStatusError {
    constructor(message) {
        super(StatusCodes.LOCKED_DEVICE, { canBeMappedToChildError: false });
        if (message) {
            this.message = message;
        }
        this.name = "LockedDeviceError";
    }
}
(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.addCustomErrorDeserializer)("TransportStatusError", e => new TransportStatusError(e.statusCode));
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
/* harmony import */ var _ledgerhq_devices_hid_framing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ledgerhq/devices/hid-framing */ "./node_modules/@ledgerhq/devices/lib-es/hid-framing.js");
/* harmony import */ var _ledgerhq_devices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ledgerhq/devices */ "./node_modules/@ledgerhq/devices/lib-es/index.js");
/* harmony import */ var _ledgerhq_logs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ledgerhq/logs */ "./node_modules/@ledgerhq/logs/lib-es/index.js");
/* harmony import */ var _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ledgerhq/errors */ "./node_modules/@ledgerhq/errors/lib-es/index.js");
/* harmony import */ var _webusb__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./webusb */ "./node_modules/@ledgerhq/hw-transport-webusb/lib-es/webusb.js");
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






const configurationValue = 1;
const endpointNumber = 3;
/**
 * WebUSB Transport implementation
 * @example
 * import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
 * ...
 * TransportWebUSB.create().then(transport => ...)
 */
class TransportWebUSB extends _ledgerhq_hw_transport__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(device, interfaceNumber) {
        super();
        this.channel = Math.floor(Math.random() * 0xffff);
        this.packetSize = 64;
        this._disconnectEmitted = false;
        this._emitDisconnect = (e) => {
            if (this._disconnectEmitted)
                return;
            this._disconnectEmitted = true;
            this.emit("disconnect", e);
        };
        this.device = device;
        this.interfaceNumber = interfaceNumber;
        this.deviceModel = (0,_ledgerhq_devices__WEBPACK_IMPORTED_MODULE_2__.identifyUSBProductId)(device.productId);
    }
    /**
     * Similar to create() except it will always display the device permission (even if some devices are already accepted).
     */
    static request() {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield (0,_webusb__WEBPACK_IMPORTED_MODULE_5__.requestLedgerDevice)();
            return TransportWebUSB.open(device);
        });
    }
    /**
     * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
     */
    static openConnected() {
        return __awaiter(this, void 0, void 0, function* () {
            const devices = yield (0,_webusb__WEBPACK_IMPORTED_MODULE_5__.getLedgerDevices)();
            if (devices.length === 0)
                return null;
            return TransportWebUSB.open(devices[0]);
        });
    }
    /**
     * Create a Ledger transport with a USBDevice
     */
    static open(device) {
        return __awaiter(this, void 0, void 0, function* () {
            yield device.open();
            if (device.configuration === null) {
                yield device.selectConfiguration(configurationValue);
            }
            yield gracefullyResetDevice(device);
            const iface = device.configurations[0].interfaces.find(({ alternates }) => alternates.some(a => a.interfaceClass === 255));
            if (!iface) {
                throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_4__.TransportInterfaceNotAvailable("No WebUSB interface found for your Ledger device. Please upgrade firmware or contact techsupport.");
            }
            const interfaceNumber = iface.interfaceNumber;
            try {
                yield device.claimInterface(interfaceNumber);
            }
            catch (e) {
                yield device.close();
                throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_4__.TransportInterfaceNotAvailable(e.message);
            }
            const transport = new TransportWebUSB(device, interfaceNumber);
            const onDisconnect = e => {
                if (device === e.device) {
                    // $FlowFixMe
                    navigator.usb.removeEventListener("disconnect", onDisconnect);
                    transport._emitDisconnect(new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_4__.DisconnectedDevice());
                }
            };
            // $FlowFixMe
            navigator.usb.addEventListener("disconnect", onDisconnect);
            return transport;
        });
    }
    /**
     * Release the transport device
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.exchangeBusyPromise;
            yield this.device.releaseInterface(this.interfaceNumber);
            yield gracefullyResetDevice(this.device);
            yield this.device.close();
        });
    }
    /**
     * Exchange with the device using APDU protocol.
     * @param apdu
     * @returns a promise of apdu response
     */
    exchange(apdu) {
        return __awaiter(this, void 0, void 0, function* () {
            const b = yield this.exchangeAtomicImpl(() => __awaiter(this, void 0, void 0, function* () {
                const { channel, packetSize } = this;
                (0,_ledgerhq_logs__WEBPACK_IMPORTED_MODULE_3__.log)("apdu", "=> " + apdu.toString("hex"));
                const framing = (0,_ledgerhq_devices_hid_framing__WEBPACK_IMPORTED_MODULE_1__["default"])(channel, packetSize);
                // Write...
                const blocks = framing.makeBlocks(apdu);
                for (let i = 0; i < blocks.length; i++) {
                    yield this.device.transferOut(endpointNumber, blocks[i]);
                }
                // Read...
                let result;
                let acc;
                while (!(result = framing.getReducedResult(acc))) {
                    const r = yield this.device.transferIn(endpointNumber, packetSize);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const buffer = Buffer.from(r.data.buffer);
                    acc = framing.reduceResponse(acc, buffer);
                }
                (0,_ledgerhq_logs__WEBPACK_IMPORTED_MODULE_3__.log)("apdu", "<= " + result.toString("hex"));
                return result;
            })).catch(e => {
                if (e && e.message && e.message.includes("disconnected")) {
                    this._emitDisconnect(e);
                    throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_4__.DisconnectedDeviceDuringOperation(e.message);
                }
                throw e;
            });
            return b;
        });
    }
    setScrambleKey() { }
}
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
TransportWebUSB.listen = (observer) => {
    let unsubscribed = false;
    (0,_webusb__WEBPACK_IMPORTED_MODULE_5__.getFirstLedgerDevice)().then(device => {
        if (!unsubscribed) {
            const deviceModel = (0,_ledgerhq_devices__WEBPACK_IMPORTED_MODULE_2__.identifyUSBProductId)(device.productId);
            observer.next({
                type: "add",
                descriptor: device,
                deviceModel,
            });
            observer.complete();
        }
    }, error => {
        if (window.DOMException && error instanceof window.DOMException && error.code === 18) {
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
        unsubscribe,
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TransportWebUSB);
function gracefullyResetDevice(device) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield device.reset();
        }
        catch (err) {
            console.warn(err);
        }
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

const ledgerDevices = [
    {
        vendorId: _ledgerhq_devices__WEBPACK_IMPORTED_MODULE_0__.ledgerUSBVendorId,
    },
];
function requestLedgerDevice() {
    return __awaiter(this, void 0, void 0, function* () {
        const device = yield navigator.usb.requestDevice({
            filters: ledgerDevices,
        });
        return device;
    });
}
function getLedgerDevices() {
    return __awaiter(this, void 0, void 0, function* () {
        const devices = yield navigator.usb.getDevices();
        return devices.filter(d => d.vendorId === _ledgerhq_devices__WEBPACK_IMPORTED_MODULE_0__.ledgerUSBVendorId);
    });
}
function getFirstLedgerDevice() {
    return __awaiter(this, void 0, void 0, function* () {
        const existingDevices = yield getLedgerDevices();
        if (existingDevices.length > 0)
            return existingDevices[0];
        return requestLedgerDevice();
    });
}
const isSupported = () => Promise.resolve(!!navigator && !!navigator.usb && typeof navigator.usb.getDevices === "function");
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
/* harmony import */ var _ledgerhq_logs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ledgerhq/logs */ "./node_modules/@ledgerhq/logs/lib-es/index.js");
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




const DEFAULT_LOG_TYPE = "transport";
/**
 * The Transport class defines a generic interface for communicating with a Ledger hardware wallet.
 * There are different kind of transports based on the technology (channels like U2F, HID, Bluetooth, Webusb) and environment (Node, Web,...).
 * It is an abstract class that needs to be implemented.
 */
class Transport {
    constructor({ context, logType } = {}) {
        this.exchangeTimeout = 30000;
        this.unresponsiveTimeout = 15000;
        this.deviceModel = null;
        this._events = new (events__WEBPACK_IMPORTED_MODULE_0___default())();
        /**
         * Send data to the device using the higher level API.
         *
         * @param {number} cla - The instruction class for the command.
         * @param {number} ins - The instruction code for the command.
         * @param {number} p1 - The first parameter for the instruction.
         * @param {number} p2 - The second parameter for the instruction.
         * @param {Buffer} data - The data to be sent. Defaults to an empty buffer.
         * @param {Array<number>} statusList - A list of acceptable status codes for the response. Defaults to [StatusCodes.OK].
         * @param {Object} options - Contains optional options for the exchange function
         *  - abortTimeoutMs: stop the send after a given timeout. Another timeout exists
         *    to detect unresponsive device (see `unresponsiveTimeout`). This timeout aborts the exchange.
         * @returns {Promise<Buffer>} A promise that resolves with the response data from the device.
         */
        this.send = (cla, ins, p1, p2, data = Buffer.alloc(0), statusList = [_ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.StatusCodes.OK], { abortTimeoutMs } = {}) => __awaiter(this, void 0, void 0, function* () {
            const tracer = this.tracer.withUpdatedContext({ function: "send" });
            if (data.length >= 256) {
                tracer.trace("data.length exceeded 256 bytes limit", { dataLength: data.length });
                throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportError("data.length exceed 256 bytes limit. Got: " + data.length, "DataLengthTooBig");
            }
            tracer.trace("Starting an exchange", { abortTimeoutMs });
            const response = yield this.exchange(
            // The size of the data is added in 1 byte just before `data`
            Buffer.concat([Buffer.from([cla, ins, p1, p2]), Buffer.from([data.length]), data]), { abortTimeoutMs });
            tracer.trace("Received response from exchange");
            const sw = response.readUInt16BE(response.length - 2);
            if (!statusList.some(s => s === sw)) {
                throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportStatusError(sw);
            }
            return response;
        });
        this._appAPIlock = null;
        this.tracer = new _ledgerhq_logs__WEBPACK_IMPORTED_MODULE_2__.LocalTracer(logType !== null && logType !== void 0 ? logType : DEFAULT_LOG_TYPE, context);
    }
    /**
     * Send data to the device using a low level API.
     * It's recommended to use the "send" method for a higher level API.
     * @param {Buffer} apdu - The data to send.
     * @param {Object} options - Contains optional options for the exchange function
     *  - abortTimeoutMs: stop the exchange after a given timeout. Another timeout exists
     *    to detect unresponsive device (see `unresponsiveTimeout`). This timeout aborts the exchange.
     * @returns {Promise<Buffer>} A promise that resolves with the response data from the device.
     */
    exchange(_apdu, { abortTimeoutMs: _abortTimeoutMs } = {}) {
        throw new Error("exchange not implemented");
    }
    /**
     * Send apdus in batch to the device using a low level API.
     * The default implementation is to call exchange for each apdu.
     * @param {Array<Buffer>} apdus - array of apdus to send.
     * @param {Observer<Buffer>} observer - an observer that will receive the response of each apdu.
     * @returns {Subscription} A Subscription object on which you can call ".unsubscribe()" to stop sending apdus.
     */
    exchangeBulk(apdus, observer) {
        let unsubscribed = false;
        const unsubscribe = () => {
            unsubscribed = true;
        };
        const main = () => __awaiter(this, void 0, void 0, function* () {
            if (unsubscribed)
                return;
            for (const apdu of apdus) {
                const r = yield this.exchange(apdu);
                if (unsubscribed)
                    return;
                const status = r.readUInt16BE(r.length - 2);
                if (status !== _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.StatusCodes.OK) {
                    throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportStatusError(status);
                }
                observer.next(r);
            }
        });
        main().then(() => !unsubscribed && observer.complete(), e => !unsubscribed && observer.error(e));
        return { unsubscribe };
    }
    /**
     * Set the "scramble key" for the next data exchanges with the device.
     * Each app can have a different scramble key and it is set internally during instantiation.
     * @param {string} key - The scramble key to set.
     * deprecated This method is no longer needed for modern transports and should be migrated away from.
     * no @ before deprecated as it breaks documentationjs on version 14.0.2
     * https://github.com/documentationjs/documentation/issues/1596
     */
    setScrambleKey(_key) { }
    /**
     * Close the connection with the device.
     *
     * Note: for certain transports (hw-transport-node-hid-singleton for ex), once the promise resolved,
     * the transport instance is actually still cached, and the device is disconnected only after a defined timeout.
     * But for the consumer of the Transport, this does not matter and it can consider the transport to be closed.
     *
     * @returns {Promise<void>} A promise that resolves when the transport is closed.
     */
    close() {
        return Promise.resolve();
    }
    /**
     * Listen for an event on the transport instance.
     * Transport implementations may have specific events. Common events include:
     * "disconnect" : triggered when the transport is disconnected.
     * @param {string} eventName - The name of the event to listen for.
     * @param {(...args: Array<any>) => any} cb - The callback function to be invoked when the event occurs.
     */
    on(eventName, cb) {
        this._events.on(eventName, cb);
    }
    /**
     * Stop listening to an event on an instance of transport.
     */
    off(eventName, cb) {
        this._events.removeListener(eventName, cb);
    }
    emit(event, ...args) {
        this._events.emit(event, ...args);
    }
    /**
     * Enable or not logs of the binary exchange
     */
    setDebugMode() {
        console.warn("setDebugMode is deprecated. use @ledgerhq/logs instead. No logs are emitted in this anymore.");
    }
    /**
     * Set a timeout (in milliseconds) for the exchange call. Only some transport might implement it. (e.g. U2F)
     */
    setExchangeTimeout(exchangeTimeout) {
        this.exchangeTimeout = exchangeTimeout;
    }
    /**
     * Define the delay before emitting "unresponsive" on an exchange that does not respond
     */
    setExchangeUnresponsiveTimeout(unresponsiveTimeout) {
        this.unresponsiveTimeout = unresponsiveTimeout;
    }
    /**
     * create() allows to open the first descriptor available or
     * throw if there is none or if timeout is reached.
     * This is a light helper, alternative to using listen() and open() (that you may need for any more advanced usecase)
     * @example
    TransportFoo.create().then(transport => ...)
     */
    static create(openTimeout = 3000, listenTimeout) {
        return new Promise((resolve, reject) => {
            let found = false;
            const sub = this.listen({
                next: e => {
                    found = true;
                    if (sub)
                        sub.unsubscribe();
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    this.open(e.descriptor, openTimeout).then(resolve, reject);
                },
                error: e => {
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    reject(e);
                },
                complete: () => {
                    if (listenTimeoutId)
                        clearTimeout(listenTimeoutId);
                    if (!found) {
                        reject(new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportError(this.ErrorMessage_NoDeviceFound, "NoDeviceFound"));
                    }
                },
            });
            const listenTimeoutId = listenTimeout
                ? setTimeout(() => {
                    sub.unsubscribe();
                    reject(new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportError(this.ErrorMessage_ListenTimeout, "ListenTimeout"));
                }, listenTimeout)
                : null;
        });
    }
    /**
     * Wrapper to make an exchange "atomic" (blocking any other exchange)
     *
     * It also handles "unresponsiveness" by emitting "unresponsive" and "responsive" events.
     *
     * @param f The exchange job, using the transport to run
     * @returns a Promise resolving with the output of the given job
     */
    exchangeAtomicImpl(f) {
        return __awaiter(this, void 0, void 0, function* () {
            const tracer = this.tracer.withUpdatedContext({
                function: "exchangeAtomicImpl",
                unresponsiveTimeout: this.unresponsiveTimeout,
            });
            if (this.exchangeBusyPromise) {
                tracer.trace("Atomic exchange is already busy");
                throw new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportRaceCondition("An action was already pending on the Ledger device. Please deny or reconnect.");
            }
            // Sets the atomic guard
            let resolveBusy;
            const busyPromise = new Promise(r => {
                resolveBusy = r;
            });
            this.exchangeBusyPromise = busyPromise;
            // The device unresponsiveness handler
            let unresponsiveReached = false;
            const timeout = setTimeout(() => {
                tracer.trace(`Timeout reached, emitting Transport event "unresponsive"`, {
                    unresponsiveTimeout: this.unresponsiveTimeout,
                });
                unresponsiveReached = true;
                this.emit("unresponsive");
            }, this.unresponsiveTimeout);
            try {
                const res = yield f();
                if (unresponsiveReached) {
                    tracer.trace("Device was unresponsive, emitting responsive");
                    this.emit("responsive");
                }
                return res;
            }
            finally {
                tracer.trace("Finalize, clearing busy guard");
                clearTimeout(timeout);
                if (resolveBusy)
                    resolveBusy();
                this.exchangeBusyPromise = null;
            }
        });
    }
    decorateAppAPIMethods(self, methods, scrambleKey) {
        for (const methodName of methods) {
            self[methodName] = this.decorateAppAPIMethod(methodName, self[methodName], self, scrambleKey);
        }
    }
    decorateAppAPIMethod(methodName, f, ctx, scrambleKey) {
        return (...args) => __awaiter(this, void 0, void 0, function* () {
            const { _appAPIlock } = this;
            if (_appAPIlock) {
                return Promise.reject(new _ledgerhq_errors__WEBPACK_IMPORTED_MODULE_1__.TransportError("Ledger Device is busy (lock " + _appAPIlock + ")", "TransportLocked"));
            }
            try {
                this._appAPIlock = methodName;
                this.setScrambleKey(scrambleKey);
                return yield f.apply(ctx, args);
            }
            finally {
                this._appAPIlock = null;
            }
        });
    }
    /**
     * Sets the context used by the logging/tracing mechanism
     *
     * Useful when re-using (cached) the same Transport instance,
     * but with a new tracing context.
     *
     * @param context A TraceContext, that can undefined to reset the context
     */
    setTraceContext(context) {
        this.tracer = this.tracer.withContext(context);
    }
    /**
     * Updates the context used by the logging/tracing mechanism
     *
     * The update only overrides the key-value that are already defined in the current context.
     *
     * @param contextToAdd A TraceContext that will be added to the current context
     */
    updateTraceContext(contextToAdd) {
        this.tracer.updateContext(contextToAdd);
    }
    /**
     * Gets the tracing context of the transport instance
     */
    getTraceContext() {
        return this.tracer.getContext();
    }
}
Transport.ErrorMessage_ListenTimeout = "No Ledger device found (timeout)";
Transport.ErrorMessage_NoDeviceFound = "No Ledger device found";
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
/* harmony export */   "LocalTracer": () => (/* binding */ LocalTracer),
/* harmony export */   "listen": () => (/* binding */ listen),
/* harmony export */   "log": () => (/* binding */ log),
/* harmony export */   "trace": () => (/* binding */ trace)
/* harmony export */ });
let id = 0;
const subscribers = [];
/**
 * Logs something
 *
 * @param type a namespaced identifier of the log (it is not a level like "debug", "error" but more like "apdu-in", "apdu-out", etc...)
 * @param message a clear message of the log associated to the type
 */
const log = (type, message, data) => {
    const obj = {
        type,
        id: String(++id),
        date: new Date(),
    };
    if (message)
        obj.message = message;
    if (data)
        obj.data = data;
    dispatch(obj);
};
/**
 * A simple tracer function, only expanding the existing log function
 *
 * Its goal is to capture more context than a log function.
 * This is simple for now, but can be improved later.
 *
 * @param context Anything representing the context where the log occurred
 */
const trace = ({ type, message, data, context, }) => {
    const obj = {
        type,
        id: String(++id),
        date: new Date(),
    };
    if (message)
        obj.message = message;
    if (data)
        obj.data = data;
    if (context)
        obj.context = context;
    dispatch(obj);
};
/**
 * A simple tracer class, that can be used to avoid repetition when using the `trace` function
 *
 * Its goal is to capture more context than a log function.
 * This is simple for now, but can be improved later.
 *
 * @param type A given type (not level) for the current local tracer ("hw", "withDevice", etc.)
 * @param context Anything representing the context where the log occurred
 */
class LocalTracer {
    constructor(type, context) {
        this.type = type;
        this.context = context;
    }
    trace(message, data) {
        trace({
            type: this.type,
            message,
            data,
            context: this.context,
        });
    }
    getContext() {
        return this.context;
    }
    setContext(context) {
        this.context = context;
    }
    updateContext(contextToAdd) {
        this.context = Object.assign(Object.assign({}, this.context), contextToAdd);
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    /**
     * Create a new instance of the LocalTracer with an updated `type`
     *
     * It does not mutate the calling instance, but returns a new LocalTracer,
     * following a simple builder pattern.
     */
    withType(type) {
        return new LocalTracer(type, this.context);
    }
    /**
     * Create a new instance of the LocalTracer with a new `context`
     *
     * It does not mutate the calling instance, but returns a new LocalTracer,
     * following a simple builder pattern.
     *
     * @param context A TraceContext, that can undefined to reset the context
     */
    withContext(context) {
        return new LocalTracer(this.type, context);
    }
    /**
     * Create a new instance of the LocalTracer with an updated `context`,
     * on which an additional context is merged with the existing one.
     *
     * It does not mutate the calling instance, but returns a new LocalTracer,
     * following a simple builder pattern.
     */
    withUpdatedContext(contextToAdd) {
        return new LocalTracer(this.type, Object.assign(Object.assign({}, this.context), contextToAdd));
    }
}
/**
 * Adds a subscribers to the emitted logs.
 *
 * @param cb that is called for each future log() with the Log object
 * @return a function that can be called to unsubscribe the listener
 */
const listen = (cb) => {
    subscribers.push(cb);
    return () => {
        const i = subscribers.indexOf(cb);
        if (i !== -1) {
            // equivalent of subscribers.splice(i, 1) // https://twitter.com/Rich_Harris/status/1125850391155965952
            subscribers[i] = subscribers[subscribers.length - 1];
            subscribers.pop();
        }
    };
};
function dispatch(log) {
    for (let i = 0; i < subscribers.length; i++) {
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.serializePath = exports.getVersion = exports.processErrorResponse = exports.errorCodeToString = exports.ERROR_DESCRIPTION = exports.LedgerError = exports.SIGLEN_RS = exports.SIGLEN_RSV = exports.PKLEN = exports.P1_VALUES = exports.PAYLOAD_TYPE = exports.INS = exports.ADDRESS_LEN = exports.APP_KEY = exports.CHUNK_SIZE = exports.CLA = void 0;
exports.CLA = 0x11;
exports.CHUNK_SIZE = 250;
exports.APP_KEY = 'DFN';
exports.ADDRESS_LEN = 68;
exports.INS = {
    GET_VERSION: 0x00,
    GET_ADDR_SECP256K1: 0x01,
    SIGN_SECP256K1: 0x02,
    SIGN_MESSAGE: 0x03,
    SIGN_WASM_DEPLOY: 0x04,
};
exports.PAYLOAD_TYPE = {
    INIT: 0x00,
    ADD: 0x01,
    LAST: 0x02,
};
exports.P1_VALUES = {
    ONLY_RETRIEVE: 0x00,
    SHOW_ADDRESS_IN_DEVICE: 0x01,
};
exports.PKLEN = 33;
exports.SIGLEN_RSV = 65;
exports.SIGLEN_RS = 64;
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
    return "Unknown Status Code: ".concat(statusCode);
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
                    errorMessage: errorCodeToString(response.statusCode),
                };
            }
            if (Object.prototype.hasOwnProperty.call(response, 'returnCode') &&
                Object.prototype.hasOwnProperty.call(response, 'errorMessage')) {
                return response;
            }
        }
        return {
            returnCode: 0xffff,
            errorMessage: response.toString(),
        };
    }
    return {
        returnCode: 0xffff,
        errorMessage: response.toString(),
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
                        targetId: targetId.toString(16),
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
            throw new Error("Invalid path : ".concat(child, " is not a number. (e.g \"m/44'/461'/5'/0/3\")"));
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
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LedgerError = void 0;
var common_1 = __webpack_require__(/*! ./common */ "./node_modules/@zondax/ledger-casper/dist/common.js");
Object.defineProperty(exports, "LedgerError", ({ enumerable: true, get: function () { return common_1.LedgerError; } }));
__exportStar(__webpack_require__(/*! ./types */ "./node_modules/@zondax/ledger-casper/dist/types.js"), exports);
function processGetAddrResponse(response) {
    var partialResponse = response;
    var errorCodeData = partialResponse.slice(-2);
    var returnCode = (errorCodeData[0] * 256 + errorCodeData[1]);
    var publicKey = Buffer.from(partialResponse.slice(0, common_1.PKLEN));
    partialResponse = partialResponse.slice(common_1.PKLEN);
    var Address = Buffer.from(partialResponse.slice(0, -2)).toString();
    return {
        publicKey: publicKey,
        Address: Address,
        returnCode: returnCode,
        errorMessage: (0, common_1.errorCodeToString)(returnCode),
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
                return [2 /*return*/, CasperApp.prepareChunks((0, common_1.serializePath)(path), message)];
            });
        });
    };
    CasperApp.prototype.getVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, common_1.getVersion)(this.transport).catch(function (err) { return (0, common_1.processErrorResponse)(err); })];
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
                            errorMessage: (0, common_1.errorCodeToString)(returnCode),
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
                            flagPINValidated: (flagsValue & 128) !== 0,
                        };
                    }, common_1.processErrorResponse)];
            });
        });
    };
    CasperApp.prototype.getAddressAndPubKey = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var serializedPath;
            return __generator(this, function (_a) {
                serializedPath = (0, common_1.serializePath)(path);
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
                serializedPath = (0, common_1.serializePath)(path);
                return [2 /*return*/, this.transport
                        .send(common_1.CLA, common_1.INS.GET_ADDR_SECP256K1, common_1.P1_VALUES.SHOW_ADDRESS_IN_DEVICE, 0, serializedPath, [
                        common_1.LedgerError.NoErrors,
                    ])
                        .then(processGetAddrResponse, common_1.processErrorResponse)];
            });
        });
    };
    CasperApp.prototype.signSendChunk = function (chunkIdx, chunkNum, chunk, instruction) {
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
                        .send(common_1.CLA, instruction, payloadType, 0, chunk, [
                        common_1.LedgerError.NoErrors,
                        common_1.LedgerError.DataIsInvalid,
                        common_1.LedgerError.BadKeyHandle,
                        common_1.LedgerError.SignVerifyError
                    ])
                        .then(function (response) {
                        var errorCodeData = response.slice(-2);
                        var returnCode = errorCodeData[0] * 256 + errorCodeData[1];
                        var errorMessage = (0, common_1.errorCodeToString)(returnCode);
                        var signatureRSV = Buffer.alloc(0);
                        var signatureRS = Buffer.alloc(0);
                        if (returnCode === common_1.LedgerError.BadKeyHandle ||
                            returnCode === common_1.LedgerError.DataIsInvalid ||
                            returnCode === common_1.LedgerError.SignVerifyError) {
                            errorMessage = "".concat(errorMessage, " : ").concat(response
                                .slice(0, response.length - 2)
                                .toString('ascii'));
                        }
                        if (returnCode === common_1.LedgerError.NoErrors && response.length > 2) {
                            signatureRSV = response.slice(0, common_1.SIGLEN_RSV);
                            signatureRS = response.slice(0, common_1.SIGLEN_RS);
                            return {
                                signatureRS: signatureRS,
                                signatureRSV: signatureRSV,
                                returnCode: returnCode,
                                errorMessage: errorMessage,
                            };
                        }
                        return {
                            returnCode: returnCode,
                            errorMessage: errorMessage,
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
                        return _this.signSendChunk(1, chunks.length, chunks[0], common_1.INS.SIGN_SECP256K1).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            var result, i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        result = {
                                            returnCode: response.returnCode,
                                            errorMessage: response.errorMessage,
                                            signatureRS: null,
                                            signatureRSV: null,
                                        };
                                        i = 1;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < chunks.length)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this.signSendChunk(1 + i, chunks.length, chunks[i], common_1.INS.SIGN_SECP256K1)];
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
    CasperApp.prototype.signMessage = function (path, message) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.signGetChunks(path, message).then(function (chunks) {
                        return _this.signSendChunk(1, chunks.length, chunks[0], common_1.INS.SIGN_MESSAGE).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            var result, i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        result = {
                                            returnCode: response.returnCode,
                                            errorMessage: response.errorMessage,
                                            signatureRS: null,
                                            signatureRSV: null,
                                        };
                                        i = 1;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < chunks.length)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this.signSendChunk(1 + i, chunks.length, chunks[i], common_1.INS.SIGN_MESSAGE)];
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
    CasperApp.prototype.signWasmDeploy = function (path, message) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.signGetChunks(path, message).then(function (chunks) {
                        return _this.signSendChunk(1, chunks.length, chunks[0], common_1.INS.SIGN_WASM_DEPLOY).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                            var result, i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        result = {
                                            returnCode: response.returnCode,
                                            errorMessage: response.errorMessage,
                                            signatureRS: null,
                                            signatureRSV: null,
                                        };
                                        i = 1;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < chunks.length)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this.signSendChunk(1 + i, chunks.length, chunks[i], common_1.INS.SIGN_WASM_DEPLOY)];
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

Object.defineProperty(exports, "__esModule", ({ value: true }));


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

    comp = comp.trim().split(/\s+/).join(' ')
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

    options = parseOptions(options)

    // Special cases where nothing can possibly be lower
    if (options.includePrerelease &&
      (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
      return false
    }
    if (!options.includePrerelease &&
      (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
      return false
    }

    // Same direction increasing (> or >=)
    if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
      return true
    }
    // Same direction decreasing (< or <=)
    if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
      return true
    }
    // same SemVer and both sides are inclusive (<= or >=)
    if (
      (this.semver.version === comp.semver.version) &&
      this.operator.includes('=') && comp.operator.includes('=')) {
      return true
    }
    // opposite directions less than
    if (cmp(this.semver, '<', comp.semver, options) &&
      this.operator.startsWith('>') && comp.operator.startsWith('<')) {
      return true
    }
    // opposite directions greater than
    if (cmp(this.semver, '>', comp.semver, options) &&
      this.operator.startsWith('<') && comp.operator.startsWith('>')) {
      return true
    }
    return false
  }
}

module.exports = Comparator

const parseOptions = __webpack_require__(/*! ../internal/parse-options */ "./node_modules/semver/internal/parse-options.js")
const { safeRe: re, t } = __webpack_require__(/*! ../internal/re */ "./node_modules/semver/internal/re.js")
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

    // First reduce all whitespace as much as possible so we do not have to rely
    // on potentially slow regexes like \s*. This is then stored and used for
    // future error messages as well.
    this.raw = range
      .trim()
      .split(/\s+/)
      .join(' ')

    // First, split on ||
    this.set = this.raw
      .split('||')
      // map the range to a 2d array of comparators
      .map(r => this.parseRange(r.trim()))
      // throw out any comparator lists that are empty
      // this generally means that it was not a valid range, which is allowed
      // in loose mode, but will still throw if the WHOLE range is invalid.
      .filter(c => c.length)

    if (!this.set.length) {
      throw new TypeError(`Invalid SemVer Range: ${this.raw}`)
    }

    // if we have any that are not the null set, throw out null sets.
    if (this.set.length > 1) {
      // keep the first one, in case they're all null sets
      const first = this.set[0]
      this.set = this.set.filter(c => !isNullSet(c[0]))
      if (this.set.length === 0) {
        this.set = [first]
      } else if (this.set.length > 1) {
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
      .map((comps) => comps.join(' ').trim())
      .join('||')
      .trim()
    return this.range
  }

  toString () {
    return this.range
  }

  parseRange (range) {
    // memoize range parsing for performance.
    // this is a very hot path, and fully deterministic.
    const memoOpts =
      (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) |
      (this.options.loose && FLAG_LOOSE)
    const memoKey = memoOpts + ':' + range
    const cached = cache.get(memoKey)
    if (cached) {
      return cached
    }

    const loose = this.options.loose
    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
    range = range.replace(hr, hyphenReplace(this.options.includePrerelease))
    debug('hyphen replace', range)

    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
    debug('comparator trim', range)

    // `~ 1.2.3` => `~1.2.3`
    range = range.replace(re[t.TILDETRIM], tildeTrimReplace)
    debug('tilde trim', range)

    // `^ 1.2.3` => `^1.2.3`
    range = range.replace(re[t.CARETTRIM], caretTrimReplace)
    debug('caret trim', range)

    // At this point, the range is completely trimmed and
    // ready to be split into comparators.

    let rangeList = range
      .split(' ')
      .map(comp => parseComparator(comp, this.options))
      .join(' ')
      .split(/\s+/)
      // >=0.0.0 is equivalent to *
      .map(comp => replaceGTE0(comp, this.options))

    if (loose) {
      // in loose mode, throw out any that are not valid comparators
      rangeList = rangeList.filter(comp => {
        debug('loose invalid filter', comp, this.options)
        return !!comp.match(re[t.COMPARATORLOOSE])
      })
    }
    debug('range list', rangeList)

    // if any comparators are the null set, then replace with JUST null set
    // if more than one comparator, remove any * comparators
    // also, don't include the same comparator more than once
    const rangeMap = new Map()
    const comparators = rangeList.map(comp => new Comparator(comp, this.options))
    for (const comp of comparators) {
      if (isNullSet(comp)) {
        return [comp]
      }
      rangeMap.set(comp.value, comp)
    }
    if (rangeMap.size > 1 && rangeMap.has('')) {
      rangeMap.delete('')
    }

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
  safeRe: re,
  t,
  comparatorTrimReplace,
  tildeTrimReplace,
  caretTrimReplace,
} = __webpack_require__(/*! ../internal/re */ "./node_modules/semver/internal/re.js")
const { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = __webpack_require__(/*! ../internal/constants */ "./node_modules/semver/internal/constants.js")

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
// ~0.0.1 --> >=0.0.1 <0.1.0-0
const replaceTildes = (comp, options) => {
  return comp
    .trim()
    .split(/\s+/)
    .map((c) => replaceTilde(c, options))
    .join(' ')
}

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
// ^0.0.1 --> >=0.0.1 <0.0.2-0
// ^0.1.0 --> >=0.1.0 <0.2.0-0
const replaceCarets = (comp, options) => {
  return comp
    .trim()
    .split(/\s+/)
    .map((c) => replaceCaret(c, options))
    .join(' ')
}

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
  return comp
    .split(/\s+/)
    .map((c) => replaceXRange(c, options))
    .join(' ')
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

      if (gtlt === '<') {
        pr = '-0'
      }

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
  return comp
    .trim()
    .replace(re[t.STAR], '')
}

const replaceGTE0 = (comp, options) => {
  debug('replaceGTE0', comp, options)
  return comp
    .trim()
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

  return `${from} ${to}`.trim()
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
const { safeRe: re, t } = __webpack_require__(/*! ../internal/re */ "./node_modules/semver/internal/re.js")

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
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`)
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
  inc (release, identifier, identifierBase) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor = 0
        this.major++
        this.inc('pre', identifier, identifierBase)
        break
      case 'preminor':
        this.prerelease.length = 0
        this.patch = 0
        this.minor++
        this.inc('pre', identifier, identifierBase)
        break
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0
        this.inc('patch', identifier, identifierBase)
        this.inc('pre', identifier, identifierBase)
        break
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier, identifierBase)
        }
        this.inc('pre', identifier, identifierBase)
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
      case 'pre': {
        const base = Number(identifierBase) ? 1 : 0

        if (!identifier && identifierBase === false) {
          throw new Error('invalid increment argument: identifier is empty')
        }

        if (this.prerelease.length === 0) {
          this.prerelease = [base]
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
            if (identifier === this.prerelease.join('.') && identifierBase === false) {
              throw new Error('invalid increment argument: identifier already exists')
            }
            this.prerelease.push(base)
          }
        }
        if (identifier) {
          // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
          // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
          let prerelease = [identifier, base]
          if (identifierBase === false) {
            prerelease = [identifier]
          }
          if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = prerelease
            }
          } else {
            this.prerelease = prerelease
          }
        }
        break
      }
      default:
        throw new Error(`invalid increment argument: ${release}`)
    }
    this.raw = this.format()
    if (this.build.length) {
      this.raw += `+${this.build.join('.')}`
    }
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
      if (typeof a === 'object') {
        a = a.version
      }
      if (typeof b === 'object') {
        b = b.version
      }
      return a === b

    case '!==':
      if (typeof a === 'object') {
        a = a.version
      }
      if (typeof b === 'object') {
        b = b.version
      }
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
const { safeRe: re, t } = __webpack_require__(/*! ../internal/re */ "./node_modules/semver/internal/re.js")

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
    match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE])
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    // With includePrerelease option set, '1.2.3.4-rc' wants to coerce '2.3.4-rc', not '2.3.4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL]
    let next
    while ((next = coerceRtlRegex.exec(version)) &&
        (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
            next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    coerceRtlRegex.lastIndex = -1
  }

  if (match === null) {
    return null
  }

  const major = match[2]
  const minor = match[3] || '0'
  const patch = match[4] || '0'
  const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : ''
  const build = options.includePrerelease && match[6] ? `+${match[6]}` : ''

  return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options)
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

const parse = __webpack_require__(/*! ./parse.js */ "./node_modules/semver/functions/parse.js")

const diff = (version1, version2) => {
  const v1 = parse(version1, null, true)
  const v2 = parse(version2, null, true)
  const comparison = v1.compare(v2)

  if (comparison === 0) {
    return null
  }

  const v1Higher = comparison > 0
  const highVersion = v1Higher ? v1 : v2
  const lowVersion = v1Higher ? v2 : v1
  const highHasPre = !!highVersion.prerelease.length
  const lowHasPre = !!lowVersion.prerelease.length

  if (lowHasPre && !highHasPre) {
    // Going from prerelease -> no prerelease requires some special casing

    // If the low version has only a major, then it will always be a major
    // Some examples:
    // 1.0.0-1 -> 1.0.0
    // 1.0.0-1 -> 1.1.1
    // 1.0.0-1 -> 2.0.0
    if (!lowVersion.patch && !lowVersion.minor) {
      return 'major'
    }

    // Otherwise it can be determined by checking the high version

    if (highVersion.patch) {
      // anything higher than a patch bump would result in the wrong version
      return 'patch'
    }

    if (highVersion.minor) {
      // anything higher than a minor bump would result in the wrong version
      return 'minor'
    }

    // bumping major/minor/patch all have same result
    return 'major'
  }

  // add the `pre` prefix if we are going to a prerelease version
  const prefix = highHasPre ? 'pre' : ''

  if (v1.major !== v2.major) {
    return prefix + 'major'
  }

  if (v1.minor !== v2.minor) {
    return prefix + 'minor'
  }

  if (v1.patch !== v2.patch) {
    return prefix + 'patch'
  }

  // high and low are preleases
  return 'prerelease'
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

const inc = (version, release, options, identifier, identifierBase) => {
  if (typeof (options) === 'string') {
    identifierBase = identifier
    identifier = options
    options = undefined
  }

  try {
    return new SemVer(
      version instanceof SemVer ? version.version : version,
      options
    ).inc(release, identifier, identifierBase).version
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

const SemVer = __webpack_require__(/*! ../classes/semver */ "./node_modules/semver/classes/semver.js")
const parse = (version, options, throwErrors = false) => {
  if (version instanceof SemVer) {
    return version
  }
  try {
    return new SemVer(version, options)
  } catch (er) {
    if (!throwErrors) {
      return null
    }
    throw er
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
const constants = __webpack_require__(/*! ./internal/constants */ "./node_modules/semver/internal/constants.js")
const SemVer = __webpack_require__(/*! ./classes/semver */ "./node_modules/semver/classes/semver.js")
const identifiers = __webpack_require__(/*! ./internal/identifiers */ "./node_modules/semver/internal/identifiers.js")
const parse = __webpack_require__(/*! ./functions/parse */ "./node_modules/semver/functions/parse.js")
const valid = __webpack_require__(/*! ./functions/valid */ "./node_modules/semver/functions/valid.js")
const clean = __webpack_require__(/*! ./functions/clean */ "./node_modules/semver/functions/clean.js")
const inc = __webpack_require__(/*! ./functions/inc */ "./node_modules/semver/functions/inc.js")
const diff = __webpack_require__(/*! ./functions/diff */ "./node_modules/semver/functions/diff.js")
const major = __webpack_require__(/*! ./functions/major */ "./node_modules/semver/functions/major.js")
const minor = __webpack_require__(/*! ./functions/minor */ "./node_modules/semver/functions/minor.js")
const patch = __webpack_require__(/*! ./functions/patch */ "./node_modules/semver/functions/patch.js")
const prerelease = __webpack_require__(/*! ./functions/prerelease */ "./node_modules/semver/functions/prerelease.js")
const compare = __webpack_require__(/*! ./functions/compare */ "./node_modules/semver/functions/compare.js")
const rcompare = __webpack_require__(/*! ./functions/rcompare */ "./node_modules/semver/functions/rcompare.js")
const compareLoose = __webpack_require__(/*! ./functions/compare-loose */ "./node_modules/semver/functions/compare-loose.js")
const compareBuild = __webpack_require__(/*! ./functions/compare-build */ "./node_modules/semver/functions/compare-build.js")
const sort = __webpack_require__(/*! ./functions/sort */ "./node_modules/semver/functions/sort.js")
const rsort = __webpack_require__(/*! ./functions/rsort */ "./node_modules/semver/functions/rsort.js")
const gt = __webpack_require__(/*! ./functions/gt */ "./node_modules/semver/functions/gt.js")
const lt = __webpack_require__(/*! ./functions/lt */ "./node_modules/semver/functions/lt.js")
const eq = __webpack_require__(/*! ./functions/eq */ "./node_modules/semver/functions/eq.js")
const neq = __webpack_require__(/*! ./functions/neq */ "./node_modules/semver/functions/neq.js")
const gte = __webpack_require__(/*! ./functions/gte */ "./node_modules/semver/functions/gte.js")
const lte = __webpack_require__(/*! ./functions/lte */ "./node_modules/semver/functions/lte.js")
const cmp = __webpack_require__(/*! ./functions/cmp */ "./node_modules/semver/functions/cmp.js")
const coerce = __webpack_require__(/*! ./functions/coerce */ "./node_modules/semver/functions/coerce.js")
const Comparator = __webpack_require__(/*! ./classes/comparator */ "./node_modules/semver/classes/comparator.js")
const Range = __webpack_require__(/*! ./classes/range */ "./node_modules/semver/classes/range.js")
const satisfies = __webpack_require__(/*! ./functions/satisfies */ "./node_modules/semver/functions/satisfies.js")
const toComparators = __webpack_require__(/*! ./ranges/to-comparators */ "./node_modules/semver/ranges/to-comparators.js")
const maxSatisfying = __webpack_require__(/*! ./ranges/max-satisfying */ "./node_modules/semver/ranges/max-satisfying.js")
const minSatisfying = __webpack_require__(/*! ./ranges/min-satisfying */ "./node_modules/semver/ranges/min-satisfying.js")
const minVersion = __webpack_require__(/*! ./ranges/min-version */ "./node_modules/semver/ranges/min-version.js")
const validRange = __webpack_require__(/*! ./ranges/valid */ "./node_modules/semver/ranges/valid.js")
const outside = __webpack_require__(/*! ./ranges/outside */ "./node_modules/semver/ranges/outside.js")
const gtr = __webpack_require__(/*! ./ranges/gtr */ "./node_modules/semver/ranges/gtr.js")
const ltr = __webpack_require__(/*! ./ranges/ltr */ "./node_modules/semver/ranges/ltr.js")
const intersects = __webpack_require__(/*! ./ranges/intersects */ "./node_modules/semver/ranges/intersects.js")
const simplifyRange = __webpack_require__(/*! ./ranges/simplify */ "./node_modules/semver/ranges/simplify.js")
const subset = __webpack_require__(/*! ./ranges/subset */ "./node_modules/semver/ranges/subset.js")
module.exports = {
  parse,
  valid,
  clean,
  inc,
  diff,
  major,
  minor,
  patch,
  prerelease,
  compare,
  rcompare,
  compareLoose,
  compareBuild,
  sort,
  rsort,
  gt,
  lt,
  eq,
  neq,
  gte,
  lte,
  cmp,
  coerce,
  Comparator,
  Range,
  satisfies,
  toComparators,
  maxSatisfying,
  minSatisfying,
  minVersion,
  validRange,
  outside,
  gtr,
  ltr,
  intersects,
  simplifyRange,
  subset,
  SemVer,
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: constants.RELEASE_TYPES,
  compareIdentifiers: identifiers.compareIdentifiers,
  rcompareIdentifiers: identifiers.rcompareIdentifiers,
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

// Max safe length for a build identifier. The max length minus 6 characters for
// the shortest version with a build 0.0.0+BUILD.
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6

const RELEASE_TYPES = [
  'major',
  'premajor',
  'minor',
  'preminor',
  'patch',
  'prepatch',
  'prerelease',
]

module.exports = {
  MAX_LENGTH,
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_SAFE_INTEGER,
  RELEASE_TYPES,
  SEMVER_SPEC_VERSION,
  FLAG_INCLUDE_PRERELEASE: 0b001,
  FLAG_LOOSE: 0b010,
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
  rcompareIdentifiers,
}


/***/ }),

/***/ "./node_modules/semver/internal/parse-options.js":
/*!*******************************************************!*\
  !*** ./node_modules/semver/internal/parse-options.js ***!
  \*******************************************************/
/***/ ((module) => {

// parse out just the options we care about
const looseOption = Object.freeze({ loose: true })
const emptyOpts = Object.freeze({ })
const parseOptions = options => {
  if (!options) {
    return emptyOpts
  }

  if (typeof options !== 'object') {
    return looseOption
  }

  return options
}
module.exports = parseOptions


/***/ }),

/***/ "./node_modules/semver/internal/re.js":
/*!********************************************!*\
  !*** ./node_modules/semver/internal/re.js ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {

const {
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_LENGTH,
} = __webpack_require__(/*! ./constants */ "./node_modules/semver/internal/constants.js")
const debug = __webpack_require__(/*! ./debug */ "./node_modules/semver/internal/debug.js")
exports = module.exports = {}

// The actual regexps go on exports.re
const re = exports.re = []
const safeRe = exports.safeRe = []
const src = exports.src = []
const t = exports.t = {}
let R = 0

const LETTERDASHNUMBER = '[a-zA-Z0-9-]'

// Replace some greedy regex tokens to prevent regex dos issues. These regex are
// used internally via the safeRe object since all inputs in this library get
// normalized first to trim and collapse all extra whitespace. The original
// regexes are exported for userland consumption and lower level usage. A
// future breaking change could export the safer regex only with a note that
// all input should have extra whitespace removed.
const safeRegexReplacements = [
  ['\\s', 1],
  ['\\d', MAX_LENGTH],
  [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH],
]

const makeSafeRegex = (value) => {
  for (const [token, max] of safeRegexReplacements) {
    value = value
      .split(`${token}*`).join(`${token}{0,${max}}`)
      .split(`${token}+`).join(`${token}{1,${max}}`)
  }
  return value
}

const createToken = (name, value, isGlobal) => {
  const safe = makeSafeRegex(value)
  const index = R++
  debug(name, index, value)
  t[name] = index
  src[index] = value
  re[index] = new RegExp(value, isGlobal ? 'g' : undefined)
  safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined)
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*')
createToken('NUMERICIDENTIFIERLOOSE', '\\d+')

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`)

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

createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`)

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
createToken('COERCEPLAIN', `${'(^|[^\\d])' +
              '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` +
              `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`)
createToken('COERCE', `${src[t.COERCEPLAIN]}(?:$|[^\\d])`)
createToken('COERCEFULL', src[t.COERCEPLAIN] +
              `(?:${src[t.PRERELEASE]})?` +
              `(?:${src[t.BUILD]})?` +
              `(?:$|[^\\d])`)
createToken('COERCERTL', src[t.COERCE], true)
createToken('COERCERTLFULL', src[t.COERCEFULL], true)

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
createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$')
createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$')


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
  return r1.intersects(r2, options)
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
    if (setMin && (!minver || gt(minver, setMin))) {
      minver = setMin
    }
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
const { ANY } = Comparator
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
  let first = null
  let prev = null
  const v = versions.sort((a, b) => compare(a, b, options))
  for (const version of v) {
    const included = satisfies(version, range, options)
    if (included) {
      prev = version
      if (!first) {
        first = version
      }
    } else {
      if (prev) {
        set.push([first, prev])
      }
      prev = null
      first = null
    }
  }
  if (first) {
    set.push([first, null])
  }

  const ranges = []
  for (const [min, max] of set) {
    if (min === max) {
      ranges.push(min)
    } else if (!max && min === v[0]) {
      ranges.push('*')
    } else if (!max) {
      ranges.push(`>=${min}`)
    } else if (min === v[0]) {
      ranges.push(`<=${max}`)
    } else {
      ranges.push(`${min} - ${max}`)
    }
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
  if (sub === dom) {
    return true
  }

  sub = new Range(sub, options)
  dom = new Range(dom, options)
  let sawNonNull = false

  OUTER: for (const simpleSub of sub.set) {
    for (const simpleDom of dom.set) {
      const isSub = simpleSubset(simpleSub, simpleDom, options)
      sawNonNull = sawNonNull || isSub !== null
      if (isSub) {
        continue OUTER
      }
    }
    // the null set is a subset of everything, but null simple ranges in
    // a complex range should be ignored.  so if we saw a non-null range,
    // then we know this isn't a subset, but if EVERY simple range was null,
    // then it is a subset.
    if (sawNonNull) {
      return false
    }
  }
  return true
}

const minimumVersionWithPreRelease = [new Comparator('>=0.0.0-0')]
const minimumVersion = [new Comparator('>=0.0.0')]

const simpleSubset = (sub, dom, options) => {
  if (sub === dom) {
    return true
  }

  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY) {
      return true
    } else if (options.includePrerelease) {
      sub = minimumVersionWithPreRelease
    } else {
      sub = minimumVersion
    }
  }

  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease) {
      return true
    } else {
      dom = minimumVersion
    }
  }

  const eqSet = new Set()
  let gt, lt
  for (const c of sub) {
    if (c.operator === '>' || c.operator === '>=') {
      gt = higherGT(gt, c, options)
    } else if (c.operator === '<' || c.operator === '<=') {
      lt = lowerLT(lt, c, options)
    } else {
      eqSet.add(c.semver)
    }
  }

  if (eqSet.size > 1) {
    return null
  }

  let gtltComp
  if (gt && lt) {
    gtltComp = compare(gt.semver, lt.semver, options)
    if (gtltComp > 0) {
      return null
    } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
      return null
    }
  }

  // will iterate one or zero times
  for (const eq of eqSet) {
    if (gt && !satisfies(eq, String(gt), options)) {
      return null
    }

    if (lt && !satisfies(eq, String(lt), options)) {
      return null
    }

    for (const c of dom) {
      if (!satisfies(eq, String(c), options)) {
        return false
      }
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
        if (higher === c && higher !== gt) {
          return false
        }
      } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options)) {
        return false
      }
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
        if (lower === c && lower !== lt) {
          return false
        }
      } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options)) {
        return false
      }
    }
    if (!c.operator && (lt || gt) && gtltComp !== 0) {
      return false
    }
  }

  // if there was a < or >, and nothing in the dom, then must be false
  // UNLESS it was limited by another range in the other direction.
  // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
  if (gt && hasDomLT && !lt && gtltComp !== 0) {
    return false
  }

  if (lt && hasDomGT && !gt && gtltComp !== 0) {
    return false
  }

  // we needed a prerelease range in a specific tuple, but didn't get one
  // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
  // because it includes prereleases in the 1.2.3 tuple
  if (needDomGTPre || needDomLTPre) {
    return false
  }

  return true
}

// >=1.2.3 is lower than >1.2.3
const higherGT = (a, b, options) => {
  if (!a) {
    return b
  }
  const comp = compare(a.semver, b.semver, options)
  return comp > 0 ? a
    : comp < 0 ? b
    : b.operator === '>' && a.operator === '>=' ? b
    : a
}

// <=1.2.3 is higher than <1.2.3
const lowerLT = (a, b, options) => {
  if (!a) {
    return b
  }
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
                        return [2 /*return*/, SEC_KEY_PREFIX + response.signatureRSV.toString('hex')];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QW1CO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWMsaUJBQWlCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaURBQWlELEVBQUU7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZUFBZTtBQUN4QztBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSx5QkFBeUIsUUFBUTtBQUNqQztBQUNBLHNCQUFzQixlQUFlO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixTQUFTO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsU0FBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7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Q0E7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUEsa0NBQWtDLFFBQVE7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQzdVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELEtBQUs7QUFDdEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFCQUFxQixtQkFBTyxDQUFDLGtGQUEyQjtBQUN4RCxRQUFRLGdCQUFnQixFQUFFLG1CQUFPLENBQUMsNERBQWdCO0FBQ2xELFlBQVksbUJBQU8sQ0FBQyxnRUFBa0I7QUFDdEMsY0FBYyxtQkFBTyxDQUFDLGtFQUFtQjtBQUN6QyxlQUFlLG1CQUFPLENBQUMseURBQVU7QUFDakMsY0FBYyxtQkFBTyxDQUFDLHVEQUFTOzs7Ozs7Ozs7OztBQzVJL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbURBQW1ELFNBQVM7QUFDNUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsWUFBWSxtQkFBTyxDQUFDLG9EQUFXO0FBQy9CLHdCQUF3QixXQUFXOztBQUVuQyxxQkFBcUIsbUJBQU8sQ0FBQyxrRkFBMkI7QUFDeEQsbUJBQW1CLG1CQUFPLENBQUMsaUVBQWM7QUFDekMsY0FBYyxtQkFBTyxDQUFDLGtFQUFtQjtBQUN6QyxlQUFlLG1CQUFPLENBQUMseURBQVU7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxFQUFFLG1CQUFPLENBQUMsNERBQWdCO0FBQzVCLFFBQVEsc0NBQXNDLEVBQUUsbUJBQU8sQ0FBQywwRUFBdUI7O0FBRS9FO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTixpQkFBaUIsRUFBRSxRQUFRLE9BQU87QUFDbEMsTUFBTTtBQUNOO0FBQ0EsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU87QUFDMUMsTUFBTTtBQUNOO0FBQ0EsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0FBQ2hDLFFBQVEsR0FBRyxFQUFFLEdBQUcsT0FBTztBQUN2QixNQUFNO0FBQ047QUFDQSxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsR0FBRztBQUMzQixRQUFRLEdBQUcsRUFBRSxHQUFHLE9BQU87QUFDdkI7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTixpQkFBaUIsRUFBRSxNQUFNLEdBQUcsR0FBRyxPQUFPO0FBQ3RDLE1BQU07QUFDTjtBQUNBLG1CQUFtQixFQUFFLEdBQUcsRUFBRSxJQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUcsT0FBTztBQUNoRCxRQUFRO0FBQ1IsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLElBQUksR0FBRyxHQUFHLE9BQU87QUFDM0M7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EscUJBQXFCLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0FBQ3BDLFlBQVksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLE9BQU87QUFDaEMsVUFBVTtBQUNWLHFCQUFxQixFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztBQUNwQyxZQUFZLEdBQUcsRUFBRSxHQUFHLE9BQU87QUFDM0I7QUFDQSxRQUFRO0FBQ1IsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0FBQ2xDLFVBQVUsR0FBRyxPQUFPO0FBQ3BCO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixFQUFFLEdBQUcsRUFBRSxHQUFHO0FBQy9CLFdBQVcsRUFBRSxHQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxPQUFPO0FBQ3BDLFVBQVU7QUFDVixxQkFBcUIsRUFBRSxHQUFHLEVBQUUsR0FBRztBQUMvQixXQUFXLEVBQUUsR0FBRyxHQUFHLEVBQUUsR0FBRyxPQUFPO0FBQy9CO0FBQ0EsUUFBUTtBQUNSLG1CQUFtQixFQUFFLEdBQUcsRUFBRSxHQUFHO0FBQzdCLFVBQVUsR0FBRyxPQUFPO0FBQ3BCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLFNBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUc7QUFDdkMsTUFBTTtBQUNOLGlCQUFpQixFQUFFLE1BQU0sSUFBSSxHQUFHLE9BQU87QUFDdkMsTUFBTTtBQUNOLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxJQUFJO0FBQzVCLFFBQVEsR0FBRyxFQUFFLEdBQUcsT0FBTztBQUN2Qjs7QUFFQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLGdCQUFnQixHQUFHLE1BQU0sa0JBQWtCO0FBQzNDLElBQUk7QUFDSixnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsSUFBSSxrQkFBa0I7QUFDL0MsSUFBSTtBQUNKLGdCQUFnQixLQUFLO0FBQ3JCLElBQUk7QUFDSixnQkFBZ0IsS0FBSyxFQUFFLGtCQUFrQjtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLGFBQWEsUUFBUTtBQUNyQixJQUFJO0FBQ0osYUFBYSxHQUFHLEdBQUcsUUFBUTtBQUMzQixJQUFJO0FBQ0osY0FBYyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJO0FBQ3BDLElBQUk7QUFDSixhQUFhLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUTtBQUNqQyxJQUFJO0FBQ0osY0FBYyxHQUFHO0FBQ2pCOztBQUVBLFlBQVksTUFBTSxFQUFFLEdBQUc7QUFDdkI7O0FBRUE7QUFDQSxrQkFBa0IsZ0JBQWdCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnQkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7OztBQzFoQkEsY0FBYyxtQkFBTyxDQUFDLGtFQUFtQjtBQUN6QyxRQUFRLCtCQUErQixFQUFFLG1CQUFPLENBQUMsMEVBQXVCO0FBQ3hFLFFBQVEsZ0JBQWdCLEVBQUUsbUJBQU8sQ0FBQyw0REFBZ0I7O0FBRWxELHFCQUFxQixtQkFBTyxDQUFDLGtGQUEyQjtBQUN4RCxRQUFRLHFCQUFxQixFQUFFLG1CQUFPLENBQUMsOEVBQXlCO0FBQ2hFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOLDBFQUEwRSxlQUFlO0FBQ3pGOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0MsWUFBWTtBQUM5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixXQUFXLEdBQUcsV0FBVyxHQUFHLFdBQVc7QUFDN0Q7QUFDQSwwQkFBMEIsMEJBQTBCO0FBQ3BEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFD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LEdBQUcsVUFBTyxPQUFlO0lBQUssd0NBQWtCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztTQUFBLENBQUM7QUFDckYsSUFBTSxXQUFXLEdBQUcsVUFBTyxPQUFlO0lBQUssd0NBQWtCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztTQUFBLENBQUM7QUFDdkYsSUFBTSxJQUFJLEdBQUcsVUFBTyxPQUFlLEVBQUUsV0FBZ0I7SUFBSyx3Q0FBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQztTQUFBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL0BsZWRnZXJocS9kZXZpY2VzL2xpYi1lcy9oaWQtZnJhbWluZy5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL0BsZWRnZXJocS9kZXZpY2VzL2xpYi1lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL0BsZWRnZXJocS9lcnJvcnMvbGliLWVzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9AbGVkZ2VyaHEvZXJyb3JzL2xpYi1lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL0BsZWRnZXJocS9ody10cmFuc3BvcnQtd2VidXNiL2xpYi1lcy9UcmFuc3BvcnRXZWJVU0IuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9AbGVkZ2VyaHEvaHctdHJhbnNwb3J0LXdlYnVzYi9saWItZXMvd2VidXNiLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvQGxlZGdlcmhxL2h3LXRyYW5zcG9ydC9saWItZXMvVHJhbnNwb3J0LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvQGxlZGdlcmhxL2xvZ3MvbGliLWVzL2luZGV4LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvQHpvbmRheC9sZWRnZXItY2FzcGVyL2Rpc3QvY29tbW9uLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvQHpvbmRheC9sZWRnZXItY2FzcGVyL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9Aem9uZGF4L2xlZGdlci1jYXNwZXIvZGlzdC90eXBlcy5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvbHJ1LWNhY2hlL2luZGV4LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2NsYXNzZXMvY29tcGFyYXRvci5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9jbGFzc2VzL3JhbmdlLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2NsYXNzZXMvc2VtdmVyLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9jbGVhbi5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvY21wLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9jb2VyY2UuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2NvbXBhcmUtYnVpbGQuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2NvbXBhcmUtbG9vc2UuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2NvbXBhcmUuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2RpZmYuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2VxLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9ndC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvZ3RlLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9pbmMuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL2x0LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9sdGUuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL21ham9yLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9taW5vci5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvbmVxLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9wYXJzZS5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvcGF0Y2guanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3ByZXJlbGVhc2UuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvZnVuY3Rpb25zL3Jjb21wYXJlLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9yc29ydC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9mdW5jdGlvbnMvc2F0aXNmaWVzLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy9zb3J0LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL2Z1bmN0aW9ucy92YWxpZC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbnRlcm5hbC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvaW50ZXJuYWwvZGVidWcuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvaW50ZXJuYWwvaWRlbnRpZmllcnMuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvaW50ZXJuYWwvcGFyc2Utb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9pbnRlcm5hbC9yZS5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvZ3RyLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9pbnRlcnNlY3RzLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9sdHIuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL21heC1zYXRpc2Z5aW5nLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9taW4tc2F0aXNmeWluZy5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9yYW5nZXMvbWluLXZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL291dHNpZGUuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL3NpbXBsaWZ5LmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy9zdWJzZXQuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy9zZW12ZXIvcmFuZ2VzL3RvLWNvbXBhcmF0b3JzLmpzIiwid2VicGFjazovL2xlZGdlckludGVyb3AvLi9ub2RlX21vZHVsZXMvc2VtdmVyL3Jhbmdlcy92YWxpZC5qcyIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wLy4vbm9kZV9tb2R1bGVzL3lhbGxpc3QvaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL25vZGVfbW9kdWxlcy95YWxsaXN0L3lhbGxpc3QuanMiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2xlZGdlckludGVyb3Avd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xlZGdlckludGVyb3Avd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sZWRnZXJJbnRlcm9wL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbGVkZ2VySW50ZXJvcC8uL3NyYy9sZWRnZXJBcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHJhbnNwb3J0RXJyb3IgfSBmcm9tIFwiQGxlZGdlcmhxL2Vycm9yc1wiO1xuY29uc3QgVGFnID0gMHgwNTtcbmZ1bmN0aW9uIGFzVUludDE2QkUodmFsdWUpIHtcbiAgICBjb25zdCBiID0gQnVmZmVyLmFsbG9jKDIpO1xuICAgIGIud3JpdGVVSW50MTZCRSh2YWx1ZSwgMCk7XG4gICAgcmV0dXJuIGI7XG59XG5jb25zdCBpbml0aWFsQWNjID0ge1xuICAgIGRhdGE6IEJ1ZmZlci5hbGxvYygwKSxcbiAgICBkYXRhTGVuZ3RoOiAwLFxuICAgIHNlcXVlbmNlOiAwLFxufTtcbi8qKlxuICogT2JqZWN0IHRvIGhhbmRsZSBISUQgZnJhbWVzIChlbmNvZGluZyBhbmQgZGVjb2RpbmcpXG4gKlxuICogQHBhcmFtIGNoYW5uZWxcbiAqIEBwYXJhbSBwYWNrZXRTaXplIFRoZSBISUQgcHJvdG9jb2wgcGFja2V0IHNpemUgaW4gYnl0ZXMgKHVzdWFsbHkgNjQpXG4gKi9cbmNvbnN0IGNyZWF0ZUhJRGZyYW1pbmcgPSAoY2hhbm5lbCwgcGFja2V0U2l6ZSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGcmFtZXMvZW5jb2RlcyBhbiBBUERVIG1lc3NhZ2UgaW50byBISUQgVVNCIHBhY2tldHMvZnJhbWVzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBhcGR1IFRoZSBBUERVIG1lc3NhZ2UgdG8gc2VuZCwgaW4gYSBCdWZmZXIgY29udGFpbmluZyBbY2xhLCBpbnMsIHAxLCBwMiwgZGF0YSBsZW5ndGgsIGRhdGEoaWYgbm90IGVtcHR5KV1cbiAgICAgICAgICogQHJldHVybnMgYW4gYXJyYXkgb2YgSElEIFVTQiBmcmFtZXMgcmVhZHkgdG8gYmUgc2VudFxuICAgICAgICAgKi9cbiAgICAgICAgbWFrZUJsb2NrcyhhcGR1KSB7XG4gICAgICAgICAgICAvLyBFbmNvZGVzIHRoZSBBUERVIGxlbmd0aCBpbiAyIGJ5dGVzIGJlZm9yZSB0aGUgQVBEVSBpdHNlbGYuXG4gICAgICAgICAgICAvLyBUaGUgbGVuZ3RoIGlzIG1lYXN1cmVkIGFzIHRoZSBudW1iZXIgb2YgYnl0ZXMuXG4gICAgICAgICAgICAvLyBBcyB0aGUgc2l6ZSBvZiB0aGUgQVBEVSBgZGF0YWAgc2hvdWxkIGhhdmUgYmVlbiBhZGRlZCBpbiAxIGJ5dGUganVzdCBiZWZvcmUgYGRhdGFgLFxuICAgICAgICAgICAgLy8gdGhlIG1pbmltdW0gc2l6ZSBvZiBhbiBBUERVIGlzIDUgYnl0ZXMuXG4gICAgICAgICAgICBsZXQgZGF0YSA9IEJ1ZmZlci5jb25jYXQoW2FzVUludDE2QkUoYXBkdS5sZW5ndGgpLCBhcGR1XSk7XG4gICAgICAgICAgICBjb25zdCBibG9ja1NpemUgPSBwYWNrZXRTaXplIC0gNTtcbiAgICAgICAgICAgIGNvbnN0IG5iQmxvY2tzID0gTWF0aC5jZWlsKGRhdGEubGVuZ3RoIC8gYmxvY2tTaXplKTtcbiAgICAgICAgICAgIC8vIEZpbGxzIGRhdGEgd2l0aCAwLXBhZGRpbmdcbiAgICAgICAgICAgIGRhdGEgPSBCdWZmZXIuY29uY2F0KFtkYXRhLCBCdWZmZXIuYWxsb2MobmJCbG9ja3MgKiBibG9ja1NpemUgLSBkYXRhLmxlbmd0aCArIDEpLmZpbGwoMCldKTtcbiAgICAgICAgICAgIGNvbnN0IGJsb2NrcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYkJsb2NrczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZCA9IEJ1ZmZlci5hbGxvYyg1KTtcbiAgICAgICAgICAgICAgICBoZWFkLndyaXRlVUludDE2QkUoY2hhbm5lbCwgMCk7XG4gICAgICAgICAgICAgICAgaGVhZC53cml0ZVVJbnQ4KFRhZywgMik7XG4gICAgICAgICAgICAgICAgaGVhZC53cml0ZVVJbnQxNkJFKGksIDMpO1xuICAgICAgICAgICAgICAgIC8vIGBzbGljZWAgYW5kIG5vdCBgc3ViYXJyYXlgOiB0aGlzIG1pZ2h0IG5vdCBiZSBhIE5vZGUgQnVmZmVyLCBidXQgcHJvYmFibHkgb25seSBhIFVpbnQ4QXJyYXlcbiAgICAgICAgICAgICAgICBjb25zdCBjaHVuayA9IGRhdGEuc2xpY2UoaSAqIGJsb2NrU2l6ZSwgKGkgKyAxKSAqIGJsb2NrU2l6ZSk7XG4gICAgICAgICAgICAgICAgYmxvY2tzLnB1c2goQnVmZmVyLmNvbmNhdChbaGVhZCwgY2h1bmtdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYmxvY2tzO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogUmVkdWNlcyBISUQgVVNCIHBhY2tldHMvZnJhbWVzIHRvIG9uZSByZXNwb25zZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGFjYyBUaGUgdmFsdWUgcmVzdWx0aW5nIGZyb20gKGFjY3VtdWxhdGluZykgdGhlIHByZXZpb3VzIGNhbGwgb2YgcmVkdWNlUmVzcG9uc2UuXG4gICAgICAgICAqICAgT24gZmlyc3QgY2FsbCBpbml0aWFsaXplZCB0byBgaW5pdGlhbEFjY2AuIFRoZSBhY2N1bXVsYXRvciBlbmFibGVzIGhhbmRsaW5nIG11bHRpLWZyYW1lcyBtZXNzYWdlcy5cbiAgICAgICAgICogQHBhcmFtIGNodW5rIEN1cnJlbnQgY2h1bmsgdG8gcmVkdWNlIGludG8gYWNjdW11bGF0b3JcbiAgICAgICAgICogQHJldHVybnMgQW4gYWNjdW11bGF0b3IgdmFsdWUgdXBkYXRlZCB3aXRoIHRoZSBjdXJyZW50IGNodW5rXG4gICAgICAgICAqL1xuICAgICAgICByZWR1Y2VSZXNwb25zZShhY2MsIGNodW5rKSB7XG4gICAgICAgICAgICBsZXQgeyBkYXRhLCBkYXRhTGVuZ3RoLCBzZXF1ZW5jZSB9ID0gYWNjIHx8IGluaXRpYWxBY2M7XG4gICAgICAgICAgICBpZiAoY2h1bmsucmVhZFVJbnQxNkJFKDApICE9PSBjaGFubmVsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRyYW5zcG9ydEVycm9yKFwiSW52YWxpZCBjaGFubmVsXCIsIFwiSW52YWxpZENoYW5uZWxcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2h1bmsucmVhZFVJbnQ4KDIpICE9PSBUYWcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHJhbnNwb3J0RXJyb3IoXCJJbnZhbGlkIHRhZ1wiLCBcIkludmFsaWRUYWdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2h1bmsucmVhZFVJbnQxNkJFKDMpICE9PSBzZXF1ZW5jZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUcmFuc3BvcnRFcnJvcihcIkludmFsaWQgc2VxdWVuY2VcIiwgXCJJbnZhbGlkU2VxdWVuY2VcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBHZXRzIHRoZSB0b3RhbCBsZW5ndGggb2YgdGhlIHJlc3BvbnNlIGZyb20gdGhlIDFzdCBmcmFtZVxuICAgICAgICAgICAgaWYgKCFhY2MpIHtcbiAgICAgICAgICAgICAgICBkYXRhTGVuZ3RoID0gY2h1bmsucmVhZFVJbnQxNkJFKDUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VxdWVuY2UrKztcbiAgICAgICAgICAgIC8vIFRoZSB0b3RhbCBsZW5ndGggb24gdGhlIDFzdCBmcmFtZSB0YWtlcyAyIG1vcmUgYnl0ZXNcbiAgICAgICAgICAgIGNvbnN0IGNodW5rRGF0YSA9IGNodW5rLnNsaWNlKGFjYyA/IDUgOiA3KTtcbiAgICAgICAgICAgIGRhdGEgPSBCdWZmZXIuY29uY2F0KFtkYXRhLCBjaHVua0RhdGFdKTtcbiAgICAgICAgICAgIC8vIFJlbW92ZXMgYW55IDAgcGFkZGluZ1xuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gZGF0YUxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnNsaWNlKDAsIGRhdGFMZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICAgIGRhdGFMZW5ndGgsXG4gICAgICAgICAgICAgICAgc2VxdWVuY2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJucyB0aGUgcmVzcG9uc2UgbWVzc2FnZSB0aGF0IGhhcyBiZWVuIHJlZHVjZWQgZnJvbSB0aGUgSElEIFVTQiBmcmFtZXNcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIGFjYyBUaGUgYWNjdW11bGF0b3JcbiAgICAgICAgICogQHJldHVybnMgQSBCdWZmZXIgY29udGFpbmluZyB0aGUgY2xlYW5lZCByZXNwb25zZSBtZXNzYWdlLCBvciBudWxsIGlmIG5vIHJlc3BvbnNlIG1lc3NhZ2UsIG9yIHVuZGVmaW5lZCBpZiB0aGVcbiAgICAgICAgICogICBhY2N1bXVsYXRvciBpcyBpbmNvcnJlY3QgKG1lc3NhZ2UgbGVuZ3RoIGlzIG5vdCB2YWxpZClcbiAgICAgICAgICovXG4gICAgICAgIGdldFJlZHVjZWRSZXN1bHQoYWNjKSB7XG4gICAgICAgICAgICBpZiAoYWNjICYmIGFjYy5kYXRhTGVuZ3RoID09PSBhY2MuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjLmRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcbn07XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVISURmcmFtaW5nO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGlkLWZyYW1pbmcuanMubWFwIiwiaW1wb3J0IHNlbXZlciBmcm9tIFwic2VtdmVyXCI7XG4vKipcbiAqIFRoZSBVU0IgcHJvZHVjdCBJRHMgd2lsbCBiZSBkZWZpbmVkIGFzIE1NSUksIGVuY29kaW5nIGEgbW9kZWwgKE1NKSBhbmQgYW4gaW50ZXJmYWNlIGJpdGZpZWxkIChJSSlcbiAqXG4gKiogTW9kZWxcbiAqIExlZGdlciBOYW5vIFMgOiAweDEwXG4gKiBMZWRnZXIgQmx1ZSA6IDB4MDBcbiAqIExlZGdlciBOYW5vIFggOiAweDQwXG4gKlxuICoqIEludGVyZmFjZSBzdXBwb3J0IGJpdGZpZWxkXG4gKiBHZW5lcmljIEhJRCA6IDB4MDFcbiAqIEtleWJvYXJkIEhJRCA6IDB4MDJcbiAqIFUyRiA6IDB4MDRcbiAqIENDSUQgOiAweDA4XG4gKiBXZWJVU0IgOiAweDEwXG4gKi9cbmV4cG9ydCBjb25zdCBJSUdlbmVyaWNISUQgPSAweDAxO1xuZXhwb3J0IGNvbnN0IElJS2V5Ym9hcmRISUQgPSAweDAyO1xuZXhwb3J0IGNvbnN0IElJVTJGID0gMHgwNDtcbmV4cG9ydCBjb25zdCBJSUNDSUQgPSAweDA4O1xuZXhwb3J0IGNvbnN0IElJV2ViVVNCID0gMHgxMDtcbmV4cG9ydCB2YXIgRGV2aWNlTW9kZWxJZDtcbihmdW5jdGlvbiAoRGV2aWNlTW9kZWxJZCkge1xuICAgIERldmljZU1vZGVsSWRbXCJibHVlXCJdID0gXCJibHVlXCI7XG4gICAgRGV2aWNlTW9kZWxJZFtcIm5hbm9TXCJdID0gXCJuYW5vU1wiO1xuICAgIERldmljZU1vZGVsSWRbXCJuYW5vU1BcIl0gPSBcIm5hbm9TUFwiO1xuICAgIERldmljZU1vZGVsSWRbXCJuYW5vWFwiXSA9IFwibmFub1hcIjtcbiAgICBEZXZpY2VNb2RlbElkW1wic3RheFwiXSA9IFwic3RheFwiO1xufSkoRGV2aWNlTW9kZWxJZCB8fCAoRGV2aWNlTW9kZWxJZCA9IHt9KSk7XG5jb25zdCBkZXZpY2VzID0ge1xuICAgIFtEZXZpY2VNb2RlbElkLmJsdWVdOiB7XG4gICAgICAgIGlkOiBEZXZpY2VNb2RlbElkLmJsdWUsXG4gICAgICAgIHByb2R1Y3ROYW1lOiBcIkxlZGdlcsKgQmx1ZVwiLFxuICAgICAgICBwcm9kdWN0SWRNTTogMHgwMCxcbiAgICAgICAgbGVnYWN5VXNiUHJvZHVjdElkOiAweDAwMDAsXG4gICAgICAgIHVzYk9ubHk6IHRydWUsXG4gICAgICAgIG1lbW9yeVNpemU6IDQ4MCAqIDEwMjQsXG4gICAgICAgIG1hc2tzOiBbMHgzMTAwMDAwMCwgMHgzMTAxMDAwMF0sXG4gICAgICAgIGdldEJsb2NrU2l6ZTogKF9maXJ3YXJlVmVyc2lvbikgPT4gNCAqIDEwMjQsXG4gICAgfSxcbiAgICBbRGV2aWNlTW9kZWxJZC5uYW5vU106IHtcbiAgICAgICAgaWQ6IERldmljZU1vZGVsSWQubmFub1MsXG4gICAgICAgIHByb2R1Y3ROYW1lOiBcIkxlZGdlcsKgTmFub8KgU1wiLFxuICAgICAgICBwcm9kdWN0SWRNTTogMHgxMCxcbiAgICAgICAgbGVnYWN5VXNiUHJvZHVjdElkOiAweDAwMDEsXG4gICAgICAgIHVzYk9ubHk6IHRydWUsXG4gICAgICAgIG1lbW9yeVNpemU6IDMyMCAqIDEwMjQsXG4gICAgICAgIG1hc2tzOiBbMHgzMTEwMDAwMF0sXG4gICAgICAgIGdldEJsb2NrU2l6ZTogKGZpcm13YXJlVmVyc2lvbikgPT4geyB2YXIgX2E7IHJldHVybiBzZW12ZXIubHQoKF9hID0gc2VtdmVyLmNvZXJjZShmaXJtd2FyZVZlcnNpb24pKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBcIlwiLCBcIjIuMC4wXCIpID8gNCAqIDEwMjQgOiAyICogMTAyNDsgfSxcbiAgICB9LFxuICAgIFtEZXZpY2VNb2RlbElkLm5hbm9TUF06IHtcbiAgICAgICAgaWQ6IERldmljZU1vZGVsSWQubmFub1NQLFxuICAgICAgICBwcm9kdWN0TmFtZTogXCJMZWRnZXIgTmFubyBTIFBsdXNcIixcbiAgICAgICAgcHJvZHVjdElkTU06IDB4NTAsXG4gICAgICAgIGxlZ2FjeVVzYlByb2R1Y3RJZDogMHgwMDA1LFxuICAgICAgICB1c2JPbmx5OiB0cnVlLFxuICAgICAgICBtZW1vcnlTaXplOiAxNTM2ICogMTAyNCxcbiAgICAgICAgbWFza3M6IFsweDMzMTAwMDAwXSxcbiAgICAgICAgZ2V0QmxvY2tTaXplOiAoX2Zpcm13YXJlVmVyc2lvbikgPT4gMzIsXG4gICAgfSxcbiAgICBbRGV2aWNlTW9kZWxJZC5uYW5vWF06IHtcbiAgICAgICAgaWQ6IERldmljZU1vZGVsSWQubmFub1gsXG4gICAgICAgIHByb2R1Y3ROYW1lOiBcIkxlZGdlcsKgTmFub8KgWFwiLFxuICAgICAgICBwcm9kdWN0SWRNTTogMHg0MCxcbiAgICAgICAgbGVnYWN5VXNiUHJvZHVjdElkOiAweDAwMDQsXG4gICAgICAgIHVzYk9ubHk6IGZhbHNlLFxuICAgICAgICBtZW1vcnlTaXplOiAyICogMTAyNCAqIDEwMjQsXG4gICAgICAgIG1hc2tzOiBbMHgzMzAwMDAwMF0sXG4gICAgICAgIGdldEJsb2NrU2l6ZTogKF9maXJ3YXJlVmVyc2lvbikgPT4gNCAqIDEwMjQsXG4gICAgICAgIGJsdWV0b290aFNwZWM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZXJ2aWNlVXVpZDogXCIxM2Q2MzQwMC0yYzk3LTAwMDQtMDAwMC00YzY1NjQ2NzY1NzJcIixcbiAgICAgICAgICAgICAgICBub3RpZnlVdWlkOiBcIjEzZDYzNDAwLTJjOTctMDAwNC0wMDAxLTRjNjU2NDY3NjU3MlwiLFxuICAgICAgICAgICAgICAgIHdyaXRlVXVpZDogXCIxM2Q2MzQwMC0yYzk3LTAwMDQtMDAwMi00YzY1NjQ2NzY1NzJcIixcbiAgICAgICAgICAgICAgICB3cml0ZUNtZFV1aWQ6IFwiMTNkNjM0MDAtMmM5Ny0wMDA0LTAwMDMtNGM2NTY0Njc2NTcyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAgW0RldmljZU1vZGVsSWQuc3RheF06IHtcbiAgICAgICAgaWQ6IERldmljZU1vZGVsSWQuc3RheCxcbiAgICAgICAgcHJvZHVjdE5hbWU6IFwiTGVkZ2VywqBTdGF4XCIsXG4gICAgICAgIHByb2R1Y3RJZE1NOiAweDYwLFxuICAgICAgICBsZWdhY3lVc2JQcm9kdWN0SWQ6IDB4MDAwNixcbiAgICAgICAgdXNiT25seTogZmFsc2UsXG4gICAgICAgIG1lbW9yeVNpemU6IDE1MzYgKiAxMDI0LFxuICAgICAgICBtYXNrczogWzB4MzMyMDAwMDBdLFxuICAgICAgICBnZXRCbG9ja1NpemU6IChfZmlybXdhcmVWZXJzaW9uKSA9PiAzMixcbiAgICAgICAgYmx1ZXRvb3RoU3BlYzogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlcnZpY2VVdWlkOiBcIjEzZDYzNDAwLTJjOTctNjAwNC0wMDAwLTRjNjU2NDY3NjU3MlwiLFxuICAgICAgICAgICAgICAgIG5vdGlmeVV1aWQ6IFwiMTNkNjM0MDAtMmM5Ny02MDA0LTAwMDEtNGM2NTY0Njc2NTcyXCIsXG4gICAgICAgICAgICAgICAgd3JpdGVVdWlkOiBcIjEzZDYzNDAwLTJjOTctNjAwNC0wMDAyLTRjNjU2NDY3NjU3MlwiLFxuICAgICAgICAgICAgICAgIHdyaXRlQ21kVXVpZDogXCIxM2Q2MzQwMC0yYzk3LTYwMDQtMDAwMy00YzY1NjQ2NzY1NzJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbn07XG5jb25zdCBwcm9kdWN0TWFwID0ge1xuICAgIEJsdWU6IERldmljZU1vZGVsSWQuYmx1ZSxcbiAgICBcIk5hbm8gU1wiOiBEZXZpY2VNb2RlbElkLm5hbm9TLFxuICAgIFwiTmFubyBTIFBsdXNcIjogRGV2aWNlTW9kZWxJZC5uYW5vU1AsXG4gICAgXCJOYW5vIFhcIjogRGV2aWNlTW9kZWxJZC5uYW5vWCxcbiAgICBTdGF4OiBEZXZpY2VNb2RlbElkLnN0YXgsXG59O1xuY29uc3QgZGV2aWNlc0xpc3QgPSBPYmplY3QudmFsdWVzKGRldmljZXMpO1xuLyoqXG4gKlxuICovXG5leHBvcnQgY29uc3QgbGVkZ2VyVVNCVmVuZG9ySWQgPSAweDJjOTc7XG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBnZXREZXZpY2VNb2RlbCA9IChpZCkgPT4ge1xuICAgIGNvbnN0IGluZm8gPSBkZXZpY2VzW2lkXTtcbiAgICBpZiAoIWluZm8pXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImRldmljZSAnXCIgKyBpZCArIFwiJyBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICByZXR1cm4gaW5mbztcbn07XG4vKipcbiAqIEdpdmVuIGEgYHRhcmdldElkYCwgcmV0dXJuIHRoZSBkZXZpY2VNb2RlbCBhc3NvY2lhdGVkIHRvIGl0LFxuICogYmFzZWQgb24gdGhlIGZpcnN0IHR3byBieXRlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGlkZW50aWZ5VGFyZ2V0SWQgPSAodGFyZ2V0SWQpID0+IHtcbiAgICBjb25zdCBkZXZpY2VNb2RlbCA9IGRldmljZXNMaXN0LmZpbmQoKHsgbWFza3MgfSkgPT4gbWFza3MuZmluZChtYXNrID0+ICh0YXJnZXRJZCAmIDB4ZmZmZjAwMDApID09PSBtYXNrKSk7XG4gICAgcmV0dXJuIGRldmljZU1vZGVsO1xufTtcbi8qKlxuICogRnJvbSBhIGdpdmVuIFVTQiBwcm9kdWN0IGlkLCByZXR1cm4gdGhlIGRldmljZU1vZGVsIGFzc29jaWF0ZWQgdG8gaXQuXG4gKlxuICogVGhlIG1hcHBpbmcgZnJvbSB0aGUgcHJvZHVjdCBpZCBpcyBvbmx5IGJhc2VkIG9uIHRoZSAyIG1vc3Qgc2lnbmlmaWNhbnQgYnl0ZXMuXG4gKiBGb3IgZXhhbXBsZSwgU3RheCBpcyBkZWZpbmVkIHdpdGggYSBwcm9kdWN0IGlkIG9mIDB4NjBpaSwgYSBwcm9kdWN0IGlkIDB4NjAxMSB3b3VsZCBiZSBtYXBwZWQgdG8gaXQuXG4gKi9cbmV4cG9ydCBjb25zdCBpZGVudGlmeVVTQlByb2R1Y3RJZCA9ICh1c2JQcm9kdWN0SWQpID0+IHtcbiAgICBjb25zdCBsZWdhY3kgPSBkZXZpY2VzTGlzdC5maW5kKGQgPT4gZC5sZWdhY3lVc2JQcm9kdWN0SWQgPT09IHVzYlByb2R1Y3RJZCk7XG4gICAgaWYgKGxlZ2FjeSlcbiAgICAgICAgcmV0dXJuIGxlZ2FjeTtcbiAgICBjb25zdCBtbSA9IHVzYlByb2R1Y3RJZCA+PiA4O1xuICAgIGNvbnN0IGRldmljZU1vZGVsID0gZGV2aWNlc0xpc3QuZmluZChkID0+IGQucHJvZHVjdElkTU0gPT09IG1tKTtcbiAgICByZXR1cm4gZGV2aWNlTW9kZWw7XG59O1xuZXhwb3J0IGNvbnN0IGlkZW50aWZ5UHJvZHVjdE5hbWUgPSAocHJvZHVjdE5hbWUpID0+IHtcbiAgICBjb25zdCBkZXZpY2VNb2RlbCA9IGRldmljZXNMaXN0LmZpbmQoZCA9PiBkLmlkID09PSBwcm9kdWN0TWFwW3Byb2R1Y3ROYW1lXSk7XG4gICAgcmV0dXJuIGRldmljZU1vZGVsO1xufTtcbmNvbnN0IGJsdWV0b290aFNlcnZpY2VzID0gW107XG5jb25zdCBzZXJ2aWNlVXVpZFRvSW5mb3MgPSB7fTtcbmZvciAoY29uc3QgaWQgaW4gZGV2aWNlcykge1xuICAgIGNvbnN0IGRldmljZU1vZGVsID0gZGV2aWNlc1tpZF07XG4gICAgY29uc3QgeyBibHVldG9vdGhTcGVjIH0gPSBkZXZpY2VNb2RlbDtcbiAgICBpZiAoYmx1ZXRvb3RoU3BlYykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsdWV0b290aFNwZWMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHNwZWMgPSBibHVldG9vdGhTcGVjW2ldO1xuICAgICAgICAgICAgYmx1ZXRvb3RoU2VydmljZXMucHVzaChzcGVjLnNlcnZpY2VVdWlkKTtcbiAgICAgICAgICAgIHNlcnZpY2VVdWlkVG9JbmZvc1tzcGVjLnNlcnZpY2VVdWlkXSA9IHNlcnZpY2VVdWlkVG9JbmZvc1tzcGVjLnNlcnZpY2VVdWlkLnJlcGxhY2UoLy0vZywgXCJcIildID0gT2JqZWN0LmFzc2lnbih7IGRldmljZU1vZGVsIH0sIHNwZWMpO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKlxuICovXG5leHBvcnQgY29uc3QgZ2V0Qmx1ZXRvb3RoU2VydmljZVV1aWRzID0gKCkgPT4gYmx1ZXRvb3RoU2VydmljZXM7XG4vKipcbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRJbmZvc0ZvclNlcnZpY2VVdWlkID0gKHV1aWQpID0+IHNlcnZpY2VVdWlkVG9JbmZvc1t1dWlkLnRvTG93ZXJDYXNlKCldO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29udGludWUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zICovXG5jb25zdCBlcnJvckNsYXNzZXMgPSB7fTtcbmNvbnN0IGRlc2VyaWFsaXplcnMgPSB7fTtcbmV4cG9ydCBjb25zdCBhZGRDdXN0b21FcnJvckRlc2VyaWFsaXplciA9IChuYW1lLCBkZXNlcmlhbGl6ZXIpID0+IHtcbiAgICBkZXNlcmlhbGl6ZXJzW25hbWVdID0gZGVzZXJpYWxpemVyO1xufTtcbmV4cG9ydCBjb25zdCBjcmVhdGVDdXN0b21FcnJvckNsYXNzID0gKG5hbWUpID0+IHtcbiAgICBjbGFzcyBDdXN0b21FcnJvckNsYXNzIGV4dGVuZHMgRXJyb3Ige1xuICAgICAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBmaWVsZHMsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgbmFtZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIHByb3RvdHlwZSBleHBsaWNpdGx5LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L3dpa2kvQnJlYWtpbmctQ2hhbmdlcyNleHRlbmRpbmctYnVpbHQtaW5zLWxpa2UtZXJyb3ItYXJyYXktYW5kLW1hcC1tYXktbm8tbG9uZ2VyLXdvcmtcbiAgICAgICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBDdXN0b21FcnJvckNsYXNzLnByb3RvdHlwZSk7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgaWYgKGZpZWxkcykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgayBpbiBmaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHRoaXNba10gPSBmaWVsZHNba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMgJiYgaXNPYmplY3Qob3B0aW9ucykgJiYgXCJjYXVzZVwiIGluIG9wdGlvbnMgJiYgIShcImNhdXNlXCIgaW4gdGhpcykpIHtcbiAgICAgICAgICAgICAgICAvLyAuY2F1c2Ugd2FzIHNwZWNpZmllZCBidXQgdGhlIHN1cGVyY29uc3RydWN0b3JcbiAgICAgICAgICAgICAgICAvLyBkaWQgbm90IGNyZWF0ZSBhbiBpbnN0YW5jZSBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICBjb25zdCBjYXVzZSA9IG9wdGlvbnMuY2F1c2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXVzZSA9IGNhdXNlO1xuICAgICAgICAgICAgICAgIGlmIChcInN0YWNrXCIgaW4gY2F1c2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjayA9IHRoaXMuc3RhY2sgKyBcIlxcbkNBVVNFOiBcIiArIGNhdXNlLnN0YWNrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlcnJvckNsYXNzZXNbbmFtZV0gPSBDdXN0b21FcnJvckNsYXNzO1xuICAgIHJldHVybiBDdXN0b21FcnJvckNsYXNzO1xufTtcbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cbi8vIGluc3BpcmVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Byb2dyYW1ibGUvZXJyaW8vYmxvYi9tYXN0ZXIvaW5kZXguanNcbmV4cG9ydCBjb25zdCBkZXNlcmlhbGl6ZUVycm9yID0gKG9iamVjdCkgPT4ge1xuICAgIGlmIChvYmplY3QgJiYgdHlwZW9mIG9iamVjdCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QubWVzc2FnZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IEpTT04ucGFyc2Uob2JqZWN0Lm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGlmIChtc2cubWVzc2FnZSAmJiBtc2cubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBvYmplY3QgPSBtc2c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBub3RoaW5nXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGVycm9yO1xuICAgICAgICBpZiAodHlwZW9mIG9iamVjdC5uYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjb25zdCB7IG5hbWUgfSA9IG9iamVjdDtcbiAgICAgICAgICAgIGNvbnN0IGRlcyA9IGRlc2VyaWFsaXplcnNbbmFtZV07XG4gICAgICAgICAgICBpZiAoZGVzKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBkZXMob2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBjb25zdHJ1Y3RvciA9IG5hbWUgPT09IFwiRXJyb3JcIiA/IEVycm9yIDogZXJyb3JDbGFzc2VzW25hbWVdO1xuICAgICAgICAgICAgICAgIGlmICghY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiZGVzZXJpYWxpemluZyBhbiB1bmtub3duIGNsYXNzICdcIiArIG5hbWUgKyBcIidcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBPYmplY3QuY3JlYXRlKGNvbnN0cnVjdG9yLnByb3RvdHlwZSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wIGluIG9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yW3Byb3BdID0gb2JqZWN0W3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNvbWV0aW1lcyBzZXR0aW5nIGEgcHJvcGVydHkgY2FuIGZhaWwgKGUuZy4gLm5hbWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3QubWVzc2FnZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKG9iamVjdC5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgJiYgIWVycm9yLnN0YWNrICYmIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShlcnJvciwgZGVzZXJpYWxpemVFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEVycm9yKFN0cmluZyhvYmplY3QpKTtcbn07XG4vLyBpbnNwaXJlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvc2VyaWFsaXplLWVycm9yL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG5leHBvcnQgY29uc3Qgc2VyaWFsaXplRXJyb3IgPSAodmFsdWUpID0+IHtcbiAgICBpZiAoIXZhbHVlKVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZGVzdHJveUNpcmN1bGFyKHZhbHVlLCBbXSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gYFtGdW5jdGlvbjogJHt2YWx1ZS5uYW1lIHx8IFwiYW5vbnltb3VzXCJ9XWA7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn07XG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9kZXN0cm95LWNpcmN1bGFyXG5mdW5jdGlvbiBkZXN0cm95Q2lyY3VsYXIoZnJvbSwgc2Vlbikge1xuICAgIGNvbnN0IHRvID0ge307XG4gICAgc2Vlbi5wdXNoKGZyb20pO1xuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGZyb20pKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZnJvbVtrZXldO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB0b1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2Vlbi5pbmRleE9mKGZyb21ba2V5XSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0b1trZXldID0gZGVzdHJveUNpcmN1bGFyKGZyb21ba2V5XSwgc2Vlbi5zbGljZSgwKSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB0b1trZXldID0gXCJbQ2lyY3VsYXJdXCI7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZnJvbS5uYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRvLm5hbWUgPSBmcm9tLm5hbWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZnJvbS5tZXNzYWdlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRvLm1lc3NhZ2UgPSBmcm9tLm1lc3NhZ2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZnJvbS5zdGFjayA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0by5zdGFjayA9IGZyb20uc3RhY2s7XG4gICAgfVxuICAgIHJldHVybiB0bztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlbHBlcnMuanMubWFwIiwiaW1wb3J0IHsgc2VyaWFsaXplRXJyb3IsIGRlc2VyaWFsaXplRXJyb3IsIGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MsIGFkZEN1c3RvbUVycm9yRGVzZXJpYWxpemVyLCB9IGZyb20gXCIuL2hlbHBlcnNcIjtcbmV4cG9ydCB7IHNlcmlhbGl6ZUVycm9yLCBkZXNlcmlhbGl6ZUVycm9yLCBjcmVhdGVDdXN0b21FcnJvckNsYXNzLCBhZGRDdXN0b21FcnJvckRlc2VyaWFsaXplciB9O1xuZXhwb3J0IGNvbnN0IEFjY291bnROYW1lUmVxdWlyZWRFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJBY2NvdW50TmFtZVJlcXVpcmVkXCIpO1xuZXhwb3J0IGNvbnN0IEFjY291bnROb3RTdXBwb3J0ZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiQWNjb3VudE5vdFN1cHBvcnRlZFwiKTtcbmV4cG9ydCBjb25zdCBBbW91bnRSZXF1aXJlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJBbW91bnRSZXF1aXJlZFwiKTtcbmV4cG9ydCBjb25zdCBCbHVldG9vdGhSZXF1aXJlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJCbHVldG9vdGhSZXF1aXJlZFwiKTtcbmV4cG9ydCBjb25zdCBCdGNVbm1hdGNoZWRBcHAgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiQnRjVW5tYXRjaGVkQXBwXCIpO1xuZXhwb3J0IGNvbnN0IENhbnRPcGVuRGV2aWNlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkNhbnRPcGVuRGV2aWNlXCIpO1xuZXhwb3J0IGNvbnN0IENhc2hBZGRyTm90U3VwcG9ydGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkNhc2hBZGRyTm90U3VwcG9ydGVkXCIpO1xuZXhwb3J0IGNvbnN0IENsYWltUmV3YXJkc0ZlZXNXYXJuaW5nID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkNsYWltUmV3YXJkc0ZlZXNXYXJuaW5nXCIpO1xuZXhwb3J0IGNvbnN0IEN1cnJlbmN5Tm90U3VwcG9ydGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkN1cnJlbmN5Tm90U3VwcG9ydGVkXCIpO1xuZXhwb3J0IGNvbnN0IERldmljZUFwcFZlcmlmeU5vdFN1cHBvcnRlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VBcHBWZXJpZnlOb3RTdXBwb3J0ZWRcIik7XG5leHBvcnQgY29uc3QgRGV2aWNlR2VudWluZVNvY2tldEVhcmx5Q2xvc2UgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRGV2aWNlR2VudWluZVNvY2tldEVhcmx5Q2xvc2VcIik7XG5leHBvcnQgY29uc3QgRGV2aWNlTm90R2VudWluZUVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRldmljZU5vdEdlbnVpbmVcIik7XG5leHBvcnQgY29uc3QgRGV2aWNlT25EYXNoYm9hcmRFeHBlY3RlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VPbkRhc2hib2FyZEV4cGVjdGVkXCIpO1xuZXhwb3J0IGNvbnN0IERldmljZU9uRGFzaGJvYXJkVW5leHBlY3RlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VPbkRhc2hib2FyZFVuZXhwZWN0ZWRcIik7XG5leHBvcnQgY29uc3QgRGV2aWNlSW5PU1VFeHBlY3RlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VJbk9TVUV4cGVjdGVkXCIpO1xuZXhwb3J0IGNvbnN0IERldmljZUhhbHRlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VIYWx0ZWRcIik7XG5leHBvcnQgY29uc3QgRGV2aWNlTmFtZUludmFsaWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRGV2aWNlTmFtZUludmFsaWRcIik7XG5leHBvcnQgY29uc3QgRGV2aWNlU29ja2V0RmFpbCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VTb2NrZXRGYWlsXCIpO1xuZXhwb3J0IGNvbnN0IERldmljZVNvY2tldE5vQnVsa1N0YXR1cyA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VTb2NrZXROb0J1bGtTdGF0dXNcIik7XG5leHBvcnQgY29uc3QgRGV2aWNlTmVlZHNSZXN0YXJ0ID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRldmljZVNvY2tldE5vQnVsa1N0YXR1c1wiKTtcbmV4cG9ydCBjb25zdCBVbnJlc3BvbnNpdmVEZXZpY2VFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJVbnJlc3BvbnNpdmVEZXZpY2VFcnJvclwiKTtcbmV4cG9ydCBjb25zdCBEaXNjb25uZWN0ZWREZXZpY2UgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRGlzY29ubmVjdGVkRGV2aWNlXCIpO1xuZXhwb3J0IGNvbnN0IERpc2Nvbm5lY3RlZERldmljZUR1cmluZ09wZXJhdGlvbiA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEaXNjb25uZWN0ZWREZXZpY2VEdXJpbmdPcGVyYXRpb25cIik7XG5leHBvcnQgY29uc3QgRGV2aWNlRXh0cmFjdE9uYm9hcmRpbmdTdGF0ZUVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkRldmljZUV4dHJhY3RPbmJvYXJkaW5nU3RhdGVFcnJvclwiKTtcbmV4cG9ydCBjb25zdCBEZXZpY2VPbmJvYXJkaW5nU3RhdGVQb2xsaW5nRXJyb3IgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRGV2aWNlT25ib2FyZGluZ1N0YXRlUG9sbGluZ0Vycm9yXCIpO1xuZXhwb3J0IGNvbnN0IEVucG9pbnRDb25maWdFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJFbnBvaW50Q29uZmlnXCIpO1xuZXhwb3J0IGNvbnN0IEV0aEFwcFBsZWFzZUVuYWJsZUNvbnRyYWN0RGF0YSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJFdGhBcHBQbGVhc2VFbmFibGVDb250cmFjdERhdGFcIik7XG5leHBvcnQgY29uc3QgRmVlRXN0aW1hdGlvbkZhaWxlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJGZWVFc3RpbWF0aW9uRmFpbGVkXCIpO1xuZXhwb3J0IGNvbnN0IEZpcm13YXJlTm90UmVjb2duaXplZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJGaXJtd2FyZU5vdFJlY29nbml6ZWRcIik7XG5leHBvcnQgY29uc3QgSGFyZFJlc2V0RmFpbCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJIYXJkUmVzZXRGYWlsXCIpO1xuZXhwb3J0IGNvbnN0IEludmFsaWRYUlBUYWcgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiSW52YWxpZFhSUFRhZ1wiKTtcbmV4cG9ydCBjb25zdCBJbnZhbGlkQWRkcmVzcyA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJJbnZhbGlkQWRkcmVzc1wiKTtcbmV4cG9ydCBjb25zdCBJbnZhbGlkTm9uY2UgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiSW52YWxpZE5vbmNlXCIpO1xuZXhwb3J0IGNvbnN0IEludmFsaWRBZGRyZXNzQmVjYXVzZURlc3RpbmF0aW9uSXNBbHNvU291cmNlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkludmFsaWRBZGRyZXNzQmVjYXVzZURlc3RpbmF0aW9uSXNBbHNvU291cmNlXCIpO1xuZXhwb3J0IGNvbnN0IExhdGVzdE1DVUluc3RhbGxlZEVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkxhdGVzdE1DVUluc3RhbGxlZEVycm9yXCIpO1xuZXhwb3J0IGNvbnN0IFVua25vd25NQ1UgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVW5rbm93bk1DVVwiKTtcbmV4cG9ydCBjb25zdCBMZWRnZXJBUElFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJMZWRnZXJBUElFcnJvclwiKTtcbmV4cG9ydCBjb25zdCBMZWRnZXJBUElFcnJvcldpdGhNZXNzYWdlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkxlZGdlckFQSUVycm9yV2l0aE1lc3NhZ2VcIik7XG5leHBvcnQgY29uc3QgTGVkZ2VyQVBJTm90QXZhaWxhYmxlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkxlZGdlckFQSU5vdEF2YWlsYWJsZVwiKTtcbmV4cG9ydCBjb25zdCBNYW5hZ2VyQXBwQWxyZWFkeUluc3RhbGxlZEVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk1hbmFnZXJBcHBBbHJlYWR5SW5zdGFsbGVkXCIpO1xuZXhwb3J0IGNvbnN0IE1hbmFnZXJBcHBSZWx5T25CVENFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJNYW5hZ2VyQXBwUmVseU9uQlRDXCIpO1xuZXhwb3J0IGNvbnN0IE1hbmFnZXJBcHBEZXBJbnN0YWxsUmVxdWlyZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTWFuYWdlckFwcERlcEluc3RhbGxSZXF1aXJlZFwiKTtcbmV4cG9ydCBjb25zdCBNYW5hZ2VyQXBwRGVwVW5pbnN0YWxsUmVxdWlyZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTWFuYWdlckFwcERlcFVuaW5zdGFsbFJlcXVpcmVkXCIpO1xuZXhwb3J0IGNvbnN0IE1hbmFnZXJEZXZpY2VMb2NrZWRFcnJvciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJNYW5hZ2VyRGV2aWNlTG9ja2VkXCIpO1xuZXhwb3J0IGNvbnN0IE1hbmFnZXJGaXJtd2FyZU5vdEVub3VnaFNwYWNlRXJyb3IgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTWFuYWdlckZpcm13YXJlTm90RW5vdWdoU3BhY2VcIik7XG5leHBvcnQgY29uc3QgTWFuYWdlck5vdEVub3VnaFNwYWNlRXJyb3IgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTWFuYWdlck5vdEVub3VnaFNwYWNlXCIpO1xuZXhwb3J0IGNvbnN0IE1hbmFnZXJVbmluc3RhbGxCVENEZXAgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTWFuYWdlclVuaW5zdGFsbEJUQ0RlcFwiKTtcbmV4cG9ydCBjb25zdCBOZXR3b3JrRG93biA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJOZXR3b3JrRG93blwiKTtcbmV4cG9ydCBjb25zdCBOZXR3b3JrRXJyb3IgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTmV0d29ya0Vycm9yXCIpO1xuZXhwb3J0IGNvbnN0IE5vQWRkcmVzc2VzRm91bmQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTm9BZGRyZXNzZXNGb3VuZFwiKTtcbmV4cG9ydCBjb25zdCBOb3RFbm91Z2hCYWxhbmNlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk5vdEVub3VnaEJhbGFuY2VcIik7XG5leHBvcnQgY29uc3QgTm90RW5vdWdoQmFsYW5jZVRvRGVsZWdhdGUgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTm90RW5vdWdoQmFsYW5jZVRvRGVsZWdhdGVcIik7XG5leHBvcnQgY29uc3QgTm90RW5vdWdoQmFsYW5jZUluUGFyZW50QWNjb3VudCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJOb3RFbm91Z2hCYWxhbmNlSW5QYXJlbnRBY2NvdW50XCIpO1xuZXhwb3J0IGNvbnN0IE5vdEVub3VnaFNwZW5kYWJsZUJhbGFuY2UgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTm90RW5vdWdoU3BlbmRhYmxlQmFsYW5jZVwiKTtcbmV4cG9ydCBjb25zdCBOb3RFbm91Z2hCYWxhbmNlQmVjYXVzZURlc3RpbmF0aW9uTm90Q3JlYXRlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJOb3RFbm91Z2hCYWxhbmNlQmVjYXVzZURlc3RpbmF0aW9uTm90Q3JlYXRlZFwiKTtcbmV4cG9ydCBjb25zdCBOb0FjY2Vzc1RvQ2FtZXJhID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk5vQWNjZXNzVG9DYW1lcmFcIik7XG5leHBvcnQgY29uc3QgTm90RW5vdWdoR2FzID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk5vdEVub3VnaEdhc1wiKTtcbi8vIEVycm9yIG1lc3NhZ2Ugc3BlY2lmaWNhbGx5IGZvciB0aGUgUFRYIHN3YXAgZmxvd1xuZXhwb3J0IGNvbnN0IE5vdEVub3VnaEdhc1N3YXAgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTm90RW5vdWdoR2FzU3dhcFwiKTtcbmV4cG9ydCBjb25zdCBOb3RTdXBwb3J0ZWRMZWdhY3lBZGRyZXNzID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk5vdFN1cHBvcnRlZExlZ2FjeUFkZHJlc3NcIik7XG5leHBvcnQgY29uc3QgR2FzTGVzc1RoYW5Fc3RpbWF0ZSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJHYXNMZXNzVGhhbkVzdGltYXRlXCIpO1xuZXhwb3J0IGNvbnN0IFByaW9yaXR5RmVlVG9vTG93ID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlByaW9yaXR5RmVlVG9vTG93XCIpO1xuZXhwb3J0IGNvbnN0IFByaW9yaXR5RmVlVG9vSGlnaCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJQcmlvcml0eUZlZVRvb0hpZ2hcIik7XG5leHBvcnQgY29uc3QgUHJpb3JpdHlGZWVIaWdoZXJUaGFuTWF4RmVlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlByaW9yaXR5RmVlSGlnaGVyVGhhbk1heEZlZVwiKTtcbmV4cG9ydCBjb25zdCBNYXhGZWVUb29Mb3cgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiTWF4RmVlVG9vTG93XCIpO1xuZXhwb3J0IGNvbnN0IFBhc3N3b3Jkc0RvbnRNYXRjaEVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlBhc3N3b3Jkc0RvbnRNYXRjaFwiKTtcbmV4cG9ydCBjb25zdCBQYXNzd29yZEluY29ycmVjdEVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlBhc3N3b3JkSW5jb3JyZWN0XCIpO1xuZXhwb3J0IGNvbnN0IFJlY29tbWVuZFN1YkFjY291bnRzVG9FbXB0eSA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJSZWNvbW1lbmRTdWJBY2NvdW50c1RvRW1wdHlcIik7XG5leHBvcnQgY29uc3QgUmVjb21tZW5kVW5kZWxlZ2F0aW9uID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlJlY29tbWVuZFVuZGVsZWdhdGlvblwiKTtcbmV4cG9ydCBjb25zdCBUaW1lb3V0VGFnZ2VkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlRpbWVvdXRUYWdnZWRcIik7XG5leHBvcnQgY29uc3QgVW5leHBlY3RlZEJvb3Rsb2FkZXIgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVW5leHBlY3RlZEJvb3Rsb2FkZXJcIik7XG5leHBvcnQgY29uc3QgTUNVTm90R2VudWluZVRvRGFzaGJvYXJkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIk1DVU5vdEdlbnVpbmVUb0Rhc2hib2FyZFwiKTtcbmV4cG9ydCBjb25zdCBSZWNpcGllbnRSZXF1aXJlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJSZWNpcGllbnRSZXF1aXJlZFwiKTtcbmV4cG9ydCBjb25zdCBVbmF2YWlsYWJsZVRlem9zT3JpZ2luYXRlZEFjY291bnRSZWNlaXZlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVuYXZhaWxhYmxlVGV6b3NPcmlnaW5hdGVkQWNjb3VudFJlY2VpdmVcIik7XG5leHBvcnQgY29uc3QgVW5hdmFpbGFibGVUZXpvc09yaWdpbmF0ZWRBY2NvdW50U2VuZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJVbmF2YWlsYWJsZVRlem9zT3JpZ2luYXRlZEFjY291bnRTZW5kXCIpO1xuZXhwb3J0IGNvbnN0IFVwZGF0ZUZldGNoRmlsZUZhaWwgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVXBkYXRlRmV0Y2hGaWxlRmFpbFwiKTtcbmV4cG9ydCBjb25zdCBVcGRhdGVJbmNvcnJlY3RIYXNoID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVwZGF0ZUluY29ycmVjdEhhc2hcIik7XG5leHBvcnQgY29uc3QgVXBkYXRlSW5jb3JyZWN0U2lnID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVwZGF0ZUluY29ycmVjdFNpZ1wiKTtcbmV4cG9ydCBjb25zdCBVcGRhdGVZb3VyQXBwID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVwZGF0ZVlvdXJBcHBcIik7XG5leHBvcnQgY29uc3QgVXNlclJlZnVzZWREZXZpY2VOYW1lQ2hhbmdlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVzZXJSZWZ1c2VkRGV2aWNlTmFtZUNoYW5nZVwiKTtcbmV4cG9ydCBjb25zdCBVc2VyUmVmdXNlZEFkZHJlc3MgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVXNlclJlZnVzZWRBZGRyZXNzXCIpO1xuZXhwb3J0IGNvbnN0IFVzZXJSZWZ1c2VkRmlybXdhcmVVcGRhdGUgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVXNlclJlZnVzZWRGaXJtd2FyZVVwZGF0ZVwiKTtcbmV4cG9ydCBjb25zdCBVc2VyUmVmdXNlZEFsbG93TWFuYWdlciA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJVc2VyUmVmdXNlZEFsbG93TWFuYWdlclwiKTtcbmV4cG9ydCBjb25zdCBVc2VyUmVmdXNlZE9uRGV2aWNlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlVzZXJSZWZ1c2VkT25EZXZpY2VcIik7IC8vIFRPRE8gcmVuYW1lIGJlY2F1c2UgaXQncyBqdXN0IGZvciB0cmFuc2FjdGlvbiByZWZ1c2FsXG5leHBvcnQgY29uc3QgRXhwZXJ0TW9kZVJlcXVpcmVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkV4cGVydE1vZGVSZXF1aXJlZFwiKTtcbmV4cG9ydCBjb25zdCBUcmFuc3BvcnRPcGVuVXNlckNhbmNlbGxlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJUcmFuc3BvcnRPcGVuVXNlckNhbmNlbGxlZFwiKTtcbmV4cG9ydCBjb25zdCBUcmFuc3BvcnRJbnRlcmZhY2VOb3RBdmFpbGFibGUgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVHJhbnNwb3J0SW50ZXJmYWNlTm90QXZhaWxhYmxlXCIpO1xuZXhwb3J0IGNvbnN0IFRyYW5zcG9ydFJhY2VDb25kaXRpb24gPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVHJhbnNwb3J0UmFjZUNvbmRpdGlvblwiKTtcbmV4cG9ydCBjb25zdCBUcmFuc3BvcnRXZWJVU0JHZXN0dXJlUmVxdWlyZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiVHJhbnNwb3J0V2ViVVNCR2VzdHVyZVJlcXVpcmVkXCIpO1xuZXhwb3J0IGNvbnN0IFRyYW5zYWN0aW9uSGFzQmVlblZhbGlkYXRlZEVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlRyYW5zYWN0aW9uSGFzQmVlblZhbGlkYXRlZEVycm9yXCIpO1xuZXhwb3J0IGNvbnN0IFRyYW5zcG9ydEV4Y2hhbmdlVGltZW91dEVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlRyYW5zcG9ydEV4Y2hhbmdlVGltZW91dEVycm9yXCIpO1xuZXhwb3J0IGNvbnN0IERldmljZVNob3VsZFN0YXlJbkFwcCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEZXZpY2VTaG91bGRTdGF5SW5BcHBcIik7XG5leHBvcnQgY29uc3QgV2Vic29ja2V0Q29ubmVjdGlvbkVycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIldlYnNvY2tldENvbm5lY3Rpb25FcnJvclwiKTtcbmV4cG9ydCBjb25zdCBXZWJzb2NrZXRDb25uZWN0aW9uRmFpbGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIldlYnNvY2tldENvbm5lY3Rpb25GYWlsZWRcIik7XG5leHBvcnQgY29uc3QgV3JvbmdEZXZpY2VGb3JBY2NvdW50ID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIldyb25nRGV2aWNlRm9yQWNjb3VudFwiKTtcbmV4cG9ydCBjb25zdCBXcm9uZ0FwcEZvckN1cnJlbmN5ID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIldyb25nQXBwRm9yQ3VycmVuY3lcIik7XG5leHBvcnQgY29uc3QgRVRIQWRkcmVzc05vbkVJUCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJFVEhBZGRyZXNzTm9uRUlQXCIpO1xuZXhwb3J0IGNvbnN0IENhbnRTY2FuUVJDb2RlID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkNhbnRTY2FuUVJDb2RlXCIpO1xuZXhwb3J0IGNvbnN0IEZlZU5vdExvYWRlZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJGZWVOb3RMb2FkZWRcIik7XG5leHBvcnQgY29uc3QgRmVlTm90TG9hZGVkU3dhcCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJGZWVOb3RMb2FkZWRTd2FwXCIpO1xuZXhwb3J0IGNvbnN0IEZlZVJlcXVpcmVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkZlZVJlcXVpcmVkXCIpO1xuZXhwb3J0IGNvbnN0IEZlZVRvb0hpZ2ggPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRmVlVG9vSGlnaFwiKTtcbmV4cG9ydCBjb25zdCBQZW5kaW5nT3BlcmF0aW9uID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlBlbmRpbmdPcGVyYXRpb25cIik7XG5leHBvcnQgY29uc3QgU3luY0Vycm9yID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlN5bmNFcnJvclwiKTtcbmV4cG9ydCBjb25zdCBQYWlyaW5nRmFpbGVkID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlBhaXJpbmdGYWlsZWRcIik7XG5leHBvcnQgY29uc3QgUGVlclJlbW92ZWRQYWlyaW5nID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIlBlZXJSZW1vdmVkUGFpcmluZ1wiKTtcbmV4cG9ydCBjb25zdCBHZW51aW5lQ2hlY2tGYWlsZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiR2VudWluZUNoZWNrRmFpbGVkXCIpO1xuZXhwb3J0IGNvbnN0IExlZGdlckFQSTR4eCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJMZWRnZXJBUEk0eHhcIik7XG5leHBvcnQgY29uc3QgTGVkZ2VyQVBJNXh4ID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkxlZGdlckFQSTV4eFwiKTtcbmV4cG9ydCBjb25zdCBGaXJtd2FyZU9yQXBwVXBkYXRlUmVxdWlyZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiRmlybXdhcmVPckFwcFVwZGF0ZVJlcXVpcmVkXCIpO1xuLy8gU3BlZWRVcCAvIENhbmNlbCBFVk0gdHhcbmV4cG9ydCBjb25zdCBSZXBsYWNlbWVudFRyYW5zYWN0aW9uVW5kZXJwcmljZWQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiUmVwbGFjZW1lbnRUcmFuc2FjdGlvblVuZGVycHJpY2VkXCIpO1xuLy8gQml0Y29pbiBmYW1pbHlcbmV4cG9ydCBjb25zdCBPcFJldHVybkRhdGFTaXplTGltaXQgPSBjcmVhdGVDdXN0b21FcnJvckNsYXNzKFwiT3BSZXR1cm5TaXplTGltaXRcIik7XG5leHBvcnQgY29uc3QgRHVzdExpbWl0ID0gY3JlYXRlQ3VzdG9tRXJyb3JDbGFzcyhcIkR1c3RMaW1pdFwiKTtcbi8vIExhbmd1YWdlXG5leHBvcnQgY29uc3QgTGFuZ3VhZ2VOb3RGb3VuZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJMYW5ndWFnZU5vdEZvdW5kXCIpO1xuLy8gZGIgc3R1ZmYsIG5vIG5lZWQgdG8gdHJhbnNsYXRlXG5leHBvcnQgY29uc3QgTm9EQlBhdGhHaXZlbiA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJOb0RCUGF0aEdpdmVuXCIpO1xuZXhwb3J0IGNvbnN0IERCV3JvbmdQYXNzd29yZCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEQldyb25nUGFzc3dvcmRcIik7XG5leHBvcnQgY29uc3QgREJOb3RSZXNldCA9IGNyZWF0ZUN1c3RvbUVycm9yQ2xhc3MoXCJEQk5vdFJlc2V0XCIpO1xuLyoqXG4gKiBUeXBlIG9mIGEgVHJhbnNwb3J0IGVycm9yIHVzZWQgdG8gcmVwcmVzZW50IGFsbCBlcXVpdmFsZW50IGVycm9ycyBjb21pbmcgZnJvbSBhbGwgcG9zc2libGUgaW1wbGVtZW50YXRpb24gb2YgVHJhbnNwb3J0XG4gKi9cbmV4cG9ydCB2YXIgSHdUcmFuc3BvcnRFcnJvclR5cGU7XG4oZnVuY3Rpb24gKEh3VHJhbnNwb3J0RXJyb3JUeXBlKSB7XG4gICAgSHdUcmFuc3BvcnRFcnJvclR5cGVbXCJVbmtub3duXCJdID0gXCJVbmtub3duXCI7XG4gICAgSHdUcmFuc3BvcnRFcnJvclR5cGVbXCJMb2NhdGlvblNlcnZpY2VzRGlzYWJsZWRcIl0gPSBcIkxvY2F0aW9uU2VydmljZXNEaXNhYmxlZFwiO1xuICAgIEh3VHJhbnNwb3J0RXJyb3JUeXBlW1wiTG9jYXRpb25TZXJ2aWNlc1VuYXV0aG9yaXplZFwiXSA9IFwiTG9jYXRpb25TZXJ2aWNlc1VuYXV0aG9yaXplZFwiO1xuICAgIEh3VHJhbnNwb3J0RXJyb3JUeXBlW1wiQmx1ZXRvb3RoU2NhblN0YXJ0RmFpbGVkXCJdID0gXCJCbHVldG9vdGhTY2FuU3RhcnRGYWlsZWRcIjtcbn0pKEh3VHJhbnNwb3J0RXJyb3JUeXBlIHx8IChId1RyYW5zcG9ydEVycm9yVHlwZSA9IHt9KSk7XG4vKipcbiAqIFJlcHJlc2VudHMgYW4gZXJyb3IgY29taW5nIGZyb20gdGhlIHVzYWdlIG9mIGFueSBUcmFuc3BvcnQgaW1wbGVtZW50YXRpb24uXG4gKlxuICogTmVlZGVkIHRvIG1hcCBhIHNwZWNpZmljIGltcGxlbWVudGF0aW9uIGVycm9yIGludG8gYW4gZXJyb3IgdGhhdFxuICogY2FuIGJlIG1hbmFnZWQgYnkgYW55IGNvZGUgdW5hd2FyZSBvZiB0aGUgc3BlY2lmaWMgVHJhbnNwb3J0IGltcGxlbWVudGF0aW9uXG4gKiB0aGF0IHdhcyB1c2VkLlxuICovXG5leHBvcnQgY2xhc3MgSHdUcmFuc3BvcnRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBtZXNzYWdlKSB7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIkh3VHJhbnNwb3J0RXJyb3JcIjtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgLy8gTmVlZGVkIGFzIGxvbmcgYXMgd2UgdGFyZ2V0IDwgRVM2XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBId1RyYW5zcG9ydEVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxufVxuLyoqXG4gKiBUcmFuc3BvcnRFcnJvciBpcyB1c2VkIGZvciBhbnkgZ2VuZXJpYyB0cmFuc3BvcnQgZXJyb3JzLlxuICogZS5nLiBFcnJvciB0aHJvd24gd2hlbiBkYXRhIHJlY2VpdmVkIGJ5IGV4Y2hhbmdlcyBhcmUgaW5jb3JyZWN0IG9yIGlmIGV4Y2hhbmdlZCBmYWlsZWQgdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgZGV2aWNlIGZvciB2YXJpb3VzIHJlYXNvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFRyYW5zcG9ydEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGlkKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBcIlRyYW5zcG9ydEVycm9yXCI7XG4gICAgICAgIHN1cGVyKG1lc3NhZ2UgfHwgbmFtZSk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBuZXcgRXJyb3IobWVzc2FnZSkuc3RhY2s7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICB9XG59XG5hZGRDdXN0b21FcnJvckRlc2VyaWFsaXplcihcIlRyYW5zcG9ydEVycm9yXCIsIGUgPT4gbmV3IFRyYW5zcG9ydEVycm9yKGUubWVzc2FnZSwgZS5pZCkpO1xuZXhwb3J0IGNvbnN0IFN0YXR1c0NvZGVzID0ge1xuICAgIEFDQ0VTU19DT05ESVRJT05fTk9UX0ZVTEZJTExFRDogMHg5ODA0LFxuICAgIEFMR09SSVRITV9OT1RfU1VQUE9SVEVEOiAweDk0ODQsXG4gICAgQ0xBX05PVF9TVVBQT1JURUQ6IDB4NmUwMCxcbiAgICBDT0RFX0JMT0NLRUQ6IDB4OTg0MCxcbiAgICBDT0RFX05PVF9JTklUSUFMSVpFRDogMHg5ODAyLFxuICAgIENPTU1BTkRfSU5DT01QQVRJQkxFX0ZJTEVfU1RSVUNUVVJFOiAweDY5ODEsXG4gICAgQ09ORElUSU9OU19PRl9VU0VfTk9UX1NBVElTRklFRDogMHg2OTg1LFxuICAgIENPTlRSQURJQ1RJT05fSU5WQUxJREFUSU9OOiAweDk4MTAsXG4gICAgQ09OVFJBRElDVElPTl9TRUNSRVRfQ09ERV9TVEFUVVM6IDB4OTgwOCxcbiAgICBDVVNUT01fSU1BR0VfQk9PVExPQURFUjogMHg2NjJmLFxuICAgIENVU1RPTV9JTUFHRV9FTVBUWTogMHg2NjJlLFxuICAgIEZJTEVfQUxSRUFEWV9FWElTVFM6IDB4NmE4OSxcbiAgICBGSUxFX05PVF9GT1VORDogMHg5NDA0LFxuICAgIEdQX0FVVEhfRkFJTEVEOiAweDYzMDAsXG4gICAgSEFMVEVEOiAweDZmYWEsXG4gICAgSU5DT05TSVNURU5UX0ZJTEU6IDB4OTQwOCxcbiAgICBJTkNPUlJFQ1RfREFUQTogMHg2YTgwLFxuICAgIElOQ09SUkVDVF9MRU5HVEg6IDB4NjcwMCxcbiAgICBJTkNPUlJFQ1RfUDFfUDI6IDB4NmIwMCxcbiAgICBJTlNfTk9UX1NVUFBPUlRFRDogMHg2ZDAwLFxuICAgIERFVklDRV9OT1RfT05CT0FSREVEOiAweDZkMDcsXG4gICAgREVWSUNFX05PVF9PTkJPQVJERURfMjogMHg2NjExLFxuICAgIElOVkFMSURfS0NWOiAweDk0ODUsXG4gICAgSU5WQUxJRF9PRkZTRVQ6IDB4OTQwMixcbiAgICBMSUNFTlNJTkc6IDB4NmY0MixcbiAgICBMT0NLRURfREVWSUNFOiAweDU1MTUsXG4gICAgTUFYX1ZBTFVFX1JFQUNIRUQ6IDB4OTg1MCxcbiAgICBNRU1PUllfUFJPQkxFTTogMHg5MjQwLFxuICAgIE1JU1NJTkdfQ1JJVElDQUxfUEFSQU1FVEVSOiAweDY4MDAsXG4gICAgTk9fRUZfU0VMRUNURUQ6IDB4OTQwMCxcbiAgICBOT1RfRU5PVUdIX01FTU9SWV9TUEFDRTogMHg2YTg0LFxuICAgIE9LOiAweDkwMDAsXG4gICAgUElOX1JFTUFJTklOR19BVFRFTVBUUzogMHg2M2MwLFxuICAgIFJFRkVSRU5DRURfREFUQV9OT1RfRk9VTkQ6IDB4NmE4OCxcbiAgICBTRUNVUklUWV9TVEFUVVNfTk9UX1NBVElTRklFRDogMHg2OTgyLFxuICAgIFRFQ0hOSUNBTF9QUk9CTEVNOiAweDZmMDAsXG4gICAgVU5LTk9XTl9BUERVOiAweDZkMDIsXG4gICAgVVNFUl9SRUZVU0VEX09OX0RFVklDRTogMHg1NTAxLFxuICAgIE5PVF9FTk9VR0hfU1BBQ0U6IDB4NTEwMixcbn07XG5leHBvcnQgZnVuY3Rpb24gZ2V0QWx0U3RhdHVzTWVzc2FnZShjb2RlKSB7XG4gICAgc3dpdGNoIChjb2RlKSB7XG4gICAgICAgIC8vIGltcHJvdmUgdGV4dCBvZiBtb3N0IGNvbW1vbiBlcnJvcnNcbiAgICAgICAgY2FzZSAweDY3MDA6XG4gICAgICAgICAgICByZXR1cm4gXCJJbmNvcnJlY3QgbGVuZ3RoXCI7XG4gICAgICAgIGNhc2UgMHg2ODAwOlxuICAgICAgICAgICAgcmV0dXJuIFwiTWlzc2luZyBjcml0aWNhbCBwYXJhbWV0ZXJcIjtcbiAgICAgICAgY2FzZSAweDY5ODI6XG4gICAgICAgICAgICByZXR1cm4gXCJTZWN1cml0eSBub3Qgc2F0aXNmaWVkIChkb25nbGUgbG9ja2VkIG9yIGhhdmUgaW52YWxpZCBhY2Nlc3MgcmlnaHRzKVwiO1xuICAgICAgICBjYXNlIDB4Njk4NTpcbiAgICAgICAgICAgIHJldHVybiBcIkNvbmRpdGlvbiBvZiB1c2Ugbm90IHNhdGlzZmllZCAoZGVuaWVkIGJ5IHRoZSB1c2VyPylcIjtcbiAgICAgICAgY2FzZSAweDZhODA6XG4gICAgICAgICAgICByZXR1cm4gXCJJbnZhbGlkIGRhdGEgcmVjZWl2ZWRcIjtcbiAgICAgICAgY2FzZSAweDZiMDA6XG4gICAgICAgICAgICByZXR1cm4gXCJJbnZhbGlkIHBhcmFtZXRlciByZWNlaXZlZFwiO1xuICAgICAgICBjYXNlIDB4NTUxNTpcbiAgICAgICAgICAgIHJldHVybiBcIkxvY2tlZCBkZXZpY2VcIjtcbiAgICB9XG4gICAgaWYgKDB4NmYwMCA8PSBjb2RlICYmIGNvZGUgPD0gMHg2ZmZmKSB7XG4gICAgICAgIHJldHVybiBcIkludGVybmFsIGVycm9yLCBwbGVhc2UgcmVwb3J0XCI7XG4gICAgfVxufVxuLyoqXG4gKiBFcnJvciB0aHJvd24gd2hlbiBhIGRldmljZSByZXR1cm5lZCBhIG5vbiBzdWNjZXNzIHN0YXR1cy5cbiAqIHRoZSBlcnJvci5zdGF0dXNDb2RlIGlzIG9uZSBvZiB0aGUgYFN0YXR1c0NvZGVzYCBleHBvcnRlZCBieSB0aGlzIGxpYnJhcnkuXG4gKi9cbmV4cG9ydCBjbGFzcyBUcmFuc3BvcnRTdGF0dXNFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gc3RhdHVzQ29kZSBUaGUgZXJyb3Igc3RhdHVzIGNvZGUgY29taW5nIGZyb20gYSBUcmFuc3BvcnQgaW1wbGVtZW50YXRpb25cbiAgICAgKiBAcGFyYW0gb3B0aW9ucyBjb250YWluaW5nOlxuICAgICAqICAtIGNhbkJlTWFwcGVkVG9DaGlsZEVycm9yOiBlbmFibGUgdGhlIG1hcHBpbmcgb2YgVHJhbnNwb3J0U3RhdHVzRXJyb3IgdG8gYW4gZXJyb3IgZXh0ZW5kaW5nL2luaGVyaXRpbmcgZnJvbSBpdFxuICAgICAqICAuIEV4OiBMb2NrZWREZXZpY2VFcnJvci4gRGVmYXVsdCB0byB0cnVlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHN0YXR1c0NvZGUsIHsgY2FuQmVNYXBwZWRUb0NoaWxkRXJyb3IgPSB0cnVlIH0gPSB7fSkge1xuICAgICAgICBjb25zdCBzdGF0dXNUZXh0ID0gT2JqZWN0LmtleXMoU3RhdHVzQ29kZXMpLmZpbmQoayA9PiBTdGF0dXNDb2Rlc1trXSA9PT0gc3RhdHVzQ29kZSkgfHwgXCJVTktOT1dOX0VSUk9SXCI7XG4gICAgICAgIGNvbnN0IHNtc2cgPSBnZXRBbHRTdGF0dXNNZXNzYWdlKHN0YXR1c0NvZGUpIHx8IHN0YXR1c1RleHQ7XG4gICAgICAgIGNvbnN0IHN0YXR1c0NvZGVTdHIgPSBzdGF0dXNDb2RlLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGBMZWRnZXIgZGV2aWNlOiAke3Ntc2d9ICgweCR7c3RhdHVzQ29kZVN0cn0pYDtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiVHJhbnNwb3J0U3RhdHVzRXJyb3JcIjtcbiAgICAgICAgdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzQ29kZTtcbiAgICAgICAgdGhpcy5zdGF0dXNUZXh0ID0gc3RhdHVzVGV4dDtcbiAgICAgICAgLy8gTWFwcyB0byBhIExvY2tlZERldmljZUVycm9yXG4gICAgICAgIGlmIChjYW5CZU1hcHBlZFRvQ2hpbGRFcnJvciAmJiBzdGF0dXNDb2RlID09PSBTdGF0dXNDb2Rlcy5MT0NLRURfREVWSUNFKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IExvY2tlZERldmljZUVycm9yKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIExvY2tlZERldmljZUVycm9yIGV4dGVuZHMgVHJhbnNwb3J0U3RhdHVzRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIoU3RhdHVzQ29kZXMuTE9DS0VEX0RFVklDRSwgeyBjYW5CZU1hcHBlZFRvQ2hpbGRFcnJvcjogZmFsc2UgfSk7XG4gICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmFtZSA9IFwiTG9ja2VkRGV2aWNlRXJyb3JcIjtcbiAgICB9XG59XG5hZGRDdXN0b21FcnJvckRlc2VyaWFsaXplcihcIlRyYW5zcG9ydFN0YXR1c0Vycm9yXCIsIGUgPT4gbmV3IFRyYW5zcG9ydFN0YXR1c0Vycm9yKGUuc3RhdHVzQ29kZSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgVHJhbnNwb3J0IGZyb20gXCJAbGVkZ2VyaHEvaHctdHJhbnNwb3J0XCI7XG5pbXBvcnQgaGlkRnJhbWluZyBmcm9tIFwiQGxlZGdlcmhxL2RldmljZXMvaGlkLWZyYW1pbmdcIjtcbmltcG9ydCB7IGlkZW50aWZ5VVNCUHJvZHVjdElkIH0gZnJvbSBcIkBsZWRnZXJocS9kZXZpY2VzXCI7XG5pbXBvcnQgeyBsb2cgfSBmcm9tIFwiQGxlZGdlcmhxL2xvZ3NcIjtcbmltcG9ydCB7IFRyYW5zcG9ydE9wZW5Vc2VyQ2FuY2VsbGVkLCBUcmFuc3BvcnRJbnRlcmZhY2VOb3RBdmFpbGFibGUsIFRyYW5zcG9ydFdlYlVTQkdlc3R1cmVSZXF1aXJlZCwgRGlzY29ubmVjdGVkRGV2aWNlRHVyaW5nT3BlcmF0aW9uLCBEaXNjb25uZWN0ZWREZXZpY2UsIH0gZnJvbSBcIkBsZWRnZXJocS9lcnJvcnNcIjtcbmltcG9ydCB7IGdldExlZGdlckRldmljZXMsIGdldEZpcnN0TGVkZ2VyRGV2aWNlLCByZXF1ZXN0TGVkZ2VyRGV2aWNlLCBpc1N1cHBvcnRlZCB9IGZyb20gXCIuL3dlYnVzYlwiO1xuY29uc3QgY29uZmlndXJhdGlvblZhbHVlID0gMTtcbmNvbnN0IGVuZHBvaW50TnVtYmVyID0gMztcbi8qKlxuICogV2ViVVNCIFRyYW5zcG9ydCBpbXBsZW1lbnRhdGlvblxuICogQGV4YW1wbGVcbiAqIGltcG9ydCBUcmFuc3BvcnRXZWJVU0IgZnJvbSBcIkBsZWRnZXJocS9ody10cmFuc3BvcnQtd2VidXNiXCI7XG4gKiAuLi5cbiAqIFRyYW5zcG9ydFdlYlVTQi5jcmVhdGUoKS50aGVuKHRyYW5zcG9ydCA9PiAuLi4pXG4gKi9cbmNsYXNzIFRyYW5zcG9ydFdlYlVTQiBleHRlbmRzIFRyYW5zcG9ydCB7XG4gICAgY29uc3RydWN0b3IoZGV2aWNlLCBpbnRlcmZhY2VOdW1iZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jaGFubmVsID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMHhmZmZmKTtcbiAgICAgICAgdGhpcy5wYWNrZXRTaXplID0gNjQ7XG4gICAgICAgIHRoaXMuX2Rpc2Nvbm5lY3RFbWl0dGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2VtaXREaXNjb25uZWN0ID0gKGUpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXNjb25uZWN0RW1pdHRlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLl9kaXNjb25uZWN0RW1pdHRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJkaXNjb25uZWN0XCIsIGUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRldmljZSA9IGRldmljZTtcbiAgICAgICAgdGhpcy5pbnRlcmZhY2VOdW1iZXIgPSBpbnRlcmZhY2VOdW1iZXI7XG4gICAgICAgIHRoaXMuZGV2aWNlTW9kZWwgPSBpZGVudGlmeVVTQlByb2R1Y3RJZChkZXZpY2UucHJvZHVjdElkKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2ltaWxhciB0byBjcmVhdGUoKSBleGNlcHQgaXQgd2lsbCBhbHdheXMgZGlzcGxheSB0aGUgZGV2aWNlIHBlcm1pc3Npb24gKGV2ZW4gaWYgc29tZSBkZXZpY2VzIGFyZSBhbHJlYWR5IGFjY2VwdGVkKS5cbiAgICAgKi9cbiAgICBzdGF0aWMgcmVxdWVzdCgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGRldmljZSA9IHlpZWxkIHJlcXVlc3RMZWRnZXJEZXZpY2UoKTtcbiAgICAgICAgICAgIHJldHVybiBUcmFuc3BvcnRXZWJVU0Iub3BlbihkZXZpY2UpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2ltaWxhciB0byBjcmVhdGUoKSBleGNlcHQgaXQgd2lsbCBuZXZlciBkaXNwbGF5IHRoZSBkZXZpY2UgcGVybWlzc2lvbiAoaXQgcmV0dXJucyBhIFByb21pc2U8P1RyYW5zcG9ydD4sIG51bGwgaWYgaXQgZmFpbHMgdG8gZmluZCBhIGRldmljZSkuXG4gICAgICovXG4gICAgc3RhdGljIG9wZW5Db25uZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBkZXZpY2VzID0geWllbGQgZ2V0TGVkZ2VyRGV2aWNlcygpO1xuICAgICAgICAgICAgaWYgKGRldmljZXMubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIFRyYW5zcG9ydFdlYlVTQi5vcGVuKGRldmljZXNbMF0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgTGVkZ2VyIHRyYW5zcG9ydCB3aXRoIGEgVVNCRGV2aWNlXG4gICAgICovXG4gICAgc3RhdGljIG9wZW4oZGV2aWNlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB5aWVsZCBkZXZpY2Uub3BlbigpO1xuICAgICAgICAgICAgaWYgKGRldmljZS5jb25maWd1cmF0aW9uID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgZGV2aWNlLnNlbGVjdENvbmZpZ3VyYXRpb24oY29uZmlndXJhdGlvblZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHlpZWxkIGdyYWNlZnVsbHlSZXNldERldmljZShkZXZpY2UpO1xuICAgICAgICAgICAgY29uc3QgaWZhY2UgPSBkZXZpY2UuY29uZmlndXJhdGlvbnNbMF0uaW50ZXJmYWNlcy5maW5kKCh7IGFsdGVybmF0ZXMgfSkgPT4gYWx0ZXJuYXRlcy5zb21lKGEgPT4gYS5pbnRlcmZhY2VDbGFzcyA9PT0gMjU1KSk7XG4gICAgICAgICAgICBpZiAoIWlmYWNlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFRyYW5zcG9ydEludGVyZmFjZU5vdEF2YWlsYWJsZShcIk5vIFdlYlVTQiBpbnRlcmZhY2UgZm91bmQgZm9yIHlvdXIgTGVkZ2VyIGRldmljZS4gUGxlYXNlIHVwZ3JhZGUgZmlybXdhcmUgb3IgY29udGFjdCB0ZWNoc3VwcG9ydC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBpbnRlcmZhY2VOdW1iZXIgPSBpZmFjZS5pbnRlcmZhY2VOdW1iZXI7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHlpZWxkIGRldmljZS5jbGFpbUludGVyZmFjZShpbnRlcmZhY2VOdW1iZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBkZXZpY2UuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHJhbnNwb3J0SW50ZXJmYWNlTm90QXZhaWxhYmxlKGUubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB0cmFuc3BvcnQgPSBuZXcgVHJhbnNwb3J0V2ViVVNCKGRldmljZSwgaW50ZXJmYWNlTnVtYmVyKTtcbiAgICAgICAgICAgIGNvbnN0IG9uRGlzY29ubmVjdCA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkZXZpY2UgPT09IGUuZGV2aWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICRGbG93Rml4TWVcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnVzYi5yZW1vdmVFdmVudExpc3RlbmVyKFwiZGlzY29ubmVjdFwiLCBvbkRpc2Nvbm5lY3QpO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuX2VtaXREaXNjb25uZWN0KG5ldyBEaXNjb25uZWN0ZWREZXZpY2UoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vICRGbG93Rml4TWVcbiAgICAgICAgICAgIG5hdmlnYXRvci51c2IuYWRkRXZlbnRMaXN0ZW5lcihcImRpc2Nvbm5lY3RcIiwgb25EaXNjb25uZWN0KTtcbiAgICAgICAgICAgIHJldHVybiB0cmFuc3BvcnQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWxlYXNlIHRoZSB0cmFuc3BvcnQgZGV2aWNlXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB5aWVsZCB0aGlzLmV4Y2hhbmdlQnVzeVByb21pc2U7XG4gICAgICAgICAgICB5aWVsZCB0aGlzLmRldmljZS5yZWxlYXNlSW50ZXJmYWNlKHRoaXMuaW50ZXJmYWNlTnVtYmVyKTtcbiAgICAgICAgICAgIHlpZWxkIGdyYWNlZnVsbHlSZXNldERldmljZSh0aGlzLmRldmljZSk7XG4gICAgICAgICAgICB5aWVsZCB0aGlzLmRldmljZS5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXhjaGFuZ2Ugd2l0aCB0aGUgZGV2aWNlIHVzaW5nIEFQRFUgcHJvdG9jb2wuXG4gICAgICogQHBhcmFtIGFwZHVcbiAgICAgKiBAcmV0dXJucyBhIHByb21pc2Ugb2YgYXBkdSByZXNwb25zZVxuICAgICAqL1xuICAgIGV4Y2hhbmdlKGFwZHUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGIgPSB5aWVsZCB0aGlzLmV4Y2hhbmdlQXRvbWljSW1wbCgoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBjaGFubmVsLCBwYWNrZXRTaXplIH0gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGxvZyhcImFwZHVcIiwgXCI9PiBcIiArIGFwZHUudG9TdHJpbmcoXCJoZXhcIikpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1pbmcgPSBoaWRGcmFtaW5nKGNoYW5uZWwsIHBhY2tldFNpemUpO1xuICAgICAgICAgICAgICAgIC8vIFdyaXRlLi4uXG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2tzID0gZnJhbWluZy5tYWtlQmxvY2tzKGFwZHUpO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuZGV2aWNlLnRyYW5zZmVyT3V0KGVuZHBvaW50TnVtYmVyLCBibG9ja3NbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBSZWFkLi4uXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgICAgICAgICBsZXQgYWNjO1xuICAgICAgICAgICAgICAgIHdoaWxlICghKHJlc3VsdCA9IGZyYW1pbmcuZ2V0UmVkdWNlZFJlc3VsdChhY2MpKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByID0geWllbGQgdGhpcy5kZXZpY2UudHJhbnNmZXJJbihlbmRwb2ludE51bWJlciwgcGFja2V0U2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbShyLmRhdGEuYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgYWNjID0gZnJhbWluZy5yZWR1Y2VSZXNwb25zZShhY2MsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvZyhcImFwZHVcIiwgXCI8PSBcIiArIHJlc3VsdC50b1N0cmluZyhcImhleFwiKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0pKS5jYXRjaChlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZSAmJiBlLm1lc3NhZ2UgJiYgZS5tZXNzYWdlLmluY2x1ZGVzKFwiZGlzY29ubmVjdGVkXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VtaXREaXNjb25uZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRGlzY29ubmVjdGVkRGV2aWNlRHVyaW5nT3BlcmF0aW9uKGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0U2NyYW1ibGVLZXkoKSB7IH1cbn1cbi8qKlxuICogQ2hlY2sgaWYgV2ViVVNCIHRyYW5zcG9ydCBpcyBzdXBwb3J0ZWQuXG4gKi9cblRyYW5zcG9ydFdlYlVTQi5pc1N1cHBvcnRlZCA9IGlzU3VwcG9ydGVkO1xuLyoqXG4gKiBMaXN0IHRoZSBXZWJVU0IgZGV2aWNlcyB0aGF0IHdhcyBwcmV2aW91c2x5IGF1dGhvcml6ZWQgYnkgdGhlIHVzZXIuXG4gKi9cblRyYW5zcG9ydFdlYlVTQi5saXN0ID0gZ2V0TGVkZ2VyRGV2aWNlcztcbi8qKlxuICogQWN0aXZlbHkgbGlzdGVuIHRvIFdlYlVTQiBkZXZpY2VzIGFuZCBlbWl0IE9ORSBkZXZpY2VcbiAqIHRoYXQgd2FzIGVpdGhlciBhY2NlcHRlZCBiZWZvcmUsIGlmIG5vdCBpdCB3aWxsIHRyaWdnZXIgdGhlIG5hdGl2ZSBwZXJtaXNzaW9uIFVJLlxuICpcbiAqIEltcG9ydGFudDogaXQgbXVzdCBiZSBjYWxsZWQgaW4gdGhlIGNvbnRleHQgb2YgYSBVSSBjbGljayFcbiAqL1xuVHJhbnNwb3J0V2ViVVNCLmxpc3RlbiA9IChvYnNlcnZlcikgPT4ge1xuICAgIGxldCB1bnN1YnNjcmliZWQgPSBmYWxzZTtcbiAgICBnZXRGaXJzdExlZGdlckRldmljZSgpLnRoZW4oZGV2aWNlID0+IHtcbiAgICAgICAgaWYgKCF1bnN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRldmljZU1vZGVsID0gaWRlbnRpZnlVU0JQcm9kdWN0SWQoZGV2aWNlLnByb2R1Y3RJZCk7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFkZFwiLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0b3I6IGRldmljZSxcbiAgICAgICAgICAgICAgICBkZXZpY2VNb2RlbCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgaWYgKHdpbmRvdy5ET01FeGNlcHRpb24gJiYgZXJyb3IgaW5zdGFuY2VvZiB3aW5kb3cuRE9NRXhjZXB0aW9uICYmIGVycm9yLmNvZGUgPT09IDE4KSB7XG4gICAgICAgICAgICBvYnNlcnZlci5lcnJvcihuZXcgVHJhbnNwb3J0V2ViVVNCR2VzdHVyZVJlcXVpcmVkKGVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmVycm9yKG5ldyBUcmFuc3BvcnRPcGVuVXNlckNhbmNlbGxlZChlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgICAgdW5zdWJzY3JpYmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdW5zdWJzY3JpYmUsXG4gICAgfTtcbn07XG5leHBvcnQgZGVmYXVsdCBUcmFuc3BvcnRXZWJVU0I7XG5mdW5jdGlvbiBncmFjZWZ1bGx5UmVzZXREZXZpY2UoZGV2aWNlKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHlpZWxkIGRldmljZS5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UcmFuc3BvcnRXZWJVU0IuanMubWFwIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBsZWRnZXJVU0JWZW5kb3JJZCB9IGZyb20gXCJAbGVkZ2VyaHEvZGV2aWNlc1wiO1xuY29uc3QgbGVkZ2VyRGV2aWNlcyA9IFtcbiAgICB7XG4gICAgICAgIHZlbmRvcklkOiBsZWRnZXJVU0JWZW5kb3JJZCxcbiAgICB9LFxuXTtcbmV4cG9ydCBmdW5jdGlvbiByZXF1ZXN0TGVkZ2VyRGV2aWNlKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGRldmljZSA9IHlpZWxkIG5hdmlnYXRvci51c2IucmVxdWVzdERldmljZSh7XG4gICAgICAgICAgICBmaWx0ZXJzOiBsZWRnZXJEZXZpY2VzLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRldmljZTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRMZWRnZXJEZXZpY2VzKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGRldmljZXMgPSB5aWVsZCBuYXZpZ2F0b3IudXNiLmdldERldmljZXMoKTtcbiAgICAgICAgcmV0dXJuIGRldmljZXMuZmlsdGVyKGQgPT4gZC52ZW5kb3JJZCA9PT0gbGVkZ2VyVVNCVmVuZG9ySWQpO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpcnN0TGVkZ2VyRGV2aWNlKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nRGV2aWNlcyA9IHlpZWxkIGdldExlZGdlckRldmljZXMoKTtcbiAgICAgICAgaWYgKGV4aXN0aW5nRGV2aWNlcy5sZW5ndGggPiAwKVxuICAgICAgICAgICAgcmV0dXJuIGV4aXN0aW5nRGV2aWNlc1swXTtcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RMZWRnZXJEZXZpY2UoKTtcbiAgICB9KTtcbn1cbmV4cG9ydCBjb25zdCBpc1N1cHBvcnRlZCA9ICgpID0+IFByb21pc2UucmVzb2x2ZSghIW5hdmlnYXRvciAmJiAhIW5hdmlnYXRvci51c2IgJiYgdHlwZW9mIG5hdmlnYXRvci51c2IuZ2V0RGV2aWNlcyA9PT0gXCJmdW5jdGlvblwiKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdlYnVzYi5qcy5tYXAiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IHsgVHJhbnNwb3J0UmFjZUNvbmRpdGlvbiwgVHJhbnNwb3J0RXJyb3IsIFN0YXR1c0NvZGVzLCBnZXRBbHRTdGF0dXNNZXNzYWdlLCBUcmFuc3BvcnRTdGF0dXNFcnJvciwgfSBmcm9tIFwiQGxlZGdlcmhxL2Vycm9yc1wiO1xuaW1wb3J0IHsgTG9jYWxUcmFjZXIgfSBmcm9tIFwiQGxlZGdlcmhxL2xvZ3NcIjtcbmV4cG9ydCB7IFRyYW5zcG9ydEVycm9yLCBUcmFuc3BvcnRTdGF0dXNFcnJvciwgU3RhdHVzQ29kZXMsIGdldEFsdFN0YXR1c01lc3NhZ2UgfTtcbmNvbnN0IERFRkFVTFRfTE9HX1RZUEUgPSBcInRyYW5zcG9ydFwiO1xuLyoqXG4gKiBUaGUgVHJhbnNwb3J0IGNsYXNzIGRlZmluZXMgYSBnZW5lcmljIGludGVyZmFjZSBmb3IgY29tbXVuaWNhdGluZyB3aXRoIGEgTGVkZ2VyIGhhcmR3YXJlIHdhbGxldC5cbiAqIFRoZXJlIGFyZSBkaWZmZXJlbnQga2luZCBvZiB0cmFuc3BvcnRzIGJhc2VkIG9uIHRoZSB0ZWNobm9sb2d5IChjaGFubmVscyBsaWtlIFUyRiwgSElELCBCbHVldG9vdGgsIFdlYnVzYikgYW5kIGVudmlyb25tZW50IChOb2RlLCBXZWIsLi4uKS5cbiAqIEl0IGlzIGFuIGFic3RyYWN0IGNsYXNzIHRoYXQgbmVlZHMgdG8gYmUgaW1wbGVtZW50ZWQuXG4gKi9cbmNsYXNzIFRyYW5zcG9ydCB7XG4gICAgY29uc3RydWN0b3IoeyBjb250ZXh0LCBsb2dUeXBlIH0gPSB7fSkge1xuICAgICAgICB0aGlzLmV4Y2hhbmdlVGltZW91dCA9IDMwMDAwO1xuICAgICAgICB0aGlzLnVucmVzcG9uc2l2ZVRpbWVvdXQgPSAxNTAwMDtcbiAgICAgICAgdGhpcy5kZXZpY2VNb2RlbCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlbmQgZGF0YSB0byB0aGUgZGV2aWNlIHVzaW5nIHRoZSBoaWdoZXIgbGV2ZWwgQVBJLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gY2xhIC0gVGhlIGluc3RydWN0aW9uIGNsYXNzIGZvciB0aGUgY29tbWFuZC5cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGlucyAtIFRoZSBpbnN0cnVjdGlvbiBjb2RlIGZvciB0aGUgY29tbWFuZC5cbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHAxIC0gVGhlIGZpcnN0IHBhcmFtZXRlciBmb3IgdGhlIGluc3RydWN0aW9uLlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gcDIgLSBUaGUgc2Vjb25kIHBhcmFtZXRlciBmb3IgdGhlIGluc3RydWN0aW9uLlxuICAgICAgICAgKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSAtIFRoZSBkYXRhIHRvIGJlIHNlbnQuIERlZmF1bHRzIHRvIGFuIGVtcHR5IGJ1ZmZlci5cbiAgICAgICAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBzdGF0dXNMaXN0IC0gQSBsaXN0IG9mIGFjY2VwdGFibGUgc3RhdHVzIGNvZGVzIGZvciB0aGUgcmVzcG9uc2UuIERlZmF1bHRzIHRvIFtTdGF0dXNDb2Rlcy5PS10uXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gQ29udGFpbnMgb3B0aW9uYWwgb3B0aW9ucyBmb3IgdGhlIGV4Y2hhbmdlIGZ1bmN0aW9uXG4gICAgICAgICAqICAtIGFib3J0VGltZW91dE1zOiBzdG9wIHRoZSBzZW5kIGFmdGVyIGEgZ2l2ZW4gdGltZW91dC4gQW5vdGhlciB0aW1lb3V0IGV4aXN0c1xuICAgICAgICAgKiAgICB0byBkZXRlY3QgdW5yZXNwb25zaXZlIGRldmljZSAoc2VlIGB1bnJlc3BvbnNpdmVUaW1lb3V0YCkuIFRoaXMgdGltZW91dCBhYm9ydHMgdGhlIGV4Y2hhbmdlLlxuICAgICAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCdWZmZXI+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSByZXNwb25zZSBkYXRhIGZyb20gdGhlIGRldmljZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VuZCA9IChjbGEsIGlucywgcDEsIHAyLCBkYXRhID0gQnVmZmVyLmFsbG9jKDApLCBzdGF0dXNMaXN0ID0gW1N0YXR1c0NvZGVzLk9LXSwgeyBhYm9ydFRpbWVvdXRNcyB9ID0ge30pID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNlciA9IHRoaXMudHJhY2VyLndpdGhVcGRhdGVkQ29udGV4dCh7IGZ1bmN0aW9uOiBcInNlbmRcIiB9KTtcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+PSAyNTYpIHtcbiAgICAgICAgICAgICAgICB0cmFjZXIudHJhY2UoXCJkYXRhLmxlbmd0aCBleGNlZWRlZCAyNTYgYnl0ZXMgbGltaXRcIiwgeyBkYXRhTGVuZ3RoOiBkYXRhLmxlbmd0aCB9KTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHJhbnNwb3J0RXJyb3IoXCJkYXRhLmxlbmd0aCBleGNlZWQgMjU2IGJ5dGVzIGxpbWl0LiBHb3Q6IFwiICsgZGF0YS5sZW5ndGgsIFwiRGF0YUxlbmd0aFRvb0JpZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyYWNlci50cmFjZShcIlN0YXJ0aW5nIGFuIGV4Y2hhbmdlXCIsIHsgYWJvcnRUaW1lb3V0TXMgfSk7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIHRoaXMuZXhjaGFuZ2UoXG4gICAgICAgICAgICAvLyBUaGUgc2l6ZSBvZiB0aGUgZGF0YSBpcyBhZGRlZCBpbiAxIGJ5dGUganVzdCBiZWZvcmUgYGRhdGFgXG4gICAgICAgICAgICBCdWZmZXIuY29uY2F0KFtCdWZmZXIuZnJvbShbY2xhLCBpbnMsIHAxLCBwMl0pLCBCdWZmZXIuZnJvbShbZGF0YS5sZW5ndGhdKSwgZGF0YV0pLCB7IGFib3J0VGltZW91dE1zIH0pO1xuICAgICAgICAgICAgdHJhY2VyLnRyYWNlKFwiUmVjZWl2ZWQgcmVzcG9uc2UgZnJvbSBleGNoYW5nZVwiKTtcbiAgICAgICAgICAgIGNvbnN0IHN3ID0gcmVzcG9uc2UucmVhZFVJbnQxNkJFKHJlc3BvbnNlLmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgaWYgKCFzdGF0dXNMaXN0LnNvbWUocyA9PiBzID09PSBzdykpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHJhbnNwb3J0U3RhdHVzRXJyb3Ioc3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fYXBwQVBJbG9jayA9IG51bGw7XG4gICAgICAgIHRoaXMudHJhY2VyID0gbmV3IExvY2FsVHJhY2VyKGxvZ1R5cGUgIT09IG51bGwgJiYgbG9nVHlwZSAhPT0gdm9pZCAwID8gbG9nVHlwZSA6IERFRkFVTFRfTE9HX1RZUEUsIGNvbnRleHQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIGRhdGEgdG8gdGhlIGRldmljZSB1c2luZyBhIGxvdyBsZXZlbCBBUEkuXG4gICAgICogSXQncyByZWNvbW1lbmRlZCB0byB1c2UgdGhlIFwic2VuZFwiIG1ldGhvZCBmb3IgYSBoaWdoZXIgbGV2ZWwgQVBJLlxuICAgICAqIEBwYXJhbSB7QnVmZmVyfSBhcGR1IC0gVGhlIGRhdGEgdG8gc2VuZC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIENvbnRhaW5zIG9wdGlvbmFsIG9wdGlvbnMgZm9yIHRoZSBleGNoYW5nZSBmdW5jdGlvblxuICAgICAqICAtIGFib3J0VGltZW91dE1zOiBzdG9wIHRoZSBleGNoYW5nZSBhZnRlciBhIGdpdmVuIHRpbWVvdXQuIEFub3RoZXIgdGltZW91dCBleGlzdHNcbiAgICAgKiAgICB0byBkZXRlY3QgdW5yZXNwb25zaXZlIGRldmljZSAoc2VlIGB1bnJlc3BvbnNpdmVUaW1lb3V0YCkuIFRoaXMgdGltZW91dCBhYm9ydHMgdGhlIGV4Y2hhbmdlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJ1ZmZlcj59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlc3BvbnNlIGRhdGEgZnJvbSB0aGUgZGV2aWNlLlxuICAgICAqL1xuICAgIGV4Y2hhbmdlKF9hcGR1LCB7IGFib3J0VGltZW91dE1zOiBfYWJvcnRUaW1lb3V0TXMgfSA9IHt9KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImV4Y2hhbmdlIG5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCBhcGR1cyBpbiBiYXRjaCB0byB0aGUgZGV2aWNlIHVzaW5nIGEgbG93IGxldmVsIEFQSS5cbiAgICAgKiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBpcyB0byBjYWxsIGV4Y2hhbmdlIGZvciBlYWNoIGFwZHUuXG4gICAgICogQHBhcmFtIHtBcnJheTxCdWZmZXI+fSBhcGR1cyAtIGFycmF5IG9mIGFwZHVzIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtPYnNlcnZlcjxCdWZmZXI+fSBvYnNlcnZlciAtIGFuIG9ic2VydmVyIHRoYXQgd2lsbCByZWNlaXZlIHRoZSByZXNwb25zZSBvZiBlYWNoIGFwZHUuXG4gICAgICogQHJldHVybnMge1N1YnNjcmlwdGlvbn0gQSBTdWJzY3JpcHRpb24gb2JqZWN0IG9uIHdoaWNoIHlvdSBjYW4gY2FsbCBcIi51bnN1YnNjcmliZSgpXCIgdG8gc3RvcCBzZW5kaW5nIGFwZHVzLlxuICAgICAqL1xuICAgIGV4Y2hhbmdlQnVsayhhcGR1cywgb2JzZXJ2ZXIpIHtcbiAgICAgICAgbGV0IHVuc3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCB1bnN1YnNjcmliZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHVuc3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG1haW4gPSAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAodW5zdWJzY3JpYmVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXBkdSBvZiBhcGR1cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHIgPSB5aWVsZCB0aGlzLmV4Y2hhbmdlKGFwZHUpO1xuICAgICAgICAgICAgICAgIGlmICh1bnN1YnNjcmliZWQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXMgPSByLnJlYWRVSW50MTZCRShyLmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgIT09IFN0YXR1c0NvZGVzLk9LKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUcmFuc3BvcnRTdGF0dXNFcnJvcihzdGF0dXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbWFpbigpLnRoZW4oKCkgPT4gIXVuc3Vic2NyaWJlZCAmJiBvYnNlcnZlci5jb21wbGV0ZSgpLCBlID0+ICF1bnN1YnNjcmliZWQgJiYgb2JzZXJ2ZXIuZXJyb3IoZSkpO1xuICAgICAgICByZXR1cm4geyB1bnN1YnNjcmliZSB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIFwic2NyYW1ibGUga2V5XCIgZm9yIHRoZSBuZXh0IGRhdGEgZXhjaGFuZ2VzIHdpdGggdGhlIGRldmljZS5cbiAgICAgKiBFYWNoIGFwcCBjYW4gaGF2ZSBhIGRpZmZlcmVudCBzY3JhbWJsZSBrZXkgYW5kIGl0IGlzIHNldCBpbnRlcm5hbGx5IGR1cmluZyBpbnN0YW50aWF0aW9uLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUgc2NyYW1ibGUga2V5IHRvIHNldC5cbiAgICAgKiBkZXByZWNhdGVkIFRoaXMgbWV0aG9kIGlzIG5vIGxvbmdlciBuZWVkZWQgZm9yIG1vZGVybiB0cmFuc3BvcnRzIGFuZCBzaG91bGQgYmUgbWlncmF0ZWQgYXdheSBmcm9tLlxuICAgICAqIG5vIEAgYmVmb3JlIGRlcHJlY2F0ZWQgYXMgaXQgYnJlYWtzIGRvY3VtZW50YXRpb25qcyBvbiB2ZXJzaW9uIDE0LjAuMlxuICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kb2N1bWVudGF0aW9uanMvZG9jdW1lbnRhdGlvbi9pc3N1ZXMvMTU5NlxuICAgICAqL1xuICAgIHNldFNjcmFtYmxlS2V5KF9rZXkpIHsgfVxuICAgIC8qKlxuICAgICAqIENsb3NlIHRoZSBjb25uZWN0aW9uIHdpdGggdGhlIGRldmljZS5cbiAgICAgKlxuICAgICAqIE5vdGU6IGZvciBjZXJ0YWluIHRyYW5zcG9ydHMgKGh3LXRyYW5zcG9ydC1ub2RlLWhpZC1zaW5nbGV0b24gZm9yIGV4KSwgb25jZSB0aGUgcHJvbWlzZSByZXNvbHZlZCxcbiAgICAgKiB0aGUgdHJhbnNwb3J0IGluc3RhbmNlIGlzIGFjdHVhbGx5IHN0aWxsIGNhY2hlZCwgYW5kIHRoZSBkZXZpY2UgaXMgZGlzY29ubmVjdGVkIG9ubHkgYWZ0ZXIgYSBkZWZpbmVkIHRpbWVvdXQuXG4gICAgICogQnV0IGZvciB0aGUgY29uc3VtZXIgb2YgdGhlIFRyYW5zcG9ydCwgdGhpcyBkb2VzIG5vdCBtYXR0ZXIgYW5kIGl0IGNhbiBjb25zaWRlciB0aGUgdHJhbnNwb3J0IHRvIGJlIGNsb3NlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB0cmFuc3BvcnQgaXMgY2xvc2VkLlxuICAgICAqL1xuICAgIGNsb3NlKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpc3RlbiBmb3IgYW4gZXZlbnQgb24gdGhlIHRyYW5zcG9ydCBpbnN0YW5jZS5cbiAgICAgKiBUcmFuc3BvcnQgaW1wbGVtZW50YXRpb25zIG1heSBoYXZlIHNwZWNpZmljIGV2ZW50cy4gQ29tbW9uIGV2ZW50cyBpbmNsdWRlOlxuICAgICAqIFwiZGlzY29ubmVjdFwiIDogdHJpZ2dlcmVkIHdoZW4gdGhlIHRyYW5zcG9ydCBpcyBkaXNjb25uZWN0ZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBsaXN0ZW4gZm9yLlxuICAgICAqIEBwYXJhbSB7KC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IGFueX0gY2IgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgaW52b2tlZCB3aGVuIHRoZSBldmVudCBvY2N1cnMuXG4gICAgICovXG4gICAgb24oZXZlbnROYW1lLCBjYikge1xuICAgICAgICB0aGlzLl9ldmVudHMub24oZXZlbnROYW1lLCBjYik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0b3AgbGlzdGVuaW5nIHRvIGFuIGV2ZW50IG9uIGFuIGluc3RhbmNlIG9mIHRyYW5zcG9ydC5cbiAgICAgKi9cbiAgICBvZmYoZXZlbnROYW1lLCBjYikge1xuICAgICAgICB0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBjYik7XG4gICAgfVxuICAgIGVtaXQoZXZlbnQsIC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzLmVtaXQoZXZlbnQsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbmFibGUgb3Igbm90IGxvZ3Mgb2YgdGhlIGJpbmFyeSBleGNoYW5nZVxuICAgICAqL1xuICAgIHNldERlYnVnTW9kZSgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwic2V0RGVidWdNb2RlIGlzIGRlcHJlY2F0ZWQuIHVzZSBAbGVkZ2VyaHEvbG9ncyBpbnN0ZWFkLiBObyBsb2dzIGFyZSBlbWl0dGVkIGluIHRoaXMgYW55bW9yZS5cIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldCBhIHRpbWVvdXQgKGluIG1pbGxpc2Vjb25kcykgZm9yIHRoZSBleGNoYW5nZSBjYWxsLiBPbmx5IHNvbWUgdHJhbnNwb3J0IG1pZ2h0IGltcGxlbWVudCBpdC4gKGUuZy4gVTJGKVxuICAgICAqL1xuICAgIHNldEV4Y2hhbmdlVGltZW91dChleGNoYW5nZVRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy5leGNoYW5nZVRpbWVvdXQgPSBleGNoYW5nZVRpbWVvdXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlZmluZSB0aGUgZGVsYXkgYmVmb3JlIGVtaXR0aW5nIFwidW5yZXNwb25zaXZlXCIgb24gYW4gZXhjaGFuZ2UgdGhhdCBkb2VzIG5vdCByZXNwb25kXG4gICAgICovXG4gICAgc2V0RXhjaGFuZ2VVbnJlc3BvbnNpdmVUaW1lb3V0KHVucmVzcG9uc2l2ZVRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy51bnJlc3BvbnNpdmVUaW1lb3V0ID0gdW5yZXNwb25zaXZlVGltZW91dDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogY3JlYXRlKCkgYWxsb3dzIHRvIG9wZW4gdGhlIGZpcnN0IGRlc2NyaXB0b3IgYXZhaWxhYmxlIG9yXG4gICAgICogdGhyb3cgaWYgdGhlcmUgaXMgbm9uZSBvciBpZiB0aW1lb3V0IGlzIHJlYWNoZWQuXG4gICAgICogVGhpcyBpcyBhIGxpZ2h0IGhlbHBlciwgYWx0ZXJuYXRpdmUgdG8gdXNpbmcgbGlzdGVuKCkgYW5kIG9wZW4oKSAodGhhdCB5b3UgbWF5IG5lZWQgZm9yIGFueSBtb3JlIGFkdmFuY2VkIHVzZWNhc2UpXG4gICAgICogQGV4YW1wbGVcbiAgICBUcmFuc3BvcnRGb28uY3JlYXRlKCkudGhlbih0cmFuc3BvcnQgPT4gLi4uKVxuICAgICAqL1xuICAgIHN0YXRpYyBjcmVhdGUob3BlblRpbWVvdXQgPSAzMDAwLCBsaXN0ZW5UaW1lb3V0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IHN1YiA9IHRoaXMubGlzdGVuKHtcbiAgICAgICAgICAgICAgICBuZXh0OiBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3ViKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5UaW1lb3V0SWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobGlzdGVuVGltZW91dElkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuKGUuZGVzY3JpcHRvciwgb3BlblRpbWVvdXQpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yOiBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlblRpbWVvdXRJZClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChsaXN0ZW5UaW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuVGltZW91dElkKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxpc3RlblRpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgVHJhbnNwb3J0RXJyb3IodGhpcy5FcnJvck1lc3NhZ2VfTm9EZXZpY2VGb3VuZCwgXCJOb0RldmljZUZvdW5kXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlblRpbWVvdXRJZCA9IGxpc3RlblRpbWVvdXRcbiAgICAgICAgICAgICAgICA/IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBUcmFuc3BvcnRFcnJvcih0aGlzLkVycm9yTWVzc2FnZV9MaXN0ZW5UaW1lb3V0LCBcIkxpc3RlblRpbWVvdXRcIikpO1xuICAgICAgICAgICAgICAgIH0sIGxpc3RlblRpbWVvdXQpXG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JhcHBlciB0byBtYWtlIGFuIGV4Y2hhbmdlIFwiYXRvbWljXCIgKGJsb2NraW5nIGFueSBvdGhlciBleGNoYW5nZSlcbiAgICAgKlxuICAgICAqIEl0IGFsc28gaGFuZGxlcyBcInVucmVzcG9uc2l2ZW5lc3NcIiBieSBlbWl0dGluZyBcInVucmVzcG9uc2l2ZVwiIGFuZCBcInJlc3BvbnNpdmVcIiBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZiBUaGUgZXhjaGFuZ2Ugam9iLCB1c2luZyB0aGUgdHJhbnNwb3J0IHRvIHJ1blxuICAgICAqIEByZXR1cm5zIGEgUHJvbWlzZSByZXNvbHZpbmcgd2l0aCB0aGUgb3V0cHV0IG9mIHRoZSBnaXZlbiBqb2JcbiAgICAgKi9cbiAgICBleGNoYW5nZUF0b21pY0ltcGwoZikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgdHJhY2VyID0gdGhpcy50cmFjZXIud2l0aFVwZGF0ZWRDb250ZXh0KHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbjogXCJleGNoYW5nZUF0b21pY0ltcGxcIixcbiAgICAgICAgICAgICAgICB1bnJlc3BvbnNpdmVUaW1lb3V0OiB0aGlzLnVucmVzcG9uc2l2ZVRpbWVvdXQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh0aGlzLmV4Y2hhbmdlQnVzeVByb21pc2UpIHtcbiAgICAgICAgICAgICAgICB0cmFjZXIudHJhY2UoXCJBdG9taWMgZXhjaGFuZ2UgaXMgYWxyZWFkeSBidXN5XCIpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUcmFuc3BvcnRSYWNlQ29uZGl0aW9uKFwiQW4gYWN0aW9uIHdhcyBhbHJlYWR5IHBlbmRpbmcgb24gdGhlIExlZGdlciBkZXZpY2UuIFBsZWFzZSBkZW55IG9yIHJlY29ubmVjdC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTZXRzIHRoZSBhdG9taWMgZ3VhcmRcbiAgICAgICAgICAgIGxldCByZXNvbHZlQnVzeTtcbiAgICAgICAgICAgIGNvbnN0IGJ1c3lQcm9taXNlID0gbmV3IFByb21pc2UociA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZUJ1c3kgPSByO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmV4Y2hhbmdlQnVzeVByb21pc2UgPSBidXN5UHJvbWlzZTtcbiAgICAgICAgICAgIC8vIFRoZSBkZXZpY2UgdW5yZXNwb25zaXZlbmVzcyBoYW5kbGVyXG4gICAgICAgICAgICBsZXQgdW5yZXNwb25zaXZlUmVhY2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyYWNlci50cmFjZShgVGltZW91dCByZWFjaGVkLCBlbWl0dGluZyBUcmFuc3BvcnQgZXZlbnQgXCJ1bnJlc3BvbnNpdmVcImAsIHtcbiAgICAgICAgICAgICAgICAgICAgdW5yZXNwb25zaXZlVGltZW91dDogdGhpcy51bnJlc3BvbnNpdmVUaW1lb3V0LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHVucmVzcG9uc2l2ZVJlYWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcInVucmVzcG9uc2l2ZVwiKTtcbiAgICAgICAgICAgIH0sIHRoaXMudW5yZXNwb25zaXZlVGltZW91dCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHlpZWxkIGYoKTtcbiAgICAgICAgICAgICAgICBpZiAodW5yZXNwb25zaXZlUmVhY2hlZCkge1xuICAgICAgICAgICAgICAgICAgICB0cmFjZXIudHJhY2UoXCJEZXZpY2Ugd2FzIHVucmVzcG9uc2l2ZSwgZW1pdHRpbmcgcmVzcG9uc2l2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwicmVzcG9uc2l2ZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRyYWNlci50cmFjZShcIkZpbmFsaXplLCBjbGVhcmluZyBidXN5IGd1YXJkXCIpO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzb2x2ZUJ1c3kpXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVCdXN5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5leGNoYW5nZUJ1c3lQcm9taXNlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGRlY29yYXRlQXBwQVBJTWV0aG9kcyhzZWxmLCBtZXRob2RzLCBzY3JhbWJsZUtleSkge1xuICAgICAgICBmb3IgKGNvbnN0IG1ldGhvZE5hbWUgb2YgbWV0aG9kcykge1xuICAgICAgICAgICAgc2VsZlttZXRob2ROYW1lXSA9IHRoaXMuZGVjb3JhdGVBcHBBUElNZXRob2QobWV0aG9kTmFtZSwgc2VsZlttZXRob2ROYW1lXSwgc2VsZiwgc2NyYW1ibGVLZXkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRlY29yYXRlQXBwQVBJTWV0aG9kKG1ldGhvZE5hbWUsIGYsIGN0eCwgc2NyYW1ibGVLZXkpIHtcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCB7IF9hcHBBUElsb2NrIH0gPSB0aGlzO1xuICAgICAgICAgICAgaWYgKF9hcHBBUElsb2NrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUcmFuc3BvcnRFcnJvcihcIkxlZGdlciBEZXZpY2UgaXMgYnVzeSAobG9jayBcIiArIF9hcHBBUElsb2NrICsgXCIpXCIsIFwiVHJhbnNwb3J0TG9ja2VkXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwQVBJbG9jayA9IG1ldGhvZE5hbWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTY3JhbWJsZUtleShzY3JhbWJsZUtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHlpZWxkIGYuYXBwbHkoY3R4LCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FwcEFQSWxvY2sgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY29udGV4dCB1c2VkIGJ5IHRoZSBsb2dnaW5nL3RyYWNpbmcgbWVjaGFuaXNtXG4gICAgICpcbiAgICAgKiBVc2VmdWwgd2hlbiByZS11c2luZyAoY2FjaGVkKSB0aGUgc2FtZSBUcmFuc3BvcnQgaW5zdGFuY2UsXG4gICAgICogYnV0IHdpdGggYSBuZXcgdHJhY2luZyBjb250ZXh0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRleHQgQSBUcmFjZUNvbnRleHQsIHRoYXQgY2FuIHVuZGVmaW5lZCB0byByZXNldCB0aGUgY29udGV4dFxuICAgICAqL1xuICAgIHNldFRyYWNlQ29udGV4dChjb250ZXh0KSB7XG4gICAgICAgIHRoaXMudHJhY2VyID0gdGhpcy50cmFjZXIud2l0aENvbnRleHQoY29udGV4dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGNvbnRleHQgdXNlZCBieSB0aGUgbG9nZ2luZy90cmFjaW5nIG1lY2hhbmlzbVxuICAgICAqXG4gICAgICogVGhlIHVwZGF0ZSBvbmx5IG92ZXJyaWRlcyB0aGUga2V5LXZhbHVlIHRoYXQgYXJlIGFscmVhZHkgZGVmaW5lZCBpbiB0aGUgY3VycmVudCBjb250ZXh0LlxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbnRleHRUb0FkZCBBIFRyYWNlQ29udGV4dCB0aGF0IHdpbGwgYmUgYWRkZWQgdG8gdGhlIGN1cnJlbnQgY29udGV4dFxuICAgICAqL1xuICAgIHVwZGF0ZVRyYWNlQ29udGV4dChjb250ZXh0VG9BZGQpIHtcbiAgICAgICAgdGhpcy50cmFjZXIudXBkYXRlQ29udGV4dChjb250ZXh0VG9BZGQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB0cmFjaW5nIGNvbnRleHQgb2YgdGhlIHRyYW5zcG9ydCBpbnN0YW5jZVxuICAgICAqL1xuICAgIGdldFRyYWNlQ29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhY2VyLmdldENvbnRleHQoKTtcbiAgICB9XG59XG5UcmFuc3BvcnQuRXJyb3JNZXNzYWdlX0xpc3RlblRpbWVvdXQgPSBcIk5vIExlZGdlciBkZXZpY2UgZm91bmQgKHRpbWVvdXQpXCI7XG5UcmFuc3BvcnQuRXJyb3JNZXNzYWdlX05vRGV2aWNlRm91bmQgPSBcIk5vIExlZGdlciBkZXZpY2UgZm91bmRcIjtcbmV4cG9ydCBkZWZhdWx0IFRyYW5zcG9ydDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRyYW5zcG9ydC5qcy5tYXAiLCJsZXQgaWQgPSAwO1xuY29uc3Qgc3Vic2NyaWJlcnMgPSBbXTtcbi8qKlxuICogTG9ncyBzb21ldGhpbmdcbiAqXG4gKiBAcGFyYW0gdHlwZSBhIG5hbWVzcGFjZWQgaWRlbnRpZmllciBvZiB0aGUgbG9nIChpdCBpcyBub3QgYSBsZXZlbCBsaWtlIFwiZGVidWdcIiwgXCJlcnJvclwiIGJ1dCBtb3JlIGxpa2UgXCJhcGR1LWluXCIsIFwiYXBkdS1vdXRcIiwgZXRjLi4uKVxuICogQHBhcmFtIG1lc3NhZ2UgYSBjbGVhciBtZXNzYWdlIG9mIHRoZSBsb2cgYXNzb2NpYXRlZCB0byB0aGUgdHlwZVxuICovXG5leHBvcnQgY29uc3QgbG9nID0gKHR5cGUsIG1lc3NhZ2UsIGRhdGEpID0+IHtcbiAgICBjb25zdCBvYmogPSB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGlkOiBTdHJpbmcoKytpZCksXG4gICAgICAgIGRhdGU6IG5ldyBEYXRlKCksXG4gICAgfTtcbiAgICBpZiAobWVzc2FnZSlcbiAgICAgICAgb2JqLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGlmIChkYXRhKVxuICAgICAgICBvYmouZGF0YSA9IGRhdGE7XG4gICAgZGlzcGF0Y2gob2JqKTtcbn07XG4vKipcbiAqIEEgc2ltcGxlIHRyYWNlciBmdW5jdGlvbiwgb25seSBleHBhbmRpbmcgdGhlIGV4aXN0aW5nIGxvZyBmdW5jdGlvblxuICpcbiAqIEl0cyBnb2FsIGlzIHRvIGNhcHR1cmUgbW9yZSBjb250ZXh0IHRoYW4gYSBsb2cgZnVuY3Rpb24uXG4gKiBUaGlzIGlzIHNpbXBsZSBmb3Igbm93LCBidXQgY2FuIGJlIGltcHJvdmVkIGxhdGVyLlxuICpcbiAqIEBwYXJhbSBjb250ZXh0IEFueXRoaW5nIHJlcHJlc2VudGluZyB0aGUgY29udGV4dCB3aGVyZSB0aGUgbG9nIG9jY3VycmVkXG4gKi9cbmV4cG9ydCBjb25zdCB0cmFjZSA9ICh7IHR5cGUsIG1lc3NhZ2UsIGRhdGEsIGNvbnRleHQsIH0pID0+IHtcbiAgICBjb25zdCBvYmogPSB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIGlkOiBTdHJpbmcoKytpZCksXG4gICAgICAgIGRhdGU6IG5ldyBEYXRlKCksXG4gICAgfTtcbiAgICBpZiAobWVzc2FnZSlcbiAgICAgICAgb2JqLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGlmIChkYXRhKVxuICAgICAgICBvYmouZGF0YSA9IGRhdGE7XG4gICAgaWYgKGNvbnRleHQpXG4gICAgICAgIG9iai5jb250ZXh0ID0gY29udGV4dDtcbiAgICBkaXNwYXRjaChvYmopO1xufTtcbi8qKlxuICogQSBzaW1wbGUgdHJhY2VyIGNsYXNzLCB0aGF0IGNhbiBiZSB1c2VkIHRvIGF2b2lkIHJlcGV0aXRpb24gd2hlbiB1c2luZyB0aGUgYHRyYWNlYCBmdW5jdGlvblxuICpcbiAqIEl0cyBnb2FsIGlzIHRvIGNhcHR1cmUgbW9yZSBjb250ZXh0IHRoYW4gYSBsb2cgZnVuY3Rpb24uXG4gKiBUaGlzIGlzIHNpbXBsZSBmb3Igbm93LCBidXQgY2FuIGJlIGltcHJvdmVkIGxhdGVyLlxuICpcbiAqIEBwYXJhbSB0eXBlIEEgZ2l2ZW4gdHlwZSAobm90IGxldmVsKSBmb3IgdGhlIGN1cnJlbnQgbG9jYWwgdHJhY2VyIChcImh3XCIsIFwid2l0aERldmljZVwiLCBldGMuKVxuICogQHBhcmFtIGNvbnRleHQgQW55dGhpbmcgcmVwcmVzZW50aW5nIHRoZSBjb250ZXh0IHdoZXJlIHRoZSBsb2cgb2NjdXJyZWRcbiAqL1xuZXhwb3J0IGNsYXNzIExvY2FsVHJhY2VyIHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBjb250ZXh0KSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgfVxuICAgIHRyYWNlKG1lc3NhZ2UsIGRhdGEpIHtcbiAgICAgICAgdHJhY2Uoe1xuICAgICAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBjb250ZXh0OiB0aGlzLmNvbnRleHQsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRDb250ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0O1xuICAgIH1cbiAgICBzZXRDb250ZXh0KGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB9XG4gICAgdXBkYXRlQ29udGV4dChjb250ZXh0VG9BZGQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbnRleHQpLCBjb250ZXh0VG9BZGQpO1xuICAgIH1cbiAgICBnZXRUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgIH1cbiAgICBzZXRUeXBlKHR5cGUpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBMb2NhbFRyYWNlciB3aXRoIGFuIHVwZGF0ZWQgYHR5cGVgXG4gICAgICpcbiAgICAgKiBJdCBkb2VzIG5vdCBtdXRhdGUgdGhlIGNhbGxpbmcgaW5zdGFuY2UsIGJ1dCByZXR1cm5zIGEgbmV3IExvY2FsVHJhY2VyLFxuICAgICAqIGZvbGxvd2luZyBhIHNpbXBsZSBidWlsZGVyIHBhdHRlcm4uXG4gICAgICovXG4gICAgd2l0aFR5cGUodHlwZSkge1xuICAgICAgICByZXR1cm4gbmV3IExvY2FsVHJhY2VyKHR5cGUsIHRoaXMuY29udGV4dCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgTG9jYWxUcmFjZXIgd2l0aCBhIG5ldyBgY29udGV4dGBcbiAgICAgKlxuICAgICAqIEl0IGRvZXMgbm90IG11dGF0ZSB0aGUgY2FsbGluZyBpbnN0YW5jZSwgYnV0IHJldHVybnMgYSBuZXcgTG9jYWxUcmFjZXIsXG4gICAgICogZm9sbG93aW5nIGEgc2ltcGxlIGJ1aWxkZXIgcGF0dGVybi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb250ZXh0IEEgVHJhY2VDb250ZXh0LCB0aGF0IGNhbiB1bmRlZmluZWQgdG8gcmVzZXQgdGhlIGNvbnRleHRcbiAgICAgKi9cbiAgICB3aXRoQ29udGV4dChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBuZXcgTG9jYWxUcmFjZXIodGhpcy50eXBlLCBjb250ZXh0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBMb2NhbFRyYWNlciB3aXRoIGFuIHVwZGF0ZWQgYGNvbnRleHRgLFxuICAgICAqIG9uIHdoaWNoIGFuIGFkZGl0aW9uYWwgY29udGV4dCBpcyBtZXJnZWQgd2l0aCB0aGUgZXhpc3Rpbmcgb25lLlxuICAgICAqXG4gICAgICogSXQgZG9lcyBub3QgbXV0YXRlIHRoZSBjYWxsaW5nIGluc3RhbmNlLCBidXQgcmV0dXJucyBhIG5ldyBMb2NhbFRyYWNlcixcbiAgICAgKiBmb2xsb3dpbmcgYSBzaW1wbGUgYnVpbGRlciBwYXR0ZXJuLlxuICAgICAqL1xuICAgIHdpdGhVcGRhdGVkQ29udGV4dChjb250ZXh0VG9BZGQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMb2NhbFRyYWNlcih0aGlzLnR5cGUsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb250ZXh0KSwgY29udGV4dFRvQWRkKSk7XG4gICAgfVxufVxuLyoqXG4gKiBBZGRzIGEgc3Vic2NyaWJlcnMgdG8gdGhlIGVtaXR0ZWQgbG9ncy5cbiAqXG4gKiBAcGFyYW0gY2IgdGhhdCBpcyBjYWxsZWQgZm9yIGVhY2ggZnV0dXJlIGxvZygpIHdpdGggdGhlIExvZyBvYmplY3RcbiAqIEByZXR1cm4gYSBmdW5jdGlvbiB0aGF0IGNhbiBiZSBjYWxsZWQgdG8gdW5zdWJzY3JpYmUgdGhlIGxpc3RlbmVyXG4gKi9cbmV4cG9ydCBjb25zdCBsaXN0ZW4gPSAoY2IpID0+IHtcbiAgICBzdWJzY3JpYmVycy5wdXNoKGNiKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjb25zdCBpID0gc3Vic2NyaWJlcnMuaW5kZXhPZihjYik7XG4gICAgICAgIGlmIChpICE9PSAtMSkge1xuICAgICAgICAgICAgLy8gZXF1aXZhbGVudCBvZiBzdWJzY3JpYmVycy5zcGxpY2UoaSwgMSkgLy8gaHR0cHM6Ly90d2l0dGVyLmNvbS9SaWNoX0hhcnJpcy9zdGF0dXMvMTEyNTg1MDM5MTE1NTk2NTk1MlxuICAgICAgICAgICAgc3Vic2NyaWJlcnNbaV0gPSBzdWJzY3JpYmVyc1tzdWJzY3JpYmVycy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIHN1YnNjcmliZXJzLnBvcCgpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5mdW5jdGlvbiBkaXNwYXRjaChsb2cpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyc1tpXShsb2cpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB3aW5kb3cuX19sZWRnZXJMb2dzTGlzdGVuID0gbGlzdGVuO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX2E7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnNlcmlhbGl6ZVBhdGggPSBleHBvcnRzLmdldFZlcnNpb24gPSBleHBvcnRzLnByb2Nlc3NFcnJvclJlc3BvbnNlID0gZXhwb3J0cy5lcnJvckNvZGVUb1N0cmluZyA9IGV4cG9ydHMuRVJST1JfREVTQ1JJUFRJT04gPSBleHBvcnRzLkxlZGdlckVycm9yID0gZXhwb3J0cy5TSUdMRU5fUlMgPSBleHBvcnRzLlNJR0xFTl9SU1YgPSBleHBvcnRzLlBLTEVOID0gZXhwb3J0cy5QMV9WQUxVRVMgPSBleHBvcnRzLlBBWUxPQURfVFlQRSA9IGV4cG9ydHMuSU5TID0gZXhwb3J0cy5BRERSRVNTX0xFTiA9IGV4cG9ydHMuQVBQX0tFWSA9IGV4cG9ydHMuQ0hVTktfU0laRSA9IGV4cG9ydHMuQ0xBID0gdm9pZCAwO1xuZXhwb3J0cy5DTEEgPSAweDExO1xuZXhwb3J0cy5DSFVOS19TSVpFID0gMjUwO1xuZXhwb3J0cy5BUFBfS0VZID0gJ0RGTic7XG5leHBvcnRzLkFERFJFU1NfTEVOID0gNjg7XG5leHBvcnRzLklOUyA9IHtcbiAgICBHRVRfVkVSU0lPTjogMHgwMCxcbiAgICBHRVRfQUREUl9TRUNQMjU2SzE6IDB4MDEsXG4gICAgU0lHTl9TRUNQMjU2SzE6IDB4MDIsXG4gICAgU0lHTl9NRVNTQUdFOiAweDAzLFxuICAgIFNJR05fV0FTTV9ERVBMT1k6IDB4MDQsXG59O1xuZXhwb3J0cy5QQVlMT0FEX1RZUEUgPSB7XG4gICAgSU5JVDogMHgwMCxcbiAgICBBREQ6IDB4MDEsXG4gICAgTEFTVDogMHgwMixcbn07XG5leHBvcnRzLlAxX1ZBTFVFUyA9IHtcbiAgICBPTkxZX1JFVFJJRVZFOiAweDAwLFxuICAgIFNIT1dfQUREUkVTU19JTl9ERVZJQ0U6IDB4MDEsXG59O1xuZXhwb3J0cy5QS0xFTiA9IDMzO1xuZXhwb3J0cy5TSUdMRU5fUlNWID0gNjU7XG5leHBvcnRzLlNJR0xFTl9SUyA9IDY0O1xudmFyIExlZGdlckVycm9yO1xuKGZ1bmN0aW9uIChMZWRnZXJFcnJvcikge1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiVTJGVW5rbm93blwiXSA9IDFdID0gXCJVMkZVbmtub3duXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJVMkZCYWRSZXF1ZXN0XCJdID0gMl0gPSBcIlUyRkJhZFJlcXVlc3RcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIlUyRkNvbmZpZ3VyYXRpb25VbnN1cHBvcnRlZFwiXSA9IDNdID0gXCJVMkZDb25maWd1cmF0aW9uVW5zdXBwb3J0ZWRcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIlUyRkRldmljZUluZWxpZ2libGVcIl0gPSA0XSA9IFwiVTJGRGV2aWNlSW5lbGlnaWJsZVwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiVTJGVGltZW91dFwiXSA9IDVdID0gXCJVMkZUaW1lb3V0XCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJUaW1lb3V0XCJdID0gMTRdID0gXCJUaW1lb3V0XCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJOb0Vycm9yc1wiXSA9IDM2ODY0XSA9IFwiTm9FcnJvcnNcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIkRldmljZUlzQnVzeVwiXSA9IDM2ODY1XSA9IFwiRGV2aWNlSXNCdXN5XCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJFcnJvckRlcml2aW5nS2V5c1wiXSA9IDI2NjI2XSA9IFwiRXJyb3JEZXJpdmluZ0tleXNcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIkV4ZWN1dGlvbkVycm9yXCJdID0gMjU2MDBdID0gXCJFeGVjdXRpb25FcnJvclwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiV3JvbmdMZW5ndGhcIl0gPSAyNjM2OF0gPSBcIldyb25nTGVuZ3RoXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJFbXB0eUJ1ZmZlclwiXSA9IDI3MDEwXSA9IFwiRW1wdHlCdWZmZXJcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIk91dHB1dEJ1ZmZlclRvb1NtYWxsXCJdID0gMjcwMTFdID0gXCJPdXRwdXRCdWZmZXJUb29TbWFsbFwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiRGF0YUlzSW52YWxpZFwiXSA9IDI3MDEyXSA9IFwiRGF0YUlzSW52YWxpZFwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiQ29uZGl0aW9uc05vdFNhdGlzZmllZFwiXSA9IDI3MDEzXSA9IFwiQ29uZGl0aW9uc05vdFNhdGlzZmllZFwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiVHJhbnNhY3Rpb25SZWplY3RlZFwiXSA9IDI3MDE0XSA9IFwiVHJhbnNhY3Rpb25SZWplY3RlZFwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiQmFkS2V5SGFuZGxlXCJdID0gMjcyNjRdID0gXCJCYWRLZXlIYW5kbGVcIjtcbiAgICBMZWRnZXJFcnJvcltMZWRnZXJFcnJvcltcIkludmFsaWRQMVAyXCJdID0gMjczOTJdID0gXCJJbnZhbGlkUDFQMlwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiSW5zdHJ1Y3Rpb25Ob3RTdXBwb3J0ZWRcIl0gPSAyNzkwNF0gPSBcIkluc3RydWN0aW9uTm90U3VwcG9ydGVkXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJBcHBEb2VzTm90U2VlbVRvQmVPcGVuXCJdID0gMjgxNjBdID0gXCJBcHBEb2VzTm90U2VlbVRvQmVPcGVuXCI7XG4gICAgTGVkZ2VyRXJyb3JbTGVkZ2VyRXJyb3JbXCJVbmtub3duRXJyb3JcIl0gPSAyODQxNl0gPSBcIlVua25vd25FcnJvclwiO1xuICAgIExlZGdlckVycm9yW0xlZGdlckVycm9yW1wiU2lnblZlcmlmeUVycm9yXCJdID0gMjg0MTddID0gXCJTaWduVmVyaWZ5RXJyb3JcIjtcbn0pKExlZGdlckVycm9yID0gZXhwb3J0cy5MZWRnZXJFcnJvciB8fCAoZXhwb3J0cy5MZWRnZXJFcnJvciA9IHt9KSk7XG5leHBvcnRzLkVSUk9SX0RFU0NSSVBUSU9OID0gKF9hID0ge30sXG4gICAgX2FbTGVkZ2VyRXJyb3IuVTJGVW5rbm93bl0gPSAnVTJGOiBVbmtub3duJyxcbiAgICBfYVtMZWRnZXJFcnJvci5VMkZCYWRSZXF1ZXN0XSA9ICdVMkY6IEJhZCByZXF1ZXN0JyxcbiAgICBfYVtMZWRnZXJFcnJvci5VMkZDb25maWd1cmF0aW9uVW5zdXBwb3J0ZWRdID0gJ1UyRjogQ29uZmlndXJhdGlvbiB1bnN1cHBvcnRlZCcsXG4gICAgX2FbTGVkZ2VyRXJyb3IuVTJGRGV2aWNlSW5lbGlnaWJsZV0gPSAnVTJGOiBEZXZpY2UgSW5lbGlnaWJsZScsXG4gICAgX2FbTGVkZ2VyRXJyb3IuVTJGVGltZW91dF0gPSAnVTJGOiBUaW1lb3V0JyxcbiAgICBfYVtMZWRnZXJFcnJvci5UaW1lb3V0XSA9ICdUaW1lb3V0JyxcbiAgICBfYVtMZWRnZXJFcnJvci5Ob0Vycm9yc10gPSAnTm8gZXJyb3JzJyxcbiAgICBfYVtMZWRnZXJFcnJvci5EZXZpY2VJc0J1c3ldID0gJ0RldmljZSBpcyBidXN5JyxcbiAgICBfYVtMZWRnZXJFcnJvci5FcnJvckRlcml2aW5nS2V5c10gPSAnRXJyb3IgZGVyaXZpbmcga2V5cycsXG4gICAgX2FbTGVkZ2VyRXJyb3IuRXhlY3V0aW9uRXJyb3JdID0gJ0V4ZWN1dGlvbiBFcnJvcicsXG4gICAgX2FbTGVkZ2VyRXJyb3IuV3JvbmdMZW5ndGhdID0gJ1dyb25nIExlbmd0aCcsXG4gICAgX2FbTGVkZ2VyRXJyb3IuRW1wdHlCdWZmZXJdID0gJ0VtcHR5IEJ1ZmZlcicsXG4gICAgX2FbTGVkZ2VyRXJyb3IuT3V0cHV0QnVmZmVyVG9vU21hbGxdID0gJ091dHB1dCBidWZmZXIgdG9vIHNtYWxsJyxcbiAgICBfYVtMZWRnZXJFcnJvci5EYXRhSXNJbnZhbGlkXSA9ICdEYXRhIGlzIGludmFsaWQnLFxuICAgIF9hW0xlZGdlckVycm9yLkNvbmRpdGlvbnNOb3RTYXRpc2ZpZWRdID0gJ0NvbmRpdGlvbnMgbm90IHNhdGlzZmllZCcsXG4gICAgX2FbTGVkZ2VyRXJyb3IuVHJhbnNhY3Rpb25SZWplY3RlZF0gPSAnVHJhbnNhY3Rpb24gcmVqZWN0ZWQnLFxuICAgIF9hW0xlZGdlckVycm9yLkJhZEtleUhhbmRsZV0gPSAnQmFkIGtleSBoYW5kbGUnLFxuICAgIF9hW0xlZGdlckVycm9yLkludmFsaWRQMVAyXSA9ICdJbnZhbGlkIFAxL1AyJyxcbiAgICBfYVtMZWRnZXJFcnJvci5JbnN0cnVjdGlvbk5vdFN1cHBvcnRlZF0gPSAnSW5zdHJ1Y3Rpb24gbm90IHN1cHBvcnRlZCcsXG4gICAgX2FbTGVkZ2VyRXJyb3IuQXBwRG9lc05vdFNlZW1Ub0JlT3Blbl0gPSAnQXBwIGRvZXMgbm90IHNlZW0gdG8gYmUgb3BlbicsXG4gICAgX2FbTGVkZ2VyRXJyb3IuVW5rbm93bkVycm9yXSA9ICdVbmtub3duIGVycm9yJyxcbiAgICBfYVtMZWRnZXJFcnJvci5TaWduVmVyaWZ5RXJyb3JdID0gJ1NpZ24vdmVyaWZ5IGVycm9yJyxcbiAgICBfYSk7XG5mdW5jdGlvbiBlcnJvckNvZGVUb1N0cmluZyhzdGF0dXNDb2RlKSB7XG4gICAgaWYgKHN0YXR1c0NvZGUgaW4gZXhwb3J0cy5FUlJPUl9ERVNDUklQVElPTilcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuRVJST1JfREVTQ1JJUFRJT05bc3RhdHVzQ29kZV07XG4gICAgcmV0dXJuIFwiVW5rbm93biBTdGF0dXMgQ29kZTogXCIuY29uY2F0KHN0YXR1c0NvZGUpO1xufVxuZXhwb3J0cy5lcnJvckNvZGVUb1N0cmluZyA9IGVycm9yQ29kZVRvU3RyaW5nO1xuZnVuY3Rpb24gaXNEaWN0KHYpIHtcbiAgICByZXR1cm4gdHlwZW9mIHYgPT09ICdvYmplY3QnICYmIHYgIT09IG51bGwgJiYgISh2IGluc3RhbmNlb2YgQXJyYXkpICYmICEodiBpbnN0YW5jZW9mIERhdGUpO1xufVxuZnVuY3Rpb24gcHJvY2Vzc0Vycm9yUmVzcG9uc2UocmVzcG9uc2UpIHtcbiAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKGlzRGljdChyZXNwb25zZSkpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocmVzcG9uc2UsICdzdGF0dXNDb2RlJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5Db2RlOiByZXNwb25zZS5zdGF0dXNDb2RlLFxuICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGVycm9yQ29kZVRvU3RyaW5nKHJlc3BvbnNlLnN0YXR1c0NvZGUpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3BvbnNlLCAncmV0dXJuQ29kZScpICYmXG4gICAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3BvbnNlLCAnZXJyb3JNZXNzYWdlJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJldHVybkNvZGU6IDB4ZmZmZixcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogcmVzcG9uc2UudG9TdHJpbmcoKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmV0dXJuQ29kZTogMHhmZmZmLFxuICAgICAgICBlcnJvck1lc3NhZ2U6IHJlc3BvbnNlLnRvU3RyaW5nKCksXG4gICAgfTtcbn1cbmV4cG9ydHMucHJvY2Vzc0Vycm9yUmVzcG9uc2UgPSBwcm9jZXNzRXJyb3JSZXNwb25zZTtcbmZ1bmN0aW9uIGdldFZlcnNpb24odHJhbnNwb3J0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdHJhbnNwb3J0LnNlbmQoZXhwb3J0cy5DTEEsIGV4cG9ydHMuSU5TLkdFVF9WRVJTSU9OLCAwLCAwKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyb3JDb2RlRGF0YSA9IHJlc3BvbnNlLnNsaWNlKC0yKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybkNvZGUgPSAoZXJyb3JDb2RlRGF0YVswXSAqIDI1NiArIGVycm9yQ29kZURhdGFbMV0pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0SWQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UubGVuZ3RoID49IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldElkID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocmVzcG9uc2VbNV0gPDwgMjQpICsgKHJlc3BvbnNlWzZdIDw8IDE2KSArIChyZXNwb25zZVs3XSA8PCA4KSArIChyZXNwb25zZVs4XSA8PCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tYml0d2lzZSAqL1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5Db2RlOiByZXR1cm5Db2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvckNvZGVUb1N0cmluZyhyZXR1cm5Db2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlc3RNb2RlOiByZXNwb25zZVswXSAhPT0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ham9yOiByZXNwb25zZVsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbm9yOiByZXNwb25zZVsyXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoOiByZXNwb25zZVszXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldmljZUxvY2tlZDogcmVzcG9uc2VbNF0gPT09IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRJZDogdGFyZ2V0SWQudG9TdHJpbmcoMTYpLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0sIHByb2Nlc3NFcnJvclJlc3BvbnNlKV07XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5nZXRWZXJzaW9uID0gZ2V0VmVyc2lvbjtcbnZhciBIQVJERU5FRCA9IDB4ODAwMDAwMDA7XG5mdW5jdGlvbiBzZXJpYWxpemVQYXRoKHBhdGgpIHtcbiAgICBpZiAoIXBhdGguc3RhcnRzV2l0aCgnbScpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUGF0aCBzaG91bGQgc3RhcnQgd2l0aCBcIm1cIiAoZS5nIFwibS80NFxcJy81NzU3XFwnLzVcXCcvMC8zXCIpJyk7XG4gICAgfVxuICAgIHZhciBwYXRoQXJyYXkgPSBwYXRoLnNwbGl0KCcvJyk7XG4gICAgaWYgKHBhdGhBcnJheS5sZW5ndGggIT09IDYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBwYXRoLiAoZS5nIFxcXCJtLzQ0Jy81NzU3Jy81Jy8wLzNcXFwiKVwiKTtcbiAgICB9XG4gICAgdmFyIGJ1ZiA9IEJ1ZmZlci5hbGxvYygyMCk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBwYXRoQXJyYXkubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gMDtcbiAgICAgICAgdmFyIGNoaWxkID0gcGF0aEFycmF5W2ldO1xuICAgICAgICBpZiAoY2hpbGQuZW5kc1dpdGgoXCInXCIpKSB7XG4gICAgICAgICAgICB2YWx1ZSArPSBIQVJERU5FRDtcbiAgICAgICAgICAgIGNoaWxkID0gY2hpbGQuc2xpY2UoMCwgLTEpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjaGlsZE51bWJlciA9IE51bWJlcihjaGlsZCk7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4oY2hpbGROdW1iZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHBhdGggOiBcIi5jb25jYXQoY2hpbGQsIFwiIGlzIG5vdCBhIG51bWJlci4gKGUuZyBcXFwibS80NCcvNDYxJy81Jy8wLzNcXFwiKVwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoaWxkTnVtYmVyID49IEhBUkRFTkVEKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0luY29ycmVjdCBjaGlsZCB2YWx1ZSAoYmlnZ2VyIG9yIGVxdWFsIHRvIDB4ODAwMDAwMDApJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgKz0gY2hpbGROdW1iZXI7XG4gICAgICAgIGJ1Zi53cml0ZVVJbnQzMkxFKHZhbHVlLCA0ICogKGkgLSAxKSk7XG4gICAgfVxuICAgIHJldHVybiBidWY7XG59XG5leHBvcnRzLnNlcmlhbGl6ZVBhdGggPSBzZXJpYWxpemVQYXRoO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoZyAmJiAoZyA9IDAsIG9wWzBdICYmIChfID0gMCkpLCBfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuTGVkZ2VyRXJyb3IgPSB2b2lkIDA7XG52YXIgY29tbW9uXzEgPSByZXF1aXJlKFwiLi9jb21tb25cIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJMZWRnZXJFcnJvclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29tbW9uXzEuTGVkZ2VyRXJyb3I7IH0gfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdHlwZXNcIiksIGV4cG9ydHMpO1xuZnVuY3Rpb24gcHJvY2Vzc0dldEFkZHJSZXNwb25zZShyZXNwb25zZSkge1xuICAgIHZhciBwYXJ0aWFsUmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICB2YXIgZXJyb3JDb2RlRGF0YSA9IHBhcnRpYWxSZXNwb25zZS5zbGljZSgtMik7XG4gICAgdmFyIHJldHVybkNvZGUgPSAoZXJyb3JDb2RlRGF0YVswXSAqIDI1NiArIGVycm9yQ29kZURhdGFbMV0pO1xuICAgIHZhciBwdWJsaWNLZXkgPSBCdWZmZXIuZnJvbShwYXJ0aWFsUmVzcG9uc2Uuc2xpY2UoMCwgY29tbW9uXzEuUEtMRU4pKTtcbiAgICBwYXJ0aWFsUmVzcG9uc2UgPSBwYXJ0aWFsUmVzcG9uc2Uuc2xpY2UoY29tbW9uXzEuUEtMRU4pO1xuICAgIHZhciBBZGRyZXNzID0gQnVmZmVyLmZyb20ocGFydGlhbFJlc3BvbnNlLnNsaWNlKDAsIC0yKSkudG9TdHJpbmcoKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwdWJsaWNLZXk6IHB1YmxpY0tleSxcbiAgICAgICAgQWRkcmVzczogQWRkcmVzcyxcbiAgICAgICAgcmV0dXJuQ29kZTogcmV0dXJuQ29kZSxcbiAgICAgICAgZXJyb3JNZXNzYWdlOiAoMCwgY29tbW9uXzEuZXJyb3JDb2RlVG9TdHJpbmcpKHJldHVybkNvZGUpLFxuICAgIH07XG59XG52YXIgQ2FzcGVyQXBwID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhc3BlckFwcCh0cmFuc3BvcnQpIHtcbiAgICAgICAgaWYgKCF0cmFuc3BvcnQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVHJhbnNwb3J0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XG4gICAgfVxuICAgIENhc3BlckFwcC5wcmVwYXJlQ2h1bmtzID0gZnVuY3Rpb24gKHNlcmlhbGl6ZWRQYXRoQnVmZmVyLCBtZXNzYWdlKSB7XG4gICAgICAgIHZhciBjaHVua3MgPSBbXTtcbiAgICAgICAgLy8gRmlyc3QgY2h1bmsgKG9ubHkgcGF0aClcbiAgICAgICAgY2h1bmtzLnB1c2goc2VyaWFsaXplZFBhdGhCdWZmZXIpO1xuICAgICAgICB2YXIgbWVzc2FnZUJ1ZmZlciA9IEJ1ZmZlci5mcm9tKG1lc3NhZ2UpO1xuICAgICAgICB2YXIgYnVmZmVyID0gQnVmZmVyLmNvbmNhdChbbWVzc2FnZUJ1ZmZlcl0pO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1ZmZlci5sZW5ndGg7IGkgKz0gY29tbW9uXzEuQ0hVTktfU0laRSkge1xuICAgICAgICAgICAgdmFyIGVuZCA9IGkgKyBjb21tb25fMS5DSFVOS19TSVpFO1xuICAgICAgICAgICAgaWYgKGkgPiBidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZW5kID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNodW5rcy5wdXNoKGJ1ZmZlci5zbGljZShpLCBlbmQpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2h1bmtzO1xuICAgIH07XG4gICAgQ2FzcGVyQXBwLnByb3RvdHlwZS5zaWduR2V0Q2h1bmtzID0gZnVuY3Rpb24gKHBhdGgsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBDYXNwZXJBcHAucHJlcGFyZUNodW5rcygoMCwgY29tbW9uXzEuc2VyaWFsaXplUGF0aCkocGF0aCksIG1lc3NhZ2UpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENhc3BlckFwcC5wcm90b3R5cGUuZ2V0VmVyc2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCAoMCwgY29tbW9uXzEuZ2V0VmVyc2lvbikodGhpcy50cmFuc3BvcnQpLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuICgwLCBjb21tb25fMS5wcm9jZXNzRXJyb3JSZXNwb25zZSkoZXJyKTsgfSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2FzcGVyQXBwLnByb3RvdHlwZS5nZXRBcHBJbmZvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMudHJhbnNwb3J0LnNlbmQoMHhiMCwgMHgwMSwgMCwgMCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlcnJvckNvZGVEYXRhID0gcmVzcG9uc2Uuc2xpY2UoLTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybkNvZGUgPSBlcnJvckNvZGVEYXRhWzBdICogMjU2ICsgZXJyb3JDb2RlRGF0YVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcHBOYW1lID0gJ2Vycic7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXBwVmVyc2lvbiA9ICdlcnInO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZsYWdMZW4gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZsYWdzVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlWzBdICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGVkZ2VyIHJlc3BvbmRzIHdpdGggZm9ybWF0IElEIDEuIFRoZXJlIGlzIG5vIHNwZWMgZm9yIGFueSBmb3JtYXQgIT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5lcnJvck1lc3NhZ2UgPSAncmVzcG9uc2UgZm9ybWF0IElEIG5vdCByZWNvZ25pemVkJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucmV0dXJuQ29kZSA9IGNvbW1vbl8xLkxlZGdlckVycm9yLkRldmljZUlzQnVzeTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcHBOYW1lTGVuID0gcmVzcG9uc2VbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwTmFtZSA9IHJlc3BvbnNlLnNsaWNlKDIsIDIgKyBhcHBOYW1lTGVuKS50b1N0cmluZygnYXNjaWknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWR4ID0gMiArIGFwcE5hbWVMZW47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFwcFZlcnNpb25MZW4gPSByZXNwb25zZVtpZHhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcFZlcnNpb24gPSByZXNwb25zZS5zbGljZShpZHgsIGlkeCArIGFwcFZlcnNpb25MZW4pLnRvU3RyaW5nKCdhc2NpaScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkeCArPSBhcHBWZXJzaW9uTGVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhcHBGbGFnc0xlbiA9IHJlc3BvbnNlW2lkeF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ0xlbiA9IGFwcEZsYWdzTGVuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWdzVmFsdWUgPSByZXNwb25zZVtpZHhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5Db2RlOiByZXR1cm5Db2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogKDAsIGNvbW1vbl8xLmVycm9yQ29kZVRvU3RyaW5nKShyZXR1cm5Db2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcE5hbWU6IGFwcE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwVmVyc2lvbjogYXBwVmVyc2lvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnTGVuOiBmbGFnTGVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWdzVmFsdWU6IGZsYWdzVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ1JlY292ZXJ5OiAoZmxhZ3NWYWx1ZSAmIDEpICE9PSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ1NpZ25lZE1jdUNvZGU6IChmbGFnc1ZhbHVlICYgMikgIT09IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnT25ib2FyZGVkOiAoZmxhZ3NWYWx1ZSAmIDQpICE9PSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZ1BJTlZhbGlkYXRlZDogKGZsYWdzVmFsdWUgJiAxMjgpICE9PSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSwgY29tbW9uXzEucHJvY2Vzc0Vycm9yUmVzcG9uc2UpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENhc3BlckFwcC5wcm90b3R5cGUuZ2V0QWRkcmVzc0FuZFB1YktleSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZXJpYWxpemVkUGF0aDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVkUGF0aCA9ICgwLCBjb21tb25fMS5zZXJpYWxpemVQYXRoKShwYXRoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy50cmFuc3BvcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZW5kKGNvbW1vbl8xLkNMQSwgY29tbW9uXzEuSU5TLkdFVF9BRERSX1NFQ1AyNTZLMSwgY29tbW9uXzEuUDFfVkFMVUVTLk9OTFlfUkVUUklFVkUsIDAsIHNlcmlhbGl6ZWRQYXRoLCBbMHg5MDAwXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHByb2Nlc3NHZXRBZGRyUmVzcG9uc2UsIGNvbW1vbl8xLnByb2Nlc3NFcnJvclJlc3BvbnNlKV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDYXNwZXJBcHAucHJvdG90eXBlLnNob3dBZGRyZXNzQW5kUHViS2V5ID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNlcmlhbGl6ZWRQYXRoO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZWRQYXRoID0gKDAsIGNvbW1vbl8xLnNlcmlhbGl6ZVBhdGgpKHBhdGgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnRyYW5zcG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQoY29tbW9uXzEuQ0xBLCBjb21tb25fMS5JTlMuR0VUX0FERFJfU0VDUDI1NksxLCBjb21tb25fMS5QMV9WQUxVRVMuU0hPV19BRERSRVNTX0lOX0RFVklDRSwgMCwgc2VyaWFsaXplZFBhdGgsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1vbl8xLkxlZGdlckVycm9yLk5vRXJyb3JzLFxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocHJvY2Vzc0dldEFkZHJSZXNwb25zZSwgY29tbW9uXzEucHJvY2Vzc0Vycm9yUmVzcG9uc2UpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENhc3BlckFwcC5wcm90b3R5cGUuc2lnblNlbmRDaHVuayA9IGZ1bmN0aW9uIChjaHVua0lkeCwgY2h1bmtOdW0sIGNodW5rLCBpbnN0cnVjdGlvbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcGF5bG9hZFR5cGU7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZFR5cGUgPSBjb21tb25fMS5QQVlMT0FEX1RZUEUuQUREO1xuICAgICAgICAgICAgICAgIGlmIChjaHVua0lkeCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkVHlwZSA9IGNvbW1vbl8xLlBBWUxPQURfVFlQRS5JTklUO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2h1bmtJZHggPT09IGNodW5rTnVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHBheWxvYWRUeXBlID0gY29tbW9uXzEuUEFZTE9BRF9UWVBFLkxBU1Q7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCB0aGlzLnRyYW5zcG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgLnNlbmQoY29tbW9uXzEuQ0xBLCBpbnN0cnVjdGlvbiwgcGF5bG9hZFR5cGUsIDAsIGNodW5rLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tb25fMS5MZWRnZXJFcnJvci5Ob0Vycm9ycyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1vbl8xLkxlZGdlckVycm9yLkRhdGFJc0ludmFsaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tb25fMS5MZWRnZXJFcnJvci5CYWRLZXlIYW5kbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tb25fMS5MZWRnZXJFcnJvci5TaWduVmVyaWZ5RXJyb3JcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yQ29kZURhdGEgPSByZXNwb25zZS5zbGljZSgtMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuQ29kZSA9IGVycm9yQ29kZURhdGFbMF0gKiAyNTYgKyBlcnJvckNvZGVEYXRhWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9yTWVzc2FnZSA9ICgwLCBjb21tb25fMS5lcnJvckNvZGVUb1N0cmluZykocmV0dXJuQ29kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2lnbmF0dXJlUlNWID0gQnVmZmVyLmFsbG9jKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNpZ25hdHVyZVJTID0gQnVmZmVyLmFsbG9jKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVybkNvZGUgPT09IGNvbW1vbl8xLkxlZGdlckVycm9yLkJhZEtleUhhbmRsZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybkNvZGUgPT09IGNvbW1vbl8xLkxlZGdlckVycm9yLkRhdGFJc0ludmFsaWQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5Db2RlID09PSBjb21tb25fMS5MZWRnZXJFcnJvci5TaWduVmVyaWZ5RXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIlwiLmNvbmNhdChlcnJvck1lc3NhZ2UsIFwiIDogXCIpLmNvbmNhdChyZXNwb25zZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMCwgcmVzcG9uc2UubGVuZ3RoIC0gMilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKCdhc2NpaScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5Db2RlID09PSBjb21tb25fMS5MZWRnZXJFcnJvci5Ob0Vycm9ycyAmJiByZXNwb25zZS5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlUlNWID0gcmVzcG9uc2Uuc2xpY2UoMCwgY29tbW9uXzEuU0lHTEVOX1JTVik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlUlMgPSByZXNwb25zZS5zbGljZSgwLCBjb21tb25fMS5TSUdMRU5fUlMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZVJTOiBzaWduYXR1cmVSUyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlUlNWOiBzaWduYXR1cmVSU1YsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybkNvZGU6IHJldHVybkNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybkNvZGU6IHJldHVybkNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9LCBjb21tb25fMS5wcm9jZXNzRXJyb3JSZXNwb25zZSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2FzcGVyQXBwLnByb3RvdHlwZS5zaWduID0gZnVuY3Rpb24gKHBhdGgsIG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgdGhpcy5zaWduR2V0Q2h1bmtzKHBhdGgsIG1lc3NhZ2UpLnRoZW4oZnVuY3Rpb24gKGNodW5rcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnNpZ25TZW5kQ2h1bmsoMSwgY2h1bmtzLmxlbmd0aCwgY2h1bmtzWzBdLCBjb21tb25fMS5JTlMuU0lHTl9TRUNQMjU2SzEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCwgaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybkNvZGU6IHJlc3BvbnNlLnJldHVybkNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogcmVzcG9uc2UuZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVSUzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlUlNWOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGkgPCBjaHVua3MubGVuZ3RoKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zaWduU2VuZENodW5rKDEgKyBpLCBjaHVua3MubGVuZ3RoLCBjaHVua3NbaV0sIGNvbW1vbl8xLklOUy5TSUdOX1NFQ1AyNTZLMSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmV0dXJuQ29kZSAhPT0gY29tbW9uXzEuTGVkZ2VyRXJyb3IuTm9FcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovLCByZXN1bHRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSwgY29tbW9uXzEucHJvY2Vzc0Vycm9yUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9LCBjb21tb25fMS5wcm9jZXNzRXJyb3JSZXNwb25zZSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2FzcGVyQXBwLnByb3RvdHlwZS5zaWduTWVzc2FnZSA9IGZ1bmN0aW9uIChwYXRoLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuc2lnbkdldENodW5rcyhwYXRoLCBtZXNzYWdlKS50aGVuKGZ1bmN0aW9uIChjaHVua3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5zaWduU2VuZENodW5rKDEsIGNodW5rcy5sZW5ndGgsIGNodW5rc1swXSwgY29tbW9uXzEuSU5TLlNJR05fTUVTU0FHRSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0LCBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuQ29kZTogcmVzcG9uc2UucmV0dXJuQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiByZXNwb25zZS5lcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZVJTOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVSU1Y6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoaSA8IGNodW5rcy5sZW5ndGgpKSByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnNpZ25TZW5kQ2h1bmsoMSArIGksIGNodW5rcy5sZW5ndGgsIGNodW5rc1tpXSwgY29tbW9uXzEuSU5TLlNJR05fTUVTU0FHRSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucmV0dXJuQ29kZSAhPT0gY29tbW9uXzEuTGVkZ2VyRXJyb3IuTm9FcnJvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hLmxhYmVsID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovLCByZXN1bHRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSwgY29tbW9uXzEucHJvY2Vzc0Vycm9yUmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9LCBjb21tb25fMS5wcm9jZXNzRXJyb3JSZXNwb25zZSldO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ2FzcGVyQXBwLnByb3RvdHlwZS5zaWduV2FzbURlcGxveSA9IGZ1bmN0aW9uIChwYXRoLCBtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHRoaXMuc2lnbkdldENodW5rcyhwYXRoLCBtZXNzYWdlKS50aGVuKGZ1bmN0aW9uIChjaHVua3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5zaWduU2VuZENodW5rKDEsIGNodW5rcy5sZW5ndGgsIGNodW5rc1swXSwgY29tbW9uXzEuSU5TLlNJR05fV0FTTV9ERVBMT1kpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCwgaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2EubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybkNvZGU6IHJlc3BvbnNlLnJldHVybkNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogcmVzcG9uc2UuZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaWduYXR1cmVSUzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbmF0dXJlUlNWOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGkgPCBjaHVua3MubGVuZ3RoKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgdGhpcy5zaWduU2VuZENodW5rKDEgKyBpLCBjaHVua3MubGVuZ3RoLCBjaHVua3NbaV0sIGNvbW1vbl8xLklOUy5TSUdOX1dBU01fREVQTE9ZKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5yZXR1cm5Db2RlICE9PSBjb21tb25fMS5MZWRnZXJFcnJvci5Ob0Vycm9ycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHJlc3VsdF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyB9LCBjb21tb25fMS5wcm9jZXNzRXJyb3JSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGNvbW1vbl8xLnByb2Nlc3NFcnJvclJlc3BvbnNlKV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQ2FzcGVyQXBwO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IENhc3BlckFwcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxuLy8gU3VwcG9ydCBkZWNvZGluZyBVUkwtc2FmZSBiYXNlNjQgc3RyaW5ncywgYXMgTm9kZS5qcyBkb2VzLlxuLy8gU2VlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQjVVJMX2FwcGxpY2F0aW9uc1xucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gZ2V0TGVucyAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cbiAgaWYgKGxlbiAlIDQgPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0JylcbiAgfVxuXG4gIC8vIFRyaW0gb2ZmIGV4dHJhIGJ5dGVzIGFmdGVyIHBsYWNlaG9sZGVyIGJ5dGVzIGFyZSBmb3VuZFxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9iZWF0Z2FtbWl0L2Jhc2U2NC1qcy9pc3N1ZXMvNDJcbiAgdmFyIHZhbGlkTGVuID0gYjY0LmluZGV4T2YoJz0nKVxuICBpZiAodmFsaWRMZW4gPT09IC0xKSB2YWxpZExlbiA9IGxlblxuXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSB2YWxpZExlbiA9PT0gbGVuXG4gICAgPyAwXG4gICAgOiA0IC0gKHZhbGlkTGVuICUgNClcblxuICByZXR1cm4gW3ZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW5dXG59XG5cbi8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIF9ieXRlTGVuZ3RoIChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pIHtcbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG5cbiAgdmFyIGFyciA9IG5ldyBBcnIoX2J5dGVMZW5ndGgoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSlcblxuICB2YXIgY3VyQnl0ZSA9IDBcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIHZhciBsZW4gPSBwbGFjZUhvbGRlcnNMZW4gPiAwXG4gICAgPyB2YWxpZExlbiAtIDRcbiAgICA6IHZhbGlkTGVuXG5cbiAgdmFyIGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8XG4gICAgICByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMikge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDEpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPVxuICAgICAgKCh1aW50OFtpXSA8PCAxNikgJiAweEZGMDAwMCkgK1xuICAgICAgKCh1aW50OFtpICsgMV0gPDwgOCkgJiAweEZGMDApICtcbiAgICAgICh1aW50OFtpICsgMl0gJiAweEZGKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aCkpKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXSArXG4gICAgICAnPT0nXG4gICAgKVxuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDEwXSArXG4gICAgICBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl0gK1xuICAgICAgJz0nXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG4iLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG5jb25zdCBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxuY29uc3QgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxuY29uc3QgY3VzdG9tSW5zcGVjdFN5bWJvbCA9XG4gICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2xbJ2ZvciddID09PSAnZnVuY3Rpb24nKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGRvdC1ub3RhdGlvblxuICAgID8gU3ltYm9sWydmb3InXSgnbm9kZWpzLnV0aWwuaW5zcGVjdC5jdXN0b20nKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGRvdC1ub3RhdGlvblxuICAgIDogbnVsbFxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbmNvbnN0IEtfTUFYX0xFTkdUSCA9IDB4N2ZmZmZmZmZcbmV4cG9ydHMua01heExlbmd0aCA9IEtfTUFYX0xFTkdUSFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBQcmludCB3YXJuaW5nIGFuZCByZWNvbW1lbmQgdXNpbmcgYGJ1ZmZlcmAgdjQueCB3aGljaCBoYXMgYW4gT2JqZWN0XG4gKiAgICAgICAgICAgICAgIGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBXZSByZXBvcnQgdGhhdCB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBpZiB0aGUgYXJlIG5vdCBzdWJjbGFzc2FibGVcbiAqIHVzaW5nIF9fcHJvdG9fXy4gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWBcbiAqIChTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOCkuIElFIDEwIGxhY2tzIHN1cHBvcnRcbiAqIGZvciBfX3Byb3RvX18gYW5kIGhhcyBhIGJ1Z2d5IHR5cGVkIGFycmF5IGltcGxlbWVudGF0aW9uLlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJykge1xuICBjb25zb2xlLmVycm9yKFxuICAgICdUaGlzIGJyb3dzZXIgbGFja3MgdHlwZWQgYXJyYXkgKFVpbnQ4QXJyYXkpIHN1cHBvcnQgd2hpY2ggaXMgcmVxdWlyZWQgYnkgJyArXG4gICAgJ2BidWZmZXJgIHY1LnguIFVzZSBgYnVmZmVyYCB2NC54IGlmIHlvdSByZXF1aXJlIG9sZCBicm93c2VyIHN1cHBvcnQuJ1xuICApXG59XG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgLy8gQ2FuIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkP1xuICB0cnkge1xuICAgIGNvbnN0IGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgY29uc3QgcHJvdG8gPSB7IGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfSB9XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHByb3RvLCBVaW50OEFycmF5LnByb3RvdHlwZSlcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoYXJyLCBwcm90bylcbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MlxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlci5wcm90b3R5cGUsICdwYXJlbnQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKHRoaXMpKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyXG4gIH1cbn0pXG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIucHJvdG90eXBlLCAnb2Zmc2V0Jywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0aGlzKSkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIHJldHVybiB0aGlzLmJ5dGVPZmZzZXRcbiAgfVxufSlcblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKGxlbmd0aCA+IEtfTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgXCInICsgbGVuZ3RoICsgJ1wiIGlzIGludmFsaWQgZm9yIG9wdGlvbiBcInNpemVcIicpXG4gIH1cbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgY29uc3QgYnVmID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YoYnVmLCBCdWZmZXIucHJvdG90eXBlKVxuICByZXR1cm4gYnVmXG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgJ1RoZSBcInN0cmluZ1wiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBzdHJpbmcuIFJlY2VpdmVkIHR5cGUgbnVtYmVyJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUoYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuZnVuY3Rpb24gZnJvbSAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5Vmlldyh2YWx1ZSlcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCAnICtcbiAgICAgICdvciBBcnJheS1saWtlIE9iamVjdC4gUmVjZWl2ZWQgdHlwZSAnICsgKHR5cGVvZiB2YWx1ZSlcbiAgICApXG4gIH1cblxuICBpZiAoaXNJbnN0YW5jZSh2YWx1ZSwgQXJyYXlCdWZmZXIpIHx8XG4gICAgICAodmFsdWUgJiYgaXNJbnN0YW5jZSh2YWx1ZS5idWZmZXIsIEFycmF5QnVmZmVyKSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgKGlzSW5zdGFuY2UodmFsdWUsIFNoYXJlZEFycmF5QnVmZmVyKSB8fFxuICAgICAgKHZhbHVlICYmIGlzSW5zdGFuY2UodmFsdWUuYnVmZmVyLCBTaGFyZWRBcnJheUJ1ZmZlcikpKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG9mIHR5cGUgbnVtYmVyLiBSZWNlaXZlZCB0eXBlIG51bWJlcidcbiAgICApXG4gIH1cblxuICBjb25zdCB2YWx1ZU9mID0gdmFsdWUudmFsdWVPZiAmJiB2YWx1ZS52YWx1ZU9mKClcbiAgaWYgKHZhbHVlT2YgIT0gbnVsbCAmJiB2YWx1ZU9mICE9PSB2YWx1ZSkge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbSh2YWx1ZU9mLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBjb25zdCBiID0gZnJvbU9iamVjdCh2YWx1ZSlcbiAgaWYgKGIpIHJldHVybiBiXG5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1ByaW1pdGl2ZSAhPSBudWxsICYmXG4gICAgICB0eXBlb2YgdmFsdWVbU3ltYm9sLnRvUHJpbWl0aXZlXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbSh2YWx1ZVtTeW1ib2wudG9QcmltaXRpdmVdKCdzdHJpbmcnKSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAnVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgb25lIG9mIHR5cGUgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgJyArXG4gICAgJ29yIEFycmF5LWxpa2UgT2JqZWN0LiBSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHZhbHVlKVxuICApXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20odmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuLy8gTm90ZTogQ2hhbmdlIHByb3RvdHlwZSAqYWZ0ZXIqIEJ1ZmZlci5mcm9tIGlzIGRlZmluZWQgdG8gd29ya2Fyb3VuZCBDaHJvbWUgYnVnOlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC8xNDhcbk9iamVjdC5zZXRQcm90b3R5cGVPZihCdWZmZXIucHJvdG90eXBlLCBVaW50OEFycmF5LnByb3RvdHlwZSlcbk9iamVjdC5zZXRQcm90b3R5cGVPZihCdWZmZXIsIFVpbnQ4QXJyYXkpXG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBcIicgKyBzaXplICsgJ1wiIGlzIGludmFsaWQgZm9yIG9wdGlvbiBcInNpemVcIicpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIoc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcihzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2Moc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlIChzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgfVxuXG4gIGNvbnN0IGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIGxldCBidWYgPSBjcmVhdGVCdWZmZXIobGVuZ3RoKVxuXG4gIGNvbnN0IGFjdHVhbCA9IGJ1Zi53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgYnVmID0gYnVmLnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiBidWZcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAoYXJyYXkpIHtcbiAgY29uc3QgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIGNvbnN0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW5ndGgpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICBidWZbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiBidWZcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5VmlldyAoYXJyYXlWaWV3KSB7XG4gIGlmIChpc0luc3RhbmNlKGFycmF5VmlldywgVWludDhBcnJheSkpIHtcbiAgICBjb25zdCBjb3B5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlWaWV3KVxuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIoY29weS5idWZmZXIsIGNvcHkuYnl0ZU9mZnNldCwgY29weS5ieXRlTGVuZ3RoKVxuICB9XG4gIHJldHVybiBmcm9tQXJyYXlMaWtlKGFycmF5Vmlldylcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyIChhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcIm9mZnNldFwiIGlzIG91dHNpZGUgb2YgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wibGVuZ3RoXCIgaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGxldCBidWZcbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGJ1ZiA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihidWYsIEJ1ZmZlci5wcm90b3R5cGUpXG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0IChvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgY29uc3QgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICBjb25zdCBidWYgPSBjcmVhdGVCdWZmZXIobGVuKVxuXG4gICAgaWYgKGJ1Zi5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBidWZcbiAgICB9XG5cbiAgICBvYmouY29weShidWYsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gYnVmXG4gIH1cblxuICBpZiAob2JqLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBudW1iZXJJc05hTihvYmoubGVuZ3RoKSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcigwKVxuICAgIH1cbiAgICByZXR1cm4gZnJvbUFycmF5TGlrZShvYmopXG4gIH1cblxuICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIEFycmF5LmlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUxpa2Uob2JqLmRhdGEpXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IEtfTUFYX0xFTkdUSGAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBLX01BWF9MRU5HVEgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsgS19NQVhfTEVOR1RILnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyID09PSB0cnVlICYmXG4gICAgYiAhPT0gQnVmZmVyLnByb3RvdHlwZSAvLyBzbyBCdWZmZXIuaXNCdWZmZXIoQnVmZmVyLnByb3RvdHlwZSkgd2lsbCBiZSBmYWxzZVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKGlzSW5zdGFuY2UoYSwgVWludDhBcnJheSkpIGEgPSBCdWZmZXIuZnJvbShhLCBhLm9mZnNldCwgYS5ieXRlTGVuZ3RoKVxuICBpZiAoaXNJbnN0YW5jZShiLCBVaW50OEFycmF5KSkgYiA9IEJ1ZmZlci5mcm9tKGIsIGIub2Zmc2V0LCBiLmJ5dGVMZW5ndGgpXG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcImJ1ZjFcIiwgXCJidWYyXCIgYXJndW1lbnRzIG11c3QgYmUgb25lIG9mIHR5cGUgQnVmZmVyIG9yIFVpbnQ4QXJyYXknXG4gICAgKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgbGV0IHggPSBhLmxlbmd0aFxuICBsZXQgeSA9IGIubGVuZ3RoXG5cbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICBsZXQgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIGxldCBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgbGV0IGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoaXNJbnN0YW5jZShidWYsIFVpbnQ4QXJyYXkpKSB7XG4gICAgICBpZiAocG9zICsgYnVmLmxlbmd0aCA+IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgYnVmID0gQnVmZmVyLmZyb20oYnVmKVxuICAgICAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgICAgIGJ1ZmZlcixcbiAgICAgICAgICBidWYsXG4gICAgICAgICAgcG9zXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgfVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IGlzSW5zdGFuY2Uoc3RyaW5nLCBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcInN0cmluZ1wiIGFyZ3VtZW50IG11c3QgYmUgb25lIG9mIHR5cGUgc3RyaW5nLCBCdWZmZXIsIG9yIEFycmF5QnVmZmVyLiAnICtcbiAgICAgICdSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2Ygc3RyaW5nXG4gICAgKVxuICB9XG5cbiAgY29uc3QgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBjb25zdCBtdXN0TWF0Y2ggPSAoYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdID09PSB0cnVlKVxuICBpZiAoIW11c3RNYXRjaCAmJiBsZW4gPT09IDApIHJldHVybiAwXG5cbiAgLy8gVXNlIGEgZm9yIGxvb3AgdG8gYXZvaWQgcmVjdXJzaW9uXG4gIGxldCBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHtcbiAgICAgICAgICByZXR1cm4gbXVzdE1hdGNoID8gLTEgOiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICB9XG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcblxuZnVuY3Rpb24gc2xvd1RvU3RyaW5nIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICBsZXQgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoYXQgXCJ0aGlzLmxlbmd0aCA8PSBNQVhfVUlOVDMyXCIgc2luY2UgaXQncyBhIHJlYWQtb25seVxuICAvLyBwcm9wZXJ0eSBvZiBhIHR5cGVkIGFycmF5LlxuXG4gIC8vIFRoaXMgYmVoYXZlcyBuZWl0aGVyIGxpa2UgU3RyaW5nIG5vciBVaW50OEFycmF5IGluIHRoYXQgd2Ugc2V0IHN0YXJ0L2VuZFxuICAvLyB0byB0aGVpciB1cHBlci9sb3dlciBib3VuZHMgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gIC8vIHVuZGVmaW5lZCBpcyBoYW5kbGVkIHNwZWNpYWxseSBhcyBwZXIgRUNNQS0yNjIgNnRoIEVkaXRpb24sXG4gIC8vIFNlY3Rpb24gMTMuMy4zLjcgUnVudGltZSBTZW1hbnRpY3M6IEtleWVkQmluZGluZ0luaXRpYWxpemF0aW9uLlxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICAvLyBSZXR1cm4gZWFybHkgaWYgc3RhcnQgPiB0aGlzLmxlbmd0aC4gRG9uZSBoZXJlIHRvIHByZXZlbnQgcG90ZW50aWFsIHVpbnQzMlxuICAvLyBjb2VyY2lvbiBmYWlsIGJlbG93LlxuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbmQgPD0gMCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgLy8gRm9yY2UgY29lcmNpb24gdG8gdWludDMyLiBUaGlzIHdpbGwgYWxzbyBjb2VyY2UgZmFsc2V5L05hTiB2YWx1ZXMgdG8gMC5cbiAgZW5kID4+Pj0gMFxuICBzdGFydCA+Pj49IDBcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuLy8gVGhpcyBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIChhbmQgdGhlIGBpcy1idWZmZXJgIG5wbSBwYWNrYWdlKVxuLy8gdG8gZGV0ZWN0IGEgQnVmZmVyIGluc3RhbmNlLiBJdCdzIG5vdCBwb3NzaWJsZSB0byB1c2UgYGluc3RhbmNlb2YgQnVmZmVyYFxuLy8gcmVsaWFibHkgaW4gYSBicm93c2VyaWZ5IGNvbnRleHQgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBtdWx0aXBsZSBkaWZmZXJlbnRcbi8vIGNvcGllcyBvZiB0aGUgJ2J1ZmZlcicgcGFja2FnZSBpbiB1c2UuIFRoaXMgbWV0aG9kIHdvcmtzIGV2ZW4gZm9yIEJ1ZmZlclxuLy8gaW5zdGFuY2VzIHRoYXQgd2VyZSBjcmVhdGVkIGZyb20gYW5vdGhlciBjb3B5IG9mIHRoZSBgYnVmZmVyYCBwYWNrYWdlLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9pc3N1ZXMvMTU0XG5CdWZmZXIucHJvdG90eXBlLl9pc0J1ZmZlciA9IHRydWVcblxuZnVuY3Rpb24gc3dhcCAoYiwgbiwgbSkge1xuICBjb25zdCBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzJylcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgMilcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXA2NCA9IGZ1bmN0aW9uIHN3YXA2NCAoKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICBjb25zdCBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0xvY2FsZVN0cmluZyA9IEJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmdcblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICBsZXQgc3RyID0gJydcbiAgY29uc3QgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLnJlcGxhY2UoLyguezJ9KS9nLCAnJDEgJykudHJpbSgpXG4gIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cbmlmIChjdXN0b21JbnNwZWN0U3ltYm9sKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGVbY3VzdG9tSW5zcGVjdFN5bWJvbF0gPSBCdWZmZXIucHJvdG90eXBlLmluc3BlY3Rcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKGlzSW5zdGFuY2UodGFyZ2V0LCBVaW50OEFycmF5KSkge1xuICAgIHRhcmdldCA9IEJ1ZmZlci5mcm9tKHRhcmdldCwgdGFyZ2V0Lm9mZnNldCwgdGFyZ2V0LmJ5dGVMZW5ndGgpXG4gIH1cbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwidGFyZ2V0XCIgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBCdWZmZXIgb3IgVWludDhBcnJheS4gJyArXG4gICAgICAnUmVjZWl2ZWQgdHlwZSAnICsgKHR5cGVvZiB0YXJnZXQpXG4gICAgKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgbGV0IHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIGxldCB5ID0gZW5kIC0gc3RhcnRcbiAgY29uc3QgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICBjb25zdCB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICBjb25zdCB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAobnVtYmVySXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmICh0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbdmFsXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgbGV0IGluZGV4U2l6ZSA9IDFcbiAgbGV0IGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgbGV0IHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgbGV0IGlcbiAgaWYgKGRpcikge1xuICAgIGxldCBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGxldCBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgY29uc3QgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGxldCBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAobnVtYmVySXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCA+Pj4gMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIGNvbnN0IHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgbGV0IGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICBjb25zdCByZXMgPSBbXVxuXG4gIGxldCBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICBjb25zdCBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICBsZXQgY29kZVBvaW50ID0gbnVsbFxuICAgIGxldCBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpXG4gICAgICA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpXG4gICAgICAgICAgPyAzXG4gICAgICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRilcbiAgICAgICAgICAgICAgPyAyXG4gICAgICAgICAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgbGV0IHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxuY29uc3QgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIGNvbnN0IGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgbGV0IHJlcyA9ICcnXG4gIGxldCBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBsZXQgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgbGV0IHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgY29uc3QgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIGxldCBvdXQgPSAnJ1xuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSBoZXhTbGljZUxvb2t1cFRhYmxlW2J1ZltpXV1cbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGNvbnN0IGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIGxldCByZXMgPSAnJ1xuICAvLyBJZiBieXRlcy5sZW5ndGggaXMgb2RkLCB0aGUgbGFzdCA4IGJpdHMgbXVzdCBiZSBpZ25vcmVkIChzYW1lIGFzIG5vZGUuanMpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoIC0gMTsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyAoYnl0ZXNbaSArIDFdICogMjU2KSlcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW5cbiAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMCkgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIGNvbnN0IG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKG5ld0J1ZiwgQnVmZmVyLnByb3RvdHlwZSlcblxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50TEUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXRdXG4gIGxldCBtdWwgPSAxXG4gIGxldCBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnRCRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50QkUgPSBmdW5jdGlvbiByZWFkVUludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgbGV0IG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50OCA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MTZMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQxNkJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDMyTEUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MzJCRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdVSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiByZWFkQmlnVUludDY0TEUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCBsbyA9IGZpcnN0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjRcblxuICBjb25zdCBoaSA9IHRoaXNbKytvZmZzZXRdICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICBsYXN0ICogMiAqKiAyNFxuXG4gIHJldHVybiBCaWdJbnQobG8pICsgKEJpZ0ludChoaSkgPDwgQmlnSW50KDMyKSlcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ1VJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdVSW50NjRCRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IGhpID0gZmlyc3QgKiAyICoqIDI0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XVxuXG4gIGNvbnN0IGxvID0gdGhpc1srK29mZnNldF0gKiAyICoqIDI0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICBsYXN0XG5cbiAgcmV0dXJuIChCaWdJbnQoaGkpIDw8IEJpZ0ludCgzMikpICsgQmlnSW50KGxvKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0XVxuICBsZXQgbXVsID0gMVxuICBsZXQgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIGxldCBpID0gYnl0ZUxlbmd0aFxuICBsZXQgbXVsID0gMVxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgY29uc3QgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIGNvbnN0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdJbnQ2NExFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgdmFsID0gdGhpc1tvZmZzZXQgKyA0XSArXG4gICAgdGhpc1tvZmZzZXQgKyA1XSAqIDIgKiogOCArXG4gICAgdGhpc1tvZmZzZXQgKyA2XSAqIDIgKiogMTYgK1xuICAgIChsYXN0IDw8IDI0KSAvLyBPdmVyZmxvd1xuXG4gIHJldHVybiAoQmlnSW50KHZhbCkgPDwgQmlnSW50KDMyKSkgK1xuICAgIEJpZ0ludChmaXJzdCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDI0KVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnSW50NjRCRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiByZWFkQmlnSW50NjRCRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IHZhbCA9IChmaXJzdCA8PCAyNCkgKyAvLyBPdmVyZmxvd1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdXG5cbiAgcmV0dXJuIChCaWdJbnQodmFsKSA8PCBCaWdJbnQoMzIpKSArXG4gICAgQmlnSW50KHRoaXNbKytvZmZzZXRdICogMiAqKiAyNCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgbGFzdClcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludExFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjb25zdCBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIGxldCBtdWwgPSAxXG4gIGxldCBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50QkUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgbGV0IGkgPSBieXRlTGVuZ3RoIC0gMVxuICBsZXQgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQ4ID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDE2TEUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQxNkJFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MzJMRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDMyQkUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gd3J0QmlnVUludDY0TEUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbWluLCBtYXgpIHtcbiAgY2hlY2tJbnRCSSh2YWx1ZSwgbWluLCBtYXgsIGJ1Ziwgb2Zmc2V0LCA3KVxuXG4gIGxldCBsbyA9IE51bWJlcih2YWx1ZSAmIEJpZ0ludCgweGZmZmZmZmZmKSlcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxldCBoaSA9IE51bWJlcih2YWx1ZSA+PiBCaWdJbnQoMzIpICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgcmV0dXJuIG9mZnNldFxufVxuXG5mdW5jdGlvbiB3cnRCaWdVSW50NjRCRSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBtaW4sIG1heCkge1xuICBjaGVja0ludEJJKHZhbHVlLCBtaW4sIG1heCwgYnVmLCBvZmZzZXQsIDcpXG5cbiAgbGV0IGxvID0gTnVtYmVyKHZhbHVlICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0ICsgN10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCArIDZdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQgKyA1XSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0ICsgNF0gPSBsb1xuICBsZXQgaGkgPSBOdW1iZXIodmFsdWUgPj4gQmlnSW50KDMyKSAmIEJpZ0ludCgweGZmZmZmZmZmKSlcbiAgYnVmW29mZnNldCArIDNdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQgKyAyXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0ICsgMV0gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldF0gPSBoaVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlQmlnVUludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdVSW50NjRMRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NExFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIEJpZ0ludCgwKSwgQmlnSW50KCcweGZmZmZmZmZmZmZmZmZmZmYnKSlcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdVSW50NjRCRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ1VJbnQ2NEJFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0QkUodGhpcywgdmFsdWUsIG9mZnNldCwgQmlnSW50KDApLCBCaWdJbnQoJzB4ZmZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjb25zdCBsaW1pdCA9IE1hdGgucG93KDIsICg4ICogYnl0ZUxlbmd0aCkgLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICBsZXQgaSA9IDBcbiAgbGV0IG11bCA9IDFcbiAgbGV0IHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjb25zdCBsaW1pdCA9IE1hdGgucG93KDIsICg4ICogYnl0ZUxlbmd0aCkgLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICBsZXQgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIGxldCBtdWwgPSAxXG4gIGxldCBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlQmlnSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ0ludDY0TEUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRMRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAtQmlnSW50KCcweDgwMDAwMDAwMDAwMDAwMDAnKSwgQmlnSW50KCcweDdmZmZmZmZmZmZmZmZmZmYnKSlcbn0pXG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnSW50NjRCRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NEJFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIC1CaWdJbnQoJzB4ODAwMDAwMDAwMDAwMDAwMCcpLCBCaWdJbnQoJzB4N2ZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkgdGhyb3cgbmV3IFR5cGVFcnJvcignYXJndW1lbnQgc2hvdWxkIGJlIGEgQnVmZmVyJylcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIGNvbnN0IGxlbiA9IGVuZCAtIHN0YXJ0XG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuY29weVdpdGhpbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIFVzZSBidWlsdC1pbiB3aGVuIGF2YWlsYWJsZSwgbWlzc2luZyBmcm9tIElFMTFcbiAgICB0aGlzLmNvcHlXaXRoaW4odGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpXG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoKGVuY29kaW5nID09PSAndXRmOCcgJiYgY29kZSA8IDEyOCkgfHxcbiAgICAgICAgICBlbmNvZGluZyA9PT0gJ2xhdGluMScpIHtcbiAgICAgICAgLy8gRmFzdCBwYXRoOiBJZiBgdmFsYCBmaXRzIGludG8gYSBzaW5nbGUgYnl0ZSwgdXNlIHRoYXQgbnVtZXJpYyB2YWx1ZS5cbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdib29sZWFuJykge1xuICAgIHZhbCA9IE51bWJlcih2YWwpXG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgbGV0IGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICAgIGNvbnN0IGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGlmIChsZW4gPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSB2YWx1ZSBcIicgKyB2YWwgK1xuICAgICAgICAnXCIgaXMgaW52YWxpZCBmb3IgYXJndW1lbnQgXCJ2YWx1ZVwiJylcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gQ1VTVE9NIEVSUk9SU1xuLy8gPT09PT09PT09PT09PVxuXG4vLyBTaW1wbGlmaWVkIHZlcnNpb25zIGZyb20gTm9kZSwgY2hhbmdlZCBmb3IgQnVmZmVyLW9ubHkgdXNhZ2VcbmNvbnN0IGVycm9ycyA9IHt9XG5mdW5jdGlvbiBFIChzeW0sIGdldE1lc3NhZ2UsIEJhc2UpIHtcbiAgZXJyb3JzW3N5bV0gPSBjbGFzcyBOb2RlRXJyb3IgZXh0ZW5kcyBCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICBzdXBlcigpXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWVzc2FnZScsIHtcbiAgICAgICAgdmFsdWU6IGdldE1lc3NhZ2UuYXBwbHkodGhpcywgYXJndW1lbnRzKSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfSlcblxuICAgICAgLy8gQWRkIHRoZSBlcnJvciBjb2RlIHRvIHRoZSBuYW1lIHRvIGluY2x1ZGUgaXQgaW4gdGhlIHN0YWNrIHRyYWNlLlxuICAgICAgdGhpcy5uYW1lID0gYCR7dGhpcy5uYW1lfSBbJHtzeW19XWBcbiAgICAgIC8vIEFjY2VzcyB0aGUgc3RhY2sgdG8gZ2VuZXJhdGUgdGhlIGVycm9yIG1lc3NhZ2UgaW5jbHVkaW5nIHRoZSBlcnJvciBjb2RlXG4gICAgICAvLyBmcm9tIHRoZSBuYW1lLlxuICAgICAgdGhpcy5zdGFjayAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICAgICAgLy8gUmVzZXQgdGhlIG5hbWUgdG8gdGhlIGFjdHVhbCBuYW1lLlxuICAgICAgZGVsZXRlIHRoaXMubmFtZVxuICAgIH1cblxuICAgIGdldCBjb2RlICgpIHtcbiAgICAgIHJldHVybiBzeW1cbiAgICB9XG5cbiAgICBzZXQgY29kZSAodmFsdWUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29kZScsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdG9TdHJpbmcgKCkge1xuICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0gWyR7c3ltfV06ICR7dGhpcy5tZXNzYWdlfWBcbiAgICB9XG4gIH1cbn1cblxuRSgnRVJSX0JVRkZFUl9PVVRfT0ZfQk9VTkRTJyxcbiAgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAobmFtZSkge1xuICAgICAgcmV0dXJuIGAke25hbWV9IGlzIG91dHNpZGUgb2YgYnVmZmVyIGJvdW5kc2BcbiAgICB9XG5cbiAgICByZXR1cm4gJ0F0dGVtcHQgdG8gYWNjZXNzIG1lbW9yeSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnXG4gIH0sIFJhbmdlRXJyb3IpXG5FKCdFUlJfSU5WQUxJRF9BUkdfVFlQRScsXG4gIGZ1bmN0aW9uIChuYW1lLCBhY3R1YWwpIHtcbiAgICByZXR1cm4gYFRoZSBcIiR7bmFtZX1cIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgbnVtYmVyLiBSZWNlaXZlZCB0eXBlICR7dHlwZW9mIGFjdHVhbH1gXG4gIH0sIFR5cGVFcnJvcilcbkUoJ0VSUl9PVVRfT0ZfUkFOR0UnLFxuICBmdW5jdGlvbiAoc3RyLCByYW5nZSwgaW5wdXQpIHtcbiAgICBsZXQgbXNnID0gYFRoZSB2YWx1ZSBvZiBcIiR7c3RyfVwiIGlzIG91dCBvZiByYW5nZS5gXG4gICAgbGV0IHJlY2VpdmVkID0gaW5wdXRcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihpbnB1dCkgJiYgTWF0aC5hYnMoaW5wdXQpID4gMiAqKiAzMikge1xuICAgICAgcmVjZWl2ZWQgPSBhZGROdW1lcmljYWxTZXBhcmF0b3IoU3RyaW5nKGlucHV0KSlcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ2JpZ2ludCcpIHtcbiAgICAgIHJlY2VpdmVkID0gU3RyaW5nKGlucHV0KVxuICAgICAgaWYgKGlucHV0ID4gQmlnSW50KDIpICoqIEJpZ0ludCgzMikgfHwgaW5wdXQgPCAtKEJpZ0ludCgyKSAqKiBCaWdJbnQoMzIpKSkge1xuICAgICAgICByZWNlaXZlZCA9IGFkZE51bWVyaWNhbFNlcGFyYXRvcihyZWNlaXZlZClcbiAgICAgIH1cbiAgICAgIHJlY2VpdmVkICs9ICduJ1xuICAgIH1cbiAgICBtc2cgKz0gYCBJdCBtdXN0IGJlICR7cmFuZ2V9LiBSZWNlaXZlZCAke3JlY2VpdmVkfWBcbiAgICByZXR1cm4gbXNnXG4gIH0sIFJhbmdlRXJyb3IpXG5cbmZ1bmN0aW9uIGFkZE51bWVyaWNhbFNlcGFyYXRvciAodmFsKSB7XG4gIGxldCByZXMgPSAnJ1xuICBsZXQgaSA9IHZhbC5sZW5ndGhcbiAgY29uc3Qgc3RhcnQgPSB2YWxbMF0gPT09ICctJyA/IDEgOiAwXG4gIGZvciAoOyBpID49IHN0YXJ0ICsgNDsgaSAtPSAzKSB7XG4gICAgcmVzID0gYF8ke3ZhbC5zbGljZShpIC0gMywgaSl9JHtyZXN9YFxuICB9XG4gIHJldHVybiBgJHt2YWwuc2xpY2UoMCwgaSl9JHtyZXN9YFxufVxuXG4vLyBDSEVDSyBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBjaGVja0JvdW5kcyAoYnVmLCBvZmZzZXQsIGJ5dGVMZW5ndGgpIHtcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgaWYgKGJ1ZltvZmZzZXRdID09PSB1bmRlZmluZWQgfHwgYnVmW29mZnNldCArIGJ5dGVMZW5ndGhdID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIGJ1Zi5sZW5ndGggLSAoYnl0ZUxlbmd0aCArIDEpKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50QkkgKHZhbHVlLCBtaW4sIG1heCwgYnVmLCBvZmZzZXQsIGJ5dGVMZW5ndGgpIHtcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB7XG4gICAgY29uc3QgbiA9IHR5cGVvZiBtaW4gPT09ICdiaWdpbnQnID8gJ24nIDogJydcbiAgICBsZXQgcmFuZ2VcbiAgICBpZiAoYnl0ZUxlbmd0aCA+IDMpIHtcbiAgICAgIGlmIChtaW4gPT09IDAgfHwgbWluID09PSBCaWdJbnQoMCkpIHtcbiAgICAgICAgcmFuZ2UgPSBgPj0gMCR7bn0gYW5kIDwgMiR7bn0gKiogJHsoYnl0ZUxlbmd0aCArIDEpICogOH0ke259YFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmFuZ2UgPSBgPj0gLSgyJHtufSAqKiAkeyhieXRlTGVuZ3RoICsgMSkgKiA4IC0gMX0ke259KSBhbmQgPCAyICoqIGAgK1xuICAgICAgICAgICAgICAgIGAkeyhieXRlTGVuZ3RoICsgMSkgKiA4IC0gMX0ke259YFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByYW5nZSA9IGA+PSAke21pbn0ke259IGFuZCA8PSAke21heH0ke259YFxuICAgIH1cbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9PVVRfT0ZfUkFOR0UoJ3ZhbHVlJywgcmFuZ2UsIHZhbHVlKVxuICB9XG4gIGNoZWNrQm91bmRzKGJ1Ziwgb2Zmc2V0LCBieXRlTGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU51bWJlciAodmFsdWUsIG5hbWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9JTlZBTElEX0FSR19UWVBFKG5hbWUsICdudW1iZXInLCB2YWx1ZSlcbiAgfVxufVxuXG5mdW5jdGlvbiBib3VuZHNFcnJvciAodmFsdWUsIGxlbmd0aCwgdHlwZSkge1xuICBpZiAoTWF0aC5mbG9vcih2YWx1ZSkgIT09IHZhbHVlKSB7XG4gICAgdmFsaWRhdGVOdW1iZXIodmFsdWUsIHR5cGUpXG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfT1VUX09GX1JBTkdFKHR5cGUgfHwgJ29mZnNldCcsICdhbiBpbnRlZ2VyJywgdmFsdWUpXG4gIH1cblxuICBpZiAobGVuZ3RoIDwgMCkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX0JVRkZFUl9PVVRfT0ZfQk9VTkRTKClcbiAgfVxuXG4gIHRocm93IG5ldyBlcnJvcnMuRVJSX09VVF9PRl9SQU5HRSh0eXBlIHx8ICdvZmZzZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYD49ICR7dHlwZSA/IDEgOiAwfSBhbmQgPD0gJHtsZW5ndGh9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlKVxufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbmNvbnN0IElOVkFMSURfQkFTRTY0X1JFID0gL1teKy8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgdGFrZXMgZXF1YWwgc2lnbnMgYXMgZW5kIG9mIHRoZSBCYXNlNjQgZW5jb2RpbmdcbiAgc3RyID0gc3RyLnNwbGl0KCc9JylbMF1cbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0ci50cmltKCkucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICBsZXQgY29kZVBvaW50XG4gIGNvbnN0IGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgbGV0IGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIGNvbnN0IGJ5dGVzID0gW11cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgY29uc3QgYnl0ZUFycmF5ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICBsZXQgYywgaGksIGxvXG4gIGNvbnN0IGJ5dGVBcnJheSA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgbGV0IGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbi8vIEFycmF5QnVmZmVyIG9yIFVpbnQ4QXJyYXkgb2JqZWN0cyBmcm9tIG90aGVyIGNvbnRleHRzIChpLmUuIGlmcmFtZXMpIGRvIG5vdCBwYXNzXG4vLyB0aGUgYGluc3RhbmNlb2ZgIGNoZWNrIGJ1dCB0aGV5IHNob3VsZCBiZSB0cmVhdGVkIGFzIG9mIHRoYXQgdHlwZS5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzE2NlxuZnVuY3Rpb24gaXNJbnN0YW5jZSAob2JqLCB0eXBlKSB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiB0eXBlIHx8XG4gICAgKG9iaiAhPSBudWxsICYmIG9iai5jb25zdHJ1Y3RvciAhPSBudWxsICYmIG9iai5jb25zdHJ1Y3Rvci5uYW1lICE9IG51bGwgJiZcbiAgICAgIG9iai5jb25zdHJ1Y3Rvci5uYW1lID09PSB0eXBlLm5hbWUpXG59XG5mdW5jdGlvbiBudW1iZXJJc05hTiAob2JqKSB7XG4gIC8vIEZvciBJRTExIHN1cHBvcnRcbiAgcmV0dXJuIG9iaiAhPT0gb2JqIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG5cbi8vIENyZWF0ZSBsb29rdXAgdGFibGUgZm9yIGB0b1N0cmluZygnaGV4JylgXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8yMTlcbmNvbnN0IGhleFNsaWNlTG9va3VwVGFibGUgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBhbHBoYWJldCA9ICcwMTIzNDU2Nzg5YWJjZGVmJ1xuICBjb25zdCB0YWJsZSA9IG5ldyBBcnJheSgyNTYpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgIGNvbnN0IGkxNiA9IGkgKiAxNlxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTY7ICsraikge1xuICAgICAgdGFibGVbaTE2ICsgal0gPSBhbHBoYWJldFtpXSArIGFscGhhYmV0W2pdXG4gICAgfVxuICB9XG4gIHJldHVybiB0YWJsZVxufSkoKVxuXG4vLyBSZXR1cm4gbm90IGZ1bmN0aW9uIHdpdGggRXJyb3IgaWYgQmlnSW50IG5vdCBzdXBwb3J0ZWRcbmZ1bmN0aW9uIGRlZmluZUJpZ0ludE1ldGhvZCAoZm4pIHtcbiAgcmV0dXJuIHR5cGVvZiBCaWdJbnQgPT09ICd1bmRlZmluZWQnID8gQnVmZmVyQmlnSW50Tm90RGVmaW5lZCA6IGZuXG59XG5cbmZ1bmN0aW9uIEJ1ZmZlckJpZ0ludE5vdERlZmluZWQgKCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0JpZ0ludCBub3Qgc3VwcG9ydGVkJylcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCByZXNvbHZlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBlcnJvckxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgaGFuZGxlciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsICdlcnJvcicsIGhhbmRsZXIsIGZsYWdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgbGlzdGVuZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEV2ZW50VGFyZ2V0IGRvZXMgbm90IGhhdmUgYGVycm9yYCBldmVudCBzZW1hbnRpY3MgbGlrZSBOb2RlXG4gICAgLy8gRXZlbnRFbWl0dGVycywgd2UgZG8gbm90IGxpc3RlbiBmb3IgYGVycm9yYCBldmVudHMgaGVyZS5cbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuY3Rpb24gd3JhcExpc3RlbmVyKGFyZykge1xuICAgICAgLy8gSUUgZG9lcyBub3QgaGF2ZSBidWlsdGluIGB7IG9uY2U6IHRydWUgfWAgc3VwcG9ydCBzbyB3ZVxuICAgICAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseS5cbiAgICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB3cmFwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXIoYXJnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGVtaXR0ZXIpO1xuICB9XG59XG4iLCIvKiEgaWVlZTc1NC4gQlNELTMtQ2xhdXNlIExpY2Vuc2UuIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZy9vcGVuc291cmNlPiAqL1xuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vIEEgbGlua2VkIGxpc3QgdG8ga2VlcCB0cmFjayBvZiByZWNlbnRseS11c2VkLW5lc3NcbmNvbnN0IFlhbGxpc3QgPSByZXF1aXJlKCd5YWxsaXN0JylcblxuY29uc3QgTUFYID0gU3ltYm9sKCdtYXgnKVxuY29uc3QgTEVOR1RIID0gU3ltYm9sKCdsZW5ndGgnKVxuY29uc3QgTEVOR1RIX0NBTENVTEFUT1IgPSBTeW1ib2woJ2xlbmd0aENhbGN1bGF0b3InKVxuY29uc3QgQUxMT1dfU1RBTEUgPSBTeW1ib2woJ2FsbG93U3RhbGUnKVxuY29uc3QgTUFYX0FHRSA9IFN5bWJvbCgnbWF4QWdlJylcbmNvbnN0IERJU1BPU0UgPSBTeW1ib2woJ2Rpc3Bvc2UnKVxuY29uc3QgTk9fRElTUE9TRV9PTl9TRVQgPSBTeW1ib2woJ25vRGlzcG9zZU9uU2V0JylcbmNvbnN0IExSVV9MSVNUID0gU3ltYm9sKCdscnVMaXN0JylcbmNvbnN0IENBQ0hFID0gU3ltYm9sKCdjYWNoZScpXG5jb25zdCBVUERBVEVfQUdFX09OX0dFVCA9IFN5bWJvbCgndXBkYXRlQWdlT25HZXQnKVxuXG5jb25zdCBuYWl2ZUxlbmd0aCA9ICgpID0+IDFcblxuLy8gbHJ1TGlzdCBpcyBhIHlhbGxpc3Qgd2hlcmUgdGhlIGhlYWQgaXMgdGhlIHlvdW5nZXN0XG4vLyBpdGVtLCBhbmQgdGhlIHRhaWwgaXMgdGhlIG9sZGVzdC4gIHRoZSBsaXN0IGNvbnRhaW5zIHRoZSBIaXRcbi8vIG9iamVjdHMgYXMgdGhlIGVudHJpZXMuXG4vLyBFYWNoIEhpdCBvYmplY3QgaGFzIGEgcmVmZXJlbmNlIHRvIGl0cyBZYWxsaXN0Lk5vZGUuICBUaGlzXG4vLyBuZXZlciBjaGFuZ2VzLlxuLy9cbi8vIGNhY2hlIGlzIGEgTWFwIChvciBQc2V1ZG9NYXApIHRoYXQgbWF0Y2hlcyB0aGUga2V5cyB0b1xuLy8gdGhlIFlhbGxpc3QuTm9kZSBvYmplY3QuXG5jbGFzcyBMUlVDYWNoZSB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnbnVtYmVyJylcbiAgICAgIG9wdGlvbnMgPSB7IG1heDogb3B0aW9ucyB9XG5cbiAgICBpZiAoIW9wdGlvbnMpXG4gICAgICBvcHRpb25zID0ge31cblxuICAgIGlmIChvcHRpb25zLm1heCAmJiAodHlwZW9mIG9wdGlvbnMubWF4ICE9PSAnbnVtYmVyJyB8fCBvcHRpb25zLm1heCA8IDApKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbWF4IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyJylcbiAgICAvLyBLaW5kIG9mIHdlaXJkIHRvIGhhdmUgYSBkZWZhdWx0IG1heCBvZiBJbmZpbml0eSwgYnV0IG9oIHdlbGwuXG4gICAgY29uc3QgbWF4ID0gdGhpc1tNQVhdID0gb3B0aW9ucy5tYXggfHwgSW5maW5pdHlcblxuICAgIGNvbnN0IGxjID0gb3B0aW9ucy5sZW5ndGggfHwgbmFpdmVMZW5ndGhcbiAgICB0aGlzW0xFTkdUSF9DQUxDVUxBVE9SXSA9ICh0eXBlb2YgbGMgIT09ICdmdW5jdGlvbicpID8gbmFpdmVMZW5ndGggOiBsY1xuICAgIHRoaXNbQUxMT1dfU1RBTEVdID0gb3B0aW9ucy5zdGFsZSB8fCBmYWxzZVxuICAgIGlmIChvcHRpb25zLm1heEFnZSAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhBZ2UgIT09ICdudW1iZXInKVxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbWF4QWdlIG11c3QgYmUgYSBudW1iZXInKVxuICAgIHRoaXNbTUFYX0FHRV0gPSBvcHRpb25zLm1heEFnZSB8fCAwXG4gICAgdGhpc1tESVNQT1NFXSA9IG9wdGlvbnMuZGlzcG9zZVxuICAgIHRoaXNbTk9fRElTUE9TRV9PTl9TRVRdID0gb3B0aW9ucy5ub0Rpc3Bvc2VPblNldCB8fCBmYWxzZVxuICAgIHRoaXNbVVBEQVRFX0FHRV9PTl9HRVRdID0gb3B0aW9ucy51cGRhdGVBZ2VPbkdldCB8fCBmYWxzZVxuICAgIHRoaXMucmVzZXQoKVxuICB9XG5cbiAgLy8gcmVzaXplIHRoZSBjYWNoZSB3aGVuIHRoZSBtYXggY2hhbmdlcy5cbiAgc2V0IG1heCAobUwpIHtcbiAgICBpZiAodHlwZW9mIG1MICE9PSAnbnVtYmVyJyB8fCBtTCA8IDApXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtYXggbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXInKVxuXG4gICAgdGhpc1tNQVhdID0gbUwgfHwgSW5maW5pdHlcbiAgICB0cmltKHRoaXMpXG4gIH1cbiAgZ2V0IG1heCAoKSB7XG4gICAgcmV0dXJuIHRoaXNbTUFYXVxuICB9XG5cbiAgc2V0IGFsbG93U3RhbGUgKGFsbG93U3RhbGUpIHtcbiAgICB0aGlzW0FMTE9XX1NUQUxFXSA9ICEhYWxsb3dTdGFsZVxuICB9XG4gIGdldCBhbGxvd1N0YWxlICgpIHtcbiAgICByZXR1cm4gdGhpc1tBTExPV19TVEFMRV1cbiAgfVxuXG4gIHNldCBtYXhBZ2UgKG1BKSB7XG4gICAgaWYgKHR5cGVvZiBtQSAhPT0gJ251bWJlcicpXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdtYXhBZ2UgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXInKVxuXG4gICAgdGhpc1tNQVhfQUdFXSA9IG1BXG4gICAgdHJpbSh0aGlzKVxuICB9XG4gIGdldCBtYXhBZ2UgKCkge1xuICAgIHJldHVybiB0aGlzW01BWF9BR0VdXG4gIH1cblxuICAvLyByZXNpemUgdGhlIGNhY2hlIHdoZW4gdGhlIGxlbmd0aENhbGN1bGF0b3IgY2hhbmdlcy5cbiAgc2V0IGxlbmd0aENhbGN1bGF0b3IgKGxDKSB7XG4gICAgaWYgKHR5cGVvZiBsQyAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgIGxDID0gbmFpdmVMZW5ndGhcblxuICAgIGlmIChsQyAhPT0gdGhpc1tMRU5HVEhfQ0FMQ1VMQVRPUl0pIHtcbiAgICAgIHRoaXNbTEVOR1RIX0NBTENVTEFUT1JdID0gbENcbiAgICAgIHRoaXNbTEVOR1RIXSA9IDBcbiAgICAgIHRoaXNbTFJVX0xJU1RdLmZvckVhY2goaGl0ID0+IHtcbiAgICAgICAgaGl0Lmxlbmd0aCA9IHRoaXNbTEVOR1RIX0NBTENVTEFUT1JdKGhpdC52YWx1ZSwgaGl0LmtleSlcbiAgICAgICAgdGhpc1tMRU5HVEhdICs9IGhpdC5sZW5ndGhcbiAgICAgIH0pXG4gICAgfVxuICAgIHRyaW0odGhpcylcbiAgfVxuICBnZXQgbGVuZ3RoQ2FsY3VsYXRvciAoKSB7IHJldHVybiB0aGlzW0xFTkdUSF9DQUxDVUxBVE9SXSB9XG5cbiAgZ2V0IGxlbmd0aCAoKSB7IHJldHVybiB0aGlzW0xFTkdUSF0gfVxuICBnZXQgaXRlbUNvdW50ICgpIHsgcmV0dXJuIHRoaXNbTFJVX0xJU1RdLmxlbmd0aCB9XG5cbiAgcmZvckVhY2ggKGZuLCB0aGlzcCkge1xuICAgIHRoaXNwID0gdGhpc3AgfHwgdGhpc1xuICAgIGZvciAobGV0IHdhbGtlciA9IHRoaXNbTFJVX0xJU1RdLnRhaWw7IHdhbGtlciAhPT0gbnVsbDspIHtcbiAgICAgIGNvbnN0IHByZXYgPSB3YWxrZXIucHJldlxuICAgICAgZm9yRWFjaFN0ZXAodGhpcywgZm4sIHdhbGtlciwgdGhpc3ApXG4gICAgICB3YWxrZXIgPSBwcmV2XG4gICAgfVxuICB9XG5cbiAgZm9yRWFjaCAoZm4sIHRoaXNwKSB7XG4gICAgdGhpc3AgPSB0aGlzcCB8fCB0aGlzXG4gICAgZm9yIChsZXQgd2Fsa2VyID0gdGhpc1tMUlVfTElTVF0uaGVhZDsgd2Fsa2VyICE9PSBudWxsOykge1xuICAgICAgY29uc3QgbmV4dCA9IHdhbGtlci5uZXh0XG4gICAgICBmb3JFYWNoU3RlcCh0aGlzLCBmbiwgd2Fsa2VyLCB0aGlzcClcbiAgICAgIHdhbGtlciA9IG5leHRcbiAgICB9XG4gIH1cblxuICBrZXlzICgpIHtcbiAgICByZXR1cm4gdGhpc1tMUlVfTElTVF0udG9BcnJheSgpLm1hcChrID0+IGsua2V5KVxuICB9XG5cbiAgdmFsdWVzICgpIHtcbiAgICByZXR1cm4gdGhpc1tMUlVfTElTVF0udG9BcnJheSgpLm1hcChrID0+IGsudmFsdWUpXG4gIH1cblxuICByZXNldCAoKSB7XG4gICAgaWYgKHRoaXNbRElTUE9TRV0gJiZcbiAgICAgICAgdGhpc1tMUlVfTElTVF0gJiZcbiAgICAgICAgdGhpc1tMUlVfTElTVF0ubGVuZ3RoKSB7XG4gICAgICB0aGlzW0xSVV9MSVNUXS5mb3JFYWNoKGhpdCA9PiB0aGlzW0RJU1BPU0VdKGhpdC5rZXksIGhpdC52YWx1ZSkpXG4gICAgfVxuXG4gICAgdGhpc1tDQUNIRV0gPSBuZXcgTWFwKCkgLy8gaGFzaCBvZiBpdGVtcyBieSBrZXlcbiAgICB0aGlzW0xSVV9MSVNUXSA9IG5ldyBZYWxsaXN0KCkgLy8gbGlzdCBvZiBpdGVtcyBpbiBvcmRlciBvZiB1c2UgcmVjZW5jeVxuICAgIHRoaXNbTEVOR1RIXSA9IDAgLy8gbGVuZ3RoIG9mIGl0ZW1zIGluIHRoZSBsaXN0XG4gIH1cblxuICBkdW1wICgpIHtcbiAgICByZXR1cm4gdGhpc1tMUlVfTElTVF0ubWFwKGhpdCA9PlxuICAgICAgaXNTdGFsZSh0aGlzLCBoaXQpID8gZmFsc2UgOiB7XG4gICAgICAgIGs6IGhpdC5rZXksXG4gICAgICAgIHY6IGhpdC52YWx1ZSxcbiAgICAgICAgZTogaGl0Lm5vdyArIChoaXQubWF4QWdlIHx8IDApXG4gICAgICB9KS50b0FycmF5KCkuZmlsdGVyKGggPT4gaClcbiAgfVxuXG4gIGR1bXBMcnUgKCkge1xuICAgIHJldHVybiB0aGlzW0xSVV9MSVNUXVxuICB9XG5cbiAgc2V0IChrZXksIHZhbHVlLCBtYXhBZ2UpIHtcbiAgICBtYXhBZ2UgPSBtYXhBZ2UgfHwgdGhpc1tNQVhfQUdFXVxuXG4gICAgaWYgKG1heEFnZSAmJiB0eXBlb2YgbWF4QWdlICE9PSAnbnVtYmVyJylcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ21heEFnZSBtdXN0IGJlIGEgbnVtYmVyJylcblxuICAgIGNvbnN0IG5vdyA9IG1heEFnZSA/IERhdGUubm93KCkgOiAwXG4gICAgY29uc3QgbGVuID0gdGhpc1tMRU5HVEhfQ0FMQ1VMQVRPUl0odmFsdWUsIGtleSlcblxuICAgIGlmICh0aGlzW0NBQ0hFXS5oYXMoa2V5KSkge1xuICAgICAgaWYgKGxlbiA+IHRoaXNbTUFYXSkge1xuICAgICAgICBkZWwodGhpcywgdGhpc1tDQUNIRV0uZ2V0KGtleSkpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBub2RlID0gdGhpc1tDQUNIRV0uZ2V0KGtleSlcbiAgICAgIGNvbnN0IGl0ZW0gPSBub2RlLnZhbHVlXG5cbiAgICAgIC8vIGRpc3Bvc2Ugb2YgdGhlIG9sZCBvbmUgYmVmb3JlIG92ZXJ3cml0aW5nXG4gICAgICAvLyBzcGxpdCBvdXQgaW50byAyIGlmcyBmb3IgYmV0dGVyIGNvdmVyYWdlIHRyYWNraW5nXG4gICAgICBpZiAodGhpc1tESVNQT1NFXSkge1xuICAgICAgICBpZiAoIXRoaXNbTk9fRElTUE9TRV9PTl9TRVRdKVxuICAgICAgICAgIHRoaXNbRElTUE9TRV0oa2V5LCBpdGVtLnZhbHVlKVxuICAgICAgfVxuXG4gICAgICBpdGVtLm5vdyA9IG5vd1xuICAgICAgaXRlbS5tYXhBZ2UgPSBtYXhBZ2VcbiAgICAgIGl0ZW0udmFsdWUgPSB2YWx1ZVxuICAgICAgdGhpc1tMRU5HVEhdICs9IGxlbiAtIGl0ZW0ubGVuZ3RoXG4gICAgICBpdGVtLmxlbmd0aCA9IGxlblxuICAgICAgdGhpcy5nZXQoa2V5KVxuICAgICAgdHJpbSh0aGlzKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBjb25zdCBoaXQgPSBuZXcgRW50cnkoa2V5LCB2YWx1ZSwgbGVuLCBub3csIG1heEFnZSlcblxuICAgIC8vIG92ZXJzaXplZCBvYmplY3RzIGZhbGwgb3V0IG9mIGNhY2hlIGF1dG9tYXRpY2FsbHkuXG4gICAgaWYgKGhpdC5sZW5ndGggPiB0aGlzW01BWF0pIHtcbiAgICAgIGlmICh0aGlzW0RJU1BPU0VdKVxuICAgICAgICB0aGlzW0RJU1BPU0VdKGtleSwgdmFsdWUpXG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHRoaXNbTEVOR1RIXSArPSBoaXQubGVuZ3RoXG4gICAgdGhpc1tMUlVfTElTVF0udW5zaGlmdChoaXQpXG4gICAgdGhpc1tDQUNIRV0uc2V0KGtleSwgdGhpc1tMUlVfTElTVF0uaGVhZClcbiAgICB0cmltKHRoaXMpXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGhhcyAoa2V5KSB7XG4gICAgaWYgKCF0aGlzW0NBQ0hFXS5oYXMoa2V5KSkgcmV0dXJuIGZhbHNlXG4gICAgY29uc3QgaGl0ID0gdGhpc1tDQUNIRV0uZ2V0KGtleSkudmFsdWVcbiAgICByZXR1cm4gIWlzU3RhbGUodGhpcywgaGl0KVxuICB9XG5cbiAgZ2V0IChrZXkpIHtcbiAgICByZXR1cm4gZ2V0KHRoaXMsIGtleSwgdHJ1ZSlcbiAgfVxuXG4gIHBlZWsgKGtleSkge1xuICAgIHJldHVybiBnZXQodGhpcywga2V5LCBmYWxzZSlcbiAgfVxuXG4gIHBvcCAoKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXNbTFJVX0xJU1RdLnRhaWxcbiAgICBpZiAoIW5vZGUpXG4gICAgICByZXR1cm4gbnVsbFxuXG4gICAgZGVsKHRoaXMsIG5vZGUpXG4gICAgcmV0dXJuIG5vZGUudmFsdWVcbiAgfVxuXG4gIGRlbCAoa2V5KSB7XG4gICAgZGVsKHRoaXMsIHRoaXNbQ0FDSEVdLmdldChrZXkpKVxuICB9XG5cbiAgbG9hZCAoYXJyKSB7XG4gICAgLy8gcmVzZXQgdGhlIGNhY2hlXG4gICAgdGhpcy5yZXNldCgpXG5cbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpXG4gICAgLy8gQSBwcmV2aW91cyBzZXJpYWxpemVkIGNhY2hlIGhhcyB0aGUgbW9zdCByZWNlbnQgaXRlbXMgZmlyc3RcbiAgICBmb3IgKGxldCBsID0gYXJyLmxlbmd0aCAtIDE7IGwgPj0gMDsgbC0tKSB7XG4gICAgICBjb25zdCBoaXQgPSBhcnJbbF1cbiAgICAgIGNvbnN0IGV4cGlyZXNBdCA9IGhpdC5lIHx8IDBcbiAgICAgIGlmIChleHBpcmVzQXQgPT09IDApXG4gICAgICAgIC8vIHRoZSBpdGVtIHdhcyBjcmVhdGVkIHdpdGhvdXQgZXhwaXJhdGlvbiBpbiBhIG5vbiBhZ2VkIGNhY2hlXG4gICAgICAgIHRoaXMuc2V0KGhpdC5rLCBoaXQudilcbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBtYXhBZ2UgPSBleHBpcmVzQXQgLSBub3dcbiAgICAgICAgLy8gZG9udCBhZGQgYWxyZWFkeSBleHBpcmVkIGl0ZW1zXG4gICAgICAgIGlmIChtYXhBZ2UgPiAwKSB7XG4gICAgICAgICAgdGhpcy5zZXQoaGl0LmssIGhpdC52LCBtYXhBZ2UpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcnVuZSAoKSB7XG4gICAgdGhpc1tDQUNIRV0uZm9yRWFjaCgodmFsdWUsIGtleSkgPT4gZ2V0KHRoaXMsIGtleSwgZmFsc2UpKVxuICB9XG59XG5cbmNvbnN0IGdldCA9IChzZWxmLCBrZXksIGRvVXNlKSA9PiB7XG4gIGNvbnN0IG5vZGUgPSBzZWxmW0NBQ0hFXS5nZXQoa2V5KVxuICBpZiAobm9kZSkge1xuICAgIGNvbnN0IGhpdCA9IG5vZGUudmFsdWVcbiAgICBpZiAoaXNTdGFsZShzZWxmLCBoaXQpKSB7XG4gICAgICBkZWwoc2VsZiwgbm9kZSlcbiAgICAgIGlmICghc2VsZltBTExPV19TVEFMRV0pXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRvVXNlKSB7XG4gICAgICAgIGlmIChzZWxmW1VQREFURV9BR0VfT05fR0VUXSlcbiAgICAgICAgICBub2RlLnZhbHVlLm5vdyA9IERhdGUubm93KClcbiAgICAgICAgc2VsZltMUlVfTElTVF0udW5zaGlmdE5vZGUobm9kZSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGhpdC52YWx1ZVxuICB9XG59XG5cbmNvbnN0IGlzU3RhbGUgPSAoc2VsZiwgaGl0KSA9PiB7XG4gIGlmICghaGl0IHx8ICghaGl0Lm1heEFnZSAmJiAhc2VsZltNQVhfQUdFXSkpXG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgY29uc3QgZGlmZiA9IERhdGUubm93KCkgLSBoaXQubm93XG4gIHJldHVybiBoaXQubWF4QWdlID8gZGlmZiA+IGhpdC5tYXhBZ2VcbiAgICA6IHNlbGZbTUFYX0FHRV0gJiYgKGRpZmYgPiBzZWxmW01BWF9BR0VdKVxufVxuXG5jb25zdCB0cmltID0gc2VsZiA9PiB7XG4gIGlmIChzZWxmW0xFTkdUSF0gPiBzZWxmW01BWF0pIHtcbiAgICBmb3IgKGxldCB3YWxrZXIgPSBzZWxmW0xSVV9MSVNUXS50YWlsO1xuICAgICAgc2VsZltMRU5HVEhdID4gc2VsZltNQVhdICYmIHdhbGtlciAhPT0gbnVsbDspIHtcbiAgICAgIC8vIFdlIGtub3cgdGhhdCB3ZSdyZSBhYm91dCB0byBkZWxldGUgdGhpcyBvbmUsIGFuZCBhbHNvXG4gICAgICAvLyB3aGF0IHRoZSBuZXh0IGxlYXN0IHJlY2VudGx5IHVzZWQga2V5IHdpbGwgYmUsIHNvIGp1c3RcbiAgICAgIC8vIGdvIGFoZWFkIGFuZCBzZXQgaXQgbm93LlxuICAgICAgY29uc3QgcHJldiA9IHdhbGtlci5wcmV2XG4gICAgICBkZWwoc2VsZiwgd2Fsa2VyKVxuICAgICAgd2Fsa2VyID0gcHJldlxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBkZWwgPSAoc2VsZiwgbm9kZSkgPT4ge1xuICBpZiAobm9kZSkge1xuICAgIGNvbnN0IGhpdCA9IG5vZGUudmFsdWVcbiAgICBpZiAoc2VsZltESVNQT1NFXSlcbiAgICAgIHNlbGZbRElTUE9TRV0oaGl0LmtleSwgaGl0LnZhbHVlKVxuXG4gICAgc2VsZltMRU5HVEhdIC09IGhpdC5sZW5ndGhcbiAgICBzZWxmW0NBQ0hFXS5kZWxldGUoaGl0LmtleSlcbiAgICBzZWxmW0xSVV9MSVNUXS5yZW1vdmVOb2RlKG5vZGUpXG4gIH1cbn1cblxuY2xhc3MgRW50cnkge1xuICBjb25zdHJ1Y3RvciAoa2V5LCB2YWx1ZSwgbGVuZ3RoLCBub3csIG1heEFnZSkge1xuICAgIHRoaXMua2V5ID0ga2V5XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGhcbiAgICB0aGlzLm5vdyA9IG5vd1xuICAgIHRoaXMubWF4QWdlID0gbWF4QWdlIHx8IDBcbiAgfVxufVxuXG5jb25zdCBmb3JFYWNoU3RlcCA9IChzZWxmLCBmbiwgbm9kZSwgdGhpc3ApID0+IHtcbiAgbGV0IGhpdCA9IG5vZGUudmFsdWVcbiAgaWYgKGlzU3RhbGUoc2VsZiwgaGl0KSkge1xuICAgIGRlbChzZWxmLCBub2RlKVxuICAgIGlmICghc2VsZltBTExPV19TVEFMRV0pXG4gICAgICBoaXQgPSB1bmRlZmluZWRcbiAgfVxuICBpZiAoaGl0KVxuICAgIGZuLmNhbGwodGhpc3AsIGhpdC52YWx1ZSwgaGl0LmtleSwgc2VsZilcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMUlVDYWNoZVxuIiwiY29uc3QgQU5ZID0gU3ltYm9sKCdTZW1WZXIgQU5ZJylcbi8vIGhvaXN0ZWQgY2xhc3MgZm9yIGN5Y2xpYyBkZXBlbmRlbmN5XG5jbGFzcyBDb21wYXJhdG9yIHtcbiAgc3RhdGljIGdldCBBTlkgKCkge1xuICAgIHJldHVybiBBTllcbiAgfVxuXG4gIGNvbnN0cnVjdG9yIChjb21wLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHBhcnNlT3B0aW9ucyhvcHRpb25zKVxuXG4gICAgaWYgKGNvbXAgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSB7XG4gICAgICBpZiAoY29tcC5sb29zZSA9PT0gISFvcHRpb25zLmxvb3NlKSB7XG4gICAgICAgIHJldHVybiBjb21wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wID0gY29tcC52YWx1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbXAgPSBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLmpvaW4oJyAnKVxuICAgIGRlYnVnKCdjb21wYXJhdG9yJywgY29tcCwgb3B0aW9ucylcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgdGhpcy5sb29zZSA9ICEhb3B0aW9ucy5sb29zZVxuICAgIHRoaXMucGFyc2UoY29tcClcblxuICAgIGlmICh0aGlzLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgICB0aGlzLnZhbHVlID0gJydcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMub3BlcmF0b3IgKyB0aGlzLnNlbXZlci52ZXJzaW9uXG4gICAgfVxuXG4gICAgZGVidWcoJ2NvbXAnLCB0aGlzKVxuICB9XG5cbiAgcGFyc2UgKGNvbXApIHtcbiAgICBjb25zdCByID0gdGhpcy5vcHRpb25zLmxvb3NlID8gcmVbdC5DT01QQVJBVE9STE9PU0VdIDogcmVbdC5DT01QQVJBVE9SXVxuICAgIGNvbnN0IG0gPSBjb21wLm1hdGNoKHIpXG5cbiAgICBpZiAoIW0pIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgY29tcGFyYXRvcjogJHtjb21wfWApXG4gICAgfVxuXG4gICAgdGhpcy5vcGVyYXRvciA9IG1bMV0gIT09IHVuZGVmaW5lZCA/IG1bMV0gOiAnJ1xuICAgIGlmICh0aGlzLm9wZXJhdG9yID09PSAnPScpIHtcbiAgICAgIHRoaXMub3BlcmF0b3IgPSAnJ1xuICAgIH1cblxuICAgIC8vIGlmIGl0IGxpdGVyYWxseSBpcyBqdXN0ICc+JyBvciAnJyB0aGVuIGFsbG93IGFueXRoaW5nLlxuICAgIGlmICghbVsyXSkge1xuICAgICAgdGhpcy5zZW12ZXIgPSBBTllcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZW12ZXIgPSBuZXcgU2VtVmVyKG1bMl0sIHRoaXMub3B0aW9ucy5sb29zZSlcbiAgICB9XG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVcbiAgfVxuXG4gIHRlc3QgKHZlcnNpb24pIHtcbiAgICBkZWJ1ZygnQ29tcGFyYXRvci50ZXN0JywgdmVyc2lvbiwgdGhpcy5vcHRpb25zLmxvb3NlKVxuXG4gICAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkgfHwgdmVyc2lvbiA9PT0gQU5ZKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMub3B0aW9ucylcbiAgICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjbXAodmVyc2lvbiwgdGhpcy5vcGVyYXRvciwgdGhpcy5zZW12ZXIsIHRoaXMub3B0aW9ucylcbiAgfVxuXG4gIGludGVyc2VjdHMgKGNvbXAsIG9wdGlvbnMpIHtcbiAgICBpZiAoIShjb21wIGluc3RhbmNlb2YgQ29tcGFyYXRvcikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2EgQ29tcGFyYXRvciBpcyByZXF1aXJlZCcpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3BlcmF0b3IgPT09ICcnKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUmFuZ2UoY29tcC52YWx1ZSwgb3B0aW9ucykudGVzdCh0aGlzLnZhbHVlKVxuICAgIH0gZWxzZSBpZiAoY29tcC5vcGVyYXRvciA9PT0gJycpIHtcbiAgICAgIGlmIChjb21wLnZhbHVlID09PSAnJykge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBSYW5nZSh0aGlzLnZhbHVlLCBvcHRpb25zKS50ZXN0KGNvbXAuc2VtdmVyKVxuICAgIH1cblxuICAgIG9wdGlvbnMgPSBwYXJzZU9wdGlvbnMob3B0aW9ucylcblxuICAgIC8vIFNwZWNpYWwgY2FzZXMgd2hlcmUgbm90aGluZyBjYW4gcG9zc2libHkgYmUgbG93ZXJcbiAgICBpZiAob3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSAmJlxuICAgICAgKHRoaXMudmFsdWUgPT09ICc8MC4wLjAtMCcgfHwgY29tcC52YWx1ZSA9PT0gJzwwLjAuMC0wJykpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgJiZcbiAgICAgICh0aGlzLnZhbHVlLnN0YXJ0c1dpdGgoJzwwLjAuMCcpIHx8IGNvbXAudmFsdWUuc3RhcnRzV2l0aCgnPDAuMC4wJykpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBTYW1lIGRpcmVjdGlvbiBpbmNyZWFzaW5nICg+IG9yID49KVxuICAgIGlmICh0aGlzLm9wZXJhdG9yLnN0YXJ0c1dpdGgoJz4nKSAmJiBjb21wLm9wZXJhdG9yLnN0YXJ0c1dpdGgoJz4nKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgLy8gU2FtZSBkaXJlY3Rpb24gZGVjcmVhc2luZyAoPCBvciA8PSlcbiAgICBpZiAodGhpcy5vcGVyYXRvci5zdGFydHNXaXRoKCc8JykgJiYgY29tcC5vcGVyYXRvci5zdGFydHNXaXRoKCc8JykpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIC8vIHNhbWUgU2VtVmVyIGFuZCBib3RoIHNpZGVzIGFyZSBpbmNsdXNpdmUgKDw9IG9yID49KVxuICAgIGlmIChcbiAgICAgICh0aGlzLnNlbXZlci52ZXJzaW9uID09PSBjb21wLnNlbXZlci52ZXJzaW9uKSAmJlxuICAgICAgdGhpcy5vcGVyYXRvci5pbmNsdWRlcygnPScpICYmIGNvbXAub3BlcmF0b3IuaW5jbHVkZXMoJz0nKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgLy8gb3Bwb3NpdGUgZGlyZWN0aW9ucyBsZXNzIHRoYW5cbiAgICBpZiAoY21wKHRoaXMuc2VtdmVyLCAnPCcsIGNvbXAuc2VtdmVyLCBvcHRpb25zKSAmJlxuICAgICAgdGhpcy5vcGVyYXRvci5zdGFydHNXaXRoKCc+JykgJiYgY29tcC5vcGVyYXRvci5zdGFydHNXaXRoKCc8JykpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIC8vIG9wcG9zaXRlIGRpcmVjdGlvbnMgZ3JlYXRlciB0aGFuXG4gICAgaWYgKGNtcCh0aGlzLnNlbXZlciwgJz4nLCBjb21wLnNlbXZlciwgb3B0aW9ucykgJiZcbiAgICAgIHRoaXMub3BlcmF0b3Iuc3RhcnRzV2l0aCgnPCcpICYmIGNvbXAub3BlcmF0b3Iuc3RhcnRzV2l0aCgnPicpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBhcmF0b3JcblxuY29uc3QgcGFyc2VPcHRpb25zID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcGFyc2Utb3B0aW9ucycpXG5jb25zdCB7IHNhZmVSZTogcmUsIHQgfSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3JlJylcbmNvbnN0IGNtcCA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9jbXAnKVxuY29uc3QgZGVidWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9kZWJ1ZycpXG5jb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuL3NlbXZlcicpXG5jb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4vcmFuZ2UnKVxuIiwiLy8gaG9pc3RlZCBjbGFzcyBmb3IgY3ljbGljIGRlcGVuZGVuY3lcbmNsYXNzIFJhbmdlIHtcbiAgY29uc3RydWN0b3IgKHJhbmdlLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHBhcnNlT3B0aW9ucyhvcHRpb25zKVxuXG4gICAgaWYgKHJhbmdlIGluc3RhbmNlb2YgUmFuZ2UpIHtcbiAgICAgIGlmIChcbiAgICAgICAgcmFuZ2UubG9vc2UgPT09ICEhb3B0aW9ucy5sb29zZSAmJlxuICAgICAgICByYW5nZS5pbmNsdWRlUHJlcmVsZWFzZSA9PT0gISFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHJhbmdlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLnJhdywgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmFuZ2UgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSB7XG4gICAgICAvLyBqdXN0IHB1dCBpdCBpbiB0aGUgc2V0IGFuZCByZXR1cm5cbiAgICAgIHRoaXMucmF3ID0gcmFuZ2UudmFsdWVcbiAgICAgIHRoaXMuc2V0ID0gW1tyYW5nZV1dXG4gICAgICB0aGlzLmZvcm1hdCgpXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmxvb3NlID0gISFvcHRpb25zLmxvb3NlXG4gICAgdGhpcy5pbmNsdWRlUHJlcmVsZWFzZSA9ICEhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZVxuXG4gICAgLy8gRmlyc3QgcmVkdWNlIGFsbCB3aGl0ZXNwYWNlIGFzIG11Y2ggYXMgcG9zc2libGUgc28gd2UgZG8gbm90IGhhdmUgdG8gcmVseVxuICAgIC8vIG9uIHBvdGVudGlhbGx5IHNsb3cgcmVnZXhlcyBsaWtlIFxccyouIFRoaXMgaXMgdGhlbiBzdG9yZWQgYW5kIHVzZWQgZm9yXG4gICAgLy8gZnV0dXJlIGVycm9yIG1lc3NhZ2VzIGFzIHdlbGwuXG4gICAgdGhpcy5yYXcgPSByYW5nZVxuICAgICAgLnRyaW0oKVxuICAgICAgLnNwbGl0KC9cXHMrLylcbiAgICAgIC5qb2luKCcgJylcblxuICAgIC8vIEZpcnN0LCBzcGxpdCBvbiB8fFxuICAgIHRoaXMuc2V0ID0gdGhpcy5yYXdcbiAgICAgIC5zcGxpdCgnfHwnKVxuICAgICAgLy8gbWFwIHRoZSByYW5nZSB0byBhIDJkIGFycmF5IG9mIGNvbXBhcmF0b3JzXG4gICAgICAubWFwKHIgPT4gdGhpcy5wYXJzZVJhbmdlKHIudHJpbSgpKSlcbiAgICAgIC8vIHRocm93IG91dCBhbnkgY29tcGFyYXRvciBsaXN0cyB0aGF0IGFyZSBlbXB0eVxuICAgICAgLy8gdGhpcyBnZW5lcmFsbHkgbWVhbnMgdGhhdCBpdCB3YXMgbm90IGEgdmFsaWQgcmFuZ2UsIHdoaWNoIGlzIGFsbG93ZWRcbiAgICAgIC8vIGluIGxvb3NlIG1vZGUsIGJ1dCB3aWxsIHN0aWxsIHRocm93IGlmIHRoZSBXSE9MRSByYW5nZSBpcyBpbnZhbGlkLlxuICAgICAgLmZpbHRlcihjID0+IGMubGVuZ3RoKVxuXG4gICAgaWYgKCF0aGlzLnNldC5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgU2VtVmVyIFJhbmdlOiAke3RoaXMucmF3fWApXG4gICAgfVxuXG4gICAgLy8gaWYgd2UgaGF2ZSBhbnkgdGhhdCBhcmUgbm90IHRoZSBudWxsIHNldCwgdGhyb3cgb3V0IG51bGwgc2V0cy5cbiAgICBpZiAodGhpcy5zZXQubGVuZ3RoID4gMSkge1xuICAgICAgLy8ga2VlcCB0aGUgZmlyc3Qgb25lLCBpbiBjYXNlIHRoZXkncmUgYWxsIG51bGwgc2V0c1xuICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLnNldFswXVxuICAgICAgdGhpcy5zZXQgPSB0aGlzLnNldC5maWx0ZXIoYyA9PiAhaXNOdWxsU2V0KGNbMF0pKVxuICAgICAgaWYgKHRoaXMuc2V0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLnNldCA9IFtmaXJzdF1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zZXQubGVuZ3RoID4gMSkge1xuICAgICAgICAvLyBpZiB3ZSBoYXZlIGFueSB0aGF0IGFyZSAqLCB0aGVuIHRoZSByYW5nZSBpcyBqdXN0ICpcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIHRoaXMuc2V0KSB7XG4gICAgICAgICAgaWYgKGMubGVuZ3RoID09PSAxICYmIGlzQW55KGNbMF0pKSB7XG4gICAgICAgICAgICB0aGlzLnNldCA9IFtjXVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZvcm1hdCgpXG4gIH1cblxuICBmb3JtYXQgKCkge1xuICAgIHRoaXMucmFuZ2UgPSB0aGlzLnNldFxuICAgICAgLm1hcCgoY29tcHMpID0+IGNvbXBzLmpvaW4oJyAnKS50cmltKCkpXG4gICAgICAuam9pbignfHwnKVxuICAgICAgLnRyaW0oKVxuICAgIHJldHVybiB0aGlzLnJhbmdlXG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmFuZ2VcbiAgfVxuXG4gIHBhcnNlUmFuZ2UgKHJhbmdlKSB7XG4gICAgLy8gbWVtb2l6ZSByYW5nZSBwYXJzaW5nIGZvciBwZXJmb3JtYW5jZS5cbiAgICAvLyB0aGlzIGlzIGEgdmVyeSBob3QgcGF0aCwgYW5kIGZ1bGx5IGRldGVybWluaXN0aWMuXG4gICAgY29uc3QgbWVtb09wdHMgPVxuICAgICAgKHRoaXMub3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSAmJiBGTEFHX0lOQ0xVREVfUFJFUkVMRUFTRSkgfFxuICAgICAgKHRoaXMub3B0aW9ucy5sb29zZSAmJiBGTEFHX0xPT1NFKVxuICAgIGNvbnN0IG1lbW9LZXkgPSBtZW1vT3B0cyArICc6JyArIHJhbmdlXG4gICAgY29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KG1lbW9LZXkpXG4gICAgaWYgKGNhY2hlZCkge1xuICAgICAgcmV0dXJuIGNhY2hlZFxuICAgIH1cblxuICAgIGNvbnN0IGxvb3NlID0gdGhpcy5vcHRpb25zLmxvb3NlXG4gICAgLy8gYDEuMi4zIC0gMS4yLjRgID0+IGA+PTEuMi4zIDw9MS4yLjRgXG4gICAgY29uc3QgaHIgPSBsb29zZSA/IHJlW3QuSFlQSEVOUkFOR0VMT09TRV0gOiByZVt0LkhZUEhFTlJBTkdFXVxuICAgIHJhbmdlID0gcmFuZ2UucmVwbGFjZShociwgaHlwaGVuUmVwbGFjZSh0aGlzLm9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpKVxuICAgIGRlYnVnKCdoeXBoZW4gcmVwbGFjZScsIHJhbmdlKVxuXG4gICAgLy8gYD4gMS4yLjMgPCAxLjIuNWAgPT4gYD4xLjIuMyA8MS4yLjVgXG4gICAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW3QuQ09NUEFSQVRPUlRSSU1dLCBjb21wYXJhdG9yVHJpbVJlcGxhY2UpXG4gICAgZGVidWcoJ2NvbXBhcmF0b3IgdHJpbScsIHJhbmdlKVxuXG4gICAgLy8gYH4gMS4yLjNgID0+IGB+MS4yLjNgXG4gICAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW3QuVElMREVUUklNXSwgdGlsZGVUcmltUmVwbGFjZSlcbiAgICBkZWJ1ZygndGlsZGUgdHJpbScsIHJhbmdlKVxuXG4gICAgLy8gYF4gMS4yLjNgID0+IGBeMS4yLjNgXG4gICAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW3QuQ0FSRVRUUklNXSwgY2FyZXRUcmltUmVwbGFjZSlcbiAgICBkZWJ1ZygnY2FyZXQgdHJpbScsIHJhbmdlKVxuXG4gICAgLy8gQXQgdGhpcyBwb2ludCwgdGhlIHJhbmdlIGlzIGNvbXBsZXRlbHkgdHJpbW1lZCBhbmRcbiAgICAvLyByZWFkeSB0byBiZSBzcGxpdCBpbnRvIGNvbXBhcmF0b3JzLlxuXG4gICAgbGV0IHJhbmdlTGlzdCA9IHJhbmdlXG4gICAgICAuc3BsaXQoJyAnKVxuICAgICAgLm1hcChjb21wID0+IHBhcnNlQ29tcGFyYXRvcihjb21wLCB0aGlzLm9wdGlvbnMpKVxuICAgICAgLmpvaW4oJyAnKVxuICAgICAgLnNwbGl0KC9cXHMrLylcbiAgICAgIC8vID49MC4wLjAgaXMgZXF1aXZhbGVudCB0byAqXG4gICAgICAubWFwKGNvbXAgPT4gcmVwbGFjZUdURTAoY29tcCwgdGhpcy5vcHRpb25zKSlcblxuICAgIGlmIChsb29zZSkge1xuICAgICAgLy8gaW4gbG9vc2UgbW9kZSwgdGhyb3cgb3V0IGFueSB0aGF0IGFyZSBub3QgdmFsaWQgY29tcGFyYXRvcnNcbiAgICAgIHJhbmdlTGlzdCA9IHJhbmdlTGlzdC5maWx0ZXIoY29tcCA9PiB7XG4gICAgICAgIGRlYnVnKCdsb29zZSBpbnZhbGlkIGZpbHRlcicsIGNvbXAsIHRoaXMub3B0aW9ucylcbiAgICAgICAgcmV0dXJuICEhY29tcC5tYXRjaChyZVt0LkNPTVBBUkFUT1JMT09TRV0pXG4gICAgICB9KVxuICAgIH1cbiAgICBkZWJ1ZygncmFuZ2UgbGlzdCcsIHJhbmdlTGlzdClcblxuICAgIC8vIGlmIGFueSBjb21wYXJhdG9ycyBhcmUgdGhlIG51bGwgc2V0LCB0aGVuIHJlcGxhY2Ugd2l0aCBKVVNUIG51bGwgc2V0XG4gICAgLy8gaWYgbW9yZSB0aGFuIG9uZSBjb21wYXJhdG9yLCByZW1vdmUgYW55ICogY29tcGFyYXRvcnNcbiAgICAvLyBhbHNvLCBkb24ndCBpbmNsdWRlIHRoZSBzYW1lIGNvbXBhcmF0b3IgbW9yZSB0aGFuIG9uY2VcbiAgICBjb25zdCByYW5nZU1hcCA9IG5ldyBNYXAoKVxuICAgIGNvbnN0IGNvbXBhcmF0b3JzID0gcmFuZ2VMaXN0Lm1hcChjb21wID0+IG5ldyBDb21wYXJhdG9yKGNvbXAsIHRoaXMub3B0aW9ucykpXG4gICAgZm9yIChjb25zdCBjb21wIG9mIGNvbXBhcmF0b3JzKSB7XG4gICAgICBpZiAoaXNOdWxsU2V0KGNvbXApKSB7XG4gICAgICAgIHJldHVybiBbY29tcF1cbiAgICAgIH1cbiAgICAgIHJhbmdlTWFwLnNldChjb21wLnZhbHVlLCBjb21wKVxuICAgIH1cbiAgICBpZiAocmFuZ2VNYXAuc2l6ZSA+IDEgJiYgcmFuZ2VNYXAuaGFzKCcnKSkge1xuICAgICAgcmFuZ2VNYXAuZGVsZXRlKCcnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IFsuLi5yYW5nZU1hcC52YWx1ZXMoKV1cbiAgICBjYWNoZS5zZXQobWVtb0tleSwgcmVzdWx0KVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGludGVyc2VjdHMgKHJhbmdlLCBvcHRpb25zKSB7XG4gICAgaWYgKCEocmFuZ2UgaW5zdGFuY2VvZiBSYW5nZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2EgUmFuZ2UgaXMgcmVxdWlyZWQnKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNldC5zb21lKCh0aGlzQ29tcGFyYXRvcnMpID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGlzU2F0aXNmaWFibGUodGhpc0NvbXBhcmF0b3JzLCBvcHRpb25zKSAmJlxuICAgICAgICByYW5nZS5zZXQuc29tZSgocmFuZ2VDb21wYXJhdG9ycykgPT4ge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBpc1NhdGlzZmlhYmxlKHJhbmdlQ29tcGFyYXRvcnMsIG9wdGlvbnMpICYmXG4gICAgICAgICAgICB0aGlzQ29tcGFyYXRvcnMuZXZlcnkoKHRoaXNDb21wYXJhdG9yKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiByYW5nZUNvbXBhcmF0b3JzLmV2ZXJ5KChyYW5nZUNvbXBhcmF0b3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc0NvbXBhcmF0b3IuaW50ZXJzZWN0cyhyYW5nZUNvbXBhcmF0b3IsIG9wdGlvbnMpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICB9KVxuICB9XG5cbiAgLy8gaWYgQU5ZIG9mIHRoZSBzZXRzIG1hdGNoIEFMTCBvZiBpdHMgY29tcGFyYXRvcnMsIHRoZW4gcGFzc1xuICB0ZXN0ICh2ZXJzaW9uKSB7XG4gICAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCB0aGlzLm9wdGlvbnMpXG4gICAgICB9IGNhdGNoIChlcikge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGVzdFNldCh0aGlzLnNldFtpXSwgdmVyc2lvbiwgdGhpcy5vcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJhbmdlXG5cbmNvbnN0IExSVSA9IHJlcXVpcmUoJ2xydS1jYWNoZScpXG5jb25zdCBjYWNoZSA9IG5ldyBMUlUoeyBtYXg6IDEwMDAgfSlcblxuY29uc3QgcGFyc2VPcHRpb25zID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcGFyc2Utb3B0aW9ucycpXG5jb25zdCBDb21wYXJhdG9yID0gcmVxdWlyZSgnLi9jb21wYXJhdG9yJylcbmNvbnN0IGRlYnVnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZGVidWcnKVxuY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi9zZW12ZXInKVxuY29uc3Qge1xuICBzYWZlUmU6IHJlLFxuICB0LFxuICBjb21wYXJhdG9yVHJpbVJlcGxhY2UsXG4gIHRpbGRlVHJpbVJlcGxhY2UsXG4gIGNhcmV0VHJpbVJlcGxhY2UsXG59ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcmUnKVxuY29uc3QgeyBGTEFHX0lOQ0xVREVfUFJFUkVMRUFTRSwgRkxBR19MT09TRSB9ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvY29uc3RhbnRzJylcblxuY29uc3QgaXNOdWxsU2V0ID0gYyA9PiBjLnZhbHVlID09PSAnPDAuMC4wLTAnXG5jb25zdCBpc0FueSA9IGMgPT4gYy52YWx1ZSA9PT0gJydcblxuLy8gdGFrZSBhIHNldCBvZiBjb21wYXJhdG9ycyBhbmQgZGV0ZXJtaW5lIHdoZXRoZXIgdGhlcmVcbi8vIGV4aXN0cyBhIHZlcnNpb24gd2hpY2ggY2FuIHNhdGlzZnkgaXRcbmNvbnN0IGlzU2F0aXNmaWFibGUgPSAoY29tcGFyYXRvcnMsIG9wdGlvbnMpID0+IHtcbiAgbGV0IHJlc3VsdCA9IHRydWVcbiAgY29uc3QgcmVtYWluaW5nQ29tcGFyYXRvcnMgPSBjb21wYXJhdG9ycy5zbGljZSgpXG4gIGxldCB0ZXN0Q29tcGFyYXRvciA9IHJlbWFpbmluZ0NvbXBhcmF0b3JzLnBvcCgpXG5cbiAgd2hpbGUgKHJlc3VsdCAmJiByZW1haW5pbmdDb21wYXJhdG9ycy5sZW5ndGgpIHtcbiAgICByZXN1bHQgPSByZW1haW5pbmdDb21wYXJhdG9ycy5ldmVyeSgob3RoZXJDb21wYXJhdG9yKSA9PiB7XG4gICAgICByZXR1cm4gdGVzdENvbXBhcmF0b3IuaW50ZXJzZWN0cyhvdGhlckNvbXBhcmF0b3IsIG9wdGlvbnMpXG4gICAgfSlcblxuICAgIHRlc3RDb21wYXJhdG9yID0gcmVtYWluaW5nQ29tcGFyYXRvcnMucG9wKClcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLy8gY29tcHJpc2VkIG9mIHhyYW5nZXMsIHRpbGRlcywgc3RhcnMsIGFuZCBndGx0J3MgYXQgdGhpcyBwb2ludC5cbi8vIGFscmVhZHkgcmVwbGFjZWQgdGhlIGh5cGhlbiByYW5nZXNcbi8vIHR1cm4gaW50byBhIHNldCBvZiBKVVNUIGNvbXBhcmF0b3JzLlxuY29uc3QgcGFyc2VDb21wYXJhdG9yID0gKGNvbXAsIG9wdGlvbnMpID0+IHtcbiAgZGVidWcoJ2NvbXAnLCBjb21wLCBvcHRpb25zKVxuICBjb21wID0gcmVwbGFjZUNhcmV0cyhjb21wLCBvcHRpb25zKVxuICBkZWJ1ZygnY2FyZXQnLCBjb21wKVxuICBjb21wID0gcmVwbGFjZVRpbGRlcyhjb21wLCBvcHRpb25zKVxuICBkZWJ1ZygndGlsZGVzJywgY29tcClcbiAgY29tcCA9IHJlcGxhY2VYUmFuZ2VzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCd4cmFuZ2UnLCBjb21wKVxuICBjb21wID0gcmVwbGFjZVN0YXJzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCdzdGFycycsIGNvbXApXG4gIHJldHVybiBjb21wXG59XG5cbmNvbnN0IGlzWCA9IGlkID0+ICFpZCB8fCBpZC50b0xvd2VyQ2FzZSgpID09PSAneCcgfHwgaWQgPT09ICcqJ1xuXG4vLyB+LCB+PiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIH4yLCB+Mi54LCB+Mi54LngsIH4+Miwgfj4yLnggfj4yLngueCAtLT4gPj0yLjAuMCA8My4wLjAtMFxuLy8gfjIuMCwgfjIuMC54LCB+PjIuMCwgfj4yLjAueCAtLT4gPj0yLjAuMCA8Mi4xLjAtMFxuLy8gfjEuMiwgfjEuMi54LCB+PjEuMiwgfj4xLjIueCAtLT4gPj0xLjIuMCA8MS4zLjAtMFxuLy8gfjEuMi4zLCB+PjEuMi4zIC0tPiA+PTEuMi4zIDwxLjMuMC0wXG4vLyB+MS4yLjAsIH4+MS4yLjAgLS0+ID49MS4yLjAgPDEuMy4wLTBcbi8vIH4wLjAuMSAtLT4gPj0wLjAuMSA8MC4xLjAtMFxuY29uc3QgcmVwbGFjZVRpbGRlcyA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIHJldHVybiBjb21wXG4gICAgLnRyaW0oKVxuICAgIC5zcGxpdCgvXFxzKy8pXG4gICAgLm1hcCgoYykgPT4gcmVwbGFjZVRpbGRlKGMsIG9wdGlvbnMpKVxuICAgIC5qb2luKCcgJylcbn1cblxuY29uc3QgcmVwbGFjZVRpbGRlID0gKGNvbXAsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgciA9IG9wdGlvbnMubG9vc2UgPyByZVt0LlRJTERFTE9PU0VdIDogcmVbdC5USUxERV1cbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCAoXywgTSwgbSwgcCwgcHIpID0+IHtcbiAgICBkZWJ1ZygndGlsZGUnLCBjb21wLCBfLCBNLCBtLCBwLCBwcilcbiAgICBsZXQgcmV0XG5cbiAgICBpZiAoaXNYKE0pKSB7XG4gICAgICByZXQgPSAnJ1xuICAgIH0gZWxzZSBpZiAoaXNYKG0pKSB7XG4gICAgICByZXQgPSBgPj0ke019LjAuMCA8JHsrTSArIDF9LjAuMC0wYFxuICAgIH0gZWxzZSBpZiAoaXNYKHApKSB7XG4gICAgICAvLyB+MS4yID09ID49MS4yLjAgPDEuMy4wLTBcbiAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4wIDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgfSBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VUaWxkZSBwcicsIHByKVxuICAgICAgcmV0ID0gYD49JHtNfS4ke219LiR7cH0tJHtwclxuICAgICAgfSA8JHtNfS4keyttICsgMX0uMC0wYFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB+MS4yLjMgPT0gPj0xLjIuMyA8MS4zLjAtMFxuICAgICAgcmV0ID0gYD49JHtNfS4ke219LiR7cFxuICAgICAgfSA8JHtNfS4keyttICsgMX0uMC0wYFxuICAgIH1cblxuICAgIGRlYnVnKCd0aWxkZSByZXR1cm4nLCByZXQpXG4gICAgcmV0dXJuIHJldFxuICB9KVxufVxuXG4vLyBeIC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gXjIsIF4yLngsIF4yLngueCAtLT4gPj0yLjAuMCA8My4wLjAtMFxuLy8gXjIuMCwgXjIuMC54IC0tPiA+PTIuMC4wIDwzLjAuMC0wXG4vLyBeMS4yLCBeMS4yLnggLS0+ID49MS4yLjAgPDIuMC4wLTBcbi8vIF4xLjIuMyAtLT4gPj0xLjIuMyA8Mi4wLjAtMFxuLy8gXjEuMi4wIC0tPiA+PTEuMi4wIDwyLjAuMC0wXG4vLyBeMC4wLjEgLS0+ID49MC4wLjEgPDAuMC4yLTBcbi8vIF4wLjEuMCAtLT4gPj0wLjEuMCA8MC4yLjAtMFxuY29uc3QgcmVwbGFjZUNhcmV0cyA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIHJldHVybiBjb21wXG4gICAgLnRyaW0oKVxuICAgIC5zcGxpdCgvXFxzKy8pXG4gICAgLm1hcCgoYykgPT4gcmVwbGFjZUNhcmV0KGMsIG9wdGlvbnMpKVxuICAgIC5qb2luKCcgJylcbn1cblxuY29uc3QgcmVwbGFjZUNhcmV0ID0gKGNvbXAsIG9wdGlvbnMpID0+IHtcbiAgZGVidWcoJ2NhcmV0JywgY29tcCwgb3B0aW9ucylcbiAgY29uc3QgciA9IG9wdGlvbnMubG9vc2UgPyByZVt0LkNBUkVUTE9PU0VdIDogcmVbdC5DQVJFVF1cbiAgY29uc3QgeiA9IG9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgPyAnLTAnIDogJydcbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCAoXywgTSwgbSwgcCwgcHIpID0+IHtcbiAgICBkZWJ1ZygnY2FyZXQnLCBjb21wLCBfLCBNLCBtLCBwLCBwcilcbiAgICBsZXQgcmV0XG5cbiAgICBpZiAoaXNYKE0pKSB7XG4gICAgICByZXQgPSAnJ1xuICAgIH0gZWxzZSBpZiAoaXNYKG0pKSB7XG4gICAgICByZXQgPSBgPj0ke019LjAuMCR7en0gPCR7K00gKyAxfS4wLjAtMGBcbiAgICB9IGVsc2UgaWYgKGlzWChwKSkge1xuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uMCR7en0gPCR7TX0uJHsrbSArIDF9LjAtMGBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4wJHt6fSA8JHsrTSArIDF9LjAuMC0wYFxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocHIpIHtcbiAgICAgIGRlYnVnKCdyZXBsYWNlQ2FyZXQgcHInLCBwcilcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgaWYgKG0gPT09ICcwJykge1xuICAgICAgICAgIHJldCA9IGA+PSR7TX0uJHttfS4ke3B9LSR7cHJcbiAgICAgICAgICB9IDwke019LiR7bX0uJHsrcCArIDF9LTBgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LiR7cH0tJHtwclxuICAgICAgICAgIH0gPCR7TX0uJHsrbSArIDF9LjAtMGBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LiR7cH0tJHtwclxuICAgICAgICB9IDwkeytNICsgMX0uMC4wLTBgXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnKCdubyBwcicpXG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIGlmIChtID09PSAnMCcpIHtcbiAgICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwXG4gICAgICAgICAgfSR7en0gPCR7TX0uJHttfS4keytwICsgMX0tMGBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXQgPSBgPj0ke019LiR7bX0uJHtwXG4gICAgICAgICAgfSR7en0gPCR7TX0uJHsrbSArIDF9LjAtMGBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gYD49JHtNfS4ke219LiR7cFxuICAgICAgICB9IDwkeytNICsgMX0uMC4wLTBgXG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVidWcoJ2NhcmV0IHJldHVybicsIHJldClcbiAgICByZXR1cm4gcmV0XG4gIH0pXG59XG5cbmNvbnN0IHJlcGxhY2VYUmFuZ2VzID0gKGNvbXAsIG9wdGlvbnMpID0+IHtcbiAgZGVidWcoJ3JlcGxhY2VYUmFuZ2VzJywgY29tcCwgb3B0aW9ucylcbiAgcmV0dXJuIGNvbXBcbiAgICAuc3BsaXQoL1xccysvKVxuICAgIC5tYXAoKGMpID0+IHJlcGxhY2VYUmFuZ2UoYywgb3B0aW9ucykpXG4gICAgLmpvaW4oJyAnKVxufVxuXG5jb25zdCByZXBsYWNlWFJhbmdlID0gKGNvbXAsIG9wdGlvbnMpID0+IHtcbiAgY29tcCA9IGNvbXAudHJpbSgpXG4gIGNvbnN0IHIgPSBvcHRpb25zLmxvb3NlID8gcmVbdC5YUkFOR0VMT09TRV0gOiByZVt0LlhSQU5HRV1cbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCAocmV0LCBndGx0LCBNLCBtLCBwLCBwcikgPT4ge1xuICAgIGRlYnVnKCd4UmFuZ2UnLCBjb21wLCByZXQsIGd0bHQsIE0sIG0sIHAsIHByKVxuICAgIGNvbnN0IHhNID0gaXNYKE0pXG4gICAgY29uc3QgeG0gPSB4TSB8fCBpc1gobSlcbiAgICBjb25zdCB4cCA9IHhtIHx8IGlzWChwKVxuICAgIGNvbnN0IGFueVggPSB4cFxuXG4gICAgaWYgKGd0bHQgPT09ICc9JyAmJiBhbnlYKSB7XG4gICAgICBndGx0ID0gJydcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSdyZSBpbmNsdWRpbmcgcHJlcmVsZWFzZXMgaW4gdGhlIG1hdGNoLCB0aGVuIHdlIG5lZWRcbiAgICAvLyB0byBmaXggdGhpcyB0byAtMCwgdGhlIGxvd2VzdCBwb3NzaWJsZSBwcmVyZWxlYXNlIHZhbHVlXG4gICAgcHIgPSBvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlID8gJy0wJyA6ICcnXG5cbiAgICBpZiAoeE0pIHtcbiAgICAgIGlmIChndGx0ID09PSAnPicgfHwgZ3RsdCA9PT0gJzwnKSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgYWxsb3dlZFxuICAgICAgICByZXQgPSAnPDAuMC4wLTAnXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBub3RoaW5nIGlzIGZvcmJpZGRlblxuICAgICAgICByZXQgPSAnKidcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGd0bHQgJiYgYW55WCkge1xuICAgICAgLy8gd2Uga25vdyBwYXRjaCBpcyBhbiB4LCBiZWNhdXNlIHdlIGhhdmUgYW55IHggYXQgYWxsLlxuICAgICAgLy8gcmVwbGFjZSBYIHdpdGggMFxuICAgICAgaWYgKHhtKSB7XG4gICAgICAgIG0gPSAwXG4gICAgICB9XG4gICAgICBwID0gMFxuXG4gICAgICBpZiAoZ3RsdCA9PT0gJz4nKSB7XG4gICAgICAgIC8vID4xID0+ID49Mi4wLjBcbiAgICAgICAgLy8gPjEuMiA9PiA+PTEuMy4wXG4gICAgICAgIGd0bHQgPSAnPj0nXG4gICAgICAgIGlmICh4bSkge1xuICAgICAgICAgIE0gPSArTSArIDFcbiAgICAgICAgICBtID0gMFxuICAgICAgICAgIHAgPSAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbSA9ICttICsgMVxuICAgICAgICAgIHAgPSAwXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZ3RsdCA9PT0gJzw9Jykge1xuICAgICAgICAvLyA8PTAuNy54IGlzIGFjdHVhbGx5IDwwLjguMCwgc2luY2UgYW55IDAuNy54IHNob3VsZFxuICAgICAgICAvLyBwYXNzLiAgU2ltaWxhcmx5LCA8PTcueCBpcyBhY3R1YWxseSA8OC4wLjAsIGV0Yy5cbiAgICAgICAgZ3RsdCA9ICc8J1xuICAgICAgICBpZiAoeG0pIHtcbiAgICAgICAgICBNID0gK00gKyAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbSA9ICttICsgMVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChndGx0ID09PSAnPCcpIHtcbiAgICAgICAgcHIgPSAnLTAnXG4gICAgICB9XG5cbiAgICAgIHJldCA9IGAke2d0bHQgKyBNfS4ke219LiR7cH0ke3ByfWBcbiAgICB9IGVsc2UgaWYgKHhtKSB7XG4gICAgICByZXQgPSBgPj0ke019LjAuMCR7cHJ9IDwkeytNICsgMX0uMC4wLTBgXG4gICAgfSBlbHNlIGlmICh4cCkge1xuICAgICAgcmV0ID0gYD49JHtNfS4ke219LjAke3ByXG4gICAgICB9IDwke019LiR7K20gKyAxfS4wLTBgXG4gICAgfVxuXG4gICAgZGVidWcoJ3hSYW5nZSByZXR1cm4nLCByZXQpXG5cbiAgICByZXR1cm4gcmV0XG4gIH0pXG59XG5cbi8vIEJlY2F1c2UgKiBpcyBBTkQtZWQgd2l0aCBldmVyeXRoaW5nIGVsc2UgaW4gdGhlIGNvbXBhcmF0b3IsXG4vLyBhbmQgJycgbWVhbnMgXCJhbnkgdmVyc2lvblwiLCBqdXN0IHJlbW92ZSB0aGUgKnMgZW50aXJlbHkuXG5jb25zdCByZXBsYWNlU3RhcnMgPSAoY29tcCwgb3B0aW9ucykgPT4ge1xuICBkZWJ1ZygncmVwbGFjZVN0YXJzJywgY29tcCwgb3B0aW9ucylcbiAgLy8gTG9vc2VuZXNzIGlzIGlnbm9yZWQgaGVyZS4gIHN0YXIgaXMgYWx3YXlzIGFzIGxvb3NlIGFzIGl0IGdldHMhXG4gIHJldHVybiBjb21wXG4gICAgLnRyaW0oKVxuICAgIC5yZXBsYWNlKHJlW3QuU1RBUl0sICcnKVxufVxuXG5jb25zdCByZXBsYWNlR1RFMCA9IChjb21wLCBvcHRpb25zKSA9PiB7XG4gIGRlYnVnKCdyZXBsYWNlR1RFMCcsIGNvbXAsIG9wdGlvbnMpXG4gIHJldHVybiBjb21wXG4gICAgLnRyaW0oKVxuICAgIC5yZXBsYWNlKHJlW29wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgPyB0LkdURTBQUkUgOiB0LkdURTBdLCAnJylcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBwYXNzZWQgdG8gc3RyaW5nLnJlcGxhY2UocmVbdC5IWVBIRU5SQU5HRV0pXG4vLyBNLCBtLCBwYXRjaCwgcHJlcmVsZWFzZSwgYnVpbGRcbi8vIDEuMiAtIDMuNC41ID0+ID49MS4yLjAgPD0zLjQuNVxuLy8gMS4yLjMgLSAzLjQgPT4gPj0xLjIuMCA8My41LjAtMCBBbnkgMy40Lnggd2lsbCBkb1xuLy8gMS4yIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wLTBcbmNvbnN0IGh5cGhlblJlcGxhY2UgPSBpbmNQciA9PiAoJDAsXG4gIGZyb20sIGZNLCBmbSwgZnAsIGZwciwgZmIsXG4gIHRvLCB0TSwgdG0sIHRwLCB0cHIsIHRiKSA9PiB7XG4gIGlmIChpc1goZk0pKSB7XG4gICAgZnJvbSA9ICcnXG4gIH0gZWxzZSBpZiAoaXNYKGZtKSkge1xuICAgIGZyb20gPSBgPj0ke2ZNfS4wLjAke2luY1ByID8gJy0wJyA6ICcnfWBcbiAgfSBlbHNlIGlmIChpc1goZnApKSB7XG4gICAgZnJvbSA9IGA+PSR7Zk19LiR7Zm19LjAke2luY1ByID8gJy0wJyA6ICcnfWBcbiAgfSBlbHNlIGlmIChmcHIpIHtcbiAgICBmcm9tID0gYD49JHtmcm9tfWBcbiAgfSBlbHNlIHtcbiAgICBmcm9tID0gYD49JHtmcm9tfSR7aW5jUHIgPyAnLTAnIDogJyd9YFxuICB9XG5cbiAgaWYgKGlzWCh0TSkpIHtcbiAgICB0byA9ICcnXG4gIH0gZWxzZSBpZiAoaXNYKHRtKSkge1xuICAgIHRvID0gYDwkeyt0TSArIDF9LjAuMC0wYFxuICB9IGVsc2UgaWYgKGlzWCh0cCkpIHtcbiAgICB0byA9IGA8JHt0TX0uJHsrdG0gKyAxfS4wLTBgXG4gIH0gZWxzZSBpZiAodHByKSB7XG4gICAgdG8gPSBgPD0ke3RNfS4ke3RtfS4ke3RwfS0ke3Rwcn1gXG4gIH0gZWxzZSBpZiAoaW5jUHIpIHtcbiAgICB0byA9IGA8JHt0TX0uJHt0bX0uJHsrdHAgKyAxfS0wYFxuICB9IGVsc2Uge1xuICAgIHRvID0gYDw9JHt0b31gXG4gIH1cblxuICByZXR1cm4gYCR7ZnJvbX0gJHt0b31gLnRyaW0oKVxufVxuXG5jb25zdCB0ZXN0U2V0ID0gKHNldCwgdmVyc2lvbiwgb3B0aW9ucykgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xuICAgIGlmICghc2V0W2ldLnRlc3QodmVyc2lvbikpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmICh2ZXJzaW9uLnByZXJlbGVhc2UubGVuZ3RoICYmICFvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlKSB7XG4gICAgLy8gRmluZCB0aGUgc2V0IG9mIHZlcnNpb25zIHRoYXQgYXJlIGFsbG93ZWQgdG8gaGF2ZSBwcmVyZWxlYXNlc1xuICAgIC8vIEZvciBleGFtcGxlLCBeMS4yLjMtcHIuMSBkZXN1Z2FycyB0byA+PTEuMi4zLXByLjEgPDIuMC4wXG4gICAgLy8gVGhhdCBzaG91bGQgYWxsb3cgYDEuMi4zLXByLjJgIHRvIHBhc3MuXG4gICAgLy8gSG93ZXZlciwgYDEuMi40LWFscGhhLm5vdHJlYWR5YCBzaG91bGQgTk9UIGJlIGFsbG93ZWQsXG4gICAgLy8gZXZlbiB0aG91Z2ggaXQncyB3aXRoaW4gdGhlIHJhbmdlIHNldCBieSB0aGUgY29tcGFyYXRvcnMuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlYnVnKHNldFtpXS5zZW12ZXIpXG4gICAgICBpZiAoc2V0W2ldLnNlbXZlciA9PT0gQ29tcGFyYXRvci5BTlkpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgaWYgKHNldFtpXS5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGFsbG93ZWQgPSBzZXRbaV0uc2VtdmVyXG4gICAgICAgIGlmIChhbGxvd2VkLm1ham9yID09PSB2ZXJzaW9uLm1ham9yICYmXG4gICAgICAgICAgICBhbGxvd2VkLm1pbm9yID09PSB2ZXJzaW9uLm1pbm9yICYmXG4gICAgICAgICAgICBhbGxvd2VkLnBhdGNoID09PSB2ZXJzaW9uLnBhdGNoKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFZlcnNpb24gaGFzIGEgLXByZSwgYnV0IGl0J3Mgbm90IG9uZSBvZiB0aGUgb25lcyB3ZSBsaWtlLlxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cbiIsImNvbnN0IGRlYnVnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvZGVidWcnKVxuY29uc3QgeyBNQVhfTEVOR1RILCBNQVhfU0FGRV9JTlRFR0VSIH0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9jb25zdGFudHMnKVxuY29uc3QgeyBzYWZlUmU6IHJlLCB0IH0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbC9yZScpXG5cbmNvbnN0IHBhcnNlT3B0aW9ucyA9IHJlcXVpcmUoJy4uL2ludGVybmFsL3BhcnNlLW9wdGlvbnMnKVxuY29uc3QgeyBjb21wYXJlSWRlbnRpZmllcnMgfSA9IHJlcXVpcmUoJy4uL2ludGVybmFsL2lkZW50aWZpZXJzJylcbmNsYXNzIFNlbVZlciB7XG4gIGNvbnN0cnVjdG9yICh2ZXJzaW9uLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHBhcnNlT3B0aW9ucyhvcHRpb25zKVxuXG4gICAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpIHtcbiAgICAgIGlmICh2ZXJzaW9uLmxvb3NlID09PSAhIW9wdGlvbnMubG9vc2UgJiZcbiAgICAgICAgICB2ZXJzaW9uLmluY2x1ZGVQcmVyZWxlYXNlID09PSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpIHtcbiAgICAgICAgcmV0dXJuIHZlcnNpb25cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnZlcnNpb25cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCB2ZXJzaW9uLiBNdXN0IGJlIGEgc3RyaW5nLiBHb3QgdHlwZSBcIiR7dHlwZW9mIHZlcnNpb259XCIuYClcbiAgICB9XG5cbiAgICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICBgdmVyc2lvbiBpcyBsb25nZXIgdGhhbiAke01BWF9MRU5HVEh9IGNoYXJhY3RlcnNgXG4gICAgICApXG4gICAgfVxuXG4gICAgZGVidWcoJ1NlbVZlcicsIHZlcnNpb24sIG9wdGlvbnMpXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICAgIHRoaXMubG9vc2UgPSAhIW9wdGlvbnMubG9vc2VcbiAgICAvLyB0aGlzIGlzbid0IGFjdHVhbGx5IHJlbGV2YW50IGZvciB2ZXJzaW9ucywgYnV0IGtlZXAgaXQgc28gdGhhdCB3ZVxuICAgIC8vIGRvbid0IHJ1biBpbnRvIHRyb3VibGUgcGFzc2luZyB0aGlzLm9wdGlvbnMgYXJvdW5kLlxuICAgIHRoaXMuaW5jbHVkZVByZXJlbGVhc2UgPSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2VcblxuICAgIGNvbnN0IG0gPSB2ZXJzaW9uLnRyaW0oKS5tYXRjaChvcHRpb25zLmxvb3NlID8gcmVbdC5MT09TRV0gOiByZVt0LkZVTExdKVxuXG4gICAgaWYgKCFtKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIFZlcnNpb246ICR7dmVyc2lvbn1gKVxuICAgIH1cblxuICAgIHRoaXMucmF3ID0gdmVyc2lvblxuXG4gICAgLy8gdGhlc2UgYXJlIGFjdHVhbGx5IG51bWJlcnNcbiAgICB0aGlzLm1ham9yID0gK21bMV1cbiAgICB0aGlzLm1pbm9yID0gK21bMl1cbiAgICB0aGlzLnBhdGNoID0gK21bM11cblxuICAgIGlmICh0aGlzLm1ham9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1ham9yIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBtYWpvciB2ZXJzaW9uJylcbiAgICB9XG5cbiAgICBpZiAodGhpcy5taW5vciA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5taW5vciA8IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWlub3IgdmVyc2lvbicpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGF0Y2ggPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMucGF0Y2ggPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHBhdGNoIHZlcnNpb24nKVxuICAgIH1cblxuICAgIC8vIG51bWJlcmlmeSBhbnkgcHJlcmVsZWFzZSBudW1lcmljIGlkc1xuICAgIGlmICghbVs0XSkge1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gbVs0XS5zcGxpdCgnLicpLm1hcCgoaWQpID0+IHtcbiAgICAgICAgaWYgKC9eWzAtOV0rJC8udGVzdChpZCkpIHtcbiAgICAgICAgICBjb25zdCBudW0gPSAraWRcbiAgICAgICAgICBpZiAobnVtID49IDAgJiYgbnVtIDwgTUFYX1NBRkVfSU5URUdFUikge1xuICAgICAgICAgICAgcmV0dXJuIG51bVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWRcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5idWlsZCA9IG1bNV0gPyBtWzVdLnNwbGl0KCcuJykgOiBbXVxuICAgIHRoaXMuZm9ybWF0KClcbiAgfVxuXG4gIGZvcm1hdCAoKSB7XG4gICAgdGhpcy52ZXJzaW9uID0gYCR7dGhpcy5tYWpvcn0uJHt0aGlzLm1pbm9yfS4ke3RoaXMucGF0Y2h9YFxuICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICB0aGlzLnZlcnNpb24gKz0gYC0ke3RoaXMucHJlcmVsZWFzZS5qb2luKCcuJyl9YFxuICAgIH1cbiAgICByZXR1cm4gdGhpcy52ZXJzaW9uXG4gIH1cblxuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvblxuICB9XG5cbiAgY29tcGFyZSAob3RoZXIpIHtcbiAgICBkZWJ1ZygnU2VtVmVyLmNvbXBhcmUnLCB0aGlzLnZlcnNpb24sIHRoaXMub3B0aW9ucywgb3RoZXIpXG4gICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgICBpZiAodHlwZW9mIG90aGVyID09PSAnc3RyaW5nJyAmJiBvdGhlciA9PT0gdGhpcy52ZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiAwXG4gICAgICB9XG4gICAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMub3B0aW9ucylcbiAgICB9XG5cbiAgICBpZiAob3RoZXIudmVyc2lvbiA9PT0gdGhpcy52ZXJzaW9uKSB7XG4gICAgICByZXR1cm4gMFxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmNvbXBhcmVNYWluKG90aGVyKSB8fCB0aGlzLmNvbXBhcmVQcmUob3RoZXIpXG4gIH1cblxuICBjb21wYXJlTWFpbiAob3RoZXIpIHtcbiAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5tYWpvciwgb3RoZXIubWFqb3IpIHx8XG4gICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5taW5vciwgb3RoZXIubWlub3IpIHx8XG4gICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5wYXRjaCwgb3RoZXIucGF0Y2gpXG4gICAgKVxuICB9XG5cbiAgY29tcGFyZVByZSAob3RoZXIpIHtcbiAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICAgIH1cblxuICAgIC8vIE5PVCBoYXZpbmcgYSBwcmVyZWxlYXNlIGlzID4gaGF2aW5nIG9uZVxuICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfSBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiBvdGhlci5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIDFcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIDBcbiAgICB9XG5cbiAgICBsZXQgaSA9IDBcbiAgICBkbyB7XG4gICAgICBjb25zdCBhID0gdGhpcy5wcmVyZWxlYXNlW2ldXG4gICAgICBjb25zdCBiID0gb3RoZXIucHJlcmVsZWFzZVtpXVxuICAgICAgZGVidWcoJ3ByZXJlbGVhc2UgY29tcGFyZScsIGksIGEsIGIpXG4gICAgICBpZiAoYSA9PT0gdW5kZWZpbmVkICYmIGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfSBlbHNlIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDFcbiAgICAgIH0gZWxzZSBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfSBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpXG4gICAgICB9XG4gICAgfSB3aGlsZSAoKytpKVxuICB9XG5cbiAgY29tcGFyZUJ1aWxkIChvdGhlcikge1xuICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gICAgfVxuXG4gICAgbGV0IGkgPSAwXG4gICAgZG8ge1xuICAgICAgY29uc3QgYSA9IHRoaXMuYnVpbGRbaV1cbiAgICAgIGNvbnN0IGIgPSBvdGhlci5idWlsZFtpXVxuICAgICAgZGVidWcoJ3ByZXJlbGVhc2UgY29tcGFyZScsIGksIGEsIGIpXG4gICAgICBpZiAoYSA9PT0gdW5kZWZpbmVkICYmIGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfSBlbHNlIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDFcbiAgICAgIH0gZWxzZSBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfSBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpXG4gICAgICB9XG4gICAgfSB3aGlsZSAoKytpKVxuICB9XG5cbiAgLy8gcHJlbWlub3Igd2lsbCBidW1wIHRoZSB2ZXJzaW9uIHVwIHRvIHRoZSBuZXh0IG1pbm9yIHJlbGVhc2UsIGFuZCBpbW1lZGlhdGVseVxuICAvLyBkb3duIHRvIHByZS1yZWxlYXNlLiBwcmVtYWpvciBhbmQgcHJlcGF0Y2ggd29yayB0aGUgc2FtZSB3YXkuXG4gIGluYyAocmVsZWFzZSwgaWRlbnRpZmllciwgaWRlbnRpZmllckJhc2UpIHtcbiAgICBzd2l0Y2ggKHJlbGVhc2UpIHtcbiAgICAgIGNhc2UgJ3ByZW1ham9yJzpcbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDBcbiAgICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgICAgdGhpcy5taW5vciA9IDBcbiAgICAgICAgdGhpcy5tYWpvcisrXG4gICAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyLCBpZGVudGlmaWVyQmFzZSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3ByZW1pbm9yJzpcbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDBcbiAgICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgICAgdGhpcy5taW5vcisrXG4gICAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyLCBpZGVudGlmaWVyQmFzZSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3ByZXBhdGNoJzpcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhbHJlYWR5IGEgcHJlcmVsZWFzZSwgaXQgd2lsbCBidW1wIHRvIHRoZSBuZXh0IHZlcnNpb25cbiAgICAgICAgLy8gZHJvcCBhbnkgcHJlcmVsZWFzZXMgdGhhdCBtaWdodCBhbHJlYWR5IGV4aXN0LCBzaW5jZSB0aGV5IGFyZSBub3RcbiAgICAgICAgLy8gcmVsZXZhbnQgYXQgdGhpcyBwb2ludC5cbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDBcbiAgICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllciwgaWRlbnRpZmllckJhc2UpXG4gICAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyLCBpZGVudGlmaWVyQmFzZSlcbiAgICAgICAgYnJlYWtcbiAgICAgIC8vIElmIHRoZSBpbnB1dCBpcyBhIG5vbi1wcmVyZWxlYXNlIHZlcnNpb24sIHRoaXMgYWN0cyB0aGUgc2FtZSBhc1xuICAgICAgLy8gcHJlcGF0Y2guXG4gICAgICBjYXNlICdwcmVyZWxlYXNlJzpcbiAgICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLmluYygncGF0Y2gnLCBpZGVudGlmaWVyLCBpZGVudGlmaWVyQmFzZSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllciwgaWRlbnRpZmllckJhc2UpXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ21ham9yJzpcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1tYWpvciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1ham9yIHZlcnNpb24uXG4gICAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWFqb3IuXG4gICAgICAgIC8vIDEuMC4wLTUgYnVtcHMgdG8gMS4wLjBcbiAgICAgICAgLy8gMS4xLjAgYnVtcHMgdG8gMi4wLjBcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMubWlub3IgIT09IDAgfHxcbiAgICAgICAgICB0aGlzLnBhdGNoICE9PSAwIHx8XG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLm1ham9yKytcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1pbm9yID0gMFxuICAgICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnbWlub3InOlxuICAgICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1pbm9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWlub3IgdmVyc2lvbi5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIGluY3JlbWVudCBtaW5vci5cbiAgICAgICAgLy8gMS4yLjAtNSBidW1wcyB0byAxLjIuMFxuICAgICAgICAvLyAxLjIuMSBidW1wcyB0byAxLjMuMFxuICAgICAgICBpZiAodGhpcy5wYXRjaCAhPT0gMCB8fCB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5taW5vcisrXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3BhdGNoJzpcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBub3QgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uLCBpdCB3aWxsIGluY3JlbWVudCB0aGUgcGF0Y2guXG4gICAgICAgIC8vIElmIGl0IGlzIGEgcHJlLXJlbGVhc2UgaXQgd2lsbCBidW1wIHVwIHRvIHRoZSBzYW1lIHBhdGNoIHZlcnNpb24uXG4gICAgICAgIC8vIDEuMi4wLTUgcGF0Y2hlcyB0byAxLjIuMFxuICAgICAgICAvLyAxLjIuMCBwYXRjaGVzIHRvIDEuMi4xXG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5wYXRjaCsrXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgICAgYnJlYWtcbiAgICAgIC8vIFRoaXMgcHJvYmFibHkgc2hvdWxkbid0IGJlIHVzZWQgcHVibGljbHkuXG4gICAgICAvLyAxLjAuMCAncHJlJyB3b3VsZCBiZWNvbWUgMS4wLjAtMCB3aGljaCBpcyB0aGUgd3JvbmcgZGlyZWN0aW9uLlxuICAgICAgY2FzZSAncHJlJzoge1xuICAgICAgICBjb25zdCBiYXNlID0gTnVtYmVyKGlkZW50aWZpZXJCYXNlKSA/IDEgOiAwXG5cbiAgICAgICAgaWYgKCFpZGVudGlmaWVyICYmIGlkZW50aWZpZXJCYXNlID09PSBmYWxzZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmNyZW1lbnQgYXJndW1lbnQ6IGlkZW50aWZpZXIgaXMgZW1wdHknKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbYmFzZV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgaSA9IHRoaXMucHJlcmVsZWFzZS5sZW5ndGhcbiAgICAgICAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcmVyZWxlYXNlW2ldID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICB0aGlzLnByZXJlbGVhc2VbaV0rK1xuICAgICAgICAgICAgICBpID0gLTJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBkaWRuJ3QgaW5jcmVtZW50IGFueXRoaW5nXG4gICAgICAgICAgICBpZiAoaWRlbnRpZmllciA9PT0gdGhpcy5wcmVyZWxlYXNlLmpvaW4oJy4nKSAmJiBpZGVudGlmaWVyQmFzZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluY3JlbWVudCBhcmd1bWVudDogaWRlbnRpZmllciBhbHJlYWR5IGV4aXN0cycpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UucHVzaChiYXNlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaWRlbnRpZmllcikge1xuICAgICAgICAgIC8vIDEuMi4wLWJldGEuMSBidW1wcyB0byAxLjIuMC1iZXRhLjIsXG4gICAgICAgICAgLy8gMS4yLjAtYmV0YS5mb29ibHogb3IgMS4yLjAtYmV0YSBidW1wcyB0byAxLjIuMC1iZXRhLjBcbiAgICAgICAgICBsZXQgcHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCBiYXNlXVxuICAgICAgICAgIGlmIChpZGVudGlmaWVyQmFzZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHByZXJlbGVhc2UgPSBbaWRlbnRpZmllcl1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLnByZXJlbGVhc2VbMF0sIGlkZW50aWZpZXIpID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoaXNOYU4odGhpcy5wcmVyZWxlYXNlWzFdKSkge1xuICAgICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBwcmVyZWxlYXNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IHByZXJlbGVhc2VcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaW52YWxpZCBpbmNyZW1lbnQgYXJndW1lbnQ6ICR7cmVsZWFzZX1gKVxuICAgIH1cbiAgICB0aGlzLnJhdyA9IHRoaXMuZm9ybWF0KClcbiAgICBpZiAodGhpcy5idWlsZC5sZW5ndGgpIHtcbiAgICAgIHRoaXMucmF3ICs9IGArJHt0aGlzLmJ1aWxkLmpvaW4oJy4nKX1gXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZW1WZXJcbiIsImNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpXG5jb25zdCBjbGVhbiA9ICh2ZXJzaW9uLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHMgPSBwYXJzZSh2ZXJzaW9uLnRyaW0oKS5yZXBsYWNlKC9eWz12XSsvLCAnJyksIG9wdGlvbnMpXG4gIHJldHVybiBzID8gcy52ZXJzaW9uIDogbnVsbFxufVxubW9kdWxlLmV4cG9ydHMgPSBjbGVhblxuIiwiY29uc3QgZXEgPSByZXF1aXJlKCcuL2VxJylcbmNvbnN0IG5lcSA9IHJlcXVpcmUoJy4vbmVxJylcbmNvbnN0IGd0ID0gcmVxdWlyZSgnLi9ndCcpXG5jb25zdCBndGUgPSByZXF1aXJlKCcuL2d0ZScpXG5jb25zdCBsdCA9IHJlcXVpcmUoJy4vbHQnKVxuY29uc3QgbHRlID0gcmVxdWlyZSgnLi9sdGUnKVxuXG5jb25zdCBjbXAgPSAoYSwgb3AsIGIsIGxvb3NlKSA9PiB7XG4gIHN3aXRjaCAob3ApIHtcbiAgICBjYXNlICc9PT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0Jykge1xuICAgICAgICBhID0gYS52ZXJzaW9uXG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGIgPSBiLnZlcnNpb25cbiAgICAgIH1cbiAgICAgIHJldHVybiBhID09PSBiXG5cbiAgICBjYXNlICchPT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0Jykge1xuICAgICAgICBhID0gYS52ZXJzaW9uXG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGIgPSBiLnZlcnNpb25cbiAgICAgIH1cbiAgICAgIHJldHVybiBhICE9PSBiXG5cbiAgICBjYXNlICcnOlxuICAgIGNhc2UgJz0nOlxuICAgIGNhc2UgJz09JzpcbiAgICAgIHJldHVybiBlcShhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJyE9JzpcbiAgICAgIHJldHVybiBuZXEoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc+JzpcbiAgICAgIHJldHVybiBndChhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJz49JzpcbiAgICAgIHJldHVybiBndGUoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc8JzpcbiAgICAgIHJldHVybiBsdChhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJzw9JzpcbiAgICAgIHJldHVybiBsdGUoYSwgYiwgbG9vc2UpXG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBvcGVyYXRvcjogJHtvcH1gKVxuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IGNtcFxuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmNvbnN0IHsgc2FmZVJlOiByZSwgdCB9ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWwvcmUnKVxuXG5jb25zdCBjb2VyY2UgPSAodmVyc2lvbiwgb3B0aW9ucykgPT4ge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIHJldHVybiB2ZXJzaW9uXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdudW1iZXInKSB7XG4gICAgdmVyc2lvbiA9IFN0cmluZyh2ZXJzaW9uKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIGxldCBtYXRjaCA9IG51bGxcbiAgaWYgKCFvcHRpb25zLnJ0bCkge1xuICAgIG1hdGNoID0gdmVyc2lvbi5tYXRjaChvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlID8gcmVbdC5DT0VSQ0VGVUxMXSA6IHJlW3QuQ09FUkNFXSlcbiAgfSBlbHNlIHtcbiAgICAvLyBGaW5kIHRoZSByaWdodC1tb3N0IGNvZXJjaWJsZSBzdHJpbmcgdGhhdCBkb2VzIG5vdCBzaGFyZVxuICAgIC8vIGEgdGVybWludXMgd2l0aCBhIG1vcmUgbGVmdC13YXJkIGNvZXJjaWJsZSBzdHJpbmcuXG4gICAgLy8gRWcsICcxLjIuMy40JyB3YW50cyB0byBjb2VyY2UgJzIuMy40Jywgbm90ICczLjQnIG9yICc0J1xuICAgIC8vIFdpdGggaW5jbHVkZVByZXJlbGVhc2Ugb3B0aW9uIHNldCwgJzEuMi4zLjQtcmMnIHdhbnRzIHRvIGNvZXJjZSAnMi4zLjQtcmMnLCBub3QgJzIuMy40J1xuICAgIC8vXG4gICAgLy8gV2FsayB0aHJvdWdoIHRoZSBzdHJpbmcgY2hlY2tpbmcgd2l0aCBhIC9nIHJlZ2V4cFxuICAgIC8vIE1hbnVhbGx5IHNldCB0aGUgaW5kZXggc28gYXMgdG8gcGljayB1cCBvdmVybGFwcGluZyBtYXRjaGVzLlxuICAgIC8vIFN0b3Agd2hlbiB3ZSBnZXQgYSBtYXRjaCB0aGF0IGVuZHMgYXQgdGhlIHN0cmluZyBlbmQsIHNpbmNlIG5vXG4gICAgLy8gY29lcmNpYmxlIHN0cmluZyBjYW4gYmUgbW9yZSByaWdodC13YXJkIHdpdGhvdXQgdGhlIHNhbWUgdGVybWludXMuXG4gICAgY29uc3QgY29lcmNlUnRsUmVnZXggPSBvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlID8gcmVbdC5DT0VSQ0VSVExGVUxMXSA6IHJlW3QuQ09FUkNFUlRMXVxuICAgIGxldCBuZXh0XG4gICAgd2hpbGUgKChuZXh0ID0gY29lcmNlUnRsUmVnZXguZXhlYyh2ZXJzaW9uKSkgJiZcbiAgICAgICAgKCFtYXRjaCB8fCBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCAhPT0gdmVyc2lvbi5sZW5ndGgpXG4gICAgKSB7XG4gICAgICBpZiAoIW1hdGNoIHx8XG4gICAgICAgICAgICBuZXh0LmluZGV4ICsgbmV4dFswXS5sZW5ndGggIT09IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoKSB7XG4gICAgICAgIG1hdGNoID0gbmV4dFxuICAgICAgfVxuICAgICAgY29lcmNlUnRsUmVnZXgubGFzdEluZGV4ID0gbmV4dC5pbmRleCArIG5leHRbMV0ubGVuZ3RoICsgbmV4dFsyXS5sZW5ndGhcbiAgICB9XG4gICAgLy8gbGVhdmUgaXQgaW4gYSBjbGVhbiBzdGF0ZVxuICAgIGNvZXJjZVJ0bFJlZ2V4Lmxhc3RJbmRleCA9IC0xXG4gIH1cblxuICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY29uc3QgbWFqb3IgPSBtYXRjaFsyXVxuICBjb25zdCBtaW5vciA9IG1hdGNoWzNdIHx8ICcwJ1xuICBjb25zdCBwYXRjaCA9IG1hdGNoWzRdIHx8ICcwJ1xuICBjb25zdCBwcmVyZWxlYXNlID0gb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSAmJiBtYXRjaFs1XSA/IGAtJHttYXRjaFs1XX1gIDogJydcbiAgY29uc3QgYnVpbGQgPSBvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlICYmIG1hdGNoWzZdID8gYCske21hdGNoWzZdfWAgOiAnJ1xuXG4gIHJldHVybiBwYXJzZShgJHttYWpvcn0uJHttaW5vcn0uJHtwYXRjaH0ke3ByZXJlbGVhc2V9JHtidWlsZH1gLCBvcHRpb25zKVxufVxubW9kdWxlLmV4cG9ydHMgPSBjb2VyY2VcbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IGNvbXBhcmVCdWlsZCA9IChhLCBiLCBsb29zZSkgPT4ge1xuICBjb25zdCB2ZXJzaW9uQSA9IG5ldyBTZW1WZXIoYSwgbG9vc2UpXG4gIGNvbnN0IHZlcnNpb25CID0gbmV3IFNlbVZlcihiLCBsb29zZSlcbiAgcmV0dXJuIHZlcnNpb25BLmNvbXBhcmUodmVyc2lvbkIpIHx8IHZlcnNpb25BLmNvbXBhcmVCdWlsZCh2ZXJzaW9uQilcbn1cbm1vZHVsZS5leHBvcnRzID0gY29tcGFyZUJ1aWxkXG4iLCJjb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi9jb21wYXJlJylcbmNvbnN0IGNvbXBhcmVMb29zZSA9IChhLCBiKSA9PiBjb21wYXJlKGEsIGIsIHRydWUpXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBhcmVMb29zZVxuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgY29tcGFyZSA9IChhLCBiLCBsb29zZSkgPT5cbiAgbmV3IFNlbVZlcihhLCBsb29zZSkuY29tcGFyZShuZXcgU2VtVmVyKGIsIGxvb3NlKSlcblxubW9kdWxlLmV4cG9ydHMgPSBjb21wYXJlXG4iLCJjb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UuanMnKVxuXG5jb25zdCBkaWZmID0gKHZlcnNpb24xLCB2ZXJzaW9uMikgPT4ge1xuICBjb25zdCB2MSA9IHBhcnNlKHZlcnNpb24xLCBudWxsLCB0cnVlKVxuICBjb25zdCB2MiA9IHBhcnNlKHZlcnNpb24yLCBudWxsLCB0cnVlKVxuICBjb25zdCBjb21wYXJpc29uID0gdjEuY29tcGFyZSh2MilcblxuICBpZiAoY29tcGFyaXNvbiA9PT0gMCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBjb25zdCB2MUhpZ2hlciA9IGNvbXBhcmlzb24gPiAwXG4gIGNvbnN0IGhpZ2hWZXJzaW9uID0gdjFIaWdoZXIgPyB2MSA6IHYyXG4gIGNvbnN0IGxvd1ZlcnNpb24gPSB2MUhpZ2hlciA/IHYyIDogdjFcbiAgY29uc3QgaGlnaEhhc1ByZSA9ICEhaGlnaFZlcnNpb24ucHJlcmVsZWFzZS5sZW5ndGhcbiAgY29uc3QgbG93SGFzUHJlID0gISFsb3dWZXJzaW9uLnByZXJlbGVhc2UubGVuZ3RoXG5cbiAgaWYgKGxvd0hhc1ByZSAmJiAhaGlnaEhhc1ByZSkge1xuICAgIC8vIEdvaW5nIGZyb20gcHJlcmVsZWFzZSAtPiBubyBwcmVyZWxlYXNlIHJlcXVpcmVzIHNvbWUgc3BlY2lhbCBjYXNpbmdcblxuICAgIC8vIElmIHRoZSBsb3cgdmVyc2lvbiBoYXMgb25seSBhIG1ham9yLCB0aGVuIGl0IHdpbGwgYWx3YXlzIGJlIGEgbWFqb3JcbiAgICAvLyBTb21lIGV4YW1wbGVzOlxuICAgIC8vIDEuMC4wLTEgLT4gMS4wLjBcbiAgICAvLyAxLjAuMC0xIC0+IDEuMS4xXG4gICAgLy8gMS4wLjAtMSAtPiAyLjAuMFxuICAgIGlmICghbG93VmVyc2lvbi5wYXRjaCAmJiAhbG93VmVyc2lvbi5taW5vcikge1xuICAgICAgcmV0dXJuICdtYWpvcidcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UgaXQgY2FuIGJlIGRldGVybWluZWQgYnkgY2hlY2tpbmcgdGhlIGhpZ2ggdmVyc2lvblxuXG4gICAgaWYgKGhpZ2hWZXJzaW9uLnBhdGNoKSB7XG4gICAgICAvLyBhbnl0aGluZyBoaWdoZXIgdGhhbiBhIHBhdGNoIGJ1bXAgd291bGQgcmVzdWx0IGluIHRoZSB3cm9uZyB2ZXJzaW9uXG4gICAgICByZXR1cm4gJ3BhdGNoJ1xuICAgIH1cblxuICAgIGlmIChoaWdoVmVyc2lvbi5taW5vcikge1xuICAgICAgLy8gYW55dGhpbmcgaGlnaGVyIHRoYW4gYSBtaW5vciBidW1wIHdvdWxkIHJlc3VsdCBpbiB0aGUgd3JvbmcgdmVyc2lvblxuICAgICAgcmV0dXJuICdtaW5vcidcbiAgICB9XG5cbiAgICAvLyBidW1waW5nIG1ham9yL21pbm9yL3BhdGNoIGFsbCBoYXZlIHNhbWUgcmVzdWx0XG4gICAgcmV0dXJuICdtYWpvcidcbiAgfVxuXG4gIC8vIGFkZCB0aGUgYHByZWAgcHJlZml4IGlmIHdlIGFyZSBnb2luZyB0byBhIHByZXJlbGVhc2UgdmVyc2lvblxuICBjb25zdCBwcmVmaXggPSBoaWdoSGFzUHJlID8gJ3ByZScgOiAnJ1xuXG4gIGlmICh2MS5tYWpvciAhPT0gdjIubWFqb3IpIHtcbiAgICByZXR1cm4gcHJlZml4ICsgJ21ham9yJ1xuICB9XG5cbiAgaWYgKHYxLm1pbm9yICE9PSB2Mi5taW5vcikge1xuICAgIHJldHVybiBwcmVmaXggKyAnbWlub3InXG4gIH1cblxuICBpZiAodjEucGF0Y2ggIT09IHYyLnBhdGNoKSB7XG4gICAgcmV0dXJuIHByZWZpeCArICdwYXRjaCdcbiAgfVxuXG4gIC8vIGhpZ2ggYW5kIGxvdyBhcmUgcHJlbGVhc2VzXG4gIHJldHVybiAncHJlcmVsZWFzZSdcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkaWZmXG4iLCJjb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi9jb21wYXJlJylcbmNvbnN0IGVxID0gKGEsIGIsIGxvb3NlKSA9PiBjb21wYXJlKGEsIGIsIGxvb3NlKSA9PT0gMFxubW9kdWxlLmV4cG9ydHMgPSBlcVxuIiwiY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBndCA9IChhLCBiLCBsb29zZSkgPT4gY29tcGFyZShhLCBiLCBsb29zZSkgPiAwXG5tb2R1bGUuZXhwb3J0cyA9IGd0XG4iLCJjb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi9jb21wYXJlJylcbmNvbnN0IGd0ZSA9IChhLCBiLCBsb29zZSkgPT4gY29tcGFyZShhLCBiLCBsb29zZSkgPj0gMFxubW9kdWxlLmV4cG9ydHMgPSBndGVcbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcblxuY29uc3QgaW5jID0gKHZlcnNpb24sIHJlbGVhc2UsIG9wdGlvbnMsIGlkZW50aWZpZXIsIGlkZW50aWZpZXJCYXNlKSA9PiB7XG4gIGlmICh0eXBlb2YgKG9wdGlvbnMpID09PSAnc3RyaW5nJykge1xuICAgIGlkZW50aWZpZXJCYXNlID0gaWRlbnRpZmllclxuICAgIGlkZW50aWZpZXIgPSBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHVuZGVmaW5lZFxuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcihcbiAgICAgIHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIgPyB2ZXJzaW9uLnZlcnNpb24gOiB2ZXJzaW9uLFxuICAgICAgb3B0aW9uc1xuICAgICkuaW5jKHJlbGVhc2UsIGlkZW50aWZpZXIsIGlkZW50aWZpZXJCYXNlKS52ZXJzaW9uXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBpbmNcbiIsImNvbnN0IGNvbXBhcmUgPSByZXF1aXJlKCcuL2NvbXBhcmUnKVxuY29uc3QgbHQgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpIDwgMFxubW9kdWxlLmV4cG9ydHMgPSBsdFxuIiwiY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBsdGUgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpIDw9IDBcbm1vZHVsZS5leHBvcnRzID0gbHRlXG4iLCJjb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBtYWpvciA9IChhLCBsb29zZSkgPT4gbmV3IFNlbVZlcihhLCBsb29zZSkubWFqb3Jcbm1vZHVsZS5leHBvcnRzID0gbWFqb3JcbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IG1pbm9yID0gKGEsIGxvb3NlKSA9PiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5taW5vclxubW9kdWxlLmV4cG9ydHMgPSBtaW5vclxuIiwiY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCBuZXEgPSAoYSwgYiwgbG9vc2UpID0+IGNvbXBhcmUoYSwgYiwgbG9vc2UpICE9PSAwXG5tb2R1bGUuZXhwb3J0cyA9IG5lcVxuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgcGFyc2UgPSAodmVyc2lvbiwgb3B0aW9ucywgdGhyb3dFcnJvcnMgPSBmYWxzZSkgPT4ge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIHJldHVybiB2ZXJzaW9uXG4gIH1cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIGlmICghdGhyb3dFcnJvcnMpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIHRocm93IGVyXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVxuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgcGF0Y2ggPSAoYSwgbG9vc2UpID0+IG5ldyBTZW1WZXIoYSwgbG9vc2UpLnBhdGNoXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGNoXG4iLCJjb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKVxuY29uc3QgcHJlcmVsZWFzZSA9ICh2ZXJzaW9uLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlKHZlcnNpb24sIG9wdGlvbnMpXG4gIHJldHVybiAocGFyc2VkICYmIHBhcnNlZC5wcmVyZWxlYXNlLmxlbmd0aCkgPyBwYXJzZWQucHJlcmVsZWFzZSA6IG51bGxcbn1cbm1vZHVsZS5leHBvcnRzID0gcHJlcmVsZWFzZVxuIiwiY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4vY29tcGFyZScpXG5jb25zdCByY29tcGFyZSA9IChhLCBiLCBsb29zZSkgPT4gY29tcGFyZShiLCBhLCBsb29zZSlcbm1vZHVsZS5leHBvcnRzID0gcmNvbXBhcmVcbiIsImNvbnN0IGNvbXBhcmVCdWlsZCA9IHJlcXVpcmUoJy4vY29tcGFyZS1idWlsZCcpXG5jb25zdCByc29ydCA9IChsaXN0LCBsb29zZSkgPT4gbGlzdC5zb3J0KChhLCBiKSA9PiBjb21wYXJlQnVpbGQoYiwgYSwgbG9vc2UpKVxubW9kdWxlLmV4cG9ydHMgPSByc29ydFxuIiwiY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlJylcbmNvbnN0IHNhdGlzZmllcyA9ICh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykgPT4ge1xuICB0cnkge1xuICAgIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiByYW5nZS50ZXN0KHZlcnNpb24pXG59XG5tb2R1bGUuZXhwb3J0cyA9IHNhdGlzZmllc1xuIiwiY29uc3QgY29tcGFyZUJ1aWxkID0gcmVxdWlyZSgnLi9jb21wYXJlLWJ1aWxkJylcbmNvbnN0IHNvcnQgPSAobGlzdCwgbG9vc2UpID0+IGxpc3Quc29ydCgoYSwgYikgPT4gY29tcGFyZUJ1aWxkKGEsIGIsIGxvb3NlKSlcbm1vZHVsZS5leHBvcnRzID0gc29ydFxuIiwiY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmNvbnN0IHZhbGlkID0gKHZlcnNpb24sIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgdiA9IHBhcnNlKHZlcnNpb24sIG9wdGlvbnMpXG4gIHJldHVybiB2ID8gdi52ZXJzaW9uIDogbnVsbFxufVxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZFxuIiwiLy8ganVzdCBwcmUtbG9hZCBhbGwgdGhlIHN0dWZmIHRoYXQgaW5kZXguanMgbGF6aWx5IGV4cG9ydHNcbmNvbnN0IGludGVybmFsUmUgPSByZXF1aXJlKCcuL2ludGVybmFsL3JlJylcbmNvbnN0IGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vaW50ZXJuYWwvY29uc3RhbnRzJylcbmNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgaWRlbnRpZmllcnMgPSByZXF1aXJlKCcuL2ludGVybmFsL2lkZW50aWZpZXJzJylcbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvcGFyc2UnKVxuY29uc3QgdmFsaWQgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy92YWxpZCcpXG5jb25zdCBjbGVhbiA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2NsZWFuJylcbmNvbnN0IGluYyA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2luYycpXG5jb25zdCBkaWZmID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvZGlmZicpXG5jb25zdCBtYWpvciA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL21ham9yJylcbmNvbnN0IG1pbm9yID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvbWlub3InKVxuY29uc3QgcGF0Y2ggPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9wYXRjaCcpXG5jb25zdCBwcmVyZWxlYXNlID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvcHJlcmVsZWFzZScpXG5jb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvY29tcGFyZScpXG5jb25zdCByY29tcGFyZSA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3Jjb21wYXJlJylcbmNvbnN0IGNvbXBhcmVMb29zZSA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2NvbXBhcmUtbG9vc2UnKVxuY29uc3QgY29tcGFyZUJ1aWxkID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvY29tcGFyZS1idWlsZCcpXG5jb25zdCBzb3J0ID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvc29ydCcpXG5jb25zdCByc29ydCA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3Jzb3J0JylcbmNvbnN0IGd0ID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvZ3QnKVxuY29uc3QgbHQgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9sdCcpXG5jb25zdCBlcSA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2VxJylcbmNvbnN0IG5lcSA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL25lcScpXG5jb25zdCBndGUgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9ndGUnKVxuY29uc3QgbHRlID0gcmVxdWlyZSgnLi9mdW5jdGlvbnMvbHRlJylcbmNvbnN0IGNtcCA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL2NtcCcpXG5jb25zdCBjb2VyY2UgPSByZXF1aXJlKCcuL2Z1bmN0aW9ucy9jb2VyY2UnKVxuY29uc3QgQ29tcGFyYXRvciA9IHJlcXVpcmUoJy4vY2xhc3Nlcy9jb21wYXJhdG9yJylcbmNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi9jbGFzc2VzL3JhbmdlJylcbmNvbnN0IHNhdGlzZmllcyA9IHJlcXVpcmUoJy4vZnVuY3Rpb25zL3NhdGlzZmllcycpXG5jb25zdCB0b0NvbXBhcmF0b3JzID0gcmVxdWlyZSgnLi9yYW5nZXMvdG8tY29tcGFyYXRvcnMnKVxuY29uc3QgbWF4U2F0aXNmeWluZyA9IHJlcXVpcmUoJy4vcmFuZ2VzL21heC1zYXRpc2Z5aW5nJylcbmNvbnN0IG1pblNhdGlzZnlpbmcgPSByZXF1aXJlKCcuL3Jhbmdlcy9taW4tc2F0aXNmeWluZycpXG5jb25zdCBtaW5WZXJzaW9uID0gcmVxdWlyZSgnLi9yYW5nZXMvbWluLXZlcnNpb24nKVxuY29uc3QgdmFsaWRSYW5nZSA9IHJlcXVpcmUoJy4vcmFuZ2VzL3ZhbGlkJylcbmNvbnN0IG91dHNpZGUgPSByZXF1aXJlKCcuL3Jhbmdlcy9vdXRzaWRlJylcbmNvbnN0IGd0ciA9IHJlcXVpcmUoJy4vcmFuZ2VzL2d0cicpXG5jb25zdCBsdHIgPSByZXF1aXJlKCcuL3Jhbmdlcy9sdHInKVxuY29uc3QgaW50ZXJzZWN0cyA9IHJlcXVpcmUoJy4vcmFuZ2VzL2ludGVyc2VjdHMnKVxuY29uc3Qgc2ltcGxpZnlSYW5nZSA9IHJlcXVpcmUoJy4vcmFuZ2VzL3NpbXBsaWZ5JylcbmNvbnN0IHN1YnNldCA9IHJlcXVpcmUoJy4vcmFuZ2VzL3N1YnNldCcpXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcGFyc2UsXG4gIHZhbGlkLFxuICBjbGVhbixcbiAgaW5jLFxuICBkaWZmLFxuICBtYWpvcixcbiAgbWlub3IsXG4gIHBhdGNoLFxuICBwcmVyZWxlYXNlLFxuICBjb21wYXJlLFxuICByY29tcGFyZSxcbiAgY29tcGFyZUxvb3NlLFxuICBjb21wYXJlQnVpbGQsXG4gIHNvcnQsXG4gIHJzb3J0LFxuICBndCxcbiAgbHQsXG4gIGVxLFxuICBuZXEsXG4gIGd0ZSxcbiAgbHRlLFxuICBjbXAsXG4gIGNvZXJjZSxcbiAgQ29tcGFyYXRvcixcbiAgUmFuZ2UsXG4gIHNhdGlzZmllcyxcbiAgdG9Db21wYXJhdG9ycyxcbiAgbWF4U2F0aXNmeWluZyxcbiAgbWluU2F0aXNmeWluZyxcbiAgbWluVmVyc2lvbixcbiAgdmFsaWRSYW5nZSxcbiAgb3V0c2lkZSxcbiAgZ3RyLFxuICBsdHIsXG4gIGludGVyc2VjdHMsXG4gIHNpbXBsaWZ5UmFuZ2UsXG4gIHN1YnNldCxcbiAgU2VtVmVyLFxuICByZTogaW50ZXJuYWxSZS5yZSxcbiAgc3JjOiBpbnRlcm5hbFJlLnNyYyxcbiAgdG9rZW5zOiBpbnRlcm5hbFJlLnQsXG4gIFNFTVZFUl9TUEVDX1ZFUlNJT046IGNvbnN0YW50cy5TRU1WRVJfU1BFQ19WRVJTSU9OLFxuICBSRUxFQVNFX1RZUEVTOiBjb25zdGFudHMuUkVMRUFTRV9UWVBFUyxcbiAgY29tcGFyZUlkZW50aWZpZXJzOiBpZGVudGlmaWVycy5jb21wYXJlSWRlbnRpZmllcnMsXG4gIHJjb21wYXJlSWRlbnRpZmllcnM6IGlkZW50aWZpZXJzLnJjb21wYXJlSWRlbnRpZmllcnMsXG59XG4iLCIvLyBOb3RlOiB0aGlzIGlzIHRoZSBzZW12ZXIub3JnIHZlcnNpb24gb2YgdGhlIHNwZWMgdGhhdCBpdCBpbXBsZW1lbnRzXG4vLyBOb3QgbmVjZXNzYXJpbHkgdGhlIHBhY2thZ2UgdmVyc2lvbiBvZiB0aGlzIGNvZGUuXG5jb25zdCBTRU1WRVJfU1BFQ19WRVJTSU9OID0gJzIuMC4wJ1xuXG5jb25zdCBNQVhfTEVOR1RIID0gMjU2XG5jb25zdCBNQVhfU0FGRV9JTlRFR0VSID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHxcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIDkwMDcxOTkyNTQ3NDA5OTFcblxuLy8gTWF4IHNhZmUgc2VnbWVudCBsZW5ndGggZm9yIGNvZXJjaW9uLlxuY29uc3QgTUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSCA9IDE2XG5cbi8vIE1heCBzYWZlIGxlbmd0aCBmb3IgYSBidWlsZCBpZGVudGlmaWVyLiBUaGUgbWF4IGxlbmd0aCBtaW51cyA2IGNoYXJhY3RlcnMgZm9yXG4vLyB0aGUgc2hvcnRlc3QgdmVyc2lvbiB3aXRoIGEgYnVpbGQgMC4wLjArQlVJTEQuXG5jb25zdCBNQVhfU0FGRV9CVUlMRF9MRU5HVEggPSBNQVhfTEVOR1RIIC0gNlxuXG5jb25zdCBSRUxFQVNFX1RZUEVTID0gW1xuICAnbWFqb3InLFxuICAncHJlbWFqb3InLFxuICAnbWlub3InLFxuICAncHJlbWlub3InLFxuICAncGF0Y2gnLFxuICAncHJlcGF0Y2gnLFxuICAncHJlcmVsZWFzZScsXG5dXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBNQVhfTEVOR1RILFxuICBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RILFxuICBNQVhfU0FGRV9CVUlMRF9MRU5HVEgsXG4gIE1BWF9TQUZFX0lOVEVHRVIsXG4gIFJFTEVBU0VfVFlQRVMsXG4gIFNFTVZFUl9TUEVDX1ZFUlNJT04sXG4gIEZMQUdfSU5DTFVERV9QUkVSRUxFQVNFOiAwYjAwMSxcbiAgRkxBR19MT09TRTogMGIwMTAsXG59XG4iLCJjb25zdCBkZWJ1ZyA9IChcbiAgdHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnICYmXG4gIHByb2Nlc3MuZW52ICYmXG4gIHByb2Nlc3MuZW52Lk5PREVfREVCVUcgJiZcbiAgL1xcYnNlbXZlclxcYi9pLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRylcbikgPyAoLi4uYXJncykgPT4gY29uc29sZS5lcnJvcignU0VNVkVSJywgLi4uYXJncylcbiAgOiAoKSA9PiB7fVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYnVnXG4iLCJjb25zdCBudW1lcmljID0gL15bMC05XSskL1xuY29uc3QgY29tcGFyZUlkZW50aWZpZXJzID0gKGEsIGIpID0+IHtcbiAgY29uc3QgYW51bSA9IG51bWVyaWMudGVzdChhKVxuICBjb25zdCBibnVtID0gbnVtZXJpYy50ZXN0KGIpXG5cbiAgaWYgKGFudW0gJiYgYm51bSkge1xuICAgIGEgPSArYVxuICAgIGIgPSArYlxuICB9XG5cbiAgcmV0dXJuIGEgPT09IGIgPyAwXG4gICAgOiAoYW51bSAmJiAhYm51bSkgPyAtMVxuICAgIDogKGJudW0gJiYgIWFudW0pID8gMVxuICAgIDogYSA8IGIgPyAtMVxuICAgIDogMVxufVxuXG5jb25zdCByY29tcGFyZUlkZW50aWZpZXJzID0gKGEsIGIpID0+IGNvbXBhcmVJZGVudGlmaWVycyhiLCBhKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29tcGFyZUlkZW50aWZpZXJzLFxuICByY29tcGFyZUlkZW50aWZpZXJzLFxufVxuIiwiLy8gcGFyc2Ugb3V0IGp1c3QgdGhlIG9wdGlvbnMgd2UgY2FyZSBhYm91dFxuY29uc3QgbG9vc2VPcHRpb24gPSBPYmplY3QuZnJlZXplKHsgbG9vc2U6IHRydWUgfSlcbmNvbnN0IGVtcHR5T3B0cyA9IE9iamVjdC5mcmVlemUoeyB9KVxuY29uc3QgcGFyc2VPcHRpb25zID0gb3B0aW9ucyA9PiB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIHJldHVybiBlbXB0eU9wdHNcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbG9vc2VPcHRpb25cbiAgfVxuXG4gIHJldHVybiBvcHRpb25zXG59XG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlT3B0aW9uc1xuIiwiY29uc3Qge1xuICBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RILFxuICBNQVhfU0FGRV9CVUlMRF9MRU5HVEgsXG4gIE1BWF9MRU5HVEgsXG59ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKVxuY29uc3QgZGVidWcgPSByZXF1aXJlKCcuL2RlYnVnJylcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHt9XG5cbi8vIFRoZSBhY3R1YWwgcmVnZXhwcyBnbyBvbiBleHBvcnRzLnJlXG5jb25zdCByZSA9IGV4cG9ydHMucmUgPSBbXVxuY29uc3Qgc2FmZVJlID0gZXhwb3J0cy5zYWZlUmUgPSBbXVxuY29uc3Qgc3JjID0gZXhwb3J0cy5zcmMgPSBbXVxuY29uc3QgdCA9IGV4cG9ydHMudCA9IHt9XG5sZXQgUiA9IDBcblxuY29uc3QgTEVUVEVSREFTSE5VTUJFUiA9ICdbYS16QS1aMC05LV0nXG5cbi8vIFJlcGxhY2Ugc29tZSBncmVlZHkgcmVnZXggdG9rZW5zIHRvIHByZXZlbnQgcmVnZXggZG9zIGlzc3Vlcy4gVGhlc2UgcmVnZXggYXJlXG4vLyB1c2VkIGludGVybmFsbHkgdmlhIHRoZSBzYWZlUmUgb2JqZWN0IHNpbmNlIGFsbCBpbnB1dHMgaW4gdGhpcyBsaWJyYXJ5IGdldFxuLy8gbm9ybWFsaXplZCBmaXJzdCB0byB0cmltIGFuZCBjb2xsYXBzZSBhbGwgZXh0cmEgd2hpdGVzcGFjZS4gVGhlIG9yaWdpbmFsXG4vLyByZWdleGVzIGFyZSBleHBvcnRlZCBmb3IgdXNlcmxhbmQgY29uc3VtcHRpb24gYW5kIGxvd2VyIGxldmVsIHVzYWdlLiBBXG4vLyBmdXR1cmUgYnJlYWtpbmcgY2hhbmdlIGNvdWxkIGV4cG9ydCB0aGUgc2FmZXIgcmVnZXggb25seSB3aXRoIGEgbm90ZSB0aGF0XG4vLyBhbGwgaW5wdXQgc2hvdWxkIGhhdmUgZXh0cmEgd2hpdGVzcGFjZSByZW1vdmVkLlxuY29uc3Qgc2FmZVJlZ2V4UmVwbGFjZW1lbnRzID0gW1xuICBbJ1xcXFxzJywgMV0sXG4gIFsnXFxcXGQnLCBNQVhfTEVOR1RIXSxcbiAgW0xFVFRFUkRBU0hOVU1CRVIsIE1BWF9TQUZFX0JVSUxEX0xFTkdUSF0sXG5dXG5cbmNvbnN0IG1ha2VTYWZlUmVnZXggPSAodmFsdWUpID0+IHtcbiAgZm9yIChjb25zdCBbdG9rZW4sIG1heF0gb2Ygc2FmZVJlZ2V4UmVwbGFjZW1lbnRzKSB7XG4gICAgdmFsdWUgPSB2YWx1ZVxuICAgICAgLnNwbGl0KGAke3Rva2VufSpgKS5qb2luKGAke3Rva2VufXswLCR7bWF4fX1gKVxuICAgICAgLnNwbGl0KGAke3Rva2VufStgKS5qb2luKGAke3Rva2VufXsxLCR7bWF4fX1gKVxuICB9XG4gIHJldHVybiB2YWx1ZVxufVxuXG5jb25zdCBjcmVhdGVUb2tlbiA9IChuYW1lLCB2YWx1ZSwgaXNHbG9iYWwpID0+IHtcbiAgY29uc3Qgc2FmZSA9IG1ha2VTYWZlUmVnZXgodmFsdWUpXG4gIGNvbnN0IGluZGV4ID0gUisrXG4gIGRlYnVnKG5hbWUsIGluZGV4LCB2YWx1ZSlcbiAgdFtuYW1lXSA9IGluZGV4XG4gIHNyY1tpbmRleF0gPSB2YWx1ZVxuICByZVtpbmRleF0gPSBuZXcgUmVnRXhwKHZhbHVlLCBpc0dsb2JhbCA/ICdnJyA6IHVuZGVmaW5lZClcbiAgc2FmZVJlW2luZGV4XSA9IG5ldyBSZWdFeHAoc2FmZSwgaXNHbG9iYWwgPyAnZycgOiB1bmRlZmluZWQpXG59XG5cbi8vIFRoZSBmb2xsb3dpbmcgUmVndWxhciBFeHByZXNzaW9ucyBjYW4gYmUgdXNlZCBmb3IgdG9rZW5pemluZyxcbi8vIHZhbGlkYXRpbmcsIGFuZCBwYXJzaW5nIFNlbVZlciB2ZXJzaW9uIHN0cmluZ3MuXG5cbi8vICMjIE51bWVyaWMgSWRlbnRpZmllclxuLy8gQSBzaW5nbGUgYDBgLCBvciBhIG5vbi16ZXJvIGRpZ2l0IGZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBkaWdpdHMuXG5cbmNyZWF0ZVRva2VuKCdOVU1FUklDSURFTlRJRklFUicsICcwfFsxLTldXFxcXGQqJylcbmNyZWF0ZVRva2VuKCdOVU1FUklDSURFTlRJRklFUkxPT1NFJywgJ1xcXFxkKycpXG5cbi8vICMjIE5vbi1udW1lcmljIElkZW50aWZpZXJcbi8vIFplcm8gb3IgbW9yZSBkaWdpdHMsIGZvbGxvd2VkIGJ5IGEgbGV0dGVyIG9yIGh5cGhlbiwgYW5kIHRoZW4gemVybyBvclxuLy8gbW9yZSBsZXR0ZXJzLCBkaWdpdHMsIG9yIGh5cGhlbnMuXG5cbmNyZWF0ZVRva2VuKCdOT05OVU1FUklDSURFTlRJRklFUicsIGBcXFxcZCpbYS16QS1aLV0ke0xFVFRFUkRBU0hOVU1CRVJ9KmApXG5cbi8vICMjIE1haW4gVmVyc2lvblxuLy8gVGhyZWUgZG90LXNlcGFyYXRlZCBudW1lcmljIGlkZW50aWZpZXJzLlxuXG5jcmVhdGVUb2tlbignTUFJTlZFUlNJT04nLCBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJdfSlcXFxcLmAgK1xuICAgICAgICAgICAgICAgICAgIGAoJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUl19KVxcXFwuYCArXG4gICAgICAgICAgICAgICAgICAgYCgke3NyY1t0Lk5VTUVSSUNJREVOVElGSUVSXX0pYClcblxuY3JlYXRlVG9rZW4oJ01BSU5WRVJTSU9OTE9PU0UnLCBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV19KVxcXFwuYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV19KVxcXFwuYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV19KWApXG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb24gSWRlbnRpZmllclxuLy8gQSBudW1lcmljIGlkZW50aWZpZXIsIG9yIGEgbm9uLW51bWVyaWMgaWRlbnRpZmllci5cblxuY3JlYXRlVG9rZW4oJ1BSRVJFTEVBU0VJREVOVElGSUVSJywgYCg/OiR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJdXG59fCR7c3JjW3QuTk9OTlVNRVJJQ0lERU5USUZJRVJdfSlgKVxuXG5jcmVhdGVUb2tlbignUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRScsIGAoPzoke3NyY1t0Lk5VTUVSSUNJREVOVElGSUVSTE9PU0VdXG59fCR7c3JjW3QuTk9OTlVNRVJJQ0lERU5USUZJRVJdfSlgKVxuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uXG4vLyBIeXBoZW4sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIGRvdC1zZXBhcmF0ZWQgcHJlLXJlbGVhc2UgdmVyc2lvblxuLy8gaWRlbnRpZmllcnMuXG5cbmNyZWF0ZVRva2VuKCdQUkVSRUxFQVNFJywgYCg/Oi0oJHtzcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUl1cbn0oPzpcXFxcLiR7c3JjW3QuUFJFUkVMRUFTRUlERU5USUZJRVJdfSkqKSlgKVxuXG5jcmVhdGVUb2tlbignUFJFUkVMRUFTRUxPT1NFJywgYCg/Oi0/KCR7c3JjW3QuUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV1cbn0oPzpcXFxcLiR7c3JjW3QuUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV19KSopKWApXG5cbi8vICMjIEJ1aWxkIE1ldGFkYXRhIElkZW50aWZpZXJcbi8vIEFueSBjb21iaW5hdGlvbiBvZiBkaWdpdHMsIGxldHRlcnMsIG9yIGh5cGhlbnMuXG5cbmNyZWF0ZVRva2VuKCdCVUlMRElERU5USUZJRVInLCBgJHtMRVRURVJEQVNITlVNQkVSfStgKVxuXG4vLyAjIyBCdWlsZCBNZXRhZGF0YVxuLy8gUGx1cyBzaWduLCBmb2xsb3dlZCBieSBvbmUgb3IgbW9yZSBwZXJpb2Qtc2VwYXJhdGVkIGJ1aWxkIG1ldGFkYXRhXG4vLyBpZGVudGlmaWVycy5cblxuY3JlYXRlVG9rZW4oJ0JVSUxEJywgYCg/OlxcXFwrKCR7c3JjW3QuQlVJTERJREVOVElGSUVSXVxufSg/OlxcXFwuJHtzcmNbdC5CVUlMRElERU5USUZJRVJdfSkqKSlgKVxuXG4vLyAjIyBGdWxsIFZlcnNpb24gU3RyaW5nXG4vLyBBIG1haW4gdmVyc2lvbiwgZm9sbG93ZWQgb3B0aW9uYWxseSBieSBhIHByZS1yZWxlYXNlIHZlcnNpb24gYW5kXG4vLyBidWlsZCBtZXRhZGF0YS5cblxuLy8gTm90ZSB0aGF0IHRoZSBvbmx5IG1ham9yLCBtaW5vciwgcGF0Y2gsIGFuZCBwcmUtcmVsZWFzZSBzZWN0aW9ucyBvZlxuLy8gdGhlIHZlcnNpb24gc3RyaW5nIGFyZSBjYXB0dXJpbmcgZ3JvdXBzLiAgVGhlIGJ1aWxkIG1ldGFkYXRhIGlzIG5vdCBhXG4vLyBjYXB0dXJpbmcgZ3JvdXAsIGJlY2F1c2UgaXQgc2hvdWxkIG5vdCBldmVyIGJlIHVzZWQgaW4gdmVyc2lvblxuLy8gY29tcGFyaXNvbi5cblxuY3JlYXRlVG9rZW4oJ0ZVTExQTEFJTicsIGB2PyR7c3JjW3QuTUFJTlZFUlNJT05dXG59JHtzcmNbdC5QUkVSRUxFQVNFXX0/JHtcbiAgc3JjW3QuQlVJTERdfT9gKVxuXG5jcmVhdGVUb2tlbignRlVMTCcsIGBeJHtzcmNbdC5GVUxMUExBSU5dfSRgKVxuXG4vLyBsaWtlIGZ1bGwsIGJ1dCBhbGxvd3MgdjEuMi4zIGFuZCA9MS4yLjMsIHdoaWNoIHBlb3BsZSBkbyBzb21ldGltZXMuXG4vLyBhbHNvLCAxLjAuMGFscGhhMSAocHJlcmVsZWFzZSB3aXRob3V0IHRoZSBoeXBoZW4pIHdoaWNoIGlzIHByZXR0eVxuLy8gY29tbW9uIGluIHRoZSBucG0gcmVnaXN0cnkuXG5jcmVhdGVUb2tlbignTE9PU0VQTEFJTicsIGBbdj1cXFxcc10qJHtzcmNbdC5NQUlOVkVSU0lPTkxPT1NFXVxufSR7c3JjW3QuUFJFUkVMRUFTRUxPT1NFXX0/JHtcbiAgc3JjW3QuQlVJTERdfT9gKVxuXG5jcmVhdGVUb2tlbignTE9PU0UnLCBgXiR7c3JjW3QuTE9PU0VQTEFJTl19JGApXG5cbmNyZWF0ZVRva2VuKCdHVExUJywgJygoPzo8fD4pPz0/KScpXG5cbi8vIFNvbWV0aGluZyBsaWtlIFwiMi4qXCIgb3IgXCIxLjIueFwiLlxuLy8gTm90ZSB0aGF0IFwieC54XCIgaXMgYSB2YWxpZCB4UmFuZ2UgaWRlbnRpZmVyLCBtZWFuaW5nIFwiYW55IHZlcnNpb25cIlxuLy8gT25seSB0aGUgZmlyc3QgaXRlbSBpcyBzdHJpY3RseSByZXF1aXJlZC5cbmNyZWF0ZVRva2VuKCdYUkFOR0VJREVOVElGSUVSTE9PU0UnLCBgJHtzcmNbdC5OVU1FUklDSURFTlRJRklFUkxPT1NFXX18eHxYfFxcXFwqYClcbmNyZWF0ZVRva2VuKCdYUkFOR0VJREVOVElGSUVSJywgYCR7c3JjW3QuTlVNRVJJQ0lERU5USUZJRVJdfXx4fFh8XFxcXCpgKVxuXG5jcmVhdGVUb2tlbignWFJBTkdFUExBSU4nLCBgW3Y9XFxcXHNdKigke3NyY1t0LlhSQU5HRUlERU5USUZJRVJdfSlgICtcbiAgICAgICAgICAgICAgICAgICBgKD86XFxcXC4oJHtzcmNbdC5YUkFOR0VJREVOVElGSUVSXX0pYCArXG4gICAgICAgICAgICAgICAgICAgYCg/OlxcXFwuKCR7c3JjW3QuWFJBTkdFSURFTlRJRklFUl19KWAgK1xuICAgICAgICAgICAgICAgICAgIGAoPzoke3NyY1t0LlBSRVJFTEVBU0VdfSk/JHtcbiAgICAgICAgICAgICAgICAgICAgIHNyY1t0LkJVSUxEXX0/YCArXG4gICAgICAgICAgICAgICAgICAgYCk/KT9gKVxuXG5jcmVhdGVUb2tlbignWFJBTkdFUExBSU5MT09TRScsIGBbdj1cXFxcc10qKCR7c3JjW3QuWFJBTkdFSURFTlRJRklFUkxPT1NFXX0pYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKD86XFxcXC4oJHtzcmNbdC5YUkFOR0VJREVOVElGSUVSTE9PU0VdfSlgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGAoPzpcXFxcLigke3NyY1t0LlhSQU5HRUlERU5USUZJRVJMT09TRV19KWAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYCg/OiR7c3JjW3QuUFJFUkVMRUFTRUxPT1NFXX0pPyR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNyY1t0LkJVSUxEXX0/YCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKT8pP2ApXG5cbmNyZWF0ZVRva2VuKCdYUkFOR0UnLCBgXiR7c3JjW3QuR1RMVF19XFxcXHMqJHtzcmNbdC5YUkFOR0VQTEFJTl19JGApXG5jcmVhdGVUb2tlbignWFJBTkdFTE9PU0UnLCBgXiR7c3JjW3QuR1RMVF19XFxcXHMqJHtzcmNbdC5YUkFOR0VQTEFJTkxPT1NFXX0kYClcblxuLy8gQ29lcmNpb24uXG4vLyBFeHRyYWN0IGFueXRoaW5nIHRoYXQgY291bGQgY29uY2VpdmFibHkgYmUgYSBwYXJ0IG9mIGEgdmFsaWQgc2VtdmVyXG5jcmVhdGVUb2tlbignQ09FUkNFUExBSU4nLCBgJHsnKF58W15cXFxcZF0pJyArXG4gICAgICAgICAgICAgICcoXFxcXGR7MSwnfSR7TUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSH19KWAgK1xuICAgICAgICAgICAgICBgKD86XFxcXC4oXFxcXGR7MSwke01BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEh9fSkpP2AgK1xuICAgICAgICAgICAgICBgKD86XFxcXC4oXFxcXGR7MSwke01BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEh9fSkpP2ApXG5jcmVhdGVUb2tlbignQ09FUkNFJywgYCR7c3JjW3QuQ09FUkNFUExBSU5dfSg/OiR8W15cXFxcZF0pYClcbmNyZWF0ZVRva2VuKCdDT0VSQ0VGVUxMJywgc3JjW3QuQ09FUkNFUExBSU5dICtcbiAgICAgICAgICAgICAgYCg/OiR7c3JjW3QuUFJFUkVMRUFTRV19KT9gICtcbiAgICAgICAgICAgICAgYCg/OiR7c3JjW3QuQlVJTERdfSk/YCArXG4gICAgICAgICAgICAgIGAoPzokfFteXFxcXGRdKWApXG5jcmVhdGVUb2tlbignQ09FUkNFUlRMJywgc3JjW3QuQ09FUkNFXSwgdHJ1ZSlcbmNyZWF0ZVRva2VuKCdDT0VSQ0VSVExGVUxMJywgc3JjW3QuQ09FUkNFRlVMTF0sIHRydWUpXG5cbi8vIFRpbGRlIHJhbmdlcy5cbi8vIE1lYW5pbmcgaXMgXCJyZWFzb25hYmx5IGF0IG9yIGdyZWF0ZXIgdGhhblwiXG5jcmVhdGVUb2tlbignTE9ORVRJTERFJywgJyg/On4+PyknKVxuXG5jcmVhdGVUb2tlbignVElMREVUUklNJywgYChcXFxccyopJHtzcmNbdC5MT05FVElMREVdfVxcXFxzK2AsIHRydWUpXG5leHBvcnRzLnRpbGRlVHJpbVJlcGxhY2UgPSAnJDF+J1xuXG5jcmVhdGVUb2tlbignVElMREUnLCBgXiR7c3JjW3QuTE9ORVRJTERFXX0ke3NyY1t0LlhSQU5HRVBMQUlOXX0kYClcbmNyZWF0ZVRva2VuKCdUSUxERUxPT1NFJywgYF4ke3NyY1t0LkxPTkVUSUxERV19JHtzcmNbdC5YUkFOR0VQTEFJTkxPT1NFXX0kYClcblxuLy8gQ2FyZXQgcmFuZ2VzLlxuLy8gTWVhbmluZyBpcyBcImF0IGxlYXN0IGFuZCBiYWNrd2FyZHMgY29tcGF0aWJsZSB3aXRoXCJcbmNyZWF0ZVRva2VuKCdMT05FQ0FSRVQnLCAnKD86XFxcXF4pJylcblxuY3JlYXRlVG9rZW4oJ0NBUkVUVFJJTScsIGAoXFxcXHMqKSR7c3JjW3QuTE9ORUNBUkVUXX1cXFxccytgLCB0cnVlKVxuZXhwb3J0cy5jYXJldFRyaW1SZXBsYWNlID0gJyQxXidcblxuY3JlYXRlVG9rZW4oJ0NBUkVUJywgYF4ke3NyY1t0LkxPTkVDQVJFVF19JHtzcmNbdC5YUkFOR0VQTEFJTl19JGApXG5jcmVhdGVUb2tlbignQ0FSRVRMT09TRScsIGBeJHtzcmNbdC5MT05FQ0FSRVRdfSR7c3JjW3QuWFJBTkdFUExBSU5MT09TRV19JGApXG5cbi8vIEEgc2ltcGxlIGd0L2x0L2VxIHRoaW5nLCBvciBqdXN0IFwiXCIgdG8gaW5kaWNhdGUgXCJhbnkgdmVyc2lvblwiXG5jcmVhdGVUb2tlbignQ09NUEFSQVRPUkxPT1NFJywgYF4ke3NyY1t0LkdUTFRdfVxcXFxzKigke3NyY1t0LkxPT1NFUExBSU5dfSkkfF4kYClcbmNyZWF0ZVRva2VuKCdDT01QQVJBVE9SJywgYF4ke3NyY1t0LkdUTFRdfVxcXFxzKigke3NyY1t0LkZVTExQTEFJTl19KSR8XiRgKVxuXG4vLyBBbiBleHByZXNzaW9uIHRvIHN0cmlwIGFueSB3aGl0ZXNwYWNlIGJldHdlZW4gdGhlIGd0bHQgYW5kIHRoZSB0aGluZ1xuLy8gaXQgbW9kaWZpZXMsIHNvIHRoYXQgYD4gMS4yLjNgID09PiBgPjEuMi4zYFxuY3JlYXRlVG9rZW4oJ0NPTVBBUkFUT1JUUklNJywgYChcXFxccyopJHtzcmNbdC5HVExUXVxufVxcXFxzKigke3NyY1t0LkxPT1NFUExBSU5dfXwke3NyY1t0LlhSQU5HRVBMQUlOXX0pYCwgdHJ1ZSlcbmV4cG9ydHMuY29tcGFyYXRvclRyaW1SZXBsYWNlID0gJyQxJDIkMydcblxuLy8gU29tZXRoaW5nIGxpa2UgYDEuMi4zIC0gMS4yLjRgXG4vLyBOb3RlIHRoYXQgdGhlc2UgYWxsIHVzZSB0aGUgbG9vc2UgZm9ybSwgYmVjYXVzZSB0aGV5J2xsIGJlXG4vLyBjaGVja2VkIGFnYWluc3QgZWl0aGVyIHRoZSBzdHJpY3Qgb3IgbG9vc2UgY29tcGFyYXRvciBmb3JtXG4vLyBsYXRlci5cbmNyZWF0ZVRva2VuKCdIWVBIRU5SQU5HRScsIGBeXFxcXHMqKCR7c3JjW3QuWFJBTkdFUExBSU5dfSlgICtcbiAgICAgICAgICAgICAgICAgICBgXFxcXHMrLVxcXFxzK2AgK1xuICAgICAgICAgICAgICAgICAgIGAoJHtzcmNbdC5YUkFOR0VQTEFJTl19KWAgK1xuICAgICAgICAgICAgICAgICAgIGBcXFxccyokYClcblxuY3JlYXRlVG9rZW4oJ0hZUEhFTlJBTkdFTE9PU0UnLCBgXlxcXFxzKigke3NyY1t0LlhSQU5HRVBMQUlOTE9PU0VdfSlgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBcXFxccystXFxcXHMrYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgKCR7c3JjW3QuWFJBTkdFUExBSU5MT09TRV19KWAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYFxcXFxzKiRgKVxuXG4vLyBTdGFyIHJhbmdlcyBiYXNpY2FsbHkganVzdCBhbGxvdyBhbnl0aGluZyBhdCBhbGwuXG5jcmVhdGVUb2tlbignU1RBUicsICcoPHw+KT89P1xcXFxzKlxcXFwqJylcbi8vID49MC4wLjAgaXMgbGlrZSBhIHN0YXJcbmNyZWF0ZVRva2VuKCdHVEUwJywgJ15cXFxccyo+PVxcXFxzKjBcXFxcLjBcXFxcLjBcXFxccyokJylcbmNyZWF0ZVRva2VuKCdHVEUwUFJFJywgJ15cXFxccyo+PVxcXFxzKjBcXFxcLjBcXFxcLjAtMFxcXFxzKiQnKVxuIiwiLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgZ3JlYXRlciB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlLlxuY29uc3Qgb3V0c2lkZSA9IHJlcXVpcmUoJy4vb3V0c2lkZScpXG5jb25zdCBndHIgPSAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpID0+IG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc+Jywgb3B0aW9ucylcbm1vZHVsZS5leHBvcnRzID0gZ3RyXG4iLCJjb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuY29uc3QgaW50ZXJzZWN0cyA9IChyMSwgcjIsIG9wdGlvbnMpID0+IHtcbiAgcjEgPSBuZXcgUmFuZ2UocjEsIG9wdGlvbnMpXG4gIHIyID0gbmV3IFJhbmdlKHIyLCBvcHRpb25zKVxuICByZXR1cm4gcjEuaW50ZXJzZWN0cyhyMiwgb3B0aW9ucylcbn1cbm1vZHVsZS5leHBvcnRzID0gaW50ZXJzZWN0c1xuIiwiY29uc3Qgb3V0c2lkZSA9IHJlcXVpcmUoJy4vb3V0c2lkZScpXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBsZXNzIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2VcbmNvbnN0IGx0ciA9ICh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykgPT4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJzwnLCBvcHRpb25zKVxubW9kdWxlLmV4cG9ydHMgPSBsdHJcbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5cbmNvbnN0IG1heFNhdGlzZnlpbmcgPSAodmVyc2lvbnMsIHJhbmdlLCBvcHRpb25zKSA9PiB7XG4gIGxldCBtYXggPSBudWxsXG4gIGxldCBtYXhTViA9IG51bGxcbiAgbGV0IHJhbmdlT2JqID0gbnVsbFxuICB0cnkge1xuICAgIHJhbmdlT2JqID0gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgdmVyc2lvbnMuZm9yRWFjaCgodikgPT4ge1xuICAgIGlmIChyYW5nZU9iai50ZXN0KHYpKSB7XG4gICAgICAvLyBzYXRpc2ZpZXModiwgcmFuZ2UsIG9wdGlvbnMpXG4gICAgICBpZiAoIW1heCB8fCBtYXhTVi5jb21wYXJlKHYpID09PSAtMSkge1xuICAgICAgICAvLyBjb21wYXJlKG1heCwgdiwgdHJ1ZSlcbiAgICAgICAgbWF4ID0gdlxuICAgICAgICBtYXhTViA9IG5ldyBTZW1WZXIobWF4LCBvcHRpb25zKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIG1heFxufVxubW9kdWxlLmV4cG9ydHMgPSBtYXhTYXRpc2Z5aW5nXG4iLCJjb25zdCBTZW1WZXIgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3NlbXZlcicpXG5jb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuY29uc3QgbWluU2F0aXNmeWluZyA9ICh2ZXJzaW9ucywgcmFuZ2UsIG9wdGlvbnMpID0+IHtcbiAgbGV0IG1pbiA9IG51bGxcbiAgbGV0IG1pblNWID0gbnVsbFxuICBsZXQgcmFuZ2VPYmogPSBudWxsXG4gIHRyeSB7XG4gICAgcmFuZ2VPYmogPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICB2ZXJzaW9ucy5mb3JFYWNoKCh2KSA9PiB7XG4gICAgaWYgKHJhbmdlT2JqLnRlc3QodikpIHtcbiAgICAgIC8vIHNhdGlzZmllcyh2LCByYW5nZSwgb3B0aW9ucylcbiAgICAgIGlmICghbWluIHx8IG1pblNWLmNvbXBhcmUodikgPT09IDEpIHtcbiAgICAgICAgLy8gY29tcGFyZShtaW4sIHYsIHRydWUpXG4gICAgICAgIG1pbiA9IHZcbiAgICAgICAgbWluU1YgPSBuZXcgU2VtVmVyKG1pbiwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBtaW5cbn1cbm1vZHVsZS5leHBvcnRzID0gbWluU2F0aXNmeWluZ1xuIiwiY29uc3QgU2VtVmVyID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9zZW12ZXInKVxuY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlJylcbmNvbnN0IGd0ID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2d0JylcblxuY29uc3QgbWluVmVyc2lvbiA9IChyYW5nZSwgbG9vc2UpID0+IHtcbiAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKVxuXG4gIGxldCBtaW52ZXIgPSBuZXcgU2VtVmVyKCcwLjAuMCcpXG4gIGlmIChyYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICBtaW52ZXIgPSBuZXcgU2VtVmVyKCcwLjAuMC0wJylcbiAgaWYgKHJhbmdlLnRlc3QobWludmVyKSkge1xuICAgIHJldHVybiBtaW52ZXJcbiAgfVxuXG4gIG1pbnZlciA9IG51bGxcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByYW5nZS5zZXQubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBjb21wYXJhdG9ycyA9IHJhbmdlLnNldFtpXVxuXG4gICAgbGV0IHNldE1pbiA9IG51bGxcbiAgICBjb21wYXJhdG9ycy5mb3JFYWNoKChjb21wYXJhdG9yKSA9PiB7XG4gICAgICAvLyBDbG9uZSB0byBhdm9pZCBtYW5pcHVsYXRpbmcgdGhlIGNvbXBhcmF0b3IncyBzZW12ZXIgb2JqZWN0LlxuICAgICAgY29uc3QgY29tcHZlciA9IG5ldyBTZW1WZXIoY29tcGFyYXRvci5zZW12ZXIudmVyc2lvbilcbiAgICAgIHN3aXRjaCAoY29tcGFyYXRvci5vcGVyYXRvcikge1xuICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICBpZiAoY29tcHZlci5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29tcHZlci5wYXRjaCsrXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXB2ZXIucHJlcmVsZWFzZS5wdXNoKDApXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbXB2ZXIucmF3ID0gY29tcHZlci5mb3JtYXQoKVxuICAgICAgICAgIC8qIGZhbGx0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJyc6XG4gICAgICAgIGNhc2UgJz49JzpcbiAgICAgICAgICBpZiAoIXNldE1pbiB8fCBndChjb21wdmVyLCBzZXRNaW4pKSB7XG4gICAgICAgICAgICBzZXRNaW4gPSBjb21wdmVyXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJzwnOlxuICAgICAgICBjYXNlICc8PSc6XG4gICAgICAgICAgLyogSWdub3JlIG1heGltdW0gdmVyc2lvbnMgKi9cbiAgICAgICAgICBicmVha1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5leHBlY3RlZCBvcGVyYXRpb246ICR7Y29tcGFyYXRvci5vcGVyYXRvcn1gKVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHNldE1pbiAmJiAoIW1pbnZlciB8fCBndChtaW52ZXIsIHNldE1pbikpKSB7XG4gICAgICBtaW52ZXIgPSBzZXRNaW5cbiAgICB9XG4gIH1cblxuICBpZiAobWludmVyICYmIHJhbmdlLnRlc3QobWludmVyKSkge1xuICAgIHJldHVybiBtaW52ZXJcbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG5tb2R1bGUuZXhwb3J0cyA9IG1pblZlcnNpb25cbiIsImNvbnN0IFNlbVZlciA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvc2VtdmVyJylcbmNvbnN0IENvbXBhcmF0b3IgPSByZXF1aXJlKCcuLi9jbGFzc2VzL2NvbXBhcmF0b3InKVxuY29uc3QgeyBBTlkgfSA9IENvbXBhcmF0b3JcbmNvbnN0IFJhbmdlID0gcmVxdWlyZSgnLi4vY2xhc3Nlcy9yYW5nZScpXG5jb25zdCBzYXRpc2ZpZXMgPSByZXF1aXJlKCcuLi9mdW5jdGlvbnMvc2F0aXNmaWVzJylcbmNvbnN0IGd0ID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2d0JylcbmNvbnN0IGx0ID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2x0JylcbmNvbnN0IGx0ZSA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9sdGUnKVxuY29uc3QgZ3RlID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2d0ZScpXG5cbmNvbnN0IG91dHNpZGUgPSAodmVyc2lvbiwgcmFuZ2UsIGhpbG8sIG9wdGlvbnMpID0+IHtcbiAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgb3B0aW9ucylcbiAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG5cbiAgbGV0IGd0Zm4sIGx0ZWZuLCBsdGZuLCBjb21wLCBlY29tcFxuICBzd2l0Y2ggKGhpbG8pIHtcbiAgICBjYXNlICc+JzpcbiAgICAgIGd0Zm4gPSBndFxuICAgICAgbHRlZm4gPSBsdGVcbiAgICAgIGx0Zm4gPSBsdFxuICAgICAgY29tcCA9ICc+J1xuICAgICAgZWNvbXAgPSAnPj0nXG4gICAgICBicmVha1xuICAgIGNhc2UgJzwnOlxuICAgICAgZ3RmbiA9IGx0XG4gICAgICBsdGVmbiA9IGd0ZVxuICAgICAgbHRmbiA9IGd0XG4gICAgICBjb21wID0gJzwnXG4gICAgICBlY29tcCA9ICc8PSdcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ011c3QgcHJvdmlkZSBhIGhpbG8gdmFsIG9mIFwiPFwiIG9yIFwiPlwiJylcbiAgfVxuXG4gIC8vIElmIGl0IHNhdGlzZmllcyB0aGUgcmFuZ2UgaXQgaXMgbm90IG91dHNpZGVcbiAgaWYgKHNhdGlzZmllcyh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIEZyb20gbm93IG9uLCB2YXJpYWJsZSB0ZXJtcyBhcmUgYXMgaWYgd2UncmUgaW4gXCJndHJcIiBtb2RlLlxuICAvLyBidXQgbm90ZSB0aGF0IGV2ZXJ5dGhpbmcgaXMgZmxpcHBlZCBmb3IgdGhlIFwibHRyXCIgZnVuY3Rpb24uXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByYW5nZS5zZXQubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBjb21wYXJhdG9ycyA9IHJhbmdlLnNldFtpXVxuXG4gICAgbGV0IGhpZ2ggPSBudWxsXG4gICAgbGV0IGxvdyA9IG51bGxcblxuICAgIGNvbXBhcmF0b3JzLmZvckVhY2goKGNvbXBhcmF0b3IpID0+IHtcbiAgICAgIGlmIChjb21wYXJhdG9yLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgICAgIGNvbXBhcmF0b3IgPSBuZXcgQ29tcGFyYXRvcignPj0wLjAuMCcpXG4gICAgICB9XG4gICAgICBoaWdoID0gaGlnaCB8fCBjb21wYXJhdG9yXG4gICAgICBsb3cgPSBsb3cgfHwgY29tcGFyYXRvclxuICAgICAgaWYgKGd0Zm4oY29tcGFyYXRvci5zZW12ZXIsIGhpZ2guc2VtdmVyLCBvcHRpb25zKSkge1xuICAgICAgICBoaWdoID0gY29tcGFyYXRvclxuICAgICAgfSBlbHNlIGlmIChsdGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBsb3cuc2VtdmVyLCBvcHRpb25zKSkge1xuICAgICAgICBsb3cgPSBjb21wYXJhdG9yXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIElmIHRoZSBlZGdlIHZlcnNpb24gY29tcGFyYXRvciBoYXMgYSBvcGVyYXRvciB0aGVuIG91ciB2ZXJzaW9uXG4gICAgLy8gaXNuJ3Qgb3V0c2lkZSBpdFxuICAgIGlmIChoaWdoLm9wZXJhdG9yID09PSBjb21wIHx8IGhpZ2gub3BlcmF0b3IgPT09IGVjb21wKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgbG93ZXN0IHZlcnNpb24gY29tcGFyYXRvciBoYXMgYW4gb3BlcmF0b3IgYW5kIG91ciB2ZXJzaW9uXG4gICAgLy8gaXMgbGVzcyB0aGFuIGl0IHRoZW4gaXQgaXNuJ3QgaGlnaGVyIHRoYW4gdGhlIHJhbmdlXG4gICAgaWYgKCghbG93Lm9wZXJhdG9yIHx8IGxvdy5vcGVyYXRvciA9PT0gY29tcCkgJiZcbiAgICAgICAgbHRlZm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSBpZiAobG93Lm9wZXJhdG9yID09PSBlY29tcCAmJiBsdGZuKHZlcnNpb24sIGxvdy5zZW12ZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvdXRzaWRlXG4iLCIvLyBnaXZlbiBhIHNldCBvZiB2ZXJzaW9ucyBhbmQgYSByYW5nZSwgY3JlYXRlIGEgXCJzaW1wbGlmaWVkXCIgcmFuZ2Vcbi8vIHRoYXQgaW5jbHVkZXMgdGhlIHNhbWUgdmVyc2lvbnMgdGhhdCB0aGUgb3JpZ2luYWwgcmFuZ2UgZG9lc1xuLy8gSWYgdGhlIG9yaWdpbmFsIHJhbmdlIGlzIHNob3J0ZXIgdGhhbiB0aGUgc2ltcGxpZmllZCBvbmUsIHJldHVybiB0aGF0LlxuY29uc3Qgc2F0aXNmaWVzID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL3NhdGlzZmllcy5qcycpXG5jb25zdCBjb21wYXJlID0gcmVxdWlyZSgnLi4vZnVuY3Rpb25zL2NvbXBhcmUuanMnKVxubW9kdWxlLmV4cG9ydHMgPSAodmVyc2lvbnMsIHJhbmdlLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHNldCA9IFtdXG4gIGxldCBmaXJzdCA9IG51bGxcbiAgbGV0IHByZXYgPSBudWxsXG4gIGNvbnN0IHYgPSB2ZXJzaW9ucy5zb3J0KChhLCBiKSA9PiBjb21wYXJlKGEsIGIsIG9wdGlvbnMpKVxuICBmb3IgKGNvbnN0IHZlcnNpb24gb2Ygdikge1xuICAgIGNvbnN0IGluY2x1ZGVkID0gc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKVxuICAgIGlmIChpbmNsdWRlZCkge1xuICAgICAgcHJldiA9IHZlcnNpb25cbiAgICAgIGlmICghZmlyc3QpIHtcbiAgICAgICAgZmlyc3QgPSB2ZXJzaW9uXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgIHNldC5wdXNoKFtmaXJzdCwgcHJldl0pXG4gICAgICB9XG4gICAgICBwcmV2ID0gbnVsbFxuICAgICAgZmlyc3QgPSBudWxsXG4gICAgfVxuICB9XG4gIGlmIChmaXJzdCkge1xuICAgIHNldC5wdXNoKFtmaXJzdCwgbnVsbF0pXG4gIH1cblxuICBjb25zdCByYW5nZXMgPSBbXVxuICBmb3IgKGNvbnN0IFttaW4sIG1heF0gb2Ygc2V0KSB7XG4gICAgaWYgKG1pbiA9PT0gbWF4KSB7XG4gICAgICByYW5nZXMucHVzaChtaW4pXG4gICAgfSBlbHNlIGlmICghbWF4ICYmIG1pbiA9PT0gdlswXSkge1xuICAgICAgcmFuZ2VzLnB1c2goJyonKVxuICAgIH0gZWxzZSBpZiAoIW1heCkge1xuICAgICAgcmFuZ2VzLnB1c2goYD49JHttaW59YClcbiAgICB9IGVsc2UgaWYgKG1pbiA9PT0gdlswXSkge1xuICAgICAgcmFuZ2VzLnB1c2goYDw9JHttYXh9YClcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZ2VzLnB1c2goYCR7bWlufSAtICR7bWF4fWApXG4gICAgfVxuICB9XG4gIGNvbnN0IHNpbXBsaWZpZWQgPSByYW5nZXMuam9pbignIHx8ICcpXG4gIGNvbnN0IG9yaWdpbmFsID0gdHlwZW9mIHJhbmdlLnJhdyA9PT0gJ3N0cmluZycgPyByYW5nZS5yYXcgOiBTdHJpbmcocmFuZ2UpXG4gIHJldHVybiBzaW1wbGlmaWVkLmxlbmd0aCA8IG9yaWdpbmFsLmxlbmd0aCA/IHNpbXBsaWZpZWQgOiByYW5nZVxufVxuIiwiY29uc3QgUmFuZ2UgPSByZXF1aXJlKCcuLi9jbGFzc2VzL3JhbmdlLmpzJylcbmNvbnN0IENvbXBhcmF0b3IgPSByZXF1aXJlKCcuLi9jbGFzc2VzL2NvbXBhcmF0b3IuanMnKVxuY29uc3QgeyBBTlkgfSA9IENvbXBhcmF0b3JcbmNvbnN0IHNhdGlzZmllcyA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9zYXRpc2ZpZXMuanMnKVxuY29uc3QgY29tcGFyZSA9IHJlcXVpcmUoJy4uL2Z1bmN0aW9ucy9jb21wYXJlLmpzJylcblxuLy8gQ29tcGxleCByYW5nZSBgcjEgfHwgcjIgfHwgLi4uYCBpcyBhIHN1YnNldCBvZiBgUjEgfHwgUjIgfHwgLi4uYCBpZmY6XG4vLyAtIEV2ZXJ5IHNpbXBsZSByYW5nZSBgcjEsIHIyLCAuLi5gIGlzIGEgbnVsbCBzZXQsIE9SXG4vLyAtIEV2ZXJ5IHNpbXBsZSByYW5nZSBgcjEsIHIyLCAuLi5gIHdoaWNoIGlzIG5vdCBhIG51bGwgc2V0IGlzIGEgc3Vic2V0IG9mXG4vLyAgIHNvbWUgYFIxLCBSMiwgLi4uYFxuLy9cbi8vIFNpbXBsZSByYW5nZSBgYzEgYzIgLi4uYCBpcyBhIHN1YnNldCBvZiBzaW1wbGUgcmFuZ2UgYEMxIEMyIC4uLmAgaWZmOlxuLy8gLSBJZiBjIGlzIG9ubHkgdGhlIEFOWSBjb21wYXJhdG9yXG4vLyAgIC0gSWYgQyBpcyBvbmx5IHRoZSBBTlkgY29tcGFyYXRvciwgcmV0dXJuIHRydWVcbi8vICAgLSBFbHNlIGlmIGluIHByZXJlbGVhc2UgbW9kZSwgcmV0dXJuIGZhbHNlXG4vLyAgIC0gZWxzZSByZXBsYWNlIGMgd2l0aCBgWz49MC4wLjBdYFxuLy8gLSBJZiBDIGlzIG9ubHkgdGhlIEFOWSBjb21wYXJhdG9yXG4vLyAgIC0gaWYgaW4gcHJlcmVsZWFzZSBtb2RlLCByZXR1cm4gdHJ1ZVxuLy8gICAtIGVsc2UgcmVwbGFjZSBDIHdpdGggYFs+PTAuMC4wXWBcbi8vIC0gTGV0IEVRIGJlIHRoZSBzZXQgb2YgPSBjb21wYXJhdG9ycyBpbiBjXG4vLyAtIElmIEVRIGlzIG1vcmUgdGhhbiBvbmUsIHJldHVybiB0cnVlIChudWxsIHNldClcbi8vIC0gTGV0IEdUIGJlIHRoZSBoaWdoZXN0ID4gb3IgPj0gY29tcGFyYXRvciBpbiBjXG4vLyAtIExldCBMVCBiZSB0aGUgbG93ZXN0IDwgb3IgPD0gY29tcGFyYXRvciBpbiBjXG4vLyAtIElmIEdUIGFuZCBMVCwgYW5kIEdULnNlbXZlciA+IExULnNlbXZlciwgcmV0dXJuIHRydWUgKG51bGwgc2V0KVxuLy8gLSBJZiBhbnkgQyBpcyBhID0gcmFuZ2UsIGFuZCBHVCBvciBMVCBhcmUgc2V0LCByZXR1cm4gZmFsc2Vcbi8vIC0gSWYgRVFcbi8vICAgLSBJZiBHVCwgYW5kIEVRIGRvZXMgbm90IHNhdGlzZnkgR1QsIHJldHVybiB0cnVlIChudWxsIHNldClcbi8vICAgLSBJZiBMVCwgYW5kIEVRIGRvZXMgbm90IHNhdGlzZnkgTFQsIHJldHVybiB0cnVlIChudWxsIHNldClcbi8vICAgLSBJZiBFUSBzYXRpc2ZpZXMgZXZlcnkgQywgcmV0dXJuIHRydWVcbi8vICAgLSBFbHNlIHJldHVybiBmYWxzZVxuLy8gLSBJZiBHVFxuLy8gICAtIElmIEdULnNlbXZlciBpcyBsb3dlciB0aGFuIGFueSA+IG9yID49IGNvbXAgaW4gQywgcmV0dXJuIGZhbHNlXG4vLyAgIC0gSWYgR1QgaXMgPj0sIGFuZCBHVC5zZW12ZXIgZG9lcyBub3Qgc2F0aXNmeSBldmVyeSBDLCByZXR1cm4gZmFsc2Vcbi8vICAgLSBJZiBHVC5zZW12ZXIgaGFzIGEgcHJlcmVsZWFzZSwgYW5kIG5vdCBpbiBwcmVyZWxlYXNlIG1vZGVcbi8vICAgICAtIElmIG5vIEMgaGFzIGEgcHJlcmVsZWFzZSBhbmQgdGhlIEdULnNlbXZlciB0dXBsZSwgcmV0dXJuIGZhbHNlXG4vLyAtIElmIExUXG4vLyAgIC0gSWYgTFQuc2VtdmVyIGlzIGdyZWF0ZXIgdGhhbiBhbnkgPCBvciA8PSBjb21wIGluIEMsIHJldHVybiBmYWxzZVxuLy8gICAtIElmIExUIGlzIDw9LCBhbmQgTFQuc2VtdmVyIGRvZXMgbm90IHNhdGlzZnkgZXZlcnkgQywgcmV0dXJuIGZhbHNlXG4vLyAgIC0gSWYgR1Quc2VtdmVyIGhhcyBhIHByZXJlbGVhc2UsIGFuZCBub3QgaW4gcHJlcmVsZWFzZSBtb2RlXG4vLyAgICAgLSBJZiBubyBDIGhhcyBhIHByZXJlbGVhc2UgYW5kIHRoZSBMVC5zZW12ZXIgdHVwbGUsIHJldHVybiBmYWxzZVxuLy8gLSBFbHNlIHJldHVybiB0cnVlXG5cbmNvbnN0IHN1YnNldCA9IChzdWIsIGRvbSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmIChzdWIgPT09IGRvbSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBzdWIgPSBuZXcgUmFuZ2Uoc3ViLCBvcHRpb25zKVxuICBkb20gPSBuZXcgUmFuZ2UoZG9tLCBvcHRpb25zKVxuICBsZXQgc2F3Tm9uTnVsbCA9IGZhbHNlXG5cbiAgT1VURVI6IGZvciAoY29uc3Qgc2ltcGxlU3ViIG9mIHN1Yi5zZXQpIHtcbiAgICBmb3IgKGNvbnN0IHNpbXBsZURvbSBvZiBkb20uc2V0KSB7XG4gICAgICBjb25zdCBpc1N1YiA9IHNpbXBsZVN1YnNldChzaW1wbGVTdWIsIHNpbXBsZURvbSwgb3B0aW9ucylcbiAgICAgIHNhd05vbk51bGwgPSBzYXdOb25OdWxsIHx8IGlzU3ViICE9PSBudWxsXG4gICAgICBpZiAoaXNTdWIpIHtcbiAgICAgICAgY29udGludWUgT1VURVJcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdGhlIG51bGwgc2V0IGlzIGEgc3Vic2V0IG9mIGV2ZXJ5dGhpbmcsIGJ1dCBudWxsIHNpbXBsZSByYW5nZXMgaW5cbiAgICAvLyBhIGNvbXBsZXggcmFuZ2Ugc2hvdWxkIGJlIGlnbm9yZWQuICBzbyBpZiB3ZSBzYXcgYSBub24tbnVsbCByYW5nZSxcbiAgICAvLyB0aGVuIHdlIGtub3cgdGhpcyBpc24ndCBhIHN1YnNldCwgYnV0IGlmIEVWRVJZIHNpbXBsZSByYW5nZSB3YXMgbnVsbCxcbiAgICAvLyB0aGVuIGl0IGlzIGEgc3Vic2V0LlxuICAgIGlmIChzYXdOb25OdWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3QgbWluaW11bVZlcnNpb25XaXRoUHJlUmVsZWFzZSA9IFtuZXcgQ29tcGFyYXRvcignPj0wLjAuMC0wJyldXG5jb25zdCBtaW5pbXVtVmVyc2lvbiA9IFtuZXcgQ29tcGFyYXRvcignPj0wLjAuMCcpXVxuXG5jb25zdCBzaW1wbGVTdWJzZXQgPSAoc3ViLCBkb20sIG9wdGlvbnMpID0+IHtcbiAgaWYgKHN1YiA9PT0gZG9tKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlmIChzdWIubGVuZ3RoID09PSAxICYmIHN1YlswXS5zZW12ZXIgPT09IEFOWSkge1xuICAgIGlmIChkb20ubGVuZ3RoID09PSAxICYmIGRvbVswXS5zZW12ZXIgPT09IEFOWSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpIHtcbiAgICAgIHN1YiA9IG1pbmltdW1WZXJzaW9uV2l0aFByZVJlbGVhc2VcbiAgICB9IGVsc2Uge1xuICAgICAgc3ViID0gbWluaW11bVZlcnNpb25cbiAgICB9XG4gIH1cblxuICBpZiAoZG9tLmxlbmd0aCA9PT0gMSAmJiBkb21bMF0uc2VtdmVyID09PSBBTlkpIHtcbiAgICBpZiAob3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tID0gbWluaW11bVZlcnNpb25cbiAgICB9XG4gIH1cblxuICBjb25zdCBlcVNldCA9IG5ldyBTZXQoKVxuICBsZXQgZ3QsIGx0XG4gIGZvciAoY29uc3QgYyBvZiBzdWIpIHtcbiAgICBpZiAoYy5vcGVyYXRvciA9PT0gJz4nIHx8IGMub3BlcmF0b3IgPT09ICc+PScpIHtcbiAgICAgIGd0ID0gaGlnaGVyR1QoZ3QsIGMsIG9wdGlvbnMpXG4gICAgfSBlbHNlIGlmIChjLm9wZXJhdG9yID09PSAnPCcgfHwgYy5vcGVyYXRvciA9PT0gJzw9Jykge1xuICAgICAgbHQgPSBsb3dlckxUKGx0LCBjLCBvcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBlcVNldC5hZGQoYy5zZW12ZXIpXG4gICAgfVxuICB9XG5cbiAgaWYgKGVxU2V0LnNpemUgPiAxKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGxldCBndGx0Q29tcFxuICBpZiAoZ3QgJiYgbHQpIHtcbiAgICBndGx0Q29tcCA9IGNvbXBhcmUoZ3Quc2VtdmVyLCBsdC5zZW12ZXIsIG9wdGlvbnMpXG4gICAgaWYgKGd0bHRDb21wID4gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9IGVsc2UgaWYgKGd0bHRDb21wID09PSAwICYmIChndC5vcGVyYXRvciAhPT0gJz49JyB8fCBsdC5vcGVyYXRvciAhPT0gJzw9JykpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgLy8gd2lsbCBpdGVyYXRlIG9uZSBvciB6ZXJvIHRpbWVzXG4gIGZvciAoY29uc3QgZXEgb2YgZXFTZXQpIHtcbiAgICBpZiAoZ3QgJiYgIXNhdGlzZmllcyhlcSwgU3RyaW5nKGd0KSwgb3B0aW9ucykpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgaWYgKGx0ICYmICFzYXRpc2ZpZXMoZXEsIFN0cmluZyhsdCksIG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGZvciAoY29uc3QgYyBvZiBkb20pIHtcbiAgICAgIGlmICghc2F0aXNmaWVzKGVxLCBTdHJpbmcoYyksIG9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBsZXQgaGlnaGVyLCBsb3dlclxuICBsZXQgaGFzRG9tTFQsIGhhc0RvbUdUXG4gIC8vIGlmIHRoZSBzdWJzZXQgaGFzIGEgcHJlcmVsZWFzZSwgd2UgbmVlZCBhIGNvbXBhcmF0b3IgaW4gdGhlIHN1cGVyc2V0XG4gIC8vIHdpdGggdGhlIHNhbWUgdHVwbGUgYW5kIGEgcHJlcmVsZWFzZSwgb3IgaXQncyBub3QgYSBzdWJzZXRcbiAgbGV0IG5lZWREb21MVFByZSA9IGx0ICYmXG4gICAgIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UgJiZcbiAgICBsdC5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggPyBsdC5zZW12ZXIgOiBmYWxzZVxuICBsZXQgbmVlZERvbUdUUHJlID0gZ3QgJiZcbiAgICAhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSAmJlxuICAgIGd0LnNlbXZlci5wcmVyZWxlYXNlLmxlbmd0aCA/IGd0LnNlbXZlciA6IGZhbHNlXG4gIC8vIGV4Y2VwdGlvbjogPDEuMi4zLTAgaXMgdGhlIHNhbWUgYXMgPDEuMi4zXG4gIGlmIChuZWVkRG9tTFRQcmUgJiYgbmVlZERvbUxUUHJlLnByZXJlbGVhc2UubGVuZ3RoID09PSAxICYmXG4gICAgICBsdC5vcGVyYXRvciA9PT0gJzwnICYmIG5lZWREb21MVFByZS5wcmVyZWxlYXNlWzBdID09PSAwKSB7XG4gICAgbmVlZERvbUxUUHJlID0gZmFsc2VcbiAgfVxuXG4gIGZvciAoY29uc3QgYyBvZiBkb20pIHtcbiAgICBoYXNEb21HVCA9IGhhc0RvbUdUIHx8IGMub3BlcmF0b3IgPT09ICc+JyB8fCBjLm9wZXJhdG9yID09PSAnPj0nXG4gICAgaGFzRG9tTFQgPSBoYXNEb21MVCB8fCBjLm9wZXJhdG9yID09PSAnPCcgfHwgYy5vcGVyYXRvciA9PT0gJzw9J1xuICAgIGlmIChndCkge1xuICAgICAgaWYgKG5lZWREb21HVFByZSkge1xuICAgICAgICBpZiAoYy5zZW12ZXIucHJlcmVsZWFzZSAmJiBjLnNlbXZlci5wcmVyZWxlYXNlLmxlbmd0aCAmJlxuICAgICAgICAgICAgYy5zZW12ZXIubWFqb3IgPT09IG5lZWREb21HVFByZS5tYWpvciAmJlxuICAgICAgICAgICAgYy5zZW12ZXIubWlub3IgPT09IG5lZWREb21HVFByZS5taW5vciAmJlxuICAgICAgICAgICAgYy5zZW12ZXIucGF0Y2ggPT09IG5lZWREb21HVFByZS5wYXRjaCkge1xuICAgICAgICAgIG5lZWREb21HVFByZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjLm9wZXJhdG9yID09PSAnPicgfHwgYy5vcGVyYXRvciA9PT0gJz49Jykge1xuICAgICAgICBoaWdoZXIgPSBoaWdoZXJHVChndCwgYywgb3B0aW9ucylcbiAgICAgICAgaWYgKGhpZ2hlciA9PT0gYyAmJiBoaWdoZXIgIT09IGd0KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZ3Qub3BlcmF0b3IgPT09ICc+PScgJiYgIXNhdGlzZmllcyhndC5zZW12ZXIsIFN0cmluZyhjKSwgb3B0aW9ucykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsdCkge1xuICAgICAgaWYgKG5lZWREb21MVFByZSkge1xuICAgICAgICBpZiAoYy5zZW12ZXIucHJlcmVsZWFzZSAmJiBjLnNlbXZlci5wcmVyZWxlYXNlLmxlbmd0aCAmJlxuICAgICAgICAgICAgYy5zZW12ZXIubWFqb3IgPT09IG5lZWREb21MVFByZS5tYWpvciAmJlxuICAgICAgICAgICAgYy5zZW12ZXIubWlub3IgPT09IG5lZWREb21MVFByZS5taW5vciAmJlxuICAgICAgICAgICAgYy5zZW12ZXIucGF0Y2ggPT09IG5lZWREb21MVFByZS5wYXRjaCkge1xuICAgICAgICAgIG5lZWREb21MVFByZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjLm9wZXJhdG9yID09PSAnPCcgfHwgYy5vcGVyYXRvciA9PT0gJzw9Jykge1xuICAgICAgICBsb3dlciA9IGxvd2VyTFQobHQsIGMsIG9wdGlvbnMpXG4gICAgICAgIGlmIChsb3dlciA9PT0gYyAmJiBsb3dlciAhPT0gbHQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChsdC5vcGVyYXRvciA9PT0gJzw9JyAmJiAhc2F0aXNmaWVzKGx0LnNlbXZlciwgU3RyaW5nKGMpLCBvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFjLm9wZXJhdG9yICYmIChsdCB8fCBndCkgJiYgZ3RsdENvbXAgIT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZXJlIHdhcyBhIDwgb3IgPiwgYW5kIG5vdGhpbmcgaW4gdGhlIGRvbSwgdGhlbiBtdXN0IGJlIGZhbHNlXG4gIC8vIFVOTEVTUyBpdCB3YXMgbGltaXRlZCBieSBhbm90aGVyIHJhbmdlIGluIHRoZSBvdGhlciBkaXJlY3Rpb24uXG4gIC8vIEVnLCA+MS4wLjAgPDEuMC4xIGlzIHN0aWxsIGEgc3Vic2V0IG9mIDwyLjAuMFxuICBpZiAoZ3QgJiYgaGFzRG9tTFQgJiYgIWx0ICYmIGd0bHRDb21wICE9PSAwKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAobHQgJiYgaGFzRG9tR1QgJiYgIWd0ICYmIGd0bHRDb21wICE9PSAwKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyB3ZSBuZWVkZWQgYSBwcmVyZWxlYXNlIHJhbmdlIGluIGEgc3BlY2lmaWMgdHVwbGUsIGJ1dCBkaWRuJ3QgZ2V0IG9uZVxuICAvLyB0aGVuIHRoaXMgaXNuJ3QgYSBzdWJzZXQuICBlZyA+PTEuMi4zLXByZSBpcyBub3QgYSBzdWJzZXQgb2YgPj0xLjAuMCxcbiAgLy8gYmVjYXVzZSBpdCBpbmNsdWRlcyBwcmVyZWxlYXNlcyBpbiB0aGUgMS4yLjMgdHVwbGVcbiAgaWYgKG5lZWREb21HVFByZSB8fCBuZWVkRG9tTFRQcmUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbi8vID49MS4yLjMgaXMgbG93ZXIgdGhhbiA+MS4yLjNcbmNvbnN0IGhpZ2hlckdUID0gKGEsIGIsIG9wdGlvbnMpID0+IHtcbiAgaWYgKCFhKSB7XG4gICAgcmV0dXJuIGJcbiAgfVxuICBjb25zdCBjb21wID0gY29tcGFyZShhLnNlbXZlciwgYi5zZW12ZXIsIG9wdGlvbnMpXG4gIHJldHVybiBjb21wID4gMCA/IGFcbiAgICA6IGNvbXAgPCAwID8gYlxuICAgIDogYi5vcGVyYXRvciA9PT0gJz4nICYmIGEub3BlcmF0b3IgPT09ICc+PScgPyBiXG4gICAgOiBhXG59XG5cbi8vIDw9MS4yLjMgaXMgaGlnaGVyIHRoYW4gPDEuMi4zXG5jb25zdCBsb3dlckxUID0gKGEsIGIsIG9wdGlvbnMpID0+IHtcbiAgaWYgKCFhKSB7XG4gICAgcmV0dXJuIGJcbiAgfVxuICBjb25zdCBjb21wID0gY29tcGFyZShhLnNlbXZlciwgYi5zZW12ZXIsIG9wdGlvbnMpXG4gIHJldHVybiBjb21wIDwgMCA/IGFcbiAgICA6IGNvbXAgPiAwID8gYlxuICAgIDogYi5vcGVyYXRvciA9PT0gJzwnICYmIGEub3BlcmF0b3IgPT09ICc8PScgPyBiXG4gICAgOiBhXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3Vic2V0XG4iLCJjb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuXG4vLyBNb3N0bHkganVzdCBmb3IgdGVzdGluZyBhbmQgbGVnYWN5IEFQSSByZWFzb25zXG5jb25zdCB0b0NvbXBhcmF0b3JzID0gKHJhbmdlLCBvcHRpb25zKSA9PlxuICBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpLnNldFxuICAgIC5tYXAoY29tcCA9PiBjb21wLm1hcChjID0+IGMudmFsdWUpLmpvaW4oJyAnKS50cmltKCkuc3BsaXQoJyAnKSlcblxubW9kdWxlLmV4cG9ydHMgPSB0b0NvbXBhcmF0b3JzXG4iLCJjb25zdCBSYW5nZSA9IHJlcXVpcmUoJy4uL2NsYXNzZXMvcmFuZ2UnKVxuY29uc3QgdmFsaWRSYW5nZSA9IChyYW5nZSwgb3B0aW9ucykgPT4ge1xuICB0cnkge1xuICAgIC8vIFJldHVybiAnKicgaW5zdGVhZCBvZiAnJyBzbyB0aGF0IHRydXRoaW5lc3Mgd29ya3MuXG4gICAgLy8gVGhpcyB3aWxsIHRocm93IGlmIGl0J3MgaW52YWxpZCBhbnl3YXlcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKS5yYW5nZSB8fCAnKidcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHZhbGlkUmFuZ2VcbiIsIid1c2Ugc3RyaWN0J1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoWWFsbGlzdCkge1xuICBZYWxsaXN0LnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24qICgpIHtcbiAgICBmb3IgKGxldCB3YWxrZXIgPSB0aGlzLmhlYWQ7IHdhbGtlcjsgd2Fsa2VyID0gd2Fsa2VyLm5leHQpIHtcbiAgICAgIHlpZWxkIHdhbGtlci52YWx1ZVxuICAgIH1cbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5tb2R1bGUuZXhwb3J0cyA9IFlhbGxpc3RcblxuWWFsbGlzdC5Ob2RlID0gTm9kZVxuWWFsbGlzdC5jcmVhdGUgPSBZYWxsaXN0XG5cbmZ1bmN0aW9uIFlhbGxpc3QgKGxpc3QpIHtcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIGlmICghKHNlbGYgaW5zdGFuY2VvZiBZYWxsaXN0KSkge1xuICAgIHNlbGYgPSBuZXcgWWFsbGlzdCgpXG4gIH1cblxuICBzZWxmLnRhaWwgPSBudWxsXG4gIHNlbGYuaGVhZCA9IG51bGxcbiAgc2VsZi5sZW5ndGggPSAwXG5cbiAgaWYgKGxpc3QgJiYgdHlwZW9mIGxpc3QuZm9yRWFjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgc2VsZi5wdXNoKGl0ZW0pXG4gICAgfSlcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgc2VsZi5wdXNoKGFyZ3VtZW50c1tpXSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2VsZlxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5yZW1vdmVOb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgaWYgKG5vZGUubGlzdCAhPT0gdGhpcykge1xuICAgIHRocm93IG5ldyBFcnJvcigncmVtb3Zpbmcgbm9kZSB3aGljaCBkb2VzIG5vdCBiZWxvbmcgdG8gdGhpcyBsaXN0JylcbiAgfVxuXG4gIHZhciBuZXh0ID0gbm9kZS5uZXh0XG4gIHZhciBwcmV2ID0gbm9kZS5wcmV2XG5cbiAgaWYgKG5leHQpIHtcbiAgICBuZXh0LnByZXYgPSBwcmV2XG4gIH1cblxuICBpZiAocHJldikge1xuICAgIHByZXYubmV4dCA9IG5leHRcbiAgfVxuXG4gIGlmIChub2RlID09PSB0aGlzLmhlYWQpIHtcbiAgICB0aGlzLmhlYWQgPSBuZXh0XG4gIH1cbiAgaWYgKG5vZGUgPT09IHRoaXMudGFpbCkge1xuICAgIHRoaXMudGFpbCA9IHByZXZcbiAgfVxuXG4gIG5vZGUubGlzdC5sZW5ndGgtLVxuICBub2RlLm5leHQgPSBudWxsXG4gIG5vZGUucHJldiA9IG51bGxcbiAgbm9kZS5saXN0ID0gbnVsbFxuXG4gIHJldHVybiBuZXh0XG59XG5cbllhbGxpc3QucHJvdG90eXBlLnVuc2hpZnROb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgaWYgKG5vZGUgPT09IHRoaXMuaGVhZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKG5vZGUubGlzdCkge1xuICAgIG5vZGUubGlzdC5yZW1vdmVOb2RlKG5vZGUpXG4gIH1cblxuICB2YXIgaGVhZCA9IHRoaXMuaGVhZFxuICBub2RlLmxpc3QgPSB0aGlzXG4gIG5vZGUubmV4dCA9IGhlYWRcbiAgaWYgKGhlYWQpIHtcbiAgICBoZWFkLnByZXYgPSBub2RlXG4gIH1cblxuICB0aGlzLmhlYWQgPSBub2RlXG4gIGlmICghdGhpcy50YWlsKSB7XG4gICAgdGhpcy50YWlsID0gbm9kZVxuICB9XG4gIHRoaXMubGVuZ3RoKytcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUucHVzaE5vZGUgPSBmdW5jdGlvbiAobm9kZSkge1xuICBpZiAobm9kZSA9PT0gdGhpcy50YWlsKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAobm9kZS5saXN0KSB7XG4gICAgbm9kZS5saXN0LnJlbW92ZU5vZGUobm9kZSlcbiAgfVxuXG4gIHZhciB0YWlsID0gdGhpcy50YWlsXG4gIG5vZGUubGlzdCA9IHRoaXNcbiAgbm9kZS5wcmV2ID0gdGFpbFxuICBpZiAodGFpbCkge1xuICAgIHRhaWwubmV4dCA9IG5vZGVcbiAgfVxuXG4gIHRoaXMudGFpbCA9IG5vZGVcbiAgaWYgKCF0aGlzLmhlYWQpIHtcbiAgICB0aGlzLmhlYWQgPSBub2RlXG4gIH1cbiAgdGhpcy5sZW5ndGgrK1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBwdXNoKHRoaXMsIGFyZ3VtZW50c1tpXSlcbiAgfVxuICByZXR1cm4gdGhpcy5sZW5ndGhcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uICgpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdW5zaGlmdCh0aGlzLCBhcmd1bWVudHNbaV0pXG4gIH1cbiAgcmV0dXJuIHRoaXMubGVuZ3RoXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnBvcCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLnRhaWwpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICB2YXIgcmVzID0gdGhpcy50YWlsLnZhbHVlXG4gIHRoaXMudGFpbCA9IHRoaXMudGFpbC5wcmV2XG4gIGlmICh0aGlzLnRhaWwpIHtcbiAgICB0aGlzLnRhaWwubmV4dCA9IG51bGxcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmhlYWQgPSBudWxsXG4gIH1cbiAgdGhpcy5sZW5ndGgtLVxuICByZXR1cm4gcmVzXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnNoaWZ0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIXRoaXMuaGVhZCkge1xuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIHZhciByZXMgPSB0aGlzLmhlYWQudmFsdWVcbiAgdGhpcy5oZWFkID0gdGhpcy5oZWFkLm5leHRcbiAgaWYgKHRoaXMuaGVhZCkge1xuICAgIHRoaXMuaGVhZC5wcmV2ID0gbnVsbFxuICB9IGVsc2Uge1xuICAgIHRoaXMudGFpbCA9IG51bGxcbiAgfVxuICB0aGlzLmxlbmd0aC0tXG4gIHJldHVybiByZXNcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChmbiwgdGhpc3ApIHtcbiAgdGhpc3AgPSB0aGlzcCB8fCB0aGlzXG4gIGZvciAodmFyIHdhbGtlciA9IHRoaXMuaGVhZCwgaSA9IDA7IHdhbGtlciAhPT0gbnVsbDsgaSsrKSB7XG4gICAgZm4uY2FsbCh0aGlzcCwgd2Fsa2VyLnZhbHVlLCBpLCB0aGlzKVxuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cbn1cblxuWWFsbGlzdC5wcm90b3R5cGUuZm9yRWFjaFJldmVyc2UgPSBmdW5jdGlvbiAoZm4sIHRoaXNwKSB7XG4gIHRoaXNwID0gdGhpc3AgfHwgdGhpc1xuICBmb3IgKHZhciB3YWxrZXIgPSB0aGlzLnRhaWwsIGkgPSB0aGlzLmxlbmd0aCAtIDE7IHdhbGtlciAhPT0gbnVsbDsgaS0tKSB7XG4gICAgZm4uY2FsbCh0aGlzcCwgd2Fsa2VyLnZhbHVlLCBpLCB0aGlzKVxuICAgIHdhbGtlciA9IHdhbGtlci5wcmV2XG4gIH1cbn1cblxuWWFsbGlzdC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG4pIHtcbiAgZm9yICh2YXIgaSA9IDAsIHdhbGtlciA9IHRoaXMuaGVhZDsgd2Fsa2VyICE9PSBudWxsICYmIGkgPCBuOyBpKyspIHtcbiAgICAvLyBhYm9ydCBvdXQgb2YgdGhlIGxpc3QgZWFybHkgaWYgd2UgaGl0IGEgY3ljbGVcbiAgICB3YWxrZXIgPSB3YWxrZXIubmV4dFxuICB9XG4gIGlmIChpID09PSBuICYmIHdhbGtlciAhPT0gbnVsbCkge1xuICAgIHJldHVybiB3YWxrZXIudmFsdWVcbiAgfVxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5nZXRSZXZlcnNlID0gZnVuY3Rpb24gKG4pIHtcbiAgZm9yICh2YXIgaSA9IDAsIHdhbGtlciA9IHRoaXMudGFpbDsgd2Fsa2VyICE9PSBudWxsICYmIGkgPCBuOyBpKyspIHtcbiAgICAvLyBhYm9ydCBvdXQgb2YgdGhlIGxpc3QgZWFybHkgaWYgd2UgaGl0IGEgY3ljbGVcbiAgICB3YWxrZXIgPSB3YWxrZXIucHJldlxuICB9XG4gIGlmIChpID09PSBuICYmIHdhbGtlciAhPT0gbnVsbCkge1xuICAgIHJldHVybiB3YWxrZXIudmFsdWVcbiAgfVxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5tYXAgPSBmdW5jdGlvbiAoZm4sIHRoaXNwKSB7XG4gIHRoaXNwID0gdGhpc3AgfHwgdGhpc1xuICB2YXIgcmVzID0gbmV3IFlhbGxpc3QoKVxuICBmb3IgKHZhciB3YWxrZXIgPSB0aGlzLmhlYWQ7IHdhbGtlciAhPT0gbnVsbDspIHtcbiAgICByZXMucHVzaChmbi5jYWxsKHRoaXNwLCB3YWxrZXIudmFsdWUsIHRoaXMpKVxuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5tYXBSZXZlcnNlID0gZnVuY3Rpb24gKGZuLCB0aGlzcCkge1xuICB0aGlzcCA9IHRoaXNwIHx8IHRoaXNcbiAgdmFyIHJlcyA9IG5ldyBZYWxsaXN0KClcbiAgZm9yICh2YXIgd2Fsa2VyID0gdGhpcy50YWlsOyB3YWxrZXIgIT09IG51bGw7KSB7XG4gICAgcmVzLnB1c2goZm4uY2FsbCh0aGlzcCwgd2Fsa2VyLnZhbHVlLCB0aGlzKSlcbiAgICB3YWxrZXIgPSB3YWxrZXIucHJldlxuICB9XG4gIHJldHVybiByZXNcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUucmVkdWNlID0gZnVuY3Rpb24gKGZuLCBpbml0aWFsKSB7XG4gIHZhciBhY2NcbiAgdmFyIHdhbGtlciA9IHRoaXMuaGVhZFxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICBhY2MgPSBpbml0aWFsXG4gIH0gZWxzZSBpZiAodGhpcy5oZWFkKSB7XG4gICAgd2Fsa2VyID0gdGhpcy5oZWFkLm5leHRcbiAgICBhY2MgPSB0aGlzLmhlYWQudmFsdWVcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWR1Y2Ugb2YgZW1wdHkgbGlzdCB3aXRoIG5vIGluaXRpYWwgdmFsdWUnKVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IHdhbGtlciAhPT0gbnVsbDsgaSsrKSB7XG4gICAgYWNjID0gZm4oYWNjLCB3YWxrZXIudmFsdWUsIGkpXG4gICAgd2Fsa2VyID0gd2Fsa2VyLm5leHRcbiAgfVxuXG4gIHJldHVybiBhY2Ncbn1cblxuWWFsbGlzdC5wcm90b3R5cGUucmVkdWNlUmV2ZXJzZSA9IGZ1bmN0aW9uIChmbiwgaW5pdGlhbCkge1xuICB2YXIgYWNjXG4gIHZhciB3YWxrZXIgPSB0aGlzLnRhaWxcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgYWNjID0gaW5pdGlhbFxuICB9IGVsc2UgaWYgKHRoaXMudGFpbCkge1xuICAgIHdhbGtlciA9IHRoaXMudGFpbC5wcmV2XG4gICAgYWNjID0gdGhpcy50YWlsLnZhbHVlXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUmVkdWNlIG9mIGVtcHR5IGxpc3Qgd2l0aCBubyBpbml0aWFsIHZhbHVlJylcbiAgfVxuXG4gIGZvciAodmFyIGkgPSB0aGlzLmxlbmd0aCAtIDE7IHdhbGtlciAhPT0gbnVsbDsgaS0tKSB7XG4gICAgYWNjID0gZm4oYWNjLCB3YWxrZXIudmFsdWUsIGkpXG4gICAgd2Fsa2VyID0gd2Fsa2VyLnByZXZcbiAgfVxuXG4gIHJldHVybiBhY2Ncbn1cblxuWWFsbGlzdC5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFyciA9IG5ldyBBcnJheSh0aGlzLmxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDAsIHdhbGtlciA9IHRoaXMuaGVhZDsgd2Fsa2VyICE9PSBudWxsOyBpKyspIHtcbiAgICBhcnJbaV0gPSB3YWxrZXIudmFsdWVcbiAgICB3YWxrZXIgPSB3YWxrZXIubmV4dFxuICB9XG4gIHJldHVybiBhcnJcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUudG9BcnJheVJldmVyc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhcnIgPSBuZXcgQXJyYXkodGhpcy5sZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwLCB3YWxrZXIgPSB0aGlzLnRhaWw7IHdhbGtlciAhPT0gbnVsbDsgaSsrKSB7XG4gICAgYXJyW2ldID0gd2Fsa2VyLnZhbHVlXG4gICAgd2Fsa2VyID0gd2Fsa2VyLnByZXZcbiAgfVxuICByZXR1cm4gYXJyXG59XG5cbllhbGxpc3QucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gKGZyb20sIHRvKSB7XG4gIHRvID0gdG8gfHwgdGhpcy5sZW5ndGhcbiAgaWYgKHRvIDwgMCkge1xuICAgIHRvICs9IHRoaXMubGVuZ3RoXG4gIH1cbiAgZnJvbSA9IGZyb20gfHwgMFxuICBpZiAoZnJvbSA8IDApIHtcbiAgICBmcm9tICs9IHRoaXMubGVuZ3RoXG4gIH1cbiAgdmFyIHJldCA9IG5ldyBZYWxsaXN0KClcbiAgaWYgKHRvIDwgZnJvbSB8fCB0byA8IDApIHtcbiAgICByZXR1cm4gcmV0XG4gIH1cbiAgaWYgKGZyb20gPCAwKSB7XG4gICAgZnJvbSA9IDBcbiAgfVxuICBpZiAodG8gPiB0aGlzLmxlbmd0aCkge1xuICAgIHRvID0gdGhpcy5sZW5ndGhcbiAgfVxuICBmb3IgKHZhciBpID0gMCwgd2Fsa2VyID0gdGhpcy5oZWFkOyB3YWxrZXIgIT09IG51bGwgJiYgaSA8IGZyb207IGkrKykge1xuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cbiAgZm9yICg7IHdhbGtlciAhPT0gbnVsbCAmJiBpIDwgdG87IGkrKywgd2Fsa2VyID0gd2Fsa2VyLm5leHQpIHtcbiAgICByZXQucHVzaCh3YWxrZXIudmFsdWUpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5zbGljZVJldmVyc2UgPSBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgdG8gPSB0byB8fCB0aGlzLmxlbmd0aFxuICBpZiAodG8gPCAwKSB7XG4gICAgdG8gKz0gdGhpcy5sZW5ndGhcbiAgfVxuICBmcm9tID0gZnJvbSB8fCAwXG4gIGlmIChmcm9tIDwgMCkge1xuICAgIGZyb20gKz0gdGhpcy5sZW5ndGhcbiAgfVxuICB2YXIgcmV0ID0gbmV3IFlhbGxpc3QoKVxuICBpZiAodG8gPCBmcm9tIHx8IHRvIDwgMCkge1xuICAgIHJldHVybiByZXRcbiAgfVxuICBpZiAoZnJvbSA8IDApIHtcbiAgICBmcm9tID0gMFxuICB9XG4gIGlmICh0byA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdG8gPSB0aGlzLmxlbmd0aFxuICB9XG4gIGZvciAodmFyIGkgPSB0aGlzLmxlbmd0aCwgd2Fsa2VyID0gdGhpcy50YWlsOyB3YWxrZXIgIT09IG51bGwgJiYgaSA+IHRvOyBpLS0pIHtcbiAgICB3YWxrZXIgPSB3YWxrZXIucHJldlxuICB9XG4gIGZvciAoOyB3YWxrZXIgIT09IG51bGwgJiYgaSA+IGZyb207IGktLSwgd2Fsa2VyID0gd2Fsa2VyLnByZXYpIHtcbiAgICByZXQucHVzaCh3YWxrZXIudmFsdWUpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5ZYWxsaXN0LnByb3RvdHlwZS5zcGxpY2UgPSBmdW5jdGlvbiAoc3RhcnQsIGRlbGV0ZUNvdW50LCAuLi5ub2Rlcykge1xuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHN0YXJ0ID0gdGhpcy5sZW5ndGggLSAxXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gdGhpcy5sZW5ndGggKyBzdGFydDtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCB3YWxrZXIgPSB0aGlzLmhlYWQ7IHdhbGtlciAhPT0gbnVsbCAmJiBpIDwgc3RhcnQ7IGkrKykge1xuICAgIHdhbGtlciA9IHdhbGtlci5uZXh0XG4gIH1cblxuICB2YXIgcmV0ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IHdhbGtlciAmJiBpIDwgZGVsZXRlQ291bnQ7IGkrKykge1xuICAgIHJldC5wdXNoKHdhbGtlci52YWx1ZSlcbiAgICB3YWxrZXIgPSB0aGlzLnJlbW92ZU5vZGUod2Fsa2VyKVxuICB9XG4gIGlmICh3YWxrZXIgPT09IG51bGwpIHtcbiAgICB3YWxrZXIgPSB0aGlzLnRhaWxcbiAgfVxuXG4gIGlmICh3YWxrZXIgIT09IHRoaXMuaGVhZCAmJiB3YWxrZXIgIT09IHRoaXMudGFpbCkge1xuICAgIHdhbGtlciA9IHdhbGtlci5wcmV2XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgd2Fsa2VyID0gaW5zZXJ0KHRoaXMsIHdhbGtlciwgbm9kZXNbaV0pXG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuWWFsbGlzdC5wcm90b3R5cGUucmV2ZXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYWQgPSB0aGlzLmhlYWRcbiAgdmFyIHRhaWwgPSB0aGlzLnRhaWxcbiAgZm9yICh2YXIgd2Fsa2VyID0gaGVhZDsgd2Fsa2VyICE9PSBudWxsOyB3YWxrZXIgPSB3YWxrZXIucHJldikge1xuICAgIHZhciBwID0gd2Fsa2VyLnByZXZcbiAgICB3YWxrZXIucHJldiA9IHdhbGtlci5uZXh0XG4gICAgd2Fsa2VyLm5leHQgPSBwXG4gIH1cbiAgdGhpcy5oZWFkID0gdGFpbFxuICB0aGlzLnRhaWwgPSBoZWFkXG4gIHJldHVybiB0aGlzXG59XG5cbmZ1bmN0aW9uIGluc2VydCAoc2VsZiwgbm9kZSwgdmFsdWUpIHtcbiAgdmFyIGluc2VydGVkID0gbm9kZSA9PT0gc2VsZi5oZWFkID9cbiAgICBuZXcgTm9kZSh2YWx1ZSwgbnVsbCwgbm9kZSwgc2VsZikgOlxuICAgIG5ldyBOb2RlKHZhbHVlLCBub2RlLCBub2RlLm5leHQsIHNlbGYpXG5cbiAgaWYgKGluc2VydGVkLm5leHQgPT09IG51bGwpIHtcbiAgICBzZWxmLnRhaWwgPSBpbnNlcnRlZFxuICB9XG4gIGlmIChpbnNlcnRlZC5wcmV2ID09PSBudWxsKSB7XG4gICAgc2VsZi5oZWFkID0gaW5zZXJ0ZWRcbiAgfVxuXG4gIHNlbGYubGVuZ3RoKytcblxuICByZXR1cm4gaW5zZXJ0ZWRcbn1cblxuZnVuY3Rpb24gcHVzaCAoc2VsZiwgaXRlbSkge1xuICBzZWxmLnRhaWwgPSBuZXcgTm9kZShpdGVtLCBzZWxmLnRhaWwsIG51bGwsIHNlbGYpXG4gIGlmICghc2VsZi5oZWFkKSB7XG4gICAgc2VsZi5oZWFkID0gc2VsZi50YWlsXG4gIH1cbiAgc2VsZi5sZW5ndGgrK1xufVxuXG5mdW5jdGlvbiB1bnNoaWZ0IChzZWxmLCBpdGVtKSB7XG4gIHNlbGYuaGVhZCA9IG5ldyBOb2RlKGl0ZW0sIG51bGwsIHNlbGYuaGVhZCwgc2VsZilcbiAgaWYgKCFzZWxmLnRhaWwpIHtcbiAgICBzZWxmLnRhaWwgPSBzZWxmLmhlYWRcbiAgfVxuICBzZWxmLmxlbmd0aCsrXG59XG5cbmZ1bmN0aW9uIE5vZGUgKHZhbHVlLCBwcmV2LCBuZXh0LCBsaXN0KSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBOb2RlKSkge1xuICAgIHJldHVybiBuZXcgTm9kZSh2YWx1ZSwgcHJldiwgbmV4dCwgbGlzdClcbiAgfVxuXG4gIHRoaXMubGlzdCA9IGxpc3RcbiAgdGhpcy52YWx1ZSA9IHZhbHVlXG5cbiAgaWYgKHByZXYpIHtcbiAgICBwcmV2Lm5leHQgPSB0aGlzXG4gICAgdGhpcy5wcmV2ID0gcHJldlxuICB9IGVsc2Uge1xuICAgIHRoaXMucHJldiA9IG51bGxcbiAgfVxuXG4gIGlmIChuZXh0KSB7XG4gICAgbmV4dC5wcmV2ID0gdGhpc1xuICAgIHRoaXMubmV4dCA9IG5leHRcbiAgfSBlbHNlIHtcbiAgICB0aGlzLm5leHQgPSBudWxsXG4gIH1cbn1cblxudHJ5IHtcbiAgLy8gYWRkIGlmIHN1cHBvcnQgZm9yIFN5bWJvbC5pdGVyYXRvciBpcyBwcmVzZW50XG4gIHJlcXVpcmUoJy4vaXRlcmF0b3IuanMnKShZYWxsaXN0KVxufSBjYXRjaCAoZXIpIHt9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFRyYW5zcG9ydFdlYlVTQiBmcm9tICdAbGVkZ2VyaHEvaHctdHJhbnNwb3J0LXdlYnVzYic7XG5pbXBvcnQgTGVkZ2VyQXBwIGZyb20gJ0B6b25kYXgvbGVkZ2VyLWNhc3Blcic7XG5pbXBvcnQge0J1ZmZlcn0gZnJvbSAnYnVmZmVyJztcblxuY29uc3QgU0VDX0tFWV9QUkVGSVggPSAnMDInO1xuXG5jb25zdCBMZWRnZXJBcHBTaW5nbGV0b24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGxldCBkb3ROZXRMZWRnZXJJbnN0YW5jZTogYW55O1xuICAgIGxldCB0cmFuc3BvcnQ6IGFueTtcbiAgICBsZXQgbGVkZ2VyQXBwOiBMZWRnZXJBcHA7XG5cbiAgICBsZXQgaXNDb25uZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKGluc3RhbmNlOiBhbnkpIHtcbiAgICAgICAgZG90TmV0TGVkZ2VySW5zdGFuY2UgPSBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRWZXJzaW9uKCkge1xuICAgICAgICB0cmFuc3BvcnQgPSBhd2FpdCBUcmFuc3BvcnRXZWJVU0IuY3JlYXRlKCk7XG4gICAgICAgIGxlZGdlckFwcCA9IG5ldyBMZWRnZXJBcHAodHJhbnNwb3J0KTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBsZWRnZXJBcHAuZ2V0VmVyc2lvbigpO1xuICAgICAgICBpZiAocmVzcG9uc2UucmV0dXJuQ29kZSAhPT0gMHg5MDAwKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihgRXJyb3I6ICR7cmVzcG9uc2UuZXJyb3JNZXNzYWdlfSAoMHgke3Jlc3BvbnNlLnJldHVybkNvZGUudG9TdHJpbmcoMTYpfSkuYCkpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRBcHBJbmZvKCkge1xuICAgICAgICB0cmFuc3BvcnQgPSBhd2FpdCBUcmFuc3BvcnRXZWJVU0IuY3JlYXRlKCk7XG4gICAgICAgIGxlZGdlckFwcCA9IG5ldyBMZWRnZXJBcHAodHJhbnNwb3J0KTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBsZWRnZXJBcHAuZ2V0QXBwSW5mbygpO1xuICAgICAgICBpZiAocmVzcG9uc2UucmV0dXJuQ29kZSAhPT0gMHg5MDAwKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihgRXJyb3I6ICR7cmVzcG9uc2UuZXJyb3JNZXNzYWdlfSAoMHgke3Jlc3BvbnNlLnJldHVybkNvZGUudG9TdHJpbmcoMTYpfSkuYCkpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBvbkRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIGRpc2Nvbm5lY3RlZC5cIik7XG5cbiAgICAgICAgdHJhbnNwb3J0LmNsb3NlKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkb3ROZXRMZWRnZXJJbnN0YW5jZSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICBkb3ROZXRMZWRnZXJJbnN0YW5jZS5pbnZva2VNZXRob2RBc3luYygnVXBkYXRlU3RhdGUnLCBmYWxzZSwgJycpO1xuXG4gICAgICAgIGlzQ29ubmVjdGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgZW5jb2RlUHVibGljS2V5ID0gKGJ5dGVzOiBVaW50OEFycmF5KTogc3RyaW5nID0+XG4gICAgICAgIFNFQ19LRVlfUFJFRklYICsgQnVmZmVyLmZyb20oYnl0ZXMpLnRvU3RyaW5nKCdoZXgnKTtcblxuICAgIGNvbnN0IGdldEFjY291bnRQYXRoID0gKGFjY3RJZHg6IG51bWJlcikgPT4gYG0vNDQnLzUwNicvMCcvMC8ke2FjY3RJZHgudG9TdHJpbmcoKX1gO1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gY29ubmVjdChhY2N0SWR4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCFpc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0cmFuc3BvcnQgPSBhd2FpdCBUcmFuc3BvcnRXZWJVU0IuY3JlYXRlKCk7XG4gICAgICAgICAgICAgICAgdHJhbnNwb3J0Lm9uKCdkaXNjb25uZWN0JywgKCkgPT4gb25EaXNjb25uZWN0KCkpO1xuXG4gICAgICAgICAgICAgICAgbGVkZ2VyQXBwID0gbmV3IExlZGdlckFwcCh0cmFuc3BvcnQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihgRXJyb3IgY29ubmVjdGluZyB0byBhIExlZGdlciBkZXZpY2U6ICR7ZXJyb3IubWVzc2FnZX0uYCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGxlZGdlckFwcC5nZXRBZGRyZXNzQW5kUHViS2V5KGdldEFjY291bnRQYXRoKGFjY3RJZHgpKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJldHVybkNvZGUgIT09IDB4OTAwMClcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGBFcnJvciBjb25uZWN0aW5nIHRvIGEgTGVkZ2VyIGRldmljZTogJHtyZXNwb25zZS5lcnJvck1lc3NhZ2V9ICgweCR7cmVzcG9uc2UucmV0dXJuQ29kZS50b1N0cmluZygxNil9KS5gKSk7XG5cbiAgICAgICAgICAgIGlzQ29ubmVjdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgY29uc3QgYWN0aXZlUGsgPSBlbmNvZGVQdWJsaWNLZXkocmVzcG9uc2UucHVibGljS2V5KTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb3ROZXRMZWRnZXJJbnN0YW5jZSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgZG90TmV0TGVkZ2VySW5zdGFuY2UuaW52b2tlTWV0aG9kQXN5bmMoJ1VwZGF0ZVN0YXRlJywgdHJ1ZSwgYWN0aXZlUGspO1xuXG4gICAgICAgICAgICByZXR1cm4gYWN0aXZlUGs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZ2V0QWNjb3VudChhY2N0SWR4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmIChpc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgdHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgICAgICAgICBpc0Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb3ROZXRMZWRnZXJJbnN0YW5jZSAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgZG90TmV0TGVkZ2VySW5zdGFuY2UuaW52b2tlTWV0aG9kQXN5bmMoJ1VwZGF0ZVN0YXRlJywgZmFsc2UsICcnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEFjY291bnQoYWNjdElkeDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChpc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBsZWRnZXJBcHAuZ2V0QWRkcmVzc0FuZFB1YktleShnZXRBY2NvdW50UGF0aChhY2N0SWR4KSk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXR1cm5Db2RlICE9PSAweDkwMDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihgRXJyb3I6ICR7cmVzcG9uc2UuZXJyb3JNZXNzYWdlfSAoMHgke3Jlc3BvbnNlLnJldHVybkNvZGUudG9TdHJpbmcoMTYpfSkuYCkpO1xuXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVQayA9IGVuY29kZVB1YmxpY0tleShyZXNwb25zZS5wdWJsaWNLZXkpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvdE5ldExlZGdlckluc3RhbmNlICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICBkb3ROZXRMZWRnZXJJbnN0YW5jZS5pbnZva2VNZXRob2RBc3luYygnVXBkYXRlU3RhdGUnLCB0cnVlLCBhY3RpdmVQayk7XG5cbiAgICAgICAgICAgIHJldHVybiBhY3RpdmVQaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGBOb3QgY29ubmVjdGVkLmApKTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBzaG93QWNjb3VudChhY2N0SWR4OiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGlzQ29ubmVjdGVkKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGxlZGdlckFwcC5zaG93QWRkcmVzc0FuZFB1YktleShnZXRBY2NvdW50UGF0aChhY2N0SWR4KSk7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXR1cm5Db2RlID09PSAweDY5ODYpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZXR1cm5Db2RlICE9PSAweDkwMDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihgRXJyb3I6ICR7cmVzcG9uc2UuZXJyb3JNZXNzYWdlfSAoMHgke3Jlc3BvbnNlLnJldHVybkNvZGUudG9TdHJpbmcoMTYpfSkuYCkpO1xuXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVQayA9IGVuY29kZVB1YmxpY0tleShyZXNwb25zZS5wdWJsaWNLZXkpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRvdE5ldExlZGdlckluc3RhbmNlICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICBkb3ROZXRMZWRnZXJJbnN0YW5jZS5pbnZva2VNZXRob2RBc3luYygnVXBkYXRlU3RhdGUnLCB0cnVlLCBhY3RpdmVQayk7XG5cbiAgICAgICAgICAgIHJldHVybiBhY3RpdmVQaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGBOb3QgY29ubmVjdGVkLmApKTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBzaWduKGFjY3RJZHg6IG51bWJlciwgZGVwbG95Qnl0ZXM6IGFueSkge1xuICAgICAgICBpZiAoaXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlZGdlckFwcCA9IG5ldyBMZWRnZXJBcHAodHJhbnNwb3J0KTtcblxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBsZWRnZXJBcHAuc2lnbihnZXRBY2NvdW50UGF0aChhY2N0SWR4KSwgZGVwbG95Qnl0ZXMpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UucmV0dXJuQ29kZSA9PT0gMHg2OTg2KVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UucmV0dXJuQ29kZSAhPT0gMHg5MDAwKVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYEVycm9yOiAke3Jlc3BvbnNlLmVycm9yTWVzc2FnZX0gKDB4JHtyZXNwb25zZS5yZXR1cm5Db2RlLnRvU3RyaW5nKDE2KX0pLmApKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NpZ24gY29tcGxldGVkOiAnICsgcmVzcG9uc2UpO1xuXG4gICAgICAgICAgICByZXR1cm4gU0VDX0tFWV9QUkVGSVggKyByZXNwb25zZS5zaWduYXR1cmVSU1YudG9TdHJpbmcoJ2hleCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYE5vdCBjb25uZWN0ZWQuYCkpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXJzLFxuICAgICAgICBjb25uZWN0LFxuICAgICAgICBkaXNjb25uZWN0LFxuICAgICAgICBnZXRWZXJzaW9uLFxuICAgICAgICBnZXRBcHBJbmZvLFxuICAgICAgICBpc0Nvbm5lY3RlZDogKCkgPT4gaXNDb25uZWN0ZWQsXG4gICAgICAgIGdldEFjY291bnQsXG4gICAgICAgIHNob3dBY2NvdW50LFxuICAgICAgICBzaWduXG4gICAgfTtcbn0pKCk7XG5cbmV4cG9ydCBjb25zdCBhZGRFdmVudExpc3RlbmVycyA9IChyZWY6IGFueSkgPT4gTGVkZ2VyQXBwU2luZ2xldG9uLmFkZEV2ZW50TGlzdGVuZXJzKHJlZik7XG5leHBvcnQgY29uc3QgZ2V0VmVyc2lvbiA9IGFzeW5jICgpID0+IGF3YWl0IExlZGdlckFwcFNpbmdsZXRvbi5nZXRWZXJzaW9uKCk7XG5leHBvcnQgY29uc3QgZ2V0QXBwSW5mbyA9IGFzeW5jICgpID0+IGF3YWl0IExlZGdlckFwcFNpbmdsZXRvbi5nZXRBcHBJbmZvKCk7XG5leHBvcnQgY29uc3QgY29ubmVjdCA9IGFzeW5jIChhY2N0SWR4OiBudW1iZXIpID0+IGF3YWl0IExlZGdlckFwcFNpbmdsZXRvbi5jb25uZWN0KGFjY3RJZHgpO1xuZXhwb3J0IGNvbnN0IGRpc2Nvbm5lY3QgPSAoKSA9PiBMZWRnZXJBcHBTaW5nbGV0b24uZGlzY29ubmVjdCgpO1xuZXhwb3J0IGNvbnN0IGlzQ29ubmVjdGVkID0gKCkgPT4gTGVkZ2VyQXBwU2luZ2xldG9uLmlzQ29ubmVjdGVkKCk7XG5leHBvcnQgY29uc3QgZ2V0QWNjb3VudCA9IGFzeW5jIChhY2N0SWR4OiBudW1iZXIpID0+IExlZGdlckFwcFNpbmdsZXRvbi5nZXRBY2NvdW50KGFjY3RJZHgpO1xuZXhwb3J0IGNvbnN0IHNob3dBY2NvdW50ID0gYXN5bmMgKGFjY3RJZHg6IG51bWJlcikgPT4gTGVkZ2VyQXBwU2luZ2xldG9uLnNob3dBY2NvdW50KGFjY3RJZHgpO1xuZXhwb3J0IGNvbnN0IHNpZ24gPSBhc3luYyAoYWNjdElkeDogbnVtYmVyLCBkZXBsb3lCeXRlczogYW55KSA9PiBMZWRnZXJBcHBTaW5nbGV0b24uc2lnbihhY2N0SWR4LCBkZXBsb3lCeXRlcyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=