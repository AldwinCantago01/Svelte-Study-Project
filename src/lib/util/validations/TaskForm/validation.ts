import type { Task } from '$lib/types/Task';
import type { PartialBy } from '$lib/types/CustomTypes';
import type { ResultObject } from '$lib/types/Validation';

import { SUCCESS, FAIL } from '$lib/types/Validation';

export default (task: PartialBy<Task, 'id'>): ResultObject => {
	if (task.id !== undefined && !Number.isInteger(task.id))
		return {
			result: FAIL,
			message: 'Task ID is in the wrong format.'
		};

	if (!task.name.trim())
		return {
			result: FAIL,
			message: 'Task name must not be empty.'
		};

	if (!(task.subtasks.length > 0))
		return {
			result: FAIL,
			message: 'Task must have at least one subtask.'
		};

	if (task.subtasks.some((subtask) => !subtask.name.trim()))
		return {
			result: FAIL,
			message: 'Subtask must not be empty.'
		};

	return {
		result: SUCCESS,
		message: 'Task has been successfully created.'
	};
};
