public class QuickCreate {
    
    @AuraEnabled(Cacheable=true)
	public static String getFieldLabels(String objectName)
	{ 
        Schema.SObjectType schemaObj = Schema.getGlobalDescribe().get(objectName) ;
        Map<String,Schema.SObjectField> fieldsMap = schemaObj.getDescribe().fields.getMap();
		Map<Schema.SObjectField,String> fieldLabelMap = new Map<Schema.SObjectField,String>();
        for(SObjectField field:fieldsMap.values()){
            String name = field.getDescribe().getName();
            fieldLabelMap.put(field,name);
            system.debug('name'+name);
      }
    	return JSON.serialize(fieldLabelMap); 
	}

}