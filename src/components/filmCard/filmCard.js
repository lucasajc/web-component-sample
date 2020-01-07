class FilmCard extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.open = false;
    this.film = {};
  }

  set content(film) {
    this.film = film;
    this.root.innerHTML = `
      <style>
        .button {
          font-weight: 400;
          white-space: nowrap;
          text-align: center;
          border: 1px solid transparent;
          cursor: pointer;
          height: 32px;
          padding: 0 15px;
          font-size: 14px;
          transition: all 0.3s ease;
          width: 100%;
          border-radius: 4px;
          margin: 4px 0;
        }
        .button:active, .button:focus {
          outline: 0;
          box-shadow: none;
        }
        .button.primary {
            color: #fff;
            background-color: #1890ff;
            border-color: #1890ff;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
        }
        .button.primary:hover {
          color: #fff;
          background-color: #40a9ff;
          border-color: #40a9ff;
        }
        .button.primary:active {
          color: #fff;
          background-color: #096dd9;
          border-color: #096dd9;
        }
        .card-container {
          background: black;
          color: yellow;
          overflow: hidden;
        }
        .film-title {
          padding-top: 1em;
          font-size: 20px;
        }
        .film-description-container {
          overflow: hidden;
          height: 0px;
        }
        .film-description-container.open {
          height: 600px;
        }
        .film-description-text {
          display: flex;
          justify-content: center;
          position: relative;
          height: 800px;
          color: #feda4a;
          font-family: 'Pathway Gothic One', sans-serif;
          font-size: 500%;
          font-weight: 600;
          letter-spacing: 6px;
          line-height: 150%;
          perspective: 400px;
          text-align: justify;
        }
        .film-description-title {
          text-align: center;
        }
        .crawl {
          position: relative;
          top: 99999px;
          transform-origin: 50% 100%;
          animation: crawl 50s linear;
          animation-iteration-count: infinite;
        }
        .fade {
          position: relative;
          width: 100%;
          min-height: 120px;
          top: 0px;
          background-image: linear-gradient(0deg, transparent, black 75%);
          z-index: 1;
        }
        @keyframes crawl {
          0% {
            top: 200px;
            transform: rotateX(20deg)  translateZ(0);
          }
            100% {
            top: -4000px;
            transform: rotateX(25deg) translateZ(-2000px);
          }
        }
      </style>

      <button class="button primary">Show ${this.film.title} opening crawl</button>
      <div class="card-container">
        <div class="film-description-container">
          <div class="fade"></div>
          <div class="film-description-text">
            <div id="crawl-container">
              <div class="film-description-title">
                <p>Episode ${this.film.episode_id}</p>
                <h1>${this.film.title}</h1>
              </div>
              <p>${this.film.opening_crawl}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener("click", () => {
      const descriptionContainer = this.shadowRoot.querySelector('.film-description-container');
      const filmDescriptionElement = this.shadowRoot.querySelector('#crawl-container');
      const toggleButtonElement = this.shadowRoot.querySelector('button');

      this.open = !this.open;

      descriptionContainer.classList.toggle('open');
      filmDescriptionElement.classList.toggle("crawl");

      if(this.open) {
        toggleButtonElement.innerText = `Hide ${this.film.title} opening crawl`;
      } else {
        toggleButtonElement.innerText = `Show ${this.film.title} opening crawl`;
      }
    });
  }
}

customElements.define('film-card', FilmCard);
