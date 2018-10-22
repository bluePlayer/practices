using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.InterpreterPattern
{
    class NumberOne:TerminalExpression
    {
        public NumberOne()
        {
            this.value = 1;
        }

        public override void Interpret(Context context)
        {
            Console.Write(this.value + " ");
        }
    }
}
