using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ObserverPattern
{
    interface IObserverWPF
    {
        string update(ObserverState state);
    }
}
