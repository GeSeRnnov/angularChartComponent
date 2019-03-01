import { Component, OnInit, Input, Output, EventEmitter, NgModule  } from '@angular/core';
import { Chart } from 'chart.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';

// npm i --save chart.js
// npm i --save ngx-select-dropdown
// https://github.com/manishjanky/ngx-select-dropdown

@Component({
	selector: 'app-comp-chart',
	templateUrl: './comp-chart.component.html',
	styleUrls: ['./comp-chart.component.css']
})


export class CompChartComponent implements OnInit {

	// Инициализация переменных
	balanceTotal: number = 0;
	monthBalanceTotal: number = 0;
	nameOptions: any = [];
	categoryOptions: any = [];
	LineChart:any;
	chartCategories={};
	chartCompanies={};
	companySelectd: any;
	isCompanySelected: boolean = false;


	// Конфигурации чекбоксов
	configCategory = {displayKey: "name", 
		placeholder: 'Все категории',
		searchPlaceholder: 'поиск',
		search: true,
		limitTo: 3
	};

	configCompany = {displayKey: "name", 
		placeholder: 'Все вхождения',
		searchPlaceholder: 'поиск',
		search: true,
		limitTo: 3
	};


  	// Получаем компании из смарт объекта
  	@Input() inputItems: any;
  	@Output() onItemSelected = new EventEmitter<string>();

	// изменени комбобокса категорий
	changeCategory($event: any) {
		const companyCategory = $event.value === undefined ? 'All' : $event.value.name;
		const {balanceTotalLocal, monthBalanceTotalLocal, weekStatsAggregated} = this.agregate(this.inputItems, companyCategory);
		this.manageChart(weekStatsAggregated);
	}

	// изменени комбобокса кампаний
	changeCompany($event: any) {
		let idSelected: number  = $event.value !== undefined ? $event.value._id : false;
		this.isCompanySelected = $event.value !== undefined ? true : false ;
		this.companySelectd = Object.keys(this.inputItems.items).map( item => this.inputItems.items[item].id === idSelected ? this.inputItems.items[item] : undefined)
		this.companySelectd = this.companySelectd.filter(item => item !== undefined);
	}

	// проверка, чтобы не включать в список категорий одинаковые значения
	isPresentCheck(search: any, obj: any){
		return obj.find( o => o.name === search.name) === undefined ;
	}

	// заполнение списка компний на основании выбранной категории
	fillCompany(filteredCategory, category, id, name){
		switch(filteredCategory){
			case 'All': 
				this.nameOptions.push({_id: id, name: name });
				return true;
			case category:
				this.nameOptions.push({_id: id, name: name });
				return true;
			default:
				return false;
		} 
	}

	// агрегирование недельных и прочих показателей
	agregate(data: {[x: string]: any}, companyCategory: string='All'){
		let item: any;
		let monthBalanceTotal = 0;
		let addnum: any = 0;
		let weekStatsTotal = {monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0 };
		this.nameOptions = [];
		this.balanceTotal = 0;
		this.monthBalanceTotal = 0;

		// Агрегирование недельных статистк и баласов
		Object.keys(data.items).map(dataId => {  		
			item = data.items[dataId];
			Object.keys(item.weekStats).map(day => {
				addnum = companyCategory === 'All' ? item.weekStats[day] : Number(item.category === companyCategory) * item.weekStats[day];;
				weekStatsTotal = Object.assign({},weekStatsTotal,{ [day]: weekStatsTotal[day] + addnum });
			});
			this.balanceTotal +=  (companyCategory === 'All' ? item.balance : Number(item.category === companyCategory) * item.balance);
			this.monthBalanceTotal +=  (companyCategory === 'All' ? item.monthBalance : Number(item.category === companyCategory) * item.monthBalance);
			this.isPresentCheck({_id: item.id, name: item.category }, this.categoryOptions) ? this.categoryOptions.push({_id: item.id, name: item.category }): null;
			this.fillCompany(companyCategory, item.category, item.id, item.name );
		});

		return {
			balanceTotalLocal: this.balanceTotal,
			monthBalanceTotalLocal: this.monthBalanceTotal,
			weekStatsAggregated: [ weekStatsTotal['monday'], weekStatsTotal['tuesday'], weekStatsTotal['wednesday'], weekStatsTotal['thursday'],
									weekStatsTotal['friday'], weekStatsTotal['saturday'],weekStatsTotal['sunday']]
		}
	}

	// обработчик кнопки для выбранной компании
	handleSelected(){
		this.onItemSelected.emit(this.companySelectd)
	}

	// Инициализация графика и значений
	ngOnInit() {
		const {balanceTotalLocal, monthBalanceTotalLocal, weekStatsAggregated} = this.agregate(this.inputItems);
		this.balanceTotal = balanceTotalLocal;
		this.monthBalanceTotal = monthBalanceTotalLocal;
		this.manageChart(weekStatsAggregated, true);
	}

	// управление графиком
	manageChart(chartData: any, isNew: boolean = false){
		if (isNew){
			this.LineChart = new Chart('lineChart', {
				type: 'line',
				data: {
					labels: ["M","T", "W", "T", "F", "S", "S"],
					datasets: [{
						label: 'Агрегированные балансы компаний',
						data: chartData,
						fill: false,
						lineTension: 0.2,
						borderColor: "darkcyan",
						borderWidth: 1
					}]
				},
				options: {
					title:{
						text: "Недельная статистика",
						display: true
					},
					scales:{
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});
		} else {
			chartData.map( (vl, id) => {
				this.LineChart.config.data.datasets[0].data[id] = vl;
			});
			this.LineChart.update();
		}
	}

}
