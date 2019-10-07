var oJSONF4Values = [];
oJSONF4Values.location =[];
oJSONF4Values.country =[];
oJSONF4Values.region =[];
oJSONF4Values.type =[];
oJSONF4Values.cate =[];

var oModelF4Values = new sap.ui.model.json.JSONModel();
oModelF4Values.setData(oJSONF4Values);

var oTemplatematerialDdl = new sap.ui.core.Item({
                                key:"{oModelmaterialDdl>key}",
                                text:"{oModelmaterialDdl>text}",
                            });


var globalTabName = "";
var oJSONShortageValues = [];
var oJSONSurplusValues = [];

var oJSONSHORTAGESpecialValues = [];
var oJSONSURPLUSSpecialValues = [];

var oJSONSurplusBlockValues = [];
var oJSONShortageBlockValues = [];

var locationData = [];
var productData = [];
var locationArray = [];
var productArray = [];
var locationFullArray = [];
var productFullArray = [];

var globalIsadmin = false;
var oJSONAuthorizationControls = [];

oJSONAuthorizationControls.push("idSURPLUSTableButtonSave");
//oJSONAuthorizationControls.push("idSHORTAGETableButtonSave");
oJSONAuthorizationControls.push("idSURPLUSTableButtonHide");
oJSONAuthorizationControls.push("idSHORTAGETableButtonHide");
oJSONAuthorizationControls.push("idSURPLUSTableBlockButtonEnable");
oJSONAuthorizationControls.push("idSHORTAGETableBlockButtonEnable");
oJSONAuthorizationControls.push("idSURPLUSSPECIALTableButtonAdd");
oJSONAuthorizationControls.push("idSURPLUSSPECIALTableButtonDelete");
oJSONAuthorizationControls.push("idSHORTAGESPECIALTableButtonAdd");
oJSONAuthorizationControls.push("idSHORTAGESPECIALTableButtonDelete");
oJSONAuthorizationControls.push("idFINALFormSURPLUSBlock");
oJSONAuthorizationControls.push("idFINALFormSHORTAGEBlock");

var oJSONTableControls = [];
oJSONTableControls.push("idSURPLUSTable");
oJSONTableControls.push("idSHORTAGETable");
oJSONTableControls.push("idSURPLUSTableBlock");
oJSONTableControls.push("idSHORTAGETableBlock");
oJSONTableControls.push("idSHORTAGESPECIALTable");
oJSONTableControls.push("idSURPLUSSPECIALTable");

