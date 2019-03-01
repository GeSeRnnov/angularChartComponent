import { Injectable, Input } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { Companies } from './companies';


@Injectable({
  providedIn: 'root',
})


export type TeardownLogic = AnonymousSubscription | Function | void;

export interface AnonymousSubscription {
  unsubscribe(): void;
};

// @Input({
// 	Companies: any = {}
// })

// принимаем исходный перечень компаний
export class ObservGetterService {
	
	
	@Input() Companies: any;

	getCompanies(): Observable<any[]>{
		return of(Companies);
	}


	// getData = () => {
	// 	return Companies.companies[0].name;
	// }

};
