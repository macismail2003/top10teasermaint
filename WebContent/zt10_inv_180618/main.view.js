sap.ui.jsview("zt10_inv_180618.main", {

	/** Specifies the Controller belonging to this View.
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf zt10_inv_180618.main
	*/
	getControllerName : function() {
		return "zt10_inv_180618.main";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
	* Since the Controller is given to this method, its event handlers can be attached right away.
	* @memberOf zt10_inv_180618.main
	*/
	createContent : function(oController) {

		jQuery.sap.require("sap.ui.core.IconPool");
		var oPageBar = new sap.m.Bar("idPageBar",{
				height : "70px",
						contentLeft : [ new sap.ui.commons.Image( {
								src : "./images/seaco_logo.jpg",
								height : "35px",
								//width : "85px"
						}).addStyleClass("marginTop7"),

						new sap.m.SegmentedButton("idSegmentedButtonLeaseSale",{
									selectedKey : "Lease",
									select : function(oEvent){
										var selProcess = oEvent.getParameter("key");
										var matnr = sap.ui.getCore().byId("idSegmentedButtonBoxes").getSelectedKey();
										oController.setValuesShortageSurplus(selProcess, matnr);
									},
									items :[

										new sap.m.SegmentedButtonItem({
											text : "Lease",
											key : "Lease"
										}),
										new sap.m.SegmentedButtonItem({
											text : "Sale",
											key : "Sale"
										})

									],
									})
								],

						 contentMiddle : [ new sap.m.Label("idSDASHM2TariffPageBarTitle",{
									text : "Top Shortage/Surplus Locations",
									textAlign : "Left",
									design : "Bold"
						 }).addStyleClass("fontTitle") ],

						 contentRight : [

							 new sap.m.SegmentedButton("idSegmentedButtonBoxes",{
								 selectedKey : "BX2",
								 select : function(oEvent){
									 var matnr = oEvent.getParameter("key");
									 var selProcess = sap.ui.getCore().byId("idSegmentedButtonLeaseSale").getSelectedKey();
									 oController.setValuesShortageSurplus(selProcess, matnr);
								 },
							 			items :[
							 				new sap.m.SegmentedButtonItem({
							 					text : "BX2",
												key : "BX2",
							 					width : "90px"
							 				}),
							 				new sap.m.SegmentedButtonItem({
							 					text : "BW4",
												key : "BW4",
							 					width : "90px"
							 				}),
											new sap.m.SegmentedButtonItem({
							 					text : "BX4",
												key : "BX4",
							 					width : "90px"
							 				}),
											new sap.m.SegmentedButtonItem({
												text : "BW5",
												key : "BW5",
												width : "90px"
											})

							 			],
							 			})

														 ]
		});

 		return new sap.m.Page("idPageMain",{
			title: "",
			content: [
			    oController.createContent()
			]
		}).setCustomHeader(oPageBar).setShowHeader(true);
	}

});
