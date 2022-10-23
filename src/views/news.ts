import { News } from '../dto/news.interface';

export const newsTemplate = (news: News[]) => {
  if (news?.length === 0) {
    return emptyNews();
  }
  let html = '<div class="row">';
  for (const newsItem of news) {
    html += `
      <div class="col-lg-6">
        <div class="card">
          <img
            src='http://localhost:3000/${newsItem?.cover}'
            class="card-img-top"
            style="height: 200px; object-fit: cover;"
            alt=''
          >
          <div class="card-body">
            <h5 class="card-title">${newsItem.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Автор: ${newsItem.author}
            </h6>
            <h6 class="card-subtitle mb-2 text-muted">
              Дата создания: ${newsItem.createdAt}
            </h6>
            <p class="card-text">${newsItem.description}</p>
          </div>
        </div>
      </div>
    `;
  }
  html += '</div>';
  return html;
};

const emptyNews = () => {
  return `<h1>Список новостей пуст!</h1>`;
};

export const newsDetail = (news: News) => {
  let html = '<div class="row">';
    html += `
      <div class="col-lg-6">
        <div class="card">
          <img
            src='http://localhost:3000/${news?.cover}'
            class="card-img-top"
            style="height: 200px; object-fit: cover;"
            alt=''
          >
          <div class="card-body">
            <h5 class="card-title">${news.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Автор: ${news.author}
            </h6>
            <h6 class="card-subtitle mb-2 text-muted">
              Дата создания: ${news.createdAt}
            </h6>
            <p class="card-text">${news.description}</p>
            <p class="card-text">${news.text}</p>
            Комменты:
            ${news.comments.map(showComment)}
          </div>
        </div>
      </div>
    `;
  html += '</div>';
  return html;
};

export const showComment = (comment) => {
  return `
    <div class="col-lg-6">
      <div class="card">
        <img
          src='http://localhost:3000/${comment.avatar}'
          class="card-img-top"
          style="height: 200px; object-fit: cover;"
          alt=''
        >
        <div class="card-body">
          <p class="card-text">${comment.text}</p>
          <h6 class="card-subtitle mb-2 text-muted">
            Автор: ${comment.author}
          </h6>
          <h6 class="card-subtitle mb-2 text-muted">
            Дата создания: ${comment.createdAt}
          </h6>
        </div>
      </div>
    </div>
  `;
};

export const uploadForm = () => {
  return `
    <form method="post" enctype="multipart/form-data" action="localhost:3000/news/file">
      <input type="file" name="myfille"/><br>
      <input type=submit value="Отправить">
    </form>
  `;
};
