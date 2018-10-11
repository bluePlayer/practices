using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf
{
    class RealSubjectClass:ProxyClass, ISubject
    {
        public RealSubjectClass()
        {
            base.testFunction();
        }
    }
}
