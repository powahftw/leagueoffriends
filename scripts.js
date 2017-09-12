function apicall(callurl, arr, idx) {
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: callurl,
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            console.log(data);
            if (data.response['success'] == false) {
                setarray("errorinid", arr, idx);
            } else if (data.response['success'] == true && data.response['in_game'] == false) {
                console.log(arr[idx].status)
                if (arr[idx].status != "notingame") {
                    notifyMe(arr, idx);
                    setarray("endgame", arr, idx);
                } else {
                    setarray("notingame", arr, idx);
                }
            } else if (data.response['success'] == true && data.response['in_game'] == true) {
                console.log("SCRIPT");
                console.log(data.response['time']);
                setarray(data.response['time'], arr, idx);
            } else {
                console.log("FUCKFOREVER");
                setarray("notingame", arr, idx);
            }
        }
    })
};

function setarray(arg, arr, idx) {
    arr[idx].status = arg;
    genUI(arr);
}

function updatevalue(arr) {
    if (arr != undefined && arr.length > 0) {
        for (var i in arr) {
            var callurl = "https://apirestflask.herokuapp.com/" + arr[i].number.toLowerCase() + "/" + arr[i].name;
            console.log(callurl);
            apicall(callurl, arr, i);
        }
        genUI(arr);
    }
}

function genUI(arr) {
    $('#todo').empty(); // Display the elements
    for (var i in arr) {
        if (arr[i].status == "endgame") {
            var targetclass = "endgame"
        } else if (arr[i].status == "notingame") {
            var targetclass = "notingame"
        } else {
            var targetclass = "ingame"
        }

        var servername = String(arr[i].number) + " " + String(arr[i].name)
        var closingx = "<a href='#' class='close' aria-hidden='true'>&times;</a>"
        var statustag = "<div class=" + targetclass + ">" + String(arr[i].status) + "</div>"
        $("<ul>" + servername + " " + statustag + " " + closingx + "</ul>").addClass("custombox").appendTo($('#todo'));
    }
}

$(document).ready(function() {

    var arr = [];

    setInterval(function() {
        updatevalue(arr)
    }, 15000);

    $('button').click(function() {
        var unique = 1;
        for (var i in arr) { // Loop to check if elements is already in the array
            if ($('#dropbown').find(":selected").text() == arr[i].number && $("input[name=task]").val() == arr[i].name) {
                unique = 0;
            }
        }
        if ($("input[name=task]").val().length > 0 && unique && arr.length < 6) { // Add elements to the array if the textbox is not empty, arr < 6 element unique
            var newEntry = {
                number: $('#dropbown').find(":selected").text(),
                name: $("input[name=task]").val().replace(" ", "").toLowerCase(),
                status: "notingame"
            }
            arr.push(newEntry);
            genUI(arr); // Update GUI
        }
    });

    $("body").on('click', '#todo a', function() {
        var string = $(this).closest("ul").text();
        string = string.split(' ');
        console.log(string);

        var todelete = -1

        for (var i in arr) { // Find index of the element to remove

            if (string[0] == arr[i].number && string[1] === arr[i].name)
                todelete = i
        }

        if (todelete > -1) {
            arr.splice(todelete, 1)
        }

        genUI(arr); // Update GUI
    });
});

document.addEventListener('DOMContentLoaded', function() {
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }

    if (Notification.permission !== "granted")
        Notification.requestPermission();
});

function notifyMe(arr, idx) {
    var notification = new Notification('Notification title', {
        icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
        body: "Hey there!" + arr[idx] + "has finished a game",
    });

    notification.onclick = function() {
        window.open("www.leagueoflegends.com");
    };

}