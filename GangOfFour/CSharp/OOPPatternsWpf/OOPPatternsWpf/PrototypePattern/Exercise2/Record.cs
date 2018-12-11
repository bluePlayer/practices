using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.PrototypePattern.Exercise2
{
    /// <summary>
    /// 
    /// </summary>
    abstract class Record
    {
        public Record()
        {

        }

        public abstract Record Clone();
        public abstract void Print();
    }
}
