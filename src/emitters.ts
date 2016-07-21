import { Subject } from "rxjs/Subject";

export class RequestEventEmitter extends Subject<String> {
    constructor() {
        super();
    }
    emit(value: String) {
        super.next(value);
    }
}

export class ResponseEventEmitter extends Subject<String> {
    constructor() {
        super();
    }
    emit(value: String) {
        super.next(value);
    }
}
