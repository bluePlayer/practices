using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SourcicoProjectTest.code
{
    class IngredientList
    {
        List<Tuple<Ingredient, float>> listWithQuantity;

        private static readonly IngredientList _instance = new IngredientList();

        public static IngredientList instance
        {
            get
            {
                return _instance;
            }
        }

        private IngredientList()
        {

        }
    }
}
