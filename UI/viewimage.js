function viewimage() {
	var result ={};
	
	var lavue = Ti.UI.createView({backgroundColor:'white' });
	
    var logo = Titanium.UI.createImageView({
    	image:'/image/logo.png',
    	top:0,
    	left:0,
    	width:"10%",
    	height:"10%"
    });
    
	var label = Ti.UI.createLabel({
		color: "blue",
		textAlign:Titanium.UI.TEXT_ALIGNMENT_CENTER,
		left:"10%",
		width: "90%",
		height:"10%",
		top:0
	});
	
	var suivi = Titanium.UI.createImageView({
		width:Ti.UI.SIZE,
    	height:Ti.UI.SIZE,
    	top : "10%"
	});
	
	var scrollView = Ti.UI.createScrollView({
		contentWidth:Ti.UI.SIZE, 
	    contentHeight:Ti.UI.SIZE, 
	    top:0,
	    showVerticalScrollIndicator:true, 
	    showHorizontalScrollIndicator:true
	});
	
	scrollView.add(suivi);
	
	var login = "user";
	var mdp = "user";
	result.date = new Date();
	
	getmap();
	
	lavue.add(logo);
	lavue.add(label);
	lavue.add(scrollView);
	
	result.vue = lavue;
	
    suivi.addEventListener("dblclick", function(e) {
		Ti.App.fireEvent("polluant");
  	});
  	
  	result.setPolluant = function(polluantR) {
        result.polluant = polluantR;
        refreshlabel();
	};
	
	result.setSource = function(sourceR) {
        result.source = sourceR;
	};
	
	result.setCapteur = function(capteurR) {
        result.capteur = capteurR;
	};
	
	result.setRecepteur = function(recepteurR) {
        result.recepteur = recepteurR;
	};
	
	result.setDate = function(date) {
        result.date = date;
        refreshlabel();
	};
	
	function verifpolluant()	{
			return result.polluant;
	}
	
	function verifrecept()	{
		if(typeof(result.recepteur) === 'undefined')
			return "Recepteur";
		else
			return result.recepteur;
	}
	
	function verifcapt()	{
		if(typeof(result.capt) === 'undefined')
			return "0";
		else
			return "1";
	}
	
	function refreshlabel(){
			label.setText("Suivi "+result.polluant+" - "+result.date.getDate()+"/"+parseInt(result.date.getMonth()+1)+"/"+result.date.getFullYear());
	}
	
	function getmap(params)	{
		var url = "http://www.whereyouwant/googleIfyouCare";
		var params = "Des paramètres";
		var client = Ti.Network.createHTTPClient({
			// si la réponse est ok
			onload : function(e) {
				suivi.setImage(this.responseData);
			},
			// si erreur . ou timeout !
			onerror : function(e) {
				alert("erreur capteur");
			},
			timeout : 5000 // implique un probleme reseau
		});
		
		client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		client.setRequestHeader("Content-length", parametre.length);
		client.setRequestHeader("Connection", "close");
		client.open("POST", url, true);
		client.send(parametre);
	}
	
	result.refresh = function refreshimage() {
		var ladate = result.date;
		var params;
		if (typeof ladate !== 'undefined' ) {
			polluant=verifpolluant();
			capteur=verifcapt();
			recept=verifrecept();
						
			var moi = parseInt(ladate.getMonth()) + 1;
			param = "plein de paramètre";
			getmap(params);
		}
		else
			Ti.API.info("date indéfini -> problème");
	};
	
	result.refreshconfig = function(lelogin, password) {
		login = lelogin;
		mdp = password;
	};
	
	refreshlabel();
	
    return result;
}


module.exports = viewimage;