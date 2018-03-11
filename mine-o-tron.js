// Reset Everything
$.getJSON("startup?token=3efbdfd5be1d284d8b3dd660cc31f839", function (data) {
    console.log("Week", data.startup.team.week);
    // build a hub, you sould see our moneyh go down
    $.getJSON("build_hubs?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=H1", function (data) {
        // Wait... takes a few seconds
        window.setTimeout(function () {
            // deploy hub to 2000
            $.getJSON("deploy_hubs?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=H1&sector_ids=2000", function (data) {
                // you should see the hub appear
            });
        }, 3000); // 3 second delay before calling deploy
    });
});