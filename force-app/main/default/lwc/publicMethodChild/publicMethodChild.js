import { LightningElement, api, track } from 'lwc';

export default class PublicMethodChild extends LightningElement {
    value = ['red'];
    @track myarray = [];

    options = [
            { label: 'RedMarker', value: 'red' },
            { label: 'BlueMarker', value: 'blue' },
            { label: 'GreenMarker', value: 'green' },
            { label: 'BlackMarker', value: 'black' },
        ];

    @api
    selectCheckbox(checkboxValue){
        const selectedCheckbox = this.options.find(checkbox =>{
            return checkboxValue === checkbox.value;
        })
        if (selectedCheckbox) {
            this.value = selectedCheckbox.value;
            return "Successfully checked";
        } else {
            return "No checkbox found";
        }
    }
}