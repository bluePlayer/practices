﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.CompositePattern
{
    class Ellipse:IGraphic
    {
        public void Print()
        {
            Console.WriteLine("Ellipse");
        }
    }
}
