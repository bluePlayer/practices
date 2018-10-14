class Shape {
public:
    Shape();
    virtual void BoundingBox(point& bottomLeft, point& topRight) const;
    virtual Manipulator* CreateManipulator() const;
}
