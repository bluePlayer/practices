using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.FactoryMethod
{
    class FormatDots:IStringFormat
    {
        public string getFormat(string text)
        {
            return "..... " + text + " .....";
        }
    }
}
