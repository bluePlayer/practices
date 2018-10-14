using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OOPPatternsWpf.ObserverPattern;

namespace OOPPatternsWpf.Mediator
{
    class Mediator
    {
        public IComponent Component1 { get; set; }
        public IComponent Component2 { get; set; }

        public void ChangeState(ObserverState state)
        {
            this.Component1.SetState(state);
            this.Component2.SetState(state);
        }
    }
}
