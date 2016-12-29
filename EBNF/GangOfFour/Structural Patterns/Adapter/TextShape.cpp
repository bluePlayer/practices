class TextShape: public Shape, private TextView {
    public:
        TextShape::TextShape(TextView* t) {
            _text = t;
        };
        virtual void BoundingBox (Point& bottomLeft, Point& topRight) const;
        bool isEmpty() const {
            return _text->isEmpty();
        };
        Manipulator* CreateManipulator() const {
            return new TextManipulator(this);
        };
        
        void TextShape::BoundingBox (Point& bottomLeft, Point& topRight) const {
            Coord bottom, left, width, height;
            
            _text->GetOrigin(bottom, left);
            _text->GetExtent(width, height);
            
            bottomLeft = Point(bottom, left);
            topRight = Point(bottom + height, left + width);
        };
    private:
        TextView* _text;
}
