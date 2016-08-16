"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ps_service_1 = require("./ps.service");
var InterceptHttp = (function (_super) {
    __extends(InterceptHttp, _super);
    function InterceptHttp(backend, defaultOptions, pubsub) {
        _super.call(this, backend, defaultOptions);
        this._ps = pubsub;
    }
    InterceptHttp.prototype.request = function (url, options) {
        return this.intercept(_super.prototype.request.call(this, url, options));
    };
    InterceptHttp.prototype.get = function (url, options) {
        return this.intercept(_super.prototype.get.call(this, url, options));
    };
    InterceptHttp.prototype.post = function (url, body, options) {
        return this.intercept(_super.prototype.post.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    InterceptHttp.prototype.put = function (url, body, options) {
        return this.intercept(_super.prototype.put.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    InterceptHttp.prototype.delete = function (url, options) {
        return this.intercept(_super.prototype.delete.call(this, url, options));
    };
    InterceptHttp.prototype.getRequestOptionArgs = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        return options;
    };
    InterceptHttp.prototype.intercept = function (observable) {
        var _this = this;
        this._ps.beforeRequest.emit("beforeRequestEvent");
        observable.subscribe(null, function (err) {
            console.error(err);
            _this._ps.afterRequest.emit("afterRequestEvent");
        }, function () {
            console.log('complete');
            _this._ps.afterRequest.emit("afterRequestEvent");
        });
        return observable;
    };
    InterceptHttp = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.ConnectionBackend)),
        __param(1, core_1.Inject(http_1.RequestOptions)),
        __param(2, core_1.Inject(ps_service_1.PSService))
    ], InterceptHttp);
    return InterceptHttp;
}(http_1.Http));
exports.InterceptHttp = InterceptHttp;
