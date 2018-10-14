using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OOPPatternsWpf.ObserverPattern;

namespace OOPPatternsWpf.Mediator
{
    interface IComponent
    {
        void SetState(ObserverState state);
    }
}
