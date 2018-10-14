using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.AdapterTrial3
{
    class ClassB:IStringProvider
    {
        string data;

        public string getStringData()
        {
            return data;
        }

        public void setStringData(string d)
        {
            data = d;
        }
    }
}
