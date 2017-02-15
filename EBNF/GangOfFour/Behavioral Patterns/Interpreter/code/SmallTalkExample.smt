match: inputState
            ^ expression2 match: (expression1 match: inputState)
            
match: inputState
            | finalState |
            finalState := alternative1 match: inputState.
            finalState addAll: (alternative2 match: inputState).
            ^ finalState

match: inputState
            | aState finalState |
            aState := inputState.
            finalState := inputState copy.
            [aState isEmpty]
                whileFalse:
                    [aState := repetition match: aState].
                    finalState addAll: aState.
                ^ finalState
                
match: inputState
            | finalState tStream |
            finalState := Set new.
            inputState
                do:
                    [:stream | tStream := stream copy.
                        (tStream nextAvailable:
                        components size
                        ) = components
                        ifTrue: [finalState add: tStream]
                    ].
                ^ finalState
                
& aNode
            ^ SequenceExpression new
                expression1: self expression2: aNode asRExp
                
repeat
            ^ RepetitionExpression new repetition: self
            | aNode
                ^ AlternationExpression new
                alternative1: self alternative2: aNode asRExp    

asRExp
            ^ self      
            
& aNode
            ^ SequenceExpression new
                expression1: self asRExp expression2: aNode asRExp    

repeat
            ^ RepetitionExpression new repetition: self
            
| aNode
            ^ AlternationExpression new
                alternative1: self asRExp alternative2: aNode asRExp
                
asRExp
            ^ LiteralExpression new components: self
