import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  response: any;
  moneyUsd: string = '0';
  moneyEur: any = '0';
  buttonText = 'Отримати курс'
  constructor(private http: HttpClient){

  }

  getValueUsd(){
    this.http.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .subscribe((response)=>{
      this.response = response;
      //console.log(this.response)
      this.response.forEach((element: any) => {
        if(element.cc === 'USD')
          this.moneyUsd = element.rate
        if(element.cc === 'EUR')
          this.moneyEur = element.rate
      });
    })
    this.buttonText = 'Оновити курс'
  }
  ngOnInit() {

  }
  
}
