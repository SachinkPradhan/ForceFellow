public with sharing class CustomLookupController {
    @AuraEnabled(cacheable=true)
    public static List<sObject> getRecords(String objectApiName, String searchKey){
        try {
            List<sObject> sObjectList = new List<sObject>();
            if (String.isNotEmpty(searchKey)) {
                String key = '%'+searchKey+'%';
                String queryString = 'Select Id, Name from '+objectApiName+' where Name like : key';
                sObjectList = Database.query(queryString, AccessLevel.USER_MODE);
            }
            return sObjectList;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}