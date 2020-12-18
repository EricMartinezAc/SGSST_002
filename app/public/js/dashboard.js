$(document).ready(function () {
    let cantNotif = 15;
    let nombreUser = 'Eric Martinez Acelas'
    if (cantNotif > 1) {
        $('#alertsDropdown').html('<i class="rotate-n-15 fas fa-bell fa-fw"></i><span class="badge badge-danger badge-counter">' + cantNotif + '</span>');
    }
    if (nombreUser) {
        $('#userDropdown').html('<span id="nombreUsuario" class="mr-2 d-none d-lg-inline text-gray-600 small">'+ nombreUser +'</span><i class="fas fa-user-tie"></i>')
    }
});
