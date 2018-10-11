﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.AbstractFactory
{
    class WinFactory:IGUIFactory
    {
        public IButton CreateButton()
        {
            return new WinButton();
        }
    }
}
