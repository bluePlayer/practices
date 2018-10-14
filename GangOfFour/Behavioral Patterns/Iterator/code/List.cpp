template <class Item>

class List {
    public:
        List(long size = DEFAULT_LIST_CAPACITY);
        long Count() const;
        Item& Get(long index) const;
        //...
};
