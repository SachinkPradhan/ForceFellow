import { api, LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_REVENUE from '@salesforce/schema/Account.AnnualRevenue';
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DynamicRecordAndObject extends LightningElement {
    @api recordId;
    @api objectApiName;

    showForm = false;
    fieldList = [ACCOUNT_NAME,ACCOUNT_REVENUE,ACCOUNT_RATING];

    clickHandler(event){
        console.log('new button event detail : '+event.detail);
        console.log('clickHandler called');
        this.showForm = true;
    }

    handleSuccess(event) {
        console.log('onsuccess event detail : '+event.detail);
        const evt = new ShowToastEvent({
            title: 'Account created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
    //accName;
    //accRevenue;
    /*
    @wire(getRecord, {
        recordId:"$recordId",
        fields:[ACCOUNT_NAME, ACCOUNT_REVENUE]
    })
    wiredRecord({data, error}){
        if (data) {
            console.log('my data is : '+JSON.stringify(data));
            this.accName = data.fields.AnnualRevenue.value;
            this.accRevenue = data.fields.Name.value;
        } else if (error){
            console.log('error is : '+error);
        }
    }
        */
}