using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.InterpreterPattern
{
    class NumberJava:ExpressionJava
    {
        private int number;

        public NumberJava(int number)
        { this.number = number; }

        public int interpret(IDictionary<String, ExpressionJava> variables)
        { return number; }
    }
}
