using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SourcicoProjectTest.code;

namespace SourcicoProjectTest.code
{
    public class MainMVVM: Notifier, INotifyDataErrorInfo
    {
        private readonly Dictionary<string, ICollection<string>> _validationErrors = new Dictionary<string, ICollection<string>>();

        private ObservableCollection<Recipe> _recipesList;
        public ObservableCollection<Recipe> recipesList
        {
            get
            {
                return _recipesList;
            }
            set
            {
                _recipesList = value;
                OnPropertyChanged("recipeList");
                //OnCollectionChanged(new NotifyCollectionChangedEventArgs(NotifyCollectionChangedAction.Add));
            }
        }

        private Recipe _selectedRecipe;
        public Recipe selectedRecipe
        {
            get
            {
                return _selectedRecipe;
            }
            set
            {
                _selectedRecipe = value;
                OnPropertyChanged("selectedRecipe");
            }
        }

        private string _testField;
        public string testField
        {
            get
            {
                return _testField;
            }
            set
            {
                _testField = value;
                OnPropertyChanged("testField");
            }
        }

        public string _appMessage;
        public string appMessage
        {
            get
            {
                return _appMessage;
            }
            set
            {
                _appMessage = value;
                OnPropertyChanged("appMessage");
            }
        }

        public event EventHandler<DataErrorsChangedEventArgs> ErrorsChanged;
        private void RaiseErrorsChanged(string propertyName)
        {
            if (ErrorsChanged != null)
                ErrorsChanged(this, new DataErrorsChangedEventArgs(propertyName));
        }

        public System.Collections.IEnumerable GetErrors(string propertyName)
        {
            if (string.IsNullOrEmpty(propertyName)
                || !_validationErrors.ContainsKey(propertyName))
                return null;

            return _validationErrors[propertyName];
        }

        public bool HasErrors
        {
            get { return _validationErrors.Count > 0; }
        }

        List<Tuple<Ingredient, float>> listWithQuantity;

        public void PrintRecipesInConsole()
        {
            foreach(var item in recipesList)
            {
                Console.WriteLine(item.GetRecipeData());
            }
        }

        public void DeleteRecipe()
        {
            recipesList.Remove(this.selectedRecipe);
        }

        public MainMVVM()
        {
            listWithQuantity = new List<Tuple<Ingredient, float>>();
            recipesList = new ObservableCollection<Recipe>();
        }
    }
}
