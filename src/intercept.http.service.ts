import { Injectable, Inject } from "@angular/core";
import { HTTP_PROVIDERS, Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { PSService } from "./ps.service";

@Injectable()
export class InterceptHttp extends Http {
    _ps: PSService;
    constructor(
        @Inject(ConnectionBackend) backend: ConnectionBackend,
        @Inject(RequestOptions) defaultOptions: RequestOptions,
        @Inject(PSService) pubsub: PSService) {
        super(backend, defaultOptions);
        this._ps = pubsub;
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url, options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        this._ps.beforeRequest.emit("beforeRequestEvent");
        return observable.do(() => this._ps.afterRequest.emit("afterRequestEvent"));
    }
}
