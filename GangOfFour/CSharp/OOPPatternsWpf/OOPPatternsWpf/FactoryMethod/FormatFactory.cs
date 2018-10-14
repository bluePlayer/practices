using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.FactoryMethod
{
    class FormatFactory
    {
        public IStringFormat GetFormat(FormatsType type)
        {
            switch (type)
            {
                case FormatsType.FormatHash:
                    return new FormatHash();

                case FormatsType.FormatForwardSlash:
                    return new FormatForwardSlash();

                case FormatsType.FormatDots:
                    return new FormatDots();

                default:
                    throw new NotSupportedException();
            }
        }
    }
}
