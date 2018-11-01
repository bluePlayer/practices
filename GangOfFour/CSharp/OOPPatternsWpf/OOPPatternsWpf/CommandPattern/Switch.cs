using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.CommandPattern
{
    public class Switch
    {
        ICommand _closedCommand;
        ICommand _openedCommand;

        public Switch(ICommand closedCommand, ICommand openedCommand)
        {
            this._closedCommand = closedCommand;
            this._openedCommand = openedCommand;
        }

        // Close the circuit / power on
        public void Close()
        {
            this._closedCommand.Execute();
        }

        // Open the circuit / power off
        public void Open()
        {
            this._openedCommand.Execute();
        }
    }
}
