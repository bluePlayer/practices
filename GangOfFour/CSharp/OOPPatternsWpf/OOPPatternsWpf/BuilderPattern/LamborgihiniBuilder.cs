using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.BuilderPattern
{
    public class LamborgihiniBuilder:ICarBuilder
    {
        public string Colour { get; set; }
        public int NumDoors { get; set; }

        public BP_Car GetResult()
        {
            return NumDoors == 2 ? 
                new BP_Car("Lamborgihini", "Gallardo", Colour, NumDoors) :
                new BP_Car("Lamborgihini", "Urus", Colour, NumDoors);
        }
    }
}
