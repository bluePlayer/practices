class Parser {
    public:
        Parser();
        
        virtual ~Parser();
        virtual void Parse(Scanner&, ProgramNodeBuilder&);
};
