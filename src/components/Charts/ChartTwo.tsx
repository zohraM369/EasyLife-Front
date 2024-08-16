import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import adminServices from '../../services/adminServices';

const options: ApexOptions = {
  colors: ['#3C50E0', '#80CAEE', '#FF4560'],
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
    
  },
  fill: {
    opacity: 1,
  },
};

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

const ChartTwo: React.FC = () => {
  const [state, setState] = useState<ChartTwoState>({
    series: [],
    categories: [],
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await adminServices.getMonthlyUserStats();
        console.log(response)
        const { loginStats, inactiveUsers, deletionStats } = response;

        const months = Array.from({ length: 12 }, (_, i) => i + 1);
        const activeData = Array(12).fill(0);
        const inactiveData = Array(12).fill(0);
        const deletedData = Array(12).fill(0);

        loginStats.forEach(stat => {
          activeData[stat.month - 1] = stat.count;
        });

        inactiveUsers.forEach(stat => {
          inactiveData[stat.month - 1] = stat.count;
        });

        deletionStats.forEach(stat => {
          deletedData[stat.month - 1] = stat.count;
        });

        setState({
          series: [
            { name: 'Utilisateurs active', data: activeData },
            { name: 'Utilisateurs Inactive', data: inactiveData },
            { name: 'Utilisateurs supprimés', data: deletedData },
          ],
          categories: months.map(month => `Month ${month}`),
        });
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Statistiques de Utilisateurs
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={{ ...options, xaxis: { categories: state.categories } }}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
