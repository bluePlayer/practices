using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.FacadePattern
{
    class CarBody
    {
        public void SetBody(string body)
        {
            Console.WriteLine(" CarBody - " + body);
        }
    }
}
