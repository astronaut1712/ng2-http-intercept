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
System.register("emitters", ["rxjs/Subject"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Subject_1;
    var RequestEventEmitter, ResponseEventEmitter;
    return {
        setters:[
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            RequestEventEmitter = (function (_super) {
                __extends(RequestEventEmitter, _super);
                function RequestEventEmitter() {
                    _super.call(this);
                }
                RequestEventEmitter.prototype.emit = function (value) {
                    _super.prototype.next.call(this, value);
                };
                return RequestEventEmitter;
            }(Subject_1.Subject));
            exports_1("RequestEventEmitter", RequestEventEmitter);
            ResponseEventEmitter = (function (_super) {
                __extends(ResponseEventEmitter, _super);
                function ResponseEventEmitter() {
                    _super.call(this);
                }
                ResponseEventEmitter.prototype.emit = function (value) {
                    _super.prototype.next.call(this, value);
                };
                return ResponseEventEmitter;
            }(Subject_1.Subject));
            exports_1("ResponseEventEmitter", ResponseEventEmitter);
        }
    }
});
System.register("ps.service", ["@angular/core", "emitters"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_1, emitters_1;
    var PSService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (emitters_1_1) {
                emitters_1 = emitters_1_1;
            }],
        execute: function() {
            PSService = (function () {
                function PSService() {
                    this.beforeRequest = new emitters_1.RequestEventEmitter();
                    this.afterRequest = new emitters_1.ResponseEventEmitter();
                }
                PSService = __decorate([
                    core_1.Injectable()
                ], PSService);
                return PSService;
            }());
            exports_2("PSService", PSService);
        }
    }
});
System.register("intercept.http.service", ["@angular/core", "@angular/http"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_2, http_1;
    var InterceptHttp;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            InterceptHttp = (function (_super) {
                __extends(InterceptHttp, _super);
                function InterceptHttp(backend, defaultOptions, pubsub) {
                    _super.call(this, backend, defaultOptions);
                    this._pubsub = pubsub;
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
                    this._pubsub.beforeRequest.emit("beforeRequestEvent");
                    observable.subscribe(null, null, function () { return _this._pubsub.afterRequest.emit("afterRequestEvent"); });
                    return observable;
                };
                InterceptHttp = __decorate([
                    core_2.Injectable()
                ], InterceptHttp);
                return InterceptHttp;
            }(http_1.Http));
            exports_3("InterceptHttp", InterceptHttp);
        }
    }
});
