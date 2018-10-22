using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.VisitorPattern
{
    interface IExpressionVisitor
    {
        void Visit(Literal literal);
        void Visit(Addition addition);
        void Visit(Subtraction addition);
    }
}
