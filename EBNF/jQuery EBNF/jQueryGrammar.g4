<include> :=    <URL.g4> "," 
                <event.g4> "," 
                <selector.g4> "," 
                <ajaxObject.g4> "," 
                <jQueryLowLevel.g4> "," 
                <DOMElement.g4>

<jquery> := ("jQuery" | "$") 
            ["("
                [(<selector> [","<context>]) |
                <element> | 
                <elementArray> |
                <object> |
                <selection> |
                (<html> [","<ownerDocument>]) |
                (<html>","<attributes>) |
                <callback> |
                ("#" <elementId>)]
            ")"] "." <jqueryCommand>
            
<elementId> :=  <STRING_LITERAL>
<className> := <STRING_LITERAL>

<pseudoClassSelector> := <finishTheRule> (* starts with ":" *)
         
<language> := <finishTheRule>     
<tagName> := <finishTheRule>
<attributeValue> := <STRING_LITERAL> | <NUMBER_LITERAL>
<attributeName> := <STRING_LITERAL>
<sign> := ("+" | "" | "-")
<cssElementIndex> := <elementIndex> | <even> | <odd> | <equation>
<elementIndex> := <sign> <NUMBER_LITERAL>
<context> := <element> | <jquery>
<readyParameter> := <finishTheRule>
<args> := {<anything>}

<callbacks> := "callbacks." (
                    "add(" <function> | "[" {","<function>} "]" ")" |
                    "disable()" |
                    "disabled()" |
                    "empty()" |
                    "fire(" <anything> ")" |
                    "fired()" |
                    "fireWith(" [<context>] ["," <args>] ")" |
                    "has(" [<function>] ")" |
                    "lock()" |
                    "locked()" |
                    "remove(" <function> | "[" {","<function>} "]"")" |
                )
                
<deferred> := "deferred." (
                    "always(" <function> | "[" {","<function>} "]" ")" |
                    "catch(" <function> ")" |
                    "done(" <function> | "[" {","<function>} "]" ")" |
                    "fail(" <function> | "[" {","<function>} "]" ")" |
                    "isRejected()" (* As of jQuery 1.7 this API has been deprecated; please use deferred.state() instead. *) | 
                    "isResolved()" (* This API is deprecated as of jQuery 1.7 and removed as of jQuery 1.8; please use deferred.state() instead.*) |
                    "notify(" <JavaScriptObject> ")" |
                    "notifyWith(" <JavaScriptObject> [ "," <JavaScriptArray> ] ")" |
                    "pipe(" ([<function>] ["," <function>]) | ([<function>] ["," <function>] ["," <function>]) ")" (* Deprecation Notice:As of jQuery 1.8, the deferred.pipe() method is deprecated. The deferred.then() method, which replaces it, should be used instead. *)|
                    "progress(" <function> | "[" {","<function>} "]" ")" |
                    "promise(" [<JavaScriptObject>] ")" |
                    "reject(" [<anything>] ")" |
                    "rejectWith(" <JavaScriptObject> ["," <JavaScriptArray> ] ")" |
                    "resolve(" [<anything>] ")" |
                    "resolveWith(" <JavaScriptObject> ["," <JavaScriptArray> ] ")" |
                    "state()" |
                    "then(" (<function> ["," <function> ] ["," <function>] ) | 
                        ((<function> | "[" {","<function>} "]") "," (<function> | "[" {","<function>} "]")) | 
                        ((<function> | "[" {","<function>} "]") "," (<function> | "[" {","<function>} "]") ["," (<function> | "[" {","<function>} "]")]) ")"
                )
                
<settings> := <ajaxObject>

(*
    var fName = function (<params>) {};
    function (<params>) {}
    function fName (<params>) {}
*)

<functionName> := <STRING_LITERAL>
<functionParams> := <finishTheRule>
<functionBody> := <finishTheRule>
<JavaScriptObject> := <finishTheRule> (* typeof === "Object" => true *)
<returnStatement> := "return" <anything> ";"
<javascriptFunction> := ("var" <functionName> "(" <functionParams> ") {" <functionBody> [<returnStatement>] "};") |
                        ("function" <functionName> "(" <functionParams> ") {" <functionBody> [<returnStatement>]"};") |
                        ("function" "(" <functionParams> ") {" <functionBody> [<returnStatement>]"}")
