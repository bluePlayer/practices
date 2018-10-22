using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.VisitorPattern
{
    class ExpressionPrinter: IExpressionVisitor
    {
        StringBuilder sb;

        public ExpressionPrinter(StringBuilder sb)
        {
            this.sb = sb;
        }

        public void Visit(Literal literal)
        {
            sb.Append(literal.Value);
        }

        public void Visit(Addition addition)
        {
            sb.Append("(");
            addition.Left.Accept(this);
            sb.Append("+");
            addition.Right.Accept(this);
            sb.Append(")");
        }

        public void Visit(Subtraction addition)
        {
            sb.Append("(");
            addition.Left.Accept(this);
            sb.Append("-");
            addition.Right.Accept(this);
            sb.Append(")");
        }
    }
}
