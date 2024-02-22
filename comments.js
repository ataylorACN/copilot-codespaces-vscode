// Create web server
// Use the express library to create the server
const express = require('express');
// Create the server
const app = express();

// Use the body-parser library to parse the body of the request
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Create a comments array to store the comments
const comments = [];

// Use the static middleware to serve static files
app.use(express.static('public'));

// Use the get method to send the comments array to the client
app.get('/comments', (req, res) => {
  res.send(comments);
});

// Use the post method to add a new comment to the comments array
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.send(comment);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
```

### 3. Create the React app

The React app will have a form to add new comments, and a list to display the comments. Use the `fetch` method to get and post comments to the server.

```jsx
// Path: src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch('/comments')
      .then(res => res.json())
      .then(data => setComments(data));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    fetch('/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: comment }),
    })
      .then(res => res.json())
      .then(data => setComments([...comments, data]));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={event => setComment(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

### 4. Run the app

```bash