<function> := <javascriptFunction>
<afterCommandFunction> := "function (" <INTEGER_LITERAL> ") {" <functionBody> "return" (<htmlString> | <element> | <text> | <jQuery>) "}"
<afterCommandFunctionHtml> := "function (" <INTEGER_LITERAL> "," <STRING_LITERAL> ") {" <functionBody> "return" (<htmlString> | <element> | <text> | <jQuery>) "}"
<beforeCommandFunction> :=  <afterCommandFunction>
<beforeCommandFunctionHtml> := <afterCommandFunctionHtml>
<appendCommandFunctionHtml> := <afterCommandFunctionHtml>
<functionHTML> := <finishTheRule>
<tagName> := <STRING_LITERAL>
<tagAttributes> := <finishTheRule>
<tagContents> := {[<STRING_LITERAL>] [<tagChildren>]}
<tagChildren> := [<DOMElement>] {<DOMElement>}

<element> := <DOMElement>
<text> := <STRING_LITERAL>
<JavaScriptArray> := <finishTheRule>
<array> := <JavaScriptArray>
<jQuery> := {<DOMElement>} (* A jQuery object contains a collection of Document Object Model (DOM) elements that have been created from an HTML string or selected from a document.  *)
<content> := <htmlString> | <element> | <text> | <array> | <jQuery>
<htmlString> := {{<STRING_LITERAL>} {""" <DOMElement> """}}
<jqXHR> := <JQueryProps> <XMLHTTPRequest> <finishTheRule> (* jqXHR object which is a superset of the XMLHTTPRequest object *)
<plainObject> := <JavaScriptObject>
<ajaxCompleteCommandHandler> := "function (" <event> "," <jqXHR> "," <plainObject> ") {" <functionBody> "}" 
<ajaxErrorCommandHandler> := "function (" <event> "," <jqXHR> "," <plainObject> "," <STRING_LITERAL> ") {" <functionBody> "}" 
<ajaxSendCommandHandler> := <ajaxCompleteCommandHandler>
<ajaxSuccessCommandHandler> := "function (" <event> "," <jqXHR> "," <plainObject> "," <plainObject> ") {" <functionBody> "}" 
<eventHandler> := <function>
<plainEventHandler> := "function (" <event> ") {" <functionBody> "}"
<stepFunction> := <finishTheRule>
<progressFunction> := <finishTheRule>
<completeFunction> := <finishTheRule>
<startFunction> := <finishTheRule>
<doneFunction> := <finishTheRule>
<failFunction> := <finishTheRule>
<alwaysFunction> := <finishTheRule>
<animateOptionsPlainObject> := "{ duration: " (<NUMBER_LITERAL> | <STRING_LITERAL>) ", easing: " <STRING_LITERAL> ", queue: " (<STRING_LITERAL> | <BOOLEAN_LITERAL>) ", specialEasing: " <plainObject> ", step: " <stepFunction> ", progress: " <progressFunction> ", complete: " <completeFunction> ", start: " <startFunction> ", done: " <doneFunction> ", fail: " <failFunction> ", always: " <alwaysFunction> "}"
<NULL_LITERAL> := "null"
<attributeCommandFunction> := "function (" <INTEGER_LITERAL> "," <STRING_LITERAL> ") {" <functionBody> "return " (<STRING_LITERAL> | <NUMBER_LITERAL>) "}"
<anything> := <ANY_TYPE_LITERAL>
<deferredFunction> := "function (" <deferred> ") {" <functionBody> "return" <deferred> ";" "}"

<fadeInOptionsObject> := <animateOptionsPlainObject>
<fadeOutOptionsObject> := <animateOptionsPlainObject>
<fadeToggleOptionsObject> := <animateOptionsPlainObject>
<hideOptionsObject> := <animateOptionsPlainObject>

