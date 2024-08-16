import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: number;
   children: ReactNode;
   color:string
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
 color,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">

      
       <h1 className={ `text-1xl font-bold` }>{title}</h1>

      

        <div className='flex justify-between flex-row'>
          <h1 className={ color == "green" ? `text-green-500 text-2xl	  font-bold` :`text-${color}-500 text-2xl	 font-bold` }>
            {total}
          </h1>
           {children}
        </div>

     <div style={{ borderRadius:"25px", marginTop:"2vh",backgroundColor:color,height:'1vh'}}>
      </div>
     
    </div>
  );
};

export default CardDataStats;
