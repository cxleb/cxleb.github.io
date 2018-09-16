var Moral = 10000000000000;
var infinite = false;
const links =["http://i.imgur.com/UUDMs3Z.gif",
	"http://www.gifwave.com/media/21631_eye-roll.gif",
	"http://i.kinja-img.com/gawker-media/image/upload/s--B1fba4Fs--/c_fit,fl_progressive,q_80,w_636/17k6loie478ejgif.gif",
	"http://cdn.funnyhub.com/2015/feb/bas/Funny-Pictures/funny-middle-finger-old-lady.gif",
	"http://www.funnfun.in/wp-content/uploads/2013/11/ugly-man-funny-gif.gif",
	"http://cdn.funnyhub.com/2015/feb/bas/Funny-Pictures/funny-licking.gif",
	"https://omitlimitation.files.wordpress.com/2014/06/funny-gifs-the-perfect-loop.gif",
	"http://31.media.tumblr.com/5954007035c15f66c6b23f8700357436/tumblr_mmnizoNfFS1spbth3o1_400.gif",
	"http://www.sharegif.com/wp-content/uploads/2014/04/idgaffunny-gifreaction-gifbarack-obama.gif",
	"https://33.media.tumblr.com/cf60fcfee68ced54ec45eef5983ef056/tumblr_ncio86iqb71th9iiyo1_500.gif"];


function jsCall(){
	var num = getRandomInt(0, links.length);
	console.log(num);
	document.getElementById("imgBox").src=links[num];
	document.getElementById("Moral_level").innerHTML="your Moral Level: "+Moral;
	dispMoral();
}

function dispMoral(){
	Moral += 1;
	document.getElementById("Moral_level").innerHTML="your Moral Level: "+Moral;
	while(infinite){
		//wait(1000);
		Moral += 1;
		document.getElementById("Moral_level").innerHTML="your Moral Level: "+Moral
	}
}

function wait(ms){
	var t = 0;
	while(t < ms*100){
		t += 1;
	}
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}