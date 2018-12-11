using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.PrototypePattern.Exercise2
{
    class BikeRecord:Record
    {
        private string m_oStrBikeName;
        private int m_ui32ID;

        public BikeRecord(string _oStrBikeName, int _ui32ID) : base()
        {
            this.m_oStrBikeName = _oStrBikeName;
            this.m_ui32ID = _ui32ID;
        }

        public BikeRecord(BikeRecord br)
        {
            this.m_oStrBikeName = br.m_oStrBikeName;
            this.m_ui32ID = br.m_ui32ID;
        }

        public override Record Clone()
        {
            return new BikeRecord(this);
        }

        public override void Print()
        {
            Console.WriteLine("Bike record: " + this.m_oStrBikeName + ", " + this.m_ui32ID.ToString());
        }
    }
}
