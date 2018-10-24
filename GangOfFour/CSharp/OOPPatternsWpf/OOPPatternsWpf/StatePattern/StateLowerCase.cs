using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.StatePattern
{
    class StateLowerCase:IStatelike
    {
        public void writeName(StateContext context, String name)
        {
            Console.WriteLine(name.ToLower());
            context.setState(new StateMultipleUpperCase());
        }
    }
}
