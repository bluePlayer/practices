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

namespace SourcicoProjectTest
{
    /// <summary>
    /// Interaction logic for RecipeDetailsWindow.xaml
    /// </summary>
    public partial class RecipeDetailsWindow : Window
    {
        DeleteDialogWindow deleteDialogWindow;

        public RecipeDetailsWindow()
        {
            InitializeComponent();
        }

        private void deleteRecipeBtn_Click(object sender, RoutedEventArgs e)
        {
            deleteDialogWindow = new DeleteDialogWindow();
            deleteDialogWindow.DataContext = this.DataContext;
            deleteDialogWindow.ShowDialog();
        }
    }
}
