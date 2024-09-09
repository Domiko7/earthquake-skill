exports.handler = async (event) => {
    const intentName = event.request.intent.name;

    if (intentName === 'GetLatestEarthquakeIntent') {
        return getLatestEarthquake();
    } else if (intentName === 'GetBiggestEarthquakeIntent') {
        return getBiggestEarthquake();
    } else {
        return createResponse('Sorry, I didn\'t understand that request.');
    }
};

function getLatestEarthquake() {
    // Fetch the latest earthquake data and return a response
    return fetchEarthquakeData('day').then(earthquakes => {
        if (earthquakes && earthquakes.length > 0) {
            const latest = earthquakes[0];
            const location = latest.properties.place;
            const magnitude = latest.properties.mag;
            const date = new Date(latest.properties.time).toLocaleString();
            const message = `The most recent earthquake occurred in ${location}, with a magnitude of ${magnitude}, on ${date}.`;
            return createResponse(message);
        } else {
            return createResponse('No recent earthquakes were found.');
        }
    });
}

function getBiggestEarthquake() {
    // Fetch the biggest earthquake data and return a response
    return fetchEarthquakeData('week').then(earthquakes => {
        if (earthquakes && earthquakes.length > 0) {
            const largest = findLargestEarthquake(earthquakes);
            if (largest) {
                const location = largest.properties.place;
                const magnitude = largest.properties.mag;
                const date = new Date(largest.properties.time).toLocaleString();
                const message = `The largest earthquake this week occurred in ${location}, with a magnitude of ${magnitude}, on ${date}.`;
                return createResponse(message);
            } else {
                return createResponse('No significant earthquakes were found this week.');
            }
        } else {
            return createResponse('No earthquakes were found this week.');
        }
    });
}

function createResponse(message) {
    return {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: message,
            },
            shouldEndSession: true,
        },
    };
}

// Function to fetch earthquake data
function fetchEarthquakeData(timeframe) {
    // Implement your data fetching logic here
    // For example, return a Promise that resolves with the earthquake data
}
