using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.InterpreterPattern
{
    class EvaluatorJava:ExpressionJava
    {
        private ExpressionJava syntaxTree;

        public EvaluatorJava(String ExpressionJava)
        {
            Stack<ExpressionJava> expressionStack = new Stack<ExpressionJava>();

            foreach (String token in ExpressionJava.Split(' '))
            {
                if (token.Equals("+"))
                {
                    ExpressionJava subExpression = new PlusJava(expressionStack.Pop(), expressionStack.Pop());
                    expressionStack.Push(subExpression);
                }
                else if (token.Equals("-"))
                {
                    // it's necessary to remove first the right operand from the stack
                    ExpressionJava right = expressionStack.Pop();
                    // ..and then the left one
                    ExpressionJava left = expressionStack.Pop();
                    ExpressionJava subExpression = new MinusJava(left, right);
                    expressionStack.Push(subExpression);
                }
                else
                { 
                    expressionStack.Push(new VariableJava(token));
                }
            }
            syntaxTree = expressionStack.Pop();
        }

        public int interpret(IDictionary<String, ExpressionJava> context)
        {
            return syntaxTree.interpret(context);
        }
    }
}
