using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace OOPPatternsWpf.BridgePattern
{
    class DeviceBridge:IDeviceBridge
    {
        public IDeviceBridge bridge;

        public DeviceBridge(IDeviceBridge bridge)
        {
            this.bridge = bridge;
        }

        public string On()
        {
            return bridge.On();
        }

        public string Off()
        {
            return bridge.Off();
        }
    }
}
