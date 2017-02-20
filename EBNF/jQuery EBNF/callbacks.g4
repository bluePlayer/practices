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
