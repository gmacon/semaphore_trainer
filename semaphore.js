function check_all() {
	$("#letters input[type=checkbox]").each(function(){$(this).attr('checked', true)});
}
function uncheck_all() {
	$("#letters input[type=checkbox]").each(function(){$(this).attr('checked', false)});
}

function validate_number() {
	if(isNaN($(this).val())) {
		$(this).addClass("invalid");
	}
	else {
		$(this).removeClass("invalid");
	}
	$(this).data('numVal', Number($(this).val()));
}

function status(msg, cls, timer) {
	var id = $("html").data("statustimeout");
	if( id !== null ) {
		window.clearTimeout(id);
	}
	$("#status").text(msg).attr("class", cls);
	if(timer) {
		$("html").data("statustimeout", window.setTimeout(normalstatus, 5000));
	}
}

function normalstatus() {
	$("html").data("statustimeout", null);
	$("#status").text("Ready").attr("class", "");
}

function display_letter(letter) {
	var myLetter = letter.toLowerCase();
	if( myLetter == " " ) { myLetter = "sp"; }
	$("#sender").attr('src', $("html").data("frontback") + "/" + myLetter + ".png");
}

function switchrandom() {
	if($("#random").attr("checked")) {
		$("#letters").css("visibility", "visible");
		$("#message").val("");
		$("#message").attr("readonly", true);
	} else {
		$("#letters").css("visibility", "hidden");
		$("#message").val("");
		$("#message").attr("readonly", false);
	}
	stop();
}

function switchfrontback() {
	if($("#back").attr("checked")) {
		$("html").data("frontback", "back");
	} else {
		$("html").data("frontback", "front");
	}
	display_letter(' ');
}

function play() {
	var t;
	$("html").data("state", "play");
	$("#main :input").each(function(){$(this).attr('disabled', true)});
	$("#stop, #pause").attr('disabled', false);
	$("#message").attr('disabled', true);
	t = $("#lettertime").data("numVal");
	if(isNaN(t)) {
		stop();
		status("The letter duration is invalid.", "error", true);
		return;
	}
	$("html").data("lettertime", t * 1000);
	t = $("#spacetime").data("numVal");
	if(isNaN(t)) {
		stop();
		status("The space duration is invalid.", "error", true);
		return;
	}
	$("html").data("spacetime", t * 1000);
	if($("#autohide").attr("checked")) {
		$("#message").css("visibility", "hidden");
	}
	if($("#random").attr("checked")) {
		start_random();
	} else {
		start_message();
	}
}
function pause() {
	window.clearTimeout($('html').data("timeout"));
	display_letter(' ');
	$("html").data("state", "pause");
	$("#letters :input").each(function(){$(this).attr('disabled', false)});
	$("#main :input").each(function(){$(this).attr('disabled', false)});
	$("#stop, #pause").attr('disabled', true);
	$("#message").attr('disabled', false);
	status("Paused", "", false);
}
function stop() {
	if( $("html").data("state") == "play" ) {
		pause();
	}
	if( $("html").data("state") == "pause" ) {
		$("html").data("index", 0);
		status("Stopped", "", true);
	}
	$("html").data("state", "stop");
}

function start_random() {
	var included = new Array();
	var t;
	if($("html").data("index") == 0) {
		$("#message").val("");
		$("html").data("space", 0);
	}
	$("#letters :input").each(function(){$(this).attr('disabled', true)});
	$("#letters input:checked").each(function(){included.push($(this).val())});
	if(included.length == 0) {
		stop();
		status("No letters are selected for random sending.", "error", true);
		return;
	}
	$("html").data("letters", included);
	t = $("#muspace").data("numVal");
	if(isNaN(t)) {
		stop();
		status("The number of letters between spaces is invalid.", "error", true);
		return;
	}
	$("html").data("spacethresh", t / 2.0);
	status("Sending random letters", "", false);
	show_random_letter();
}
function show_random_letter() {
	var included = $("html").data("letters");
	var letter = included[Math.floor(Math.random() * included.length)];
	var i = $("html").data("index");
	if(i >= $("#message").attr('rows') * $("#message").attr('cols')) {
		stop();
		return;
	}
	$("html").data("index", i+1);
	var space = $("html").data("space");
	space += Math.random();
	if( space >= $("html").data("spacethresh") ) {
		letter = ' ';
		space = 0;
	}
	$("html").data("space", space);
	$("#message").val($("#message").val() + letter.toUpperCase());
	display_letter(letter);
	$("html").data("timeout", window.setTimeout(show_random_space, $("html").data("lettertime")));
}
function show_random_space() {
	display_letter(' ');
	$("html").data("timeout", window.setTimeout(show_random_letter, $("html").data("spacetime")));
}

function start_message() {
	var msg = $("#message").val();
	msg = msg.replace(/[^ a-z]/gi, "");
	msg = msg.replace(/\s+/gi, " ");
	$("html").data("msg", msg);
	status("Sending message", "", false);
	show_message_letter();
}
function show_message_letter() {
	var i = $("html").data("index");
	var msg = $("html").data("msg");
	if( i >= msg.length ) {
		stop();
		status("Done sending message", "", true);
		return;
	}
	var letter = msg.charAt(i);
	$("html").data("index", i+1);
	display_letter(letter);
	$("html").data("timeout", window.setTimeout(show_message_space, $("html").data("lettertime")));
}
function show_message_space() {
	display_letter(' ');
	$("html").data("timeout", window.setTimeout(show_message_letter, $("html").data("spacetime")));
}

$(function(){
	$("#all").click(check_all);
	$("#none").click(uncheck_all);
	$("#play").click(play);
	$("#pause").click(pause);
	$("#stop").click(stop);
	$("#showmsg").click(function(){$("#message").css('visibility','visible')});
	$("#hidemsg").click(function(){$("#message").css('visibility','hidden')});
	$("#clearmsg").click(function(){$("#message").val("")});
	$("#random").click(switchrandom);
	$("#message").change(stop);
	$("#back").click(switchfrontback);
	$("input[type=number]").change(validate_number);
	$("input[type=number]").change();
	$("html").data("frontback", "front");
	$("html").data("index", 0);
	$("html").data("state", "stop");
	normalstatus();
});
