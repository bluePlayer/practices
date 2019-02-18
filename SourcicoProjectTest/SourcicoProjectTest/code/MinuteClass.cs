using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SourcicoProjectTest.code
{
    public class MinuteClass
    {
        public int ID { get; set; }
        public string Minute { get; set; }

        public MinuteClass(int ID, string Minute)
        {
            this.ID = ID;
            this.Minute = Minute;
        }
    }
}
