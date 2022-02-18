setInterval(function(){
    var s = document.getElementById('time');
    s.innerHTML = '<i class="fa fa-calendar" aria-hidden="true"></i> ' + new Date().toLocaleDateString() + "<br>" + '<i class="fa fa-clock-o" aria-hidden="true"></i> ' + new Date().toLocaleTimeString();
}, 1000);
