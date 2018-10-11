using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OOPPatternsWpf.FactoryMethod;

namespace OOPPatternsWpf.AdapterTrial3
{
    class AdapterFormatsFactory
    {
        public IStringFormat GetFormat(AdapterFormatsType type, ClassA a)
        {
            switch (type)
            {
                case AdapterFormatsType.ClassFormatHash:
                    return new ClassFormatHash(a);

                case AdapterFormatsType.ClassFormatForwardSlash:
                    return new ClassFormatForwardSlash(a);

                case AdapterFormatsType.ClassFormatDots:
                    return new ClassFormatDots(a);

                default:
                    throw new NotSupportedException();
            }
        }
    }
}
