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
    /// Interaction logic for DeleteDialogWindow.xaml
    /// </summary>
    public partial class DeleteDialogWindow : Window
    {
        MainMVVM mvvmObject;

        public DeleteDialogWindow()
        {
            InitializeComponent();
        }

        private void deleteYesBtn_Click(object sender, RoutedEventArgs e)
        {
            mvvmObject = (MainMVVM)this.DataContext;
            mvvmObject.DeleteRecipe();
            this.Close();
        }

        private void deleteNoBtn_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
