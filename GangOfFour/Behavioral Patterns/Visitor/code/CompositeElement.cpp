class CompositeElement : public Element {
    public:
        virtual void Accept (Visitor&);
        
        void CompositeElement::Accept (Visitor& v) {
            ListIterator<Element*> i(_children);
            
            for (i.First(); !i.IsDone(); i.Next()) {
                i.CurrentItem()->Accept(v);
            }
            
            v.VisitCompositeElement(this);
        }
        
    private:
        List<Element*>* _children;
        
};
