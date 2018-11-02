using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.MementoPattern
{
    class Memento
    {
        public readonly string string1;
        public readonly string string2;

        public Memento(string str1, string str2)
        {
            this.string1 = str1;
            this.string2 = str2;
        }
    }
}
