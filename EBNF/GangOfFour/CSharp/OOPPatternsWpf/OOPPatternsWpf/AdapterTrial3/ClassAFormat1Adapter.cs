using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.AdapterTrial3
{
    class ClassAFormat1Adapter
    {
        public Object adapt(Object anObject)
        {
            return new ClassAFormat1((ClassA)anObject);
        }
    }
}
