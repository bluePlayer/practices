using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.SingletonPattern
{
    sealed class SingletonDotNet4LazyT
    {
        private static readonly Lazy<SingletonDotNet4LazyT> lazy =
        new Lazy<SingletonDotNet4LazyT>(() => new SingletonDotNet4LazyT());

        public static SingletonDotNet4LazyT Instance { get { return lazy.Value; } }

        private SingletonDotNet4LazyT()
        {
        }
    }
}
