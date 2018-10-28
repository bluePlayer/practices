using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OOPPatternsWpf.DecoratorPattern
{
    class VerticalScrollBarDecorator:WindowDecorator
    {
        public VerticalScrollBarDecorator(DPWindow windowToBeDecorated):base(windowToBeDecorated)
        {
            this.windowToBeDecorated = windowToBeDecorated;
        }

        public new void draw()
        {
            base.draw();
            drawVerticalScrollBar();
        }

        private void drawVerticalScrollBar()
        {
            // Draw the vertical scrollbar
        }

        public new string GetDescription()
        {
            return base.GetDescription() + ", including vertical scrollbars";
        }
    }
}
