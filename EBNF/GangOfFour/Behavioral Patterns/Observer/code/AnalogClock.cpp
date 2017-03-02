class AnalogClock : public Widget, public Observer {
    public:
        AnalogClock(ClockTimer*);
        
        virtual void Update(Subject*);
        virtual void Draw();
        //... 
        
        /*
         * ClockTimer* timer = new ClockTimer;
         * AnalogClock* analogClock = new AnalogClock(timer);
         * DigitalClock* digitalClock = new DigitalClock(timer);
         */
};
