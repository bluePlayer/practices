class ArrayCompositor : public Compositor {
    public:
        ArrayCompositor(int interval);
        
        virtual int Compose(Coord natural[], Coord stretch[], Coord shrink[], int componentCount, int lineWidth, int breaks[]);
};
