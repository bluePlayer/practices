using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.VisitorPattern
{
    class DynamicLiteral: DynamicExpression
    {
        public double Value { get; set; }

        public DynamicLiteral(double value)
        {
            this.Value = value;
        }
    }
}
