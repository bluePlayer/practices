using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.CommandPattern
{
    class CloseSwitchCommand : ICommand
    {
        private ISwitchable _switchable;

        public CloseSwitchCommand(ISwitchable switchable)
        {
            _switchable = switchable;
        }

        public void Execute()
        {
            _switchable.PowerOff();
        }
    }
}
