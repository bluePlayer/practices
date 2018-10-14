using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OOPPatternsWpf.ObserverPattern;

namespace OOPPatternsWpf
{
    class ObserverA:ObserverClass
    {
        public ObserverA()
        {
            message = "Updating Observer Subject A.";
            observerState = new ObserverState(Constants.OBSERVER_STATE_INIT_ID, Constants.OBSERVER_STATE_INIT);
        }
    }
}
