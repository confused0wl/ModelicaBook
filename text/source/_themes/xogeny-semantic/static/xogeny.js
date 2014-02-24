$(document).ready(function() {
    /* Make the thumb button open and close the TOC */
    $('#toc-sidebar').sidebar('attach events', '#thumb', 'toggle');

    var frames = [["s1", "s2"], ["b1", "b2", "b3"], ["g1"]];
    var showtime = 6000;

    var showFrame = function(n, cb) {
	console.log("Showing frame "+n);
	for(var i=0;i<frames[n].length;i++) {
	    $("#"+frames[n][i]).transition({
		animation: "fade in"
	    });
	    $("#"+frames[n][i]+"i").addClass("svis");
	}
	if (cb) { setTimeout(cb, 300); }
    };

    var hideFrame = function(n, cb) {
	console.log("Hiding frame "+n);
	for(var i=0;i<frames[n].length;i++) {
	    $("#"+frames[n][i]).transition({
		animation: "fade out",
	    });
	    $("#"+frames[n][i]+"i").removeClass("svis");
	}
	if (cb) { setTimeout(cb, 300); }
    };

    var transFrame = function(n1, n2) {
	hideFrame(n1, function() { showFrame(n2) });
    };

    var animateLogos = function() {
	console.log("show frame "+0);
	showFrame(0);
	for(var i=0;i<frames.length-1;i++) {
	    (function() {
		var j = i;
		console.log("transframe "+j+" -> "+(j+1));
		setTimeout(function () { transFrame(j, j+1); }, (j+1)*showtime);
	    })();
	}
	console.log("hide frame "+(frames.length-1));
	setTimeout(function () { hideFrame(frames.length-1, animateLogos); },
		   frames.length*showtime);
    };

    if (true) {
	/* Start animation of sponsors */
	$(".logo").transition({
	    animation: "fade"
	});
	setTimeout(animateLogos, 300);
    }

    $(".thumbnail").popup();

    var source = $("#itemplate").html();
    var it = Handlebars.compile(source);

    $(".interactive").each(function(i, elem) {
	var p = $(elem).parent();
	var was = $(p).html();
	var context = {"image": was, "id": "F0"};
	var newt = it(context) ;
	$(p).html(newt);
	$(".ui.accordion").accordion();
    });

});
