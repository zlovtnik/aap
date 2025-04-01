document.addEventListener('DOMContentLoaded', function () {
  // Create menu toggle if it doesn't exist
  if (!document.querySelector('.menu-toggle')) {
    const toggle = document.createElement('div');
    toggle.className = 'menu-toggle';

    const burger = document.createElement('div');
    burger.className = 'burger';
    for (let i = 1; i <= 3; i++) {
      const line = document.createElement('div');
      line.className = `line line-${i}`;
      burger.appendChild(line);
    }

    toggle.appendChild(burger);
    document.body.appendChild(toggle);
  }

  // Get elements after they're created
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');

  // Add click event only if elements exist
  if (menuToggle && sidebar && mainContent) {
    menuToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      sidebar.classList.toggle('active');
      mainContent.classList.toggle('active');
    });
  }

  // Handle active menu state
  const currentPath = window.location.pathname;
  const menuItems = document.querySelectorAll('.sidebar-menu li');

  menuItems.forEach(item => {
    const link = item.querySelector('a');
    if (link.getAttribute('href') === currentPath) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
});