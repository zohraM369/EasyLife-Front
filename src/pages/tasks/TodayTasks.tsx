import { Task } from "../../interfaces/TaskInterface";

interface TodayTasksInterface {
  tasks: Task[];
}

interface CardProps {
  title: string;
  time: string;
  color: string;
}

const Card: React.FC<CardProps> = ({ title, time, color }) => {
  return (
    <div className="mt-2 bg-white shadow rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div
          className={`w-3 h-3 rounded-full ${color}`}
          style={{ backgroundColor: color }}
        ></div>
        <div className="ml-4">
          <h4 className="text-gray-900 font-semibold">{title}</h4>
          <p className="text-gray-500">{time}</p>
        </div>
      </div>
    </div>
  );
};

const TodayTasks: React.FC<TodayTasksInterface> = ({ tasks }) => {
  function convertDate(dateString: string) {
    const [day, month, year] = dateString.split("/");
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  }

  const today = new Date();
  const todayUTCString = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  )
    .toISOString()
    .split("T")[0];

  const events = tasks.filter((task) => {
    const taskDate = convertDate(task.date);
    console.log(taskDate.toISOString().split("T")[0]);
    console.log(todayUTCString);
    return taskDate.toISOString().split("T")[0] === todayUTCString;
  });
  console.log(events);
  return (
    <div className="mt-3 col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-2 text-center mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        A faire Aujourd'hui
      </h4>

      {events.length > 0 ? (
        events.map((element) => {
          return (
            <div className="border-2 border-blue-200 mx-1 mb-1  text-center border-black-100 shadow text-black">
              <Card
                title={element.title}
                time={element.time}
                color={getTaskColor(element.type)}
              />
            </div>
          );
        })
      ) : (
        <div className="text-center border shadow text-black">
          <p>Aucune tàche Ajourd'hui</p>
        </div>
      )}
    </div>
  );
};

const getTaskColor = (category: string) => {
  switch (category) {
    case "Education":
      return "bg-green-700";
    case "Perso":
      return "bg-yellow-700";
    case "Santé et bien être":
      return "bg-red-700";
    case "Travail":
      return "bg-blue-700";
    default:
      return "bg-gray-700";
  }
};
export default TodayTasks;
