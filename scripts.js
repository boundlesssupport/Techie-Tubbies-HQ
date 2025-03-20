/*******************************************
 * 0) AUTHENTICATION OVERLAY
 *******************************************/

/*******************************************
const ACCESS_CODE = "secret123"; // Change as needed

function checkAccess() {
  const code = document.getElementById('accessCode').value;
  if (code === ACCESS_CODE) {
    document.getElementById('loginOverlay').style.display = "none";
    document.getElementById('mainContent').style.display = "flex";
  } else {
    document.getElementById('errorMessage').style.display = "block";
  }
}
 *******************************************/
/*******************************************
 * 1) THEME TOGGLING
 *******************************************/
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const toggleBtn = document.getElementById('theme-toggle');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = "Light Mode";
  } else {
    toggleBtn.textContent = "Dark Mode";
  }
  toggleBtn.addEventListener('click', toggleTheme);
  loadRecentlyUsed();
});

function toggleTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    toggleBtn.textContent = "Light Mode";
  } else {
    localStorage.setItem('theme', 'light');
    toggleBtn.textContent = "Dark Mode";
  }
}

/*******************************************
 * 2) RECENTLY USED APPS
 *******************************************/
function trackRecentlyUsed(event) {
  const link = event.currentTarget;
  const appId = link.getAttribute('data-app-id');
  const appName = link.querySelector('.app-name').textContent;
  const appUrl = link.href;
  const iconEl = link.querySelector('.app-icon');
  const appIcon = iconEl ? iconEl.textContent : '🔗';
  let recentlyUsed = JSON.parse(localStorage.getItem('recentlyUsed')) || [];
  recentlyUsed = recentlyUsed.filter((app) => app.id !== appId);
  recentlyUsed.unshift({ id: appId, name: appName, url: appUrl, icon: appIcon });
  recentlyUsed = recentlyUsed.slice(0, 5);
  localStorage.setItem('recentlyUsed', JSON.stringify(recentlyUsed));
  loadRecentlyUsed();
}

function loadRecentlyUsed() {
  const recentlyUsed = JSON.parse(localStorage.getItem('recentlyUsed')) || [];
  const container = document.querySelector('#recently-used .app-grid');
  container.innerHTML = '';
  recentlyUsed.forEach((app) => {
    const a = document.createElement('a');
    a.className = 'app-card';
    a.href = app.url;
    a.target = '_blank';
    a.setAttribute('data-app-id', app.id);
    a.onclick = trackRecentlyUsed;
    const iconDiv = document.createElement('div');
    iconDiv.className = 'app-icon';
    iconDiv.textContent = app.icon;
    const nameDiv = document.createElement('div');
    nameDiv.className = 'app-name';
    nameDiv.textContent = app.name;
    a.appendChild(iconDiv);
    a.appendChild(nameDiv);
    container.appendChild(a);
  });
}

/*******************************************
 * 3) SEARCH / FILTER
 *******************************************/
function filterApps() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const appCards = document.querySelectorAll('.app-card');
  appCards.forEach((card) => {
    const appName = card.querySelector('.app-name').textContent.toLowerCase();
    card.style.display = appName.includes(query) ? 'flex' : 'none';
  });
}

/*******************************************
 * 4) CATEGORY NAV FILTER
 *******************************************/
function filterByCategory(category) {
  const navItems = document.querySelectorAll('.side-nav li');
  navItems.forEach(item => item.classList.remove('active'));
  const sections = document.querySelectorAll('main .app-section');
  if (category === 'all') {
    sections.forEach(section => {
      section.style.display = 'block';
    });
    const allNav = document.querySelector('.side-nav li:nth-child(1)');
    if (allNav) allNav.classList.add('active');
  } else {
    sections.forEach(section => {
      if (section.id === category) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
    const activeItem = document.querySelector(`.side-nav li[onclick="filterByCategory('${category}')"]`);
    if (activeItem) activeItem.classList.add('active');
  }
}

function trackRecentlyUsed(event) {
    const link = event.currentTarget;
    const appId = link.getAttribute('data-app-id');
    const appName = link.querySelector('.app-name').textContent;
    const appUrl = link.href;

    // Store recently used apps
    let recentlyUsed = JSON.parse(localStorage.getItem('recentlyUsed')) || [];
    recentlyUsed = recentlyUsed.filter(app => app.id !== appId);
    recentlyUsed.unshift({ id: appId, name: appName, url: appUrl });
    recentlyUsed = recentlyUsed.slice(0, 5);
    localStorage.setItem('recentlyUsed', JSON.stringify(recentlyUsed));

    // Allow the link to open in a new tab
    window.open(appUrl, '_blank');
}
