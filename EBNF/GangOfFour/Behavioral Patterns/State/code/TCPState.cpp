class TCPState {
    public:
        virtual void Transmit(TCPConnection*, TCPOctetStream*);
        virtual void ActiveOpen(TCPConnection*);
        virtual void PassiveOpen(TCPConnection*);
        virtual void Close(TCPConnection*);
        virtual void Syncronize(TCPConnection*);
        virtual void Acknowledge(TCPConnection*);
        virtual void Send(TCPConnection*);
        
        void TCPState::Transmit (TCPConnection*, TCPOctetStream*) {
        
        }
        
        void TCPState::ActiveOpen (TCPConnection*) {
        
        }
        
        void TCPState::PassiveOpen (TCPConnection*) {
        
        }
        
        void TCPState::Close (TCPConnection*) {
        
        }
        
        void TCPState::Syncronize (TCPConnection*) {
        
        }
        
        void TCPState::ChangeState (TCPConnection* t, TCPState* s) {
            t->ChangeState(s);
        }
        
    protected:
        void ChangeState(TCPConnection*, TCPState*);
};
