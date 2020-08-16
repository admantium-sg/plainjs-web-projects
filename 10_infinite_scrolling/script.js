const postContainer = document.getElementById('posts-container');
const loader = document.getElementById('loader');

var limit = 5;
var page = 1;

async function loadPosts () {
  console.log('load posts');
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page++}`
  );
  const posts = await res.json();

  posts.forEach(post => {
    const html = `
      <div class="post-number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
      </div>`;

    const node = document.createElement('div');
    node.classList.add('post');
    node.innerHTML = html;

    postContainer.appendChild(node);
  });
}

function isVisible (domElement) {
  var bounding = domElement.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

function showLoader () {
  if (!loader.classList.contains('show')) {
    loader.classList.add('show');

    setTimeout(() => {
      loader.classList.remove('show');
      loadPosts();
    }, 1500);
  }
}

window.addEventListener('scroll', () => {
  if (isVisible(loader)) {
    console.log('Loader visible?', isVisible(loader));
    showLoader();
  }
});

loadPosts();
