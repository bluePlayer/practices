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
using SourcicoProjectTest.code;

namespace SourcicoProjectTest
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainMVVM mvvmObject;

        RecipeEntryWindow recipeEntryWindow;
        RecipeListWindow recipeListWindow;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            mvvmObject = new MainMVVM();
        }

        private void recipeEntryBtn_Click(object sender, RoutedEventArgs e)
        {
            if(recipeEntryWindow == null)
            {
                recipeEntryWindow = new RecipeEntryWindow();
                recipeEntryWindow.mvvmObject.mainAppObject = mvvmObject;
            }

            recipeEntryWindow.Show();
        }

        private void recipeListBtn_Click(object sender, RoutedEventArgs e)
        {
            if(recipeListWindow == null)
            {
                recipeListWindow = new RecipeListWindow();
                recipeListWindow.DataContext = mvvmObject;
            }

            recipeListWindow.Show();
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            recipeEntryWindow.Close();
            Application.Current.Shutdown();
        }
    }
}
