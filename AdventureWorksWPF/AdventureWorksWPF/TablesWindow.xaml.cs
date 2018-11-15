using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using AdventureWorksWPF.Code;

namespace AdventureWorksWPF
{
    /// <summary>
    /// Interaction logic for TablesWindow.xaml
    /// </summary>
    public partial class TablesWindow : Window
    {
        MainWindowMVVM mw;

        public TablesWindow()
        {
            InitializeComponent();
        }

        private void Window_Activated(object sender, EventArgs e)
        {
            
            
        }

        private void departmentsCB_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if(departmentsCB.SelectedIndex > -1)
            {
                employeedByDepCB.IsEnabled = true;
            }
        }
    }
}
