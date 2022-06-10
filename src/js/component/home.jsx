import { useState } from "react";
import React, { useEffect } from "react";
let initialState = { label: "", done: false };

const Home = () => {
	const [task, setTask] = useState(initialState);
	const [list, setList] = useState([]);
	const [error, setError] = useState(false);
	const user = localStorage.getItem("user") || "";
	let URL_BASE = "https://assets.breatheco.de/apis/fake/todos/user/";
	// Inicio Fetch
	let getApi = async () => {
		try {
			let response = await fetch(`${URL_BASE}opina17`);
			let data = await response.json();
			setList(data);
			console.log(list);
		} catch (error) {}
	};

	let addListApi = async () => {
		if (task.label.trim() == "") {
			setError(true);
		}
		try {
			let response = await fetch(`${URL_BASE}opina17`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([...list, task]),
			});
			if (response.ok) {
				getApi();
				setTask({ ...task, ["label"]: "" });
			} else {
				console.log(response.status);
			}
		} catch (error) {
			console.log(error);
		}
	};

	let createUser = async () => {
		try {
			let response = await fetch(`${URL_BASE}opina17`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([]),
			});
			if (response.ok) {
				localStorage.setItem("user", JSON.stringify("opina17"));
				getApi();
			}
			console.log(response.status);
		} catch (error) {
			console.log(error);
		}
	};

	let deleteUser = async () => {
		try {
			let response = await fetch(`${URL_BASE}opina17`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				localStorage.removeItem("user");
			}
		} catch (error) {
			console.log(error);
		}
	};
	// Final Fetch
	const handleTask = (event) => {
		setTask({ ...task, [event.target.name]: event.target.value });
	};

	const deleteTask = (id) => {
		let newList = list.filter((item, index) => index != id);
		setList(newList);
	};

	const handleKey = (event) => {
		if (event.key === "Enter") {
			if (task.label.trim() == "") {
				setError(true);
			} else {
				setList([...list, task]);
				setTask({ ...task, ["label"]: "" });
				setError(false);
			}
		}
	};

	function addtask() {
		settasks([...task, newtask]);
	}

	function deletask(index) {
		var duplicatearray = [...task];

		duplicatearray.splice(index, 1);

		settasks(duplicatearray);
	}

	useEffect(() => {
		if (user == "") {
			createUser();
		} else {
			getApi();
		}
	}, []);

	return (
		<div className="home rounded-3">
			<div className="container-sm">
				<div className="container justify-content-center">
					<p className="header">Todos</p>
				</div>
				<div className="intro row justify-content-center m-4">
					<input
						type="text"
						className="form-control col-md-4 m-1"
						placeholder="Add a new task"
						aria-describedby="button-addon2"
						value={task.label}
						onChange={handleTask}
						onKeyUp={handleKey}
						name="label"
					/>
					<button
						onClick={addListApi}
						className="btn btn-primary col-md-2 m-2">
						Add Task
					</button>
				</div>
			</div>

			{error && (
				<div
					className="alert alert-danger d-flex align-items-center"
					role="alert">
					<div>You must to add a task</div>
				</div>
			)}
			<div className="card-body justify-content-center">
				<div className="card-text justify-content-center">
					{list.map((item, index) => {
						return (
							<p
								key={index}
								className="d-flex justify-content-between tarea">
								{item.label}
								<button
									type="button"
									className="btn-close"
									aria-label="Close"
									onClick={() => deleteTask(index)}></button>
							</p>
						);
					})}
					{list.length} task(s) left
				</div>
				<div className=" row justify-content-center">
					<button
						type="button"
						className="btn btn-primary col-md-2 m-1"
						onClick={() => {
							getApi();
						}}>
						Recover all the store task
					</button>
					<button
						type="button"
						className="btn btn-danger col-md-2 m-1"
						onClick={() => {
							deleteUser();
						}}>
						Delete all
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
