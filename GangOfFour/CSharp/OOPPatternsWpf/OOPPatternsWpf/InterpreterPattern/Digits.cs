using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.InterpreterPattern
{
    class Digits:NonterminalExpression
    {
        public List<TerminalExpression> digits { get; set; }

        public Digits()
        {
            digits = new List<TerminalExpression>();

            digits.Add(new NumberZero());
            digits.Add(new NumberOne());
            digits.Add(new NumberTwo());
        }

        public override void Interpret(Context context)
        {
            Console.Write("Digits: ");

            foreach (TerminalExpression te in digits)
            {
                Console.Write(te.value + " ");
            }
            
        }
    }
}
