using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.VisitorPattern
{
    class DynamicAddition: DynamicExpression
    {
        public DynamicExpression Left { get; set; }
        public DynamicExpression Right { get; set; }

        public DynamicAddition(DynamicExpression left, DynamicExpression right)
        {
            Left = left;
            Right = right;
        }
    }
}
