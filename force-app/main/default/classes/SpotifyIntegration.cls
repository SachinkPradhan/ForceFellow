public with sharing class SpotifyIntegration {
    
    @AuraEnabled(cacheable=true)
    public static String getSpotifyAuthUrl(String trackName) {
      Http http = new Http();
      HttpRequest request = new HttpRequest();
      request.setMethod('GET'); 
      String encodedName = EncodingUtil.urlEncode(trackName, 'UTF-8');
      
     request.setEndpoint('Callout:Spotify/v1/search?q='+encodedName+'&type=track&market=ES&limit=1&offset=1');
     try {
          HttpResponse response = http.send(request);
       
          if (response.getStatusCode() == 200) {
            return response.getBody();
           } else {
            throw new AuraHandledException('Error: ' + response.getStatus() + ' - ' + response.getBody());
           }
       
     } catch (Exception ex) {
      
      throw new AuraHandledException('Error during HTTP callout: ' + ex.getMessage());
     }
    }
}