var dialog = CKEDITOR.dialog.add( 'FMathEditorDialog', function( editor ) {
    return {
        title: 'FMath Editor - www.fmath.info',
        minWidth: 1020,
        minHeight: 500,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'html',
                        html: '<iframe id="editorIFrame" style="width:1024px;height:500px" src="'+ CKEDITOR.basePath +'plugins/FMathEditor/editor/onlyEditor.html"></iframe>'
                    }
                ]
            }
        ],
        onOk: function() {
            var dialog = this;

			var mathml = document.getElementById('editorIFrame' ).contentWindow.getMathML() ;
			var img = document.getElementById('editorIFrame' ).contentWindow.getImage() ;
			//alert("img:" + window.btoa(mathml));
			//alert("img:" + window.atob(mathml));

			var selection = editor.getSelection();
			if (selection.getType() == CKEDITOR.SELECTION_ELEMENT) {
				var selElem = selection.getSelectedElement();
				if(selElem.getName() =='img'){
					selElem.data( 'cke-saved-src', img );
					selElem.setAttribute( "src", img)
            		selElem.setAttribute( "alt",  window.btoa(mathml));
					return;
				}
			}

            var imgElem = editor.document.createElement( 'img' );
            imgElem.setAttribute( "src", img)
            imgElem.setAttribute( "alt",  window.btoa(mathml));
            editor.insertElement( imgElem );
        },
        onShow: function(){
			var selection = editor.getSelection();
			if (selection.getType() == CKEDITOR.SELECTION_ELEMENT) {
				//var selectedContent = selection.getSelectedElement().$.outerHTML;
				var selElem = selection.getSelectedElement();
				if(selElem.getName() =='img'){
					var mathmlEnc = selElem.getAttribute("alt");
					if(mathmlEnc!=null){
						var mathml = window.atob(mathmlEnc);
						if(mathml.indexOf("<math")==0){
							document.getElementById('editorIFrame' ).contentWindow.setMathML(mathml);
						}
					}
				}

			}
		}
    };
});

