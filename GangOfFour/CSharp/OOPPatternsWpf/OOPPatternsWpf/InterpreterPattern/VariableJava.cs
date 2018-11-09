using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.InterpreterPattern
{
    class VariableJava:ExpressionJava
    {
        private String name;

        public VariableJava(String name)
        { this.name = name; }

        public int interpret(IDictionary<String, ExpressionJava> variables)
        {
            if (null == variables[name]) return 0; // Either return new Number(0).
            return variables[name].interpret(variables);
        }
    }
}
