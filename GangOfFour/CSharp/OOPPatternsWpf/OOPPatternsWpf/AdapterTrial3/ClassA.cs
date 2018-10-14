using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.AdapterTrial3
{
    class ClassA: IStringProvider
    {
        public string getStringData()
        {
            return "ClassA getStringData()";
        }

    }
}
