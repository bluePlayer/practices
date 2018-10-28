using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.DecoratorPattern
{
    public class CircleDecorator:Shape
    {
        float radius = 10.0f;

        void resize(float factor)
        {
            radius *= factor;
        }

        public string StrFunc() 
        {
            return ("A circle of radius ") + radius.ToString();
        }
    }
}
