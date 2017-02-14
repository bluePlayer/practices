class ExtendedHandler: public Handler {
    public:
        virtual void HandleRequest(Request* theRequest);
        // ...
        
        void ExtendedHandler:: HandleRequest(Request* theRequest) {
            switch (theRequest->GetKind()) {
                case Preview:
                    // handle the Preview request
                break;
                default:
                    //let Handler handle other requests
                    Handler::HandleRequest(theRequest);
            }
        }
};
