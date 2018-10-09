using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ClassAdapterPattern
{
    class ClassAdaptorClient:ClassAdaptor
    {
        public ClassAdaptor ca = new ClassAdaptor();

        public void doWork()
        {
            ca.method1();
            ca.methodN();
        }
    }
}
