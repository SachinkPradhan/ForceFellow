import { LightningElement, track } from 'lwc';

export default class CarSearch extends LightningElement {
    @track carTypeId = '';
    connectedCallback(){
        console.log('cs called');
        console.log('cs called and carTypeId is: '+this.carTypeId);
    }
    carTypeSelectHandler(event){
        this.carTypeId = event.detail;
        console.log('this carTypeId : '+this.carTypeId);
        
    }
}