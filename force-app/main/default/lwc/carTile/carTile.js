import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';


export default class CarTile extends LightningElement {
    
    @api car;
    @api carSelectedId;

    @wire(CurrentPageReference) pageRef;

    handleSelect(event){
        console.log('clicked on image: '+this.car.Id);
        event.preventDefault();
        const carId = this.car.Id;

        const carSelect = new CustomEvent('carselect', {detail:carId});
        this.dispatchEvent(carSelect);

        fireEvent(this.pageRef, 'carselect', this.car.Id);
    }

    get isCarSelected(){
        console.log('is carselected1 '+this.car.Id);
        console.log('is carselected2 '+this.carSelectedId);
        if (this.car.Id === this.carSelectedId) {
            //console.log('is carselected1 '+this.car.Id);
            //console.log('is carselected2 '+this.carSelectedId);
            return "tile selected";
        } else {
            console.log('is carselected3 ');
            return "tile";
        }
    }
}