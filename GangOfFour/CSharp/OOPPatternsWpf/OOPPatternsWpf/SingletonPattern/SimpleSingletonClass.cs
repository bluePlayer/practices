using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.SingletonPattern
{
    /// <summary>
    /// http://csharpindepth.com/Articles/General/Singleton.aspx
    /// This is actually thread safe singleton without using locks
    /// </summary>
    sealed class SimpleSingletonClass
    {
        private static readonly SimpleSingletonClass _instance = new SimpleSingletonClass();

        public static SimpleSingletonClass instance
        {
            get
            {
                return _instance;
            }
        }

        private SimpleSingletonClass()
        {

        }
    }
}
