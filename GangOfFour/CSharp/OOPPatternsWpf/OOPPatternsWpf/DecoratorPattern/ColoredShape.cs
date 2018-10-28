using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.DecoratorPattern
{
    class ColoredShape: Shape
    {
        string color;
        Shape shape;

        public ColoredShape(string clr, Shape shp)
        {
            color = clr;
            shape = shp;
        }

        public string StrFunc() 
        {
            return shape.StrFunc() + " which is coloured " + color;
        }
    }
}
