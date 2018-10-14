using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace OOPPatternsWpf.BridgePattern
{
    class DeviceSwitch:IDeviceSwitch
    {
        IDeviceSwitch lightSwitch;

        public DeviceSwitch(IDeviceSwitch sw)
        {
            lightSwitch = sw;
        }

        public string On()
        {
            return "The light is switched on!";
        }

        public string Off()
        {
            return "The light is switched off!";
        }
    }
}
