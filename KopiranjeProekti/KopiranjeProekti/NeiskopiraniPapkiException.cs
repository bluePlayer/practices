using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KopiranjeProekti
{
    public class NeiskopiraniPapkiException:Exception
    {
        public NeiskopiraniPapkiException()
        {
        }

        public NeiskopiraniPapkiException(string message)
            : base(message)
        {
        }

        public NeiskopiraniPapkiException(string message, Exception inner)
            : base(message, inner)
        {
        }
    }
}
