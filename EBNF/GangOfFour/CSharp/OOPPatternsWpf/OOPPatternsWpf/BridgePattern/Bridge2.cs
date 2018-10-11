using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.BridgePattern
{
    class Bridge2:IBridge
    {
        public void Function1()
        {
            Console.WriteLine("Bridge2.Function1");
        }

        public void Function2()
        {
            Console.WriteLine("Bridge2.Function2");
        }
    }
}
