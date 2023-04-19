import 'core-js/stable';
//import createChart from './chart.js';
import ApexCharts from 'apexcharts'
const runtime = require('@wailsapp/runtime');

// Main entry point
function start() {

	var mystore = runtime.Store.New('Counter');

	// Ensure the default app div is 100% wide/high
	var app = document.getElementById('app');
	app.style.width = '100%';
	app.style.height = '100%';

	

	// Inject html
	app.innerHTML = `
	
	<div class='logo'></div>
	<h1>Administrador de sistema</h1>
	<table style="width: 100%">
		<tr>
			<td>
				<p>Disco Total: <span id="disk-total"></p>
				<p>Libre: <span id="disk-libre"></p>
				<p>Uso de Disco: <span id="disk-usage"></span></p>
			</td>
			<td>
				<p>Uso de CPU: <span id="cpu-usage"></span> </p>
			</td>
			<td>
				<p>Uso de RAM : <span id="ram-usage"></span></p>
				<p>Usada : <span id="ram-usada"></span></p>
				<p>Libre : <span id="ram-libre"></span></p>
				<p>Total : <span id="ram-total"></span></p>
			</td>
		</tr>
		<tr>
			<td>
				<div style="width: 100%" id="chart">
				</div>
			</td>
			<td>
				<div style="width: 100%" id="chart2">
				</div>
			</td>
			<td>
				<div style="width: 100%" id="chart3">
				</div>
			</td>
		</tr>
		
	</table>
	`;

	/*function start() {
		// Llama a la función createChart para crear el gráfico
		createChart();
	  }*/
	  
	  var variable = 0;
	  var variableCpu = 0;
	  var variableRam = 0;
	  var series = [variable];
	  var seriesCpu = [variableCpu]
	  var seriesRam = [variableRam]

	  var options = {
          chart: {
          height: 280,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
				size: '70%',
            }
          },
        },
        labels: ['Uso Disco Duro'],
		colors : ['#7F00B2'],
        };

		var options2 = {
			chart: {
			height: 280,
			type: 'radialBar',
		  },
		  plotOptions: {
			radialBar: {
			  hollow: {
				  size: '70%',
			  }
			},
		  },
		  labels: ['Uso CPU'],
		  colors : ['#FF4560'],
		  };
		  var options3 = {
			chart: {
			height: 280,
			type: 'radialBar',
		  },
		  plotOptions: {
			radialBar: {
			  hollow: {
				  size: '70%',
			  }
			},
		  },
		  labels: ['Uso RAM'],
		  colors : ['#FF4560'],
		  };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

		var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
        chart2.render();

		var chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
        chart3.render();

		setInterval(function() {
			//variable = usage.toFixed(2)
			series[0] = variable; // actualiza el valor de la primera barra con el nuevo valor
			seriesCpu[0] = variableCpu;
			seriesRam[0] = variableRam
			chart.updateSeries(series); // actualiza la serie del gráfico con los nuevos valores
			chart2.updateSeries(seriesCpu);
			chart3.updateSeries(seriesRam);
		  }, 1000);
	
	
	window.backend.OnBackendInitialized = () => {
		updateDiskUsage()
	}
	
	async function updateDiskUsage() {
		const usage = await window.backend.getDiskUsage1()
		const DiskTotal = await window.backend.getDiskTotal()
		const DiskFree = await window.backend.getDiskFree()
		document.getElementById('disk-usage').textContent = usage.toFixed(2) + '%'
		document.getElementById('disk-total').textContent = DiskTotal.toFixed(2) + ' Gb'
		document.getElementById('disk-libre').textContent = DiskFree.toFixed(2) + ' Gb'
		variable = usage.toFixed(2)
		//chart.data.datasets[0].data[0] = usage
		//diskUsageChart.data.datasets[0].data[1] = 100 - usage
		chart.update()

	    const cpuUsage = await window.backend.getCPUPercentage()
    
    //diskUsageChart.data.datasets[0].data[0] = diskUsage
    //diskUsageChart.data.datasets[0].data[1] = 100 - diskUsage
    //diskUsageChart.update()
		
		document.getElementById('cpu-usage').textContent = cpuUsage.toFixed(2) + '%'
		variableCpu = cpuUsage.toFixed(2)

		const RamUsage = await window.backend.getRamPercentage()
		const RamFree = await window.backend.getRamFree()
		const RamTotal = await window.backend.getRamTotal()
		const RamUsed = await window.backend.getRamUsed()
    
		document.getElementById('ram-usada').textContent = RamUsed.toFixed(2) + 'GB'
		document.getElementById('ram-libre').textContent = RamFree + 'MB'
		document.getElementById('ram-total').textContent = RamTotal.toFixed(2) + 'GB'
		
		document.getElementById('ram-usage').textContent = RamUsage.toFixed(2) + '%'
		variableRam = RamUsage.toFixed(2)
    	
	}
	
	
	setInterval(updateDiskUsage, 1000)

	// Connect counter value button to Go method
	/*document.getElementById('setvalue').onclick = function() {
		let newValue = parseInt(document.getElementById('newCounter').value,10);
		mystore.set(newValue);
	};

	mystore.subscribe( function(state) {
		document.getElementById('counter').innerText = state;
	});
	
	mystore.set(0);*/

	
};


// We provide our entrypoint as a callback for runtime.Init
runtime.Init(start);