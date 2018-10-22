using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.VisitorPattern
{
    class Literal: IExpression
    {
        internal double Value { get; set; }

        public Literal(double value)
        {
            this.Value = value;
        }
        public void Accept(IExpressionVisitor visitor)
        {
            visitor.Visit(this);
        }
    }
}
