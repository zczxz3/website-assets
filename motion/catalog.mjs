// Pure catalog helpers are shared by the gallery and unit checks.
export function filterStudies(studies, query='', category='all') {
  const words=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return studies.filter(site=>(category==='all'||site.category===category)&&
    words.every(word=>`${site.id} ${site.name} ${site.kind} ${site.tech} ${site.description}`.toLocaleLowerCase().includes(word)));
}
export function studyFromURL(studies, href) {
  const id=new URL(href).searchParams.get('study');
  return studies.find(site=>site.id===id)||studies[0];
}
export function studyURL(href,id) {
  const url=new URL(href);url.searchParams.set('study',id);return url;
}
