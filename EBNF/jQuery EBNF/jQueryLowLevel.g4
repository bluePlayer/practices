<include> :=    <DOMElement.g4> ","
                <URL.g4> ","
                <ajaxObject.g4> ","
                <jQueryTypes.g4>               

<flags> := <STRING_LITERAL>
<container> := <DOMElement>
<contained> := <DOMElement>

<cssZIndex> := <finishTheRule>
<cssFontWeight> := <finishTheRule>
<cssOpacity> := <finishTheRule>
<cssZoom> := <finishTheRule>
<cssLineHeight> := <finishTheRule>
<cssWindows> := <finishTheRule>
<cssOrphans> := <finishTheRule>
<cssFillOpacity> := <finishTheRule>
<cssColumnCount> := <finishTheRule>
<cssOrder> := <finishTheRule>
<cssFlexGrow> := <finishTheRule>
<cssFlexShring> := <finishTheRule>

<cssNumberObject> := "{ 
                        zIndex: " <cssZIndex> ", 
                        fontWeight: " <cssFontWeight> ", 
                        opacity: " <cssOpacity> ", 
                        zoom: " <cssZoom> ",
                        lineHeight: " <cssLineHeight> ",
                        windows: " <cssWindows> ",
                        orphans: " <cssOrphans> ",
                        fillOpacity: " <cssFillOpacity> ",
                        columnCount: " <cssColumnCount> ", 
                        order: " <cssOrder> ",
                        flexGrow: " <cssFlexGrow> ",
                        flexShrink: " <cssFlexShring> 
                     " }"
                     
<target> := <plainObject>
<object1> := <plainObject>
<object2> := <plainObject>
<arrayLikeObject> := <finishTheRule>

<shorthandMethods> :=   "get(" (<url> ["," (<plainObject> | <STRING_LITERAL>)][", function (" <plainObject> "," <STRING_LITERAL> "," <jqXHR> ") {" <functionBody> "}" ]) | [<ajaxObject>] ")" | 
                        "getJSON(" <url> ["," (<plainObject> | <STRING_LITERAL>)][", function (" <plainObject> "," <STRING_LITERAL> "," <jqXHR> ") {" <functionBody> "}"] ")" | 
                        "getScript(" <url> [", function (" <STRING_LITERAL> "," <STRING_LITERAL> "," <jqXHR> ") {" <functionBody> "}"] ")" | 
                        "post(" (<url> ["," (<plainObject | <string>)]["function (" <plainObject> "," <string> "," <jqXHR> ") {" <functionBody> "}"]["," <string>]) | [<plainObject>] ")" | 
                        "load(" <url> ["," (<plainObject> | <string>)]["," "function (" <string> "," <string> "," <jqXHR> ") {" <functionBody> "}"] ")"

<jQueryLowLevel> := "jQuery." (
                <shorthandMethods> |
                "ajax(" (<url> ["," <settings>]) | [<settings>] ")" |
                "ajaxPrefilter(" [<STRING_LITERAL>] ", function (" <plainObject> "," <plainObject> "," <jqXHR> ") {" <functionBody> "}"  ")" |
                "ajaxSetup(" <plainObject> ")" | (* Its use is not recommended. *)
                "ajaxTransport(" <STRING_LITERAL> ", function (" <plainObject> "," <plainObject> "," <jqXHR> ") {" <functionBody> "}"  ")" |
                "boxModel" | (* Deprecated. This property was removed in jQuery 1.8. Please try to use feature detection instead. *)
                "browser" | (* Deprecated. This property was removed in jQuery 1.9 and is available only through the jQuery.migrate plugin. *)
                "CallBacks(" <flags> ")" |
                "contains(" <container> "," <contained> ")" |
                "cssHooks" |
                "cssNumber" | (* see: <cssNumberObject> *)
                "data(" (<DOMElement> "," <STRING_LITERAL> "," <anything>) |
                    (<DOMElement> | <STRING_LITERAL>) | <DOMElement> ")" |
                "Deferred("[<deferredFunction>]")" |
                "dequeue(" <DOMElement> ["," <STRING_LITERAL> ] ")" |
                "each(" (<JavaScriptArray> ", function (" <INTEGER_LITERAL> "," <plainObject> ") {" <functionBody> "}") |
                        (<plainObject> ", function (" <STRING_LITERAL> "," <plainObject> ") {" <functionBody> "}") ")" |
                "error(" <STRING_LITERAL> ")" |
                "escapeSelector(" <selector> ")" |
                "extend(" [<BOOLEAN_LITERAL> ","] <target> ["," <object1>] ["," <object2>]")" |
                "fn.extend(" <plainObject> ")" |
                "fx.interval" |
                "fx.off" |
                "globalEval(" <STRING_LITERAL> ")" | 
                "grep(" <JavaScriptArray> ", function (" <plainObject> "," <INTEGER_LITERAL> ") {" <functionBody> "return" <BOOLEAN_LITERAL> "}" ["," <BOOLEAN_LITERAL>]  ")" |
                "hasData(" <DOMElement> ")" |
                "holdReady(" <BOOLEAN_LITERAL> ")" |
                "htmlPrefilter(" <STRING_LITERAL> ")" |
                "inArray(" <anything> "," <JavaScriptArray> ["," <NUMBER_LITERAL>] ")" |
                "isArray(" <plainObject> ")" |
                "isEmptyObject(" <plainObject> ")" |
                "isFunction(" <plainObject> ")" |
                "isNumeric(" <anything> ")" |
                "isPlainObject(" <plainObject> ")" |
                "isWindow(" <plainObject> ")" |
                "isXMLDoc(" <DOMElement> ")" |
                "makeArray(" <plainObject> ")" |
                "map(" (<JavaScriptArray> | <JavaScriptObject>) ", function (" <plainObject> "," <INTEGER_LITERAL> ") {" <functionBody> "return" <plainObject> ";" "}" ")" |
                "merge(" <arrayLikeObject> "," <arrayLikeObject> ")" |  
                "noConflict(" [<BOOLEAN_LITERAL>] ")" | (* ContinueHere *)
                "noop()" |
                "now()" |
                "param(" (<array> | <plainObject> | <jQuery>) ["," <boolean>] ")" |
                "parseHTML("<string> ["," <element>]["," <boolean>] ")" |
                "parseJSON(" <string> ")" |
                "parseXML(" <string> ")" |
                "proxy(" (<function> "," <plainObject>) | (<plainObject> | <string>) | (<function> "," <plainObject> ["," <anything>]) | (<plainObject> "," <string> ["," <anything>]) ")" |
                "queue(" (<element> ["," <string>]) | (<element> "," <string> "," <array>) | (<element> | <string> | <function>)")" |
                "readyException(" <error> ")" |
                "removeData(" <element> ["," <string>] ")" |
                "speed(" ([<number> | <string>] ["," "{ easing: " <string> ", complete: " <function> "}"]) | ([<number> | <string>]["," <string>]["," <function>]) | <plainObject>")" |
                "sub()" | (* Deprecated as of 1.7 *)
                "support" | (* Deprecated as of 1.9 *)
                "trim(" <string> ")" |
                "type(" <anything> ")" |
                "unique(" <array> ")" | (* Note that this only works on arrays of DOM elements, not strings or numbers. *)
                "uniqueSort(" <array> ")" | (* Note that this only works on arrays of DOM elements, not strings or numbers. *)
                "when(" {<deferred>} | {<JavaScriptObject>} ")"
            )
            
