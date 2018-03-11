// Reset Everything
$.getJSON("startup?token=3efbdfd5be1d284d8b3dd660cc31f839", function (data) {
    console.log("Week", data.startup.team.week);
    // build a hub, you sould see our moneyh go down
    $.getJSON("build_hubs?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=H1", function (data) {
        // Wait... takes a few seconds
        window.setTimeout(function () {
            // deploy hub to 2000
            $.getJSON("prospect_report?token=3efbdfd5be1d284d8b3dd660cc31f839", function (data) {
                var report = data.prospect_report.report;
                // choose a random sector with cashola
                var sector = Math.floor(Math.random() * report.length);
                console.log("Deploying to sector",sector);
                $.getJSON("deploy_hubs?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=H1&sector_ids=" + sector, function (data) {
                    // you should see the hub appear
                    console.log("Deployed Hub H1");
                    // Wait for ore loading... dunno... 60 seconds?
                    window.setTimeout(function () {
                        // deploy hub to 2000
                        $.getJSON("ship_ore?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=H1&insured=true", function (data) {
                            // you should see the hub appear
                            console.log("Deployed Hub H1");
                        });
                    }, 60000);
                });
            });
        }, 3000); // 3 second delay before calling deploy
    });
});

window.setInterval(function () {
    $.getJSON("status_report?token=3efbdfd5be1d284d8b3dd660cc31f839", function (data) {
        console.log(data.status_report.team.week);
        console.table(data.status_report.hubs);
    });
}, 2000);