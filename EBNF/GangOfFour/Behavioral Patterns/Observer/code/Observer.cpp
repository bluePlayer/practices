class Observer {
    public:
        virtual ~Observer();
        virtual void Update(Subject* theChangedSubject) = 0;
        
    protected:
        Observer();
};
