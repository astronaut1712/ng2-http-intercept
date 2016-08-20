# ng2-http-intercept

intercepting all http requests

## Installing

```bash
npm install --save ng2-http-intercept
```

## How to use

*From bootstrap of application*

```typescript
import { Http, HTTP_PROVIDERS, XHRBackend, RequestOptions } from "@angular/http";
import { PSService, InterceptHttp } from "ng2-http-intercept";

bootstrap(App, [
	...
    HTTP_PROVIDERS,
	PSService,
	provide(Http, {
		useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, pubsub: PSService) =>
			new InterceptHttp(backend, defaultOptions, pubsub),
		deps: [ XHRBackend, RequestOptions, PubSubService ]
	})
]).then(
	(success:any) => console.log("Bootstrap successful"),
	(error:any) => console.error(error)
);

```

*Loading example component*

```typescript
import { PSService } from "ng2-http-intercept";

export class LoadingComponent implements OnInit() {
    isLoading = false;

    constructor(private _ps: PSService) {

    }

    ngOnInit() {
        this._ps.beforeRequest.subscribe(data => this.isLoading = true);
		this._ps.afterRequest.subscribe(data => this.isLoading = false);
    }
}
```


## Contribution

- Fork the project
- Commit your changes
- Create pull requests :)

