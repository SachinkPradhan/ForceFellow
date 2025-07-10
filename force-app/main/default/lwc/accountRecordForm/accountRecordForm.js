import { LightningElement, track } from 'lwc';

export default class AccountRecordForm extends LightningElement {
    @track recordId;
    fieldsArray = ['Name','Phone','Website','Fax'];

    handleSuccess(event){
        this.recordId =event.detail.id;
    }
}