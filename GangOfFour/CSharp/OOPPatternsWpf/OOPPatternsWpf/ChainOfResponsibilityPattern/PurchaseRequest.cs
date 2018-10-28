using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.ChainOfResponsibilityPattern
{
    class PurchaseRequest
    {
        private double amount;
        private string purpose;

        public PurchaseRequest(double amount, String purpose)
        {
            this.amount = amount;
            this.purpose = purpose;
        }

        public double getAmount()
        {
            return this.amount;
        }

        public void setAmount(double amount)
        {
            this.amount = amount;
        }

        public String getPurpose()
        {
            return this.purpose;
        }
        public void setPurpose(String purpose)
        {
            this.purpose = purpose;
        }
    }
}
