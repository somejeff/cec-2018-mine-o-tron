// wrap it in closure to protect variables
(function () {
    // Global Status report
    var statusReport = null;
    var parameters = null;

    initialize();

    async function run() {


        buildHub();
        window.setInterval(shipOre, 2000);
        window.setInterval(moveHub, Math.round((parameters.lifetime * parameters.ms_per_week) / 3));  // move around 3 times
        window.setInterval(fetchStatusReport, parameters.ms_per_week*3); // fetch every week
        window.setInterval(displayStatusReport, 1000);
    }


    /**
     * Triggers the startup and resets everything
     */
    async function initialize() {
        var data = await $.getJSON("startup?token=3efbdfd5be1d284d8b3dd660cc31f839").then();
        statusReport = data.startup;

        data = await $.getJSON("parameters?token=3efbdfd5be1d284d8b3dd660cc31f839").then();
        parameters = data.parameters;

        console.log("Reboot");
        run();
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
        console.log(statusReport);
    }


    /** 
     * Requests a new hub to be built.
     * Currently hard coded ID. 
     */
    async function buildHub() {
        var hubId = "H1"; // TODO random ID? UUID? Fetch cool names from the internet somewhere?
        await $.getJSON("build_hubs?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=" + hubId).then();
        console.log("Build Hub: " + hubId);
        // deploy the hub as soon as it's ready
        var delay = parameters.costs.hub.weeks * parameters.ms_per_week; // total delay in ms before hub can be deployed
        window.setTimeout(deployHub, delay);
    }

    /** 
     * Finds a sector and deploys a hub to that sector
     */
    async function deployHub() {
        var hubId = "H1";
        var sectorID = await findTopSector();
        console.log("Deploying " + hubId + " to sector", sectorID);
        await $.getJSON("deploy_hubs?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=" + hubId + "&sector_ids=" + sectorID).then();

    }


    /** 
     * Moves a hub if it's empty
     */
    async function moveHub() {
        var hubId = "H1";
        var sectorID = await findTopSector();
        await $.getJSON("move_hubs?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=" + hubId + "&sector_ids=" + sectorID).then();
        console.log("Moving Hub: " + hubId + " to sector " + sectorID);
    }


    /** 
     * Ships Ore from a hub
     */
    async function findTopSector() {
        var data = await $.getJSON("prospect_report?token=3efbdfd5be1d284d8b3dd660cc31f839").then();
        var report = data.prospect_report.report;
        // start with the first sector in the report
        var topSector = report[0];
        // loop thru each one
        report.forEach(sector => {
            // replace the topSector if the ore volume is higher
            topSector = (sector[2] > topSector[2]) ? sector : topSector;
        });
        return topSector[0]; // return the sectorID of the top sector
    }

    /** 
     * Ships Ore from a hub
     */
    async function shipOre() {
        var hubId = "H1";
        await $.getJSON("ship_ore?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=" + hubId + "&insured=false").then();
    }

})();