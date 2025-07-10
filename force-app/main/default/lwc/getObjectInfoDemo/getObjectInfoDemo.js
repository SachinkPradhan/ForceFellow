import { api, LightningElement, wire } from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_revenue from '@salesforce/schema/Account.AnnualRevenue';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';

export default class GetObjectInfoDemo extends LightningElement {

    @api recordId;
    accountName;
    accountRevenue;

    @wire(getRecord, {
        recordId: "$recordId",
        fields: [ACCOUNT_NAME, ACCOUNT_revenue]
    })
    outputFunction({ data, error }){
        if (data) {
            console.log("get data", data);
            //this.accountName = data.fields.Name.value;
            //this.accountRevenue = data.fields.AnnualRevenue.displayValue;
            this.accountName = getFieldValue(data, ACCOUNT_NAME);
            this.accountRevenue = getFieldValue(data, ACCOUNT_revenue);

        } else if (error){
            console.log("error", error);
        }
    }

}