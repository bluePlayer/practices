class Originator {
    public:
        Memento* CreateMemento();
        void SetMemento(const Memento*);
        // ...
        
    private:
        State* _state;
        // internal data structures
        // ...
};
