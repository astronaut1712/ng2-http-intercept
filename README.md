# ng2-http-intercept

intercepting all http requests

## Installing

```bash
npm install --save ng2-http-intercept
```

## How to use

*From bootstrap of application*

```typescript
import { HttpModule, Http, XHRBackend, RequestOptions } from "@angular/http";
import { PSService, InterceptHttp } from "ng2-http-intercept";


@NgModule({
  imports: [
    ...
    HttpModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ...
    PSService,
    {
      provide: Http,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, pubsub: PSService) =>
            new InterceptHttp(backend, defaultOptions, pubsub),
        deps: [ XHRBackend, RequestOptions, PSService ]
    },
    ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

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

# Updates

- Angular 2 RC5


## Contribution

- Fork the project
- Commit your changes
- Create pull requests :)

