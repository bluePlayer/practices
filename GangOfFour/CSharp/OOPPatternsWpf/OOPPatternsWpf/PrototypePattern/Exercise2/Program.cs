using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.PrototypePattern.Exercise2
{
    class Program
    {
        static void Main(string[] args)
        {
            RecordFactory poRecordFactory = new RecordFactory();
            Record poRecord;

            poRecord = poRecordFactory.CreateRecord(RECORD_TYPE_en.CAR);
            poRecord.Print();
            //delete poRecord;

            poRecord = poRecordFactory.CreateRecord(RECORD_TYPE_en.BIKE);
            poRecord.Print();
            //delete poRecord;

            poRecord = poRecordFactory.CreateRecord(RECORD_TYPE_en.PERSON);
            poRecord.Print();
            //delete poRecord;
            //delete poRecordFactory;
        }
    }
}
