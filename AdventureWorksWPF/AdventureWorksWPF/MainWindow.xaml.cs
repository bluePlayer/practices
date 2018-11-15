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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace AdventureWorksWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private TablesWindow tablesWindow;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void openTablesWindowBtn_Click(object sender, RoutedEventArgs e)
        {
            tablesWindow.Show();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            tablesWindow = new TablesWindow();
            tablesWindow.DataContext = this.DataContext;
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            tablesWindow.Close();

            Application.Current.Shutdown();
        }
    }
}
