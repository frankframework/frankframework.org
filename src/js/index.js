import '../style/style.scss';

fetch('https://ibissource.org/iaf/releases/')
  .then(response => response.json())
  .then(data => {
    document.getElementById('gh-url').href = data[0].html_url;
    document.getElementById('gh-version').innerText = data[0].name;
  })
  .catch((error) => {
    console.error('Error getting GitHub data:', error);
  });