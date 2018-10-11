using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.AdapterTrial3
{
    class FormatForwardSlashAdapter
    {
        public Object adapt(Object anObject)
        {
            return new ClassFormatForwardSlash((ClassA)anObject);
        }
    }
}