jQuery.sap.require("sap.ui.model.json.JSONModel");
jQuery.sap.require("sap.ui.commons.MessageBox");
sap.ui.controller("zt10_inv_180618.main", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf zt10_inv_180618.main
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf zt10_inv_180618.main
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf zt10_inv_180618.main
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf zt10_inv_180618.main
*/
//	onExit: function() {
//
//	}

	createContent : function(){
		var oCurrent = this;

		/* SURPLUS - Table - Details */

		var oSURPLUSTable = new sap.ui.table.Table("idSURPLUSTable",{
        selectionMode: sap.ui.table.SelectionMode.Single,
				visibleRowCount: 10,
        toolbar: new sap.ui.commons.Toolbar({
 				items: [

 					new sap.ui.commons.Button("idSURPLUSTableButtonHide",{
              text: "Hide",
 		   			  press : function(oEvent){
								var arraySelLines = sap.ui.getCore().byId("idSURPLUSTable").getSelectedIndices();
								var isSelectedOne = arraySelLines.length;
								if(isSelectedOne == 0){
									sap.ui.commons.MessageBox.alert("Select an entry to hide it");
								}else{
									oCurrent.hideEnableLocation("idSURPLUSTable", "I");
							 }
 		   			  }
						}),

            new sap.ui.commons.Button("idSURPLUSTableButtonSave",{
                text: "Save",
   		   			  press : function(oEvent){
  								var arraySelLines = sap.ui.getCore().byId("idSURPLUSTable").getSelectedIndices();
  								var isSelectedOne = arraySelLines.length;
  								if(isSelectedOne == 0){
  									sap.ui.commons.MessageBox.alert("Select an entry to save");
  								}else{
  									oCurrent.hideEnableLocation("idSURPLUSTable", "S");
  							 }
   		   			  }
  						})

 				]
 			})
		}).addStyleClass("sapUiSizeCompact tblBorder1");

		oSURPLUSTable.addColumn(new sap.ui.table.Column({
      visible : false,
       label: new sap.ui.commons.Label({text: "Region", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "regiondesc").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"13%"
			 }));

			 oSURPLUSTable.addColumn(new sap.ui.table.Column({
	             label: new sap.ui.commons.Label({text: "Country", textAlign: "Left"}).addStyleClass("wraptextcol"),
	 			 template: new sap.ui.commons.TextView({
	 			 }).bindProperty("text", "countrydesc").addStyleClass("borderStyle1"),
	 	           resizable:false,
	 	           width:"13%",
               filterProperty : "countrydesc"
	 			 }));

				 oSURPLUSTable.addColumn(new sap.ui.table.Column({
		             label: new sap.ui.commons.Label({text: "City", textAlign: "Left"}).addStyleClass("wraptextcol"),
		 			 template: new sap.ui.commons.TextView({
		 			 }).bindProperty("text", "citydesc").addStyleClass("borderStyle1"),
		 	           resizable:false,
		 	           width:"13%",
                 filterProperty : "citydesc"
		 			 }));

			 oSURPLUSTable.addColumn(new sap.ui.table.Column({
	             label: new sap.ui.commons.Label({text: "Surplus", textAlign: "Center"}).addStyleClass("wraptextcol"),
	 			 template: new sap.ui.commons.TextView({
           textAlign: "Center"
	 			 }).bindProperty("text", "surplusshortage").addStyleClass("borderStyle1"),
	 	           resizable:false,
	 	           width:"10%"
	 			 }));

				 oSURPLUSTable.addColumn(new sap.ui.table.Column({
		             label: new sap.ui.commons.Label({text: "AVLB + AUTH - Booked", textAlign: "Center"}).addStyleClass("wraptextcol"),
		 			 template: new sap.ui.commons.TextView({
             textAlign: "Center"
		 			 }).bindProperty("text", "avlbauthbooked").addStyleClass("borderStyle1"),
		 	           resizable:false,
		 	           width:"10%"
		 			 }));

					 oSURPLUSTable.addColumn(new sap.ui.table.Column({
			             label: new sap.ui.commons.Label({text: "Target Inv", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 			 template: new sap.ui.commons.TextView({
               textAlign: "Center"
			 			 }).bindProperty("text", "targetinv").addStyleClass("borderStyle1"),
			 	           resizable:false,
			 	           width:"10%"
			 			 }));

					 oSURPLUSTable.addColumn(new sap.ui.table.Column({
			             label: new sap.ui.commons.Label({text: "Avg. of In Days", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 			 template: new sap.ui.commons.TextView({
               textAlign: "Center"
			 			 }).bindProperty("text", "avgindays").addStyleClass("borderStyle1"),
			 	           resizable:false,
			 	           width:"10%"
			 			 }));

						 oSURPLUSTable.addColumn(new sap.ui.table.Column({
				             label: new sap.ui.commons.Label({text: "Port Rating", textAlign: "Center"}).addStyleClass("wraptextcol"),
				 			 template: new sap.ui.commons.TextView({
                 textAlign: "Center"
				 			 }).bindProperty("text", "portrating").addStyleClass("borderStyle1"),
				 	           resizable:false,
				 	           width:"10%"
				 			 }));

					 oSURPLUSTable.addColumn(new sap.ui.table.Column("idSURPLUSTableMAXOWM",{
			       label: new sap.ui.commons.Label({text: "Max OWM PR 1&2", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 			 template: new sap.ui.commons.TextField({
               textAlign: "Center",
               change : function(oEvent){
                 var newmaxpucr = this.getValue();
                 var whichRow = oEvent.getSource().getBindingContext().getPath().split('/')[2];
                 whichRow = parseInt(whichRow);
                 oJSONSurplusValues[whichRow].maxpucr = newmaxpucr;
               }
			 			 }).bindProperty("value", "maxpucr", function(cellValue){
                if(globalIsadmin == true)
                  this.addStyleClass("textFieldClass");
                else if(globalIsadmin == false)
                  this.removeStyleClass("textFieldClass");
                return cellValue;
             }).bindProperty("editable", "enablemaxpucr").addStyleClass("borderStyle1"),
			 	           resizable:false,
			 	           width:"10%"
			 			 }));


	/* SHORTAGE - Table - Details */

		 		var oSHORTAGETable = new sap.ui.table.Table("idSHORTAGETable",{
		         selectionMode: sap.ui.table.SelectionMode.Single,
		 				visibleRowCount: 10,
		         toolbar: new sap.ui.commons.Toolbar({
		  				items: [

		  					new sap.ui.commons.Button("idSHORTAGETableButtonHide",{
		               text: "Hide",
									 press : function(oEvent){
										 var arraySelLines = sap.ui.getCore().byId("idSHORTAGETable").getSelectedIndices();
										 var isSelectedOne = arraySelLines.length;
										 if(isSelectedOne == 0){
											 sap.ui.commons.MessageBox.alert("Select an entry to hide it");
										 }else{
											 oCurrent.hideEnableLocation("idSHORTAGETable", "I");
										}
									 }
		 						}),

                new sap.ui.commons.Button("idSHORTAGETableButtonSave",{
                    text: "Save",
                    visible : false,
       		   			  press : function(oEvent){
      								var arraySelLines = sap.ui.getCore().byId("idSHORTAGETable").getSelectedIndices();
      								var isSelectedOne = arraySelLines.length;
      								if(isSelectedOne == 0){
      									sap.ui.commons.MessageBox.alert("Select an entry to save");
      								}else{
      									oCurrent.hideEnableLocation("idSHORTAGETable", "S");
      							  }
       		   			  }
      						})

		  				]
		  			})
		 }).addStyleClass("sapUiSizeCompact tblBorder1 shortageSection");

		 oSHORTAGETable.addColumn(new sap.ui.table.Column({
       visible : false,
             label: new sap.ui.commons.Label({text: "Region", textAlign: "Left"}).addStyleClass("wraptextcol"),
 			 template: new sap.ui.commons.TextView({
 			 }).bindProperty("text", "regiondesc").addStyleClass("borderStyle1"),
 	           resizable:false,
 	           width:"13%"
 			 }));

 			 oSHORTAGETable.addColumn(new sap.ui.table.Column({
 	             label: new sap.ui.commons.Label({text: "Country", textAlign: "Left"}).addStyleClass("wraptextcol"),
 	 			 template: new sap.ui.commons.TextView({
 	 			 }).bindProperty("text", "countrydesc").addStyleClass("borderStyle1"),
 	 	           resizable:false,
 	 	           width:"13%",
               filterProperty : "countrydesc"
 	 			 }));

 				 oSHORTAGETable.addColumn(new sap.ui.table.Column({
 		             label: new sap.ui.commons.Label({text: "City", textAlign: "Left"}).addStyleClass("wraptextcol"),
 		 			 template: new sap.ui.commons.TextView({
 		 			 }).bindProperty("text", "citydesc").addStyleClass("borderStyle1"),
 		 	           resizable:false,
 		 	           width:"13%",
                 filterProperty : "citydesc"
 		 			 }));

 			 oSHORTAGETable.addColumn(new sap.ui.table.Column({
 	             label: new sap.ui.commons.Label({text: "Shortage", textAlign: "Center"}).addStyleClass("wraptextcol"),
 	 			 template: new sap.ui.commons.TextView({
           textAlign: "Center"
 	 			 }).bindProperty("text", "surplusshortage").addStyleClass("borderStyle1"),
 	 	           resizable:false,
 	 	           width:"10%"
 	 			 }));

 				 oSHORTAGETable.addColumn(new sap.ui.table.Column({
 		             label: new sap.ui.commons.Label({text: "AVLB + AUTH - Booked", textAlign: "Center"}).addStyleClass("wraptextcol"),
 		 			 template: new sap.ui.commons.TextView({
             textAlign: "Center"
 		 			 }).bindProperty("text", "avlbauthbooked").addStyleClass("borderStyle1"),
 		 	           resizable:false,
 		 	           width:"10%"
 		 			 }));

 					 oSHORTAGETable.addColumn(new sap.ui.table.Column({
 			             label: new sap.ui.commons.Label({text: "Target Inv", textAlign: "Center"}).addStyleClass("wraptextcol"),
 			 			 template: new sap.ui.commons.TextView({
               textAlign: "Center"
 			 			 }).bindProperty("text", "targetinv").addStyleClass("borderStyle1"),
 			 	           resizable:false,
 			 	           width:"10%"
 			 			 }));

 					 oSHORTAGETable.addColumn(new sap.ui.table.Column({
 			             label: new sap.ui.commons.Label({text: "Avg. of In Days", textAlign: "Center"}).addStyleClass("wraptextcol"),
 			 			 template: new sap.ui.commons.TextView({
               textAlign: "Center"
 			 			 }).bindProperty("text", "avgindays").addStyleClass("borderStyle1"),
 			 	           resizable:false,
 			 	           width:"10%"
 			 			 }));

 						 oSHORTAGETable.addColumn(new sap.ui.table.Column({
 				             label: new sap.ui.commons.Label({text: "Port Rating", textAlign: "Center"}).addStyleClass("wraptextcol"),
 				 			 template: new sap.ui.commons.TextView({
                 textAlign: "Center"
 				 			 }).bindProperty("text", "portrating").addStyleClass("borderStyle1"),
 				 	           resizable:false,
 				 	           width:"10%"
 				 			 }));

 					 oSHORTAGETable.addColumn(new sap.ui.table.Column({
             visible : false,
 			       label: new sap.ui.commons.Label({text: "Max OWM PR 1&2", textAlign: "Center"}).addStyleClass("wraptextcol"),
 			 			 template: new sap.ui.commons.TextField({
                textAlign: "Center"
 			 			 }).bindProperty("value", "maxpucr", function(cellValue){
                if(globalIsadmin == true)
                  this.addStyleClass("textFieldClass");
                else if(globalIsadmin == false)
                  this.removeStyleClass("textFieldClass");
                return cellValue;
             }).bindProperty("editable", "enablemaxpucr").addStyleClass("borderStyle1"),
 			 	           resizable:false,
 			 	           width:"10%"
 			 			 }));


						 /* LEASE Block - Table - Details */

						 var oSURPLUSTableBlock = new sap.ui.table.Table("idSURPLUSTableBlock",{
						     selectionMode: sap.ui.table.SelectionMode.Single,
						     visibleRowCount: 10,
						     toolbar: new sap.ui.commons.Toolbar({
						     items: [

						       new sap.ui.commons.Button("idSURPLUSTableBlockButtonEnable",{
						           text: "Enable",
						           press : function(oEvent){
						             var arraySelLines = sap.ui.getCore().byId("idSURPLUSTableBlock").getSelectedIndices();
						             var isSelectedOne = arraySelLines.length;
						             if(isSelectedOne == 0){
						               sap.ui.commons.MessageBox.alert("Select an entry to enable it");
						             }else{
						               oCurrent.hideEnableLocation("idSURPLUSTableBlock", "D");
						             }
						           }
						         })
						     ]
						   })
						 }).addStyleClass("sapUiSizeCompact tblBorder1");

						 oSURPLUSTableBlock.addColumn(new sap.ui.table.Column({
               visible : false,
						         label: new sap.ui.commons.Label({text: "Region", textAlign: "Left"}).addStyleClass("wraptextcol"),
						    template: new sap.ui.commons.TextView({
						    }).bindProperty("text", "regiondesc").addStyleClass("borderStyle1"),
						          resizable:false,
						          width:"13%"
						    }));

						    oSURPLUSTableBlock.addColumn(new sap.ui.table.Column({
						            label: new sap.ui.commons.Label({text: "Country", textAlign: "Left"}).addStyleClass("wraptextcol"),
						      template: new sap.ui.commons.TextView({
						      }).bindProperty("text", "countrydesc").addStyleClass("borderStyle1"),
						            resizable:false,
						            width:"13%",
                        filterProperty : "countrydesc"
						      }));

						      oSURPLUSTableBlock.addColumn(new sap.ui.table.Column({
						              label: new sap.ui.commons.Label({text: "City", textAlign: "Left"}).addStyleClass("wraptextcol"),
						        template: new sap.ui.commons.TextView({
						        }).bindProperty("text", "citydesc").addStyleClass("borderStyle1"),
						              resizable:false,
						              width:"13%",
                          filterProperty : "citydesc"
						        }));

                    oSURPLUSTableBlock.addColumn(new sap.ui.table.Column({
  						              label: new sap.ui.commons.Label({text: "Surplus", textAlign: "Center"}).addStyleClass("wraptextcol"),
  						        template: new sap.ui.commons.TextView({
                        textAlign: "Center"
  						        }).bindProperty("text", "surplusshortage").addStyleClass("borderStyle1"),
  						              resizable:false,
  						              width:"13%"
  						        }));



						 /* SALE Block - Table - Details */

						     var oSHORTAGETableBlock = new sap.ui.table.Table("idSHORTAGETableBlock",{
						          selectionMode: sap.ui.table.SelectionMode.Single,
						         visibleRowCount: 10,
						          toolbar: new sap.ui.commons.Toolbar({
						           items: [

						             new sap.ui.commons.Button("idSHORTAGETableBlockButtonEnable",{
						                text: "Enable",
						                press : function(oEvent){
						                  var arraySelLines = sap.ui.getCore().byId("idSHORTAGETableBlock").getSelectedIndices();
						                  var isSelectedOne = arraySelLines.length;
						                  if(isSelectedOne == 0){
						                    sap.ui.commons.MessageBox.alert("Select an entry to enable it");
						                  }else{
						                    oCurrent.hideEnableLocation("idSHORTAGETableBlock", "D");
						                 }
						                }
						             })
						           ]
						         })
						  }).addStyleClass("sapUiSizeCompact tblBorder1");

						  oSHORTAGETableBlock.addColumn(new sap.ui.table.Column({
                visible : false,
						          label: new sap.ui.commons.Label({text: "Region", textAlign: "Left"}).addStyleClass("wraptextcol"),
						    template: new sap.ui.commons.TextView({
						    }).bindProperty("text", "regiondesc").addStyleClass("borderStyle1"),
						          resizable:false,
						          width:"13%"
						    }));

						    oSHORTAGETableBlock.addColumn(new sap.ui.table.Column({
						            label: new sap.ui.commons.Label({text: "Country", textAlign: "Left"}).addStyleClass("wraptextcol"),
						      template: new sap.ui.commons.TextView({
						      }).bindProperty("text", "countrydesc").addStyleClass("borderStyle1"),
						            resizable:false,
						            width:"13%",
                        filterProperty : "countrydesc"
						      }));

						      oSHORTAGETableBlock.addColumn(new sap.ui.table.Column({
						              label: new sap.ui.commons.Label({text: "City", textAlign: "Left"}).addStyleClass("wraptextcol"),
						        template: new sap.ui.commons.TextView({
						        }).bindProperty("text", "citydesc").addStyleClass("borderStyle1"),
						              resizable:false,
						              width:"13%",
                          filterProperty : "citydesc"
						        }));

                    oSHORTAGETableBlock.addColumn(new sap.ui.table.Column({
                            label: new sap.ui.commons.Label({text: "Shortage", textAlign: "Center"}).addStyleClass("wraptextcol"),
                      template: new sap.ui.commons.TextView({
                        textAlign: "Center"
                      }).bindProperty("text", "surplusshortage").addStyleClass("borderStyle1"),
                            resizable:false,
                            width:"13%"
                      }));

	 /* Final - Layout */

			 var oFINALLayout = new sap.ui.layout.form.ResponsiveGridLayout("idFINALLayout",{
			 											labelSpanL: 1,
			 												labelSpanM: 1,
			 												labelSpanS: 1,
			 												emptySpanL: 0,
			 												emptySpanM: 0,
			 												emptySpanS: 0,
			 												columnsL: 2,
			 												columnsM: 2,
			 												columnsS: 1,
			 												breakpointL: 765,
			 												breakpointM: 320
			 										});

		 /* Final - Form */

		 var oFINALForm = new sap.ui.layout.form.Form("idFINALForm",{
		 			layout: oFINALLayout,
		 			formContainers: [
            new sap.ui.layout.form.FormContainer("idFINALFormSurplus",{
                title: "Surplus - All",
                formElements: [
                new sap.ui.layout.form.FormElement({
                    fields: [ oSURPLUSTable ]
                })
              ]
            }),

            new sap.ui.layout.form.FormContainer("idFINALFormShortage",{
		 									title: "Shortage - All",
		 									formElements: [
		 									new sap.ui.layout.form.FormElement({
		 											fields: [ oSHORTAGETable ]
		 									})
		 							]
		 							}),

						new sap.ui.layout.form.FormContainer("idFINALFormSURPLUSBlock",{
									title: "Surplus - Hidden Location",
									formElements: [
									new sap.ui.layout.form.FormElement({
											fields: [ oSURPLUSTableBlock ]
									})
								]
							}),

						new sap.ui.layout.form.FormContainer("idFINALFormSHORTAGEBlock",{
									title: "Shortage - Hidden Location",
									formElements: [
									new sap.ui.layout.form.FormElement({
											fields: [ oSHORTAGETableBlock ]
									})
								]
							}),

		 			]
		 		}).addStyleClass("marginTopBottom10");

				/* SHORTAGESPECIAL - Table - Details */

				var oSHORTAGESPECIALTable = new sap.ui.table.Table("idSHORTAGESPECIALTable",{
						selectionMode: sap.ui.table.SelectionMode.Single,
						toolbar: new sap.ui.commons.Toolbar({
						items: [
							new sap.ui.commons.Button("idSHORTAGESPECIALTableButtonAdd",{
									text: "Add",
									press : function(oEvent){
                    var oSPECIALADDITION = new specialaddition();
                    var oSPECIALADDITIONContent = oSPECIALADDITION.openAdditionPopup("idSHORTAGESPECIALTable", "I");

                    if(sap.ui.getCore().byId("idSPECIALADDITIONDialog") != undefined)
                       sap.ui.getCore().byId("idSPECIALADDITIONDialog").destroy();

                    var oSPECIALADDITIONDialog = new sap.ui.commons.Dialog("idSPECIALADDITIONDialog",{
                      width : "50%"
                    });
                     //oDialog1.setTitle("My first Dialog");
                     //var oText = new sap.ui.commons.TextView({text: "Hello World!"});
                     oSPECIALADDITIONDialog.addContent(new sap.m.FlexBox({direction : "Column",
                           items : [oSPECIALADDITIONContent]
                     }));

                     oSPECIALADDITIONDialog.addButton(new sap.ui.commons.Button({text: "Reset", press:function(oEvent){
                       sap.ui.getCore().byId("idSPECIALInputRegion").setEnabled(false);
                       sap.ui.getCore().byId("idSPECIALInputRegion").setValue("");

                       sap.ui.getCore().byId("idSPECIALComboCountry").setEnabled(true);
                       sap.ui.getCore().byId("idSPECIALComboCountry").setSelectedKey("");

                       sap.ui.getCore().byId("idSPECIALComboCity").setEnabled(false);
                       sap.ui.getCore().byId("idSPECIALComboCity").setSelectedKey("");

                       sap.ui.getCore().byId("idSPECIALInputShortageSurplus").setValue("");
                       sap.ui.getCore().byId("idSPECIALInputAvlb").setValue("");
                       sap.ui.getCore().byId("idSPECIALInputAvgInDays").setValue("");
                       sap.ui.getCore().byId("idSPECIALInputTarget").setValue("");
                       sap.ui.getCore().byId("idSPECIALInputPortRating").setValue("");
                       sap.ui.getCore().byId("idSPECIALInputIncentives").setValue("");
                       sap.ui.getCore().byId("idSPECIALInputReason").setValue("");
                       sap.ui.getCore().byId("idSPECIALInputQtyMove").setValue("");
                     }}));

                     oSPECIALADDITIONDialog.addButton(new sap.ui.commons.Button({text: "Save", press:function(oEvent){
                       //var oSPECIALADDITION = new specialaddition();
                       oCurrent.addRemoveSpecial("idSHORTAGESPECIALTable", "I");
                     }}));
                     oSPECIALADDITIONDialog.addButton(new sap.ui.commons.Button({text: "Close", press:function(){oSPECIALADDITIONDialog.close();}}));

                     oSPECIALADDITIONDialog.open();
									}
								}),

							new sap.ui.commons.Button("idSHORTAGESPECIALTableButtonDelete",{
									text: "Delete",
									press : function(oEvent){
										var arraySelLines = sap.ui.getCore().byId("idSHORTAGESPECIALTable").getSelectedIndices();
										var isSelectedOne = arraySelLines.length;
										if(isSelectedOne == 0){
											sap.ui.commons.MessageBox.alert("Select an entry to remove it");
										}else{
											oCurrent.addRemoveSpecial("idSHORTAGESPECIALTable", "D");
									 }
									}
								})
						]
					})
				}).addStyleClass("sapUiSizeCompact tblBorder1");

				oSHORTAGESPECIALTable.addColumn(new sap.ui.table.Column({
          visible : false,
								label: new sap.ui.commons.Label({text: "Region", textAlign: "Left"}).addStyleClass("wraptextcol"),
					 template: new sap.ui.commons.TextView({
					 }).bindProperty("text", "regiondesc").addStyleClass("borderStyle1"),
								 resizable:false,
								 width:"13%"
					 }));

					 oSHORTAGESPECIALTable.addColumn(new sap.ui.table.Column({
									 label: new sap.ui.commons.Label({text: "Country", textAlign: "Left"}).addStyleClass("wraptextcol"),
						 template: new sap.ui.commons.TextView({
						 }).bindProperty("text", "countrydesc").addStyleClass("borderStyle1"),
									 resizable:false,
									 width:"13%",
                   filterProperty : "countrydesc"
						 }));

						 oSHORTAGESPECIALTable.addColumn(new sap.ui.table.Column({
										 label: new sap.ui.commons.Label({text: "City", textAlign: "Left"}).addStyleClass("wraptextcol"),
							 template: new sap.ui.commons.TextView({
							 }).bindProperty("text", "citydesc").addStyleClass("borderStyle1"),
										 resizable:false,
										 width:"13%",
                     filterProperty : "citydesc"
							 }));

					 // oSHORTAGESPECIALTable.addColumn(new sap.ui.table.Column({
						// 			 label: new sap.ui.commons.Label({text: "Shortage", textAlign: "Left"}).addStyleClass("wraptextcol"),
						//  template: new sap.ui.commons.TextView({
						//  }).bindProperty("text", "surplusshortage").addStyleClass("borderStyle1"),
						// 			 resizable:false,
						// 			 width:"10%"
						//  }));

            oSHORTAGESPECIALTable.addColumn(new sap.ui.table.Column({
                    label: new sap.ui.commons.Label({text: "Qty to Move IN", textAlign: "Center"}).addStyleClass("wraptextcol"),
              template: new sap.ui.commons.TextView({
                textAlign: "Center"
              }).bindProperty("text", "qtymove").addStyleClass("borderStyle1"),
                    resizable:false,
                    width:"10%"
              }));

						 oSHORTAGESPECIALTable.addColumn(new sap.ui.table.Column({
										 label: new sap.ui.commons.Label({text: "AVLB + AUTH - Booked", textAlign: "Center"}).addStyleClass("wraptextcol"),
							 template: new sap.ui.commons.TextView({
                 textAlign: "Center"
							 }).bindProperty("text", "avlbauthbooked").addStyleClass("borderStyle1"),
										 resizable:false,
										 width:"10%"
							 }));

							 oSHORTAGESPECIALTable.addColumn(new sap.ui.table.Column({
											 label: new sap.ui.commons.Label({text: "Target Inv", textAlign: "Center"}).addStyleClass("wraptextcol"),
								 template: new sap.ui.commons.TextView({
                   textAlign: "Center"
								 }).bindProperty("text", "targetinv").addStyleClass("borderStyle1"),
											 resizable:false,
											 width:"10%"
								 }));

							 oSHORTAGESPECIALTable.addColumn(new sap.ui.table.Column({
											 label: new sap.ui.commons.Label({text: "Avg. of In Days", textAlign: "Center"}).addStyleClass("wraptextcol"),
								 template: new sap.ui.commons.TextView({
                   textAlign: "Center"
								 }).bindProperty("text", "avgindays").addStyleClass("borderStyle1"),
											 resizable:false,
											 width:"10%"
								 }));

								 oSHORTAGESPECIALTable.addColumn(new sap.ui.table.Column({
												 label: new sap.ui.commons.Label({text: "Port Rating", textAlign: "Center"}).addStyleClass("wraptextcol"),
									 template: new sap.ui.commons.TextView({
                     textAlign: "Center"
									 }).bindProperty("text", "portrating").addStyleClass("borderStyle1"),
												 resizable:false,
												 width:"10%"
									 }));

							 oSHORTAGESPECIALTable.addColumn(new sap.ui.table.Column({
											 label: new sap.ui.commons.Label({text: "Max/Min Incentives to be offered", textAlign: "Left"}).addStyleClass("wraptextcol"),
								 template: new sap.ui.commons.TextView({
								 }).bindProperty("text", "incentives").addStyleClass("borderStyle1 wraptext"),
											 resizable:false,
											 width:"10%"
								 }));

								 oSHORTAGESPECIALTable.addColumn(new sap.ui.table.Column({
												 label: new sap.ui.commons.Label({text: "Comment", textAlign: "Left"}).addStyleClass("wraptextcol"),
									 template: new sap.ui.commons.TextView({
									 }).bindProperty("text", "reason").addStyleClass("borderStyle1 wraptext"),
												 resizable:false,
												 width:"10%"
									 }));



                        /* SURPLUSSPECIAL - Table - Details */

                        var oSURPLUSSPECIALTable = new sap.ui.table.Table("idSURPLUSSPECIALTable",{
                            selectionMode: sap.ui.table.SelectionMode.Single,
                            toolbar: new sap.ui.commons.Toolbar({
                            items: [
                              new sap.ui.commons.Button("idSURPLUSSPECIALTableButtonAdd",{
                                  text: "Add",
                                  press : function(oEvent){
                                    var oSPECIALADDITION = new specialaddition();
                                    var oSPECIALADDITIONContent = oSPECIALADDITION.openAdditionPopup("idSURPLUSSPECIALTable", "I");

                                    if(sap.ui.getCore().byId("idSPECIALADDITIONDialog") != undefined)
                                       sap.ui.getCore().byId("idSPECIALADDITIONDialog").destroy();

                                    var oSPECIALADDITIONDialog = new sap.ui.commons.Dialog("idSPECIALADDITIONDialog",{
                                      width : "50%"
                                    });
                                     //oDialog1.setTitle("My first Dialog");
                                     //var oText = new sap.ui.commons.TextView({text: "Hello World!"});
                                     oSPECIALADDITIONDialog.addContent(new sap.m.FlexBox({direction : "Column",
                                           items : [oSPECIALADDITIONContent]
                                     }));

                                     oSPECIALADDITIONDialog.addButton(new sap.ui.commons.Button({text: "Reset", press:function(oEvent){
                                       sap.ui.getCore().byId("idSPECIALInputRegion").setEnabled(false);
                                       sap.ui.getCore().byId("idSPECIALInputRegion").setValue("");

                                       sap.ui.getCore().byId("idSPECIALComboCountry").setEnabled(true);
                                       sap.ui.getCore().byId("idSPECIALComboCountry").setSelectedKey("");

                                       sap.ui.getCore().byId("idSPECIALComboCity").setEnabled(false);
                                       sap.ui.getCore().byId("idSPECIALComboCity").setSelectedKey("");

                                       sap.ui.getCore().byId("idSPECIALInputShortageSurplus").setValue("");
                                       sap.ui.getCore().byId("idSPECIALInputAvlb").setValue("");
                                       sap.ui.getCore().byId("idSPECIALInputAvgInDays").setValue("");
                                       sap.ui.getCore().byId("idSPECIALInputTarget").setValue("");
                                       sap.ui.getCore().byId("idSPECIALInputPortRating").setValue("");
                                       sap.ui.getCore().byId("idSPECIALInputIncentives").setValue("");
                                       sap.ui.getCore().byId("idSPECIALInputReason").setValue("");
                                       sap.ui.getCore().byId("idSPECIALInputQtyMove").setValue("");
                                     }}));

                                     oSPECIALADDITIONDialog.addButton(new sap.ui.commons.Button({text: "Save", press:function(oEvent){
                                       //var oSPECIALADDITION = new specialaddition();
                                       oCurrent.addRemoveSpecial("idSHORTAGESPECIALTable", "I");
                                     }}));
                                     oSPECIALADDITIONDialog.addButton(new sap.ui.commons.Button({text: "Close", press:function(){oSPECIALADDITIONDialog.close();}}));

                                     oSPECIALADDITIONDialog.open();
                                  }
                                }),

                              new sap.ui.commons.Button("idSURPLUSSPECIALTableButtonDelete",{
                                  text: "Delete",
                                  press : function(oEvent){
                                    var arraySelLines = sap.ui.getCore().byId("idSURPLUSSPECIALTable").getSelectedIndices();
                                    var isSelectedOne = arraySelLines.length;
                                    if(isSelectedOne == 0){
                                      sap.ui.commons.MessageBox.alert("Select an entry to remove it");
                                    }else{
                                      oCurrent.addRemoveSpecial("idSURPLUSSPECIALTable", "D");
                                   }
                                  }
                                })
                            ]
                          })
                        }).addStyleClass("sapUiSizeCompact tblBorder1");

                        oSURPLUSSPECIALTable.addColumn(new sap.ui.table.Column({
                          visible : false,
                                label: new sap.ui.commons.Label({text: "Region", textAlign: "Left"}).addStyleClass("wraptextcol"),
                           template: new sap.ui.commons.TextView({
                           }).bindProperty("text", "regiondesc").addStyleClass("borderStyle1"),
                                 resizable:false,
                                 width:"13%"
                           }));

                           oSURPLUSSPECIALTable.addColumn(new sap.ui.table.Column({
                                   label: new sap.ui.commons.Label({text: "Country", textAlign: "Left"}).addStyleClass("wraptextcol"),
                             template: new sap.ui.commons.TextView({
                             }).bindProperty("text", "countrydesc").addStyleClass("borderStyle1"),
                                   resizable:false,
                                   width:"13%",
                                   filterProperty : "countrydesc"
                             }));

                             oSURPLUSSPECIALTable.addColumn(new sap.ui.table.Column({
                                     label: new sap.ui.commons.Label({text: "City", textAlign: "Left"}).addStyleClass("wraptextcol"),
                               template: new sap.ui.commons.TextView({
                               }).bindProperty("text", "citydesc").addStyleClass("borderStyle1"),
                                     resizable:false,
                                     width:"13%",
                                     filterProperty : "citydesc"
                               }));

                           // oSURPLUSSPECIALTable.addColumn(new sap.ui.table.Column({
                           //         label: new sap.ui.commons.Label({text: "Surplus", textAlign: "Left"}).addStyleClass("wraptextcol"),
                           //   template: new sap.ui.commons.TextView({
                           //   }).bindProperty("text", "surplusshortage").addStyleClass("borderStyle1"),
                           //         resizable:false,
                           //         width:"10%"
                           //   }));

                           oSURPLUSSPECIALTable.addColumn(new sap.ui.table.Column({
                                   label: new sap.ui.commons.Label({text: "Qty to Move OUT", textAlign: "Center"}).addStyleClass("wraptextcol"),
                             template: new sap.ui.commons.TextView({
                               textAlign: "Center"
                             }).bindProperty("text", "qtymove").addStyleClass("borderStyle1"),
                                   resizable:false,
                                   width:"10%"
                             }));

                             oSURPLUSSPECIALTable.addColumn(new sap.ui.table.Column({
                                     label: new sap.ui.commons.Label({text: "AVLB + AUTH - Booked", textAlign: "Center"}).addStyleClass("wraptextcol"),
                               template: new sap.ui.commons.TextView({
                                 textAlign: "Center"
                               }).bindProperty("text", "avlbauthbooked").addStyleClass("borderStyle1"),
                                     resizable:false,
                                     width:"10%"
                               }));

                               oSURPLUSSPECIALTable.addColumn(new sap.ui.table.Column({
                                       label: new sap.ui.commons.Label({text: "Target Inv", textAlign: "Center"}).addStyleClass("wraptextcol"),
                                 template: new sap.ui.commons.TextView({
                                   textAlign: "Center"
                                 }).bindProperty("text", "targetinv").addStyleClass("borderStyle1"),
                                       resizable:false,
                                       width:"10%"
                                 }));

                               oSURPLUSSPECIALTable.addColumn(new sap.ui.table.Column({
                                       label: new sap.ui.commons.Label({text: "Avg. of In Days", textAlign: "Center"}).addStyleClass("wraptextcol"),
                                 template: new sap.ui.commons.TextView({
                                   textAlign: "Center"
                                 }).bindProperty("text", "avgindays").addStyleClass("borderStyle1"),
                                       resizable:false,
                                       width:"10%"
                                 }));

                                 oSURPLUSSPECIALTable.addColumn(new sap.ui.table.Column({
                                         label: new sap.ui.commons.Label({text: "Port Rating", textAlign: "Center"}).addStyleClass("wraptextcol"),
                                   template: new sap.ui.commons.TextView({
                                     textAlign: "Center"
                                   }).bindProperty("text", "portrating").addStyleClass("borderStyle1"),
                                         resizable:false,
                                         width:"10%"
                                   }));

                               oSURPLUSSPECIALTable.addColumn(new sap.ui.table.Column({
                                       label: new sap.ui.commons.Label({text: "Max/Min Incentives to be offered", textAlign: "Left"}).addStyleClass("wraptextcol"),
                                 template: new sap.ui.commons.TextView({
                                 }).bindProperty("text", "incentives").addStyleClass("borderStyle1 wraptext"),
                                       resizable:false,
                                       width:"10%"
                                 }));

                                 oSURPLUSSPECIALTable.addColumn(new sap.ui.table.Column({
                                         label: new sap.ui.commons.Label({text: "Comment", textAlign: "Left"}).addStyleClass("wraptextcol"),
                                   template: new sap.ui.commons.TextView({
                                   }).bindProperty("text", "reason").addStyleClass("borderStyle1 wraptext"),
                                         resizable:false,
                                         width:"10%"
                                   }));

                                   /* Final1 - Layout */

                							  			 var oFINAL1Layout = new sap.ui.layout.form.ResponsiveGridLayout("idFINAL1Layout",{
                							  			 											labelSpanL: 1,
                							  			 												labelSpanM: 1,
                							  			 												labelSpanS: 1,
                							  			 												emptySpanL: 0,
                							  			 												emptySpanM: 0,
                							  			 												emptySpanS: 0,
                							  			 												columnsL: 2,
                							  			 												columnsM: 2,
                							  			 												columnsS: 1,
                							  			 												breakpointL: 765,
                							  			 												breakpointM: 320
                							  			 										});

                							  		 /* Final - Form */

                							  		 var oFINAL1Form = new sap.ui.layout.form.Form("idFINAL1Form",{
                							  		 			layout: oFINAL1Layout,
                							  		 			formContainers: [
                                            new sap.ui.layout.form.FormContainer("idFINALFormSURPLUSSPECIAL",{
                                                title: "Surplus - Ad-Hoc/Urgent OWM Requirement",
                                                formElements: [
                                                new sap.ui.layout.form.FormElement({
                                                    fields: [ oSURPLUSSPECIALTable ]
                                                })
                                            ]
                                          }),

                                          new sap.ui.layout.form.FormContainer("idFINALFormSHORTAGESPECIAL",{
                							  		 									title: "Shortage - Ad-Hoc/Urgent OWM Requirement",
                							  		 									formElements: [
                							  		 									new sap.ui.layout.form.FormElement({
                							  		 											fields: [ oSHORTAGESPECIALTable ]
                							  		 									})
                							  		 							]
                                                })

                							  		 			]
                							  		 		}).addStyleClass("marginTopBottom10");

		oCurrent.setValuesShortageSurplus("Lease", "BX2");


		return sap.m.FlexBox({
			direction : "Column",
			items : [oFINALForm, oFINAL1Form],
		});
	},

  clearSortAndFilters : function(){

    for(var i=0; i<oJSONTableControls.length; i++){
      var oTABLESORTFILTER = sap.ui.getCore().byId(oJSONTableControls[i]);
      var iColCounter = 0;
      oTABLESORTFILTER.clearSelection();
      var iTotalCols = oTABLESORTFILTER.getColumns().length;
      var oListBinding = oTABLESORTFILTER.getBinding();
      if (oListBinding) {
        oListBinding.aSorters = null;
        oListBinding.aFilters = null;
      }
      if(oTABLESORTFILTER.getModel())
        oTABLESORTFILTER.getModel().refresh(true);

      for ( iColCounter = 0; iColCounter < iTotalCols; iColCounter++) {
        oTABLESORTFILTER.getColumns()[iColCounter].setSorted(false);
        oTABLESORTFILTER.getColumns()[iColCounter].setFilterValue("");
        oTABLESORTFILTER.getColumns()[iColCounter].setFiltered(false);
      }
    }


  },

	setValuesShortageSurplus : function(process, matnr){

		var oCurrent = this;
    oCurrent.clearSortAndFilters();

    if(process == "Lease")
      sap.ui.getCore().byId("idSURPLUSTableMAXOWM").setVisible(true);
    else
      sap.ui.getCore().byId("idSURPLUSTableMAXOWM").setVisible(false);

    if(sap.ui.getCore().byId("idPageMain"))
		  sap.ui.getCore().byId("idPageMain").setBusy(true);

		oJSONSurplusValues = [];
		oJSONShortageValues = [];

    oJSONSHORTAGESpecialValues = [];
    oJSONSURPLUSSpecialValues = [];

		oJSONSurplusBlockValues = [];
		oJSONShortageBlockValues = [];

		oModel = new sap.ui.model.odata.ODataModel(serviceTop10Url, true);
		OData.request({
		      requestUri: serviceTop10Url + "/getTOP10Set",
		      method: "GET",
		      dataType: 'json',
		      headers:
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0",
		          "X-CSRF-Token":"Fetch"
		      }
		    },
		    function (data, response){
					if(data.results.length == 0){
			    		sap.ui.commons.MessageBox.show("No Result Found.",
                    sap.ui.commons.MessageBox.Icon.ERROR,
                    "Error",
                    [sap.ui.commons.MessageBox.Action.OK],
                    sap.ui.commons.MessageBox.Action.OK);
					  sap.ui.getCore().byId("idPageMain").setBusy(false);
		    	}
				else{
						var specialProcess = "";
            var blockProcess = "";

						if(process == "Lease")
							process = "LEA";
						else if(process == "Sale")
							process = "SALE";

							if(process == "LEA"){
                specialProcess = "LSP";
                blockProcess = "LBL";
              }else if(process == "SALE"){
                specialProcess = "SSP";
                blockProcess = "SBL";
              }

					for(var i=0;i<data.results.length;i++){

            if(i == 0)
              globalIsadmin = (data.results[i].Isadmin == "X")?true:false;

						if(data.results[i].Part == process && data.results[i].Matnr == matnr ){
							if(data.results[i].Odi < 0){
								oJSONShortageValues.push({
									mregion : data.results[i].Mregion,
									region : data.results[i].Region,
									country : data.results[i].Country,
									city : data.results[i].City,
									regiondesc : data.results[i].ZRegDesc,
									countrydesc : data.results[i].ZCouDesc,
									citydesc : data.results[i].ZCityDesc,
									pcate : data.results[i].Pcate,
									pclass : data.results[i].Pclass,
									matnr : data.results[i].Matnr,
									maktx : data.results[i].Maktx,
									surplusshortage : data.results[i].Odi,
                  qtymove : data.results[i].Qtymove,
									avlbauthbooked : data.results[i].Avlb,
									targetinv : data.results[i].Tdi,
									avgindays : data.results[i].Indaysavg,
									portrating : data.results[i].Por,
									maxpucr : data.results[i].Pcr,
                  enablemaxpucr : globalIsadmin
								});
							}else if(data.results[i].Odi > 0){
								oJSONSurplusValues.push({
									mregion : data.results[i].Mregion,
									region : data.results[i].Region,
									country : data.results[i].Country,
									city : data.results[i].City,
									regiondesc : data.results[i].ZRegDesc,
									countrydesc : data.results[i].ZCouDesc,
									citydesc : data.results[i].ZCityDesc,
									pcate : data.results[i].Pcate,
									pclass : data.results[i].Pclass,
									matnr : data.results[i].Matnr,
									maktx : data.results[i].Maktx,
									surplusshortage : data.results[i].Odi,
                  qtymove : data.results[i].Qtymove,
									avlbauthbooked : data.results[i].Avlb,
									targetinv : data.results[i].Tdi,
									avgindays : data.results[i].Indaysavg,
									portrating : data.results[i].Por,
									maxpucr : data.results[i].Pcr,
                  enablemaxpucr : globalIsadmin
								});
							}
						}

						// if(data.results[i].Part == blockProcess && data.results[i].Matnr == matnr ){ // Lease Block
						// 		oJSONSurplusBlockValues.push({
						// 			mregion : data.results[i].Mregion,
						// 			region : data.results[i].Region,
						// 			country : data.results[i].Country,
						// 			city : data.results[i].City,
						// 			regiondesc : data.results[i].ZRegDesc,
						// 			countrydesc : data.results[i].ZCouDesc,
						// 			citydesc : data.results[i].ZCityDesc,
						// 			pcate : data.results[i].Pcate,
						// 			pclass : data.results[i].Pclass,
						// 			matnr : data.results[i].Matnr,
						// 			maktx : data.results[i].Maktx,
						// 			surplusshortage : data.results[i].Odi,
            //       qtymove : data.results[i].Qtymove,
						// 			avlbauthbooked : data.results[i].Avlb,
						// 			targetinv : data.results[i].Tdi,
						// 			avgindays : data.results[i].Indaysavg,
						// 			portrating : data.results[i].Por,
						// 			maxpucr : data.results[i].Pcr
						// 		});
						// }else if(data.results[i].Part == "SBL" && data.results[i].Matnr == matnr ){ // Sale Block
						// 		oJSONShortageBlockValues.push({
						// 			mregion : data.results[i].Mregion,
						// 			region : data.results[i].Region,
						// 			country : data.results[i].Country,
						// 			city : data.results[i].City,
						// 			regiondesc : data.results[i].ZRegDesc,
						// 			countrydesc : data.results[i].ZCouDesc,
						// 			citydesc : data.results[i].ZCityDesc,
						// 			pcate : data.results[i].Pcate,
						// 			pclass : data.results[i].Pclass,
						// 			matnr : data.results[i].Matnr,
						// 			maktx : data.results[i].Maktx,
						// 			surplusshortage : data.results[i].Odi,
            //       qtymove : data.results[i].Qtymove,
						// 			avlbauthbooked : data.results[i].Avlb,
						// 			targetinv : data.results[i].Tdi,
						// 			avgindays : data.results[i].Indaysavg,
						// 			portrating : data.results[i].Por,
						// 			maxpucr : data.results[i].Pcr
						// 		});
						// }

            if(data.results[i].Part == blockProcess && data.results[i].Matnr == matnr ){
              if(data.results[i].Odi < 0){
              oJSONShortageBlockValues.push({
                mregion : data.results[i].Mregion,
                region : data.results[i].Region,
                country : data.results[i].Country,
                city : data.results[i].City,
                regiondesc : data.results[i].ZRegDesc,
                countrydesc : data.results[i].ZCouDesc,
                citydesc : data.results[i].ZCityDesc,
                pcate : data.results[i].Pcate,
                pclass : data.results[i].Pclass,
                matnr : data.results[i].Matnr,
                maktx : data.results[i].Maktx,
                surplusshortage : data.results[i].Odi,
                qtymove : data.results[i].Qtymove,
                avlbauthbooked : data.results[i].Avlb,
                targetinv : data.results[i].Tdi,
                avgindays : data.results[i].Indaysavg,
                portrating : data.results[i].Por,
                maxpucr : data.results[i].Pcr,
                enablemaxpucr : globalIsadmin,
                incentives : data.results[i].Incentives,
                reason : data.results[i].Reason
              });
            }else if(data.results[i].Odi > 0){
              oJSONSurplusBlockValues.push({
                mregion : data.results[i].Mregion,
                region : data.results[i].Region,
                country : data.results[i].Country,
                city : data.results[i].City,
                regiondesc : data.results[i].ZRegDesc,
                countrydesc : data.results[i].ZCouDesc,
                citydesc : data.results[i].ZCityDesc,
                pcate : data.results[i].Pcate,
                pclass : data.results[i].Pclass,
                matnr : data.results[i].Matnr,
                maktx : data.results[i].Maktx,
                surplusshortage : data.results[i].Odi,
                qtymove : data.results[i].Qtymove,
                avlbauthbooked : data.results[i].Avlb,
                targetinv : data.results[i].Tdi,
                avgindays : data.results[i].Indaysavg,
                portrating : data.results[i].Por,
                maxpucr : data.results[i].Pcr,
                enablemaxpucr : globalIsadmin,
                incentives : data.results[i].Incentives,
                reason : data.results[i].Reason
              });
            }
            }

						if(data.results[i].Part == specialProcess && data.results[i].Matnr == matnr ){
              if(data.results[i].Odi < 0){
							oJSONSHORTAGESpecialValues.push({
								mregion : data.results[i].Mregion,
								region : data.results[i].Region,
								country : data.results[i].Country,
								city : data.results[i].City,
								regiondesc : data.results[i].ZRegDesc,
								countrydesc : data.results[i].ZCouDesc,
								citydesc : data.results[i].ZCityDesc,
								pcate : data.results[i].Pcate,
								pclass : data.results[i].Pclass,
								matnr : data.results[i].Matnr,
								maktx : data.results[i].Maktx,
								surplusshortage : data.results[i].Odi,
                qtymove : data.results[i].Qtymove,
								avlbauthbooked : data.results[i].Avlb,
								targetinv : data.results[i].Tdi,
								avgindays : data.results[i].Indaysavg,
								portrating : data.results[i].Por,
								maxpucr : data.results[i].Pcr,
                enablemaxpucr : globalIsadmin,
								incentives : data.results[i].Incentives,
								reason : data.results[i].Reason
							});
            }else if(data.results[i].Odi > 0){
            oJSONSURPLUSSpecialValues.push({
              mregion : data.results[i].Mregion,
              region : data.results[i].Region,
              country : data.results[i].Country,
              city : data.results[i].City,
              regiondesc : data.results[i].ZRegDesc,
              countrydesc : data.results[i].ZCouDesc,
              citydesc : data.results[i].ZCityDesc,
              pcate : data.results[i].Pcate,
              pclass : data.results[i].Pclass,
              matnr : data.results[i].Matnr,
              maktx : data.results[i].Maktx,
              surplusshortage : data.results[i].Odi,
              qtymove : data.results[i].Qtymove,
              avlbauthbooked : data.results[i].Avlb,
              targetinv : data.results[i].Tdi,
              avgindays : data.results[i].Indaysavg,
              portrating : data.results[i].Por,
              maxpucr : data.results[i].Pcr,
              enablemaxpucr : globalIsadmin,
              incentives : data.results[i].Incentives,
              reason : data.results[i].Reason
            });
            }
						}
					}

          for(var i=0; i<oJSONAuthorizationControls.length; i++){
            sap.ui.getCore().byId(oJSONAuthorizationControls[i]).setVisible(globalIsadmin);
          }

          /* Shortage Special */
					var oModelSHORTAGESpecialValues = new sap.ui.model.json.JSONModel();
					oModelSHORTAGESpecialValues.setData({modelData: oJSONSHORTAGESpecialValues});

					var oSHORTAGESPECIALTable = sap.ui.getCore().byId("idSHORTAGESPECIALTable");
					oSHORTAGESPECIALTable.setModel(oModelSHORTAGESpecialValues);
					oSHORTAGESPECIALTable.setVisibleRowCount(oJSONSHORTAGESpecialValues.length);
					oSHORTAGESPECIALTable.bindRows("/modelData");

          /* Surplus Special */
					var oModelSURPLUSSpecialValues = new sap.ui.model.json.JSONModel();
					oModelSURPLUSSpecialValues.setData({modelData: oJSONSURPLUSSpecialValues});

					var oSURPLUSSPECIALTable = sap.ui.getCore().byId("idSURPLUSSPECIALTable");
					oSURPLUSSPECIALTable.setModel(oModelSURPLUSSpecialValues);
					oSURPLUSSPECIALTable.setVisibleRowCount(oJSONSURPLUSSpecialValues.length);
					oSURPLUSSPECIALTable.bindRows("/modelData");

          /* Shortage Normal */

          var oModelShortageValues = new sap.ui.model.json.JSONModel();
					oModelShortageValues.setData({modelData: oJSONShortageValues});

					var oShortageTable = sap.ui.getCore().byId("idSHORTAGETable");
					oShortageTable.setModel(oModelShortageValues);
					//oShortageTable.setVisibleRowCount(oJSONShortageValues.length);
					oShortageTable.bindRows("/modelData");

          /* Surplus Normal */

					var oModelSurplusValues = new sap.ui.model.json.JSONModel();
					oModelSurplusValues.setData({modelData: oJSONSurplusValues});

					var oSURPLUSTable = sap.ui.getCore().byId("idSURPLUSTable");
					oSURPLUSTable.setModel(oModelSurplusValues);
					//oSURPLUSTable.setVisibleRowCount(oJSONSurplusValues.length);
					oSURPLUSTable.bindRows("/modelData");

          /* Surplus Block */

					var oModelSurplusBlockValues = new sap.ui.model.json.JSONModel();
					oModelSurplusBlockValues.setData({modelData: oJSONSurplusBlockValues});

					var oSURPLUSTableBlock = sap.ui.getCore().byId("idSURPLUSTableBlock");
					oSURPLUSTableBlock.setModel(oModelSurplusBlockValues);
					oSURPLUSTableBlock.setVisibleRowCount(oJSONSurplusBlockValues.length);
					oSURPLUSTableBlock.bindRows("/modelData");

          /* Shortage Block */

					var oModelShortageBlockValues = new sap.ui.model.json.JSONModel();
					oModelShortageBlockValues.setData({modelData: oJSONShortageBlockValues});

					var oSHORTAGETableBlock = sap.ui.getCore().byId("idSHORTAGETableBlock");
					oSHORTAGETableBlock.setModel(oModelShortageBlockValues);
					oSHORTAGETableBlock.setVisibleRowCount(oJSONShortageBlockValues.length);
					oSHORTAGETableBlock.bindRows("/modelData");

					sap.ui.getCore().byId("idPageMain").setBusy(false);


          sap.ui.getCore().byId(oJSONTableControls[0]).onAfterRendering = function() {

          if (sap.ui.table.Table.prototype.onAfterRendering) {
            sap.ui.table.Table.prototype.onAfterRendering.apply(this, arguments);
          }

          var tabColumns = sap.ui.getCore().byId(oJSONTableControls[0]).getColumns();
          var tabColumnsLength = tabColumns.length;
          for(var i=0; i<tabColumnsLength;i++){
            if(oJSONTableControls[0].substr(2,3) == "SHO")
              tabColumns[i].$().addClass("shortageSection");
            else if(oJSONTableControls[0].substr(2,3) == "SUR")
              tabColumns[i].$().addClass("surplusSection");
          }

          var selAllColId = "#" + oJSONTableControls[0] + "-selall";
          if(oJSONTableControls[0].substr(2,3) == "SHO")
            $(selAllColId).addClass("shortageSection");
          else if(oJSONTableControls[0].substr(2,3) == "SUR")
            $(selAllColId).addClass("surplusSection");

          }

          var tabColumns = sap.ui.getCore().byId(oJSONTableControls[0]).getColumns();
          var tabColumnsLength = tabColumns.length;
          for(var i=0; i<tabColumnsLength;i++){
            if(oJSONTableControls[0].substr(2,3) == "SHO")
              tabColumns[i].$().addClass("shortageSection");
            else if(oJSONTableControls[0].substr(2,3) == "SUR")
              tabColumns[i].$().addClass("surplusSection");
          }

          var selAllColId = "#" + oJSONTableControls[0] + "-selall";
          if(oJSONTableControls[0].substr(2,3) == "SHO")
            $(selAllColId).addClass("shortageSection");
          else if(oJSONTableControls[0].substr(2,3) == "SUR")
            $(selAllColId).addClass("surplusSection");

        /*************************************************************************************/

          sap.ui.getCore().byId(oJSONTableControls[1]).onAfterRendering = function() {

          if (sap.ui.table.Table.prototype.onAfterRendering) {
            sap.ui.table.Table.prototype.onAfterRendering.apply(this, arguments);
          }

          var tabColumns = sap.ui.getCore().byId(oJSONTableControls[1]).getColumns();
          var tabColumnsLength = tabColumns.length;
          for(var i=0; i<tabColumnsLength;i++){
            if(oJSONTableControls[1].substr(2,3) == "SHO")
              tabColumns[i].$().addClass("shortageSection");
            else if(oJSONTableControls[1].substr(2,3) == "SUR")
              tabColumns[i].$().addClass("surplusSection");
          }

          var selAllColId = "#" + oJSONTableControls[1] + "-selall";
          if(oJSONTableControls[1].substr(2,3) == "SHO")
            $(selAllColId).addClass("shortageSection");
          else if(oJSONTableControls[1].substr(2,3) == "SUR")
            $(selAllColId).addClass("surplusSection");

          }

          var tabColumns = sap.ui.getCore().byId(oJSONTableControls[1]).getColumns();
          var tabColumnsLength = tabColumns.length;
          for(var i=0; i<tabColumnsLength;i++){
            if(oJSONTableControls[1].substr(2,3) == "SHO")
              tabColumns[i].$().addClass("shortageSection");
            else if(oJSONTableControls[1].substr(2,3) == "SUR")
              tabColumns[i].$().addClass("surplusSection");
          }

          var selAllColId = "#" + oJSONTableControls[1] + "-selall";
          if(oJSONTableControls[1].substr(2,3) == "SHO")
            $(selAllColId).addClass("shortageSection");
          else if(oJSONTableControls[1].substr(2,3) == "SUR")
            $(selAllColId).addClass("surplusSection");

        /***********************************************************************************/

          sap.ui.getCore().byId(oJSONTableControls[2]).onAfterRendering = function() {

          if (sap.ui.table.Table.prototype.onAfterRendering) {
            sap.ui.table.Table.prototype.onAfterRendering.apply(this, arguments);
          }

          var tabColumns = sap.ui.getCore().byId(oJSONTableControls[2]).getColumns();
          var tabColumnsLength = tabColumns.length;
          for(var i=0; i<tabColumnsLength;i++){
            if(oJSONTableControls[2].substr(2,3) == "SHO")
              tabColumns[i].$().addClass("shortageSection");
            else if(oJSONTableControls[2].substr(2,3) == "SUR")
              tabColumns[i].$().addClass("surplusSection");
          }

          var selAllColId = "#" + oJSONTableControls[2] + "-selall";
          if(oJSONTableControls[2].substr(2,3) == "SHO")
            $(selAllColId).addClass("shortageSection");
          else if(oJSONTableControls[2].substr(2,3) == "SUR")
            $(selAllColId).addClass("surplusSection");

          }

          sap.ui.getCore().byId(oJSONTableControls[3]).onAfterRendering = function() {

          if (sap.ui.table.Table.prototype.onAfterRendering) {
            sap.ui.table.Table.prototype.onAfterRendering.apply(this, arguments);
          }

          var tabColumns = sap.ui.getCore().byId(oJSONTableControls[3]).getColumns();
          var tabColumnsLength = tabColumns.length;
          for(var i=0; i<tabColumnsLength;i++){
            if(oJSONTableControls[3].substr(2,3) == "SHO")
              tabColumns[i].$().addClass("shortageSection");
            else if(oJSONTableControls[3].substr(2,3) == "SUR")
              tabColumns[i].$().addClass("surplusSection");
          }

          var selAllColId = "#" + oJSONTableControls[3] + "-selall";
          if(oJSONTableControls[3].substr(2,3) == "SHO")
            $(selAllColId).addClass("shortageSection");
          else if(oJSONTableControls[3].substr(2,3) == "SUR")
            $(selAllColId).addClass("surplusSection");

          }

          sap.ui.getCore().byId(oJSONTableControls[4]).onAfterRendering = function() {

          if (sap.ui.table.Table.prototype.onAfterRendering) {
            sap.ui.table.Table.prototype.onAfterRendering.apply(this, arguments);
          }

          var tabColumns = sap.ui.getCore().byId(oJSONTableControls[4]).getColumns();
          var tabColumnsLength = tabColumns.length;
          for(var i=0; i<tabColumnsLength;i++){
            if(oJSONTableControls[4].substr(2,3) == "SHO")
              tabColumns[i].$().addClass("shortageSection");
            else if(oJSONTableControls[4].substr(2,3) == "SUR")
              tabColumns[i].$().addClass("surplusSection");
          }

          var selAllColId = "#" + oJSONTableControls[4] + "-selall";
          if(oJSONTableControls[4].substr(2,3) == "SHO")
            $(selAllColId).addClass("shortageSection");
          else if(oJSONTableControls[4].substr(2,3) == "SUR")
            $(selAllColId).addClass("surplusSection");

          }

          sap.ui.getCore().byId(oJSONTableControls[5]).onAfterRendering = function() {

          if (sap.ui.table.Table.prototype.onAfterRendering) {
            sap.ui.table.Table.prototype.onAfterRendering.apply(this, arguments);
          }

          var tabColumns = sap.ui.getCore().byId(oJSONTableControls[5]).getColumns();
          var tabColumnsLength = tabColumns.length;
          for(var i=0; i<tabColumnsLength;i++){
            if(oJSONTableControls[5].substr(2,3) == "SHO")
              tabColumns[i].$().addClass("shortageSection");
            else if(oJSONTableControls[5].substr(2,3) == "SUR")
              tabColumns[i].$().addClass("surplusSection");
          }

          var selAllColId = "#" + oJSONTableControls[5] + "-selall";
          if(oJSONTableControls[5].substr(2,3) == "SHO")
            $(selAllColId).addClass("shortageSection");
          else if(oJSONTableControls[5].substr(2,3) == "SUR")
            $(selAllColId).addClass("surplusSection");

          }


				}
			},
			function(err){
				sap.ui.getCore().byId("idPageMain").setBusy(false);
		  });

	},

	addRemoveSpecial : function(tableId, insdel){
		var oCurrent = this;

    if(insdel == "D"){
		var arraySelLines = sap.ui.getCore().byId(tableId).getSelectedIndices();
    if(tableId == "idSHORTAGESPECIALTable"){
    		for(var i=0; i<oJSONSurplusValues.length; i++){
    				var oDetData = sap.ui.getCore().byId(tableId).getContextByIndex(i);
    				if(oDetData != undefined){
    					var realPath = oDetData.getPath().split('/')[2];
    					if(arraySelLines.indexOf(i) != -1){
    						var Inregion = oJSONSHORTAGESpecialValues[realPath].region;
    						var Incountry = oJSONSHORTAGESpecialValues[realPath].country;
    						var Incity = oJSONSHORTAGESpecialValues[realPath].city;
    						var Inmatnr = oJSONSHORTAGESpecialValues[realPath].matnr;
    						var Inpart = sap.ui.getCore().byId("idSegmentedButtonLeaseSale").getSelectedKey();
    						var Inmatnr = sap.ui.getCore().byId("idSegmentedButtonBoxes").getSelectedKey();
    						var Insdel = insdel;	// Insert into block list
    					}
    				}
    		}
  }else if(tableId == "idSURPLUSSPECIALTable"){
      for(var i=0; i<oJSONSurplusValues.length; i++){
          var oDetData = sap.ui.getCore().byId(tableId).getContextByIndex(i);
          if(oDetData != undefined){
            var realPath = oDetData.getPath().split('/')[2];
            if(arraySelLines.indexOf(i) != -1){
              var Inregion = oJSONSURPLUSSpecialValues[realPath].region;
              var Incountry = oJSONSURPLUSSpecialValues[realPath].country;
              var Incity = oJSONSURPLUSSpecialValues[realPath].city;
              var Inmatnr = oJSONSURPLUSSpecialValues[realPath].matnr;
              var Inpart = sap.ui.getCore().byId("idSegmentedButtonLeaseSale").getSelectedKey();
              var Inmatnr = sap.ui.getCore().byId("idSegmentedButtonBoxes").getSelectedKey();

              var InShortageSurplus = "";
              var InAvlb = "";
              var InTarget = "";
              var InPortRating = "";
              var InIncentives = "";
              var InReason = "";
              var InQtymove = 0;

              var Insdel = insdel;	// Insert into block list
            }
          }
      }
  }
  }else if(insdel == "I"){

    var Inregion = sap.ui.getCore().byId("idSPECIALInputRegion").getValue();
    var Incountry = sap.ui.getCore().byId("idSPECIALComboCountry").getSelectedKey();
    var Incity = sap.ui.getCore().byId("idSPECIALComboCity").getSelectedKey();
    var Inmatnr = sap.ui.getCore().byId("idSegmentedButtonBoxes").getSelectedKey();
    var Inpart = sap.ui.getCore().byId("idSegmentedButtonLeaseSale").getSelectedKey();

    var InShortageSurplus = sap.ui.getCore().byId("idSPECIALInputShortageSurplus").getValue();
    var InAvlb = sap.ui.getCore().byId("idSPECIALInputAvlb").getValue();
    var InTarget = sap.ui.getCore().byId("idSPECIALInputTarget").getValue();
    var InPortRating = sap.ui.getCore().byId("idSPECIALInputPortRating").getValue();
    var InIncentives = sap.ui.getCore().byId("idSPECIALInputIncentives").getValue();
    InIncentives = encodeURIComponent(InIncentives);
    var InReason = sap.ui.getCore().byId("idSPECIALInputReason").getValue();
    InReason = encodeURIComponent(InReason);
    var InQtymove = sap.ui.getCore().byId("idSPECIALInputQtyMove").getValue();
    var Insdel = insdel;	// Insert into block list

  }

		//console.log(region, country, city, matnr, selProcess, matnr);

    if(sap.ui.getCore().byId("idSPECIALADDITIONDialog"))
		  sap.ui.getCore().byId("idSPECIALADDITIONDialog").setBusy(true);

		var blockOptionUrl = "/specialAddRemoveSet?$filter=" + "Inregion eq '" + Inregion + "' and "
												+ "Incountry eq '" + Incountry + "' and "
												+ "Incity eq '" + Incity + "' and "
												+ "Inmatnr eq '" + Inmatnr + "' and "
												+ "Inpart eq '" + Inpart + "' and "

                        // + "InShortageSurplus eq '" + InShortageSurplus + "' and "
                        // + "InAvlb eq '" + InAvlb + "' and "
                        // + "InTarget eq '" + InTarget + "' and "
                        // + "InPortRating eq '" + InPortRating + "' and "
                        + "Inincentives eq '" + InIncentives + "' and "
                        + "Inreason eq '" + InReason + "' and "
                        + "Inqtymove eq " + InQtymove + " and "
												+ "Insdel eq '" + Insdel
												+ "'";

		oModel = new sap.ui.model.odata.ODataModel(serviceTop10Url, true);
		OData.request({
		      requestUri: serviceTop10Url + blockOptionUrl,
		      method: "GET",
		      dataType: 'json',
		      headers:
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0",
		          "X-CSRF-Token":"Fetch"
		      }
		    },
		    function (data, response){
					if(data.results.length == 0){
			    		sap.ui.commons.MessageBox.show("Sorry, there is an error",
                    sap.ui.commons.MessageBox.Icon.ERROR,
                    "Error",
                    [sap.ui.commons.MessageBox.Action.OK],
                    sap.ui.commons.MessageBox.Action.OK);
                    if(sap.ui.getCore().byId("idSPECIALADDITIONDialog"))
                		  sap.ui.getCore().byId("idSPECIALADDITIONDialog").setBusy(true);
		    	}
				else{
					if(data.results[0].Results == "X"){
              if(insdel == "I")
                var resmessage = "Added";
              else if(insdel == "D")
                var resmessage = "Deleted";
			    		sap.ui.commons.MessageBox.show(resmessage,
                    sap.ui.commons.MessageBox.Icon.SUCCESS,
                    "Success",
                    [sap.ui.commons.MessageBox.Action.OK],
                    sap.ui.commons.MessageBox.Action.OK);
										oCurrent.setValuesShortageSurplus(sap.ui.getCore().byId("idSegmentedButtonLeaseSale").getSelectedKey(),
											sap.ui.getCore().byId("idSegmentedButtonBoxes").getSelectedKey());
                      sap.ui.getCore().byId("idSPECIALADDITIONDialog").close();
		    	}else{
						sap.ui.commons.MessageBox.show("Sorry, there is an error",
									sap.ui.commons.MessageBox.Icon.ERROR,
									"Error",
									[sap.ui.commons.MessageBox.Action.OK],
									sap.ui.commons.MessageBox.Action.OK);
					}

          if(sap.ui.getCore().byId("idSPECIALADDITIONDialog"))
            sap.ui.getCore().byId("idSPECIALADDITIONDialog").setBusy(false);
				}
			},
			function(err){
        if(sap.ui.getCore().byId("idSPECIALADDITIONDialog"))
    		  sap.ui.getCore().byId("idSPECIALADDITIONDialog").setBusy(false);
		  });

	},

	hideEnableLocation : function(tableId, insdel){
		var oCurrent = this;
		var arraySelLines = sap.ui.getCore().byId(tableId).getSelectedIndices();
		if(tableId == "idSURPLUSTable"){
		for(var i=0; i<oJSONSurplusValues.length; i++){
				var oDetData = sap.ui.getCore().byId(tableId).getContextByIndex(i);
				if(oDetData != undefined){
					var realPath = oDetData.getPath().split('/')[2];
					if(arraySelLines.indexOf(i) != -1){
						var Inregion = oJSONSurplusValues[realPath].region;
						var Incountry = oJSONSurplusValues[realPath].country;
						var Incity = oJSONSurplusValues[realPath].city;
						var Inmatnr = oJSONSurplusValues[realPath].matnr;
            var InShortageSurplus = oJSONSurplusValues[realPath].surplusshortage;
            var Inmaxpucr = oJSONSurplusValues[realPath].maxpucr;
						var Inpart = sap.ui.getCore().byId("idSegmentedButtonLeaseSale").getSelectedKey();
						var Inmatnr = sap.ui.getCore().byId("idSegmentedButtonBoxes").getSelectedKey();
						var Insdel = insdel;	// Insert into block list
					}
				}
		}
	}else if(tableId == "idSHORTAGETable"){
	for(var i=0; i<oJSONShortageValues.length; i++){
			var oDetData = sap.ui.getCore().byId(tableId).getContextByIndex(i);
			if(oDetData != undefined){
				var realPath = oDetData.getPath().split('/')[2];
				if(arraySelLines.indexOf(i) != -1){
					var Inregion = oJSONShortageValues[realPath].region;
					var Incountry = oJSONShortageValues[realPath].country;
					var Incity = oJSONShortageValues[realPath].city;
					var Inmatnr = oJSONShortageValues[realPath].matnr;
          var InShortageSurplus = oJSONShortageValues[realPath].surplusshortage;
          var Inmaxpucr = oJSONShortageValues[realPath].maxpucr;
					var Inpart = sap.ui.getCore().byId("idSegmentedButtonLeaseSale").getSelectedKey();
					var Inmatnr = sap.ui.getCore().byId("idSegmentedButtonBoxes").getSelectedKey();
					var Insdel = insdel;	// Insert into block list
				}
			}
	}
}else if(tableId == "idSURPLUSTableBlock"){
for(var i=0; i<oJSONSurplusBlockValues.length; i++){
		var oDetData = sap.ui.getCore().byId(tableId).getContextByIndex(i);
		if(oDetData != undefined){
			var realPath = oDetData.getPath().split('/')[2];
			if(arraySelLines.indexOf(i) != -1){
				var Inregion = oJSONSurplusBlockValues[realPath].region;
				var Incountry = oJSONSurplusBlockValues[realPath].country;
				var Incity = oJSONSurplusBlockValues[realPath].city;
				var Inmatnr = oJSONSurplusBlockValues[realPath].matnr;
        var InShortageSurplus = oJSONSurplusValues[realPath].surplusshortage;
				var Inpart = sap.ui.getCore().byId("idSegmentedButtonLeaseSale").getSelectedKey();
				var Inmatnr = sap.ui.getCore().byId("idSegmentedButtonBoxes").getSelectedKey();
				var Insdel = insdel;	// Insert into block list
			}
		}
}
}else if(tableId == "idSHORTAGETableBlock"){
for(var i=0; i<oJSONShortageBlockValues.length; i++){
		var oDetData = sap.ui.getCore().byId(tableId).getContextByIndex(i);
		if(oDetData != undefined){
			var realPath = oDetData.getPath().split('/')[2];
			if(arraySelLines.indexOf(i) != -1){
				var Inregion = oJSONShortageBlockValues[realPath].region;
				var Incountry = oJSONShortageBlockValues[realPath].country;
				var Incity = oJSONShortageBlockValues[realPath].city;
				var Inmatnr = oJSONShortageBlockValues[realPath].matnr;
        var InShortageSurplus = oJSONSurplusValues[realPath].surplusshortage;
				var Inpart = sap.ui.getCore().byId("idSegmentedButtonLeaseSale").getSelectedKey();
				var Inmatnr = sap.ui.getCore().byId("idSegmentedButtonBoxes").getSelectedKey();
				var Insdel = insdel;	// Insert into block list
			}
		}
}
}
		//console.log(region, country, city, matnr, selProcess, matnr);

		sap.ui.getCore().byId("idPageMain").setBusy(true);

		var blockOptionUrl = "/blockSet?$filter=" + "Inregion eq '" + Inregion + "' and "
												+ "Incountry eq '" + Incountry + "' and "
												+ "Incity eq '" + Incity + "' and "
												+ "Inmatnr eq '" + Inmatnr + "' and "
												+ "Inmaxpucr eq " + Inmaxpucr + " and "
												+ "Inpart eq '" + Inpart + "' and "
												+ "Inshortagesurplus eq " + InShortageSurplus + " and "
												+ "Insdel eq '" + Insdel
												+ "'";

		oModel = new sap.ui.model.odata.ODataModel(serviceTop10Url, true);
		OData.request({
		      requestUri: serviceTop10Url + blockOptionUrl,
		      method: "GET",
		      dataType: 'json',
		      headers:
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0",
		          "X-CSRF-Token":"Fetch"
		      }
		    },
		    function (data, response){
					if(data.results.length == 0){
			    		sap.ui.commons.MessageBox.show("Sorry, there is an error",
                    sap.ui.commons.MessageBox.Icon.ERROR,
                    "Error",
                    [sap.ui.commons.MessageBox.Action.OK],
                    sap.ui.commons.MessageBox.Action.OK);
					  sap.ui.getCore().byId("idPageMain").setBusy(false);
		    	}
				else{
					if(data.results[0].Results == "X"){
			    		sap.ui.commons.MessageBox.show("Updated",
                    sap.ui.commons.MessageBox.Icon.SUCCESS,
                    "Success",
                    [sap.ui.commons.MessageBox.Action.OK],
                    sap.ui.commons.MessageBox.Action.OK);
										oCurrent.setValuesShortageSurplus(sap.ui.getCore().byId("idSegmentedButtonLeaseSale").getSelectedKey(),
											sap.ui.getCore().byId("idSegmentedButtonBoxes").getSelectedKey());
		    	}else{
						sap.ui.commons.MessageBox.show("Sorry, there is an error",
									sap.ui.commons.MessageBox.Icon.ERROR,
									"Error",
									[sap.ui.commons.MessageBox.Action.OK],
									sap.ui.commons.MessageBox.Action.OK);
									sap.ui.getCore().byId("idPageMain").setBusy(false);
					}


				}
			},
			function(err){
				sap.ui.getCore().byId("idPageMain").setBusy(false);
		  });

	}
});
