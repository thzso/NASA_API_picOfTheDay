
const init = () => {
  const dateObj = new Date();

  let day = dateObj.getDate();
  if(day < 10){
    day =`0${day}`
  }
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const fullDate = `${year}-0${month}-${day}`;


  const root = document.getElementById("root");

  const header = document.createElement("header");
  header.setAttribute("class", "header");

  const headerContentContainer = document.createElement("div");
  headerContentContainer.setAttribute("id", "header-contents-container");

  const headerOveraLay = document.createElement("div");
  headerOveraLay.setAttribute("class", "overlay");

  const logo = document.createElement("img");
  logo.setAttribute("id", "logo");
  logo.src =
    "https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg";
  logo.alt = "logo";

  const pageTitle = document.createElement("h1");
  pageTitle.setAttribute("id", "page-title");
  pageTitle.innerText = "Picture of the Day";

  const titleContainer = document.createElement("div");
  titleContainer.setAttribute("class", "title-container");

  titleContainer.append(logo, pageTitle);

  const dateInput = document.createElement("input");
  dateInput.setAttribute("id", "date");
  dateInput.type = "date";
  dateInput.max = fullDate;
  dateInput.min = "1995-06-16";
  dateInput.value = fullDate;

  headerContentContainer.append(titleContainer, dateInput);

  const main = document.createElement("div");
  main.setAttribute("id", "main");

  const container = document.createElement("div");
  container.setAttribute("id", "pic-of-the-day-container");
  container.style = "height: 80svh";

  const spinner = document.createElement("div");
  spinner.setAttribute("class", "spin");
  const spinnerContainer = document.createElement("div");
  spinnerContainer.setAttribute("class", "spinner-container");
  spinnerContainer.append(spinner);

  container.append(spinnerContainer);

  const section = document.createElement("section");

  const loadMoreBtn = document.createElement("button");
  loadMoreBtn.setAttribute("id", "load-button");
  loadMoreBtn.innerText = "More images";

  const imageGalleryContainer = document.createElement("div");
  imageGalleryContainer.setAttribute("id", "pic-gallery-container");

  const spinnerGallery = document.createElement("div");
  spinnerGallery.setAttribute("class", "spin");
  const spinnerGalleryContainer = document.createElement("div");
  spinnerGalleryContainer.setAttribute("class", "spinner-container");
  spinnerGalleryContainer.append(spinnerGallery);

  imageGalleryContainer.append(spinnerGalleryContainer);

  const imageGalleryTitle = document.createElement("h1");
  imageGalleryTitle.innerText = "Image gallery";
  imageGalleryTitle.setAttribute("id", "image-gallery-title");

  section.append(imageGalleryTitle, imageGalleryContainer, loadMoreBtn);

  const footerLogo = document.createElement("img");
  footerLogo.setAttribute("id", "footerLogo");
  footerLogo.src =
    "https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg";

  footerLogo.alt = "logo";
  const text = "{ APIs }";
  const linkApi = document.createElement("div");
  linkApi.setAttribute("class", "footer-logo");
  linkApi.append(footerLogo, text);

  const footer = document.createElement("footer");
  const aTag = document.createElement("a");
  aTag.href = "https://api.nasa.gov/";
  aTag.target = "_blank";
  aTag.appendChild(linkApi);

  header.append(headerOveraLay, headerContentContainer);
  main.append(container, section);
  footer.append(aTag);

  root.append(header, main, footer);

  async function getPictureOfTheDay(date) {

    const url = `/.netlify/functions/getPictureOfTheDay?date=${date}`;
    const response = await fetch(url);
    const data = await response.json();
    createPicOfTheDay(data);
    return response.status;
  }

  const getDataOfGallery = async () =>{
    const url = `/.netlify/functions/getDataOfGallery`;
    const response = await fetch(url);
    const data = await response.json();
    createGallery(data)
    return response.status
  }


  const changePicOfTheDay = (event) => {
    const inputDate = new Date(event.target.value);
    const firstPicDate = new Date("1995-06-16");

    container.innerHTML = "";

    container.style = "height: 80svh";
    container.append(spinnerContainer);

    if (inputDate < dateObj && inputDate > firstPicDate) {
      getPictureOfTheDay(event.target.value);
    }
  };

  const createPicOfTheDay = (data) => {
    if (container.innerHTML !== "") {
      container.removeChild(spinnerContainer);
      container.style = "height: auto";
    }

    const explanationContainer = document.createElement("div");
    explanationContainer.setAttribute("id", "explanation-container");

    const imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "image-copyright-container");


    const media =
      data.media_type === "image"
        ? document.createElement("img")
        : document.createElement("iframe");

    media.src = data.url;

    media.setAttribute("class", "media-container");

    media.setAttribute("id", "pic-of-the-day");

    const PicOfTheDaycopyright = document.createElement("span");
    PicOfTheDaycopyright.setAttribute("class", "pic-of-the-day-copyright");
    PicOfTheDaycopyright.innerText = data.copyright
      ? `© ${data.copyright}`
      : "";

    imageContainer.append(media, PicOfTheDaycopyright);

    const title = document.createElement("h1");
    title.setAttribute("id", "pic-of-the-day-title");
    title.innerText = data.title;

    const explanation = document.createElement("p");
    explanation.setAttribute("id", "pic-of-the-day-explanation");
    explanation.innerText = data.explanation;

    explanationContainer.append(title, explanation);
    container.append(imageContainer, explanationContainer);
  };

  const createGallery = (dataList) => {
    if (imageGalleryContainer.childNodes[0].className === "spinner-container") {
      imageGalleryContainer.removeChild(spinnerGalleryContainer);
    }

    for (const data of dataList) {
      const randomImageContainer = document.createElement("div");
      randomImageContainer.setAttribute("class", "random-image-container");

      const media =
        data.media_type === "image"
          ? document.createElement("img")
          : document.createElement("iframe");

      media.src = data.url;

      media.setAttribute("class", "media-container");
      media.setAttribute("class", "media-container gallery-image");

      const titleBar = document.createElement("div");
      titleBar.setAttribute("class", "title-bar");

      const title = document.createElement("span");
      title.setAttribute("class", "title-bar-span");
      title.innerText = data.title;

      const copyRight = document.createElement("span");
      copyRight.setAttribute("class", "title-bar-span");
      copyRight.innerText =
        data.copyright !== undefined ? `© ${data.copyright}` : "";

      const date = document.createElement("span");
      date.setAttribute("class", "title-bar-span");
      date.innerText = data.date;

      const moreBtn = document.createElement("button");
      moreBtn.innerText = "More";

      const explanation = document.createElement("p");
      explanation.setAttribute("class", "random-explanation");
      explanation.innerText = data.explanation;
      const lessBtn = document.createElement("button");
      lessBtn.innerText = "Less";
      lessBtn.addEventListener("click", () => {
        titleBar.setAttribute("class", "title-bar");
        randomImageContainer.setAttribute("class", "random-image-container");
        moreBtn.style = "display: block";
        titleBar.removeChild(lessBtn);
        titleBar.removeChild(explanation);
      });

      moreBtn.addEventListener("click", () => {
        moreBtn.style = "display : none";
        randomImageContainer.setAttribute(
          "class",
          "random-image-container random-image-container-clicked"
        );
        titleBar.setAttribute("class", "title-bar title-bar-clicked");
        titleBar.append(explanation, lessBtn);
      });

      titleBar.append(title, copyRight, date, moreBtn);

      randomImageContainer.appendChild(media);
      randomImageContainer.appendChild(titleBar);

      imageGalleryContainer.appendChild(randomImageContainer);
    }
  };

  getPictureOfTheDay(fullDate);
  getDataOfGallery();

  dateInput.addEventListener("input", changePicOfTheDay);
  loadMoreBtn.addEventListener("click", () => {
    loadMoreBtn.style = "display: none";

    const spinnerLoadBtn = document.createElement("div");
    spinnerLoadBtn.setAttribute("class", "spin");
    const spinnerLoadBtnContainer = document.createElement("div");
    spinnerLoadBtnContainer.setAttribute("class", "spinner-container");
    spinnerLoadBtnContainer.append(spinnerLoadBtn);

    section.append(spinnerLoadBtnContainer);

    getDataOfGallery().then((res) => {
      if (res === 200) {
        section.removeChild(spinnerLoadBtnContainer);
        loadMoreBtn.style = "display: block";
      }
    });
  });
};
init();
