import {formattedDuration} from "../utils/common";
import SmartView from "./smart";
import {StatisticsDaysRange, makeItemsUniq, getFilmsByGenre, getListWatchedFilmsInDateRange, getTotalDuration, getTopGenre} from "../utils/statistic";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 50;

const renderDaysChart = (statisticCtx, films) => {
  const genres = films.map((film) => film.genres);
  const uniqGenres = makeItemsUniq([].concat(...genres));
  const countFilmsByGenre = uniqGenres.map((genre) => getFilmsByGenre(films, genre));
  statisticCtx.height = BAR_HEIGHT * uniqGenres.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqGenres,
      datasets: [{
        data: countFilmsByGenre,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export default class Statistics extends SmartView {
  constructor(films, activeDaysRange = StatisticsDaysRange.ALL_TIME) {
    super();
    this._films = films;

    this._dateChangeHandler = this._dateChangeHandler.bind(this);

    this._data = {
      films,
      activeDaysRange
    };

    this._setCharts();
    this._toggleStatisticHandler();
  }

  createTemplate(activeInput) {
    const countWatchedFilms = this._data.films.length;
    const totalDuration = countWatchedFilms ? getTotalDuration(this._data.films) : 0;
    const topGenre = countWatchedFilms ? getTopGenre(this._data.films) : ``;

    return `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">Sci-Fighter</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="${StatisticsDaysRange.ALL_TIME}" ${activeInput === StatisticsDaysRange.ALL_TIME ? `checked` : null}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="${StatisticsDaysRange.TODAY}" ${activeInput === StatisticsDaysRange.TODAY ? `checked` : null}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="${StatisticsDaysRange.WEEK}" ${activeInput === StatisticsDaysRange.WEEK ? `checked` : null}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="${StatisticsDaysRange.MONTH}" ${activeInput === StatisticsDaysRange.MONTH ? `checked` : null}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="${StatisticsDaysRange.YEAR}" ${activeInput === StatisticsDaysRange.YEAR ? `checked` : null}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${countWatchedFilms} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${totalDuration ? formattedDuration(totalDuration, `h[<span class="statistic__item-description">h</span>] m[<span class="statistic__item-description">m</span>]`) : `0`}</p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`;
  }

  getTemplate() {
    return this.createTemplate(this._data.activeDaysRange);
  }

  removeElement() {
    super.removeElement();

    if (this._genresChart !== null) {
      this._genresChart = null;
    }
  }

  _setCharts() {
    if (this._genresChart !== null) {
      this._genresChart = null;
    }

    const {films, dateFrom, dateTo} = this._data;
    if (films.length) {
      const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
      this._genresChart = renderDaysChart(statisticCtx, films, dateFrom, dateTo);
    }
  }

  _dateChangeHandler(evt) {
    evt.preventDefault();
    let films = [];

    switch (evt.target.value) {
      case StatisticsDaysRange.ALL_TIME:
        films = this._films;
        break;
      case StatisticsDaysRange.TODAY:
        films = getListWatchedFilmsInDateRange(this._films, new Date(), new Date());
        break;
      case StatisticsDaysRange.WEEK:
        films = getListWatchedFilmsInDateRange(
            this._films,
            (() => {
              const daysToFullWeek = 6;
              const date = new Date();
              date.setDate(date.getDate() - daysToFullWeek);
              return date;
            })(),
            new Date()
        );
        break;
      case StatisticsDaysRange.MONTH:
        films = getListWatchedFilmsInDateRange(
            this._films,
            (() => {
              const countMonthAgo = 1;
              const date = new Date();
              date.setMonth(date.getMonth() - countMonthAgo);
              return date;
            })(),
            new Date()
        );
        break;
      case StatisticsDaysRange.YEAR:
        films = getListWatchedFilmsInDateRange(
            this._films,
            (() => {
              const countYearAgo = 1;
              const date = new Date();
              date.setFullYear(date.getFullYear() - countYearAgo);
              return date;
            })(),
            new Date()
        );
        break;
    }

    this.updateData({
      films,
      activeDaysRange: evt.target.value
    });
  }

  _toggleStatisticHandler() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, this._dateChangeHandler);
  }

  restoreHandlers() {
    this._setCharts();
    this._toggleStatisticHandler();
  }

}
