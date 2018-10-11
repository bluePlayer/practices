using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace OOPPatternsWpf.BridgePattern
{
    class TVSwitch:IDeviceBridge
    {
        public string On()
        {
            return "The TV is truned on!";
        }

        public string Off()
        {
            return "The TV is turned off!";
        }
    }
}
