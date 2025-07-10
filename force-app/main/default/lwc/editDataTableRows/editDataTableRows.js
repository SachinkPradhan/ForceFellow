import { LightningElement, api, wire } from 'lwc';
import getContactBasedOnAccount from '@salesforce/apex/ContactController.getContactBasedOnAccount';
import {deleteRecord, updateRecord} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from "@salesforce/apex";
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import LEAD_SOURCE from '@salesforce/schema/Contact.LeadSource';

const ACTIONS = [
  {label: 'View', name: 'view'},
  {label: 'Edit', name: 'edit'},
  {label: 'Delete', name: 'delete'}
];


const columns = [
    { label: 'FirstName', fieldName: 'FirstName', editable: true },
    { label: 'LastName', fieldName: 'LastName', editable: true},
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'Title', fieldName: 'Title', editable: true},
    { label: 'Email', fieldName: 'Email', type: 'email', editable: true },
    {
      label: 'Lead Source',
      fieldName: 'LeadSource',
      type: 'customPickList',
      editable: true,
      typeAttributes: {
        options: { fieldName: 'pickListOptions'},
        value: { fieldName: 'LeadSource'},
        context: { fieldName: 'Id'}
      }
    },
    {
      type: 'action',
      typeAttributes: {
        rowActions: ACTIONS
      }
    }
];

export default class EditDataTableRows extends LightningElement {

    @api recordId;
    contactData = [];
    columns = columns;
    draftValues = [];
    contactRefreshProp;
    leadSourceOptions = [];
    myObjectInfo;

    viewMode=false;
    editMode=false;
    showModal=false;
    selectedRecordId;

    @wire(getContactBasedOnAccount,{
      accountId : '$recordId',
      pickList: '$leadSourceOptions'
    })
    getContactOutPut(result){
      this.contactRefreshProp = result;
        if (result.data) {
          console.log('leadSource option Populated'+JSON.stringify(result.data));
            this.contactData = result.data.map((currItem) => {
              let pickListOptions = this.leadSourceOptions;
              return {
                ...currItem,
                pickListOptions: pickListOptions
              };
            });
            //console.log('data : '+JSON.stringify(result.data));
        } else if(result.error){
            console.log('Error while loading records');
        }
    }

    @wire(getObjectInfo, {
      objectApiName: CONTACT_OBJECT
    })
    objectInfo;

    @wire(getPicklistValues, {
      recordTypeId:'$objectInfo.data.defaultRecordTypeId',
      fieldApiName: LEAD_SOURCE
    })
    wirePicklist({data,error}){
      if (data) {
        console.log('wirePickList data is : '+JSON.stringify(data));
        this.leadSourceOptions = data.values;
        console.log('leadSourceOptions is : '+JSON.stringify(data.values[2].value));
      } else if(error){
          console.log('error while loading data : ',error);
      }
    }

    /*
    async saveHandler(event) {
        // Convert datatable draft values into record objects
        console.log('modified values : '+event.detail.draftValues);
        console.log('modified values1 : '+JSON.stringify(event.detail.draftValues));
        const records = event.detail.draftValues.slice().map((draftValue) => {
          const fields = Object.assign({}, draftValue);
          console.log('fields values : '+JSON.stringify(fields));
          console.log('draftValues values : '+JSON.stringify(draftValue));
          //console.log('record values : '+records);
          return { fields };
        });
    
        // Clear all datatable draft values
        this.draftValues = [];
    
        try {
          // Update all records in parallel thanks to the UI API
          const recordUpdatePromises = records.map((record) => updateRecord(record));
          console.log('recordUpdatePromises values : '+JSON.stringify(recordUpdatePromises));
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
      */

    
    async saveHandler(event){
        console.log('save called');
        let records = event.detail.draftValues;
        //console.log('save called1 : '+JSON.stringify(records));
        let updateRecordsArray = records.map((currItem) => {
            let fieldInput = { ...currItem };
            //console.log('fieldInput values : '+JSON.stringify(fieldInput));
            return {
                fields: fieldInput
            };
        });
        //console.log('updateRecordsArray values : '+JSON.stringify(updateRecordsArray));
        this.draftValues = null;
        let updateRecordsArrayPromise = updateRecordsArray.map((currItem) => 
          updateRecord(currItem)
      );
      //console.log('updateRecordsArrayPromise values : '+JSON.stringify(updateRecordsArrayPromise));

        await Promise.all(updateRecordsArrayPromise);

        const toastEvent = new ShowToastEvent({
            title: 'Success',
            message: 'Record Updated Successfully',
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);

        await refreshApex(this.contactRefreshProp);

    }

    rowActionHandler(event){
      
      console.log('header rowActionHandler called EDTR');

      let action = event.detail.action;
      let row = event.detail.row;

      console.log('action : '+JSON.stringify(action));
      console.log('row : '+JSON.stringify(row));
      console.log('row id: '+row.Id);

      this.selectedRecordId = row.Id;
      this.viewMode = false;
      this.editMode = false;
      this.showModal = false;

      if (action.name === 'view') {
        console.log('view action EDTR: '+action.name);
        this.viewMode = true;
        this.showModal = true;
      } else if (action.name === 'edit'){
        console.log('edit action EDTR: '+action.name);
        this.editMode = true;
        this.showModal = true;
      } else if (action.name === 'delete'){
        this.deleteHandler();
      }

      
    }
    async deleteHandler() {
      console.log('delete handler called EDTR');

      try{
        await deleteRecord(this.selectedRecordId);

        const event = new ShowToastEvent({
          title: 'Success',
          message: 'Record saved successfully',
          variant: 'success'
      });
      this.dispatchEvent(event);
  
      await refreshApex(this.contactRefreshProp);
      } catch (error){
        const event = new ShowToastEvent({
          title: 'Error while deleting',
          message: error.body.message,
          variant: 'error'
      });
      this.dispatchEvent(event);
      }

    }

    async closeModal(event){
      console.log('closemodal called EDTR');
      this.showModal = false;
      if(this.editMode){
          await refreshApex(this.contactRefreshProp);
      }
    }
  
}