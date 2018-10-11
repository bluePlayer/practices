using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.PrototypePattern
{
    class ConcretePrototype1:Prototype
    {
        public int proto1Field { get; set; }

        public override Prototype Clone()
        {
            return (Prototype)this.MemberwiseClone(); // Clones the concrete class.
        }
    }
}
