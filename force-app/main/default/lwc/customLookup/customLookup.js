import { api, LightningElement, wire } from 'lwc';
import getRecords from '@salesforce/apex/CustomLookupController.getRecords';

const DELAY = 300;
export default class CustomLookup extends LightningElement {

    @api apiName = "Account";
    searchValue;
    @api objectLabel = "Account";
    @api iconName = "standard:account";
    delayTimeOut;
    selectedRecord = {
        selectedId:"",
        selectedName:""
    };
    displayOptions = false;

    @wire(getRecords, {
        objectApiName: "$apiName",
        searchKey: "$searchValue"
    })
    outputs;

    get isRecordSelected(){
        return this.selectedRecord.selectedId === "" ? false : true;
    }

    changeHandler(event){
        window.clearTimeout(this.delayTimeOut);
        let enteredValue = event.target.value;
        this.delayTimeOut = setTimeout(() => {
            this.searchValue = enteredValue;
            this.displayOptions = true;
        }, DELAY);
    }

    clickHandler(event){
        let selectedId = event.currentTarget.dataset.item;
        console.log('selectedId : ',selectedId);
        let outputRecord = this.outputs.data.find(
            (currItem) => currItem.Id === selectedId
        );
        this.selectedRecord = {
            selectedId: outputRecord.Id,
            selectedName: outputRecord.Name
        }
        this.displayOptions = false;
    }

    removalSelection(event){
        this.selectedRecord = {
            selectedId:"",
            selectedName:""
        };
        this.displayOptions = false;
    }
}