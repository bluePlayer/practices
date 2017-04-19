<include> := <UTTAssertionComponent.g4>

<className> := <STRING_LITERAL>
<cSharpType> := <finishTheRule>
<cSharpObject> := <finishTheRule>
<classBody> := <finishTheRule>
<memberResolver> := <finishTheRule>
<stringArray> := <finishTheRule>
<fieldInfo> := <finishTheRule>
<IEnumberable> := <fieldInfo> | <finishTheRule> 

<abPublicFields> := "go" (* returns GameObject *) |
                    "thisPropertyPath" (* returns "" *)
<abProtectedFields> := "m_ObjVal" (* returns <cSharpObject> *)
<abPrivateFields> := "m_MemberResolver" (* returns <memberResolver> *)
<abPublicProperties> := "UseCache" (* returns "false" *)

<abPublicFunctions> := "GetAccepatbleTypesForA()" (* returns "null" *) |
                        "GetDepthOfSearch()" (* returns "2" *) |
                        "GetExcludedFieldNames()" (* returns <stringArray> *) |
                        "Compare()" (* returns <BOOLEAN_LITERAl> *) |
                        "GetParameterType()" (* returns <cSharpType> *) |
                        "GetConfigurationDescription()" (* returns <STRING_LITERAL> *) |
                        
                        "CreateCopy(" <gameObject> ", " <gameObject> ")" (* returns <actionBase> *) |
                        "Fail(" <assertionComponent> ")" |
                        "GetFailureMessage()" (* returns <STRING_LITERAL> *)
                        
<abProtectedFunctions> := "Compare(" <cSharpObject> ")" (* returns <BOOLEAN_LITERAl> *)
<abPrivateFunctions> := "GetFields(" <cSharpType> ")" (* returns <IEnumberable> *)

<abSubclasses> := <ActionBaseGeneric>
<ActionBaseGeneric> := "public abstract class ActionBaseGeneric <" <cSharpType> "> : ActionBase {"
    "Compare(" <cSharpObject> ")" (* returns <BOOLEAN_LITERAl> *) |
    "GetAccepatbleTypesForA()" (* returns <arrayOfCSharpTypes> *) |
    "GetParameterType()" (* returns <cSharpType> *) |
    "UseCache" (* returns "false" *)
"}"   

<actionBase> := <abPublicFields> 
                <abProtectedFields> 
                <abPrivateFields> 
                <abPublicProperties> 
                <abPublicFunctions>
                <abProtectedFunctions>
                <abPrivateFunctions>
                <abSubclasses>
                
"public " ["abstract"] "class" <className> "<" <cSharptType> "> : " <actionBase> "{"
    <classBody>
"}"
