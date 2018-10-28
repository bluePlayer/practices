using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.DecoratorPattern
{
    class SimpleCoffee:Coffee
    {
        public double GetCost()
        {
            return 1;
        }

        public string GetIngredients()
        {
            return "Coffee";
        }
    }
}
