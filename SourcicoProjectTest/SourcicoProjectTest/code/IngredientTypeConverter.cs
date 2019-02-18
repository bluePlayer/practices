using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;

namespace SourcicoProjectTest.code
{
    public class IngredientTypeConverter: IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            string result = "";
            int type = System.Convert.ToInt32(value);

            switch(type)
            {
                case (int)IngredientType.LIQUID:
                    result = Constants.INGR_LIQUID;
                    break;

                case (int)IngredientType.COUNT:
                    result = Constants.INGR_COUNT;
                    break;

                case (int)IngredientType.SOLID:
                    result = Constants.INGR_SOLID;
                    break;
            }

            return result;
        }

        public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            return null;
        }
    }
}
