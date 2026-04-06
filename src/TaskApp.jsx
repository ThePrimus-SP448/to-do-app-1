import { useState } from "react";

function TaskApp() {
    const [tasks, setTasks] = useState(['I am going to study', 'Make progress in my learning journey'])
    const [inputValue, setInputValue] = useState("");
    const [ctasks, setCtasks] = useState([]);

    function updateInput(event){
        setInputValue(event.target.value);
    }

    function addTask() {
        if (inputValue.trim() !== "") {
            setTasks([...tasks, inputValue]);
            setInputValue("");
        }
    }

    function deleteTask(index, isCompleted) {
        if(isCompleted){
            const updatedTasks = ctasks.filter((_, i) => i !== index);
            setCtasks(updatedTasks);
        }
        else{
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
    }}

    function moveUp(index, isCompleted) {
        const currentList = isCompleted? ctasks : tasks;
        const setList = isCompleted ? setCtasks : setTasks
        if (index > 0) {
            const updatedTasks = [...currentList];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setList(updatedTasks);
        }
    }

    function moveDown(index, isCompleted) {
        const currentList = isCompleted? ctasks : tasks;
        const setList = isCompleted ? setCtasks : setTasks;
        if (index < currentList.length - 1) {
            const updatedTasks = [...currentList];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setList(updatedTasks);
        }
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }

    function checkStatus (event, index) {
        if (event.target.checked) {
            setCtasks([...ctasks, tasks[index]]);
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
        }
        else{
            setTasks([...tasks, ctasks[index]]);
            const updatedCtasks = ctasks.filter((_, i) => i !== index);
            setCtasks(updatedCtasks);
        }


    }

    return (
        <>
        <div className = "taskbar">
            <h1>To-Do List App</h1>
            <div>
            <div className="input-class">
                <input type="text" value={inputValue} onKeyDown={handleKeyDown} onChange={updateInput} placeholder="Enter a Task..." />
                <button className="add-button" onClick={addTask} >Add</button>
            </div>
            </div>
        </div>


            <ol className="ongoing-tasks" >
                <h2 className="side-h2s">
                    Ongoing Tasks: {tasks.length}
                </h2>
            {tasks.map((task, index) =>
            <li key={index}>
            <label> <input type="checkbox" checked={false} onChange={(event) => checkStatus(event, index)} /> {task}</label>
            <span className="up-pointer" onClick={() => moveUp(index, false)} >👆</span>
            <span className="down-pointer" onClick={() => moveDown(index, false)} >👇</span>
            <button className= "delete-button" onClick={() => deleteTask(index, false)} >Delete</button>
            </li>)}
            </ol>

            <ol className="completed-tasks">
                <h2 className="side-h2s" >Completed Tasks: {ctasks.length}</h2>

            {ctasks.map((ctask, index) =>
            <li key={index}>
            <label> <input type="checkbox" checked={true} onChange={(event) => checkStatus(event, index)} /> {ctask}</label>
            <span className="up-pointer" onClick={() => moveUp(index, true)} >👆</span>
            <span className="down-pointer" onClick={() => moveDown(index, true)} >👇</span>
            <button className= "delete-button" onClick={() => deleteTask(index, true)} >Delete</button>
            </li>)}
            </ol>


        </>
        )
}

export default TaskApp;