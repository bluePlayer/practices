using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.BuilderPattern
{
    class PeugeotBuilder:ICarBuilder
    {
        public string Colour { get; set; }
        public int NumDoors { get; set; }

        public BP_Car GetResult()
        {
            return NumDoors == 4 ?
                new BP_Car("Peugeot", "305", Colour, NumDoors) :
                null;
        }
    }
}
