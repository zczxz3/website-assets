// Catalog views overlap; IDs and implementation status do not.
export function selectTargets(targets, view = 'all') {
  if (view === 'all') return targets;
  if (view === 'effects') return targets.filter(r => r.effect_role && !['none', 'orchestration-tool'].includes(r.effect_role));
  if (view === 'tools') return targets.filter(r => r.effect_role === 'orchestration-tool');
  return targets.filter(r => r.level === view);
}

export function validateCatalog(registry, contracts) {
  const rows = registry.targets, ids = new Set(rows.map(r => r.id));
  const require = (condition, message) => { if (!condition) throw Error(message); };
  require(ids.size === rows.length, 'Duplicate catalog ID');
  require(registry.counts.total === rows.length, 'Incorrect total');
  for (const [key, status] of Object.entries({queued:'queued',reference_only:'reference-only',implemented_bounded_studies:'implemented-bounded-study'}))
    require(rows.filter(r => r.status === status).length === registry.counts[key], 'Incorrect status count: '+key);
  require(registry.counts.queued + registry.counts.reference_only + registry.counts.implemented_bounded_studies === rows.length, 'Unknown progress status');
  for (const view of ['basic','advanced','full']) require(selectTargets(rows,view).length === registry.counts.levels[view], 'Incorrect level count: '+view);
  for (const [view,key] of [['effects','effect_components'],['tools','orchestration_tools']]) require(selectTargets(rows,view).length === registry.counts[key], 'Incorrect view count: '+view);
  for (const [batch,key] of [['clone','clone_candidates'],['study','study_acquisition'],['download','official_download']]) require(rows.filter(r=>r.batch===batch).length===registry.counts[key], 'Incorrect acquisition count: '+batch);
  for (const row of rows) {
    require(['basic','advanced','full'].includes(row.level), 'Unknown level');
    require(['none','element-attachment','block-layer','state-transition','orchestration-tool'].includes(row.effect_role), 'Unknown effect role');
    require(row.catalog_paths?.length && row.catalog_paths.every(p=>typeof p==='string'), 'Missing catalog path');
    if (row.batch === 'clone') require(/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+$/.test(row.repo_url) && /^[a-f0-9]{40}$/.test(row.source_commit), 'Unpinned clone candidate');
  }
  const effectIds = new Set(contracts.effects.map(e=>e.id));
  const expected = rows.filter(r=>/^E\d{2}$/.test(r.id));
  require(effectIds.size===contracts.effects.length && effectIds.size===expected.length && expected.every(r=>effectIds.has(r.id)), 'Contract/catalog mismatch');
  for (const effect of contracts.effects) {
    const row=rows.find(r=>r.id===effect.id);
    for (const key of ['target','acceptance','export_recipe','reduced_motion']) require(typeof effect[key]==='string' && effect[key].length>0 && effect[key]===row[key], 'Missing or divergent contract: '+key);
    for (const key of ['trigger','parameters']) require(effect[key]?.length && JSON.stringify(effect[key])===JSON.stringify(row[key]), 'Missing or divergent contract: '+key);
    require(effect.implementation.status==='planned' && effect.implementation.runtime_entry===null && effect.implementation.studio_installable===false && effect.implementation.behavior_verified===false, 'Planned effect advertised as implemented');
    require(row.status==='queued', 'New effect progress incorrectly advanced');
  }
  return {targets:rows.length,effects:effectIds.size,status:'valid'};
}
