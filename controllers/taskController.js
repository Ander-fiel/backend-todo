const { Task } = require("../models");

exports.deleteTask = async (req, res) => {
	const { id } = req.params;

	try {
		const task = await Task.findOne({ where: { id: id } });

		if (!task) {
			return res.status(404).json({ message: "Tarea no encontrada" });
		}

		await Task.destroy({ where: { id: id } });

		return res.status(200).json({ message: "Tarea eliminada" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Error deleting task" });
	}
};

exports.getTask = async (req, res) => {
	const { id } = req.params;

	try {
		const task = await Task.findOne({ where: { id: id } });

		if (!task) {
			return res.status(404).json({ message: "Tarea no encontrada" });
		}

		return res.status(200).json(task);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Error getting task" });
	}
};

exports.updateTask = async (req, res) => {
	const { title, description } = req.body;
	const url = req.protocol + "://" + req.get("host");

	if (!title) {
		return res.status(400).json({ message: "Title is required" });
	}

	try {
		const taskId = req.params.id;
		const taskToUpdate = await Task.findByPk(taskId);

		if (!taskToUpdate) {
			return res.status(404).json({ message: "Task not found" });
		}

		taskToUpdate.title = title;
		taskToUpdate.description = description;
		taskToUpdate.image = url + "/public/" + req.file.filename;

		await taskToUpdate.save();

		return res.status(200).json(taskToUpdate);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Error updating task" });
	}
};

exports.fetchTasks = async (req, res) => {
	try {
		const tasks = await Task.findAll({ where: { userId: req.userId } });

		return res.status(200).json(tasks);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Error fetching tasks" });
	}
};

exports.createTask = async (req, res) => {
	const url = req.protocol + "://" + req.get("host");

	const { title, description } = req.body;

	if (!title) {
		return res.status(400).json({ message: "Title is required" });
	}

	try {
		const task = await Task.create({
			title,
			description,
			image: url + "/public/" + req.file.filename,
			userId: req.userId,
		});

		return res.status(201).json(task);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "error creating task" });
	}
};
