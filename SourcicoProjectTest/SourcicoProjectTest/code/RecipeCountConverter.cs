using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;

namespace SourcicoProjectTest.code
{
    public class RecipeCountConverter: IValueConverter
    {
        ObservableCollection<Recipe> recipeList;

        public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            recipeList = (ObservableCollection<Recipe>)value;
            
            return recipeList.Count;
        }

        public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            return null;
        }
    }
}
