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
                // start with the first sector in the report
                var topSector = report[0];
                // loop thru each one
                report.forEach(sector => {
                    // replace the topSector if the ore volume is higher
                    topSector = (sector[2]>topSector[2]) ? sector : topSector;
                });
                console.log("Deploying to sector",topSector[0]);
                $.getJSON("deploy_hubs?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=H1&sector_ids=" + topSector[0], function (data) {
                    // you should see the hub appear
                    console.log("Deployed Hub H1");
                    // Wait for ore loading... dunno... 60 seconds?
                    window.setInterval(function () {
                        // deploy hub to 2000
                        $.getJSON("ship_ore?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=H1&insured=false", function (data) {
                            // you should see the hub appear
                            console.log("Deployed Hub H1");
                        });
                    }, 1000);
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