import { LightningElement, track } from 'lwc';
import { createRecord, deleteRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class LwcForinterView extends LightningElement {

    @track accounts = [];
    accName;
    accPhone;
    columns = [
        {
            label: 'Account Name',
            fieldName: 'name',
            type: 'text'
        },
        {
            label: 'Phone',
            fieldName: 'phone',
            type: 'text'
        },
        {
            label: 'Action',
            type: 'button',
            typeAttributes: {
                label: 'Delete',
                name: 'delete',
                variant: 'destructive'
            }
        }
    ];
    changeHandler(event){
        const {name, value} = event.target;
        if (name === 'AccName') {
            this.accName = event.target.value;
        }
        if (name === 'AccPhone') {
            this.accPhone = event.target.value;
        }
    }

    handleCreateAccount() {
        const fields = {};
        
        fields['Name'] = this.accName;
        fields['Phone'] = this.accPhone;

        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then((account) => {
                this.accounts = [...this.accounts, { id: account.id, name: fields.Name, phone: fields.Phone }];
                this.showToast('Success', 'Account Created Successfully', 'success');
                this.accName = '';
                this.accPhone= '';
            })
            .catch((error) => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'delete') {
            this.handleDelete(row);
        }
    }

    handleDelete(row) {
        const accountId = row.id;
        
        deleteRecord(accountId)
            .then(() => {
                this.accounts = this.accounts.filter(account => account.id !== accountId);
                this.showToast('Success', 'Account Deleted Successfully', 'success');
            })
            .catch((error) => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}

