using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;

namespace SourcicoProjectTest.code
{
    public class PrepInstructionsConverter: IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            string[] words;
            StringBuilder result = new StringBuilder("");
            string instr = (string)value;

            if(instr.Length <= Constants.PREP_INSTRUCTIONS_LIMIT)
            {
                result.Append(instr);
            }
            else if(instr.Length > Constants.PREP_INSTRUCTIONS_LIMIT)
            {
                words = instr.Split(' ');

                foreach(string s in words)
                {
                    if(result.ToString().Length <= Constants.PREP_INSTRUCTIONS_LIMIT)
                    {
                        result.Append(s);
                        result.Append(" ");
                    }
                }

                if(instr.Length > result.Length)
                {
                    result.Append("...");
                }
            }

            return result;
        }

        public object ConvertBack(object value, Type targetType, object parameter, System.Globalization.CultureInfo culture)
        {
            return null;
        }
    }
}
