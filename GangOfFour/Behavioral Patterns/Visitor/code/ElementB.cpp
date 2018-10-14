class ElementB : public Element {
    public:
        ElementB();
        
        virtual void Accept (Visitor& v) {
            v.VisitElementB(this);
        }
};
