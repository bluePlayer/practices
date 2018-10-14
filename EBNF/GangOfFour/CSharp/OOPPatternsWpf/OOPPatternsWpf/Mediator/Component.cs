using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OOPPatternsWpf.ObserverPattern;

namespace OOPPatternsWpf.Mediator
{
    class Component:IComponent
    {
        protected ObserverState compState;

        public void SetState(ObserverState state)
        {
            compState = state;
        }
    }
}
