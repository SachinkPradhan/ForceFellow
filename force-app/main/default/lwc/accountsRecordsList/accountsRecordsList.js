import { LightningElement, wire } from 'lwc';
import getAccountRecs from '@salesforce/apex/LwcAccountsController.getAccountRecs';

export default class AccountsRecordsList extends LightningElement {

    accountIdFromParent;

    @wire(getAccountRecs)
    accounts;

    handleClick(event){
        event.preventDefault();
        this.accountIdFromParent = event.target.dataset.accountId;
    }
}