using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.InterpreterPattern
{
    class NumberTwo:TerminalExpression
    {
        public NumberTwo()
        {
            this.value = 2;
        }

        public override void Interpret(Context context)
        {
            Console.Write(this.value + " ");
        }
    }
}
