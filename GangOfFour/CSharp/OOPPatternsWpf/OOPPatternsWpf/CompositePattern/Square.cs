using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.CompositePattern
{
    class Square:Rectangle
    {
        public Square(float xPos, float yPos, float wh):base(xPos, yPos, wh, wh)
        { 
        }

        public new void Print()
        {
            Console.WriteLine("Square at postion, x: " + x + ", y: " + y + ", size: " + width);
        }
    }
}
