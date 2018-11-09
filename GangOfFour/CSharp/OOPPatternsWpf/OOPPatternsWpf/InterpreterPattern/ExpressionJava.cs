using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.InterpreterPattern
{
    interface ExpressionJava
    {
        int interpret(IDictionary<String, ExpressionJava> variables);
    }
}
