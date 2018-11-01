using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.BuilderPattern
{
    public class SportsCarBuildDirector
    {
        private ICarBuilder _builder;
        public SportsCarBuildDirector(ICarBuilder builder)
        {
            _builder = builder;
        }

        public void Construct()
        {
            _builder.Colour = "Red";
            _builder.NumDoors = 2;
        }
    }
}
