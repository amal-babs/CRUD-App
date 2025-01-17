import React, { useState } from 'react';

function WithoutApi() {
  const [list, setList] = useState([
    { id: 1, title: 'John' },
    { id: 2, title: 'Anna' },
    { id: 3, title: 'Peter' },
  ]);

  const [post, setPost] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Handle input change
  const handleChange = (event) => {
    setPost(event.target.value);
  };

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!post.trim()) return; // Prevent empty submissions

    const newPost = {
      id: new Date().getTime(), // Generate a unique ID
      title: post,
    };

    setList([newPost, ...list]);
    setPost('');
  };

  // Handle delete
  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  // Handle edit
  const handleEdit = (id, title) => {
    setEditId(id);
    setEditTitle(title);
  };

  // Handle edit input change
  const handleEditChange = (event) => {
    setEditTitle(event.target.value);
  };

  // Handle save after editing
  const handleSave = () => {
    setList(list.map((item) => (item.id === editId ? { ...item, title: editTitle } : item)));
    setEditId(null);
  };

  // Handle cancel edit
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
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
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

export default WithoutApi;
