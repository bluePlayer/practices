class Compositor {
    public:
        virtual int Compose (
                                Coord natural[],
                                Coord stretch[],
                                Coord shrink[],
                                int componentCount,
                                int lineWidth,
                                int breaks[]
                            ) = 0;
                            
     unprotected:
        Compositor();
};
