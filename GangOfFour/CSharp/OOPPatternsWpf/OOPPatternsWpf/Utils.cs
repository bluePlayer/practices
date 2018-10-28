using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OOPPatternsWpf.DecoratorPattern;

namespace OOPPatternsWpf
{
    class Utils
    {
        public static void printInfo(Coffee c)
        {
            Console.WriteLine("Cost: " + c.GetCost() + "; Ingredients: " + c.GetIngredients());
        }
    }
}
