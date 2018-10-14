class ClockTimer : public Subject {
    public:
        ClockTimer();
        
        virtual int GetHour();
        virtual int GetMinute();
        virtual int GetSecond();
        
        void Tick();
        
        void ClockTimer::Tick () {
            // update internal time-keeping state
            // ...
            Notify();
        }
};
