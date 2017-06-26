/* =========== ON PAGE LOAD HANDLER */
document.addEventListener('DOMContentLoaded', function(event) {
	Nexpaq.Header.create('Laser Pointer Testing');
});

document.addEventListener('NexpaqAPIReady', function() {
	document.getElementById('turnLaserOn').addEventListener('click', function() {
		console.log("laser on");
		Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'TurnOnLaser', []);
	});

	document.getElementById('turnLaserOff').addEventListener('click', function() {
		console.log("laser off");
		Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'TurnOffLaser', []);
	});

	Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'RequestStatus', []);

	Nexpaq.API.Module.addEventListener('DataReceived', function(event) {
		// we don't care about data not related to our module
		if(event.module_uuid != Nexpaq.Arguments[0]) return;
		if(event.data_source == 'LaserStateResponse' || event.data_source == 'CoverStateChanged') {
			document.getElementById('coverState').textContent = event.variables.cover_state;
		}

		if(event.data_source == 'LaserStateResponse') {
			document.getElementById('laserState').textContent = event.variables.laser_state;
		}

		if(event.data_source == 'StateChangeResponse') {
			if(event.variables.result == 'success') {
				Nexpaq.API.Module.SendCommand(Nexpaq.Arguments[0], 'RequestStatus', []);
			}
		}

    }); 
});

