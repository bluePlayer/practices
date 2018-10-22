using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.VisitorPattern
{
    interface IExpression
    {
        void Accept(IExpressionVisitor visitor);
    }
}
