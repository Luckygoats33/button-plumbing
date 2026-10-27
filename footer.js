(function() {
  var p = window.location.pathname;
  var sub = (p.indexOf('/services/') !== -1 || p.indexOf('/blog/') !== -1);
  var b = sub ? '../' : '';

  var areas = [
    ['siletz', 'Siletz'],
    ['newport', 'Newport'],
    ['lincoln-city', 'Lincoln City'],
    ['toledo', 'Toledo'],
    ['depoe-bay', 'Depoe Bay']
  ];

  var areaTagsFooter = areas.map(function(a) {
    return '<a href="' + b + a[0] + '-plumber.html" class="area-tag">' + a[1] + '</a>';
  }).join('\n          ');

  var html = '<div class="wrap">'
    + '<div class="footer-grid">'
    + '<div class="footer-brand">'
    + '<a href="' + b + 'index.html" class="nav-logo" style="margin-bottom:0.5rem;">'
    + '<img src="' + b + 'images/logo.png" alt="Button Plumbing" width="96" height="96" style="border-radius:4px;">'
    + '</a>'
    + '<p>Local plumbing service in Siletz, Oregon. Serving Lincoln County with more than two decades of experience. Licensed, bonded, and insured.</p>'
    + '</div>'
    + '<div>'
    + '<h3>Services</h3>'
    + '<ul>'
    + '<li><a href="' + b + 'services/plumbing-repair.html">Plumbing Repair</a></li>'
    + '<li><a href="' + b + 'services/water-heaters.html">Water Heaters</a></li>'
    + '<li><a href="' + b + 'services/drain-sewer.html">Drain &amp; Sewer</a></li>'
    + '<li><a href="' + b + 'services/plumbing-installation.html">Installation</a></li>'
    + '<li><a href="' + b + 'services/remodel-plumbing.html">Remodel Plumbing</a></li>'
    + '<li><a href="' + b + 'services/pump-systems.html">Pump Systems</a></li>'
    + '</ul>'
    + '</div>'
    + '<div>'
    + '<h3>Company</h3>'
    + '<ul>'
    + '<li><a href="' + b + 'about.html">About</a></li>'
    + '<li><a href="' + b + 'gallery.html">Projects</a></li>'
    + '<li><a href="' + b + 'reviews.html">Reviews</a></li>'
    + '<li><a href="' + b + 'faq.html">FAQ</a></li>'
    + '<li><a href="' + b + 'service-areas.html">Service Areas</a></li>'
    + '<li><a href="' + b + 'contact.html">Contact</a></li>'
    + '</ul>'
    + '</div>'
    + '<div>'
    + '<h3>Contact</h3>'
    + '<ul>'
    + '<li><a href="tel:+15414442290">(541) 444-2290</a></li>'
    + '<li>Siletz, OR 97380</li>'
    + '</ul>'
    + '<div style="margin-top:1rem;">'
    + '<h3>Credentials</h3>'
    + '<ul>'
    + '<li><a href="https://search.ccb.state.or.us/search/search_result.aspx?id=158113" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;">Oregon CCB #158113</a></li>'
    + '<li><a href="https://www.bbb.org/us/or/siletz/profile/plumber/button-plumbing-llc-1296-1000062684" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline;">A+ BBB Accredited</a></li>'
    + '</ul>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '<div class="footer-areas">'
    + '<h3>Service Areas</h3>'
    + '<div class="area-tags" style="justify-content:flex-start;">'
    + areaTagsFooter
    + '</div>'
    + '</div>'
    + '<div class="footer-social" style="text-align:center;padding:1rem 0 0;">'
    + '<a href="https://www.bbb.org/us/or/siletz/profile/plumber/button-plumbing-llc-1296-1000062684" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:0.4rem;color:#C17831;font-weight:700;text-decoration:none;font-size:0.95rem;">'
    + '<svg width="20" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect rx="8" width="100" height="100" fill="#005A78"/><text x="50" y="42" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="28" fill="#fff">BBB</text><text x="50" y="70" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#fff">ACCREDITED</text><text x="50" y="82" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#fff">BUSINESS</text></svg>'
    + 'BBB Profile'
    + '</a>'
    + '</div>'
    + '<div class="footer-bottom">'
    + '<span>&copy; ' + new Date().getFullYear() + ' Button Plumbing LLC. All rights reserved.</span>'
    + '<span>Licensed &amp; Insured &middot; Oregon CCB #158113</span>'
    + '</div>'
    + '</div>';

  var footer = document.querySelector('footer.site-footer');
  if (footer) {
    footer.innerHTML = html;
  }
})();
