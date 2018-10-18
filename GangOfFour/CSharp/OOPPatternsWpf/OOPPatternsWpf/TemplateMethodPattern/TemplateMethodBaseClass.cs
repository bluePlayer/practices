using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.TemplateMethodPattern
{
    /// <summary>
    /// https://www.dofactory.com/net/template-method-design-pattern
    /// </summary>
    abstract class TemplateMethodBaseClass
    {
        public abstract void PrimitiveOperation1();
        public abstract void PrimitiveOperation2();

        // The "Template method"
        public void TemplateMethod()
        {
            PrimitiveOperation1();
            PrimitiveOperation2();

            Console.WriteLine("");
        }
    }
}
