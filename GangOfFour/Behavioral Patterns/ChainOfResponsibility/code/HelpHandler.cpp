class HelpHandler {
    public: 
        HelpHandler(HelpHandler* s) : _successor(s) {};
        
        virtual void HandleHelp();
        
        void HelpHandler::HandleHelp () {
            if (_successor) {
                _successor->HandleHelp();
            }
        };
        
        void Handler::HandleRequest (Request* theRequest) {
            switch (theRequest->GetKind()) {
                case Help:
                    // cast argument to appropriate type
                    HandleHelp((HelpRequest*) theRequest);
                break;
                
                case Print:
                    HandlePrint((PrintRequest*) theRequest);
                    // ...
                break;
                default:
                    // ...
                break;
            }
        }
        
    private:
        HelpHandler* _successor;
        
};
