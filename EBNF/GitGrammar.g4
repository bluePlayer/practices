(* ---------------- Git Bash Shell tokens -------------- *)

<bashUser> := <STRING_LITERAL>
<computerName> : = <STRING_LITERAL>
<folderName> := <STRING_LITERAL>
<bashFolder> := '/' *<folderName>
<bashCommands> := <EBNFForBashShellCommands>

<bash> := (<bashUser> '@' <computerName> <bashFolder>) (<bashCommands> | <gitStmt>)

<noStmt> := <EMPTY_STRING>
<gitStmt> := 'git' (<noStmt> | <stmt>)

<stmt> := <switch> <gitCommand> [<args>]

<path> := <STRING_LITERAL>
<name> := <NAME_LITERAL>
<value> := <STRING_LITERAL>
<switch> := ['--version'] | 
            ['--help'] | 
            ['-C' <path>] | 
            ['-c' <name> '=' <value>] |
            ['--exec-path'['='<path>]] |
            ['--html-path'] |
            ['--man-path'] |
            ['--info-path'] |
            ['-p' | '--paginate' | '--no-pager'] |
            ['--no-replace-objects'] |
            ['--bare'] |
            ['--git-dir=' <path>] |
            ['--work-tree=' <path>] |
            ['--namespace=' <path>]

<gitCommand> := 'add' | 
                'add--interactive' |
                'am' |
                'annotate' |
                'apply' |
                'archive' |
                'bisect' |
                'bisect--helper' |
                'blame' |
                'branch' |
                'bundle' |
                'cat-file' |
                'check-attr' |
                'check-ignore' |
                'check-mailmap' |
                'check-ref-format' |
                'checkout' |
                'checkout-index' |
                'cherry' |
                'cherry-pick' |
                'clean' |
                'clone' |
                'commit' |
                'commit-tree' |
                'config' |
                'count-objects' |
                'credential' |
                'credential-cache' |
                'credential-cache--daemon' |
                'credential-store' |
                'daemon' |
                'describe' |
                'diff' |
                'diff-files' |
                'diff-index' |
                'diff-tree' |
                'difftool' |
                'difftool--helper' |
                'fast-export' |
                'fast-import' |
                'fetch' |
                'fetch-pack' |
                'filter-branch' |
                'fmt-merge-msg' |
                'for-each-ref' |
                'format-patch' |
                'fsck' |
                'fsck-objects' |
                'grep' |
                'init' |
                'log' |
                'merge' |
                'mv' |
                'pull' |
                'push' |
                'rebase' |
                'reset' |
                'rm' |
                'show' |
                'status' |
                'tag'
