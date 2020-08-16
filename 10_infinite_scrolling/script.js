const postContainer = document.getElementById('posts-container')

var limit = 5
var page = 1

async function loadPosts () {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page++}`
  )
  const posts = await res.json()

  posts.forEach(post => {
    const html = `
      <div class="post-number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
      </div>`

    const node = document.createElement('div')
    node.classList.add('post')
    node.innerHTML = html

    postContainer.appendChild(node)
  })
}

loadPosts()
