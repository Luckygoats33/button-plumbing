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

  var html = '<footer class="site-footer">'
    + '<div class="wrap">'
    + '<div class="footer-grid">'
    + '<div class="footer-brand">'
    + '<a href="' + b + 'index.html" class="nav-logo" style="margin-bottom:0.5rem;">'
    + '<img src="' + b + 'favicon.svg" alt="Button Plumbing" width="44" height="44" style="border-radius:8px;">'
    + '<div class="nav-logo-text"><span class="logo-name">Button</span><span class="logo-tagline">Plumbing</span></div>'
    + '</a>'
    + '<p>Local plumbing service in Siletz, Oregon. Serving Lincoln County with over two decades of honest, quality work. Licensed, bonded, and insured.</p>'
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
    + '<li>Mon-Fri 8AM-5PM</li>'
    + '</ul>'
    + '<div style="margin-top:1rem;">'
    + '<h3>Credentials</h3>'
    + '<ul>'
    + '<li><a href="https://search.ccb.state.or.us/search/search_result.aspx?id=158113" target="_blank" rel="noopener">Oregon CCB #158113</a></li>'
    + '<li><a href="https://www.bbb.org/us/or/siletz/profile/plumber/button-plumbing-llc-1296-1000062684" target="_blank" rel="noopener">BBB A+ Accredited</a></li>'
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
    + '<div class="footer-bottom">'
    + '<span>&copy; ' + new Date().getFullYear() + ' Button Plumbing LLC. All rights reserved.</span>'
    + '<span>Licensed &amp; Insured &middot; Oregon CCB #158113</span>'
    + '</div>'
    + '</div>'
    + '</footer>';

  var target = document.getElementById('site-footer');
  if (target) {
    target.innerHTML = html;
  } else {
    var footer = document.querySelector('footer.site-footer');
    if (footer) {
      footer.outerHTML = html;
    }
  }
})();
