function viewgraphe() {

	var result = {};
	var lavue = Ti.UI.createView({
		backgroundColor : 'white'
	});
	
	var ladate = new Date();
	var polluant;
	var source;
	var capteur;
	var recepteur;
	
	//valeur par defaut, completement arbitraire
	var login = "user";
	var mdp = "user";
	
	result.numcapteur=0;
	result.date=new Date();
	

	function verifpolluant(){
		if(typeof(result.polluant) === 'undefined')
			return "NH3";
		else
			return result.polluant;
	}

	function verifsource(){
		if(typeof(result.source) === 'undefined')
			return "Source 1";
		else
			return result.source;
	}
	
	function verifrecept(){
		if(typeof(result.recepteur) === 'undefined')
			return "Recepteur";
		else
			return result.recepteur;
	}
	
	function verifcapt(){
			return result.numcapteur;
	}
	
	function trouvercapteur()
	{
		var url = "http://www.whereyouwant/googleIfyouCare";
		var params = "Des paramètres";
		var client = Ti.Network.createHTTPClient({
			// si la réponse est ok
			onload : function(e) {
				var results = JSON.parse(this.responseData);
				return trouverindex(results);
			},
			// si erreur . ou timeout !
			onerror : function(e) {
				alert("erreur capteur");
			},
			timeout : 5000 // implique un probleme reseau
		});
		client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		client.setRequestHeader("Content-length", params.length);
		client.setRequestHeader("Connection", "close");
		client.open("POST", url, true);
		client.send(params);
	}
	
	function trouverindex(results){
		for (var i=0; i < results.length; i++) {
		  if(result.capteur == results[i])
		  {
		  	result.numcapteur = i;
		  	return;
		  }
		};
	}
	
	var logo = Titanium.UI.createImageView({
		image : '/image/logo.png',
		top : 0,
		left : 0,
		width : "10%",
		height : "10%"
	});
	
	var label = Ti.UI.createLabel({
		color : "blue",
		textAlign : Titanium.UI.TEXT_ALIGNMENT_CENTER,
		left : "10%",
		width : "90%",
		height : "10%",
		top : 0
	});
	label.setText("Graphe");

	var concentration = Titanium.UI.createImageView({
		top : "10%",
		left : 0,
		width : "100%",
		height : "30%"
	});
	
	var meteo = Titanium.UI.createImageView({
		top : "40%",
		left : 0,
		width : "100%",
		height : "30%"
	});
	
	var emission = Titanium.UI.createImageView({
		top : "70%",
		left : 0,
		width : "100%",
		height : "30%"
	});

	getEmissions(param1);
	getConcentration(param2);
	getMeteo(param3);

	concentration.addEventListener("dblclick", function(e) {
		Ti.App.fireEvent("polluant");
	});

	emission.addEventListener("dblclick", function(e) {
		Ti.App.fireEvent("polluant");
	});

	meteo.addEventListener("dblclick", function(e) {
		Ti.API.info("meteo");
	});

	lavue.add(label);
	lavue.add(logo);
	lavue.add(concentration);
	lavue.add(meteo);
	lavue.add(emission);
	
	lavue.addEventListener("swipe", function(e) {
		var lemoi;
		if (e.direction == "right"){// recule d'une unité
			var minute = result.date.getMinutes();
			result.date.setMinutes(minute - 15);

			lemoi = result.date.getMonth() + 1;
			
			getEmissions(param1);
			getConcentration(param2);
			getMeteo(param3);
			
		}
		if (e.direction == "left"){//avance d'une unité
			var minute = result.date.getMinutes();
			result.date.setMinutes(minute +15);
			lemoi = result.date.getMonth() + 1;
			
			getEmissions(param1);
			getConcentration(param2);
			getMeteo(param3);
			
		}
		if (e.direciton == "up" || e.direction == "down")
			Ti.API.info("pour l'instant rien de prevu dans ce cas pour l'instant");
	});

	result.vue = lavue;

	result.setPolluant = function(polluantR) {
		result.polluant = polluantR;
	};
	
	result.setSource = function(sourceR) {
		result.source = sourceR;
	};
	
	result.setCapteur = function(capteurR) {
		result.capteur = capteurR;
		trouvercapteur();
		refreshLabel();
	};
	
	result.setRecepteur = function(recepteurR) {
		result.recepteur = recepteurR;
	};
	
	result.setDate = function(ladate) {
		result.date = ladate;
	};

	result.refresh = function() {
		var lemoi;
		if ( typeof result.date !== "undefined") {
			polluant=verifpolluant();
			source=verifsource();
			capteur=verifcapt();
			recepteur=verifrecept();
			
			/*
			Ti.API.info("**************************************************************");
			Ti.API.info(result.date);
			Ti.API.info(polluant);
			Ti.API.info(source);
			Ti.API.info(capteur);
			Ti.API.info(recepteur);
			Ti.API.info("**************************************************************");
			*/
			
			lemoi = result.date.getMonth() + 1;
			
			getEmissions(param1);
			getConcentration(param2);
			getMeteo(param3);
			
		}
	};
	
	result.refreshconfig = function(lelogin, password) {
		login = lelogin;
		mdp = password;
	};
	
	function refreshLabel(){
		label.setText("Graphe - "+result.capteur);
	}
	
	function getEmissions(params) {
		var url = "http://www.whereyouwant/googleIfyouCare";
		var params = "Des paramètres";
		var client = Ti.Network.createHTTPClient({
			// si la réponse est ok
			onload : function(e) {
				emission.setImage(this.responseData);
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
	
	function getMeteo(params) {
		var url = "http://www.whereyouwant/googleIfyouCare";
		var params = "Des paramètres";
		var client = Ti.Network.createHTTPClient({
			// si la réponse est ok
			onload : function(e) {
				meteo.setImage(this.responseData);
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
	
	function getConcentration(params) {
		var url = "http://www.whereyouwant/googleIfyouCare";
		var params = "Des paramètres";
		var client = Ti.Network.createHTTPClient({
			// si la réponse est ok
			onload : function(e) {
				concentration.setImage(this.responseData);
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
		Ti.API.info("dans getconcentration : "+parametre);
		client.send(parametre);
	}

	return result;
}

module.exports = viewgraphe; 