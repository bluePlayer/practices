using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace OOPPatternsWpf.BridgePattern
{
    class LightSwitch:IDeviceBridge
    {
        public string On()
        {
            return "Light is switched on!";
        }

        public string Off()
        {
            return "Light is switched off!";
        }
    }
}
