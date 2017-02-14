class PasteCommand: public Command {
    public:
        PasteCommand(Document*);
        
        virtual void Execute();
        
        PasteCommand::PasteCommand (Document* doc) {
            _document = doc;
        }
        
        void PasteCommand::Execute () {
            _document->Paste();
        }
        
    private:
        Document* _document;
};
