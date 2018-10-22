﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.InterpreterPattern
{
    class NumberZero:TerminalExpression
    {
        public NumberZero()
        {
            this.value = 0;
        }

        public override void Interpret(Context context)
        {
            Console.Write(this.value + " ");
        }
    }
}
