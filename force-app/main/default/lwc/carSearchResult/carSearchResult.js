import { LightningElement, api, track, wire } from 'lwc';
import getCars from '@salesforce/apex/CarSearchResultController.getCars';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CarSearchResult extends LightningElement {
    @api carTypeId;
    @track cars;
    @track selectedCarId;
    

        @wire(getCars, {carTypeId : '$carTypeId'})
        wiredCars({data, error}){
            if (data) {
                console.log('csr data :'+JSON.stringify(data));
                this.cars = data;
            } else if(error){
                console.log('csr error : '+error);
                this.showToast('ERROR',error.body.message,'error');
            }
        }
    
    showToast(title, message, variant) {
        console.log('In Showtoast');
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }

    carSelectHandler(event){
        console.log('carSelectedHandler**************** : '+event.detail);
        const carId = event.detail;
        this.selectedCarId = carId;
    }

    get carsFound(){
        if (this.cars) {
            console.log('carsfound true');
            return true;
        } else {
            console.log('carsfound false');
            return false;
        }
    }
}