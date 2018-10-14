using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.BridgePattern
{
    interface IAbstractBridge
    {
        void CallMethod1();
        void CallMethod2();
    }
}
