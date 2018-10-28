using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.DecoratorPattern
{
    class CoffeeDecorator:Coffee
    {
        protected Coffee decoratedCoffee;

        public CoffeeDecorator(Coffee c)
        {
            this.decoratedCoffee = c;
        }

        public virtual double GetCost()
        {
            return decoratedCoffee.GetCost();
        }

        public virtual string GetIngredients()
        {
            return decoratedCoffee.GetIngredients();
        }
    }
}
