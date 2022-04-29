import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  toogle = false;
  response: any;
  moneyUsd: string = '0';
  moneyEur: string = '0';
  textConvert:string = '0';
  textConvertTo: string = '0';
  selectConvertValue: string= 'GRN';
  selectConvertToValue: string = 'USD';
  money = ['UAH','EUR','USD'];
  ngDropdown = this.money[0];
  ngDropdownTo = this.money[2];

  constructor(private http: HttpClient){

  }
  //changing valute name than nned to be converted
  onDropdownChange(event: any){
    const value = event.target.value
    this.ngDropdown = value
    
  }

  //
  onDropdownChangeTo(event: any){
    const value = event.target.value
    this.ngDropdownTo = value
  }

  //first to second input
  onInputConvert(event:any){
    const value = event.target.value;
    //first UAH to second USD
    if(this.ngDropdown === "UAH" && this.ngDropdownTo === "USD"){
      this.textConvertTo = `${value / parseFloat(this.moneyUsd)}`;
      this.textConvertTo = `${parseFloat(this.textConvertTo).toFixed(2)}`
    }
    //first UAH to second EUR
    else if(this.ngDropdown === "UAH" && this.ngDropdownTo === "EUR"){
      this.textConvertTo = `${value / parseFloat(this.moneyEur)}`;
      this.textConvertTo = `${parseFloat(this.textConvertTo).toFixed(2)}`
    }
    //first UAH to second UAH
    else if(this.ngDropdown === "UAH" && this.ngDropdownTo === "UAH")
      this.textConvertTo = `${parseFloat(value).toFixed(2)}`
    //first USD to second UAH
    else if(this.ngDropdown === "USD" && this.ngDropdownTo === "UAH"){
      this.textConvertTo = `${value * parseFloat(this.moneyUsd)}`;
      this.textConvertTo = `${parseFloat(this.textConvertTo).toFixed(2)}`
    }
    //first USD to second EUR
    else if(this.ngDropdown === "USD" && this.ngDropdownTo === "EUR"){
      this.textConvertTo = `${value * parseFloat(this.moneyUsd) / parseFloat(this.moneyEur)}`
      this.textConvertTo = `${parseFloat(this.textConvertTo).toFixed(2)}`
    }
    //first USD to second USD
    else if(this.ngDropdown === "USD" && this.ngDropdownTo === "USD")
      this.textConvertTo = `${parseFloat(value).toFixed(2)}`
    //first EUR to second UAH
    else if(this.ngDropdown === "EUR" && this.ngDropdownTo === "UAH"){
      this.textConvertTo = `${value * parseFloat(this.moneyEur)}`;
      this.textConvertTo = `${parseFloat(this.textConvertTo).toFixed(2)}`
    }
    //first EUR to second USD
    else if(this.ngDropdown === "EUR" && this.ngDropdownTo === "USD"){
      this.textConvertTo = `${value * parseFloat(this.moneyEur) / parseFloat(this.moneyUsd)}`
      this.textConvertTo = `${parseFloat(this.textConvertTo).toFixed(2)}`
    }
    //first EUR to second EUR
    else if(this.ngDropdown === "EUR" && this.ngDropdownTo === "EUR")
      this.textConvertTo = `${parseFloat(value).toFixed(2)}`
    //error condition
    else{
      this.textConvertTo = "Error"
    }
  }

  //second to first input
  onInputConvertTo(event:any){
    //second USD to first UAH
    const value = event.target.value;
    if(this.ngDropdown === 'UAH' && this.ngDropdownTo === 'USD'){
      this.textConvert = `${value * parseFloat(this.moneyUsd)}`;
      this.textConvert = `${parseFloat(this.textConvert).toFixed(2)}`
    }
    //second EUR to first UAH
    else if(this.ngDropdown === 'UAH' && this.ngDropdownTo === 'EUR'){
      this.textConvert = `${value * parseFloat(this.moneyEur)}`;
      this.textConvert = `${parseFloat(this.textConvert).toFixed(2)}`
    }
    //second UAH to first UAH 
    else if(this.ngDropdown === "UAH" && this.ngDropdownTo === "UAH"){
      this.textConvert = `${parseFloat(value).toFixed(2)}`
    }
    //second UAH to first USD 
    else if(this.ngDropdown === "USD" && this.ngDropdownTo === "UAH"){
      this.textConvert = `${value / parseFloat(this.moneyUsd)}`;
      this.textConvert = `${parseFloat(this.textConvert).toFixed(2)}`
    }
    //second EUR to first USD
    else if(this.ngDropdown === "USD" && this.ngDropdownTo === "EUR"){
      this.textConvert = `${value / parseFloat(this.moneyUsd) * parseFloat(this.moneyEur)}`
      this.textConvert = `${parseFloat(this.textConvert).toFixed(2)}`
    }
    //second USD to first USD
    else if(this.ngDropdown === "USD" && this.ngDropdownTo === "USD")
      this.textConvert = `${parseFloat(value).toFixed(2)}`
    //second UAH to first EUR 
    else if(this.ngDropdown === "EUR" && this.ngDropdownTo === "UAH"){
      this.textConvert = `${value / parseFloat(this.moneyEur)}`;
      this.textConvert = `${parseFloat(this.textConvert).toFixed(2)}`
    }
    //second USD to first EUR
    else if(this.ngDropdown === "EUR" && this.ngDropdownTo === "USD"){
      this.textConvert = `${value / parseFloat(this.moneyEur) * parseFloat(this.moneyUsd)}`
      this.textConvert = `${parseFloat(this.textConvert).toFixed(2)}`
    }
    //second EUR to first EUR
    else if(this.ngDropdown === "EUR" && this.ngDropdownTo === "EUR")
      this.textConvert = `${parseFloat(value).toFixed(2)}`
    //error condition
    else{
      this.textConvert = "Error"
    }
  }

  //geting info from API of bank
  ngOnInit(): void {
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
        this.toogle = true;
      })
    }
}
