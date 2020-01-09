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
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Diagnostics;

namespace KopiranjeProekti
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        AppState appState;
        AboutWindow aboutWindow;

        public MainWindow()
        {
            InitializeComponent();

            appState = new AppState(this);
            this.DataContext = appState;

            aboutWindow = new AboutWindow();
            aboutWindow.DataContext = appState;
        }

        private void kopirajProektBtn_Click(object sender, RoutedEventArgs e)
        {
            appState.reset();
            appState.kopirajProekti();
        }

        private void ProektiCB_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if(appState.izbranProekt != null && appState.izbranProekt.ID > 0)
            {
                kopirajProektBtn.IsEnabled = true;
            }
            else
            {
                kopirajProektBtn.IsEnabled = false;
            }
        }

        private void ZaSoftverotBtn_Click(object sender, RoutedEventArgs e)
        {
            aboutWindow.Show();
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if(aboutWindow != null)
            {
                aboutWindow.Close();
            }

            App.Current.Shutdown();
        }

        private void VchitajXMLBtn_Click(object sender, RoutedEventArgs e)
        {
            appState.vchitajXML();
        }
    }
}
