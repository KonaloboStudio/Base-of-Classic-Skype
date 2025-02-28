SKYPE.namespace("prices");


SKYPE.prices.CountryFilter = function () {
	$(document).ready(function(){
		$("#currencyChangeSubmit").hide();
		
		var _showRowsForCountry = function(cc) {
			
			// if there is view all rates mode enabled, hide all these rates
			var $viewAllStateRates = $("#ratesListWrapper").find(".viewAllState");
			$viewAllStateRates.removeClass("viewAllState");
			$viewAllStateRates.addClass("jsHidden");
			
			var ccRow = "tr."+cc;
			
			$("table.ratesTable tr").addClass("jsHidden");
			
			$("#ratesListWrapper").removeClass("jsHidden");
			
			$("table.ratesTable "+ccRow).each(function(){
				$(this).removeClass("jsHidden");
				
				// make its table head visible
				var $thead = $(this).closest("table").find("thead");
				$thead.removeClass("jsHidden");
				$thead.find("tr").removeClass("jsHidden");
			});

			_toggleUpSell(0);
		};
		
		var _toggleUpSell = function(state) {
			if (state) {
				$("div.upSell").show();
			} else {
				$("div.upSell").hide();
			}
		};
		
		var _viewAllRates = function() {
			window.location.hash = "#viewAllRates";
			$("#ratesListWrapper").removeClass("jsHidden");
			var $hiddenRates = $("#ratesListWrapper").find(".jsHidden");
			$hiddenRates.addClass("viewAllState");
			$hiddenRates.removeClass("jsHidden");
			
			// hide the country specific best rate header
			$("#ratesHeader").removeClass("jsVisible");
			$("#ratesHeader").hide();
		};
		
		var _setFilteredCountry = function(cc) {
			var name = $("div.quickFilter select.quickList option[value='"+cc+"']").text();
			$("#quickFilterInput").removeClass('grayOut').val(name);
			$("div.quickFilter a.clear").show();
		};
		
		var _changeBestPrice = function(cc) {
			if ($("#bestPrice").length > 0) {
				$countryFlag = $("#bestPrice").find("img.countryFlag");
				if ($countryFlag.length > 0) {
					var flagMissing = {"VO": "iNum"};
					
					if ($countryFlag.data('originalFlagSource')) {
						var originalFlagSource = $countryFlag.data('originalFlagSource');
					} else {
						var originalFlagSource = $countryFlag.attr("src");
						$countryFlag.data('originalFlagSource', originalFlagSource);
					}
					
					var flagFile = cc;
					if (cc in flagMissing) {
						flagFile = 'undefined';
					}
					var newFlagSource = originalFlagSource.substr(0, originalFlagSource.length - 6) + flagFile + ".png";
					$countryFlag.attr("src", newFlagSource);
				}
				if ($("#ratesList").find("tr."+cc).length > 0) {
					var $cheapestRow = $("#ratesList").find("tr."+cc+".lowest:first");
					if ($cheapestRow.length <= 0) {
						$cheapestRow = $("#ratesList").find("tr."+cc+":first");
					}
					var description, price, priceVat = "...";
					if ($cheapestRow.find("td.description a").length > 0 && $cheapestRow.find("td.description a").html().length > 0) {
						description = $cheapestRow.find("td.description a").html();
					} else if ($cheapestRow.find("td.description").length > 0 && $cheapestRow.find("td.description").html().length > 0) {
						description = $cheapestRow.find("td.description").html();
					} else {
						description = "...";
					}
					if ($cheapestRow.find("td.price").html().length > 0) {
						price = $cheapestRow.find("td.price").html();
					}
					if ($cheapestRow.find("td.price").html().length > 0) {
						priceVat = $cheapestRow.find("td.priceVat").html();
					}
					$("#bestPrice").find(".destination").html(description);
					$("#bestPrice").find(".price").html(price);
					$("#bestPrice").find(".priceVat").html(priceVat);
					$("#ratesHeader").show();
				}
			}
		};
		
		if ($("input.quickFilterInput").length > 0 && $("select.quickList option").length > 0) {
			SKYPE.helpers.quickFilter.apply($("div.quickFilter"), function(event, data, formatted, resultCountryCode) {
				if (data) {
					var ccParamMatch = window.location.href.match(/country=([A-Z]{2})/i);
					if (ccParamMatch && ccParamMatch.length > 0) {
						window.location.href = window.location.href.split("?")[0] + "#cc=" + resultCountryCode;
					}
					window.location.hash = "cc=" + resultCountryCode;
				
					_showRowsForCountry(resultCountryCode);
					_changeBestPrice(resultCountryCode);
				}
			});
		}

		$("#ccy-change").change(function(){
			var getCurrentCountry = function() {
				var ccHashMatch = window.location.hash.match(/CC=([A-Z]{2})/i);
				var ccParamMatch = window.location.href.match(/country=([A-Z]{2})/i);
				var cc = "";
				if (ccHashMatch && ccHashMatch.length > 0) {
					cc = ccHashMatch[1].toUpperCase();
				} else if (ccParamMatch && ccParamMatch.length > 0){
					cc = ccParamMatch[1].toUpperCase();
				}

				return cc;
			};
			
			$closestForm = $(this).closest("form");
			var currentAction = $closestForm.attr('action');
			var cc = getCurrentCountry();
			$closestForm.attr("action", currentAction + (cc ? "#cc=" + cc : ""));
			$closestForm.submit();
		});


		// catch cc from url, if user changed currency or linked page to someone else
		var ccHashMatch = window.location.hash.match(/CC=([A-Z]{2})/i);
		var ccParamMatch = window.location.href.match(/country=([A-Z]{2})/i);
		if (ccHashMatch && ccHashMatch.length > 0) {
			var cc = ccHashMatch[1].toUpperCase();
			_showRowsForCountry(cc);
			_changeBestPrice(cc);
			_setFilteredCountry(cc);
		} else if (ccParamMatch && ccParamMatch.length > 0){
			var cc = ccParamMatch[1].toUpperCase();
			_showRowsForCountry(cc);
			_changeBestPrice(cc);
			_setFilteredCountry(cc);
		} else {
			_toggleUpSell(1);
		}
		
		// view all rates links handler
		$("a.viewAllRates").click(function(ev){
			ev.preventDefault();
			_viewAllRates();
		});
		var viewAllRatesMatch = window.location.hash.match(/#viewAllRates/i);
		if (viewAllRatesMatch && viewAllRatesMatch.length > 0) {
			_viewAllRates();
		}
		
	});
}();

SKYPE.prices.CurrencyChanger = function() {
	$(document).ready(function() {
		if ($("#currencyChangeForm").length && $("#currency").length && $("#ccy-change-vat")) {
			$form = $("#currencyChangeForm");
			$currency = $("#currency");
			$vat = $("#ccy-change-vat");
						
			$currency.change(function() {
				window.location = "?currency=" + $currency.val() + "&vat=" + $vat.val() + $form.attr("action");
			});
			
			$vat.change(function() {
				window.location = "?currency=" + $currency.val() + "&vat=" + $vat.val() + $form.attr("action");
			});
		}
	});
}();

SKYPE.prices.ElementHider = function() {
	$(document).ready(function() {
		$(".visible").removeClass("visible").addClass("notVisible");
		
		$('a.showHiddenPrices').click(function() {
		$(".notVisible").removeClass("notVisible").addClass("visible");
		});		
	});
}();