using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.StrategyPattern
{
    interface IBillingStrategy
    {
        double GetActPrice(double rawPrice);
    }
}
