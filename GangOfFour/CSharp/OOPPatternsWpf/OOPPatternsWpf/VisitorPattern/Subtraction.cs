using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.VisitorPattern
{
    class Subtraction: IExpression
    {
        internal IExpression Left { get; set; }
        internal IExpression Right { get; set; }

        public Subtraction(IExpression left, IExpression right)
        {
            this.Left = left;
            this.Right = right;
        }

        public void Accept(IExpressionVisitor visitor)
        {
            visitor.Visit(this);
        }
    }
}
