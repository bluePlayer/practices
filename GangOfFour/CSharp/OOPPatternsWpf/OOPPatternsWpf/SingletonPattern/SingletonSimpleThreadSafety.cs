using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.SingletonPattern
{
    /// <summary>
    /// http://csharpindepth.com/Articles/General/Singleton.aspx
    /// </summary>
    sealed class SingletonSimpleThreadSafety
    {
        private static SingletonSimpleThreadSafety instance = null;
        private static readonly object padlock = new object();

        SingletonSimpleThreadSafety()
        {
        }

        public static SingletonSimpleThreadSafety Instance
        {
            get
            {
                lock (padlock)
                {
                    if (instance == null)
                    {
                        instance = new SingletonSimpleThreadSafety();
                    }
                    return instance;
                }
            }
        }
    }
}
