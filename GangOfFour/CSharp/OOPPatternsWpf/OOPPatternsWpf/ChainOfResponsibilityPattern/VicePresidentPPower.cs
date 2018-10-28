using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ChainOfResponsibilityPattern
{
    class VicePresidentPPower:PurchasePower
    {
        protected override double getAllowable()
        {
            return BASE * 40;
        }

        protected override String getRole()
        {
            return "Vice President";
        }
    }
}
