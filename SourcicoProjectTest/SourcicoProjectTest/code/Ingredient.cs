using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SourcicoProjectTest.code
{
    public class Ingredient
    {
        public int ingredientID { get; set; }
        public string Name { get; set; }
        public int ingredientType { get; set; }
        public string ingredientTypeLabel { get; set; }
        public float quantity { get; set; }

        public StringBuilder GetIngredientData()
        {
            StringBuilder result = new StringBuilder("");

            result.Append("Ingredient ID: " + this.ingredientID.ToString() + "\n");
            result.Append("Name: " + this.Name + "\n");
            result.Append("Ingredient type: " + this.ingredientType.ToString() + "\n");
            result.Append("Ingredient type label: " + this.ingredientTypeLabel + "\n");
            result.Append("Ingredient quantity: " + this.quantity.ToString() + "\n");

            return result;
        }

        public Ingredient(int ingredientID, string Name, int ingredientType, float quantity = 0f)
        {
            this.ingredientID = ingredientID;
            this.Name = Name;
            this.ingredientType = ingredientType;

            if(this.ingredientType == (int)IngredientType.LIQUID)
            {
                this.ingredientTypeLabel = "mililitres";
            }
            else if(this.ingredientType == (int)IngredientType.SOLID)
            {
                this.ingredientTypeLabel = "grams";
            }
            else if (this.ingredientType == (int)IngredientType.COUNT)
            {
                this.ingredientTypeLabel = "";
            }

            this.quantity = quantity;
        }
    }
}
