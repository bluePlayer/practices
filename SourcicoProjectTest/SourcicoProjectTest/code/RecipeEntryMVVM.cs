using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SourcicoProjectTest.code
{
    public class RecipeEntryMVVM:Notifier
    {
        public MainMVVM mainAppObject;

        private ObservableCollection<HourClass> _hours;
        public ObservableCollection<HourClass> hours
        {
            get
            {
                return _hours;
            }
            set
            {
                _hours = value;
                OnPropertyChanged("hours");
            }
        }

        private HourClass _selectedHour;
        public HourClass selectedHour
        {
            get
            {
                return _selectedHour;
            }
            set
            {
                _selectedHour = value;
                OnPropertyChanged("selectedHour");
            }
        }

        private ObservableCollection<MinuteClass> _minutes;
        public ObservableCollection<MinuteClass> minutes
        {
            get
            {
                return _minutes;
            }
            set
            {
                _minutes = value;
                OnPropertyChanged("minutes");
            }
        }

        private MinuteClass _selectedMinute;
        public MinuteClass selectedMinute
        {
            get
            {
                return _selectedMinute;
            }
            set
            {
                _selectedMinute = value;
                OnPropertyChanged("selectedMinute");
            }
        }

        private string _recipeName;
        public string recipeName
        {
            get
            {
                return _recipeName;
            }
            set
            {
                _recipeName = value;
                OnPropertyChanged("recipeName");
            }
        }

        private string _recipeSource;
        public string recipeSource
        {
            get
            {
                return _recipeSource;
            }
            set
            {
                _recipeSource = value;
                OnPropertyChanged("recipeSource");
            }
        }

        private TimeSpan _prepTime;
        public TimeSpan prepTime
        {
            get
            {
                return _prepTime;
            }
            set
            {
                _prepTime = value;
                OnPropertyChanged("prepTime");
            }
        }

        private string _prepInstructions;
        public string prepInstructions
        {
            get
            {
                return _prepInstructions;
            }
            set
            {
                _prepInstructions = value;
                OnPropertyChanged("prepInstructions");
            }
        }

        private List<Tuple<Ingredient, float>> _listWithQuantity;
        public List<Tuple<Ingredient, float>> listWithQuantity
        {
            get
            {
                return _listWithQuantity;
            }
            set
            {
                _listWithQuantity = value;
                OnPropertyChanged("listWithQuantity");
            }
        }

        private ObservableCollection<Ingredient> _ingredients;
        public ObservableCollection<Ingredient> ingredients
        {
            get
            {
                return _ingredients;
            }
            set
            {
                _ingredients = value;
                OnPropertyChanged("ingredients");
            }
        }

        private Ingredient _chosenIngredientToAdd;
        public Ingredient chosenIngredientToAdd
        {
            get
            {
                return _chosenIngredientToAdd;
            }
            set
            {
                _chosenIngredientToAdd = value;
                OnPropertyChanged("chosenIngredientToAdd");
            }
        }

        private ObservableCollection<Ingredient> _addedIngredients;
        public ObservableCollection<Ingredient> addedIngredients
        {
            get
            {
                return _addedIngredients;
            }
            set
            {
                _addedIngredients = value;
                OnPropertyChanged("addedIngredients");
            }
        }

        private Ingredient _chosenIngredientToRemove;
        public Ingredient chosenIngredientToRemove
        {
            get
            {
                return _chosenIngredientToRemove;
            }
            set
            {
                _chosenIngredientToRemove = value;
                OnPropertyChanged("chosenIngredientToRemove");
            }
        }

        private string _windowMessage;
        public string windowMessage
        {
            get
            {
                return _windowMessage;
            }
            set
            {
                _windowMessage = value;
                OnPropertyChanged("windowMessage");
            }
        }

        private float _quantity;
        public float quantity
        {
            get
            {
                return _quantity;
            }
            set
            {
                _quantity = value;
                OnPropertyChanged("quantity");
            }
        }

        public void ResetState()
        {
            this.recipeName = "";
            this.recipeSource = "";
            
            foreach(var item in this.addedIngredients)
            {
                this.ingredients.Add(item);
            }

            this.addedIngredients.Clear();

            this.prepTime = new TimeSpan(0, 0, 0);
            this.prepInstructions = "";
        }

        public RecipeEntryMVVM()
        {
            ingredients = new ObservableCollection<Ingredient>();

            ingredients.Add(new Ingredient((int)Ingredients.FLOUR, Constants.FLOUR_LABEL, (int)IngredientType.SOLID));
            ingredients.Add(new Ingredient((int)Ingredients.MILK, Constants.MILK_LABEL, (int)IngredientType.LIQUID));
            ingredients.Add(new Ingredient((int)Ingredients.OIL, Constants.OIL_LABEL, (int)IngredientType.LIQUID));
            ingredients.Add(new Ingredient((int)Ingredients.SALT, Constants.SALT_LABEL, (int)IngredientType.SOLID));
            ingredients.Add(new Ingredient((int)Ingredients.SUGAR, Constants.SUGAR_LABEL, (int)IngredientType.SOLID));
            ingredients.Add(new Ingredient((int)Ingredients.EGGS, Constants.EGGS_LABEL, (int)IngredientType.COUNT));
            ingredients.Add(new Ingredient((int)Ingredients.TOMATOES, Constants.TOMATOES_LABEL, (int)IngredientType.COUNT));
            ingredients.Add(new Ingredient((int)Ingredients.PEPPERS, Constants.PEPPERS_LABEL, (int)IngredientType.COUNT));
            ingredients.Add(new Ingredient((int)Ingredients.CHEESE, Constants.CHEESE_LABEL, (int)IngredientType.SOLID));
            ingredients.Add(new Ingredient((int)Ingredients.POTATOES, Constants.POTATOES_LABEL, (int)IngredientType.COUNT));
            ingredients.Add(new Ingredient((int)Ingredients.MEAT, Constants.MEAT_LABEL, (int)IngredientType.SOLID));

            addedIngredients = new ObservableCollection<Ingredient>();

            hours = new ObservableCollection<HourClass>();
            hours.Add(new HourClass(0, "Zero Hours"));
            hours.Add(new HourClass(1, "One Hour"));
            hours.Add(new HourClass(2, "Two Hours"));
            hours.Add(new HourClass(3, "Three Hours"));
            hours.Add(new HourClass(4, "Four Hours"));
            hours.Add(new HourClass(5, "Five Hours"));
            hours.Add(new HourClass(6, "Six Hours"));
            hours.Add(new HourClass(7, "Seven Hours"));
            hours.Add(new HourClass(8, "Eight Hours"));
            hours.Add(new HourClass(9, "Nine Hours"));
            hours.Add(new HourClass(10, "Ten Hours"));
            hours.Add(new HourClass(11, "Eleven Hours"));
            hours.Add(new HourClass(12, "Twelve Hours"));

            minutes = new ObservableCollection<MinuteClass>();
            
            for(int i = 0; i < 60; i += 1)
            {
                minutes.Add(new MinuteClass(i, i.ToString() + "th minute"));
            }

            ResetState();
        }
    }
}
