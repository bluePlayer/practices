using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.PrototypePattern.Exercise2
{
    class RecordFactory
    {
        Dictionary<RECORD_TYPE_en, Record> m_oMapRecordReference;

        public RecordFactory()
        {
            m_oMapRecordReference = new Dictionary<RECORD_TYPE_en, Record>();
            m_oMapRecordReference[RECORD_TYPE_en.CAR] = new CarRecord("Ferrari", 5050);
            m_oMapRecordReference[RECORD_TYPE_en.BIKE] = new BikeRecord("Yamaha", 2525);
            m_oMapRecordReference[RECORD_TYPE_en.PERSON] = new PersonRecord("Tom", 25);
        }

        public Record CreateRecord(RECORD_TYPE_en type)
        {
            return m_oMapRecordReference[type].Clone();
        }
    }
}
