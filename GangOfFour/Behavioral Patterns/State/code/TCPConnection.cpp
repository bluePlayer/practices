class TCPConnection {
    public:
        TCPConnection();
        
        void ActiveOpen();
        void PassiveOpen();
        void Close();
        void Send();
        void Acknowledge();
        void Syncronize();
        void ProcessOctet(TCPOctetStream*);
        
        TCPConnection::TCPConnection () {
            _state = TCPClosed::Instance();
        }
        
        void TCPConnection::ChangeState (TCPState* s) {
            _state = s;
        }
        
        void TCPConnection::ActiveOpen () {
            _state->ActiveOpen(this);
        }
        
        void TCPConnection::PassiveOpen () {
            _state->PassiveOpen(this);
        }
        
        void TCPConnection::Close () {
            _state->Close(this);
        }
        
        void TCPConnection::Acknowledge () {
            _state->Acknowledge(this);
        }
        
        void TCPConnection::Syncronize () {
            _state->Syncronize(this);
        }
    
    private:
        friend class TCPState;
        void ChangeState(TCPState*);
        TCPState* _state;
};
