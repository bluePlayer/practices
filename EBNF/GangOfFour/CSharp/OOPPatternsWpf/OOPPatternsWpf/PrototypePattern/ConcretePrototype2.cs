using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.PrototypePattern
{
    class ConcretePrototype2:Prototype
    {
        public int proto2Field { get; set; }

        public override Prototype Clone()
        {
            return (Prototype)this.MemberwiseClone(); // Clones the concrete class.
        }
    }
}
