class TCPEstablished : public TCPState {
    public:
        static TCPState* Instance();
        
        virtual void Transmit(TCPConnection*, TCPOctetStream*);
        virtual void Close(TCPConnection*);
        
        void TCPEstablished::Close (TCPConnection*) {
            // send FIN, receive ACK of FIN
            ChangeState(t, TCPListen::Instance());
        }
        
        void TCPEstablished::Transmit (TCPConnection* t, TCPOctetStream* o) {
            t->ProcessOctet(o);
        }
};
