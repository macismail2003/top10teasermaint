sap.ui.model.json.JSONModel.extend("specialaddition", {

  openAdditionPopup : function(tableId, insdel){

    var oCurrent = this;

    /* Region */

    if(sap.ui.getCore().byId("idSPECIALInputRegion") != undefined)
       sap.ui.getCore().byId("idSPECIALInputRegion").destroy();

    var oSPECIALInputRegion = new sap.m.Input("idSPECIALInputRegion",{
                                 visible: true,
                                 width:"150px",
                                 enabled:false
              });

   var oSPECIALLabelRegion = new sap.m.Label({
      text : "Region : ",
      labelFor: oSPECIALInputRegion,
      width : "300px"
    }).addStyleClass("selectionLabelsLabel");

   var oSPECIALFlexRegion = new sap.m.FlexBox({
                             items: [oSPECIALLabelRegion,
                                     oSPECIALInputRegion
                                     ],
                             direction: "Row"
                             });

    /* Country */
    if(sap.ui.getCore().byId("idSPECIALComboCountry") != undefined)
       sap.ui.getCore().byId("idSPECIALComboCountry").destroy();
    var oSPECIALComboCountry = new sap.m.ComboBox("idSPECIALComboCountry",{
                                 visible: true,
                                 width:"150px",
                                 displaySecondaryValues:true,
                                 placeholder: "Country",
                                 change: function(evnt){
                                 //oCurrent.resetCSOLines(true);
                                 // if(this.getValue() != '')
                                 // {
                                 //   var customer = this.getSelectedKey();
                                 //   this.setSelectedKey(customer);
                                 // }
                                 },
                                 selectionChange: function(evnt){
                                  var filteredCity = [];
                                   for(var j=0; j < locationArray.length; j++){
                        							if(this.getValue() == locationArray[j].Country){
                        								filteredCity.push({"text":locationArray[j].City,"key":locationArray[j].City});
                        							}
                        						}

                                    // Remove Duplicates

                                  var arr = {};

                                  for ( var i=0, len=filteredCity.length; i < len; i++ )
                                      arr[filteredCity[i]['text']] = filteredCity[i];

                                  filteredCity = [];
                                  filteredCity.push({"text":"","key":""});
                                  for ( var key in arr )
                                    filteredCity.push(arr[key]);
                                  filteredCity.sort(sort_by('text', false, function(a){return a.toUpperCase()}));

                                   var oModelF4City = new sap.ui.model.json.JSONModel();
                                   oModelF4City.setSizeLimit(99999);
                                   oModelF4City.setData({data:filteredCity});

                                   var oSPECIALComboCity = new sap.ui.getCore().byId("idSPECIALComboCity");
                                   oSPECIALComboCity.setModel(oModelF4City);
                                   oSPECIALComboCity.setSelectedKey(filteredCity[0].key);
                                   oSPECIALComboCity.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));
                                   oSPECIALComboCity.setEnabled(true);

                                   var filteredRegion = [];

                                    for(var j=0; j < locationArray.length; j++){
                         							if(this.getValue() == locationArray[j].Country){
                         								filteredRegion.push({"text":locationArray[j].Region,"key":locationArray[j].Region});
                                        break;
                         							}
                         						}

                                    sap.ui.getCore().byId("idSPECIALInputRegion").setValue(filteredRegion[0].text);

                                    //oCurrent.getTargetValues(tableId, insdel);

                                 },
              });

  var oSPECIALLabelCountry = new sap.m.Label({
      text : "Country : ",
      labelFor: oSPECIALComboCountry,
      width : "300px"
    }).addStyleClass("selectionLabelsLabel");

  var oSPECIALFlexCountry = new sap.m.FlexBox({
                                                 items: [oSPECIALLabelCountry,
                                                         oSPECIALComboCountry
                                                         ],
                                                 direction: "Row"
                                                 });

   /* City */
   if(sap.ui.getCore().byId("idSPECIALComboCity") != undefined)
      sap.ui.getCore().byId("idSPECIALComboCity").destroy();
   var oSPECIALComboCity = new sap.m.ComboBox("idSPECIALComboCity",{
                                visible: true,
                                width:"150px",
                                enabled:false,
                                displaySecondaryValues:true,
                                placeholder: "City",
                                // change: function(evnt){
                                // //oCurrent.resetCSOLines(true);
                                // if(this.getValue() != '')
                                // {
                                //   var customer = this.getSelectedKey();
                                //   this.setSelectedKey(customer);
                                // }
                                // },
                                selectionChange: function(evnt){
                                  oCurrent.getTargetValues(tableId, insdel);
                                },

             });

  var oSPECIALLabelCity = new sap.m.Label({
     text : "City : ",
     labelFor: oSPECIALComboCity,
     width : "300px"
   }).addStyleClass("selectionLabelsLabel");

  var oSPECIALFlexCity = new sap.m.FlexBox({
                            items: [oSPECIALLabelCity,
                                    oSPECIALComboCity
                                    ],
                            direction: "Row"
                            });

    /* Shortage/Surplus */
    if(sap.ui.getCore().byId("idSPECIALInputShortageSurplus") != undefined)
       sap.ui.getCore().byId("idSPECIALInputShortageSurplus").destroy();
    var oSPECIALInputShortageSurplus = new sap.m.Input("idSPECIALInputShortageSurplus",{
                                 visible: true,
                                 width:"150px",
                                 enabled : false
              });

    var oSPECIALLabelShortageSurplus = new sap.m.Label({
      text : "Shortage/Surplus : ",
      labelFor: oSPECIALInputShortageSurplus,
      width : "300px"
    }).addStyleClass("selectionLabelsLabel");

    var oSPECIALFlexShortageSurplus = new sap.m.FlexBox({
                             visible : false,
                             items: [oSPECIALLabelShortageSurplus,
                                     oSPECIALInputShortageSurplus
                                     ],
                             direction: "Row"
                             });

   /* AVLB + AUTH - Booked */
   if(sap.ui.getCore().byId("idSPECIALInputAvlb") != undefined)
      sap.ui.getCore().byId("idSPECIALInputAvlb").destroy();
   var oSPECIALInputAvlb = new sap.m.Input("idSPECIALInputAvlb",{
                                visible: true,
                                width:"150px",
                                enabled : false
             });

   var oSPECIALLabelAvlb = new sap.m.Label({
     text : "AVLB + AUTH - Booked : ",
     labelFor: oSPECIALInputAvlb,
     width : "300px"
   }).addStyleClass("selectionLabelsLabel");

   var oSPECIALFlexAvlb = new sap.m.FlexBox({
                            items: [oSPECIALLabelAvlb,
                                    oSPECIALInputAvlb
                                    ],
                            direction: "Row"
                            });

  /* Average In Days */
                            if(sap.ui.getCore().byId("idSPECIALInputAvgInDays") != undefined)
                               sap.ui.getCore().byId("idSPECIALInputAvgInDays").destroy();
                            var oSPECIALInputAvgInDays = new sap.m.Input("idSPECIALInputAvgInDays",{
                                                         visible: true,
                                                         width:"150px",
                                                         enabled : false
                                      });

                            var oSPECIALLabelAvgInDays = new sap.m.Label({
                              text : "Avg. In Days : ",
                              labelFor: oSPECIALInputAvgInDays,
                              width : "300px"
                            }).addStyleClass("selectionLabelsLabel");

                            var oSPECIALFlexAvgInDays = new sap.m.FlexBox({
                                                     items: [oSPECIALLabelAvgInDays,
                                                             oSPECIALInputAvgInDays
                                                             ],
                                                     direction: "Row"
                                                     });


      /* Target Inv */
      if(sap.ui.getCore().byId("idSPECIALInputTarget") != undefined)
         sap.ui.getCore().byId("idSPECIALInputTarget").destroy();
      var oSPECIALInputTarget = new sap.m.Input("idSPECIALInputTarget",{
                                   visible: true,
                                   width:"150px",
                                   enabled : false
                });

      var oSPECIALLabelTarget = new sap.m.Label({
        text : "Target Inv. : ",
        labelFor: oSPECIALInputTarget,
        width : "300px"
      }).addStyleClass("selectionLabelsLabel");

      var oSPECIALFlexTarget = new sap.m.FlexBox({
                               items: [oSPECIALLabelTarget,
                                       oSPECIALInputTarget
                                       ],
                               direction: "Row"
                               });

         /* Port Rating */
         if(sap.ui.getCore().byId("idSPECIALInputPortRating") != undefined)
            sap.ui.getCore().byId("idSPECIALInputPortRating").destroy();
         var oSPECIALInputPortRating = new sap.m.Input("idSPECIALInputPortRating",{
                                      visible: true,
                                      width:"150px",
                                      enabled : false
                   });

         var oSPECIALLabelPortRating = new sap.m.Label({
           text : "Port Rating : ",
           labelFor: oSPECIALInputPortRating,
           width : "300px"
         }).addStyleClass("selectionLabelsLabel");

         var oSPECIALFlexPortRating = new sap.m.FlexBox({
                                  items: [oSPECIALLabelPortRating,
                                          oSPECIALInputPortRating
                                          ],
                                  direction: "Row"
                                  });

        /* Shortage/Surplus */
        if(sap.ui.getCore().byId("idSPECIALInputQtyMove") != undefined)
           sap.ui.getCore().byId("idSPECIALInputQtyMove").destroy();
        var oSPECIALInputQtyMove = new sap.m.Input("idSPECIALInputQtyMove",{
                                     visible: true,
                                     width:"150px",
                                     enabled : true
                  });

        var oSPECIALLabelQtyMove = new sap.m.Label({
          text : "Quantity to Move : ",
          labelFor: oSPECIALInputShortageSurplus,
          width : "300px"
        }).addStyleClass("selectionLabelsLabel");

        var oSPECIALFlexQtyMove = new sap.m.FlexBox({
                                 visible : true,
                                 items: [oSPECIALLabelQtyMove,
                                         oSPECIALInputQtyMove
                                         ],
                                 direction: "Row"
                                 });

        /* Incentives  */
        if(sap.ui.getCore().byId("idSPECIALInputIncentives") != undefined)
           sap.ui.getCore().byId("idSPECIALInputIncentives").destroy();
        var oSPECIALInputIncentives = new sap.m.Input("idSPECIALInputIncentives",{
                                     visible: true,
                                     width:"300px",
                                     enabled : true,
                                     //type : sap.m.InputType.Number
                  });

        var oSPECIALLabelIncentives = new sap.m.Label({
          text : "Max/Min Incentives to be offered : ",
          labelFor: oSPECIALInputIncentives,
          width : "300px"
        }).addStyleClass("selectionLabelsLabel");

        var oSPECIALFlexIncentives = new sap.m.FlexBox({
                                 items: [oSPECIALLabelIncentives,
                                         oSPECIALInputIncentives
                                         ],
                                 direction: "Row"
                                 });

         /* Reason  */
         if(sap.ui.getCore().byId("idSPECIALInputReason") != undefined)
            sap.ui.getCore().byId("idSPECIALInputReason").destroy();
         var oSPECIALInputReason = new sap.m.Input("idSPECIALInputReason",{
                                      visible: true,
                                      width:"300px",
                                      enabled : true
                   });

         var oSPECIALLabelReason = new sap.m.Label({
           text : "Comment : ",
           labelFor: oSPECIALInputReason,
           width : "300px"
         }).addStyleClass("selectionLabelsLabel");

         var oSPECIALFlexReason = new sap.m.FlexBox({
                                  items: [oSPECIALLabelReason,
                                          oSPECIALInputReason
                                          ],
                                  direction: "Row"
                                  });

      var oSPECIALFlexFinal = new sap.m.FlexBox({
          items: [oSPECIALFlexRegion,
                  oSPECIALFlexCountry,
                  oSPECIALFlexCity,
                  oSPECIALFlexShortageSurplus,
                  oSPECIALFlexTarget,
                  oSPECIALFlexAvlb,
                  oSPECIALFlexAvgInDays,
                  oSPECIALFlexTarget,
                  oSPECIALFlexPortRating,
                  oSPECIALFlexQtyMove,
                  oSPECIALFlexIncentives,
                  oSPECIALFlexIncentives,
                  oSPECIALFlexReason
                  ],
          direction: "Column"
          });


  oCurrent.getF4Values();

  return oSPECIALFlexFinal;
  },

  getF4Values : function(){
    oJSONF4Values = [];
    oJSONF4Values.location =[];
    oJSONF4Values.country =[];
    oJSONF4Values.region =[];
    oJSONF4Values.type =[];
    oJSONF4Values.cate =[];
		var urlToCallRemark = '/sap/opu/odata/sap/ZUTIL_ERP_SRV' + '/ddlentriesSet/';
			     oModel = new sap.ui.model.odata.ODataModel('/sap/opu/odata/sap/ZUTIL_ERP_SRV', true);
		         OData.request({
		           requestUri: urlToCallRemark,
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
		         function (resultdata, response){
		        	 for(var i =0; i < resultdata.results.length; i++){
		        		 if(resultdata.results[i].Types == 'CITY'){
		        			 oJSONF4Values.location.push({
		            			"text":resultdata.results[i].Value,
		            			"key":resultdata.results[i].Value
		            		});
		        		 }
		        		 else if(resultdata.results[i].Types == 'COUNTRY'){{
		        			 oJSONF4Values.country.push({
		             			"text":resultdata.results[i].Value,
		             			"key":resultdata.results[i].Value
		             		});
		        		 }
		        		 }
		        		 else if(resultdata.results[i].Types == 'REGION'){{
		        			 oJSONF4Values.region.push({
		             			"text":resultdata.results[i].Value,
		             			"key":resultdata.results[i].Value
		             		});
		        		 }
		        		 }
		        		 else if(resultdata.results[i].Types == 'TYPE'){{
		        			 oJSONF4Values.type.push({
		             			"text":resultdata.results[i].Value,
		             			"key":resultdata.results[i].Value
		             		});
		        		 }
		        		 }
		        		 else if(resultdata.results[i].Types == 'CATE'){{
		        			 oJSONF4Values.cate.push({
		             			"text":resultdata.results[i].Value,
		             			"key":resultdata.results[i].Value
		             		});
		        		 }
		        		 }
		        		 else if(resultdata.results[i].Types == 'LOCALL'){{
		        			 locationData.push({
		             			"value":resultdata.results[i].Value,
		             		});
		        		 }
		        		 }
		        		 else if(resultdata.results[i].Types == 'PROALL'){{
		        			 productData.push({
		        				 "value":resultdata.results[i].Value,
		             		});
		        		 }
		        		 }
		        	 }
		        	 var splitValues = [];
		        	 for(var i =0; i < locationData.length; i++){
		        		 splitValues = locationData[i].value.split('$');
		        		 locationArray.push({
		        			 "Region" : splitValues[0],
		        			 "Country" : splitValues[1],
		        			 "City" : splitValues[2],
		        		 });
		        	 }
		        	 locationFullArray = locationArray;
		        	 for(var i =0; i < productData.length; i++){
		        		 splitValues = productData[i].value.split('$');
		        		 productArray.push({
		        			 "Cate" : splitValues[0],
		        			 "Type" : splitValues[1]
		        		 });
		        	 }
		        	 productFullArray = productArray;
		        	oModelF4Values.setSizeLimit(9999);
		        	oModelF4Values.updateBindings();

							var oModelF4Country = new sap.ui.model.json.JSONModel();
							oModelF4Country.setSizeLimit(99999);
							oModelF4Country.setData({data:oJSONF4Values.country});

							var oSPECIALComboCountry = new sap.ui.getCore().byId("idSPECIALComboCountry");
							oSPECIALComboCountry.setModel(oModelF4Country);
							oSPECIALComboCountry.setSelectedKey(oJSONF4Values.country[0].key);
							oSPECIALComboCountry.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));


              var oModelF4City = new sap.ui.model.json.JSONModel();
              oModelF4City.setSizeLimit(99999);
              oModelF4City.setData({data:oJSONF4Values.location});

              var oSPECIALComboCity = new sap.ui.getCore().byId("idSPECIALComboCity");
              oSPECIALComboCity.setModel(oModelF4City);
              oSPECIALComboCity.setSelectedKey(oJSONF4Values.location[0].key);
              oSPECIALComboCity.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));

		         },
		         function(err){
		                errorfunc(err);
		         });

	},

  addRemoveSpecial : function(tableId, insdel){
		var oCurrent = this;

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
    var InReason = sap.ui.getCore().byId("idSPECIALInputReason").getValue();

    var InQtymove = sap.ui.getCore().byId("idSPECIALInputQtyMove").getValue();

		var Insdel = insdel;	// Insert into block list

		//console.log(region, country, city, matnr, selProcess, matnr);

		sap.ui.getCore().byId("idPageMain").setBusy(true);

		var blockOptionUrl = "/specialAddRemoveSet?$filter=" + "Inregion eq '" + Inregion + "' and "
												+ "Incountry eq '" + Incountry + "' and "
												+ "Incity eq '" + Incity + "' and "
												+ "Inmatnr eq '" + Inmatnr + "' and "
												+ "Inpart eq '" + Inpart + "' and "

                        + "InShortageSurplus eq '" + InShortageSurplus + "' and "
                        + "InAvlb eq '" + InAvlb + "' and "
                        + "InTarget eq '" + InTarget + "' and "
                        + "InPortRating eq '" + InPortRating + "' and "
                        + "InIncentives eq '" + InIncentives + "' and "
                        + "InReason eq '" + InReason + "' and "
                        + "InQtymove eq " + InQtymove + " and "

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
                    sap.ui.commons.MessageBox.Icon.WARNING,
                    "Warning",
                    [sap.ui.commons.MessageBox.Action.OK],
                    sap.ui.commons.MessageBox.Action.OK);
					  sap.ui.getCore().byId("idPageMain").setBusy(false);
		    	}
				else{
					if(data.results[0].Results == "X"){
			    		sap.ui.commons.MessageBox.show("Added",
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

	},

  getTargetValues : function(tableId, insdel ){

    sap.ui.getCore().byId("idSPECIALInputShortageSurplus").setValue("");
    sap.ui.getCore().byId("idSPECIALInputAvlb").setValue("");
    sap.ui.getCore().byId("idSPECIALInputAvgInDays").setValue("");
    sap.ui.getCore().byId("idSPECIALInputTarget").setValue("");
    sap.ui.getCore().byId("idSPECIALInputPortRating").setValue("");
    sap.ui.getCore().byId("idSPECIALInputIncentives").setValue("");
    sap.ui.getCore().byId("idSPECIALInputReason").setValue("");

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
    var InReason = sap.ui.getCore().byId("idSPECIALInputReason").getValue();

    var getTargetUrl = "/getTargetValuesSet?$filter="
                        //+ "Inregion eq '" + Inregion + "' and "
                        + "Incountry eq '" + Incountry + "' and "
                        + "Incity eq '" + Incity + "' and "
                        + "Inmatnr eq '" + Inmatnr + "' and "
                        + "Inpart eq '" + Inpart
                        + "'";
                        sap.ui.getCore().byId("idSPECIALADDITIONDialog").setBusy(true);
    oModel = new sap.ui.model.odata.ODataModel(serviceTop10Url, true);
    OData.request({
          requestUri: serviceTop10Url + getTargetUrl,
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
          sap.ui.getCore().byId("idSPECIALADDITIONDialog").setBusy(false);
          if(data.results.length == 0){

          }
        else{
          sap.ui.getCore().byId("idSPECIALInputShortageSurplus").setValue(data.results[0].Odi);
          sap.ui.getCore().byId("idSPECIALInputAvlb").setValue(data.results[0].Avlb);
          sap.ui.getCore().byId("idSPECIALInputAvgInDays").setValue(data.results[0].Indaysavg);
          sap.ui.getCore().byId("idSPECIALInputTarget").setValue(data.results[0].Tdi);
          sap.ui.getCore().byId("idSPECIALInputPortRating").setValue(data.results[0].Por);
          sap.ui.getCore().byId("idSPECIALInputIncentives").setValue(data.results[0].Incentives);
          sap.ui.getCore().byId("idSPECIALInputReason").setValue(data.results[0].Reason);
          sap.ui.getCore().byId("idSPECIALInputQtyMove").setValue(data.results[0].Qtymove);
        }
      },
      function(err){
        sap.ui.commons.MessageBox.show("Sorry, there is an error",
              sap.ui.commons.MessageBox.Icon.WARNING,
              "Warning",
              [sap.ui.commons.MessageBox.Action.OK],
              sap.ui.commons.MessageBox.Action.OK);
        sap.ui.getCore().byId("idSPECIALADDITIONDialog").setBusy(false);
      });

  }

});

function sort_by(field, reverse, primer){

	   var key = primer ?
	       function(x) {return primer(x[field])} :
	       function(x) {return x[field]};

	   reverse = !reverse ? 1 : -1;

	   return function (a, b) {
	       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
	     }
	}
