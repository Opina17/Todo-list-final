import React, { useState } from "react";

//create your first component
const Home = () => {
	const [newtask, setnewtask] = useState("");
	const [task, settasks] = useState([]);
	function addtask() {
		settasks([...task, newtask]);
	}
	function deletask(index) {
		var duplicatearray = [...task];
		duplicatearray.splice(index, 1);
		settasks(duplicatearray);
	}
	const tasklist = task.map((object, index) => {
		return (
			<div className="list-delete row justify-content-center m-2">
				<h3 className="col-md-5 text-left">{object}</h3>
				<button
					onClick={() => {
						deletask(index);
					}}
					className="col-md-1 btn btn-danger m-2">
					X
				</button>
			</div>
		);
	});

	return (
		<div className="home rounded-3">
			<div className="container-sm">
				<div className="container justify-content-center">
					<p className="header">Todos</p>
				</div>
				<div className="intro row justify-content-center m-2">
					<input
						type="text"
						placeholder="What needs to be done?"
						className=" col-md-4 m-1"
						value={newtask}
						onChange={(e) => {
							setnewtask(e.target.value);
						}}
					/>
					<button
						onClick={addtask}
						className="btn btn-primary col-md-2 m-2">
						Add Task
					</button>
				</div>
				{tasklist}
			</div>
			<div className="count col-md-12">
				<strong>{tasklist.length} item left</strong>
			</div>
		</div>
	);
};

export default Home;
