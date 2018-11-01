using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.CommandPattern
{
    public class Light:ISwitchable
    {
        public void PowerOn()
        {
            Console.WriteLine("The light is on");
        }

        public void PowerOff()
        {
            Console.WriteLine("The light is off");
        }
    }
}
