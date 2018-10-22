using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.InterpreterPattern
{
    // TODO how to make an Integer NonTerminal symbol
    class Integer:NonterminalExpression
    {
        public TerminalExpression sign { get; set; }
        public List<TerminalExpression> digits { get; set; }

        public Integer(TerminalExpression digit, TerminalExpression s)
        {
            sign = s;
            digits = new List<TerminalExpression>();
            digits.Add(digit);
        }
    }
}
