(function(){
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const escapeHTML = (str='') => str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

  function header(){
    const current = document.body.dataset.page;
    $('#siteHeader').innerHTML = `
      <header class="site-header">
        <div class="container nav-wrap">
          <a class="brand" href="index.html"><span>SPORT</span><b>HUB</b><small>DAILY</small></a>
          <nav class="main-nav" aria-label="Điều hướng chính">
            <a class="${current==='home'?'active':''}" href="index.html">Trang chủ</a>
            <a href="category.html?cat=chay-bo">Chạy bộ</a><a href="category.html?cat=gym-fitness">Gym & Fitness</a><a href="category.html?cat=bong-da">Bóng đá</a><a href="category.html?cat=sports-fashion">Sports Fashion</a>
          </nav>
          <div class="nav-actions"><button class="icon-btn" id="openSearch" aria-label="Tìm kiếm">⌕</button><a class="shop-pill" href="${SHOP_URL}" target="_blank" rel="noreferrer">SHOP ↗</a><button class="menu-btn" id="menuBtn" aria-label="Mở menu">☰</button></div>
        </div>
        <div class="mobile-nav" id="mobileNav"><a href="index.html">Trang chủ</a><a href="category.html?cat=chay-bo">Chạy bộ</a><a href="category.html?cat=gym-fitness">Gym & Fitness</a><a href="category.html?cat=bong-da">Bóng đá</a><a href="category.html?cat=sports-fashion">Sports Fashion</a><a href="${SHOP_URL}" target="_blank" rel="noreferrer">SPORTHUB Shop ↗</a></div>
      </header>`;
    $('#menuBtn').addEventListener('click',()=>$('#mobileNav').classList.toggle('open'));
    $('#openSearch').addEventListener('click',openSearch);
  }

  function footer(){
    $('#siteFooter').innerHTML=`<footer class="site-footer"><div class="container footer-grid"><div><a class="brand footer-brand" href="index.html"><span>SPORT</span><b>HUB</b><small>DAILY</small></a><p>Một không gian nội dung dành cho người yêu thể thao — từ tin tức, kiến thức đến phong cách sống.</p></div><div><strong>Khám phá</strong><a href="category.html?cat=chay-bo">Chạy bộ</a><a href="category.html?cat=gym-fitness">Gym & Fitness</a><a href="category.html?cat=bong-da">Bóng đá</a><a href="category.html?cat=sports-fashion">Sports Fashion</a></div><div><strong>SPORTHUB</strong><a href="${SHOP_URL}" target="_blank" rel="noreferrer">Cửa hàng chính ↗</a><a href="index.html">Về SPORTHUB Daily</a></div></div><div class="container footer-bottom"><span>© 2026 SPORTHUB DAILY</span><span>MEDIA × COMMERCE</span></div></footer>`;
  }

  function card(a){return `<article class="article-card reveal"><a class="article-img" href="article.html?slug=${a.slug}" style="--img:url('${a.image}')"><span class="tag">${a.categoryLabel}</span></a><div class="article-copy"><div class="meta">${a.date} · ${a.read}</div><h3><a href="article.html?slug=${a.slug}">${a.title}</a></h3><p>${a.excerpt}</p><a class="read-link" href="article.html?slug=${a.slug}">Đọc bài <span>→</span></a></div></article>`}

  function renderHome(){
    const grid = $('#latestGrid');
    if(!grid) return;
    grid.innerHTML = articles.slice(0,6).map(card).join('');
    $$('.story-card').forEach(el=>el.addEventListener('click',()=>{ const slug=el.dataset.article; if(slug) location.href=`article.html?slug=${slug}`; }));
    bindReveal();
    $('#newsletterForm')?.addEventListener('submit',e=>{e.preventDefault(); $('#newsletterMsg').textContent='Đã ghi nhận email. Bạn sẽ nhận những bài viết mới từ SPORTHUB DAILY.'; $('#newsletterForm').reset();});
  }

  function renderCategory(){
    const params=new URLSearchParams(location.search); const key=params.get('cat')||'all';
    const cat=categories.find(c=>c.key===key)||categories[0];
    $('#categoryTitle').textContent=cat.label==='Tất cả'?'Tất cả bài viết':cat.label;
    $('#categoryDescription').textContent=cat.desc;
    $('#filterRow').innerHTML=categories.map(c=>`<a class="filter-chip ${c.key===key?'selected':''}" href="category.html?cat=${c.key}">${c.label}</a>`).join('');
    const filtered=key==='all'?articles:articles.filter(a=>a.category===key);
    $('#resultCount').textContent=`${filtered.length} bài viết`;
    $('#categoryGrid').innerHTML=filtered.map(card).join('');
    $('#popularList').innerHTML=popular.map((a,i)=>`<a class="popular-item" href="article.html?slug=${a.slug}"><span>0${i+1}</span><div><strong>${a.title}</strong><small>${a.categoryLabel} · ${a.read}</small></div></a>`).join('');
    bindReveal();
  }

  function articleBody(a){
    const body=a.body||[
      {h:'Bắt đầu từ nhu cầu thật',p:'Một bài viết tốt nên giúp bạn hiểu rõ vấn đề trước khi quyết định. Hãy xem xét mục tiêu, tần suất sử dụng và môi trường vận động.'},
      {h:'Những tiêu chí quan trọng',p:'Ưu tiên sự vừa vặn, độ ổn định, cảm giác sử dụng và khả năng đáp ứng đúng mục đích. Thông số chỉ là điểm bắt đầu; trải nghiệm thực tế mới là phần cuối.'},
      {h:'Kết luận',p:'Khi đã hiểu nhu cầu, việc tìm sản phẩm phù hợp sẽ dễ hơn rất nhiều. SPORTHUB Daily cung cấp nội dung để bạn tự tin ra quyết định, còn SPORTHUB Shop là nơi khám phá sản phẩm.'}
    ];
    return body.map(x=>`<section class="article-section"><h2>${escapeHTML(x.h)}</h2><p>${escapeHTML(x.p)}</p></section>`).join('');
  }

  function renderArticle(){
    const params=new URLSearchParams(location.search); const slug=params.get('slug')||articles[0].slug; const a=articles.find(x=>x.slug===slug)||articles[0];
    document.title=`${a.title} — SPORTHUB DAILY`;
    const related=articles.filter(x=>x.slug!==a.slug && x.category===a.category).slice(0,3);
    $('#articleRoot').innerHTML=`
      <article class="article-page">
        <header class="article-head container reveal"><div class="article-meta"><span class="eyebrow dark">${a.categoryLabel}</span><span>${a.date}</span><span>${a.read}</span></div><h1>${escapeHTML(a.title)}</h1><p class="article-deck">${escapeHTML(a.excerpt)}</p></header>
        <div class="article-cover reveal" style="--img:url('${a.image}')"></div>
        <div class="container article-layout"><div class="article-content"><div class="article-lead">${escapeHTML(a.excerpt)}</div>${articleBody(a)}<div class="inline-commerce"><div><span class="eyebrow dark">SPORTHUB PICKS</span><h3>Đang tìm sản phẩm cho nhu cầu này?</h3><p>Khám phá các lựa chọn phù hợp trên SPORTHUB Shop.</p></div><a class="btn btn-red" href="${SHOP_URL}" target="_blank" rel="noreferrer">Xem sản phẩm ↗</a></div></div><aside class="article-side"><div class="side-sticky"><span class="eyebrow dark">TRONG BÀI</span><nav class="toc"><a href="#" onclick="return false">Tổng quan</a>${(a.body||[]).map((x,i)=>`<a href="#section-${i+1}">${escapeHTML(x.h)}</a>`).join('')}</nav><a class="side-shop" href="${SHOP_URL}" target="_blank" rel="noreferrer"><strong>SPORTHUB SHOP</strong><span>Khám phá sản phẩm ↗</span></a></div></aside></div>
        <section class="section container related-section reveal"><div class="section-head"><div><span class="eyebrow dark">ĐỌC TIẾP</span><h2>Cùng chủ đề</h2></div></div><div class="latest-grid">${related.map(card).join('')}</div></section>
      </article>`;
    const sections=$$('.article-section'); sections.forEach((el,i)=>el.id=`section-${i+1}`); bindReveal();
  }

  function openSearch(){
    const modal=$('#searchModal');
    modal.innerHTML=`<div class="search-backdrop" id="closeSearch"></div><div class="search-sheet"><div class="container search-inner"><div class="search-top"><span class="eyebrow dark">TÌM KIẾM</span><button class="close-search" id="closeSearchBtn">×</button></div><input id="searchInput" autocomplete="off" placeholder="Tìm bài viết, chủ đề, hướng dẫn…"><div id="searchResults" class="search-results"></div></div></div>`;
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
    $('#closeSearch').onclick=$('#closeSearchBtn').onclick=()=>{modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');};
    const input=$('#searchInput'); input.focus();
    input.addEventListener('input',()=>{
      const q=input.value.trim().toLowerCase();
      const results=q?articles.filter(a=>(a.title+' '+a.excerpt+' '+a.categoryLabel).toLowerCase().includes(q)).slice(0,8):articles.slice(0,5);
      $('#searchResults').innerHTML=results.map(a=>`<a class="search-result" href="article.html?slug=${a.slug}"><div class="mini-img" style="--img:url('${a.image}')"></div><div><span>${a.categoryLabel} · ${a.read}</span><strong>${a.title}</strong></div><b>↗</b></a>`).join('') || '<div class="no-results">Không tìm thấy bài viết phù hợp.</div>';
      $$('.search-result').forEach(x=>x.onclick=()=>modal.classList.remove('open'));
    });
    input.dispatchEvent(new Event('input'));
  }

  function bindReveal(){requestAnimationFrame(()=>{$$('.reveal').forEach(el=>{if(el.dataset.revealBound) return; el.dataset.revealBound='1'; setTimeout(()=>el.classList.add('in'),50);});});}
  function scrollFx(){
    const top=window.scrollY; document.documentElement.style.setProperty('--scrollY', top+'px');
    $('#toTop')?.classList.toggle('show',top>500);
    const prog=$('#readingProgress'); if(prog){ const d=document.documentElement; const max=d.scrollHeight-innerHeight; prog.style.width=(max>0?(top/max)*100:0)+'%'; }
  }
  function init(){header();footer(); const page=document.body.dataset.page; if(page==='home')renderHome(); if(page==='category')renderCategory(); if(page==='article')renderArticle(); $('#toTop')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'})); window.addEventListener('scroll',scrollFx,{passive:true}); scrollFx(); bindReveal();}
  document.addEventListener('DOMContentLoaded',init);
})();
