using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using OOPPatternsWpf.ObserverPattern;
using OOPPatternsWpf.TemplateMethodPattern;
using OOPPatternsWpf.StrategyPattern;
using OOPPatternsWpf.IteratorPattern;
using OOPPatternsWpf.VisitorPattern;

namespace OOPPatternsWpf
{
    partial class MainWindow
    {
        private void visitorPatternBtn_Click(object sender, RoutedEventArgs e)
        {
            // emulate 1+2+3
            var expr = new Addition(
              new Addition(
                new Literal(1),
                new Literal(2)
              ),
              new Literal(3)
            );

            var expr1 = new Subtraction(
              new Subtraction(
                new Literal(1),
                new Literal(2)
              ),
              new Literal(3)
            );

            var sb = new StringBuilder();
            var expressionPrinter = new ExpressionPrinter(sb);
            expr.Accept(expressionPrinter);
            expr1.Accept(expressionPrinter);
            Console.WriteLine(sb);

            // dynamic visitior
            // TODO why it breaks on this code???
            // emulate 1+2+3
            //var expr2 = new DynamicAddition(
            //  new DynamicAddition(
            //    new DynamicLiteral(1),
            //    new DynamicLiteral(2)
            //  ),
            //  new DynamicLiteral(3)
            //);
            
            //var sb1 = new StringBuilder();
            //DynamicExpressionPrinter.Print((dynamic)e, sb);
            //Console.WriteLine(sb);
        }

        /// <summary>
        /// TODO Check if possible to add Oledb file to use with this code.
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void templateMethodPatternBtn_Click(object sender, RoutedEventArgs e)
        {
            TemplateMethodBaseClass aA = new ConcreteClassA();
            aA.TemplateMethod();

            TemplateMethodBaseClass aB = new ConcreteClassB();
            aB.TemplateMethod();
            // Wait for user

            Console.Read();

            DataAccessObject daoCategories = new Categories();
            daoCategories.Run();

            DataAccessObject daoProducts = new Products();
            daoProducts.Run();

            // Wait for user
            Console.Read();
        }

        private void observerPatternBtn_Click(object sender, RoutedEventArgs e)
        {
            statusBarTB.Text = mvvm.os.getObserversState();
        }

        private void unregisterA_Btn_Click(object sender, RoutedEventArgs e)
        {
            mvvm.os.unregisterObserver(mvvm.osA);
        }

        private void registerA_Btn_Click(object sender, RoutedEventArgs e)
        {
            mvvm.osA = new ObserverA();
            mvvm.os.registerObserver(mvvm.osA);
        }

        private void unregisterB_Btn_Click(object sender, RoutedEventArgs e)
        {
            mvvm.os.unregisterObserver(mvvm.osB);
        }

        private void registerB_Btn_Click(object sender, RoutedEventArgs e)
        {
            mvvm.osB = new ObserverB();
            mvvm.os.registerObserver(mvvm.osB);
        }

        private void unregisterC_Btn_Click(object sender, RoutedEventArgs e)
        {
            mvvm.os.unregisterObserver(mvvm.osC);
        }

        private void registerC_Btn_Click(object sender, RoutedEventArgs e)
        {
            mvvm.osC = new ObserverC();
            mvvm.os.registerObserver(mvvm.osC);
        }

        private void chooseStateCB_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            mvvm.os.subjectState = ((ObserverState)chooseStateCB.SelectedValue);
        }

        private void strategyPatternBtn_Click(object sender, RoutedEventArgs e)
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

        private void iteratorPatternBtn_Click(object sender, RoutedEventArgs e)
        {
            IEnumerable<int> primeNumbers = new List<int>();

            // print elements by traversing an IEnumerable type of class. List in this case
            primeNumbers = primeNumbers.Concat(new[] { 1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29 });
            
            foreach (int number in primeNumbers)
            {
                Console.WriteLine("IEnumerable, prime number: " + number);
            }

            // print elements by traversing an IEnumerable type of class. Array in this case
            IEnumerable<int> evenNumbers = new int[] { 0, 2, 4, 6, 8, 10, 12 };

            foreach (int number in evenNumbers)
            {
                Console.WriteLine("IEnumerable, even number: " + number);
            }

            // print elements with IEnumerator.GetEnumerator() function in an array
            IEnumerator<int> evenNumbersEnumerator = evenNumbers.GetEnumerator();

            while (evenNumbersEnumerator.MoveNext())
            {
                Console.WriteLine("IEnumerator, even number: " + evenNumbersEnumerator.Current);
            }

            // print elements with IEnumerator.GetEnumerator() function
            IEnumerator<int> primeNumbersEnumerator = primeNumbers.GetEnumerator();

            while(primeNumbersEnumerator.MoveNext())
            {
                Console.WriteLine("IEnumerator, prime number: " + primeNumbersEnumerator.Current);
            }

            // implementing IEnumerable and IEnumerator interfaces on a plain class
            Person[] peopleArray = new Person[3]
            {
                new Person("John", "Smith"),
                new Person("Jim", "Johnson"),
                new Person("Sue", "Rabon"),
            };

            People peopleList = new People(peopleArray);

            foreach (Person p in peopleList)
            {
                Console.WriteLine(p.firstName + " " + p.lastName);
            }

            // TODO add examples for IList, BindingList, ObservableCollection
        }
    }
}
