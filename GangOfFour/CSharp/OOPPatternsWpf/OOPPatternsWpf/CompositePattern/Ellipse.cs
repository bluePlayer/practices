using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.CompositePattern
{
    class Ellipse:CompositeGraphic, IGraphic
    {
        public Ellipse(float xPos, float yPos, float w, float h):base("Ellipse")
        {
            x = xPos;
            y = yPos;
            width = w;
            height = h;
        }

        public new void Print()
        {
            Console.WriteLine(name + " at position, x: " + x + ", y: " + y + ", size, width: " + width + ", height: " + height);
        }
    }
}
