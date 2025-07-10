import { LightningElement } from 'lwc';

export default class CurrencyConverter extends LightningElement {
    showOutput = false;
    convertedValue = "";
    toCurrency = "";
    fromCurrency = "";
    enteredAmount = "";
    currencyOptions = [];

    connectedCallback(){
        //console.log('connected callback called');
        this.fetchSymbols();
    }

    changeHandler(event){
        console.log('change handler called');
        let {name, value} = event.target;

        if(name === 'amount') this.enteredAmount = value;
        if(name === 'fromcurr') this.fromCurrency = value;
        if(name === 'tocurr') this.toCurrency = value;
    }

    clickHandler(){

    }

    async fetchSymbols(){
        //console.log('fetch symbols called');
        let endpoint = 'https://api.frankfurture.app/currencies';

        try {
            let response = await fetch(endpoint);
            console.log('cc response :'+json.stringyfy(response));
            if (!response.ok) {
                throw new Error("Network response was not ok");
                
            }
            const data = await response.json();
            let options = [];
            for(let symbol in data){
                options = [...options,{label:symbol,value:symbol}]
            }
            this.currencyOptions = [...options];
            
        } catch (error) {
            console.log('cc error is : '+error);
        }
    }
}