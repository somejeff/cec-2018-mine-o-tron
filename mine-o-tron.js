// wrap it in closure to protect variables
(function () {
    // Global Status report
    var statusReport = null;

    initialize();

    buildHub();
    window.setTimeout(deployHub,3000);
    window.setInterval(shipOre,2000);

    window.setInterval(fetchStatusReport, 2000);
    window.setInterval(displayStatusReport, 2000);


    /**
     * Triggers the startup and resets everything
     */
    async function initialize() {
        var data = await $.getJSON("startup?token=3efbdfd5be1d284d8b3dd660cc31f839").then();
        statusReport = data.startup;
    }

    /** 
     * Fetches the status Report and puts it in a global variable for everyone to use
     * Not concerned with displaying the report
     */
    async function fetchStatusReport() {
        var data = await $.getJSON("status_report?token=3efbdfd5be1d284d8b3dd660cc31f839").then();
        statusReport = data.status_report;
    }

    /** 
     * displays the current status report
     * Currently using console log.
     */
    function displayStatusReport() {
        console.log("Week:" + statusReport.team.week);
        console.table(statusReport.hubs);
    }


    /** 
     * Requests a new hub to be built.
     * Currently hard coded ID. 
     */
    async function buildHub() {
        var hubId = "H1"; // TODO random ID? UUID? Fetch cool names from the internet somewhere?
        await $.getJSON("build_hubs?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=" + hubId).then();
        console.log("Build Hub: " + hubId);
    }

    /** 
     * Finds a sector and deploys a hub to that sector
     */
    async function deployHub() {
        var hubId = "H1";
        var data = await $.getJSON("prospect_report?token=3efbdfd5be1d284d8b3dd660cc31f839").then();
        var report = data.prospect_report.report;
        // start with the first sector in the report
        var topSector = report[0];
        // loop thru each one
        report.forEach(sector => {
            // replace the topSector if the ore volume is higher
            topSector = (sector[2] > topSector[2]) ? sector : topSector;
        });
        console.log("Deploying " + hubId + " to sector", topSector[0]);
        await $.getJSON("deploy_hubs?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=" + hubId + "&sector_ids=" + topSector[0]).then();
        
    }


    /** 
     * Ships Ore from a hub
     */
    async function shipOre() {
        var hubId = "H1";
        await $.getJSON("ship_ore?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=" + hubId + "&insured=false").then();
        console.log("Shipping Ore from: " + hubId);
    }

})();