<jqueryCommand> :=  "noConflict()" |
                    "ready(" <readyParameter> ")" |
                    "add("<selector> | (<element> {<element>}) | <html> | <selection> | (<selector> <element>)")" | 
                    "addBack("[<selector>]")" |
                    "addClass("<className> | <function>")" |
                    "after(" (<content> {"," <content>}) | <afterCommandFunction> | <afterCommandFunctionHtml> ")" |
                    "ajaxComplete(" <ajaxCompleteCommandHandler> ")" |
                    "ajaxError(" <ajaxErrorCommandHandler> ")" |
                    "ajaxSend(" <ajaxSendCommandHandler> ")" |
                    "ajaxStart(" <eventHandler> ")" |
                    "ajaxStop(" <eventHandler> ")" |
                    "ajaxSuccess(" <ajaxSuccessCommandHandler> ")" |
                    "andSelf()" | (* Deprecated, alias for addBack() *)
                    "animate("(<plainObject> ["," <NUMBER_LITERAL> | <STRING_LITERAL>]["," <STRING_LITERAL>]["," <function>]) |
                            (<plainObject> "," <animateOptionsPlainObject>)")" |
                    "append("(<content> {"," <content>}) | <appendCommandFunctionHtml>")" |
                    "appendTo(" <selector> | <htmlString> | <element> | <array> | <jQuery> ")" |
                    "attr(" <attributeName> | (<attributeName> "," (<STRING_LITERAL> | <NUMBER_LITERAL> | <NULL_LITERAL>)) | <plainObject> | (<attributeName> "," <attributeCommandFunction>) ")" |
                    "before(" (<content> {"," <content>}) | <beforeCommandFunction> | <beforeCommandFunctionHtml> ")" |
                    "bind(" (<STRING_LITERAL> ["," <anything>]["," <plainEventHandler>]) |
                            (<STRING_LITERAL> ["," <anything>]["," <BOOLEAN_LITERAL>]) |
                            <OBJECT_LITERAL> ")" |
                    "blur(" [([<anything> ","] <plainEventHandler>)] ")" |
                    <callbacks> |
                    "change(" [([<anything> ","] <plainEventHandler>)] ")" |
                    "children(" [<selector>] ")" |
                    "clearQueue(" [<STRING_LITERAL>] ")" |
                    "click(" [([<anything> ","] <plainEventHandler>)] ")" |
                    "clone(" [<BOOLEAN_LITERAL>]["," <BOOLEAN_LITERAL>] ")" |
                    "closest(" <selector> ["," <element>] | <jQuery> | <element>")" |
                    "contents()" |
                    "context" (* Deprecated, the value of this property is typically equal to document *) |
                    "contextmenu(" [([<anything> ","] <plainEventHandler>)] ")" |
                    "css(" (<STRING_LITERAL> "," (<STRING_LITERAL> | <NUMBER_LITERAL>)) |
                        (<STRING_LITERAL> "," ("function (" <INTEGER_LITERAL> "," <STRING_LITERAL> ") {" <functionBody> "return" (<STRING_LITERAL> | <NUMBER_LITERAL>) "}" )) |
                        <plainObject>")" |
                    "data(" [(<STRING_LITERAL> ["," <anything>]) | <OBJECT_LITERAL>] ")" |
                    "dblclick(" [([<anything> ","] <plainEventHandler>)] ")" |
                    <deferred> |
                    "delay(" <INTEGER_LITERAL> ["," <STRING_LITERAL>] ")" (* .delay() is not a replacement for JavaScript"s native setTimeout function *) |
                    "delegate(" (<STRING_LITERAL> "," <STRING_LITERAL> "," <eventHandler>) |
                        (<STRING_LITERAL> "," <STRING_LITERAL> "," <anything> "," <eventHandler>) |
                        (<STRING_LITERAL> "," <JavaScriptObject>) ")" (* As of jQuery 3.0, .delegate() has been deprecated. It was superseded by the .on() method since jQuery 1.7 *) |
                    "dequeue(" [<STRING_LITERAL>] ")" |
                    "detach(" [<selector>] ")" |
                    "die(" [(<STRING_LITERAL> ["," <STRING_LITERAL>]) | <JavaScriptObject>] ")" (* As of jQuery 1.7, use of .die() (and its complementary method, .live()) is not recommended. *) |
                    "each(" "function (" <INTEGER_LITERAL> "," <DOMElement> ") {" <functionBody> "}" ")" |
                    "empty()" |
                    "end()" |
                    "eq(" <sign> <INTEGER_LITERAL> ")" |
                    "error(" [<anything> ","] <eventHandler> ")" (* As of jQuery 1.8, the .error() method is deprecated. Use .on( "error", handler ) to attach event handlers to the error event instead. *)|
                    <event> |
                    "fadeIn(" ([<INTEGER_LITERAL> | <STRING_LITERAL>] ["," <function>]) | 
                        <fadeInOptionsObject> | 
                        ([<INTEGER_LITERAL> | <STRING_LITERAL>] [<STRING_LITERAL>] ["," <function>]) ")" | 
                    "fadeOut(" ([<INTEGER_LITERAL> | <STRING_LITERAL>] ["," <function>]) | 
                        <fadeOutOptionsObject> | 
                        ([<INTEGER_LITERAL> | <STRING_LITERAL>] [<STRING_LITERAL>] ["," <function>]) ")" |
                    "fadeTo(" ([<INTEGER_LITERAL> | <STRING_LITERAL>] ["," <function>]) | 
                        ([<INTEGER_LITERAL> | <STRING_LITERAL>] [<STRING_LITERAL>] ["," <function>]) ")" |
                    "fadeToggle(" ([<INTEGER_LITERAL> | <STRING_LITERAL>] [<STRING_LITERAL>] ["," <function>]) |
                        <fadeToggleOptionsObject> ")" |
                    "filter(" <selector> | ("function (" <INTEGER_LITERAL> "," <BOOLEAN_LITERAL> ") {" <functionBody> "return" <BOOLEAN_LITERAL> "}") | (<DOMElement> {"," <DOMElement>}) | <jQuery> ")" |
                    "find(" <selector> | <DOMElement> | <jQuery> ")" |
                    "finish(" [<STRING_LITERAL>] ")" |
                    "first()" |
                    "focus(" [[<anything> ","] <eventHandler>]  ")" |
                    "focusin(" [[<anything> ","] <eventHandler>] ")" |
                    "focusout(" [[<anything> ","] <eventHandler>] ")" |
                    "get(" [<INTEGER_LITERAL>] ")" |
                    "has(" <STRING_LITERAL> | <DOMElement> ")" |
                    "hasClass(" <STRING_LITERAL> ")" |
                    "height(" [ (<STRING_LITERAL> | <NUMBER_LITERAL>) | ("function (" <INTEGER_LITERAL> "," <INTEGER_LITERAL> ") {" <functionBody> "return" (<STRING_LITERAL> | <NUMBER_LITERAL>) "}")] ")" | 
                    "hide(" ([<INTEGER_LITERAL> | <STRING_LITERAL>]["," <function>]) |
                        <hideOptionsObject> | (<INTEGER_LITERAL> | <STRING_LITERAL> ["," <STRING_LITERAL>] ["," <function>]) ")" | 
                    "hover(" (<eventHandler> "," <eventHandler>) | <eventHandler> ")" |
                    "html(" [<htmlString> | ("function (" <INTEGER_LITERAL> "," <htmlString> ") {" <functionBody> "return" <htmlString> "}")] ")" |
                    "index(" [<selector> | <DOMElement> | <jQuery>] ")" |
                    "innerHeight(" [(<STRING_LITERAL> | <NUMBER_LITERAL>) | "function (" <INTEGER_LITERAL>, <NUMBER_LITERAL> ") {" <functionBody> "return" (<STRING_LITERAL> | <NUMBER_LITERAL>) "}"] ")" |
                    "innerWidth(" [(<STRING_LITERAL> | <NUMBER_LITERAL>) | "function (" <INTEGER_LITERAL>, <NUMBER_LITERAL> ") {" <functionBody> "return" (<STRING_LITERAL> | <NUMBER_LITERAL>) "}"] ")" |
                    "insertAfter(" <selector> | <htmlString> | <DOMElement> | <JavaScriptArray> | <jQuery> ")" |
                    "insertBefore(" <selector> | <htmlString> | <DOMElement> | <JavaScriptArray> | <jQuery> ")" |
                    "is(" <selector> | ("function (" <INTEGER_LITERAL> "," <DOMElement> ") {" <functionBody> "return" <BOOLEAN_LITERAL> "}") | <jQuery> | <DOMElement>")" |
                    "jquery" |
                    <jQueryLowLevel> |
                    "keydown()" |
                    "keypress()" |
                    "keyup()" |
                    "last()" |
                    "length" |
                    "live()" |
                    "load()" |
                    "load()" |
                    "map()" |
                    "mousedown()" |
                    "mouseenter()" |
                    "mouseleave()" |
                    "mousemove()" |
                    "mouseout()" |
                    "mouseover()" |
                    "mouseup()" |
                    "next()" |
                    "nextAll()" |
                    "nextUntil()" |
                    "not()" |
                    "off()" |
                    "offset()" |
                    "offsetParent()" |
                    "on()" |
                    "net()" |
                    "outerHeight()" |
                    "outerWidth()" |
                    "parent()" |
                    "parents()" |
                    "parentsUntil()" |
                    "position()" |
                    "prepend()" |
                    "prependTo()" |
                    "prev()" |
                    "prevAll()" |
                    "prevUnitl()" |
                    "promise()" |
                    "prop()" |
                    "pushStack()" |
                    "queue()" |
                    "ready()" |
                    "remove()" |
                    "removeAttr()" |
                    "removeClass()" |
                    "removeData()" |
                    "removeProp()" |
                    "replaceAll()" |
                    "replaceWith()" |
                    "resize()" |
                    "scroll()" |
                    "scrollLeft()" |
                    "scrollTop()" |
                    "select()" |
                    "selector" |
                    "serialize()" |
                    "serializeArray()" |
                    "show()" |
                    "siblings()" |
                    "size()" |
                    "slice()" |
                    "slideDown()" |
                    "slideToggle()" |
                    "slideUp()" |
                    "stop()" |
                    "submit()" |
                    "text()" |
                    "toArray()" |
                    "toggle()" |
                    "toggle()" |
                    "toggleClass()" |
                    "trigger()" |
                    "triggerHandler()" |
                    "unbind()" |
                    "undelegate()" |
                    "unload()" |
                    "unwrap()" |
                    "val()" |
                    "width()" |
                    "wrap()" |
                    "wrapAll()" |
                    "wrapInner()"
                    
                    
