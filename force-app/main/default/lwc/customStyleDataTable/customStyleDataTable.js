import { LightningElement, wire } from 'lwc';
import getContactListForDataTable from '@salesforce/apex/ContactController.getContactListForDataTable';

const columns = [
    { label: 'Name',
         type: 'customNameType', 
         typeAttributes: { 
            contactName: { 
                fieldName: 'Name'
            }
        } 
    },
    { label: 'Account Name', 
        fieldName: 'accountLink', 
        type: 'url', 
        typeAttributes: {
            label: {
                fieldName: 'accountName'
            },
            target: '_blank'
        } 
    },
    { label: 'Title', 
        fieldName: 'Title', 
        cellAttributes: {
            class: {
                fieldName: 'titleColor'
            }
        }
    },
    { label: 'Rank',
         fieldName: 'Rank__c', 
         type: 'customRank',
        typeAttributes: {
            rankIcon: {
                fieldName: 'rankIcon'
            }
        } 
    },
    { label: 'Picture',
        type: 'customPicture',
        typeAttributes: {
            pictureUrl: {
                fieldName: 'Picture__c'
            }
        },
        cellAttributes: {
            alignment: 'center'
        }
     },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
];

export default class CustomStyleDataTable extends LightningElement {

    contacts;
    columns = columns;

    @wire(getContactListForDataTable) wiredContact({data, error}){
        if (data) {
            //this.contacts = data;
            //console.log('table data : '+JSON.stringify(data[0].Id));

            this.contacts = data.map(record =>{
                //console.log('table data2 : '+JSON.stringify(record.Title));
                let accountLink = "/" + record.AccountId;
                let accountName = record.Account.Name;
                let titleColor = "slds-text-color_success";
                let rankIcon = record.Rank__c > 5 ? "utility:ribbon" : "";
                return{
                    ...record,
                    accountLink : accountLink,
                    accountName : accountName,
                    titleColor  : titleColor,
                    rankIcon : rankIcon
                };
            });
            //console.log('table data1 : '+JSON.stringify(data));
        } else {
            //console.log('table error : '+error);
        }
    }
}