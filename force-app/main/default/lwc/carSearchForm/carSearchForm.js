import { LightningElement, track, wire } from 'lwc';
import getCarTypes from '@salesforce/apex/CarSearchFormController.getCarTypes';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CarSearchForm extends NavigationMixin(LightningElement) {
    @track carTypes;
    

    connectedCallback(){
        //console.log('csf called');
    }

    @wire(getCarTypes)
    wiredCareType({data, error}){
        if (data) {
            
            this.carTypes = [{label:'All Types', value:''}];
            data.forEach(element => {
                const carType = {};
                
                carType.label = element.Name;
                carType.value = element.Id;
                this.carTypes.push(carType);
            });
        } else if(error){
            this.showToast('ERROR',error.body.message,'error');
        }
    }

    handleCarTypeChange(event){
        
        const carTypeId = event.detail.value;
        
        const carTypeSelectionChangeEvent = new CustomEvent('cartypeselect', {detail: carTypeId});
        this.dispatchEvent(carTypeSelectionChangeEvent);
    }

    createNewCarType(){
        //console.log('csf createNewCarType');
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Car_Type__c',
                actionName: 'new',
            },
        });
    }
    showToast(title, message, variant) {
        //console.log('In Showtoast');
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}