using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.PrototypePattern.Exercise2
{
    /// <summary>
    /// 
    /// </summary>
    class CarRecord:Record
    {
        private string m_oStrCarName;
        private int m_ui32ID;

        public CarRecord(string _oStrCarName, int _ui32ID):base()
        {
            this.m_oStrCarName = _oStrCarName;
            this.m_ui32ID = _ui32ID;
        }

        public CarRecord(CarRecord cr)
        {
            this.m_oStrCarName = cr.m_oStrCarName;
            this.m_ui32ID = cr.m_ui32ID;
        }

        public override Record Clone()
        {
            return new CarRecord(this);
        }

        public override void Print()
        {
            Console.WriteLine("Car record: " + this.m_oStrCarName + ", " + this.m_ui32ID.ToString());
        }
    }
}
