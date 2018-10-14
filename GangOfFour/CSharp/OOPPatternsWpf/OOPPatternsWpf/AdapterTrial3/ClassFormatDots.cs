using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OOPPatternsWpf.FactoryMethod;

namespace OOPPatternsWpf.AdapterTrial3
{
    class ClassFormatDots : FormatDots, IStringProvider
    {
        private ClassA classA = null;

        public ClassFormatDots(ClassA a)
        {
            classA = a;
        }

        public String getStringData()
        {
            return format(classA.getStringData());
        }

        private String format(String sourceValue)
        {
            // Manipulate the source string into a format required 
            // by the object needing the source object's data
            return base.getFormat(sourceValue);
        }
    }
}
