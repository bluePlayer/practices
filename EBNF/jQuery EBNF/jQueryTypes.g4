<include> := <DOMElement.g4>

<types> := <anything>
<anything> := ( <number> | 
                <string> | 
                <boolean> | 
                <object> | 
                <array> | 
                <null> | 
                <NaN> | 
                <Infinity> | 
                <function> | 
                <Date> | 
                <error> | 
                <selector> | 
                <element> |
                <event> |
                <jQueryTypes> |
                <arrayLikeObject> |
                <htmlString> |
                <text> |
                <XMLHTTPRequest> |
                <jqXHR> |
                <deferredObject> |
                <promiseObject> |
                <callbacksObject> |
                <xmlDocument> |
                <assertObject>)
                
<string> := <STRING_LITERAL>
<htmlString> := {{<STRING_LITERAL>} {""" <DOMElement> """}}
<number> := <NUMBER_LITERAL> | <integer> | <float>
<boolean> := <BOOLEAN_LITERAL> | ("!{}" | "!!{}") | ("!0" | "!!0" | "!1" | "!-1") | ("![]" | "!![]")
<Math> := <finishTheRule>
<numberBase> := <finishTheRule>
<parsingNumbers> := "parseInt(" <number> "," <numberBase> ")" | "parseFloat(" <number> "," <numberBase> ")"
<numbersToStrings> := (""" + " <number>) | <number>".toString()"
<NaN> := "NaN"
<infinity> := (<sign> "Infinity") | "1 / 0"
<integer> := <INTEGER_LITERAL>
<float> := <FLOAT_LITERAL>
<object> := "{" [(<key> ":" <value>) {"{" [(<key> ":" <value>) ["," <key> ":" <value>]]  "}"} {"," <key> ":" <value>}]  "};"
<dotNotation> := "."
<arrayNotation> := <finishTheRule>
<prototype> := "jQuery.fn" | "jQuery.prototype"
<array> := "[" [(<number> | <string> | <boolean> | <object> | <array>) {"," (<number> | <string> | <boolean> | <object> | <array>)}] "];"
<arrayType> := "Array<" (<number> | <string> | <boolean> | <object> | <array>) ">"
<arrayLikeObject> := <finishTheRule>
<plainObject> := <object>
<Null> := "Null"
<year> := "1970" | "1971" | "1972" | ... | "2015" | "2016" | "2017"
<month> := "0" | "1" | "2" | ... | "10" | "11"
<day> := "1" | "2" | "3" | ... | "11" | "12"
<hour> := "1" | "2" | "3" | ... | "22" | "23" 
<minute> := "1" | "2" | "3" | ... | "58" | "59" 
<second> := "1" | "2" | "3" | ... | "58" | "59" 
<millisecond> := "1" | "2" | "3" | ... | "998" | "999" 
<Date> := "new Date(" <year>, <month>, <day>, <hour>, <minute>, <second>, <millisecond> ")"

(* ---------------------- Function Type ----------------------------- *)

<fParameter> := (<number> | <string> | <boolean> | <object> | <array>)
<functionName> := <STRING_LITERAL>
<functionParams> := <fParameter> {"," <fParameter>}
<functionBody> := <finishTheRule>
<returnStatement> := "return" <anything> ";"
<function> := ("var" <functionName> "(" <functionParams> ") {" <functionBody> [<returnStatement>] "};") |
                ("function" <functionName> "(" <functionParams> ") {" <functionBody> [<returnStatement>]"};") |
                ("function" "(" <functionParams> ") {" <functionBody> [<returnStatement>]"};")
                
<error> := "throw new Error(" <STRING_LITERAL> ")"
<selector> := <finishTheRule>
<event> := "blur" | "focus" | "load" | "resize" | "scroll" | "unload" | "beforeunload" | "click" | "dblclick" | "mousedown" | "mouseup" | "mousemove" | "mouseover" | "mouseout" | "mouseenter" | "mouseleave" | "change" | "select" | "submit" | "keydown" | "keypress" | "keyup"
<element> := <DOMElement>    
<text> := <STRING_LITERAL>     
<jQueryType> := <element> {"," <element>}     
<XMLHTTPRequest> := <W3CStandardImpl> | <SafariImpl> | <FirefoxImpl> | <MSIEImpl> | <OperaImpl>
<jqXHR> := <XMLHTTPRequest>
<deferredObject> := <finishTheRule>
<promiseObject> := <finishTheRule>
<callbacksObject> := <finishTheRule>
<xmlDocument> := <finishTheRule>
<assertObject> := <finishTheRule>                
                
                
