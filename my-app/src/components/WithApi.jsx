import React, { useState, useEffect } from 'react';

function TodoApp() {
  const [list, setList] = useState([]);
  const [post, setPost] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const API_URL = 'https://jsonplaceholder.typicode.com/todos';

  // 🟢 Fetch the list from the API when the component loads
  useEffect(() => {
    fetch(API_URL + '?_limit=10') // Limit to 10 items for simplicity
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // 🟢 Handle input change
  const handleChange = (event) => {
    setPost(event.target.value);
  };

  // 🟢 Handle form submit to create a new todo
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!post.trim()) return; // Prevent empty submissions

    const newPost = {
      title: post,
      completed: false,
    };

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        setList([data, ...list]);
        setPost('');
      })
      .catch((error) => console.error('Error adding todo:', error));
  };

  // 🟢 Handle delete
  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setList(list.filter((item) => item.id !== id));
      })
      .catch((error) => console.error('Error deleting todo:', error));
  };

  // 🟢 Handle edit
  const handleEdit = (id, title) => {
    setEditId(id);
    setEditTitle(title);
  };

  // 🟢 Handle edit input change
  const handleEditChange = (event) => {
    setEditTitle(event.target.value);
  };

  // 🟢 Handle save after editing
  const handleSave = () => {
    const updatedPost = {
      title: editTitle,
    };

    fetch(`${API_URL}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => response.json())
      .then(() => {
        setList(list.map((item) => (item.id === editId ? { ...item, title: editTitle } : item)));
        setEditId(null);
        setEditTitle('');
      })
      .catch((error) => console.error('Error updating todo:', error));
  };

  // 🟢 Handle cancel edit
  const handleCancel = () => {
    setEditId(null);
    setEditTitle('');
  };

  return (
    <div className="w-50">
      <h1 className="text-center">Todo App</h1>

      <form onSubmit={handleSubmit} className="d-flex m-5">
        <input
          type="text"
          placeholder="Enter your name"
          className="form-control ms-3 border-black"
          value={post}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-success ms-3">
          Submit
        </button>
      </form>

      <ul className="list-group ms-3">
        {list.map((item) => (
          <li className="list-group-item border-dark d-flex justify-content-between" key={item.id}>
            {editId === item.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  className="form-control"
                  onChange={handleEditChange}
                />
                <button className="btn btn-success ms-2" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-secondary ms-2" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {item.title}
                <div className="btn-group">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item.id, item.title)}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
