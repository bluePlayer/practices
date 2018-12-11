using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.PrototypePattern.Exercise2
{
    class PersonRecord:Record
    {
        private string m_oStrPersonName;
        private int m_ui32ID;

        public PersonRecord(string _oStrPersonName, int _ui32ID) : base()
        {
            this.m_oStrPersonName = _oStrPersonName;
            this.m_ui32ID = _ui32ID;
        }

        public PersonRecord(PersonRecord pr)
        {
            this.m_oStrPersonName = pr.m_oStrPersonName;
            this.m_ui32ID = pr.m_ui32ID;
        }

        public override Record Clone()
        {
            return new PersonRecord(this);
        }

        public override void Print()
        {
            Console.WriteLine("Person record: " + this.m_oStrPersonName + ", " + this.m_ui32ID.ToString());
        }
    }
}
