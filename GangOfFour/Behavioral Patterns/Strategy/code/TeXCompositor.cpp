class TeXCompositor : public Compositor {
    public:
        TeXCompositor();
        
        virtual int Compose(Coord natural[], Coord stretch[], Coord shrink[], int componentCount, int lineWidth, int breaks[]);
};
