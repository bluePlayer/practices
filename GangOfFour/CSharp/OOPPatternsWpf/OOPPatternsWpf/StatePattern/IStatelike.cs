using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.StatePattern
{
    interface IStatelike
    {
        void writeName(StateContext context, String name);
    }
}
