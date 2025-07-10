import { LightningElement, api } from 'lwc';

export default class MeetingRoom extends LightningElement {
    @api meetingRoomInfo;//{roomName:'A-01', roomCapacity:'12'}

    tileClickHandler(){
        //console.log('inside onTileclickHandler:');
        const tileClicked = new CustomEvent('tileclick', {detail : this.meetingRoomInfo});
        this.dispatchEvent(tileClicked);
    }

    constructor(){
        super();
        //console.log('MR cons');
    }
}