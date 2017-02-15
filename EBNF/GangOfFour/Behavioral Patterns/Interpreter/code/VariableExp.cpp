class VariableExp : public BooleanExp {
    public:
        VariableExp(const char*);
        
        virtual ~VariableExp();
        virtual bool Evaluate(Context&);
        virtual BooleanExp* Replace(const char*, BooleanExp&);
        virtual BooleanExp* Copy() const;
        
        VariableExp::VariableExp (const char* name) {
            _name = strdup(name);
        }
        
        bool VariableExp::Evaluate (Context& aContext) {
            return aContext.lookup(_name);
        }
        
        BooleanExp* VariableExp::Copy () const {
            return new VariableExp(_name);
        }
        
        BooleanExp* VariableExp::Replace (const char* name, BooleanExp& exp) {
            if (strcmp(name, _name) == 0) {
                return exp.Copy();
            } else {
                return new VariableExp(_name);
            }
        }
        
    private:
        char* _name;
    
};
