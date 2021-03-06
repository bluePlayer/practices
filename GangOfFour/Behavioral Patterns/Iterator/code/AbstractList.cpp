template <class Item>

class AbstractList {
    public:
        virtual Iterator<Item>* CreateIterator() const = 0;
        // ...
        
        template <class Item>
        Iterator<Item>* List<Item>::CreateIterator () const {
            return new ListIterator<Item>(this);
        }
        
        AbstractList<Employee*>* employeesl
        //...
        Iterator<Employee*>* iterator = employees->CreateIterator();
        PrintEmployees(*iterator);
        
        delete iterator;
};
