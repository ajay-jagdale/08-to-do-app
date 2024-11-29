import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';  // Correct import for v2

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Add a new to-do item
    const addTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([
                ...todos,
                { id: Date.now(), text: newTodo, completed: false, showFull: false },
            ]);
            setNewTodo('');
        }
    };

    // Toggle a to-do item's completion
    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Remove a to-do item
    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // Toggle the visibility of long text
    const toggleText = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, showFull: !todo.showFull } : todo
            )
        );
    };

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-md p-6 bg-red-300 rounded-lg shadow-md todo-box mt-16 mb-32">
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">To Do List</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add a new task"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') addTodo();
                        }}
                    />
                </div>
                <button
                    onClick={addTodo}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Add Task
                </button>

                <ul className="mt-6 space-y-4">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`flex justify-between items-center p-3 rounded-lg ${todo.completed ? 'bg-green-100' : 'bg-gray-100'
                                }`}
                        >
                            <span
                                onClick={() => toggleComplete(todo.id)}
                                className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''
                                    }`}
                                style={{
                                    whiteSpace: todo.showFull ? 'normal' : 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {todo.text}
                            </span>
                            <button
                                onClick={() => removeTodo(todo.id)}
                                className="ml-3 text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>

                            {/* Show More / Show Less Icon */}
                            {todo.text.length > 50 && (
                                <button
                                    onClick={() => toggleText(todo.id)}
                                    className="ml-3 p-1 text-gray-500 hover:text-blue-500"
                                >
                                    {todo.showFull ? (
                                        <ChevronUpIcon className="w-5 h-5" />
                                    ) : (
                                        <ChevronDownIcon className="w-5 h-5" />
                                    )}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
