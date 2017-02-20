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
