using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ChainOfResponsibilityPattern
{
    class DirectorPPower:PurchasePower
    {
        protected override double getAllowable()
        {
            return BASE * 20;
        }

        protected override String getRole()
        {
            return "Director";
        }
    }
}
