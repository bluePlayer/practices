using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.DecoratorPattern
{
    public interface Coffee
    {
        // Returns the cost of the coffee
        double GetCost(); 

        // Returns the ingredients of the coffee
        string GetIngredients(); 
    }
}
