"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = require("rxjs/Subject");
var RequestEventEmitter = (function (_super) {
    __extends(RequestEventEmitter, _super);
    function RequestEventEmitter() {
        _super.call(this);
    }
    RequestEventEmitter.prototype.emit = function (value) {
        _super.prototype.next.call(this, value);
    };
    return RequestEventEmitter;
}(Subject_1.Subject));
exports.RequestEventEmitter = RequestEventEmitter;
var ResponseEventEmitter = (function (_super) {
    __extends(ResponseEventEmitter, _super);
    function ResponseEventEmitter() {
        _super.call(this);
    }
    ResponseEventEmitter.prototype.emit = function (value) {
        _super.prototype.next.call(this, value);
    };
    return ResponseEventEmitter;
}(Subject_1.Subject));
exports.ResponseEventEmitter = ResponseEventEmitter;
