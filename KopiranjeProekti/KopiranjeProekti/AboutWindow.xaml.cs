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

namespace KopiranjeProekti
{
    /// <summary>
    /// Interaction logic for AboutWindow.xaml
    /// </summary>
    public partial class AboutWindow : Window
    {
        AppState appState;
        UpatstvoZaKoristenjeWindow upatstvoZaKoristenjeWindow;

        public AboutWindow()
        {
            InitializeComponent();

            appState = (AppState)this.DataContext;

            upatstvoZaKoristenjeWindow = new UpatstvoZaKoristenjeWindow();
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if(upatstvoZaKoristenjeWindow != null)
            {
                upatstvoZaKoristenjeWindow.Close();
            }

            e.Cancel = true;
            this.Hide();
        }

        private void UpatsvoZaKoristenjeBtn_Click(object sender, RoutedEventArgs e)
        {
            upatstvoZaKoristenjeWindow.Show();
        }
    }
}
