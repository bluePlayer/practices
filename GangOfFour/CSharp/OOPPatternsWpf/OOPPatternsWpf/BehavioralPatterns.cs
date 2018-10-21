using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using OOPPatternsWpf.ObserverPattern;
using OOPPatternsWpf.TemplateMethodPattern;
using OOPPatternsWpf.StrategyPattern;

namespace OOPPatternsWpf
{
    partial class MainWindow
    {
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
    }
}
