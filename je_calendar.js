clear();

const readline = require('readline');
const fs = require('fs');
const { google } = require('googleapis');
const TOKEN_PATH = 'sec/token.json';

// Load client secrets from a local file.
fs.readFile('sec/credentials.json', (err, content) => {
	if (err) return console.log('Error loading client secret file:', err);
	// Authorize a client with credentials, then call the Google Calendar API.
	authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
	const { client_secret, client_id, redirect_uris } = credentials.installed;
	const oAuth2Client = new google.auth.OAuth2(
		client_id, client_secret, redirect_uris[0]);

	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, (err, token) => {
		oAuth2Client.setCredentials(JSON.parse(token));
		callback(oAuth2Client);
	});
}

/**
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

function listEvents(auth) {
	const calendar = google.calendar({version: 'v3', auth});
	calendar.events.list({
		calendarId: 'casimircreative.com_59k8msrrc2ddhcv787vubvp0s4@group.calendar.google.com',
		timeMin: (new Date()).toISOString(),
		maxResults: 10,
		singleEvents: true,
		orderBy: 'starttime',
		// orderBy: 'updated',
	}, (err, res) => {
		if (err) return console.log('The API returned an error: ' + err);
		const events = res.data.items;
		if (events.length) {
			print_header(res)
			print_event(res)

			// const start = new Date(events[3].start.dateTime);
			// const end = new Date(events[3].end.dateTime);

			// console.log(`${start} => ${end}`);


			// events.map((event, i) => {
			// const start = event.start.dateTime || event.start.date;
			// test += `${start} - ${event.summary}\n`
			// console.log(`${start} - ${event.summary}`);
		// });
		}
		else {
			console.log('No upcoming events found.');
		}
	});
}

function print_header(results) {
	const calName = results.data.summary;
	const numResults = results.config.params.maxResults

	console.log(`\nReturning ${numResults} results, sorted by closest first, from ${calName}\n`)
}

function print_event(results) {
	const events = results.data.items;
	input_index(events)
}
function input_index(events) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.question(`Enter a number 1 to ${events.length} to view event: `, function(input) {
		console.log(`\n${events[input - 1].summary}\n`);
		check_description(events, input);
		console.log('\n');
		console.log(events[input - 1]);
		rl.close();
	});
}

function check_description(events, input) {
	events[input - 1].description ? console.log(events[input - 1].description.replace(/(<br>)/g, '\n')) : null;
}

function clear() {
	const exec = require('child_process').exec;
	exec('clear', function (error, stdout, stderr) {
		console.log(stdout);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});
}
