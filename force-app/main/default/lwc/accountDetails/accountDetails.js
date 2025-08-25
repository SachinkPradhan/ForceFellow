import { api, LightningElement, wire } from 'lwc';
import getParentAccounts from '@salesforce/apex/LwcAccountsController1.getParentAccounts';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_PARENT from '@salesforce/schema/Account.ParentId';
import SLA_EXPIRATION_DATE from '@salesforce/schema/Account.SLAExpirationDate__c';
import ACCOUNT_NO_OF_LOCATIONS from '@salesforce/schema/Account.NumberofLocations__c';
import DESCRIPTION from '@salesforce/schema/Account.Description';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_SLA_TYPE from '@salesforce/schema/Account.SLA__c';
import { createRecord } from 'lightning/uiRecordApi';

export default class AccountDetails extends LightningElement {
    parentAccountsData;
    error;
    parentOptions = [];
    selParentAcc = '';
    selNoOfLocations = "1";
    selAccName = '';
    selExpDate = null;
    selSlaType = '';
    selDescription = '';
    
    @wire(getParentAccounts)
    parentAccounts({ error, data }) {
        this.parentOptions = [];
        if (data) {
            this.parentOptions = data.map((account) => ({
                label : account.Name,
                value : account.Id
            }));
            console.log('Parent Options:', JSON.stringify(this.parentOptions));
            // this.parentAccountsData = data;
            // console.log('Parent Accounts Data:', JSON.stringify(this.parentAccountsData));
            // console.log('data size is :', this.parentAccountsData.length);
            // this.error = undefined;
            // console.log('Error is :',this.error);
        } else if (error) {
            this.error = error;
            this.parentAccountsData = undefined;
            console.error('Error fetching parent accounts:', JSON.stringify(this.error));
        }
    }
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountObjectInfo;
    @wire(getPicklistValues, {
        recordTypeId: '$accountObjectInfo.data.defaultRecordTypeId',
        fieldApiName: ACCOUNT_SLA_TYPE
    })
    accountInfoPicklist;

    handleChange(event) {
        let {name, value} = event.target;
        if (name === 'parentacc') {
            this.selParentAcc = value;
            console.log('Selected Parent Account ID:', this.selParentAcc);
        }
        if (name === 'accname') {
            this.selAccName = value;
            console.log('Selected Account Name:', this.selAccName);
        }
        if (name === 'slaexpdt') {
            this.selExpDate = value;
            console.log('Selected SLA Expiration Date:', this.selExpDate);
        }
        if (name === 'slatype') {
            this.selSlaType = value;
            console.log('Selected SLA Type:', this.selSlaType);
        }
        if (name === 'nooflocations') {
            this.selNoOfLocations = value;
            console.log('Selected Number of Locations:', this.selNoOfLocations);
        }
        if (name === 'description') {
            this.selDescription = value;
            console.log('Selected Description:', this.selDescription);
        }
    }
    handleSave() {
        console.log('Account Object:', ACCOUNT_OBJECT);
        console.log('Account Name Field:', ACCOUNT_NAME);
        if (this.validateInput()) {
            console.log('All fields are valid. Proceed with save logic.');
            let fieldInputs = {};
            fieldInputs[ACCOUNT_PARENT.fieldApiName] = this.selParentAcc;
            fieldInputs[ACCOUNT_NO_OF_LOCATIONS.fieldApiName] = this.selNoOfLocations;
            fieldInputs[ACCOUNT_NAME.fieldApiName] = this.selAccName;
            fieldInputs[SLA_EXPIRATION_DATE.fieldApiName] = this.selExpDate;
            fieldInputs[ACCOUNT_SLA_TYPE.fieldApiName] = this.selSlaType;
            fieldInputs[DESCRIPTION.fieldApiName] = this.selDescription;
            let recordInput = {
                   apiName: ACCOUNT_OBJECT.objectApiName,
                   fields: fieldInputs 
            }
            createRecord(recordInput)
            .then((result) => {
                console.log('Record Created Successfully:', result);
            })
            .catch(error => {
                console.error('Error creating record:', error);
            });
        } else {
            console.error('Validation failed. Please correct the errors.');
        }
    }
    validateInput() {
        const inputFields = Array.from (this.template.querySelectorAll('.validateme'));
        let isValid = true;
        inputFields.every(field => field.checkValidity());
        return isValid;
    }
}    