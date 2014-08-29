
var fenetreBase = Titanium.UI.createWindow({
	fullscreen : true,
	navBarHidden : true,
	backgroundColor : "white",
	exitOnClose : true
});

var dateactuelle = Date();
var vueparam = new (require('UI/viewparam'))();
var vuegraphe = new (require('UI/viewgraphe'))();
var vueimage = new (require('UI/viewimage'))();
var vueconfig = new (require('UI/viewconfig'))();

fenetreBase.orientationModes = [Ti.UI.LANDSCAPE_LEFT];

//La fenetre qui seras ouverete au lanecement de l'application
fenetreBase.add(vueconfig.vue);

Ti.App.addEventListener("polluant", function() {
	changervue("polluant");
});

Ti.App.addEventListener("date",function() {
	changerimage(vueparam.date,"date");
	changergraphe(vueparam.date,"date");
});

Ti.App.addEventListener("changpol", function() {
	changerimage(vueparam.polluant,"polluant");
	changergraphe(vueparam.polluant,"polluant");
});

Ti.App.addEventListener("changsource", function() {
	changerimage(vueparam.source,"source");
	changergraphe(vueparam.source,"source");
});

Ti.App.addEventListener("changcapt", function() {
	Ti.API.info("le capteur : "+ vueparam.capteur);
	changerimage(vueparam.capteur,"capteur");
	changergraphe(vueparam.capteur,"capteur");
});

Ti.App.addEventListener("changerecep", function() {
	Ti.API.info("le typecapt:"+vueparam.recepteur);
	changerimage(vueparam.recepteur,"recepteur");
	changergraphe(vueparam.recepteur,"recepteur");
});



Ti.App.addEventListener("finconfig", function() {
	changervue("image");
});

Ti.App.addEventListener("okconfig", function() {
	refreshconfig();
	changervue("image");
});

// le menu quand on clique sur le bouton commentaire de android .
//Attention . Ne marcheras pas sur ipad/iphone! Prévoir un menu specifique pour eux.
var activity = fenetreBase.activity;
activity.onCreateOptionsMenu = function(e) {
	var menu = e.menu;
	var menuimage = menu.add({
		title : "image",
		showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	});
	menuimage.addEventListener("click", function(e) {
		changervue("image");
	});
	var menugraphe = menu.add({
		title : "graphe",
		showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	});
	menugraphe.addEventListener("click", function(e) {
		changervue("graphe");
	});
	var menuconfig = menu.add({
		title : "configuration",
		showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM
	});
	menuconfig.addEventListener("click", function(e) {
		changervue("config");
	});
};
//fin du menu

function changervue(fenetre) {
	
	fenetreBase.remove(vuegraphe.vue);
	fenetreBase.remove(vueimage.vue);
	fenetreBase.remove(vueparam.vue);
	fenetreBase.remove(vueconfig.vue);
	
	if (fenetre == "image"){
		vueimage.refresh();
		fenetreBase.add(vueimage.vue);
	}
	else if (fenetre == "graphe"){
		vuegraphe.refresh();
		fenetreBase.add(vuegraphe.vue);
	}
	else if (fenetre == "polluant")	{
		fenetreBase.add(vueparam.vue);
	}
	else if (fenetre == "config")	{
		fenetreBase.add(vueconfig.vue);
	}
}

function changerimage(param, nomparam) {
	if(nomparam == "polluant")
		vueimage.setPolluant(param);
	if(nomparam == "source")
		vueimage.setSource(param);//l'image se fiche de la source.
	if(nomparam == "capteur")
		vueimage.setCapteur(param);
	if(nomparam == "recepteur")
		vueimage.setRecepteur(param);
	if(nomparam == "date")
		vueimage.setDate(param);
}

function changergraphe(param, nomparam) {
	if(nomparam == "polluant")
		vuegraphe.setPolluant(param);
	if(nomparam == "source")
		vuegraphe.setSource(param);
	if(nomparam == "capteur")
		vuegraphe.setCapteur(param);
	if(nomparam == "recepteur")
		vuegraphe.setRecepteur(param);
	if(nomparam == "date")
		vuegraphe.setDate(param);
}

function refreshconfig() {
	vuegraphe.refreshconfig(vueconfig.login.value,vueconfig.mdp.value);
	vueimage.refreshconfig(vueconfig.login.value,vueconfig.mdp.value);
}

fenetreBase.open();
