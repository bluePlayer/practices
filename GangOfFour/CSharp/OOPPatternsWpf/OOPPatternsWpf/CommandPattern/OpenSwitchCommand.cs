using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.CommandPattern
{
    public class OpenSwitchCommand:ICommand
    {
        private ISwitchable _switchable;

        public OpenSwitchCommand(ISwitchable switchable)
        {
            _switchable = switchable;
        }

        public void Execute()
        {
            _switchable.PowerOn();
        }
    }
}
