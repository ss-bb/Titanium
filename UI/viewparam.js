function param() {

	var result = {};

	var lavue = Ti.UI.createView({
		backgroundColor : 'white'
	});
	
	result.date = new Date();
	
	var url = "http://www.whereyouwant/googleIfyouCare";
	
	
	//on commence par crée les deux boutons pour la date/heure ainsi que leurs fonctionnement
	var date = Date();
	var datedemander;
	var boutonDate = Ti.UI.createButton({
		title : 'Date',
		top : 10,
		width : 100,
		height : 50,
		left : "25%"
	});
	
	var boutonTime = Ti.UI.createButton({
		title : 'Heure',
		top : 10,
		width : 100,
		height : 50,
		right : "25%"
	});

	boutonDate.addEventListener('click', function(e) {
		var picker = Ti.UI.createPicker({
			type : Ti.UI.PICKER_TYPE_DATE,
			minDate : new Date(1971, 0, 1)
		});

		picker.showDatePickerDialog({
			value : Date.parse(date),
			callback : function(e) {
				if (e.cancel) {
					Ti.API.info('l\' utilisateur a fermer via cancel');
				} 
				else {
					date = new Date(e.value);
					result.date.setFullYear(date.getFullYear());
					result.date.setMonth(date.getMonth());
					result.date.setDate(date.getDate());
					Ti.App.fireEvent("date");
				}
			}
		});
	});

	boutonTime.addEventListener('click', function(e) {
		var picker = Ti.UI.createPicker({
			type : Ti.UI.PICKER_TYPE_TIME,
			minDate : new Date(2000, 0, 1)
		});

		picker.showTimePickerDialog({
			value : Date.parse(date),
			callback : function(e) {
				if (e.cancel) {
					Ti.API.info('l\' utilisateur a fermer via cancel');
				}
				else {
					datetest = new Date(e.value);
					result.date.setMinutes(datetest.getMinutes());
					result.date.setHours(datetest.getHours());
					Ti.App.fireEvent("date");
				}
			}
		});
	});

	// ici commence les requete XMLHttpRequest
	// pour info , les capteur/recepteur serons dans un multi picker. Les polluant source serons dans un autre multi picker.
	
	var paramspolluant = "desparam";
	var client = Ti.Network.createHTTPClient({
		// si la réponse est ok
		onload : function(e) {
			var results = JSON.parse(this.responseData);
			pickerpolluant(results);
		},
		// si erreur . ou timeout !
		onerror : function(e) {
			alert("erreur polluant");
		},
		timeout : 5000 // implique un probleme reseau , l'URL est considerer comme obligatoirement exact.
	});
	client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	client.setRequestHeader("Content-length", paramspolluant.length);
	client.setRequestHeader("Connection", "close");
	client.open("POST", url, true);
	client.send(paramspolluant);

	// les recepteurs 
	var paramsrecepteur = "desparam";
	var client = Ti.Network.createHTTPClient({
		// si la réponse est ok
		onload : function(e) {
			var results = JSON.parse(this.responseData);
			pickerrecepteur(results);
		},
		// si erreur . ou timeout !
		onerror : function(e) {
			alert("erreur recepteur");
		},
		timeout : 5000 // implique un probleme reseau
	});
	client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	client.setRequestHeader("Content-length", paramsrecepteur.length);
	client.setRequestHeader("Connection", "close");
	client.open("POST", url, true);
	client.send(paramsrecepteur);
	
	// le capteur
	var paramscapt = "desparam";
	var client = Ti.Network.createHTTPClient({
		// si la réponse est ok
		onload : function(e) {
			var results = JSON.parse(this.responseData);
			pickercapteur(results);
		},
		// si erreur . ou timeout !
		onerror : function(e) {
			alert("erreur capteur");
		},
		timeout : 5000 // implique un probleme reseau
	});

	client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	client.setRequestHeader("Content-length", paramscapt.length);
	client.setRequestHeader("Connection", "close");
	client.open("POST", url, true);
	client.send(paramscapt);

	//la source
	paramsource ="desparam";
	var client = Ti.Network.createHTTPClient({
		// si la réponse est ok
		onload : function(e) {
			var results = JSON.parse(this.responseData);
			pickersource(results);
		},
		// si erreur . ou timeout !
		onerror : function(e) {
			alert("erreur source");
		},
		timeout : 5000 // implique un probleme reseau
	});

	client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	client.setRequestHeader("Content-length", paramsource.length);
	client.setRequestHeader("Connection", "close");
	client.open("POST", url, true);
	client.send(paramsource);

	// Fin des Requete XMLHTTPRequest
	// les fonction sont lors de modification utilisateur
	function obtenirRecepteur() {
		var url = "http://www.whereyouwant/googleIfyouCare";
		var params = "Des paramètres";
		var client = Ti.Network.createHTTPClient({
			// si la réponse est ok
			onload : function(e) {
				var results = JSON.parse(this.responseData);
				pickercapteur(results);
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

	function obtenirCEMS() {
		var url = "http://www.whereyouwant/googleIfyouCare";
		var params = "Des paramètres";
		var client = Ti.Network.createHTTPClient({
			// si la réponse est ok
			onload : function(e) {
				var results = JSON.parse(this.responseData);
				pickercapteur(results);
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

	//ici , on attaque les composant graphique
	//le picker pour les capteur et recepteurs.
	var lepickercapteur = Ti.UI.createPicker({
		top : 75,
		height : 100,
		useSpinner : true
	});
	lepickercapteur.selectionIndicator = true;

	// le picker pour les polluants et les sources.
	var lepickerpolluant = Ti.UI.createPicker({
		top : 200,
		width :200,
		height : 100,
		left : 100,
		useSpinner : true
	});
	lepickerpolluant.selectionIndicator = true;
	
	var lepickersource = Ti.UI.createPicker({
		top : 200,
		height : 100,
		left : 250,
		useSpinner : true
	});
	lepickersource.selectionIndicator = true;

	var column4 = Ti.UI.createPickerColumn();
	var column3 = Ti.UI.createPickerColumn();
	var column2 = Ti.UI.createPickerColumn();
	var column1 = Ti.UI.createPickerColumn();


	//capteur et recepteur
	function pickerrecepteur(table) {
		for (var i = 0, ilen = table.length; i < ilen; i++) {
			var row = Ti.UI.createPickerRow({
				title : table[i]
			});
			column1.addRow(row);
		}
		addpickercapteur();
	}

	function pickercapteur(table) {
		var taille;
		var test = column3.getRows();
		if (test != null) {
			taille = test.length - 1;
		}
		
		result.capteur=table[1];		
		for (var i = 0, ilen = table.length; i < ilen; i++) {
			var row = Ti.UI.createPickerRow({
				title : table[i]
			});
			column3.addRow(row);
		}

		if (taille != null) {
			for (var i = taille; i >= 0; i--) {
				column3.remove(test[i]);
			};
		}
		addpickercapteur();
		result.capteur=table[0];
		Ti.App.fireEvent("changcapt");
	}

	function addpickercapteur() {
		lepickercapteur.add([column1, column3]);
	}

	//polluant et source
	
	function pickersource(table) {
		for (var i = 0, ilen = table.length; i < ilen; i++) {
			var row = Ti.UI.createPickerRow({
				title : table[i]
			});
			column2.addRow(row);
		}
		addpickersource();
	}

	function pickerpolluant(table) {
		for (var i = 0, ilen = table.length; i < ilen; i++) {
			var row = Ti.UI.createPickerRow({
				title : table[i]
			});
			column4.addRow(row);
		}
		addpickerpolluant();
	}

	function addpickersource() {
		lepickersource.add([column2]);
	}
	
	function addpickerpolluant() {
		lepickerpolluant.add([column4]);
	}

	//on ajoute les listeners

	lepickerpolluant.addEventListener('change', function(e) {
		var tabtmp = e.selectedValue;
		var polluant = tabtmp[0];
		majpolluant(polluant, "polluant");
	});
	lepickersource.addEventListener('change', function(e) {
		var tabtmp = e.selectedValue;
		var source = tabtmp[0];
		majpolluant(source, "source");
	});
	lepickercapteur.addEventListener('change', function(e) {
		var tabtmp = e.selectedValue;
		recepteur = tabtmp[0];
		capteur = tabtmp[1];
		majrecepteur(recepteur,capteur);
	});

	//on ajoute le tout dans la vue
	lavue.add(boutonDate);
	lavue.add(boutonTime);
	lavue.add(lepickercapteur);
	lavue.add(lepickerpolluant);
	lavue.add(lepickersource);

	//on ajoute la vue dans result
	result.vue = lavue;

	/*pour information : object accesible dans result :
	 * result.recepteur
	 * result.capteur
	 * result.polluant
	 * result.source
	 * result.date
	 */

	function majpolluant(valeur, type) {
		if(type == "polluant")
		{
			result.polluant = valeur;
			Ti.App.fireEvent("changpol");
		}
		else if(type == "source")	
		{
			result.source = valeur;
			Ti.App.fireEvent("changsource");
		}
	};

	function majrecepteur(recepteur , capteur) {
		if(result.recepteur == recepteur){
			result.capteur = capteur;
			Ti.App.fireEvent("changcapt");
		}
		else{
			result.recepteur=recepteur;
			if (recepteur == "CEMS")			
				obtenirCEMS();
			else
				obtenirRecepteur();
			Ti.App.fireEvent("changerecep");
		}
	};
	//on defini les fonctions specifique a cette vue . on crée l'interface en considerant que ce qu'il y a avant sont maintenant des "attribut" d'une classe.

	//fin
	return result;
}

module.exports = param;