using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.AdapterTrial3
{
    class ClassAFormat1:IStringProvider
    {
        public ClassA classAObject;

        public ClassAFormat1(ClassA obj)
        {
            classAObject = obj;
        }

        public String getStringData()
        {
            return format(classAObject.getStringData());
        }

        private string format(string sourceValue)
        {
            // Manipulate the source string into a format required 
            // by the object needing the source object's data
            return "----------------" + sourceValue.Trim() + " ------------- ";
        }
    }
}
