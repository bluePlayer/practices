<jquery> := ('jQuery' | '$') <jqueryCommand>
<readyParameter> := <daSeDovrshi>
<jqueryCommand> :=  '.noConflict()' |
                    '.ready(' <readyParameter> ')'
