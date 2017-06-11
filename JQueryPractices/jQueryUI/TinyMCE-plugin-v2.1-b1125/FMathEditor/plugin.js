var FMath_selectedElement = null;

tinymce.PluginManager.add('FMathEditor', function(editor, url) {

  editor.addButton('FMathEditor', {
    text: '',
    image : url + '/icons/FMathEditor.png',
    onclick: function() {
      // Open window
      editor.windowManager.open({
		  	title: 'FMath Editor - www.fmath.info',
		  	file : url + '/editor/onlyEditor.html',
			width : 1050,
			id: 'FMathEditorIFrame',
			height : 500,
			buttons: [{
			          text: 'Insert Equation',
			          onclick: function(){
						var frame = null;
						var frames = document.getElementsByTagName("iframe");
						for (i = 0; i < frames.length; ++i){
							var src = frames[i].src;
							if(src != null && src.indexOf('onlyEditor.html')>-1){
								frame = frames[i];
								break;
							}
						}
						var mathml = frame.contentWindow.getMathML();
						var img = frame.contentWindow.getBlobOrUrl( function(result){
							if(result.indexOf("ERROR:")==0){
								alert(result);
							}else{
								var img = result;
								tinymce.activeEditor.insertContent('<img alt="MathML (base64):'+ window.btoa(mathml) +'" src="'+img+'"/>')
								editor.windowManager.close();
							}
						});
					}
        	},{
			          text: 'Close',
			          onclick: 'close'
        	}]
		});

    },
    onPostRender: function() {
	        var ctrl = this;
	        editor.on('NodeChange', function(e) {
	            if(e.element.nodeName == 'IMG'){
					FMath_selectedElement = e.element;
				}else{
					FMath_selectedElement = null;
				}
	        });
    }

  });



});

function getMathMLToLoad(){
	if(FMath_selectedElement != null){
		var alt = FMath_selectedElement.alt;
		if(alt !=null && alt.indexOf("MathML (base64):")==0){
			var mathml = alt.substring(16, alt.length);
			return window.atob(mathml);
		}
	}
	return null;
}