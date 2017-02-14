class MacroCommand: public Command {
    public:
        MacroCommand();
        
        virtual ~MacroCommand();
        virtual void Add(Command*);
        virtual void Remove(Command*);
        virtual void Execute();
        
        void MacroCommand::Add (Command* c) {
            _cmds->Append(c);
        }
        
        void MacroCommand::Remove (Command* c) {
            _cmds->Remove(c);
        }
        
        void MacroCommand::Execute () {
            ListIterator<Command*> i(_cmds);
            
            for (i.First(); !i.IsDone(); i.Next()) {
                Command* c = i.CurrentItem();
                c->Execute();
            }
        }
    
    private:
        List<Command*>* _cmds;
};
