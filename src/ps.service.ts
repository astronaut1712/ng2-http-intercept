import { Injectable } from "@angular/core";
import { RequestEventEmitter, ResponseEventEmitter } from "./emitters";

@Injectable()
export class PSService {

    beforeRequest: RequestEventEmitter;
    afterRequest: ResponseEventEmitter;

    constructor() {
        this.beforeRequest = new RequestEventEmitter();
        this.afterRequest = new ResponseEventEmitter();
    }
}
