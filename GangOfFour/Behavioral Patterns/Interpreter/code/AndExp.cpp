class AndExp : public BooleanExp {
    public:
        AndExp(BooleanExp*, BooleanExp*);
        
        virtual ~AndExp();
        virtual bool Evaluate(Context&);
        virtual BooleanExp* Replace(const char*, BooleanExp&);
        virtual BooleanExp* Copy() const;
        
        AndExp::AndExp (BooleanExp* op1, BooleanExp op2) {
            _operand1 = op1;
            _operand2 = op2;
        }
        
        bool AndExp::Evaluate (Context& aContext) {
            return _operand1->Evaluate(aContext) && _operand2->Evaluate(aContext);
        }
        
        BooleanExp* AndExp::Copy () const {
            return new AndExp(_operand1->Copy(), _operand2->Copy());
        }
        
        BooleanExp* AndExp::Replace (const char* name, BooleanExp& exp) {
            return new AndExp(_operand1->Replace(name, exp), _operand2->Replace(name, exp));
        }
        
    private:
        BooleanExp* _operand1;
        BooleanExp* _operand2;
};
