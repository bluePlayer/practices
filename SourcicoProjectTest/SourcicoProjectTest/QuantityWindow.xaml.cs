using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using SourcicoProjectTest.code;

namespace SourcicoProjectTest
{
    /// <summary>
    /// Interaction logic for QuantityWindow.xaml
    /// </summary>
    public partial class QuantityWindow : Window
    {
        RecipeEntryMVVM mvvmObject;

        public QuantityWindow()
        {
            InitializeComponent();
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if(quantityTB.Text.Equals(string.Empty))
            {
                e.Cancel = true;
            }
        }

        private void Window_KeyUp(object sender, KeyEventArgs e)
        {
            try
            {
                statusBarTB.Text = "";

                if (quantityTB.Text.Equals(string.Empty))
                {
                    statusBarTB.Text = "Enter quanitity!";
                }
                else
                {
                    if (e.Key == Key.Enter)
                    {
                        mvvmObject.quantity = Convert.ToSingle(quantityTB.Text);
                        this.Close();
                    }
                    else
                    {
                        statusBarTB.Text = "Press Enter to confirm!";
                    }
                }
            }
            catch(FormatException fx)
            {
                statusBarTB.Text = "Enter a value with a number format: " + fx.Message;
            }
            catch(OverflowException ox)
            {
                statusBarTB.Text = "The number entered is not in the valid range: " + ox.Message;
            }
            finally
            {
                
            }
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            mvvmObject = (RecipeEntryMVVM)this.DataContext;
        }
    }
}
