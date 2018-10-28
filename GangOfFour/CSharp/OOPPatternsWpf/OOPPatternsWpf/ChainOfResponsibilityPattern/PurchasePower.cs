using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ChainOfResponsibilityPattern
{
    abstract class PurchasePower
    {
        protected static double BASE = 500;
        protected PurchasePower successor;

        abstract protected double getAllowable();
        abstract protected string getRole();

        public void setSuccessor(PurchasePower successor)
        {
            this.successor = successor;
        }

        public void processRequest(PurchaseRequest request)
        {
            if(request.getAmount() < this.getAllowable())
            {
                Console.WriteLine(this.getRole() + " will approve $" + request.getAmount());
            }
            else if(successor != null)
            {
                successor.processRequest(request);
            }
        }
    }
}
