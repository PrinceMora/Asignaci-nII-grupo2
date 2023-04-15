import {Task, useTaskContext} from '@/pages/context/TaskContext';
import {useContext, useEffect, useState} from 'react';

const Form: React.FC = () => {
	const {tasks, setTasks, updateTask, selectedTask, setSelectedTask} = useTaskContext();

	useEffect(() => {
		const taskToUpdate = tasks.find((t) => t.id === selectedTask.id);
		if (taskToUpdate) {
			setSelectedTask(selectedTask.id);
		}
	}, [selectedTask.id, setSelectedTask, tasks]);

	const handleTaskClick = (e: React.FormEvent, id: number, status: boolean) => {
		e.preventDefault();
		if (id != 0) {
			updateTask(id, status);
		}
	};

	return (
		<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center">
			{selectedTask.id == 0 ? (
				<div>
					<p>Seleccione la tarea que quiere modificar</p>
				</div>
			) : (
				<div className="grid grid-rows-4 grid-flow-col gap-4">
					<p className="text-gray-800 dark:text-gray-200 p-2">Tarea: {selectedTask.name}</p>
					<label className="relative inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							className="sr-only peer p-2"
							checked={selectedTask.status}
							onChange={(e) => handleTaskClick(e, selectedTask.id, e.target.checked)}
						/>
						<div className="w-11 h-6 bg-red-700 rounded-full peer dark:bg-red-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-2.5 after:left-[2px] after:bg-white after:border-re after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
					</label>
					<button onClick={(e) => setSelectedTask(0)}>Limpiar Pantalla</button>
				</div>
			)}
		</div>
	);
};

export default Form;
