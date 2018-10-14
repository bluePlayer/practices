using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ObserverPattern
{
    class ObserverC: ObserverClass
    {
        public ObserverC()
        {
            message = "Updating Observer Subject C";
            observerState = new ObserverState(Constants.OBSERVER_STATE_INIT_ID, Constants.OBSERVER_STATE_INIT);
        }
    }
}
