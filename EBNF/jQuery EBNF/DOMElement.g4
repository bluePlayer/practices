<tagName> := <STRING_LITERAL>
<tagAttributes> := <finishTheRule>
<tagContents> := {[<STRING_LITERAL>] [<tagChildren>]}
<tagChildren> := [<DOMElement>] {<DOMElement>}
<DOMElement> := ("<" <tagName> <tagAttributes> ">" <tagContents> "</" <tagName> ">") | ("<" <tagName> <tagAttributes> "/>")
