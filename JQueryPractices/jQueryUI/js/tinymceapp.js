var tinymceapp = (function (jq, tmce) {'use strict';
    var canvas = null,
        ctx = null,
        base64String = "",
        img = null,
        blob = null;

    return {
        pageReady: function () {
            tmce.init({
                selector: '#editor',
                height: 500,
                theme: 'modern',

                plugins: [
                    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc FMathEditor'
                ],

                toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                toolbar2: 'print preview media | forecolor backcolor emoticons | codesample | FMathEditor',

                init_instance_callback : function(editor) {
                    img = new Image();
                    canvas = document.getElementById('canvas');
                    ctx = canvas.getContext('2d');

                    img.onload = function () {
                       canvas.width = this.width;
                       canvas.height = this.height;
                       ctx.drawImage(img, 0, 0);
                    };

                    img.src = 'img/math.png';

                    base64String = canvas.toDataURL('image/png', 1.0);
                    /*blob = canvas.toBlob(function (blob) {
                        var newImg = document.createElement('img'),
                        url = window.URL.createObjectURL(blob);
                        console.log(url);
                        newImg.onload = function() {
                            // no longer need to read the blob so it's revoked
                            window.URL.revokeObjectURL(url);
                        };

                        newImg.src = url;
                        //newImg.alt = "MathML (base64):" +
                        document.body.appendChild(newImg);
                        console.log(blob);
                    }, 'image/png', 1.0);*/

                    //console.log(base64String);//.substring(16, base64String.length));
                    //tmce.activeEditor.insertContent('<img alt="MathML (base64):' + base64String.substring(22, base64String.length) + '" src="' + base64String + '"/>');
                    //tmce.activeEditor.insertContent('<img alt="Blob Test" src="img/math.png" />');

                }
            });
        }
    };
}($, tinymce));

$(document).ready(tinymceapp.pageReady);
