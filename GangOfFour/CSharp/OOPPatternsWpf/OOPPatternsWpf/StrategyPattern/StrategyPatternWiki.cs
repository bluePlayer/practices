using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.StrategyPattern
{
    public class StrategyPatternWiki
    {
        public static void Main1(String[] args)

        {

            // Prepare strategies
            IBillingStrategy normalStrategy = new NormalStrategy();
            IBillingStrategy happyHourStrategy = new HappyHourStrategy();
            Customer firstCustomer = new Customer(normalStrategy);

            // Normal billing
            firstCustomer.Add(1.0, 1);

            // Start Happy Hour
            firstCustomer.Strategy = happyHourStrategy;
            firstCustomer.Add(1.0, 2);

            // New Customer
            Customer secondCustomer = new Customer(happyHourStrategy);
            secondCustomer.Add(0.8, 1);

            // The Customer pays
            firstCustomer.PrintBill();

            // End Happy Hour
            secondCustomer.Strategy = normalStrategy;
            secondCustomer.Add(1.3, 2);
            secondCustomer.Add(2.5, 1);
            secondCustomer.PrintBill();
        }
    }
}
