using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf
{
    class RealSubjectClass:ProxyClass, Subject
    {
        public RealSubjectClass()
        {
            base.testFunction();
        }
    }
}
