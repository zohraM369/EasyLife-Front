import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import adminServices from '../../services/adminServices';

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#0000FF', '#FF0000', '#008000', '#FBD16E'],
  labels: ['Done', 'Cancelled', 'Coming', 'Later'],
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [0, 0, 0, 0], // Initial series with zero values
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminServices.getTotalTasksByStatus()
        console.log(response)
        const data = response;

        // Map the API response to the chart's series
        const series = [
          data.done || 0,       
          data.cancelled || 0,  
          data.coming || 0,     
          data.late || 0       
        ];

        setState((prevState) => ({
          ...prevState,
          series,
        }));
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
    <h5 className="text-center text-xl font-semibold text-black dark:text-white">
            Répartition des taches selon l'etat
          </h5>
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          
        </div>
        <div>
         
        </div>
      </div>

      <div className="flex mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>


<div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#0000FF]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Done </span>
              <span> {state.series[0]} </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#FF0000]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Cancelled </span>
              <span> {state.series[1]}</span>  
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#008000]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Coming </span>
              <span> {state.series[2]}</span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#FBD16E]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> Later </span>
              <span> {state.series[3]} </span>
            </p>
          </div>
        </div>
      </div>

      </div>

      
    </div>
  );
};

export default ChartThree;
