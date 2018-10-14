template <class Item>

class ListIterator : public Iterator<Item> {
    public:
        ListIterator(const List<Item>* aList);
        
        virtual void First();
        virtual void Next();
        virtual bool IsDone() const;
        virtual Item CurrentItem() const;
        
        template<class Item>
        ListIterator<Item>::ListIterator (const List<Item>* aList) : _list(aList), _current(0) {
        
        }
        
        template <class Item>
        void ListIterator<Item>::First () {
            _current = 0;
        }
        
        template <class Item>
        void ListIterator<Item>::Next () {
            _current++;
        }
        
        template <class Item>
        bool ListIterator<Item>::IsDone () const {
            return _current >= _list -> Count();
        }
        
        template <class Item>
        Item ListIterator<Item>::CurrentItem () const {
            if (IsDone()) {
                throw IteratorOutOfBounds;
            }
            
            return _list->Get(_current);
        }
        
        void PrintEmployees (Iterator<Employee*>& i) {
            for (i.First(); !i.IsDone(); i.Next()) {
                i.CurrentItem()->Print();
            }
        }
        
        List<Employee*>* employees;
        //...
        ListIterator<Employee*> forward(employees);
        ReverseListIterator<Employee*> backward(employees);
        PrintEmployees(forward);
        PrintEmployees(backward);
        
        SkipList<Employee*>* employees;
        //...
        SkipListIterator<Employee*> iterator(employees);
        PrintEmployees(iterator);
        
    private:
        const List<Item>* _list;
        long _current;
};
