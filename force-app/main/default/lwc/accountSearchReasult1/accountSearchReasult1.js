import { LightningElement, api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/LwcAccountsController1.getAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'ID', fieldName: 'Id', type: 'text' },
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Action', type: 'button', typeAttributes: { label: 'view Contacts', name: 'view Contacts', title: 'view Contacts', value: 'view_Contacts' } },
];

export default class AccountSearchReasult1 extends LightningElement {
    columns = COLUMNS;
    @api searchText;
    displayResults = false;

    @wire(getAccounts, { searchText: '$searchText' })
    accounts;
    get showData(){
        if (this.accounts.data && this.accounts.data.length > 0) {
            this.displayResults = true;
            console.log('Accounts data fetched successfully:', JSON.stringify(this.accounts.data));
            console.log('Number of accounts found:', this.accounts.data.length);
            console.log('Display results:', this.displayResults);
            return this.displayResults;
        } else{
           this.displayResults = false;
            console.error('Error fetchinggg accountsss:', this.accounts.error);
            return this.displayResults; 
        }
    }

    renderedCallback() {
        if (this.accounts && this.accounts.data && this.accounts.data.length > 0) {
            console.log('First Account record ****:', JSON.stringify(this.accounts.data));
        } else if (this.accounts && this.accounts.error) {
            console.error('Error fetching accounts1:', this.accounts.error);
        } else {
            console.log('No account records found or still loading.');
        }
    }

    showToast(title, message, variant, mode = 'dismissable', modeCallback = () => {}) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(event);
    }    

}