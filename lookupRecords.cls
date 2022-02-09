public class lookupRecords {

        @AuraEnabled(cacheable=true)
        public static List<Account> getAccountRecords(String fieldValue) {
            system.debug('fieldValue'+fieldValue);
            String key = '%' + fieldValue + '%';
            return [SELECT Id, Name,OwnerId,AccountSource FROM Account WHERE Name LIKE :key];
          }
          
        @AuraEnabled(cacheable=true)
        public static List<Contact> returnAccountRecords(Id accId) {
            system.debug('acc'+accId);
            return [SELECT Id, Name,FirstName,LastName,Account.Name FROM Contact WHERE AccountId =: accId];
          }
    
    
}