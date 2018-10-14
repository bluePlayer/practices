using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.AbstractFactory
{
    class OSXFactory:IGUIFactory
    {
        public IButton CreateButton()
        {
            return new OSXButton();
        }
    }
}
