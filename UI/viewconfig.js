function viewconfig() {
	var result = {};
	
	var lavue = Ti.UI.createView({backgroundColor:'white' });

	var login = Ti.UI.createTextField({
	  color: '#336699',
	  top: 10, left: 10,
	  width: 250, height: 60,
	  hintText:"saisissez votre login"
	});
	
	var mdp = Ti.UI.createTextField({
		color:"#336699",
		top:"25%",left:10,
		width : 250, height :60,
		passwordMask :true,
		hintText:"saisissez votre code"
	});
	/*
	var nomSite = Ti.UI.createTextField({
		color:"#336699",
		top:"50%",
		left:10,
		width:250, 
		height:60,
		hintText:"plumair"
	});
	*/
	var boutonValider = Titanium.UI.createButton({
	    title:'Valider',
	    width:120,
	    height:40,
	    top:"75%",
	    left:"5%"
	});

	var boutonClose = Titanium.UI.createButton({
	    title:'Fermer',
	    width:120,
	    height:40,
	    top:"75%",
	    left:"55%"
	});
	
	boutonValider.addEventListener('click',function(e){
		Ti.App.fireEvent("okconfig");
	});
	
	boutonClose.addEventListener('click',function(e){
		Ti.App.fireEvent("finconfig");
	});
	
	
	function recupererinfo() {
	    var Dir = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'info');
	    var file = Titanium.Filesystem.getFile(Dir.nativePath,'info.txt');
		var blob = file.read().text;
		var tmp =blob.split("\n");
		login.setValue(tmp[0]);
		mdp.setValue(tmp[1]);
		
		//nomSite.setValue(tmp[2]);
	
		file = null;
		blob = null;
		tmp = null;
	}
	
	lavue.add(boutonValider);
	lavue.add(boutonClose);
	lavue.add(login);
	lavue.add(mdp);
	//lavue.add(nomSite);
	
	result.vue=lavue;
	result.login=login;
	result.mdp=mdp;
	//result.nomSite=nomSite;
	
	return result;
}
module.exports = viewconfig;
