template <class Item> class FilteringListTraverser {
    public:
        FilteringListTraverser(List<Item>* aList);
        bool Traverse();
        
        template <class Item> void FilteringListTraverser<Item>::Traverse () {
            bool result = false;
            
            for (_iterator.First();!_iterator.IsDone();_iterator.Next() ) {
            
                if (TestItem(_iterator.CurrentItem())) {
                    result = ProcessItem(_iterator.CurrentItem());
                    
                    if (result == false) {
                        break;
                    }
                }
            }
            
            return result;
        }        
        
    protected:
        virtual bool ProcessItem(const Item&) = 0;
        virtual bool TestItem(const Item&) = 0;
        
    private:
        ListIterator<Item> _iterator;
};
