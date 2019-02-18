using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SourcicoProjectTest.code
{
    public class HourClass
    {
        public int ID { get; set; }
        public string Hour { get; set; }

        public HourClass(int ID, string Hour)
        {
            this.ID = ID;
            this.Hour = Hour;
        }
    }
}
