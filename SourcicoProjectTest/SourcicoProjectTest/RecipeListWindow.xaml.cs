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
    /// Interaction logic for RecipeListWindow.xaml
    /// </summary>
    public partial class RecipeListWindow : Window
    {
        MainMVVM mvvmObject;

        RecipeDetailsWindow recipeDetailsWindow;
        DeleteDialogWindow deleteDialogWindow;

        public RecipeListWindow()
        {
            InitializeComponent();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            mvvmObject = (MainMVVM)this.DataContext;
            mvvmObject.PrintRecipesInConsole();
        }

        private void OpenDetailsWindow()
        {
            recipeDetailsWindow = new RecipeDetailsWindow();
            recipeDetailsWindow.DataContext = mvvmObject;
            recipeDetailsWindow.ShowDialog();
        }

        private void detailsBtn_Click(object sender, RoutedEventArgs e)
        {
            OpenDetailsWindow();
        }

        private void deleteBtn_Click(object sender, RoutedEventArgs e)
        {
            deleteDialogWindow = new DeleteDialogWindow();
            deleteDialogWindow.DataContext = mvvmObject;
            deleteDialogWindow.ShowDialog();
        }

        private void DataGrid_KeyUp(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter)
            {
                OpenDetailsWindow();
            }
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            e.Cancel = true;
            this.Hide();
        }
    }
}
