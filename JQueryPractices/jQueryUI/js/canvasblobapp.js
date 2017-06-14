/**
 * @author vlado
 */
var canvasblobapp = (function (win, jq) {'use strict';
    return {
        pageReady: function () {
            var img = new Image(),
                canvas = document.getElementById('image'),
                canvas1 = document.getElementById('illustration'),
                ctx = canvas.getContext('2d'),
                ctx1 = canvas1.getContext('2d'),
                blob = null,
                base64String = "",
                imgTag = document.createElement("img"),
                imgTag1 = document.createElement("img");

            // draw the image
            img.src = 'img/jabolche.png';

            img.onload = function () {

                canvas.width = this.width;
                canvas.height = this.height;

                ctx.drawImage(img, 0, 0);

                base64String = canvas.toDataURL("image/png", 0.92);
                imgTag.src = base64String;
                imgTag.id = "newImage";
                window.document.getElementById('result').appendChild(imgTag);

            };

            // draw the cloud illustration
            ctx1.beginPath();
            ctx1.moveTo(170, 80);
            ctx1.bezierCurveTo(130, 100, 130, 150, 230, 150);
            ctx1.bezierCurveTo(250, 180, 320, 180, 340, 150);
            ctx1.bezierCurveTo(420, 150, 420, 120, 390, 100);
            ctx1.bezierCurveTo(430, 40, 370, 30, 340, 50);
            ctx1.bezierCurveTo(320, 5, 250, 20, 250, 50);
            ctx1.bezierCurveTo(200, 5, 150, 20, 170, 80);
            ctx1.closePath();
            ctx1.lineWidth = 5;
            ctx1.fillStyle = '#8ED6FF';
            ctx1.fill();
            ctx1.strokeStyle = '#0000ff';
            ctx1.stroke();

            imgTag1.src = canvas1.toDataURL("image/png", 0.92);
            imgTag1.id = "newIllustration";
            document.getElementById('result').appendChild(imgTag1);
        }
    };
}(window, $));

$(document).ready(canvasblobapp.pageReady);
