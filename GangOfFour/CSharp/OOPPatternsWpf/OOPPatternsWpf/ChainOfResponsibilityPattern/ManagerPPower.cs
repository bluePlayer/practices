using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ChainOfResponsibilityPattern
{
    class ManagerPPower:PurchasePower
    {
        protected override double getAllowable()
        {
            return BASE * 10;
        }

        protected override String getRole()
        {
            return "Manager";
        }
    }
}
