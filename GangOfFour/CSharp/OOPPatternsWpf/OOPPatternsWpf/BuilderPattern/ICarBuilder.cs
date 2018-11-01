using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.BuilderPattern
{
    public interface ICarBuilder
    {
        string Colour { get; set; }
        int NumDoors { get; set; }

        BP_Car GetResult();
    }
}
