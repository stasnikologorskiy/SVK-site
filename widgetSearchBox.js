$( function() {

    $.widget( "custom.searchBox", {
      _create: function() {
        this.wrapper = $( "<span>" )
          .addClass( "search-form" )
          .insertAfter( this.element );

        this.element.hide();
        this._createAutocomplete();
        this._createShowAllButton();
		//console.log($(this).attr("class"));
      },

      _createAutocomplete: function() {
        var selected = this.element.children( ":selected" ),
          value = selected.val() ? selected.text() : "";
          //console.log(value); 
		  //.attr( "title", "Введите название товара" )
        this.input = $( "<input>" )
          .appendTo( this.wrapper )
          .val( value )
          .attr( "placeholder", "Поиск товара" )
          .attr( "type", "text" )
		  .attr( "id", this.element.attr("_id"))
		  //.attr( "id", "waresearch" )
          .addClass( "input-field" )
          .autocomplete({
            delay: 0,
            minLength: 0,
            source: $.proxy( this, "_source" )
          })
		  .on( "focus", function() {
		    waresearchfocus(this);
          })
		  .on( "blur", function() {
		    waresearchblur(this);
          }); 

        
		this._on( this.input, {
          autocompleteselect: function( event, ui ) {
		    //console.log(ui.item.option);
			//ws();
            //ui.item.option.selected = true;
            this._trigger( "select", event, {
              //item: ui.item.option
            });
          },

          autocompletechange: "_removeIfInvalid"
        });
      },

      _createShowAllButton: function() {
        var input = this.input,
          wasOpen = false;
    // arrow btn
        $( "<a>" )
          .attr( "tabIndex", -1 )
          //.attr( "title", "Последние поисковые запросы по товарам" )
          .appendTo( this.wrapper )
          // .button({
          //   icons: {
          //     primary: "ui-icon-triangle-1-s"
          //   },
          //   text: false
          // })
          // .removeClass( "ui-corner-all" )
          .addClass( "arrow" )
          .on( "mousedown", function() {
            wasOpen = input.autocomplete( "widget" ).is( ":visible" );
          })
          .on( "click", function() {
            // input.trigger( "focus" );

            // Close if already visible
            if ( wasOpen ) {
              return;
            }

            // Pass empty string as value to search for, displaying all results
            input.autocomplete( "search", "" );
          });
    // magnifier btn
        $( "<a>" )
            .attr( "tabIndex", -2 )
            .attr( "title", "Поиск товара" )
            .appendTo( this.wrapper )
            .removeClass( "ui-corner-all" )
            .addClass( "magnifier" )
            .on( "click", function() {
              // input.trigger( "focus" );

              // Close if already visible
              // if ( wasOpen ) {
              //   return;
              // }
			  ws();
              //console.log("make api request!!!");
              // Pass empty string as value to search for, displaying all results
              // input.autocomplete( "search", "" );
            });

      },

      _source: function( request, response ) {
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
        response( this.element.children( "option" ).map(function() {
          var text = $( this ).text();
          if ( this.value && ( !request.term || matcher.test(text) ) )
            return {
              label: text,
              value: text,
              option: this
            };
        }) );
      },

      _removeIfInvalid: function( event, ui ) {

        // Selected an item, nothing to do
        if ( ui.item ) {
          return;
        }

        // Search for a match (case-insensitive)
        var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
        this.element.children( "option" ).each(function() {
          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
            this.selected = valid = true;
            return false;
          }
        });

        // Found a match, nothing to do
        if ( valid ) {
          return;
        }

        // Remove invalid value
        /*this.input
          .val( "" )
          .attr( "title", value + " ничего не найдено" )
          .tooltip( "open" );
        this.element.val( "" );
        this._delay(function() {
          this.input.tooltip( "close" ).attr( "title", "" );
        }, 2500 );
        this.input.autocomplete( "instance" ).term = "";*/
      },

      _destroy: function() {
        this.wrapper.remove();
        this.element.show();
      }
    });

    $('#main-search-input').searchBox();
	searchautocompleteinit("#waresearch, #vinsearch");
    savesearchhistory("#waresearch", "", "waresearchhistory", 20);
	/*$('#waresearch').bind('focus', function(event) {
            console.log('gfsadgsdg');
          });
	$('#waresearch').bind('blur', function(event) {
            console.log('1111111');
          });*/	  
  });
