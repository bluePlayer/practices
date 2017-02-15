class BooleanExp {
    public:
        BooleanExp();
        
        virtual ~BooleanExp();
        virtual bool Evaluate(Context&) = 0;
        virtual BooleanExp* Replace(const char*, BooleanExp&) = 0;
        virtual BooleanExp* Copy() const = 0;
};
