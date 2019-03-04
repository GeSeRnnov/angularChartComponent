import { Injectable, Input } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { Companies } from './companies';


// @Injectable({
//   providedIn: 'root',
// })

export type TeardownLogic = AnonymousSubscription | Function | void;

export interface AnonymousSubscription {
  unsubscribe(): void;
};


export class ObservGetterService {
	// принимаем исходный перечень компаний
	@Input() Companies: any;

	getCompanies(): Observable<any[]>{
		return of(Companies);
	}

};
