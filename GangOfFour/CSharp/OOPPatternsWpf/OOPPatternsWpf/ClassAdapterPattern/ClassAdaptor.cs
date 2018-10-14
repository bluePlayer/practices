using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ClassAdapterPattern
{
    class ClassAdaptor:IAdaptee1, IAdaptee2
    {
        //IAdaptee1 ad1 = new ClassAdaptor();
        //IAdaptee2 ad2 = new ClassAdaptor();

        public void method1()
        {
            Console.WriteLine("Executed method1()");
        }

        public void methodN()
        {
            Console.WriteLine("Executed methodN()");
        }
    }
}
