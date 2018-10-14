using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ObserverPattern
{
    class ObserverState
    {
        public int stateID { get; set; }
        public string stateName { get; set; }

        public ObserverState(int ID, string name)
        {
            stateID = ID;
            stateName = name;
        }

        public string getStateName()
        {
            string state = "";

            switch (stateID)
            {
                case Constants.OBSERVER_STATE_INIT_ID:
                    state = Constants.OBSERVER_STATE_INIT;
                    break;

                case Constants.OBSERVER_STATE_READY_ID:
                    state = Constants.OBSERVER_STATE_READY;
                    break;

                case Constants.OBSERVER_STATE_PROCESSIND_ID:
                    state = Constants.OBSERVER_STATE_PROCESSIND;
                    break;

                case Constants.OBSERVER_STATE_DONE_ID:
                    state = Constants.OBSERVER_STATE_DONE;
                    break;
            }

            return state;
        }
    }
}
