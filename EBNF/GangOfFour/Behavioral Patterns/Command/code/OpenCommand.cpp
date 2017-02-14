class OpenCommand: public Command {
    public:
        OpenCommand(Application*);
        
        virtual void Execute();
        
        OpenCommand::OpenCommand (Application* a) {
            _application = a;
        }
        
        void OpenCommand::Execute () {
            const char* name = AskUser();
            
            if (name != 0) {
                Document* document = new Document(name);
                _application->Add(document);
                document->Open();
            }
        }
    
    protected:
        virtual const char* AskUser();
        
    private:
        Application* _application;
        char* _response;
};
