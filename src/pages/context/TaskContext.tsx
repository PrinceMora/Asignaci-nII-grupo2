import {createContext, useContext, useState} from 'react';

export interface Task {
	id: number;
	name: string;
	status: boolean;
}

interface TaskContextType {
	tasks: Task[];
	selectedTask: Task;
	updateTask: (id: number, status: boolean) => void;
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
	setSelectedTask: (id: number) => void;
}

const defaultTasks: Task[] = [
	{id: 1, name: 'Comprar leche', status: false},
	{id: 2, name: 'Sacar al perro', status: true},
	{id: 3, name: 'Hacer la cama', status: false},
	{id: 4, name: 'Hacer ejercicio', status: true},
	{id: 5, name: 'Cocinar cena', status: false},
];

const TaskContext = createContext<TaskContextType>({
	tasks: defaultTasks,
	selectedTask: {id: 0, name: '', status: false},
	updateTask: () => {},
	setTasks: () => {},
	setSelectedTask: () => {},
});

export interface CustomContextProviderProps {
	children: JSX.Element | JSX.Element[];
}

const TaskContextProvider: React.FC<CustomContextProviderProps> = ({children}) => {
	const [tasks, setTasks] = useState<Task[]>(defaultTasks);
	const [selectedTask, setSelectedTasks] = useState<Task>({id: 0, name: '', status: false});

	const updateTask = (id: number, status: boolean) => {
		const newTasks = tasks.map((task) => (task.id === id ? {...task, status} : task));
		setTasks(newTasks);
	};

	const setSelectedTask = (id: number) => {
		if (id === 0) {
			setSelectedTasks({id: 0, name: '', status: false});
		} else {
			const changedTask = tasks.filter((task) => task.id === id)[0];
			setSelectedTasks(changedTask);
		}
	};

	return (
		<TaskContext.Provider value={{tasks, updateTask, setTasks, selectedTask, setSelectedTask}}>
			{children}
		</TaskContext.Provider>
	);
};

export const useTaskContext = () => useContext(TaskContext);

export default TaskContextProvider;
