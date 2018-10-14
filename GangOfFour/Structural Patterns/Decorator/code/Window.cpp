class Window {
    private:
        Window* window = new Window();
        TextView* textView = new TextView();
        
    public:
        void Window::SetContents(VisualComponent* contents) {
            // set window contents   
        }
        
        int main () {
            window -> SetContents(new BorderDecorator(new ScrollDecorator(textView)));
        }
};
