import { Component, OnInit, Input, Output } from '@angular/core';
import { ObservGetterService } from '../observ-getter.service';

@Component({
  selector: 'app-comp-month-aggregator',
  templateUrl: './comp-month-aggregator.component.html',
  styleUrls: ['./comp-month-aggregator.component.css']
})

export class CompMonthAggregatorComponent implements OnInit {
  	mysubscribe: any;
  	receivedItem: any;
	toDumbData: any;
	toDumbItem: string;
	currentCompany: any;
  	
  	// Принимаем значение от дамб компонента и выводим его в консоль
  	receiveValue($event){
  		this.receivedItem = $event;
  		console.log(this.receivedItem[0].id);
  	}

  	// функция преобразования структуры данных с целью передачи от смарт компонента к дамб компоненту
	changeKey(change){
	  	const keyMap = {
	  		type: 'category',
	  		revenuePerWeek: 'weekStats',
	  		revenue: 'balance',
	  		monthRevenue: 'monthBalance'
	  	};
		let changed = {};
		Object.keys(change).map(key => {
			const newKey = keyMap[ key ] || key;
			changed = change['monthRevenue'] > 0 ? Object.assign({}, changed, {[newKey]: change[key]}) : undefined;
		});
	  	return changed;
	}

	// получение данных от сервиса, преобразование к нужному виду и передача в дамб компонент
	constructor(srv: ObservGetterService){
	  	this.mysubscribe = srv.getCompanies();
	  	this.mysubscribe = this.mysubscribe.value.companies;

	  	let newStructure = {};
	  	Object.keys(this.mysubscribe).map( id => {
	  		this.currentCompany = this.changeKey(this.mysubscribe[id]);
	  		newStructure = this.currentCompany != undefined ? Object.assign({},newStructure, {[id]: this.currentCompany }) : newStructure;
	  	});

		this.toDumbData = { items: newStructure };
	  }

	  ngOnInit(){}

}





