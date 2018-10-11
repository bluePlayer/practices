using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace OOPPatternsWpf.BridgePattern
{
    class RadioSwitch:IDeviceBridge
    {
        public string On()
        {
            return "The radio is playing music!";
        }

        public string Off()
        {
            return "The radio is not playing music!";
        }
    }
}
