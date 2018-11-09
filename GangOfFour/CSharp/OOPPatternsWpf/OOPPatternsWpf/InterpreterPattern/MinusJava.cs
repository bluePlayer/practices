using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.InterpreterPattern
{
    class MinusJava:ExpressionJava
    {
        ExpressionJava leftOperand;
        ExpressionJava rightOperand;

        public MinusJava(ExpressionJava left, ExpressionJava right)
        {
            leftOperand = left;
            rightOperand = right;
        }

        public int interpret(IDictionary<String, ExpressionJava> variables)
        {
            return leftOperand.interpret(variables) - rightOperand.interpret(variables);
        }
    }
}
