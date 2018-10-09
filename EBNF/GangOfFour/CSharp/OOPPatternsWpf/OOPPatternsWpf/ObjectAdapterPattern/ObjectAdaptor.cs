using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ObjectAdapterPattern
{
    class ObjectAdaptor:IAdaptee
    {
        //public IAdaptee adapter;

        //public ObjectAdaptor(ObjectAdaptor oa)
        //{
        //    adapter = oa;
        //}

        public void methodB()
        {
            Console.WriteLine("Executed methodB()");
        }

        public void methodA()
        {
            Console.WriteLine("Executed MethodA()");
        }
    }
}
