import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartConfiguration } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; 

@Component({
  selector: 'app-dashboard-benchmark',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard-benchmark.component.html',
  styleUrl: './dashboard-benchmark.component.scss'
})
export class DashboardBenchmarkComponent implements OnInit {
  public totalTimeChartPlugins = [ChartDataLabels]; 
  public gainChartPlugins = [ChartDataLabels];

  totalTimeChartOptions: ChartConfiguration<'bar'>['options'] = {};
  gainChartOptions: ChartConfiguration<'bar'>['options'] = {};

  benchmarkData: any[] = [];

  // Chart #1: Temps total
  totalTimeChart: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };
  // Chart #2: Gain de temps (%)
  gainChart: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const urls = [
      'http://localhost:8005/benchmarks/benchmark_results_5.json',
      'http://localhost:8005/benchmarks/benchmark_results_10.json',
      'http://localhost:8005/benchmarks/benchmark_results_20.json',
      'http://localhost:8005/benchmarks/benchmark_results_50.json',
      'http://localhost:8005/benchmarks/benchmark_results_100.json',
      'http://localhost:8005/benchmarks/benchmark_results_250.json',
      'http://localhost:8005/benchmarks/benchmark_results_500.json',
      'http://localhost:8005/benchmarks/benchmark_results_1000.json'
    ];

    Promise.all(urls.map(url => this.http.get<any[]>(url).toPromise()))
      .then(responses => {
        this.benchmarkData = responses
          .map(r => (Array.isArray(r) && r.length > 0 ? r[0] : null))
          .filter(d => d !== null); // filtre les éventuels fichiers vides
        this.prepareCharts();
      })
      .catch(error => console.error('Erreur lors du chargement des benchmarks :', error));
  }

  prepareCharts() {
    const labels = this.benchmarkData.map(d => `${d.cv_count} CVs`);
    const totalTimes = this.benchmarkData.map(d =>
      d.total_extraction_time_s + d.total_scoring_time_ms / 1000
    );
    const gains = this.benchmarkData.map(d =>
      +(
        ((d.total_time_necessaire_s - d.total_extraction_time_s - d.total_scoring_time_ms / 1000) / 3600)
        .toFixed(2)
      )      
    );
  
    // 🎯 Graphique 1 - Temps total
    this.totalTimeChart = {
      labels,
      datasets: [
        {
          label: 'Temps traitement (min)',
          data: totalTimes.map(s => +(s / 60).toFixed(2)), // secondes ➡ minutes
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
        }
      ]
    };
  
    this.totalTimeChartOptions = {
      responsive: true,
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'top',
          formatter: (value: number) => `${value} min`,
          font: { weight: 'bold' }
        },
        legend: { display: true },
        tooltip: {
          callbacks: {
            label: (context: any) => `${context.dataset.label}: ${context.raw} min`
          }
        }
      }
    };
  
    // 🎯 Graphique 2 - Gain de temps
    this.gainChart = {
      labels,
      datasets: [
        {
          label: 'Gain de temps (h)',
          data: gains,
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
        }
      ]
    };
  
    this.gainChartOptions = {
      responsive: true,
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'top',
          formatter: (value: number) => `${value} h`,
          font: { weight: 'bold' }
        },
        legend: { display: true },
        tooltip: {
          callbacks: {
            label: (context: any) => `${context.dataset.label}: ${context.raw} h`
          }
        }
      }
    };
  }
  
}