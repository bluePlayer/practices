using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.FacadePattern
{
    class CarEngine
    {
        public void SetEngine(string engine)
        {
            Console.WriteLine(" CarEngine - " + engine);
        }
    }
}
