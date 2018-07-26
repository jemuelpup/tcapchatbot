import { Injectable } from '@angular/core';
import { fromEvent } from "rxjs";
import { debounceTime,distinctUntilChanged,map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ObservableFunctionsService {

  constructor() { }

	setInputTextDebounce(componentView){
		return fromEvent(componentView, 'input')
    .pipe(
       debounceTime(1000),
       map((e: KeyboardEvent) => e.target['value'])
    );
	}

}
