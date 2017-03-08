class Element {
    public:
        virtual ~Element();
        virtual void Accept(Visitor&) = 0;
        
    protected:
        Element();
};
