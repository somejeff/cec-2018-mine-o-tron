// wrap it in closure to protect variables
(function () {
    // Global Status report
    var statusReport = null;
    var parameters = null;
    var timers = [];
    var hubCost = null;
    var hubLocations = {};
    initialize();

    async function run() {


        timers.push(window.setInterval(buildHub, 1000));
        timers.push(window.setInterval(shipOre, 2000));
        timers.push(window.setInterval(moveHub, Math.round((parameters.lifetime * parameters.ms_per_week) / 3)));  // move around 3 times
        timers.push(window.setInterval(fetchStatusReport, parameters.ms_per_week * 3)); // fetch every week
        timers.push(window.setInterval(displayStatusReport, 1000));
    }


    /**
     * Triggers the startup and resets everything
     */
    async function initialize() {
        var data = await $.getJSON("startup?token=3efbdfd5be1d284d8b3dd660cc31f839").then();
        statusReport = data.startup;

        data = await $.getJSON("parameters?token=3efbdfd5be1d284d8b3dd660cc31f839").then();
        parameters = data.parameters;
        hubCost = parameters.costs.hub.rate + parameters.costs.deploy.rate + 100;
        console.log("Reboot");
        run();
    }

    /** 
     * Fetches the status Report and puts it in a global variable for everyone to use
     * Not concerned with displaying the report
     * Call game over if the times up
     */
    async function fetchStatusReport() {
        var data = await $.getJSON("status_report?token=3efbdfd5be1d284d8b3dd660cc31f839").then();
        statusReport = data.status_report;
        if (data.description === "times up") {
            // times up
            gameOver();
        }
    }

    /** 
     * displays the current status report
     * Currently using console log.
     */
    function displayStatusReport() {
        //console.log("Week:" + statusReport.team.week);
        //console.table(statusReport.hubs);
        //console.log(statusReport);
    }

    function gameOver() {
        timers.forEach(timer => {
            window.clearInterval(timer);
        });
        console.log("Game Over");
    }


    /** 
     * Requests a new hub to be built.
     * Currently hard coded ID. 
     */
    async function buildHub() {
        // only build a hub if we're in the first half of the lifetime, and there's enough moulah
        if (statusReport.team.week < (parameters.lifetime * .50) && statusReport.team.balance > hubCost) {
            var hubId = "H" + Math.floor(Math.random() * 100); // TODO random ID? UUID? Fetch cool names from the internet somewhere?
            await $.getJSON("build_hubs?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=" + hubId).then();
            console.log("Build Hub: " + hubId);
            // deploy the hub as soon as it's ready
            var delay = parameters.costs.hub.weeks * parameters.ms_per_week; // total delay in ms before hub can be deployed
            window.setTimeout(function () { deployHub(hubId); }, delay);
        }
    }

    /** 
     * Finds a sector and deploys a hub to that sector
     */
    async function deployHub(hubId) {
        var sectorID = await findTopSector();
        // reserve the spot to avoid conflicts
        hubLocations[hubId] = sectorID;
        console.log("Deploying " + hubId + " to sector", sectorID);
        await $.getJSON("deploy_hubs?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=" + hubId + "&sector_ids=" + sectorID).then();

    }


    /** 
     * Moves a hub if it's empty
     */
    async function moveHub() {
        Object.values(statusReport.hubs).forEach(async function (hub) {
            var hubId = hub.hub_id;
            var sectorID = await findTopSector();
            // reserve the spot to avoid conflicts
            hubLocations[hubId] = sectorID;
            await $.getJSON("move_hubs?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=" + hubId + "&sector_ids=" + sectorID).then();
            console.log("Moving Hub: " + hubId + " to sector " + sectorID);
        });
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
            if (sector[2] > topSector[2] && Object.values(hubLocations).indexOf(sector[0]) == -1) {
                topSector = sector;
            }
        });
        return topSector[0]; // return the sectorID of the top sector
    }

    /** 
     * Ships Ore from a hub
     */
    async function shipOre() {
        var hubIds = Object.keys(statusReport.hubs).join(',');
        await $.getJSON("ship_ore?token=3efbdfd5be1d284d8b3dd660cc31f839&hubs=" + hubIds + "&insured=false").then();
    }

})();