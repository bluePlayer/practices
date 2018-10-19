using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.FacadePattern
{
    class CarModel
    {
        public void SetModel(string model)
        {
            Console.WriteLine(" CarModel - " + model);
        }
    }
}
