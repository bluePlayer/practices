using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.DecoratorPattern
{
    class SimpleWindow:DPWindow
    {
        public void draw()
        {
            // Draw window
        }

        public string GetDescription()
        {
            return "simple window";
        }
    }
}
