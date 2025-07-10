/*import { LightningElement, track, wire } from 'lwc';
import showListOfAccounts from '@salesforce/apex/LwcAccountsController.showListOfAccounts' ;
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

const columns = [
    { label: 'Name', fieldName: 'Name', type: 'Name', editable: true },
    { label: 'Website', fieldName: 'Website', type: 'Url', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone', editable: true },
    { label: 'Fax', fieldName: 'Fax', type: 'Fax', editable: true },
];

export default class HelloIndia extends LightningElement {

    error;
    @track accObject;
    columns = columns;
    fieldsItemValues = [];

    @wire(showListOfAccounts)
    cons(result){
        this.accObject = result;
        if (result.error) {
            this.accObject = undefined;
        }
    };

    async handleSave(event){
        console.log('onsave called');
        this.fieldsItemValues = event.detail.draftValues;
        console.log('onsave1 called : '+JSON.stringify(this.fieldsItemValues));
        
        const inputItems = this.fieldsItemValues.slice().map(draft => {
            console.log('onsave2 called');
            const fields = Object.assign({}, draft);
            console.log('onsave2.1 called : '+JSON.stringify(fields));
            return { fields };
        });
        console.log('promises : ');
        const promises = inputItems.map(recordInput => updateRecord(recordInput));
        console.log('promises1 is : '+promises);
        await Promise.all(promises).then(res => {
            console.log('inside promise');
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records Updated SuccessFully!',
                    variant: 'success'
                })
            );
            this.fieldsItemValues = [];
            //return this.refresh();
          
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'An Error Occoured',
                    variant: 'error'
                })
            );
        }).finally(() => {
            this.fieldsItemValues = [];
        });
        //await refreshApex(this.accObject);
    }

    async refresh(){
        console.log('refreshapex called');
        await refreshApex(this.accObject);
    }

}*/


import { LightningElement, wire, api, track } from "lwc";
import showListOfAccounts from '@salesforce/apex/LwcAccountsController.showListOfAccounts' ;
import { refreshApex } from "@salesforce/apex";
import { updateRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

const COLS = [
    { label: 'Name', fieldName: 'Name', type: 'Name', editable: true },
    { label: 'Website', fieldName: 'Website', type: 'Url', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'Phone', editable: true },
    { label: 'Fax', fieldName: 'Fax', type: 'Fax', editable: true },
];
export default class HelloIndia extends LightningElement {
  @api recordId;
  columns = COLS;
  draftValues = [];
  error;
  @track accObject;

  //@wire(getContacts, { accId: "$recordId" })
  //contacts;

  @wire(showListOfAccounts)
  cons(result){
    //console.log('result is : '+JSON.stringify(result));
      this.accObject = result;
      if (result.error) {
          this.accObject = undefined;
          //console.log('Error occouring');
      }
  };

  renderedCallback(){
    //console.log('HI renderedCallback');
    //console.log('HI renderedCallback :');
}
    
  async handleSave(event) {
    // Convert datatable draft values into record objects
    //console.log('modified values : '+event.detail.draftValues);
    //console.log('modified values1 : '+JSON.stringify(event.detail.draftValues));
    const records = event.detail.draftValues.slice().map((draftValue) => {
      const fields = Object.assign({}, draftValue);
      //console.log('fields values : '+JSON.stringify(fields));
      //console.log('draftValues values : '+JSON.stringify(draftValue));
      //console.log('record values : '+records);
      return { fields };
    });

    // Clear all datatable draft values
    this.draftValues = [];

    try {
      // Update all records in parallel thanks to the UI API
      const recordUpdatePromises = records.map((record) => updateRecord(record));
      //console.log('recordUpdatePromises values : '+JSON.stringify(recordUpdatePromises));
      await Promise.all(recordUpdatePromises);

      // Report success with a toast
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Success",
          message: "Contacts updated",
          variant: "success",
        }),
      );

      // Display fresh data in the datatable
      await refreshApex(this.accObject);
    } catch (error) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error updating or reloading contacts",
          message: error.body.message,
          variant: "error",
        }),
      );
    }
  }
}