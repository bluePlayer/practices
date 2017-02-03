<jquery> := ('jQuery' | '$') 
            ['(' 
                '' |
                (<selector> [','<context>]) |
                <element> | 
                <elementArray> |
                <object> |
                <selection> |
                (<html> [','<ownerDocument>]) |
                (<html>','<attributes>) |
                <callback> |
                ('#' <elementId>)
            ')'] <jqueryCommand>
            
<elementId> :=  <STRING_LITERAL>
<className> := <STRING_LITERAL>

<pseudoClassSelector> := <daSeDovrshi> (* starts with ':' *)
<selector> := '*' | 
              ([<selector> | <tagName> | '*' | ''] ':animated') |
              ([<selector> | <tagName> | '*' | ''] '['<attribute>'|=' <value>']') |
              ([<selector> | <tagName> | '*' | ''] '['<attribute>'*=' <value>']') |
              ([<selector> | <tagName> | '*' | ''] '['<attribute>'~=' <value>']') |
              ([<selector> | <tagName> | '*' | ''] '['<attribute>'$=' <value>']') |
              ([<selector> | <tagName> | '*' | ''] '['<attribute>'=' <value>']')  |
              ([<selector> | <tagName> | '*' | ''] '['<attribute>'!=' <value>']') |
              ([<selector> | <tagName> | '*' | ''] '['<attribute>'^=' <value>']') |
              ':button' |
              ([<selector> | <tagName> | '*' | ''] ':checkbox') |
              ([<selector> | <tagName> | '*' | ''] ':checked') |
              (<parentSelector> '>' <childSelector>) |
              ('.'<className>) |
              ( ':contains(' <STRING_LITERAL> ')' ) |
              (<ancestorSelector> <descendantSelector>) |
              ([<selector> | <tagName> | '*' | ''] ':disabled') |
              ([<selector> | <tagName> | '*' | ''] ':empty') |
              ([<selector> | <tagName> | '*' | ''] ':enabled') |
              ([<selector> | <tagName> | '*' | ''] ':even') |
              ([<selector> | <tagName> | '*' | ''] ':file') |
              ([<selector> | <tagName> | '*' | ''] ':first-child') |
              ([<selector> | <tagName> | '*' | ''] ':first-of-type') |
              ([<selector> | <tagName> | '*' | ''] ':first') |
              ([<selector> | <tagName> | '*' | ''] ':focus') |
              ([<selector> | <tagName> | '*' | ''] ':gt(' <elementIndex> ')') |
              ([<selector> | <tagName> | '*' | ''] '[' <attributeName> ']' ) |
              ([<selector> | <tagName> | '*' | ''] ':has(' <selector> ')') |
              ':header' |
              ([<selector> | <tagName> | '*' | ''] ':hidden') |
              ':image' |
              ':input' |
              ([<selector> | <tagName> | '*' | ''] ':lang('<language>')) |
              ([<selector> | <tagName> | '*' | ''] ':last-child') |
              ([<selector> | <tagName> | '*' | ''] ':last-of-type') |
              ([<selector> | <tagName> | '*' | ''] ':last') |
              ([<selector> | <tagName> | '*' | ''] ':lt('<elementIndex>')') |
              ([<selector> | <tagName> | '*' | ''] ('['<tagName> '=' <attributeValue>']' {'['<tagName> '=' <attributeValue>']'})) |
              <selector> {<selector>}
              <daSeDovrshi>
              
<language> := <daSeDovrshi>     
<tagName> := <daSeDovrshi>
<attributeValue> := <STRING_LITERAL> | <NUMBER_LITERAL>
<attributeName> := <STRING_LITERAL>
<sign> := ('+' | '' | '-')
<elementIndex> := <sign> <NUMBER_LITERAL>
<context> := <element> | <jquery>
<readyParameter> := <daSeDovrshi>

<callbacks> := 'callbacks.' (
                    'add()' |
                    'disable()' |
                    'disabled()' |
                    'empty()' |
                    'fire()' |
                    'fired()' |
                    'fireWith()' |
                    'has()' |
                    'lock()' |
                    'locked()' |
                    'remove()' |
                )
                
<deferred> := 'deferred.' (
                    'always()' |
                    'catch()' |
                    'done()' |
                    'fail()' |
                    'isRejected()' |
                    'isResolved()' |
                    'notify()' |
                    'notifyWith()' |
                    'pipe()' |
                    'progress()' |
                    'promise()' |
                    'reject()' |
                    'rejectWith()' |
                    'resolve()' |
                    'resolveWith()' |
                    'state()' |
                    'then()'
                )
                
<event> := 'event.' (
                'currentTarget' |
                'data' |
                'delegateTarget' |
                'isDefaultPrevented()' |
                'isImmediatePropagationStopped()' |
                'isPropagationStopped()' |
                'metaKey' |
                'namespace' |
                'pageX' |
                'pageY' |
                'preventDefault()' |
                'relatedTarget' |
                'result' |
                'stopImmediatePropagation()' |
                'stopPropagation()' |
                'target' |
                'timeStamp' |
                'type' |
                'which'
            )
            
<jQueryLowLevel> := 'jQuery.' (
                'ajax()' |
                'ajaxPrefilter()' |
                'ajaxSetup()' |
                'ajaxTransport()' |
                'boxModel' |
                'browser' |
                'CallBacks()' |
                'contains()' |
                'cssHooks' |
                'cssNumber' |
                'data()' |
                'Deferred()' |
                'dequeue()' |
                'each()' |
                'error()' |
                'escapeSelector()' |
                'extend()' |
                'fn.extend()' |
                'fx.interval' |
                'fx.off' |
                'get()' |
                'getJSON()' |
                'getScript()' |
                'globalEval()' |
                'grep()' |
                'hasData()' |
                'holdReady()' |
                'htmlPrefilter()' |
                'inArray()' |
                'isArray()' |
                'isEmptyObject()' |
                'isFunction()' |
                'isNumeric()' |
                'isPlainObject()' |
                'isWindow()' |
                'isXMLDoc()' |
                'makeArray()' |
                'map()' |
                'merge()' |
                'noConflict()' |
                'noop()' |
                'now()' |
                'param()' |
                'parseHTML()' |
                'parseJSON()' |
                'parseXML()' |
                'post()' |
                'proxy()' |
                'queue()' |
                'readyException()' |
                'removeData()' |
                'speed' |
                'sub()' |
                'support' |
                'trim()' |
                'type()' |
                'unique()' |
                'uniqueSort()' |
                'when()'
            )
            
<jqueryCommand> :=  '.noConflict()' |
                    '.ready(' <readyParameter> ')' |
                    '.add()' | 
                    '.addBack()' |
                    '.addClass()' |
                    '.after()' |
                    '.ajaxComplete()' |
                    '.ajaxError()' |
                    '.ajaxSend()' |
                    '.ajaxStart()' |
                    '.ajaxStop()' |
                    '.ajaxSuccess()' |
                    '("*")' |
                    '.andSelf()' |
                    '.animate()' |
                    ':animated Selector' |
                    '.append()' |
                    '.appendTo()' |
                    '.attr()' |
                    '[name|="value"]' |
                    '[name*="value"]' |
                    '[name~="value"]' |
                    '[name$="value"]' |
                    '[name="value"]' |
                    '[name!="value"]' |
                    '[name^=value]' |
                    '.before()' |
                    '.bind()' |
                    '.blur()' |
                    ':button Selector' |
                    <callbacks> |
                    '.change()' |
                    ':checkbox Selector' |
                    ':checked Selector' |
                    '("parent" > "child")' |
                    'children()' |
                    '(".class")' |
                    '.clearQueue()' |
                    '.click()' |
                    '.clone()' |
                    '.closest()' |
                    ':contains() Selector' |
                    '.contents()' |
                    '.context' |
                    '.contextmenu()' |
                    '.css()' |
                    '.data()' |
                    'dblclick()' |
                    <deferred> |
                    '.delay()' |
                    'delegate()' |
                    'dequeue()' |
                    '("ancestor descendant")' |
                    '.detach()' |
                    '.die()' |
                    ':disabled Selector' |
                    '.each()' |
                    '("element")' |
                    '.empty()' |
                    ':empty Selector' |
                    ':enabled Selector' |
                    '.end()' |
                    '.eq()' |
                    ':eq() Selector' |
                    '.error()' |
                    ':even Selector' |
                    <event> |
                    '.fadeIn()' |
                    '.fadeOut()' |
                    '.fadeTo()' |
                    'fadeToggle()' |
                    ':file Selector' |
                    '.filter()' |
                    '.find()' |
                    '.finish()' |
                    '.first()' |
                    ':first-child Selector' |
                    ':first-of-type Selector' |
                    ':first Selector' |
                    '.focus()' |
                    ':focus Selector' |
                    '.focusin()' |
                    '.focusout()' |
                    '.get()' |
                    ':gt() Selector' |
                    '.has()' |
                    '[name] Has Attr Selector' |
                    ':has() Selector' |
                    '.hasClass()' |
                    ':header Selector' |
                    '.height()' |
                    ':hidden Selector' |
                    '.hide()' |
                    '.hover()' |
                    'html()' |
                    '("#id")' |
                    ':image Selector' |
                    '.index()' |
                    '.innerHeight()' |
                    '.innerWidth()' |
                    ':input Selector' |
                    '.insertAfter()' |
                    '.insertBefore()' |
                    '.is()' |
                    'jQuery()' |
                    '.jquery' |
                    <jQueryLowLevel> |
                    '.keydown()' |
                    '.keypress()' |
                    '.keyup()' |
                    ':lang Selector' |
                    '.last()' |
                    ':last-child Selector' |
                    ':last-of-type Selector' |
                    ':last Selector' |
                    '.length' |
                    '.live()' |
                    '.load()' |
                    '.load()' |
                    ':lt() Selector' |
                    '.map()' |
                    '.mousedown()' |
                    '.mouseenter()' |
                    '.mouseleave()' |
                    '.mousemove()' |
                    '.mouseout()' |
                    '.mouseover()' |
                    '.mouseup()' |
                    'multiple selector [name="value"][name2="value2"]' |
                    'multiple selector ("selector1, selector2, selector3")' |
                    '.next()' |
                    'next adjacent selector ("prev + next")' |
                    'Next Siblings Selector ("prev ~ siblings")' |
                    '.nextAll()' |
                    'nextUntil()' |
                    '.not()' |
                    ':not() Selector' |
                    ':nth-child Selector' |
                    ':nth-last-child() Selector' |
                    ':nth-last-of-type() Selector' |
                    ':nth-of-type() Selector' |
                    ':doo Selector' |
                    '.off()' |
                    '.offset()' |
                    '.offsetParent()' |
                    '.on()' |
                    '.net()' |
                    ':only-child Selector' |
                    ':only-of-type Selector' |
                    '.outerHeight()' |
                    '.outerWidth()' |
                    '.parent()' |
                    ':parent Selector' |
                    '.parents()' |
                    '.parentsUntil()' |
                    ':password Selector' |
                    '.position()' |
                    '.prepend()' |
                    '.prependTo()' |
                    '.prev()' |
                    '.prevAll()' |
                    '.prevUnitl()' |
                    '.promise()' |
                    '.prop()' |
                    '.pushStack()' |
                    '.queue()' |
                    ':radio Selector' |
                    '.ready()' |
                    '.remove()' |
                    '.removeAttr()' |
                    '.removeClass()' |
                    '.removeData()' |
                    '.removeProp()' |
                    '.replaceAll()' |
                    '.replaceWith()' |
                    ':reset Selector' |
                    'resize()' |
                    ':root Selector' |
                    '.scroll()' |
                    'scrollLeft()' |
                    'scrollTop()' |
                    '.select()' |
                    ':selector Selector' |
                    '.selector' |
                    '.serialize()' |
                    '.serializeArray()' |
                    '.show()' |
                    '.siblings()' |
                    '.size()' |
                    '.slice()' |
                    '.slideDown()' |
                    '.slideToggle()' |
                    '.slideUp()' |
                    '.stop()' |
                    '.submit()' |
                    ':submit Selector' |
                    ':target Selector' |
                    '.text()' |
                    ':text Selector' |
                    '.toArray()' |
                    '.toggle()' |
                    '.toggle()' |
                    '.toggleClass()' |
                    '.trigger()' |
                    '.triggerHandler()' |
                    '.unbind()' |
                    '.undelegate()' |
                    '.unload()' |
                    '.unwrap()' |
                    '.val()' |
                    ':visible Selector' |
                    '.width()' |
                    '.wrap()' |
                    '.wrapAll()' |
                    '.wrapInner()'
                    
                    
