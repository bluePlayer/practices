template <class Item>

class IteratorPtr {
    public:
        IteratorPtr(Iterator<Item>* i) : _i(i) {
        
        }
        
        ~IteratorPtr () {
            delete _i;
        }
        
        Iterator<Item>* operator->() {
            return _i;
        }
        
        Iterator<Item>& operator*() {
            return * _i;
        }
        
        AbstractList<Employee*>* employees;
        //...
        IteratorPtr<Employee*> iterator(employees->CreateIterator());
        
        PrintEmployees(*iterator);
        
    private:
        // disallow copy and assignment to avoid multiple deletions of _i:
        IteratorPtr(const IteratorPtr&);
        IteratorPtr& operator = (const IteratorPtr&);
        Iterator<Item>* _i;
};
