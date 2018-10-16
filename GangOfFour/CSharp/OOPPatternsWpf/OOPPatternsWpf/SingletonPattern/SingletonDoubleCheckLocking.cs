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
    sealed class SingletonDoubleCheckLocking
    {
        private static SingletonDoubleCheckLocking instance = null;
        private static readonly object padlock = new object();

        SingletonDoubleCheckLocking()
        {
        }

        public static SingletonDoubleCheckLocking Instance
        {
            get
            {
                if (instance == null)
                {
                    lock (padlock)
                    {
                        if (instance == null)
                        {
                            instance = new SingletonDoubleCheckLocking();
                        }
                    }
                }
                return instance;
            }
        }
    }
}
