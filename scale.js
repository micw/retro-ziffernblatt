(function() {
    var s = Snap("#canvas");
    s.attr({ viewBox: "0 0 1700 1700" });
    var bigCircle = s.circle(850, 850, 800);
    bigCircle.attr({
        fill: "none",
        stroke: "#888",
        strokeWidth: 0.1
    });

    {
    // obere skala
        var ox=850;
        var oy=850;
        var or=540;

        var smallUnit="15mm";
        var bigUnit="20mm";

        var text=s.text(ox,ox-200,"°C").attr({
            fontSize: "3cm",
            textAnchor: "middle",
            stroke: "#000",
        });

        s.circle(ox, oy, 30);
        //drawPieSector(s,{x:ox,y:oy},or-5,or,158,224);
        drawPieSector(s,{x:ox,y:oy},or-5,or,178,56,{fill:"#00F"});
        drawPieSector(s,{x:ox,y:oy},or-5,or,234,128);

        drawMarker(s,ox,oy,or,-90,5,50,"-20",bigUnit,true);
        drawMarker(s,ox,oy,or,-81,5,30,"",smallUnit,true); // -15, ommit label
        drawMarker(s,ox,oy,or,-72,5,50,"-10",bigUnit,true);
        drawMarker(s,ox,oy,or,-54,5,30,"-5",smallUnit,true);
        drawMarker(s,ox,oy,or,-36,5,50,"0",bigUnit);
        drawMarker(s,ox,oy,or,-18,5,30,"5",smallUnit);
        drawMarker(s,ox,oy,or,0,5,50,"10",bigUnit);
        drawMarker(s,ox,oy,or,18,5,30,"15",smallUnit);
        drawMarker(s,ox,oy,or,36,5,50,"20",bigUnit);
        drawMarker(s,ox,oy,or,54,5,30,"25",smallUnit);
        drawMarker(s,ox,oy,or,72,5,50,"30",bigUnit);
        drawMarker(s,ox,oy,or,81,5,30,"",smallUnit); // 35, ommit label
        drawMarker(s,ox,oy,or,90,5,50,"40",bigUnit);

        drawShortMarkers(s,ox,oy,or,-90,-72,10,true);
        drawShortMarkers(s,ox,oy,or,-72,-36,10,true);
        drawShortMarkers(s,ox,oy,or,-36,72,30);
        drawShortMarkers(s,ox,oy,or,72,90,10);

        var text=s.text(610,0,"Außen").attr({
            fontSize: "1.5cm",
            textAnchor: "middle",
            stroke: "#000",
            'textpath':createArc(s,{x:ox,y:oy},or-120,188,164,{fill:"#00F"})
        });

    }

    { // untere skala
        var ux=850;
        var uy=850+650;
        var ur=450;

        s.circle(ux, uy, 30);

        var path=drawPieSector(s,{x:ux,y:uy},ur-5,ur,208,124);
        drawMarker(s,ux,uy,ur,-60,5,50,"10",smallUnit);
        drawMarker(s,ux,uy,ur,-50,5,30);
        drawMarker(s,ux,uy,ur,-40,5,50,"20",smallUnit);
        drawMarker(s,ux,uy,ur,0,5,30,"25",smallUnit);
        drawMarker(s,ux,uy,ur,40,5,50,"30",smallUnit);
        drawMarker(s,ux,uy,ur,50,5,30);
        drawMarker(s,ux,uy,ur,60,5,50,"40",smallUnit);
        drawShortMarkers(s,ux,uy,ur,-60,-40,10);
        drawShortMarkers(s,ux,uy,ur,-40,40,10);
        drawShortMarkers(s,ux,uy,ur,40,60,10);

        var text=s.text(470,0,"Pool").attr({
            fontSize: "1.5cm",
            textAnchor: "middle",
            stroke: "#000",
            'textpath':createArc(s,{x:ux,y:uy},ur-120,188,164,{fill:"#00F"})
        });

    }

    
 })();

 function drawShortMarkers(s,centerX, centerY, radius, degreeStart, degreeEnd, count, blue) {
     var delta=(degreeEnd-degreeStart)/count;
     for (var i=1;i<count;i++) { // ommit first/last short marker
        drawMarker(s,centerX, centerY, radius, degreeStart+i*delta, 2,15,null,null,blue);
     }
 }

 function drawMarker(s,centerX, centerY, radius, degree, width, length, label, fontSize, blue) {
    // to rotate the line alng the arc, we need to translate it to the center point of the arc
    var el=s.line(0,-radius+1,0,-radius-length).attr({
        stroke: blue?"#00F":"#000",
        strokeWidth: width,
    });

    if (label) {
        var text=s.text(0,-radius-length-20,label).attr({
            fontSize: fontSize,
            textAnchor: "middle",
            fill: blue?"#00F":"#000",
            stroke: blue?"#00F":"#000",
            fontWeight: "bold",
        });

        el=s.group(el,text);
    }

    
    el.transform(
        new Snap.Matrix()
            .translate(centerX,centerY)
            .rotate(degree)
        );

 }

 // https://gist.github.com/leefsmp/f721678ee443f1031a74
 function createArc(snap, centre,
    r, startDeg, delta, attr) {
    var start = {
    x: centre.x + r * Math.cos(Math.PI*(startDeg)/180),
    y: centre.y + r * Math.sin(Math.PI*(startDeg)/180)
    };
    
    var end = {
    x: centre.x + r * Math.cos(Math.PI*(startDeg + delta)/180),
    y: centre.y + r * Math.sin(Math.PI*(startDeg + delta)/180)
    };
    
    var largeArc = delta > 180 ? 1 : 0;
    
    var path = "M" + start.x + "," + start.y +
        " A" + r + "," + r + " 0 " +
        largeArc + ",1 " + end.x + "," + end.y;

    //snap.path(path).attr({stroke:"#888"});

    return path;
}

 function drawPieSector(snap, centre,
    rIn, rOut, startDeg, delta, attr) {

    var startOut = {
    x: centre.x + rOut * Math.cos(Math.PI*(startDeg)/180),
    y: centre.y + rOut * Math.sin(Math.PI*(startDeg)/180)
    };
    
    var endOut = {
    x: centre.x + rOut * Math.cos(Math.PI*(startDeg + delta)/180),
    y: centre.y + rOut * Math.sin(Math.PI*(startDeg + delta)/180)
    };
    
    var startIn = {
    x: centre.x + rIn * Math.cos(Math.PI*(startDeg + delta)/180),
    y: centre.y + rIn * Math.sin(Math.PI*(startDeg + delta)/180)
    };
    
    var endIn = {
    x: centre.x + rIn * Math.cos(Math.PI*(startDeg)/180),
    y: centre.y + rIn * Math.sin(Math.PI*(startDeg)/180)
    };
    
    var largeArc = delta > 180 ? 1 : 0;
    
    var path = "M" + startOut.x + "," + startOut.y +
    " A" + rOut + "," + rOut + " 0 " +
    largeArc + ",1 " + endOut.x + "," + endOut.y +
    " L" + startIn.x + "," + startIn.y +
    " A" + rIn + "," + rIn + " 0 " +
    largeArc + ",0 " + endIn.x + "," + endIn.y +
    " L" + startOut.x + "," + startOut.y + " Z";
        
    var path = snap.path(path);

    path.attr(attr);

    return path;
}
