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
    sealed class SingletonNonThreadSafe
    {
        private static SingletonNonThreadSafe instance = null;

        private SingletonNonThreadSafe()
        {
        }

        public static SingletonNonThreadSafe Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new SingletonNonThreadSafe();
                }
                return instance;
            }
        }
    }
}
