
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ChainOfResponsibilityPattern
{
    class PresidentPPower:PurchasePower
    {
        protected override double getAllowable()
        {
            return BASE * 60;
        }

        protected override String getRole()
        {
            return "President";
        }
    }
}
