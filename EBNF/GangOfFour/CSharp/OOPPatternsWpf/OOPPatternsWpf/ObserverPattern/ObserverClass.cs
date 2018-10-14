using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ObserverPattern
{
    class ObserverClass:IObserverWPF
    {
        public ObserverState observerState { get; set; }
        protected string message { get; set; }

        public ObserverClass()
        {
            message = "Updating Observer Class";
            observerState = new ObserverState(Constants.OBSERVER_STATE_INIT_ID, Constants.OBSERVER_STATE_INIT);
        }

        public string update(ObserverState state)
        {
            observerState = state;
            return message + "Current observer state is: " + observerState;
        }
    }
}
