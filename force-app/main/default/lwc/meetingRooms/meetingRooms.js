import { LightningElement, track } from 'lwc';

export default class MeetingRooms extends LightningElement {
    
    @track selectedMeetingRoom;
    meetingRoomsInfo = [
        {roomName:'A-01', roomCapacity:'12'},
        {roomName:'A-02', roomCapacity:'14'},
        {roomName:'A-03', roomCapacity:'16'},
        {roomName:'B-01', roomCapacity:'13'},
        {roomName:'B-02', roomCapacity:'15'},
        {roomName:'C-01', roomCapacity:'19'},
        {roomName:'C-02', roomCapacity:'17'}
    ];

    onTileSelectHandler(event){
        //console.log('inside onTileSelectHandler');
        const meetingRoomInfo = event.detail;
        this.selectedMeetingRoom = meetingRoomInfo.roomName;
    }
    constructor(){
        super();
        //console.log('MRs cons');
    }
}