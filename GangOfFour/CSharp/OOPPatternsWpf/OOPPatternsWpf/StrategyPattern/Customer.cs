using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.StrategyPattern
{
    class Customer
    {
        private IList<double> drinks;

        // Get/Set Strategy
        public IBillingStrategy Strategy { get; set; }

        public Customer(IBillingStrategy strategy)
        {
            this.drinks = new List<double>();
            this.Strategy = strategy;
        }

        public void Add(double price, int quantity)
        {
            drinks.Add(Strategy.GetActPrice(price * quantity));
        }

        // Payment of bill
        public void PrintBill()
        {
            double sum = 0;

            foreach (double i in drinks)
            {
                sum += i;
            }

            Console.WriteLine("Total due: " + sum);

            drinks.Clear();
        }
    }
}
