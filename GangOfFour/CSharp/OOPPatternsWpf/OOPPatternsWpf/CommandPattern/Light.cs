using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace OOPPatternsWpf.CommandPattern
{
    public class Light:ISwitchable
    {
        public TextBlock tb { get; set; }

        public Light(TextBlock tb)
        {
            this.tb = tb; 
        }

        public void PowerOn()
        {
            tb.Text = "The light is on";
            Console.WriteLine("The light is on");
        }

        public void PowerOff()
        {
            tb.Text = "The light is off";
            Console.WriteLine("The light is off");
        }
    }
}
