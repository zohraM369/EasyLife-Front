import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import adminService from '../../services/adminServices';

const colors = ['#3C50E0', '#80CAEE', '#FF5733', '#33FF57', '#3357FF'];

const options: ApexOptions = {
  colors: colors,
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',
    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

interface ChartFourState {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

const ChartFour: React.FC = () => {
  const [state, setState] = useState<ChartFourState>({
    series: [],
    categories: [],
  });

  useEffect(() => {
    const fetchTaskSummary = async () => {
      try {
        const taskSummary = await adminService.getTaskSummaryByType();
        const categories = Object.keys(taskSummary);
        const data = Object.values(taskSummary);

        setState({
          series: [{ name: 'Tasks', data }],
          categories,
        });
      } catch (error) {
        console.error('Error fetching task summary:', error);
      }
    };

    fetchTaskSummary();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Répartition des taches selon le type
          </h4>
        </div>
      </div>
      <div>
        <div id="chartFour" className="-ml-5 -mb-9">
          <ReactApexChart
            options={{ ...options, xaxis: { categories: state.categories } }}
            series={state.series.map((s, index) => ({
              ...s,
              data: s.data.map((value, i) => ({
                x: state.categories[i],
                y: value,
                fillColor: colors[i % colors.length], // cycle through the colors array
              })),
            }))}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartFour;
