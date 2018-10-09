using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ObjectAdapterPattern
{
    class ObjectAdapterClient:ObjectAdaptor
    {
        IAdaptee ad;

        ObjectAdaptor ac = new ObjectAdaptor();

        //public ObjectAdapterClient()
        //{
        //    ad = new ObjectAdaptor();
        //    ac = new ObjectAdaptor(ad);
        //}

        public void doWork()
        {
            //ac.adapter.methodB();
            ac.methodB();
            ac.methodA();
        }
    }
}
