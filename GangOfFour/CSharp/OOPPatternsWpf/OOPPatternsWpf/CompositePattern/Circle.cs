using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.CompositePattern
{
    class Circle:Ellipse, IGraphic
    {
        public Circle(float xPos, float yPos, float wh) : base(xPos, yPos, wh, wh)
        {
            name = "Circle";
        }

        public new void Print()
        {
            Console.WriteLine(name + " at position, x: " + x + ", y: " + y + ", size: " + width);
        }
    }
}
