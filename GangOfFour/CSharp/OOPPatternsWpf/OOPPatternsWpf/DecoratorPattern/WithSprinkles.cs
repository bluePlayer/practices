using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.DecoratorPattern
{
    class WithSprinkles:CoffeeDecorator
    {
        public WithSprinkles(Coffee c):base(c)
        {

        }

        public override double GetCost()
        {
            return base.GetCost() + 0.2;
        }

        public override string GetIngredients()
        {
            return base.GetIngredients() + ", Sprinkles";
        }
    }
}
