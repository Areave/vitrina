setInterval(function(){
    var s = document.getElementById('time');
    s.innerHTML = '<i class="fa fa-calendar" aria-hidden="true"></i> ' + new Date().toLocaleDateString() + "<br>" + '<i class="fa fa-clock-o" aria-hidden="true"></i> ' + new Date().toLocaleTimeString();
}, 1000);



/* Date picker jQuery realization */

// $(document).ready(function() {
//     $('body').on("focus", "*", function(e){
//         e.stopPropagation();
//     });

//     console.log("getParams");
//     console.log(getParams);
    
//     if (typeof getParams['mass'] !== 'undefined') {
//         $('<div id="datepicker"></div>').appendTo('body');

//         $.datepicker.regional['cs'] = {
//             closeText: 'Zavřít', // set a close button text
//             currentText: 'Dnes', // set today text
//             monthNames: ['Leden','Únor','Březen','Duben','Květen','Červen','Červenec','Srpen','Září','Říjen','Listopad','Prosinec'], // set month names
//             monthNamesShort: ['led','úno','bře','dub','kvě','čer','čec','srp','zář','říj','lis','pro'], // set short month names
//             dayNames: ['Neděle','Pondělí','Úterý','Středa','Čtvrtek','Pátek','Sobota'], // set days names
//             dayNamesShort: ['Ned','Pon','Úte','Stř','Čtv','Pát','Sob'], // set short day names
//             dayNamesMin: ['Ne','Po','Út','St','Čt','Pá','So'], // set more short days names
//             dateFormat: 'yy-mm-dd' // set format date
//         };

//         $.datepicker.setDefaults($.datepicker.regional['cs']);

//         $( "#datepicker" ).datepicker({
//             onSelect: function(date) {
//                 date_order = date;
//                 $( "#datepicker").fadeOut(300);
//                 headerComponent.updateOrderDate();
//             },
//             firstDay: 1
//         });
//         $(document).on('click', '#mass_date', function(){
//             $("#datepicker").fadeIn(300);
//         });
//     }

//     if (getParams['transaction_code'] && getParams['result'] === 'fail') {
//         paymentComponent.setTransactionCode(getParams['transaction_code']);
//         paymentComponent.cancelOrder();

//     } else if (getParams['transaction_code'] && getParams['result'] === 'ok') {
//         loadCategoriesAndProductsFromApi();
//         //loader.startLoad('fa fa-question-circle-o');
//         loader.addMsg('Probíhá zpracování objednávky.');
//         paymentComponent.printReceipt(getParams['transaction_code'],1);
//         loader.allowClose();
//         //paymentComponent.printReceipt(getParams['transaction_code']);

//         // Load categories and products
//         loadDefault();

//     } else {
//         loader.startLoad();
//         // Load categories and products
//         loadDefault();
//     }

//     setInterval(function(){
//         //timestamp = timestamp + 1000;
//         $('#time').html('<i class="fa fa-calendar" aria-hidden="true"></i> ' + getDate() + "<br>" + '<i class="fa fa-clock-o" aria-hidden="true"></i> ' + getTime());
//     }, 1000);


// });