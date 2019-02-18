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
    /// Interaction logic for RecipeEntryWindow.xaml
    /// </summary>
    public partial class RecipeEntryWindow : Window
    {
        public RecipeEntryMVVM mvvmObject;

        QuantityWindow qw;

        public RecipeEntryWindow()
        {
            InitializeComponent();

            mvvmObject = new RecipeEntryMVVM();
            this.DataContext = mvvmObject;
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            e.Cancel = true;
            this.Hide();
        }

        // TODO rework this part with validators
        private void saveRecipeDataBtn_Click(object sender, RoutedEventArgs e)
        {
            Recipe recipe = new Recipe();

            if (mvvmObject.recipeName.Equals(String.Empty))
            {
                MessageBox.Show(AppMessages.ADD_RECIPE_NAME_MSG, AppMessages.MSG_BOX_CAPTION, MessageBoxButton.OK, MessageBoxImage.Exclamation);
            }
            else
            {
                if(mvvmObject.recipeSource.Equals(String.Empty))
                {
                    MessageBox.Show(AppMessages.ADD_RECIPE_SOURCE_MSG, AppMessages.MSG_BOX_CAPTION, MessageBoxButton.OK, MessageBoxImage.Exclamation);
                }
                else
                {
                    if(mvvmObject.addedIngredients.Count == 0)
                    {
                        MessageBox.Show(AppMessages.ADD_INGREDIENTS_MSG, AppMessages.MSG_BOX_CAPTION, MessageBoxButton.OK, MessageBoxImage.Exclamation);
                    }
                    else
                    {
                        if(mvvmObject.prepTime == TimeSpan.Zero)
                        {
                            MessageBox.Show(AppMessages.CHOOSE_PREP_TIME_MSG, AppMessages.MSG_BOX_CAPTION, MessageBoxButton.OK, MessageBoxImage.Exclamation);
                        }
                        else
                        {
                            if(mvvmObject.prepInstructions.Equals(string.Empty))
                            {
                                MessageBox.Show(AppMessages.ADD_PREP_INSTRUCTIONS_MSG, AppMessages.MSG_BOX_CAPTION, MessageBoxButton.OK, MessageBoxImage.Exclamation);
                            }
                            else
                            {
                                recipe = new Recipe();
                                recipe.ID = mvvmObject.mainAppObject.recipesList.Count + 1;
                                recipe.name = mvvmObject.recipeName;
                                recipe.source = mvvmObject.recipeSource;

                                foreach (var item in mvvmObject.addedIngredients)
                                {
                                    recipe.ingredients.Add(item);
                                }

                                recipe.prepTime = mvvmObject.prepTime;
                                recipe.prepInstructions = mvvmObject.prepInstructions;

                                mvvmObject.mainAppObject.recipesList.Add(recipe);
                                mvvmObject.mainAppObject.PrintRecipesInConsole();
                                mvvmObject.ResetState();
                            }
                        }
                    }
                }
            }
        }

        private void addIngBtn_Click(object sender, RoutedEventArgs e)
        {
            if(ingredientsLB.SelectedItem != null)
            {
                qw = new QuantityWindow();
                qw.DataContext = mvvmObject;
                qw.ShowDialog();

                mvvmObject.chosenIngredientToAdd.quantity = mvvmObject.quantity;

                mvvmObject.addedIngredients.Add(mvvmObject.chosenIngredientToAdd);
                
                mvvmObject.ingredients.Remove(mvvmObject.chosenIngredientToAdd);
            }
        }

        private void removeIngBtn_Click(object sender, RoutedEventArgs e)
        {
            if (addedIngrediendtsLB.SelectedItem != null)
            {
                mvvmObject.ingredients.Add(mvvmObject.chosenIngredientToRemove);
                mvvmObject.addedIngredients.Remove(mvvmObject.chosenIngredientToRemove);
            }
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            recipeNameTB.Focus();
        }

        private void hoursLB_MouseUp(object sender, MouseButtonEventArgs e)
        {
            mvvmObject.prepTime = new TimeSpan(
                mvvmObject.selectedHour.ID,
                mvvmObject.prepTime.Minutes,
                0);
        }

        private void minutesLB_MouseUp(object sender, MouseButtonEventArgs e)
        {
            mvvmObject.prepTime = new TimeSpan(
                mvvmObject.prepTime.Hours,
                mvvmObject.selectedMinute.ID,
                0);
        }
    }
}
