using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.BridgePattern
{
    class Bridge1:IBridge   
    {
        public void Function1()
        {
            Console.WriteLine("Bridge1.Function1");
        }

        public void Function2()
        {
            Console.WriteLine("Bridge1.Function2");
        }
    }
}
