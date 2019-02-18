using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;

namespace SourcicoProjectTest.code
{
    public class RecipeListConverter: IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            StringBuilder sb = new StringBuilder("");
            ObservableCollection<Ingredient> ingredients = (ObservableCollection<Ingredient>)value;

            if (ingredients == null)
            {
                return String.Empty;
            }

            for(int i = 0; i < 3; i += 1)
            {
                if(i < ingredients.Count)
                {
                    sb.Append(ingredients[i].Name + ", ");
                }
            }

            if (ingredients.Count > 3)
            {
                sb.Append("...");
            }

            return sb.ToString();
        }

        public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            return null;
        }
    }
}
