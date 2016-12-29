class ApplicationWindow: public Window {
    public:
        virtual void DrawContents();
        void ApplicationWindow::DrawContents() {
            GetView->DrawOn(this);
        }
}
