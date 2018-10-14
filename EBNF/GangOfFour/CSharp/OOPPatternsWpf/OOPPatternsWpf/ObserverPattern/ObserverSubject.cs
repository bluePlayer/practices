using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ObserverPattern
{
    class ObserverSubject
    {
        private ObserverState _subjectState;
        public ObserverState subjectState
        {
            get
            {
                return _subjectState;
            }
            set
            {
                _subjectState = value;
                this.notifyObservers();
            }
        }

        ObservableCollection<IObserverWPF> observers { get; set; }

        public ObserverSubject()
        {
            _subjectState = new ObserverState(Constants.OBSERVER_STATE_INIT_ID, Constants.OBSERVER_STATE_INIT);
            observers = new ObservableCollection<IObserverWPF>();
        }

        public void registerObserver(IObserverWPF obs)
        {
            observers.Add(obs);
        }

        public void unregisterObserver(IObserverWPF obsParam)
        {
            foreach (IObserverWPF obs in observers)
            {
                if (obs.GetType().Name == obsParam.GetType().Name)
                {
                    observers.Remove(obs);
                    break;
                }
            }
        }

        public void notifyObservers()
        {
            foreach (IObserverWPF obs in observers)
            {
                obs.update(_subjectState);
            }
        }

        public string getObserversState()
        {
            string message = "Current state is, subject: " + subjectState.stateName + ", ";

            foreach (ObserverClass obs in observers)
            { 
                message += "observer " + obs.GetType().Name + ": " + obs.observerState.stateName + ", ";
            }

            return message;
        }
    }
}
