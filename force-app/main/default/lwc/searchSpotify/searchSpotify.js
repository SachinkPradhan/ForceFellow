import { LightningElement } from 'lwc';
import getSpotifyAuthUrl from '@salesforce/apex/SpotifyIntegration.getSpotifyAuthUrl';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SearchSpotify extends LightningElement {
    searchTerm;
    displayResults = false;
    trackData = '';
    trackUrl = '';

    changeHandler(event) {
        this.searchTerm = event.target.value;
    }

    async searchHandler() {
        console.log('Search Handler called:');
        let isValid = this.validateInput();
        console.log('Is input valid?', isValid);
        if(isValid) {
            try {
                let responseString = await getSpotifyAuthUrl({ trackName: this.searchTerm });
                let response = JSON.parse(responseString);
                
                this.trackData = response.tracks.items[0];
                this.trackUrl = this.trackData.album.images[0].url;

                //console.log('Sachin*** Track Data:', this.trackData);
                //console.log('Sachin*** Track URL:', this.trackUrl);
                if(response){
                    this.displayResults = true;
                    this.showToast('Success', 'Data fetched successfully from Spotify.', 'success');
                } else {
                    this.displayResults = false;
                    this.showToast('Error', 'No data found for the given search term.', 'error');
                }

                //console.log('Spotify response:', response);
                //console.log('Parsed data:', JSON.stringify(response, null, 2));
                //console.log('Href:', response.tracks.href);
            } catch (error) {
                console.log('Error fetching Spotify data:', error);
                this.showToast('Error', 'There was an error fetching data from Spotify.', 'error');
            }
        }
    }

    validateInput(){
        console.log('Validating input called...');
        let isValid = true;
        let searchInput = this.template.querySelector('lightning-input');
        console.log('Search input:', searchInput);
        console.log('Search input value:', searchInput.value);
        console.log('Search input validity:', searchInput.checkValidity());
        if(!searchInput.checkValidity()){
            console.log('Search input is not valid');
            searchInput.reportValidity();
            isValid = false;

        }
        return isValid;
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

    get artistName(){
        let artistNameArr = this.trackData.artists.map(artist => artist.name);
        return artistNameArr.join(', ');

    }
}