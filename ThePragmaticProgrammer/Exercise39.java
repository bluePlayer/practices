public class Shape {

    public static final int SQUARE = 1;
    public static final int CIRCLE = 2;
    public static final int RIGHT_TRIANGLE = 3;
    private int shapeType;
    private double size;
    
    public Shape(int shapeType, double size) {
        this.shapeType = shapeType;
        this.size = size;
    }
    
    public double area() {
        switch (shapeType) {
            case SQUARE: return size * size;
                break;
            case CIRCLE: return Math.PI * size * size / 4.0;
                break;
            case RIGHT_TRIANGLE: return size * size / 2.0;
                break;
        }
        return 0;
    }
}

// exercise 40 -------------------------------------------------
public class Window {
    public Window(int width, int height) { ... }
    public void setSize(int width, int height) { ... }
    public boolean overlaps(Window w) { ... }
    public int getArea() { . . . }
}

// exercise 38 -------------------------------------------------
if (state == TEXAS) {
    rate = TX_RATE;
    amt = base * TX_RATE;
    calc = 2*basis(amt) + extra(amt)*1.05;   
} else if ((state == OHIO) || (state == MAINE)) {
    rate = (state == OHIO) ? OH_RATE : MN_RATE;
    amt = base * rate;
    calc = 2*basis(amt) + extra(amt)*1.05;   
}
if (state == OHIO)
    points = 2; 
} else {
    rate = 1;
    amt = base;
    calc = 2*basis(amt) + extra(amt)*1.05;  
}

switch (state) {
    case TEXAS:
        rate = TX_RATE;
        break;
    case OHIO:
        points = 2;
        rate = OH_RATE;
        break;
    case MAINE:
        rate = MN_RATE;
        break;
    default:
        rate = 1;
        amt = base;
        break;
}
amt = base * rate;
calc = 2*basis(amt) + extra(amt)*1.05;