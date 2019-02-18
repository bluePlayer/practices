using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SourcicoProjectTest.code
{
    public class Recipe
    {
        public int ID { get; set; }
        public string name { get; set; }
        public string source { get; set; }
        public ObservableCollection<Ingredient> ingredients { get; set; }
        public Ingredient selectedIngredient { get; set; }
        public TimeSpan prepTime { get; set; }
        public string prepInstructions { get; set; }

        public Recipe()
        {
            ingredients = new ObservableCollection<Ingredient>();
            ID = -1;
            name = "";
            source = "";
            selectedIngredient = null;
            prepTime = new TimeSpan();
            prepInstructions = "";
        }

        public StringBuilder GetRecipeData()
        {
            StringBuilder result = new StringBuilder("");

            result.Append("----- recipe data -----\n");
            result.Append("Recipe ID: " + this.ID.ToString() + "\n");
            result.Append("Name: " + this.name + "\n");
            result.Append("Source: " + this.source + "\n");
            result.Append("Preparation time: " + this.prepTime.ToString() + "\n");
            result.Append("Name: " + this.name + "\n");

            result.Append("----- ingredient data -----\n");

            foreach (var item in ingredients)
            {
                result.Append(item.GetIngredientData().ToString());
            }

            result.Append("Preparation time: " + this.prepInstructions + "\n");

            return result;
        }
    }
}
