using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OOPPatternsWpf.ObserverPattern;

namespace OOPPatternsWpf
{
    class OOPPatternsMainWindowMVVM
    {
        public List<ObserverState> osStates;
        public ISubject subject;
        public ObserverSubject os;
        public ObserverA osA;
        public ObserverB osB;
        public ObserverC osC;
    }
}
