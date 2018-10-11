using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.AbstractFactory
{
    class OSXButton:IButton
    {
        public void Paint()
        {
            Console.WriteLine("Render a button in a Mac OS X style");
            //Render a button in a Mac OS X style
        }
    }
}
