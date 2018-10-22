using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.VisitorPattern
{
    class DynamicExpressionPrinter
    {
        public static void Print(Literal literal, StringBuilder sb)
        {
            sb.Append(literal.Value);
        }

        public static void Print(Addition addition, StringBuilder sb)
        {
            sb.Append("(");
            Print((dynamic)addition.Left, sb);
            sb.Append("+");
            Print((dynamic)addition.Right, sb);
            sb.Append(")");
        }
    }
}
