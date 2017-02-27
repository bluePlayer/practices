template <class Item> class Collection {
    public:
        Collection();
        IterationState* CreateInitialState();
        void Next(IterationState*);
        bool IsDone(const IterationState*) const;
        Item Currentitem(const IterationState*) const;
        IterationState* Copy(const IterationState*) const;
        void Append(const Item&);
        void Remove(const Item&);
        //...
        Collection<ItemType*> aCollection;
        IterationState* state;
        start = aCollection.CreateInitialState();
        
        while (!aCollection.IsDone(state)) {
            aCollection.Currentitem(state)->Process();
            aCollection.Next(state);
        }
        
        delete state;
};
