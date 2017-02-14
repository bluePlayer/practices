class Command {
    public:
        virtual ~Command();
        virtual void Execute() = 0;
        
    protected:
        Command();
};
