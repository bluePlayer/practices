using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.MementoPattern
{
    class OriginalObject
    {
        private Memento MyMemento;

        public string String1 { get; set; }
        public string String2 { get; set; }

        public OriginalObject(string str1, string str2)
        {
            this.String1 = str1;
            this.String2 = str2;
            this.MyMemento = new Memento(str1, str2);
        }

        public void Revert()
        {
            this.String1 = this.MyMemento.string1;
            this.String2 = this.MyMemento.string2;
        }
    }
}
